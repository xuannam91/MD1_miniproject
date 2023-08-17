



let mainContentSelector = document.querySelector(".main_content");

function handleAddCart(event) {
    
    // Kiểm tra user chưa login thì dẫn đến màn hình login.
  
    let clicked = event.target;
    let liClicked = clicked.closest("li.add-to-cart");
    let idProduct = liClicked.getAttribute("data-id_product");
  
    let products = JSON.parse(localStorage.getItem("products"));
  
    let product = products.find((item) => item.id === idProduct);
  
    if (liClicked) {
      event.preventDefault();
      let userIsLoginning = getUserLogin();
      if (!userIsLoginning) {
        window.location.href = "./login.html";
      }
  
      //   2. Chắc chắn đã login thì thực hiện logisc cart.
      //   2.1 Tạo ra value của cart{sản phẩm}
      // user chưa có cart nghĩa là có tài khoản nhưng chưa mua hàng
  
      let cartOfuser = userIsLoginning.cart;
     
      
      let cart;
      // chưa có key cart , lần đầu mua hàng
      if (!cartOfuser) {
        cart = [{ ...product, quantity: 1 }];
      } else {
        let productExit = cartOfuser.find(item => item.id === idProduct);
          // Sản phẩm đã có trong giỏ hàng   
        if(productExit){
          cart = cartOfuser.map(
              function(item){
                  if(item.id === idProduct){
                      item.quantity = item.quantity + 1
                      return item;
                  }
                  else{
                      return item;
                  }
              }
          );
        }
          //   Sản phẩm chưa có trong giỏ hàng
        else{
              cart = [...cartOfuser, {...product, quantity: 1}]
        }
      }
  
  
  
      //2.2 update user dang login thì thêm thuộc tính cart cho user đang active
  
      let users = JSON.parse(localStorage.getItem("users"));
      let userUpdateCart = users.map(function (item) {
        if (item.status === "active") {
          item.cart = cart;
          return item;
        } else {
          return item;
        }
      });
      localStorage.setItem("users", JSON.stringify(userUpdateCart));
  
      totalCartsNumber();
  
  
    }
  
    
  }



mainContentSelector.addEventListener("click", handleAddCart);
