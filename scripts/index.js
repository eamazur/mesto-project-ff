// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
let placesList =  document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardName = card.name;
  const cardImage = card.link;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardDeleteButton.addEventListener("click", function() {deleteCard(cardElement)});

  return cardElement; 
};
// @todo: Функция удаления карточки
const deleteCard = function(cardElement) {
 cardElement.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  placesList.append(createCard(item, deleteCard));
});