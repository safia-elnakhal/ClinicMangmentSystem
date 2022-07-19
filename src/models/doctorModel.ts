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
})

export default model<IDoctor>('doctors', doctorSchema)
