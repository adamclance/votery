const passport = require('passport');

module.exports = (router) => {
    router.post('/login', passport.authenticate('local', { failureRedirect: '/?loginFailed=true' }), (req, res) => {
        res.redirect('/');
    });
    
    router.get('/logout', (req, res) => {
        req.logOut();
        req.session.destroy((err) => {
            res.redirect('/');
        });
    });
    
    router.post('/register', (req, res) => {
        users.create(req.body);
    
        req.login(newUser, (err) => {
            if (!err) {
                res.redirect('/');
            } else {
                //handle error
            }
        })
    });
    
    router.get('/account', require('connect-ensure-login').ensureLoggedIn('/?login=true'), (req, res) => {
        res.render('account');
    });
}