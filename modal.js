// Elements DOM
const firstNameInput = document.getElementById("first"); // Prénom
const lastNameInput = document.getElementById("last"); // Nom
const emailInput = document.getElementById("email"); // email
const birthdateInput = document.getElementById("birthdate"); // Date d'anniversaire
const quantityInput = document.getElementById("quantity"); // Quantité de tournois
const checkbox1Input = document.getElementById("checkbox1"); // Coche des conditions d'utilisation
const submitForm = document.querySelector('#reserve'); // Formulaire
const modalClose = document.querySelector(".close"); // Croix d'annulation de la modale
const modalbg = document.querySelector(".bground"); // Fond de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons de la modale
const modalbgEnd = document.querySelector(".bgroundEnd"); // Page de validation
const modalCloseEnd = document.querySelector(".closeEnd"); // Croix d'annulation de la page de validation
const modalBtnClose = document.querySelector(".btn-close"); // Bouton de la page de validation
const menuIcon = document.querySelector(".fa.fa-bars"); // Menu déroulant en mode tablette/mobile
const btnExport = document.querySelector(".btn-export"); // Bouton Export des données
const showResult = document.getElementById("show-result"); // Texte du résultat


// Evénements
submitForm.addEventListener('submit', onSubmit); // On attend la soumission du formulaire
modalClose.addEventListener("click", resetForm); // On attend un click sur la croix d'annulation de la modale pour la fermer
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // On attend un click sur le bouton d'inscription pour lancer la modale
modalCloseEnd.addEventListener("click", endForm); // On attend 1 click sur la croix de la page de validation pour quitter la modale
modalBtnClose.addEventListener("click", endForm); // On attend 1 click sur le bouton de la page de validation pour quitter la modale
menuIcon.addEventListener("click", editNav); // On attend 1 click sur le bouton du menu de navigation

// Affichage du menu déroulant lors du click sur l'icone de la navbar en mode tablette/mobile
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Annulation du formulaire
function resetForm(){
  clearAllErrors(); // On supprime toutes les erreurs
  document.forms["reserve"].reset(); // On reset le formulaire
  modalbg.style.display = "none"; // On rend invisible la modale
}

// Lancement de la modale
function launchModal() {
  modalbg.style.display = "block"; // On rend visible la modale
}

// Ajout de l'erreur
function setError(input, message) {
  const formData = input.parentElement; // Sélection du parent pour activer le 'data-error'
  const errorMessage = formData.querySelector(".errorMessage");
  formData.setAttribute("data-error", true); // Ajout de l'attribut
  errorMessage.textContent = message; // Ajout du message d'erreur
}

// Suppression de l'erreur
function clearError(input) {
  const formData = input.parentElement; // Sélection du parent pour activer le 'data-error'
  const errorMessage = formData.querySelector(".errorMessage");
  formData.setAttribute("data-error", false); // Ajout de l'attribut
  errorMessage.textContent = ""; // Suppression du message d'erreur
}

// Suppression de toutes les erreurs
function clearAllErrors() {
  const errorAllMessage = document.querySelectorAll(".errorMessage"); // Sélection de tous les messages d'erreur
  errorAllMessage.forEach(msg => {
    msg.parentElement.setAttribute("data-error", false); // Ajout de l'attribut
    msg.textContent = "";  // Suppression du message d'erreur
  });
  
  // Suppression de l'erreur des conditions d'utilisation (checkbox) 
  document.querySelector("#checkbox1").parentElement.setAttribute("data-error", false);
  document.querySelector(".checkbox1ErrorMessage").textContent = "";
  
  // Suppression de l'erreur des bouton radio
  document.querySelector("#blocRadio").parentElement.setAttribute("data-error", false);
  document.querySelector(".radioErrorMessage").textContent = "";
}

// Test du prénom
function checkFirstName(){
  // Test si inférieur à 2 caratères
  if (firstNameInput.value.trim().length < 2) {
    setError(firstNameInput, "Veuillez entrer au moins 2 caractères pour le prénom."); // Si oui, on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    clearError(firstNameInput); // Si non, on supprime l'erreur
    return firstNameInput.value; // et on renvoie la valeur du champs prénom
  }
}

// Test du Nom
function checkLastName(){
  // Test si inférieur à 2 caratères
  if (lastNameInput.value.trim().length < 2) {
    setError(lastNameInput, "Veuillez entrer au moins 2 caractères pour le nom."); // Si oui, on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    // oLastname = lastNameInput.value;
    clearError(lastNameInput); // Si non, on supprime l'erreur
    return lastNameInput.value; // et on renvoie la valeur du champs nom
  }
}

// Test de l'email
function checkEmail(){
  const emailRegex = /^\S+@\S+\.\S+$/; // Condition d'un email valide
  // Test si l'email comporte une erreur
  if (!emailRegex.test(emailInput.value.trim())) {
    setError(emailInput, "Veuillez entrer une adresse email valide."); // Si oui, on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    // oEmail = emailInput.value;
    clearError(emailInput); // Si non, on supprime l'erreur
    return emailInput.value; // et on renvoie la valeur du champs email
  }
}

// Test de la date d'anniversaire
function checkBirthDate(){
  // Test si la date est vide
  if (birthdateInput.value == "") {
    setError(birthdateInput, "Veuillez entrer une date de naissance."); // Si oui, on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    clearError(birthdateInput); // Si non, on supprime l'erreur
    return birthdateInput.value; // et on renvoie la valeur du champs date de naissance
  }
}

// Test de la quantité de tournois éffectués
function checkQuantity(){
  // Test si le champs est vide
  if (quantityInput.value == "") {
    setError(quantityInput, "Veuillez entrer un nombre de tournoi."); // Si oui, on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    clearError(quantityInput); // Si non, on supprime l'erreur
    return quantityInput.value; // et on renvoie la valeur du champs quantité de tournois éffectué
  }
}

// Test de la location (ville des tournois)
function checkLocation(){
  const radioErrorMessage = document.querySelector(".radioErrorMessage"); // Message d'erreur des boutons radio
  const isRadioChecked = document.querySelector('input[name="location"]:checked'); // Bouton radio qui est coché (=null s'il n'y en a pas)
  // On test s'il y a un bouton radio de coché
  if (!isRadioChecked) {
    radioErrorMessage.parentElement.setAttribute("data-error", true); // S'il n'y en a pas, on affiche le message d'erreur
    radioErrorMessage.textContent = "Veuillez choisir un tournoi."; // on affiche le message d'erreur
    return false; // et on renvoie l'état false
  } else {
    // oLocation = isRadioChecked.value;
    radioErrorMessage.parentElement.setAttribute("data-error", false); // On indique dans le HTML qu'il n'y a pas d'erreur
    radioErrorMessage.textContent = ""; // On purge le message d'erreur
    return isRadioChecked.value; // On renvoie la valeur de la location
  }
}

// Test de la 'checkbox1' (conditions d'utilisation)
function checkCheckBox1(){
  const checkbox1Parent = checkbox1Input.parentElement; // Parent de la 'checkbox1' (formData)
  const checkbox1ErrorMessage = checkbox1Parent.querySelector(".checkbox1ErrorMessage"); // Message d'erreur de la 'checkbox1'

  // On test si elle n'est pas cochée'
  if (!checkbox1Input.checked) {
    checkbox1ErrorMessage.textContent = "Veuillez accepter les conditions d'utilisation."; // on affiche le message d'erreur
    checkbox1Parent.setAttribute("data-error", true); // On indique dans le HTML qu'il y a une erreur
    return false; // et on renvoie l'état false
  } else {
    checkbox1Parent.setAttribute("data-error", false); // On indique dans le HTML qu'il n'y a pas d'erreur
    checkbox1ErrorMessage.textContent = ""; // On supprime le message d'erreur
    return "Checked"; // et on renvoie la valeur 'cochée'
  }
}

// Soumission du formulaire
function onSubmit(event) {
  event.preventDefault(); // Empêche la soumission du formulaire
  let oCheckbox2 = "UnChecked"; // Valeur par défaut de la checkbox2

  if(document.querySelector('input[id="checkbox2"]:checked')){ // Si la checkbox2 est cochée
    oCheckbox2="Checked"; // On lui change de valeur
  };

  // Création de l'objet contenant les données de l'utilisateur ou les erreurs
  let resultObject = {
    firstname: checkFirstName(),
    lastname : checkLastName(),
    email: checkEmail(),
    birthdate: checkBirthDate(),
    quantity: checkQuantity(),
    location: checkLocation(),
    checkbox1: checkCheckBox1(),
    checkbox2: oCheckbox2
  }

  // On vérifie que l'objet ne contient pas d'erreur
  if(!Object.values(resultObject).includes(false)){
    modalbg.style.display = "none"; // On rend la modale invisible
    modalbgEnd.style.display = "block"; // et on rend visible la page de validation
  
    showObj(resultObject); // On affiche le résultat dans le HTML

    btnExport.addEventListener("click", function() { // On attend 1 click sur le bouton Export des données
      exportToJsonFile(resultObject, `Export_${resultObject.email}`);
    });
  }
}

// Fermeture ou annulation de la page de validation
function endForm(){ 
  modalbgEnd.style.display = "none"; // On rend invisible la page de validation
  document.forms["reserve"].reset(); // On reset le formulaire
}

// Exporte l'object dans un fichier au format Json
function exportToJsonFile(jsonData, fileName) {
  let dataStr = JSON.stringify(jsonData, null, 2);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
  console.log(fileName);
}

// On affiche l'objet dans le HTML
function showObj(obj){
  showResult.innerHTML = "firstname: " + obj.firstname;
  showResult.innerHTML += "<br>lastname: " + obj.lastname;
  showResult.innerHTML += "<br>email: " + obj.email;
  showResult.innerHTML += "<br>birthdate: " + obj.birthdate;
  showResult.innerHTML += "<br>quantity: " + obj.quantity;
  showResult.innerHTML += "<br>location: " + obj.location;
  showResult.innerHTML += "<br>checkbox1: " + obj.checkbox1;
  showResult.innerHTML += "<br>checkbox2: " + obj.checkbox2;
}
