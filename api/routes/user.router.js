const router = require('express').Router()

const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, getMyUser, createFavorite, getAllFavorites, deleteFavorite } = require('../controllers/user.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/profile', checkAuth, getMyUser)
router.get('/favorite', checkAuth, getAllFavorites)
router.get('/:id', checkAuth, getOneUser)
router.get('/', checkAuth, getAllUsers)

router.post('/favorite/:gameId', checkAuth, createFavorite);
router.post('/', checkAuth, isAdmin, createUser)

router.patch('/:id', checkAuth, isAdmin, updateUser)

router.delete('/favorite/:gameId', checkAuth, deleteFavorite)
router.delete('/:id', checkAuth, isAdmin, deleteUser)


module.exports = router