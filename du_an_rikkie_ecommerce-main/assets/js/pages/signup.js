
// khai báo biến.
let buttonRegister = document.querySelector(".btn-signup");

let nameSelector = document.querySelector(".name");

let emailSelector = document.querySelector(".email");
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let passwordSelector = document.querySelector(".password");
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


let confirmPasswordSelector = document.querySelector(".confirm_password");


let tooglePass = document.querySelector(".toogle_password");





//  Nơi khai báo hàm, lắng nghe sự kiện.



function showError(input, message) {
  input.classList.remove("success");
  input.classList.add("error");
  let messageInput = input.nextElementSibling;
  // Hiển thị message lỗi
  messageInput.innerText = message;
// thêm class error cho parent.
  input.closest(".form-group").classList.add('form-group_error');
}


function showSuccess(input) {
  // Thay đổi boder input
  input.classList.remove("error");
  input.classList.add("success");
  let messageInput = input.nextElementSibling;
  // Xoá message lỗi
  messageInput.innerText = "";
// xoá class error cho parent.
  input.closest(".form-group").classList.remove('form-group_error');
}


function handleSignup(event) {
  // Ngăn cản hành động submit form khi nhấn vào nút button submit.
  event.preventDefault();


  // 1.1 Name
  let isValidName = validateName();

  // 2.1 Email 
  let isValidEmail = validateEmail();

  // 3.1 Password 
  let isValidPassword = validatePassword();


  // 4.1 ConfirmPassword 
  let isValidConfirmPassword = validateConfirmPassword();



  
  console.log(isValidName,isValidEmail,isValidPassword,isValidConfirmPassword);

   // gọi local.
  let userLocal = JSON.parse(localStorage.getItem("users")) || [];
  if(isValidName && isValidEmail && isValidPassword && isValidConfirmPassword){


    let user = {
      id: Date.now(),
      name: nameSelector.value.trim(),
      email: emailSelector.value.trim(),
      password: passwordSelector.value.trim(),
      confirmpassword: confirmPasswordSelector.value.trim(),
      status:'',
      role: 'regular'
    };

    for (let i = 0; i < userLocal.length; i++) {
      if ( userLocal[i].email === emailSelector.value) {
        alert("Email đã có người sử dụng sử dụng");
        return;
      }
    }
    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));
    alert("Đăng ký thành công!");
    window.location.href = "./login.html"
  }
 
}



function handleTooglePass(event){
  let typePass = passwordSelector.getAttribute("type");
  let clicked = event.target;
  if(typePass === 'password'){
    typePass = 'text';
    clicked.classList.remove('fa-eye-slash');
    clicked.classList.add('fa-eye');
  }else{
    typePass = 'password';
    clicked.classList.remove('fa-eye');
    clicked.classList.add('fa-eye-slash');
  }
  passwordSelector.setAttribute('type', typePass)
}



// handleKeyUpname
function validateName(){
  let isValidate = false;
  let valueName = nameSelector.value.trim();
  if (valueName === "") {
    showError(nameSelector, "Tên không được để trống");
  }
  else {
    isValidate = true;
    showSuccess(nameSelector);
  }
  return isValidate;
}


// handleKeyEmail
function validateEmail(){
  let isValidate = false;
  let valueEmail = emailSelector.value.trim();
  if (valueEmail === "") {
    // Thay đổi boder input
    showError(emailSelector, "Email không được để trống");

  } else if (emailRegex.test(valueEmail) === false) {
    showError(emailSelector, "Email không đúng định dạng");

  } 
  else {
    isValidate = true;
    showSuccess(emailSelector);
  }
  return isValidate;
}

// handleKeyUPassword.
function validatePassword(){
  let isValidate = false;
  let valuePassword = passwordSelector.value.trim();
  if (valuePassword === "") {
    showError(passwordSelector, "Password không được để trống");
    
   
  } else if (valuePassword.length < 8) {
    showError(passwordSelector, "Yêu cầu nhập đủ 8 kí tự");

  } else if (passwordRegex.test(valuePassword) === false) {
    showError(
      passwordSelector,
      "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt"
    );
  }
   else {
    isValidate = true;
    showSuccess(passwordSelector);
  }
  return isValidate;
}



// handleKeyUpConfirmPassword.
function validateConfirmPassword(){
  let isValidate = false;
  let valueConfirmPassword = confirmPasswordSelector.value.trim();
  let valuePassword = passwordSelector.value.trim();
  if (valueConfirmPassword === "") {
    showError(confirmPasswordSelector, "confirmpassword không được để trống");
  } else if (valueConfirmPassword !== valuePassword) {
    showError(confirmPasswordSelector, "Password bắt buộc phải trùng nhau");
  } 
  else {
    isValidate = true;
    showSuccess(confirmPasswordSelector);
  }
  return isValidate;
}

// Nơi chạy hàm hoặc addeventlistens.

buttonRegister.addEventListener("click", handleSignup);
tooglePass.addEventListener("click", handleTooglePass);




// Bắt sự kiện keyup cho ô input name.
nameSelector.addEventListener('keyup', validateName);

// Bắt sự kiện keyup cho ô input email.
emailSelector.addEventListener('keyup', validateEmail)

// Bắt sự kiện keyup cho ô input password.
passwordSelector.addEventListener('keyup',validatePassword);

// Bắt sự kiện keyup cho ô input ConfirmPassword.
confirmPasswordSelector.addEventListener('keyup',validateConfirmPassword)
