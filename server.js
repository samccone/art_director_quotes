var express = require('express');
var stylus = require('stylus');
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
    res.render('index', {locals : {'quotes' : data}});
  });

});



webServer.get('/quotes/new', function(req, res){
  res.render('quotes/new');
});

webServer.get('/quotes', function(req, res){
  Quote.all().success(function(data){
    res.render('quotes', {locals : {quotes : data}});
  })
});

webServer.get('/quotes/:id', function(req, res){
  var id = req.params.id;
  Quote.find({ where : {id : id}}).success(function(data){
    res.render('quotes', {locals : {quotes : data}});
  });
});

webServer.get('/quotes/edit/:id', function(req, res){
  var id = req.params.id;
  Quote.find({ where : {id : id}}).success(function(data){
    res.render('quotes/edit', {locals : {quote : data}});
  });
});

webServer.post('/quotes/edit/:id', function(req, res){
  var id = req.params.id;
  Quote.find({ where : {id : id}}).success(function(data){
    if(req.param('delete')) {
      data.destroy();
    } else {
      data.description = req.param('description');
      data.save();
    }
    res.redirect('/');
  });
});

webServer.post('/quotes/new', function(req, res){
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