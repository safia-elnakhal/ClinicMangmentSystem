import { Schema, Types, model, Document } from 'mongoose'

// eslint-disable-next-line no-unused-vars, no-shadow
enum Gender {
    // eslint-disable-next-line no-unused-vars
    male = 'male',
    // eslint-disable-next-line no-unused-vars
    female = 'female',
}

interface Reports extends Document {
    _id?: Types.ObjectId
    doctorId?: Types.ObjectId
    invoiceId?: Types.ObjectId
    appointmentId?: Types.ObjectId
}

interface IPatient extends Document {
    email: string
    name: string
    password: string
    age: number
    historyOfDisease: string
    InsuranceCompany: string
    gender?: Gender
    reports: Types.DocumentArray<Reports>
}

const PatientSchema = new Schema<IPatient>({
    // _id: {
    //     type: Schema.Types.ObjectId,
    // },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    historyOfDisease: {
        type: String,
        required: true,
    },
    gender: { type: String, enum: Object.values(Gender) },
    InsuranceCompany: {
        type: String,
        required: true,
    },
    reports: [
        {
            doctorId: {
                type: Schema.Types.ObjectId,
                ref: 'Doctor',
                required: true,
            },
            invoiceId: {
                type: Schema.Types.ObjectId,
                ref: 'invoice',
                required: true,
            },
            appointmentId: {
                type: Schema.Types.ObjectId,
                ref: 'appointments',
                required: true,
            },
        },
    ],
})

const Patient = model<IPatient>('Patient', PatientSchema)

export { Patient, IPatient }
