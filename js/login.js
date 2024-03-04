let loginremember;
let users = [];
let remembereduser = [];

/**
 * Delays the removal of certain classes from specific elements after a certain time period.
 *
 */
function move() {
  setTimeout(() => {
    document.getElementById("logo_container").classList.remove("background");
    document.getElementById("join_logo").classList.remove("background");
    document.getElementById("join_logo2").classList.remove("background");
    document.getElementById("logo_container").classList.remove("big_size");
    document
      .getElementById("join_logo2")
      .classList.remove("join_logo_start_responsiv");
    document
      .getElementById("join_logo2")
      .classList.add("join_logo_start_responsiv2");
  }, 1000);
}


/**
 * Renders the login interface and initializes login listeners.
 */
function renderLogin() {
  document.getElementById("frame-153").innerHTML = renderLoginHTML();
  document.getElementById("frame-156").classList.remove("d-none");
  initializeLoginListeners();
}

/**
 * Asynchronous function for user login.
 *
 * @param {Object} event - The event object triggering the login
 */
async function login(event) {
  await loadUser();
  event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("login_password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  if (user) {
    loginComplete(user);
  } else {
    wrongPassword();
  }
}

/**
 * Function to complete the login process.
 *
 * @param {}
 * @return {}
 */
function loginComplete(user) {
  users = [];
  users.push(user);
  users[0].rememberlogin = loginremember;
  document.getElementById("msgBox").innerHTML = "Successfully logged in";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    saveUsersToLocalStorage();
    window.location.href = "summary.html";
  }, 1500);
}

/**
 * This function handles the case of wrong password entry by modifying the classList of specific elements.
 */
function wrongPassword() {
  document.getElementById("parent_email").classList.add("wrong-password");
  document
    .getElementById("parent_login_password")
    .classList.add("wrong-password");
  document
    .getElementById("wrongPassword")
    .classList.remove("wrong-password-unset");
  document.getElementById("wrongPassword").classList.add("wrong-password-text");
}

/**
 * Resets the wrong password state by removing the "wrong-password" class from specific elements
 */
function resetWrongPassword() {
  document.getElementById("parent_email").classList.remove("wrong-password");
  document
    .getElementById("parent_login_password")
    .classList.remove("wrong-password");
  document
    .getElementById("wrongPassword")
    .classList.remove("wrong-password-text");
  document
    .getElementById("wrongPassword")
    .classList.add("wrong-password-unset");
}

/**
 * Function for handling remembered login.
 *
 */
function rememberMeLogin() {
  if (remembereduser.length > 0 && remembereduser[0].rememberlogin == true) {
    document.getElementById("email").value = remembereduser[0].email;
    document.getElementById("login_password").value =
      remembereduser[0].password;
    loginremember = document.getElementById("signUpCheck").checked =
      remembereduser[0].rememberlogin;
    login(event);
    renderSummary();
  } else {
    renderLogin();
  }
}

/**
 * Logs in a guest user, assigns a random color, saves user data, and redirects to the summary page.
 *
 */
function guestLogin(event) {
  let color = getRandomColor();
  users.push({
    id: 999,
    name: "Guest",
    email: "guest@guest.de",
    password: "hidden",
    initials: "G",
    firstname: "Guest",
    lastname: "",
    color: color,
    rememberlogin: false,
  });
  loginSuccessfull(event);
}

/**
 * Function to handle successful login
 *
 * @param {} - No parameters
 * @return {} - No return value
 */
function loginSuccessfull(event) {
  event.preventDefault();
  document.getElementById("msgBox").innerHTML = "Successfully logged in";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    saveUsersToLocalStorage();
    window.location.href = "summary.html";
  }, 1500);
}

/**
 * Function to log the user out by removing user data from local storage and redirecting to the login page.
 *
 */
function userLogout() {
  document.getElementById("msgBox").innerHTML = "Successfully logged out";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    // document.getElementById("msgBox-bg").classList.add("d-none");
    localStorage.removeItem("users");
    window.location.href = "login.html";
  }, 1500);
}
