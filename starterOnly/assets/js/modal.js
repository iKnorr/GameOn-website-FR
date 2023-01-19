function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const formId = document.getElementById("form-id");
const modalBody = document.querySelector(".modal-body");
const confirmationBody = document.querySelector(".confirmation-body");
const closeConfirmationBtn = document.querySelector(".btn-close");
const submitBtn = document.querySelector(".btn-submit");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthday = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const radioButtons = document.getElementsByName("location");
const checkbox1 = document.getElementById("checkbox1");

// Validation Function
const validation = (condition, childEl, errorMsg) => {
  if (condition) {
    childEl.parentElement.setAttribute("data-error-visible", "true");
    childEl.parentElement.setAttribute("data-error", errorMsg);
    return false;
  }
  childEl.parentElement.setAttribute("data-error-visible", "");
  childEl.parentElement.setAttribute("data-error", "");
  return true;
};

// check length of first and last name
const isBetween = (length, min) => (length < min ? false : true);

// Name Validation
const checkName = (name, childEl) => {
  const min = 2;
  const userName = name.value.trim();
  return validation(
    !isBetween(userName.length, min),
    childEl,
    "Veuillez entrer 2 caractères ou plus pour ce champ."
  );
};

// Email validation
const emailValidation = (email) => {
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validation(
    !email.value.match(regexEmail),
    email,
    "Votre address email est invalide."
  );
};

// Birtday validation
const birtdayValidation = (birthday) => {
  return validation(
    birthday.value === "",
    birthday,
    "Vous devez entrer votre date de naissance."
  );
};

// Check Quantity of Tourneys
const checkQuantityTourneys = (quantity) => {
  // const regexQuantity = /^[0-9]*$/;
  return validation(
    quantity.value === "",
    quantity,
    "Veuillez saisir une valeur numérique valide."
  );
};

// Check if Location is selected
const checkRadioButtons = () => {
  let valid = false;
  for (const btn of radioButtons) {
    if (!btn.checked) {
      btn.parentElement.setAttribute("data-error-visible", "true");
      btn.parentElement.setAttribute(
        "data-error",
        "Veuillez cocher un tournoi."
      );
    } else {
      btn.parentElement.setAttribute("data-error-visible", "");
      btn.parentElement.setAttribute("data-error", "");
      valid = true;
      break;
    }
  }
  return valid;
};

// General Conditions Checked
const checkGeneralConditions = (childElement) => {
  let valid = false;
  if (!checkbox1.checked) {
    childElement.parentElement.setAttribute("data-error-visible", "true");
    childElement.parentElement.setAttribute(
      "data-error",
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
  } else {
    childElement.parentElement.setAttribute("data-error-visible", "");
    childElement.parentElement.setAttribute("data-error", "");
    valid = true;
  }
  return valid;
};

// Form submit
formId.addEventListener("submit", function (e) {
  e.preventDefault();

  let isFirstNameValid = checkName(firstName, firstName);
  let isLastNameValid = checkName(lastName, lastName);
  let isEmailValid = emailValidation(email);
  let isBirthdayValid = birtdayValidation(birthday);
  let isQuantityValid = checkQuantityTourneys(quantity);
  let isLocationChecked = checkRadioButtons();
  let isGeneralConditionsChecked = checkGeneralConditions(checkbox1);

  let isFormValid =
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isBirthdayValid &&
    isQuantityValid &&
    isLocationChecked &&
    isGeneralConditionsChecked;

  if (isFormValid) {
    modalBody.style.display = "none";
    confirmationBody.style.display = "flex";
  }
});

// close confirmation
closeConfirmationBtn.addEventListener("click", closeModal);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close MODAL Button
closeBtn.addEventListener("click", closeModal);

// close modal on click outside of form
window.addEventListener("click", function (e) {
  if (e.target.className === "bground") {
    closeModal();
  }
});

// close modal on with escape key
window.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}
