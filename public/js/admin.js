const $userList = $("#user-list");
const $searchForm = $("#search-form");
const $nameField = $("#name");
const $clearButton = $("#clear");
const $searchFail = $("#search-fail");

/* list all users upon DOM load */
$(listUsers);

/* set a user's state from pending to active */
$userList.on("click", ".set-active", async (e) => {
  const button = $(e.target);
  const state = button.data("state");
  if (state === "pending") {
    const id = button.data("id");
    const firstName = button.data("first-name");
    const lastName = button.data("last-name");
    const email = button.data("email");
    const user = {
      id,
      firstName,
      lastName,
      email,
      state: "active"
    }
    await axios.put(`/users/${id}`, user);
    const userState = (button.closest("div.container")).find("p.state");
    userState.html(`<p class="state"><b>State:</b> active</p>`);
    button.data("state", "active");
  }
});

/* delete a user */
$userList.on("click", ".delete", async (e) => {
  const button = $(e.target);
  const id = button.data("id");
  await axios.delete(`/users/${id}`);
  $(button.closest("li")).remove();
});

/* search for users by full name, this may return multiple results */
$searchForm.on("submit", async (e) => {
  e.preventDefault();
  try {
    const name = $nameField.val();
    $clearButton.removeClass("d-none");
    const res = await axios.get(`/users/${name}`);
    const users = res.data;
    const ids = Object.keys(users);
    $userList.empty();
    for (let i of ids) {
      let { id, email, firstName, lastName, state } = users[i];
      appendUser(id, email, firstName, lastName, state);
    }
  } catch (e) {
    $searchFail.removeClass("d-none");
  }
});

/* clear search results */
$clearButton.on("click", (e) => {
  e.preventDefault();
  $nameField.val("");
  $userList.empty();
  $searchFail.addClass("d-none");
  listUsers();
  $clearButton.addClass("d-none");
});

/* list all users, this is done on load and search clear */
async function listUsers() {
  const res = await axios.get("/users");
  const users = res.data;
  const ids = Object.keys(users);
  for (let i of ids) {
    let { id, email, firstName, lastName, state } = users[i];
    appendUser(id, email, firstName, lastName, state);
  }
}

/* append a user to main list */
function appendUser(id, email, firstName, lastName, state) {
  $userList.append(
    `
    <li class="list-group-item p-3">
      <div class="container">
        <div class="row">
          <div class="col-10">
            <p><b>Id:</b> ${id}</p>
            <p><b>First Name:</b> ${firstName}</p>
            <p><b>Last Name:</b> ${lastName}</p>
            <p><b>Email:</b> ${email}</p>
            <p class="state"><b>State:</b> ${state}</p>
          </div>
          <div class="col-2">
            <div class="row">
              <button data-id="${id}" data-first-name="${firstName}" data-last-name="${lastName}" data-email="${email}" data-state="${state}" class="m-3 btn btn-success set-active">Activate User</button>
            </div>
            <div class="row">
              <button data-id="${id}" class="m-3 btn btn-danger delete">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    `
  );
}