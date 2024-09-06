import {handleLikeCard, handleDislikeCard, handleDeleteCard, getLikes} from './api'

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
let cardId ='';

const determineIfLiked = (card, userId) => {
  return card.likes.some((like) => {
    return like._id == userId;
  })
}

let isLiked;

//Функция создания карточки
export function createCard(card, deleteCard, likeCard, openCard, ImagePopup, userId) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardName = card.name;
  const cardImage = card.link;
  const cardOwnerId = card.owner._id;
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardlikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  isLiked = determineIfLiked(card, userId);

  if (cardOwnerId != userId) {
    cardDeleteButton.style.display = "none";
  }

  if (isLiked) {
    cardlikeButton.classList.add("card__like-button_is-active");
  } else {
    cardlikeButton.classList.remove("card__like-button_is-active");
  }

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardLikeCounter.textContent = card.likes.length;
  cardId = card._id;
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(card, cardElement);
  });
  cardlikeButton.addEventListener("click", function () {
    isLiked = determineIfLiked(card, userId);
    if (isLiked) {
      dislikeCard(card, cardLikeCounter, cardlikeButton);
    } else {
      likeCard(card, cardLikeCounter, cardlikeButton);
    }
  });
  cardElementImage.addEventListener("click", function () {
    openCard(cardElementImage, ImagePopup);
  });

  return cardElement;
}
//Функция удаления карточки
export const deleteCard = function (card, cardElement) {
  handleDeleteCard(card);
  cardElement.remove();
};

export const likeCard = (card, likeCounter, likeButton) => {
  handleLikeCard(card)
  .then((res) => {
    likeCounter.textContent = res.likes.length;
    likeButton.classList.toggle("card__like-button_is-active");
  })
  .catch((err) => {
    console.log(err);
  });
}

export const dislikeCard = (card, likeCounter, likeButton) => {
  handleDislikeCard(card)
  .then((res) => {
    likeCounter.textContent = res.likes.length;
    likeButton.classList.toggle("card__like-button_is-active");
  })
  .catch((err) => {
    console.log(err);
  });
}
