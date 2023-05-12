import mongoose from "mongoose";

export interface NoteInterface extends mongoose.Document{

}

const NoteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    title :{
        type:String,
        required:true
    },

    text :{
        type:String,
        default:"Exployee"
    },

    completed:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true,
  }
)

export const NoteModel = mongoose.model("Note" , NoteSchema)

