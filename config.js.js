class Agendamento {
    constructor() {
        this.horariosDisponiveis = {
            banho: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            tosa: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            'banho-tosa': ['08:00', '09:50', '10:00', '11:50', '12:00', '13:50', '14:00', '15:50', '16:00', '17:50', '18:00'],
            consulta: ['08:00', '08:50', '09:40', '10:30', '11:20', '12:10', '13:00', '13:50', '14:40', '15:30', '16:20', '17:10', '17:40', '18:30', '19:00']
        };
        this.agendamentos = {};
    }

    agendarHorario(cliente, servico, horario) {
        if (this.horariosDisponiveis[servico].includes(horario)) {
            if (!this.agendamentos[horario]) {
                this.agendamentos[horario] = { cliente, servico };
                console.log(`Agendamento para ${cliente} no horário ${horario} para o serviço de ${servico} realizado com sucesso.`);
            } else {
                console.log(`O horário ${horario} já está ocupado. Escolha outro horário.`);
            }
        } else {
            console.log(`O serviço de ${servico} não está disponível no horário ${horario}. Escolha outro horário.`);
        }
    }

    mostrarAgendamentos() {
        console.log("Agendamentos:");
        for (const [horario, info] of Object.entries(this.agendamentos)) {
            console.log(`${horario}: Cliente ${info.cliente} - Serviço ${info.servico}`);
        }
    }
}

// Exemplo de uso
let agendamento = new Agendamento();
agendamento.agendarHorario('Eduardo Gil Leal', 'banho', '08:00');
agendamento.agendarHorario('Vanda Graça', 'tosa', '10:00');
agendamento.agendarHorario('Ariane Alves', 'tosa', '10:00');
agendamento.agendarHorario('Isaac Gaspar de Conceição', 'banho-tosa', '09:50');
agendamento.agendarHorario('Alexandre Dias Jr.', 'consulta', '10:30');
agendamento.agendarHorario('Sabrina Cervantes Correia', 'banho', '12:00');
agendamento.agendarHorario('Emily Angelim', 'tosa', '14:00');
agendamento.agendarHorario('Vítor Castilhos França', 'banho-tosa', '15:50');
agendamento.agendarHorario('Cíntia Núbia de Dias', 'consulta', '17:10');
agendamento.agendarHorario('Adriana Evelyn de Beltrão', 'banho', '13:00');
agendamento.agendarHorario('Manuela Caroline Duarte', 'tosa', '18:00');
agendamento.agendarHorario('Juan Manuel Cruz', 'banho-tosa', '16:00');
agendamento.agendarHorario('Karl Ramon Brito Soares', 'consulta', '13:50');
agendamento.agendarHorario('Catarina Celina Franco de Ferreira', 'banho', '11:00');
agendamento.agendarHorario('Micael Wilson de Correia', 'tosa', '15:00');
agendamento.agendarHorario('Ana Neves de Perez', 'banho-tosa', '17:50');

// Mostrar todos os agendamentos atualizados
agendamento.mostrarAgendamentos();

agendamento.mostrarAgendamentos(); 