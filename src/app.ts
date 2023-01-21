import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { cors_config } from './config/cors';

const swaggerDocument = require('./doc/openapi.json');
const userRoutes = require('./api/routes/users/user_routes');
const authRoutes = require('./api/routes/users/auth_routes');

const app: Express = express();

app.use(
	morgan(
		'[:date[web]] " :method :url " :status :response-time ms :res[content-length]'
	)
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(cors_config));

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
	res.redirect('/documentation');
});

app.use('/', userRoutes);
app.use('/', authRoutes);

module.exports = app;
