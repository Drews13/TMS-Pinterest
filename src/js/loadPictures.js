import { LIMIT } from "./constants.js";
import { getName } from "./localStorrage.js";
import { regEx } from "./regExprs.js";
import { clearGrid, renderPictures, paginationInner } from "./grid.js";

export let data = [];
let page;
let from;
let to;

export async function updateData() {
  data = [];
  page = 1;
  from = 0;
  to = LIMIT;
  clearGrid();
  let currDesk = getName("currDesk");
  if (currDesk) {
    let deskNumber = document.querySelector('.desk-number');
    deskNumber.innerHTML = `Доска ${currDesk}`;
    data = getName(`desk_${currDesk}`);
    let searchInput = document.getElementById('search');
    let str = searchInput.value;
    let temp = (str.length >= 2 && !str.match(regEx)) ? data.filter(el => el.description.includes(str)) : data;
    let result = temp.slice(from, to);
    renderPictures(result, page);
  } else {
    await getPictures();
    renderPictures(data, page);
  }
}

export async function appendData() {
  page++;
  from = to;
  to += LIMIT;
  let currDesk = getName("currDesk");
  if (!currDesk) {
    await getPictures();
  }
  renderPictures(data.slice(from, to), page);
}

async function getPictures() {
  let searchInput = document.getElementById('search');
  let str = searchInput.value;
  let url = new URL("https://64986c8a9543ce0f49e2064d.mockapi.io/picture");
  if (str.length >= 2 && !str.match(regEx)) {
    url.searchParams.append("description", str);
  }
  url.searchParams.append("page", page);
  url.searchParams.append("limit", LIMIT);
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      data = data.concat(res);
    })
    .catch((err) => console.log(err.message));
}
