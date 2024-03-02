const router = require('express').Router()

const { getAllThemes, getOneTheme, createTheme, updateTheme, deleteTheme, getThemes } = require('../controllers/theme.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/find', getThemes)
router.get('/:id', getOneTheme)
router.get('/', getAllThemes)

router.post('/', checkAuth, isAdmin, createTheme)

router.patch('/:id', checkAuth, isAdmin, updateTheme)

router.delete('/:id', checkAuth, isAdmin, deleteTheme)

module.exports = router