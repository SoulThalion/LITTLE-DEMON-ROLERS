const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Game = sequelize.define(
	'game',
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		about: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		system: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {timestamps: false}
)

module.exports = Game