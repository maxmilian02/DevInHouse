import Usuario from './Usuario.js';

const usuario = new Usuario("Maxmilian Augusto", "max@exemplo.com.br", "123456");

const btnAcessar = document.getElementById("btnAcessar");
const mensagem = document.getElementById("mensagem");

btnAcessar.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (usuario.autenticar(email, senha)) {
    mensagem.textContent = "Autenticação bem-sucedida!";
    mensagem.classList.remove("error");
    mensagem.classList.add("success");
  } else {
    mensagem.textContent = "Credenciais inválidas!";
    mensagem.classList.remove("success");
    mensagem.classList.add("error");
  }
});
