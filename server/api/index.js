const router = require('express').Router()

router.use('/events', require('./events'))
router.use('/groups', require('./groups'))
router.use('/users', require('./users'))
router.use('/notifications', require('./notifications'))
router.use('/friend', require('./friend'))

router.use(next => {
  const err = new Error('Not Found')
  err.status(404)
  next(err)
})

module.exports = router
