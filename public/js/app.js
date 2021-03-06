import $ from '../../node_modules/jquery/dist/jquery';
import whatInput from '../../node_modules/what-input/dist/what-input';
import { foundation } from '../../node_modules/foundation-sites/dist/js/foundation';
import voteRankedPage from './voteRanked';
import voteSimplePage from './voteSimple';
import votePickTwoPage from './votePickTwo';
import createBallotPage from './createBallot';

$(document).ready(function() {
    $(document).foundation();
});

$(document).on('open.fndtn.reveal', '#loginModal', function () {
    new Foundation.Abide($('form.login-form'), {
        'data-live-validate': false,
        'data-validate-on-blur': true
    });
});

$(document).on('open.fndtn.reveal', '#registerModal', function () {
    new Foundation.Abide($('form.register-form'), {
        'data-live-validate': false,
        'data-validate-on-blur': true
    });
});

// Helper function to get query params
const getParameterByName = (name) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

window.onload = () => {
    // Open login modal if query param present
    if (getParameterByName('login') || getParameterByName('loginFailed')) {
        var modal = new Foundation.Reveal($('#loginModal'));
        modal.open();
    };
};


// Page specific methods
const windowLoc = window.location.pathname;

if (windowLoc.indexOf('vote/ranked') > -1) {
    new voteRankedPage();
}

if (windowLoc.indexOf('vote/simple') > -1) {
    new voteSimplePage();
}

if (windowLoc.indexOf('vote/pick-two') > -1) {
    new votePickTwoPage();
}

if (windowLoc.indexOf('ballots/create') > -1) {
    new createBallotPage();
}
