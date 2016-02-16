var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/', function (req, res, next) {
  res.json({ result : 'success'});
});