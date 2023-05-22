import {Request , Response } from "express"
import { UserModel , UserType } from "../models/user.models"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken"
import { env } from "../config/environment"

//export async function name (request:Request , response:Response){}
//response.status.json({message: , })

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public

//@desc Auth user/set token
//route POST /api/users/auth 
//@access Public
export async function authenticateUser (request:Request , response:Response){
    const {email, password} = request.body
    const user = await UserModel.findOne({ email: email})


    if(user && (await (user as any).matchPassword(password) )){
       generateToken(response , user._id)
       response.status(201).json({message:"Succedfully authenticated!" , user:{
            _id: user._id,
            name: user.name,
            email:user.email
        }})
    }else{
        response.status(401).json({message:"Invalid user or email"})
    }
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
        generateToken(response , user._id)
        response.status(201).json({message:"Succedfully registered" , user:{
            _id: user._id,
            name: user.name,
            email:user.email
        }})
    }else{
        response.status(401).json({message:"Unsuccessfull"})
    }
}

//@desc logout a user
//route POST /api/users/logout 
//@access Public
export async function logoutUser (_request:Request , response:Response){
    response.cookie("jwt" , "" , {
        httpOnly: true,
        expires: new Date(0),
    })
    response.status(200).send({message:"User logged out"})
}

//@desc get user profile
//route POST /api/users/profile
//@access Private
export async function getUser (request:any, response:Response){
    //@ts-ignore
    const user = {
        _id:request.user._id,
        email:request.user.email,
        name:request.user.name
    }
    response.status(200).send({user:user})
}

//@desc get user profile
//route PUT /api/users/profile
//@access Private
export async function updateUser (request:any , response:Response){
    //@ts-ignore
    const user = await UserModel.findById(request.user._id);
    if(user){
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        if(request.body.password){
            user.password = request.body.password
        }
        const updatedUser = await user.save()
        response.status(200).json({user:{
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email
        }})
    }else{
        response.status(404)
        throw new Error("User not found")
    }
}
