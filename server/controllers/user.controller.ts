import {Request , Response } from "express"
import { UserModel , UserType } from "../models/user.models"

//export async function name (request:Request , response:Response){}
//response.status.json({message: , })

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public
export async function authenticateUser (request:Request , response:Response){
    response.status(200).send({message:"Hit Authentication"})
}

//@desc Register a new user
//route POST /api/users 
//@access Public
export async function registerUser (request:Request , response:Response){
    const {name , email , password} = request.body
    response.status(200).send({message:"Hit Register"})
}

//@desc logout a user
//route POST /api/users/logout 
//@access Public
export async function logoutUser (request:Request , response:Response){
    response.status(200).send({message:"Hit logoutUser"})
}

//@desc get user profile
//route POST /api/users/profile
//@access Private
export async function getUser (request:Request , response:Response){
    const users:UserType[] = await UserModel.find()
    console.log(users)
    response.status(200).send({message:"Hit getuser"})
}

//@desc get user profile
//route PUT /api/users/profile
//@access Private
export async function updateUser (request:Request , response:Response){
    response.status(200).send({message:"Hit updateuser"})
}




