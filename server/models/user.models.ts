import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserType extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    address: string;
    savedproducts: string[]
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
    },
    bio:{
        type:String,
    },

    address:{
        type:String,
    },

    savedproducts:[{
        type:String,
    }],
    profilepicture:{
        type:String,
        default:"https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    }

},{
    timestamps:true,
})

// NOTE: hash the password field before creating the schema object 
UserSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
})

// NOTE:
UserSchema.methods.matchPassword = async function (enteredPassword:string) {
    return await bcrypt.compare(enteredPassword , this.password)
}


export const UserModel = mongoose.model("User", UserSchema)
