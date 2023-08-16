
const numeroQuartoSelect = document.getElementById('numero-quarto');
let reservas = []; // Definir a variável de reservas no escopo global

document.addEventListener('DOMContentLoaded', async () => {
    const tabelaBody = document.getElementById('tabela');
    await carregarReservas(tabelaBody);
    carregarOpcoesQuartos();

    const reservaForm = document.getElementById('reserva-form');
    reservaForm.addEventListener('submit', handleReservaSubmit);

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', handleLogout);
});

async function carregarReservas(tabelaBody) {
    try {
        const response = await axios.get('http://localhost:3000/reservas');
        const reservasAPI = response.data;

        reservas = [...reservasAPI]; // Atualiza a variável global de reservas

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
        deletarReserva(index);
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
        if (verificarConflitos(numeroQuarto, dataInicio, dataTermino)) {
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

    const conflitoInicio = (dataInicioNovaObj >= dataInicioExistenteObj && dataInicioNovaObj <= dataTerminoExistenteObj);
    const conflitoTermino = (dataTerminoNovaObj >= dataInicioExistenteObj && dataTerminoNovaObj <= dataTerminoExistenteObj);

    return conflitoInicio || conflitoTermino;
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

function deletarReserva(index) {
    const reserva = reservas[index];
    
    axios.delete(`http://localhost:3000/reservas/${reserva.id}`)
        .then(() => {
            reservas.splice(index, 1);
            atualizarTabelaReservas();
        })
        .catch(error => {
            console.error('Erro ao deletar reserva:', error);
        });
}