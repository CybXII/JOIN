let taskpriority = "medium";
let remoteuser = [];
let remoteuserAssign = [];
let usersassignedto = [];
let userInitialsAssignedto = [];
let userInitialsAssignedtoID = [];
let userColorsAssignedto = [];
let subtasksAdd = [];
let subtasksAddCard = [];
let userInitialsAssignedtoBadges = [];
let userColorsAssignedtoBadges = [];

async function renderAddTask() {
  await loadUsersFromLocalStorage();
  classesAddTask();
  document.querySelector("form").noValidate = false;
  await loadRemoteUser();
}

function configureDatePicker() {
  function setMinDate() {
    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let formattedDate = today.getFullYear() + "-" + month + "-" + day;
    let datePicker = document.getElementById("datePicker");
    datePicker.setAttribute("min", formattedDate);
  }
  setMinDate();
}

document.addEventListener("DOMContentLoaded", configureDatePicker);

function taskPriorityChoosed(i,handler) {
  if(handler==="edit-"){
    taskpriority = i;
    taskPriorityActive(handler);
  }else {
    handler="";
    taskpriority = i;
    taskPriorityActive(handler);  
  }
}

function deleteSubtask(i) {
  subtasksAdd.splice(i, 1);
  renderAddSubtasks();
}

function showSubtaskIcons(i) {
  document.getElementById(`subtask-icons-${i}`).classList.remove("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.add("subtask-background");
}

function hideSubtaskIcons(i) {
  document.getElementById(`subtask-icons-${i}`).classList.add("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.remove("subtask-background");
}

function taskPriorityActive(handler) {
  if (taskpriority == "urgent") {
    renderUrgent(handler);
  } else if (taskpriority == "medium") {
    renderMedium(handler);
  } else if (taskpriority == "low") {
    renderLow(handler);
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

function fillInputField(inputString,handler) {
  if(handler=== "edit-"){
    document.getElementById(`${handler}category-list2`).innerHTML = `${inputString}`;
    openEditCategory();
  }else {
    document.getElementById(`category-list2`).innerHTML = `${inputString}`;
    openCategory();
  }
}

function clearFields() {
  document.getElementById("addTaskForm").reset();
  document.getElementById("category-list2").innerHTML = `Select Task Category`;
  document.getElementById("assigned-to-add-task-list").innerHTML = ``;
  usersassignedto = [];
  renderAssignedTo();
  taskpriority = "medium";
  taskPriorityActive("");
  subtasksAdd = [];
  renderAddSubtasks();
}

function resetSubtasks() {
  document.getElementById("subtasks").value = ``;
}

function renderAssignedTo(handler) {
  if (handler==="edit-"){
    let assigncontent = document.getElementById("edit-assigned-list");
    remoteuserAssign.forEach((element, i) => {
      const fullname = element.name;
      const initials = element.initials;
      const color = element.color;
      assigncontent.innerHTML += /*html*/ `<li id="edit-catergory_list_${i}">
        <div class="active_contact">
          <div class="profile-badge">
            <div class="group">
              <div class="overlap-group" style="background-color: ${color}">
                <div class="text-wrapper-2">${initials}</div>
              </div>
            </div>
          </div>
          <span  id="edit-fullname-addtask-dd-${i}">${fullname}</span>
          <input id="edit-checkbox${i}" type="checkbox" class="checkbox" onclick="addClassOnCheckboxChange(${i},'edit-'), setBadgesAddTask()" />
        </div>
      </li>
      `;
    }, (assigncontent.innerHTML = ""));
  }
  else{
    handler ='';
    let assigncontent = document.getElementById(`${handler}assigned-list`);
    remoteuserAssign.forEach((element, i) => {
      const fullname = element.name;
      const initials = element.initials;
      const color = element.color;
      assigncontent.innerHTML += /*html*/ `<li id="${handler}catergory_list_${i}">
        <div class="active_contact">
          <div class="profile-badge">
            <div class="group">
              <div class="overlap-group" style="background-color: ${color}">
                <div class="text-wrapper-2">${initials}</div>
              </div>
            </div>
          </div>
          <span  id="${handler}fullname-addtask-dd-${i}">${fullname}</span>
          <input id="${handler}checkbox${i}" type="checkbox" class="checkbox" onclick="addClassOnCheckboxChange(${i}), setBadgesAddTask()" />
        </div>
      </li>
      `;
    }, (assigncontent.innerHTML = ""));
  
  }
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
    categoryInput.setAttribute("disabled", "");
    renderAssignedUserAddTask();
  } else {
    categoryBox.classList.remove("visible");
    categoryInput.removeAttribute("disabled", "");
  }

  window.addEventListener("click", function (e) {
    if (!categoryBox.contains(e.target)) {
      categoryBox.classList.remove("visible");
      window.removeEventListener("click", arguments.callee);
    }
  });
}

function addSubtasks() {
  let subtaskstoadd = document.getElementById("subtasks").value;
  let JSONToPush = {
    subtaskName: subtaskstoadd,
    subtaskStatus: false,
  };
  subtasksAdd.push(JSONToPush);
  document.getElementById("subtasks").value = "";
  renderAddSubtasks();
}

function renderAddSubtasks() {
  document.getElementById("subtasks-container").innerHTML = "";
  for (let i = 0; i < subtasksAdd.length; i++) {
    const element = subtasksAdd[i].subtaskName;
    let content = document.getElementById("subtasks-container");
    content.innerHTML += /*html*/ `
    <div id="subtask-comp-${i}">
    <div class="subtask-comp" onmouseover="showSubtaskIcons(${i})" onmouseleave="hideSubtaskIcons(${i})">
                    <span class="subtask-task" id='subtask${i}' ondblclick="editSubtask(${i})" 
                      >⦁ ${element}</span
                    >
                    <div class="sub-icons d-none" id="subtask-icons-${i}">
                      <img
                        src="./img/edit.svg"
                        alt=""
                        onclick="editSubtask(${i})"
                        class="subtask-icon"
                      />
                      <img src="./img/Vector 19.svg" alt="" />
                      <img
                        src="./img/delete.svg"
                        alt=""
                        onclick="deleteSubtask(${i})"
                        class="subtask-icon"
                      />
                    </div>
                  </div>
                  </div>
  </div>`;
  }
}

function editSubtask(i) {
  let container = document.getElementById(`subtask-comp-${i}`);
  // let nr = findSubtaskPosition(id);
  let textContent = subtasksAdd[i].subtaskName;
  container.innerHTML = editSubTaskHtml(textContent, i);
  hideSubtaskIcons(i);
}

function editSubTaskHtml(textContent, i) {
  return /*html*/ `
      <div class="editSubTaskButtonBox" id="subtask-icons-${i}"></div> 
    <div class="subtask-edit-container">
      <input id="editSubTaskInput" type="text" class="sub-edit-input" value=${textContent} />
      <div class="sub-icons">
      <img src="./img/delete.svg" class="subtask-icon-edit" onclick="deleteSubtask(${i})"/>
        <img src="./img/Vector 19.svg" alt="" />
        <img src="./img/check.svg" alt="check" class="subtask-icon-edit" onclick="addEditSubTask(${i})"/>
        </div>
      </div>
    </div>
  `;
}

function addEditSubTask(i) {
  let subTaskInput = document.getElementById("editSubTaskInput");
  subtasksAdd[i].subtaskName = subTaskInput.value;
  renderAddSubtasks();
}

function addClassOnCheckboxChange(userid, handler) {
  if(handler === "edit-"){
    setCheckBoxes(userid,handler);
  } else{
    handler='';
    setCheckBoxes(userid,handler);
  }
}

function setCheckBoxes(userid,handler){
  const checkbox = document.getElementById(`${handler}checkbox${userid}`);
  const divElement = document.getElementById(`${handler}fullname-addtask-dd-${userid}`);
  const parentDivElement = document.getElementById(`${handler}catergory_list_${userid}`);

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
    let usersremoteID = remoteuserAssign[index].id;
    let colorremote = remoteuserAssign[index].color;
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedto.push(initialsremote);
      userInitialsAssignedtoID.push(usersremoteID);
      userColorsAssignedto.push(colorremote);
    }
  }
  // addTasksToStorage();
}

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
    renderBadges(initials, color, content, i);
  }
}

function renderBadges(initials, color, content, i) {
  if (i <= 3) {
    content.innerHTML += /*html*/ `<div class="assigned-to-add-task-user" style="background-color: ${color}">${initials}</div>`;
  }
  if (i == 4) {
    content.innerHTML += /*html*/ `<div id="grey_badge" class="assigned-to-add-task-user" style="background-color: grey">+${
      i - 3
    }</div>`;
  }
  if (i > 4) {
    document.getElementById("grey_badge").innerHTML = /*html*/ `+${
      i - 3
    }</div>`;
  }
}

function renderAssignedUserAddTask(handler) {
  if (handler==="edit-"){
    for (let i = 0; i < usersassignedto.length; i++) {
      let index = usersassignedto[i];
      if (usersassignedto.includes(index)) {
        document.getElementById(`${handler}checkbox${index}`).checked = true;
        addClassOnCheckboxChange(index,handler);
      }
    }

  }
  else{
    for (let i = 0; i < usersassignedto.length; i++) {
      let index = usersassignedto[i];
      if (usersassignedto.includes(index)) {
        document.getElementById(`checkbox${index}`).checked = true;
        addClassOnCheckboxChange(index);
      }
    }  
  }
}

function pushCategoryToJSON() {
  let taskCategory = document.getElementById("category-list2").innerHTML;
  return taskCategory;
}

function addTasksToStorage(categoryInput) {
  checkInputFields(categoryInput);
}

function checkInputFields(categoryInput) {
  let title = document.getElementById("task-title").value;
  let date = document.getElementById("datePicker").value;
  let category = document.getElementById("category-list2").innerHTML;

  checkBeforChange(title, date, category, categoryInput);
}

function checkBeforChange(title, date, category, categoryInput) {
  if (date != "" && title != "" && category != "Select Task Category") {
    setInitials();
    pushCategoryToJSON();
    addTasktoBoard(categoryInput);
  } else {
    changeStateCategoryInput(category);
    changeStateDateInput(date);
    changeStateTitleInput(title);
  }
}

function changeStateCategoryInput(category) {
  if (category === "Select Task Category") {
    document.getElementById("category-border").classList.add("redBorder");
    document.getElementById("warning-info-2").style = "display: block";
  } else if (category != "") {
    document.getElementById("warning-info-2").style = "display: none";
    document.getElementById("category-border").classList.remove("redBorder");
  }
}

function changeStateDateInput(date) {
  if (date === "") {
    document.getElementById("datePicker").classList.add("redBorder");
    document.getElementById("warning-info-3").style = "display: block";
  } else if (date != "") {
    document.getElementById("warning-info-3").style = "display: none";
    document.getElementById("datePicker").classList.remove("redBorder");
  }
}

function changeStateTitleInput(title) {
  if (title === "") {
    document.getElementById("warning-info-1").style = "display: block";
    document.getElementById("task-title").classList.add("redBorder");
  } else if (title != "") {
    document.getElementById("warning-info-1").style = "display: none";
    document.getElementById("task-title").classList.remove("redBorder");
  }
}

async function addTasktoBoard(input) {
  await loadTasks();
  let title = document.getElementById("task-title");
  let description = document.getElementById("task-description");
  let date = document.getElementById("datePicker");
  let categoryTask = pushCategoryToJSON();
  let JSONToPush = {
    categoryboard: input,
    category: categoryTask,
    title: title.value,
    description: description.value,
    dueDate: date.value,
    prio: taskpriority,
    subtasks: subtasksAdd,
    assignedTo: userInitialsAssignedto,
    assignedToID: userInitialsAssignedtoID,
    colors: userColorsAssignedto,
  };

  tasks.push(JSONToPush);
  await setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);
  title.value = "";
  description.value = "";
  date.value = "";
  taskAddedCompleteText();
}

async function resetTasksBoard() {
  tasks = [
    {
      categoryboard: "todo",
      category: "to do Task",
      title: "Contact Form & Imprint",
      description: "Create a contact form and imprint page...",
      dueDate: "2024-02-15",
      prio: "medium",
      subtasks: [
        {
          subtaskName: "subtask1",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask2",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask3",
          subtaskStatus: false,
        },
      ],
      assignedTo: ["AB", "CD", "EF"],
      assignedToID: ["0", "1", "2"],
      colors: ["#10C6E8", "#7851CC", "#726129"],
    },
    {
      categoryboard: "in-progress",
      category: "in progress Task",
      title: "Test Technical Task Title",
      description: "Test Technical Task Description",
      dueDate: "2024-02-23",
      prio: "urgent",
      subtasks: [
        {
          subtaskName: "subtask4",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask5",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask6",
          subtaskStatus: false,
        },
      ],
      assignedTo: ["GH", "IJ", "KL"],
      assignedToID: ["0", "1", "2"],
      colors: ["#10C6E8", "#7851CC", "#726129"],
    },
    {
      categoryboard: "await-feedback",
      category: "feedback Task",
      title: "Test Technical Task Title",
      description: "Test Technical Task Description",
      dueDate: "2024-02-25",
      prio: "urgent",
      subtasks: [
        {
          subtaskName: "subtask7",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask8",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask9",
          subtaskStatus: false,
        },
      ],
      assignedTo: ["GH", "IJ", "KL"],
      assignedToID: ["0", "1", "2"],
      colors: ["#10C6E8", "#7851CC", "#726129"],
    },
    {
      categoryboard: "done",
      category: "done Task",
      title: "Test Technical Task Title",
      description: "Test Technical Task Description",
      dueDate: "2024-01-01",
      prio: "urgent",
      subtasks: [
        {
          subtaskName: "subtask10",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask11",
          subtaskStatus: false,
        },
        {
          subtaskName: "subtask12",
          subtaskStatus: false,
        },
      ],
      assignedTo: ["GH", "IJ", "KL"],
      assignedToID: ["0", "1", "2"],
      colors: ["#10C6E8", "#7851CC", "#726129"],
    },
  ];
  await setItem("tasks", JSON.stringify(tasks));
}

function changeButtons(event) {
  event.preventDefault();
  parent_div = document.getElementById("parent_subtasks");
  document.getElementById("subtask_add_button").classList.add("d-none");
  document.getElementById("subtask_seperator").classList.remove("d-none");
  document.getElementById("subtask_accept_button").classList.remove("d-none");
  document.getElementById("subtask_cancel_button").classList.remove("d-none");
  setEventListenerSubtask(parent_div);
}

function setEventListenerSubtask(parent_div) {
  window.addEventListener("click", function (e) {
    if (!parent_div.contains(e.target)) {
      inputField = document.getElementById("subtasks").value;
      if (!inputField || inputField == "") {
        document
          .getElementById("subtask_add_button")
          .classList.remove("d-none");
        document.getElementById("subtask_seperator").classList.add("d-none");
        document
          .getElementById("subtask_accept_button")
          .classList.add("d-none");
        document
          .getElementById("subtask_cancel_button")
          .classList.add("d-none");
        window.removeEventListener("click", arguments.callee);
      } else if (inputField.length < 0) {
        window.removeEventListener("click", arguments.callee);
      }
    }
  });
}

function renderUrgent(handler) {
  document.getElementById(`${handler}prio-urgent`).classList.remove("frame-16");
  document.getElementById(`${handler}prio-urgent`).classList.add("frame-16-active");
  document.getElementById(`${handler}prio-urgent-img`).src = "./img/urgent_fill.svg";
  document.getElementById(`${handler}prio-medium`).classList.remove("frame-25-active");
  document.getElementById(`${handler}prio-medium`).classList.add("frame-25");
  document.getElementById(`${handler}prio-medium-img`).src = "./img/medium_nofill.svg";
  document.getElementById(`${handler}prio-low`).classList.remove("frame-26-active");
  document.getElementById(`${handler}prio-low`).classList.add("frame-26");
  document.getElementById(`${handler}prio-low-img`).src = "./img/low_nofill.svg";
}

function renderMedium(handler) {
  document.getElementById(`${handler}prio-medium`).classList.remove("frame-25");
  document.getElementById(`${handler}prio-medium`).classList.add("frame-25-active");
  document.getElementById(`${handler}prio-medium-img`).src = "./img/medium_fill.svg";
  document.getElementById(`${handler}prio-low`).classList.remove("frame-26-active");
  document.getElementById(`${handler}prio-low`).classList.add("frame-26");
  document.getElementById(`${handler}prio-low-img`).src = "./img/low_nofill.svg";
  document.getElementById(`${handler}prio-urgent`).classList.add("frame-16");
  document.getElementById(`${handler}prio-urgent`).classList.remove("frame-16-active");
  document.getElementById(`${handler}prio-urgent-img`).src = "./img/urgent_nofill.svg";
}

function renderLow(handler) {
  document.getElementById(`${handler}prio-low`).classList.remove("frame-26");
  document.getElementById(`${handler}prio-low`).classList.add("frame-26-active");
  document.getElementById(`${handler}prio-low-img`).src = "./img/low_fill.svg";
  document.getElementById(`${handler}prio-medium`).classList.remove("frame-25-active");
  document.getElementById(`${handler}prio-medium`).classList.add("frame-25");
  document.getElementById(`${handler}prio-medium-img`).src = "./img/medium_nofill.svg";
  document.getElementById(`${handler}prio-urgent`).classList.add("frame-16");
  document.getElementById(`${handler}prio-urgent`).classList.remove("frame-16-active");
  document.getElementById(`${handler}prio-urgent-img`).src = "./img/urgent_nofill.svg";
}

