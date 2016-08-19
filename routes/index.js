var express = require('express');
var router = express.Router();
var pageno=0;

/* GET home page. */
router.get('/', function(req, res, next) {
	pageno=0;
	++pageno;
	var db = req.db;
	db.collection('map').drop();
	res.render('index', { title: 'DISC' });
});
router.get('/page', function(req, res){
	if(pageno==29){
		res.render('complete');
	}
	else{	
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
	}
});

router.post('/update', function(req, res){
	var most = req.body.most;
	var least = req.body.least;
	var pagenum = req.body.pagenum;
	var db = req.db;
	var query = {};
	query["pageno"] = pagenum.toString();
	collection = db.collection('map');
	collection.findOne(query, function(err, values){
		if(values){
			res.send('Error!');
		}
		else{
			var map = db.collection('map');
			map.insert({
				"pageno" : pagenum,
				"most" : most,
				"least" : least 
			});
			++pageno;
			res.redirect('/page');
		}
	});
});

module.exports = router;
