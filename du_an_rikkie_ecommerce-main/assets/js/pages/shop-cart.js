const tbodyCartTable = document.querySelector('.shop_cart_table tbody');

let btnUpdateCart = document.querySelector(".btn_update_cart");



function showCartOfUser(){
    let userIsLoginning = getUserLogin();
    let cartOfUser = userIsLoginning.cart;
    let htmlResult = '';
    for (let i = 0; i < cartOfUser.length; i++) {
        htmlResult += `<tr data-product_id="${cartOfUser[i].id}">
                        <td class="product-thumbnail"><a href="#"><img src="${cartOfUser[i].image}" alt="product1"></a></td>
                        <td class="product-name" data-title="Product"><a href="#">${cartOfUser[i].name}</a></td>
                        <td class="product-price" data-title="Price">$${cartOfUser[i].price}</td>
                        <td class="product-quantity" data-title="Quantity"><div class="quantity">
                        <input type="button" value="-" class="minus">
                        <input type="text" name="quantity" value="${cartOfUser[i].quantity}" title="Qty" class="qty" size="4">
                        <input type="button" value="+" class="plus">
                        </div></td>
                        <td class="product-subtotal" data-title="Total">$${cartOfUser[i].quantity * cartOfUser[i].price}</td>
                        <td class="product-remove" data-title="Remove"><a href=""><i class="ti-close"></i></a></td>
                    </tr>`
        
    }

    tbodyCartTable.innerHTML = htmlResult;

}



function handleProcessCart(event){
    event.preventDefault();
    let clicked = event.target;

   
    if(clicked.classList.contains("plus")){
        let inputSelector = clicked.closest(".quantity").querySelector(".qty");
        let valueInput = parseInt(inputSelector.value);
        inputSelector.value = valueInput + 1



        // Tính lại tiền 
        let idProduct = clicked.closest('tr').getAttribute("data-product_id");
        let product = JSON.parse(localStorage.getItem("products")).find(item => item.id === idProduct);
        let price = product.price;
        let quantity = clicked.closest('tr').querySelector('.qty').value;
        clicked.closest('tr').querySelector('.product-subtotal').innerText = '$' + price * quantity;
        

    }
    else if(clicked.classList.contains("minus")){
        let inputSelector = clicked.closest(".quantity").querySelector(".qty");
        let valueInput = parseInt(inputSelector.value);
        if(valueInput === 1){
            return;
        }
        inputSelector.value = valueInput - 1

                // Tính lại tiền 
                let idProduct = clicked.closest('tr').getAttribute("data-product_id");
                let product = JSON.parse(localStorage.getItem("products")).find(item => item.id === idProduct);
                let price = product.price;
                let quantity = clicked.closest('tr').querySelector('.qty').value;
                clicked.closest('tr').querySelector('.product-subtotal').innerText = '$' + price * quantity;
    }
    // xoa
    else if(clicked.classList.contains("ti-close")){
        clicked.closest("tr").remove();
    }
}



// Tính tổng tiền 
function totalMoneyCart(){
    let userIsLoginning = getUserLogin();
    let cartOfUser = userIsLoginning.cart; 
    let totalMonney = 0;
    for (let i = 0; i < cartOfUser.length; i++) {
        totalMonney = totalMonney + (cartOfUser[i].quantity * cartOfUser[i].price)
        
    }

    document.querySelector(".cart_total_amount strong").innerText ="$" + totalMonney
}



function handleUpdateCart(){
    // 1 lấy cart user
    let userIsLoginning = getUserLogin();
    let cartOfUser = userIsLoginning.cart; 
    let cartUpdate = [];
    for (let i = 0; i < cartOfUser.length; i++) {
        let cartItem = cartOfUser[i];
        let idProduct = cartOfUser[i].id;
        let trProductWrapper = document.querySelector(`tr[data-product_id="${idProduct}"]`);

        if(trProductWrapper){
            let inputSelector = trProductWrapper.querySelector(".qty");
            let valueInput = inputSelector.value;
            cartItem.quantity = valueInput;
            cartUpdate.push(cartItem)
        }
    }



    let users = JSON.parse(localStorage.getItem("users"));
    let userUpdateCart = users.map(function (item) {
      if (item.status === "active") {
        item.cart = cartUpdate;
        return item;
      } else {
        return item;
      }
    });
    localStorage.setItem("users", JSON.stringify(userUpdateCart));

    totalCartsNumber();
    totalMoneyCart();
}






showCartOfUser();

// Thêm sự kiện tăng giảm số lượng 

tbodyCartTable.addEventListener("click", handleProcessCart)

totalMoneyCart();

// Thêm 
btnUpdateCart.addEventListener("click", handleUpdateCart)