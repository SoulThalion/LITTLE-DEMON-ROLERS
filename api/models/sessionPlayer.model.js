const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const SessionPlayer = sequelize.define(
	'sessionPlayer',
	{
		id: {
			type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
			allowNull: false,
		},
		
		character: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
    },
    {timestamps: false}
)

module.exports = SessionPlayer