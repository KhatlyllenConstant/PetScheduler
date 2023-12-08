const request = require('supertest');
const app = require('./app');

describe('Integration Tests', () => {
  test('GET / returns status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('POST /cadastrar_usuario adds a new user', async () => {
    const response = await request(app)
      .post('/cadastrar_usuario')
      .send({ usuario_id: '1', nome: 'Alice' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Usuário cadastrado com sucesso' });
  });

  test('POST /cadastrar_pet adds a new pet', async () => {
    const response = await request(app)
      .post('/cadastrar_pet')
      .send({ usuario_id: '1', nome_pet: 'Buddy' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Pet cadastrado com sucesso' });
  });

  test('POST /agendar_horario schedules an appointment', async () => {
    const response = await request(app)
      .post('/agendar_horario')
      .send({ usuario_id: '1', servico: 'banho', horario: '08:00' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Horário agendado com sucesso' });
  });
});
