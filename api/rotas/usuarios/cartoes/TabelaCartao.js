const Modelo = require('./ModeloTabelaCartao')
const NaoEncontrado = require('../../../erros/NaoEncontrado')

module.exports = {
    listar(idUsuario) {
        return Modelo.findAll({
            where: {
                usuario: idUsuario
            },
            raw: true
        })
    },
    inserir(dados){
        return Modelo.create(dados)
    },
    async carregarPorId(idCartao, idUsuario) {
        const encontrado = await Modelo.findOne({
            where: {
                id: idCartao,
                usuario: idUsuario
            },
            raw: true
        })

        if(!encontrado) {
            throw new NaoEncontrado('cartao')
        }

        return encontrado
    },
    remover(idCartao, idUsuario){
        return Modelo.destroy({
            where: {
                id: idCartao,
                usuario: idUsuario
            }
        })
    },
    atualizar(dadosDoCartao, dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoCartao 
            }
        )
    }
}