var express = require('express')
var router = express.Router()
var users = require('../controllers/users')
var auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', auth.isAuth, auth.isAdmin, users.getUsers)

router.get('/:id', auth.isAuth, users.getUser)

router.post('/', auth.isAuth, auth.isAdmin, users.addUser)

router.delete('/:id', auth.isAuth, auth.isAdmin, users.deleteUser)

router.put('/:id', auth.isAuth, users.updateUser)

module.exports = router
