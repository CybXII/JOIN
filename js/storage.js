let STORAGE_TOKEN = [];
const STORAGE_URL = `https://remote-storage.developerakademie.org/item`;

/**
 * Asynchronously loads the token from the specified JSON file and sets the STORAGE_TOKEN value.
 *
 * @return {Promise<void>} A Promise that resolves when the token is successfully loaded and the STORAGE_TOKEN value is set.
 */
async function loadToken() {
  let resp = await fetch("./json/token.json");
  token = await resp.json();
  STORAGE_TOKEN = token[0]["token"];
}


/**
 * Asynchronously sets an item in the storage.
 *
 * @param {string} key - The key of the item to be set.
 * @param {any} value - The value of the item to be set.
 * @return {Promise} A Promise that resolves to the result of setting the item in the storage.
 */
async function setItem(key, value) {
  await loadToken();
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


/**
 * Asynchronously retrieves an item from the storage using the provided key.
 *
 * @param {string} key - The key of the item to retrieve from the storage.
 * @return {Promise} A promise that resolves to the value of the retrieved item.
 */
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


/**
 * Asynchronously loads the user data from storage and handles any potential errors.
 *
 */
async function loadUser() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * Asynchronously loads tasks from storage and handles any potential errors.
 *
 */
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * Asynchronously loads contacts from storage and handles any potential errors.
 *
 */
async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/**
 * Asynchronously loads the remote user data, filters out users with id 999, and clears the remote user data in case of an error.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
async function loadRemoteUser() {
  remoteuserAssign = [];
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


/**
 * Saves the users array to the local storage.
 *
 * @param {string} key - The key under which the users array is saved in local storage.
 * @param {array} users - The array of users to be saved.
 */
function saveUsersToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}


/**
 * Loads users data from local storage and parses it if it exists.
 *
 */
function loadUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    users = JSON.parse(storageAsText);
  }
}


/**
 * Loads remembered users from local storage.
 *
 * @return {object} The remembered users loaded from local storage.
 */
function loadRememberedUsersFromLocalStorage() {
  let storageAsText = localStorage.getItem("users");

  if (storageAsText) {
    remembered_user = JSON.parse(storageAsText);
  }
}