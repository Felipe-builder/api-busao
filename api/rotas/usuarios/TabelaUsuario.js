const Modelo = require('./ModeloTabelaUsuario')

module.exports = {
    listar() {
        return Modelo.findAll()
    }
}