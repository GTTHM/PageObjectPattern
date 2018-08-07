"use strict";
var PageBase = require('../page-base');

function checkRelevanceByKey(text, key) {
    const words = text.replace(/\n/g, " ").toLowerCase().split(" ");
    let result = 0;

    words.forEach((word) => {
        if (~word.indexOf(key.toLowerCase())) result++;
    });

    result = parseFloat((result / words.length).toFixed(3)) 

    return result;
}

class GoogleSearchedPage extends PageBase {
    constructor (
        webdriver,
        driver
    ) {
        super(webdriver, driver);
    }

    async checkResultsAmount() {
        const driver = this.driver; 
        const By = this.webdriver.By;
        const until = this.webdriver.until;

        await driver.wait(until.elementLocated(By.id("resultStats")), 1000);
        console.log(await driver.findElement(By.id("resultStats")).getText());
    }

    async checkRelevance(key) {
        const driver = this.driver; 
        const By = this.webdriver.By;

        const elements = await driver.findElements(By.xpath("//div[@class='g']"));  
        for (var i = 0; i < elements.length; i++) {
            console.log(
                `Relevance of search result number ${i + 1} is ` + 
                checkRelevanceByKey(await elements[i].getText(), key)
            );
        }
    }
}

module.exports = GoogleSearchedPage;