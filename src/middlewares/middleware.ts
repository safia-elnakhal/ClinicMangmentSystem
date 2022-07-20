import { NextFunction, Request, Response } from 'express'
import { validationResult, ValidationError } from 'express-validator'

export default (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = ({
        location,
        msg,
        param,
        value,
        nestedErrors,
    }: ValidationError) => `${location}[${param}]: ${msg}`
    const result = validationResult(req).formatWith(errorFormatter)
    if (!result.isEmpty()) {
        return res.json({ errors: result.array() })
    }
    next()
}
