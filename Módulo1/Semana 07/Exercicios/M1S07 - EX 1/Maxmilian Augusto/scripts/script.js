import { usuarios } from './constantes.js';

document.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        document.getElementById('error-message').textContent = 'E-mail e senha são obrigatórios';
    } else {
        const usuario = usuarios.find((user) => user.email === email && user.senha === password);

        if (usuario) {
            window.location.href = './home.html';
        } else {
            document.getElementById('error-message').textContent = 'Usuário não encontrado';
        }
    }
});
    