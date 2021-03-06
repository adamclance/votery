const express = require('express');
const router = express.Router();

// Middleware to handle errors
router.use((err, req, res, next) => {
	// Do logging and user-friendly error message display
	console.error(err);
	res.status(500).render('error');
});

// Global middleware to attach locals
router.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.loginFailed = req.query.loginFailed;
	next();
});

const home = require('./home')(router);

const auth = require('./auth')(router);

const ballots = require('./ballots')(router);

const admin = require('./admin')(router);

//The 404 Route (ALWAYS Keep this as the last route)
router.get('*', function(req, res){
	res.render('404');
});

module.exports = router;
