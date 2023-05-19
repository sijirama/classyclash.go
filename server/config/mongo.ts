import mongoose from 'mongoose';
import { env } from './environment';

export async function connectToMongo(){
    try {
       const conn = await mongoose.connect(env.MONGO_URI!) 
       console.log(`Connected to Mongo ${conn.connection.host}`);
       
    } catch (error) {
        console.error(error);
    }
}
