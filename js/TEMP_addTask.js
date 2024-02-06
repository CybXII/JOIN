
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


function addTasksToStorage(){
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-description").value;

    let JSONToPush = {
        categoryboard : "in-progress",
        category: "JSONPUSHTEST",
        title: title,
        description : description,
        dueDate: "01.01.2022",
        prio: "urgent",
        subtasks: ["1", "2", "3"],
        assignedTo: ["XY", "ZA", "BC"]
    }

    tasks.push(JSONToPush);
    console.log(tasks);
    saveToLocalStorage();
}