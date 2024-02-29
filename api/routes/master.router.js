const router = require('express').Router()

const { getAllMasters, getOneMaster, createMaster, updateMaster, deleteMaster, getMasters } = require('../controllers/master.controller')

router.get('/find', getMasters)
router.get('/:id', getOneMaster)
router.get('/', getAllMasters)

router.post('/', createMaster)

router.patch('/:id', updateMaster)

router.delete('/:id', deleteMaster)

module.exports = router