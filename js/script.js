function renderSummary() {
  classesSummary();
  document.getElementById("content").innerHTML = renderSummaryHTML();
}

function renderAddTask() {
  classesAddTask();
  document.getElementById("content").innerHTML = renderAddTaskHTML();
}

function renderBoard() {
  classesBoard();
  document.getElementById("content").innerHTML = renderBoardHTML();
}

function renderContacts() {
  classesContacts();
  document.getElementById("content").innerHTML = renderContactsHTML();
}

function renderPrivacyPolicy() {
  classesPrivacyPolicy();
  document.getElementById("content").innerHTML = renderPrivacyPolicyHTML();
}

function renderLegalNotice() {
  classesLegalNotice();
  document.getElementById("content").innerHTML = renderLegalNoticeHTML();
}

function renderSignUp(){
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  validateListenerLogin();  
  validateListenerSignUp();
}

function renderLogin(){
  document.getElementById("frame-153").innerHTML = renderLoginHTML();
    document.getElementById("frame-156").classList.remove("d-none");
  validateListenerLogin();
}

function validateListenerLogin(){
  document.addEventListener("DOMContentLoaded", function () {
    const email_div = document.getElementById("parent_email");
    const email_input = document.getElementById("email");
    const password_div = document.getElementById("parent_password");
    const password_input = document.getElementById("password");

    email_input.addEventListener("blur", function () {
      // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
      email_div.classList.remove("aktive");
    });

    email_input.addEventListener("focus", function () {
      // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
      email_div.classList.add("aktive");
    });

    password_input.addEventListener("blur", function () {
      // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
      password_div.classList.remove("aktive");
    });

    password_input.addEventListener("focus", function () {
      // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
      password_div.classList.add("aktive");
    });
  });
}


function validateListenerSignUp(){
  document.addEventListener("DOMContentLoaded", function () {
    const name_div = document.getElementById("parent_name");
    const name_input = document.getElementById("name");
    const password_div = document.getElementById("parent_confirm_password");
    const password_input = document.getElementById("confirm_password");

    name_input.addEventListener("blur", function () {
      // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
      name_div.classList.remove("aktive");
    });

    name_input.addEventListener("focus", function () {
      // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
      name_div.classList.add("aktive");
    });

    password_input.addEventListener("blur", function () {
      // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
      password_div.classList.remove("aktive");
    });

    password_input.addEventListener("focus", function () {
      // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
      password_div.classList.add("aktive");
    });
  });
}