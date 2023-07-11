import { changeModalVisibility, closeReportModal, closeDropdown, closeModal } from "./modals.js";
import { addToDesk, changeDesk } from "./desks.js";

export default function addHandlers() {
  let dropdown = document.querySelector('.header__dropdown-menu');
  let dropdownItems = dropdown.querySelectorAll(".modal-click-item");
  dropdownItems[0].onclick = event => changeDesk(event, dropdown, 1);
  dropdownItems[1].onclick = event => changeDesk(event, dropdown, 2);
  dropdownItems[2].onclick = event => changeDesk(event, dropdown, 3);

  let dropdownButton = document.querySelector('.header__dropdown-item');
  dropdownButton.onclick = event => changeModalVisibility(event, dropdown);
  document.body.onclick = event => closeDropdown(event, dropdown);

  let reportModal = document.querySelector('.report-modal-wrapper');
  reportModal.onclick = event => closeReportModal(event, reportModal);

  let addToDeskModal = document.querySelector('.add-to-desk-modal-wrapper');
  addToDeskModal.onclick = event => closeModal(event, addToDeskModal);

  let desks = addToDeskModal.querySelectorAll(".modal-click-item");
  desks[0].onclick = event => addToDesk(event, addToDeskModal, 1);
  desks[1].onclick = event => addToDesk(event, addToDeskModal, 2);
  desks[2].onclick = event => addToDesk(event, addToDeskModal, 3);
}