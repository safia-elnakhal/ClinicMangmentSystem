import { Schema, Types, model, Document } from 'mongoose'

interface IAppointment extends Document {
    doctorId: Types.ObjectId
    patientId: Types.ObjectId
    date: Date
    reasonOfVisit: string
}

const appointmentSchema = new Schema<IAppointment>({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: true,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    reasonOfVisit: {
        type: String,
        required: true,
    },
})

const Appointment = model<IAppointment>('appointments', appointmentSchema)

export { Appointment, IAppointment }
