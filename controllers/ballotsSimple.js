const _ = require('underscore');
const DB = require('../db/ballotsSimple');
const util = require('../lib/util');

exports.tallyScores = (ballotsSubmitted) => {
    const  tally = { yes: 0, no: 0 }
    _.each(DB.ballotsSimpleSubmitted, (ballot) => {
        tally[ballot.choice]++;
    });

    return tally;
}

exports.getElectionResults = (ballotId) => {
    const ballot = _.findWhere(DB.ballotsSimple, { id: ballotId });
    const ballotsSubmitted = _.filter(DB.ballotsSimpleSubmitted, (ballot) => ballot.ballotId === ballotId);

    const name = ballot.name;
    const scores = this.tallyScores(ballotsSubmitted);

    let totalVotes = scores.yes + scores.no;

    scores.yes = { votes: scores.yes, percentage: Math.round(scores.yes / totalVotes * 100) };
    scores.no = { votes: scores.no, percentage: Math.round(scores.no / totalVotes * 100) };

    return { name, scores, totalVotes };
}

exports.getAllElectionResults = () => {
    let elections = [];

    _.each(DB.ballotsSimple, (ballot) => {
        elections.push(this.getElectionResults(ballot.id));
    });

    return elections;
}

exports.submitBallot = (data, userId, res) => {
    if (util.checkDuplicates(userId, +data.id, DB.ballotsSimpleSubmitted)) {
        res.send('You may only vote 1 time.');
    } else {
        DB.ballotsSimpleSubmitted.push({ 
            userId: userId, 
            ballotId: +data.id, 
            choice: data.choice,
            timeStamp: new Date(Date.now()).toLocaleString('en-US', {timeZone: 'UTC'}) 
        });

        res.send('Your ballot has been submitted!');
    }
}

exports.checkDuplicates = util.checkDuplicates(ballotsSubmitted = DB.ballotsSimpleSubmitted);

exports.getBallotById = util.getBallotById(ballots = DB.ballotsSimple);

exports.getSubmittedByUser = util.getSubmittedByUser(ballotsSubmitted = DB.ballotsSimpleSubmitted);

exports.ballotsSimple = DB.ballotsSimple;

exports.ballotsSimpleSubmitted = DB.ballotsSimpleSubmitted;
