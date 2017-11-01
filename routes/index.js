var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

var ballotsRanked = require('../db/ballotsRanked');


router.get('/', function(req, res) {
  res.render('index', { 
      user: req.user,
      rankedResults: ballotsRanked.getAllElectionResults() || [],       
      ballotsRanked: ballotsRanked.ballotsRanked || []
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


router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  var ballot = ballotsRanked.getBallotById(req.params.id);

  res.render('voteRanked', { 
    user: req.user,
    ballot: ballot,
    ballotId: req.params.id
  });
});

router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn(), function(req, res){
  var ballotId = req.body.id;
  var choices = req.body.choices;
  var userId = req.user.id;

  ballotsRanked.ballotsRankedSubmitted.push({ userId, ballotId: +ballotId, choices });
});

module.exports = router;
