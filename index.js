var Filter = require('broccoli-filter'),
    handlebars = require('handlebars'),
    path = require('path');

module.exports = HandlebarsFilters;

HandlebarsFilters.prototype = Object.create(Filter.prototype);
HandlebarsFilters.prototype.constructor = HandlebarsFilters;

function HandlebarsFilters (tree, options) {
  if (!(this instanceof HandlebarsFilters)) {
    return new HandlebarsFilters(tree, options);
  }

  this.options = options || {};

  if (!options.srcDir) {
    throw new Error('HandlebarsFilters: ERROR! No srcDir set.');
  }

  // Set default options
  this.options.extensions = options.extensions || ['hbs', 'handlebars'];
  this.options.targetExtension = options.targetExtension || ['js'];
  this.handlebars = this.options.handlebars || handlebars;
  this.options.runtimePath = this.options.runtimePath || 'handlebars/dist/handlebars.runtime.js'; 

  // Set options necessary for the filter
  var filterOptions = {
    srcDir: this.options.srcDir,
    extensions: this.options.extensions,
    targetExtension: this.options.targetExtension
  };

  Filter.call(this, tree, filterOptions);
}

HandlebarsFilters.prototype.processString = function (string, srcFile) {
  try {
    var precompiled = this.handlebars.precompile(string, this.options);
    var runtimePath = this.getRuntimePath(srcFile);
    var output = 'var Handlebars = require(\'' + runtimePath + '\'); module.exports = Handlebars.template(' + precompiled + ');';
    return output;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get the handlebars runtime path
 * @param  {string} srcFile src file path
 * @return {string} handlebars runtime path
 */
HandlebarsFilters.prototype.getRuntimePath = function (srcFile) {
  // node module
  if (/^\w/.test(this.options.runtimePath)) {
    return this.options.runtimePath;
  }

  // path
  var runtimePathAbs = path.resolve(this.options.runtimePath);
  return path.relative(srcFile, runtimePathAbs);
};