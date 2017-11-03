const DB = require('../db/users');
const uuid = require('uuid/v4');
const _ = require('underscore');

exports.findById = function (id, cb) {
	const user = _.findWhere(DB.userData, {id});
	
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
		for (var i = 0, len = DB.userData.length; i < len; i++) {
			var record = DB.userData[i];
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

	DB.userData.push(newUser);
};