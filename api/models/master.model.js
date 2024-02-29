const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Master = sequelize.define(
	'master',
	{
		id: {
			type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
			allowNull: false,
		},
		
    },
    {timestamps: false}
)

module.exports = Master