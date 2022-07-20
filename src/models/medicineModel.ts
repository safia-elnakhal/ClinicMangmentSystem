// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var Medicine = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   takingInstructions: {
//     type: String
//   },
//   time: {
//     type: Date
//   },
//   description: {
//     type: String
//   }
// });

import { Schema, model, Document } from 'mongoose'

interface IMedicine extends Document {
    name: string
    description: string
    expirationDate: Date
    takingInstructions: string
}

const MedicineSchema = new Schema<IMedicine>({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
    },
    expirationDate: {
        type: Schema.Types.Date,
    },
    takingInstructions: {
        type: Schema.Types.String,
    },
})

const Medicine = model<IMedicine>('medicines', MedicineSchema)

export { Medicine, IMedicine }
