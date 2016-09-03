var express = require('express');
var router = express.Router();
var pageno=0;

/* GET home page. Displays the Welcome to DISC page*/
router.get('/', function(req, res, next) {
	var sess = req.session;
	pageno=0;
	++pageno;
	var db = req.db;
	//clearing map and count tables
	db.collection('map').drop();
	//initialising variables to 0
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
	//inserts response template to database
	var count = db.collection('count');
	count.insert({
		"email" : sess.email,
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
	res.render('index', { title: 'DISC', name: sess.name, email:sess.email, password:sess.password });
});
router.get('/page', function(req, res){
	if(pageno==29){//if analysis is complete
		res.render('complete');
	}
	else{	
		var db = req.db;
		var query = {};
		query["pageno"] = pageno.toString();
		db.collection('pagedata').findOne(query, function(err, values){ 
		//get pagedata and generate DISC page dynamically depending on where you are in the test	
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

router.post('/update', function(req, res){//update database with options and progress to next page in test
	var sess = req.session;	
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
		else{// insert into map
			var map = db.collection('map');
			map.insert({
				"pageno" : pagenum,
				"most" : most,
				"least" : least 
			}); //update count in count table
			var count = db.collection('count');
			switch(req.body.most){
				case "SQ" :
					count.update({"email" : sess.email },{
						$inc : {
							SQ_most : 1
						}

					});
					break;
				case "TRI" :
					count.update({"email" : sess.email },{
						$inc : {
							TRI_most : 1
						}

					});
					break;
				case "STAR" :
					count.update({"email" : sess.email },{
						$inc : {
							STAR_most : 1
						}

					});
					break;
				case "Z" :
					count.update({"email" : sess.email },{
						$inc : {
							Z_most : 1
						}

					});
					break;
				case "N" :
					count.update({"email" : sess.email },{
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
					count.update({"email" : sess.email },{
						$inc : {
							SQ_least : 1
						}

					});
					break;
				case "TRI" :
					count.update({"email" : sess.email },{
						$inc : {
							TRI_least : 1
						}

					});
					break;
				case "STAR" :
					count.update({"email" : sess.email },{
						$inc : {
							STAR_least : 1
						}

					});
					break;
				case "Z" :
					count.update({"email" : sess.email },{
						$inc : {
							Z_least : 1
						}

					});
					break;
				case "N" :
					count.update({"email" : sess.email },{
						$inc : {
							N_least : 1
						}

					});
					break;
				default :
					res.send('Error');

			}
			
			++pageno;
			res.redirect('/disc/page');
		}
	});
});

router.all('/results', function(req, res){//to see results	
	var db = req.db;
	var sess = req.session;
	var query = {"email" : sess.email };
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
		var Z = Z_most - Z_least;
		var TRI = TRI_most - TRI_least;
		var STAR = STAR_most - STAR_least;
		var SQ = SQ_most - SQ_least;
		var chart = db.collection('chart');//chart is a table to storing data plot chart in results page
		chart.findOne({ "D" : Z.toString() },{ "val" : 1 },function(errorD, dataD){
			chart.findOne({ "I" : SQ.toString() },{ "val" : 1 },function(errorI,dataI){
				chart.findOne({ "S" : TRI.toString() },{ "val" : 1 },function(errorS, dataS){
					chart.findOne({ "C" : STAR.toString() },{ "val" : 1 },function(errorC, dataC){
						var xD = 150, xI = 250, xS = 350, xC = 450;//plots graphs dynamically depending on value from count
						var yD = 550-(15*(dataD.val));
						var yI = 550-(15*(dataI.val));
						var yS = 550-(15*(dataS.val));
						var yC = 550-(15*(dataC.val));
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
									"N_least" : N_least,
									"xD" : xD,
									"yD" : yD,
									"xI" : xI,
									"yI" : yI,
									"xS" : xS,
									"yS" : yS,
									"xC" : xC,
									"yC" : yC,
									"D" : Z,
									"I" : SQ,
									"S" : TRI,
									"C" : STAR
						});
					});
				});
			});			
		});	
	});
});
module.exports = router;
