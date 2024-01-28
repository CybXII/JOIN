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
  classesPrivacyPolicy();
}
function renderHelp() {
  classesHelp();
}

function renderLegalNotice() {
  classesLegalNotice();
}

function renderSignUp() {
  document.getElementById("frame-153").innerHTML = renderSignUpHTML();
  document.getElementById("frame-156").classList.add("d-none");
  document.getElementById("frame-153").setAttribute("onsubmit", "addUser(event)");
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

function setChecker(input){
  let checker = `${input}Check`;
  document.getElementById(checker).classList.remove('checkbox');
  document.getElementById(checker).classList.add('checkbox_active');
  document.getElementById(checker).setAttribute('onclick', `resetChecker("${input}")`);
}

function resetChecker(input){
  let checker = `${input}Check`;
  document.getElementById(checker).classList.remove('checkbox_active');
  document.getElementById(checker).classList.add('checkbox');
  document.getElementById(checker).setAttribute('onclick', `setChecker("${input}")`);
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

