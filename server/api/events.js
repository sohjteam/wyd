const router = require('express').Router()
const {Event, Group, User} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const eventId = req.params.id
    const data = await Event.findById(eventId)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/attendees', async (req, res, next) => {
  try {
    const eventId = req.params.id
    const attendees = await Event.findById(eventId, {
      include: [
        {
          model: User
        }
      ]
    })
    res.json(attendees)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/group', async (req, res, next) => {
  try {
    const eventId = req.params.id
    const groupsAttending = await Event.findById(eventId, {
      include: [
        {
          model: Group,
          attributes: ['name']
        }
      ]
    })
    res.json(groupsAttending)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body)
    res.json(newEvent)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const eventId = req.params.id
    let event = await Event.findById(eventId)
    if (!event) throw next()
    let updated = await event.update(req.body)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const eventId = req.params.id
    const data = await Event.destroy({
      where: {id: eventId}
    })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
