import unittest
from app.app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_cadastrar_usuario(self):
        response = self.app.post('/cadastrar_usuario', json={'usuario_id': '1', 'nome': 'Teste'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Usuário cadastrado com sucesso')

    def test_cadastrar_pet(self):
        response = self.app.post('/cadastrar_pet', json={'usuario_id': '1', 'nome_pet': 'Fido'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Pet cadastrado com sucesso')

    def test_agendar_horario(self):
        self.app.post('/cadastrar_usuario', json={'usuario_id': '1', 'nome': 'Teste'})
        self.app.post('/cadastrar_pet', json={'usuario_id': '1', 'nome_pet': 'Fido'})
        response = self.app.post('/agendar_horario', json={'usuario_id': '1', 'servico': 'banho', 'horario': '08:00'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Horário agendado com sucesso')

    def test_agendar_horario_ja_agendado(self):
        self.app.post('/cadastrar_usuario', json={'usuario_id': '1', 'nome': 'Teste'})
        self.app.post('/cadastrar_pet', json={'usuario_id': '1', 'nome_pet': 'Fido'})
        self.app.post('/agendar_horario', json={'usuario_id': '1', 'servico': 'banho', 'horario': '08:00'})
        response = self.app.post('/agendar_horario', json={'usuario_id': '1', 'servico': 'banho', 'horario': '08:00'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['error'], 'Horário já agendado')

if __name__ == '__main__':
    unittest.main()
