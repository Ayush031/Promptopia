import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // Check for the presence of the MongoDB URI
    if (!process.env.NEXT_MONGO_URI) {
        throw new Error('MongoDB URI is not defined in environment variables');
    }

    if (isConnected) {
        console.log('Already connected to DB');
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_MONGO_URI);
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to DB:', error.message);
        throw new Error('Error connecting to DB');
    }
};

// Optional: Add a disconnect function
// export const disconnectFromDB = async () => {
//     if (isConnected) {
//         try {
//             await mongoose.disconnect();
//             isConnected = false;
//             console.log('MongoDB Disconnected');
//         } catch (error) {
//             console.error('Error disconnecting from DB:', error.message);
//             throw new Error('Error disconnecting from DB');
//         }
//     }
// };
