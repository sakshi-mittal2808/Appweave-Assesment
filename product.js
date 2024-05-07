

// adding items
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');
    const shoppingCart = document.getElementById('cart-btn');
    let cartItemCount = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityDisplay = button.parentElement.querySelector('h3');
            let quantity = parseInt(quantityDisplay.textContent.split(': ')[1]);
            if (quantity > 0) {
                cartItemCount++;
                updateCartCount(cartItemCount);
                quantity--;
                quantityDisplay.textContent = `Quantity: ${quantity}`;
                if (quantity === 0) {
                    button.disabled = true;
                    button.textContent = 'Out of Stock';
                }
            } else {
                button.disabled = true;
                button.textContent = 'Out of Stock';
            }
        });
    });

    function updateCartCount(count) {
        shoppingCart.innerHTML = `(${count})`;
    }

    function updateProductQuantity(productName, quantity) {
        const productItems = document.querySelectorAll('.productName');
        productItems.forEach(item => {
            if (item.textContent === productName) {
                const quantityElement = item.nextElementSibling.nextElementSibling; // Selecting the <h3> element
                quantityElement.textContent = `Quantity: ${quantity}`;
                if (quantity === 0) {
                    item.nextElementSibling.textContent = "Out of Stock";
                }
            }
        });
    }
});

// Filter

//Event Listner to "apply" button
document.getElementById('applyBtn').addEventListener("click", applyFilters); //calling function

function applyFilters() 
{
    //taking all checked items and all products
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const products = document.querySelectorAll(".productItem");
        
    //set display of all product should be none
    products.forEach(product=>
        {product.style.display="none";}
    )

    //loop through each products and apply filter
    products.forEach(product => {
        let showProduct = true; //by default, all products are shown
        checkboxes.forEach(checkbox => {
            const filterType = checkbox.parentElement.parentElement.previousElementSibling.textContent.trim();
            // const filterValue = checkbox.checked;

            switch (filterType) 
            {
                //colour case
                case "Colour":
                    if (checkbox.checked && !product.querySelector(".productName").textContent.toLowerCase().includes(checkbox.nextSibling.textContent.toLowerCase().trim()))
                    showProduct = false;
                break;

                //Price case
                case "Price":
                    const productPrice = parseInt(product.querySelector("p").textContent.replace("Rs", "").trim());
                    checkboxes.forEach(checkbox => {
                    if (checkbox.checked) 
                    {
                        switch (checkbox.parentElement.textContent.trim()) 
                        {
                            case "0-250 rs":
                                if (!(productPrice >= 0 && productPrice <= 250))
                                showProduct = false;
                            break;
                            case "251 rs- 450 rs":
                                if (!(productPrice >= 251 && productPrice <= 450))
                                showProduct = false;
                            break;
                            case ">450 rs":
                                if (!(productPrice > 450))
                                showProduct = false;
                            break;
                        }
                    }
                    });
                break;

                //Type case
                case "Type":
                    if (checkbox.checked && !product.querySelector(".productName").textContent.toLowerCase().includes(checkbox.nextSibling.textContent.toLowerCase().trim()))
                    showProduct = false;
                break;
            }
        });

        if (showProduct) 
            product.style.display = "inline-block";
    });
}


//clear
document.getElementById('clearBtn').addEventListener("click", clearFilter);

function clearFilter( )
{
    //uncheck all checkbox
    const checkboxes=document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox=>
        {checkbox.checked=false;}
    );

    //show all products
    const products = document.querySelectorAll(".productItem");
    products.forEach(product => {
        product.style.display = "inline-block";
    });
}