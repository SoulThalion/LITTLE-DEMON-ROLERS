const router = require('express').Router()

const { getAllItems, getOneItem, createItem, updateItem, deleteItem, getItems } = require('../controllers/inventory.controller')

router.get('/find', getItems)
router.get('/:id', getOneItem)
router.get('/', getAllItems)

router.post('/', createItem)

router.put('/:id', updateItem)

router.delete('/:id', deleteItem)

module.exports = router