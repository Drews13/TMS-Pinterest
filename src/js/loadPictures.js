import { LIMIT, connectionStr, hidePreloaderTime } from "./constants.js";
import { getName } from "./localStorrage.js";
import { regEx } from "./regExprs.js";
import { clearGrid, renderPictures} from "./grid.js";
import { className, localStorageNames, HTMLText } from "./textConstants.js";
import { hidePreloader, showPreloader } from "./utils.js";

export let data = [];
let page;
let from;
let to;

export async function updateData() {
  showPreloader();
  data = [];
  page = 1;
  from = 0;
  to = LIMIT;
  clearGrid();
  let currDesk = getName(localStorageNames.currDesk);
  if (currDesk) {
    let deskNumber = document.querySelector('.' + className.deskNumber);
    deskNumber.innerHTML = HTMLText.deskNumber + currDesk;
    data = getName(localStorageNames.desk + currDesk);
    let searchInput = document.getElementById(className.search);
    let str = searchInput.value;
    let temp = (str.length >= 2 && !str.match(regEx)) ? data.filter(el => el.description.includes(str)) : data;
    let result = temp.slice(from, to);
    renderPictures(result, page);
  } else {
    await getPictures();
    renderPictures(data, page);
  }
  hidePreloader(hidePreloaderTime);
}

export async function appendData() {
  showPreloader();
  page++;
  from = to;
  to += LIMIT;
  let currDesk = getName(localStorageNames.currDesk);
  if (!currDesk) {
    await getPictures();
  }
  renderPictures(data.slice(from, to), page);
  hidePreloader(hidePreloaderTime);
}

async function getPictures() {
  let searchInput = document.getElementById(className.search);
  let str = searchInput.value;
  let url = new URL(connectionStr);
  if (str.length >= 2 && !str.match(regEx)) {
    url.searchParams.append("search", str);
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
