const roteador = require('express').Router({ mergeParams: true})
const Tabela = require('./TabelaCartao')
const Cartao = require('./Cartao')
const Serializador = require('../../../Serializador').SerialidadorCartao

roteador.get('/', async (req, res) => {
    const cartoes = await Tabela.listar(req.usuario.id)
    const serializador = new Serializador(
        res.getHeader('Content-Type')
    )
    res.send(
        serializador.serializar(cartoes)
    )
})

roteador.post('/', async (req, res, proximo) => {
    try {
        const idUsuario = req.usuario.id
        const corpo = req.body
        const dados = Object.assign({}, corpo, { usuario: idUsuario })
        const cartao = new Cartao(dados)
        await cartao.criar()
        const serializador = new Serializador(
            res.getHeader('Content-Type')
        )
        res.status(201)
        res.send(
            serializador.serializar(cartao)
        )
    } catch(erro) {
        proximo(erro)
    }
})

roteador.delete('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            usuario: req.usuario.id
        }
        
        const cartao = new Cartao(dados)
        await cartao.apagar()
        res.status(204)
        res.end()
    } catch(erro) {
        proximo(erro)
    }
})

roteador.get('/:id', async (req, res, proximo) => {
    try {
        const dados = {
            id: req.params.id,
            usuario: req.usuario.id
        }

        const cartao = new Cartao(dados)
        await cartao.carregarPorId()
        const serializador = new Serializador(
            res.getHeader('Content-Type'),
            ['numero', 'dtCriacao', 'dtAtualizacao', 'version']
        )

        res.send(
            serializador.serializar(cartao)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/:id', async(req, res, proximo) => {
    try {
        const dados = Object.assign(
            {},
            req.body
            ,
            {
                id: req.params.id,
                usuario: req.usuario.id
             }
        )
        const cartao = new Cartao(dados)
        await cartao.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador