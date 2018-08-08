class ComponentExtensions {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000
    ) {
        this.webdriver = webdriver;
        this.driver = driver;
        this.waitTimeout =waitTimeout;
    }

    async waitForElement(selector, waitTimeout = 10000) {
        let result;
        await this.driver.wait(() =>
            this.driver.findElement(selector)
                .then(
                    (element) => {
                        result = element;
                        return true;
                    },
                    (err) => {
                        if (err.name === 'NoSuchElementError') {
                            return false;
                        }
                        return true;
                    },
                ), waitTimeout, 'Unable to find element');
        return result;
    }
}

module.exports = ComponentExtensions;