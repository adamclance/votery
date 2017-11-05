export default class votePickTwoPage {
    constructor() {
        this.registerEvents();
    }

    get $candidateAddButton() {
        return $('.candidate-add-button');
    }

    get $submitButton() {
        return $('.pick-two-ballot-submit');
    }

    get $checkboxes() {
        return $('fieldset .ballot-checkbox');
    }

    addCandidate() {
        if (!this.$candidateAddButton.hasClass('disabled')) {
            const lastId = this.$checkboxes.last().attr('id');

            // Add new candidate to the list
            const $input = $('.candidate-add-input');
    
            if ($input.val() !== '') {
                $('.pick-two-choices').append(`
                    <input data-name="${$input.val()}" class="ballot-checkbox" id="${+lastId + 1}" type="checkbox">
                    <label for="${+lastId + 1}">${$input.val()}</label>
                `);
                
                $input.val('');

                // Reinitialize onChange event with new checkbox
                this.$checkboxes.off();
                this.registerChangeEvt();
            }
        }
    }

    submitBallot() {
        if (!this.$submitButton.hasClass('disabled')) {
            if(this.$checkboxes.filter(':checked').length < 2) {
                alert('Please choose at least 2 options.');
            } else {
                const choices = this.$checkboxes.filter(':checked').map(function() { return $(this).data('name') }).get();
    
                console.log('chekced', this.$checkboxes.filter(':checked').map(function() { return $(this).data('name') }).get());
                $.post('/vote/pick-two', { id: $('.pick-two-choices').data('ballot-id'), choices: choices })
                    .done((resp) => {
                        alert(resp);
                    });
        
                this.$candidateAddButton.addClass('disabled');
                this.$submitButton.addClass('disabled'); 
            }
        }
    }

    onChange(e) {
        if(this.$checkboxes.filter(':checked').length >= 3) {
            e.target.checked = false;
            alert('You may only choose 2 options.');
        }
    }

    registerEvents() {
        this.$candidateAddButton.click(() => {
            this.addCandidate();
        });

        this.$submitButton.click(() => {
            this.submitBallot();
        });

        this.registerChangeEvt();
    }

    registerChangeEvt() {
        this.$checkboxes.on('change', (e) => {
            this.onChange(e);
        });
    }
}
