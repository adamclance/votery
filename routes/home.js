const ballotsRanked = require('../controllers/ballotsRanked');
const ballotsSimple = require('../controllers/ballotsSimple');
const ballotsPickTwo = require('../controllers/balotsPickTwo');
const ballots = require('../controllers/ballots');
const ballotsSubmitted = require('../controllers/ballotsSubmitted');

module.exports = (router) => {
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
}