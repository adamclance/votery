const ballotsPickTwo = require('../db/ballotsPickTwo');
const ballotsSimple = require('../db/ballotsSimple');
const ballotsRanked = require('../db/ballotsRanked');
const _ = require('underscore');

const dbMap = {
    ranked: ballotsRanked.ballotsRankedSubmitted,
    simple: ballotsSimple.ballotsSimpleSubmitted,
    'pick-two': ballotsPickTwo.ballotsPickTwoSubmitted
}

exports.getSubmitted = (req) => _.filter(dbMap[req.params.type], (ballot) => ballot.ballotId === +req.params.id);
