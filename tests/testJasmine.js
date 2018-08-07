const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/google-main-page');
const GoogleSearchedPage = require('../lib/pages/google-searched-page');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setLoggingPrefs(pref)
  .build();

describe("FullTest", () => {

    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
        this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
    });

    it("Functional Test", async () => {
        await this.GoogleMainPage.navigate();
        await this.GoogleMainPage.search("iTechArt");
        await this.GoogleSearchedPage.checkResultsAmount();
        await this.GoogleSearchedPage.checkRelevance("iTechArt");
    });

    afterAll(async () => driver.quit());
});
