// Classe représentant un produit
class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}

// Classe représentant un élément du panier d'achat
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // Méthode pour calculer le prix total de cet élément
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// Classe représentant le panier d'achat
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Ajouter un produit au panier
    addItem(product, quantity = 1) {
        const cartItem = this.items.find(item => item.product.id === product.id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.displayCart();
    }

    // Supprimer un produit du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Obtenir le total des éléments
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Afficher les éléments du panier
    displayCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';

        this.items.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${item.product.name} (x${item.quantity})</span>
                <span>${item.getTotalPrice()}€</span>
                <button onclick="cart.removeItem(${item.product.id})">Supprimer</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
        });

        // Mettre à jour le total
        document.getElementById('cart-total').textContent = `Total: ${this.getTotalPrice()}€`;
    }
}

// Produits de démo
const products = [
    new Product(1, 'Chaussures de sport', 59.99, 'images/shoes.jpg'),
    new Product(2, 'T-shirt de sport', 19.99, 'images/tshirt.jpg'),
    new Product(3, 'Sac de sport', 29.99, 'images/bag.jpg')
];

// Panier d'achat
const cart = new ShoppingCart();

// Afficher les produits disponibles
const productList = document.getElementById('product-list');
products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}">
        <span>${product.name}</span>
        <span>${product.price}€</span>
        <button onclick="cart.addItem(products.find(p => p.id === ${product.id}))">Ajouter au panier</button>
    `;
    productList.appendChild(productDiv);
});
