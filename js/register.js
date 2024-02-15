let privacyChecker;

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