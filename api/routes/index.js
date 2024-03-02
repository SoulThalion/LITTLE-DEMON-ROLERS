const router = require('express').Router()

router.use('/user', require('./user.router'))
router.use('/game', require('./game.router'))
router.use('/theme', require('./theme.router'))
router.use('/auth', require('./auth.router'))
router.use('/inventory', require('./inventory.router'))
router.use('/session', require('./session.router'))
router.use('/master', require('./master.router'))
router.use('/sessionPlayer', require('./sessionPlayer.router'))

module.exports = router