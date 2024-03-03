let privacyChecker;
let Name;
let email;
let password;
let nameInput;
let lastName;
let initials;
let firstName;
let color;


/**
 * Renders the sign-up form and initializes sign-up listeners.
 */
function renderSignUp() {
  privacyChecker = false;
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  document.getElementById("frame-153").setAttribute("onsubmit", "addUser(event)");
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
  let confirm_password = document.getElementById("confirm_password").value;
  if (password === confirm_password) {
    if (privacyChecker == true) {
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
function acceptPrivacyChecker(){
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
  let confirm_password = document.getElementById("confirm_password").value;
  if (password === confirm_password) {
    document.getElementById("pass-match").classList.add("d-none");
    document.getElementById("parent_password").classList.remove("invalid");
    document.getElementById("parent_confirm_password").classList.remove("invalid");
  }
  if (password !=confirm_password) {
    passwordDontMatch();
  }
}


/**
 * This function handles the case where the passwords do not match. It updates the DOM to reflect the error state and initializes the sign-up listeners.
 */
function passwordDontMatch() {
  document.getElementById("pass-match").classList.remove("d-none");
  document.getElementById("parent_password").classList.add("invalid");
  document.getElementById("parent_confirm_password").classList.add("invalid");
  document.getElementById("confirm_password").setAttribute("onkeyup", "signUpPasswordValidation()");
  document.getElementById("password-su").setAttribute("onkeyup", "signUpPasswordValidation()");
  initializeSignUPListeners();
}


/**
 * Toggles the state of either the login remember or privacy checker based on the input.
 *
 * @param {string} input - the input to determine which checker to toggle
 */
function toogleChecker(input) {
  if (input === "remember") {
    login_remember = !login_remember;
  } else if (input === "privacy") {
    privacyChecker = !privacyChecker;
  }
}


/**
 * Function to handle successful sign up process.
 *
 * @return {Promise} a promise that resolves when the sign up process is completed
 */
async function signUpSuccessfull() {
  await loadUser();
  Name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password-su").value;
  nameInput = document.getElementById("name").value.split(" ");
  lastName;
  initials =nameInput[0][0].toUpperCase() + nameInput[nameInput.length - 1][0].toUpperCase();
  nameInput.length > 1
    ? (lastName = nameInput[nameInput.length - 1])
    : (lastName = "");
  firstName = nameInput[0];
  color = getRandomColor();
  pushNewUser();
}


/**
 * Add a new user to the users array, save the updated users array to local storage, and render the login screen after a 2-second delay.
 *
 * @return {void} 
 */
async function pushNewUser(){
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
  setTimeout(() => {renderLogin();}, 2000);
  users = [];
}
