

function hideManagementUserRegular(){

    let users = JSON.parse(localStorage.getItem("users"));
    let userLogin = users.find(item => item.status === "active") ;
    if(userLogin.role !== "admin"){

        document.querySelector("#dashboard-tab"). closest("li").remove();
        document.querySelector("#users-tab"). closest("li").remove();
        document.querySelector("#address-tab"). closest("li").remove();
    }

    document.querySelector('.dashboard_menu ul li:first-child a').click();

}

hideManagementUserRegular()