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

    get resultsAmount() {
        return this.waitForElement(By.id("resultStats"));
    }

    get allResults() {
        return driver.findElements(By.xpath("//div[@class='g']"));
    }

    async getResultsAmountText() {
        const resultsAmountText = await this.resultsAmount;
        return await resultsAmountText.getText();
    }

    async getAllResultsText() {
        let result = [];

        const elements = await this.allResults;  

        for (var i = 0; i < elements.length; i++) {
            result.push(await elements[i].getText());
        }

        return result;
    }
}

module.exports = GoogleSearchedPage;