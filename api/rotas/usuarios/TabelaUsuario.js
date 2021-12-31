const Modelo = require('./ModeloTabelaUsuario')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(usuario) {
        return Modelo.create(usuario)
    },
    async pegarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('usuario não encontrado')
        }

        return encontrado
    }
}