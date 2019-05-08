const router = require('express').Router()
const {Notification} = require('../db/models')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const notif = await Notification.create(req.body)
    res.json(notif)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const notif = await Notification.findById(req.params.id)
    if (req.user.dataValues.id === Number(notif.userId)) {
      const data = await Notification.destroy({where: {id: req.params.id}})
      res.json(data)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
