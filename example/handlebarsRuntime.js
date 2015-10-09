var handlebars = require('handlebars/dist/handlebars.runtime');

/**
 * the generated templated will use the handlebars object defined
 * in this module. So they can use the helpers defined here.
 * However, you can add helpers in runtime to the handlebars object
 * defined in this file.
 */

handlebars.registerHelper('upper', function(str) {
	return str.toUpperCase();
})

module.exports = handlebars;