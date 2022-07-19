import { Schema, model, Types } from 'mongoose'

interface IDoctor {
    name: string
    age: number
    address: Types.ObjectId
    email: string
    password: string
    speciality: string
}

const doctorSchema = new Schema<IDoctor>({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address',
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
})

module.exports = model<IDoctor>('doctors', doctorSchema)
