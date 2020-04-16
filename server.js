const express = require('express');
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const app = express();


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!



// Middleware
app.use(expressValidator());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// setDB
require('./data/reddit-db');
require('./controllers/posts.js')(app);

app.get('/', (req, res) => {
    res.redirect('/posts/index')
})





app.listen(3000, () => {
  console.log('Reddit Listening on event');
});

module.exports = app;
