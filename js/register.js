let privacyChecker;

function renderSignUp() {
  privacyChecker = false;
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  document
    .getElementById("frame-153")
    .setAttribute("onsubmit", "addUser(event)");
  initializeSignUPListeners();
}

async function addUser(event) {
  event.preventDefault();
  signUpPasswordChecker();
}

async function signUpPasswordChecker() {
  let password = document.getElementById("password-su").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    if (privacyChecker == true) {
      await signUpSuccessfull();
      registerCompleteText();
    } else {
    }
  } else {
    passwordDontMatch();
  }
}

function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    renderLogin();
  }, 2000);
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

async function signUpSuccessfull() {
  await loadUser();
  let Name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password-su").value;
  let nameInput = document.getElementById("name").value.split(" ");
  let lastName;
  let initials =
    nameInput[0][0].toUpperCase() +
    nameInput[nameInput.length - 1][0].toUpperCase();
  nameInput.length > 1
    ? (lastName = nameInput[nameInput.length - 1])
    : (lastName = "");
  let firstName = nameInput[0];
  let color = getRandomColor();

  users.push({
    id: users.length,
    name: Name,
    email: email,
    password: password,
    initials: initials,
    firstName: firstName,
    lastName: lastName,
    color: color,
    rememberlogin: false,
  });
  await setItem("users", JSON.stringify(users));
  setTimeout(() => {
    renderLogin();
  }, 2000);
  users = [];
}
