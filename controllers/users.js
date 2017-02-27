var User = require('../models').User
var jwt = require('jsonwebtoken')
var crypto = require('crypto')

var Users = {}

Users.getUsers = function (req, res) {
  User.findAll().then(function (users) {
    res.json(users)
  })
}

Users.getUser = function (req, res) {
  User.findById(req.params.id).then(function (user) {
    res.json(user)
  })
}

Users.addUser = function (req, res) {
  jwt.verify(req.headers.authentication, 'shhhhh', function (err, decoded) {
    User.findOne({
      where: {
        email: decoded.user
      }
    }).then(function (user) {
      if (user.role === 'admin') {
        User.create(req.body).then(function (user) {
          res.json(user)
        })
      } else {
        res.send({
          status: 'You dont have any privilege to create new user'
        })
      }
    })
  })
}

Users.deleteUser = function (req, res) {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (status) {
    res.status(200).send({
      'status': status,
      'message': `The data with id ${req.params.id} has been deleted`
    })
  })
}

Users.updateUser = function (req, res) {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(function (status) {
    res.status(200).send({
      'status': status,
      'message': `The data with id ${req.params.id} has been updated`
    })
  })
}

module.exports = Users
