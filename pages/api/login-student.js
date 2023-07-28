import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Student } from '../../components/models/models';
const dbURI = process.env.CONNECTION_STRING;

// Student Login route
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
    const { email, password } = req.body;

    try {
        // Find the student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        // Compare passwords
        const result = await bcrypt.compare(password, student.password);
        if (result === true) {
            return res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error while trying to login student:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}