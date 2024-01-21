document.addEventListener("DOMContentLoaded", function () {
  const email_div = document.getElementById("parent_email");
  const email_input = document.getElementById("email");
  const password_div = document.getElementById("parent_password");
  const password_input = document.getElementById("password");

  email_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    email_div.classList.remove("aktive");
  });

  email_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    email_div.classList.add("aktive");
  });

  password_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    password_div.classList.remove("aktive");
  });

  password_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    password_div.classList.add("aktive");
  });

  const name_div = document.getElementById("parent_name");
  const name_input = document.getElementById("name");
  const confirm_password_div = document.getElementById(
    "parent_confirm_password"
  );
  const confirm_password = document.getElementById("confirm_password");

  name_input.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    name_div.classList.remove("aktive");
  });

  name_input.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    name_div.classList.add("aktive");
  });

  confirm_password.addEventListener("blur", function () {
    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    confirm_password_div.classList.remove("aktive");
  });

  confirm_password.addEventListener("focus", function () {
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    confirm_password_div.classList.add("aktive");
  });
});
