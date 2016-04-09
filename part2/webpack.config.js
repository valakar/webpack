'use strict';

const
	DEV = 'development',
	PROD = 'production',
	env = require('./env'),
	NODE_ENV = env.NODE_ENV || DEV,
	webpack = require('webpack'),
	logEnv = require('./env/log');

const 
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	autoprefixer = require('autoprefixer');

logEnv(env);

module.exports = {
	context: __dirname + '\\src',
	entry: {
		app: './app'
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		publicPath: '/',
		library: '[name]'
	},

	watch: NODE_ENV == DEV,

	watcherOptions: {
		aggregateTimeout: 100
	},

	devtool: NODE_ENV == DEV ? 'cheap-inline-module-source-map' : null,

	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: false
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new ExtractTextPlugin('styles.css', {
			allChunks: true
		})
	],

	module: {

		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					plugins: ['transform-es2015-modules-commonjs'],
					presets: ['es2015', 'stage-0']
				}
			},
			{
				test: /\.sass$/,
				loader: ExtractTextPlugin.extract('css!postcss!sass')
			}
		],

		resolve: {
			modulesDirectories: ['node_modules'],
			extensions: ['', '.js', 'sass']
		},

		resolveLoader: {
			modulesDirectories: ['node_modules'],
			moduleTemplates: ['*-loader', '*'],
			extensions: ['', '.js']
		}
	},

	postcss: () => {
		return [autoprefixer];
	}
};

if (NODE_ENV == PROD) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	)
}