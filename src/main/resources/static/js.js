$(document).ready(function () {
    showAllUsers();
});

function listRoles(user) {
    let role;
    let roleList = '';
    for (let i = 0; i < user.roles.length; i++) {
        role = user.roles[i].role.substring(5);
        roleList += role + " ";
    }
    return roleList;
}

//-----------SHOW ALL Users------------
function showAllUsers() {
    $('#userTable tbody').empty();
    fetch('http://localhost:8088/rest/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                let userRow = `$(<tr>
                        <th>${user.id}</th>
                        <td>${user.firstname}</td>
                        <td>${user.lastname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${listRoles(user)}</td>
                        <td>
                        <button type="button" onclick="getModalEdit(${user.id})" class="btn btn-info btn-sm">Edit</button>   
                        </td>
                        <td>
                        <button type="button" onclick="getModalDelete(${user.id})" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>)`;
                $('#userTable tbody').append(userRow);
            });
        });
}


const username = document.getElementById('username'),
    password = document.getElementById('password'),
    firstname = document.getElementById('firstname'),
    lastname = document.getElementById('lastname'),
    age = document.getElementById('age'),
    email = document.getElementById('email'),
    roles = document.getElementById('select'),
    id = document.getElementById('id');

//-----ADD NEW USER-----------------------------------
function addNewUser() {
    let selectedRoles = "";
    let roleList = "";
    for (var i = 0; i < roles.length; i++) {
        var role = roles.options[i];
        if (role.selected) {
            selectedRoles = selectedRoles.concat(role.value + (i != (roles.length - 1) ? "," : ""));
            roleList += role.value + " ";
        }
    }

    fetch('http://localhost:8088/rest/newUser', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value,
            age: age.value,
            email: email.value,
            roles: selectedRoles
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(response => response.json())
        .then(user => {
            $('#tBody tr:last').after('<tr id=' + user.id + '>' +
                '<td>' + user.id + '</td>' +
                '<td>' + firstname.value + '</td>' +
                '<td>' + lastname.value + '</td>' +
                '<td>' + age.value + '</td>' +
                '<td>' + email.value + '</td>' +
                '<td>' + selectedRoles + '</td>' +
                '</tr>');

            username.value = "";
            password.value = "";
            firstname.value = "";
            lastname.value = "";
            age.value = "";
            email.value = "";
            roles.value = "";
        });
}

//-----DELETE USER-----------------------------------

function getModalDelete(id) {

    fetch('http://localhost:8088/rest/users/' + id)
        .then(response => response.json())
        .then(user => {

            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalDelete" ' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true" ' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' +
                '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;" ' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>ID</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>First name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.firstname + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Last name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               value="' + user.lastname + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               value="' + user.age + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="email"' +
                '                               value="' + user.email + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select class="form-control form-control-sm" multiple size="2" readonly>' +
                '                            <option value="ROLE_ADMIN"' + ' >ADMIN</option>' +
                '                            <option value="ROLE_USER"' +  '>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-bs-dismiss="modal">Close</button>' +
                '                <button class="btn btn-danger" data-bs-dismiss="modal"' +
                '                        onclick="deleteUser(' + user.id + ')">Delete</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalDelete").modal('show');

        });
}

function deleteUser(id) {
    fetch('http://localhost:8088/rest/users/' + id, {
        method: 'DELETE',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            $('#' + id).remove();
        });
}

//--------------EDIT USER-----------
function getModalEdit(id) {

    fetch('http://localhost:8088/rest/users/' + id)
        .then(response => response.json())
        .then(user => {


            let modal = document.getElementById('modalWindow');

            modal.innerHTML =
                '<div id="modalEdit"' +
                '     class="modal fade" tabindex="-1" role="dialog"' +
                '     aria-labelledby="TitleModalLabel" aria-hidden="true"' +
                '     data-backdrop="static" data-keyboard="false">' +
                '    <div class="modal-dialog modal-dialog-scrollable">' +
                '        <div class="modal-content">' +
                '            <div class="modal-header">' +
                '                <h5 class="modal-title" id="TitleModalLabel">Edit user</h5>' +
                '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                '                </button>' +
                '            </div>' +
                '            <div class="modal-body bg-white">' +
                '                <form id="formEditUser" style="width: 200px;"' +
                '                       class="form-signin mx-auto font-weight-bold text-center">' +
                '                    <p>' +
                '                        <label>ID</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editID" name="id" value="' + user.id + '" readonly>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>First name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editFirstName" value="' + user.firstname + '"' +
                '                               placeholder="First name" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Last name</label>' +
                '                        <input class="form-control form-control-sm" type="text"' +
                '                               id="editLastName" value="' + user.lastname + '" ' +
                '                               placeholder="Last name" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Age</label>' +
                '                        <input class="form-control form-control-sm" type="number"' +
                '                               id="editAge" value="' + user.age + '" ' +
                '                               placeholder="Age" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Email</label>' +
                '                        <input class="form-control form-control-sm" type="email"' +
                '                               id="editEmail" value="' + user.email + '"' +
                '                               placeholder="Email" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Password</label>' +
                '                        <input class="form-control form-control-sm" type="email"' +
                '                               id="editPassword" value="' + user.password + '"' +
                '                               placeholder="Password" required>' +
                '                    </p>' +
                '                    <p>' +
                '                        <label>Role</label>' +
                '                        <select id="editRoles" name="roles" multiple size="2" required ' +
                '                               class="form-control form-control-sm">' +
                '                            <option value="ROLE_ADMIN"' + '>ADMIN</option>' +
                '                            <option value="ROLE_USER"' + '>USER</option>' +
                '                        </select>' +
                '                    </p>' +
                '                </form>' +
                '            </div>' +
                '            <div class="modal-footer">' +
                '                <button type="button" class="btn btn-secondary"' +
                '                        data-bs-dismiss="modal">Close</button>' +
                '                <button class="btn btn-primary" data-bs-dismiss="modal"' +
                '                        onclick="editUser()">Edit</button>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            $("#modalEdit").modal('show');

        });
}

function editUser() {

    let rolesEdit = window.formEditUser.editRoles;
    let selectedRolesEdit = "";
    let roleList = "";
    for (var i = 0; i < rolesEdit.length; i++) {
        var role = rolesEdit.options[i];
        if (role.selected) {
            selectedRolesEdit = selectedRolesEdit.concat(role.value + (i != (rolesEdit.length - 1) ? "," : ""));
            roleList += role.value + " ";
        }
    }
    let passwordEdit = window.formEditUser.editPassword,
        firstnameEdit = window.formEditUser.editFirstName,
        lastnameEdit = window.formEditUser.editLastName,
        ageEdit = window.formEditUser.editAge,
        emailEdit = window.formEditUser.editEmail;

    let id = window.formEditUser.editID.value;
    console.log(id);
    let arr = [{"id": 1, "role": "ROLE_ADMIN"}, {"id": 2, "role": "ROLE_USER"}]

    fetch('http://localhost:8088/rest/users', {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            username: "noName",
            password: passwordEdit.value,
            firstname: firstnameEdit.value,
            lastname: lastnameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
            roles: roleList
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            $('#' + id).replaceWith('<tr id=' + id + '>' +
                '<td>' + id + '</td>' +
                '<td>' + firstname.value + '</td>' +
                '<td>' + lastname.value + '</td>' +
                '<td>' + age.value + '</td>' +
                '<td>' + email.value + '</td>' +
                '<td>' + roleList + '</td>' +
                '</tr>');
        });
}