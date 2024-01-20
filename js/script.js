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
