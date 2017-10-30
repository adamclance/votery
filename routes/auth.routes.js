const router = require('express').router;

router.route('/login',
    (req, res) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('login', { user: req.user });
        }
    });

router.route('/register',
    (req, res) => {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('register', { user: req.user });
        }
    });

router.route('/login', 
passport.authenticate('local', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    });

router.route('/logout',
    (req, res) => {
        req.logout();
        res.redirect('/');
    });

router.route('/profile',
require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
        res.render('profile', { user: req.user });
    });

module.exports = router;