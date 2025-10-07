function criarTriangulo() {
  const base = parseInt(document.getElementById('baseInput').value);
  const output = document.getElementById('output');
  let resultado = '';

  for (let i = 1; i <= base; i++) {
    resultado += '*'.repeat(i) + '<br>';
  }
  output.innerHTML = resultado;
}

function criarTrianguloInvertido() {
  const base = parseInt(document.getElementById('baseInputAmarelo').value);
  const outputAmarelo = document.getElementById('outputAmarelo');
  let resultadoInvertido = '';

  for (let i = base; i >= 1; i--) {
    resultadoInvertido += '*'.repeat(i) + '<br>';
  }
  outputAmarelo.innerHTML = resultadoInvertido;
}

const telefoneInput = document.getElementById('telefone');
  const sortearBtn = document.getElementById('sortearBtn');
  const confirmarBtn = document.getElementById('confirmarBtn');
  const resetBtn = document.getElementById('resetBtn');

  let numeroFixado = '';
  let digitoSorteado = '';
  let modoLivre = false; // permite edição manual

  function sortearDigito() {
    if (modoLivre) {
      alert('Você está no modo edição livre. Digite o número diretamente.');
      return;
    }

    const sorteio = Math.floor(Math.random() * 12) - 1; // -1 a 10

    if (sorteio === -1) {
      alert('ERRO CRÍTICO: Número inválido sorteado (-1). Campo será resetado!');
      reiniciar();
      return;
    }

    if (sorteio === 10) {
      alert('SUCESSO CRÍTICO: Número 10 sorteado! Agora você pode digitar livremente o próximo dígito.');
      modoLivre = true;
      telefoneInput.readOnly = false;
      confirmarBtn.disabled = true;
      sortearBtn.disabled = true;
      digitoSorteado = '';
      telefoneInput.value = numeroFixado; // limpa o dígito atual, só mostra fixado
      telefoneInput.focus();
      return;
    }

    digitoSorteado = sorteio.toString();
    telefoneInput.value = numeroFixado + digitoSorteado;
    confirmarBtn.disabled = false;
  }

  function confirmarDigito() {
    if (modoLivre) {
      alert('Modo livre ativo. Digite o número diretamente e espere a atualização.');
      return;
    }
    if (digitoSorteado === '') {
      alert('Nenhum dígito sorteado para confirmar!');
      return;
    }
    numeroFixado += digitoSorteado;
    telefoneInput.value = numeroFixado;
    digitoSorteado = '';
    confirmarBtn.disabled = true;
  }

  function reiniciar() {
    numeroFixado = '';
    digitoSorteado = '';
    telefoneInput.value = '';
    telefoneInput.readOnly = true;
    confirmarBtn.disabled = true;
    sortearBtn.disabled = false;
    modoLivre = false;
  }

  // Evento para detectar digitação manual no modo livre
  telefoneInput.addEventListener('input', () => {
    if (!modoLivre) return;

    // Pega o valor digitado
    const valorDigitado = telefoneInput.value;

    // Se o valor digitado for maior que o fixado + 1 caractere (um dígito digitado)
    // ou menor que o fixado, rejeita e volta ao valor fixado
    if (!valorDigitado.startsWith(numeroFixado) || valorDigitado.length !== numeroFixado.length + 1) {
      telefoneInput.value = numeroFixado;
      return;
    }

    // Pega o dígito novo digitado
    const novoDigito = valorDigitado.charAt(valorDigitado.length - 1);

    // Confirma esse dígito no número fixado
    numeroFixado += novoDigito;

    // Volta ao modo normal
    modoLivre = false;
    telefoneInput.readOnly = true;
    telefoneInput.value = numeroFixado;
    confirmarBtn.disabled = true;
    sortearBtn.disabled = false;
    digitoSorteado = '';
  });

  sortearBtn.addEventListener('click', sortearDigito);
  confirmarBtn.addEventListener('click', confirmarDigito);
  resetBtn.addEventListener('click', reiniciar);



  const slider = document.getElementById('sliderNumero');
  const CPFFormatado = document.getElementById('CPFFormatado');

  function formatarCPF(valor) {
    
    let strValor = valor.toString().padStart(11, '0');

    const parte1 = strValor.slice(0, 3);
    const parte2 = strValor.slice(3, 6);
    const parte3 = strValor.slice(6, 9);
    const parte4 = strValor.slice(9, 11);

    return `${parte1}. ${parte2}.${parte3}-${parte4}`;
  }

  slider.addEventListener('input', () => {
    CPFFormatado.textContent = formatarCPF(slider.value);
  });

  // Inicializa
  CPFFormatado.textContent = formatarCPF(slider.value);

// Comparador de dados
const limite = 20;
const cores = ['vermelho','azul','verde'];
const contadores = { vermelho:0, azul:0, verde:0 };

function atualizarInterface(){
    let total = contadores.vermelho + contadores.azul + contadores.verde;
    if(total === 0){
        document.getElementById('liderTexto').textContent = 'Clique em um botão para começar!';
        return;
    }

    // Atualiza cada barra e texto
    cores.forEach(cor => {
        const fill = document.getElementById('fill-' + cor);
        const cont = document.getElementById('cont-' + cor);
        const percBarra = Math.min(contadores[cor], limite) * 5;
        fill.style.width = percBarra + '%';
        cont.textContent = contadores[cor] + ' cliques';
    });

    // Descobre o líder
    const lider = Object.keys(contadores).reduce((a,b) => contadores[a] > contadores[b] ? a : b);
    const percLider = ((contadores[lider] / total) * 100).toFixed(1);
    const nome = lider.charAt(0).toUpperCase() + lider.slice(1);
    document.getElementById('liderTexto').textContent = `O botão ${nome} está se sobressaindo com ${percLider}%!`;
}

// Adiciona eventos aos botões
cores.forEach(cor => {
    document.getElementById('btn-' + cor).addEventListener('click', () => {
        contadores[cor]++;
        atualizarInterface();
    });
});
