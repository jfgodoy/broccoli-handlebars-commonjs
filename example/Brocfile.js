var broccoliHandlebars = require('../');

var tree = broccoliHandlebars('templates', {
  srcDir: './',
  runtimePath: './handlebars'
});

module.exports = tree;