'use strict';

var express = require('express'),
  	router = express.Router(),
  	TodoList = require('../model/TodoList');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/todolist/:id', function (req, res, next) {
	TodoList.get(req.params.id)
		.then(function(todoList) {

			if (todoList === null) {
				res.status(404)
				res.json({"message" : "todoList could not be found"});
				return;
			} 

			res.status(200)
			res.json(todoList);
		})
		.catch(next);
});

router.post('/todolist', function(req,res,next) {
	let todoList = new TodoList();

	todoList.save()
		.then(function(reply) {
			res.status(201)
			res.json(todoList)
		})
		.catch(next);
});

router.put('/todolist/:id', function(req,res,next) {
	TodoList.get(req.params.id)
	  	.then(function(todoList) {
	  		if (todoList === null) {
	  			res.status(404)
	  			res.json({"message" : "todoList could not be found"});
	  			return;
	  		} 

	  		todoList.update(req.body)
	  			.then(function(reply) {
	  				res.status(200)
	  				res.json({"message" : "updated"});
	  				return;
	  			})
	  			.catch(next)

	  		return null;
	  	})
	  	.catch(next)
});

router.post('/todolist/:id/action', function(req,res,next) {
	TodoList.get(req.params.id)
		.then(function(todoList) {
			return todoList.saveChange(req.body)
		});

	UpdateService.processUpdates()
});
