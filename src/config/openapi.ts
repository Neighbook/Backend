import { environnement } from './environnement';

export const metadata = {
	info: {
		title: environnement.api_name,
		version: environnement.api_version,
		description: environnement.api_description,
		license: {
			name: environnement.licence_name,
			url: environnement.licence_url,
		},
		contact: {
			name: 'John Folly',
			url: 'https://github.com/Neighbook/Backend',
			email: 'john.folly@utbm.fr',
		},
	},
	servers: [
		{
			url:
				'http://' +
				environnement.api_host +
				':' +
				environnement.api_port +
				'',
			description: 'Local server',
		},
	],
	security: [{ bearerAuth: [] }],
	tags: [
		{
			name: 'User',
			description: 'User management',
		},
		{
			name: 'Auth',
			description: 'Authentication',
		},
	],
};
