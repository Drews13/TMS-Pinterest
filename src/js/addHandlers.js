import { changeModalVisibility, closeReportModal, closeDropdown, closeModal } from "./modals.js";

export default function addHandlers() {
  let dropdown = document.querySelector('.header__dropdown-menu');
  let dropdownButton = document.querySelector('.header__dropdown-item');
  dropdownButton.onclick = (event) => changeModalVisibility(event, dropdown);
  document.body.onclick = (event) => closeDropdown(event, dropdown);

  let reportModal = document.querySelector('.report-modal-wrapper');
  reportModal.onclick = (event) => closeReportModal(event, reportModal);

  let addToDeskModal = document.querySelector('.add-to-desk-modal-wrapper');
  addToDeskModal.onclick = (event) => closeModal(event, addToDeskModal);
}