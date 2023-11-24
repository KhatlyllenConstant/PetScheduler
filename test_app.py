import unittest
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        # Configurações iniciais para os testes
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_cadastrar_usuario(self):
        # Adicione testes para cada rota
        response = self.app.post('/cadastrar_usuario', json={'usuario_id': '1', 'nome': 'Teste'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Usuário cadastrado com sucesso')

       

if __name__ == '__main__':
    unittest.main()
