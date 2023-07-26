import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Student } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// route to get student information
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
    const { email } = req.query;

    try {
        // Find the student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const studentInfo = { lname: student.lname, fname: student.fname, middleName: student.middleName, sex: student.sex, dob: student.dob, nationality: student.nationality, stateOfOrigin: student.stateOfOrigin, dateOfEntry: student.dateOfEntry, modeOfEntry: student.modeOfEntry, studentId: student.studentId, email: student.email, faculty: student.faculty, department: student.department, };
        res.status(200).json({ success: true, message: 'Student Info retrieved successfully', data: studentInfo });
    } catch (error) {
        console.error('Error while trying to get student info:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}