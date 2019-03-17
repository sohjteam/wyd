const router = require('express').Router()
const {Event, Group, User} = require('../db/models')

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
          attributes: ['firstName', 'lastName', 'image'],
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

router.post('/', async (req, res, next) => {
  try {
    const newGroup = await Group.create(req.body)
    res.json(newGroup)
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
