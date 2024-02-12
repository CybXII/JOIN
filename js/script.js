function registerCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    renderLogin();
  }, 2000);
}

function renderSummary() {
  setAmounts();

  // Filtern und sortieren der Daten
  let filteredDueDates = tasks
    .filter((task) => task.prio === "urgent" && task.categoryboard !== "done")
    .map((task) => new Date(task.dueDate));
  filteredDueDates.sort((a, b) => a - b);

  // Geringstes Datum extrahieren
  let smallestDueDate = filteredDueDates[0];

  // Funktion zur Umwandlung des Datums in das gewünschte Format
  function formatDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  document.getElementById("summ-upcoming").innerHTML =
    formatDate(smallestDueDate);
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
  document.querySelector("form").noValidate = false;
}

function renderBoardTasks() {
  updateHTML();
  classesBoard();
}

function renderContacts() {
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

function openContact(fullname, email, color, initials, phone, userid) {
  let element = document.getElementById("contact_info");
  element.classList.remove("contact-info-content");
  element.classList.remove("contact-info");
  document.getElementById("contact_info").innerHTML = renderContactInfo(
    fullname,
    email,
    color,
    initials,
    phone, 
    userid
  );
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

function greetSummaryAnimation() {
  setTimeout(() => {
    document
      .getElementById("frame-69_responsiv")
      .classList.remove("frame-69_responsiv_background");
    document.getElementById("frame-69_responsiv").classList.add("transparent");
  }, 2000);
}

// function openLogOutBox() {

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

// document.addEventListener('DOMContentLoaded',function() {
// document.getElementById('openLogOutBox').addEventListener('click', function(event) {
//   event.stopPropagation();
//   openLogOutBox();
//   });
// });

// document.addEventListener('click', function() {
//   let logOutBox = document.getElementById('LogOutBoxCSS');
//   if (logOutBox.style.display === 'block') {
//     logOutBox.style.display = 'none';
//   }
// });
