const roteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

module.exports = roteador