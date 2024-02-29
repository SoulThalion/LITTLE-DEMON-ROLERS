const router = require('express').Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller')

router.get('/:id', getOneUser)
router.get('/', getAllUsers)

router.post('/', createUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router