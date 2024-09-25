const products = [
    {
        name: "Brinco foleados",
        price: 29.99,
        image: "imagens/brinco4.jpg",
        description: "varios modelos foleados."
    },
    {
        name: "Puceira bolinha",
        price: 39.99,
        image: "imagens/bolinha.jpg",
        description: "varios modelos foleados."
    },
    {
        name: "Puceira Infinito",
        price: 39.99,
        image: "imagens/Infinito.jpg",
        description: "varios modelos foleados."
    },
    {
        name: "Brincos infantil",
        price: 24.99,
        image: "imagens/brincosinfantil.jpg",
        description: "varios modelos foleados."
    },
    {
        name: "Brinco foleados",
        price: 29.99,
        image: "imagens/brincos2.jpg",
        description: "varios modelos foleados."
    },
    {
        name: "Anel de Ouro",
        price: 25.00,
        image: "imagens/anel_ouro.jpg",
        description: "Anel elegante em ouro 18k."
    },
    {
        name: "Conjunto cordao+brinco foleados",
        price: 69.99,
        image: "imagens/colar.jpg",
        description: "Colar sofisticado FOLEADO EM OURO+BRINCO FOLEADO."
    },
    {
        name: "Brinco foleado Ouro",
        price: 39.99,
        image: "imagens/brinco_ouro.jpg",
        description: "Brinco delicado em ouro 18k."
    },
    {
        name: "Brinco Coraçao",
        price: 29.99,
        image: "imagens/brincocoracao.jpg",
        description: "Brinco foleado a ouro lindo."
    },
    {
        name: "Anel diversos modelos",
        price: 24.99,
        image: "imagens/anel.jpg",
        description: "Anel de formatura em ouro branco."
    },
    {
        name: "Cordao concha do mar",
        price: 59.99,
        image: "imagens/cordao3.jpg",
        description: "Colar romântico em forma de concha foleado ouro."
    },
    {
        name: "Brinco de argola",
        price: 39.99,
        image: "imagens/brinco_ouro.jpg",
        description: "Brincos de argola clássicos em foleado ouro."
    },
    {
        name: "Tornozeleira cor Prata",
        price: 39.99,
        image: "imagens/Tornozeleiraprata.jpg",
        description: "Tornozeleira cor prata material otima qualidade."
    },
    {
        name: "Puceira cor prata",
        price: 39.99,
        image: "imagens/puseira.jpg",
        description: "puceira cor prata alta qualidade."
    },
    {
        name: "Brincos diversos modelos",
        price: 29.99,
        image: "imagens/brincos.jpg",
        description: "Brincos diversos modelos."
    }
];

let cart = [];
let cartCount = 0;

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(itemDiv);
        total += item.price;
    });

    document.getElementById('total-price').innerText = total.toFixed(2);
}

function toggleCart() {
    const cartPopup = document.getElementById('cart');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function checkout() {
    toggleCart();
    document.getElementById('checkout-form').style.display = 'block';
}

function completePurchase() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    
    if (!name || !address) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let orderDetails = `*Pedido de Joias*\n`;
    cart.forEach(item => {
        orderDetails += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    orderDetails += `Total: R$ ${document.getElementById('total-price').innerText}\n`;
    orderDetails += `Nome: ${name}\n`;
    orderDetails += `Endereço: ${address}\n`;
    orderDetails += `Pagamento: PIX\n`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=27995812932&text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappLink, '_blank');

    // Resetar o carrinho
    cart = [];
    cartCount = 0;
    document.getElementById('cart-count').innerText = cartCount;
    document.getElementById('total-price').innerText = '0.00';
    document.getElementById('cart-items').innerHTML = '';
    closeCheckout();
}

function closeCheckout() {
    document.getElementById('checkout-form').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', displayProducts);
