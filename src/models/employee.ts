import { Schema, model } from "mongoose";

interface Iemployee {
  name: string;
  email: string;
  password: string;
  typeofEmployee: String;
}

const employeeSchema =
  new Schema <Iemployee>({
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
    typeofEmployee: {
      type: String,
      required: true,
    },
  });

  const Employee = model<Iemployee>("Employee",employeeSchema)