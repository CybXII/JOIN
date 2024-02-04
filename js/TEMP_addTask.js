
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

// Event-Listner, der daruf wartet, das das DOM geladen wird
document.addEventListener('DOMContentLoaded', function() {
    setMinDate(); // Aufruf von Function 1
    setDefaultDate(); // Aufruf von Funktion 2
});