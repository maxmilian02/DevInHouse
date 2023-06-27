// Manipular o primeiro elemento h1:
let h1 = document.getElementsByTagName("h1")[0];
let h1Counter = 1;

// Criar uma query com todos os elementos h2 no html:
let h2List = document.querySelectorAll("h2");
let h2Counter = 1;

let clickCounter = 1;

function changeColorsAndText() {
  botaoCorAleatoria.classList.add("animate__animated", "animate__pulse");
  botaoCorAleatoria.style.backgroundColor = getRandomColor();
  botaoCorAleatoria.textContent = `Cor Aleatória ${clickCounter}`;
  clickCounter++;

  // Adicionar classes de animação para o efeito de transição
  h1.classList.add("animate__animated", "animate__bounceIn");
  h2List.forEach(h2 => {
    h2.classList.add("animate__animated", "animate__bounceIn");
  });

  // Alterar cores dos elementos h1 e h2
  h1.style.color = getRandomColor();
  h2List.forEach(h2 => {
    h2.style.color = getRandomColor();
  });

  // Atualizar texto dos elementos h1 e h2
  h1.textContent = `m1s05a1 após js ${h1Counter}`;
  h1Counter++;

  h2List.forEach((h2, index) => {
    h2.textContent = `m1s05a1 h2 após js ${h2Counter + index}`;
  });
  h2Counter += h2List.length;

  // Remover classes de animação após um tempo para permitir a repetição
  setTimeout(() => {
    botaoCorAleatoria.classList.remove("animate__animated", "animate__pulse");
    h1.classList.remove("animate__animated", "animate__bounceIn");
    h2List.forEach(h2 => {
      h2.classList.remove("animate__animated", "animate__bounceIn");
    });
  }, 500);
}

function getRandomColor() {
  // Gerar uma cor aleatória em formato hexadecimal
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Associar a função changeColorsAndText ao evento click do botão
let botaoCorAleatoria = document.getElementById("botao_cor_aleatoria");
botaoCorAleatoria.addEventListener("click", changeColorsAndText);
