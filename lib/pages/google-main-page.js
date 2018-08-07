"use strict";
var PageBase = require('../page-base');

class GoogleMainPage extends PageBase {
    constructor (
        webdriver,
        driver,
        targetUrl = "https://google.com/",
    ) {
        super(webdriver, driver, targetUrl);
    }

    async search(key) {
        const driver = this.driver;
        const By = this.webdriver.By;
        const Key = this.webdriver.Key;

        await driver.findElement(By.name("q")).sendKeys(key, Key.RETURN);
    }
}

module.exports = GoogleMainPage;