const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email, and password are required.'
    });
  }

  try {
    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();
    return res.status(200).json({ token: user.generateJwt() });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'That email address is already registered.' });
    }
    return res.status(400).json({ message: error.message });
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    return res.status(200).json({ token: user.generateJwt() });
  })(req, res, next);
};

module.exports = { register, login };
