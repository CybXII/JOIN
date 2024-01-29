function initializeLoginListeners() {
  // Finde die Input-Elemente
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");
  // Füge Event Listener für das Fokusevent hinzu
  [emailInput, passwordInput].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}

function setFocusListener(inputElement){
  inputElement.addEventListener("focus", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
  
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    if (parentWrapper) {
      parentWrapper.classList.add("aktive");
      parentWrapper.classList.remove("invalid");
    }
  });
}

function setBlurListener(inputElement){
  inputElement.addEventListener("blur", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");

    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    if (parentWrapper) {
      parentWrapper.classList.remove("aktive");
      parentWrapper.classList.remove("invalid");
    }
  });
}

function initializeSignUPListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    // Initialisiere die Event Listener
  });
  // Finde die Input-Elemente
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password-su");
  let confirm_password = document.getElementById("confirm_password");

  // Füge Event Listener für das Fokusevent hinzu
  [ emailInput, 
    passwordInput, 
    nameInput, 
    confirm_password
  ].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}



