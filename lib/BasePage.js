const ComponentExtensions = require('./ComponentExtentsions');

class BasePage extends ComponentExtensions {
    constructor(
        webdriver,
        driver,
        targetUrl = null,
        waitTimeout = 10000,
    ) {
        super(webdriver, driver, waitTimeout);
        this.webdriver = webdriver;
        this.driver = driver;
        this.targetUrl = targetUrl;
        this.waitTimeout = waitTimeout;
    }

    async navigate() {
        await this.driver.get(this.targetUrl);
    }
}

module.exports = BasePage;