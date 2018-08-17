require('chromedriver');
require('geckodriver');

const assert = require('assert');
const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../../lib/pages/GoogleSearchedPage');
const { Given, When, Then, Before, After, setDefaultTimeout } = require('cucumber');

const pref = new webdriver.logging.Preferences();
const driver = new webdriver.Builder()
  .forBrowser("firefox")
  .setLoggingPrefs(pref)
  .build();

function getResultAmount(text) {
    return parseFloat(
        text.slice(0, text.indexOf("(")).replace(/\D+/g,"")
    );
}

Before(async () => {
    setDefaultTimeout(60 * 1000);
    this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
    this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
});

Given('I am on the Google search page', async () => {
    await this.GoogleMainPage.navigate();
});

When('I search for {string}', async (string) => {
    await this.GoogleMainPage.search(string);
    this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
    this.results = await this.GoogleSearchedPage.getAllResultsTextArray();
});

Then('the result amount must be more than {string}', (minResultAmount) => {
    let resultAmount = getResultAmount(this.resultsAmountText);
    return resultAmount > minResultAmount;
});

Then('each result must contain {string}', async (string) => {
    this.results.forEach((text) => {
        assert.notEqual(text.toLowerCase().indexOf(string.toLowerCase()), -1);
    });
});

After(async () => {
    driver.quit();
});