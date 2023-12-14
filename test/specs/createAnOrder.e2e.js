const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        //call the Taxi to the address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.pause(2000)
        })
    it('should select supportive plan', async () => {
        //selecting the supportive class
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await $(page.supportiveButton)
        await supportiveButton.click()
        })
    it('should fill in the phone number', async () => {
        //Input phone number
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        })
    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addPaymentMethodCard()
        //checking that the card was added successfully
        const cardImageCheck = await $(page.cardImageCheck)
        await cardImageCheck.waitForDisplayed()
        await expect(await $(cardImageCheck)).toBeExisting()
        })
    // sending a message to the driver "we are waiting outside"
    it('should select message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageToDriver = await $(page.messageToDriver)
        await messageToDriver.waitForDisplayed()
        await messageToDriver.setValue('We are waiting outside')
        await browser.pause(2000)
        //confirming message to the driver
        await expect(await $(page.messageToDriverConfirm)).toHaveValue('We are waiting outside')
    })
    // ordering a blanket and handkerchiefs
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderRequirementsButton = await $(page.orderRequirementsButton)
        await orderRequirementsButton.waitForDisplayed()
        await orderRequirementsButton.click()
        const blanketAndHandkerchiefsButton = await $(page.blanketAndHandkerchiefsButton)
        await blanketAndHandkerchiefsButton.waitForDisplayed()
        await blanketAndHandkerchiefsButton.click()
        await browser.pause(2000)
        await expect($(page.blanketButtonStatus)).toBeChecked();
    })
    // ordering 2 ice creams
    it('should add 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const iceCreamButton = await $(page.iceCreamButton)
        await iceCreamButton.waitForDisplayed()
        await iceCreamButton.click()
        await iceCreamButton.click()
        await browser.pause(4000)
    // confirming 2 ice creams were ordered
        await expect(await $(page.iceCreamCheck)).toBeExisting(2)
    })
    // selecting the order button when the order has been completed
    it('the car search modal should appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const orderButton = await $(page.orderButton)
        await orderButton.waitForDisplayed()
        browser.pause(2000)
        await orderButton.click()
    // confirming that the search modal has appeared
        await expect(await $(page.carSearchModal)).toBeExisting()
    })
    // waiting for the driver and their information to appear
        it('should wait for the driver information to appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await browser.pause(32000);
        await expect($(`${page.driverInfoModal}`)).toBeExisting();
    })
})