const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');

const users = require('../controllers/users');
const ballotsRanked = require('../controllers/ballotsRanked');

router.get('/', (req, res) => {
	res.render('index', {
		user: req.user,
		rankedResults: ballotsRanked.getAllElectionResults() || [],
		ballotsRanked: ballotsRanked.ballotsRanked || []
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
		ballots: ballotsRanked.getSubmittedByUser(req.user.id)
	});
});


router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
	const ballot = ballotsRanked.getBallotById(req.params.id);
	const alreadyVoted = !!ballotsRanked.getSubmittedByUser(req.user.id);

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
