const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

// Passport.js local strategy
passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'admin' && password === 'password') {
    return done(null, { id: 1, name: 'admin' });
  } else {
    return done(null, false, { message: 'Invalid credentials' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id: 1, name: 'admin' }); // Mock user
});

// Authentication route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/todos',
  failureRedirect: '/login',
}));

// Middleware to check if authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

router.use(isAuthenticated);

module.exports = router;
