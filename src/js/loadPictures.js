import { LIMIT } from "./constants.js";

let data = [];
let i = 0;
let a = 1;
let from = 0;
let to;
let grid = document.querySelector(".grid");
let wrapper = document.querySelector(".wrapper");
let logo = document.querySelector(".header__logo");
let searchInput = document.getElementById("search");
let onSearch = false;

async function searchPictures() {
  let str = searchInput.value;
  let searchData = [];
  if (str.length >= 2 && str != " ") {
    onSearch = true;
    grid.innerHTML = "";
    let url = new URL("https://64986c8a9543ce0f49e2064d.mockapi.io/picture");
    url.searchParams.append("page", a);
    url.searchParams.append("limit", LIMIT);
    url.searchParams.append("description", str);
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        searchData = res;
      })
      .catch((err) => console.log(err.message));
    renderPictures(searchData);
    if (searchData.length < 12) {
      showMoreBtn.style.display = "none";
    }
    if (searchData.length === 0) {
      message.style.display = "block";
    } else {
      message.style.display = "none";
    }
  }
  if (str.length < 2) {
    onSearch = false;
    searchData = [];
    grid.innerHTML = "";
    a = 1;
    message.style.display = "none";
    showMoreBtn.style.display = "block";
    renderPictures(data);
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
  if (data.length === 100) {
    showMoreBtn.style.display = "none";
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
    searchPictures();
  }
  if (onSearch == false) {
    let to = from + LIMIT;
    from = to;
    getPictures();
  }
};

logo.onclick = () => {
  grid.innerHTML = "";
  location.reload();
};

searchInput.addEventListener("input", searchPictures);

export { getPictures };
