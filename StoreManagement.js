// *******************************  Product class  *******************************
class Product {
    // static id = 100;

    constructor(name, category, price, stockQuantity) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.stockQuantity = stockQuantity;
        // this.id += 1;
        this.id = Math.ceil(Math.random() * 100 + 100);
    }

    updateProduct(price) {
        this.price = price;
    }
}


// ****************************  StoreManagement class  ****************************
class StoreManagement extends Product{

    products = [
        new Product('צמקאו חום', 'שוקולדים', 5, 20),
        new Product('צמקאו לבן', 'שוקולדים', 3, 25),
        new Product('מלית נוגט', 'מליות וממרחים', 15.9, 3),
        new Product('פודינג וניל', 'אבקות', 4, 0),
        new Product('תותים קפואים', 'קפואים', 22, 10),
        new Product('קרוקנט בוטנים', 'פיצוחים', 5, 2),
        new Product('שקיות זילוף 5 יחידות', 'עוד לאפיה', 3.5, 30),
        new Product('גליליות למילוי', 'מוצרי גורמה', 12, 10)
    ];

    addProduct(name, category, price, stockQuantity) {
        this.products.push(new Product(name, category, price, stockQuantity));
        alert('Product added successfully!');
    }

    deleteProduct(id) {
        const currentProductIndex = this.products.findIndex(p => parseInt(p.id) === parseInt(id));
        if (currentProductIndex != -1) {
            this.products.splice(currentProductIndex, 1);
            alert('Product deleted successfully!');
        }
        else
            alert('The requested product was not found!');
    }

    updatePriceOfProduct(id, price) {
        const currentProduct = this.products.find(p => parseInt(p.id) === parseInt(id));
        if (currentProduct) {
            currentProduct.updateProduct(price);
            alert('Product updated successfully!');
        }
        else
            alert('The requested product was not found!');
    }
    
    // חיפוש נרחב ע"י כמה פרמטרים
    search(searchAllOptions) {
        const productsToShow = [];
        searchAllOptions.forEach(o => {
            if (o.value) {
                productsToShow.push(products.filter(p => {
                    if (productsToShow.find(s => `s.${o.className}` === o.value) === -1)
                        `p.${o.className} === o.value`;
                }))
            }
        })
    }

    searchByRange(min, max) {
        return this.products.filter(p => p.price >= parseInt(min) && p.price <= parseInt(max));
    }

    searchByOutOfStock() {
        return this.products.filter(p => parseInt(p.stockQuantity) < 3);
    }

    showAllProducts(productsToShow) {
        const productsUl = document.querySelector('#productsUl');

        productsUl.innerHTML = '';

        productsToShow.forEach( product => {
            productsUl.innerHTML +=
                `<li class="product">
                    <div id="productDescription">
                        <div id="productTitle">
                            <h2 id="productName">${product.name}</h2>
                            <h3 id="productPrice">${product.price} ₪ </h3>
                        </div>
                        <div id="productDetails">
                            <h5 id="productCategory">קטגוריה: ${product.category} </h5>
                            <h5 id="productId">מזהה מוצר: ${product.id} </h5>
                            <h5 id="productStockQuantity">כמות במלאי: ${product.stockQuantity} </h5> 
                        </div>
                    </div>
                    <div id="buttonProduct">
                        <button class="productDeleteButton">מחיקה</button>
                        <button class="productUpdateButton">עדכון</button>
                    </div>
                </li>`
        })
    }
}



// *********************************************************************************

s = new StoreManagement()

// add product
const submitAddingProduct = document.querySelector('.submitAddingProduct');
const nameAdd = document.querySelector('.nameAdd');
const categoryAdd = document.querySelector('.categoryAdd');
const priceAdd = document.querySelector('.priceAdd');
const stockQuantityAdd = document.querySelector('.stockQuantityAdd');

submitAddingProduct.onclick = () => {
    if (nameAdd.value && categoryAdd.value && priceAdd.value && stockQuantityAdd.value) {
        s.addProduct(nameAdd.value, categoryAdd.value, priceAdd.value, stockQuantityAdd.value);
        s.showAllProducts(s.products);
    }
    else {
        alert('you have not entered all the data!');
    }
}

// delete product
const submitDeletingProduct = document.querySelector('.submitDeletingProduct');
const idDelete = document.querySelector('.idDelete');

submitDeletingProduct.onclick = () => {
    if (idDelete.value) {
        s.deleteProduct(idDelete.value);
        s.showAllProducts(s.products);
    }
    else {
        alert('you have not entered all the data!');
    }
}

// update product
const submitUpdatingProduct = document.querySelector('.submitUpdatingProduct');
const idUpdate = document.querySelector('.idUpdate');
const priceUpdate = document.querySelector('.priceUpdate');

submitUpdatingProduct.onclick = () => {
    if (idUpdate.value && priceUpdate.value) {
        s.updatePriceOfProduct(idUpdate.value, priceUpdate.value);
        s.showAllProducts(s.products);
    }
    else {
        alert('you have not entered all the data!');
    }
}

// search - חיפוש נרחב ע"י כמה פרמטרים
const submitSearchProduct = document.querySelector('.submitSearchProduct');
const nameSearch = document.querySelector('.name');
const categorySearch = document.querySelector('.category');
const priceSearch = document.querySelector('.price');
const stockQuantitySearch = document.querySelector('.stockQuantity');
const searchProductDiv = document.querySelector('#searchProductDiv');

submitSearchProduct.onclick = () => {
    // const searchAllOptions = [];
    // searchAllOptions = searchProductDiv.getElementsByTagName('input');
    const searchAllOptions = ['name', 'category', 'price', 'stockQuantity'];
    s.search(searchAllOptions);
}

// search by range
const submitSearchByRange = document.querySelector('.submitSearchByRange');
const min = document.querySelector('.min');
const max = document.querySelector('.max');

submitSearchByRange.onclick = () => {
    if (min.value && max.value)
        s.showAllProducts(s.searchByRange(min.value, max.value));
    else
        alert('you have not entered all the data!');
}

// search by out of stock
const submitSearchByOutOfStock = document.querySelector('.submitSearchByOutOfStock');

submitSearchByOutOfStock.onclick = () => {
    s.showAllProducts(s.searchByOutOfStock());
}

//show all products
s.showAllProducts(s.products);