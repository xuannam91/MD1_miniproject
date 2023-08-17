// // Khai báo biến
// let buttonLogin = document.querySelector(".btn-login");

// let emailSelector = document.querySelector(".email");
// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// let passwordSelector = document.querySelector(".password");
// let passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// let tooglePass = document.querySelector(".toogle_password");

// // Khai báo hàm và thực thi hàm.

// function handleTooglePass(event){
//     let clicked = event.target;
//     let typePass = passwordSelector.getAttribute("type");
//     if(typePass === "password"){
//         passwordSelector.setAttribute("type", "text");
//         clicked.classList.remove('fa-eye-slash');
//         clicked.classList.add('fa-eye');
//     }
//     else{
//         passwordSelector.setAttribute("type", "password");
//         clicked.classList.remove('fa-eye');
//         clicked.classList.add('fa-eye-slash');
//     }
// }

// function showError(inputElement, message) {
//   inputElement.classList.add("error");
//   inputElement.classList.remove("success");
//   let messageElement = inputElement.nextElementSibling;
//   messageElement.innerText = message;
// }

// function showSuccess(inputElement) {
//   inputElement.classList.add("success");
//   inputElement.classList.remove("error");
//   let messageElement = inputElement.nextElementSibling;
//   messageElement.innerText = "";
// }

// function handleLogin(event) {
//   event.preventDefault();

//   let isValidEmailLogin = validateEmailLogin();
//   let isValidPasswordLogin = validatePasswordLogin();

//   let usersLogin = JSON.parse(localStorage.getItem("users")) || [];
//   if (isValidEmailLogin && isValidPasswordLogin) {
//     let indexUser = -1;
//     for (let i = 0; i < usersLogin.length; i++) {
//       if (
//         usersLogin[i].email === emailSelector.value &&
//         usersLogin[i].password === passwordSelector.value
//       ) {
//         indexUser = i;
//         break;
//       }
//     }

//     if (indexUser !== -1) {
//       alert("Đăng nhập thành công!");
//       localStorage.setItem("inforuser", JSON.stringify(usersLogin[indexUser]));
//       window.location.href = "index.html";
//     } else {
//       alert("Email hoặc Password không chính xác");
//     }
//   }
// }

// function validateEmailLogin() {
//   let checkEmail = false;
//   let valueEmail = emailSelector.value.trim();
//   if (valueEmail === "") {
//     showError(emailSelector, "Email không được bỏ trống");
//   } else if (emailRegex.test(valueEmail) === false) {
//     showError(emailSelector, "Email không đúng định dạng");
//   } else {
//     checkEmail = true;
//     showSuccess(emailSelector);
//   }
//   return checkEmail;
// }

// function validatePasswordLogin() {
//   let checkPassword = false;
//   let valuePassword = passwordSelector.value.trim();
//   if (valuePassword === "") {
//     showError(passwordSelector, "Password không được bỏ trống");
//   } else if (valuePassword.length < 8) {
//     showError(passwordSelector, "Password yêu cầu phải đủ 8 kí tự");
//   } else if (passwordRegex.test(valuePassword) === false) {
//     showError(
//       passwordSelector,
//       "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt"
//     );
//   } else {
//     checkPassword = true;
//     showSuccess(passwordSelector);
//   }
//   return checkPassword;
// }

// // Nơi chạy hàm hoặc addeventlistens.
// tooglePass.addEventListener("click", handleTooglePass);
// buttonLogin.addEventListener("click", handleLogin);

// emailSelector.addEventListener("keyup", validateEmailLogin);
// passwordSelector.addEventListener("keyup", validatePasswordLogin);










// Cách 2:

// Khai báo biến
let buttonLogin = document.querySelector(".btn-login");
let inputSelectorAll = document.querySelectorAll(".form-group .form-control");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailSelector = document.querySelector(".email");
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
let passwordSelector = document.querySelector(".password");



function ValidateEmail(valueInput) {
  let message = null;
  if (valueInput === "") {
    message = "Email không được để trống";
  } else if (emailRegex.test(valueInput) === false) {
    message = "Email không đúng định dạng";
  } 
  return message;
}





function ValidatePassword(valueInput) {

  let message = null;
  if (valueInput === "") {
    message = "Password không được để trống";
  } else if (valueInput.length < 8) {
    message = "Password phải có ít nhất 8 kí tự";
  } else if (passwordRegex.test(valueInput) === false) {
    message = "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt";
  } 
  return message;
}





function handleLogin(event) {
  event.preventDefault();
  let errorMessage = [];
  let message;
  for (let i = 0; i < inputSelectorAll.length; i++) {
    let nameInput = inputSelectorAll[i].getAttribute("name");
    let valueInput = inputSelectorAll[i].value.trim();
    // nếu input đầu vào là email thì thực hiện validate email
    if (nameInput === "email") {
      message = ValidateEmail(valueInput);
    } else {
      message = ValidatePassword(valueInput);
    }

    //  hiển thị lỗi cho ng dùng.
    let errorMessageSelector = inputSelectorAll[i]
      .closest(".form-group")
      .querySelector(".error-message");
    if (message === null) {
      inputSelectorAll[i].classList.remove("error");
      inputSelectorAll[i].classList.add("success");
      errorMessageSelector.innerText = "";

    } else {
      inputSelectorAll[i].classList.add("error");
      inputSelectorAll[i].classList.remove("success");
      errorMessageSelector.innerText = message;
      errorMessage.push(message);
    }
  }
  
  // Không có lỗi nào thì submit form.

  if(errorMessage.length === 0){
    let usersLogin = JSON.parse(localStorage.getItem("users"));
    let isLoginExit = -1;
    for (let i = 0; i < usersLogin.length; i++) {
      if(
        usersLogin[i].email === emailSelector.value &&
        usersLogin[i].password === passwordSelector.value
      ){
        isLoginExit = i;
        break;
      }
    }
    

    if(isLoginExit !== -1){

      usersLogin.forEach(function(item) {
          item.status = '';
      });

      usersLogin[isLoginExit].status = "active"
      localStorage.setItem("users", JSON.stringify(usersLogin));

      if(usersLogin[isLoginExit].role === "admin"){
        window.location.href = './my-account.html'
      }else{
        window.location.href = "./index.html"
      }
    }
    else{
      // hiển thị lỗi trên form
      document.querySelector('.alert-danger').innerText = "Email hoặc Password không chính xác";
      document.querySelector(".alert-danger").classList.remove("hide")
    }

  }


}

// Nơi chạy hàm hoặc addeventlistens.

buttonLogin.addEventListener("click", handleLogin);
