import  express, { RequestHandler } from "express"
import { UserModel, UserType } from "../models/user.models"

export async function saveProducts( req: express.Request, res: express.Response ){
    const { productId } = req.body
    const user:any = (req as any ).user
    console.log(user , productId)
    if(!productId){
        return res.status(400).json({message:"No product Id"})
    }
    try {
       const User = await UserModel.findById(user._id)
       if(!User?.savedproducts.includes(productId)){
        await User?.updateOne({$push:{savedproducts:productId}})
        return res.status(200).json({message:"Product saved successfully"})
       }
    } catch (error) {
        return res.status(400).json({message:"Unable to save product"})
    }
}


export async function unsaveProducts( req: express.Request, res: express.Response ){
    const { productId } = req.body
    const user:any = (req as any ).user
    console.log(user , productId)
    if(!productId){
        return res.status(400).json({message:"No product Id"})
    }
    try {
       const User = await UserModel.findById(user._id)
       if(User?.savedproducts.includes(productId)){
        await User.updateOne({$pull:{savedproducts:productId}})
        return res.status(200).json({message:"Product unsaved successfully"})
       }
    } catch (error) {
        return res.status(400).json({message:"Unable to unsave product"})
    }
    
}
