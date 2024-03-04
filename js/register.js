let privacychecker;
let fullname;
let email;
let password;
let nameinput;
let lastname;
let initials;
let firstname;
let color;

/**
 * Renders the sign-up form and initializes sign-up listeners.
 */
function renderSignUp() {
  privacychecker = false;
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  document
    .getElementById("frame-153")
    .setAttribute("onsubmit", "addUser(event)");
  initializeSignUPListeners();
}

/**
 * Asynchronously adds a user.
 *
 * @param {Event} event - the event triggering the function
 * @return {Promise} a promise representing the completion of the user addition
 */
async function addUser(event) {
  event.preventDefault();
  signUpPasswordChecker();
}

/**
 * Asynchronous function for checking the validity of the password during the sign-up process.
 *
 */
async function signUpPasswordChecker() {
  let password = document.getElementById("password-su").value;
  let confirmpassword = document.getElementById("confirmpassword").value;
  if (password === confirmpassword) {
    if (privacychecker == true) {
      await signUpSuccessfull();
      registerCompleteText();
    } else {
      acceptPrivacyChecker();
    }
  } else {
    passwordDontMatch();
  }
}

/**
 * Function to accept privacy checker
 *
 */
function acceptPrivacyChecker() {
  document.getElementById("privacybox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("privacybox-bg").classList.add("d-none");
  }, 2000);
}

/**
 * Function to register complete text.
 *
 */
function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    renderLogin();
  }, 2000);
}

/**
 * Function to validate sign-up password and confirm password.
 *
 */
function signUpPasswordValidation() {
  let password = document.getElementById("password-su").value;
  let confirmpassword = document.getElementById("confirmpassword").value;
  if (password === confirmpassword) {
    document.getElementById("pass-match").classList.add("d-none");
    document.getElementById("parent_password").classList.remove("invalid");
    document
      .getElementById("parent_confirmpassword")
      .classList.remove("invalid");
  }
  if (password != confirmpassword) {
    passwordDontMatch();
  }
}

/**
 * This function handles the case where the passwords do not match. It updates the DOM to reflect the error state and initializes the sign-up listeners.
 */
function passwordDontMatch() {
  document.getElementById("pass-match").classList.remove("d-none");
  document.getElementById("parent_password").classList.add("invalid");
  document.getElementById("parent_confirmpassword").classList.add("invalid");
  document
    .getElementById("confirmpassword")
    .setAttribute("onkeyup", "signUpPasswordValidation()");
  document
    .getElementById("password-su")
    .setAttribute("onkeyup", "signUpPasswordValidation()");
  initializeSignUPListeners();
}

/**
 * Toggles the state of either the login remember or privacy checker based on the input.
 *
 * @param {string} input - the input to determine which checker to toggle
 */
function toogleChecker(input) {
  if (input === "remember") {
    loginremember = !loginremember;
  } else if (input === "privacy") {
    privacychecker = !privacychecker;
  }
}

/**
 * Function to handle successful sign up process.
 *
 * @return {Promise} a promise that resolves when the sign up process is completed
 */
async function signUpSuccessfull() {
  await loadUser();
  fullname = document.getElementById("name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password-su").value;
  nameinput = document.getElementById("name").value.split(" ");
  lastname;
  initials =
    nameinput[0][0].toUpperCase() +
    nameinput[nameinput.length - 1][0].toUpperCase();
  nameinput.length > 1
    ? (lastname = nameinput[nameinput.length - 1])
    : (lastname = "");
  firstname = nameinput[0];
  color = getRandomColor();
  pushNewUser();
}

/**
 * Add a new user to the users array, save the updated users array to local storage, and render the login screen after a 2-second delay.
 *
 * @return {void}
 */
async function pushNewUser() {
  users.push({
    id: users.length,
    name: fullname,
    email: email,
    password: password,
    initials: initials,
    firstname: firstname,
    lastname: lastname,
    color: color,
    rememberlogin: false,
  });
  await setItem("users", JSON.stringify(users));
  setTimeout(() => {
    renderLogin();
  }, 2000);
  users = [];
}
