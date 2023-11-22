const horariosDisponiveis = {
    banho: [
        '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
    ],
    tosa: [
        '08:00', '10:00', '12:00', '14:00', '16:00',
        '18:00'
    ],
    'banho-tosa': [
        '08:00', '09:50', '10:00', '11:50', '12:00',
        '13:50', '14:00', '15:50', '16:00', '17:50',
        '18:00'
    ],
    consulta: [
        '08:00', '08:50', '09:40', '10:30', '11:20',
        '12:10', '13:00', '13:50', '14:40', '15:30',
        '16:20', '17:10', '17:40', '18:30', '19:00'
    ]
};

const agendamentos = {};

function agendarHorario(cliente, servico, horario) {
    // Verifica se o serviço está disponível no horário escolhido
    if (horariosDisponiveis[servico].includes(horario)) {
        // Verifica se o horário já está agendado
        if (!agendamentos[horario]) {
            agendamentos[horario] = { cliente, servico };
            console.log(`Agendamento para ${cliente} no horário ${horario} para o serviço de ${servico} realizado com sucesso.`);
        } else {
            console.log(`O horário ${horario} já está ocupado. Escolha outro horário.`);
        }
    } else {
        console.log(`O serviço de ${servico} não está disponível no horário ${horario}. Escolha outro horário.`);
    }
}

function mostrarAgendamentos() {
    // Mostra todos os agendamentos no banco de dados
    console.log("Agendamentos:");
    for (const [horario, info] of Object.entries(agendamentos)) {
        console.log(`${horario}: Cliente ${info.cliente} - Serviço ${info.servico}`);
    }
}

// Exemplo de agendamento
agendarHorario('Cliente1', 'banho', '08:00');
agendarHorario('Cliente2', 'tosa', '10:00');

// Exemplo de visualização de agendamentos
mostrarAgendamentos();