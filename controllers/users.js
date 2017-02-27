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

Users.addUser = function (req, res) {}

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
