import { openModal } from "./modal";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки
export function createCard(card, deleteCard, likeCard, openCard, ImagePopup) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardName = card.name;
  const cardImage = card.link;
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardlikeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });
  cardlikeButton.addEventListener("click", function () {
    likeCard(cardlikeButton);
  });
  cardElementImage.addEventListener("click", function () {
    openCard(cardElementImage, ImagePopup);
  });

  return cardElement;
}
//Функция удаления карточки
export const deleteCard = function (cardElement) {
  cardElement.remove();
};

export const likeCard = function (likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
};

