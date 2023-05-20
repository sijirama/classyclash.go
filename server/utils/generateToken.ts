import jwt from "jsonwebtoken"
import { env } from "../config/environment"
import {Response} from "express"
import mongoose from "mongoose"

export default function generateToken(response : Response , userId : mongoose.Types.ObjectId ){
    const token = jwt.sign({userId} , env.JWT_SECRET! , {expiresIn:"30d"})
    //@ts-ignore
    response.cookie("jwt" , token , {
        httpOnly: true,
        //secure: env.JWT_SECRET !== "development" ,
        sameSite: "strict",
        maxAge: 30 * 24 * 60  * 60 * 1000
    })
}
