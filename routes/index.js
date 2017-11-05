const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const users = require('../controllers/users');
const ballotsRanked = require('../controllers/ballotsRanked');
const ballotsSimple = require('../controllers/ballotsSimple');
const ballotsPickTwo = require('../controllers/balotsPickTwo');
const ballots = require('../controllers/ballots');
const ballotsSubmitted = require('../controllers/ballotsSubmitted');
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

router.post('/login', passport.authenticate('local', { failureRedirect: '/?loginFailed=true' }), (req, res) => {
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
		user: req.user
	});
});

router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	const ballot = util.getBallotById(req.params.id, ballotsRanked.ballotsRanked);
	const alreadyVoted = !!util.getSubmittedByUser(req.user.id, ballotsRanked.ballotsRankedSubmitted).length;

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

router.get('/vote/simple/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	const ballot = util.getBallotById(req.params.id, ballotsSimple.ballotsSimple);
	const alreadyVoted = !!util.getSubmittedByUser(req.user.id, ballotsSimple.ballotsSimpleSubmitted).length;

	res.render('voteSimple', {
		user: req.user,
		ballot,
		ballotId: req.params.id,
		alreadyVoted
	});
});

router.post('/vote/simple', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	ballotsSimple.submitBallot(req.body, req.user.id, res);
});

router.get('/vote/pick-two/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	const ballot = util.getBallotById(req.params.id, ballotsPickTwo.ballotsPickTwo);
	const alreadyVoted = !!util.getSubmittedByUser(req.user.id, ballotsPickTwo.ballotsPickTwoSubmitted).length;

	res.render('votePickTwo', {
		user: req.user,
		ballot,
		ballotId: req.params.id,
		alreadyVoted
	});
});

router.post('/vote/pick-two', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	ballotsPickTwo.submitBallot(req.body, req.user.id, res);
});

router.get('/ballots', (req, res) => {
	res.render('ballots', {
		user: req.user,
		ballots: ballots.getAllBallots()
	});
});

router.get('/ballots/submitted/:type/:id', (req, res) => {
	res.render('ballotsSubmitted', {
		user: req.user,
		ballots: ballotsSubmitted.getSubmitted(req)
	});
});

module.exports = router;
