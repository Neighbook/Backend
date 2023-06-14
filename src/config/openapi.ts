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
			name: 'Belfort-Montbeliard University of Technology (UTBM) Computer science apprenticeship students',
			url: 'https://github.com/Neighbook/Backend',
			email: 'john.folly@utbm.fr',
		},
	},
	host: environnement.api_host + ':' + environnement.api_port,
	base_path: '/api' + environnement.api_base_path + 'v' + environnement.api_version[0],
	servers: [
		{
			description: 'Local server',
		},
	],
	schemes: ['http', 'https'],
	security: [{ bearerAuth: [] }],
	tags: [
		{
			name: 'Health',
			description: 'Health check endpoint',
		},
		{
			name: 'Auth',
			description: 'Authentication',
		},
		{
			name: 'Profile',
			description: 'User profile management',
		},
		{
			name: 'Social',
			description: 'Social services',
		},
		{
			name: 'File',
			description: 'File Uploas',
		},
		{
			name: 'User',
			description: 'User management',
		},
		{
			name: 'User Preferences',
			description: 'User preferences management',
			prefix: 'user_preference',
		},
	],
};
