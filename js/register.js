let privacyChecker;
let login_remember = false;
let users = [];

async function addUser(event) {
  event.preventDefault();
  signUpPasswordChecker();
}

async function loadUser() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function signUpSuccessfull() {
  let Name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password-su").value;

  
  users.push({
    name: Name,
    email: email,
    password: password,
  });
  await setItem("users", JSON.stringify(users));
  setTimeout(() => {
    renderLogin();
  }, 2000);
}

async function signUpPasswordChecker() {
  let password = document.getElementById("password-su").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    if (privacyChecker == true) {
      signUpSuccessfull();
      registerCompleteText();
    } else {
    }
  } else {
    passwordDontMatch();
  }
}

function signUpPasswordValidation() {
  let password = document.getElementById("password-su").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    document.getElementById("pass-match").classList.add("d-none");
    document.getElementById("parent_password").classList.remove("invalid");
    document
      .getElementById("parent_confirm_password")
      .classList.remove("invalid");
  }
  // else {
  //   passwordDontMatch();
  // }
}

function passwordDontMatch() {
  document.getElementById("pass-match").classList.remove("d-none");
  document.getElementById("parent_password").classList.add("invalid");
  document.getElementById("parent_confirm_password").classList.add("invalid");
  initializeSignUPListeners();
}

function toogleChecker(input) {
  if (input === "remember") {
    login_remember = !login_remember;
  } else if (input === "privacy") {
    privacyChecker = !privacyChecker;
  }
}

function saveUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(active_user));
}

function loadUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    contacts = JSON.parse(storageAsText);
  }
}