const selecioneB = (element) => document.querySelector(element);
const selecioneBAll = (elements) => document.querySelectorAll(elements);

// Variáveis globais
let modalKeyBebida = 0;
let quantBebida = 1;
let cartBebida = [];
let produtoSelecionadoBebida = null;

// Funções monetárias
function formatoRealBebida(valor) {
    return valor.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
}

function formatoMonetarioBebida(valor) {
    if (valor) {
        return valor.toFixed(2);
    }
}

// Capturar keys
function capturarKeyBebida(e) {
    const key = e.target.closest('.produto-item-bebidas').getAttribute('data-key');
    console.log('Bebida clicada: ' + key);

    produtoSelecionadoBebida = bebidaJson[key];
    quantBebida = 1;
    modalKeyBebida = key;

    return key;
}

// Função para calcular a quantidade
function pegarQuantidadeBebida() {
    selecioneB('.bebidaInfo--qtmais').addEventListener('click', () => {
        quantBebida++;
        selecioneB('.bebidaInfo--qt').textContent = quantBebida;
    });

    selecioneB('.bebidaInfo--qtmenos').addEventListener('click', () => {
        if (quantBebida > 1) {
            quantBebida--;
            selecioneB('.bebidaInfo--qt').textContent = quantBebida;
        }
    });
}

// Função do botão de fechar
function botaoFecharBebida() {
    selecioneBAll('.bebidaInfo--cancelButton, .bebidaInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModalBebida);
    });
}

// Função para abrir o modal
function abrirModalBebida() {
    const modal = selecioneB('.bebidaWindowArea');
    modal.style.opacity = 0;
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = 1;

        if (produtoSelecionadoBebida) {
            fillModalData(produtoSelecionadoBebida);
        }
    }, 150);
}

// Função para fechar o modal
function fecharModalBebida() {
    const modal = selecioneB('.bebidaWindowArea');
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 150);
}

// Função de clique nos itens
function handleClickBebida(event) {
    event.preventDefault();

    const parent = event.target.parentElement;
    selecioneL('.bebidaBig').getElementsByTagName('img')[0].src = parent.querySelector('.produto-item-bebida-img').firstChild.src;

    const parentFather = event.target.parentElement.parentElement;
    selecioneL('.bebidaInfo--nome').textContent = parentFather.querySelector('.produto-item-bebida-name').textContent;
    selecioneL('.bebidaInfo--price').textContent = parentFather.querySelector('.produto-item-bebida-price').textContent;
    selecioneL('.bebidaInfo--desc').textContent = parentFather.querySelector('.produto-item-bebida-desc').textContent;

    abrirModalBebida();
}

// Função para adicionar os itens no carrinho
function adicionarAoCarrinhoBebida() {
    selecioneB('.bebidaInfo--addButton').addEventListener('click', () => {
        const priceBebida = parseFloat(selecioneB('.bebidaInfo--price').textContent.replace("R$", "").replace(".", "."));
        const identifierB = modalKeyBebida;
        const nomeBebida = selecioneB('.bebidaInfo--nome').textContent;
        const imgBebida = selecioneB('.bebidaBig img').src;

        const cartItemIndexBebida = cartBebida.findIndex((item) => item.identifierB === identifierB);

        if (cartItemIndexBebida > -1) {
            cartBebida[cartItemIndexBebida].qt = quantBebida;
        } else {
            const bebida = {
                identifierB,
                id: modalKeyBebida,
                name: nomeBebida,
                img: imgBebida,
                qt: quantBebida,
                price: priceBebida
            };
            cartBebida.push(bebida);

            const cartItemBebida = selecioneB('.models .cart-produtos').cloneNode(true);
            cartItemBebida.querySelector('.cart-produto-name').innerHTML = nomeBebida;
            cartItemBebida.querySelector('img').src = imgBebida;
            cartItemBebida.querySelector('.cart-produto-qt').innerHTML = quantBebida;

            cartItemBebida.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cartBebida[cartItemIndexBebida].qt++;
                atualizarCarrinhoBebida();
            });

            cartItemBebida.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cartBebida[cartItemIndexBebida].qt > 1) {
                    cartBebida[cartItemIndexBebida].qt--;
                } else {
                    cartBebida.splice(cartItemIndexBebida, 1);
                    cartItemBebida.remove();
                }
                atualizarCarrinhoBebida();
            });
            selecioneB('.cart').append(cartItemBebida);
        }
        fecharModalBebida();
        abrirCarrinhoBebida();
        atualizarCarrinhoBebida();
    });
}

// Funções para atualizar o carrinho
function atualizarCarrinhoBebida() {
    selecioneB('.menu-openner span').innerHTML = cartBebida.length;

    if (cartBebida.length > 0) {
        selecioneB('aside').classList.add('show');
        selecioneB('.cart').innerHTML = '';

        let subtotal = 0;

        for (let i = 0; i < cartBebida.length; i++) {
            subtotal += cartBebida[i].qt;

            const cartItemUpdateIndexB = selecioneB('.models .cart-produtos').cloneNode(true);
            selecioneB('.cart').appendChild(cartItemUpdateIndexB);

            cartItemUpdateIndexB.querySelector('img').src = cartBebida[i].img;
            cartItemUpdateIndexB.querySelector('.cart-produto-name').innerHTML = cartBebida[i].name;
            cartItemUpdateIndexB.querySelector('.cart-produto-qt').innerHTML = cartBebida[i].qt;

            cartItemUpdateIndexB.querySelector('.cart-produto-qtmais').addEventListener('click', () => {
                cartBebida[i].qt++;
                atualizarCarrinhoBebida();
            });

            cartItemUpdateIndexB.querySelector('.cart-produto-qtmenos').addEventListener('click', () => {
                if (cartBebida[i].qt > 1) {
                    cartBebida[i].qt--;
                } else {
                    cartBebida.splice(i, 1);
                    cartItemUpdateIndexB.remove();
                    i--;
                    atualizarCarrinhoBebida();
                }
            });
        }
        const total = subtotal;
        selecioneB('.cart--totalitem.subtotal span:last-child').innerHTML = formatoMonetarioBebida(subtotal);
        selecioneB('.cart--totalitem.total span:last-child').innerHTML = formatoMonetarioBebida(total);
    } else {
        selecioneB('aside').classList.remove('show');
        selecioneB('aside').style.left = '100vw';
    }
}

// Funções para completar as compras
function finalizarCompraBebida() {
    selecioneB('.cart--finalizar').addEventListener('click', () => {
        cartBebida = [];
        selecioneB('.menu-openner span').innerHTML = 0;
        selecioneB('aside').classList.remove('show');
        selecioneB('aside').style.left = '100vw';
        selecioneB('header').style.display = 'flex';
        atualizarCarrinhoBebida();
    });
}

// Função para abrir o carrinho
function abrirCarrinhoBebida() {
    if (cartBebida.length > 0) {
        selecioneB('aside').classList.add('show');
        selecioneB('header').style.display = 'flex';
    }

    selecioneB('.menu-openner').addEventListener('click', () => {
        selecioneB('aside').classList.add('show');
        selecioneB('aside').style.left = '0';
    });
}

// Função para fechar o carrinho
function fecharCarrinhoBebida() {
    selecioneB('.menu-closer').addEventListener('click', () => {
        selecioneB('aside').style.left = '100vw';
        selecioneB('header').style.display = 'flex';
    });
}

// Função para iniciar todos os códigos
function iniciarBebida() {
    const produtoItemBebida = selecioneBAll('.bebida-area .produtos-item-bebidas');
    produtoItemBebida.forEach((produtoItemBebida) => {
        produtoItemBebida.addEventListener('click', handleClickBebida);
    });

    botaoFecharBebida();
    pegarQuantidadeBebida();
    adicionarAoCarrinhoBebida();
    abrirCarrinhoBebida();
    fecharCarrinhoBebida();
    finalizarCompraBebida();
}

iniciarBebida();