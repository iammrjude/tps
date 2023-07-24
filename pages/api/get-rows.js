import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Student } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// Staff Login route
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
    const { faculty, department, session, level, semester, course } = req.params;
    async function getDataArray(faculty, department, session, level, semester, course) {
        const allStudents = await Student.find({ faculty, department, 'registeredCourses.session': session, 'registeredCourses.level': level, 'registeredCourses.semesters.semesterNumber': semester, 'registeredCourses.semesters.courses.courseCode': course });
        const regNumbers = allStudents.map((student) => student.regNumber);
        const fNames = allStudents.map((student) => student.fname);
        const middleNames = allStudents.map((student) => student.middleName);
        const lNames = allStudents.map((student) => student.lname);
        let courses;
        if (level == "100Level" && semester == 1) {
            courses = [
                { 'GST101': 2 },
                { 'GST103': 1 },
                { 'MTH101': 4 },
                { 'PHY101': 4 },
                { 'CHM101': 4 },
                { 'BIO101': 3 },
                { 'ENG101': 1 },
                { 'ENG103': 1 },
                { 'FRN101': 1 },
                { 'IGB101': 1 },
            ];
        }
        let unit;
        for (let index = 0; index < courses.length; index++) {
            const key = Object.keys(courses[index]);
            if (key == course) {
                unit = courses[index][key];
                break;
            }
        }

        let dataArray = [];
        for (let index = 0; index < regNumbers.length; index++) {
            const fullname = `${fNames[index]} ${middleNames[index]} ${lNames[index]}`;
            const data = {
                matricnum: regNumbers[index],
                fullname: fullname,
                coursecode: course,
                unit: unit,
                grade: ""
            }
            dataArray.push(data);
        }
        return dataArray;
    }

    try {
        const dataArray = await getDataArray(faculty, department, session, level, semester, course);
        res.status(200).json(createApiResponse(true, 'Data retrieved successfully', dataArray));
    } catch (error) {
        console.error('Error while trying to get rows:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}