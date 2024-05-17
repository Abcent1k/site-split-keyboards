document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cart-button').forEach(element => {
        element.addEventListener('click', () => {
            overlay.classList.add('active');
            document.getElementById('cart-modal').classList.add('active');
            document.getElementById('sidebar').classList.remove('active');
            displayCartItems();
        });
    });
});

document.getElementById('clear-cart-button').addEventListener('click', clearCart);

document.getElementById('cancel-cart-icon').addEventListener('click', () => {
    Modals.forEach(element => {
        element.classList.remove('active');
    })
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalPrice = 0;
    let productCount = {};

    cart.forEach(item => {
        if (!productCount[item.id]) {
            productCount[item.id] = { ...item, quantity: 0 };
        }
        productCount[item.id].quantity++;
    });

    for (let id in productCount) {
        const item = productCount[id];
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
        <span><span class = "left-span">${item.name}&nbsp;&nbsp;&nbsp;</span>
        <span class = "right-span"> $${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</span></span>
            <button class="remove-item-button" data-product-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    }

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    document.querySelectorAll('.remove-item-button').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function removeFromCart(event) {
    const productId = event.target.dataset.productId;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id != productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems()
}

document.getElementById('checkout-button').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('The cart is empty!');
    } else {
        alert('Check out...');
        clearCart();
        Modals.forEach(element => {
            element.classList.remove('active');
        });
    }
});

