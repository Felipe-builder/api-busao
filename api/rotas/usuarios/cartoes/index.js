const roteador = require('express').Router()

roteador.get('/', async (req, res) => {
    res.send(
        JSON.stringify([])
    )
})

module.exports = roteador