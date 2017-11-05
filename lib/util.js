const _ = require('underscore');

exports.getBallotById = (id, ballots) => {
    return _.findWhere(ballots, { id: +id });
};

exports.getSubmittedByUser = (userId, ballotsSubmitted) => {
    return _.filter(ballotsSubmitted, (ballot) => ballot.userId === userId);
};

exports.checkDuplicates = (userId, ballotId, ballotsSubmitted) => {
    return _.findWhere(ballotsSubmitted, { userId, ballotId });
};