function registerComplete() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    msgBox = document.getElementById("msgBox");
    msgBox.innerHTML = msg;
  }
  // else display none
}

// let users = [{ email: "max@test.de", password: "test123" }];

function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
    location.href = "./summary.html";
  }
}
