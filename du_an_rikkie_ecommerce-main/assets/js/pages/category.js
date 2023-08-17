// Khai baos biến.
const categoryWrapperSelector = document.querySelector(".widget_categories");
let shopContainerSelector = document.querySelector(".shop_container");
let paginationSelector = document.querySelector(".pagination_style1");
const perPage = 6;

function showCategory() {
  // 1. Lấy tất cả danh mục từ local.
  let categorys = JSON.parse(localStorage.getItem("categorys"));
  //   Xây dựng cấu trúc html.
  let resultCate = "";
  for (let i = 0; i < categorys.length; i++) {
    let categoryItem = categorys[i];
    resultCate += `<li class="item_cate_click" data-caegory="${categoryItem.id}">
                <a href=""><span class="categories_name">${categoryItem.name}</span></a>
            </li>`;
  }
  document.querySelector(".widget_categories").innerHTML = resultCate;
}

function handleShowProductByCategory(event) {
  event.preventDefault();
  let clicked = event.target;
  let liSelectorClicked = clicked.closest(".item_cate_click");
  if (liSelectorClicked.classList.contains("item_cate_click")) {
    // Lâý ra category_id khi click vào danh mục
    let categoryId = liSelectorClicked.getAttribute("data-caegory");
    // Lấy tất cả sản phẩm trong local
    let products = JSON.parse(localStorage.getItem("products"));
    // Lấy filter sản phẩm theo danh mục.
    let productFilter = products.filter(
      (item) => item.category_id === categoryId
    );
    // Giới hạn sản phẩm trong 1 trang
    let productFilterPaginate = productFilter.slice(0, perPage);
    // Tạo mã html cho sản phẩm
    let htmlResult = "";
    for (let i = 0; i < productFilterPaginate.length; i++) {
      let productItem = productFilterPaginate[i];
      htmlResult += `<div class="col-md-4 col-6">
            <div class="product">
                <div class="product_img">
                    <a href="/shop-product-detail.html?id=${productItem.id}">
                        <img src="${productItem.image}" alt="product_img1">
                    </a>
                    <div class="product_action_box">
                        <ul class="list_none pr_action_btn">
                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                    Add To Cart</a></li>
                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                        class="icon-shuffle"></i></a></li>
                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                        class="icon-magnifier-add"></i></a></li>
                            <li><a href="#"><i class="icon-heart"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="product_info">
                    <h6 class="product_title"><a href="./shop-product-detail.html?id=${productItem.id}">${productItem.name}</a></h6>
                    <div class="product_price">
                        <span class="price">$${productItem.price}</span>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                            blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                    </div>

                    <div class="list_product_action_box">
                        <ul class="list_none pr_action_btn">
                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                    Add To Cart</a></li>
                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                        class="icon-shuffle"></i></a></li>
                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                        class="icon-magnifier-add"></i></a></li>
                            <li><a href="#"><i class="icon-heart"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
    }
    shopContainerSelector.innerHTML = htmlResult;
    // Thực hiện phân trang
    // 7.1 Tính toán tổng số trang
    let tatolPage = Math.ceil(productFilter.length / perPage);
    let htmlPagination = "";
    for (let i = 1; i < tatolPage; i++) {
      htmlPagination += `<li class="page-item ${i === 1 ? "active" : ""}">
            <a data-category_id="${categoryId}" data-page="${i}" class="page-link" href="#">${i}</a></li>`;
    }
    paginationSelector.innerHTML = htmlPagination;

    // active category click
    // xoá tất cả class active ở thẻ li
    document
      .querySelectorAll(".item_cate_click")
      .forEach((item) => item.classList.remove("active"));
    // thêm class active chi item li đang click
    liSelectorClicked.classList.add("active");
  }
}

function handleClickPageCategory(event) {
  event.preventDefault();
  let clicked = event.target;
  if (clicked.classList.contains("page-link")) {
    let page = clicked.getAttribute("data-page");
    // lấy category _id để giới hạn số sản phẩm theo danh mục
    let categoryId = clicked.getAttribute("data-category_id");
    // prosess data.
    // Lấy ra tất cả sản phẩm
    let products = JSON.parse(localStorage.getItem("products"));
    // Lấy tất cả sản phẩm theo category_id
    let productsFilter = products.filter(
      (item) => item.category_id === categoryId
    );
    // lấy ra tất cả các sản phẩm theo 1 page nào đấy.
    let indexStart = (page - 1) * perPage;
    let indexEnd = page * perPage;
    let productFilterPaginationPage = productsFilter.slice(
      indexStart,
      indexEnd
    );
    // tạo html.
    let htmlResult = "";
    for (let i = 0; i < productFilterPaginationPage.length; i++) {
      let productItem = productFilterPaginationPage[i];
      htmlResult += `<div class="col-md-4 col-6">
            <div class="product">
                <div class="product_img">
                    <a href="./shop-product-detail.html?id=${productItem.id}">
                        <img src="${productItem.image}" alt="product_img1">
                    </a>
                    <div class="product_action_box">
                        <ul class="list_none pr_action_btn">
                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                    Add To Cart</a></li>
                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                        class="icon-shuffle"></i></a></li>
                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                        class="icon-magnifier-add"></i></a></li>
                            <li><a href="#"><i class="icon-heart"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="product_info">
                    <h6 class="product_title"><a href="./shop-product-detail.html?id=${productItem.id}">${productItem.name}</a></h6>
                    <div class="product_price">
                        <span class="price">$${productItem.price}</span>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                            blandit massa enim. Nullam id varius nunc id varius nunc.</p>
                    </div>

                    <div class="list_product_action_box">
                        <ul class="list_none pr_action_btn">
                            <li class="add-to-cart" data-id_product="${productItem.id}"><a href="#"><i class="icon-basket-loaded"></i>
                                    Add To Cart</a></li>
                            <li><a href="shop-compare.html" class="popup-ajax"><i
                                        class="icon-shuffle"></i></a></li>
                            <li><a href="shop-quick-view.html" class="popup-ajax"><i
                                        class="icon-magnifier-add"></i></a></li>
                            <li><a href="#"><i class="icon-heart"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>`;
    }
    shopContainerSelector.innerHTML = htmlResult;
    // Thêm class active
    document
      .querySelectorAll(".page-item")
      .forEach((item) => item.classList.remove("active"));
    clicked.closest(".page-item").classList.add("active");
  }
}

// Gọi hàm và add event
showCategory();
categoryWrapperSelector.addEventListener("click", handleShowProductByCategory);
// Khi trang load lần đầu tự động click vào li đầu tiên
document.querySelector(".widget_categories li:first-child").click();

paginationSelector.addEventListener("click", handleClickPageCategory);
