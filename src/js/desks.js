import { addToStorrage, deleteFromStorrage, setName } from "./localStorrage.js";
import { data, updateData } from "./loadPictures.js";
import { localStorageNames } from "./textConstants.js";

export function addToDesk(modal, index) {
  let deskName = localStorageNames.desk + index;
  let card = data.find(el => el.id === modal.getAttribute("id"));
  addToStorrage(deskName, card);
}

export function changeDesk(index) {
  setName(localStorageNames.currDesk, index);
  updateData();
}

export function deleteCardFromDesk(currDesk, id) {
  let deskName = localStorageNames.desk + currDesk;
  deleteFromStorrage(deskName, id);
  let ind = data.findIndex(item => item.id == id);
  data.splice(ind, 1);
  updateData();
}