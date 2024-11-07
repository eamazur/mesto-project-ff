export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  modal.querySelector(".popup__close").addEventListener("click", closeOpenedPopup);
  document.addEventListener("keydown", closeModalOnEsc);
  document.addEventListener("mousedown", closeModalOnOverlay);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  
  modal.querySelector(".popup__close").removeEventListener("click", closeOpenedPopup);
  document.removeEventListener("keydown", closeModalOnEsc);
  document.removeEventListener("mousedown", closeModalOnOverlay);
}

function closeOpenedPopup() {
  closeModal(document.querySelector(".popup_is-opened"));
}

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    closeOpenedPopup();
  }
}

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}