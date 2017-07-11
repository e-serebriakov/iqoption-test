/* eslint global-require: "off" */

if (WP_IS_DEV) {
  module.exports = require('./configureStore.dev.js');
} else {
  module.exports = require('./configureStore.prod.js');
}
