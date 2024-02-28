const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Theme = sequelize.define(
	'theme',
	{
		themeName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {timestamps: false}
)

module.exports = Theme