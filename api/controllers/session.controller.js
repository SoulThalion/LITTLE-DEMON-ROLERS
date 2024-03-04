const Session = require('../models/session.model')
const Master = require('../models/master.model')
const SessionPlayer = require('../models/sessionPlayer.model')
const User = require('../models/user.model')
const Game = require('../models/game.model')
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

async function getAllMySessions(req, res) {

	const master = await Master.findOne({
		where: {
			userId: res.locals.user.id
		}
	})

	const idMaster = master.dataValues.id

	try {
		const sessions = await Session.findAll({
			where: {
				masterId: idMaster
			}
		})
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
		const session = await Session.findByPk(req.params.id, {
			include: [
				{
					model: Game,
					attributes: ['title', 'about', 'system']
				}
			]
		})
		
		if (session) {

			const master = session.masterId

			const coincidencia = await Master.findOne({
				where: {
					id: master,
					userId: res.locals.user.id
				}
			})

			if (coincidencia) {
				try {
					const players =  await session.getUsers({ 
						attributes: ['nickName'],
						joinTableAttributes: ['character']
					});
					return res.status(200).json({session: session, players: players})
				} catch (error) {
					return res.status(500).send(error.message)
				}
			} else {
				return res.status(200).json(session)
			}
		} else {
			return res.status(404).send('Session not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createSession(req, res) {

	if (res.locals.user.role === 'admin') {
		try {
			const session = await Session.create(req.body)
			return res.status(200).json({ message: 'Session created', session: session })
		} catch (error) {
			res.status(500).send(error.message)
		}
	} else {
		try {
			const master = await Master.findOne({
				where: {
					userId: res.locals.user.id,
					gameId: req.body.gameId
				}
			});

			console.log(master.dataValues.id)

			if (master) {
				const session = await Session.create({
					type: req.body.type,
					date: req.body.date,
					location: req.body.location,
					adress: req.body.adress,
					gameId: req.body.gameId,
					masterId: master.dataValues.id
				})
				return res.status(200).json({ message: 'Session created', session: session })
			} else {
				return res.status(404).send('No eres Master de este juego')
			}
		} catch (error) {
			res.status(500).send(error.message)
		}
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
	if (res.locals.user.role === 'admin') {
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
	} else {

		const session = await Session.findByPk(req.params.id)

		if (session) {

			const master = session.masterId

			const coincidencia = await Master.findOne({
				where: {
					id: master,
					userId: res.locals.user.id
				}
			})

			if (coincidencia) {
				try {
					const session = await Session.destroy({
						where: {
							id: req.params.id,
						},
					})
					return res.status(200).json('Session deleted')
				} catch (error) {
					return res.status(500).send(error.message)
				}
			} else {
				return res.status(404).send('You are not Master of this Session')
			}
		} else {
			return res.status(404).send('Session not found')
		}

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
	getSessions,
	getAllMySessions
}
