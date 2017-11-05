const ballotsRanked = require('../controllers/ballotsRanked');
const ballotsSimple = require('../controllers/ballotsSimple');
const ballotsPickTwo = require('../controllers/balotsPickTwo');
const ballots = require('../controllers/ballots');
const ballotsSubmitted = require('../controllers/ballotsSubmitted');
const util = require('../lib/util');

module.exports = (router) => {
    router.get('/vote/ranked/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        const ballot = util.getBallotById(req.params.id, ballotsRanked.ballotsRanked);
        const alreadyVoted = util.alreadyVoted(req.user.id, req.params.id, ballotsRanked.ballotsRankedSubmitted);
    
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
        const alreadyVoted = util.alreadyVoted(req.user.id, req.params.id, ballotsSimple.ballotsSimpleSubmitted);
    
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
        const alreadyVoted = util.alreadyVoted(req.user.id, req.params.id, ballotsPickTwo.ballotsPickTwoSubmitted);
    
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
}