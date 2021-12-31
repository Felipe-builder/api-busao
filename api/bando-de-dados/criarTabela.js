const ModeloTabela = require('../rotas/usuarios/ModeloTabelaUsuario')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)