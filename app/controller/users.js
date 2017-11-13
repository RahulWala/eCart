var mongoose = require('mongoose');
var express = require('express');

//express router //used to define route
var appRouter = express.Router();
var eCart = mongoose.model('User');
var responseGenerator = require('./../../libs/responseGenerator');

module.exports.controllerFunction = function(app){

	//All pages routing path
	appRouter.get('/index',function(req,res){
		res.render('index');
	});

	appRouter.get('/signup/screen',function(req,res){
		res.render('signup');
	});

	appRouter.get('/login/screen',function(req,res){
		res.render('login');
	});	

	appRouter.get('/cart/screen',function(req,res){
		res.render('cart');
	});

	appRouter.get('/product/screen',function(req,res){
		res.render('product');
	});

	appRouter.get('/error/screen',function(req,res){
		res.render('error');
	});

	//All functions
	appRouter.post('/signup',function(req,res){
		if(req.body.firstName != undefined && req.body.lastName != undefined && req.body.emailId != undefined && req.body.password != undefined){

			var newUser			= new eCart({
				userName		: 	req.body.firstName+''+req.body.lastName,
				firstName		: 	req.body.firstName,
				lastName		: 	req.body.lastName,
				emailId			: 	req.body.emailId,
				mobileNumber	: 	req.body.mobileNumber,
				password		: 	req.body.password
			});

			console.log("data addedd");
			newUser.save(function(error){
				if(error){
					console.log("error is here");
					// var myResponse = responseGenerator.generate(true,"Enter correct value",406,null);
					// console.log(error);
					// res.send(myResponse);
					res.render('error');
				}
				else{
					console.log("error in else");
					// var myResponse = responseGenerator.generate(false,"Successfully generated",200,newUser);
					// console.log(myResponse);
					// res.send(myResponse);
					res.render('login');
				}
			});//end newUser save
		}
		else{
			console.log("error in first else");
			res.render('error');
		}
	});

	appRouter.post('/login',function(req,res){
		eCart.findOne({$and:[{'emailId':req.body.emailId},{'password':req.body.password}]}).exec(function(err,foundUser){
			console.log(foundUser);
			if(err){
				var myResponse = responseGenerator.generate(true,"Serious error",404,null);
				res.send(myResponse);
			}
			else if(foundUser == null || foundUser == undefined || foundUser.emailId == undefined){
				var myResponse = responseGenerator.generate(true,"Check your Email Id and Password",404,null);
				res.send(myResponse);
			}
			else{
				var myResponse = responseGenerator.generate(false,"Successfully logged in",200,myResponse);
				// res.send(myResponse);
				res.render('product',{user:foundUser});
			}
		});
	});

	

	app.use('/users',appRouter);
}


