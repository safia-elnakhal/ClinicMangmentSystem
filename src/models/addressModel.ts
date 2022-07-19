import mongoose, { Schema, model } from 'mongoose'

export interface IAddress {
    city: string
    streetName: string
    buildingNumber: number
}

const addressSchema: Schema = new Schema<IAddress>({
    city: {
        type: String,
        required: true,
    },
    streetName: {
        type: String,
        required: true,
    },
    buildingNumber: {
        type: Number,
        required: true,
    },
})

export default mongoose.model<IAddress>('address', addressSchema)
