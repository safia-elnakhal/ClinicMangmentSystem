import mongoose from "mongoose";
require("../models/adminModel");
import { Request, Response, NextFunction } from 'express'

let Admin = mongoose.model("admin");

import bcrypt from "bcrypt";

const saltRounds = 10;

// Get All Admins
export const getAllAdmins = (request: Request, response:  Response, next:NextFunction) => {
  Admin.find({})
    .then((data:any) => {
      response.status(200).json(data);
    })
    .catch((error:Error) => {
      next(error);
    });
};

// Get Admin By ID
export const getAdminByID = (request: Request, response:  Response, next:NextFunction) => {
  Admin.findOne({ _id: request.params.id })
    .then((data:any) => {
      if (data == null) next(new Error(" Admin not found"));
      response.status(200).json(data);
    })
    .catch((error:Error) => {
      next(error);
    });
};

// Create Admin
export const createAdmin = (request: Request, response:  Response, next:NextFunction) => {
  let object = new Admin({
    fullName: request.body.fullName,
    age: request.body.age,
    email: request.body.email,
    password: bcrypt.hashSync(request.body.password, saltRounds),
    phone: request.body.phone,
    national_id: request.body.national_id,
    image: request.body.image,
  });
  object
    .save()
    .then((data:any) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error:Error) => next(error));
};

// Update Admin By ID
export const updateAdmin = (request: Request, response:  Response, next:NextFunction) => {
  // console.log(request.body.id);
  Admin.findById(request.body.id)
    .then((data:any) => {
      for (const key in request.body) {
        data[key] = request.body[key];
      }
      data.save();
      response.status(200).json({ data: "updated" });
    })
    .catch((error:Error) => {
      next(error);
    });
};

// Delete Admin By ID
export const deleteAdmin = (request: Request, response:  Response, next:NextFunction) => {
  Admin.deleteOne({ _id: request.params.id })
    .then((data:any) => {
      if (!data) {
        next(new Error(" Admin not found"));
      } else {
        response.status(200).json({ data: "deleted" });
      }
    })
    .catch((error:Error) => {
      next(error);
    });
};


