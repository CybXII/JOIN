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


async function loadUser() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


async function loadRemoteUser() {
  try {
    remoteuser = JSON.parse(await getItem("users"));
    for (let i = 0; i < remoteuser.length; i++) {
      if (remoteuser[i].id !== 999) {
        remoteuserAssign.push(remoteuser[i]);
      }
    }
    remoteuser = [];
  } catch (e) {
    console.error("Loading error:", e);
  }
}


function saveUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}


function loadUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    users = JSON.parse(storageAsText);
  }
}


function loadRememberedUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    remembered_user = JSON.parse(storageAsText);
  }
}