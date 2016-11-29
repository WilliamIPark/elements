//Require Express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var data = {
  username: null,
  points: 0
};

//Set view engine as pug/jade
app.set('views', './app/views')
app.set('view engine', 'pug');

//Serve the static assets from the public/ directory.
app.use(express.static(path.join(__dirname, 'public/')));

//Body parser set up, so form data can be read.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

///////////
//Routing//
///////////

//Index
app.get('/', function(req,res){
  res.render('open-page', data);
});

app.get('/elements', function(req, res){
  res.render('elements', null);
});

app.post('/register', function(req, res) {
  //If a name exists
  if(req.body.firstname != "") {
    
  }
});

app.post('/elements', function(req, res) {
  if(req.body.firstname != "") {
    console.log(req.body.firstname);
    data.username = req.body.firstname;
  } else {
    console.log("Empty name.");
    res.redirect('/elements');
  }
  res.render('elements', data);
});

//Start server
app.listen(80, function () {
  console.log('Server running on port 80.');
});
