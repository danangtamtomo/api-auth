var express = require('express')
var router = express.Router()
var users = require('../controllers/users')

/* GET users listing. */
router.get('/', users.getUsers)

router.get('/:id', users.getUser)

router.post('/', users.addUser)

router.delete('/:id', users.deleteUser)

router.put('/:id', users.updateUser)

module.exports = router
