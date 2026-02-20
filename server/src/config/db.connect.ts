import mongoose from "mongoose";

export async function connectDB()
{
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('db connect succssfull');
    } catch (error) {
        console.log("db connection faield");
    }
}