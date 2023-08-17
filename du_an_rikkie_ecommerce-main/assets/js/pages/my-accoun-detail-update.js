let buttonAccountDetailSelector = document.querySelector(".btn_account_detail");

let accountDetailNameSelector = document.querySelector('input[name="dname"]');
let accountDetailEmailSelector = document.querySelector(
  '.form_update_account input[name="email"]'
);
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let accountDetailPasswordSelector = document.querySelector(
  '.form_update_account input[name="password"]'
);
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
let accountDetailNewPassSelector = document.querySelector(
  '.form_update_account input[name="npassword"]'
);
let accountDetailConfirmPassSelector = document.querySelector(
  '.form_update_account input[name="cpassword"]'
);

// hàm update thông tin account.
function handleUpdateAccountDetail(event) {
  event.preventDefault();
  let isFormValid = true;
  let valueName = accountDetailNameSelector.value.trim();
  let valueEmail = accountDetailEmailSelector.value.trim();
  let valuePassword = accountDetailPasswordSelector.value.trim();
  let valueNewPass = accountDetailNewPassSelector.value.trim();
  let valueConfirmPass = accountDetailConfirmPassSelector.value.trim();

  // validate name
  if (valueName === "") {
    accountDetailNameSelector.classList.add("error");
    accountDetailNameSelector.nextElementSibling.innerText =
      "Không được để trống";
    isFormValid = false;
  } else {
    accountDetailNameSelector.classList.remove("error");
    accountDetailNameSelector.nextElementSibling.innerText = "";
  }

  // validate email
  if (valueEmail === "") {
    accountDetailEmailSelector.classList.add("error");
    accountDetailEmailSelector.nextElementSibling.innerText =
      "Không được để trống";
    isFormValid = false;
  } else if (emailRegex.test(valueEmail) === false) {
    accountDetailEmailSelector.classList.add("error");
    accountDetailEmailSelector.nextElementSibling.innerText =
      "Email không đúng định dạng";
    isFormValid = false;
  } else {
    accountDetailEmailSelector.classList.remove("error");
    accountDetailEmailSelector.nextElementSibling.innerText = "";
  }

  // Validate password
  if (valuePassword === "") {
    accountDetailPasswordSelector.classList.add("error");
    accountDetailPasswordSelector.nextElementSibling.innerText =
      "Không được để trống";
    isFormValid = false;
  } 
  else if (passwordRegex.test(valuePassword) === false) {
    accountDetailPasswordSelector.classList.add("error");
    accountDetailPasswordSelector.nextElementSibling.innerText =
      "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt";
    isFormValid = false;
  } 
  else if (valuePassword.length < 8){
    accountDetailPasswordSelector.classList.add("error");
    accountDetailPasswordSelector.nextElementSibling.innerText =
      "Password yêu cầu 8 kí tự";
    isFormValid = false;
  } 
  else {
    accountDetailPasswordSelector.classList.remove("error");
    accountDetailPasswordSelector.nextElementSibling.innerText = "";
  }

  // Validate Newpassword
  if (valueNewPass === "") {
    accountDetailNewPassSelector.classList.add("error");
    accountDetailNewPassSelector.nextElementSibling.innerText =
      "Không được để trống";
    isFormValid = false;
  }
  else if (passwordRegex.test(valueNewPass) === false) {
    accountDetailNewPassSelector.classList.add("error");
    accountDetailNewPassSelector.nextElementSibling.innerText =
      "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt";
    isFormValid = false;
  } 
  else if (valueNewPass.length < 8){
    accountDetailNewPassSelector.classList.add("error");
    accountDetailNewPassSelector.nextElementSibling.innerText =
      "Password yêu cầu 8 kí tự";
    isFormValid = false;
  } 
  else {
    accountDetailNewPassSelector.classList.remove("error");
    accountDetailNewPassSelector.nextElementSibling.innerText = "";
  }

  // Validate Confirmpassword
  if (valueConfirmPass === "") {
    accountDetailConfirmPassSelector.classList.add("error");
    accountDetailConfirmPassSelector.nextElementSibling.innerText =
      "Không được để trống";
    isFormValid = false;
  }
  else if (passwordRegex.test(valueConfirmPass) === false) {
    accountDetailConfirmPassSelector.classList.add("error");
    accountDetailConfirmPassSelector.nextElementSibling.innerText =
      "Password yêu cầu một số, in hoa, chữ thường, và kí tự đặc biệt";
    isFormValid = false;
  } 
  else if (valueConfirmPass.length < 8){
    accountDetailConfirmPassSelector.classList.add("error");
    accountDetailConfirmPassSelector.nextElementSibling.innerText =
      "Password yêu cầu 8 kí tự";
    isFormValid = false;
  }
  else if(valueConfirmPass !== valueNewPass){
    accountDetailConfirmPassSelector.classList.add("error");
    accountDetailConfirmPassSelector.nextElementSibling.innerText =
      "Password không trùng nhau";
    isFormValid = false;
  }
  else {
    accountDetailConfirmPassSelector.classList.remove("error");
    accountDetailConfirmPassSelector.nextElementSibling.innerText = "";
  }

  // kiểm tra form hợp lệ thì thực thi hàm
  if (isFormValid) {
    handleUpdateAccountDetailValid();
    document.querySelector(".form_update_account").reset();
  }
}

function handleUpdateAccountDetailValid() {
  let valueName = accountDetailNameSelector.value.trim();
  let valueEmail = accountDetailEmailSelector.value.trim();
  let valuePassword = accountDetailPasswordSelector.value.trim();
  let valueNewPass = accountDetailNewPassSelector.value.trim();
 
  

  // dùng hàm find để tìm object thoả mãn điều kiện
  let users = JSON.parse(localStorage.getItem("users"));
  let userIsLogin = users.find((item) => (item.status = "active"));
  console.log(userIsLogin);
  if (userIsLogin && userIsLogin.password === valuePassword) {
    let userUpdateInfor = users.map(function (item) {
      if (item.status === "active") {
        return {
          id: item.id,
          name: valueName,
          email: valueEmail,
          password: valueNewPass,
          status: "active",
        };
      } else {
        return item;
      }
    });
    console.log(userUpdateInfor);
    localStorage.setItem("users", JSON.stringify(userUpdateInfor));
  }
  window.location.href = "./login.html";
}

function showNameAndEmail() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userLogin = users.find((item) => item.status === "active");
  if (userLogin) {
    accountDetailNameSelector.value = userLogin.name;
    accountDetailEmailSelector.value = userLogin.email;
    accountDetailEmailSelector.disabled = true;
  } else {
    window.location.href = "./login.html";
  }
}

buttonAccountDetailSelector.addEventListener("click", handleUpdateAccountDetail);
showNameAndEmail();
