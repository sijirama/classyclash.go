import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

NoteSchema.plugin( AutoIncrement , {
    inc_field:"ticket",
    id:"ticketNums",
    start_seq:500
})

export const NoteModel = mongoose.model("Note" , NoteSchema)

