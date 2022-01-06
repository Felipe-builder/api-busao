const modelos = [
    require('../rotas/usuarios/ModeloTabelaUsuario'),
    require('../rotas/usuarios/cartoes/ModeloTabelaCartao')
]
async function criarTabelas() {
    for (let contador = 0; contador < modelos.length; contador++){
        const modelo = modelos[contador]
        await modelo
            .sync()
            .then(() => console.log('Tabela criada com sucesso'))
            .catch(console.log)
    }
}

criarTabelas()