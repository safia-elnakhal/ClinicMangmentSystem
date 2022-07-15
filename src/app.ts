// import * as express from "express";
import express = require('express');
import { Request, Response, NextFunction } from 'express'
import morgan = require("morgan");
import * as mongoose from "mongoose";
import cors = require("cors");
import routes from "../src/route/employeeRoute"

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

const cmsDB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose
.connect(cmsDB_URL)
.then(() => {
  app.listen(port, () => {
    console.log("App listens on port", port);
  });
})
.catch((error :any) => {
  console.log("DB Connection Error", error);
});

app.use(cors());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());
app.use(routes)


// not-found middleware
app.use((request:Request, response:Response, next:NextFunction) => {
  // throw new Error("very big error"); //throwing an error causes the error handling middleware to work
  response.status(404).json({ message: "Endpoint not found." });
});

// handling errors middleware
app.use((error:any, request:Request, response:Response, next:NextFunction) => {
  response
    .status(error.status || 500)
    .json({ message: "Internal Error", details: error.message });
});
