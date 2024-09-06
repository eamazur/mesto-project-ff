import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal} from "./components/modal";
import {enableValidation, clearValidation} from "./components/validation";
import {getUserInfo, getInitialCards, editUserInfo, addNewCard, renderLoading, editAvatar} from "./components/api"

const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatarEdit = document.querySelector(".popup_type_avatar_edit");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__image-overlay");
const profileForm = popupEdit.querySelector(".popup__form");
const newCardForm = popupNewCard.querySelector(".popup__form");
const avatarEditForm = popupAvatarEdit.querySelector(".popup__form");
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const nameInput = profileForm.querySelector('[name="name"]');
const jobInput = profileForm.querySelector('[name="description"]');
const newCardNameInput = newCardForm.querySelector('[name="place-name"]');
const newCardLinkInput = newCardForm.querySelector('[name="link"]');
const avatarLinkInput = avatarEditForm.querySelector(".popup__input_type_avatar_url");
const popupImageImage = popupImage.querySelector(".popup__image");
const popupImageHeadline = popupImage.querySelector(".popup__caption");

let userId;

function fillDefaultValues(modal) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

const openCard = function (imageElement, popup) {
  popupImageImage.src = imageElement.src;
  popupImageImage.alt = imageElement.alt;
  popupImageHeadline.textContent = imageElement.alt;
  
  openModal(popup);
};

const infoPromises = [getUserInfo(), getInitialCards()]

enableValidation({
  formSelector: '.popup_type_edit .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

enableValidation({
  formSelector: '.popup_type_avatar_edit .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

enableValidation({
  formSelector: '.popup_type_new-card .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

Promise.all(infoPromises)
  .then((results) => {
    profileTitle.textContent = results[0].name;
    profileDescription.textContent = results[0].about;
    profileImage.style.backgroundImage=`url(${results[0].avatar})`;
    userId = results[0]._id;

    results[1].forEach(function (item) {
      placesList.append(
        createCard(item, deleteCard, likeCard, openCard, popupImage, userId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  })

editProfileButton.addEventListener("click", function () {
  clearValidation(profileForm, validationConfig);
  openModal(popupEdit);
  fillDefaultValues(popupEdit);
});

editAvatarButton.addEventListener("click", function () {
  clearValidation(avatarEditForm, validationConfig);
  openModal(popupAvatarEdit);
});

addCardButton.addEventListener("click", function () {
  clearValidation(newCardForm, validationConfig);
  openModal(popupNewCard);
});

function handleProfileForm() {

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameInputValue = nameInput.value;
    const jodbInputValue = jobInput.value;

    renderLoading(true, profileForm);

    editUserInfo(nameInputValue, jodbInputValue)
      .then((res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        profileForm.reset();
        closeModal(popupEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, profileForm)});
  }
  profileForm.addEventListener("submit", handleFormSubmit);
}

handleProfileForm();

function handleAvatarForm() {

  function handleFormSubmit(evt) {
    evt.preventDefault();

    let avatarLinkInputValue = avatarLinkInput.value;

    renderLoading(true, avatarEditForm);

    editAvatar(avatarLinkInputValue)
      .then((res) => {
        profileImage.style.backgroundImage=`url(${res.avatar})`;
        avatarEditForm.reset();
        closeModal(popupAvatarEdit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, avatarEditForm)});
  }
  avatarEditForm.addEventListener("submit", handleFormSubmit);
}

handleAvatarForm();

function handleCreateCard() {

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = newCardNameInput.value;
    const linkInputValue = newCardLinkInput.value;
    
    renderLoading(true, newCardForm);

    addNewCard(nameInputValue, linkInputValue)
      .then((res) => {
        placesList.prepend(
          createCard(res, deleteCard, likeCard, openCard, popupImage, userId)
        );
        closeModal(popupNewCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, newCardForm)}); 
  }
  newCardForm.addEventListener("submit", handleFormSubmit);
}

handleCreateCard();
