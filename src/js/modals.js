export function changeModalVisibility(event, modal) {
  modal.hidden = !modal.hidden;
  event.stopPropagation();
}

export function closeDropdown(event, dropdown) {
  if (!event.target.closest(".header__dropdown-menu") && !dropdown.hidden) {
    changeModalVisibility(event, dropdown);
  }
}

export function closeReportModal(event, modal) {
  if (event.target === modal || event.target.className === 'report-modal__button') {
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

export function createCardModal(card) {
  let cardModalWrapper = document.createElement("div");
  cardModalWrapper.classList.add("card-modal-wrapper");
  cardModalWrapper.onclick = (event) => closeModal(event, cardModalWrapper);

  let cardModal = document.createElement("div");
  cardModal.classList.add("card-modal");
  cardModalWrapper.appendChild(cardModal);

  let cardImg = document.createElement("img");
  cardImg.classList.add("card-modal__pic");
  cardImg.setAttribute("src", `${card.image}`);
  cardImg.setAttribute("alt", "image");
  cardModal.appendChild(cardImg);
  
  let cardInfo = document.createElement("div");
  cardInfo.classList.add("card-modal__info");
  cardModal.appendChild(cardInfo);

  let cardDesc = document.createElement("div");
  cardDesc.classList.add("card-modal__desc");
  cardInfo.appendChild(cardDesc);

  let pDesc = document.createElement("p");
  pDesc.innerText = card.description;
  cardDesc.appendChild(pDesc);

  let cardAuthor = document.createElement("div");
  cardAuthor.classList.add("card-modal__author");
  cardInfo.appendChild(cardAuthor);

  let cardAvatar = document.createElement("img");
  cardAvatar.classList.add("card-modal__avatar");
  cardAvatar.setAttribute("src", `${card.authorAvatar}`);
  cardAvatar.setAttribute("alt", "avatar");
  cardAuthor.appendChild(cardAvatar);

  let cardName = document.createElement("div");
  cardName.classList.add("card-modal__name");
  cardName.innerText = card.author;
  cardAuthor.appendChild(cardName);

  let appWrapper = document.querySelector('.wrapper');
  appWrapper.appendChild(cardModalWrapper);
}