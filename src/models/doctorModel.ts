import { Schema, model, Types } from 'mongoose'

interface IDoctor {
    name: string
    age: number
    // address: Types.ObjectId
    email: string
    password: string
    specialty: string
    unavailableAppointments: Types.Array<Date>
}

const doctorSchema = new Schema<IDoctor>({
    // _id: {
    //     type: Schema.Types.ObjectId,
    // },
    name: {
        type: String,
        match: [
            /^[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}$/,
            'please enter Name (three words)the first letter capital ',
        ],
        required: true,
    },
    age: {
        type: Number,
    },
    // address: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'address',
    // },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
        required: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
            'password must be than 6 characters , contains at least one lowercase  one uppercase  at least one digit and special character',
        ],
    },
    specialty: {
        type: String,
    },
    unavailableAppointments: {
        type: [Date],
    },
})

const Doctor = model<IDoctor>('doctors', doctorSchema)

export { Doctor, IDoctor }
