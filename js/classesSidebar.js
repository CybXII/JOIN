/**
 * Function to update classes for summary, tasks, board, contacts, privacy policy, and legal notice elements.
 *
 */
function classesSummary() {
  document.getElementById("summary").classList.remove("frame-10");
  document.getElementById("summary").classList.add("frame-10-active");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.add("frame-10");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.add("font");
  document.getElementById("legal_notice").classList.remove("font-active");
}


/**
 * Removes the "frame-10-active" class from multiple elements and the "font-active" class from two elements.
 *
 */
function classesHelp() {
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.remove("font-active");
}


/**
 * Adds and removes CSS classes to certain elements in the document.
 *
 */
function classesAddTask() {
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.remove("frame-10");
  document.getElementById("add_task").classList.add("frame-10-active");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.add("frame-10");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.add("font");
  document.getElementById("legal_notice").classList.remove("font-active");
}


/**
 * Function to update classes on the board elements to display the board view.
 */
function classesBoard() {
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.remove("frame-10");
  document.getElementById("board").classList.add("frame-10-active");
  document.getElementById("contacts").classList.add("frame-10");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.add("font");
  document.getElementById("legal_notice").classList.remove("font-active");
}


/**
 * Function to switch classes for contacts section.
 */
function classesContacts() {
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.remove("frame-10");
  document.getElementById("contacts").classList.add("frame-10-active");
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.add("font");
  document.getElementById("legal_notice").classList.remove("font-active");
}


/**
 * Function to update the classes for the privacy policy elements.
 */
function classesPrivacyPolicy() {
  document.getElementById("privacy_policy").classList.remove("font");
  document.getElementById("privacy_policy").classList.add("font-active");
  document.getElementById("legal_notice").classList.add("font");
  document.getElementById("legal_notice").classList.remove("font-active");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("contacts").classList.add("frame-10");
}


/**
 * Function to update classes for legal notice display.
 */
function classesLegalNotice() {
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.remove("font");
  document.getElementById("legal_notice").classList.add("font-active");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("contacts").classList.add("frame-10");
}
