function allFilter(){
    var ln = document.getElementById('ln');
    var ex = document.getElementById("ex");
    var br = document.getElementById('br')
    
    ln.style.display = 'block'
    ex.style.display = 'block'
    br.style.display = 'block'
}

function filter(visbleItem, invisible1, invisible2){
    var vsbl = document.getElementById(visbleItem);
    var invs1 = document.getElementById(invisible1);
    var invs2 = document.getElementById(invisible2)
    
    vsbl.style.display = 'block'
    invs1.style.display = 'none'
    invs2.style.display = 'none'
}

if(localStorage.getItem('textValues') == null){
    var productArray = [];
}else{
    productArray = JSON.parse(localStorage.getItem('textValues'));
}

function cartAdd(product){
    if ( productArray.includes(product) == false){
        productArray.push(product);
        localStorage.setItem('textValues', JSON.stringify(productArray));
    }
}

function productLoader(){
    let text = document.getElementById('emptyText');
    console.log
    if(localStorage.getItem('textValues') !== null){
        for (x = 0; x<productArray.length; x++){
            let product = document.querySelectorAll(productArray[x]);
            for (i = 0; i<product.length; i++){
                product[i].style.display = 'grid';
            }
        }
        if (productArray.length > 0){
            text.style.display = 'none';
        }
    }
    updateTotal()
}

function clearProduct(data){
    let data2 = document.querySelectorAll(data);
    let text = document.getElementById('emptyText');
    for (i = 0; i<productArray.length; i++){
        if (data == productArray[i]){
            productArray.splice(i, 1);
            localStorage.setItem('textValues', JSON.stringify(productArray));
            console.log(productArray);
        }
    }
    for (i = 0; i<data2.length; i++){
        data2[i].style.display = 'none';
    }
    if (productArray.length == 0){
        text.style.display = 'block';
    }
    updateTotal()
}

function updateTotal(){
    var totalPrice = 0.0;
    for (i = 0; i<productArray.length; i++){
        var arrayItem = document.querySelectorAll(productArray[i])[0];
        var priceData = arrayItem.getElementsByClassName("price");
        var testItem = priceData[0];
        var itemPrice = testItem.dataset.price;
        var quantityHTML = arrayItem.getElementsByClassName("quantity");
        var quantityDOM = quantityHTML[0];
        var quantity = quantityDOM.value;
        totalPrice = totalPrice + (itemPrice * quantity);
    }
    document.getElementsByClassName("total")[0].innerText = '€' + totalPrice.toFixed(2);
}

function clearCart(){
    let text = document.getElementById('emptyText');
    for (x = 0; x<productArray.length; x++){
        let test = document.querySelectorAll(productArray[x]);
        for (i = 0; i<test.length; i++){
            test[i].style.display = 'none';
        }
    }
    localStorage.clear();
    text.style.display = 'block';
    document.getElementsByClassName("total")[0].innerText = '€0.00'
}

function checkOutAlert(){
    if ( productArray.length > 0 ) {
        alert("Thank you for your purchase!");
        clearCart()
    }else{
        alert('Your cart is empty!')
    }
}