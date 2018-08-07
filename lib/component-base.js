class ComponentBase {
    constructor(
        webdriver,
        driver,
        waitTimeout = 10000,
      ) {
        this.webdriver = webdriver;
        this.driver = driver;
        this.waitTimeout = waitTimeout;
        this.log = myVar => process.stdout.write(`${myVar}\n`);
    }
}

module.exports = ComponentBase;