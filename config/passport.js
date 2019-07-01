let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

passport.use('signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  (email, password, done) => {
    db.User.findOne({ where: { email } }).then(user => {
      if (!user) {
        return done(null, false, { message: 'Invalid email.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid password.' });
      }
      return done(null, user);
    });
  }));

module.exports = passport;
