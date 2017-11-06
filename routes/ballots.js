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
    
        if (ballot) {
            res.render('voteRanked', {
                ballot,
                ballotId: req.params.id,
                alreadyVoted
            });
        } else {
            res.render('404');
        }
    });
    
    router.post('/vote/ranked', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        ballotsRanked.submitBallot(req.body, req.user.id, res);
    });
    
    router.get('/vote/simple/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        const ballot = util.getBallotById(req.params.id, ballotsSimple.ballotsSimple);
        const alreadyVoted = util.alreadyVoted(req.user.id, req.params.id, ballotsSimple.ballotsSimpleSubmitted);
    
        if (ballot) {
            res.render('voteSimple', {
                ballot,
                ballotId: req.params.id,
                alreadyVoted
            });
        } else {
            res.render('404');
        }
    });
    
    router.post('/vote/simple', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        ballotsSimple.submitBallot(req.body, req.user.id, res);
    });
    
    router.get('/vote/pick-two/:id', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        const ballot = util.getBallotById(req.params.id, ballotsPickTwo.ballotsPickTwo);
        const alreadyVoted = util.alreadyVoted(req.user.id, req.params.id, ballotsPickTwo.ballotsPickTwoSubmitted);
    
        if (ballot) {
            res.render('votePickTwo', {
                ballot,
                ballotId: req.params.id,
                alreadyVoted
            });
        } else {
            res.render('404');
        }
    });
    
    router.post('/vote/pick-two', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        ballotsPickTwo.submitBallot(req.body, req.user.id, res);
    });
    
    router.get('/ballots', (req, res) => {
        res.render('ballots', {
            ballots: ballots.getAllBallots()
        });
    });
    
    router.get('/ballots/submitted/:type/:id', (req, res) => {
        const ballots = ballotsSubmitted.getSubmitted(req);

        if (ballots.length) {
            res.render('ballotsSubmitted', {
                ballots
            });
        } else {
            res.render('404');
        }
    });
}