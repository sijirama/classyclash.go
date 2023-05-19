import jwt from "jsonwebtoken"
import { env } from "../config/environment"
import {Response} from "express"

export default function generteToken(response : Response , userId : string ){
    const token = jwt.sign({userId} , env.JWT_SECRET! , {expiresIn:"30d"})
    response.cookie("jwt" , token , {
        httpOnly: true,
        secure: env.JWT_SECRET !== "development" ,
        sameSite: "strict",
        maxAge: 30 * 24 * 60  * 60 * 1000
    })
}
