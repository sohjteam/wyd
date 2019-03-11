const User = require('./user')
const Group = require('./group')
const Event = require('./event')
const Notification = require('./notification')

Group.belongsToMany(User, {through: GroupUser})
User.belongsToMany(Group, {through: GroupUser})

Event.belongsTo(Group)
Group.hasMany(Event)

User.hasMany(User, {
  as: 'Friends',
  foreignKey: 'FriendId',
  through: 'Friend'
})

Notification.belongsTo(User)
User.hasMany(Notification)

module.exports = {
  User,
  Group,
  Event,
  Notification
}
