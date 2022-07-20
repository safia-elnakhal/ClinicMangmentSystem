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
        // match: [
        //     /^[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}$/,
        //     'please enter Name (three words)the first letter capital ',
        // ],
        required: true,
    },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        //     'password must be than 6 characters , contains at least one lowercase  one uppercase  at least one digit and special character',
        // ],
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
                ref: 'doctors',
                required: true,
            },
            invoiceId: {
                type: Schema.Types.ObjectId,
                ref: 'invoices',
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

const Patient = model<IPatient>('patients', PatientSchema)

export { Patient, IPatient }
