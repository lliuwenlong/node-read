import * as path from 'path';
import { think } from 'thinkjs';
const isDev = think.env === 'development';

module.exports = [
	{
		handle: 'meta',
		options: {
			logRequest: isDev,
			sendResponseTime: isDev
		}
	},
	{
		handle: 'resource',
		enable: isDev,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(apidoc|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: isDev,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(html|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: isDev,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(uploadImages|favicon\.ico)/
		}
	},
	{
		handle: 'trace',
		enable: !think.isCli,
		options: {
			debug: isDev,
			sourceMap: false,
			error(err: any) {
				think.logger.error(err);
			}
		}
	},
	{
		handle: 'payload',
		options: {
			keepExtensions: true,
			limit: '5mb'
		}
	},
	{
		handle: 'router',
		options: {}
	},
	'logic',
	'controller'
];
