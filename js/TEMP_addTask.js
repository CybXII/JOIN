
// Funktion, die das Mindest- und Standarddatum setzt
function configureDatePicker() {

    // Funktion 1: Setzt das Mindesdatum auf das heutige Datum
    function setMinDate() {
        var today = new Date();
        var day = ("0" + today.getDate()).slice(-2);
        var month = ("0" + (today.getMonth() + 1)).slice(-2);
        var formattedDate = today.getFullYear() + "-" + month + "-" + day;

        var datePicker = document.getElementById("datePicker");
        datePicker.setAttribute('min', formattedDate);

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
        datePicker.setAttribute('value', formattedDate);

        // Gibt das Standartddatum in der Konsole aus
        console.log("Standarddatum gesetzt auf: ", formattedDate);
    }

        setMinDate(); // Aufruf von Function 1
        setDefaultDate(); // Aufruf von Funktion 2
};

// Event-Listener, der darauf wartet, dass das DOM geladen wird
document.addEventListener('DOMContentLoaded',configureDatePicker);

let taskpriority = "medium";

function taskPriorityChoosed(i){
    taskpriority = i;
}


function addTasksToStorage(){
    let title = document.getElementById("task-title");
    let description = document.getElementById("task-description");
    let date = document.getElementById("datePicker");
    
    let JSONToPush = {
        categoryboard : "todo",
        category: "JSONPUSHTEST",
        title: title.value,
        description : description.value,
        dueDate: date.value,
        prio: taskpriority,
        subtasks: ["1", "2", "3"],
        assignedTo: ["XY", "ZA", "BC"]
    }

    tasks.push(JSONToPush);
    title.value = '';
    description.value = '';
    date.value = '';

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
      location.href = "../board.html";
  }, 2000);

}





function getSelectedOptions() {
  var checkboxes = document.querySelectorAll(
    '#dropdown-content input[type="checkbox"]:checked'
  );
  var selectedOptions = [];
  checkboxes.forEach(function (checkbox) {
    selectedOptions.push(checkbox.value);
  });
  alert("Ausgewählte Optionen: " + selectedOptions.join(", "));
}

function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
}
