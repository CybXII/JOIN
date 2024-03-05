/**
 * Render the assigned users based on the handler type.
 *
 * @param {string} handler - the type of handler
 */
function renderAssignedTo(handler) {
  if (handler === "edit-") {
    let assigncontent = document.getElementById("edit-assigned-list");
    assigncontent.innerHTML = "";
    remoteuserassign.forEach((element, i) => {
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
            <input id="edit-checkbox${i}" type="checkbox" class="checkbox" onclick="addClassOnCheckboxChange(${i},'edit-'), setBadgesAddTaskEdit()" />
          </div>
        </li>
        `;
    }, (assigncontent.innerHTML = ""));
  } else {
    handler = "";
    let assigncontent = document.getElementById(`${handler}assigned-list`);
    assigncontent.innerHTML = "";
    remoteuserassign.forEach((element, i) => {
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

/**
 * Renders badges for adding tasks.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function renderBadgesAddTask() {
  for (let i = 0; i < userinitialsassignedtobadges.length; i++) {
    const initials = userinitialsassignedtobadges[i];
    const color = usercolorsassignedtobadges[i];
    let content = document.getElementById("assigned-to-add-task-list");
    renderBadges(initials, color, content, i);
  }
}

/**
   * Renders badges based on the provided initials, color, content, and index.
   *
   * @param {string} initials - The initials to be displayed on the badge
   * @param {string} color - The background color of the badge
   * @param {HTMLElement} content - The HTML element to which the badges will be rendered
   * @param {number} i - The index used to determine badge rendering logic
   */
function renderBadges(initials, color, content, i) {
  if (i <= 3) {
    content.innerHTML += /*html*/ `<div class="assigned-to-add-task-user" style="background-color: ${color}">${initials}</div>`;
  }
  if (i == 4) {
    content.innerHTML += /*html*/ `<div id="grey_badge" class="assigned-to-add-task-user" style="background-color: grey">+${i -3}</div>`;
  }
  if (i > 4) {
    document.getElementById("grey_badge").innerHTML = /*html*/ `+${i -3}</div>`;
  }
}

/**
   * Render assigned user task handler
   *
   * @param {string} handler - the handler type
   */
function renderAssignedUserAddTask(handler) {
  if (handler === "edit-") {
    for (let i = 0; i < usersassignedto.length; i++) {
      renderEditAssignedUser(handler, i);
    }
  } else {
    for (let i = 0; i < usersassignedto.length; i++) {
      renderStandartAssignedUser(i);
    }
  }
}

/**
 * Renders the edit for the assigned user at the specified index.
 *
 * @param {function} handler - The handler function for the edit
 * @param {number} i - The index of the assigned user
 */
function renderEditAssignedUser(handler, i) {
  let index = usersassignedto[i];
  if (usersassignedto.includes(index + 1)) {
    document.getElementById(`${handler}checkbox${index}`).checked = true;
    addClassOnCheckboxChange(index, handler);
  }
}

/**
 * Renders the assigned user based on the given index.
 *
 * @param {number} i - The index of the user to render
 */
function renderStandartAssignedUser(i) {
  let index = usersassignedto[i];
  if (usersassignedto.includes(index)) {
    document.getElementById(`checkbox${index}`).checked = true;
    addClassOnCheckboxChange(index);
  }
}

/**
 * Function to render the medium priority handler.
 *
 * @param {string} handler - The handler to be rendered
 */
function renderMedium(handler) {
  document.getElementById(`${handler}prio-medium`).classList.remove("frame-25");
  document.getElementById(`${handler}prio-medium`).classList.add("frame-25-active");
  document.getElementById(`${handler}prio-medium-img`).src ="./img/medium_fill.svg";
  document.getElementById(`${handler}prio-low`).classList.remove("frame-26-active");
  document.getElementById(`${handler}prio-low`).classList.add("frame-26");
  document.getElementById(`${handler}prio-low-img`).src ="./img/low_nofill.svg";
  document.getElementById(`${handler}prio-urgent`).classList.add("frame-16");
  document.getElementById(`${handler}prio-urgent`).classList.remove("frame-16-active");
  document.getElementById(`${handler}prio-urgent-img`).src ="./img/urgent_nofill.svg";
}

/**
   * Function to render the low priority handler.
   *
   * @param {handler} handler - The handler for which the low priority should be rendered
   */
function renderLow(handler) {
  document.getElementById(`${handler}prio-low`).classList.remove("frame-26");
  document.getElementById(`${handler}prio-low`).classList.add("frame-26-active");
  document.getElementById(`${handler}prio-low-img`).src = "./img/low_fill.svg";
  document.getElementById(`${handler}prio-medium`).classList.remove("frame-25-active");
  document.getElementById(`${handler}prio-medium`).classList.add("frame-25");
  document.getElementById(`${handler}prio-medium-img`).src ="./img/medium_nofill.svg";
  document.getElementById(`${handler}prio-urgent`).classList.add("frame-16");
  document.getElementById(`${handler}prio-urgent`).classList.remove("frame-16-active");
  document.getElementById(`${handler}prio-urgent-img`).src ="./img/urgent_nofill.svg";
}
