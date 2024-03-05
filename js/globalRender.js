/**
 * Initializes the function with the specified input, checks if the function is in the global context,
 * and executes it if found; otherwise, logs an error.
 *
 * @param {string} input - The input to be used for function initialization.
 * @return {Promise<void>} A Promise that resolves once the function has been executed or an error has been logged.
 */
async function includeHTMLInit(input) {
  let functionname = `render${input}`;
  await includeHTML();
  loadUsersFromLocalStorage();

  if (users[0] == undefined) {
    window.location.href = "login.html";
  }
  if (typeof window[functionname] === "function") {
    window[functionname]();
    document.getElementById("header-initials").innerHTML = users[0].initials;
  } else {
    console.error(`Die Funktion ${functionname} wurde nicht gefunden.`);
  }
}

/**
 * Render a filtered card to the specified category.
 *
 * @param {Object} task - The task object to render
 * @param {number} i - The index of the card
 * @param {string} categorys - The category to render the card in
 */
function renderFilteredCard(task, i, categorys) {
  document.getElementById(categorys).innerHTML += `
  <div class="card-board" draggable="true" ondragstart="rotateCardStart(${i}),moveToLocation(${i}),highlight()" id="board-card${i}" onclick="openCard(${i})" ondragend="rotateCardEnd()">
    <div class="frame-119">
      <div class="card-board-user-story">
        <span class="card-board-user-story-text">${task.category}</span>
      </div>
      <div class="frame-114">
        <span class="card-board-title">${task.title}</span>
        <span class="card-board-content">${task.description}</span>
      </div>
      <div class="card-board-progress" id="parent-progress-div${i}">
        <div class="card-board-progress-bar">
          <div class="card-board-progress-bar-filler"></div>
        </div>
        <span class="card-board-count-progress">
          1/${task.subtasks.length} Subtasks
        </span>
      </div>
      <div class="frame-139">
        <div class="frame-217" id="assigned-to${i}">
        </div>
        <div class="card-board-priority">
          <img src="./img/prio-baja-board.svg" id="prio-svg${i}" class="card-board-priority-img" />
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Renders the assigned tasks for a given index.
 *
 * @param {number} i - The index of the task to render
 */
function renderAssigned(i) {
  let assignedtask = tasks[i].assignedTo;
  let colorstask = tasks[i].colors;
  let userid = tasks[i].assignedToID;
  for (let x = 0; x < assignedtask.length; x++) {
    const initials = assignedtask[x];
    const colors = colorstask[x];
    let assignnames = usersAssignTask(userid[x]);
    let assigntask = document.getElementById(`card_assignedTo`);
    assigntask.innerHTML += renderAssignedHTML(initials, assignnames, colors);
  }
}

/**
 * Renders assigned HTML based on initials, assigned names, and colors.
 *
 * @param {string} initials - The initials to be displayed.
 * @param {string} assignnames - The names to be assigned.
 * @param {string} colors - The color to be used for the background.
 * @return {string} The rendered HTML.
 */
function renderAssignedHTML(initials, assignnames, colors) {
  return /*html*/ `<div class="contact">
          <div id="contact_color" class="overlap-group" style="background-color: ${colors}">
            <div class="text-wrapper-2">${initials}</div>
          </div>
          <div class="assigned_name">${assignnames}</div>
        </div>`;
}

/**
 * Renders the finish counter for a specific ID.
 *
 * @param {type} id - the ID of the element
 * @return {type} undefined
 */
function renderFinishCounter(id) {
  document.getElementById(
    `subtask-counter${id}`
  ).innerHTML = `${finishcounter}/${tasks[id]["subtasks"].length} Subtasks`;
}

/**
 * Render subtask information for a given task.
 *
 * @param {number} i - Index of the task
 */
function renderSubtasksInfos(i) {
  let subtasks = tasks[i].subtasks;
  for (let j = 0; j < subtasks.length; j++) {
    const element = subtasks[j].subtaskName;
    if (subtasks[j]["subtaskStatus"] === false) {
      let subtasksTask = document.getElementById("subtask-items");
      subtasksTask.innerHTML += renderSubtasksInfosHTML(i, j, element,'');
    } else {
      let subtasksTask = document.getElementById("subtask-items");
      subtasksTask.innerHTML += renderSubtasksInfosHTML(i, j, element,'checked');
    }
  }
}


/**
 * Renders the HTML for subtask information.
 *
 * @param {number} i - The first parameter description
 * @param {number} j - The second parameter description
 * @param {any} element - The third parameter description
 * @param {element} check - The checked parameter sets checked if subtask status is true description
 * @return {string} The rendered HTML for subtask information
 */
function renderSubtasksInfosHTML(i, j, element, check) {
  let checked = check;
  return /*html*/ `<div class="card_subtasks_item">
          <input ${checked} id="subtask${j}" type="checkbox" class="card_checkbox" onclick="checkSubtasks(${i},${j})">
          <p>${element}</p>
        </div>`;
}

/**
 * Renders and updates the grey badge on the assigned element.
 *
 * @param {HTMLElement} assigned - the element to which the grey badge will be added
 * @param {number} j - the value used to update the grey badge
 */
function renderUpdateGreyBadge(assigned, j, i) {
  assigned.innerHTML += `
    <div class="card-board-profile-batch">
      <div class="group-9-board">
        <div id="grey_badge${i}" class="group-9-text" style="background-color: grey;">+${j-3}</div>
      </div>
    </div>`;
}

/**
 * Renders and updates colored badges on the assigned element.
 *
 * @param {HTMLElement} assigned - the element to which the colored badges will be added
 * @param {string} colorbg - the background color for the badge
 * @param {string} assign - the content of the badge
 */
function renderUpdateColoredBadges(assigned, colorbg, assign) {
  assigned.innerHTML += `
    <div class="card-board-profile-batch">
      <div class="group-9-board">
        <div class="group-9-text" style="background-color: ${colorbg}">${assign}</div>
      </div>
    </div>`;
}


/**
 * Renders and updates the HTML for a task.
 *
 * @param {type} task - the task object to render
 * @param {type} i - the index of the task
 */
function renderUpdateHTML(task, i) {
  document.getElementById(task.categoryboard).innerHTML += /*html*/ `
        <div class="card-board" draggable="true" ondragstart="rotateCardStart(${i}),moveToLocation(${i}),highlight()" id="board-card${i}" onclick="openCard(${i})" ondragend="rotateCardEnd()">
            <div class="frame-119">
              <div class="frame-119-flex">
                <div class="card-board-user-story" id="card-board-category${i}">
                  <span class="card-board-user-story-text">${task.category}</span>
                </div>
                <div class="frame-119-burger" id="frame-119-burger${i}" onclick="openBurgerBoard(event, ${i})"></div>
              </div>
              <div class="frame-114">
                <span class="card-board-title">${task.title}</span>
                <span class="card-board-content">${task.description}</span>
              </div>
              <div class="card-board-progress" id="parent-progress-div${i}">
                <div class="card-board-progress-bar">
                  <div class="card-board-progress-bar-filler" id="progress-bar-${i}"></div>
                </div>
                <span class="card-board-count-progress" id="subtask-counter${i}">
                </span>
              </div>
              <div class="frame-139">
                <div class="frame-217" id="assigned-to${i}"></div>
                <div class="card-board-priority">
                  <img src="./img/prio-baja-board.svg" id="prio-svg${i}" class="card-board-priority-img" />
                </div>
              </div>
            </div>
        </div>`;
  prioChecker(task, i);
}


/**
 * Function to check the priority and category of a task and update the corresponding elements in the DOM.
 *
 * @param {object} task - The task object containing priority and category information
 * @param {number} i - The index of the task
 */
function prioChecker(task, i) {
  if (task.prio == "urgent") {
    document.getElementById(`prio-svg${i}`).src = "./img/urgent_nofill.svg";
  } else if (task.prio == "medium") {
    document.getElementById(`prio-svg${i}`).src = "./img/medium_nofill.svg";
  } else if (task.prio == "low") {
    document.getElementById(`prio-svg${i}`).src = "./img/low_nofill.svg";
  }
  if (task.category == "User Story") {
    document.getElementById(`card-board-category${i}`).style =
      "background: #0038FF";
  } else {
    document.getElementById(`card-board-category${i}`).style =
      "background: #1FD7C1";
  }
}


/**
 * Renders and updates the subtasks in the subtasks-container element.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function renderAddSubtasks() {
  document.getElementById("subtasks-container").innerHTML = "";
  for (let i = 0; i < subtasksadd.length; i++) {
    const element = subtasksadd[i].subtaskName;
    let content = document.getElementById("subtasks-container");
    content.innerHTML += /*html*/ `
      <div id="subtask-comp-${i}">
        <div class="subtask-comp" onmouseover="showSubtaskIcons(${i})" onmouseleave="hideSubtaskIcons(${i})">
          <span class="subtask-task" id='subtask${i}' ondblclick="editSubtask(${i})">⦁ ${element}</span>
          <div class="sub-icons d-none" id="subtask-icons-${i}">
            <img src="./img/edit.svg" alt="" onclick="editSubtask(${i})" class="subtask-icon"/>
            <img src="./img/Vector 19.svg" alt="" />
            <img src="./img/delete.svg" alt="" onclick="deleteSubtask(${i})" class="subtask-icon"/>
          </div>
        </div>
      </div>`;
  }
}


/**
 * Function to render urgent priority for the given handler.
 *
 * @param {string} handler - The identifier for the element
 */
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


/**
 * Renders the contact information HTML based on the provided parameters.
 *
 * @param {string} fullname - The full name of the contact
 * @param {string} email - The email address of the contact
 * @param {string} color - The color for the background of the circle
 * @param {string} initials - The initials to be displayed in the circle
 * @param {string} phone - The phone number of the contact
 * @param {string} userid - The user id of the contact
 * @param {number} i - The index of the contact
 * @return {string} The rendered HTML for the contact information
 */
function renderContactInfo(fullname, email, color, initials, phone, userid, i) {
  return /*html*/ `  
  <div class="frame-105">
    <div class="frame-79">
      <div class="group">
        <div class="circle" style="background-color:${color};"><div class="text-wrapper-circle">${initials}</div></div>
      </div>
    </div>
    <div class="frame-104">
      <div class="frame-81">${fullname}</div>
      <div class="frame-204">
        <div class="frame-108" onclick="editContact('${userid}', '${i}')"><img src="./img/pen.svg" alt=""><p>Edit</p></div>
        <div class="delete" onclick="deleteContact('${userid}', '${i}')"><img src="./img/trash.svg" alt=""><p>Delete</p></div>
      </div>
    </div>
  </div>
  <div class="frame-106">
    <span>Contact Information</span>
    <p></p>
  </div>
  <div class="frame-101">
    <div class="frame-102">
      <p class="email">Email</p>
      <a href="mailto:${email}">${email}</a>
    </div>
    <div class="frame-103">
      <p class="Phone">Phone</p>
      <a href="tel:${phone}">${phone}</a>
    </div>
  </div>
`;
}


/**
 * Renders and updates the assigned tasks for a specific task.
 *
 * @param {object} task - the task object
 * @param {number} i - the index of the task
 */
function renderUpdateAssigned(task, i) {
  let assigned = document.getElementById(`assigned-to${i}`);
  for (let j = 0; j < task["assignedTo"].length; j++) {
    const assign = task["assignedTo"][j];
    const colorbg = task["colors"][j];
    if (j <= 3) {
      renderUpdateColoredBadges(assigned, colorbg, assign);
    } else if (j == 4) {
      renderUpdateGreyBadge(assigned, j, i);
    } else if (j >= 5) {
      document.getElementById(`grey_badge${i}`).innerHTML = `+${j - 3}`;
    }
  }
}
