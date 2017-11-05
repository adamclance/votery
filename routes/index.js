const express = require('express');
const router = express.Router();

const home = require('./home')(router);

const auth = require('./auth')(router);

const ballots = require('./ballots')(router);

module.exports = router;
