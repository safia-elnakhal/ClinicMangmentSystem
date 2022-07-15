"use strict";
exports.__esModule = true;
// import * as express from "express";
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var employeeRoute_1 = require("../src/route/employeeRoute");
require("dotenv").config();
var app = express();
var port = process.env.PORT || 8080;
var cmsDB_URL = "mongodb://".concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_NAME);
mongoose
    .connect(cmsDB_URL)
    .then(function () {
    app.listen(port, function () {
        console.log("App listens on port", port);
    });
})["catch"](function (error) {
    console.log("DB Connection Error", error);
});
app.use(cors());
app.use(morgan(":method :url :status - :response-time ms"));
app.use(express.json());
app.use(employeeRoute_1["default"]);
// not-found middleware
app.use(function (request, response, next) {
    // throw new Error("very big error"); //throwing an error causes the error handling middleware to work
    response.status(404).json({ message: "Endpoint not found." });
});
// handling errors middleware
app.use(function (error, request, response, next) {
    response
        .status(error.status || 500)
        .json({ message: "Internal Error", details: error.message });
});
