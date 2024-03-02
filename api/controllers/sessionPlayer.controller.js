const SessionPlayer = require('../models/sessionPlayer.model')
const { Op } = require('sequelize');

async function getAllSessionPlayers(req, res) {
	
	try {
		const sessionPlayers = await SessionPlayer.findAll()
		if (sessionPlayers) {
			return res.status(200).json(sessionPlayers)
		} else {
			return res.status(404).send('No SessionPlayers found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneSessionPlayer(req, res) {
	try {
		const sessionPlayer = await SessionPlayer.findByPk(req.params.id)
		if (sessionPlayer) {
			return res.status(200).json(sessionPlayer)
		} else {
			return res.status(404).send('SessionPlayer not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createSessionPlayer(req, res) {
	try {
		const sessionPlayer = await SessionPlayer.create(req.body)
		return res.status(200).json({ message: 'SessionPlayer created', sessionPlayer: sessionPlayer })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function addMyPlayerToSession(req, res) {
	try {
		const sessionPlayer = await SessionPlayer.create({
			userId: res.locals.user.id,
			sessionId: req.body.sessionId,
			character: req.body.character
		})
		return res.status(200).json({ message: 'SessionPlayer created', sessionPlayer: sessionPlayer })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateSessionPlayer(req, res) {
	try {
		const [sessionPlayerExist, sessionPlayer] = await SessionPlayer.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (sessionPlayerExist !== 0) {
			return res.status(200).json({ message: 'SessionPlayer updated', sessionPlayer: sessionPlayer })
		} else {
			return res.status(404).send('SessionPlayer not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteSessionPlayer(req, res) {
	try {
		const sessionPlayer = await SessionPlayer.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (sessionPlayer) {
			return res.status(200).json('SessionPlayer deleted')
		} else {
			return res.status(404).send('SessionPlayer not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getSessionPlayers(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const sessionPlayers = await SessionPlayer.findAll(
			{
				where: whereClause
			})
		
		if (sessionPlayers.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(sessionPlayers)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllSessionPlayers,
	getOneSessionPlayer,
	createSessionPlayer,
	updateSessionPlayer,
	deleteSessionPlayer,
	getSessionPlayers,
	addMyPlayerToSession
}
