var express = require('express');
var Sequelize = require('Sequelize');
var webServer = express.createServer();
webServer.set('view engine', 'jade');
webServer.use(express.bodyParser());

var appPort = process.env['app_port'] || 3000;
var sequelize = new Sequelize(null, null, null, {storage: 'database.sqlite', dialect: 'sqlite'});

var Quote = sequelize.define('quote', {
  description: Sequelize.TEXT
});

webServer.get('/', function(req, res){
  Quote.all().success(function(data){
    res.render('quote', {locals : {'data' : data}});
  });

});

webServer.get('/add', function(req, res){
  res.render('add');
});

webServer.post('/add', function(req, res){
  var quote = Quote.build({
    description: req.param('quote')
  });
  quote.save().success(function(){
    console.log("quote created!")
  }).error(function(error){
    console.log(error);
  });
  res.redirect('/');
});

webServer.listen(appPort);