const router = require('express').Router()

router.use('/user', require('./user.router'))
router.use('/game', require('./game.router'))
router.use('/game', require('./theme.router'))

module.exports = router