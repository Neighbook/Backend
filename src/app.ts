import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from 'swagger-autogen';
const swaggerDocument = require('../open-api.json')
const outputFile = '../open-api.json';
const endpointsFiles = ['./api/routes/*.ts']
const route = require("./api/routes/foo_routes");
import { metadata } from './config/open-api';


const app: Express = express();


// swaggerAutogen()(outputFile, endpointsFiles, metadata);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.json({ id: 1, name: "Catcher in the Rye" })
});

app.use('/', route);

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

module.exports = app;