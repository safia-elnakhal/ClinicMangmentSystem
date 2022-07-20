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
        required: true,
    },
    password: {
        type: String,
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
