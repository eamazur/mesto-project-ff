import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal} from "./components/modal";

const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

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


initialCards.forEach(function (item) {
  placesList.append(
    createCard(item, deleteCard, likeCard, openCard, popupImage)
  );
});

editProfileButton.addEventListener("click", function () {
  openModal(popupEdit);
  fillDefaultValues(popupEdit);
});
addCardButton.addEventListener("click", function () {
  openModal(popupNewCard);
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

    nameText.textContent = nameInputValue;
    jobText.textContent = jodbInputValue;
    formElement.reset();

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

profileFormHandler();

function createCardHandler() {
  const formElement = document.querySelector('[name="new-place"]');
  const nameInput = formElement.querySelector('[name="place-name"]');
  const linkInput = formElement.querySelector('[name="link"]');

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const linkInputValue = linkInput.value;

    placesList.prepend(
      createCard({ name: nameInputValue, link: linkInputValue }, deleteCard, likeCard, openCard, popupImage)
    );

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

createCardHandler();
