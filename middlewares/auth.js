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

module.exports = auths
