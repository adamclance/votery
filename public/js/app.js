// Helper function to get query params
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

window.onload = function() {
    // Open login modal if query param present
    if (getParameterByName('login')) {
        var modal = new Foundation.Reveal($('#loginModal'));
        modal.open();
    };
};
