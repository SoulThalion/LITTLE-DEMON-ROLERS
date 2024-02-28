const router = require('express').Router()

router.use('/user', require('./user.router'))
router.use('/game', require('./game.router'))
router.use('/game', require('./theme.router'))
router.use('/auth', require('./auth.router'))


module.exports = router