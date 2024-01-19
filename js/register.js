let users = [{ email: "max@test.de", password: "test123" }];

function addUser() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  users.push({ email: email.value, password: password.value });
  // Weiterleitung zu Loginseite + Nachricht anzeigen erfolgreiche Registrierung
  window.location.href = "index.html?msg=Du hast Dich erfolgreich registriert!";
}

function openRegistration() {
  location.href = "./register.html";
}
