import { changeDesk, addToDesk, deleteCardFromDesk } from "./desks.js";
import { changeModalVisibility, createCardModal, createAddToDeskModal } from "./modals.js";
import { className, HTMLText } from "./textConstants.js";

export function determineDropdownClick(event, modal) {
  let deskInd = Number(event.target.innerText.at(-1));
  if (deskInd) {
    changeModalVisibility(event, modal);
    changeDesk(deskInd);
  }
}

export function determineAddToDeskClick(event, modal) {
  let deskInd = Number(event.target.innerText.at(-1));
  if (deskInd) {
    changeModalVisibility(event, modal);
    addToDesk(modal, deskInd);
  }
}

export function determineCardClick(event, card, currDesk) {
  switch (event.target.innerText) {
    case HTMLText.cardModalItems.open:
      createCardModal(card);
      break;
    case HTMLText.cardModalItems.add:
      let addToDeskModal = document.querySelector('.' + className.addToDeskModalWrapper);
      createAddToDeskModal(event, addToDeskModal, card);
      break;
    case HTMLText.cardModalItems.delete:
      deleteCardFromDesk(currDesk, card.id)
      break;
    case HTMLText.cardModalItems.report:
      let reportModal = document.querySelector('.' + className.reportModalWrapper);
      changeModalVisibility(event, reportModal);
      break;
  }
}