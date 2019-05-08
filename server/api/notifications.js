const router = require('express').Router()
const {Notification} = require('../db/models')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

router.post('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const notif = await Notification.create(req.body)
    res.json(notif)
  } catch (error) {
    next(error)
  }
})

module.exports = router
