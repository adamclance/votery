export default class voteSimplePage {
    constructor() {
        this.registerEvents();
    }

    get $submitButton() {
        return $('.simple-ballot-submit');
    }

    submitBallot() {
        if (!this.$submitButton.hasClass('disabled')) {
            $.post('/vote/simple', { id: $('.simpleBallot').data('ballot-id'), choice: $('input[type=radio]:checked').val() })
                .done((resp) => {
                    alert(resp);
                });

            this.$submitButton.addClass('disabled'); 
        }
    }

    registerEvents() {
        this.$submitButton.click(() => {
            this.submitBallot();
        });
    }
}
