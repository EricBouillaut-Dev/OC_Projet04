function editNav() {
  var x = document.getElementById("myTopnav");
  console.log(x.classname);
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function resetForm(){
  // On supprime tous les textes erreurs (rouge)
  clearAllErrors();

  // On remet à 0 tous les champs du formulaire
  document.forms["reserve"].reset();

  // On re-cache le modal
  modalbg.style.display = "none";
}

// On attend un click sur le bouton de fermeture du modal
const modalClose = document.querySelector(".close");
modalClose.addEventListener("click", resetForm);

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function setError(input, message) {
  const formData = input.parentElement;
  const errorMessage = formData.querySelector(".errorMessage");
  errorMessage.textContent = message;
  formData.setAttribute("data-error", true);
}

function clearError(input) {
  const formData = input.parentElement;
  const errorMessage = formData.querySelector(".errorMessage");
  formData.setAttribute("data-error", false);
  errorMessage.textContent = "";
}

function clearAllErrors() {
  const errorAllMessage = document.querySelectorAll(".errorMessage");
  errorAllMessage.forEach(msg => {
    msg.parentElement.setAttribute("data-error", false);
    msg.textContent = "";
  });

  document.querySelector("#checkbox1").parentElement.setAttribute("data-error", false);
  document.querySelector(".checkbox1ErrorMessage").textContent = "";
  
  document.querySelector("#blocRadio").parentElement.setAttribute("data-error", false);
  document.querySelector(".radioErrorMessage").textContent = "";

}


function validate() {
  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const quantityInput = document.getElementById("quantity");
  const checkbox1Input = document.getElementById("checkbox1");

  let errors = false;

  // Check first name
  if (firstNameInput.value.trim().length < 2) {
    setError(firstNameInput, "Veuillez entrer au moins 2 caractères pour le prénom.");
    errors = true;
  } else {
    clearError(firstNameInput);
  }

  // Check last name
  if (lastNameInput.value.trim().length < 2) {
    setError(lastNameInput, "Veuillez entrer au moins 2 caractères pour le nom.");
    errors = true;
  } else {
    clearError(lastNameInput);
  }

  // Check email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    setError(emailInput, "Veuillez entrer une adresse email valide.");
    errors = true;
  } else {
    clearError(emailInput);
  }

  // Check birthdate
  if (birthdateInput.value == "") {
    setError(birthdateInput, "Veuillez entrer une date de naissance.");
    errors = true;
  } else {
    clearError(birthdateInput);
  }

  // Check quantity
  if (quantityInput.value == "") {
    setError(quantityInput, "Veuillez entrer un nombre de tournoi.");
    errors = true;
  } else {
    clearError(quantityInput);
  }

  // Check location
  const isRadioChecked = document.querySelector('input[name="location"]:checked');
  const radioErrorMessage = document.querySelector(".radioErrorMessage");
  console.log(radioErrorMessage.parentElement)
  if (!isRadioChecked) {
    radioErrorMessage.parentElement.setAttribute("data-error", true);
    // radioErrorMessage.parentElement.parentElement.setAttribute("data-error", true);
    radioErrorMessage.textContent = "Veuillez choisir un tournoi.";
    errors = true;
  } else {
    radioErrorMessage.parentElement.setAttribute("data-error", false);
    // radioErrorMessage.parentElement.parentElement.setAttribute("data-error", false);
    radioErrorMessage.textContent = "";
  }
  
  // Check checkbox1
  const formData = checkbox1Input.parentElement;
  const checkbox1ErrorMessage = formData.querySelector(".checkbox1ErrorMessage");
  if (!checkbox1Input.checked) {
    checkbox1ErrorMessage.textContent = "Veuillez accepter les conditions d'utilisation.";
    formData.setAttribute("data-error", true);
    errors = true;
  } else {
    checkbox1ErrorMessage.textContent = "";
    formData.setAttribute("data-error", false);
    // clearError(checkbox1Input);
  }

  return !errors;
}
