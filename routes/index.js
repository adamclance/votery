const express = require('express');
const router = express.Router();

// Global middleware to attach user obj to locals
router.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

const home = require('./home')(router);

const auth = require('./auth')(router);

const ballots = require('./ballots')(router);

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){
	res.render('404');
});

module.exports = router;
