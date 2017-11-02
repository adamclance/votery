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
  DB.users.create(req.body);

  req.login(newUser, function (err) {
    if ( ! err ){
        res.redirect('/');
    } else {
        //handle error
    }
})
});

router.get('/profile', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function(req, res) {
  res.render('profile', { user: req.user });
});


router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function(req, res) {
  var ballot = DB.ballotsRanked.getBallotById(req.params.id);

  res.render('voteRanked', { 
    user: req.user,
    ballot: ballot,
    ballotId: req.params.id
  });
});

router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function(req, res) {
  var ballotId = +req.body.id;
  var choices = req.body.choices;
  var userId = req.user.id;

  if (DB.ballotsRanked.checkDuplicates(userId, ballotId)) {
    res.send({msg: 'You may only vote 1 time.'});
  } else {
    DB.ballotsRanked.ballotsRankedSubmitted.push({ userId, ballotId, choices });    
  }
});

module.exports = router;
