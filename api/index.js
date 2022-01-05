const express = require('express')
const app = express()
const config = require('config')
const bodyParser = require('body-parser')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

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
    
    res.status(statusCode)
    res.send(
        JSON.stringify({
            mensagem: erro.message,
            id: erro.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))