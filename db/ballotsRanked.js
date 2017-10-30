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
        choices: [
            'Mr. Rogers',
            'Choco "Chip" Dough - Republican for Vice Ice',            
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    },
    {
        userId: 4,
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Mr. Rogers',            
            'Choco "Chip" Dough - Republican for Vice Ice',            
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ]
    }
];

exports.tallyScores = (ballotsRankedSubmitted) => {
    let candidates = [];

    // Round 1 ranking. First choice rankings are tallied.
    _.each(ballotsRankedSubmitted, (ballot) => {
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


        _.each(ballotsRankedSubmitted, (ballot) => {
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
    }

    return candidates;
};

exports.ballotsRanked = ballotsRanked;

exports.ballotsRankedSubmitted = ballotsRankedSubmitted;