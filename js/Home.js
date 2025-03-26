document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Función para añadir al carrito
    function addToCart(id, name, price, image, quantity) {
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity
            });
        }

        saveCart();
        alert(`Se añadieron ${quantity} ${name} al carrito`);
    }

    // Función para actualizar la UI del carrito
    function updateCartUI() {
        // Actualizar contador
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Actualizar items del carrito
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            
            let total = 0;
            
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div>
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)} c/u</p>
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-cart-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase-cart-btn" data-index="${index}">+</button>
                    </div>
                    <div>
                        $${itemTotal.toFixed(2)}
                        <button class="remove-item-btn" data-index="${index}">🗑️</button>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            cartTotalElement.textContent = total.toFixed(2);

            // Add event listeners for quantity and remove buttons
            document.querySelectorAll('.decrease-cart-btn').forEach(btn => {
                btn.addEventListener('click', decreaseCartItemQuantity);
            });

            document.querySelectorAll('.increase-cart-btn').forEach(btn => {
                btn.addEventListener('click', increaseCartItemQuantity);
            });

            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', removeCartItem);
            });
        }
    }

    // Función para disminuir la cantidad de un item en el carrito
    function decreaseCartItemQuantity(event) {
        const index = event.target.getAttribute('data-index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            saveCart();
        }
    }

    // Función para aumentar la cantidad de un item en el carrito
    function increaseCartItemQuantity(event) {
        const index = event.target.getAttribute('data-index');
        cart[index].quantity++;
        saveCart();
    }

    // Función para eliminar un item del carrito
    function removeCartItem(event) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
    }

    // Event listeners para los botones de cantidad en la página de productos
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });

    // Event listeners para añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            const quantity = parseInt(this.parentElement.querySelector('.quantity-input').value);

            addToCart(id, name, price, image, quantity);
        });
    });

    // Event listeners para el modal del carrito
    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Botón de Proceder al Pago
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('Tu carrito está vacío');
        }
    });

    // Inicializar el carrito
    updateCartUI();
});