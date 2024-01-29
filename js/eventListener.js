let visible=false;


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
      let parentWrapperId = parentWrapper.id;

      if (parentWrapperId === 'parent_password' || parentWrapperId === 'parent_confirm_password'){
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");

        changeLocker(parentWrapperId);
      } 
      else{
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");  
      }
    }
  });
}

function setBlurListener(inputElement){
  inputElement.addEventListener("blur", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");

    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    if (parentWrapper) {
      let parentWrapperId = parentWrapper.id;

      if (parentWrapperId === 'parent_password' || parentWrapperId === 'parent_confirm_password'){
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
          changeLockerPicture(parentWrapperId);
      } 
      else{
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
        }
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

function changeLocker(input){
  if (input === 'confirm_locker'){
    if(visible==false){
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById(input).setAttribute('src', 'img/visibility_off.svg');  
    } else{
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById(input).setAttribute('src', 'img/visibility.svg');  
    }
  }
  else if(input === 'password_locker'){
    if(visible==false){
      document.getElementById(`password`).setAttribute('type','text');
      document.getElementById(input).setAttribute('src', 'img/visibility_off.svg');  
    } else{
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById(input).setAttribute('src', 'img/visibility.svg');  
    }
  }
}

function changeLockerPicture(){
  visible= !visible;
}
