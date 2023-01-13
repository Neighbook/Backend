import express from "express";
const foo_route = express.Router();
import { FooController } from "../controller/foo_controller";

// FooController
foo_route.get("/foo", (req: express.Request, res) => {
  // #swagger.tags = ['FOO']
  const response = FooController.getFoo(req.body.id);
  res.status(200).json(response);
});

foo_route.post("/foo", (req: express.Request, res) => {
  // #swagger.tags = ['FOO']
  const response = FooController.createFoo(req.body.name);
  res.status(201).json(response);
});

module.exports = foo_route;
