const router = require('express').Router()
const {User, Event, Group, Notification} = require('../db/models')

const isAuthenticated = (req, res, next) => {
  if (req.user.dataValues.id === Number(req.params.id)) {
    return next()
  }
  res.redirect('/')
}

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

//for searching for users with specific name
router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const data = await User.findById(userId)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/friends', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const friends = await User.findById(userId, {
      as: 'user',
      include: [
        {
          model: User,
          as: 'friend',
          attributes: ['firstName', 'lastName', 'image'],
          through: {attributes: []}
        }
      ]
    })
    res.json(friends)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/:id/events', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const events = await User.findById(userId, {
      include: [
        {
          model: Event,
          include: [Group]
        }
      ]
    })
    res.json(events)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/groups', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const groups = await User.findById(userId, {
      include: [
        {
          model: Group
        }
      ]
    })
    res.json(groups)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/notifications', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const notifs = await User.findById(userId, {
      include: [
        {
          model: Notification
        }
      ]
    })
    res.json(notifs)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) throw next()
    const updated = await user.update({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image
    })
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.id
    const data = await User.destroy({
      where: {id: userId}
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})
module.exports = router
