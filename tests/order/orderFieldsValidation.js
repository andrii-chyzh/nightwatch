module.exports = {
    before: (browser) => {
        let mainPage = browser.page.mainPage(),
            customerOrdersPage = browser.page.customerOrdersPage(),
            createOrderPage = browser.page.createOrderPage();

        mainPage.header = browser.page.mainPage().section.header;
        customerOrdersPage.header = browser.page.customerOrdersPage().section.header;

        mainPage.api.maximizeWindow();
        //goToStep2Button
        mainPage
            .navigate()
            .openLoginPopup()
            .login('chyzh.client@gmail.com', '123456a');
        customerOrdersPage
            .openCreateOrderPage();
        createOrderPage
            .proceedToThirdStep();

    },

    after: (browser)=> {
        browser.end();
        console.log('The all tests is successful!!!');
    },

   'Проверка поля "Topic" на ввод значения которое больше допустимого (256 символов)': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .setValue('@topicField', 'One two three four five six seven eight nine zero One two three four five six seven eight nine zero ' +
                'One two three four five six seven eight nine zero One two three four five six seven eight nine zero One two three four five six seven five six seven five si')
            .expect.element('@topicErrorValidation').to.be.visible;
    },

    'Проверка поля "Topic" на отсутсвие ошибки при вводе валидного значения': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@topicField')
            .setValue('@topicField', 'One two three four five six seven eight nine zero One two three four five six seven eight nine zero ' +
                'One two three four five six seven eight nine zero One two three four five six seven eight nine zero One two three four five six seven five six seven five')
            .waitForElementNotPresent('@topicErrorValidation', 1000);
    },

    'Проверка поля "Number of pages" на пустое значение': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfPagesInput')
            .expect.element('@numberOfPagesErrorEmpty').to.be.visible.before(2000);
    },

    'Проверка поля "Number of pages" на ввод значения которое больше допустимого (151 страница)': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .setValue('@numberOfPagesInput', '151')
            .expect.element('@numberOfPagesErrorMax').to.be.visible.before(2000);
    },

    'Проверка поля "Number of pages" на ввод спецсимволов': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfPagesInput')
            .setValue('@numberOfPagesInput', '#!?')
            .expect.element('@numberOfPagesErrorSymbols').to.be.visible.before(2000);
    },

    'Проверка поля "Number of pages" на ввод отрицательного значения': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfPagesInput')
            .setValue('@numberOfPagesInput', '-2')
            .expect.element('@numberOfPagesErrorMinus').to.be.visible.before(2000);
    },

    'Проверка поля "Number of pages" на ввод кирилици': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfPagesInput')
            .setValue('@numberOfPagesInput', 'abc')
            .expect.element('@numberOfPagesErrorSymbols').to.be.visible.before(2000);
    },

    'Проверка поля "Number of pages" на отсутствие ошибки валидации при вводе валидного значения': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfPagesInput')
            .setValue('@numberOfPagesInput', '2')
            .expect.element('@numberOfPagesInput').to.have.value.that.equals('2').before(2000);
        createOrderPage
            .waitForElementNotPresent('@numberOfPagesErrorSymbols', 1000);

    },


    'Проверка поля "Number of cited resources" на ввод значения которое больше допустимого': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .setValue('@numberOfCited', '81')
            .expect.element('@numberOfCitedMax').to.be.visible.before(2000);
    },

    'Проверка поля "Number of cited resources" на ввод спецсимволов': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .setValue('@numberOfCited', '$@#')
            .expect.element('@numberOfCitedEmpty').to.be.visible.before(2000);
    },

    'Проверка поля "Number of cited resources" на ввод отрицательного значения': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .setValue('@numberOfCited', '-2')
            .expect.element('@numberOfCitedMinus').to.be.visible.before(2000);
    },

    'Проверка поля "Number of cited resources" на пустое значение': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .expect.element('@numberOfCitedEmpty').to.be.visible.before(2000);
    },

    'Проверка поля "Number of cited resources" на ввод кирилици': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .setValue('@numberOfCited', 'abc')
            .expect.element('@numberOfCitedEmpty').to.be.visible.before(2000);
    },

    'Проверка поля "Number of cited resources" на отсутствие ошибки валидации при вводе валидного значения': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .clearValue('@numberOfCited')
            .setValue('@numberOfCited', '2')
            .expect.element('@numberOfCited').to.have.value.that.equals('2');
        createOrderPage
            .waitForElementNotPresent('@numberOfCitedEmpty', 1000);
    },

    'Проверка поля "Deadline Date" на ввод даты которая уже прошла': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

       createOrderPage
           .setValueToCalendar('10-10-2017')
           .click('@proceedToBiddingButton')
           .expect.element('@deadlineErrorMin').to.be.visible.before(2000);
    },

    'Проверка поля "Deadline Date" на ввод даты которая больше максимально допустимой': (browser) => {
        let createOrderPage = browser.page.createOrderPage();

        createOrderPage
            .setValueToCalendar('10-10-2019')
            .click('@proceedToBiddingButton')
            .expect.element('@deadlineErrorMax').to.be.visible.before(2000);
    },

};
