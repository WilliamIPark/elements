//Require Express
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var elementData = require('./app/element-data/elements.json');

var data = JSON.parse(JSON.stringify(elementData));



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

//Splash page where user can enter a name for themselves.
app.get('/', function(req,res){
  res.render('open-page');
});

//A hidden page that "registers" a user by setting a cookie, then redirects them
// to the elements list page.
app.post('/register', function(req, res) {
  //If a name exists
  if(req.body.firstname != "") {
    res.cookie('firstname', req.body.firstname);
    res.cookie('points', 0);
  }
  res.redirect('/learn');
});

//Elements List page
app.get('/learn', function(req, res){
  //If there is a profile available in the cookie, send that data to the page.
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

//Individual element page. Data gets passed in to the page from a json file.
app.get('/learn/:element', function(req,res){
  res.render('details', {data: data[req.params.element]});
});

//Start server
app.listen(80, function () {
  console.log('Server running on port 80.');
});
