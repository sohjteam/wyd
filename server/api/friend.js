const router = require('express').Router()
const {User} = require('../db/models')
const db = require('../db')
const Friend = db.models.friends

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

const isAuthenticated = (req, res, next) => {
  if (req.user.dataValues.id === Number(req.params.id)) {
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

router.post('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const friendship = await Friend.create({
      userId: req.body.userId,
      friendId: req.body.friendId
    })
    const friendship2 = await Friend.create({
      userId: req.body.friendId,
      friendId: req.body.userId
    })
    const friend = await User.findAll({
      where: {
        id: req.body.friendId
      },
      attributes: ['id', 'firstName', 'lastName', 'image']
    })
    res.send(friend[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    await Friend.destroy({
      where: {
        userId: req.body.userId,
        friendId: req.body.friendId
      }
    })
    await Friend.destroy({
      where: {
        userId: req.body.friendId,
        friendId: req.body.userId
      }
    })
    const friend = await User.findAll({
      where: {
        id: req.body.friendId
      },
      attributes: ['id', 'firstName', 'lastName', 'image']
    })
    res.send(friend[0])
  } catch (error) {
    next(error)
  }
})

module.exports = router
