const Tabela = require('./TabelaCartao')
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos')

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

    validar() {
        if(typeof this.numero !== 'string' || this.numero.length === 0){
            throw new Error('O campo titulo está inválido')
        }

        if(typeof this.nome !== 'string' || this.nome.length === 0){
            throw new Error('O campo nome está inválido')
        }
        
        if (['true', 'false'].includes(this.status.toLowerCase())) {
            this.status = this.status.toLowerCase() == 'true' ? true : false
        }
        
        if (typeof this.status !== 'boolean') {
            throw new Error('O campo status está inválido')
        }

    }

    async criar() {
        this.validar()
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

    async carregarPorId(){
        const cartao = await Tabela.carregarPorId(this.id, this.usuario)
        this.numero = cartao.numero
        this.nome = cartao.nome
        this.status = cartao.status
        this.tipo = cartao.tipo
        this.usuario = cartao.usuario
        this.dtCriacao = cartao.dtCriacao
        this.dtAtualizacao = cartao.dtAtualizacao
        this.versao = cartao.versao
    }

    apagar() {
        return Tabela.remover(this.id, this.usuario)
    }

    async atualizar() {
        const dadosParaAtualizar = {}
        if(typeof this.numero === 'string' && this.numero.length > 0){
            dadosParaAtualizar.numero = this.numero
        }

        if(typeof this.nome === 'string' && this.nome.length > 0){
            dadosParaAtualizar.nome = this.nome        
        }
        
        const regex = /[0-9]/;
        if(typeof this.status === 'string' && !regex.test(this.status)) {
            if (['true', 'false'].includes(this.status.toLowerCase())) {
                this.status = this.status.toLowerCase() == 'true' ? true : false
            }
        }
        
        if (typeof this.status === 'boolean') {
            dadosParaAtualizar.status = this.status
        }

        if (typeof this.tipo === 'string') {
            dadosParaAtualizar.tipo = this.tipo
        }
        
        if(Object.keys(dadosParaAtualizar).length === 0){
            throw new DadosNaoFornecidos()
        }

        return Tabela.atualizar(
            {
                id: this.id,
                usuario: this.usuario
            },
            dadosParaAtualizar
        )
    }
}

module.exports = Cartao