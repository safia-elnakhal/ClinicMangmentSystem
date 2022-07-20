// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var Prescription = new Schema({
//   medicineId: {
//     type: Medicine,
//     required: true
//   },
//   doctoId: {
//     type: String
//   },
//   patientId: {
//     type: String
//   },
//   Consultation: {
//     type: Date
//   }
// });

import { Schema, Types, model, Document } from 'mongoose'

interface IPrescription extends Document {
    medicineId: Types.ObjectId
    doctorId: Types.ObjectId
    patientId: Types.ObjectId
    consultation: Date
}

const PrescriptionSchema = new Schema<IPrescription>({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    medicineId: {
        type: Schema.Types.ObjectId,
        ref: 'medicines',
        required: true,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: true,
    },
    consultation: {
        type: Schema.Types.Date,
    },
})

const Prescription = model<IPrescription>('prescriptions', PrescriptionSchema)

export { Prescription, IPrescription }
