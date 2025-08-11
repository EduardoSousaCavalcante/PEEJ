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
