const router = require('express').Router()
const {Event, Group, User} = require('../db/models')
const db = require('../db')
const GroupUsers = db.models.groupUsers

router.get('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id
    const data = await Group.findById(groupId, {
      attributes: ['name', 'image']
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/members', async (req, res, next) => {
  try {
    const groupId = req.params.id
    const members = await Group.findById(groupId, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'image'],
          through: {attributes: []}
        }
      ]
    })
    res.json(members)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/events', async (req, res, next) => {
  try {
    const groupId = req.params.id
    const events = await Group.findById(groupId, {
      include: [
        {
          model: Event
        }
      ]
    })
    res.json(events)
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    await GroupUsers.create({
      userId: req.body.userId,
      groupId: req.body.groupId
    })

    const group = await Group.findAll({
      where: {
        id: req.body.groupId
      }
    })
    res.send(group[0])
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newGroup = await Group.create({
      name: req.body.newGroup.name,
      password: req.body.newGroup.password,
      image: req.body.newGroup.image
    })

    await GroupUsers.create({
      userId: req.body.userId,
      groupId: newGroup.id
    })

    res.send(newGroup)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id
    const group = await Group.findById(groupId)
    if (!group) throw next()
    const updated = await group.update(req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const groupId = req.params.id
    const data = await Group.destroy({
      where: {id: groupId}
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
