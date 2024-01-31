
// Wird bei der Erstellung eines Tasks genutzt

class task {
  taskId; // Erstellungszeit
  title;
  description;
  assigned_to = [];
  date;
  prio;
  category;
  subtasks = [];
}

// Wird bei der Useranlage genutzt
// Es wird zusätzlich noch ein User erstellt

class user {
  id; // Länge des Arrays
  firstName;
  lastName;
  eMail;
  password;
  color; // randomize Funktion nutzen
//   phone fehlt, kann nachträglich über die contacts editiert werden
}

// Wird bei der Erstellung eines Kontaktes genutzt

class contact {
  id; // Länge des Arrays
  firstName;
  lastName;
  eMail;
  phone; // kann nachträglich editiert werden, da beim Login nicht abgefragt
  color; // randomize Funktion nutzen
}

