const { cadastrarUsuario, cadastrarPet, agendarHorario } = require('./app');

test('cadastrarUsuario should add a new user', () => {
  const req = { body: { usuario_id: '1', nome: 'John' } };
  const res = { json: jest.fn() };

  cadastrarUsuario(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Usuário cadastrado com sucesso' });
  expect(usuarios['1']).toEqual({ nome: 'John' });
});

test('cadastrarPet should add a new pet', () => {
  const req = { body: { usuario_id: '1', nome_pet: 'Fluffy' } };
  const res = { json: jest.fn() };

  cadastrarPet(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Pet cadastrado com sucesso' });
  expect(pets['1']).toEqual({ nome_pet: 'Fluffy' });
});

test('agendarHorario should schedule an appointment', () => {
  const req = { body: { usuario_id: '1', servico: 'banho', horario: '08:00' } };
  const res = { json: jest.fn() };

  agendarHorario(req, res);

  expect(res.json).toHaveBeenCalledWith({ message: 'Horário agendado com sucesso' });
  expect(agendamentos['banho']['08:00']).toEqual({ usuario_id: '1', pet: {} });
});

test('agendarHorario should handle error if the time is already booked', () => {
  const req = { body: { usuario_id: '1', servico: 'banho', horario: '08:00' } };
  const res = { json: jest.fn() };

  // Book the same time slot first
  agendamentos['banho'] = { '08:00': { usuario_id: '2', pet: {} } };

  agendarHorario(req, res);

  expect(res.json).toHaveBeenCalledWith({ error: 'Horário já agendado' });
});

test('agendarHorario should handle error if the service or time is unavailable', () => {
  const req = { body: { usuario_id: '1', servico: 'invalid', horario: '08:00' } };
  const res = { json: jest.fn() };

  agendarHorario(req, res);

  expect(res.json).toHaveBeenCalledWith({ error: 'Horário indisponível ou serviço não existente' });
});
