class PageBase {
    constructor(
        webdriver,
        driver,
        targetUrl = null,
        waitTimeout = 10000,
    ) {
        this.webdriver = webdriver;
        this.driver = driver;
        this.targetUrl = targetUrl;
        this.waitTimeout = waitTimeout;
    }

    async navigate() {
        await this.driver.get(this.targetUrl);
    }
}

module.exports = PageBase;