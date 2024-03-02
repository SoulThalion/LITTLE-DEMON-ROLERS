const router = require('express').Router()

const { getAllItems, getOneItem, createItem, updateItem, deleteItem, getItems } = require('../controllers/inventory.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/find', checkAuth, isAdmin, getItems)
router.get('/:id', checkAuth, isAdmin, getOneItem)
router.get('/', checkAuth, isAdmin, getAllItems)

router.post('/', checkAuth, isAdmin, createItem)

router.patch('/:id', checkAuth, isAdmin, updateItem)

router.delete('/:id', checkAuth, isAdmin, deleteItem)

module.exports = router