function editNav() {
  var x = document.getElementById("myTopnav");
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

// document.getElementById('form').preventDefault();
// document.getElementById('form')
// function validate() {
  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const quantityInput = document.getElementById("quantity");
  const checkbox1Input = document.getElementById("checkbox1");

  const submitForm = document.querySelector('#reserve');
  submitForm.addEventListener('submit', onSubmit);

  // let errors = false;
function checkFirstName(){
  // Check first name
  if (firstNameInput.value.trim().length < 2) {
    setError(firstNameInput, "Veuillez entrer au moins 2 caractères pour le prénom.");
    return 1;
  } else {
    clearError(firstNameInput);
  }
}

function checkLastName(){
  // Check last name
  if (lastNameInput.value.trim().length < 2) {
    setError(lastNameInput, "Veuillez entrer au moins 2 caractères pour le nom.");
    return 1;
  } else {
    clearError(lastNameInput);
  }
}

function checkEmail(){
  // Check email
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    setError(emailInput, "Veuillez entrer une adresse email valide.");
    return 1;
  } else {
    clearError(emailInput);
  }
}

function checkBirthDate(){
  // Check birthdate
  if (birthdateInput.value == "") {
    setError(birthdateInput, "Veuillez entrer une date de naissance.");
    return 1;
  } else {
    clearError(birthdateInput);
  }
}

function checkQuantity(){
  // Check quantity
  if (quantityInput.value == "") {
    setError(quantityInput, "Veuillez entrer un nombre de tournoi.");
    return 1;
  } else {
    clearError(quantityInput);
  }
}

function checkLocation(){
  // Check location
  const isRadioChecked = document.querySelector('input[name="location"]:checked');
  const radioErrorMessage = document.querySelector(".radioErrorMessage");
  if (!isRadioChecked) {
    radioErrorMessage.parentElement.setAttribute("data-error", true);
    radioErrorMessage.textContent = "Veuillez choisir un tournoi.";
    return 1;
  } else {
    radioErrorMessage.parentElement.setAttribute("data-error", false);
    radioErrorMessage.textContent = "";
  }
}

function checkCheckBox1(){
  // Check checkbox1
  const formData = checkbox1Input.parentElement;
  const checkbox1ErrorMessage = formData.querySelector(".checkbox1ErrorMessage");
  if (!checkbox1Input.checked) {
    checkbox1ErrorMessage.textContent = "Veuillez accepter les conditions d'utilisation.";
    formData.setAttribute("data-error", true);
    return 1;
  } else {
    checkbox1ErrorMessage.textContent = "";
    formData.setAttribute("data-error", false);
  }
}

function validForm(){
  let errors = 0;
  errors += checkFirstName() ?? 0;
  errors += checkLastName() ?? 0;
  errors += checkEmail() ?? 0;
  errors += checkBirthDate() ?? 0;
  errors += checkQuantity() ?? 0;
  errors += checkLocation() ?? 0;
  errors += checkCheckBox1() ?? 0;

  if(errors === 0){
    return true;
  }
}

function onSubmit(event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  if(validForm()){
    const modalbgEnd = document.querySelector(".bgroundEnd");
    const modalCloseEnd = document.querySelector(".closeEnd");
    modalbg.style.display = "none";
    modalbgEnd.style.display = "block";

    modalCloseEnd.addEventListener("click", function() {
      modalbgEnd.style.display = "none";
      document.forms["reserve"].reset();
    });
  }
}
