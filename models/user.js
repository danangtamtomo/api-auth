'use strict'
const crypto = require('crypto')
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here

      }
    },
    hooks: {
      beforeCreate: function (user) {
        var salt = crypto.randomBytes(10).toString('hex')
        const password = user.password
        const hash = crypto.createHmac('sha256', password)
          .update(salt)
        user.password = hash.digest('hex')
        user.salt = salt
      }
    }
  })
  return User
}
