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
    return _.findWhere(ballots, {id: +id});
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
};

exports.closeBallot = (type, id) => {
    let ballot = this.getBallot(type, +id);
    ballot.closed = true;
};

exports.openBallot = (type, id) => {
    let ballot = this.getBallot(type, +id);
    ballot.closed = false;
};

exports.createBallot = (data) => {
    let ballots = map[data.type];
    let options = [];
    data.closed = false;

    // Generate ballot id
    const lastIndex = ballots.length - 1;
    let lastId = ballots[lastIndex].id;
    data.id = lastId + 1;

    // Normalize options data
    if (data.type === 'ranked' || data.type === 'pick-two') {
        let optionId = 1;

        _.each(data.options, (option) => {
            options.push({ id: optionId, name: option });
            optionId++;
        });

        data.options = options;
    } else {
        delete data.options;
    }

    ballots.push(data);
}