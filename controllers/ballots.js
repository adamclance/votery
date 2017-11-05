const ballotsPickTwo = require('../db/ballotsPickTwo');
const ballotsSimple = require('../db/ballotsSimple');
const ballotsRanked = require('../db/ballotsRanked');

exports.getAllBallots = () => ballotsRanked.ballotsRanked.concat(ballotsPickTwo.ballotsPickTwo).concat(ballotsSimple.ballotsSimple);