import unittest
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        # Configurações iniciais para os testes
        app.config['TESTING'] = True
        self.app = app.test_client()

    def test_cadastrar_usuario(self):
        # Teste para cadastrar um usuário
        response = self.app.post('/cadastrar_usuario', json={'usuario_id': '1', 'nome': 'Teste'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Usuário cadastrado com sucesso')

    def test_obter_usuario(self):
        # Teste para obter informações de um usuário cadastrado
        self.test_cadastrar_usuario()
        response = self.app.get('/obter_usuario/1')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['usuario_id'], '1')
        self.assertEqual(data['nome'], 'Teste')

    def test_atualizar_usuario(self):
        # Teste para atualizar as informações de um usuário
        self.test_cadastrar_usuario()
        response = self.app.put('/atualizar_usuario/1', json={'nome': 'Novo Nome'})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Informações do usuário atualizadas com sucesso')

if __name__ == '__main__':
    # Adicione as linhas abaixo para permitir a execução no modo de depuração
    import sys
    import unittest
    unittest.main(argv=sys.argv + ['--verbose'])

