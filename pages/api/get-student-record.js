import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Result } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// route to get the academic record of a student
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
    const { faculty, department, studentId } = req.query;

    try {
        // Perform the query with the specified conditions and sort by the "session" field in ascending order
        const results = await Result
            .find({
                faculty: faculty,
                department: department,
                studentId: studentId,
            })
            .sort({ session: 1 });
        res.status(200).json({ success: true, message: 'student academic record retrieved successfully', data: results });
    } catch (error) {
        console.error('Error while trying to retrieve academic record:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}