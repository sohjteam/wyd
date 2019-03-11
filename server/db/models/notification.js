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
    type: Sequelize.BOOLEAN
  }
})

module.exports = Notification
