const tamanhoIlha = 5;
let ilha;
let jogoIniciado = false;
let linhaAtual = tamanhoIlha - 1; // Começa na última linha (baixo)
let caminho = []; // Array para rastrear o caminho percorrido

function criarIlha() {
    ilha = Array(tamanhoIlha).fill().map(() => Array(tamanhoIlha).fill('O'));

    // Posicionar obstáculos (2 por linha)
    for (let i = 0; i < tamanhoIlha; i++) {
        let obstaculos = 0;
        while (obstaculos < 2) {
            const x = Math.floor(Math.random() * tamanhoIlha);
            if (ilha[i][x] === 'O') {
                ilha[i][x] = 'X';
                obstaculos++;
            }
        }
    }
}

function renderizarIlha() {
    const ilhaElement = document.getElementById('ilha');
    ilhaElement.innerHTML = '';
    ilhaElement.style.gridTemplateColumns = `repeat(${tamanhoIlha}, 40px)`;

    for (let i = 0; i < tamanhoIlha; i++) {
        for (let j = 0; j < tamanhoIlha; j++) {
            const celulaElement = document.createElement('div');
            celulaElement.className = 'celula';
            celulaElement.dataset.x = j;
            celulaElement.dataset.y = i;
            celulaElement.addEventListener('click', revelarCelula);
            ilhaElement.appendChild(celulaElement);
        }
    }
}

function revelarCelula(event) {
    if (!jogoIniciado) return;

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (y !== linhaAtual) return; // Só permite clicar na linha atual

    const conteudo = ilha[y][x];

    event.target.classList.add('revelada');
    event.target.textContent = conteudo;

    if (conteudo === 'X') {
        alert('Você caiu numa armadilha, tente novamente!');
        jogoIniciado = false;
    } else {
        // Adiciona a célula ao caminho
        caminho.push([x, y]);

        // Avança para a próxima linha (de baixo para cima)
        linhaAtual--;

        // Verifica se chegou ao topo
        if (linhaAtual < 0) {
            alert('Você encontrou o tesouro, parabéns!');
            jogoIniciado = false;
        }
    }
}

function iniciarJogo() {
    criarIlha();
    renderizarIlha();
    jogoIniciado = true;
    linhaAtual = tamanhoIlha - 1;
    caminho = [];
}

function reiniciarJogo() {
    iniciarJogo();
}

document.getElementById('iniciar').addEventListener('click', iniciarJogo);
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Inicializar o jogo
renderizarIlha();
