function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
  }, 2000);
}

function renderSummary() {
  document.getElementById("content").innerHTML = renderSummaryHTML();
  classesSummary();
}

function renderAddTask() {
  document.getElementById("content").innerHTML = renderAddTaskHTML();
  classesAddTask();
}

function renderBoard() {
  document.getElementById("content").innerHTML = renderBoardHTML();
  classesBoard();
}

function renderContacts() {
  document.getElementById("content").innerHTML = renderContactsHTML();
  classesContacts();
}

function renderPrivacyPolicy() {
  document.getElementById("content").innerHTML = renderPrivacyPolicyHTML();
  classesPrivacyPolicy();
}

function renderLegalNotice() {
  document.getElementById("content").innerHTML = renderLegalNoticeHTML();
  classesLegalNotice();
}

function renderSignUp() {
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  initializeSignUPListeners();
}

function renderLogin() {
  document.getElementById("frame-153").innerHTML = renderLoginHTML();
  document.getElementById("frame-156").classList.remove("d-none");
  initializeLoginListeners();
}

function renderBody() {
  document.getElementById("body").innerHTML = renderBodyHTML();
  renderSummary();
}
