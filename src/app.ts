import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';

import { fileUploadRoutes } from './api/routes/users/file_upload_routes';
import { cors_config } from './config/cors';

const swaggerDocument = require('./doc/openapi.json');
const userRoutes = require('./api/routes/users/user_routes');
const authRoutes = require('./api/routes/users/auth_routes');

const upload = multer();

const app: Express = express();

app.use(morgan('[:date[web]] " :method :url " :status :response-time ms :res[content-length]'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(upload.single('file'));

app.use(cors(cors_config));

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
	res.redirect('/documentation');
});

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', fileUploadRoutes);

module.exports = app;
