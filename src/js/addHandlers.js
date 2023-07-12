import { changeModalVisibility, closeReportModal, closeDropdown, closeModal } from "./modals.js";
import { determineAddToDeskClick, determineDropdownClick } from "./delegation.js";
import { className } from "./textConstants.js";
import { appendData, updateData} from "./loadPictures.js";
import { debounce } from "./debounce.js";
import { reloadPage } from "./index.js";

export default function addHandlers() {
  let dropdown = document.querySelector('.' + className.headerDropdownMenu);
  dropdown.onclick = event => determineDropdownClick(event, dropdown);

  let dropdownButton = document.querySelector('.' + className.headerDropdownButton);
  dropdownButton.onclick = event => changeModalVisibility(event, dropdown);
  document.body.onclick = event => closeDropdown(event, dropdown);

  let reportModal = document.querySelector('.' + className.reportModalWrapper);
  reportModal.onclick = event => closeReportModal(event, reportModal);

  let addToDeskWrapper = document.querySelector('.' + className.addToDeskModalWrapper);
  addToDeskWrapper.onclick = event => closeModal(event, addToDeskWrapper);

  let addToDesk = document.querySelector('.' + className.addToDeskModal);
  addToDesk.onclick = event => determineAddToDeskClick(event, addToDeskWrapper);

  let searchInput = document.getElementById("search");
  let debouncedSearchCards = debounce(updateData);
  searchInput.addEventListener("input", debouncedSearchCards);

  let logo = document.querySelector(".header__logo");
  logo.onclick = () => reloadPage();

  let showMoreBtn = document.querySelector(".pagination__button");
  showMoreBtn.onclick = () => appendData();
}