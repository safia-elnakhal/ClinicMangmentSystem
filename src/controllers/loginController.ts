// import mongoose from "mongoose";
// require("../models/adminModel");
// require("../models/doctorModel");
// require("../models/patientModel");
// let Patient = mongoose.model("Patient");
// let Doctor = mongoose.model("doctors");
// let Employee = mongoose.model("Employee")
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { Request, Response, NextFunction } from 'express'


// export const loginPatient = (request:Request, response:Response, next:NextFunction) => {
//   Patient.findOne({
//     email: request.body.email,
//     password: request.body.password,
//   })

//     .then((data:any) => {
//       console.log(data);
//       if (!data) {
//         let error:any = new Error("email or password incorrect");
//         error.status = 401;
//         throw error;
//       } else {
//         bcrypt
//           .compare(request.body.password, data.password)
//           .then(function () {
//             let token:any = jwt.sign(
//               {
//                 id: data._id,
//                 role: "Patient",
//               },
//               process.env.secret,
//               { expiresIn: "1h" }
//             );
//             response.status(200).json({ token, message: "login" });
//           });
//       }
//     })
//     .catch((error:Error) => next(error));
// };

// export const loginDoctor = (request:Request, response:Response, next:NextFunction) => {
//   Doctor.findOne({
//     email: request.body.email,
//     password: request.body.password,
//   })

//     .then((data:any) => {
//       console.log(data);
//       if (!data) {
//         let error:any = new Error("email or password incorrect");
//         error.status = 401;
//         throw error;
//       } else {
//         bcrypt
//           .compare(request.body.password, data.password)
//           .then(function () {
//             let token :any = jwt.sign(
//               {
//                 id: data._id,
//                 role: "Doctor",
//               },
//               process.env.secret,
//               { expiresIn: "1h" }
//             );
//             response.status(200).json({ token, message: "login" });
//           });
//       }
//     })
//     .catch((error:Error) => next(error));
// };


// export const loginEmployee = (request:Request, response:Response, next:NextFunction) => {
//   Employee.findOne({
//     email: request.body.email,
//     password: request.body.password,
//   })

//     .then((data:any) => {
//       console.log(data);
//       if (!data) {
//         let error:any = new Error("email or password incorrect");
//         error.status = 401;
//         throw error;
//       } else {
//         bcrypt
//           .compare(request.body.password, data.password)
//           .then(function () {
//             let token :any = jwt.sign(
//               {
//                 id: data._id,
//                 role: "Employee",
//               },
//               process.env.secret,
//               { expiresIn: "1h" }
//             );
//             response.status(200).json({ token, message: "login" });
//           });
//       }
//     })
//     .catch((error:Error) => next(error));
// };