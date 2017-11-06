export default class createBallotPage {
    constructor() {
        this.registerEvents();
    }

    get $addOptionButton() {
        return $('.add-option');
    }

    get $removeOptionButton() {
        return $('.remove-option');
    }

    get $form() {
        return $('form.create-ballot-form');
    }

    get $typeSelect() {
        return $('select.type');
    }

    addOption() {
        $('label.options').append(`
            <input name="options" type="text" placeholder="option" required>
            <span class="form-error">Option is required.</span>
        `);

        if ($('label.options input').length > 2) {
            this.$removeOptionButton.removeAttr('disabled');
        }

        $form.foundation('resetForm');
    }

    removeOption() {
        // Can only remove option if there are more than 2
        if ($('label.options input').length > 2) {
            $('label.options input').last().remove();
            $('label.options span.form-error').last().remove();
        }

        if ($('label.options input').length <= 2) {
            this.$removeOptionButton.attr('disabled', true);
        }
    }

    onTypeChange() {
        const selected = this.$typeSelect.children('option').filter(':selected').val();
        if (selected === 'ranked' || selected === 'pick-two') {
            $('.options-container').show();
            $('label.options input').attr('required', true);
        } else {
            $('.options-container').hide();
            $('label.options input').removeAttr('required');
        }
    }

    registerEvents() {
        this.$addOptionButton.on('click', () => {
            this.addOption();
        });

        this.$removeOptionButton.on('click', () => {
            this.removeOption();
        });

        this.$typeSelect.on('change', () => {
            this.onTypeChange();
        })
    }
}
