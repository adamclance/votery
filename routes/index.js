var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Bootstrap database
var DB = require('../db/index');

console.log('users', DB.users.userData);

router.get('/', function (req, res) {
	res.render('index', {
		user: req.user,
		rankedResults: DB.ballotsRanked.getAllElectionResults() || [],
		ballotsRanked: DB.ballotsRanked.ballotsRanked || []
	});
});

router.get('/login', function (req, res) {
	if (req.user) {
		res.redirect('/');
	} else {
		res.render('login', { user: req.user });
	}
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
	res.redirect('/');
});

router.get('/logout', function (req, res) {
	req.logOut();
	req.session.destroy(function (err) {
		res.redirect('/');
	});
});

router.post('/register', function (req, res) {
	DB.users.create(req.body);

	req.login(newUser, function (err) {
		if (!err) {
			res.redirect('/');
		} else {
			//handle error
		}
	})
});

router.get('/account', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function (req, res) {
	res.render('account', {
		user: req.user,
		ballots: DB.ballotsRanked.getSubmittedByUser(req.user.id)
	});
});


router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function (req, res) {
	var ballot = DB.ballotsRanked.getBallotById(req.params.id);

	res.render('voteRanked', {
		user: req.user,
		ballot: ballot,
		ballotId: req.params.id
	});
});

router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn('/?login=true'), function (req, res) {
	DB.ballotsRanked.submitBallot(req.body, res);
});

module.exports = router;
