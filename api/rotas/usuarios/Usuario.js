const TabelaUsuario = require('./TabelaUsuario')

class Usuario {
    constructor({ id, usuario, email, senha, dtCriacao, dtAtualizacao, versao}) {
        this.id = id
        this.usuario = usuario
        this.email = email
        this.senha = senha
        this.dtCriacao = dtCriacao
        this.dtAtualizacao = dtAtualizacao
        this.versao = versao
    }

    async criar() {
        this.validar()
        const resultado = await TabelaUsuario.inserir({
            usuario: this.usuario,
            email: this.email,
            senha: this.senha
        })
        this.id = resultado.id
        this.dtCriacao = resultado.dtCriacao
        this.dtAtualizacao = resultado.dtAtualizacao
        this.versao = resultado.versao
    }

    async carregarPorId() {
        const encontrado = await TabelaUsuario.pegarPorId(this.id)
        this.usuario = encontrado.usuario
        this.email = encontrado.email
        this.senha = encontrado.senha
        this.dtCriacao = encontrado.dtCriacao
        this.dtAtualizacao = encontrado.dtAtualizacao
        this.versao = encontrado.versao 
    }

    async atualizar() {
        await TabelaUsuario.pegarPorId(this.id)
        const dadosParaAtualizar = {}
        const campos = ['usuario', 'email', 'senha']

        campos.forEach((campo) => {
            const valor = this[campo]
            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Dados não fornecidos para atualização!')
        }

        await TabelaUsuario.atualizar(this.id, dadosParaAtualizar)
    }

    remover(){
        return TabelaUsuario.remover(this.id)
    }

    validar() {
        const campos = ['empresa', 'email', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]

            if(typeof valor !== 'string' || valor.length === 0) {
                throw new Error(`O campo '${campo}' está inválido!`)
            }
        })
    }

}

module.exports = Usuario