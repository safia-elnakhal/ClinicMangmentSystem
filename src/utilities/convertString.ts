import mongoose, { Types } from 'mongoose'

function toObjectId(id: string): Types.ObjectId {
    return new mongoose.Types.ObjectId(id.trim())
}

function toNumber(str: string): number {
    return parseInt(str.trim(), 10)
}

export default { toObjectId, toNumber }
