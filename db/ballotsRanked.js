const _ = require('underscore');

let ballotsRanked = [
    { 
        id: 1, 
        name: 'FOR COMMANDER IN CREAM AND VICE ICE', 
        description: 'Rank candidates in order of choice. Mark your favorite candidate as first choice and then indicate your second and additional back-up choices in order of choice. You may rank as many candidates as you want.', 
        options: [
            {id: 1, name: 'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice'}, 
            {id: 2, name: 'Choco "Chip" Dough - Republican for Vice Ice'}, 
            {id: 3, name: 'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice'}
        ]  
    }
];

let ballotsRankedSubmitted = [
    {
        userId: '500ed008-cb0d-4a70-9950-c9b2cd2ba17c',
        ballotId: 1,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ]
    },
    {
        userId: 'd2db10db-f24c-428c-b982-a38c2331ba3b',
        ballotId: 1,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ]
    },
    {
        userId: '2d5dc4bd-2f0d-47e8-9aa5-97a2111a6b80',
        ballotId: 1,
        choices: [
            'Choco "Chip" Dough - Republican for Vice Ice',            
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    },
    {
        userId: '9bed7059-c3d5-41ae-8c0c-e9a16e0b6f2d',
        ballotId: 1,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice',            
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    }
];

exports.tallyScores = (ballotsSubmitted) => {
    let candidates = [];

    // Round 1 ranking. First choice rankings are tallied.
    _.each(ballotsSubmitted, (ballot) => {
        const candidate = ballot.choices[0];

        // If candidate doesn't yet exist push to arr and add 1 vote
        if (!_.findWhere(candidates, {name: candidate})) {
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
                    if (_.findWhere(candidates, {name: ballot.choices[i].name})) {
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

exports.getBallotById = (id) => {
    return _.findWhere(ballotsRanked, {id: +id});
};

exports.getElectionResults = (ballotId) => {
    const ballot = _.findWhere(ballotsRanked, { id: ballotId });
    const ballotsSubmitted = _.filter(ballotsRankedSubmitted, (ballot) => ballot.ballotId === ballotId);

    const name = ballot.name;
    const scores = this.tallyScores(ballotsSubmitted);

    let totalVotes = 0;

    _.each(scores, (score) => totalVotes += score.votes);

    _.each(scores, (score) => score.percentage = Math.round(score.votes / totalVotes * 100));

    return { name, scores, totalVotes };
};

exports.getAllElectionResults = () => {
    let elections = [];

    _.each(ballotsRanked, (ballot) => {
        elections.push(this.getElectionResults(ballot.id));
    });

    return elections;
};

exports.checkDuplicates = (userId, ballotId) => {
    return _.findWhere(this.ballotsRankedSubmitted, {userId, ballotId});
}

exports.ballotsRanked = ballotsRanked;

exports.ballotsRankedSubmitted = ballotsRankedSubmitted;