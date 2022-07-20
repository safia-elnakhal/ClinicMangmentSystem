import { Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

export default (request: any, response: Response, next: NextFunction) => {
    let decodedToekn = null
    try {
        const token: string = request.get('Authorization').split(' ')[1]
        decodedToekn = jwt.verify(token, process.env.secret)
        console.log(decodedToekn)
        request.role = decodedToekn.role
        request.id = decodedToekn.id
        next()
    } catch (error: any) {
        error.message = 'Not Authorized'
        error.status = 403
        next(error)
    }
}
