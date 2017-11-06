const ballotsPickTwo = require('../db/ballotsPickTwo');
const ballotsSimple = require('../db/ballotsSimple');
const ballotsRanked = require('../db/ballotsRanked');
const _ = require('underscore');

const map = {
    ranked: ballotsRanked.ballotsRanked,
    simple: ballotsSimple.ballotsSimple,
    'pick-two': ballotsPickTwo.ballotsPickTwo
}

exports.getAllBallots = () => ballotsRanked.ballotsRanked.concat(ballotsPickTwo.ballotsPickTwo).concat(ballotsSimple.ballotsSimple);

exports.getBallot = (type, id) => {
    const ballots = map[type];
    return _.findWhere(ballots, (ballot) => ballot.id === +id);
};

exports.updateBallot = (type, id, data) => {
    let ballot = this.getBallot(type, id);
    
    if (ballot) {
        _.extend(ballot, data);
    }
};