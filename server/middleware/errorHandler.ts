import {Request , Response , NextFunction, ErrorRequestHandler} from "express"
import dotenv from "dotenv"

dotenv.config()

export function notFound(req: Request, res: Response , next:NextFunction){
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export function errorHandler(err:Error , req:Request , res:Response , next:NextFunction){
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message;

    if(err.name === 'CastError' && (err as any).kind === "ObjecId"){
        statusCode = 404,
        message = "Resource not found"
    }

    res.status(statusCode).json({
        message,
        stack:process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
