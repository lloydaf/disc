var express = require('express');
var router = express.Router();
var pageno=0;

/* GET home page. */
router.get('/', function(req, res, next) {
	pageno=0;
	++pageno;
	var db = req.db;
	db.collection('map').drop();
	db.collection('count').drop();
	var SQ_most = 0;
	var TRI_most = 0;
	var STAR_most = 0;
	var Z_most = 0;
	var N_most = 0;
	var SQ_least = 0;
	var TRI_least = 0;
	var STAR_least = 0;
	var Z_least = 0;
	var N_least = 0;
	var db = req.db;
	var page = 0;
	var query = {};
	var count = db.collection('count');
	count.insert({
		"value" : "1",
		"SQ_most" : SQ_most,
		"TRI_most" : TRI_most,
		"STAR_most" : STAR_most,
		"Z_most" : Z_most,
		"N_most" : N_most,
		"SQ_least" : SQ_least,
		"TRI_least" : TRI_least,
		"STAR_least" : STAR_least,
		"Z_least" : Z_least,
		"N_least" : N_least
		});
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
	var collection = db.collection('map');
	collection.findOne(query, function(err, values){
		if(values){
			res.send("Error!");
		}
		else{
			var map = db.collection('map');
			map.insert({
				"pageno" : pagenum,
				"most" : most,
				"least" : least 
			});
			var count = db.collection('count');
			switch(req.body.most){
				case "SQ" :
					count.update({},{
						$inc : {
							SQ_most : 1
						}

					});
					break;
				case "TRI" :
					count.update({},{
						$inc : {
							TRI_most : 1
						}

					});
					break;
				case "STAR" :
					count.update({},{
						$inc : {
							STAR_most : 1
						}

					});
					break;
				case "Z" :
					count.update({},{
						$inc : {
							Z_most : 1
						}

					});
					break;
				case "N" :
					count.update({},{
						$inc : {
							N_most : 1
						}

					});
					break;
				default :
					res.send('Error');

			}
			switch(req.body.least){
				case "SQ" :
					count.update({},{
						$inc : {
							SQ_least : 1
						}

					});
					break;
				case "TRI" :
					count.update({},{
						$inc : {
							TRI_least : 1
						}

					});
					break;
				case "STAR" :
					count.update({},{
						$inc : {
							STAR_least : 1
						}

					});
					break;
				case "Z" :
					count.update({},{
						$inc : {
							Z_least : 1
						}

					});
					break;
				case "N" :
					count.update({},{
						$inc : {
							N_least : 1
						}

					});
					break;
				default :
					res.send('Error');

			}
			
			++pageno;
			res.redirect('/page');
		}
	});
});

router.get('/results', function(req, res){
	if(pageno < 29){
		res.send('Error');
	}
	else{
		var db = req.db;
		var query = {"value" : "1"};
		db.collection('count').findOne(query, function(err, values){
				var SQ_most = values.SQ_most;
				var TRI_most = values.TRI_most;
				var STAR_most = values.STAR_most;
				var Z_most = values.Z_most;
				var N_most = values.N_most;
				var SQ_least = values.SQ_least;
				var TRI_least = values.TRI_least;
				var STAR_least = values.STAR_least;
				var Z_least = values.Z_least;
				var N_least = values.N_least;
			res.render('results', {
				"SQ_most" : SQ_most,
				"TRI_most" : TRI_most,
				"STAR_most" : STAR_most,
				"Z_most" : Z_most,
				"N_most" : N_most,
				"SQ_least" : SQ_least,
				"TRI_least" : TRI_least,
				"STAR_least" : STAR_least,
				"Z_least" : Z_least,
				"N_least" : N_least
			});
		});
	}
});
module.exports = router;
