import { Request, Response, NextFunction } from "express";
import ClinicService from "../models/clinicModel";

const getAllClinicServices = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  ClinicService.find()
    .then((data) => {
      response.status(200).json({
        Services: data,
      });
    })
    .catch((error) => next(error));
};

const createClinicService = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let clinicServiceObject = new ClinicService(request.body);
  clinicServiceObject
    .save()
    .then(() => {
      response.status(201).json({ data: "New Clinic Service Added" });
    })
    .catch((error) => next(error));
};

//Update Clinic Services (adding new services)
const updateClinicServices = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  ClinicService.updateOne(
    { _id: request.body.id },
    {
      $addToSet: {
        services: { $each: request.body.services },
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Clinic Not Found"));
      else {
        response.status(200).json("Clinic Services Has Been Added");
      }
    })
    .catch((error) => next(error));
};

//Update Clinic Services (adding new services)
const deleteClinicServices = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  ClinicService.updateOne(
    { _id: request.body.id },
    {
      $pull: {
        services: request.body.services,
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) next(new Error("Clinic Not Found"));
      else {
        response.status(200).json("Clinic Services Has Been deleted");
      }
    })
    .catch((error) => next(error));
};

export = {
  createClinicService,
  getAllClinicServices,
  updateClinicServices,
  deleteClinicServices,
};
