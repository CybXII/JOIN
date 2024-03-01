let pass_visible = false;
let confirmPass_visible = false;
let loginPass_visible = false;


/**
 * Generates a random color in hexadecimal format.
 *
 * @param {string} color - the base color to start from
 * @return {string} the randomly generated color
 */
function getRandomColor(color) {
  var letters = "123456789ABCDE";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 14)];
  }
  return color;
}


/**
 * Function to render the privacy policy.
 *
 */
function renderPrivacyPolicy() {
  classesPrivacyPolicy();
}


/**
 * Function to render help.
 *
 */
function renderHelp() {
  classesHelp();
}


/**
 * Renders the legal notice by calling the classesLegalNotice function.
 */
function renderLegalNotice() {
  classesLegalNotice();
}


/**
 * Asynchronously includes HTML content from the specified files into the matching elements.
 *
 */
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


/**
 * Opens or closes the log out box when called.
 *
 */
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


/**
 * Initializes login event listeners for email and password input fields.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function initializeLoginListeners() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("login_password");
  [emailInput, passwordInput].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}


/**
 * Adds a focus event listener to the input element, and performs certain actions if the parent wrapper meets specific conditions.
 *
 * @param {HTMLElement} inputElement - the input element to which the focus listener is added
 */
function setFocusListener(inputElement) {
  inputElement.addEventListener("focus", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
    if (!parentWrapper) return;
    let parentWrapperId = parentWrapper.id;
    let isActive = ["parent_password", "parent_confirm_password", "parent_login_password"].includes(parentWrapperId);
    parentWrapper.classList.add("aktive");
    parentWrapper.classList.remove("invalid");
    if (isActive) changeLocker(parentWrapperId);
  });
}


/**
 * Adds a blur event listener to the input element, and performs certain actions based on the parent wrapper's ID.
 *
 * @param {HTMLElement} inputElement - The input element to which the blur event listener is added
 */
function setBlurListener(inputElement) {
  inputElement.addEventListener("blur", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
    if (!parentWrapper) return;
    let parentWrapperId = parentWrapper.id;
    if (["parent_password", "parent_confirm_password", "parent_login_password"].includes(parentWrapperId)) {
      changeLockerPictureBack(parentWrapperId);
    }
    parentWrapper.classList.remove("aktive", "invalid");
  });
}


/**
 * Initializes event listeners for sign-up form inputs and sets focus and blur listeners.
 *
 */
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


/**
 * Toggles the visibility of password input fields based on the input parameter.
 *
 * @param {string} input - the type of password input field to be toggled
 */
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


/**
 * Change the picture of the locker based on the parent wrapper ID.
 *
 * @param {string} parentWrapperId - The ID of the parent wrapper
 */
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


/**
 * Function to change the visibility of locker picture based on the input.
 *
 * @param {string} input - The type of input to change the visibility of locker picture.
 */
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


/**
 * Adds event listeners to the contact names in the contact list.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
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
    });
  });
}


/**
 * Adds a click event listener to the window that hides the given box if a click occurs outside of it.
 *
 * @param {HTMLElement} box - The box element to be hidden
 */
function setBoxListenerEdit(box) {
  window.addEventListener("click", function (e) {
    if (!box.contains(e.target)) {
      box.classList.remove("visible");
      window.removeEventListener("click", arguments.callee);
    }
  });
}