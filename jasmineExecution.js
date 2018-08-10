const Jasmine = require('jasmine');
const jasmine = new Jasmine();

const [,, ...args] = process.argv;
module.exports = args[0].toLowerCase() || "firefox";

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();