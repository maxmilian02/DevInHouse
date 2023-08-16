import { verificarConflitos, conflitoDatas, deletarReserva } from './funcoes.js';

const numeroQuartoSelect = document.getElementById('numero-quarto');
const tabelaBody = document.getElementById('tabela');
const reservaForm = document.getElementById('reserva-form');
const logoutButton = document.getElementById('logout');
let reservas = [];

document.addEventListener('DOMContentLoaded', async () => {
    await carregarReservas();
    carregarOpcoesQuartos();
    
    reservaForm.addEventListener('submit', handleReservaSubmit);
    logoutButton.addEventListener('click', handleLogout);
});

async function carregarReservas() {
    try {
        const response = await axios.get('http://localhost:3000/reservas');
        const reservasAPI = response.data;

        reservas = [...reservasAPI];

        reservas.forEach((reserva, index) => {
            const tr = criarLinhaReserva(reserva, index);
            tabelaBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar reservas:', error);
    }
}

function carregarOpcoesQuartos() {
    for (let numeroQuarto = 1001; numeroQuarto <= 1010; numeroQuarto++) {
        const option = document.createElement('option');
        option.value = numeroQuarto;
        option.textContent = numeroQuarto;
        numeroQuartoSelect.appendChild(option);
    }
}

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
        deletarReserva(index, reservas);
    });
    acoes.appendChild(botaoDeletar);
    tr.appendChild(acoes);

    return tr;
}

async function handleReservaSubmit(event) {
    event.preventDefault();

    const numeroQuarto = document.getElementById('numero-quarto').value;
    const nomeCliente = document.getElementById('nome-cliente').value;
    const cpfCliente = document.getElementById('cpf-cliente').value;
    const dataInicio = document.getElementById('data-inicio').value;
    const dataTermino = document.getElementById('data-termino').value;

    if (numeroQuarto === '' || nomeCliente === '' || cpfCliente === '' || dataInicio === '' || dataTermino === '') {
        document.getElementById('reserva-error-message').textContent = 'Todos os campos são obrigatórios';
    } else {
        if (verificarConflitos(numeroQuarto, dataInicio, dataTermino, reservas)) {
            document.getElementById('reserva-error-message').textContent = 'O quarto já está reservado para esse período';
        } else {
            const novaReserva = {
                numero_quarto: parseInt(numeroQuarto),
                nome: nomeCliente,
                cpf: cpfCliente,
                periodo_estadia: `${dataInicio} - ${dataTermino}`
            };

            await criarReserva(novaReserva);
            atualizarTabelaReservas();
            resetForm();
        }
    }
}

async function criarReserva(reserva) {
    try {
        await axios.post('http://localhost:3000/reservas', reserva);
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
    }
}

async function atualizarTabelaReservas() {
    const tabelaBody = document.getElementById('tabela');
    tabelaBody.innerHTML = '';
    await carregarReservas(tabelaBody);
}

function resetForm() {
    const reservaForm = document.getElementById('reserva-form');
    reservaForm.reset();
    const errorMessage = document.getElementById('reserva-error-message');
    errorMessage.textContent = '';
}

function handleLogout() {
    window.location.href = 'index.html';
}
