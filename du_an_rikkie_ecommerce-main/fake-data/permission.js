


function createUserAdmin(){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // Thực hiện update user cũ và thêm vào user admin mới
    let userAdmin = {
        id: crypto.randomUUID(),
        name: "Admin",
        email: "admin@gmail.com",
        password: 'a@A123456',
        status: '',
        role: "admin"
    }
    // Tạo ra mảng mới gồm dữ liệu user cũ + useradmin
    let userAll = [...users, userAdmin];
    
    // cập nhật role cho usẻr thông thường
    let userAllUpdate = userAll.map(
        function (item){
            if(item.role === "admin"){
                return item
            }else{
                item.role = "regular";
                return item
            }
        }
    );

    let userAdimExit = users.find((item => item.role === 'admin'));
    if(!userAdimExit){

        // Cập nhật lại local
        localStorage.setItem("users", JSON.stringify(userAllUpdate));
    }

}



// Tạo user Admin
// role: admin
createUserAdmin()