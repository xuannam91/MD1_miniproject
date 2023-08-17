// khai báo biến
let buttonSave = document.querySelector(".btn_save");

let nameSelector = document.querySelector(".name");
let priceSelector = document.querySelector(".prices");
let imageSelector = document.querySelector(".image");
let descriptionSelector = document.querySelector(".description");

let tableBody = document.querySelector(".table-body");

let categoryFormSelector = document.querySelector(".category_wrapper_form");


let btnSearchProduct = document.querySelector(".btn-search_product");
let inputSeachSelector = document.querySelector(".input-search_product");


// 2. Khai báo hàm

function handleAddProduct(event) {
  event.preventDefault();
  let isValidform = true;
  // 1.validate theo yêu cầu.
  let valueName = nameSelector.value.trim();
  // Kiểm tra biến name có rỗng hay không.
  // tìm phần tử kế tiếp
  let divError = nameSelector.nextElementSibling;
  if (valueName === "") {
    nameSelector.classList.add("error");
    divError.innerText = "Tên không được để trống";
    isValidform = false;
  }
  // Người dùng nhập hợp lệ
  else {
    nameSelector.classList.remove("error");
    divError.innerText = "";
  }

  // validate price
  let valuePrice = priceSelector.value.trim();
  let divErrorPrice = priceSelector.nextElementSibling;
  if (valuePrice === "") {
    priceSelector.classList.add("error");
    divErrorPrice.innerText = "Giá không được để trống";
    isValidform = false;
  } else if (isNaN(valuePrice) || valuePrice < 0) {
    priceSelector.classList.add("error");
    divErrorPrice.innerText = "Xin hãy nhập số dương";
    isValidform = false;
  } else {
    priceSelector.classList.remove("error");
    divErrorPrice.innerText = "";
  }

  // validate img

  let valueImage = imageSelector.value.trim();
  let divErrorImage = imageSelector.nextElementSibling;
  if (valueImage === "") {
    imageSelector.classList.add("error");

    divErrorImage.innerText = "Link ảnh không được để trống";
    isValidform = false;
  } else {
    imageSelector.classList.remove("error");
    divErrorImage.innerText = "";
  }

  // Vallidate description.

  let valueDescription = descriptionSelector.value.trim();
  let divErrorDescription = descriptionSelector.nextElementSibling;
  if (valueDescription === "") {
    descriptionSelector.classList.add("error");
    divErrorDescription.innerText = "Description không được để trống";
    isValidform = false;
  } else {
    descriptionSelector.classList.remove("error");
    divErrorDescription.innerText = "";
  }

  if (isValidform) {
    let clicked = event.target;
    if (clicked.classList.contains("update")) {
      let idUpdate = buttonSave.getAttribute("data-id");
      handleUpdate(idUpdate);
    } else {
      handleSubmitForm();
    }
    document.querySelector(".form-save").reset();
  }
}

// update sản phẩm.

function handleUpdate(idUpdate) {
  let products = JSON.parse(localStorage.getItem("products"));
  let indexUpdate = products.findIndex(function (item) {
    return item.id === idUpdate;
  });

  let valueName = nameSelector.value.trim();
  let valuePrice = priceSelector.value.trim();
  let valueImage = imageSelector.value.trim();
  let valueDescription = descriptionSelector.value.trim();
  let valueType = document.querySelector(".type_product:checked").value;
  let valueCategorys = categoryFormSelector.value;



  products[indexUpdate] = {
    id: products[indexUpdate].id,
    name: valueName,
    price: valuePrice,
    image: valueImage,
    description: valueDescription,
    type: valueType,
    category_id: valueCategorys,
    comment: products[indexUpdate].comment
  };

  localStorage.setItem("products", JSON.stringify(products));

  renderDataProduct();

  buttonSave.removeAttribute("data-id");
  buttonSave.innerText = "Save";
  buttonSave.classList.remove("update");
}

// nếu data hợp lệ thì thực thi hàm này.

function handleSubmitForm(event) {
  // 1. Lấy giá trị trong form.
  let valueName = nameSelector.value.trim();
  let valuePrice = priceSelector.value.trim();
  let valueImage = imageSelector.value.trim();
  let valueDescription = descriptionSelector.value.trim();
  
  // lấy value radio checked.
  let valueType = document.querySelector(".type_product:checked").value;
  // lấy value Select
  let valueCategorys = categoryFormSelector.value;

  // Phân tích dữ liệu cần lưu trữ
  let products;
  if (localStorage.getItem("products") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }

  let newProduct = {
    id: crypto.randomUUID(),
    name: valueName,
    price: valuePrice,
    image: valueImage,
    description: valueDescription,
    type: valueType,
    category_id: valueCategorys,
    comment: []

  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  renderDataProduct();
}

// render sản phẩm
function renderDataProduct() {
  let products = JSON.parse(localStorage.getItem("products"));
  if (products) {
    let result = "";
    for (let i = 0; i < products.length; i++) {
      result += `<tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>
                    <img src="${products[i].image}" alt="">
                </td>
                <td>${products[i].type}</td>
                <td>
                    <button data-id="${products[i].id}" class="btn_common btn_edit">Edit</button>
                    <button data-id="${products[i].id}" class="btn_common btn_delete">Delete</button>
                </td>
                </tr>`;
    }

    tableBody.innerHTML = result;
  }
}
renderDataProduct();

// Xoá sản phẩm và edit

function handleAction(event) {
  let products = JSON.parse(localStorage.getItem("products"));

  let clicked = event.target;
  if (clicked.classList.contains("btn_delete")) {

    
    // chuyển động nút button khi click vào
    clicked.classList.add("clicked");
    setTimeout(function () {
      clicked.classList.remove("clicked");
    }, 100);
    // kết thúc chuyển động

    let confirmDelete = confirm("Bạn chắc chắn muốn xóa không ?");
    if (confirmDelete) {
      let idDelete = clicked.getAttribute("data-id");
      let deleteProduct = products.filter(function (item) {
        return item.id !== idDelete;
      });

      localStorage.setItem("products", JSON.stringify(deleteProduct));
      renderDataProduct();

      document.querySelector(".form-save").reset();

      // thay đổi nút button add
      buttonSave.removeAttribute("data-id");
      buttonSave.innerText = "Save";
      buttonSave.classList.remove("update");
    }
  } else if (clicked.classList.contains("btn_edit")) {


    // chuyển động nút button khi click vào
    clicked.classList.add("clicked");
    setTimeout(function () {
      clicked.classList.remove("clicked");
    }, 100);
    // kết thúc chuyển động



    let idEdit = clicked.getAttribute("data-id");

    let editProduct = products.find(function (item) {
      return item.id === idEdit;
    });

    nameSelector.value = editProduct.name;
    priceSelector.value = editProduct.price;
    imageSelector.value = editProduct.image;
    descriptionSelector.value = editProduct.description;
    let valueType = editProduct.type;
    document.querySelector(`input[value = ${valueType}]`).checked = true;

    categoryFormSelector.value = editProduct.category_id


    // thay đổi
    buttonSave.setAttribute("data-id", idEdit);
    buttonSave.innerText = "Update";
    buttonSave.classList.add("update");
  }
}



function showCategoryInit(){
  let categorys = JSON.parse(localStorage.getItem("categorys"));
  let resultOptionHtml ='';
  for (let i = 0; i < categorys.length; i++) {
    let categoryItem = categorys[i]
      resultOptionHtml += `<option value="${categoryItem.id}">${categoryItem.name}</option>`
  }
  categoryFormSelector.innerHTML = resultOptionHtml;
}



// hàm tìm kiếm.

function handleSearchProduct(){
  let valueInputSearch = inputSeachSelector.value;
  let products = JSON.parse(localStorage.getItem("products"));
  let result = '';
  let searchProduct = products.filter(
    function(item){
      return item.name.toLowerCase().includes(valueInputSearch);
    }
  );

    for (let i = 0; i < searchProduct.length; i++) {
      result += `<tr>
                    <td>${searchProduct[i].name}</td>
                    <td>${searchProduct[i].price}</td>
                    <td>
                        <img src="${searchProduct[i].image}" alt="">
                    </td>
                    <td>${searchProduct[i].type}</td>
                    <td>
                        <button data-id="${searchProduct[i].id}" class="btn_common btn_edit">Edit</button>
                        <button data-id="${searchProduct[i].id}" class="btn_common btn_delete">Delete</button>
                    </td>
                  </tr>`;
      
    }

  tableBody.innerHTML = result
}



// Nơi lắng nghe các sự kiện.

buttonSave.addEventListener("click", handleAddProduct);
tableBody.addEventListener("click", handleAction);
btnSearchProduct.addEventListener("click", handleSearchProduct)
// Hàm tạo ra option và đưa vào category .
showCategoryInit();