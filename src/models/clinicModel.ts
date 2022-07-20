import { Schema, Types, model, Document } from 'mongoose'

type Address = {
    city: string
    streetName: string
    buildingNumber: number
}

const addressSchema: Schema = new Schema<Address>({
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

interface IServices extends Document {
    name: string
    description: string
    doctorId: Types.Array<Types.ObjectId>
    patientId?: Types.Array<Types.ObjectId>
}

interface IClinic extends Document {
    _id: Types.ObjectId
    clinicName: string
    address: Address
    contactNumber: string
    doctorId: Types.ObjectId
    employeeId: Types.ObjectId
    services: Types.DocumentArray<IServices>
}

const clinicSchema: Schema = new Schema<IClinic>(
    {
        // _id: Schema.Types.ObjectId,
        clinicName: {
            type: String,
            required: true,
        },
        address: {
            type: addressSchema,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        doctorId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'doctors',
                required: true,
            },
        ],
        employeeId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'employees',
                required: true,
            },
        ],
        services: [
            {
                name: {
                    type: String,
                    required: true,
                    unique: true,
                },
                description: {
                    type: String,
                },

                doctorId: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'doctors',
                    },
                ],
                patientId: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'patients',
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Clinic = model<IClinic>('clinic', clinicSchema)
export { Clinic, IClinic, IServices }
