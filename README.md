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

### srcDir (required)

Source directory where handlebars are stored.

### extensions (optional)

Array of handlebars file extensions. Default is hbs and handlebars.

### targetExtension (optional)

Array of target extensions. Default is js.
