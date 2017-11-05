let ballotsPickTwo = [
    {
        id: 1,
        name: 'FOR STATE REP. DISTRICT M&M',
        description: 'VOTE FOR TWO',
        options: [
            { id: 1, name: 'P.Nut Butter (REPUBLICAN)' },
            { id: 2, name: 'Cream C. Kol (INDEPENDENT)' },
            { id: 3, name: 'Marsh Mallow (DEMOCRAT)' }
        ],
        type: 'pick-two',
        container: 'federal'
    }
];

let ballotsPickTwoSubmitted = [
    {
        userId: '500ed008-cb0d-4a70-9950-c9b2cd2ba17c',
        ballotId: 1,
        ballotName: 'FOR STATE REP. DISTRICT M&M',
        choices: [
            'P.Nut Butter (REPUBLICAN)',
            'Marsh Mallow (DEMOCRAT)'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: 'd2db10db-f24c-428c-b982-a38c2331ba3b',
        ballotId: 1,
        ballotName: 'FOR STATE REP. DISTRICT M&M',
        choices: [
            'Cream C. Kol (INDEPENDENT)',
            'P.Nut Butter (REPUBLICAN)'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: '2d5dc4bd-2f0d-47e8-9aa5-97a2111a6b80',
        ballotId: 1,
        ballotName: 'FOR STATE REP. DISTRICT M&M',
        choices: [
            'Marsh Mallow (DEMOCRAT)',
            'Cream C. Kol (INDEPENDENT)'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    },
    {
        userId: '9bed7059-c3d5-41ae-8c0c-e9a16e0b6f2d',
        ballotId: 1,
        ballotName: 'FOR STATE REP. DISTRICT M&M',
        choices: [
            'Cream C. Kol (INDEPENDENT)',
            'Marsh Mallow (DEMOCRAT)'
        ],
        timeStamp: '11/2/2017, 9:02:37 PM'
    }
];

exports.ballotsPickTwo = ballotsPickTwo;

exports.ballotsPickTwoSubmitted = ballotsPickTwoSubmitted;