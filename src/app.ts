import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
const server = express();

import clinicServicesRoute from "./routes/clinicRoute";

mongoose
  .connect("mongodb://localhost:27017/CMSDB")
  .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT || 8080, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => console.log("DB Connection Error" + error));

server.use(morgan(":method :url"));
server.use(express.json());

server.use(clinicServicesRoute);

server.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({ Message: "EndPoint Not Found" });
});

server.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    let status: number = error.status || 500;
    response.status(status).json({ Message: "Internal Error" + error });
  }
);
