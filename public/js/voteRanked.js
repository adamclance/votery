var el = document.getElementById('rankedBallotSort');
var sortable = Sortable.create(el);

// Add new write-in candidate
$('.candidate-add-button').click(function() {
    // Add new candidate to the list
    $('.rankedBallotSort').append('<li>' + $('.candidate-add-input').val() + '</li>'); 
    $('.candidate-add-input').val('');
});

// Submit ballot
$('.ranked-ballot-submit').click(function(e) {
    var choices = $('.rankedBallotSort li').map(function(){ return $(this).text(); }).toArray();
    $.post('/vote/ranked', { id: $('.rankedBallotSort').data('ballot-id'), choices: choices })
        .done(function() {
            alert('Your ballot has been submitted!');
        }); 
});