// eslint-disable-next-line import/no-import-module-exports
import { Schema, model } from 'mongoose'

// eslint-disable-next-line no-unused-vars, no-shadow
enum EmployeeType {
    // eslint-disable-next-line no-unused-vars
    reception = 'reception',
    // eslint-disable-next-line no-unused-vars
    nursing = 'nursing',
    // eslint-disable-next-line no-unused-vars
    management = 'management',
}

// eslint-disable-next-line no-shadow, no-unused-vars
enum role {
    // eslint-disable-next-line no-unused-vars
    employee = 'employee',
    // eslint-disable-next-line no-unused-vars
    admin = 'admin',
}

interface IEmployee {
    name: string
    email: string
    password: string
    typeofEmployee?: EmployeeType
    role?: role
}

const employeeSchema = new Schema<IEmployee>({
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
    typeofEmployee: { type: String, enum: Object.values(EmployeeType) },
    role: { type: String, enum: Object.values(role) },
})

const Employee = model<IEmployee>('employees', employeeSchema)

export { Employee, IEmployee }
