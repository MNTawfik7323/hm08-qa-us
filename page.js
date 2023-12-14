module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    messageToDriver: '#comment',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    closePaymentMethodWindowButton: '.payment-picker .close-button',
    orderRequirementsButton: '.reqs',
    blanketAndHandkerchiefsButton: '.r-sw',
    iceCreamButton: '.counter-plus',
    orderButton: '.smart-button',
    // Click away
    cardFieldClick: '.plc', 
    // expected results 
    cardImageCheck: 'img[alt="card"]',
    iceCreamCheck: '.counter-value',
    blanketButtonStatus: '.switch-input',
    messageToDriverConfirm: '#comment',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: '.order-body',
    driverInfoModal: 'div*=The driver will arrive',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethodCard: async function() {
         //selecting a credit card as payment method
         const paymentMethodButton = await $(this.paymentMethodButton)
         await paymentMethodButton.waitForDisplayed()
         await paymentMethodButton.click()
         const addCardButton = await $(this.addCardButton)
         await addCardButton.waitForDisplayed()
         await addCardButton.click()
         //adding a card number
         const cardNumber = await $(this.cardNumber)
         await cardNumber.waitForDisplayed()
         await cardNumber.setValue(123456789012345678)
         await browser.pause(2000)
         //adding card code
         const cardCode = await $(this.cardCode)
         await cardCode.waitForDisplayed()
         await cardCode.setValue(79)
         await browser.pause(2000)
         //clicking away from card so we are able to click link
         const cardFieldClick = await $(this.cardFieldClick)
         await cardFieldClick.waitForDisplayed()
         await cardFieldClick.click()
         //linking credit card
         const linkCardButton = await $(this.linkCardButton)
         await linkCardButton.waitForDisplayed()
         await linkCardButton.click()
         //closing payment method window after adding card information
         const closePaymentMethodWindowButton = await $(this.closePaymentMethodWindowButton)
         await closePaymentMethodWindowButton.waitForDisplayed()
         await closePaymentMethodWindowButton.click()
    }
};