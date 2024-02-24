async function renderSummary() {
  loadUsersFromLocalStorage();
  await loadTasks();
  setAmounts();


  
  document.getElementById("summ-tasks-todo").innerHTML = tasksTodo;
  document.getElementById("summ-tasks-done").innerHTML = tasksDone;
  document.getElementById("summ-tasks-urgent").innerHTML = tasksUrgent;
  document.getElementById("summ-tasks-board").innerHTML = tasks.length;
  document.getElementById("summ-tasks-progress").innerHTML = tasksInProgress;
  document.getElementById("summ-tasks-feedback").innerHTML = tasksAwaitFeedback;
  document.getElementById("summary-fullname").innerHTML = users[0].name;
  document.getElementById("summary-fullname-resp").innerHTML = users[0].name;
  classesSummary();
  renderGreetingTime();
  renderUrgent();
}


function renderUrgent() {
  let filteredDueDates = tasks
    .filter((task) => task.prio === "urgent" && task.categoryboard !== "done")
    .map((task) => new Date(task.dueDate));

  filteredDueDates.sort((a, b) => a - b);

  if (filteredDueDates.length === 0) {
    document.getElementById("summ-upcoming").innerHTML = `No Urgent Tasks`
    document.getElementById("urgent-tasks").classList.add('d-none');
    return;
  }

  let smallestDueDate = filteredDueDates[0];

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

  document.getElementById("summ-upcoming").innerHTML =
    formatDate(smallestDueDate);
}


// function renderUrgent(){
  
//   let filteredDueDates = tasks
//   .filter((task) => task.prio === "urgent" && task.categoryboard !== "done")
//   .map((task) => new Date(task.dueDate));
//   filteredDueDates.sort((a, b) => a - b);
//   let smallestDueDate = filteredDueDates[0];
//   function formatDate(date) {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const month = months[date.getMonth()];
//     const day = date.getDate();
//     const year = date.getFullYear();
//     return `${month} ${day}, ${year}`;
//   }
//   document.getElementById("summ-upcoming").innerHTML =
//     formatDate(smallestDueDate);
// }

function greetingTime() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning,";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good day,";
  } else return "Good evening,";
}

function renderGreetingTime() {
  document.getElementById("summary-greeting").innerHTML = greetingTime();
  document.getElementById("summary-greeting-resp").innerHTML = greetingTime();
}

function greetSummaryAnimation() {
  setTimeout(() => {
    document.getElementById("summary-greeting-resp").classList.add("transparent");
    document.getElementById("summary-fullname-resp").classList.add("transparent");
    removeBackground();
  },1500);
  
}

function removeBackground(){
  setTimeout(() => {
    document.getElementById("frame-69_responsiv").classList.remove("frame-69_responsiv_background");
  }, 300);

}
