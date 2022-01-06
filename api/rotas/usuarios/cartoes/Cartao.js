const Tabela = require('./TabelaCartao')

class Cartao {
    constructor({id, numero, nome, status, tipo, usuario, dtCriacao, dtAtualizacao, versao}){
        this.id = id
        this.numero = numero
        this.nome = nome
        this.status = status
        this.tipo = tipo
        this.usuario = usuario
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar() {
        const resultado = await Tabela.inserir({
            numero: this.numero,
            nome: this.nome,
            status: this.status,
            tipo: this.tipo,
            usuario: this.usuario
        })

        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
        
    }
}

module.exports = Cartao