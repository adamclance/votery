import Sortable from '../../node_modules/sortablejs/Sortable';

module.exports.voteRanked = () => {
    const el = document.getElementById('rankedBallotSort');
    let sortable = Sortable.create(el);
    
    // Add new write-in candidate
    $('.candidate-add-button').click(() => {
        if (!$('.candidate-add-button').hasClass('disabled')) {
            // Add new candidate to the list
            const $input = $('.candidate-add-input');
    
            if ($input.val() !== '') {
                $('.rankedBallotSort').append(`<li class="rankedBallotSort-choice">${$input.val()}</li>`);
                $input.val('');
            }
        }
    });
    
    // Submit ballot
    $('.ranked-ballot-submit').click((e) => {
        if (!$('.ranked-ballot-submit').hasClass('disabled')) {
            const choices = $('.rankedBallotSort li').map(function () { return $(this).text(); }).toArray();
            $.post('/vote/ranked', { id: $('.rankedBallotSort').data('ballot-id'), choices: choices })
                .done((resp) => {
                    alert(resp);
                });
    
            $('.ranked-ballot-submit, .candidate-add-button').addClass('disabled');
        }
    });
}
