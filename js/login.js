
// Login-Screen

// document.addEventListener("DOMContentLoaded", function () {
//   const email_div = document.getElementById("parent_email");
//   const email_input = document.getElementById("email");
//   const password_div = document.getElementById("parent_password");
//   const password_input = document.getElementById("password");

//   email_input.addEventListener("blur", function () {
//     // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
//     email_div.classList.remove("aktive");
//   });

//   email_input.addEventListener("focus", function () {
//     // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
//     email_div.classList.add("aktive");
//   });

//   password_input.addEventListener("blur", function () {
//     // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
//     password_div.classList.remove("aktive");
//   });

//   password_input.addEventListener("focus", function () {
//     // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
//     password_div.classList.add("aktive");
//   });
// });


// WIEDER EINKOMMENTIEREN!!!!

// function move() {
//   setTimeout(() => {
//     document.getElementById("logo_container").classList.remove("background");
//     document.getElementById("join_logo").classList.remove("background");
//     document.getElementById("logo_container").classList.remove("big_size");
//   }, 500);
// }


// Register & Login

function registerComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    msgBox = document.getElementById("msgBox");
    msgBox.innerHTML = msg;
  }
  // else display none
}

// let users = [{ email: "max@test.de", password: "test123" }];

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
    renderBody();
  }
}
