document.addEventListener("DOMContentLoaded", function() {
    const checkoutItemsList = document.getElementById("checkout-items");
    const checkoutTotalDisplay = document.getElementById("checkout-total");
    const confirmCheckoutButton = document.getElementById("confirm-checkout");
    const cancelCheckoutButton = document.getElementById("cancel-checkout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let menuPrices = {
        Meat: 60,
        Veggies: 45,
        Beverage: 35,
        Dessert: 55,
        Seafood: 80
    };

    function updateCheckout() {
        checkoutItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const price = menuPrices[item] || 0;
            total += price;

            const listItem = document.createElement("li");
            listItem.textContent = `${item} - ₱${price}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", function() {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCheckout(); // Refresh checkout page after removal
            });

            listItem.appendChild(removeButton);
            checkoutItemsList.appendChild(listItem);
        });

        checkoutTotalDisplay.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    updateCheckout();

    confirmCheckoutButton.addEventListener("click", function() {
        alert("Order Confirmed! Thank you for shopping with Foodie Gaddie.");
        localStorage.removeItem("cart"); // Clear cart after checkout
        window.location.href = "../homepage/Homepage.html"; // Redirect to homepage
    });

    cancelCheckoutButton.addEventListener("click", function() {
        window.location.href = "../Nav-menu/shop/Shop.html"; // Go back to shopping
    });
});
