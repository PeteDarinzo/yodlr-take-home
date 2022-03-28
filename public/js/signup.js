const $form = $("#register-form");
const $firstNameField = $("#first-name");
const $lastNameField = $("#last-name");
const $emailField = $("#email");
const $successAlert = $("#register-success");
const $failAlert = $("#register-fail");

/* clear any flashed messages upon DOM load */
$(() => {
  $successAlert.addClass("d-none");
  $failAlert.addClass("d-none");
})

/* submit register form, if email is duplicate an error message will flash, other a success message will flash */
$form.on("submit", async (e) => {
  e.preventDefault();
  try {
    $successAlert.addClass("d-none");
    $failAlert.addClass("d-none");
    const email = $emailField.val();
    const firstName = $firstNameField.val();
    const lastName = $lastNameField.val();
    const user = { email, firstName, lastName };
    await axios.post("/users", user);
    $emailField.val('');
    $firstNameField.val('');
    $lastNameField.val('');
    $successAlert.removeClass("d-none");
  } catch (e) {
    $failAlert.removeClass("d-none");
  }
});

