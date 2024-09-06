import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal} from "./components/modal";
import {enableValidation, clearValidation} from "./components/validation";
import {getUserInfo, getInitialCards, EditUserInfo, addNewCard, renderLoading, editAvatar} from "./components/api"

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
let userId;

function fillDefaultValues(modal) {
  const nameInput = modal.querySelector('[name="name"]');
  const jobInput = modal.querySelector('[name="description"]');

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
}

const openCard = function (imageElement, popup) {
  const popupImage = popup.querySelector(".popup__image");
  const popupHeadline = popup.querySelector(".popup__caption");

  popupImage.src = imageElement.src;
  popupImage.alt = imageElement.alt;
  popupHeadline.textContent = imageElement.alt;
  
  openModal(popup);
};

const infoPromises = [getUserInfo(), getInitialCards()]

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
  enableValidation({
    formSelector: '.popup_type_edit .popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
});

editAvatarButton.addEventListener("click", function () {
  clearValidation(avatarEditForm, validationConfig);
  openModal(popupAvatarEdit);
  enableValidation({
    formSelector: '.popup_type_avatar_edit .popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
});

addCardButton.addEventListener("click", function () {
  clearValidation(newCardForm, validationConfig);
  openModal(popupNewCard);
  enableValidation({
    formSelector: '.popup_type_new-card .popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
});

function profileFormHandler() {
  const formElement = document.querySelector('[name="edit-profile"]');
  const nameInput = formElement.querySelector(".popup__input_type_name");
  const jobInput = formElement.querySelector(".popup__input_type_description");

  function handleFormSubmit(evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jodbInputValue = jobInput.value;
    const nameText = document.querySelector(".profile__title");
    const jobText = document.querySelector(".profile__description");

    renderLoading(true, formElement);

    EditUserInfo(nameInputValue, jodbInputValue)
      .then((res) => {
        nameText.textContent = res.name;
        jobText.textContent = res.about;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, formElement)});
    formElement.reset();

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

profileFormHandler();

function AvatarFormHandler() {
  const formElement = document.querySelector('[name="edit-avatar"]');
  const linkInput = formElement.querySelector(".popup__input_type_avatar_url");

  function handleFormSubmit(evt) {
    evt.preventDefault();

    let linkInputValue = linkInput.value;

    renderLoading(true, formElement);

    editAvatar(linkInputValue)
      .then((res) => {
        profileImage.style.backgroundImage=`url(${res.avatar})`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, formElement)});
    formElement.reset();

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

AvatarFormHandler();

function createCardHandler() {
  const formElement = document.querySelector('[name="new-place"]');
  const nameInput = formElement.querySelector('[name="place-name"]');
  const linkInput = formElement.querySelector('[name="link"]');

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const linkInputValue = linkInput.value;
    
    renderLoading(true, formElement);

    addNewCard(nameInputValue, linkInputValue)
      .then((res) => {
        placesList.prepend(
          createCard(res, deleteCard, likeCard, openCard, popupImage, userId)
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {renderLoading(false, formElement)});

    
    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

createCardHandler();
