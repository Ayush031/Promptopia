import mongoose from "mongoose"

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Already connected to DB');
        return;
    }
    try {
        await mongoose.connect(process.env.NEXT_MONGO_URI)
        isConnected = true;
        console.log('MonogoDB Connected');
    }
    catch (error) {
        console.log('Error connecting to DB', error);
        throw new Error('Error connecting to DB');
    }
}
