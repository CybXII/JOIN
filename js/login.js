
// Login-Screen
function test() {
  document.addEventListener("DOMContentLoaded", function () {
  const email_div = document.getElementById("parent_email");
  const email_input = document.getElementById("email");
  const password_div = document.getElementById("parent_password");
  const password_input = document.getElementById("password");

  email_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    email_div.classList.remove("aktive");
  });

  email_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    email_div.classList.add("aktive");
  });

  password_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    password_div.classList.remove("aktive");
  });

  password_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    password_div.classList.add("aktive");
  });

  const name_div = document.getElementById("parent_name");
  const name_input = document.getElementById("name");
  const confirm_password_div = document.getElementById("parent_confirm_password");
  const confirm_password = document.getElementById("confirm_password");

  name_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    name_div.classList.remove("aktive");
  });

  name_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    name_div.classList.add("aktive");
  });

  confirm_password.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    confirm_password_div.classList.remove("aktive");
  });

  confirm_password.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    confirm_password_div.classList.add("aktive");
  });
});
}

// WIEDER EINKOMMENTIEREN!!!!

function move() {
  setTimeout(() => {
    document.getElementById("logo_container").classList.remove("background");
    document.getElementById("join_logo").classList.remove("background");
    document.getElementById("logo_container").classList.remove("big_size");
  }, 500);
}


// Register & Login

let users = [{ email: "max@test.de", password: "test123" }];

function addUser() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  users.push({ email: email.value, password: password.value });
  // Weiterleitung zu Loginseite + Nachricht anzeigen erfolgreiche Registrierung
  location.href = "join.html?msg=Registration Complete!";
    
}


function registerComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    msgBox = document.getElementById("msgBox");
    msgBox.innerHTML = msg;
    registerCompleteText();
  }
  // else display none
}


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
  else {
    console.log("Wrong password Ups! Try again.")
    alert("Wrong password Ups! Try again.")
  }
}

// REMOTESTORAGE

let STORAGE_TOKEN = [];
let STORAGE_URL = `https://remote-storage.developerakademie.org/item`;

async function loadToken() {
  let resp = await fetch("../json/token.json");
  token = await resp.json();
  STORAGE_TOKEN.push(token[0]["token"]);
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}
