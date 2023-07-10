import { changeModalVisibility } from "./modals.js";

export default function addHandlers() {
  let dropdown = document.querySelector('.header__dropdown-menu');
  let dropdownButton = document.querySelector('.header__dropdown-item');
  dropdownButton.onclick = () => changeModalVisibility(dropdown);

  
}