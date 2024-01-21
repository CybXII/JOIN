
// WIEDER EINKOMMENTIEREN!!!!

// function move() {
//   setTimeout(() => {
//     document.getElementById("logo_container").classList.remove("background");
//     document.getElementById("join_logo").classList.remove("background");
//     document.getElementById("logo_container").classList.remove("big_size");
//   }, 500);
// }


// Register & Login

function registerComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    msgBox = document.getElementById("msgBox");
    msgBox.innerHTML = msg;
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
}
