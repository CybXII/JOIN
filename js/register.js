let privacyChecker = false;
let login_remember = false;

function addUser(event) {
  event.preventDefault();
  // let email = document.getElementById("email");
  // let password = document.getElementById("password");
  signUpPasswordChecker();
}

function signUpPasswordChecker() {
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    if (privacyChecker == true){
    
    users.push({ email: email.value, password: password.value });
    // Weiterleitung zu Loginseite + Nachricht anzeigen erfolgreiche Registrierung
    registerCompleteText();
    }
    else {
        
    }
  } else {
    passwordDontMatch();
  }
}

function passwordDontMatch() {
  document.getElementById("pass-match").classList.remove("d-none");
}

function toogleChecker(input) {
  if (input === 'remember'){
    login_remember= !login_remember;
  }
  else if(input === 'privacy'){
    privacyChecker = !privacyChecker;
  }
}
