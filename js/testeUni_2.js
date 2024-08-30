const selecione = (element) => document.querySelector(element);
const selecioneAll = (elements) => document.querySelectorAll(elements);

// Variáveis globais
let modalKey = 0;
let quantItensUni = 1;
let cartUni = [];
let produtoSelecionado = null;

const jsonData = JSON.parse(tipoProduto);

// Função monetária
function formatoMonetarioRealUni(valor) {
    return valor.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' });
}

function monetarioUni(valor) {
    if (valor) {
        return valor.toFixed(2);
    }
}

// Pegar key
function capturarKeyUni(e, tipoProduto) {
    const key = e.target.closest(`.produto-item-${tipoProduto}`).getAttribute("data-key");
    console.log(`${tipoProduto} clicado: ` + key);

    produtoSelecionado = jsonData[key];
    quantItensUni = 1;  // Corrigido de 'quantItens' para 'quantItensUni'
    modalKey = key;
}

// Pegar quantidade
function pegarQuantidadeUni(tipoProduto) {
    selecione(`.${tipoProduto}Info--qtmais`).addEventListener("click", () => {  // Corrigido de "cloick" para "click"
        quantItensUni++;
        selecione(`.${tipoProduto}Info--qt`).textContent = quantItensUni;  // Corrigido de 'quantItens' para 'quantItensUni'
    });

    selecione(`.${tipoProduto}Info--qtmenos`).addEventListener("click", () => {
        if (quantItensUni > 1) {  // Corrigido de 'quantItens' para 'quantItensUni'
            quantItensUni--;  // Corrigido de 'quantItens' para 'quantItensUni'
            selecione(`.${tipoProduto}Info--qt`).textContent = quantItensUni;  // Corrigido de 'quantItens' para 'quantItensUni'
        }
    });
}

// Função para fechar
function botaoFecharUni(tipoProduto) {
    selecioneAll(`.${tipoProduto}Info--cancelButton, .${tipoProduto}Info--cancelMobileButton`).forEach((item) => {  // Corrigido selecioneAll
        item.addEventListener("click", () => fecharModalUni(tipoProduto));  // Corrigido para arrow function
    });
}

// Função para abrir o modal
function abrirModalUni(tipoProduto) {
    const modalUni = selecione(`.${tipoProduto}WindowArea`);
    modalUni.style.opacity = 0;
    modalUni.style.display = 'flex';
    setTimeout(() => {
        modalUni.style.opacity = 1;

        if (produtoSelecionado) {
            fillModalData(produtoSelecionado, tipoProduto);  // Certifique-se de que essa função exista
        }
    }, 150);
}

// Função para fechar o modal
function fecharModalUni(tipoProduto) {
    const modal = selecione(`.${tipoProduto}WindowArea`);
    modal.style.opacity = 0;
    setTimeout(() => {
        modal.style.display = 'none';
    }, 150);
}

// Função de clique nos produtos
function btnAddProdutoUni(event, tipoProduto) {
    event.preventDefault();  // Corrigido de 'prevetDefault' para 'preventDefault'
    const tipoProduto =
        event.target.closest('.produtos-item').classList.contains('salgado-area') ? 'salgado' :
        event.target.closest('.produtos-item a').classList.contains('pastel-area') ? 'pastel' :
        event.target.closest('.produtos-item a').classList.contains('lanche-area') ? 'lanche' : 'bebida';
    capturarKeyUni(event, tipoProduto);

    const parent = event.target.closest(`.produto-item-${tipoProduto}`);
    selecione(`.${tipoProduto}Big img`).src = parent.querySelector(`.produto-item-${tipoProduto}-img`).firstChild.src;  // Adicionado '.src'
    selecione(`.${tipoProduto}Info--nome`).textContent = parent.querySelector(`.produto-item-${tipoProduto}-name`).textContent;
    selecione(`.${tipoProduto}Info--price`).textContent = parent.querySelector(`.produto-item-${tipoProduto}-price`).textContent;
    selecione(`.${tipoProduto}Info--desc`).textContent = parent.querySelector(`.produto-item-${tipoProduto}-desc`).textContent;

    abrirModalUni(tipoProduto);
}

// Função para adicionar ao carrinho
function adicionarAoCarrinhoUni(tipoProduto) {
    selecione(`.${tipoProduto}Info--addButton`).addEventListener("click", () => {
        const priceProdutoUni = parseFloat(selecione(`.${tipoProduto}Info--price`).textContent.replace("R$", "").replace(",", "."));
        const identifier = modalKey;
        const nomeProdutoUni = selecione(`.${tipoProduto}Info--nome`).textContent;
        const imgProdutoUni = selecione(`.${tipoProduto}Big img`).src;

        const cartItemIndexUni = cartUni.findIndex((item) => item.identifier === identifier);  // Corrigido comparação de item.identifier

        if (cartItemIndexUni > -1) {
            cartUni[cartItemIndexUni].qt += quantItensUni;  // Corrigido de 'quantItens' para 'quantItensUni'
        } else {
            const produtoUni = {
                identifier,
                id: modalKey,
                name: nomeProdutoUni,
                img: imgProdutoUni,
                qt: quantItensUni,  // Corrigido de 'quantItens' para 'quantItensUni'
                price: priceProdutoUni
            };
            cartUni.push(produtoUni);

            const cartItemUni = selecione(".models .cart-produtos").cloneNode(true);
            cartItemUni.querySelector('.cart-produto-name').innerHTML = nomeProdutoUni;
            cartItemUni.querySelector("img").src = imgProdutoUni;
            cartItemUni.querySelector('.cart-produto-qt').innerHTML = quantItensUni;  // Corrigido de 'quantItens' para 'quantItensUni'

            cartItemUni.querySelector(".cart-produto-qtmais").addEventListener("click", () => {
                cartUni[cartItemIndexUni].qt++;
                atualizaCarrinhoUni();
            });

            cartItemUni.querySelector(".cart-produto-qtmenos").addEventListener("click", () => {
                if (cartUni[cartItemIndexUni].qt > 1) {
                    cartUni[cartItemIndexUni].qt--;
                } else {
                    cartUni.splice(cartItemIndexUni, 1);
                    cartItemUni.remove();
                }
                atualizaCarrinhoUni();
            });

            selecione(".cart").appendChild(cartItemUni);  // Adicionado para incluir o item no carrinho
        }
        fecharModalUni(tipoProduto);
        abrirCarrinhoUni();
        atualizaCarrinhoUni();
    });
}

// Função para atualizar o carrinho
function atualizaCarrinhoUni() {
    selecione(".menu-openner span").innerHTML = cartUni.length;

    if (cartUni.length > 0) {
        selecione("aside").classList.add('show');
        selecione(".cart").innerHTML = '';

        let subtotalUni = 0;

        cartUni.forEach((item, i) => {
            subtotalUni += item.price * item.qt;  // Corrigido para somar corretamente o subtotal

            const cartItemUni = selecione(".models .cart-produtos").cloneNode(true);
            cartItemUni.querySelector("img").src = item.img;
            cartItemUni.querySelector(".cart-produto-name").textContent = item.name;
            cartItemUni.querySelector('.cart-produto-qt').innerHTML = item.qt;

            cartItemUni.querySelector('.cart-produto-qtmais').addEventListener("click", () => {
                item.qt++;
                atualizaCarrinhoUni();
            });

            cartItemUni.querySelector(".cart-produto-qtmenos").addEventListener("click", () => {
                if (item.qt > 1) {
                    item.qt--;
                } else {
                    cartUni.splice(i, 1);
                    cartItemUni.remove();
                }
                atualizaCarrinhoUni();
            });

            selecione('.cart').appendChild(cartItemUni);
        });

        const totalUni = subtotalUni;  // Definindo o total como subtotal (se houver descontos, deve-se aplicar aqui)
        selecione(".cart--totalItem.subtotal span:first-child").innerHTML = formatoMonetarioRealUni(subtotalUni);  // Corrigido para usar 'subtotalUni'
        selecione(".cart--totalItem.total span:first-child").innerHTML = formatoMonetarioRealUni(totalUni);  // Corrigido para usar 'totalUni'
    } else {
        selecione('aside').classList.remove('show');
        selecione('aside').style.left = '100vw';
    }
}

// Função para finalizar a compra
function finalizarCompraUni() {
    selecione('.cart--finalizar').addEventListener('click', () => {
        cartUni = [];
        selecione(".menu-openner span").innerHTML = 0;
        selecione("aside").classList.remove('show');
        selecione("aside").style.left = '100vw';
        selecione("header").style.display = 'flex';
        atualizaCarrinhoUni();
    });
}

// Função para abrir o carrinho
function abrirCarrinhoUni() {
    if (cartUni.length > 0) {
        selecione('aside').classList.add('show');
        selecione('header').style.display = 'flex';
    }

    selecione(".menu-openner").addEventListener("click", () => {  // Corrigido de "cliicj" para "click"
        selecione('aside').classList.add('show');
        selecione('aside').style.left = '0';
    });
}

// Função para fechar o carrinho
function fecharCarrinhoUni() {
    selecione('.menu-openner').addEventListener('click', () => {
        selecione('aside').classList.remove('show');
        selecione('aside').style.display = 'flex';  // Corrigido de "atyle" para "style"
    });
}

// Função que inicia todo o código
function iniciarUni(tipoProduto, jsonProduto) {  // Adicionado parâmetros para receber os dados JSON
    const produtoItensUni = selecioneAll(`.${tipoProduto}-area .produto-item-${tipoProduto}`);
    produtoItensUni.forEach((produtoItem) => {
        produtoItem.addEventListener('click', btnAddProdutoUni);
    });

    botaoFecharUni(tipoProduto);
    pegarQuantidadeUni(tipoProduto);
    adicionarAoCarrinhoUni(tipoProduto);
    abrirCarrinhoUni();
    fecharCarrinhoUni();
    finalizarCompraUni();
}

// Iniciar as categorias
iniciarUni('salgado', salgadoJson);
iniciarUni('pastel', pastelJson);
iniciarUni('lanche', lancheJson);
iniciarUni('bebida', bebidaJson);