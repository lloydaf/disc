var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DISC' });
});
router.get('/page1',function(req, res, next){
	res.render('page1');
});

module.exports = router;
