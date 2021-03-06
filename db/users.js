var records = [
	{
		id: '500ed008-cb0d-4a70-9950-c9b2cd2ba17c',
		role: 'user',
		username: 'jack',
		password: 'secret',
		firstName: 'Jack',
		lastName: 'Black',
		email: 'jack@example.com',
		residence: {
			state: 'OH',
			city: 'Cleveland',
			zip: '44105'
		},
		ballots: {
			ranked: [1],
			simple: [1],
			pickTwo: [1]
		}
	},
	{
		id: 'd2db10db-f24c-428c-b982-a38c2331ba3b',
		role: 'user',
		username: 'jill',
		password: 'birthday',
		firstName: 'Jill',
		lastName: 'Dill',
		email: 'jill@example.com',
		residence: {
			state: 'OH',
			city: 'Cleveland',
			zip: '44105'
		},
		ballots: {
			ranked: [1],
			simple: [1],
			pickTwo: [1]
		}
	},
	{
		id: '2d5dc4bd-2f0d-47e8-9aa5-97a2111a6b80',
		role: 'user',
		username: 'roger',
		password: 'rogerpass',
		firstName: 'Roger',
		lastName: 'Dodger',
		email: 'roger@example.com',
		residence: {
			state: 'OH',
			city: 'Cleveland',
			zip: '44105'
		},
		ballots: {
			ranked: [1],
			simple: [1],
			pickTwo: [1]
		}
	},
	{
		id: '9bed7059-c3d5-41ae-8c0c-e9a16e0b6f2d',
		role: 'user',
		username: 'fry',
		password: 'frypass',
		firstName: 'Fry',
		lastName: 'Guy',
		email: 'fry@example.com',
		residence: {
			state: 'OH',
			city: 'Cleveland',
			zip: '44105'
		},
		ballots: {
			ranked: [1],
			simple: [1],
			pickTwo: [1]
		}
	},
	{
		id: 'd06076ab-4241-495d-8311-1a1275958744',
		role: 'user',
		username: 'test',
		password: 'test',
		firstName: 'Test',
		lastName: 'Test',
		email: 'test@example.com',
		residence: {
			state: 'OH',
			city: 'Cleveland',
			zip: '44105'
		},
		ballots: {
			ranked: [],
			simpleMajority: [],
			simple: []
		}
	},
	{
		id: '64507c1e-304a-4cd3-9075-2797f51629d4',
		role: 'admin',
		username: 'admin',
		password: 'adminpass',
		firstName: 'Admin',
		lastName: 'Admin',
		email: 'N/A',
		residence: {
			state: 'N/A',
			city: 'N/A',
			zip: '12345'
		},
		ballots: {
			ranked: [],
			simpleMajority: [],
			simple: []
		}
	}
];

exports.userData = records;