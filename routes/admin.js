var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	res.render('enter',{ pagenum : '1' });
});

router.get('/chart_enter',function(req, res, next){
    res.render('chart_enter',{"value" : 1 });
});

router.post('/update_chart', function(req, res){
    var db = req.db;
    var chart = db.collection('chart');
    var chart_details = {
        "val" : req.body.val,
        "D" : req.body.D,
        "I" : req.body.I,
        "S" : req.body.S,
        "C" : req.body.C
    };
    chart.insert(chart_details, function(err, data){
        if(err){
            res.send("Sorry, error!");
        }
        else{
            if(req.body.val<28){
                res.render('chart_enter', { "value" : ++req.body.val });
            }
            else{
                res.send("Complete!");
            }
        }
    });
});

/* POST to Add User Service */
router.post('/enterpage', function(req, res){

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var row1Text = req.body.row1text;
    var row1Most = req.body.row1most;
    var row1Least = req.body.row1least;
    var row2Text = req.body.row2text;
    var row2Most = req.body.row2most;
    var row2Least = req.body.row2least;
    var row3Text = req.body.row3text;
    var row3Most = req.body.row3most;
    var row3Least = req.body.row3least;
    var row4Text = req.body.row4text;
    var row4Most = req.body.row4most;
    var row4Least = req.body.row4least;
    var pageNo = req.body.pageno;


    // Set our collection
    var collection = db.collection('pagedata');
    // Submit to the DB
    collection.insert({
        "pageno" : pageNo,
        "data" : {
        	"row1text" : row1Text,
        	"row1most" : row1Most,
        	"row1least" : row1Least,
        	"row2text" : row2Text,
        	"row2most" : row2Most,
        	"row2least" : row2Least,
        	"row3text" : row3Text,
        	"row3most" : row3Most,
        	"row3least" : row3Least,
        	"row4text" : row4Text,
        	"row4most" : row4Most,
        	"row4least" : row4Least
        }
    }, function (err, doc) {
        
    });
    res.render('enter', { pagenum : ++pageNo });
});
module.exports = router;