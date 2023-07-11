import { addToStorrage, deleteFromStorrage, setName } from "./localStorrage.js";
import { data, updateData } from "./loadPictures.js";
import { changeModalVisibility } from "./modals.js";

export function addToDesk(event, modal, index) {
  let deskName = `desk_${index}`;
  let card = data.find(el => el.id === modal.getAttribute("id"));
  addToStorrage(deskName, card);
  changeModalVisibility(event, modal);
}

export function changeDesk(event, modal, index) {
  setName("currDesk", index);
  changeModalVisibility(event, modal);
  updateData();
}

export function deleteCardFromDesk(data, currDesk, id) {
  deleteFromStorrage(`desk_${currDesk}`, id);
  let ind = data.findIndex(item => item.id == id);
  data.splice(ind, 1);
  updateData();
}