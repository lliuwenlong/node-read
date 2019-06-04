import * as path from 'path';
import { think } from 'thinkjs';
const isDev = think.env === 'development';

module.exports = [
	{
		handle: 'meta',
		options: {
			logRequest: true,
			sendResponseTime: true
		}
	},
	{
		handle: 'resource',
		enable: true,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(apidoc|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: true,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(uploadImg|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: true,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(html|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: true,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(uploadImages|favicon\.ico)/
		}
	},
	{
		handle: 'resource',
		enable: true,
		options: {
			root: path.join(think.ROOT_PATH, 'public'),
			publicPath: /^\/(uploadVdeio|favicon\.ico)/
		}
	},
	{
		handle: 'trace',
		enable: !think.isCli,
		options: {
			enable: true,
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
