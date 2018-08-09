"use strict";
const BasePage = require('../BasePage');
let driver, By, Key;

class GoogleMainPage extends BasePage {
    constructor (
        _webdriver,
        _driver,
        _targetUrl = "https://google.com/",
    ) {
        super(_webdriver, _driver, _targetUrl);
        driver = _driver;
        By = _webdriver.By;
        Key = _webdriver.Key;
    }

    get searchInput() {
        return driver.findElement(By.name("q"));
    }

    async search(key) {
        await this.searchInput.sendKeys(key, Key.RETURN);
    }
}

module.exports = GoogleMainPage;