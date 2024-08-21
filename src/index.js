import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard, openCard } from "./components/card";
import { openModal, closeModal, fillDefaultValues} from "./components/modal";

const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

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

    const nameInputValue = nameInput.value;
    const jodbInputValue = jobInput.value;
    const nameText = document.querySelector(".profile__title");
    const jobText = document.querySelector(".profile__description");

    nameText.textContent = nameInputValue;
    jobText.textContent = jodbInputValue;

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

profileFormHandler();

const createdCards = [];

function createCardHandler() {

  const formElement = document.querySelector('[name="new-place"]');

  const nameInput = formElement.querySelector('[name="place-name"]');
  const linkInput = formElement.querySelector('[name="link"]');

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameInputValue = nameInput.value;
    const linkInputValue = linkInput.value;

    createdCards.unshift({ name: nameInputValue, link: linkInputValue });
    placesList.prepend(
      createCard(createdCards[0], deleteCard, likeCard, openCard, popupImage)
    );

    closeModal(document.querySelector(".popup_is-opened"));
  }

  formElement.addEventListener("submit", handleFormSubmit);
}

createCardHandler();
