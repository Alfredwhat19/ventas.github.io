document.addEventListener('DOMContentLoaded', function() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total-amount');
    const shippingForm = document.getElementById('shipping-form');
    const orderConfirmationModal = document.getElementById('order-confirmation-modal');
    const closeConfirmationModal = document.getElementById('close-confirmation-modal');
    const orderNumberElement = document.getElementById('order-number');

    // Load cart items from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render checkout items
    function renderCheckoutItems() {
        checkoutItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const checkoutItemElement = document.createElement('div');
            checkoutItemElement.className = 'checkout-item';
            checkoutItemElement.innerHTML = `
                <div class="checkout-item-info">
                    <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                </div>
                <div>
                    $${itemTotal.toFixed(2)}
                </div>
            `;

            checkoutItemsContainer.appendChild(checkoutItemElement);
        });

        checkoutTotalElement.textContent = total.toFixed(2);
    }

    // Render initial checkout items
    renderCheckoutItems();

    // Form submission handler
    shippingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Basic form validation
        const requiredFields = shippingForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        // Generate random order number
        const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        orderNumberElement.textContent = orderNumber;

        // Show order confirmation modal
        orderConfirmationModal.style.display = 'flex';

        // Clear cart after successful order
        localStorage.removeItem('cart');
        cart = [];
    });

    // Close order confirmation modal
    closeConfirmationModal.addEventListener('click', function() {
        orderConfirmationModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === orderConfirmationModal) {
            orderConfirmationModal.style.display = 'none';
        }
    });
});