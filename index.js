var Filter = require('broccoli-filter'),
    handlebars = require('handlebars'),
    path = require('path');

module.exports = HandlebarsFilters;

HandlebarsFilters.prototype = Object.create(Filter.prototype);
HandlebarsFilters.prototype.constructor = HandlebarsFilters;

function HandlebarsFilters (tree, options) {
  if (!(this instanceof HandlebarsFilters)) {
    return new HandlebarsFilters(tree, options)
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
  filterOptions = {
    srcDir: this.options.srcDir,
    extensions: this.options.extensions,
    targetExtension: this.options.targetExtension
  };

  Filter.call(this, tree, filterOptions);
}

HandlebarsFilters.prototype.processString = function (string, srcFile) {
  try {
    var templateName = this.getTemplateName(srcFile);
    var precompiled = this.handlebars.precompile(string, this.options);
    var runtimePath = this.getRuntimePath(srcFile);
    var output = 'var Handlebars = require(\'' + runtimePath + '\'); module.exports = Handlebars.template(' + precompiled + ');';
    return output;
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Get the template name
 * @param  {string} srcFile src file path
 * @return {string} template name
 */
HandlebarsFilters.prototype.getTemplateName = function (srcFile) {
    var templateName = srcFile;

    //Remove templates path
    if (this.options.srcDir !== null) {
      templateName = templateName.replace(this.options.srcDir, '');
    }

    //Remove / if there is any
    if (templateName.indexOf('/') === 0) {
      templateName = templateName.substr(1, templateName.length);
    }

    //Remove extension
    for (var i = 0; i < this.options.extensions.length; i++) {
      var ext = '.' + this.options.extensions[i];
      var extPos = templateName.indexOf(ext);
      if (extPos > -1 && extPos === (templateName.length - ext.length)) {
        templateName = templateName.substr(0, extPos);
      }
    }

    return templateName;
}

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
}