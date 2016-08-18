var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/validate', function(req, res){
	res.send('Validation page goes here!');
});

router.get('/register', function(req, res, next){
	res.render('register');
});

router.post('/register', function(req, res){
	res.send("Registration message here");
});

module.exports = router;
