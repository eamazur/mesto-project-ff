export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  modal.querySelector(".popup__close").addEventListener("click", closeModalOnButton);
  document.addEventListener("keydown", closeModalOnEsc);
  document.addEventListener("mousedown", closeModalOnOverlay);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  
  modal.querySelector(".popup__close").removeEventListener("click", closeModalOnButton);
  document.removeEventListener("keydown", closeModalOnEsc);
  document.removeEventListener("mousedown", closeModalOnOverlay);
}

function closeModalOnButton() {
  closeModal(document.querySelector(".popup_is-opened"));
}

function closeModalOnEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function fillDefaultValues(modal) {
  const nameInput = modal.querySelector('[name="name"]');
  const jobInput = modal.querySelector('[name="description"]');

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
}
