import {Request , Response } from "express"

//export async function name (request:Request , response:Response){}
//response.status.json({message: , })
//

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public
export async function authenticateUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}
