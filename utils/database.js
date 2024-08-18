import mongoose from "mongoose"

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Already connected to DB');
        return;
    }
    try {
        await mongoose.connection(process.env.MONOGO_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MonogoDB Connected');
    }
    catch (error) {
        console.log('Error connecting to DB', error);
    }
}
