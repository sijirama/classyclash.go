import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserType extends mongoose.Document {
    name: string;
    email: string;
    password: string;

}

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
})

UserSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

export const UserModel = mongoose.model("User", UserSchema)
