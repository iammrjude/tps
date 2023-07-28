import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Staff } from '../../components/models/models';
const dbURI = process.env.CONNECTION_STRING;

// Staff Registration route
export default async function handler(req, res) {
    if (!mongoose.connections[0].readyState) {
        try {
            await mongoose.connect(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB successfully!');
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }
    if (req.method != 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    const { firstName, middleName, lastName, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Staff document
        const newStaff = new Staff({ firstName, middleName, lastName, email, password: hashedPassword });
        // Save the new staff member to the database
        await newStaff.save();
        res.status(200).json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error while registering staff:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}