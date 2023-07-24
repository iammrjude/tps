import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { Result } from '../../models/models';
const dbURI = process.env.CONNECTION_STRING;

// Upload Result route
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
    const { faculty, department, session, level, semester, course, resultsArray } = req.body;

    async function uploadResult(faculty, department, session, level, semester, regNumber, resultsArray) {
        try {
            const regNumber = 20171045385;
            const firstSemester = [
                { courseCode: "GST101", courseTitle: "Use of English I", unit: 2, grade: "A" },
                { courseCode: "GST103", courseTitle: "Humanities I", unit: 1, grade: "A" },
                { courseCode: "MTH101", courseTitle: "Elementary Mathematics I", unit: 4, grade: "A" },
                { courseCode: "PHY101", courseTitle: "General Physics I", unit: 4, grade: "A" },
                { courseCode: "CHM101", courseTitle: "General Chemistry I", unit: 4, grade: "A" },
                { courseCode: "BIO101", courseTitle: "Biology for Physical Sciences", unit: 3, grade: "A" },
                { courseCode: "ENG101", courseTitle: "Workshop Practice I", unit: 1, grade: "A" },
                { courseCode: "ENG103", courseTitle: "Engineering Drawing I", unit: 1, grade: "A" },
                { courseCode: "FRN101", courseTitle: "Use of French I", unit: 1, grade: "A" },
            ];
            // Create a new instance of the Result
            const firstSemesterResultData = {
                faculty: faculty,
                department: department,
                session: session,
                level: level,
                semester: semester,
                regNumber: regNumber,
                semesterResult: firstSemester,
            };

            // Create a new Result document
            const firstSemesterResult = new Result(firstSemesterResultData);

            // Upload the result to the database
            await firstSemesterResult.save().then(() => {
                console.log(`first semester result uploaded`);
            });

            const secondSemester = [
                { courseCode: "GST102", courseTitle: "Use of English II", unit: 2, grade: "A" },
                { courseCode: "GST108", courseTitle: "Social Science I", unit: 2, grade: "A" },
                { courseCode: "GST110", courseTitle: "Science, Technology & Society", unit: 1, grade: "A" },
                { courseCode: "MTH102", courseTitle: "Elementary Mathematics II", unit: 4, grade: "A" },
                { courseCode: "PHY102", courseTitle: "General Physics II", unit: 4, grade: "A" },
                { courseCode: "CHM102", courseTitle: "General Chemistry II", unit: 4, grade: "A" },
                { courseCode: "ENG102", courseTitle: "Workshop Practice II", unit: 1, grade: "A" },
                { courseCode: "ENG104", courseTitle: "Engineering Drawing II", unit: 1, grade: "A" },
                { courseCode: "FRN102", courseTitle: "Use of French II", unit: 1, grade: "A" },
            ];
            // Create a new instance of the Result
            const secondSemesterResultData = {
                faculty: faculty,
                department: department,
                session: session,
                level: level,
                semester: semester,
                regNumber: regNumber,
                semesterResult: secondSemester,
            };

            // Create a new Result document
            const secondSemesterResult = new Result(secondSemesterResultData);

            // Upload the result to the database
            await secondSemesterResult.save().then(() => {
                console.log(`second semester result uploaded`);
            });
        } catch (error) {
            console.error(error);
        }
    }

    try {
        await uploadResult(faculty, department, session, level, semester, course, resultsArray)
        res.status(200).json({ success: true, message: 'Result uploaded successfully' });
    } catch (error) {
        console.error('Error while trying to upload result:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}