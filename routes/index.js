var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Bootstrap database
var DB = require('../db/index');

console.log('users', DB.users.userData);

router.get('/', function(req, res) {
  res.render('index', { 
      user: req.user,
      rankedResults: DB.ballotsRanked.getAllElectionResults() || [],       
      ballotsRanked: DB.ballotsRanked.ballotsRanked || []
    });
});

router.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', { user: req.user });
  }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/register', function(req, res) {
  let userData = DB.users.userData;

  const newUser = { 
    id: userData[userData.length - 1].id + 1, 
    username: req.body.username, 
    password: req.body.password, 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    residence: {
      state: req.body.state,
      city: req.body.city,
      zip: req.body.zip
    },
    ballots: {
      ranked: [],
      simpleMajority: [],
      pickTwo: []
    }
  }

  userData.push(newUser);

  req.login(newUser, function (err) {
    if ( ! err ){
        res.redirect('/');
    } else {
        //handle error
    }
})
});

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  res.render('profile', { user: req.user });
});


router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  var ballot = DB.ballotsRanked.getBallotById(req.params.id);

  res.render('voteRanked', { 
    user: req.user,
    ballot: ballot,
    ballotId: req.params.id
  });
});

router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
  var ballotId = req.body.id;
  var choices = req.body.choices;
  var userId = req.user.id;

  DB.ballotsRanked.ballotsRankedSubmitted.push({ userId, ballotId: +ballotId, choices });
});

module.exports = router;
