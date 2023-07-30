import mongoose from 'mongoose';

// Define the schema for the Result model
const resultSchema = new mongoose.Schema({
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    session: { type: String, required: true },
    level: { type: String, required: true },
    studentId: { type: Number, required: true },
    sessionResult: [[{
        courseCode: { type: String, required: true },
        courseTitle: { type: String, required: true },
        unit: { type: Number, required: true },
        grade: { type: String, required: true },
    }]],
});

// Create the Result model using the schema
const Result = mongoose.models.Result
    ? mongoose.model('Result') // If the model already exists, reuse it
    : mongoose.model('Result', resultSchema); // Otherwise, create a new model

// Define the schema for the Staff model
const staffSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Create the Staff model using the schema
const Staff = mongoose.models.Staff
    ? mongoose.model('Staff') // If the model already exists, reuse it
    : mongoose.model('Staff', staffSchema); // Otherwise, create a new model

// Define the schema for the Student model
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, required: true },
    dob: { type: String, required: true },
    studentId: { type: Number, required: true },
    nationality: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    dateOfEntry: { type: String, required: true },
    modeOfEntry: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    option: { type: String, required: false },
    registeredCourses: {
        type: [{
            session: { type: String, required: true },
            level: { type: String, required: true },
            semesters: [{
                semester: { type: Number, required: true },
                courses: [{
                    courseCode: { type: String, required: true },
                    courseTitle: { type: String, required: true },
                    unit: { type: Number, required: true },
                }]
            }]
        }],
        required: false
    },
    tpsApplicationData: {
        type: {
            requestId: { type: String, required: false },
            studentId: { type: String, required: false },
            program: { type: String, required: false },
            faculty: { type: String, required: false },
            department: { type: String, required: false },
            cost: { type: String, required: false },
            paymentStatus: { type: String, required: false },
        },
        required: false,
    },
});

// Create the Student model using the schema
const Student = mongoose.models.Student
    ? mongoose.model('Student') // If the model already exists, reuse it
    : mongoose.model('Student', studentSchema); // Otherwise, create a new model

module.exports = { Result, Staff, Student };