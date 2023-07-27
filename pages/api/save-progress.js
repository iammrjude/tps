import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Student } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// route to save progress of the transcript request
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

    const { requestId, studentId, program, faculty, department, cost, paymentStatus } = req.body;
    const tpsApplicationData = { requestId, studentId, program, faculty, department, cost, paymentStatus };

    try {
        // Update the student by studentId
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId },
            { $set: { tpsApplicationData: tpsApplicationData } },
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, message: 'TPS progress saved successfully' });
    } catch (error) {
        console.error('Error while trying to save progress:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}