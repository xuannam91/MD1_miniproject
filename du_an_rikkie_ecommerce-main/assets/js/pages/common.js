// nếu login thì không cho vào đăng kí hoặc đăng nhập được nữa.
function redirectToHomeIfLogeed() {
  let users = JSON.parse(localStorage.getItem("users"));
  let userFind = users.find(function (userItem) {
    if (userItem.status === "active") {
      return true;
    } else {
      return false;
    }
  });
  
  if (userFind) {
    window.location.href = "index.html";
  }
}

redirectToHomeIfLogeed();
