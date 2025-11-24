// Variables globales
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');

// Funciones del carrito
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${productName} añadido al carrito`);
}

function updateCart() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = cartTotal.toFixed(2);
    
    // Actualizar items del carrito en el modal
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x $${item.price}</span>
        `;
        cartItems.appendChild(cartItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    alert(`¡Gracias por tu compra! Total: $${cartTotal.toFixed(2)}\nPronto nos pondremos en contacto para finalizar tu pedido.`);
    cart = [];
    updateCart();
    closeCartModal();
}

// Funciones del modal
function openCartModal() {
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

// Event Listeners
cartBtn.addEventListener('click', openCartModal);
closeModal.addEventListener('click', closeCartModal);

// Cerrar modal al hacer click fuera
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

// Smooth scroll
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
}

// Notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 3000;
        transition: transform 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Prevenir envío del formulario
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    this.reset();
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    
    // Smooth scroll para links del menú
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});