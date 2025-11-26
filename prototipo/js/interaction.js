// CONTROLES DO CARROSSEL
document.querySelectorAll('.carrossel-container').forEach(container => {
  const carrossel = container.querySelector('.carrossel');
  const btnLeft = container.querySelector('.btn-left');
  const btnRight = container.querySelector('.btn-right');

  const scrollAmount = 220;

  btnLeft.addEventListener('click', () => {
    carrossel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    carrossel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});


// ===============================
// CAMPO DE BUSCA
// ===============================

const campoBusca = document.getElementById('campoBusca');
const filmes = document.querySelectorAll('.filme');

const secoesParaEsconder = [
  document.getElementById('destaque'),
  document.getElementById('populares'),
  document.getElementById('tituloPopulares'),
];

const todosH2 = document.querySelectorAll('h2');

const botoes1 = document.querySelectorAll('.btn.btn-right');
const botoes2 = document.querySelectorAll('.btn.btn-left');


// EVENTO DO CAMPO DE BUSCA
campoBusca.addEventListener('input', () => {
  const termo = campoBusca.value.toLowerCase().trim();
  const estaBuscando = termo !== '';

  // FILTRO DOS FILMES
  filmes.forEach(filme => {
    const nome = filme.querySelector('img').alt.toLowerCase();

    if (estaBuscando) {
      filme.style.display = nome.includes(termo) ? 'block' : 'none';
    } else {
      filme.style.display = ''; // volta ao CSS original
    }
  });

  // MOSTRAR / ESCONDER BOTÕES
  [...botoes1, ...botoes2].forEach(btn =>
    btn.style.display = estaBuscando ? 'none' : ''
  );

  // ESCONDER / MOSTRAR SEÇÕES
  secoesParaEsconder.forEach(secao => {
    if (secao) secao.style.display = estaBuscando ? 'none' : '';
  });

  // ESCONDER / MOSTRAR H2
  todosH2.forEach(h2 =>
    h2.style.display = estaBuscando ? 'none' : ''
  );
});



// === Carrinho LocaFlix (sidebar) ===
// Este script deve ser incluído em interaction.js ou abaixo do existente

// Estado do carrinho
let cart = [];

// Preço padrão
const PRECO = 7.9;

// Referência ao carrinho
let cartElement;
let overlayBg;

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  createCartSidebar();
});

// Criar HTML do carrinho
function createCartSidebar() {
  overlayBg = document.createElement("div");
  overlayBg.id = "cart-overlay";
  overlayBg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    display: none;
    z-index: 900;
  `;
  overlayBg.onclick = closeCart;
  document.body.appendChild(overlayBg);

  cartElement = document.createElement("div");
  cartElement.id = "cart-sidebar";
  cartElement.style.cssText = `
    position: fixed;
    top: 0;
    right: -350px;
    width: 350px;
    height: 100vh;
    background: #111;
    color: #fff;
    box-shadow: -3px 0 10px rgba(0,0,0,0.5);
    padding: 20px;
    transition: 0.3s;
    z-index: 1000;
    overflow-y: auto;
    font-family: 'Oswald', sans-serif;
  `;

  cartElement.innerHTML = `
    <h2 style="margin-top:0">Carrinho</h2>
    <button id="close-cart" style="background:red;color:#fff;border:0;padding:6px 10px;cursor:pointer;border-radius:5px;margin-bottom:10px;">Fechar ×</button>
    <div id="cart-items"></div>
    <hr />
    <p id="cart-total" style="font-size:1.2em;margin:10px 0;">Total: R$ 0,00</p>
    <button id="pay-btn" style="width:100%;padding:10px;background:#0b7dda;color:#fff;border:0;border-radius:6px;cursor:pointer;font-size:1.1em;">Pagar</button>
  `;

  document.body.appendChild(cartElement);

  document.getElementById("close-cart").onclick = closeCart;
  document.getElementById("pay-btn").onclick = pagar;
}

// Função para adicionar ao carrinho
function addToCart(filme) {
  cart.push({ titulo: filme, preco: PRECO });
  updateCart();
  openCart();
}

// Atualizar carrinho
function updateCart() {
  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `
      <p style="margin:0 0 5px 0;">${item.titulo.toUpperCase()}</p>
      <p style="margin:0;">R$ ${item.preco.toFixed(2)}</p>
      <button style="background:#444;color:#fff;border:0;padding:5px 8px;margin-top:5px;cursor:pointer;border-radius:5px;" onclick="removeItem(${i})">Remover</button>
      <hr />
    `;
    itemsDiv.appendChild(div);
  });

  const total = cart.reduce((soma, item) => soma + item.preco, 0);
  document.getElementById("cart-total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remover item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Abrir carrinho
function openCart() {
  cartElement.style.right = "0";
  overlayBg.style.display = "block";
  document.body.style.overflow = "auto";
}

// Fechar carrinho
function closeCart() {
  cartElement.style.right = "-350px";
  overlayBg.style.display = "none";
}

// Simular pagamento
function pagar() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Pagamento realizado com sucesso!");
  cart = [];
  updateCart();
  closeCart();
}

