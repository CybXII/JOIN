/**
 * Function to open the contacts container for adding a new contact.
 */
function openContactsContainerAdd() {
document.getElementById("contacts-background").classList.remove("d-none");
document.body.classList.add("contacts-background-fixed");
document.getElementById("left-side").innerHTML = `
    <div class="testContainer">
        <img class="joinLogo" src="./img/capa-2.svg" alt="Join-Logo">
        <h1>Add contact</h1>
        <img class="underlineBlue" src="./img/vector-5.svg" alt="underline-blue">
    </div>
    <div class="closeImgResp" onclick="closeContactsContainerAdd()"></div>
    `;
document.getElementById("right-side").innerHTML = `
    <img src="./img/addUserBadge.svg"></div>
    <div id="editContactCard">
    <form id="contact_Form"
        onsubmit='addContactsToStorage(); return false;'
        class="add-contacts-form"
        >
        <input
        type="text"
        placeholder="Name"
        class="add-contact-name"
        id="add_contacts_name"
        required
        />
        <input
        type="email"
        placeholder="Email"
        class="add-contact-email"
        id="add_contacts_email"
        required
        />
        <input
        type="tel"
        placeholder="Phone"
        class="add-contact-phone"
        id="add_contacts_phone"
        pattern="[0-9+ ]{6,20}"
        oninvalid="this.setCustomValidity('Enter a valid phone number e.g. +49 123 34533323. Minimum 6 digits, maximum 20 digits')"
        oninput="this.setCustomValidity('')"
        required
        />
        <div class="underButton">
        <div class="add-contact-cancel" onclick="closeContactsContainerAdd()">Cancel</div>
        <button class="createContact">Create Contact</button>
        </div>
    </form>
    </div>
    <div class="closeImg" onclick="closeContactsContainerAdd()"></div>
    `;
}

/**
 * Renders the edit contact form for a specific user.
 *
 * @param {number} userid - The user ID
 * @param {number} i - The index of the contact
 */
function renderEditContact(userid, i) {
document.getElementById(
    "editContactCard"
).innerHTML = `<form id="contact_Form"
                    onsubmit='addEditContact(${i}); return false;'
                    class="add-contacts-form"
                >
                    <input
                    type="text"
                    placeholder="Name"
                    class="add-contact-name"
                    id="edit_contacts_name"
                    required
                    />
                    <input
                    type="email"
                    placeholder="Email"
                    class="add-contact-email"
                    id="edit_contacts_email"
                    required
                    />
                    <input
                    type="tel"
                    placeholder="Phone"
                    class="add-contact-phone"
                    id="edit_contacts_phone"
                    required
                    pattern="[0-9+ ]{6,20}"
                    oninvalid="this.setCustomValidity('Enter a valid phone number e.g. +49 123 34533323. Minimum 6 digits, maximum 20 digits')"
                    oninput="this.setCustomValidity('')"
                    data-for="phoneNumber"
                    required
                    />
                    <div class="underButton">
                    <div class="add-contact-cancel" onclick="deleteContact('${userid}', '${i}'), closeContactsContainer()">Delete</div>
                    <button class="createContact">Save</button>
                    </div>
                </form>`;
}