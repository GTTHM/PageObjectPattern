require('chromedriver');
require('geckodriver');

const assert = require('assert');
const webdriver = require('selenium-webdriver');
const GoogleMainPage = require('../../lib/pages/GoogleMainPage');
const GoogleSearchedPage = require('../../lib/pages/GoogleSearchedPage');
const { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');

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

BeforeAll(async () => {
    setDefaultTimeout(60 * 1000);
    this.GoogleMainPage = new GoogleMainPage(webdriver, driver);
    this.GoogleSearchedPage = new GoogleSearchedPage(webdriver, driver);
});

Given('I am on the Google search page', async () => {
    await this.GoogleMainPage.navigate();
});

When('I search for {string}', async (KEY) => {
    await this.GoogleMainPage.search(KEY);
    this.resultsAmountText = await this.GoogleSearchedPage.getResultsAmountText();
    this.results = await this.GoogleSearchedPage.getAllResultsTextArray();
});

Then('the result amount must be more than {int}', (minResultAmount) => {
    let resultAmount = getResultAmount(this.resultsAmountText);
    return resultAmount > minResultAmount;
});

Then('each result must contain {string}', async (KEY) => {
    this.results.forEach((text) => {
        assert.notEqual(text.toLowerCase().indexOf(KEY.toLowerCase()), -1);
    });
});

AfterAll(async () => {
    driver.quit();
});