// Notes

// http methods
/*
            In our Database     In http
  - Create      INSERT          post
  - Read        SELECT          get
  - Update      UPDATE          put/patch
  - Destroy     DELETE          delete
*/

// HTTP is stateless

// MVC = model view controllers - separation of concerns
// resources you're working with - dishes, users, comments, views

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const logger = require('./middlewares/logger');
const session = require('express-session');
const methodOverride = require('./middlewares/method_override');
// const expressLayouts = require('express-ejs-layouts');
const setCurrentUser = require('./middlewares/set_current_user');
const viewHelpers = require('./middlewares/view_helpers');
const dishController = require('./controllers/dish_controller');
const sessionController = require('./controllers/session_controller');

app.set('view engine', 'ejs');

app.use(logger);

// parses the raw request body and turns it into an object accessible at req.body
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use(methodOverride);

// app.use(expressLayouts);

app.use(
  session({
    secret: process.env.SECRET_KEY || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

// to get currentUser to be available in all my views
app.use(setCurrentUser);

app.use(viewHelpers);

app.get('/login', (req, res) => {
  res.render('login');
});
app.use('/sessions', sessionController);

app.use('/dishes', dishController);


app.listen(port, () => {
    console.log(`the server is listening on port ${port}`);
});