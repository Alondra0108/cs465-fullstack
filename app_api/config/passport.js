const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('User');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'The email address or password is incorrect.'
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));
