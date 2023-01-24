import http from 'http';

import { UsersDataSource } from './core/datastores/typeorm_datastores';
import { VaultService } from './services/users_service/vault_service';

const app = require('./app');

require('dotenv').config();

const normalizePort = (val: string) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = (error: { syscall: string; code: any }) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			// Sugesstion: use a different port
			console.log('We will try to use a different port');
			port = Number(port) + 1;
			app.set('port', port);
			server.listen(port);
			break;
		default:
			throw error;
	}
};

VaultService.initialize();

const server = http.createServer(app);

server.listen(port);

try {
	UsersDataSource.initialize();
	console.log('Connection with database has been established successfully.');
	server.on('error', errorHandler);
	server.on('listening', () => {
		const address = server.address();
		const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});
} catch (error) {
	console.error('Unable to connect to the database:', error);
}
