"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const clinicModel_1 = __importDefault(require("../models/clinicModel"));
const getAllClinicServices = (request, response, next) => {
    clinicModel_1.default.find()
        .then((data) => {
        response.status(200).json({
            Services: data,
        });
    })
        .catch((error) => next(error));
};
const createClinicService = (request, response, next) => {
    let clinicServiceObject = new clinicModel_1.default(request.body);
    clinicServiceObject
        .save()
        .then(() => {
        response.status(201).json({ data: "New Clinic Service Added" });
    })
        .catch((error) => next(error));
};
//Update Clinic Services (adding new services)
const updateClinicServices = (request, response, next) => {
    clinicModel_1.default.updateOne({ _id: request.body.id }, {
        $addToSet: {
            services: { $each: request.body.services },
        },
    })
        .then((data) => {
        if (data.matchedCount == 0)
            next(new Error("Clinic Not Found"));
        else {
            response.status(200).json("Clinic Services Has Been Added");
        }
    })
        .catch((error) => next(error));
};
//Update Clinic Services (adding new services)
const deleteClinicServices = (request, response, next) => {
    clinicModel_1.default.updateOne({ _id: request.body.id }, {
        $pull: {
            services: request.body.services,
        },
    })
        .then((data) => {
        if (data.matchedCount == 0)
            next(new Error("Clinic Not Found"));
        else {
            response.status(200).json("Clinic Services Has Been deleted");
        }
    })
        .catch((error) => next(error));
};
module.exports = {
    createClinicService,
    getAllClinicServices,
    updateClinicServices,
    deleteClinicServices,
};
