const express = require('express')
const app = express()
const config = require('config')
const bodyParser = require('body-parser')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

app.use(bodyParser.json())

app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept')

    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406)
        res.end()
        return
    }

    res.setHeader('Content-Type', formatoRequisitado)
    proximo()
})

const roteador = require('./rotas/usuarios')
app.use('/api/usuarios', roteador)

app.use((erro, req, res, proximo) => {
    let statusCode = 400 

    if(erro instanceof NaoEncontrado) {
        statusCode = 404
    }

    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        statusCode = 400
    }

    if (erro instanceof ValorNaoSuportado) {
        statusCode = 406
    }
    
    const serializador = new SerializadorErro(
        res.getHeader('Content-Type')
    )

    res.status(statusCode)
    res.send(
        serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))