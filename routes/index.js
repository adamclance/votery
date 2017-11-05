const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const users = require('../controllers/users');
const ballotsRanked = require('../controllers/ballotsRanked');
const ballotsSimple = require('../controllers/ballotsSimple');
const ballotsPickTwo = require('../controllers/balotsPickTwo');
const util = require('../lib/util');

router.get('/', (req, res) => {
	
	res.render('index', {
		user: req.user,
		rankedResults: ballotsRanked.getAllElectionResults() || [],
		simpleResults: ballotsSimple.getAllElectionResults() || [],
		pickTwoResults: ballotsPickTwo.getAllElectionResults() || [],		
		ballotsRanked: ballotsRanked.ballotsRanked || [],
		ballotsSimple: ballotsSimple.ballotsSimple || [],
		ballotsPickTwo: ballotsPickTwo.ballotsPickTwo || []
	});
});

router.get('/login', (req, res) => {
	if (req.user) {
		res.redirect('/');
	} else {
		res.render('login', { user: req.user });
	}
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
	res.redirect('/');
});

router.get('/logout', (req, res) => {
	req.logOut();
	req.session.destroy((err) => {
		res.redirect('/');
	});
});

router.post('/register', (req, res) => {
	users.create(req.body);

	req.login(newUser, (err) => {
		if (!err) {
			res.redirect('/');
		} else {
			//handle error
		}
	})
});

router.get('/account', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	res.render('account', {
		user: req.user,
		ballots: util.getSubmittedByUser(req.user.id, ballotsRanked.ballotsRankedSubmitted)
	});
});

router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	const ballot = util.getBallotById(req.params.id, ballotsRanked.ballotsRanked);
	const alreadyVoted = !!util.getSubmittedByUser(req.user.id, ballotsRanked.ballotsRankedSubmitted);

	res.render('voteRanked', {
		user: req.user,
		ballot,
		ballotId: req.params.id,
		alreadyVoted
	});
});

router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	ballotsRanked.submitBallot(req.body, req.user.id, res);
});

module.exports = router;
