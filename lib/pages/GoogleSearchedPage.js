"use strict";
const BasePage = require('../BasePage');
let driver, By;

class GoogleSearchedPage extends BasePage {
    constructor (
        _webdriver,
        _driver
    ) {
        super(_webdriver, _driver);
        driver = _driver; 
        By = _webdriver.By;
    }

    get resultsAmountDivId() {
        return By.id("resultStats");
    }

    get resultsAmountDiv() {
        return driver.findElement(this.resultsAmountDivId);
    }

    get allResultsDivsArray() {
        return driver.findElements(By.xpath("//div[@class='g']"));
    }

    async getResultsAmountText() {
        await this.waitForElementBySelector(this.resultsAmountDivId);
        const resultsAmountDiv = await this.resultsAmountDiv;
        
        return await resultsAmountDiv.getText();
    }

    async getAllResultsTextArray() {
        let result = [];

        const elements = await this.allResultsDivsArray;  

        for (let i = 0; i < elements.length; i++) {
            result.push(await elements[i].getText());
        }

        return result;
    }
}

module.exports = GoogleSearchedPage;