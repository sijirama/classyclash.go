import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { UserModel, UserType } from "../models/user.models"
import { env } from "../config/environment"

export const protect  =  asyncHandler( async (req, res , next) => {
    let token
    let decoded:any

    token = req.cookies.jwt
    console.log(token)
    
    if(token){
        try {
            //@ts-ignore
            decoded = jwt.verify(token, env.JWT_SECRET!)
            const user = await UserModel.findById(decoded.userId).select("-password").exec()
            //@ts-ignore
            req.user = user
            next()
        } catch (error) {
           res.status(401)
           throw new Error("UnAuthorized, invalid token provided")
        }
    }else{
        res.status(401)
        throw new Error("UnAuthorized no token provided")
    }
})
