const Modelo = require('./ModeloTabelaCartao')

module.exports = {
    listar(idUsuario) {
        return Modelo.findAll({
            where: {
                usuario: idUsuario
            }
        })
    }
}