const ValorNaoSuportado = require("./erros/ValorNaoSuportado")
const jsontoxml = require('jsontoxml')

class Serializador {
    json(dados){
        return JSON.stringify(dados)
    }

    xml(dados){
        let tag = this.tagSingular
        if (Array.isArray(dados)) {
            tag = this.tagPlural
            dados = dados.map((item) => {
                return ({[this.tagSingular] : item})
            })
        }
        return jsontoxml({[tag] : dados}) 
    }

    serializar(dados) {
        dados = this.filtrar(dados)

        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        if(this.contentType === 'application/xml') {
            return this.xml(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }
    
    filtrar(dados) {
        if (Array.isArray(dados)) {
            dados = dados.map((item) => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }

    filtrarObjeto(dados) {
        const novoObjeto = {}
        this.camposPublicos.forEach((campo) => {
            if (dados.hasOwnProperty(campo)){
                novoObjeto[campo] = dados[campo]
            }
        })
        return novoObjeto
    }
}

class SerializadorUsuario extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'usuario'
        ].concat(camposExtras || [])
        this.tagSingular = 'usuario'
        this.tagPlural = 'usuarios'
    }
}

class SerialidadorCartao extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'id',
            'nome',
            'status',
            'tipo'
        ].concat(camposExtras || [])
        this.tagSingular = 'cartao'
        this.tagPlural = 'cartoes'
    }
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = [
            'mensagem',
            'id'
        ].concat(camposExtras || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorUsuario: SerializadorUsuario,
    SerialidadorCartao: SerialidadorCartao,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}