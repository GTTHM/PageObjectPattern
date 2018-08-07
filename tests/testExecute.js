const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../lib/pages/google-main-page');
const GoogleSearchedPage = require('../lib/pages/google-searched-page');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setLoggingPrefs(pref)
  .build();

(async () => {
    this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
    this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
    try {
        await this.GoogleMainPage.navigate();
        await this.GoogleMainPage.search("iTechArt");
        await this.GoogleSearchedPage.checkResultsAmount();
        await this.GoogleSearchedPage.checkRelevance("iTechArt");
    } 
    finally {
        driver.quit()
    }
})();