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
    typeofEmployee?: 'management' | 'nursing' | 'reception'
    role?: role
}

const employeeSchema = new Schema<IEmployee>({
    name: {
        type: String,
        // match: [
        //     /^[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}[A-Z][A-Za-z ]{3,}$/,
        //     'please enter Name (three words)the first letter capital ',
        // ],
        required: true,
    },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address',
        ],
        required: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        //     'password must be than 6 characters , contains at least one lowercase  one uppercase  at least one digit and special character',
        // ],
    },
    typeofEmployee: { type: String, enum: Object.values(EmployeeType) },
    role: { type: String, enum: Object.values(role) },
})

const Employee = model<IEmployee>('employees', employeeSchema)

export { Employee, IEmployee }
