let ballotsRanked = [
    {
        id: 1,
        name: 'FOR COMMANDER IN CREAM AND VICE ICE',
        description: 'Rank candidates in order of choice. Mark your favorite candidate as first choice and then indicate your second and additional back-up choices in order of choice. You may rank as many candidates as you want.',
        options: [
            { id: 1, name: 'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice' },
            { id: 2, name: 'Choco "Chip" Dough - Republican for Vice Ice' },
            { id: 3, name: 'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice' }
        ],
        type: 'ranked'
    }
];

let ballotsRankedSubmitted = [
    {
        userId: '500ed008-cb0d-4a70-9950-c9b2cd2ba17c',
        ballotId: 1,
        ballotName: 'FOR COMMANDER IN CREAM AND VICE ICE',
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: 'd2db10db-f24c-428c-b982-a38c2331ba3b',
        ballotId: 1,
        ballotName: 'FOR COMMANDER IN CREAM AND VICE ICE',
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: '2d5dc4bd-2f0d-47e8-9aa5-97a2111a6b80',
        ballotId: 1,
        ballotName: 'FOR COMMANDER IN CREAM AND VICE ICE',
        choices: [
            'Choco "Chip" Dough - Republican for Vice Ice',
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: '9bed7059-c3d5-41ae-8c0c-e9a16e0b6f2d',
        ballotId: 1,
        ballotName: 'FOR COMMANDER IN CREAM AND VICE ICE',
        choices: [
            'Reese WithoutASpoon - Democrat for C.I.C Cherry Garcia - Democrat for Vice Ice',
            'Choco "Chip" Dough - Republican for Vice Ice',
            'Magic Browny - Independent for C.I.C Phish Food - Independent for Vice Ice',
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    }
];

exports.ballotsRanked = ballotsRanked;

exports.ballotsRankedSubmitted = ballotsRankedSubmitted;