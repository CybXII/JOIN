
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
    users.push({ email: email.value, password: password.value });
    // Weiterleitung zu Loginseite + Nachricht anzeigen erfolgreiche Registrierung
    // location.href = "join.html?msg=Du hast Dich erfolgreich registriert!";
  }
  else {
    passwordDontMatch();
  }
}

function passwordDontMatch(){
    document.getElementById("pass-match").classList.remove('d-none');
}