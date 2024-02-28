async function editTasksfromStorage(i) {
  currentTask["title"] = document.getElementById("edit-task-title").value;
  currentTask["dueDate"] = document.getElementById("edit-datePicker").value;
  currentTask["description"] = document.getElementById(
    "edit-task-description"
  ).value;
  currentTask["category"] = document.getElementById(
    "parent-edit_items"
  ).innerHTML;
  currentTask["prio"] = taskpriority;
  tasks[i] = currentTask;
  setInitialsEdit();
  closeCardContainer();
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
}

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

function editSubtaskCard(i, j) {
  let container = document.getElementById(`subtask-comp-${j}`);
  let textContent = currentTask.subtasks[j].subtaskName;
  container.innerHTML = editSubTaskHtmlCard(textContent, i, j);
  hideSubtaskIconsCard(j);
}

async function addEditSubTaskCard(i, j) {
  let subTaskInput = document.getElementById("editSubTaskInput");
  currentTask.subtasks[j].subtaskName = subTaskInput.value;
  editSubtaskCard(i, j);
  renderAddSubtasksCard(i);
}

function openEditAssignTo(i, handler) {
  let assingBox = document.getElementById("edit-list1");

  if (!assingBox.classList.contains("visible")) {
    assingBox.classList.add("visible");
    renderAssignedUserAddTask(handler);
    setCheckBoxesEdit(i, handler);
  } else {
    assingBox.classList.remove("visible");
  }
  setBoxListener(assingBox);
}

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

function setBadgesAddTaskEdit() {
  userInitialsAssignedtoBadges = [];
  userColorsAssignedtoBadges = [];
  document.getElementById("edit-assigned-to-add-task-list").innerHTML = "";
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
  renderBadgesAddTaskEdit();
}

function openAssignToEdit() {
  let logoutBox = document.getElementById("edit-list1");

  if (!logoutBox.classList.contains("visible")) {
    logoutBox.classList.add("visible");
    renderAssignedUserAddTask();
  } else {
    logoutBox.classList.remove("visible");
  }

  setBoxListenerEdit(logoutBox);
}

/**
 * Edit a card.
 *
 * @param {number} i - the index of the card to edit
 * @return {undefined} 
 */
function editCard(i) {
  let content = document.getElementById("card-background");
  editingCard = i;
  taskpriority = tasks[i]["prio"];
  renderEditCard(content, i);
  taskPriorityChoosed(taskpriority, "edit-");
}

/**
   * Set checkboxes for editing a card.
   *
   * @param {Object} editingCard - the card being edited
   * @return {undefined} 
   */
function setCheckBoxesEdit(editingCard) {
  usersassignedto.forEach(element => {
    let id = element;
    const checkbox = document.getElementById(`edit-checkbox${id}`);
    const divElement = document.getElementById(
      `edit-fullname-addtask-dd-${id}`
    );
    const parentDivElement = document.getElementById(
      `edit-catergory_list_${id}`
    );
    checkbox.checked = true;
    divElement.classList.add("white");
    parentDivElement.classList.add("contact_background");
    if (!usersassignedto.includes(id)) {
      usersassignedto.push(id);
      usersassignedto.sort();
    }
    if (checkbox.checked) {
      divElement.classList.add("white");
      parentDivElement.classList.add("contact_background");
      if (!usersassignedto.includes(id)) {
        usersassignedto.push(id);
        usersassignedto.sort();
      }
    } else {
      divElement.classList.remove("white");
      parentDivElement.classList.remove("contact_background");
      const index = usersassignedto.indexOf(id);
      if (index !== -1) {
        usersassignedto.splice(index, 1);
        usersassignedto.sort();
      }
    }
  });
}


/**
 * Reset the tasks board by updating the tasks array and then storing it in the local storage.
 *
 * @return {Promise<void>} A Promise that resolves when the tasks array is successfully stored in the local storage.
 */
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
    // addTasksToStorage();
  }