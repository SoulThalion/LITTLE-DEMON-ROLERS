const Game = require('../models/game.model')
const { Op } = require('sequelize');

async function getAllGames(req, res) {
	
	try {
		const games = await User.findAll()
		if (games) {
			return res.status(200).json(games)
		} else {
			return res.status(404).send('No games found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneGame(req, res) {
	try {
		const game = await Game.findByPk(req.params.id)
		if (game) {
			return res.status(200).json(game)
		} else {
			return res.status(404).send('Game not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createGame(req, res) {
	try {
		const game = await Game.create(req.body)
		return res.status(200).json({ message: 'Game created', game: game })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateGame(req, res) {
	try {
		const [gameExist, game] = await Game.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (gameExist !== 0) {
			return res.status(200).json({ message: 'Game updated', game: game })
		} else {
			return res.status(404).send('Game not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteGame(req, res) {
	try {
		const game = await Game.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (game) {
			return res.status(200).json('Game deleted')
		} else {
			return res.status(404).send('Game not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getGames(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const games = await User.findAll(
			{
				where: whereClause
			})
		
		if (games.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(games)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllGames,
	getOneGame,
	createGame,
	updateGame,
	deleteGame,
	getGames
}
