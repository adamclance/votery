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
        userId: 1,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ]
    },
    {
        userId: 2,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ]
    },
    {
        userId: 3,
        choices: choices: [
            'Mr. Rogers',
            'Choco "Chip" Dough - Republican for Vice Ice'            
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    },
    {
        userId: 4,
        choices: choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Mr. Rogers',            
            'Choco "Chip" Dough - Republican for Vice Ice'            
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    }
];

exports.tallyScores = () => {
    let candidates = [];

    // Round 1 ranking. First choice rankings are tallied.
    _.each(ballotsRankedSubmitted, (ballot) => {
        const candidate = ballot.choices[0];

        // If candidate doesn't yet exist push to arr and add 1 vote
        if (_.findWhere(candidates, {name: candidate})) {
            candidates.push({ name: candidate, votes: 1 });
        } else {
            // Else add 1 vote to existing candidate
            const index = _.findIndex(candidates, (cand) => cand.name === candidate);
            candidates[index].votes++;
        }
    });
    
    // Sort primary candidate array to get first 2 choices
    candidates = _.sortBy(candidates, 'votes');

    let stillRunning = candidates.slice(0, 2);
    stillRunning = [stillRunning[0].name, stillRunning[1].name];

    // Round 2 ranking. Secondary votes of eliminated candidates are tallied.
    _.each(ballotsRankedSubmitted, (ballot) => {
        const candidate = ballot.choices[0];
        const secondary = ballot.choices[1];

        // Only tally secondary votes of ballots where first choice is eliminated
        if (!_.indexOf(stillRunning, candidate)) {
            const index = _.findIndex(candidates, (cand) => cand.name === secondary);
            candidates[index].votes++;
        }
    });

    // Now that all votes are tallied we can determine a winner
    // Sort candidates arr by votes and get winner
    candidates = _.sortBy(candidates, 'votes');

    // Returns results with first 2 candidates in running in case of tie and for display purposes.
    return candidates.slice(0, 2);
};