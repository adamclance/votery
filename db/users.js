const uuid = require('uuid/v4');
const _ = require('underscore');

var records = [
	{
		id: '500ed008-cb0d-4a70-9950-c9b2cd2ba17c',
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
			simpleMajority: [],
			pickTwo: []
		}
	},
	{
		id: 'd2db10db-f24c-428c-b982-a38c2331ba3b',
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
			simpleMajority: [],
			pickTwo: []
		}
	},
	{
		id: '2d5dc4bd-2f0d-47e8-9aa5-97a2111a6b80',
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
			simpleMajority: [],
			pickTwo: []
		}
	},
	{
		id: '9bed7059-c3d5-41ae-8c0c-e9a16e0b6f2d',
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
			simpleMajority: [],
			pickTwo: []
		}
	}
];

exports.findById = function (id, cb) {
	const user = _.findWhere(this.userData, {id});
	
	process.nextTick(function () {
		if (user) {
			cb(null, user);
		} else {
			cb(new Error('User ' + id + ' does not exist'));
		}
	});
}

exports.findByUsername = function (username, cb) {
	process.nextTick(function () {
		for (var i = 0, len = records.length; i < len; i++) {
			var record = records[i];
			if (record.username === username) {
				return cb(null, record);
			}
		}
		return cb(null, null);
	});
}

exports.create = (data) => {
	const newUser = {
		id: uuidv4(),
		username: data.username,
		password: data.password,
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		residence: {
			state: data.state,
			city: data.city,
			zip: data.zip
		},
		ballots: {
			ranked: [],
			simpleMajority: [],
			pickTwo: []
		}
	}

	this.userData.push(newUser);
};

exports.userData = records;