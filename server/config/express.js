var path = require('path'),
  express = require('express'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  TwitterRouter = require('../routes/tweet.server.routes');

module.exports.init = function () {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());


 /* Serving static files */
  app.use('/', express.static('client'));


 
  /* Go to homepage for all routes not specified */
  app.use(express.static('../../client/index.html'));

 /* Route to make request to the twitter API */
  app.use('/api/twitter', TwitterRouter);

  
  return app;
};  