'use strict';

var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

const indexHandler = function (req, res, next) {
    res.render('index', {
      title: 'Todo List'
    });
};

router.get('/', indexHandler);
router.get('/todo*', indexHandler);

