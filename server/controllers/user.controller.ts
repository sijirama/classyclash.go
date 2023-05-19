import {Request , Response } from "express"
import { UserModel , UserType } from "../models/user.models"
import bcrypt from "bcrypt"

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
    const userExists = await UserModel.findOne({email: email})
    if(userExists){
        response.status(401)
        throw new Error(`User already exists`)
    }
    const user = await UserModel.create({
        name: name,
        email:email,
        password:password
    })
    if(user){
        response.status(201).json({message:"Succedfully registered" , user:{
            _id: user._id,
            name: user.name,
            email:user.email
        }})
    }else{
        response.status(401).json({message:"Unsuccessfull"})
    }
    //response.status(200).send({message:"Hit Register"})
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




