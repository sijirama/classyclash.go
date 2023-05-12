import {Request , Response , NextFunction } from "express"

export function errorHandle (err:any, _req:Request , res:Response , next:NextFunction) {
    const status = res.statusCode ? res.statusCode : 500
    res.status(status).json({message:err.message})
    next()
}
