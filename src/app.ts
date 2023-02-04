import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { readFileSync } from 'fs';
import moment from 'moment-timezone';
import morgan from 'morgan';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import { healthRoutes } from './api/routes/health/health_routes';
import { socialRoutes } from './api/routes/social/social_routes';
import { authRoutes } from './api/routes/users/auth_routes';
import { fileUploadRouter } from './api/routes/users/file_upload_routes';
import { userPreferenceRoutes } from './api/routes/users/user_preference';
import { userRoutes } from './api/routes/users/user_routes';
import { apiConfig } from './config/api_config';
import { cors_config } from './config/cors';
import { authMiddleware, managedResourceMiddleware } from './middlewares/auth/auth_middleware';

const swaggerDocument = JSON.parse(readFileSync(__dirname + '/doc/openapi.json', 'utf8'));

const upload = multer();

const app: Express = express();
morgan.token('date', (req, res, tz) => {
	return moment().tz(String(tz)).format('YYYY-MM-DD HH:mm:ss:SSS');
});

app.use(morgan(':date[Asia/Taipei]\t:method\t:status\t:response-time ms \t:res[content-length]\t:url'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(upload.single('file'));
app.use(cors(cors_config));

app.use(apiConfig.base_path + '/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
	res.redirect(apiConfig.base_path + '/documentation');
});

app.use('/', authRoutes);
app.use('/', healthRoutes);
app.use('/', fileUploadRouter);
app.use('/', authMiddleware, userRoutes);
app.use('/', authMiddleware, managedResourceMiddleware, userPreferenceRoutes);
app.use('/social', authMiddleware, socialRoutes);

export default app;
