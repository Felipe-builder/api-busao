const roteador = require('express').Router({ mergeParams: true})
const Tabela = require('./TabelaCartao')

roteador.get('/', async (req, res) => {
    const cartoes = await Tabela.listar(req.params.idUsuario)
    res.send(
        JSON.stringify(cartoes)
    )
})

module.exports = roteador