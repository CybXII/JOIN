/**
 * Render the summary of tasks and user details on the page.
 *
 * @return {Promise<void>} A promise that resolves when the summary is rendered.
 */
async function renderSummary() {
  await loadTasks();
  setAmounts();
  document.getElementById("summ-tasks-todo").innerHTML = taskstodo;
  document.getElementById("summ-tasks-done").innerHTML = tasksdone;
  document.getElementById("summ-tasks-urgent").innerHTML = tasksurgent;
  document.getElementById("summ-tasks-board").innerHTML = tasks.length;
  document.getElementById("summ-tasks-progress").innerHTML = tasksinprogress;
  document.getElementById("summ-tasks-feedback").innerHTML = tasksawaitfeedback;
  greetUsername();
}

/**
 * Function to greet the username by updating the DOM with user information and rendering summary and greeting components.
 */
function greetUsername() {
  if (users[0].id != 999) {
    document.getElementById("summary-fullname").innerHTML = users[0].name;
    document.getElementById("summary-fullname-resp").innerHTML = users[0].name;
  }
  removeActiveClass();
  setActivClass("summary")
  renderGreetingTime();
  renderUrgent();
}

/**
 * Renders the upcoming urgent tasks and their due dates.
 */
function renderUrgent() {
  let filteredduedates = tasks
    .filter((task) => task.prio === "urgent" && task.categoryboard !== "done")
    .map((task) => new Date(task.dueDate));
  filteredduedates.sort((a, b) => a - b);
  let smallestduedate = filteredduedates[0];
  if (filteredduedates.length === 0) {
    document.getElementById("summ-upcoming").innerHTML = `No Urgent Tasks`;
    document.getElementById("urgent-tasks").classList.add("d-none");
    return;
  } else {
    document.getElementById("summ-upcoming").innerHTML =
      formatDate(smallestduedate);
  }
}

/**
 * Formats the given date into a string with the format "Month Day, Year".
 *
 * @param {Date} date - the date to format
 * @return {string} the formatted date string
 */
function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

/**
 * Determines the appropriate greeting based on the current time of day.
 *
 * @return {string} the appropriate greeting for the time of day
 */
function greetingTime() {
  let currenttime = new Date();
  let currenthour = currenttime.getHours();

  if (currenthour >= 5 && currenthour < 12) {
    return "Good morning";
  } else if (currenthour >= 12 && currenthour < 18) {
    return "Good day";
  } else return "Good evening";
}

/**
 * Renders the greeting time on the summary section.
 *
 */
function renderGreetingTime() {
  document.getElementById("summary-greeting").innerHTML = greetingTime();
  document.getElementById("summary-greeting-resp").innerHTML = greetingTime();
}

/**
 * Function to perform a summary greeting animation by adding a "transparent" class to specific elements and removing the background after a delay of 1500ms.
 *
 */
function greetSummaryAnimation() {
  setTimeout(() => {
    document
      .getElementById("summary-greeting-resp")
      .classList.add("transparent");
    document
      .getElementById("summary-fullname-resp")
      .classList.add("transparent");
    removeBackground();
  }, 1500);
}

/**
 * Removes the background of the specified element after a delay.
 *
 */
function removeBackground() {
  setTimeout(() => {
    document
      .getElementById("frame-69_responsiv")
      .classList.remove("frame-69_responsiv_background");
    document.getElementById("frame-69_responsiv").classList.add("d-none");
  }, 300);
}
