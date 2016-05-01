var broccoliHandlebars = require('../');

var tree = broccoliHandlebars('templates', {
  srcDir: './templates',
  runtimePath: './handlebarsRuntime'
});

module.exports = tree;