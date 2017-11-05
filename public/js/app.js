import $ from '../../node_modules/jquery/dist/jquery';
import whatInput from '../../node_modules/what-input/dist/what-input';
import { foundation } from '../../node_modules/foundation-sites/dist/js/foundation';
import voteRankedPage from './voteRanked';
import voteSimplePage from './voteSimple';
import votePickTwoPage from './votePickTwo';

$(document).ready(function() {
    $(document).foundation();
});

// Helper function to get query params
const getParameterByName = (name) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

window.onload = () => {
    // Open login modal if query param present
    if (getParameterByName('login')) {
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
