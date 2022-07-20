// import express from "express";
import express from 'express'
import * as controller from '../controllers/loginController'

const route = express.Router()

route.post('/login/doctor', controller.loginDoctor)
route.post('/login/employee', controller.loginEmployee)
route.post('/login', controller.loginPatient)

export default route
