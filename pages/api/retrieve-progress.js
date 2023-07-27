import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Student } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// route to retrieve the progress of the transcript request
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
    if (req.method != 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { studentId } = req.query;

    try {
        // Find the student by studentId
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const isTpsApplicationDataEmpty = student.tpsApplicationData ? Object.keys(student.tpsApplicationData).length === 0 : true;

        let progressData;
        if (isTpsApplicationDataEmpty) {
            progressData = {};
        } else {
            progressData = {
                requestId: student.tpsApplicationData.requestId,
                studentId: student.tpsApplicationData.studentId,
                program: student.tpsApplicationData.program,
                faculty: student.tpsApplicationData.faculty,
                department: student.tpsApplicationData.department,
                cost: student.tpsApplicationData.cost,
                paymentStatus: student.tpsApplicationData.paymentStatus
            }
        }

        res.status(200).json({ success: true, message: 'TPS progress retrieved successfully', data: progressData });
    } catch (error) {
        console.error('Error while trying to retrieve progress:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}