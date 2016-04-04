'use strict';

document.getElementById('loginButton').onclick = () => {
	console.log('test');
	require.ensure(['./login'], require => {
		let login = require('./login');

		login();
	});
};