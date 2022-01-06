const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'usuario',
    timestamps: true,
    createdAt: 'dtCriacao',
    updatedAt: 'dtAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('usuario', colunas, opcoes)