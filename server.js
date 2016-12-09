//Require Express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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

//Cookies
app.use(cookieParser());

///////////
//Routing//
///////////

//Index
app.get('/', function(req,res){
  res.render('open-page');
});

app.get('/elements', function(req, res){
  //If there is a profile, send in the cookie details:
  if(req.cookies.firstname != null) {
      res.render('new-elements', {
        firstname: req.cookies.firstname,
        points: req.cookies.points
      });
  } else {
    //Otherwise send nothing.
    res.render('new-elements', null);
  }
});

app.post('/register', function(req, res) {
  //If a name exists
  if(req.body.firstname != "") {
    res.cookie('firstname', req.body.firstname);
    res.cookie('points', 0);
  }
  res.redirect('/elements');
});

//Start server
app.listen(80, function () {
  console.log('Server running on port 80.');
});
