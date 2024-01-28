let privacyChecker;
let login_remember = false;
let active_user = [];

async function addUser(event) {
  let Name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password-su").value;

  event.preventDefault();
  signUpPasswordChecker();
  active_user.push({
    name: Name,
    email: email,
    password: password,
  });
  await setItem("active_user", JSON.stringify(active_user));
}

async function loadUser() {
  try {
    active_user = JSON.parse(await getItem("active_user"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function signUpPasswordChecker() {
  let password = document.getElementById("password-su").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    if (privacyChecker == true) {
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
  } else {
    passwordDontMatch();
  }
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
