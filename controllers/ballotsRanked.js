const _ = require('underscore');
const DB = require('../db/ballotsRanked');
const util = require('../lib/util');

exports.tallyScores = (ballotsSubmitted) => {
    let candidates = [];

    // Round 1 ranking. First choice rankings are tallied.
    _.each(ballotsSubmitted, (ballot) => {
        const candidate = ballot.choices[0];

        // If candidate doesn't yet exist push to arr and add 1 vote
        if (!_.findWhere(candidates, { name: candidate })) {
            candidates.push({ name: candidate, votes: 1 });
        } else {
            // Else add 1 vote to existing candidate
            let index = _.findIndex(candidates, (cand) => cand.name === candidate);
            candidates[index].votes++;
        }
    });

    // Sort primary candidate array to get first 2 choices
    candidates = _.sortBy(candidates, 'votes').reverse();

    // If a candidate has a majority we have a winner
    // Else eliminate last place candidate and distribute results
    if (candidates[0].votes > candidates[1].votes) {
        return candidates;
    }

    while (candidates[0].votes === candidates[1].votes) {
        const lastPlace = candidates.last().name;


        _.each(ballotsSubmitted, (ballot) => {
            const candidate = ballot.choices[0];

            // Remove eliminated candidate from running
            candidates.pop();

            // Distribute eliminated candidates votes
            if (candidate === lastPlace) {
                for (let i = 1; i < ballot.choices.length; i++) {
                    if (_.findWhere(candidates, { name: ballot.choices[i].name })) {
                        let index = _.findIndex(candidates, (cand) => cand.name === ballot.choices[i].name);
                        candidates[index].votes++;

                        break;
                    }
                }
            }
        });

        // Sort candidates by votes. Loop will continue until a winner is found.
        candidates = _.sortBy(candidates, 'votes').reverse();

        // Break loop in case of tie
        if (candidates.length === 2) {
            break;
        }
    }

    return candidates;
};

exports.getElectionResults = (ballotId) => {
    const ballot = _.findWhere(DB.ballotsRanked, { id: ballotId });
    const ballotsSubmitted = _.filter(DB.ballotsRankedSubmitted, (ballot) => ballot.ballotId === ballotId);

    const name = ballot.name;
    const scores = this.tallyScores(ballotsSubmitted);

    let totalVotes = 0;

    _.each(scores, (score) => totalVotes += score.votes);

    _.each(scores, (score) => score.percentage = Math.round(score.votes / totalVotes * 100));

    return { name, scores, totalVotes };
};

exports.getAllElectionResults = () => {
    let elections = [];

    _.each(DB.ballotsRanked, (ballot) => {
        elections.push(this.getElectionResults(ballot.id));
    });

    return elections;
};

exports.submitBallot = (data, userId, res) => {
    if (util.checkDuplicates(userId, +data.id, DB.ballotsRankedSubmitted)) {
        res.send('You may only vote 1 time.');
    } else {
        DB.ballotsRankedSubmitted.push({ 
            userId: userId, 
            ballotId: +data.id, 
            choices: data.choices,
            timeStamp: new Date(Date.now()).toLocaleString('en-US', {timeZone: 'UTC'}) 
        });

        res.send('Your ballot has been submitted!');
    }
} 

exports.checkDuplicates = util.checkDuplicates(ballotsSubmitted = DB.ballotsRankedSubmitted);

exports.getBallotById = util.getBallotById(ballots = DB.ballotsRanked);

exports.getSubmittedByUser = util.getSubmittedByUser(ballotsSubmitted = DB.ballotsRankedSubmitted);

exports.ballotsRanked = DB.ballotsRanked;

exports.ballotsRankedSubmitted = DB.ballotsRankedSubmitted;
