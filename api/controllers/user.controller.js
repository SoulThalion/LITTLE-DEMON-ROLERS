const User = require('../models/user.model')
const Game = require('../models/game.model')
const { Op } = require('sequelize');

const bcrypt = require('bcrypt')


const getAllUsers = async (req, res) => {
	console.log(res.locals.user.role)
	if (res.locals.user.role === "admin") {
		try {
			const users = await User.findAll({
				where: req.query,
				attributes: {
					exclude: ['password']
				}
			})
			return res.status(200).json(users)
		} catch (error) {
			console.log(error)
		}
	}

	else {
		try {
			const users = await User.findAll({
				where: req.query,
				attributes: {
					exclude: ['password', 'email', 'userName']
				}
			})
			return res.status(200).json(users)
		} catch (error) {
			console.log(error)
		}
	}

	/*try {
			const users = await User.findAll({
				where: req.query,
				attributes: {
					exclude: ['password']
				}
			})
			return res.status(200).json(users)
		} catch (error) {
			console.log(error)
		}*/
}

const getOneUser = async (req, res) => {

	if (res.locals.user.role === "admin") {
		try {
			const user = await User.findByPk(req.params.id, {
				attributes: {
					exclude: ['password']
				}
			})

			if (!user) {
				return res.status(404).send('User not found')
			}

			return res.status(200).json(user)

		} catch (error) {
			console.log(error)
		}
	} else {
		try {
			const user = await User.findByPk(req.params.id, {
				attributes: {
					exclude: ['password', 'email', 'userName']
				}
			})

			if (!user) {
				return res.status(404).send('User not found')
			}

			return res.status(200).json(user)

		} catch (error) {
			console.log(error)
		}
	}
}

const getMyUser = async (req, res) => {

	try {
		const user = await User.findByPk(res.locals.user.id, {
			attributes: {
				exclude: ['password']
			}
		})

		if (!user) {
			return res.status(404).send('User not found')
		}

		return res.status(200).json(user)

	} catch (error) {
		console.log(error)
	}
}


const createUser = async (req, res) => {
	try {

		const saltRounds = bcrypt.genSaltSync(parseInt(10))
		const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
		req.body.password = hashedPassword

		const newUser = await User.create({
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
			nickName: req.body.nickName,
		})

		res.status(200).json(newUser)
	} catch (error) {
		console.log(error)
	}
}


const updateUser = async (req, res) => {
	try {
		const [user] = await User.update(req.body, {
			where: {
				id: req.params.id
			}
		})
		if (!user) {
			return res.status(404).send('User not found')
		}
		return res.status(200).json({ message: 'User updated' })

	} catch (error) {
		console.log(error)
	}
}
const deleteUser = async (req, res) => {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.id
			}
		})
		if (!user) {
			return res.status(404).send('User not found')
		}

		return res.status(200).json({ message: 'User deleted' })

	} catch (error) {
		console.log(error)
	}
}

const getAllFavorites = async (req, res) => {
	try {

		const userId = res.locals.user.id

		const user = await User.findByPk(userId)

		const favs = await user.getFavorite({
	joinTableAttributes: []
	})

		res.status(200).json({
			favs
		})


	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: '>> Cannot get favs.',
		});
	}
};

const createFavorite = async (req, res) => {

	try {

		const gameId = req.params.gameId

		const user = res.locals.user

		const game = await Game.findByPk(gameId)

		console.log(game)

		const fav = await user.addFavorite(game)

		if (fav) {
			res.status(200).json({
				message: '!!Juego añadido a tus favs',
				fav
			})
		}

	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: '>> Cannot add fav.',
		});
	}
};

const deleteFavorite = async (req, res) => {
	try {
		const gameId = req.params.gameId

		const user = res.locals.user

		const game = await Game.findByPk(gameId)

		const fav = await user.removeFavorite(game)

		if (fav) {
			res.status(200).json({
				message: '!!Juego borrado de tus favs',
				fav
			})
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
};


module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
	getMyUser,
	getAllFavorites,
	createFavorite,
	deleteFavorite

}
