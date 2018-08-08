"use strict";
const BasePage = require('../BasePage');
let driver, By, until;

class GoogleSearchedPage extends BasePage {
    constructor (
        _webdriver,
        _driver
    ) {
        super(_webdriver, _driver);
        driver = _driver; 
        By = _webdriver.By;
        until = _webdriver.until;
    }

    async getResultsAmountText() {
        await driver.wait(until.elementLocated(By.id("resultStats")), 1000);
        return await driver.findElement(By.id("resultStats")).getText();
    }

    async getAllResultsText() {
        let result = [];

        const elements = await driver.findElements(By.xpath("//div[@class='g']"));  

        for (var i = 0; i < elements.length; i++) {
            result.push(await elements[i].getText());
        }

        return result;
    }
}

module.exports = GoogleSearchedPage;