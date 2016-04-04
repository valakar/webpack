'use strict';

document.getElementById('loginButton').onclick = () => {
	require.ensure(['./login'], require => {
		let login = require('./login');

		login();
	}, 'auth');

};

document.getElementById('logoutButton').onclick = () => {

	require.ensure([], require => {
		let logout = require('./logout');

		logout();
	}, 'auth');
};