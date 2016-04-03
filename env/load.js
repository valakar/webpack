'use strict';

const
	dotenv = require('dotenv'),
	chalk = require('chalk'),
	fs = require('fs');

module.exports = function(envPath) {

	try {
		fs.statSync(envPath);
		dotenv.config({
			path: envPath
		})
	} catch(err) {
		if (err.code !== 'ENOENT') {
			throw err;
		}
		console.log('[' + chalk.red('!Warning') + '] Can\'t load ' + chalk.magenta(envPath) + ' file');
	}



};