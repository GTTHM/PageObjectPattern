require('chromedriver');
require('geckodriver');

const testData = require('../resources/testData');
const using = require('jasmine-data-provider');
const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../lib/pages/GoogleSearchedPage');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser(process.env.BROWSER)
  .setLoggingPrefs(pref)
  .build();

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

    using(testData, (data) => {
        it("Functional Test", async () => {
            await this.GoogleMainPage.navigate();
            await this.GoogleMainPage.search(data.KEY);
            this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
            this.results = await this.GoogleSearchedPage.getAllResultsTextArray();
        });
    
        it(`Result amount should be >${data.minResultAmount}`, () => {
            let resultAmount = getResultAmount(this.resultsAmountText);
            expect(resultAmount).toBeGreaterThan(data.minResultAmount);
        });
    
        it(`All results must contain ${data.KEY}`, () => {
            this.results.forEach((text) => {
                expect(text.toLowerCase()).toContain(data.KEY.toLowerCase());
            });
        });
    })

    afterAll(async () => driver.quit());
});
