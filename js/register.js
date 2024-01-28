let privacyChecker;

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

function setChecker(input) {
  let checker = `${input}Check`;
  document.getElementById(checker).classList.remove("checkbox");
  document.getElementById(checker).classList.add("checkbox_active");
  document
    .getElementById(checker)
    .setAttribute("onclick", `resetChecker("${input}")`);
  privacyChecker = !privacyChecker;
}

function resetChecker(input) {
  let checker = `${input}Check`;
  document.getElementById(checker).classList.remove("checkbox_active");
  document.getElementById(checker).classList.add("checkbox");
  document
    .getElementById(checker)
    .setAttribute("onclick", `setChecker("${input}")`);
  privacyChecker = !privacyChecker;
}
