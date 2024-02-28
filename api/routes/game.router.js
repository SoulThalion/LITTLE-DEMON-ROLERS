const router = require('express').Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, getUsers } = require('../controllers/game.controller')

router.get('/find', getUsers)
router.get('/:id', getOneUser)
router.get('/', getAllUsers)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router