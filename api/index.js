const express = require('express')
const app = express()
const config = require('config')
const bodyParser = require('body-parser')
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

const roteador = require('./rotas/usuarios')
app.use('/api/usuarios', roteador)

app.use((erro, req, res, proximo) => {
    let statusCode = 400 
    if(erro instanceof NaoEncontrado) {
        statusCode = 404
    } else {
        statusCode = 400
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