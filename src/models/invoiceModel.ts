import { Schema, Types, model, Document } from 'mongoose'

interface IInvoice extends Document {
    doctorId: Types.ObjectId
    patientId: Types.ObjectId
    charge: number
}

const InvoiceSchema = new Schema<IInvoice>({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: true,
    },
    charge: {
        type: Schema.Types.Number,
        required: true,
    },
})

const Invoice = model<IInvoice>('invoices', InvoiceSchema)

export { Invoice, IInvoice }
