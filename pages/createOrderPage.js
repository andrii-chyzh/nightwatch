module.exports = {

    commands: [{
        proceedToThirdStep: function ()  {
            let createOrderPage = this.api.page.createOrderPage();

            createOrderPage
                .click('@goToStep2Button')
                .waitForElementVisible('@step2Form')
                .click('@goToStep3Button', res => {console.log(res)})
                .waitForElementVisible('@step3Form');
            return this;
        },

        setValueToCalendar: function (date) {
            this.api.execute(`document.getElementById(\'order_deadline_date\').value = '${date}'`);
            return this;


        },

    }],

    elements: {

        // Order form FIELDS AND DROPDOWN
        form: '.js_order_form',
        paperTypeDropdown: '#order_product_paper_type',
        formatOfCitationDropdown: '#order_product_style',
        assignmentOption: {
            selector: '//option[text()="Assignment"]',
            locateStrategy: 'xpath',
        },
        numberOfPagesInput: '#order_product_pages',
        numberOfCited: '#order_product_sources',
        topicField: '#order_name',
        deadlineDateField: '#order_deadline_date',
        deadlineTimeField: '#order_deadline_time',


        // Order form BUTTONS
        goToStep2Button: {
            selector: '//span[contains(text(), "go to step 2")]',
            locateStrategy: 'xpath',
        },

        goToStep3Button: {
            selector: '//span[contains(text(), "go to step 3")]',
            locateStrategy: 'xpath',
        },
        proceedToBiddingButton: {
            selector: '//span[contains(text(), "Proceed to Bidding")]',
            locateStrategy: 'xpath',
        },

        // Order form BLOCKS
        step1Form: '#step-1.active',
        step2Form: '#step-2.active',
        step3Form: '#step-3.active',

        // Validation ERRORS
        topicErrorValidation: {
            selector: '//div[contains(text(), "Please do not exceed more than 255 characters in length.")]',
            locateStrategy: 'xpath',
        },
        numberOfPagesErrorMax: {
            selector: '//div[contains(text(), "This value should not exceed 150. Please contact support if you need more.")]',
            locateStrategy: 'xpath',
        },

        numberOfPagesErrorEmpty: {
            selector: '//div[contains(text(), "Required Field.")]',
            locateStrategy: 'xpath',
        },

        numberOfPagesErrorMinus: {
            selector: '//div[contains(text(), "This value should be 1 or more.")]',
            locateStrategy: 'xpath',
        },

        numberOfPagesErrorSymbols: {
            selector: '//div[contains(text(), "Use integers only.")]',
            locateStrategy: 'xpath',
        },

        deadlineErrorMin: {
            selector: '//div[contains(text(), "Choose 3 Hours or More.")]',
            locateStrategy: 'xpath',
        },

        deadlineErrorMax: {
            selector: '//div[contains(text(), "The maximum Allowed Deadline is 62 Days.")]',
            locateStrategy: 'xpath',
        },
        numberOfCitedEmpty: {
            selector: '//div[contains(text(), "Use integers only.")]',
            locateStrategy: 'xpath',
        },

        numberOfCitedMax: {
            selector: '//div[contains(text(), "This value should not exceed 80.")]',
            locateStrategy: 'xpath',
        },

        numberOfCitedMinus: {
            selector: '//div[contains(text(), "This value should be 0 or more.")]',
            locateStrategy: 'xpath',
        },
    },

};

