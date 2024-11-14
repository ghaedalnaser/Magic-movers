import mongoose from "mongoose";

/**
 * DB Configurations
 */
export const connectMongoDB =  async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/magic-transports')
        console.log('MongoDB connected')
    } catch (error) {
        console.log(`MongoDB connection faild:${error}`);
        process.exit(1);
    }
}