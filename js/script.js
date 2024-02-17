let pass_visible = false;
let confirmPass_visible = false;
let loginPass_visible = false;

function getRandomColor(color) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderPrivacyPolicy() {
  classesPrivacyPolicy();
}

function renderHelp() {
  classesHelp();
}

function renderLegalNotice() {
  classesLegalNotice();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function openLogOutBox() {
  let logoutBox = document.getElementById("LogOutBoxCSS");
  if (!logoutBox.classList.contains("d-none")) {
    logoutBox.classList.add("d-none");
  } else {
    logoutBox.classList.remove("d-none");
    window.addEventListener("click", function (e) {
      if (document.getElementById("openLogOutBox").contains(e.target)) {
      } else {
        document.getElementById("LogOutBoxCSS").classList.add("d-none");
      }
    });
  }
}

function dontClose() {
  event.stopPropagation();
}


function initializeLoginListeners() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("login_password");
  [emailInput, passwordInput].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}

function setFocusListener(inputElement) {
  inputElement.addEventListener("focus", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
    if (parentWrapper) {
      let parentWrapperId = parentWrapper.id;

      if (
        parentWrapperId === "parent_password" ||
        parentWrapperId === "parent_confirm_password" ||
        parentWrapperId === "parent_login_password"
      ) {
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");
        changeLocker(parentWrapperId);
      } else {
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");
      }
    }
  });
}

function setBlurListener(inputElement) {
  inputElement.addEventListener("blur", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
    if (parentWrapper) {
      let parentWrapperId = parentWrapper.id;

      if (
        parentWrapperId === "parent_password" ||
        parentWrapperId === "parent_confirm_password" ||
        parentWrapperId === "parent_login_password"
      ) {
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
        changeLockerPictureBack(parentWrapperId);
      } else {
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
      }
    }
  });
}

function initializeSignUPListeners() {
  document.addEventListener("DOMContentLoaded", function () {});
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password-su");
  let confirm_password = document.getElementById("confirm_password");
  [emailInput, passwordInput, nameInput, confirm_password].forEach(function (
    inputElement
  ) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}

function changeLocker(input) {
  if (input === "parent_confirm_password") {
    if (confirmPass_visible === false) {
      document
        .getElementById(`confirm_password`)
        .setAttribute("type", "password");
      document
        .getElementById("confirm_locker")
        .setAttribute("src", "img/visibility_off.svg");
    } else {
      document.getElementById(`confirm_password`).setAttribute("type", "text");
      document
        .getElementById("confirm_locker")
        .setAttribute("src", "img/visibility.svg");
    }
  } else if (input === "parent_password") {
    if (pass_visible === false) {
      document.getElementById(`password-su`).setAttribute("type", "password");
      document
        .getElementById("password_locker")
        .setAttribute("src", "img/visibility_off.svg");
    } else {
      document.getElementById(`password-su`).setAttribute("type", "text");
      document
        .getElementById("password_locker")
        .setAttribute("src", "img/visibility.svg");
    }
  } else if (input === "parent_login_password") {
    if (loginPass_visible === false) {
      document
        .getElementById(`login_password`)
        .setAttribute("type", "password");
      document
        .getElementById("login_password_locker")
        .setAttribute("src", "img/visibility_off.svg");
    } else {
      document.getElementById(`login_password`).setAttribute("type", "text");
      document
        .getElementById("login_password_locker")
        .setAttribute("src", "img/visibility.svg");
    }
  }
}

function changeLockerPictureBack(parentWrapperId) {
  if (parentWrapperId === "parent_login_password") {
    if (loginPass_visible === false) {
      document
        .getElementById(`login_password`)
        .setAttribute("type", "password");
      document
        .getElementById("login_password_locker")
        .setAttribute("src", "img/lock.svg");
    } else {
      document.getElementById(`login_password`).setAttribute("type", "text");
      document
        .getElementById("login_password_locker")
        .setAttribute("src", "img/visibility.svg");
    }
  } else {
    if (confirmPass_visible === false) {
      document.getElementById(`confirm_password`).setAttribute("type", "text");
      document
        .getElementById("confirm_locker")
        .setAttribute("src", "img/lock.svg");
    } else {
      document.getElementById(`confirm_password`).setAttribute("type", "text");
      document
        .getElementById("confirm_locker")
        .setAttribute("src", "img/visibility.svg");
    }
    if (pass_visible === false) {
      document.getElementById(`password-su`).setAttribute("type", "password");
      document
        .getElementById("password_locker")
        .setAttribute("src", "img/lock.svg");
    } else {
      document.getElementById(`password-su`).setAttribute("type", "text");
      document
        .getElementById("password_locker")
        .setAttribute("src", "img/visibility.svg");
    }
  }
}

function changeLockerPicture(input) {
  if (input === "parent_confirm_password") {
    confirmPass_visible = !confirmPass_visible;
    if (confirmPass_visible === false) {
      changeLockerPictureBack(input);
    } else {
      changeLocker(input);
    }
  } else if (input === "parent_password") {
    pass_visible = !pass_visible;
    if (pass_visible === false) {
      changeLockerPictureBack(input);
    } else {
      changeLocker(input);
    }
  } else if (input === "parent_login_password") {
    loginPass_visible = !loginPass_visible;
    if (loginPass_visible === false) {
      changeLockerPictureBack(input);
    } else {
      changeLocker(input);
    }
  }
}

function addContactListeners() {
  var contactList = document.getElementById("renderedContent");
  var contactNames = contactList.querySelectorAll(".contact-name");

  contactNames.forEach(function (contact) {
    contact.addEventListener("click", function () {
      contactNames.forEach(function (c) {
        c.classList.remove("active_contact");
        c.classList.add("contact-name");
      });

      contact.classList.add("active_contact");
      contact.classList.remove("contact-name");

      var nameContainer = contact.querySelector(".div-2 .div");
      var contactName = nameContainer.textContent.trim();
      setTimeout(() => {
        contactAnimation();
      }, 100);

      contact.id = "active-contact";
    });
  });
}
