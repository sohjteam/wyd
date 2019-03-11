const User = require('./user')
const Group = require('./group')
const Event = require('./event')
const Notification = require('./notification')

Group.belongsToMany(User, {through: 'groupUsers'})
User.belongsToMany(Group, {through: 'groupUsers'})

Event.belongsTo(Group)
Group.hasMany(Event)

Event.belongsToMany(User, {through: 'eventUsers'})
User.belongsToMany(Event, {through: 'eventUsers'})

User.belongsToMany(User, {
  as: 'friend',
  through: 'friends'
})

Notification.belongsTo(User)
User.hasMany(Notification)

module.exports = {
  User,
  Group,
  Event,
  Notification
}
