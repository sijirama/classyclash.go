import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document{

}

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    roles:[{
        type:String,
        default:"Exployee"
    }],

    active:{
        type:Boolean,
        default:true
    },
})

export const UserModel = mongoose.model("User" , UserSchema)

