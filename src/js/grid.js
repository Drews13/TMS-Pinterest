import { getName } from "./localStorrage.js";
import { determineCardClick } from "./delegation.js";

function createCard(card) {
  let grid = document.querySelector(".grid");

  let gridItem = document.createElement("div");
  gridItem.classList.add("grid__item");
  gridItem.setAttribute("id", `${card.id}`);
  
  let gridCard = document.createElement("div");
  gridCard.classList.add("card");
  gridItem.appendChild(gridCard);
  
  let img = document.createElement("img");
  img.classList.add("card__pic");
  img.setAttribute("src", `${card.image}`);
  img.setAttribute("alt", "image");
  gridCard.appendChild(img);
  
  let cardAuthor = document.createElement("div");
  cardAuthor.classList.add("card__author");
  gridCard.appendChild(cardAuthor);
  
  let avatar = document.createElement("img");
  avatar.classList.add("card__avatar");
  avatar.setAttribute("src", `${card.authorAvatar}`);
  avatar.setAttribute("alt", "avatar");
  cardAuthor.appendChild(avatar);
  
  let cardName = document.createElement("p");
  cardName.classList.add("card__name");
  cardName.innerText = card.author;
  cardAuthor.appendChild(cardName);
  
  let cardDescription = document.createElement("div");
  cardDescription.classList.add("card__description");
  gridCard.appendChild(cardDescription);
  
  let cardText = document.createElement("p");
  cardText.classList.add("card__text");
  cardText.innerText = card.description;
  cardDescription.appendChild(cardText);
  
  let cardActions = document.createElement('div');
  cardActions.classList.add("card__actions");
  gridCard.appendChild(cardActions);
    
  let modalItem_1 = document.createElement('div');
  modalItem_1.classList.add('modal-click-item');
  modalItem_1.innerText = "Открыть";
  cardActions.appendChild(modalItem_1);
  
  let modalItem_2 = document.createElement('div');
  modalItem_2.classList.add('modal-click-item');
  let currDesk = getName("currDesk");
  modalItem_2.innerText = currDesk ? "Удалить с доски" : "Добавить на доску";
  cardActions.appendChild(modalItem_2);
  
  let modalItem_3 = document.createElement('div');
  modalItem_3.classList.add('modal-click-item');
  modalItem_3.innerText = "Пожаловаться";
  cardActions.appendChild(modalItem_3);
  
  cardActions.onclick = event => determineCardClick(event, card, currDesk);
  
  
  grid.appendChild(gridItem);
}

export function clearGrid() {
  let grid = document.querySelector(".grid");
  let showMoreBtn = document.querySelector(".pagination__button");
  grid.innerHTML = "";
  showMoreBtn.style.display = "none";
}

export function paginationInner(data, page) {
  console.log(data);
  console.log(page);
  let showMoreBtn = document.querySelector(".pagination__button");
  let message = document.querySelector('.pagination__message');
  if (data.length == 0 && page == 1) {
    showMoreBtn.style.display = "none";
    message.style.display = "block";
  } else if (data.length < 12) {
    showMoreBtn.style.display = "none";
    message.style.display = "none";
  } else {
    message.style.display = "none";
    showMoreBtn.style.display = "block";
  }
}

export function renderPictures(data, page) {
  data.forEach(function (card) {
    createCard(card);
  });
  paginationInner(data, page);
}