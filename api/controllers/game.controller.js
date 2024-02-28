const Game = require('../models/game.model')
const { Op } = require('sequelize');

async function getAllUsers(req, res) {
	
	try {
		const users = await User.findAll()
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneUser(req, res) {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) {
			return res.status(200).json(user)
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createUser(req, res) {
	try {
		const user = await User.create(req.body)
		return res.status(200).json({ message: 'User created', user: user })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateUser(req, res) {
	try {
		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (userExist !== 0) {
			return res.status(200).json({ message: 'User updated', user: user })
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (user) {
			return res.status(200).json('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getUsers(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const users = await User.findAll(
			{
				where: whereClause
			})
		
		if (users.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(users)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
	getUsers
}
