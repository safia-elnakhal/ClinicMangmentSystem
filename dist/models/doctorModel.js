"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId, ref: "address"
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
});
module.exports = (0, mongoose_1.model)("doctors", doctorSchema);
