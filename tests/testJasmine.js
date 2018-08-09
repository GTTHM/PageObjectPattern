require('chromedriver');
require('geckodriver');
const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../lib/pages/GoogleSearchedPage');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(pref)
  .build();
const KEY = "iTechArt";

function getResultAmount(text) {
    return parseFloat(
        text.slice(0, text.indexOf("(")).replace(/\D+/g,"")
    );
}

describe("FullTest", () => {

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
        this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
        this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
    });

    it("Functional Test", async () => {
        await this.GoogleMainPage.navigate();
        await this.GoogleMainPage.search(KEY);
        this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
        this.results = await this.GoogleSearchedPage.getAllResultsTextArray();
    });

    it("Result amount should be >10000", () => {
        let resultAmount = getResultAmount(this.resultsAmountText);
        expect(resultAmount).toBeGreaterThan(10000);
    });

    it("All results must contain key", () => {
        this.results.forEach((text) => {
            expect(text).toContain(KEY);
        });
    });

    afterAll(async () => driver.quit());
});
