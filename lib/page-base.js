const ComponentBase = require('./component-base');

class PageBase extends ComponentBase {
    constructor(
        webdriver,
        driver,
        targetUrl = null,
        waitTimeout = 10000,
    ) {
        super(webdriver, driver, waitTimeout);
        this.targetUrl = targetUrl;
        this.waitTimeout = waitTimeout;
    }

    async navigate() {
        await this.driver.navigate().to(this.targetUrl);
    }
}

module.exports = PageBase;