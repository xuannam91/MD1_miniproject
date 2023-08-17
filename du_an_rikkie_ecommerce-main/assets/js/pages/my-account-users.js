// Khai báo biến

let tableUsersSelector = document.querySelector(".body_table_user");



// Thực thi hàm
// Render users

function handleRenderUser() {
  // lấy dữ liệu người dùng trên local.
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }



  let resultUsers = "";
  for (let i = 0; i < users.length; i++) {
    if(users[i].role !== "admin"){
      resultUsers =
        resultUsers +
        `<tr>
              <td>${i + 1}</td>
              <td>${users[i].name}</td>
              <td>${users[i].email}</td>
              <td>${users[i].password}</td>
              <td>${users[i].status}</td>
              <td>
                  
                  <button type="button" data-id="${
                    users[i].id
                  }" class="btn_common btn_delete_user">Delete</button>
              </td>
          </tr>`;
    }

  }
  tableUsersSelector.innerHTML = resultUsers;
}
handleRenderUser();


// Xoá user

function handleDeleteUser(event) {
  let users = JSON.parse(localStorage.getItem("users"));

  let clicked = event.target;

  if (clicked.classList.contains("btn_delete_user")) {
    let confirmDelete = confirm("Bạn chắc chắn muốn xóa không ?");
    if (confirmDelete) {
      let idDeleteUser = clicked.getAttribute("data-id");
      let elementUserDelete = users.filter((item) => item.id !== +idDeleteUser);
      localStorage.setItem("users", JSON.stringify(elementUserDelete));
    }
    handleRenderUser();
  }
}

// gọi hàm
tableUsersSelector.addEventListener("click", handleDeleteUser);
