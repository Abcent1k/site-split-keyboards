const products = [
    { id: 1, name: "Lily58 - Acrylic case", price: 167.96, image: "../images/lily58.jpg" },
    { id: 2, name: "Iris - Closed plastic case", price: 169.99, image: "../images/iris.webp" },
    { id: 3, name: "Iris - Split Keyboard Kit", price: 69.99, image: "../images/irisKit.webp" },
    { id: 4, name: "Waterfowl - Acrylic case", price: 119.99, image: "../images/waterfowl.webp" },
    { id: 5, name: "Sofle - Acrylic case", price: 144.97, image: "../images/sofle.webp" },
    { id: 6, name: "FoldKB - Plastic case", price: 179.99, image: "../images/foldKB.webp" },
];

const productModal = document.getElementById('product-modal');
const minusButton = document.getElementById('minusButton');
const plusButton = document.getElementById('plusButton');
const quantityInput = document.getElementById('quantity');
const addToCartButton = document.getElementById('add-to-cart-button');
let Product = products[0];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-to-cart-button').addEventListener('click', addToCart);

    displayProducts();

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.attributeName === 'class') {
                const isActive = productModal.classList.contains('active');
                if (!isActive) {
                    quantityInput.value = 1;
                }
            }
        }
    });

    observer.observe(productModal, { attributes: true });

});

function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productTile = document.createElement('div');
        productTile.classList.add('product-tile');
        productTile.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;
        productTile.addEventListener('click', () => {
            showProductModal(product);
        });
        productGrid.appendChild(productTile);
    });
}


function showProductModal(product) {
    Product = product;
    addToCartButton.innerHTML = `Add to Cart - <strong>$${(product.price * parseInt(quantityInput.value)).toFixed(2)}</strong>`;
    overlay.classList.add('active');
    document.getElementById('sidebar').classList.remove('active');
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
    `;
    productModal.classList.add('active');
    document.getElementById('add-to-cart-button').dataset.productId = product.id;
}

function addToCart() {
    const productId = this.dataset.productId;
    const quantity = parseInt(document.getElementById('quantity').value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id == productId);

    for (let i = 0; i < quantity; i++) {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    Modals.forEach(element => {
        element.classList.remove('active');
    })
}

const updateButtonLabel = () => {
    const quantity = parseInt(quantityInput.value);
    const totalPrice = (quantity * Product.price).toFixed(2);
    addToCartButton.innerHTML = `Add to Cart - <strong>$${totalPrice}</strong>`;
};


const updateValue = (newValue) => {
    const min = parseInt(quantityInput.min);
    const max = parseInt(quantityInput.max);
    quantityInput.value = Math.max(min, Math.min(max, newValue));
    updateButtonLabel();
};

minusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > parseInt(quantityInput.min)) {
        updateValue(currentValue - 1);
    }
});

plusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue < parseInt(quantityInput.max)) {
        updateValue(currentValue + 1);
    }
});

quantityInput.addEventListener('input', () => {
    let currentValue = parseInt(quantityInput.value);
    if (isNaN(currentValue) || currentValue < parseInt(quantityInput.min)) {
        currentValue = quantityInput.min;
    } else if (currentValue > parseInt(quantityInput.max)) {
        currentValue = quantityInput.max;
    }
    updateValue(currentValue);
});

quantityInput.addEventListener('change', () => {
    let currentValue = parseInt(quantityInput.value);
    if (isNaN(currentValue) || currentValue < parseInt(quantityInput.min)) {
        currentValue = quantityInput.min;
    } else if (currentValue > parseInt(quantityInput.max)) {
        currentValue = quantityInput.max;
    }
    updateValue(currentValue);
});

updateButtonLabel();