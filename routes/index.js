var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DISC' });
});
var pageno=0;
router.get('/page', function(req, res){
	++pageno;
	var db = req.db;
	var query = {};
	query["pageno"] = pageno.toString();
	db.collection('pagedata').findOne(query, function(err, values){
	var locals = {
		"pagenum" : pageno,
		"row1text" : values.data.row1text,
		"row1most" : values.data.row1most,
		"row1least" : values.data.row1least,
		"row2text" : values.data.row2text,
		"row2most" : values.data.row2most,
		"row2least" : values.data.row2least,
		"row3text" : values.data.row3text,
		"row3most" : values.data.row3most,
		"row3least" : values.data.row3least,
		"row4text" : values.data.row4text,
		"row4most" : values.data.row4most,
		"row4least" : values.data.row4least
	};	
	res.render('page', locals);
	});

});

module.exports = router;
