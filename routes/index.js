var express = require('express')
var router = express.Router()
var apis = require('../controllers/apis')
var auth = require('../middlewares/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/api/signup', apis.signUp)

router.post('/api/signin', apis.signIn)

module.exports = router
