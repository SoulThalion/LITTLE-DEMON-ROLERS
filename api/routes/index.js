const router = require('express').Router()

router.use('/user', require('./user.router'))
router.use('/game', require('./game.router'))
router.use('/theme', require('./theme.router'))
router.use('/auth', require('./auth.router'))
router.use('/inventory', require('./inventory.router'))


module.exports = router