// Funktion, die das Mindest- und Standarddatum setzt
function configureDatePicker() {
  // Funktion 1: Setzt das Mindesdatum auf das heutige Datum
  function setMinDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var formattedDate = today.getFullYear() + "-" + month + "-" + day;

    var datePicker = document.getElementById("datePicker");
    datePicker.setAttribute("min", formattedDate);

    // Gibt das Mindestatum in der Konsole aus
    console.log("Mindesdatum gesetzt auf: ", formattedDate);
  }

  // Funktion 2: Setzt das Standerddatum auf das heutige Datum
  function setDefaultDate() {
    var today = new Date();
    var day = ("0" + today.getDate()).slice(-2);
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var formattedDate = today.getFullYear() + "-" + month + "-" + day;

    var datePicker = document.getElementById("datePicker");
    datePicker.setAttribute("value", formattedDate);

    // Gibt das Standartddatum in der Konsole aus
    console.log("Standarddatum gesetzt auf: ", formattedDate);
  }

  setMinDate(); // Aufruf von Function 1
  setDefaultDate(); // Aufruf von Funktion 2
}

// Event-Listener, der darauf wartet, dass das DOM geladen wird
document.addEventListener("DOMContentLoaded", configureDatePicker);

let taskpriority = "medium";

function taskPriorityChoosed(i) {
  taskpriority = i;

  taskPriorityActive();
}

function taskPriorityActive() {
  if (taskpriority == "urgent") {
    renderUrgent();
  } else if (taskpriority == "medium") {
    renderMedium();
  } else if (taskpriority == "low") {
    renderLow();
  }
}

function renderUrgent() {
  document.getElementById("prio-urgent").classList.remove("frame-16");
  document.getElementById("prio-urgent").classList.add("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_fill.svg";
  document.getElementById("prio-medium").classList.remove("frame-25-active");
  document.getElementById("prio-medium").classList.add("frame-25");
  document.getElementById("prio-medium-img").src = "./img/medium_nofill.svg";
  document.getElementById("prio-low").classList.remove("frame-26-active");
  document.getElementById("prio-low").classList.add("frame-26");
  document.getElementById("prio-low-img").src = "./img/low_nofill.svg";
}

function renderMedium() {
  document.getElementById("prio-medium").classList.remove("frame-25");
  document.getElementById("prio-medium").classList.add("frame-25-active");
  document.getElementById("prio-medium-img").src = "./img/medium_fill.svg";
  document.getElementById("prio-low").classList.remove("frame-26-active");
  document.getElementById("prio-low").classList.add("frame-26");
  document.getElementById("prio-low-img").src = "./img/low_nofill.svg";
  document.getElementById("prio-urgent").classList.add("frame-16");
  document.getElementById("prio-urgent").classList.remove("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_nofill.svg";
}

function renderLow() {
  document.getElementById("prio-low").classList.remove("frame-26");
  document.getElementById("prio-low").classList.add("frame-26-active");
  document.getElementById("prio-low-img").src = "./img/low_fill.svg";
  document.getElementById("prio-medium").classList.remove("frame-25-active");
  document.getElementById("prio-medium").classList.add("frame-25");
  document.getElementById("prio-medium-img").src = "./img/medium_nofill.svg";
  document.getElementById("prio-urgent").classList.add("frame-16");
  document.getElementById("prio-urgent").classList.remove("frame-16-active");
  document.getElementById("prio-urgent-img").src = "./img/urgent_nofill.svg";
}

function addTasksToStorage() {
  let title = document.getElementById("task-title");
  let description = document.getElementById("task-description");
  let date = document.getElementById("datePicker");

  let JSONToPush = {
    categoryboard: "todo",
    category: "JSONPUSHTEST",
    title: title.value,
    description: description.value,
    dueDate: date.value,
    prio: taskpriority,
    subtasks: ["1", "2", "3"],
    assignedTo: ["XY", "ZA", "BC"],
  };

  tasks.push(JSONToPush);
  title.value = "";
  description.value = "";
  date.value = "";

  // FORMVALIDATION MIT IF ELSE ABFRAGE

  taskAddedCompleteText();

  //

  console.log(tasks);
  saveToLocalStorage();
}

function taskAddedCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  document.querySelector("form").noValidate = true;
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    location.href = "./board.html";
  }, 2000);
}

function clearFields(){
  console.log('funktion zum leeren der Input felder oder neu laden der Seite')
}




// DROPDOWN CHECKBOX

function dropdown(){
    var checkList = document.getElementById("list1");
checkList.getElementsByClassName("anchor")[0].onclick = function (evt) {
  if (checkList.classList.contains("visible"))
    checkList.classList.remove("visible");
  else checkList.classList.add("visible");
};
}

// 


