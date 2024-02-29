const router = require('express').Router()

const { getAllThemes, getOneTheme, createTheme, updateTheme, deleteTheme, getThemes } = require('../controllers/theme.controller')

router.get('/find', getThemes)
router.get('/:id', getOneTheme)
router.get('/', getAllThemes)

router.post('/', createTheme)

router.patch('/:id', updateTheme)

router.delete('/:id', deleteTheme)

module.exports = router