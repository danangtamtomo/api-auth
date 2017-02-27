var models = require('../models')
var jwt = require('jsonwebtoken')
var auths = {}

auths.isAuth = function (req, res, next) {
  jwt.verify(req.headers.authentication, 'shhhhh', function (err, decoded) {
    if (err) {
      res.send({
        'status': err
      })
    } else {
      next()
    }
  })
}

auths.isAdmin = function (req, res, next) {
  jwt.verify(req.headers.authentication, 'shhhhh', function (err, decoded) {
    models.User.findOne({
      where: {
        email: decoded.user
      }
    }).then(function (user) {
      if (user.role === 'admin') {
        next()
      } else {
        res.send({
          status: 'You should be admin to do this action'
        })
      }
    })
  })
}

module.exports = auths
