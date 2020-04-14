const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');


const express = require('express');

const app = express();
require('./controllers/posts.js')(app);
// Set db

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());



// Middleware
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.get('/', (req, res) => {
    const name = "Jose";
    res.render('home', { name })
})





app.listen(3000, () => {
  console.log('Reddit Listening on event');
});
