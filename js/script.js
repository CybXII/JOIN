let passvisible = false;
let confirmpassvisible = false;
let loginpassvisible = false;

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
  removeActiveClass();
  setActivClass("privacy_policy")
}

/**
 * Function to render help.
 *
 */
function renderHelp() {
  removeActiveClass();
}

/**
 * Renders the legal notice by calling the classesLegalNotice function.
 */
function renderLegalNotice() {
  removeActiveClass();
  setActivClass("legal_notice")
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
  let logoutbox = document.getElementById("LogOutBoxCSS");
  if (!logoutbox.classList.contains("d-none")) {
    logoutbox.classList.add("d-none");
  } else {
    logoutbox.classList.remove("d-none");
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
    let isActive = [
      "parent_password",
      "parent_confirmpassword",
      "parent_login_password",
    ].includes(parentWrapperId);
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
    if (
      [
        "parent_password",
        "parent_confirmpassword",
        "parent_login_password",
      ].includes(parentWrapperId)
    ) {
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
  let nameinput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password-su");
  let confirmpassword = document.getElementById("confirmpassword");
  [emailInput, passwordInput, nameinput, confirmpassword].forEach(function (
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
  if (input === "parent_confirmpassword") {
    passwordConfirmVisitibility();
  } else if (input === "parent_password") {
    passwordVisibility();
  } else if (input === "parent_login_password") {
    passwordLocker();
  }
}

/**
 * Toggles the visibility of the login password field and updates the visibility icon accordingly.
 *
 */
function passwordLocker() {
  if (loginpassvisible === false) {
    document.getElementById(`login_password`).setAttribute("type", "password");
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

/**
 * Controls the visibility of the confirm password input field and its associated locker icon.
 *
 * @param {void} -
 * @return {void} -
 */
function passwordConfirmVisitibility() {
  if (confirmpassvisible === false) {
    document.getElementById(`confirmpassword`).setAttribute("type", "password");
    document
      .getElementById("confirm_locker")
      .setAttribute("src", "img/visibility_off.svg");
  } else {
    document.getElementById(`confirmpassword`).setAttribute("type", "text");
    document
      .getElementById("confirm_locker")
      .setAttribute("src", "img/visibility.svg");
  }
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon accordingly.
 */
function passwordVisibility() {
  if (passvisible === false) {
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
}

/**
 * Change the picture of the locker based on the parent wrapper ID.
 *
 * @param {string} parentWrapperId - The ID of the parent wrapper
 */
function changeLockerPictureBack(parentWrapperId) {
  if (parentWrapperId === "parent_login_password") {
    changeLockerPictureBackLogin();
  } else {
    changeLockerPictureBackConfirm();
  }
}

/**
 * Change the type of the login password input field and toggle the visibility icon.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function changeLockerPictureBackLogin() {
  if (loginpassvisible === false) {
    document.getElementById(`login_password`).setAttribute("type", "password");
    document
      .getElementById("login_password_locker")
      .setAttribute("src", "img/lock.svg");
  } else {
    document.getElementById(`login_password`).setAttribute("type", "text");
    document
      .getElementById("login_password_locker")
      .setAttribute("src", "img/visibility.svg");
  }
}

/**
 * Function to change locker picture back confirm based on visibility status.
 */
function changeLockerPictureBackConfirm() {
  if (confirmpassvisible === false) {
    document.getElementById(`confirmpassword`).setAttribute("type", "text");
    document
      .getElementById("confirm_locker")
      .setAttribute("src", "img/lock.svg");
  } else {
    document.getElementById(`confirmpassword`).setAttribute("type", "text");
    document
      .getElementById("confirm_locker")
      .setAttribute("src", "img/visibility.svg");
  }
  if (passvisible === false) {
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

/**
 * Function to change the visibility of locker picture based on the input.
 *
 * @param {string} input - The type of input to change the visibility of locker picture.
 */
function changeLockerPicture(input) {
  if (input === "parent_confirmpassword") {
    changeParentConfirmPass(input);
  } else if (input === "parent_password") {
    changeParentPass(input);
  } else if (input === "parent_login_password") {
    changeLoginPass(input);
  }
}

/**
 * Toggles the visibility of the confirm password field and updates the locker picture accordingly.
 *
 * @param {HTMLInputElement} input - The input element associated with the confirm password field
 */
function changeParentConfirmPass(input) {
  confirmpassvisible = !confirmpassvisible;
  if (confirmpassvisible === false) {
    changeLockerPictureBack(input);
  } else {
    changeLocker(input);
  }
}

/**
 * Toggles the visibility of the login password field and updates the locker picture accordingly.
 *
 * @param {HTMLInputElement} input - The input element associated with the login password field
 */
function changeLoginPass(input) {
  loginpassvisible = !loginpassvisible;
  if (loginpassvisible === false) {
    changeLockerPictureBack(input);
  } else {
    changeLocker(input);
  }
}

/**
 * Toggles the visibility of the parent password field and updates the locker picture accordingly.
 *
 * @param {HTMLInputElement} input - The input element associated with the parent password field
 */
function changeParentPass(input) {
  passvisible = !passvisible;
  if (passvisible === false) {
    changeLockerPictureBack(input);
  } else {
    changeLocker(input);
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
  var contactnames = contactList.querySelectorAll(".contact-name");
  contactnames.forEach(function (contact) {
    contact.addEventListener("click", function () {
      contactnames.forEach(function (c) {
        c.classList.remove("active_contact");
        c.classList.add("contact-name");
      });
      contact.classList.add("active_contact");
      contact.classList.remove("contact-name");
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

/**
 * Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
 *
 * @param {type} event - the event object
 */
function dontClose() {
  event.stopPropagation();
}
