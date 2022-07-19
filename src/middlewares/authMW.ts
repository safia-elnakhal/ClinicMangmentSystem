const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express'


module.exports = (request:any, response:Response, next:NextFunction) => {
  let decodedToekn = null;
  try {
    let token:string = request.get("Authorization").split(" ")[1];
    decodedToekn = jwt.verify(token, process.env.secret);
    console.log(decodedToekn);
    request.role = decodedToekn.role;
    request.id = decodedToekn.id;
    next();
  } catch (error:any) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};
