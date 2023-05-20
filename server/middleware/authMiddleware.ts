import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import { UserModel, UserType } from "../models/user.models"
import { env } from "../config/environment"

const protect  =  asyncHandler( async (req, res , next) => {
    let token
    let decoded:any

    token = req.cookies.jwt
    
    if(token){
        try {
            //@ts-ignore
            decoded = jwt.verify(token, env.JWT_SECRET!)
            console.log("decoded token message",decoded)
            (req as any).user  = await UserModel.findById(decoded.userId).select("-password")
        } catch (error) {
           res.status(401)
           throw new Error("UnAuthorized, invalid token provided")
        }
    }else{
        res.status(401)
        throw new Error("UnAuthorized no token provided")
    }
})
