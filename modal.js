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
  // On supprime les bord rouge des champs avec des erreurs
  const cleanBorder = document.querySelectorAll(".text-control");
  cleanBorder.forEach(border => border.removeAttribute('style'));

  // On remet à 0 tous les champs du formulaire
  document.forms["reserve"].reset();
 
  // On supprime tous les textes des erreurs
  clearAllErrors();

  // On re-cache le modal
  modalbg.style.display = "none";
}



// On récupère le formulaire
// function validate(){
  
//   function checkError(id){
//     let inputText = document.getElementById(id).value;
//     const firstAttrib = document.querySelector(`input[id="${id}"]`).parentElement;
//     if(id === "first" || id === "last"){
//       if(inputText.length < 2){firstAttrib.setAttribute('data-error-visible','true');}
//       else{firstAttrib.removeAttribute('data-error-visible');};
//     };
    
//   };
  
//   checkError ("first");
//   checkError ("last");
  

  // let first = document.getElementById("first").value
  // const firstAttrib = document.querySelector('input[id="first"]').parentElement;
  // if(first.length < 2){
  //   firstAttrib.setAttribute('data-error-visible','true');
  // }
  // else{
  //   firstAttrib.removeAttribute('data-error-visible');
  // }
  
  // ;



  // On récupère la location (ville) choisie

// try{
//   const test = document.querySelector('input[name="location"]:checked').value;
//   console.log(test);

// }
// catch(err){

//   console.error(err)

// }


  // On regroupe les résultats du formulaire dans un objet
//   let modalResult = {
//     first: document.getElementById("first").value,
//     last: document.getElementById("last").value,
//     email: document.getElementById("email").value,
//     birthdate: document.getElementById("birthdate").value,
//     quantity: document.getElementById("quantity").value,
//     // location: locationChecked,
//     acceptCondition: document.getElementById("checkbox1").checked,
//     nextEvent: document.getElementById("checkbox2").checked
//   }

//   // console.log(modalResult);
//   return false
// }

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



// formData.forEach(inputText => {
//   inputText.
// }
//   )


// document.querySelectorAll(".formData[data-error] input").forEach(CheckInput => {
//   console.log(CheckInput.id);
//   CheckInput.addEventListener("input", () => CheckInput.parentElement.setAttribute('data-error-visible="true"'));
// });

// Récupère tous les éléments avec la classe 'formData'



// gpt1
// const formFields = document.querySelectorAll('.formData');

// function checkErrors() {
//   let errors = false;
  
//   // Parcourt tous les champs du formulaire
//   formFields.forEach(field => {
//     const input = field.querySelector('input');
//     const value = input.value.trim();
    
//     console.log(input);
//     console.log('value: ' +value);
    
//     // Vérifie si le champ est vide ou ne respecte pas les conditions de validation
//     if (value === '' || (input.dataset.validation && new RegExp(input.dataset.validation).test(value))) {
//       field.dataset.errorVisible = true; // Stocke l'information d'erreur
//       errors = true; // Marque le formulaire comme contenant des erreurs
//     } else {
//       field.dataset.errorVisible = false; // Masque l'information d'erreur
//     }
//   });
  
//   return !errors; // Renvoie 'true' si le formulaire ne contient pas d'erreurs
// }

// function onSubmit(event) {
//   event.preventDefault(); // Empêche la soumission du formulaire
  
//   if (checkErrors()) {
//     // Les champs du formulaire sont valides, vous pouvez maintenant soumettre le formulaire
//     // ...
//   }
// }

// // Ajoute un gestionnaire d'événements sur le formulaire pour intercepter la soumission
// const form = document.querySelector('#reserve');
// form.addEventListener('submit', onSubmit);

// gpt2:
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
  
  
  document.querySelector("#blocRadio").parentElement.setAttribute("data-error", false);
  document.querySelector(".radioErrorMessage").textContent = "";

}


function validate() {
  const firstNameInput = document.getElementById("first");
  const lastNameInput = document.getElementById("last");
  const emailInput = document.getElementById("email");
  const birthdateInput = document.getElementById("birthdate");
  const quantityInput = document.getElementById("quantity");
  // const locationInputs = document.querySelectorAll('input[name="location"]');
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
  try{
  if (!isRadioChecked) {
    radioErrorMessage.parentElement.setAttribute("data-error", true);
    radioErrorMessage.parentElement.parentElement.setAttribute("data-error", true);
    radioErrorMessage.textContent = "Veuillez choisir un tournoi.";
    errors = true;
  } else {
    radioErrorMessage.parentElement.setAttribute("data-error", false);
    radioErrorMessage.parentElement.parentElement.setAttribute("data-error", false);
    radioErrorMessage.textContent = "";
  }
  }
  catch(err){
    console.log(err);
  }
  
  
  
  
  
  // let locationChecked = false;
  // locationInputs.forEach((input) => {
  //   if (input.checked) {
  //     locationChecked = true;
  //   }
  // });

  // if (!locationChecked) {
  //   const locationErrorMessage = document.querySelector("#locationErrorMessage");
  //   locationErrorMessage.textContent = "Veuillez choisir une option.";
  //   locationErrorMessage.parentElement.setAttribute("data-error", true);
  //   locationErrorMessage.parentElement.setAttribute("data-error-visible", true);
  //   errors = true;
  // } else {
  //   const locationErrorMessage = document.querySelector("#locationErrorMessage");
  //   locationErrorMessage.textContent = "";
  //   locationErrorMessage.parentElement.setAttribute("data-error", false);
  //   locationErrorMessage.parentElement.setAttribute("data-error-visible", false);
  // }

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


// if (!checkbox1Input.checked) {
//     const checkbox1ErrorMessage = document.querySelector("#checkbox1ErrorMessage");
//     checkbox1ErrorMessage.textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
//     checkbox1ErrorMessage.parentElement.setAttribute("data-error", true);
//     checkbox1ErrorMessage.parentElement.setAttribute("data-error-visible", true);
//     errors = true;
//   } else {
//     const checkbox1ErrorMessage = document.querySelector("#checkbox1ErrorMessage");
//     checkbox1ErrorMessage.textContent = "";
//     checkbox1ErrorMessage.parentElement.setAttribute("data-error", false);
//     checkbox1ErrorMessage.parentElement.setAttribute("data-error-visible", false);
//   }
console.log(errors);

return !errors;

  // Return true if no errors, false otherwise
  // return !errors;
}
