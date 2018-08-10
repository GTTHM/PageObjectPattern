(function() {
    "use strict";

    const Jasmine = require('jasmine');
    const jasmine = new Jasmine();

    const args = require('yargs').argv;
    process.env.BROWSER = (args.browserName || "firefox").toLowerCase();

    jasmine.loadConfigFile('spec/support/jasmine.json');
    jasmine.execute();
})();