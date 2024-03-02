const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
	'user',
	{
		userName: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		nickName: {
            type: DataTypes.STRING(20),
            /*allowNull: false,
			unique: true*/
        },

		avatar: {
            type: DataTypes.ENUM('wizard', 'paladin', 'warrior', 'rogue', 'cleric', 'druid', 'bard', 'hunter'),
			allowNull: false,
			defaultValue: 'wizard'
        },
		email: {
            type: DataTypes.STRING(40),
            //allowNull: false,
			//unique: true,
			validate: {
				isEmail: true
			}
        },
		role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
			defaultValue: 'user'
        },
		password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
		level: {
            type: DataTypes.INTEGER,
            allowNull: false,
			defaultValue: 0
        },
    },
	{	
		timestamps: false,
		indexes: [
			{
				unique: true,
				allowNull: false,
				fields: ['nickName']
			},

			{
				unique: true,
				allowNull: false,
				fields: ['email']
			}
		]
	},
)

module.exports = User