class ComponentExtensions {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000
    ) {
        this.webdriver = webdriver;
        this.driver = driver;
        this.waitTimeout = waitTimeout;
    }

    async waitForElementBySelector(selector, waitTimeout = 10000) {
        await this.driver.wait(() =>
            this.driver.findElement(selector)
                .then(
                    () => {
                        return true;
                    },
                    (err) => {
                        if (err.name === 'NoSuchElementError') {
                            return false;
                        }
                        return true;
                    },
                ), waitTimeout, 'Unable to find element');
    }
}

module.exports = ComponentExtensions;