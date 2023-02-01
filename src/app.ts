import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import { healthRoutes } from './api/routes/health/health_routes';
import { authRoutes } from './api/routes/users/auth_routes';
import { fileUploadRouter } from './api/routes/users/file_upload_routes';
import { userRoutes } from './api/routes/users/user_routes';
import { apiConfig } from './config/api_config';
import { cors_config } from './config/cors';
import {authMiddleware} from "./middlewares/auth/auth_middleware";

//const swaggerDocument = require('./doc/openapi.json');
const socialRoutes = require('./api/routes/social_routes');

const upload = multer();

const app: Express = express();

app.use(morgan('[:date[web]] " :method :url " :status :response-time ms :res[content-length]'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(upload.single('file'));
app.use(cors(cors_config));

//app.use(apiConfig.base_path + '/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
	res.redirect(apiConfig.base_path + '/documentation');
});

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', fileUploadRouter);
app.use('/', healthRoutes);
app.use('/social', authMiddleware, socialRoutes);

export default app;
