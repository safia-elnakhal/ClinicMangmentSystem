import { Schema, model } from 'mongoose'

interface IDoctor {
    name: string
    age: number
    // address: Types.ObjectId
    email: string
    password: string
    specialty: string
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
})

const Doctor = model<IDoctor>('Doctor', doctorSchema)

export { Doctor, IDoctor }
