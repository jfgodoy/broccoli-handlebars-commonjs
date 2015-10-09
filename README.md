# Broccoli Handlebars Commonjs

[Broccoli](https://github.com/broccolijs/broccoli) plugin that gives us an easy way to precompile [Handlebars](http://handlebarsjs.com/) templates.

This plugin is based on [jakkor/broccoli-handlebars-precompiler](https://github.com/jakkor/broccoli-handlebars-precompiler), and create a js file following commonjs format for every handlebar file in the tree.


### Install
```
npm install --save broccoli-handlebars-commonjs
```

### Example
```js
var broccoliHandlebars = require('broccoli-handlebars-commonjs');

var tree = broccoliHandlebars(tree, {
  srcDir: 'js/templates'
});

```

### How to use it in javascript application

Sample templates files.

```
productList.hbs
products/item.hbs

```

After precompiling accessing those is quite easy.

Templates from main folder:
```javascript
var template = require('./productList');
template({hondaCivic:"Honda Civic for sale", citroenXsara:"Citroen Xsara for sale"});
```

Templates from subfolders:
```javascript
var template = require('./products/item');
template({name:"Honda Civic", price:"10.000"});
```

### Usage in Broccoli file

```js
var tree = broccoliHandlebars(tree, options);
```
- **tree** - a broccoli tree
- **options** - options, see below

### Options

#### srcDir (required)

Source directory where handlebars are stored.

#### extensions (optional)

Array of handlebars file extensions. Default is hbs and handlebars.

#### targetExtension (optional)

Array of target extensions. Default is js.

#### handlebars (optional)
A Handlebars instance. Useful if you need to make sure you are using a specific version.
```js
var tree = broccoliHandlebars(tree, {
  handlebars: require('handlebars')
});
```

#### runtimePath (optional)
Path to handlebars runtime. Useful if you need to make sure you are using a specific version or want to use helpers, partials and another stuff in the compiled templates.

```js
// node_modules path
var tree = broccoliHandlebars(tree, {
  runtimePath: 'handlebars/dist/handlebars.runtime.js'
});

// local path
var tree = broccoliHandlebars(tree, {
  runtimePath: './handlebars'
});
```

### Helpers and Partials
If you want to use helpers or partials, you need to create a module that exports a runtime handlebars, and configure the option `runtimePath` of this plugin.

For example:

First define a module that exports a handlebars runtime with a helper
```js
/* project/handlebarsRuntime.js */
/* this module add a helper to handlebars runtime */

var handlebars = require('handlebars/dist/handlebars.runtime');

handlebars.registerHelper('upper', function(str) {
	return str.toUpperCase();
});

module.exports = handlebars;
```
Then, in the Brocfile.js configure the `runtimePath` to the above file.
```js
/* project/Brocfile.js */
var broccoliHandlebars = require('broccoli-handlebars-commonjs');

var tree = broccoliHandlebars('templates', {
  srcDir: './',
  runtimePath: './handlebarsRuntime'
});

module.exports = tree;
```
The compiled templates will reference correctly the runtime file, and they will be able to use the helper defined.
