module.exports = {
    'Test goTo google.com': function(browser) {
        browser
            .url('http://google.com', () => {
                console.log('Loading google.com');
            })
            .end();
    }
};