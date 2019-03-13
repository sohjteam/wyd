const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Group

Group.prototype.correctPassword = function(candidatePwd) {
  return Group.encryptPassword(candidatePwd, this.salt()) === this.password()
}

Group.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Group.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

const setSaltAndPassword = group => {
  if (group.changed('password')) {
    group.salt = Group.generateSalt()
    group.password = Group.encryptPassword(group.password(), group.salt())
  }
}

Group.beforeCreate(setSaltAndPassword)
Group.beforeUpdate(setSaltAndPassword)
