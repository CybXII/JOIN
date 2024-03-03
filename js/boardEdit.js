/**
 * Edit tasks from storage and update the task properties based on the input values.
 *
 * @param {number} i - The index of the task to be edited
 * @return {Promise<void>} A Promise that resolves after updating the tasks in the storage
 */
async function editTasksfromStorage(i) {
  currentTask["title"] = document.getElementById("edit-task-title").value;
  currentTask["dueDate"] = document.getElementById("edit-datePicker").value;
  currentTask["description"] = document.getElementById("edit-task-description").value;
  currentTask["category"] = document.getElementById("parent-edit_items").innerHTML;
  currentTask["prio"] = taskpriority;
  tasks[i] = currentTask;
  setInitialsEdit();
  closeCardContainer();
  await setItem("tasks", JSON.stringify(tasks));
  await renderBoardTasks();
  subtasksMessageEditBoard();
}


/**
 * Edit subtasks for a given task.
 *
 * @param {number} i - index of the task
 */
function editSubtasks(i) {
  subtasksAdd.push(tasks[i].subtasks);
  subtasksAddCard = [];
  subtasksAddCard.push(subtasksAdd[0]);

  document.getElementById(`edit-subtasks-container`).innerHTML = "";
  for (let j = 0; j < currentTask.subtasks.length; j++) {
    const element = currentTask.subtasks[j].subtaskName;
    let content = document.getElementById(`edit-subtasks-container`);
    renderEditSubtasks(element, content, i, j);
  }
  subtasksAdd = [];
}


/**
 * Sets a success message for deleting a task, displays the message box, and then hides it after 2 seconds.
 *
 * @param None
 * @return None
 */
function deleteTaskMessage() {
  document.getElementById("msgBox").innerHTML = "Task sucessfully deleted";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    document.getElementById("msgBox").innerHTML = "Task added to Board";
  }, 2000);
}


/**
 * Edit the subtask card with the specified index.
 *
 * @param {number} i - the index of the subtask card
 * @param {number} j - the index of the subtask
 */
function editSubtaskCard(i, j) {
  let container = document.getElementById(`subtask-comp-${j}`);
  let textContent = currentTask.subtasks[j].subtaskName;
  container.innerHTML = editSubTaskHtmlCard(textContent, i, j);
  hideSubtaskIconsCard(j);
}


/**
 * Function to add or edit a subtask card.
 *
 * @param {number} i - The index parameter.
 * @param {number} j - The index parameter.
 */
async function addEditSubTaskCard(i, j) {
  let subTaskInput = document.getElementById(`editSubTaskInput${j}`).value;
  if(subTaskInput.length<=1){
    subtasksMessage();
  } else{
    currentTask.subtasks[j].subtaskName = subTaskInput;
    editSubtaskCard(i, j);
    renderAddSubtasksCard(i);  
  }
}


/**
 * Function to edit the message on the board for subtasks.
 *
 */
function subtasksMessageEditBoard() {
  document.getElementById("msgBox").innerHTML = "Task sucessfully edited";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    document.getElementById("msgBox").innerHTML = "Task added to Board";
  }, 2000);
}


/**
 * Opens the edit assign box for a given index and handler, and performs necessary actions based on the visibility state of the box.
 *
 * @param {number} i - The index for the assignment
 * @param {string} handler - The handler identifier
 */
function openEditAssignTo(i, handler) {
  let assingBox = document.getElementById(`${handler}list1`);

  if (!assingBox.classList.contains("visible")) {
    assingBox.classList.add("visible");
    renderAssignedUserAddTask(handler);
    setCheckBoxesEdit(i, handler);
  } else {
    assingBox.classList.remove("visible");
  }
  setBoxListener(assingBox);
}


/**
 * Opens the edit category box and sets the category input to be disabled or enabled based on the current state of the category box visibility.
 *
 */
function openEditCategory() {
  let categoryBox = document.getElementById("edit-list2");
  let categoryInput = document.getElementById("parent-edit_items");

  if (!categoryBox.classList.contains("visible")) {
    categoryBox.classList.add("visible");
    categoryInput.setAttribute("disabled", "");
  } else {
    categoryBox.classList.remove("visible");
    categoryInput.removeAttribute("disabled", "");
  }
  setBoxListener(categoryBox);
}


/**
 * Function to set badges for adding and editing tasks.
 *
 */
function setBadgesAddTaskEdit() {
  userInitialsAssignedtoBadges = [];
  userColorsAssignedtoBadges = [];
  document.getElementById("edit-assigned-to-add-task-list").innerHTML = "";
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserAssign[index].initials;
    let colorremote = remoteuserAssign[index].color;
    if (remoteuserAssign[index]["id"] == index + 1) {
      userInitialsAssignedtoBadges.push(initialsremote);
      userColorsAssignedtoBadges.push(colorremote);
    }
  }
  renderBadgesAddTaskEdit();
}


/**
 * Edit a card.
 *
 * @param {number} i - the index of the card to edit
 */
function editCard(i) {
  let content = document.getElementById("card-background");
  editingCard = i;
  taskpriority = tasks[i]["prio"];
  renderEditCard(content, i);
  taskPriorityChoosed(taskpriority, "edit-");
}


/**
 * Toggles the styling of elements based on checkbox state.
 * 
 * @param {string} id - The ID of the element to toggle styling for.
 * @param {boolean} isChecked - The state of the checkbox.
 * @return {undefined}
 */
function toggleCheckbox(id,isChecked) {
  const divElement = document.getElementById(`edit-fullname-addtask-dd-${id}`);
  const parentDivElement = document.getElementById(`edit-catergory_list_${id}`);
  if (isChecked) {
    toggleTrueBox(id,divElement,parentDivElement);
  } else {
    toggleFalseBox(id,divElement,parentDivElement);
  }
}


<<<<<<< HEAD
/**
 * Toggles the true box for the given ID by adding classes to the div element and parent div element. 
 *
 * @param {type} id - The ID of the element to toggle
 */
function toggleTrueBox(id){
=======
function toggleTrueBox(id,divElement,parentDivElement){
>>>>>>> ba7f73098c504abab3974a45c79bf83c8839c7ba
  divElement.classList.add("white");
  parentDivElement.classList.add("contact_background");
  if (!usersassignedto.includes(id)) {
    usersassignedto.push(id);
    usersassignedto.sort();
  }
}


<<<<<<< HEAD
/**
 * Toggles the false box by removing certain classes from elements and updating the usersassignedto array.
 *
 * @param {type} id - The id of the box to toggle
 */
function toggleFalseBox(id){
=======
function toggleFalseBox(id,divElement,parentDivElement){
>>>>>>> ba7f73098c504abab3974a45c79bf83c8839c7ba
  divElement.classList.remove("white");
  parentDivElement.classList.remove("contact_background");
  const index = usersassignedto.indexOf(id);
  if (index !== -1) {
    usersassignedto.splice(index, 1);
    usersassignedto.sort();
  }
}


/**
 * Sets checkboxes for editing a card.
 *
 * @param {Object} editingCard - The card being edited.
 * @return {undefined} 
 */
function setCheckBoxesEdit(editingCard) {
  usersassignedto.forEach(element => {
    const id = element;
    const checkbox = document.getElementById(`edit-checkbox${id}`);
    checkbox.checked = true;
    toggleCheckbox(id, checkbox.checked);
  });
}

  
/**
 * Sets the initials, IDs, and colors for the current task based on the users assigned to it.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setInitialsEdit() {
  currentTask["assignedTo"] = [];
  currentTask['assignedToID'] = [];
  currentTask["colors"] = [];
  
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserAssign[index].initials;
    let usersremoteID = remoteuserAssign[index].id;
    let colorremote = remoteuserAssign[index].color;
    if (remoteuserAssign[index]["id"] == index + 1) {
      currentTask["assignedTo"].push(initialsremote);
      currentTask["assignedToID"].push(usersremoteID);
      currentTask["colors"].push(colorremote);
    }
  }
}


  /**
 * Filter tasks based on a specific category and search input, and update the HTML accordingly.
 *
 * @param {array} categorys - The category to filter tasks by
 * @param {string} searchInput - The search input to filter tasks by
 */
function filterCategory(categorys, searchInput) {
  tasks.forEach(function (task, i) {
    let checkTitlel = task["title"];
    let checkInfos = task["description"];
    if (task.categoryboard === categorys) {
      if (
        checkTitlel.toUpperCase().includes(searchInput.toUpperCase()) ||
        checkInfos.toUpperCase().includes(searchInput.toUpperCase())
      ) {
        clearBoardCategory(categorys);
        renderUpdateHTML(task, i);
        renderUpdateAssigned(task, i);
        finishedSubtasks(i);
        renderFinishCounter(i);
        finishcounter = 0;
      }else {
        clearBoardCategory(categorys);
        renderNoFilteredFound(categorys)
      }
    }
  });
}


function renderNoFilteredFound(categorys){
  document.getElementById(`${categorys}`).innerHTML =`
  <div class="card-board-empty" id="no-task-found">No tasks Found</div>
  `
}

/**
 * Delete a task from the tasks list, update the stored tasks, update the HTML, and close the card container.
 *
 * @param {number} i - The index of the task to delete
 */
async function deleteTask(i) {
  tasks.splice(i, 1);
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
  closeCardContainer();
  deleteTaskMessage();
}


/**
 * Asynchronously checks the status of a subtask and updates the task list in the HTML.
 *
 * @param {number} i - The index of the subtask.
 * @param {number} j - The index of the current task.
 */
async function checkSubtasks(i, j) {
  let status = document.getElementById(`subtask${j}`).checked;
  currentTask.subtasks[j]["subtaskStatus"] = status;
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
}


/**
 * Adds a subtask to the current task based on the input value from the "edit-subtasks" element.
 *
 * @param {type} i - description of parameter
 * @return {type} description of return value
 */
function addSubtasksCard(i, event) {
  let subtaskstoadd = document.getElementById("edit-subtasks").value;
        if (event.keyCode == 13) {
        event.preventDefault();
  if (subtaskstoadd) {
    let JSONToPush = {
      subtaskName: subtaskstoadd,
      subtaskStatus: false,
    };
    currentTask.subtasks.push(JSONToPush);
    document.getElementById("edit-subtasks").value = "";
    renderAddSubtasksCard(i);
  }}
}


/**
 * Deletes a subtask card from the current task.
 *
 * @param {number} i - index of the current task
 * @param {number} j - index of the subtask to be deleted
 */
function deleteSubtaskCard(i, j) {
  currentTask.subtasks.splice(j, 1);
  renderAddSubtasksCard(j);
}


/**
 * Function to show subtask icons card.
 *
 * @param {number} i - The first parameter representing some value.
 * @param {number} j - The second parameter representing some value.
 */
function showSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.remove("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.add("subtask-background");
}


/**
 * Hides the subtask icons card for a given index.
 *
 * @param {number} i - The index of the subtask icons card to hide
 * @param {number} j - Another parameter description
 */
function hideSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.add("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.remove("subtask-background");
}


/**
 * Resets the subtasks card by clearing the value of the "edit-subtasks" element.
 *
 */
function resetSubtasksCard() {
  document.getElementById("edit-subtasks").value = ``;
}


/**
 * Assigns users to help with the current task.
 *
 */
function usersAssignedToHelp() {
  currentTask["assignedToID"] = [];
  for (let i = 0; i < usersassignedto.length; i++) {
    let element = usersassignedto[i];
    element = element + 1;
    currentTask["assignedToID"].push(element);
  }
}


/**
 * Sets the assigned user help for the given editing card.
 *
 * @param {Object} editingCard - the editing card for which the assigned user help is being set
 */
function setAssignedUserHelp(editingCard) {
  currentTask["assignedToID"].forEach((element) => {
    let id = element - 1;
    if (!usersassignedto.includes(id)) {
      usersassignedto.push(id);
      usersassignedto.sort();
    }
    if (!usersassignedto.includes(id)) {
      usersassignedto.push(id);
      usersassignedto.sort();
    }
  });
}


/**
 * Opens the burger board and performs related actions.
 *
 * @param {Event} event - The event triggering the function
 * @param {number} i - The index parameter
 */
function openBurgerBoard(event, i) {
  currentDraggedElement = i;
  event.stopPropagation();
  openCardContainer();
  renderMoveToOptions();
  renderMoveToButtons(i);
}