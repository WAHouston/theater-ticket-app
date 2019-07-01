// Add dependencies
require('dotenv').config();
const express = require("express");
const exphbs = require('express-handlebars');
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const passport = require('./config/passport');
const db = require("./models");

// Set variables
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(passport.initialize());

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials'
  })
);

app.set('view engine', 'handlebars');

// Routes
app.use(routes);

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({msg:"Something broke!"});
});

// Connect to database and start Express Server
db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT: ${PORT}`);
    });
  })
  .catch(err => console.log(err));
