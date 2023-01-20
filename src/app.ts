import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { cors_config } from './config/cors'
import cors from 'cors'
import morgan from 'morgan'
const swaggerDocument = require('./doc/openapi.json')
const userRoutes = require('./api/routes/users/user_routes')
const authRoutes = require('./api/routes/users/auth_routes')

let app: Express = express()

app.use(morgan('[:date[web]] " :method :url " :status :response-time ms :res[content-length]'))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(cors_config))

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req: Request, res: Response) => {
    res.redirect('/documentation')
})

app.use('/', userRoutes)
app.use('/', authRoutes)

module.exports = app
