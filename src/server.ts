const http = require("http");
const app = require("./app");
const sequelize = require("./core/database/sequelize");



const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error: { syscall: string; code: any }) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

});

server.listen(port);

try {
    sequelize.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// const outputFile = "../open-api.json";
// const endpointsFiles = ["./api/routes/*.ts"];
// import swaggerAutogen from "swagger-autogen";
// import { metadata } from "./config/open-api";
// swaggerAutogen()(outputFile, endpointsFiles, metadata);
