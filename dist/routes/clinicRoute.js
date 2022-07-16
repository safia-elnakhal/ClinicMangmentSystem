"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const clinic_1 = __importDefault(require("../controllers/clinic"));
const router = express_1.default.Router();
router
    .route("/clinic")
    .post(clinic_1.default.createClinicService)
    .get(clinic_1.default.getAllClinicServices);
router
    .route("/clinic/services")
    .put(clinic_1.default.updateClinicServices)
    .delete(clinic_1.default.deleteClinicServices);
module.exports = router;
