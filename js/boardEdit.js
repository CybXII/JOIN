/**
 * Edit tasks from storage and update the task properties based on the input values.
 *
 * @param {number} i - The index of the task to be edited
 * @return {Promise<void>} A Promise that resolves after updating the tasks in the storage
 */
async function editTasksfromStorage(i) {
  currenttask["title"] = document.getElementById("edit-task-title").value;
  currenttask["dueDate"] = document.getElementById("edit-datepicker").value;
  currenttask["description"] = document.getElementById(
    "edit-task-description"
  ).value;
  currenttask["category"] =
    document.getElementById("parent-edit_items").innerHTML;
  currenttask["prio"] = taskpriority;
  tasks[i] = currenttask;
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
  subtasksadd.push(tasks[i].subtasks);
  subtasksaddcard = [];
  subtasksaddcard.push(subtasksadd[0]);
  document.getElementById(`edit-subtasks-container`).innerHTML = "";
  for (let j = 0; j < currenttask.subtasks.length; j++) {
    const element = currenttask.subtasks[j].subtaskName;
    let content = document.getElementById(`edit-subtasks-container`);
    renderEditSubtasks(element, content, i, j);
  }
  subtasksadd = [];
}

/**
 * Edit the subtask card with the specified index.
 *
 * @param {number} i - the index of the subtask card
 * @param {number} j - the index of the subtask
 */
function editSubtaskCard(i, j) {
  let container = document.getElementById(`subtask-comp-${j}`);
  let textcontent = currenttask.subtasks[j].subtaskName;
  container.innerHTML = editSubTaskHtmlCard(textcontent, i, j);
  hideSubtaskIconsCard(j);
}

/**
 * Function to add or edit a subtask card.
 *
 * @param {number} i - The index parameter.
 * @param {number} j - The index parameter.
 */
async function addEditSubTaskCard(i, j) {
  let subtaskinput = document.getElementById(`editSubTaskInput${j}`).value;
  if (subtaskinput.length <= 1) {
    subtasksMessage();
  } else {
    currenttask.subtasks[j].subtaskName = subtaskinput;
    editSubtaskCard(i, j);
    renderAddSubtasksCard(i);
  }
}

/**
 * Opens the edit assign box for a given index and handler, and performs necessary actions based on the visibility state of the box.
 *
 * @param {number} i - The index for the assignment
 * @param {string} handler - The handler identifier
 */
function openEditAssignTo(i, handler) {
  let assingbox = document.getElementById(`${handler}list1`);
  if (!assingbox.classList.contains("visible")) {
    assingbox.classList.add("visible");
    renderAssignedUserAddTask(handler);
    setCheckBoxesEdit(i, handler);
  } else {
    assingbox.classList.remove("visible");
  }
  setBoxListener(assingbox);
}

/**
 * Opens the edit category box and sets the category input to be disabled or enabled based on the current state of the category box visibility.
 *
 */
function openEditCategory() {
  let categorybox = document.getElementById("edit-list2");
  let categoryinput = document.getElementById("parent-edit_items");
  if (!categorybox.classList.contains("visible")) {
    categorybox.classList.add("visible");
    categoryinput.setAttribute("disabled", "");
  } else {
    categorybox.classList.remove("visible");
    categoryinput.removeAttribute("disabled", "");
  }
  setBoxListener(categorybox);
}

/**
 * Function to set badges for adding and editing tasks.
 *
 */
function setBadgesAddTaskEdit() {
  userinitialsassignedtobadges = [];
  usercolorsassignedtobadges = [];
  document.getElementById("edit-assigned-to-add-task-list").innerHTML = "";
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserassign[index].initials;
    let colorremote = remoteuserassign[index].color;
    if (remoteuserassign[index]["id"] == index + 1) {
      userinitialsassignedtobadges.push(initialsremote);
      usercolorsassignedtobadges.push(colorremote);
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
  editingcard = i;
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
function toggleCheckbox(id, isChecked) {
  const divelement = document.getElementById(`edit-fullname-addtask-dd-${id}`);
  const parentdivelement = document.getElementById(`edit-catergory_list_${id}`);
  if (isChecked) {
    toggleTrueBox(id, divelement, parentdivelement);
  } else {
    toggleFalseBox(id, divelement, parentdivelement);
  }
}

/**
 * Function to toggle the true box and add class to elements if necessary, and push and sort id into usersassignedto array if not already included.
 *
 * @param {type} id - description of parameter
 * @param {type} divelement - description of parameter
 * @param {type} parentdivelement - description of parameter
 * @return {type} description of return value
 */
function toggleTrueBox(id, divelement, parentdivelement) {
  divelement.classList.add("white");
  parentdivelement.classList.add("contact_background");
  if (!usersassignedto.includes(id)) {
    usersassignedto.push(id);
    usersassignedto.sort();
  }
}

/**
 * Remove the "white" class from the divelement and the "contact_background" class from the parentdivelement,
 * and remove the id from the usersassignedto array if it exists, then sort the array.
 *
 * @param {type} id - description of parameter
 * @param {type} divelement - description of parameter
 * @param {type} parentdivelement - description of parameter
 */
function toggleFalseBox(id, divelement, parentdivelement) {
  divelement.classList.remove("white");
  parentdivelement.classList.remove("contact_background");
  const index = usersassignedto.indexOf(id);
  if (index !== -1) {
    usersassignedto.splice(index, 1);
    usersassignedto.sort();
  }
}

/**
 * Sets checkboxes for editing a card.
 *
 * @param {Object} editingcard - The card being edited.
 * @return {undefined}
 */
function setCheckBoxesEdit(editingcard) {
  usersassignedto.forEach((element) => {
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
  currenttask["assignedTo"] = [];
  currenttask["assignedToID"] = [];
  currenttask["colors"] = [];
  for (let i = 0; i < usersassignedto.length; i++) {
    let index = usersassignedto[i];
    let initialsremote = remoteuserassign[index].initials;
    let usersremoteid = remoteuserassign[index].id;
    let colorremote = remoteuserassign[index].color;
    if (remoteuserassign[index]["id"] == index + 1) {
      currenttask["assignedTo"].push(initialsremote);
      currenttask["assignedToID"].push(usersremoteid);
      currenttask["colors"].push(colorremote);
    }
  }
}

/**
 * Filter tasks based on a specific category and search input, and update the HTML accordingly.
 *
 * @param {array} categorys - The category to filter tasks by
 * @param {string} searchinput - The search input to filter tasks by
 */
function filterCategory(categorys, searchinput) {
  tasks.forEach(function (task, i) {
    let checktitle = task["title"];
    let checkinfos = task["description"];
    if (task.categoryboard === categorys) {
      if (
        checktitle.toUpperCase().includes(searchinput.toUpperCase()) ||
        checkinfos.toUpperCase().includes(searchinput.toUpperCase())
      ) {
        renderFilteredTasks(categorys, task, i);
      }
    }
  });
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
  currenttask.subtasks[j]["subtaskStatus"] = status;
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
  }
  if (subtaskstoadd) {
    let jsontopush = {
      subtaskName: subtaskstoadd,
      subtaskStatus: false,
    };
    currenttask.subtasks.push(jsontopush);
    document.getElementById("edit-subtasks").value = "";
    renderAddSubtasksCard(i);
  }
}

/**
 * Deletes a subtask card from the current task.
 *
 * @param {number} i - index of the current task
 * @param {number} j - index of the subtask to be deleted
 */
function deleteSubtaskCard(i, j) {
  currenttask.subtasks.splice(j, 1);
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
  currenttask["assignedToID"] = [];
  for (let i = 0; i < usersassignedto.length; i++) {
    let element = usersassignedto[i];
    element = element + 1;
    currenttask["assignedToID"].push(element);
  }
}

/**
 * Opens the burger board and performs related actions.
 *
 * @param {Event} event - The event triggering the function
 * @param {number} i - The index parameter
 */
function openBurgerBoard(event, i) {
  currentdraggedelement = i;
  event.stopPropagation();
  openCardContainer();
  renderMoveToOptions();
  renderMoveToButtons(i);
}
