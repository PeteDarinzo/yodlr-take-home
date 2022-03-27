
const $form = $("#register-form");
const $firstNameField = $("#first-name");
const $lastNameField = $("#last-name");
const $emailField = $("#email");
const $successAlert = $("#register-success");

$(() => {
  $successAlert.addClass("d-none");
})

$form.on("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const email = $emailField.val();
  const firstName = $firstNameField.val();
  const lastName = $lastNameField.val();
  const user = { email, firstName, lastName };
  await axios.post("/users", user);
  $emailField.val('');
  $firstNameField.val('');
  $lastNameField.val('');
  $successAlert.removeClass("d-none");
}