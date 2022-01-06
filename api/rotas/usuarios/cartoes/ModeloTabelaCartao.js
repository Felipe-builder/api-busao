const Sequelize = require('sequelize')
const instancia = require('../../../banco-de-dados')

const colunas = {
    numero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    tipo: {
        type: Sequelize.ENUM('comum', 'estudante', 'trabalhador'),
        allowNull: false
    },
    usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../ModeloTabelaUsuario'),
            key: 'id'
        }
    }

}

const opcoes = {
    freezeTableName: true,
    tableName: 'cartoes',
    timestamps: true,
    createdAt: 'dtCriacao',
    updatedAt: 'dtAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('cartao', colunas, opcoes)