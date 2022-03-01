
const StorageControl = (function() {

    return {
        GetProducts: function()
        {
            let products;

            if (localStorage.getItem("products") === null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem("products"));
            }

            return products;
        },
        CreateProduct: function(name,price,brand)
        {
            let products;

            if (localStorage.getItem("products") === null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem("products"));
            }

            products.push({id: this.LastId()+1,name: name, price: parseFloat(price), brand: brand});

            localStorage.setItem("products",JSON.stringify(products));
            UIControl.WriteTotalPrice();
        },        
        DeleteProducts: function(id)
        {
            let products = this.GetProducts();
            products.forEach(item => {
                if (item.id == id) {
                    let itemIndex = products.indexOf(item);
                    products.splice(itemIndex,1); // "itemIndex" indexinden başla ve bir ürün sil.
                }
            });

            localStorage.setItem("products", JSON.stringify(products));
            UIControl.WriteTotalPrice();
        },
        UpdateProduct: function(id,name,price,brand)
        {
            let products = this.GetProducts();
            let addItem = {id: parseFloat(id), name: name, price: parseFloat(price), brand: brand};

            products.forEach(item => {
                if (item.id == id) {
                    let itemIndex = products.indexOf(item);
                    products.splice(itemIndex,1,addItem); // verilen indexten başla bir ürün sil ve "addItem" elemanını akle;
                }
            });
            localStorage.setItem("products", JSON.stringify(products));
            UIControl.WriteTotalPrice();
        },
        LastId: function()
        {
            let lastItem;
            let products = JSON.parse(localStorage.getItem("products"));

            if (products === null || products.length <= 0) {
                lastItem = 0;
            } else {
                lastItem = products[products.length-1].id;
            }

            return lastItem;
        }
    }    
})();


const UIControl = (function() {

    const Selectors = {
        // Application Variables
        name: document.querySelector(".name"),
        price: document.querySelector(".price"),
        brand: document.querySelector(".brand"),
        form:document.querySelector(".form"),
        messageBox: document.querySelector(".alertMessages"),
        table: document.querySelector(".dataTable"),
        tableBody: document.querySelector(".tableBody"),
        priceTL: document.querySelector(".priceTL"),
        priceUSD: document.querySelector(".priceUSD"),
        productForm: document.querySelector("#productForm"),
        // Buttons
        createButton: document.querySelector(".submitButton"),
        saveButton: document.querySelector(".saveButton"),
        deleteButton: document.querySelector(".deleteButton"),
        cancelButton: document.querySelector(".cancelButton"),
        editButton: document.querySelector(".editButton")
    }

    return {
        HomePage: function() {
            let data = SeedApplication.getData();
            data.forEach(item => {
                let html = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.brand}</td>
                        <td><button type="button" class="btn btn-primary btn-sm editButton"><i class="far fa-edit"></i> Edit</button></td>
                    </tr>
                `;
                Selectors.tableBody.innerHTML += html;
            });
        },
        FormSubmit: function(e) {
            if (Selectors.name.value == "" || Selectors.price.value == "" || Selectors.brand.value == "")
            {
                UIControl.SendMessage("Bu alan boş bırakılamaz !","danger");
            } else {
                UIControl.SendMessage("Ürün başarıyla eklendi","success");
                UIControl.AddProduct(Selectors.name.value,Selectors.price.value,Selectors.brand.value);
                UIControl.ClearInput();
            }

            e.preventDefault();
        },
        AddProduct: function(name,price,brand) {
            let html = `
                <tr>
                    <td>${StorageControl.LastId() + 1}</td>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${brand}</td>
                    <td><button type="button" class="btn btn-primary btn-sm editButton"><i class="far fa-edit"></i> Edit</button></td>
                </tr>
            `;

            Selectors.tableBody.innerHTML += html;
            StorageControl.CreateProduct(name,price,brand);
        },
        ClearInput: function() {
            Selectors.name.value = "";
            Selectors.price.value = "";
            Selectors.brand.value = "";
        },
        SendMessage: function(message,type) {
            let html = `
                <div class="alert alert-${type} alert-dismissible fade show">
                    <i class="bi bi-exclamation-circle-fill text-${type}" style="font-size: 20px;"></i>
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;

            Selectors.messageBox.innerHTML = html;
            setTimeout( () => { Selectors.messageBox.innerHTML = "";}, 5000);
        },
        DeleteButtons: function() {
            Selectors.saveButton.style.display = "none";
            Selectors.deleteButton.style.display = "none";
            Selectors.cancelButton.style.display = "none";
        },
        WriteTotalPrice: function() {
            let usd = 0;
            
            SeedApplication.getData().forEach(item => {
                usd += item.price;
            });

            Selectors.priceUSD.textContent = usd; // Dolar
            Selectors.priceTL.textContent = usd * 13; // Tl
        },
        getSelectors: () => { return Selectors; }
    }
})();


const ButtonControl = (function() {

    const selectors = UIControl.getSelectors();
    let selectedProduct = null;
    let selectedProductId = null;

    return {
        EditButtonClicked: function(e) {
            if (e.target.classList.contains("editButton")) {
                selectors.createButton.style.display = "none";

                let tableBody = selectors.tableBody;

                for (let i = 0; i < tableBody.children.length; i++) {
                    tableBody.children[i].classList.remove("bg-warning");
                }    
                e.target.parentNode.parentNode.classList.add("bg-warning");
        
                selectors.saveButton.style.display = "inline";
                selectors.deleteButton.style.display = "inline";
                selectors.cancelButton.style.display = "inline";
        
                let nameValue = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                let priceValue = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
                let brandValue = e.target.parentElement.previousElementSibling.textContent;
                selectors.name.value = nameValue;
                selectors.price.value = priceValue;
                selectors.brand.value = brandValue;

                selectedProduct = e;
                selectedProductId = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            }
        },
        SaveButton: function(e) {
            selectedProduct.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent = selectors.name.value;
            selectedProduct.target.parentElement.previousElementSibling.previousElementSibling.textContent = selectors.price.value;
            selectedProduct.target.parentElement.previousElementSibling.textContent = selectors.brand.value;
            
            selectors.createButton.style.display = "block";
            
            selectedProduct.target.parentElement.parentElement.classList.remove("bg-warning");
            StorageControl.UpdateProduct(selectedProductId,selectors.name.value,selectors.price.value,selectors.brand.value);

            UIControl.DeleteButtons();
            UIControl.ClearInput();
            UIControl.SendMessage(`${selectedProductId} id'li ürün başarıyla güncellendi !`,"success");
        },
        DeleteButton: function(e) {
            UIControl.ClearInput();
            UIControl.DeleteButtons();
            selectors.createButton.style.display = "block";

            selectedProduct.target.parentElement.parentElement.style.transition = "0.4s";
            selectedProduct.target.parentElement.parentElement.style.transform = "scale(0)";

            let itemId = selectedProduct.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            setTimeout(() => {selectedProduct.target.parentElement.parentElement.remove();}, 300)
            StorageControl.DeleteProducts(itemId);
            UIControl.SendMessage(`${selectedProductId} id'li ürün başarıyla silindi !`,"warning");
        },
        CancelButton: function(e) {
            UIControl.ClearInput();
            UIControl.DeleteButtons();
            selectors.createButton.style.display = "block";

            selectedProduct.target.parentNode.parentNode.classList.remove("bg-warning");        
        }
    }
})();


// Uygulama başlatıldığı anda çalışacak ilk fonksiyon.
const SeedApplication = (function () {

    const selectors = UIControl.getSelectors();

    const InitialCreate = () => {
        // Functions
        UIControl.HomePage();
        UIControl.DeleteButtons();
        UIControl.WriteTotalPrice();        

        // Events
        selectors.tableBody.addEventListener("click", ButtonControl.EditButtonClicked);
        selectors.cancelButton.addEventListener("click", ButtonControl.CancelButton);
        selectors.deleteButton.addEventListener("click", ButtonControl.DeleteButton);
        selectors.saveButton.addEventListener("click", ButtonControl.SaveButton);
        
        selectors.productForm.addEventListener("submit", UIControl.FormSubmit);
    }

    return {
        initialCreate: () => InitialCreate(),
        getData: () => { return StorageControl.GetProducts(); } // Database
    }

})();

SeedApplication.initialCreate();