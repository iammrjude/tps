import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
    try {
        const dbURI = process.env.CONNECTION_STRING;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}