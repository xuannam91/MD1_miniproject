// Khai báo biến
let categorySelector = document.querySelector(".category_name");
let btnCategory = document.querySelector(".btn_category_save");
let tbodyCategory = document.querySelector(".category_table");

// Khởi tạo hàm và thực thi hàm

// hàm thêm sản phẩm
function handleAddCategory(event) {
  event.preventDefault();

  let valueCategory = categorySelector.value.trim();
 let isCategory = keyupInputCategory();
 let categorys;
    if(isCategory){
        if(localStorage.getItem("categorys") === null){
            categorys = [];
        }
        else{
            categorys = JSON.parse(localStorage.getItem('categorys'));
        }

        // Update

        if(btnCategory.classList.contains("update_category")){
            let idUpdateCategory = btnCategory.getAttribute("data-idcategory");
            let resultCategory = categorys.map(
                function(item){
                   if(item.id === idUpdateCategory){
                        return {
                            id: item.id,
                            name : valueCategory
                        }
                   }else{
                        return item
                    }
                }
            )
            localStorage.setItem("categorys", JSON.stringify(resultCategory));
            ShowCategory();

            btnCategory.innerText = "Add";
            btnCategory.classList.remove("update_category");
            btnCategory.removeAttribute("data-idcategory")

            document.querySelector('.form_category').reset();

            return;
        }

        // thêm mới category mới

        let newCategory = {
            id: crypto.randomUUID(),
            name: valueCategory
        };

        categorys.push(newCategory);
        localStorage.setItem("categorys", JSON.stringify(categorys));
        ShowCategory();

        document.querySelector('.form_category').reset();
    }
    
};

// Render danh mục.

function ShowCategory(){
    let categorys = JSON.parse(localStorage.getItem('categorys'));
    if(categorys){
        let resultCategory = '';
        for (let i = 0; i < categorys.length; i++) {
            resultCategory = resultCategory +
            `<tr>
                <td>${categorys[i].name}</td>
                <td>
                    <button data-id="${categorys[i].id}" class="btn_common btn_editcagory"><i class="fas fa-edit"></i></button>
                    <button data-id="${categorys[i].id}" class="btn_common btn_deletecategory"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`
        }
        tbodyCategory.innerHTML = resultCategory;
    }
}
ShowCategory();


// Xoá và edit tên danh mục.
    //  xoá
function handleProcess(event){
    let categorys = JSON.parse(localStorage.getItem('categorys'));
    let clicked = event.target;
    if(clicked.classList.contains("fa-trash-alt")){
        let confirmDelete = confirm('Bạn chắc chắn muốn xóa không ?');
        if(confirmDelete){
            let idDeleteCategory = clicked.closest(".btn_deletecategory").getAttribute("data-id");
           let deleteCategory = categorys.filter(
            function(item){
               return item.id !== idDeleteCategory;
            }
           );

           localStorage.setItem("categorys", JSON.stringify(deleteCategory));
        }
        ShowCategory();
        
        btnCategory.innerText = "Add";
        btnCategory.classList.remove("update_category");
        btnCategory.removeAttribute("data-idcategory")

        document.querySelector('.form_category').reset();
    }
    // edit
    else if(clicked.classList.contains("fa-edit")){
        let idEditCategory = clicked.closest(".btn_editcagory").getAttribute("data-id");
        let editProductCategory = categorys.find(
            function(item) {
              return item.id === idEditCategory;
            }
          )
        categorySelector.value = editProductCategory.name;



        btnCategory.innerText = "Update";
        btnCategory.classList.add("update_category");
        btnCategory.setAttribute("data-idcategory", idEditCategory)

    }
}


// Hàm validate input
function keyupInputCategory() {
  let valueCategory = categorySelector.value.trim();
  let divCategoryError = categorySelector.nextElementSibling;
  let ischeck = true;
  if (valueCategory === "") {
    categorySelector.classList.add("error");
    categorySelector.classList.remove("access");
    divCategoryError.innerHTML = "Danh mục không được bỏ trống";
    ischeck = false;
  } else {
    categorySelector.classList.remove("error");
    categorySelector.classList.add("access");
    divCategoryError.innerHTML = "";
  }
  return ischeck;
}

// khởi tạo sự kiện.
categorySelector.addEventListener("keyup", keyupInputCategory);
btnCategory.addEventListener("click", handleAddCategory);
tbodyCategory.addEventListener("click", handleProcess)