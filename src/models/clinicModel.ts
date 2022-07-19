import mongoose, { Schema, Types } from 'mongoose'
// import addressSchema, { IAddress } from "./addressModel";

interface IClinic {
    name: string
    // address: IAddress;
    contactNumber: string
    doctor: Types.ObjectId
    patient?: Types.ObjectId
    employee: Types.ObjectId
    services: [string]
}

const clinicSchema: Schema = new Schema(
    {
        // _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        // address: {
        //   type: addressSchema,
        // },
        contactNumber: {
            type: String,
            required: true,
        },
        services: {
            type: [String],
            required: true,
        },
        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'doctor',
            // required: true,
        },
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'patient',
            // required: true,
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: 'employee',
            // required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<IClinic>('clinics', clinicSchema)
