// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(card, callback) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardName = card.name;
  const cardImage = card.link;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardImage;
  cardElement.querySelector('.card__image').alt = cardName;
  cardDeleteButton.addEventListener("click", function() {callback(cardElement)});

  document.querySelector('.places__list').append(cardElement);
};
// @todo: Функция удаления карточки
const deleteCard = function(cardElement) {
 cardElement.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  createCard(item, deleteCard);
});