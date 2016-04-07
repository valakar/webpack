'use strict';

let server = require('node-static');
let file = new server.Server('./public');
let env = require('./env');

require('http').createServer(function (request, response) {
	if (!/\./.test(request.url)) {
		request.url = '/';
	}
	file.serve(request, response);
}).listen(env.webpackServer.port);