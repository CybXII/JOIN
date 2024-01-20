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
