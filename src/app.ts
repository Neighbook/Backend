import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { apiConfig } from "./config/api_config";



const swaggerDocument = require("../open-api.json");
const foo_route = require("./api/routes/foo_routes");

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/documentation");
});

app.use("/", foo_route);

module.exports = app;
