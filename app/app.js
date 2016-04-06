'use strict';

let moduleName = location.pathname.slice(1);


/**
 * Part 1
 */

/*
require('bundle!./routes/' + moduleName)(route => {
	route();
});*/

/**
 * Part 2
 */

let handler;

try {
	let context = require.context('bundle!./routes/', true, /^\.\//);
	handler = context('./' + moduleName);
} catch (e) {
	alert("No such path");
}

if (handler) {
	handler(function(route) {
		route();
	});
}
