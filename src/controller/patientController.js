"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deletePatientById = exports.updatePatient = exports.createPatient = exports.getPatientsById = exports.getAllPatients = void 0;
var mongoose = require("mongoose");
// require("../models/patientModel");
// let Patient = mongoose.model("Patient");
var patientModel_1 = require("../models/patientModel");
// Get All patient
var getAllPatients = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, patientModel_1.Patient.find({})];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPatients = getAllPatients;
// // Get All patient
// export const getAllPatients = (request: Request, response: Response, next: NextFunction) => {
//     Patient.find({})
//         .then((data: IPatient[]) => {
//             response.status(200).json(data);
//         })
//         .catch((error) => {
//             next(error);
//         });
// };
// Get patient ByID
var getPatientsById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, patientModel_1.Patient.findOne({ _id: req.params.id })];
            case 1:
                data = _a.sent();
                if (data) {
                    return [2 /*return*/, res.status(200).send(data)];
                }
                else {
                    next(new Error(" patient not found"));
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPatientsById = getPatientsById;
// // Get Patient By ID
// export const getPatientsById = (request: Request, response: Response, next: NextFunction) => {
//     Patient.findOne({ _id: request.params.id })
//         .then((data: IPatient | null) => {
//             if (data) {
//                 response.status(200).json(data);
//             } else {
//                 next(new Error(" patient not found"));
//             }
//         })
//         .catch((error: any) => {
//             next(error);
//         });
// };
// Create patient
var createPatient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, object, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body;
                return [4 /*yield*/, patientModel_1.Patient.create(data)];
            case 1:
                object = _a.sent();
                res.status(201).json(object);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPatient = createPatient;
// Create patient
// export const createPatient = (request: Request, response: Response, next: NextFunction) => {
//     let object = new Patient({
//         name: request.body.name,
//         age: request.body.age,
//         email: request.body.email,
//         password: request.body.password,
//         gender: request.body.gender,
//         historyOfDisease: request.body.historyOfDisease,
//         InsuranceCompany: request.body.InsuranceCompany,
//         reports: request.body.reports
//     });
//     object.save()
//         .then((data) => {
//             response.status(201).json({ data: "added" });
//         })
//         .catch((error) => next(error));
// };
// UpdatePatient
var updatePatient = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, patientModel_1.Patient.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body.id) }, { $set: req.body })];
            case 1:
                data = _a.sent();
                if (!data) {
                    throw new Error("patient not found");
                }
                res.status(200).json({ message: "modified patient" });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePatient = updatePatient;
// Update patient By ID
// export const updatePatient = (request: Request, response: Response, next: NextFunction) => {
//     Patient.findById({ _id: request.body.id })
//         .then((data) => {
//             for (const key in request.body) {
//                 data[key] = request.body[key];
//             }
//             data.save();
//             response.status(200).json({ data: "updated" });
//         })
//         .catch((error) => {
//             next(error);
//         });
// };
// delete Patient
var deletePatientById = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, patientModel_1.Patient.deleteOne({
                        _id: mongoose.Types.ObjectId(request.body.id)
                    })];
            case 1:
                data = _a.sent();
                if (data.deletedCount < 1)
                    throw new Error("patient  not found");
                response.status(200).json({ message: "patient teacher" });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePatientById = deletePatientById;
// Delete Admin By ID
// export const deletePatientById = (request: Request, response: Response, next: NextFunction) => {
//     Patient.deleteOne({ _id: request.params.id })
//         .then((data: any) => {
//             if (!data) {
//                 next(new Error(" patinet not found"));
//             } else {
//                 response.status(200).json({ data: "deleted" });
//             }
//         })
//         .catch((error: any) => {
//             next(error);
//         });
// };
