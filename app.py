from flask import Flask, request, jsonify

app = Flask(__name__)

# Dados de exemplo
usuarios = {}
pets = {}
agendamentos = {}

horarios_disponiveis = {
    'banho': ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    'tosa': ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    'banho-tosa': ['08:00', '09:50', '10:00', '11:50', '12:00', '13:50', '14:00', '15:50', '16:00', '17:50', '18:00'],
    'consulta': ['08:00', '08:50', '09:40', '10:30', '11:20', '12:10', '13:00', '13:50', '14:40', '15:30', '16:20', '17:10', '17:40', '18:30', '19:00']
}


@app.route('/cadastrar_usuario', methods=['POST'])
def cadastrar_usuario():
    data = request.get_json()
    usuario_id = data['usuario_id']
    nome = data['nome']
    usuarios[usuario_id] = {'nome': nome}
    return jsonify({'message': 'Usuário cadastrado com sucesso'})


@app.route('/cadastrar_pet', methods=['POST'])
def cadastrar_pet():
    data = request.get_json()
    usuario_id = data['usuario_id']
    nome_pet = data['nome_pet']
    pets[usuario_id] = {'nome_pet': nome_pet}
    return jsonify({'message': 'Pet cadastrado com sucesso'})


@app.route('/agendar_horario', methods=['POST'])
def agendar_horario():
    data = request.get_json()
    usuario_id = data['usuario_id']
    servico = data['servico']
    horario_desejado = data['horario']

    if servico in horarios_disponiveis and horario_desejado in horarios_disponiveis[servico]:
        if servico not in agendamentos:
            agendamentos[servico] = {}

        if horario_desejado not in agendamentos[servico]:
            agendamentos[servico][horario_desejado] = {'usuario_id': usuario_id, 'pet': pets.get(usuario_id, {})}
            return jsonify({'message': 'Horário agendado com sucesso'})
        else:
            return jsonify({'error': 'Horário já agendado'})
    else:
        return jsonify({'error': 'Horário indisponível ou serviço não existente'})


if __name__ == '__main__':
    app.run(debug=True)
