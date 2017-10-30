var express = require('express');
var router = express.Router();
var passport = require('passport');

var ballotsRanked = require('../db/ballotsRanked');

router.get('/', function(req, res) {
  res.render('index', { 
      user: req.user,
      ballotsRanked: ballotsRanked.ballotsRanked,
      rankedResults: ballotsRanked.tallyScores(ballotsRanked.ballotsRankedSubmitted)  
    });
});

router.get('/login', function(req, res){
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', { user: req.user });
  }
});

router.get('/register', function(req, res){
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('register', { user: req.user });
  }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  res.render('profile', { user: req.user });
});


module.exports = router;
