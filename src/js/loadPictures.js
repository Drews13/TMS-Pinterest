import { LIMIT } from "./constants.js";
import { determineCardClick } from "./delegation.js";
import { getName } from "./localStorrage.js";

export let data = [];
let i = 0;
let from = 0;
let to;
let grid = document.querySelector(".grid");
let wrapper = document.querySelector(".wrapper");
let logo = document.querySelector(".header__logo");

export function updateData() {
  i = 0;
  from = 0;
  grid.innerHTML = "";
  let currDesk = getName("currDesk");
  if (currDesk) {
    data = getName(`desk_${currDesk}`);
    renderPictures(data);
  } else {
    getPictures();
  }
}

async function getPictures() {
  i++;
  let url = new URL("https://64986c8a9543ce0f49e2064d.mockapi.io/picture");
  url.searchParams.append("page", i);
  url.searchParams.append("limit", LIMIT);
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      data = data.concat(res);
    })
    .catch((err) => console.log(err.message));
  renderPictures(data.slice(from, to));
}

function renderPictures(data) {
  data.forEach(function (card) {
    createCard(card);
  });
}

function createCard(card) {
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

  showMoreBtnWrapper.appendChild(showMoreBtn);
}

let showMoreBtnWrapper = document.createElement("div");
showMoreBtnWrapper.classList.add("button-container");
wrapper.appendChild(showMoreBtnWrapper);

let showMoreBtn = document.createElement("button");
showMoreBtn.classList.add("grid-button");
showMoreBtn.innerText = "показать еще";

showMoreBtn.onclick = () => {
  let to = from + LIMIT;
  getPictures();
  from = to;
};

logo.onclick = () => {
  grid.innerHTML = "";
  location.reload();
};

export { getPictures };
