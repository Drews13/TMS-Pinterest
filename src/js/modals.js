import { className, imgAlt } from "./textConstants.js";

export function changeModalVisibility(event, modal) {
  modal.hidden = !modal.hidden;
  if (event.target.closest('.' + className.headerDropdownButton)) {
    event.stopPropagation();
  } 
}

export function closeDropdown(event, dropdown) {
  if (!event.target.closest('.' + className.headerDropdownMenu) && !dropdown.hidden) {
    changeModalVisibility(event, dropdown);
  }
}

export function closeReportModal(event, modal) {
  if (event.target === modal || event.target.className === className.reportModalButton) {
    let children = modal.children[0].childNodes;
    children.forEach(el => {
      el.checked = false;
    });
    changeModalVisibility(event, modal);
  }
}

export function closeModal(event, modal) {
  if (event.target === modal) {
    changeModalVisibility(event, modal);
  }
}

export function createAddToDeskModal(event, modal, card) {
  modal.setAttribute("id", `${card.id}`);
  changeModalVisibility(event, modal);
}

export function createCardModal(card) {
  let cardModalWrapper = document.createElement("div");
  cardModalWrapper.classList.add(className.cardModalWrapper);
  cardModalWrapper.onclick = (event) => closeModal(event, cardModalWrapper);

  let cardModal = document.createElement("div");
  cardModal.classList.add(className.cardModal);
  cardModalWrapper.appendChild(cardModal);

  let cardImg = document.createElement("img");
  cardImg.classList.add(className.cardModalPicture);
  cardImg.setAttribute("src", `${card.image}`);
  cardImg.setAttribute("alt", imgAlt.image);
  cardModal.appendChild(cardImg);
  
  let cardInfo = document.createElement("div");
  cardInfo.classList.add(className.cardModalInfo);
  cardModal.appendChild(cardInfo);

  let cardDesc = document.createElement("div");
  cardDesc.classList.add(className.cardModalDesc);
  cardInfo.appendChild(cardDesc);

  let pDesc = document.createElement("p");
  pDesc.innerText = card.description;
  cardDesc.appendChild(pDesc);

  let cardAuthor = document.createElement("div");
  cardAuthor.classList.add(className.cardModalAuthor);
  cardInfo.appendChild(cardAuthor);

  let cardAvatar = document.createElement("img");
  cardAvatar.classList.add(className.cardModalAvatar);
  cardAvatar.setAttribute("src", `${card.authorAvatar}`);
  cardAvatar.setAttribute("alt", imgAlt.avatar);
  cardAuthor.appendChild(cardAvatar);

  let cardName = document.createElement("div");
  cardName.classList.add(className.cardModalName);
  cardName.innerText = card.author;
  cardAuthor.appendChild(cardName);

  let appWrapper = document.querySelector('.' + className.appWrapper);
  appWrapper.appendChild(cardModalWrapper);
}