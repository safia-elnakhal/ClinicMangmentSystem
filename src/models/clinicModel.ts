import { Schema, Types, model, Document } from 'mongoose'
import validator from 'validator'

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
    servicePrice: string
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
            match: [
                /^(002)?^01[1205][0-9]{8}$/,
                'Please fill a valid phone number',
            ],
            required: true,
            validate(value: string) {
                if (!validator.isMobilePhone(value, 'ar-EG')) {
                    throw new Error('Phone Number is invalid in Egypt.')
                }
            },
        },
        // doctorId: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'doctors',
        //         required: true,
        //     },
        // ],
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
                },
                description: {
                    type: String,
                },
                servicePrice: {
                    type: Number,
                    get: (v: number) => (v / 100).toFixed(2),
                    set: (v: number) => v * 100,
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
    { toJSON: { getters: true }, timestamps: true }
)

const Clinic = model<IClinic>('clinics', clinicSchema)
export { Clinic, IClinic, IServices }
