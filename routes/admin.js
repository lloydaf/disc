var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('enter',{ pagenum : '1' });
});
router.post('/enterpage', function(req, res, next){
	res.render('enter');
});

module.exports = router;