'use strict';

/*let moduleName = location.pathname.slice(1);

let context = require.context('./routes/', true, /\.js$/);

context.keys().forEach(path => {
	let module = context(path);
	module();
});*/

let handler;

try {
	let context = require.context('./routes/', true,  /^\.\//);
	handler = context('./' + moduleName);
} catch (e) {
	alert("No such path");
}

if (handler) {
	handler(function(route) {

		route();

	});
}
