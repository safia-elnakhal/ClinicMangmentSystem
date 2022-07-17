
import { Schema, model } from "mongoose";

 interface IAddress {
  city: string;
  streetName: string;
  buildingNumber: number;
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
});

module.exports = model<IAddress>("address", addressSchema);