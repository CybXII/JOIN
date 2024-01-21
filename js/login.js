// Login-Screen

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
  registerCompleteText();
  renderLogin();
}

function login(event){

    // Das Standardverhalten des Formulars unterdrücken
    event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
    renderBody();
  } else {
    console.log("Wrong password Ups! Try again.");
    alert("Wrong password Ups! Try again.");
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
