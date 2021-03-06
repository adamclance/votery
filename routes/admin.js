const ballotsRanked = require('../controllers/ballotsRanked');
const ballotsSimple = require('../controllers/ballotsSimple');
const ballotsPickTwo = require('../controllers/balotsPickTwo');
const ballots = require('../controllers/ballots');
const users = require('../controllers/users');

module.exports = (router) => {
    // Middleware to check that user has admin permission
    router.use((req, res, next) => {
        if (req.user && users.getRoleById(req.user.id) === 'admin') {
            next();
        } else {
            res.redirect('/');
        }
    });

    router.get('/ballots/manage', (req, res) => {
        res.render('manageBallots', {
            ballots: ballots.getAllBallots()
        });
    });

    router.get('/ballots/manage', (req, res) => {
        res.render('manageBallots', {
            ballots: ballots.getAllBallots()
        });
    });

    router.get('/ballots/edit/:type/:id', (req, res) => {
        const ballot = ballots.getBallot(req.params.type, req.params.id);

        if (ballot) {
            res.render('editBallot', {
                ballot,
                type: req.params.type,
                id: req.params.id
            });
        } else {
            res.render('404');
        }
    });

    router.post('/ballots/edit', (req, res) => {
        ballots.updateBallot(req.body.type, req.body.id, req.body);
        res.redirect(`/ballots/manage`);
    });

    router.get('/ballots/delete/:type/:id', (req, res) => {
        ballots.deleteBallot(req.params.type, req.params.id);
        res.redirect(`/ballots/manage`);
    });

    router.get('/ballots/close/:type/:id', (req, res) => {
        ballots.closeBallot(req.params.type, req.params.id);
        res.redirect(`/ballots/manage`);
    });

    router.get('/ballots/open/:type/:id', (req, res) => {
        ballots.openBallot(req.params.type, req.params.id);
        res.redirect(`/ballots/manage`);
    });

    router.get('/ballots/create', (req, res) => {
        res.render('createBallot');
    });

    router.post('/ballots/create', (req, res) => {
        ballots.createBallot(req.body);
        res.redirect(`/ballots/manage`);
    });
}