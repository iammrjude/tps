import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';


// Connect to MongoDB
const uri = process.env.CONNECTION_STRING;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});
const db = mongoose.connection;

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    middleName: { type: String, required: true },
    lname: { type: String, required: true },
    sex: { type: String, required: true },
    dob: { type: String, required: true },
    regNumber: { type: Number, required: true },
    nationality: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    dateOfEntry: { type: String, required: true },
    modeOfEntry: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    option: { type: String, required: false },
});
const Student = mongoose.model('Student', studentSchema);

async function createStudent() {
    try {
        // Hash the password
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const isabellaHenshaw = {
            fname: 'Isabella',
            middleName: 'Eme',
            lname: 'Henshaw',
            sex: 'FEMALE',
            dob: 'DD-MM-YYYY',
            regNumber: 20171045385,
            nationality: 'Nigerian',
            stateOfOrigin: 'CROSS RIVER',
            dateOfEntry: '2019/2018',
            modeOfEntry: 'UME',
            email: 'isabellahenshaw@example.com',
            password: hashedPassword,
            faculty: "SEET",
            department: "EEE",
        };

        const victorGeorge = {
            fname: 'Victor',
            middleName: 'Chikamso',
            lname: 'George',
            sex: 'MALE',
            dob: 'DD-MM-YYYY',
            regNumber: 20171087537,
            nationality: 'Nigerian',
            stateOfOrigin: 'ENUGU',
            dateOfEntry: '2019/2018',
            modeOfEntry: 'UME',
            email: 'victorgeorge@example.com',
            password: hashedPassword,
            faculty: "SEET",
            department: "EEE",
        };

        const numberOfDocuments = await Student.countDocuments();
        if (numberOfDocuments < 2) {
            // Create a new Student document
            const student1 = new Student(isabellaHenshaw);
            const student2 = new Student(victorGeorge);

            // Save the new staff member to the database
            await student1.save()
                .then(() => {
                    console.log(`isabella's account created`);
                });
            await student2.save()
                .then(() => {
                    console.log(`victor's account created`);
                });
        }
    } catch (error) {
        console.error(error);
    }
}

// *** Create a Student Document to Test Course Registration and Viewing of Results *** //
createStudent();

// Staff Schema and Model
const staffSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const Staff = mongoose.model('Staff', staffSchema);

async function createStaff() {
    try {
        // Hash the password
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Assuming you have the necessary data for the new staff member
        const newStaffData = {
            fname: 'John',
            lname: 'Doe',
            email: 'johndoe@example.com',
            password: hashedPassword
        };

        const numberOfDocuments = await Staff.countDocuments();
        if (numberOfDocuments === 0) {
            // Create a new Staff document
            const newStaff = new Staff(newStaffData);

            // Save the new staff member to the database
            await newStaff.save();
            console.log(`staff account created`);
        }
    } catch (error) {
        console.error(error);
    }
}

// *** Create a Staff Document to Test Uploading of Results *** //
createStaff();

// Result Schema and Model
const resultSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    session: { type: String, required: true },
    level: { type: String, required: true },
    semester: { type: Number, required: true },
    regNumber: { type: Number, required: true },
    semesterResult: [{
        courseCode: { type: String, required: true },
        courseTitle: { type: String, required: true },
        unit: { type: Number, required: true },
        grade: { type: String, required: true },
    }],
});
const resultModel = mongoose.model('Result', resultSchema, 'results');

async function uploadResult(faculty, department, session, level, semester, regNumber, resultsArray) {
    try {
        regNumber = 20171045385;
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
        // Create a new instance of the resultModel
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
        const firstSemesterResult = new resultModel(firstSemesterResultData);

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
        // Create a new instance of the resultModel
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
        const secondSemesterResult = new resultModel(secondSemesterResultData);

        // Upload the result to the database
        await secondSemesterResult.save().then(() => {
            console.log(`second semester result uploaded`);
        });
    } catch (error) {
        console.error(error);
    }
}

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

// async function getStudentEntireResult(faculty, department, regNumber) {
//     afafaf;
// }


function createApiResponse(success, message, data = null) {
    return { success, message, data, };
}

app.get('/', (req, res) => {
    res.status(200).send(`<h1>WELCOME TO TRANSCRIPT API</h1>`);
});

// Student Registration route
app.post('/register-student', asyncHandler(async (req, res) => {
    const { fname, middleName, lname, regNumber, email, password } = req.body;

    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        return res.status(400).json(createApiResponse(false, 'Email already exists'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student
    const newStudent = new Student({ fname, middleName, lname, regNumber, email, password: hashedPassword });
    await newStudent.save();

    res.status(200).json(createApiResponse(true, 'Registration successful'));
}));

// Student Login route
app.post('/login-student', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(400).json(createApiResponse(false, 'Invalid email'));
    }

    // Compare passwords
    const result = await bcrypt.compare(password, student.password);
    if (result === true) {
        return res.status(200).json(createApiResponse(true, 'Login successful'));
    } else {
        return res.status(400).json(createApiResponse(false, 'Incorrect password'));
    }
}));

// Staff Registration route
app.post('/register-staff', asyncHandler(async (req, res) => {
    const { fname, lname, email, password } = req.body;

    // Check if the email already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
        return res.status(400).json(createApiResponse(false, 'Email already exists'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Staff document
    const newStaff = new Staff({ fname, lname, email, password: hashedPassword });

    // Save the new staff member to the database
    await newStaff.save();

    res.status(200).json(createApiResponse(true, 'Registration successful'));
}));

// Staff Login route
app.post('/login-staff', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find the staff by email
    const staff = await Staff.findOne({ email });
    if (!staff) {
        return res.status(400).json(createApiResponse(false, 'Invalid email'));
    }

    // Compare passwords
    const result = await bcrypt.compare(password, staff.password);
    if (result === true) {
        return res.status(200).json(createApiResponse(true, 'Login successful'));
    } else {
        return res.status(400).json(createApiResponse(false, 'Incorrect password'));
    }
}));

app.get('/get-rows/:faculty/:department/:session/:level/:semester/:course', asyncHandler(async (req, res) => {
    const { faculty, department, session, level, semester, course } = req.params;
    const dataArray = await getDataArray(faculty, department, session, level, semester, course);
    res.status(200).json(createApiResponse(true, 'Data retrieved successfully', dataArray));
}));

app.post('/upload-result', asyncHandler(async (req, res) => {
    const { faculty, department, session, level, semester, course, resultsArray } = req.body;
    await uploadResult(faculty, department, session, level, semester, course, resultsArray)
    res.status(200).json(createApiResponse(true, 'Result uploaded successfully'));
}));

app.get('/student-info/:email', asyncHandler(async (req, res) => {
    const { email } = req.params;

    // Find the student by email
    const student = await Student.findOne({ email });

    const { fname, middleName, lname, sex, dob, regNumber, nationality, stateOfOrigin, dateOfEntry, modeOfEntry, email: emailAddress, faculty, department } = student;

    const studentInfo = { lname, fname, middleName, sex, dob, nationality, stateOfOrigin, dateOfEntry, modeOfEntry, regNumber, emailAddress, faculty, department, };
    res.status(200).json(createApiResponse(true, 'Student Info retrieved successfully', studentInfo));
}));