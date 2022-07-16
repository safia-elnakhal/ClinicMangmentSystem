"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = (0, express_1.default)();
const clinic_1 = __importDefault(require("./routes/clinic"));
mongoose_1.default
    .connect("mongodb://localhost:27017/CMSDB")
    .then(() => {
    console.log("DB Connected");
    server.listen(process.env.PORT || 8080, () => {
        console.log("Server is running");
    });
})
    .catch((error) => console.log("DB Connection Error" + error));
server.use((0, morgan_1.default)(":method :url"));
server.use(express_1.default.json());
server.use(clinic_1.default);
server.use((request, response, next) => {
    response.status(404).json({ Message: "EndPoint Not Found" });
});
server.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({ Message: "Internal Error" + error });
});
