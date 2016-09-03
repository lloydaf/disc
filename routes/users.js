var express = require('express');
var router = express.Router();
var crypto = require('crypto');
/* GET users listing. */
router.get('/', function(req, res, next) {
	req.session.destroy(function(err) {
  		if(err) {
    		console.log(err);
  		}
		else {
			res.render('welcome');
		}
	});
	

});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/showres',function(req,res){
	var sess = req.session;
	sess.email = req.body.email;
	res.redirect('/disc/results');
});
router.post('/validate', function(req, res){
	var db = req.db;
	var sess = req.session;
	var email = req.body.username;
	var password = req.body.password;
	var pass_enc = crypto.createHash('md5').update(password).digest('hex');
	var userdata = db.get('userdata');
	userdata.findOne({ "email" : email },{ "data" : 1 },function(error,values){
		
			if(values.data.password == pass_enc){
				
				if(values.level == "user"){			
				sess.email = email;
				res.redirect('/disc/results');
				}
				else{
					sess.adm = email;
					var arr = [];
					var userarr = [];
					var curse = db.get('count').find();
					res.promise(curse.each(function(d)
							{
								arr.push(d);
							}).then(function(){
								var usercurse = userdata.find({"level":"user"});
								res.promise(usercurse.each(function(e){
									userarr.push(e);
								}).then(function(){
									res.render('dashboard',{ "datacount": arr, "datauser": userarr});

								}));
							})
					);
				}
			}
			else{
				res.send('Password Incorrect!');
			}
		
	});
});


router.post('/register', function(req, res){
	var sess = req.session;
	var db = req.db;
	sess.name = req.body.name;
	sess.email = req.body.email;
	var userdata = db.get('userdata');
	userdata.findOne({"email":sess.email},{},function(err,data){
		if(data) {
			res.send('Email address already registered! Click login to see your results!');
		}
		else {
			sess.password = "guest";
			var pass_enc = crypto.createHash('md5').update(sess.password).digest('hex');
			var data = {"email" : sess.email,
						"data" :{
							"name" : sess.name,
							"password" : pass_enc
						},
						"level" : "user"};
			userdata.insert(data,function(err,data){
				if(!err){
					res.redirect('/disc');
					}
				else {
					res.end(err);
				}
			});
		}
	});	
});

module.exports = router;