const ballotsPickTwo = require('../db/ballotsPickTwo');
const ballotsSimple = require('../db/ballotsSimple');
const ballotsRanked = require('../db/ballotsRanked');
const _ = require('underscore');

const map = {
    ranked: ballotsRanked.ballotsRanked,
    simple: ballotsSimple.ballotsSimple,
    'pick-two': ballotsPickTwo.ballotsPickTwo
}

const mapSubmitted = {
    ranked: ballotsRanked.ballotsRankedSubmitted,
    simple: ballotsSimple.ballotsSimpleSubmitted,
    'pick-two': ballotsPickTwo.ballotsPickTwoSubmitted
}

exports.getAllBallots = () => ballotsRanked.ballotsRanked.concat(ballotsPickTwo.ballotsPickTwo).concat(ballotsSimple.ballotsSimple);

exports.getBallot = (type, id) => {
    const ballots = map[type];
    return _.findWhere(ballots, (ballot) => ballot.id === +id);
};

exports.updateBallot = (type, id, data) => {
    let ballot = this.getBallot(type, +id);

    if (ballot) {
        _.extend(ballot, data);
    }
};

exports.deleteBallot = (type, id) => {
    // Remove ballot.
    const ballotIndex = _.findIndex(map[type], { id: +id });
    map[type].splice(ballotIndex, 1);

    // Remove associated submitted ballots.
    _.each(mapSubmitted[type], (ballot) => {
        if (ballot.id === +id) {
            let index = _.findIndex(mapSubmitted[type], { id: ballot.id });
            mapSubmitted[type].splice(index, 1);
        }
    });
}