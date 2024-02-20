let taskpriority = "medium";
let remoteuser = [];
let remoteuserAssign = [];
let usersassignedto = [];
let userInitialsAssignedto = [];
let userColorsAssignedto = [];
let taskCategory = [];

function renderAddTask() {
  loadUsersFromLocalStorage();
  classesAddTask();
  document.querySelector("form").noValidate = false;
  loadRemoteUser();
}

function configureDatePicker() {
  function setMinDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var formattedDate = today.getFullYear() + "-" + month + "-" + day;
    var datePicker = document.getElementById("datePicker");
    datePicker.setAttribute("min", formattedDate);
  }
  setMinDate();
}

document.addEventListener("DOMContentLoaded", configureDatePicker);

function taskPriorityChoosed(i) {
  taskpriority = i;
  taskPriorityActive();
}

function taskPriorityActive() {
  if (taskpriority == "urgent") {
    renderUrgent();
  } else if (taskpriority == "medium") {
    renderMedium();
  } else if (taskpriority == "low") {
    renderLow();
  }
}

function taskAddedCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  document.querySelector("form").noValidate = true;
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    location.href = "./board.html";
  }, 2000);
}

function fillInputField(inputString){
  document.getElementById('category-list2').innerHTML = `${inputString}`;
  openCategory()
}

function clearFields() {
  console.log("funktion zum leeren der Input felder oder neu laden der Seite");
}

function renderAssignedTo() {
  let assigncontent = document.getElementById("assigned-list");
  remoteuserAssign.forEach((element, i) => {
    const fullname = element.name;
    const initials = element.initials;
    const color = element.color;

    assigncontent.innerHTML += /*html*/ `<li id="catergory_list_${i}">
  <div class="active_contact">
    <div class="profile-badge">
      <div class="group">
        <div class="overlap-group" style="background-color: ${color}">
          <div class="text-wrapper-2">${initials}</div>
        </div>
      </div>
    </div>
    <span  id="fullname-addtask-dd-${i}">${fullname}</span>
    <input id="checkbox${i}" type="checkbox" class="checkbox" onclick="addClassOnCheckboxChange(${i}), setBadgesAddTask()" />
  </div>
</li>
`;
  }, (assigncontent.innerHTML = ""));
}

function openAssignTo() {
  // renderAssignedUserAddTask();
  let logoutBox = document.getElementById("list1");

  // Überprüfe, ob die Klasse "visible" nicht enthalten ist, füge sie hinzu
  if (!logoutBox.classList.contains("visible")) {
    logoutBox.classList.add("visible");
    renderAssignedUserAddTask();
  } else {
    // Wenn "visible" enthalten ist, entferne es
    logoutBox.classList.remove("visible");
  }

  // Überwache Klicks im Fenster, um die Liste zu verstecken, wenn außerhalb geklickt wird
  window.addEventListener("click", function (e) {
    if (!logoutBox.contains(e.target)) {
      logoutBox.classList.remove("visible");
      window.removeEventListener("click", arguments.callee); // Entferne den Event-Listener nach Ausführung
    }
  });
}

function openCategory() {
  let categoryBox = document.getElementById("list2");
  let categoryInput = document.getElementById("category-list2");

  if (!categoryBox.classList.contains("visible")) {
    categoryBox.classList.add("visible");
    categoryInput.setAttribute("disabled","" )
    renderAssignedUserAddTask();
  } else {

    categoryBox.classList.remove("visible");
    categoryInput.removeAttribute("disabled","" )
  }

  window.addEventListener("click", function (e) {
    if (!categoryBox.contains(e.target)) {
      categoryBox.classList.remove("visible");
      window.removeEventListener("click", arguments.callee);
    }
  });
}


function addClassOnCheckboxChange(userid) {
  const checkbox = document.getElementById(`checkbox${userid}`);
  const divElement = document.getElementById(`fullname-addtask-dd-${userid}`);
  const parentDivElement = document.getElementById(`catergory_list_${userid}`);

  if (checkbox.checked) {
    divElement.classList.add("white");
    parentDivElement.classList.add("contact_background");
    if (!usersassignedto.includes(userid)) {
      usersassignedto.push(userid);
      usersassignedto.sort();
    }
  } else {
    divElement.classList.remove("white");
    parentDivElement.classList.remove("contact_background");
    const index = usersassignedto.indexOf(userid);
    if (index !== -1) {
      usersassignedto.splice(index, 1);
      usersassignedto.sort();
    }
  }
}

function setInitials() {
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserAssign[index].initials;
    let colorremote = remoteuserAssign[index].color;
    // let idremote = remoteuserAssign[i]["id"];
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedto.push(initialsremote);
      userColorsAssignedto.push(colorremote);
    }
  }
  // addTasksToStorage();
}

let userInitialsAssignedtoBadges = [];
let userColorsAssignedtoBadges = [];

function setBadgesAddTask() {
  userInitialsAssignedtoBadges = [];
  userColorsAssignedtoBadges = [];
  document.getElementById("assigned-to-add-task-list").innerHTML = "";
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserAssign[index].initials;
    let colorremote = remoteuserAssign[index].color;
    // let idremote = remoteuserAssign[i]["id"];
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedtoBadges.push(initialsremote);
      userColorsAssignedtoBadges.push(colorremote);
    }
  }
  renderBadgesAddTask();
}

function renderBadgesAddTask() {
  for (let i = 0; i < userInitialsAssignedtoBadges.length; i++) {
    const initials = userInitialsAssignedtoBadges[i];
    const color = userColorsAssignedtoBadges[i];
    let content = document.getElementById("assigned-to-add-task-list");
    content.innerHTML += /*html*/ `<div class="assigned-to-add-task-user" style="background-color: ${color}">${initials}</div>`;
  }
}

function renderAssignedUserAddTask() {
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    if (usersassignedto.includes(index)) {
      document.getElementById(`checkbox${index}`).checked = true;
      addClassOnCheckboxChange(index);
    }
  }
}

function addTasksToStorage() {
  setInitials();
  let title = document.getElementById("task-title");
  let description = document.getElementById("task-description");
  let date = document.getElementById("datePicker");

  let JSONToPush = {
    categoryboard: "todo",
    category: "JSONPUSHTEST",
    title: title.value,
    description: description.value,
    dueDate: date.value,
    prio: taskpriority,
    subtasks: ["1", "2", "3"],
    assignedTo: userInitialsAssignedto,
    colors: userColorsAssignedto,
  };

  tasks.push(JSONToPush);
  saveTasksToLocalStorage();
  console.log(tasks);
  title.value = "";
  description.value = "";
  date.value = "";

  taskAddedCompleteText();
}

function changeButtons(){
  parent_div = document.getElementById('parent_subtasks');
  inputField = document.getElementById('parent_subtasks').value;

  document.getElementById('subtask_add_button').classList.add('d-none');
  document.getElementById('subtask_seperator').classList.remove('d-none');
  document.getElementById('subtask_accept_button').classList.remove('d-none');
  document.getElementById('subtask_cancel_button').classList.remove('d-none');

  window.addEventListener("click", function (e) {
    if (!parent_div.contains(e.target)) {
      if (inputField===undefined) {
        document.getElementById('subtask_add_button').classList.remove('d-none');
        document.getElementById('subtask_seperator').classList.add('d-none');
        document.getElementById('subtask_accept_button').classList.add('d-none');
        document.getElementById('subtask_cancel_button').classList.add('d-none');
        window.removeEventListener("click", arguments.callee);
      }
      else{
        window.removeEventListener("click", arguments.callee);
      }
    }
  });
}

function renderUrgent() {
  document.getElementById("prio-urgent").classList.remove("frame-16");
  document.getElementById("prio-urgent").classList.add("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_fill.svg";
  document.getElementById("prio-medium").classList.remove("frame-25-active");
  document.getElementById("prio-medium").classList.add("frame-25");
  document.getElementById("prio-medium-img").src = "./img/medium_nofill.svg";
  document.getElementById("prio-low").classList.remove("frame-26-active");
  document.getElementById("prio-low").classList.add("frame-26");
  document.getElementById("prio-low-img").src = "./img/low_nofill.svg";
}

function renderMedium() {
  document.getElementById("prio-medium").classList.remove("frame-25");
  document.getElementById("prio-medium").classList.add("frame-25-active");
  document.getElementById("prio-medium-img").src = "./img/medium_fill.svg";
  document.getElementById("prio-low").classList.remove("frame-26-active");
  document.getElementById("prio-low").classList.add("frame-26");
  document.getElementById("prio-low-img").src = "./img/low_nofill.svg";
  document.getElementById("prio-urgent").classList.add("frame-16");
  document.getElementById("prio-urgent").classList.remove("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_nofill.svg";
}

function renderLow() {
  document.getElementById("prio-low").classList.remove("frame-26");
  document.getElementById("prio-low").classList.add("frame-26-active");
  document.getElementById("prio-low-img").src = "./img/low_fill.svg";
  document.getElementById("prio-medium").classList.remove("frame-25-active");
  document.getElementById("prio-medium").classList.add("frame-25");
  document.getElementById("prio-medium-img").src = "./img/medium_nofill.svg";
  document.getElementById("prio-urgent").classList.add("frame-16");
  document.getElementById("prio-urgent").classList.remove("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_nofill.svg";
}
