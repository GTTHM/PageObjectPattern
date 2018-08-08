"use strict";
const BasePage = require('../BasePage');

class GoogleSearchedPage extends BasePage {
    constructor (
        webdriver,
        driver
    ) {
        super(webdriver, driver);
    }

    async getResultsAmountText() {
        const driver = this.driver; 
        const By = this.webdriver.By;
        const until = this.webdriver.until;

        await driver.wait(until.elementLocated(By.id("resultStats")), 1000);
        return await driver.findElement(By.id("resultStats")).getText();
    }

    async getAllResultsText() {
        const driver = this.driver; 
        const By = this.webdriver.By;
        let result = [];

        const elements = await driver.findElements(By.xpath("//div[@class='g']"));  

        for (var i = 0; i < elements.length; i++) {
            result.push(await elements[i].getText());
        }

        return result;
    }
}

module.exports = GoogleSearchedPage;