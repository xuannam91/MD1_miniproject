

let loginInforSelectorCart = document.querySelector(".header_list .ti-user").nextElementSibling

function getUserIsLogin() {
  let users = JSON.parse(localStorage.getItem("users"));
  let userFind;
  if (users) {
    userFind = users.find(function (userItem) {
      if (userItem.status === "active") {
        return true;
      } else {
        return false;
      }
    });
  }

  if (userFind) {
    loginInforSelectorCart.innerText = userFind.name;
    loginInforSelectorCart.closest("a").setAttribute("href", "my-account.html");
  }
}

getUserIsLogin();





function getUserLogin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userLogin = users.find((item) => item.status === "active");
  return userLogin;
}





// function tính toán tổng số cart. in ra html

function totalCartsNumber() {
  let userLogin = getUserLogin();
  if(userLogin){
    let cartOfUser = userLogin.cart || [];
    let totalCart = 0;
    for (let i = 0; i < cartOfUser.length; i++) {
      let quantity = cartOfUser[i].quantity;
      totalCart = totalCart + parseInt(quantity);
    }
  
    document.querySelector(".cart_count").innerText = totalCart;
  }

}

// Show
totalCartsNumber();
