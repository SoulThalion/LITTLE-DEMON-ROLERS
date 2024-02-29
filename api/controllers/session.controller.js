const Session = require('../models/session.model')
const { Op } = require('sequelize');

async function getAllSessions(req, res) {
	
	try {
		const sessions = await Session.findAll()
		if (sessions) {
			return res.status(200).json(sessions)
		} else {
			return res.status(404).send('No sessions found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneSession(req, res) {
	try {
		const session = await Session.findByPk(req.params.id)
		if (session) {
			return res.status(200).json(session)
		} else {
			return res.status(404).send('Session not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createSession(req, res) {
	try {
		const session = await Session.create(req.body)
		return res.status(200).json({ message: 'Session created', session: session })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateSession(req, res) {
	try {
		const [sessionExist, session] = await Session.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (sessionExist !== 0) {
			return res.status(200).json({ message: 'Session updated', session: session })
		} else {
			return res.status(404).send('Session not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteSession(req, res) {
	try {
		const session = await Session.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (session) {
			return res.status(200).json('Session deleted')
		} else {
			return res.status(404).send('Session not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getSessions(req, res) {

	const queryParams = req.query;
	const whereClause = {};
	try {

		for (const key in queryParams) {
			whereClause[key] = { [Op.like]: `%${queryParams[key]}%` }
		};
	
		
		const sessions = await Session.findAll(
			{
				where: whereClause
			})
		
		if (sessions.length === 0) {
			return res.status(200).json([])
		} else {
			return res.status(200).json(sessions)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


module.exports = {
	getAllSessions,
	getOneSession,
	createSession,
	updateSession,
	deleteSession,
	getSessions
}
