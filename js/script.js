function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    renderLogin();
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

function renderBoardTasks() {
  let taskcontent = document.getElementById("in-progress");
  taskcontent.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    taskcontent.innerHTML += renderTasksHTML(i);
    let assigned = document.getElementById(`assigned-to${i}`);
    for (let j = 0; j < task["assignedTo"].length; j++) {
      const assign = task["assignedTo"][j];
      assigned.innerHTML += `
<div class="card-board-profile-batch">
  <div class="group-9-board">
    <img src="../img/ellipse-5.svg" class="ellipse-5" />
    <div class="group-9-text">${assign}</div>
  </div>
</div>`;
    }
  }
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

// function getRandomColor() {
//   var letters = "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   // return color;
//   console.log(color);
// }

//
