import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { apiConfig } from './config/api_config'
import { cors_config } from './config/cors'
import cors from 'cors'
import morgan from 'morgan'
const swaggerDocument = require('./doc/open-api.json')
const userRoutes = require('./api/routes/user_routes')

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

module.exports = app
