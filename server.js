//Require Express
var express = require('express');
var app = express();
var path = require('path');

var data = {};

//Set view engine as pug/jade
app.set('views', './app/views')
app.set('view engine', 'pug');

//Serve the static assets from the public/ directory.
app.use(express.static(path.join(__dirname, 'public/')));

///////////
//Routing//
///////////

//Index
app.get('/', function(req,res){
  res.render('open-page', data);
});

//Start server
app.listen(80, function () {
  console.log('Server running on port 80.');
});
