import { throws } from "assert"
import {Request , Response } from "express"

//export async function name (request:Request , response:Response){}
//response.status.json({message: , })

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public
export async function authenticateUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}

//@desc Register a new user
//route POST /api/users 
//@access Public
export async function registerUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}

//@desc logout a user
//route POST /api/users/logout 
//@access Public
export async function logoutUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}

//@desc get user profile
//route POST /api/users/profile
//@access Private
export async function getUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}

//@desc get user profile
//route PUT /api/users/profile
//@access Private
export async function updateUser (request:Request , response:Response){
    response.status(200).send({message:"Hello"})
}




