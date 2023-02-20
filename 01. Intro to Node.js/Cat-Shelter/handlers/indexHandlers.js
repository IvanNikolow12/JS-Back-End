const homeHandler = require('./home');
const staticFiles = require('./static-files');
const catsHandler = require('./cats');

module.exports = [homeHandler, staticFiles, catsHandler];