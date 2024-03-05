let taskpriority = "medium";
let remoteuser = [];
let remoteuserassign = [];
let usersassignedto = [];
let userinitialsassignedto = [];
let userinitialsassignedtoid = [];
let usercolorsassignedto = [];
let subtasksadd = [];
let subtasksaddcard = [];
let userinitialsassignedtobadges = [];
let usercolorsassignedtobadges = [];
let editingcard;

/**
 * Asynchronously renders the add task functionality.
 *
 */
async function renderAddTask() {
  removeActiveClass();
  setActivClass("add_task")
  document.querySelector("form").noValidate = false;
  await loadRemoteUser();
}

/**
 * Fill the input field with the given string and call the corresponding handler function.
 *
 * @param {string} inputString - The string to fill the input field with.
 * @param {string} handler - The handler to determine which function to call.
 */
function fillInputField(inputString, handler) {
  if (handler === "edit-") {
    document.getElementById(`parent-edit_items`).innerHTML = `${inputString}`;
    openEditCategory();
  } else {
    document.getElementById(`category-list2`).value = `${inputString}`;
    openCategory();
  }
}

/**
 * Clears the fields in the add task form, including resetting the form, resetting the category list, clearing the assigned-to list, and resetting various task-related variables.
 */
function clearFields() {
  document.getElementById("addTaskForm").reset();
  document.getElementById("category-list2").innerHTML = `Select Task Category`;
  document.getElementById("assigned-to-add-task-list").innerHTML = ``;
  usersassignedto = [];
  renderAssignedTo();
  taskpriority = "medium";
  taskPriorityActive("");
  subtasksadd = [];
  renderAddSubtasks();
}

/**
 * Resets the value of the subtasks input field to an empty string.
 */
function resetSubtasks() {
  document.getElementById("subtasks").value = ``;
}

/**
 * Opens the assign-to dropdown and adds event listeners to handle click events.
 */
function openAssignTo() {
  let logoutbox = document.getElementById("list1");
  if (!logoutbox.classList.contains("visible")) {
    logoutbox.classList.add("visible");
    renderAssignedUserAddTask();
  } else {
    logoutbox.classList.remove("visible");
  }
  setBoxListener(logoutbox);
}

/**
 * Adds a click event listener to the window that hides the given box element if a click occurs outside of it.
 *
 * @param {Element} box - The box element to be monitored
 */
function setBoxListener(box) {
  window.addEventListener("click", function (e) {
    if (!box.contains(e.target)) {
      box.classList.remove("visible");
      window.removeEventListener("click", arguments.callee); // Entferne den Event-Listener nach Ausführung
    }
  });
}

/**
 * Opens the category box and handles the UI changes based on its visibility.
 */
function openCategory() {
  let categorybox = document.getElementById("list2");
  let categoryinput = document.getElementById("category-list2");
  changeStateCategoryInput();
  if (!categorybox.classList.contains("visible")) {
    categorybox.classList.add("visible");
    categoryinput.setAttribute("disabled", "");
    renderAssignedUserAddTask();
    window.addEventListener("click", function (e) {
      setWindowListener(categorybox, categoryinput, e);
    });
  } else {
    window.removeEventListener("click", arguments.callee);
    categorybox.classList.remove("visible");
    categoryinput.removeAttribute("disabled", "");
  }
}

/**
 * Sets a window listener to hide the category box and enable the category input when the user clicks outside the category box.
 *
 * @param {Element} categorybox - the category box element
 * @param {Element} categoryinput - the category input element
 * @param {Event} e - the event object
 */
function setWindowListener(Box, Input, e) {
  if (!Box.contains(e.target)) {
    Box.classList.remove("visible");
    Input.removeAttribute("disabled", "");
  }
}

/**
 * Adds subtasks to the subtasksadd array and renders the updated list of subtasks.
 *
 * @param {type} subtaskstoadd - the subtask to be added
 */
function addSubtasks() {
  let subtaskstoadd = document.getElementById("subtasks").value;
  if (subtaskstoadd) {
    let jsontopush = {
      subtaskName: subtaskstoadd,
      subtaskStatus: false,
    };
    subtasksadd.push(jsontopush);
    document.getElementById("subtasks").value = "";
    renderAddSubtasks();
  }
}

/**
 * Check if the enter key is pressed and prevent the default behavior if it is. Then add subtasks.
 *
 * @param {object} event - the keyboard event object
 */
function checkOnKeyDown(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    addSubtasks();
  }
}

/**
 * Edit a subtask in the DOM.
 *
 * @param {number} i - The index of the subtask to be edited
 */
function editSubtask(i) {
  let container = document.getElementById(`subtask-comp-${i}`);
  let textcontent = subtasksadd[i].subtaskName;
  container.innerHTML = editSubTaskHtml(textcontent, i);
  hideSubtaskIcons(i);
}

/**
 * Function to edit subtask HTML.
 *
 * @param {string} textcontent - the text content to be edited
 * @param {number} i - index of the subtask
 * @return {string} the edited HTML content
 */
function editSubTaskHtml(textcontent, i) {
  return /*html*/ `
      <div class="editSubTaskButtonBox" id="subtask-icons-${i}"></div> 
    <div class="subtask-edit-container">
      <input id="editSubTaskInput${i}" type="text" class="sub-edit-input" value=${textcontent} onkeydown="subtasksOnKeyDownAddTask(event, ${i})" />
      <div class="sub-icons">
      <img src="./img/delete.svg" class="subtask-icon-edit" onclick="deleteSubtask(${i})"/>
        <img src="./img/Vector 19.svg" alt="" />
        <img src="./img/check.svg" alt="check" class="subtask-icon-edit" onclick="addEditSubTask(${i})"/>
        </div>
      </div>
    </div>
  `;
}

/**
 * Listens for key down event and adds a task if the enter key is pressed.
 *
 * @param {Object} event - The key down event object
 * @param {number} i - The index of the task
 */
function subtasksOnKeyDownAddTask(event, i) {
  if (event.keyCode == 13) {
    event.preventDefault();
    addEditSubTask(i);
  }
}

/**
 * Updates a subtask at the specified index and re-renders the list of subtasks.
 *
 * @param {number} i - The index of the subtask to be updated.
 */
function addEditSubTask(i) {
  let subtaskinput = document.getElementById(`editSubTaskInput${i}`).value;
  if (subtaskinput.length >= 1) {
    subtasksadd[i].subtaskName = subtaskinput;
    renderAddSubtasks(i);
  }
}

/**
 * A function that adds a class when the checkbox is changed.
 *
 * @param {type} userid - the id of the user
 * @param {type} handler - the handler for the checkbox change
 */
function addClassOnCheckboxChange(userid, handler) {
  if (handler === "edit-") {
    setCheckBoxes(userid, handler);
  } else {
    handler = "";
    setCheckBoxes(userid, handler);
  }
}

/**
 * Sets the checkboxes for a given user ID based on the handler.
 *
 * @param {string} userid - The user ID
 * @param {string} handler - The handler for the checkboxes
 */
function setCheckBoxes(userid, handler) {
  const checkbox = document.getElementById(`${handler}checkbox${userid}`);
  const divelement = document.getElementById(
    `${handler}fullname-addtask-dd-${userid}`
  );
  const parentdivelement = document.getElementById(
    `${handler}catergory_list_${userid}`
  );
  changeCheckboxStatus(userid, checkbox, divelement, parentdivelement);
}

/**
 * Change the status of the checkbox and update the user list accordingly.
 *
 * @param {string} userid - The unique identifier of the user
 * @param {HTMLInputElement} checkbox - The checkbox element
 * @param {HTMLElement} divelement - The div element associated with the checkbox
 * @param {HTMLElement} parentdivelement - The parent div element of the checkbox
 */
function changeCheckboxStatus(userid, checkbox, divelement, parentdivelement) {
  const isChecked = checkbox.checked;
  const action = isChecked ? "add" : "remove";
  divelement.classList[action]("white");
  parentdivelement.classList[action]("contact_background");
  const index = usersassignedto.indexOf(userid);
  if (isChecked && index === -1) {
    usersassignedto.push(userid);
  } else if (!isChecked && index !== -1) {
    usersassignedto.splice(index, 1);
  }
  usersassignedto.sort();
}

/**
 * Iterates through the users assigned to and retrieves their initials, ID, and color from the remote user assignments.
 * If the remote user ID matches the index, the user initials, ID, and color are added to their respective arrays.
 */
function setInitials() {
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserassign[index].initials;
    let usersremoteid = remoteuserassign[index].id;
    let colorremote = remoteuserassign[index].color;
    if (remoteuserassign[index]["id"] == index + 1) {
      userinitialsassignedto.push(initialsremote);
      userinitialsassignedtoid.push(usersremoteid);
      usercolorsassignedto.push(colorremote);
    }
  }
}

/**
 * Sets the initial assigned badges and colors, clears the assigned-to-add-task-list,
 * loops through the usersassignedto array to collect initials and colors, and renders the badges for adding a task.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setBadgesAddTask() {
  userinitialsassignedtobadges = [];
  usercolorsassignedtobadges = [];
  document.getElementById("assigned-to-add-task-list").innerHTML = "";
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserassign[index].initials;
    let colorremote = remoteuserassign[index].color;
    if (remoteuserassign[index]["id"] == index + 1) {
      userinitialsassignedtobadges.push(initialsremote);
      usercolorsassignedtobadges.push(colorremote);
    }
  }
  renderBadgesAddTask();
}

/**
 * Function to push category to JSON.
 *
 * @return {string} The task category from the "category-list2" element.
 */
function pushCategoryToJSON() {
  let taskCategory = document.getElementById("category-list2").value;
  return taskCategory;
}

/**
 * Adds a task to the specified board.
 *
 * @param {type} input - description of the input parameter
 * @return {type} description of the return value
 */
async function addTasktoBoard(input) {
  await loadTasks();
  let title = document.getElementById("task-title");
  let description = document.getElementById("task-description");
  let date = document.getElementById("datepicker");
  let categoryTask = pushCategoryToJSON();
  setJson(input, title, description, date, categoryTask);
  title.value = "";
  description.value = "";
  date.value = "";
  taskAddedCompleteText();
}

/**
 * Adds a new JSON object to the tasks array.
 *
 * @param {type} input - description of input parameter
 * @param {type} title - description of title parameter
 * @param {type} description - description of description parameter
 * @param {type} date - description of date parameter
 * @param {type} categoryTask - description of categoryTask parameter
 */
async function setJson(input, title, description, date, categoryTask) {
  let jsontopush = {
    categoryboard: input,
    category: categoryTask,
    title: title.value,
    description: description.value,
    dueDate: date.value,
    prio: taskpriority,
    subtasks: subtasksadd,
    assignedTo: userinitialsassignedto,
    assignedToID: userinitialsassignedtoid,
    colors: usercolorsassignedto,
  };
  tasks.push(jsontopush);
  await setItem("tasks", JSON.stringify(tasks));
}
