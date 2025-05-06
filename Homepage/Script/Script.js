/* Homepage */
document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        searchIcon.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
            searchContainer.classList.remove('active');
            searchIcon.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Highlight the current page
    const currentPage = window.location.pathname.split("/").pop();
    const pageLinks = {
        "index.html": "home-link",
        "Shop.html": "shop-link",
        "about.html": "about-link",
        "contact.html": "contact-link"
    };

    if (pageLinks[currentPage]) {
        document.getElementById(pageLinks[currentPage]).classList.add("active");
    }
});

function logout() {
    window.location.href = "../login/Login.html";
}

/* LOGIN */
 function validateLogin(event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            if (username === "1" && password === "1") {
                window.location.href = "../homepage/homepage.html"; // Adjust the path to point to the correct location
            } else {
                alert("Invalid username or password");
            }
        }
/* Calculation for Shop page */
        document.addEventListener('DOMContentLoaded', function() {
                
                const toggleMenuButton = document.getElementById('toggle-menu');
                const menuContainer = document.getElementById('menu-container');
                const orderItemsList = document.getElementById('order-items');
                const totalDisplay = document.getElementById('total');
                const menuInputs = menuContainer.querySelectorAll('input[type="number"]');
                const menuPrices = {
                    Meat: 60,
                    Veggies: 45,
                    Beverage: 35,
                    Dessert: 55,
                    Seafood: 80
                };

                const checkoutContainer = document.getElementById('checkout-container');
                const checkoutButton = document.getElementById('checkout-button');
                const confirmCheckoutButton = document.getElementById('confirm-checkout');
                const cancelCheckoutButton = document.getElementById('cancel-checkout');
                const checkoutItemsList = document.getElementById('checkout-items');
                const checkoutTotalDisplay = document.getElementById('checkout-total');

                toggleMenuButton.addEventListener('click', function() {
    const currentDisplay = window.getComputedStyle(menuContainer).display;
    menuContainer.style.display = currentDisplay === 'none' ? 'block' : 'none';
});


                function updateOrder() {
                    orderItemsList.innerHTML = ''; // Clear previous order items
                    let total = 0;

                    menuInputs.forEach(input => {
                        const itemName = input.id;
                        const quantity = parseInt(input.value);

                        if (quantity > 0) {
                            const price = menuPrices[itemName];
                            const itemTotal = quantity * price;
                            total += itemTotal;

                            const listItem = document.createElement('li');
                            listItem.textContent = `${itemName.charAt(0).toUpperCase() + itemName.slice(1)} x ${quantity} @ ₱${price} = ₱${itemTotal.toFixed(2)}`;
                            orderItemsList.appendChild(listItem);
                        }
                    });

                    totalDisplay.textContent = `Total: ₱${total.toFixed(2)}`;
                }

                menuInputs.forEach(input => {
                    input.addEventListener('change', updateOrder);
                });

                function updateCheckoutSummary() {
                    checkoutItemsList.innerHTML = orderItemsList.innerHTML; // Copy order items
                    checkoutTotalDisplay.textContent = totalDisplay.textContent; // Copy total price
                }

                checkoutButton.addEventListener('click', function() {
                    updateCheckoutSummary();
                    checkoutContainer.style.display = checkoutContainer.style.display === 'none' ? 'block' : 'none';
                });

                confirmCheckoutButton.addEventListener('click', function() {
                    alert('Order Confirmed! Thank you for shopping with Foodie Gaddie.');
                    checkoutContainer.style.display = 'none';
                    resetOrder();
                });

                cancelCheckoutButton.addEventListener('click', function() {
                    checkoutContainer.style.display = 'none';
                });

                function resetOrder() {
                    menuInputs.forEach(input => {
                        input.value = 0;
                    });
                    updateOrder();
                }

                // Initial update on page load
                updateOrder();
            });


        