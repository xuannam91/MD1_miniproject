const logoutSelector = document.querySelector(".logout_user");

const loginInforSelector = document.querySelector(".user_login");


// Hàm logout tài khoản
function handldeLogout(event) {
  event.preventDefault();
  let comfirmLogout = confirm("Bạn có muốn đăng xuất tài khoản không?")
  if(comfirmLogout){

    // lấy ra user tong local
    let users = JSON.parse(localStorage.getItem("users"));
    // 2.Update tất cả status = "";
    for (let i = 0; i < users.length; i++) {
      users[i].status = "";
    }
    // cập nhật lại local.
    localStorage.setItem("users", JSON.stringify(users));
    // chuyển về login.
    window.location.href = "login.html";
  }
}




// nếu login ok thì không cho vào đăng kí hoặc đăng nhập được nữa.
function getUserIsLogin() {
  let users = JSON.parse(localStorage.getItem("users"));
  let userFind;
  if (users) {
      userFind = users.find(function (userItem) {
        if (userItem.status === "active") {
          return true;
        } 
        else {
          return false;
        }
      }
    )
  }

  if (userFind && loginInforSelector) {
    loginInforSelector.innerText = userFind.name
  }
}

getUserIsLogin();

logoutSelector.addEventListener("click", handldeLogout);
