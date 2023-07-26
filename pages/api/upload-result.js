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
    const { faculty, department, studentId } = req.body;

    async function uploadResult(faculty, department, studentId) {
        try {
            const firstYear = [
                [
                    { courseCode: "GST101", courseTitle: "Use of English I", unit: 2, grade: "A" },
                    { courseCode: "GST103", courseTitle: "Humanities I", unit: 1, grade: "B" },
                    { courseCode: "MTH101", courseTitle: "Elementary Mathematics I", unit: 4, grade: "A" },
                    { courseCode: "PHY101", courseTitle: "General Physics I", unit: 4, grade: "A" },
                    { courseCode: "CHM101", courseTitle: "General Chemistry I", unit: 4, grade: "D" },
                    { courseCode: "BIO101", courseTitle: "Biology for Physical Sciences", unit: 3, grade: "C" },
                    { courseCode: "ENG101", courseTitle: "Workshop Practice I", unit: 1, grade: "B" },
                    { courseCode: "ENG103", courseTitle: "Engineering Drawing I", unit: 1, grade: "A" },
                    { courseCode: "FRN101", courseTitle: "Use of French I", unit: 1, grade: "B" },
                ],
                [
                    { courseCode: "GST102", courseTitle: "Use of English II", unit: 2, grade: "C" },
                    { courseCode: "GST108", courseTitle: "Social Science I", unit: 2, grade: "A" },
                    { courseCode: "GST110", courseTitle: "Science, Technology & Society", unit: 1, grade: "B" },
                    { courseCode: "MTH102", courseTitle: "Elementary Mathematics II", unit: 4, grade: "A" },
                    { courseCode: "PHY102", courseTitle: "General Physics II", unit: 4, grade: "B" },
                    { courseCode: "CHM102", courseTitle: "General Chemistry II", unit: 4, grade: "A" },
                    { courseCode: "ENG102", courseTitle: "Workshop Practice II", unit: 1, grade: "D" },
                    { courseCode: "ENG104", courseTitle: "Engineering Drawing II", unit: 1, grade: "A" },
                    { courseCode: "FRN102", courseTitle: "Use of French II", unit: 1, grade: "C" },
                ],
            ];
            const secondYear = [
                [
                    { courseCode: "GST201", courseTitle: "Social Sciences II", unit: 1, grade: "A" },
                    { courseCode: "MTH203", courseTitle: "Elementary differential Equations I", unit: 3, grade: "A" },
                    { courseCode: "MTH211", courseTitle: "Statistics", unit: 3, grade: "A" },
                    { courseCode: "CSC201", courseTitle: "Computer & Applications", unit: 4, grade: "A" },
                    { courseCode: "ENG201", courseTitle: "Workshop Practice III", unit: 1, grade: "A" },
                    { courseCode: "ENG203", courseTitle: "Engineering Drawing III", unit: 1, grade: "A" },
                    { courseCode: "ENG207", courseTitle: "Introduction to Engineering Materials I", unit: 2, grade: "A" },
                    { courseCode: "ENG209", courseTitle: "Engineering Thermodynamics", unit: 3, grade: "A" },
                    { courseCode: "ENG213", courseTitle: "Engineering Mechanics I (Statics)", unit: 2, grade: "A" },
                    { courseCode: "ENG217", courseTitle: "Engineer in Society", unit: 1, grade: "A" },

                ],
                [
                    { courseCode: "MTH202", courseTitle: "Mathematical Methods II", unit: 3, grade: "A" },
                    { courseCode: "ENG206", courseTitle: "Workshop Practice IV", unit: 1, grade: "A" },
                    { courseCode: "ENG208", courseTitle: "Introduction to Engineering Materials II", unit: 2, grade: "A" },
                    { courseCode: "ENG212", courseTitle: "Engineering Economy", unit: 2, grade: "A" },
                    { courseCode: "ENG214", courseTitle: "Computer Programming for Engineering Applications", unit: 2, grade: "A" },
                    { courseCode: "ENG224", courseTitle: "Engineering Mechanics II (Dynamics)", unit: 2, grade: "A" },
                    { courseCode: "ENG226", courseTitle: "Introduction to Electrical Electronic Engineering", unit: 3, grade: "A" },
                    { courseCode: "EEE202", courseTitle: "Basic Electronic Engineering", unit: 2, grade: "A" },
                    { courseCode: "EEE204", courseTitle: "Digital Logic Technique", unit: 2, grade: "A" },
                    { courseCode: "EEE206", courseTitle: "Electrical Electronic Engineering Studio I", unit: 1, grade: "A" },
                    { courseCode: "SIW200", courseTitle: "Long Vacation SIWES", unit: 2, grade: "A" },
                ],
            ];
            const thirdYear = [
                [
                    { courseCode: "ENS301", courseTitle: "Introduction to Entrepreneurship and Innovation", unit: 2, grade: "A" },
                    { courseCode: "ENG307", courseTitle: "Engineering Mathematics I", unit: 3, grade: "A" },
                    { courseCode: "ENG305", courseTitle: "Strength of Materials I", unit: 3, grade: "A" },
                    { courseCode: "ENG309", courseTitle: "Fluid Mechanics I", unit: 3, grade: "A" },
                    { courseCode: "ENG313", courseTitle: "Engineering Writing & Presentation", unit: 2, grade: "A" },
                    { courseCode: "EEE301", courseTitle: "Network Theory I", unit: 2, grade: "A" },
                    { courseCode: "EEE305", courseTitle: "Electromagnetic Fields & Waves", unit: 2, grade: "A" },
                    { courseCode: "EEE307", courseTitle: "Engineering Control Systems Analysis & Design I", unit: 2, grade: "A" },
                    { courseCode: "EEE311", courseTitle: "Computer Organization & Architecture", unit: 2, grade: "A" },
                ],
                [
                    { courseCode: "ENG308", courseTitle: "Engineering Mathematics II", unit: 3, grade: "A" },
                    { courseCode: "ENS302", courseTitle: "Business creation, growth and corporate governance", unit: 2, grade: "A" },
                    { courseCode: "EEE302", courseTitle: "Electrical Electronic Engineering Studio II", unit: 1, grade: "A" },
                    { courseCode: "EEE306", courseTitle: "Network Theory II", unit: 2, grade: "A" },
                    { courseCode: "ECE302", courseTitle: "Theory of Electronic Instrumentation & Measurements", unit: 2, grade: "A" },
                    { courseCode: "ECE316", courseTitle: "Applied Electronics", unit: 3, grade: "A" },
                    { courseCode: "COE318", courseTitle: "Principles of Electronic Communication", unit: 3, grade: "A" },
                    { courseCode: "PSE312", courseTitle: "Electrical Power & Machines", unit: 3, grade: "A" },
                    { courseCode: "SIW300", courseTitle: "Long Vacation SIWES", unit: 2, grade: "A" },
                ],
            ];
            const fourthYear = [
                [
                    { courseCode: "ENG405", courseTitle: "Engineering Management & Law", unit: 2, grade: "A" },
                    { courseCode: "EEE401", courseTitle: "Microprocessor Systems & Applications", unit: 3, grade: "A" },
                    { courseCode: "EEE405", courseTitle: "Process Control Technology", unit: 2, grade: "A" },
                    { courseCode: "EEE407", courseTitle: "Introduction to Linear System Theory", unit: 2, grade: "A" },
                    { courseCode: "EEE409", courseTitle: "Electrical Engineering Analysis", unit: 2, grade: "A" },
                    { courseCode: "PSE409", courseTitle: "Electric Power Plants", unit: 2, grade: "A" },
                    { courseCode: "PSE411", courseTitle: "Electrical Machines", unit: 3, grade: "A" },
                    { courseCode: "PSE413", courseTitle: "Electrical Power System & Studio I", unit: 3, grade: "A" },
                ],
                [
                    { courseCode: "EEE403", courseTitle: "Principles of Energy Process", unit: 2, grade: "A" },
                    { courseCode: "SIW400", courseTitle: "Rain Semester SIWES", unit: 4, grade: "A" },
                    { courseCode: "SIW401", courseTitle: "Long Vacation SIWES", unit: 2, grade: "A" },
                ],
            ];
            const finalYear = [
                [
                    { courseCode: "EEE501", courseTitle: "Engineering Control System Analysis & Design II", unit: 3, grade: "A" },
                    { courseCode: "ECE509", courseTitle: "Industrial Electronics", unit: 3, grade: "A" },
                    { courseCode: "PSE501", courseTitle: "Project I", unit: 3, grade: "A" },
                    { courseCode: "PSE503", courseTitle: "Power System Engineering Studio I", unit: 2, grade: "A" },
                    { courseCode: "PSE505", courseTitle: "Seminar & Industrial Visits", unit: 2, grade: "A" },
                    { courseCode: "PSE507", courseTitle: "High Voltage Engineering Technology", unit: 3, grade: "A" },
                    { courseCode: "PSE511", courseTitle: "Optimization Techniques for Power Systems", unit: 3, grade: "A" },
                    { courseCode: "PSE513", courseTitle: "Power System Planning, Reliability & Economics", unit: 3, grade: "A" },
                ],
                [
                    { courseCode: "PSE502", courseTitle: "Project II", unit: 2, grade: "A" },
                    { courseCode: "PSE506", courseTitle: "Electrical Drive Systems", unit: 2, grade: "A" },
                    { courseCode: "PSE508", courseTitle: "Rotating Machine Control", unit: 1, grade: "A" },
                    { courseCode: "PSE510", courseTitle: "High Voltage DC Transmission", unit: 4, grade: "A" },
                    { courseCode: "PSE512", courseTitle: "Power Systems Protection", unit: 4, grade: "A" },
                    { courseCode: "PSE514", courseTitle: "Special Topics in Power Systems Engineering", unit: 4, grade: "A" },
                    { courseCode: "PSE516", courseTitle: "Electromagnetic of Electrical Machines", unit: 1, grade: "A" },
                    { courseCode: "EEE502", courseTitle: "Microwave Components & Measuring Techniques", unit: 1, grade: "A" },
                    { courseCode: "EEE504", courseTitle: "Computer Networks", unit: 1, grade: "A" },
                    { courseCode: "EEE506", courseTitle: "Introduction to Optimal Control", unit: 1, grade: "A" },
                ],
            ];

            // 100 Level
            const firstYearResultData = {
                faculty: faculty,
                department: department,
                session: '2017/2018',
                level: '100Level',
                studentId: studentId,
                sessionResult: firstYear,
            };
            // Create a new Result document
            const firstYearResult = new Result(firstYearResultData);
            // Upload the result to the database
            await firstYearResult.save().then(() => {
                console.log(`first year result uploaded`);
            });

            // 200 Level
            const secondYearResultData = {
                faculty: faculty,
                department: department,
                session: '2018/2019',
                level: '200Level',
                studentId: studentId,
                sessionResult: secondYear,
            };
            // Create a new Result document
            const secondYearResult = new Result(secondYearResultData);
            // Upload the result to the database
            await secondYearResult.save().then(() => {
                console.log(`second year result uploaded`);
            });

            // 300 Level
            const thirdYearResultData = {
                faculty: faculty,
                department: department,
                session: '2019/2020',
                level: '300Level',
                studentId: studentId,
                sessionResult: thirdYear,
            };
            // Create a new Result document
            const thirdYearResult = new Result(thirdYearResultData);
            // Upload the result to the database
            await thirdYearResult.save().then(() => {
                console.log(`third year result uploaded`);
            });

            // 400 Level
            const fourthYearResultData = {
                faculty: faculty,
                department: department,
                session: '2020/2021',
                level: '400Level',
                studentId: studentId,
                sessionResult: fourthYear,
            };
            // Create a new Result document
            const fourthYearResult = new Result(fourthYearResultData);
            // Upload the result to the database
            await fourthYearResult.save().then(() => {
                console.log(`fourth year result uploaded`);
            });

            // 400 Level
            const finalYearResultData = {
                faculty: faculty,
                department: department,
                session: '2021/2022',
                level: '500Level',
                studentId: studentId,
                sessionResult: finalYear,
            };
            // Create a new Result document
            const finalYearResult = new Result(finalYearResultData);
            // Upload the result to the database
            await finalYearResult.save().then(() => {
                console.log(`final year result uploaded`);
            });
        } catch (error) {
            console.error(error);
        }
    }

    try {
        await uploadResult(faculty, department, studentId)
        res.status(200).json({ success: true, message: 'Result uploaded successfully' });
    } catch (error) {
        console.error('Error while trying to upload result:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}