const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const path = require('path');
const socketio = require('think-websocket-socket.io');
const { DateFile } = require('think-logger3')
import { think } from "thinkjs";
const isDev = think.env === "development";

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
	type: 'file',
	common: {
		timeout: 24 * 60 * 60 * 1000 // millisecond
	},
	file: {
		handle: fileCache,
		cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
		pathDepth: 1,
		gcInterval: 24 * 60 * 60 * 1000 // gc interval
	}
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
	type: 'mysql',
	common: {
		logConnect: isDev,
		logSql: isDev,
		logger: (msg: string) => think.logger.info(msg)
	},
	mysql: {
		handle: mysql,
		database: 'read',
		prefix: 'read_',
		encoding: 'utf8',
		host: '106.12.108.135',
		port: '3306',
		user: 'root',
		password: 'root123..',
		dateStrings: true,
		connectionLimit: 10,
		acquireWaitTimeout: isDev ? 3000 : 0
	}
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
	type: 'file',
	common: {
		cookie: {
			name: 'thinkjs'
			// keys: ['werwer', 'werwer'],
			// signed: true
		}
	},
	file: {
		handle: fileSession,
		sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
	}
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
	type: 'nunjucks',
	common: {
		viewPath: path.join(think.ROOT_PATH, 'view'),
		sep: '_',
		extname: '.html'
	},
	nunjucks: {
		handle: nunjucks
	}
};

exports.logger = {
	type: 'dateFile',
	dateFile: {
		handle: DateFile,
		level: 'ALL',
		absolute: true,
		pattern: '-yyyy-MM-dd',
		alwaysIncludePattern: true,
		filename: path.join(think.ROOT_PATH, 'logs/journal.log')
	}
};

exports.websocket = {
	type: 'socketio',
	common: {},
	socketio: {
		handle: socketio,
		path: '/socket.io',
		adapter: null,
		messages: {
			message: '/api/webSocket/sendMessage'
		}
	}
};