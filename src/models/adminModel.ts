import { Schema, model, Types } from 'mongoose'

interface IAdmin {
    name: string
    email: string
    password: string
}

const adminSchema = new Schema<IAdmin>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
})
export default model<IAdmin>('admin', adminSchema)
