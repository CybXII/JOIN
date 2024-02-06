function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    renderLogin();
  }, 2000);
}

function renderSummary() {
  setAmounts();
  document.getElementById("summ-tasks-todo").innerHTML = tasksTodo;
  document.getElementById("summ-tasks-done").innerHTML = tasksDone;
  document.getElementById("summ-tasks-urgent").innerHTML = tasksUrgent;
  document.getElementById("summ-tasks-board").innerHTML = tasks.length;
  document.getElementById("summ-tasks-progress").innerHTML = tasksInProgress;
  document.getElementById("summ-tasks-feedback").innerHTML = tasksAwaitFeedback;
  classesSummary();
  renderGreetingTime();
}

function renderAddTask() {
  classesAddTask();
}

function renderBoardTasks() {
  updateHTML();
  classesBoard();
}

function renderContacts() {
  document.getElementById("content").innerHTML = renderContactsHTML();
  classesContacts();
  addContactListeners();
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

function renderSignUp() {
  privacyChecker = false;
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  document
    .getElementById("frame-153")
    .setAttribute("onsubmit", "addUser(event)");
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

function openContact(contactName){
  document.getElementById('contact_info').innerHTML = renderContactInfo(contactName);
}

// RANDOM COLOR CONTACTS

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // return color;
  console.log(color);
}

// Greeting Time Summary

function greetingTime() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good day,";
  } else return "Good evening,";
}

function renderGreetingTime() {
  document.getElementById("summary-greeting").innerHTML = greetingTime();
  document.getElementById("summary-greeting-resp").innerHTML = greetingTime();
}