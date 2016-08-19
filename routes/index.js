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
			++pageno;
			res.redirect('/page');
		}
	});
});

router.get('/results', function(req, res, next){
	if(pageno<29){
		res.send('Error');
	}
	else{
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
		var map = db.collection('map');
		while(page<29){
			for(page = 0; page < 29; page++){
				query["pageno"] = page.toString();
				map.findOne(query, function(err, data){
					switch(data.most){
						case "SQ" :
							++SQ_most;
							break;
						case "TRI" :
							++TRI_most;
							break;
						case "STAR" :
							++STAR_most;
							break;
						case "Z" :
							++Z_most;
							break;
						case "N" :
							++N_most;
							break;
						default :
							res.send('Error');
					}
					switch(data.least){
						case "SQ" :
							++SQ_least;
							break;
						case "TRI" :
							++TRI_least;
							break;
						case "STAR" :
							++STAR_least;
							break;
						case "Z" :
							++Z_least;
							break;
						case "N" :
							++N_least;
							break;
						default :
							res.send('Error');
					}
					var count = db.collection('count');
					count.update({},{
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
					},{ upsert : true });
				});
			}
			var count = db.collection('count');
			count.findOne(function(err, data){
				res.render('results', {
					"SQ_most" : data.SQ_most,
					"TRI_most" : data.TRI_most,
					"STAR_most" : data.STAR_most,
					"Z_most" : data.Z_most,
					"N_most" : data.N_most,
					"SQ_least" : data.SQ_least,
					"TRI_least" : data.TRI_least,
					"STAR_least" : data.STAR_least,
					"Z_least" : data.Z_least,
					"N_least" : data.N_least
				});
			});
			
		}	
	}
});
module.exports = router;
