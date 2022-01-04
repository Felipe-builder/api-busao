const roteador = require('express').Router()
const TabelaUsuario = require('./TabelaUsuario')
const Usuario = require('./Usuario')

roteador.get('/', async (req, res) => {
    const resultados = await TabelaUsuario.listar()
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res) => {
    try {
        const dadosRecebidos = req.body;
        const usuario = new Usuario(dadosRecebidos)
        await usuario.criar()
        res.status(201)
        res.send(
            JSON.stringify(usuario)
        )
    }catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.get('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({ id: id })
        await usuario.carregarPorId()
        res.send(
            JSON.stringify(usuario)
        )
    } catch(erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const usuario = new Usuario(dados)
        await usuario.atualizar()
        res.status(204)
        res.end()
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.delete('/:idUsuario', async (req, res) => {
    try {
        const id = req.params.idUsuario
        const usuario = new Usuario({id: id})
        await usuario.carregarPorId()
        await usuario.remover()
        res.status(204)
        res.end()
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador