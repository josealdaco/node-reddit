require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cookieParser()); // Add this after you initialize express.


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);
app.use(express.static('public'));


// Middleware
app.use(expressValidator());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// setDB
require('./data/reddit-db');
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);




app.get('/', (req, res) => {
    res.redirect('/posts/index')
})





app.listen(3000, () => {
  console.log('Reddit Listening on event');
});

module.exports = app;
