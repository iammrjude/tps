import Head from "next/head";
import 'tailwindcss/tailwind.css';

export default function Transcript() {
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
    const sessions = [[firstSemester, secondSemester], [firstSemester, secondSemester]];
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
                    {sessions.map((session, index) => {
                        const firstSemester = session[0];
                        const secondSemester = session[1];
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
                                            <td className="border border-black" id="fullName"></td>
                                            <td className="border border-black" id="sex"></td>
                                            <td className="border border-black" id="dob"></td>
                                            <td className="border border-black" id="studentId"></td>
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
                                            <td className="border border-black" id="nationality"></td>
                                            <td className="border border-black" id="stateOfOrigin"></td>
                                            <td className="border border-black" id="dateOfEntry"></td>
                                            <td className="border border-black" id="modeOfEntry"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black font-bold text-black">School</td>
                                            <td className="border border-black font-bold text-black">Department:</td>
                                            <td className="border border-black" id="department"></td>
                                            <td className="border border-black"></td>
                                        </tr>
                                        <tr>
                                            <td className="border border-black" id="faculty"></td>
                                            <td className="border border-black font-bold text-black">Option:</td>
                                            <td className="border border-black" id="option"></td>
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
                                    <tbody>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">2017/2018 HARMATTAN SEMESTER</td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        {firstSemester.map((element, index) => {
                                            var points;
                                            if (element.grade == "A") {
                                                points = 5;
                                            } else if (element.grade == "B") {
                                                points = 4;
                                            } else if (element.grade == "C") {
                                                points = 3;
                                            } else if (element.grade == "D") {
                                                points = 2;
                                            } else if (element.grade == "E") {
                                                points = 1;
                                            } else if (element.grade == "F") {
                                                points = 0;
                                            }
                                            const gradePoints = element.unit * points;
                                            return (
                                                <tr key={index}>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.courseCode}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.courseTitle}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.unit}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.grade}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{gradePoints}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">2017/2018 RAIN SEMESTER</td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0"></td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        {secondSemester.map((element, index) => {
                                            var points;
                                            if (element.grade == "A") {
                                                points = 5;
                                            } else if (element.grade == "B") {
                                                points = 4;
                                            } else if (element.grade == "C") {
                                                points = 3;
                                            } else if (element.grade == "D") {
                                                points = 2;
                                            } else if (element.grade == "E") {
                                                points = 1;
                                            } else if (element.grade == "F") {
                                                points = 0;
                                            }
                                            const gradePoints = element.unit * points;
                                            return (
                                                <tr key={index}>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.courseCode}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.courseTitle}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.unit}</td>
                                                    <td className="border border-black border-r-1 border-l-1 border-t-0 border-b-0">{element.grade}</td>
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
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id="tnu">TNU: </td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0"></td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id="tgp">TGP: </td>
                                            <td className="border border-black border-r-1 border-l-1 border-t-0" id="cgpa">CGPA: </td>
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