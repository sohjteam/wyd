const Sequelize = require('sequelize')
const db = require('../db')

const Notification = db.define('notification', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  clear: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: Sequelize.ENUM('Accepted', 'Rejected', 'Pending'),
    defaultValue: 'Pending'
  }
})

module.exports = Notification
