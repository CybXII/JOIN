let login_remember;
let users = [];
let remembered_user = [];


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
    loginComplete(user)
  }
  else {
    wrongPassword();
  }
}

function loginComplete(){
  users = [];
  users.push(user);
  users[0].rememberlogin = login_remember;
  saveUsersToLocalStorage();
  window.location.href = "summary.html";
}

function wrongPassword(){
  document.getElementById("parent_email").classList.add("wrong-password");
  document.getElementById("parent_login_password").classList.add("wrong-password");
  document.getElementById("wrongPassword").classList.remove("wrong-password-unset");
  document.getElementById("wrongPassword").classList.add("wrong-password-text");
}

function resetWrongPassword(){
  document.getElementById("parent_email").classList.remove("wrong-password");
  document.getElementById("parent_login_password").classList.remove("wrong-password");
   document.getElementById("wrongPassword").classList.remove("wrong-password-text");
  document.getElementById("wrongPassword").classList.add("wrong-password-unset");
}

/**
 * Function for handling remembered login.
 *
 */
function rememberMeLogin() {
  if (remembered_user.length > 0 && remembered_user[0].rememberlogin == true) {
    document.getElementById("email").value = remembered_user[0].email;
    document.getElementById("login_password").value =
      remembered_user[0].password;
    login_remember = document.getElementById("signUpCheck").checked =
      remembered_user[0].rememberlogin;
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
function guestLogin() {
  let color = getRandomColor();
  users.push({
    id: 999,
    name: "Guest",
    email: "guest@guest.de",
    password: "hidden",
    initials: "G",
    firstName: "Guest",
    lastName: "",
    color: color,
    rememberlogin: false,
  });
  saveUsersToLocalStorage();
  window.location.href = "summary.html";
}


/**
 * Function to log the user out by removing user data from local storage and redirecting to the login page.
 *
 */
function userLogout() {
  localStorage.removeItem("users");
  window.location.href = "login.html";
}
