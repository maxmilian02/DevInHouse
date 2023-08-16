import { usuarios_hotel } from './constantes.js';

const reservas = usuarios_hotel;
const numeroQuartoSelect = document.getElementById('numero-quarto');

document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.getElementById('tabela');
    reservas.forEach((reserva, index) => {
        const tr = criarLinhaReserva(reserva, index);
        tabelaBody.appendChild(tr);
    });

    usuarios_hotel.forEach((reserva) => {
        const option = document.createElement('option');
        option.value = reserva.numero_quarto;
        option.textContent = reserva.numero_quarto;
        numeroQuartoSelect.appendChild(option);
    });

    const reservaForm = document.getElementById('reserva-form');
    reservaForm.addEventListener('submit', handleReservaSubmit);

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', handleLogout);
});

function criarLinhaReserva(reserva, index) {
    const tr = document.createElement('tr');

    const numeroQuarto = document.createElement('td');
    numeroQuarto.textContent = reserva.numero_quarto;
    tr.appendChild(numeroQuarto);

    const nome = document.createElement('td');
    nome.textContent = reserva.nome;
    tr.appendChild(nome);

    const cpf = document.createElement('td');
    cpf.textContent = reserva.cpf;
    tr.appendChild(cpf);

    const periodoEstadia = document.createElement('td');
    periodoEstadia.textContent = reserva.periodo_estadia;
    tr.appendChild(periodoEstadia);

    const acoes = document.createElement('td');
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = 'Deletar';
    botaoDeletar.classList.add('botao-deletar');
    botaoDeletar.addEventListener('click', () => {
        deletarReserva(index);
    });
    acoes.appendChild(botaoDeletar);
    tr.appendChild(acoes);

    return tr;
}

function handleReservaSubmit(event) {
    event.preventDefault();

    const numeroQuarto = document.getElementById('numero-quarto').value;
    const nomeCliente = document.getElementById('nome-cliente').value;
    const cpfCliente = document.getElementById('cpf-cliente').value;
    const dataInicio = document.getElementById('data-inicio').value;
    const dataTermino = document.getElementById('data-termino').value;

    if (numeroQuarto === '' || nomeCliente === '' || cpfCliente === '' || dataInicio === '' || dataTermino === '') {
        document.getElementById('reserva-error-message').textContent = 'Todos os campos são obrigatórios';
    } else {
        if (verificarConflitos(numeroQuarto, dataInicio, dataTermino)) {
            document.getElementById('reserva-error-message').textContent = 'O quarto já está reservado para esse período';
        } else {
            const novaReserva = {
                numero_quarto: parseInt(numeroQuarto),
                nome: nomeCliente,
                cpf: cpfCliente,
                periodo_estadia: `${dataInicio} - ${dataTermino}`
            };

            reservas.push(novaReserva);

            atualizarTabelaReservas();
            resetForm();
        }
    }
}

function verificarConflitos(numeroQuarto, dataInicio, dataTermino) {
    return reservas.some((reserva) => {
        return reserva.numero_quarto === parseInt(numeroQuarto) &&
               conflitoDatas(dataInicio, dataTermino, reserva.periodo_estadia);
    });
}

function conflitoDatas(dataInicioNova, dataTerminoNova, periodoExistente) {
    const [dataInicioExistente, dataTerminoExistente] = periodoExistente.split(' - ');

    const dataInicioNovaObj = new Date(dataInicioNova);
    const dataTerminoNovaObj = new Date(dataTerminoNova);
    const dataInicioExistenteObj = new Date(dataInicioExistente);
    const dataTerminoExistenteObj = new Date(dataTerminoExistente);

    return (dataInicioNovaObj >= dataInicioExistenteObj && dataInicioNovaObj <= dataTerminoExistenteObj) ||
           (dataTerminoNovaObj >= dataInicioExistenteObj && dataTerminoNovaObj <= dataTerminoExistenteObj);
}

function deletarReserva(index) {
    reservas.splice(index, 1);
    atualizarTabelaReservas();
}

function atualizarTabelaReservas() {
    const tabelaBody = document.getElementById('tabela');
    tabelaBody.innerHTML = '';

    reservas.forEach((reserva, index) => {
        const tr = criarLinhaReserva(reserva, index);
        tabelaBody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('reserva-form').reset();
    document.getElementById('reserva-error-message').textContent = '';
}

function handleLogout() {
    window.location.href = 'index.html';
}

