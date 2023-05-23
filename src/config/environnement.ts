import dotenv from 'dotenv';

dotenv.config();

export const environnement = {
	api_name: process.env.API_NAME || 'Neighbook API',
	api_version: process.env.API_VERSION || '0.1.0',
	api_description: process.env.API_DESCRIPTION || 'Neighbook : Tutored project of FISA 3 - A22',
	api_port: process.env.API_PORT || 3000,
	api_host: process.env.API_HOST || 'localhost',
	api_base_path: process.env.API_BASE_PATH || '/',
	api_schemes: process.env.API_SCHEMES || 'http',
	api_swagger: process.env.API_SWAGGER || '2.0',
	api_swagger_path: process.env.API_SWAGGER_PATH || '/documentation',
	api_swagger_json_path: process.env.API_SWAGGER_JSON_PATH || '/documentation.json',
	api_swagger_ui_path: process.env.API_SWAGGER_UI_PATH || '/documentation-ui',
	jwt_secret: process.env.JWT_SECRET || 'jwtsecret',
	jwt_secret_file: process.env.JWT_SECRET_FILE || '/run/secrets/jwt_secret',
	jwt_token_expiration_time: process.env.JWT_TOKEN_EXPIRATION_TIME || '2 days',
	jwt_token_issuer: process.env.JWT_ISSUER_NAME || 'neighbook-api',
	jwt_token_audience: process.env.JWT_AUDIENCE_NAME || 'neighbook-api',
	argon2_salt_key_name: process.env.ARGON2_SECRET_KEY_NAME || 'argon2secret',
	vault_keys: [
		{
			name: process.env.JWT_SECRET_NAME || 'jwtsecretname',
			type: process.env.JWT_SECRET_TYPE || 'hmac',
			length: Number(process.env.JWT_SECRET_LENGTH) || 32,
		},
	],
	database: {
		dialect: process.env.DATABASE_DIALECT || 'postgres',
		host: process.env.DATABASE_HOST || 'localhost',
		port: Number(process.env.DATABASE_PORT) || 5432,
		username: process.env.DATABASE_USER || 'postgres',
		password: process.env.DATABASE_PASSWORD || 'postgres',
		users_service_database: process.env.DATABASE_SERVICE_USER || 'users',
		social_service_database: process.env.DATABASE_SERVICE_SOCIAL || 'social',
		use_ssl: Boolean(process.env.DATABASE_USE_SSL) || false,
		logging: Boolean(process.env.DATABASE_LOGGING) || false,
		synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || false,
		timeout: Number(process.env.DATABASE_TIMEOUT) || 2000,
	},
	storage: {
		host: process.env.MINIO_HOST || 'localhost',
		port: Number(process.env.MINIO_PORT) || 9000,
		bucket: process.env.MINIO_BUCKET || 'neighbook',
		accessKey: process.env.MINIO_ACCESS_KEY || 'minio',
		secretKey: process.env.MINIO_SECRET_KEY || 'miniominio',
		useSSL: Boolean(process.env.MINIO_USE_SSL) || false,
		accepted_files_extensions: process.env.STORAGE_ACCEPTED_FILES_EXTENSIONS || 'jpg,jpeg,png,gif',
		accepted_files_max_size: process.env.STORAGE_ACCEPTED_FILES_MAX_SIZE || 1000000,
		accepted_files_types: process.env.STORAGE_ACCEPTED_FILES_TYPES || 'image/jpeg,image/png,image/gif',
	},
	logging: {
		level: process.env.LOGGING_LEVEL || 'info',
		format: process.env.LOGGING_FORMAT || 'dev',
		date_format: process.env.LOGGING_DATE_FORMAT || 'iso',
	},
	user_default_preferences: [
		{
			cle_preference: 'langue',
			valeur_preference: 'fr',
		},
		{
			cle_preference: 'theme',
			valeur_preference: 'light',
		},
	],
	licence_name: process.env.LICENCE_NAME || 'MIT',
	licence_url: process.env.LICENCE_URL || 'https:github.com/Neighbook/Neighbook/blob/master/LICENSE',
};
