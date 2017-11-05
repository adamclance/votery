const _ = require('underscore');
const DB = require('../db/ballotsPickTwo');
const util = require('../lib/util');

exports.tallyScores = (ballotsSubmitted) => {
    let candidates = [];

    _.each(ballotsSubmitted, (ballot) => {
        const choices = [ballot.choices[0], ballot.choices[1]];

        _.each(choices, (choice) => {
            // If candidate doesn't yet exist push to arr and add 1 vote
            if (!_.findWhere(candidates, { name: choice })) {
                candidates.push({ name: choice, votes: 1 });
            } else {
                // Else add 1 vote to existing candidate
                let index = _.findIndex(candidates, (cand) => cand.name === choice);
                candidates[index].votes++;
            }
        });
    });

    candidates = _.sortBy(candidates, 'votes').reverse();

    return candidates;
};

exports.getElectionResults = (ballotId) => {
    const ballot = _.findWhere(DB.ballotsPickTwo, { id: ballotId });
    const ballotsSubmitted = _.filter(DB.ballotsPickTwoSubmitted, (ballot) => ballot.ballotId === ballotId);

    const name = ballot.name;
    const scores = this.tallyScores(ballotsSubmitted);

    let totalVotes = 0;

    _.each(scores, (score) => totalVotes += score.votes);

    _.each(scores, (score) => score.percentage = Math.round(score.votes / totalVotes * 100));

    return { name, scores, totalVotes };
};

exports.getAllElectionResults = () => {
    let elections = [];

    _.each(DB.ballotsPickTwo, (ballot) => {
        elections.push(this.getElectionResults(ballot.id));
    });

    return elections;
};

exports.submitBallot = (data, userId, res) => {
    if (util.checkDuplicates(userId, +data.id, DB.ballotsPickTwoSubmitted)) {
        res.send('You may only vote 1 time.');
    } else {
        DB.ballotsPickTwoSubmitted.push({
            userId: userId,
            ballotId: +data.id,
            choices: data.choices,
            timeStamp: new Date(Date.now()).toLocaleString('en-US', { timeZone: 'UTC' })
        });

        res.send('Your ballot has been submitted!');
    }
}

exports.checkDuplicates = util.checkDuplicates(ballotsSubmitted = DB.ballotsPickTwoSubmitted);

exports.getBallotById = util.getBallotById(ballots = DB.ballotsPickTwo);

exports.getSubmittedByUser = util.getSubmittedByUser(ballotsSubmitted = DB.ballotsPickTwoSubmitted);

exports.ballotsPickTwo = DB.ballotsPickTwo;

exports.ballotsPickTwoSubmitted = DB.ballotsPickTwoSubmitted;