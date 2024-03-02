const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
	'user',
	
	/*{userName: sequelize.STRING}, {indexes:[{allowNull:false, fields: ['userName']}]},

	{nickName: sequelize.STRING(20)}, {indexes:[{unique:true, allowNull:false, fields: ['nickName']}]},

	{avatar: sequelize.ENUM('wizard', 'paladin', 'warrior', 'rogue', 'cleric', 'druid', 'bard', 'hunter')}, {indexes:[{allowNull:false, default: 'wizard', fields: ['nickName']}]},
	
	{email: sequelize.STRING(40), validate: {isEmail: true}}, {indexes:[{unique:true, allowNull:false, fields: ['email']}]},

	{role: sequelize.ENUM('user', 'admin')}, {indexes:[{allowNull:false, default: 'user', fields: ['role']}]},

	{password: sequelize.STRING()}, {indexes:[{allowNull:false, fields: ['password']}]},

	{level: sequelize.INTEGER()}, {indexes:[{allowNull:false, default: 0, fields: ['level']}]},
	
	)*/
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