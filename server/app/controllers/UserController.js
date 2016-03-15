'use strict';

var express = require('express'),
  router = express.Router(),
  User = require('../model/User');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/users/:id', function (req, res, next) {
	User.get(req.params.id)
		.then(function(user) {

			if (user === null) {
				res.status(404)
				res.json({"message" : "User could not be found"});
				return;
			} 

			res.status(200)
			res.json(user);
		})
		.catch(next);
});

router.post('/users', function(req,res,next) {
	let user = new User();

	user.save()
		.then(function(reply) {
			res.status(201)
			res.json(user)
		})
		.catch(next);
});

router.put('/users:id', function(req,res,next) {
	User.get(req.params.id)
	  	.then(function(user) {

	  		if (user === null) {
	  			res.status(404)
	  			res.json({"message" : "User could not be found"});
	  			return;
	  		} 

	  		res.status(200)
	  		res.json(user);
	  	})
	  	.catch(next)
});