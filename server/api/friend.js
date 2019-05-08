const router = require('express').Router()
const {User} = require('../db/models')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

router.get('/:username', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        username: req.params.username
      },
      attributes: ['id', 'firstName', 'lastName', 'image']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})
module.exports = router
