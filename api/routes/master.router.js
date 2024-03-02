const router = require('express').Router()

const { getAllMasters, getOneMaster, createMaster, updateMaster, deleteMaster, getMasters } = require('../controllers/master.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/find', checkAuth, getMasters)
router.get('/:id', checkAuth, getOneMaster)
router.get('/', checkAuth, getAllMasters)

router.post('/', checkAuth, isAdmin, createMaster)

router.patch('/:id', checkAuth, isAdmin, updateMaster)

router.delete('/:id', checkAuth, isAdmin, deleteMaster)

module.exports = router