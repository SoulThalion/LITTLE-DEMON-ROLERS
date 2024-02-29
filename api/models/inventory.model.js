const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Inventory = sequelize.define(
	'inventory',
	{
		item: {
			type: DataTypes.STRING,
			allowNull: false,
		},

        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

		
    },
    {timestamps: false}
)

module.exports = Inventory