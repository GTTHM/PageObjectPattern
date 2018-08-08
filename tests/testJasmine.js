const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../lib/pages/GoogleSearchedPage');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(pref)
  .build();

function getAmount(text) {
    let arr = text.slice(0, text.indexOf("(")).split(" ");
    let result = "";

    arr.forEach((word) => {
        if (isFinite(parseFloat(word))) result += word;
    });

    return parseFloat(result);
}

function checkRelevanceByKey(text, key) {
    const words = text.replace(/\n/g, " ").toLowerCase().split(" ");
    let result = 0;

    words.forEach((word) => {
        if (~word.indexOf(key.toLowerCase())) result++;
    });

    result = parseFloat(result / words.length); 

    return result;
}

describe("FullTest", () => {

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
        this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
    });

    it("Functional Test", async () => {
        await this.GoogleMainPage.navigate();
        await this.GoogleMainPage.search("iTechArt");
        this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
        this.results = await this.GoogleSearchedPage.getAllResultsText();
    });

    it("Result amount should be >10000", () => {
        let resultAmount = getAmount(this.resultsAmountText);
        expect(resultAmount > 10000).toBe(true);
    });

    it("All results must contain key", () => {
        this.results.forEach((text) => {
            expect(checkRelevanceByKey(text, "iTechArt") > 0).toBe(true);
        });
    });

    afterAll(async () => driver.quit());
});
