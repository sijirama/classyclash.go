import mongoose from 'mongoose';
import { env } from './environment';

export async function connectToMongo(){
    try {
       await mongoose.connect(env.MONGO_URI!) 
    } catch (error) {
        console.error(error);
    }
}
