let loginInforSelector = document.querySelector(".header_list .ti-user").nextElementSibling

let ulTabSelector = document.querySelector(".product_tab_click");

let sliderProduct = document.querySelector(".slider_product");


let elementChild = document.querySelector(".element_productall");





// nếu login ok thì không cho vào đăng kí hoặc đăng nhập được nữa.
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
    loginInforSelector.innerText = userFind.name;
    loginInforSelector.closest("a").setAttribute("href", "my-account.html");
  }
}

getUserIsLogin();








// index js

function handleShowProductByTab(event) {
  let clicked = event.target;
  if (clicked.classList.contains("product_item_tab")) {
    let productType = clicked.getAttribute("data-type");
    let products = JSON.parse(localStorage.getItem("products"));
    let productFilterByType = products.filter(function (item) {
      return item.type === productType;
    });

    let newLastProduct = productFilterByType.slice(-8)

    

    let resultHtml = renderProduct(newLastProduct);

    let objMapping = {
      new_arrival: "#arrival",
      best_seller: "#sellers",
      feature: "#featured",
      special_offer: "#special",
    };

    document
      .querySelector(objMapping[productType])
      .querySelector(".shop_container").innerHTML = resultHtml;

    // if(productType === "new_arrival"){
    //   document.querySelector("#arrival .shop_container").innerHTML = resultHtml
    // }
    // else if(productType === "best_seller"){
    //   document.querySelector("#sellers .shop_container").innerHTML = resultHtml
    // }
    // else if(productType === "feature"){
    //   document.querySelector("#featured .shop_container").innerHTML = resultHtml
    // }
    // else if(productType === "special_offer"){
    //   document.querySelector("#special .shop_container").innerHTML = resultHtml
    // }
  }
}





function renderProduct(productFilterByType) {
  let resultHtml = "";
  for (let i = 0; i < productFilterByType.length; i++) {
    resultHtml += `<div class="col-lg-3 col-md-4 col-6">
    <div class="product">
        <div class="product_img">
            <a href="./shop-product-detail.html?id=${productFilterByType[i].id}">
                <img src="${productFilterByType[i].image}" alt="product_img1">
            </a>
            <div class="product_action_box">
                <ul class="list_none pr_action_btn">
                    <li class="add-to-cart" data-id_product="${productFilterByType[i].id}">
                        <a href="">
                        <i class="icon-basket-loaded"></i>
                        Add To Cart
                        </a>
                    </li>
                    <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                    <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
                    <li><a href="#"><i class="icon-heart"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="product_info">
            <h6 class="product_title"><a data-idproduct="${productFilterByType[i].id}" href="./shop-product-detail.html?id=${productFilterByType[i].id}">${productFilterByType[i].name}</a></h6>
            <div class="product_price">
                <span class="price">$${productFilterByType[i].price}</span>
                <del>$55.25</del>
                <div class="on_sale">
                    <span>35% Off</span>
                </div>
            </div>
            <div class="rating_wrap">
                <div class="rating">
                    <div class="product_rate" style="width:80%"></div>
                </div>
                <span class="rating_num">(21)</span>
            </div>

        </div>
    </div>
    </div>`;
  }
  return resultHtml;
}





// function loadDataArival() {
//   let products = JSON.parse(localStorage.getItem("products"));
//   let productFilterByType = products.filter(function (item) {
//     return item.type === "new_arrival";
//   });
//   let newLastProduct = productFilterByType.slice(-8);

//   let resultHtml = renderProduct(newLastProduct);
//   document.querySelector("#arrival .shop_container").innerHTML = resultHtml;
// }
//  loadDataArival();




function handleSlider() {
  let products = JSON.parse(localStorage.getItem("products"));
  let productFilterFeatured = products.filter((item) => item.type === "feature");

  let resultHtmlFeatured = "";
  for (let i = 0; i < productFilterFeatured.length; i++) {
    resultHtmlFeatured += `<div class="item">
    <div class="product">
        <div class="product_img">
            <a href="./shop-product-detail.html?id=${productFilterFeatured[i].id}">
                <img src="${productFilterFeatured[i].image}" alt="product_img1">
            </a>
            <div class="product_action_box">
                <ul class="list_none pr_action_btn">
                    <li class="add-to-cart" data-id_product="${productFilterFeatured[i].id}"><a href=""><i class="icon-basket-loaded"></i> Add To Cart</a></li>
                    <li><a href="shop-compare.html" class="popup-ajax"><i class="icon-shuffle"></i></a></li>
                    <li><a href="shop-quick-view.html" class="popup-ajax"><i class="icon-magnifier-add"></i></a></li>
                    <li><a href="#"><i class="icon-heart"></i></a></li>
                </ul>
            </div>
        </div>
        <div class="product_info">
            <h6 class="product_title"><a href="./shop-product-detail.html?id=${productFilterFeatured[i].id}">${productFilterFeatured[i].name}</a></h6>
            <div class="product_price">
                <span class="price">$${productFilterFeatured[i].price}</span>
                <del>$55.25</del>
                <div class="on_sale">
                    <span>35% Off</span>
                </div>
            </div>
            <div class="rating_wrap">
                <div class="rating">
                    <div class="product_rate" style="width:80%"></div>
                </div>
                <span class="rating_num">(21)</span>
            </div>
            <div class="pr_desc">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim. Nullam id varius nunc id varius nunc.</p>
            </div>
            <div class="pr_switch_wrap">
                <div class="product_color_switch">
                    <span class="active" data-color="#87554B"></span>
                    <span data-color="#333333"></span>
                    <span data-color="#DA323F"></span>
                </div>
            </div>
        </div>
    </div>
    </div>`;
  }
  sliderProduct.innerHTML = resultHtmlFeatured;
}


// Hàm lấy ra sản phẩm riêng lẻ

// function handleChildProduct(event){
//   let products = JSON.parse(localStorage.getItem("products"));
//   let idProductChild = event.target.getAttribute("data-idproduct");
 
//   for (let i = 0; i < products.length; i++) {
    
//     if(products[i].id === idProductChild){
     
//         localStorage.setItem("inforproduct", JSON.stringify(products[i]))
       
//     }
//   }
  // window.location.href = "./shop-product-detail.html";
// }


// Hàm tìm kiếm sản phẩm.






handleSlider();

ulTabSelector.addEventListener("click", handleShowProductByTab);
// Hàm tự động click vào vị trí theo yêu cầu
document.querySelector('a[href="#arrival"]').click();




// elementChild.addEventListener("click", handleChildProduct)