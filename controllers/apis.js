var User = require('../models').User
var jwt = require('jsonwebtoken')
var crypto = require('crypto')

var Apis = {}

Apis.signUp = function (req, res) {
  User.create(req.body).then(function (user) {
    res.send({
      status: `User with email ${user.email} has been created.`
    })
  })
}

Apis.signIn = function (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    var salt = user.salt
    const password = req.body.password
    const hash = crypto.createHmac('sha256', password)
      .update(salt)

    if (user.password === hash.digest('hex')) {
      var token = jwt.sign({ user: user.email }, 'shhhhh')
      res.send({
        status: 'Login success',
        authentication: token
      })
    } else {
      res.json({
        status: 'Wrong Password'
      })
    }
  }).catch(function () {
    res.json({
      status: 'There is no account with email : ' + req.body.email
    })
  })
}

module.exports = Apis
