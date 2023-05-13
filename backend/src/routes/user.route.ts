import {Router , Response , Request} from "express"

export const AuthRouter = Router()

AuthRouter.get("/" , (req:Request , res:Response)=>{
    res.send("Hii")
})
