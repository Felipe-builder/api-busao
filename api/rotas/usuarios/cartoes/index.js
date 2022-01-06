const roteador = require('express').Router({ mergeParams: true})
const Tabela = require('./TabelaCartao')
const Cartao = require('./Cartao')

roteador.get('/', async (req, res) => {
    const cartoes = await Tabela.listar(req.params.idUsuario)
    res.send(
        JSON.stringify(cartoes)
    )
})

roteador.post('/', async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario
        const corpo = req.body
        const dados = Object.assign({}, corpo, { usuario: idUsuario })
        const cartao = new Cartao(dados)
        await cartao.criar()
        res.status(201)
        res.send(
            JSON.stringify(cartao)
        )
    } catch(erro) {
        res.status(400)
        res.send(
            JSON.stringify(erro)
        )
    }
})

module.exports = roteador