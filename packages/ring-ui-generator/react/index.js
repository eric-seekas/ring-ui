const generateComponent = require('../generate-component');

module.exports = generateComponent({
  fileTemplates: [
    '%s.js',
    '%s.scss',
    '%s.gemini.js',
    '%s.test.js',
  ]
});