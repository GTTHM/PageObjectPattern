const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../lib/pages/GoogleSearchedPage');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(pref)
  .build();

function checkRelevanceByKey(text, key) {
    const words = text.replace(/\n/g, " ").toLowerCase().split(" ");
    let result = 0;

    words.forEach((word) => {
        if (~word.indexOf(key.toLowerCase())) result++;
    });

    result = parseFloat((result / words.length).toFixed(3)) 

    return result;
}

describe("FullTest", () => {

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
        this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
    });

    it("Functional Test", async () => {
        await this.GoogleMainPage.navigate();
        await this.GoogleMainPage.search("iTechArt");
        this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
        this.results = await this.GoogleSearchedPage.getAllResultsText();
    });

    it("should be >10000", () => {
        console.log(this.resultsAmountText);
    });

    describe("All results", () => {
        it("must contain key", () => {
            this.results.forEach((text) => {
                console.log(checkRelevanceByKey(text, "iTechArt"));
            });
        });
    });

    afterAll(async () => driver.quit());
});
