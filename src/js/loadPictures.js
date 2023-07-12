import { LIMIT } from "./constants.js";
import { regEx } from "./regExprs.js";
import { debounce } from "./debounce.js";

let data = [];
let i = 1;
let a = 1;
let from = 0;
let to;
let grid = document.querySelector(".grid");
let wrapper = document.querySelector(".wrapper");
let logo = document.querySelector(".header__logo");
let searchInput = document.getElementById("search");
let onSearch = false;

async function getPictures() {
  let str = searchInput.value;
  let url = new URL("https://64986c8a9543ce0f49e2064d.mockapi.io/picture");
  if (str.length >= 2) {
    onSearch = true;
    data = [];
    i = 1;
    from = 0;
    grid.innerHTML = "";
    url.searchParams.append("description", str);
    url.searchParams.append("page", a);
    url.searchParams.append("limit", LIMIT);
  }
  if (str.length === 0) {
    onSearch = false;
    a = 1;
    url.searchParams.append("page", i);
    url.searchParams.append("limit", LIMIT);
  }
  if (str.length === 1) {
    showMoreBtn.style.display = "none";
    data = [];
    grid.innerHTML = "";
    return;
  }

  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      data = data.concat(res);
      if (res.length < 12) {
        showMoreBtn.style.display = "none";
        message.style.display = "none";
      }
      if (res.length == 0) {
        message.style.display = "block";
      }
      if (res.length >= 12) {
        showMoreBtn.style.display = "block";
        message.style.display = "none";
      }
    })
    .catch((err) => console.log(err.message));
  if (str.length >= 2) {
    renderPictures(data);
  }
  if (str.length == 0) {
    renderPictures(data.slice(from, to));
  }
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

  grid.appendChild(gridItem);

  showMoreBtnWrapper.appendChild(showMoreBtn);
}

let showMoreBtnWrapper = document.createElement("div");
showMoreBtnWrapper.classList.add("button-container");
wrapper.appendChild(showMoreBtnWrapper);

let showMoreBtn = document.createElement("button");
showMoreBtn.classList.add("grid-button");
showMoreBtn.innerText = "показать еще";

let message = document.createElement("p");
message.classList.add("grid__message");
message.innerText = "ничего не найдено";
showMoreBtnWrapper.appendChild(message);
message.style.display = "none";

showMoreBtn.onclick = () => {
  if (onSearch == true) {
    a++;
  }
  else {
    i++;
    let to = from + LIMIT;
    from = to;
  }
  getPictures();
}

logo.onclick = () => {
  grid.innerHTML = "";
  location.reload();
};

function searchCards() {
  !regEx.test(searchInput.value) ? getPictures() : (searchInput.value = "");
  if (searchInput.value.length === 0) {
    grid.innerHTML = "";
    data = [];
    getPictures();
  }
}

let debouncedSearchCards = debounce(searchCards);

searchInput.addEventListener("input", debouncedSearchCards);

export { getPictures };
