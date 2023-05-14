import {Response , Request  } from "express"
import { UserModel } from "../models/User"
//import { NoteModel } from "../models/Note"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { extend } from "joi"
import mongoose from "mongoose"

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
export const updateUser = async(req:Request , res:Response) => {
    const {id , username , roles , active , password } = req.body
    if(!id || !username || !Array.isArray(roles) ||!roles.length || typeof active !== "boolean" ){
        return res.status(400).json({message:"All fields are required!"})
    }
    const duplicate = await UserModel.findOne({username}).lean().exec()
    const user = await UserModel.findById({_id:id}).lean().exec() as typeof duplicate
    if(!user){
        return res.status(400).json({message:"User not found!"})
    }

    if(duplicate && duplicate._id.toString() !== id){
        return res.status(400).json({message:"Duplicate username!!"})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        user.password = await bcrypt.hash(password , 10)
    }

    const updatedUser = (user as any).save()

    res.status(201).json({message:`${updatedUser.username} has been updated!`})
}

//NOTE: @route DELETE /users
//WARN: access private
export const deleteUser = asyncHandler(async(req:Request , res:Response) => {})

