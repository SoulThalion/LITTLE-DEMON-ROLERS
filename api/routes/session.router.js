const router = require('express').Router()

const { getAllSessions, getOneSession, createSession, updateSession, deleteSession, getSessions } = require('../controllers/session.controller')

router.get('/find', getSessions)
router.get('/:id', getOneSession)
router.get('/', getAllSessions)

router.post('/', createSession)

router.patch('/:id', updateSession)

router.delete('/:id', deleteSession)

module.exports = router