var el = document.getElementById('rankedBallotSort');
var sortable = Sortable.create(el);

// Add new write-in candidate
$('.candidate-add-button').click(function () {
    if (!$('.candidate-add-button').hasClass('disabled')) {
        // Add new candidate to the list
        var $input = $('.candidate-add-input');

        if ($input.val() !== '') {
            $('.rankedBallotSort').append('<li class="rankedBallotSort-choice">' + $input.val() + '</li>');
            $input.val('');
        }
    }
});

// Submit ballot
$('.ranked-ballot-submit').click(function (e) {
    if (!$('.ranked-ballot-submit').hasClass('disabled')) {
        var choices = $('.rankedBallotSort li').map(function () { return $(this).text(); }).toArray();
        $.post('/vote/ranked', { id: $('.rankedBallotSort').data('ballot-id'), choices: choices })
            .done(function (resp) {
                alert(resp);
            });

        $('.ranked-ballot-submit, .candidate-add-button').addClass('disabled');
    }
});