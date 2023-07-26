import Head from "next/head";
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';

export default function Transcript() {
    const [sessionsArray, setSessionsArray] = useState([]);
    const [fullName, setFullName] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState('');
    const [studentId, setStudentId] = useState('');
    const [nationality, setNationality] = useState('');
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [dateOfEntry, setDateOfEntry] = useState('');
    const [modeOfEntry, setModeOfEntry] = useState('');
    const [department, setDepartment] = useState('');
    const [option, setOption] = useState('');

    async function getStudentInfo(studentEmail) {
        const response = await fetch(`/api/student-info?email=${studentEmail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const jsonResponse = await response.json();
        const studentInfo = jsonResponse.data;
        const studentName = `${studentInfo.firstName} ${studentInfo.middleName} ${studentInfo.lastName}`;
        setFullName(studentName);
        setSex(studentInfo.sex);
        setDob(studentInfo.dob);
        setStudentId(studentInfo.studentId);
        setNationality(studentInfo.nationality);
        setStateOfOrigin(studentInfo.stateOfOrigin);
        setDateOfEntry(studentInfo.dateOfEntry);
        setModeOfEntry(studentInfo.modeOfEntry);
        setDepartment(studentInfo.department);
        setOption(studentInfo.option);
    }

    async function getStudentRecord(faculty, department, studentId) {
        const response = await fetch(`/api/get-student-record?faculty=${faculty}&department=${department}&studentId=${studentId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const jsonResponse = await response.json();
        const sessionResultData = jsonResponse.data;
        setSessionsArray(sessionResultData);
    }

    function calculateTotalUnits(semester) {
        let totalUnits = 0;
        let totalGradePoints = 0;

        semester.forEach((course) => {
            totalUnits += course.unit;

            // Calculate grade points for each course
            let points;
            if (course.grade === "A") {
                points = 5;
            } else if (course.grade === "B") {
                points = 4;
            } else if (course.grade === "C") {
                points = 3;
            } else if (course.grade === "D") {
                points = 2;
            } else if (course.grade === "E") {
                points = 1;
            } else if (course.grade === "F") {
                points = 0;
            }
            totalGradePoints += course.unit * points;
        });

        return {
            totalUnits,
            totalGradePoints,
        };
    }

    useEffect(() => {
        getStudentInfo('victorgeorge@example.com');
        getStudentRecord('SEET', 'EEE', '20171087537');
    }, []);

    useEffect(() => {
        sessionsArray.forEach((session, index) => {
            const firstSemester = session.sessionResult[0];
            const secondSemester = session.sessionResult[1];

            const firstSemesterResults = calculateTotalUnits(firstSemester);
            const secondSemesterResults = calculateTotalUnits(secondSemester);

            // Calculate final tnu for each session (for each semester separately)
            const sessionTnu = firstSemesterResults.totalUnits + secondSemesterResults.totalUnits;

            // Find the corresponding td element with ID "tnu" and update its content
            const tnuElement = document.getElementById(`tnu-${index}`);
            if (tnuElement) {
                tnuElement.textContent = `TNU: ${sessionTnu}`;
            }

            // Calculate TGP for each session (for each semester separately)
            const sessionTGP = firstSemesterResults.totalGradePoints + secondSemesterResults.totalGradePoints;

            // Calculate CGPA for each session (for each semester separately)
            const sessionCGPA = sessionTGP / (firstSemesterResults.totalUnits + secondSemesterResults.totalUnits);

            // Find the corresponding td elements with IDs "tgp" and "cgpa" and update their content
            const tgpElement = document.getElementById(`tgp-${index}`);
            if (tgpElement) {
                tgpElement.textContent = `TGP: ${sessionTGP.toFixed(2)}`;
            }

            const cgpaElement = document.getElementById(`cgpa-${index}`);
            if (cgpaElement) {
                cgpaElement.textContent = `CGPA: ${sessionCGPA.toFixed(2)}`;
            }
        });
    }, [sessionsArray]);

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>View &amp; Download Transcript - Transcript Processing System</title>
                <link href="/images/futologo3.png" rel="shortcut icon" type="image/x-icon" />
            </Head>

            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center text-center">
                    {sessionsArray.map((session, index) => {
                        const currentSession = session.session;
                        const sessionResult = session.sessionResult;
                        const firstSemester = sessionResult[0];
                        const secondSemester = sessionResult[1];
                        return (
                            <div key={index}>
                                <h3 className="font-bold text-black my-1">FEDERAL UNIVERSITY OF TECHNOLOGY, OWERRI.</h3>
                                <h5 className="font-bold text-black my-1">OFFICE OF THE REGISTRAR</h5>
                                <h5 className="font-bold text-black my-1">(Records &amp; Statistics Unit)</h5>
                                <h5 className="font-bold text-black my-1">P.M.B. 1526</h5>
                                <h5 className="font-bold text-black my-1">Owerri Nigeria</h5>
                                <h4 className="font-bold text-black my-2">STUDENT&apos;S ACADEMIC TRANSCRIPT</h4>

                                <table className="border-collapse w-full text-center">
                                    {/* <!-- STUDENT INFORMATION --> */}
                                    <thead>
                                        <tr>
                                            <th className="border border-black">Name of Student</th>
                                            <th className="border border-black">Sex</th>
                                            <th className="border border-black">Date of Birth</th>
                                            <th className="border border-black">Reg. No.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black" id="fullName">{fullName}</td>
                                            <td className="border border-black" id="sex">{sex}</td>
                                            <td className="border border-black" id="dob">{dob}</td>
                                            <td className="border border-black" id="studentId">{studentId}</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th className="border border-black">Nationality</th>
                                            <th className="border border-black">State of Origin</th>
                                            <th className="border border-black">Date of Entry</th>
                                            <th className="border border-black">Mode of Entry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black" id="nationality">{nationality}</td>
                                            <td className="border border-black" id="stateOfOrigin">{stateOfOrigin}</td>
                                            <td className="border border-black" id="dateOfEntry">{dateOfEntry}</td>
                                            <td className="border border-black" id="modeOfEntry">{modeOfEntry}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black font-bold text-black">School</td>
                                            <td className="border border-black font-bold text-black">Department:</td>
                                            <td className="border border-black" id="department">{department}</td>
                                            <td className="border border-black"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black" id="faculty"></td>
                                            <td className="border border-black font-bold text-black">Option:</td>
                                            <td className="border border-black" id="option">{option}</td>
                                            <td className="border border-black"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="border-collapse w-full text-center">
                                    {/* <!-- SESSION RESULT --> */}
                                    <thead>
                                        <tr>
                                            <th className="border border-black">Course Code</th>
                                            <th className="border border-black">Title of Course</th>
                                            <th className="border border-black">Units</th>
                                            <th className="border border-black">Grade</th>
                                            <th className="border border-black">Total Grade Points</th>
                                            <th className="border border-black">Cum G.P.A.</th>
                                        </tr>
                                    </thead>
                                    {index > 0 && (
                                        <tbody>
                                            <tr>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{currentSession} B/F</td>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            </tr>
                                        </tbody>
                                    )}
                                    <tbody>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{currentSession} HARMATTAN SEMESTER</td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        {firstSemester.map((course, index) => {
                                            var points;
                                            if (course.grade == "A") {
                                                points = 5;
                                            } else if (course.grade == "B") {
                                                points = 4;
                                            } else if (course.grade == "C") {
                                                points = 3;
                                            } else if (course.grade == "D") {
                                                points = 2;
                                            } else if (course.grade == "E") {
                                                points = 1;
                                            } else if (course.grade == "F") {
                                                points = 0;
                                            }
                                            const gradePoints = course.unit * points;
                                            return (
                                                <tr key={index}>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.courseCode}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.courseTitle}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.unit}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.grade}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{gradePoints}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{currentSession} RAIN SEMESTER</td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        {secondSemester.map((course, index) => {
                                            var points;
                                            if (course.grade == "A") {
                                                points = 5;
                                            } else if (course.grade == "B") {
                                                points = 4;
                                            } else if (course.grade == "C") {
                                                points = 3;
                                            } else if (course.grade == "D") {
                                                points = 2;
                                            } else if (course.grade == "E") {
                                                points = 1;
                                            } else if (course.grade == "F") {
                                                points = 0;
                                            }
                                            const gradePoints = course.unit * points;
                                            return (
                                                <tr key={index}>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.courseCode}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.courseTitle}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.unit}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{course.grade}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{gradePoints}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id={`tnu-${index}`}>TNU: </td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id={`tgp-${index}`}>TGP: </td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id={`cgpa-${index}`}>CGPA: </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="mt-10"><b>GRADING SYSTEM</b></p>
                                <table>
                                    {/* <!-- GRADING SYSTEM --> */}
                                    <tbody>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">A - Excellent</td>
                                            <td className="border-none p-0 m-0">5 points</td>
                                            <td className="border-none p-0 m-0">D - Pass</td>
                                            <td className="border-none p-0 m-0">2 points</td>
                                        </tr>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">B - Very Good</td>
                                            <td className="border-none p-0 m-0">4 points</td>
                                            <td className="border-none p-0 m-0">E - Poor Pass</td>
                                            <td className="border-none p-0 m-0">1 points</td>
                                        </tr>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">C - Good</td>
                                            <td className="border-none p-0 m-0">3 points</td>
                                            <td className="border-none p-0 m-0">F - Failure</td>
                                            <td className="border-none p-0 m-0">0 points</td>
                                        </tr>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">I - Incomplete</td>
                                            <td className="border-none p-0 m-0">W - Withdrew</td>
                                            <td className="border-none p-0 m-0">WP - Withdrew Passing</td>
                                            <td className="border-none p-0 m-0">WF - Withdrew Failing</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="mt-10"><b>DEGREE CLASSIFICATION - (1991 - DATE)</b></p>
                                <table>
                                    {/* <!-- DEGREE CLASSIFICATION --> */}
                                    <tbody>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">1st Class Honours :</td>
                                            <td className="border-none p-0 m-0">4.50 - 5.00</td>
                                            <td className="border-none p-0 m-0">Third Class :</td>
                                            <td className="border-none p-0 m-0">1.50 - 2.39</td>
                                        </tr>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">2nd Class Honours (Upper Division) :</td>
                                            <td className="border-none p-0 m-0">3.50 - 4.49</td>
                                            <td className="border-none p-0 m-0">Pass :</td>
                                            <td className="border-none p-0 m-0">1.00 - 1.49</td>
                                        </tr>
                                        <tr className="flex justify-between">
                                            <td className="border-none p-0 m-0">2nd Class Honours (Lower Division) :</td>
                                            <td className="border-none p-0 m-0">2.40 - 3.49</td>
                                            <td className="border-none p-0 m-0">Fail :</td>
                                            <td className="border-none p-0 m-0">0.00 - 0.99</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mb-10"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};