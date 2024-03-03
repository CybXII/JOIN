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
let editingCard;


/**
 * Asynchronously renders the add task functionality.
 *
 */
async function renderAddTask() {
  classesAddTask();
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
  subtasksAdd = [];
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
  let logoutBox = document.getElementById("list1");
  if (!logoutBox.classList.contains("visible")) {
    logoutBox.classList.add("visible");
    renderAssignedUserAddTask();
  } else {
    logoutBox.classList.remove("visible");
  }
  setBoxListener(logoutBox);
}


/**
 * Adds a click event listener to the window that hides the given box element if a click occurs outside of it.
 *
 * @param {Element} box - The box element to be monitored
 */
function setBoxListener(box) {
  window.addEventListener("click", function(e) {
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
  let categoryBox = document.getElementById("list2");
  let categoryInput = document.getElementById("category-list2");
  changeStateCategoryInput();
  if (!categoryBox.classList.contains("visible")) {
    categoryBox.classList.add("visible");
    categoryInput.setAttribute("disabled", "");
    renderAssignedUserAddTask();
    window.addEventListener("click", function(e) {
      setWindowListener(categoryBox,categoryInput,e)
    });
  } else {
    window.removeEventListener("click", arguments.callee);
    categoryBox.classList.remove("visible");
    categoryInput.removeAttribute("disabled", "");
  }
}


/**
 * Sets a window listener to hide the category box and enable the category input when the user clicks outside the category box.
 *
 * @param {Element} categoryBox - the category box element
 * @param {Element} categoryInput - the category input element
 * @param {Event} e - the event object
 */
function setWindowListener(Box,Input,e){
  if (!Box.contains(e.target)) {
    Box.classList.remove("visible");
    Input.removeAttribute("disabled", "");
  }
}


/**
 * Adds subtasks to the subtasksAdd array and renders the updated list of subtasks.
 *
 * @param {type} subtaskstoadd - the subtask to be added
 */
function addSubtasks() {       
  let subtaskstoadd = document.getElementById("subtasks").value;
  if (subtaskstoadd) {
    let JSONToPush = {
      subtaskName: subtaskstoadd,
      subtaskStatus: false
    };
    subtasksAdd.push(JSONToPush);
    document.getElementById("subtasks").value = "";
    renderAddSubtasks();
  }
}


/**
 * Check if the enter key is pressed and prevent the default behavior if it is. Then add subtasks.
 *
 * @param {object} event - the keyboard event object
 */
function checkOnKeyDown(event){
    if (event.keyCode == 13) {
      event.preventDefault();
      addSubtasks();
    }
};


/**
 * Edit a subtask in the DOM.
 *
 * @param {number} i - The index of the subtask to be edited
 */
function editSubtask(i) {
  let container = document.getElementById(`subtask-comp-${i}`);
  let textContent = subtasksAdd[i].subtaskName;
  container.innerHTML = editSubTaskHtml(textContent, i);
  hideSubtaskIcons(i);
}


/**
 * Function to edit subtask HTML.
 *
 * @param {string} textContent - the text content to be edited
 * @param {number} i - index of the subtask
 * @return {string} the edited HTML content
 */
function editSubTaskHtml(textContent, i) {
  return /*html*/ `
      <div class="editSubTaskButtonBox" id="subtask-icons-${i}"></div> 
    <div class="subtask-edit-container">
      <input id="editSubTaskInput${i}" type="text" class="sub-edit-input" value=${textContent} onkeydown="subtasksOnKeyDownAddTask(event, ${i})" />
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
  let subTaskInput = document.getElementById(`editSubTaskInput${i}`).value;
  if(subTaskInput.length>=1){
    subtasksAdd[i].subtaskName = subTaskInput;
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
  const divElement = document.getElementById(`${handler}fullname-addtask-dd-${userid}`
  );
  const parentDivElement = document.getElementById(`${handler}catergory_list_${userid}`
  );
changeCheckboxStatus(userid,checkbox,divElement,parentDivElement);
}


/**
 * Change the status of the checkbox and update the user list accordingly.
 *
 * @param {string} userid - The unique identifier of the user
 * @param {HTMLInputElement} checkbox - The checkbox element
 * @param {HTMLElement} divElement - The div element associated with the checkbox
 * @param {HTMLElement} parentDivElement - The parent div element of the checkbox
 */
function changeCheckboxStatus(userid, checkbox, divElement, parentDivElement) {
  const isChecked = checkbox.checked;
  const action = isChecked ? "add" : "remove";
  divElement.classList[action]("white");
  parentDivElement.classList[action]("contact_background");
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
    let initialsremote = remoteuserAssign[index].initials;
    let usersremoteID = remoteuserAssign[index].id;
    let colorremote = remoteuserAssign[index].color;
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedto.push(initialsremote);
      userInitialsAssignedtoID.push(usersremoteID);
      userColorsAssignedto.push(colorremote);
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
  userInitialsAssignedtoBadges = [];
  userColorsAssignedtoBadges = [];
  document.getElementById("assigned-to-add-task-list").innerHTML = "";
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserAssign[index].initials;
    let colorremote = remoteuserAssign[index].color;
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedtoBadges.push(initialsremote);
      userColorsAssignedtoBadges.push(colorremote);
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
  
  
  // setJson(input,title,description,date,categoryTask);
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
// async function setJson(input,title,description,date,categoryTask){
  
// }