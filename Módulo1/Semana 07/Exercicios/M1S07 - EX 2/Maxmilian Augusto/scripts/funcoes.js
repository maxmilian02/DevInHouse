export function verificarConflitos(numeroQuarto, dataInicio, dataTermino, reservas) {
    return reservas.some((reserva) => {
        return reserva.numero_quarto === parseInt(numeroQuarto) &&
               conflitoDatas(dataInicio, dataTermino, reserva.periodo_estadia);
    });
}

export function conflitoDatas(dataInicioNova, dataTerminoNova, periodoExistente) {
    const [dataInicioExistente, dataTerminoExistente] = periodoExistente.split(' - ');

    const dataInicioNovaObj = new Date(dataInicioNova);
    const dataTerminoNovaObj = new Date(dataTerminoNova);
    const dataInicioExistenteObj = new Date(dataInicioExistente);
    const dataTerminoExistenteObj = new Date(dataTerminoExistente);

    const conflitoInicio = (dataInicioNovaObj >= dataInicioExistenteObj && dataInicioNovaObj <= dataTerminoExistenteObj);
    const conflitoTermino = (dataTerminoNovaObj >= dataInicioExistenteObj && dataTerminoNovaObj <= dataTerminoExistenteObj);

    return conflitoInicio || conflitoTermino;
}

export function deletarReserva(index, reservas) {
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