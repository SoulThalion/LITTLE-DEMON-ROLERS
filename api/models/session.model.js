const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Session = sequelize.define(
	'session',
	{
		type: {
			type: DataTypes.ENUM( 'oneShot', 'campain'),
			allowNull: false,
		},
		date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
		location: {
            type: DataTypes.ENUM('in', 'out'),
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {timestamps: false}
)

module.exports = Session