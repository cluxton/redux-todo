var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var config = require('./config');
var methodOverride = require('method-override');
var glob = require('glob');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');


module.exports = function(app, config) {
  
  //These variables are used by the handlebar templates to enable dev features
  app.locals.ENV = config.env;
  app.locals.ENV_DEVELOPMENT = config.env == 'development';
  app.locals.LIVERELOAD_ENABLED = config.livereload === true;
  app.locals.ANALYTICS_ENABLED = config.analytics === true;
  app.locals.LIVERELOAD_PORT = process.env.LIVERELOAD_PORT; 

  //express-handlebars - setup the view templating engine
  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');


  //helmet - sets some http headers for added security
  app.use(helmet());

  //body-parser (json) - makes the json payload available on req.body
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //cookie-parser - populates req.cookies with { <cookie-name>: <value> }  
  app.use(cookieParser());

  //Set the path for static resources
  app.use(express.static(config.root + '/public'));

  //method-override - Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride());

  //logging - use morgan for logging
  app.use(morgan('combined'))

  //setup the controllers
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  //Default route - sets the status to 404 not found if nothing has been matched
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  //If a route throws an error, display the full stacktrace (if the config is set)
  if(config.stacktrace === true){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }
  
  //In production, do not return the stack trace
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

}