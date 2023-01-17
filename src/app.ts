import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { apiConfig } from './config/api_config'
import { cors_config } from './config/cors'
import cors from 'cors'
import morgan from 'morgan'
const swaggerDocument = require('./open-api.json')
const userRoutes = require('./api/routes/user_routes')

const app: Express = express()

app.use(morgan('[:date[web]] " :method :url " :status :response-time ms :res[content-length]'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors(cors_config))

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req: Request, res: Response) => {
    res.redirect('/documentation')
})

app.use('/', userRoutes)

module.exports = app
