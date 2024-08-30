// Funções de Seleção
const selecione = (element) => document.querySelector(element);
const selecioneBAll = (elements) => document.querySelectorAll(elements);

// Variáveis globais
let modalKey = 0;
let quantItens = 1;
let cart = [];
let produtoSelecionado = null;

// Funções Monetárias
function formatoReal(valor) {
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' });
}

function formatoMonetario(valor) {
    if (valor) {
        return valor.toFixed(2);
    }
}

// Capturar keys para qualquer categoria
function capturarKey(e, tipoProduto, jsonData) {
    const key = e.target.closest(`.produto-item-${tipoProduto}`).getAttribute('data-key');
    console.log(`${tipoProduto} clicado: ` + key);

    produtoSelecionado = jsonData[key];
    quantItens = 1;
    modalKey = key;

    return key;
}

// Função para calcular a quantidade
function pegarQuantidade(tipoProduto) {
    selecione(`.${tipoProduto}Info--qtmais`).addEventListener('click', () => {
        quantItens++;
        selecione(`.${tipoProduto}Info--qt`).textContent = quantItens;
    });

    selecione(`.${tipoProduto}Info--qtmenos`).addEventListener('click', () => {
        if (quantItens > 1) {
            quantItens--;
            selecione(`.${tipoProduto}Info--qt`).textContent = quantItens;
        }
    });
}

// Função do botão de fechar
function botaoFechar(tipoProduto) {
    selecioneBAll(`.${tipoProduto}Info--cancelButton, .${tipoProduto}Info--cancelMobileButton`).forEach((item) => {
        item.addEventListener('click', () => fecharModal(tipoProduto));
    });
}

// Função para abrir o modal
function abrirModal(tipoProduto) {
    const modal = selecione(`.${tipoProduto}WindowArea`);
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1;

        if (produtoSelecionado) {
            fillModalData(produtoSelecionado, tipoProduto);
        }
    }, 150);
}

// Função para fechar o modal
function fecharModal(tipoProduto) {
    const modal = selecione(`.${tipoProduto}WindowArea`);
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 150);
}

// Função de clique nos itens
function handleClick(event) {
    event.preventDefault(); // Evita o recarregamento da página

    const tipoProduto = 
        event.target.closest('.produtos-item').classList.contains('salgado-area') ? 'salgado' :
        event.target.closest('.produtos-item').classList.contains('pastel-area') ? 'pastel' :
        event.target.closest('.produtos-item').classList.contains('lanche-area') ? 'lanche' : 'bebida';
    
    capturarKey(event, tipoProduto, window[`${tipoProduto}Json`]);

    const parent = event.target.closest(`.produto-item-${tipoProduto}`);
    selecione(`.${tipoProduto}Big img`).src = parent.querySelector('.produto-item-img').firstChild.src;
    selecione(`.${tipoProduto}Info--nome`).textContent = parent.querySelector('.produto-item-name').textContent;
    selecione(`.${tipoProduto}Info--price`).textContent = parent.querySelector('.produto-item-price').textContent;
    selecione(`.${tipoProduto}Info--desc`).textContent = parent.querySelector('.produto-item-desc').textContent;

    abrirModal(tipoProduto);
}

// Função para adicionar os itens no carrinho
function adicionarAoCarrinho(tipoProduto) {
    selecione(`.${tipoProduto}Info--addButton`).addEventListener('click', () => {
        const price = parseFloat(selecione(`.${tipoProduto}Info--price`).textContent.replace("R$", "").replace(",", "."));
        const identifier = modalKey;
        const nomeProduto = selecione(`.${tipoProduto}Info--nome`).textContent;
        const imgProduto = selecione(`.${tipoProduto}Big img`).src;

        const cartItemIndex = cart.findIndex((item) => item.identifier === identifier);

        if (cartItemIndex > -1) {
            cart[cartItemIndex].qt += quantItens;
        } else {
            const produto = {
                identifier,
                id: modalKey,
                name: nomeProduto,
                img: imgProduto,
                qt: quantItens,
                price: price
            };
            cart.push(produto);

            const cartItem = selecione('.models .cart-produtos').cloneNode(true);
            cartItem.querySelector('.cart-produto-name').innerHTML = nomeProduto;
            cartItem.querySelector('img').src = imgProduto;
            cartItem.querySelector('.cart-produto-qt').innerHTML = quantItens;

            cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cart[cartItemIndex].qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cart[cartItemIndex].qt > 1) {
                    cart[cartItemIndex].qt--;
                } else {
                    cart.splice(cartItemIndex, 1);
                    cartItem.remove();
                }
                atualizarCarrinho();
            });
            selecione('.cart').append(cartItem);
        }
        fecharModal(tipoProduto);
        abrirCarrinho();
        atualizarCarrinho();
    });
}

// Funções para atualizar o carrinho
function atualizarCarrinho() {
    selecione('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        selecione('aside').classList.add('show');
        selecione('.cart').innerHTML = '';

        let subtotal = 0;

        cart.forEach((item, i) => {
            subtotal += item.price * item.qt;

            const cartItem = selecione('.models .cart-produtos').cloneNode(true);
            selecione('.cart').appendChild(cartItem);

            cartItem.querySelector('img').src = item.img;
            cartItem.querySelector('.cart-produto-name').innerHTML = item.name;
            cartItem.querySelector('.cart-produto-qt').innerHTML = item.qt;

            cartItem.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                item.qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (item.qt > 1) {
                    item.qt--;
                } else {
                    cart.splice(i, 1);
                    cartItem.remove();
                }
                atualizarCarrinho();
            });
        });

        const total = subtotal;
        selecione('.cart--totalitem.subtotal span:last-child').innerHTML = formatoMonetario(subtotal);
        selecione('.cart--totalitem.total span:last-child').innerHTML = formatoMonetario(total);
    } else {
        selecione('aside').classList.remove('show');
        selecione('aside').style.left = '100vw';
    }
}

// Funções para completar as compras
function finalizarCompra() {
    selecione('.cart--finalizar').addEventListener('click', () => {
        cart = [];
        selecione('.menu-openner span').innerHTML = 0;
        selecione('aside').classList.remove('show');
        selecione('aside').style.left = '100vw';
        selecione('header').style.display = 'flex';
        atualizarCarrinho();
    });
}

// Função para abrir o carrinho
function abrirCarrinho() {
    if (cart.length > 0) {
        selecione('aside').classList.add('show');
        selecione('header').style.display = 'flex';
    }

    selecione('.menu-openner').addEventListener('click', () => {
        selecione('aside').classList.add('show');
        selecione('aside').style.left = '0';
    });
}

// Função para fechar o carrinho
function fecharCarrinho() {
    selecione('.menu-closer').addEventListener('click', () => {
        selecione('aside').style.left = '100vw';
        selecione('header').style.display = 'flex';
    });
}

// Função para iniciar todos os códigos para diferentes categorias
function iniciar(tipoProduto, jsonData) {
    const produtoItems = selecioneBAll(`.${tipoProduto}-area .produto-item-${tipoProduto}`);
    produtoItems.forEach((produtoItem) => {
        produtoItem.addEventListener('click', (event) => handleClick(event));
    });

    botaoFechar(tipoProduto);
    pegarQuantidade(tipoProduto);
    adicionarAoCarrinho(tipoProduto);
    abrirCarrinho();
    fecharCarrinho();
    finalizarCompra();
}

// Inicializar categorias
iniciar('salgado', salgadoJson);
iniciar('pastel', pastelJson);
iniciar('lanche', lancheJson);
iniciar('bebida', bebidaJson);
