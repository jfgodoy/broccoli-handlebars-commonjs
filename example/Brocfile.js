var broccoliHandlebars = require('../');

var tree = broccoliHandlebars('templates', {
  srcDir: './',
  runtimePath: './handlebarsRuntime'
});

module.exports = tree;