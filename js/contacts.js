let letters = [];
let contacts = [];
let currentcontact = [];
let nameinput;
let contactname;
let email;
let phone;
let lastname;
let initials;
let firstname;
let color;

/**
 * Sorts the contacts array by the firstname property in ascending order.
 *
 * @param {Array} contacts - the array of contacts to be sorted
 * @return {Array} sortedContacts - the sorted array of contacts
 */
function sortContacts() {
  contacts.sort((a, b) => {
    const namea = a.firstname.toUpperCase();
    const nameb = b.firstname.toUpperCase();
    if (namea < nameb) {
      return -1;
    }
    if (namea > nameb) {
      return 1;
    }
    return 0;
  });
}

/**
 * Pushes letters to the rendered content based on the first letter of each contact's first name.
 *
 */
function pushLetters() {
  let letterbox = document.getElementById("renderedContent");
  letterbox.innerHTML = "";
  sortContacts();
  letters = [];
  for (let i = 0; i < contacts.length; i++) {
    const firstletter = contacts[i]["firstname"].charAt(0).toUpperCase();
    if (!letters.includes(firstletter)) {
      letters.push(firstletter);
      renderLetters(firstletter);
      renderContactCard(firstletter);
    }
  }
}

/**
 * Closes the contacts container by adding the "d-none" class to the element with id "contacts-background"
 * and removing the "contacts-background-fixed" class from the document body.
 */
function closeContactsContainer() {
  document.getElementById("contacts-background").classList.add("d-none");
  document.body.classList.remove("contacts-background-fixed");
}

/**
 * Function to add the "d-none" class to the "contacts-background" element and remove the "contacts-background-fixed" class from the body.
 */
function closeContactsContainerAdd() {
  document.getElementById("contacts-background").classList.add("d-none");
  document.body.classList.remove("contacts-background-fixed");
}

/**
 * Function to animate the contact information.
 */
function contactAnimation() {
  let element = document.getElementById("contact_info");
  element.classList.add("contact-info-content");
}

/**
 * Deletes a contact from the contacts array, updates the localStorage, re-renders the contacts, and resets the contact info display.
 *
 * @param {string} userid - The id of the contact to be deleted.
 */
async function deleteContact(userid) {
  const indextodelete = contacts.findIndex((contact) => contact.id === userid);
  if (indextodelete !== -1) {
    contacts.splice(indextodelete, 1);
    await setItem("contacts", JSON.stringify(contacts));
    renderContacts();
    document.getElementById("contact_info").innerHTML = "";
    addContactListeners();
  }
  contactDeletedMessage();
}

/**
 * Edits a contact by opening the contacts container, rendering the edit contact, and updating the contact information fields.
 *
 * @param {type} userid - The user ID
 * @param {type} i - The index of the contact to edit
 */
function editContact(userid, i) {
  openContactsContainer(userid, i);
  renderEditContact(userid, i);
  let color = currentcontact.color;
  document.getElementById("initialsUserEdit").innerHTML =
    currentcontact.initials;
  document.getElementById(
    "initialsUserEdit"
  ).style = `background-color: ${color}`;
  document.getElementById("edit_contacts_name").value = currentcontact.fullname;
  document.getElementById("edit_contacts_email").value = currentcontact.email;
  document.getElementById("edit_contacts_phone").value = currentcontact.phone;
}

/**
 * Asynchronously adds or edits a contact and performs additional UI updates.
 *
 * @param {number} i - The index of the contact to add or edit
 */
async function addEditContact(i) {
  let newfull = (currentcontact.fullname =
    document.getElementById("edit_contacts_name").value);
  let newemail = (currentcontact.email = document.getElementById(
    "edit_contacts_email"
  ).value);
  let newphone = (currentcontact.phone = document.getElementById(
    "edit_contacts_phone"
  ).value);
  let newcolor = currentcontact.color;
  let newinitials = currentcontact.initials;
  contacts[i] = currentcontact;
  await setItem("contacts", JSON.stringify(contacts));
  closeContactsContainer();
  renderContacts();
  openContact(
    newfull,
    newemail,
    newcolor,
    newinitials,
    newphone,
    currentcontact.userid,
    i
  );
  contactEditMessage();
  contactAnimation();
}

/**
 * Adds contacts to the storage based on the input values.
 *
 * @param {type} nameinput - The input value for the contact's name
 * @param {type} contactname - The input field for the contact's name
 * @param {type} email - The input field for the contact's email
 * @param {type} phone - The formatted phone number for the contact
 * @param {type} lastname - The last name of the contact
 * @param {type} initials - The initials of the contact
 * @param {type} firstname - The first name of the contact
 * @param {type} color - The random color assigned to the contact
 */
function addContactsToStorage() {
  nameinput = document.getElementById("add_contacts_name").value.split(" ");
  contactname = document.getElementById("add_contacts_name");
  email = document.getElementById("add_contacts_email");
  phone = document.getElementById("add_contacts_phone");
  lastname;
  initials =
    nameinput[0][0].toUpperCase() +
    nameinput[nameinput.length - 1][0].toUpperCase();
  nameinput.length > 1
    ? (lastname = nameinput[nameinput.length - 1])
    : (lastname = "");
  firstname = nameinput[0];
  color = getRandomColor();
  addNewContact();
  contactAddedMessage();
}

/**
 * Function to add a new contact.
 *
 */
async function addNewContact() {
  pushContacts();
  closeContactsContainer();
  await setItem("contacts", JSON.stringify(contacts));
  pushLetters();
  addContactListeners();
}

/**
 * Pushes a new contact object into the contacts array based on the input fields.
 *
 * @param {type} jsontopush - the JSON object containing contact information to be pushed into the contacts array
 */
function pushContacts() {
  let jsontopush = {
    firstname: firstname,
    lastname: lastname,
    fullname: contactname.value,
    initials: initials,
    email: email.value,
    phone: phone.value,
    color: color,
    id: `${contacts.length}`,
    taskassigned: false,
    contactAssignedTo: users[0].id,
  };
  clearAfterPush(jsontopush);
}

/**
 * Clears input fields after pushing new contact to the contacts array.
 */
function clearAfterPush(jsontopush) {
  contacts.push(jsontopush);
  contactname.value = "";
  email.value = "";
  phone.value = "";
}

/**
 * Opens the contact information for the given contact.
 *
 * @param {string} fullname - The full name of the contact
 * @param {string} email - The email address of the contact
 * @param {string} color - The color associated with the contact
 * @param {string} initials - The initials of the contact
 * @param {string} phone - The phone number of the contact
 * @param {string} userid - The user ID of the contact
 * @param {number} i - The index of the contact in the contacts array
 */
function openContact(fullname, email, color, initials, phone, userid, i) {
  currentcontact = contacts[i];
  let element = document.getElementById("contact_info");
  element.classList.remove("contact-info-content");
  element.classList.remove("contact-info");
  document.getElementById("contact_info").innerHTML = renderContactInfo(
    fullname,
    email,
    color,
    initials,
    phone,
    userid,
    i
  );
  openRespContactContainer();
  document.getElementById("contact_info_resp").innerHTML = renderContactInfo(
    fullname,
    email,
    color,
    initials,
    phone,
    userid,
    i
  );
}

/**
 * Function to open the contact container in the response section.
 */
function openRespContactContainer() {
  document
    .getElementById("contact_info_resp_background")
    .classList.remove("d-none");
}

/**
 * Closes the contact container for the response.
 */
function closeRespContactContainer() {
  document
    .getElementById("contact_info_resp_background")
    .classList.add("d-none");
}

/**
 * Updates the message box to display "Contact successfully added", shows the message box, and then hides it after 2 seconds.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function contactAddedMessage() {
  document.getElementById("msgBox").innerHTML = "Contact successfully added";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
  }, 1500);
}

/**
 * Function to edit a contact message.
 *
 */
function contactEditMessage() {
  document.getElementById("msgBox").innerHTML = "Contact successfully edited";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
  }, 1500);
}

/**
 * Updates the message box with a "Contact successfully deleted" message and displays it for 2 seconds.
 *
 */
function contactDeletedMessage() {
  document.getElementById("msgBox").innerHTML = "Contact successfully deleted";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
  }, 1500);
}

/**
 * Function to open the contacts container and update the DOM elements.
 *
 */
function openContactsContainer() {
  document.getElementById("contacts-background").classList.remove("d-none");
  document.body.classList.add("contacts-background-fixed");
  document.getElementById("left-side").innerHTML = `
    <div class="testContainer">
      <img class="joinLogo" src="./img/capa-2.svg" alt="Join-Logo">
      <h1>Edit contact</h1>
      <img class="underlineBlue" src="./img/vector-5.svg" alt="underline-blue">
    </div>`;
  document.getElementById("right-side").innerHTML = `
  <div class="FNandSN" id="initialsUserEdit"></div>
  <div class="closeImg" onclick="closeContactsContainer()"></div>
  <div id="editContactCard"></div>`;
}

/**
 * Renders the contacts by loading contacts, applying classes, pushing letters, and adding contact listeners.
 *
 */
async function renderContacts() {
  await loadContacts();
  removeActiveClass();
  setActivClass("contacts")
  pushLetters();
  addContactListeners();
}

/**
 * Renders the given first letter into the DOM, by appending it to the "renderedContent" element and creating a contact card with the letter as an id.
 *
 * @param {string} firstletter - The first letter to be rendered
 */
function renderLetters(firstletter) {
  let letterbox = document.getElementById("renderedContent");
  const letter = firstletter;
  letterbox.innerHTML += `
    <div class="div-wrapper"><div class="div">${letter}</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div id="contact-card-${letter}" class="contact-card-letter"></div>`;
}

/**
 * Renders the contact card based on the first letter of the contact's first name.
 *
 * @param {string} firstletter - The first letter of the contact's first name
 * @param {number} i - Index parameter
 */
function renderContactCard(firstletter, i) {
  let content = document.getElementById(`contact-card-${firstletter}`);
  contacts.forEach((element, i) => {
    const fullname = element.fullname;
    const email = element.email;
    const color = element.color;
    const initials = element.initials;
    const phone = element.phone;
    const userid = element.id;
    if (element.firstname.charAt(0).toUpperCase() == firstletter) {
      content.innerHTML += renderContactCardHTML(
        fullname,
        email,
        color,
        initials,
        phone,
        userid,
        i
      );
    }
  });
}

/**
 * Function to render the HTML for a contact card.
 *
 * @param {string} fullname - the full name of the contact
 * @param {string} email - the email address of the contact
 * @param {string} color - the color for the contact card
 * @param {string} initials - the initials of the contact
 * @param {string} phone - the phone number of the contact
 * @param {string} userid - the user id of the contact
 * @param {number} i - the index of the contact
 * @return {string} the HTML for the contact card
 */
function renderContactCardHTML(
  fullname,
  email,
  color,
  initials,
  phone,
  userid,
  i
) {
  return /*html*/ `
                <div class="responsiv_Overlay" onclick="openRespContactContainer()"></div>  
                <div class="contact-name" onclick="openContact('${fullname}', '${email}', '${color}', '${initials}', '${phone}', '${userid}', '${i}')">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group" style="background-color: ${color}">
                      <div class="text-wrapper-2">${initials}</div>
                    </div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">${fullname}</div>
                  <div class="text-wrapper-3">${email}</div>
                </div>
              </div>`;
}
