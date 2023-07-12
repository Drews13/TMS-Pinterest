import { getName } from "./localStorrage.js";
import { determineCardClick } from "./delegation.js";
import { HTMLText, className, imgAlt, localStorageNames } from "./textConstants.js";

function createCard(card) {
  let grid = document.querySelector('.' + className.cardsGrid);

  let gridItem = document.createElement("div");
  gridItem.classList.add(className.gridItem);
  gridItem.setAttribute("id", `${card.id}`);
  
  let gridCard = document.createElement("div");
  gridCard.classList.add(className.card);
  gridItem.appendChild(gridCard);
  
  let img = document.createElement("img");
  img.classList.add(className.cardPicture);
  img.setAttribute("src", `${card.image}`);
  img.setAttribute("alt", imgAlt.image);
  gridCard.appendChild(img);
  
  let cardAuthor = document.createElement("div");
  cardAuthor.classList.add(className.cardAuthor);
  gridCard.appendChild(cardAuthor);
  
  let avatar = document.createElement("img");
  avatar.classList.add(className.cardAvatar);
  avatar.setAttribute("src", `${card.authorAvatar}`);
  avatar.setAttribute("alt", imgAlt.avatar);
  cardAuthor.appendChild(avatar);
  
  let cardName = document.createElement("p");
  cardName.classList.add(className.cardName);
  cardName.innerText = card.author;
  cardAuthor.appendChild(cardName);
  
  let cardDescription = document.createElement("div");
  cardDescription.classList.add(className.cardDescription);
  gridCard.appendChild(cardDescription);
  
  let cardText = document.createElement("p");
  cardText.classList.add(className.cardText);
  cardText.innerText = card.description;
  cardDescription.appendChild(cardText);
  
  let cardActions = document.createElement('div');
  cardActions.classList.add(className.cardActions);
  gridCard.appendChild(cardActions);
    
  let modalItem_1 = document.createElement('div');
  modalItem_1.classList.add(className.modalClickItem);
  modalItem_1.innerText = "Открыть";
  cardActions.appendChild(modalItem_1);
  
  let modalItem_2 = document.createElement('div');
  modalItem_2.classList.add(className.modalClickItem);
  let currDesk = getName(localStorageNames.currDesk);
  modalItem_2.innerText = currDesk ? HTMLText.cardModalItems.delete : HTMLText.cardModalItems.add;
  cardActions.appendChild(modalItem_2);
  
  let modalItem_3 = document.createElement('div');
  modalItem_3.classList.add(className.modalClickItem);
  modalItem_3.innerText = HTMLText.cardModalItems.report;
  cardActions.appendChild(modalItem_3);
  
  cardActions.onclick = event => determineCardClick(event, card, currDesk);
  
  
  grid.appendChild(gridItem);
}

function paginationInner(data, page) {
  let showMoreBtn = document.querySelector('.' + className.showMoreButton);
  let message = document.querySelector('.' + className.noResults);
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

export function clearGrid() {
  let grid = document.querySelector('.' + className.cardsGrid);
  let showMoreBtn = document.querySelector('.' + className.showMoreButton);
  grid.innerHTML = "";
  showMoreBtn.style.display = "none";
}

export function renderPictures(data, page) {
  data.forEach(function (card) {
    createCard(card);
  });
  paginationInner(data, page);
}