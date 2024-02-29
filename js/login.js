let login_remember;
let users = [];
let remembered_user = [];

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

function renderLogin() {
  document.getElementById("frame-153").innerHTML = renderLoginHTML();
  document.getElementById("frame-156").classList.remove("d-none");
  initializeLoginListeners();
}

async function login(event) {
  await loadUser();
  event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("login_password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  if (user) {
    users = [];
    users.push(user);
    users[0].rememberlogin = login_remember;
    saveUsersToLocalStorage();
    window.location.href = "summary.html";
  }
}

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

function userLogout() {
  localStorage.removeItem("users");
  window.location.href = "login.html";
}
