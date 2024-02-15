// SIGN UP

// LOGIN

// SUMMARY

// BOARD

// CONTACTS

function saveUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(active_user));
}

function loadUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    contacts = JSON.parse(storageAsText);
  }
}

let login_remember = false;
let users = [];

async function addUser(event) {
  event.preventDefault();
  signUpPasswordChecker();
}

async function loadUser() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function signUpSuccessfull() {
  let Name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password-su").value;

  users.push({
    name: Name,
    email: email,
    password: password,
  });
  await setItem("users", JSON.stringify(users));
  setTimeout(() => {
    renderLogin();
  }, 2000);
}

function login(event) {
  // Das Standardverhalten des Formulars unterdrücken
  event.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("login_password");
  let user = users.find(
    (u) => u.email == email.value && u.password == password.value
  );
  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.href = "summary.html";
  } else {
    console.log("Wrong password Ups! Try again.");
    alert("Wrong password Ups! Try again.");
  }
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

function addContactsToStorage() {
  let nameInput = document.getElementById("add_contacts_name").value.split(" ");
  let name = document.getElementById("add_contacts_name");
  let email = document.getElementById("add_contacts_email");
  let phone = formatPhoneNumber();

  let lastName;
  let initials =
    nameInput[0][0].toUpperCase() +
    nameInput[nameInput.length - 1][0].toUpperCase();
  nameInput.length > 1
    ? (lastName = nameInput[nameInput.length - 1])
    : (lastName = "");
  let firstName = nameInput[0];
  let color = getRandomColor();

  let JSONToPush = {
    firstname: firstName,
    lastname: lastName,
    fullname: name.value,
    initials: initials,
    email: email.value,
    phone: phone,
    color: color,
    id: contacts.length,
    taskassigned: false,
  };

  contacts.push(JSONToPush);

  name.value = "";
  email.value = "";
  phone.value = "";

  closeContactsContainer();
  saveContactsToLocalStorage();
  setTimeout(() => {
    pushLetters();
  }, 1);
}

function saveContactsToLocalStorage() {
  sortContacts();
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
  let storageAsText = localStorage.getItem("contacts");

  if (storageAsText) {
    contacts = JSON.parse(storageAsText);
  }
}

let STORAGE_TOKEN = [];
const STORAGE_URL = `https://remote-storage.developerakademie.org/item`;

async function loadToken() {
  let resp = await fetch("./json/token.json");
  token = await resp.json();
  STORAGE_TOKEN = token[0]["token"];
}

async function setItem(key, value) {
  await loadToken();
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  await loadToken();
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
