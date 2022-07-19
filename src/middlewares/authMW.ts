import { Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

export default (request: any, response: Response, next: NextFunction) => {
    let decodedToken = null
    try {
        const token: string = request.get('Authorization').split(' ')[1]
        decodedToken = jwt.verify(token, process.env.secret)
        console.log(decodedToken)
        request.role = decodedToken.role
        request.id = decodedToken.id
        next()
    } catch (error: any) {
        error.message = 'Not Authorized'
        error.status = 403
        next(error)
    }
}
