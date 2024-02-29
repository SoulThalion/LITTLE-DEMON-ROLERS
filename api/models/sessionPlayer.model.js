const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const SessionPlayer = sequelize.define(
	'sessionPlayer',
	{
		character: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
    },
    {timestamps: false}
)

module.exports = SessionPlayer