'use strict';

const
	loadEnv = require('./load'),
	getenv = require('getenv');

loadEnv('.env');

module.exports = {
	NODE_ENV: getenv('NODE_ENV', 'DEVELOPMENT'),
	webpackServer: {
		host: getenv('WEBPACK_SERVER_HOST', 'localhost'),
		port: getenv.int('WEBPACK_SERVER_PORT', 3000)
	}
};