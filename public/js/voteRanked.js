import Sortable from '../../node_modules/sortablejs/Sortable';

export default class voteRankedPage {
    constructor() {
        const el = document.getElementById('rankedBallotSort');
        let sortable = Sortable.create(el);

        this.registerEvents();
    }

    get $candidateAddButton() {
        return $('.candidate-add-button');
    }

    get $submitButton() {
        return $('.ranked-ballot-submit');
    }

    addCandidate() {
        if (!this.$candidateAddButton.hasClass('disabled')) {
            // Add new candidate to the list
            const $input = $('.candidate-add-input');
    
            if ($input.val() !== '') {
                $('.rankedBallotSort').append(`<li class="rankedBallotSort-choice">${$input.val()}</li>`);
                $input.val('');
            }
        }
    }

    submitBallot() {
        if (!this.$submitButton.hasClass('disabled')) {
            const choices = $('.rankedBallotSort li').map(function () { return $(this).text(); }).toArray();

            $.post('/vote/ranked', { id: $('.rankedBallotSort').data('ballot-id'), choices: choices })
                .done((resp) => {
                    alert(resp);
                });
    
            this.$candidateAddButton.addClass('disabled');
            this.$submitButton.addClass('disabled'); 
        }
    }

    registerEvents() {
        this.$candidateAddButton.click(() => {
            this.addCandidate();
        });

        this.$submitButton.click(() => {
            this.submitBallot();
        });
    }
}
