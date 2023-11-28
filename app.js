const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const usuarios = {};
const pets = {};
const agendamentos = {};

const horarios_disponiveis = {
  'banho': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  'tosa': ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
  'banho-tosa': ['08:00', '09:50', '10:00', '11:50', '12:00', '13:50', '14:00', '15:50', '16:00', '17:50', '18:00'],
  'consulta': ['08:00', '08:50', '09:40', '10:30', '11:20', '12:10', '13:00', '13:50', '14:40', '15:30', '16:20', '17:10', '17:40', '18:30', '19:00']
};

app.post('/cadastrar_usuario', (req, res) => {
  const data = req.body;
  const usuario_id = data['usuario_id'];
  const nome = data['nome'];
  usuarios[usuario_id] = {'nome': nome};
  res.json({'message': 'Usuário cadastrado com sucesso'});
});

app.post('/cadastrar_pet', (req, res) => {
  const data = req.body;
  const usuario_id = data['usuario_id'];
  const nome_pet = data['nome_pet'];
  pets[usuario_id] = {'nome_pet': nome_pet};
  res.json({'message': 'Pet cadastrado com sucesso'});
});

app.post('/agendar_horario', (req, res) => {
  const data = req.body;
  const usuario_id = data['usuario_id'];
  const servico = data['servico'];
  const horario_desejado = data['horario'];

  if (horarios_disponiveis.hasOwnProperty(servico) && horarios_disponiveis[servico].includes(horario_desejado)) {
    if (!agendamentos.hasOwnProperty(servico)) {
      agendamentos[servico] = {};
    }

    if (!agendamentos[servico].hasOwnProperty(horario_desejado)) {
      agendamentos[servico][horario_desejado] = {'usuario_id': usuario_id, 'pet': pets[usuario_id] || {}};
      res.json({'message': 'Horário agendado com sucesso'});
    } else {
      res.json({'error': 'Horário já agendado'});
    }
  } else {
    res.json({'error': 'Horário indisponível ou serviço não existente'});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
