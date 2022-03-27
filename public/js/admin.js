
const $userList = $("#user-list");

$(listUsers);

async function listUsers() {
  const res = await axios.get("/users");
  const users = res.data;
  const ids = Object.keys(users);
  for (let i of ids) {
    let { id, email, firstName, lastName, state } = users[i]
    $userList.append(
      `
      <li class="list-group-item p-3">
        <div class="container">
          <div class="row">
            <div class="col-10">
            <p><b>id:</b> ${id}</p>
            <p><b>First Name:</b> ${firstName}</p>
            <p><b>Last Name:</b> ${lastName}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>State:</b> ${state}</p>
            </div>
            <div class="col-2">
              <div class="row">
                <button class="m-3 btn btn-success">Activate User</button>
              </div>
              <div class="row">
              <button class="m-3 btn btn-danger">Delete User</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      `
    );
  }
}