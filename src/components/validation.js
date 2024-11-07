export function enableValidation({
  formSelector: formSelector,
  inputSelector: inputSelector,
  submitButtonSelector: submitButtonSelector,
  inactiveButtonClass: inactiveButtonClass,
  inputErrorClass: inputErrorClass,
  errorClass: errorClass
}) {

  setEventListeners(formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass);
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
      inputElement.classList.remove(validationConfig.inputErrorClass);
      hideInputError(formElement, inputElement, validationConfig.inputErrorClass);
  });
  formElement.querySelector(validationConfig.submitButtonSelector).classList.remove(validationConfig.inactiveButtonClass);
  
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }
};

const setEventListeners = (formSelector, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass) => {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(form, inputElement, inputErrorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        toggleInputState(inputList, inputElement, inputErrorClass);
      });
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some( function(input) {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function toggleInputState(inputList, inputElement, inputErrorClass) {
  if (hasInvalidInput(inputList)) {
    inputElement.classList.add(inputErrorClass);
  } else {
    inputElement.classList.remove(inputErrorClass);
  }
}