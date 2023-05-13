import {Response , Request  } from "express"
import { UserModel } from "../models/User"
//import { NoteModel } from "../models/Note"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

//NOTE: @route GET /users
//WARN: access private
export const getAllUsers = async (_req:Request , res:Response ) => {
    let users;
    try {
       users = await UserModel.find().select("-password").lean().exec()
       if(!users || users.length <= 0 ) {
        console.log("get all users controller" , users)
           return res.status(400).json({message:"No users found"})
       }
    } catch (error) {
        return res.status(400).json({message:"No users found"})
    }
    res.json(users)
}

//NOTE: @route POST /users
//WARN: access private
export const createNewUser = async(req:Request , res:Response) => {
    const {username , password , roles } = req.body
    if (!username || !password || !Array.isArray(roles) || !roles.length){
        return res.status(400).json({message:"All fields are required!"})
    }
    const duplicate = await UserModel.findOne({username}).lean().exec()
    if(duplicate){
        return res.status(400).json({message:"Account already exists!"})
    }
    const HashedPassword = await bcrypt.hash(password , 10)
    const UserObject = { username , "password":HashedPassword , roles }
    const user = UserModel.create(UserObject)
    if(!user){
        return res.status(500).json({message:"Failed to create account!"})
    }
    return res.status(200).json({message:"User successfully created" , user:user})
}

//NOTE: @route PATCH /users
//WARN: access private
export const updateUser = asyncHandler(async(req:Request , res:Response) => {})

//NOTE: @route DELETE /users
//WARN: access private
export const deleteUser = asyncHandler(async(req:Request , res:Response) => {})

