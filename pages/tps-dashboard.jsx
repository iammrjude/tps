import Head from "next/head";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function TpsDashboard() {
    const router = useRouter();
    const [firstName, setFirstName] = useState(null);
    const [middleName, setMiddleName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [programSelectedValue, setProgramSelectedValue] = useState(null);
    const [facultySelectedValue, setFacultySelectedValue] = useState(null);
    const [departmentSelectedValue, setDepartmentSelectedValue] = useState(null);
    const [isFacultyDisabled, setIsFacultyDisabled] = useState(true);
    const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(true);
    const [isNewApplication, setIsNewApplication] = useState(false);
    const [infoIsCorrect, setInfoIsCorrect] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const [program, setProgram] = useState(null);
    const [progressFaculty, setProgressFaculty] = useState(null);
    const [progressDepartment, setProgressDepartment] = useState(null);
    const [cost, setCost] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [sessionsArray, setSessionsArray] = useState([]);
    const [fullName, setFullName] = useState(null);
    const [sex, setSex] = useState(null);
    const [dob, setDob] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [stateOfOrigin, setStateOfOrigin] = useState(null);
    const [dateOfEntry, setDateOfEntry] = useState(null);
    const [modeOfEntry, setModeOfEntry] = useState(null);
    const [faculty, setFaculty] = useState(null);
    const [department, setDepartment] = useState(null);
    const [option, setOption] = useState(null);

    // Function to get grade points based on grade
    function getPoints(grade) {
        switch (grade) {
            case "A":
                return 5;
            case "B":
                return 4;
            case "C":
                return 3;
            case "D":
                return 2;
            case "E":
                return 1;
            case "F":
                return 0;
            default:
                return 0;
        }
    }

    async function generatePDF() {
        const pdfDoc = await PDFDocument.create();

        for (const session of sessionsArray) {
            const currentSession = session.session;
            const sessionResult = session.sessionResult;
            const firstSemester = sessionResult[0];
            const secondSemester = sessionResult[1];

            const currentPage = pdfDoc.addPage();
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
            currentPage.setFont(font);
            currentPage.setFontSize(12);
            const { width, height } = currentPage.getSize();

            // Set up text positions and styles
            const textContent = [
                { text: "FEDERAL UNIVERSITY OF TECHNOLOGY, OWERRI.", fontSize: 14 },
                { text: "OFFICE OF THE REGISTRAR", fontSize: 12 },
                { text: "(Records & Statistics Unit)", fontSize: 12 },
                { text: "P.M.B. 1526", fontSize: 12 },
                { text: "Owerri Nigeria", fontSize: 12 },
                { text: "STUDENT'S ACADEMIC TRANSCRIPT", fontSize: 12 },
            ];

            const lineHeight = 15;
            const pageCenterX = currentPage.getWidth() / 2;

            // Calculate total text block height
            const totalHeight = textContent.length * lineHeight;
            let startY = currentPage.getHeight() - 50;

            // Add each text element to the PDF
            for (const { text, fontSize } of textContent) {
                const textWidth = font.widthOfTextAtSize(text, fontSize);

                currentPage.drawText(text, {
                    x: pageCenterX - textWidth / 2,
                    y: startY,
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0), // black color
                });

                startY -= lineHeight;
            }

            // Set up table data (replace the placeholders with actual data)
            // Define the table structure
            const table = [
                ["Name of Student", "Sex", "Date of Birth", "Reg. No."],
                [`${fullName.toUpperCase()}`, `${sex}`, `${dob}`, `${studentId}`],
                ["Nationality", "State of Origin", "Date of Entry", "Mode of Entry"],
                [`${nationality}`, `${stateOfOrigin}`, `${dateOfEntry}`, `${modeOfEntry}`],
                ["School", "Department:", department, ""],
                [`${faculty}`, "Option:", `${option}`, ""],
            ];

            // Set up table dimensions and cell padding
            const tableStartX = 50;
            const tableStartY = startY; // Set vertical position below the text content
            const cellWidth = 125;
            const cellHeight = 25;
            const maxFontSize = 12;
            const cellPadding = 5;

            // Function to draw a table cell
            const drawCell = (text, x, y, width, height) => {
                let fontSize = maxFontSize;

                while (fontSize > 0) {
                    const textWidth = font.widthOfTextAtSize(text, fontSize);
                    const textHeight = font.heightAtSize(fontSize);

                    if (textWidth <= width - 2 * cellPadding && textHeight <= height - 2 * cellPadding) {
                        break;
                    }

                    fontSize--;
                }

                const textX = x + (width - font.widthOfTextAtSize(text, fontSize)) / 2;
                const textY = y - (height - font.heightAtSize(fontSize)) / 2 - cellPadding;

                currentPage.drawText(text, {
                    x: textX,
                    y: textY,
                    size: fontSize,
                    font: font,
                    color: rgb(0, 0, 0), // black color
                });
            };

            // Function to draw the entire table
            let currentY;
            const drawTable = (data) => {
                currentY = tableStartY;
                for (const row of data) {
                    let currentX = tableStartX;

                    for (const cell of row) {
                        // Draw the cell border
                        currentPage.drawRectangle({
                            x: currentX,
                            y: currentY - cellHeight,
                            width: cellWidth,
                            height: cellHeight,
                            borderColor: rgb(0, 0, 0), // black color
                            borderWidth: 1,
                        });

                        // Draw the cell content
                        drawCell(cell, currentX, currentY, cellWidth, cellHeight);

                        currentX += cellWidth;
                    }

                    currentY -= cellHeight;
                }
            };

            // Draw the first table
            drawTable(table);

            // Define the table data
            const tableData = [
                ["Course Code", "Title of Course", "Units", "Grade", "Total Grade Points", "Cum G.P.A."],
                [], // Add an empty row for formatting
                ["", `${currentSession} B/F`, "", "", "", ""],
                ["", `${currentSession} HARMATTAN SEMESTER`, "", "", "", ""],
                ...firstSemester.map((course) => {
                    const points = getPoints(course.grade);
                    const gradePoints = course.unit * points;
                    return [
                        course.courseCode,
                        course.courseTitle,
                        course.unit.toString(),
                        course.grade,
                        gradePoints.toString(),
                        "", // Cum G.P.A. will be calculated later
                    ];
                }),
                ["", `${currentSession} RAIN SEMESTER`, "", "", "", ""],
                ...secondSemester.map((course) => {
                    const points = getPoints(course.grade);
                    const gradePoints = course.unit * points;
                    return [
                        course.courseCode,
                        course.courseTitle,
                        course.unit.toString(),
                        course.grade,
                        gradePoints.toString(),
                        "", // Cum G.P.A. will be calculated later
                    ];
                }),
                ["", "", "", "", "", ""],
                ["", "", "", "", "", ""],
                ["", "", "TNU:", "", "TGP:", "CGPA:"],
            ];

            // Set up table dimensions and cell padding
            const secondTableStartX = 50;
            const secondTableStartY = currentY;
            const secondCellWidth = 80;
            const secondCellHeight = 20;
            const secondFontSizeTable = 10;
            const secondCellPadding = 5;

            // Function to draw a table cell
            const drawSecondCell = (text, x, y, width, height) => {
                const textX = x + secondCellPadding;
                const textY = y - secondCellPadding - height / 2 + secondFontSizeTable / 2;

                currentPage.drawText(text, {
                    x: textX,
                    y: textY,
                    size: secondFontSizeTable,
                    font: font,
                    color: rgb(0, 0, 0), // black color
                });
            };

            // Function to draw the entire table
            const drawSecondTable = (data) => {
                let secondCurrentY = secondTableStartY;

                for (const row of data) {
                    let currentX = secondTableStartX;

                    for (const cell of row) {
                        // Draw the cell border
                        currentPage.drawRectangle({
                            x: currentX,
                            y: secondCurrentY - secondCellHeight,
                            width: secondCellWidth,
                            height: secondCellHeight,
                            borderColor: rgb(0, 0, 0), // black color
                            borderWidth: 1,
                        });

                        // Draw the cell content
                        drawSecondCell(cell, currentX, secondCurrentY, secondCellWidth, secondCellHeight);

                        currentX += secondCellWidth;
                    }

                    secondCurrentY -= secondCellHeight;
                }
            };

            // Draw the table
            drawSecondTable(tableData);

            // Calculate and set Cum G.P.A. values
            const cgpaIndex = tableData.length - 1;
            const tgpIndex = cgpaIndex - 1;
            const tnuIndex = tgpIndex - 1;

            let totalGradePoints = 0;
            let totalUnits = 0;

            // Calculate total grade points and total units for first semester
            for (let i = 4; i < firstSemester.length + 4; i++) {
                const gradePoints = parseInt(tableData[i][4]);
                totalGradePoints += gradePoints;
                totalUnits += parseInt(tableData[i][2]);
            }

            // Calculate total grade points and total units for second semester
            for (let i = firstSemester.length + 6; i < firstSemester.length + 6 + secondSemester.length; i++) {
                const gradePoints = parseInt(tableData[i][4]);
                totalGradePoints += gradePoints;
                totalUnits += parseInt(tableData[i][2]);
            }

            const cgpa = totalGradePoints / totalUnits;
            tableData[tnuIndex][2] = totalUnits.toString();
            tableData[tgpIndex][4] = totalGradePoints.toString();
            tableData[cgpaIndex][5] = cgpa.toFixed(2).toString();
        }

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    async function handleGeneratePDF() {
        try {
            const pdfBytes = await generatePDF();
            const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

            saveAs(pdfBlob, 'transcript.pdf');
        } catch (error) {
            console.log('Error generating PDF:', error);
        }
    }

    function handleProcessPayment() {
        // Redirect to payment page
        router.push('/pay-tps-fee');
    }

    function handleSetInfoIsCorrect(e) {
        if (infoIsCorrect == true) {
            setInfoIsCorrect(false);
        }
        if (infoIsCorrect == false) {
            setInfoIsCorrect(true);
        }
    }

    function handlePreview() {
        // Redirect to transcript preview page
        router.push('/transcript');
    }

    async function saveProgress(studentId) {
        try {
            const data = { studentId: studentId, program: programSelectedValue, faculty: facultySelectedValue, department: departmentSelectedValue, cost: '17500', paymentStatus: 'unpaid' };
            const response = await fetch(`/api/save-progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const jsonResponse = await response.json();
        } catch (error) {
            console.error('Error while trying to save progress:', error);
        }
    }

    async function retrieveProgress(studentId) {
        try {
            const response = await fetch(`/api/retrieve-progress?studentId=${studentId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const jsonResponse = await response.json();
            const progress = jsonResponse.data;
            setRequestId(progress.requestId);
            setProgram(progress.program);
            setProgressFaculty(progress.faculty);
            setProgressDepartment(progress.department);
            setCost(progress.cost);
            setPaymentStatus(progress.paymentStatus);
        } catch (error) {
            console.error('Error while trying to retrieve progress:', error);
        }
    }

    async function tpsRequest() {
        if (infoIsCorrect == false) {
            alert("To Proceed, Please Confirm The Information You Provided");
            return;
        }
        if (infoIsCorrect == true) {
            await saveProgress(studentId);
            alert("Your Request Has Been Saved!! Please Proceed to Make Payment");
        }
    }

    async function getStudentInfo(studentEmail) {
        const response = await fetch(`/api/student-info?email=${studentEmail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const jsonResponse = await response.json();
        const studentInfo = jsonResponse.data;

        // Populate the form fields with the student data
        setFirstName(studentInfo.firstName);
        setMiddleName(studentInfo.middleName);
        setLastName(studentInfo.lastName);
        setEmail(studentInfo.email);
        setFullName(`${studentInfo.firstName} ${studentInfo.middleName} ${studentInfo.lastName}`);
        setSex(studentInfo.sex);
        setDob(studentInfo.dob);
        setStudentId(studentInfo.studentId);
        setNationality(studentInfo.nationality);
        setStateOfOrigin(studentInfo.stateOfOrigin);
        setDateOfEntry(studentInfo.dateOfEntry);
        setModeOfEntry(studentInfo.modeOfEntry);
        setDepartment(studentInfo.department);
        setFaculty(studentInfo.faculty);
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

    function applyNew() {
        if (!programSelectedValue) {
            alert("Please Select a Program");
            return;
        }
        if (!facultySelectedValue) {
            alert("Please Select Faculty");
            return;
        }
        if (!departmentSelectedValue) {
            alert("Please Select Your Department");
            return;
        }
        setIsNewApplication(true);
    }

    function closeApplyNew() {
        setIsNewApplication(false);
    }

    useEffect(() => {
        // Retrieve the stored email from session storage
        const studentEmail = sessionStorage.getItem('studentEmail');
        if (studentEmail) {
            getStudentInfo(studentEmail);
        } else {
            // Redirect to login-student page
            router.push('/login-student');
        }
    }, []);

    useEffect(() => {
        if (faculty && department && studentId) {
            getStudentRecord(faculty, department, studentId);
        }
    }, [faculty, department, studentId]);

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

    useEffect(() => {
        if (studentId) {
            retrieveProgress(studentId);
        }
    }, [studentId]);

    useEffect(() => {
        if (programSelectedValue === "B.Eng.") {
            setIsFacultyDisabled(false);
        } else {
            setProgramSelectedValue(null);
            setIsFacultyDisabled(true);
        }
        if (facultySelectedValue === "SEET") {
            setIsDepartmentDisabled(false);
        } else {
            setFacultySelectedValue(null);
            setIsDepartmentDisabled(true);
        }
    }, [programSelectedValue, facultySelectedValue]);

    return (
        <>
            <Head id="Head">
                <link href="images/icon.png" rel="shortcut icon" type="image/x-icon" />
                <style id="StylePlaceholder" type="text/css"></style>
                <link id="ADesktopModules_DNNInfo_News_module_css" rel="stylesheet" type="text/css" href="/css/module_002.css" />
                <link id="ADesktopModules_Announcements_module_css" rel="stylesheet" type="text/css" href="/css/module.css" />
                <link id="APortals__default_default_css" rel="stylesheet" type="text/css" href="/css/default.css" />
                <link id="APortals__default_Skins_Futo_skin_css" rel="stylesheet" type="text/css" href="/css/skin.css" />
                <link id="APortals__default_Containers_Futo_container_css" rel="stylesheet" type="text/css" href="/css/container.css" />
                <link href="/css/ComboBox.css" rel="stylesheet" type="text/css" />
                <title>Dashboard - Transcript Processing System</title>
            </Head>

            <div id="Body">
                <form method="post" action="/" id="Form" encType="multipart/form-data">
                    <link href="images/icon.png" rel="shortcut icon" type="image/x-icon" />

                    <link rel="stylesheet" href="/css/demos.css" />

                    <div id="page" className="" style={{ backgroundColor: "#FFF", color: "#000" }}>
                        <div className="header" style={{ backgroundImage: "url('images/futoHeaderbg.jpg')", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}>
                            <div id="ControlPanelWrapper"></div>
                            <div className="clear"></div>
                            <div className="">
                                <div className="clear"></div>
                                <div id="LogoCont" className="left" style={{ backgroundImage: "url('images/icon.png')" }}></div>
                                <h1 className="left">Federal University of Technology,<br />
                                    <span>Owerri</span>
                                </h1>
                                <div className="right LogoHolder">
                                    <ul className="right nextlinks">
                                        <li><a href="./">Home</a> </li>
                                        <li><a href="">Students</a></li>
                                        <li><a href="">Alumni</a> </li>
                                        <li><a href="">Visitors</a> </li>
                                        <li><a target="_new" href="">Library</a></li>
                                        <li><a href="">Contact</a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </div>
                            </div>
                            <div className=" clear"></div>
                        </div>
                        <div className="clear"></div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                    <div className="clearh5"></div>
                </form>

                <div id="page" className="Home" style={{ marginTop: "-5px" }}>
                    <div className="clear"></div>

                    <div id="main" style={{ width: "1000px", height: "850px" }}>
                        <div id="dnn_ContentPane">
                            <div className="DnnModule DnnModule-DNN_HTML DnnModule-1593"><a name="1593"></a></div>
                        </div>
                        <div id="dnn_LeftPane">
                            <div className="DnnModule DnnModule-DNNInfo_News_NewsList DnnModule-1526"><a name="1526"></a>

                                <div className="News" style={{ width: "1020px" }}>
                                    {/* <!-- Start_Module_1526 --> */}
                                    <div id="dnn_ctr1526_ContentPane" className="scroll">
                                        <div id="dnn_ctr1526_ModuleContent" className="DNNModuleContent ModDNNInfoNewsNewsListC">

                                            <div className="DNNInfo_NewsList">
                                                <div className="DNNInfo_NewsHeader">
                                                </div>
                                                <div className="DNNInfo_NewsList">
                                                    <div className="news_detailsbox">
                                                        <form name="Form" id="Form" encType="multipart/form-data">
                                                            <div className="news_detailstitle" style={{ height: "20px" }}>
                                                                <div style={{ float: "left", marginLeft: "20px" }}>
                                                                    FUTO Transcript Processing and Result Verification System
                                                                </div>
                                                                <div id="cmdOut_handle" style={{ float: "right", marginRight: "20px" }}>
                                                                    {/* onClick={handleLogout} */}
                                                                    <button type="submit" id="cmdOut" name="cmdOut" value="Logout" style={{ border: "none", backgroundColor: "inherit", color: "#EC6674", cursor: "pointer" }} className="">Logout</button>
                                                                </div>
                                                                <div id="cmdProfile_handle" style={{ float: "right", marginRight: "5px" }}>
                                                                    <button type="submit" id="cmdPaymentStatus" name="cmdPaymentStatus" value="Payment Status" style={{ cursor: "pointer" }}>Payment Status</button>
                                                                </div>
                                                                <div id="cmdProfile_handle" style={{ float: "right", marginRight: "5px" }}>
                                                                    <button type="submit" id="cmdProfile" name="cmdProfile" value="My Profile" style={{ cursor: "pointer" }}>My Profile</button>
                                                                </div>
                                                                {!isNewApplication && (
                                                                    <div id="cmdNew_handle" style={{ float: "right", marginRight: "5px" }}>
                                                                        <button type="button" id="cmdNew" name="cmdNew" value="New" onClick={applyNew} style={{}} className="">Apply New</button>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div>
                                                                <p id="tps_info"
                                                                    style={{ minHeight: "25px", height: "auto", width: "710px", marginLeft: "200px", color: "#F00" }}>
                                                                </p>
                                                                <table style={{ width: "inherit", textAlign: "justify", marginLeft: "20px", marginTop: "0px" }}>
                                                                    <tbody>
                                                                        <tr style={{ height: "40px" }}>
                                                                            <td>
                                                                                <label htmlFor='LastName' title='Your Last Name'>LAST NAME:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete='off' id='LastName' name='LastName' type='text' value={lastName} style={{ width: "200px", resize: 'none', }} />
                                                                            </td>
                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                <label htmlFor='FirstName' title='Your First Name'>FIRST NAME:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete='off' id='FirstName' name='FirstName' type='text' value={firstName} style={{ width: "200px", resize: 'none', }} />
                                                                            </td>
                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                <label htmlFor='MiddleName' title='Your Last Name'>MIDDLE NAME:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete='off' id='MiddleName' name='MiddleName' type='text' value={middleName} style={{ width: "200px", resize: 'none', }} />
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ height: "40px" }}>
                                                                            <td>
                                                                                <label htmlFor='studentId' title='Your Registration Number'>REG. NUMBER:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete='off' id='studentId' name='studentId' type='text' value={studentId} style={{ width: "200px", resize: 'none', }} />
                                                                            </td>
                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                <label htmlFor="Email" title="Your Valid E-Mail Address as Verification will be required.">EMAIL ADDRESS:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete="off" id="Email" name="Email" type="email" value={email} style={{ width: "200px", resize: 'none', }} />
                                                                            </td>
                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                <label htmlFor="program" title="Select your program">PROGRAM:</label>
                                                                            </td>
                                                                            <td>
                                                                                <select data-val="true" data-val-required="*" id="program" name="program" value={programSelectedValue} onChange={(e) => setProgramSelectedValue(e.target.value)} style={{ width: "200px" }}>
                                                                                    <option id='prog_1' value=""></option>
                                                                                    <option value='B.Eng.'>B.Eng.</option>
                                                                                    <option value='B.Tech.'>B.Tech.</option>
                                                                                    <option value='M.Eng.'>M.Eng.</option>
                                                                                    <option value='M.Sc.'>M.Sc.</option>
                                                                                    <option value='M.Tech.'>M.Tech.</option>
                                                                                    <option value='M.Ph'>M.Ph</option>
                                                                                    <option value='O.D'>O.D</option>
                                                                                    <option value='PGD'>PGD</option>
                                                                                    <option value='PhD'>PhD</option>
                                                                                </select>
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ height: "40px" }}>
                                                                            <td>
                                                                                <label htmlFor="faculty" title="Your School/Faculty">FACULTY:</label>
                                                                            </td>
                                                                            <td>
                                                                                <select data-val="true" data-val-required="*" id="faculty" name="faculty" value={facultySelectedValue} onChange={(e) => setFacultySelectedValue(e.target.value)} style={{ width: "200px" }} disabled={isFacultyDisabled}>
                                                                                    <option value=""></option>
                                                                                    <option value="SAAT">School of Agriculture And Agricultural Technology (SAAT)</option>
                                                                                    <option value="SBMS">School of Basic Medical Science (SBMS)</option>
                                                                                    <option value="SOBS">School of Biological Science (SOBS)</option>
                                                                                    <option value="SEET">School of Engineering and Engineering Technology (SEET)</option>
                                                                                    <option value="SESET">School of Electrical Systems Engineering Technology (SESET)</option>
                                                                                    <option value="SOES">School of Environmental Science (SOES)</option>
                                                                                    <option value="SOHT">School of Health Technology (SOHT)</option>
                                                                                    <option value="SICT">School of Information and Communication Technology (SICT)</option>
                                                                                    <option value="SMAT">School of Management Technology (SMAT)</option>
                                                                                    <option value="SOPS">School of Physical Science (SOPS)</option>
                                                                                    <option value="SPGS">School of Postgraduate Studies (SPGS)</option>
                                                                                    <option value="DGS">Directorate of General Studies (DGS)</option>
                                                                                </select>
                                                                            </td>
                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                <label htmlFor="department" title="Your Department.">DEPARTMENT:</label>
                                                                            </td>
                                                                            <td>
                                                                                <select data-val="true" data-val-required="*" id="department" name="department" value={departmentSelectedValue} onChange={(e) => setDepartmentSelectedValue(e.target.value)} style={{ width: "200px" }} disabled={isDepartmentDisabled}>
                                                                                    <option value=""></option>
                                                                                    <option value="ABE">Agricultural and Bio resources
                                                                                        Engineering</option>
                                                                                    <option value="CHE">Chemical Engineering</option>
                                                                                    <option value="CIE">Civil Engineering</option>
                                                                                    <option value="EEE">Electrical and Electronics
                                                                                        Engineering</option>
                                                                                    <option value="FST">Food Science and technology
                                                                                    </option>
                                                                                    <option value="MME">Material and Matallurgical
                                                                                        Engineering</option>
                                                                                    <option value="MEE">Mechanical Engineering</option>
                                                                                    <option value="MCE">Mechatronic Engineering</option>
                                                                                    <option value="PET">Petroleum Engineering</option>
                                                                                    <option value="PTE">Polymer and Textile Engineering
                                                                                    </option>
                                                                                </select>
                                                                            </td>

                                                                            <td style={{ width: "100px", textAlign: "right" }}>
                                                                                {/* <!-- <label htmlFor="datepicker" title="Transcript Request Format">DATE GRADUATED:</label> --> */}
                                                                            </td>
                                                                            <td>
                                                                                {/* <!-- <input type="date" id="datepicker" name="datepicker" style={{width:"200px"}} placeholder="YYYY-MM-DD" /> --> */}
                                                                            </td>
                                                                        </tr>

                                                                        <tr style={{ height: "40px" }}>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <br />

                                                                <div id="tps_info"
                                                                    style={{ minHeight: "25px", height: "auto", width: "960px", textAlign: "center", marginLeft: "20px", color: "#F00" }}>
                                                                    <p style={{ textAlign: "center", marginLeft: "0px", color: "#F00" }}>
                                                                        Please tick the <span style={{ fontStyle: "italic" }}>Checkbox</span> below to confirm that the information you provided is correct.
                                                                    </p>
                                                                    <p style={{ textAlign: "center", marginLeft: "0px", color: "#F00" }}>
                                                                        After that click the <span style={{ fontStyle: "italic" }}>Save and Continue</span> button below to proceed with your request.
                                                                        You will be prompted to make payment.
                                                                    </p>
                                                                    <p style={{ textAlign: "center", marginLeft: "0px", color: "#F00" }}>
                                                                        Upon successful payment the option to <span style={{ fontStyle: "italic" }}>Preview or Download</span> the transcript as a PDF will be made available.
                                                                    </p>
                                                                </div>
                                                                {isNewApplication && (
                                                                    <>
                                                                        <fieldset id="newApp" style={{ height: "auto", width: "960px", marginLeft: "20px" }}>
                                                                            <legend id="appHeader">NEW APPLICATION</legend>

                                                                            <table style={{ width: "inherit", textAlign: "justify", marginLeft: "5px", marginTop: "10px" }}>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style={{ width: "160px" }}>
                                                                                            <label htmlFor="fullName" title="Your Full Name">FULL NAME:</label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input readOnly id="fullName" name="fullName" placeholder="Your Full Name" type="text" value={fullName} style={{ width: "600px" }} required />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <label style={{}} id="studentId_lbl" htmlFor="studentId" title="Matriculation Number">MATRICULATION NUMBER:</label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input readOnly id="studentId" name="studentId" placeholder="Matriculation Number" type="text" value={studentId} style={{ width: "600px" }} required />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <label style={{}} id="program_lbl" htmlFor="program" title="Selected Program">PROGRAM:</label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input readOnly id="program" name="program" placeholder="Selected Program" type="text" value={programSelectedValue} style={{ width: "300px" }} required />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <label style={{}} id="faculty_lbl" htmlFor="faculty" title="Faculty">FACULTY:</label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input readOnly id="faculty" name="faculty" placeholder="Faculty" type="text" value={facultySelectedValue} style={{ width: "300px" }} required />
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            <label style={{}} id="department_lbl" htmlFor="department" title="Department">DEPARTMENT:</label>
                                                                                        </td>
                                                                                        <td>
                                                                                            <input readOnly id="department" name="department" placeholder="Department" type="text" value={departmentSelectedValue} style={{ width: "300px" }} required />
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <label>
                                                                                <input type="checkbox" id="confirmCheckbox" value={infoIsCorrect} onChange={(e) => handleSetInfoIsCorrect(e)} required />
                                                                                I confirm that the information provided above is correct.
                                                                            </label>
                                                                        </fieldset>

                                                                        <div id="newApp_tbl" style={{}}>
                                                                            <table style={{ width: "980px", textAlign: "justify", marginLeft: "20px", marginTop: "0px" }}>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td></td>
                                                                                        <td style={{ textAlign: "right" }}>
                                                                                            <button type="button" id="cmdCancel" name="cmdCancel" value="Cancel" onClick={closeApplyNew} className="">Close</button>
                                                                                            <button type="button" id="cmdSubmit" name="cmdSubmit" value="Save and Continue" onClick={tpsRequest} className="">Save and Continue</button>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div><br />
                                                                    </>
                                                                )}

                                                                <br />

                                                                <div id="progress_tbl" style={{ display: "none" }}>
                                                                    <table style={{ width: "980px", textAlign: "justify", marginLeft: "20px", marginTop: "0px" }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td style={{ textAlign: "left" }}>
                                                                                    <label id="progress" name="progress"
                                                                                        className="">working please
                                                                                        wait...</label>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <br />

                                                                <fieldset id="previousApp" style={{ height: "310px", width: "960px", marginLeft: "20px", overflow: "auto" }}>
                                                                    <legend>PREVIOUS APPLICATIONS</legend>
                                                                    <div style={{ display: "none" }}>
                                                                        <input readOnly id="txtcategory" name="txtcategory" type="text" value="transcript" />
                                                                    </div>
                                                                    <div id="previousRQST" style={{ color: "#000" }}>

                                                                        <table width='104%' style={{ borderWidth: "1px" }}>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width='10%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        REQUEST ID
                                                                                    </td>
                                                                                    <td width='10%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        REG. NO
                                                                                    </td>
                                                                                    <td width='10%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        PROGRAM
                                                                                    </td>
                                                                                    <td width='7%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        FACULTY
                                                                                    </td>
                                                                                    <td width='7%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        DEPARTMENT
                                                                                    </td>
                                                                                    <td width='7%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        COST
                                                                                    </td>
                                                                                    <td width='7%' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        STATUS
                                                                                    </td>
                                                                                    <td width='auto' style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                    </td>
                                                                                </tr>
                                                                                {paymentStatus && (
                                                                                    <tr>
                                                                                        <td width='10%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {`TPS_0${requestId}`}
                                                                                        </td>
                                                                                        <td width='10%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {studentId}
                                                                                        </td>
                                                                                        <td width='10%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {program}
                                                                                        </td>
                                                                                        <td width='7%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {progressFaculty}
                                                                                        </td>
                                                                                        <td width='7%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {progressDepartment}
                                                                                        </td>
                                                                                        <td width='7%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {cost}
                                                                                        </td>
                                                                                        <td width='7%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {paymentStatus}
                                                                                        </td>
                                                                                        <td width='auto%' style={{ borderWidth: "1px", textAlign: "center" }}>
                                                                                            {paymentStatus == "unpaid" ? (
                                                                                                <>
                                                                                                    <input type="button" id="cancel" name="cancel" value="Cancel" className="" />
                                                                                                    <input type="button" id="edit" name="edit" value="Edit" className="" />
                                                                                                    <input onClick={handleProcessPayment} type="button" id="makePayment" name="makePayment" value="Continue to Payment" className="" />
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    {paymentStatus && (
                                                                                                        <>
                                                                                                            <input type="button" id="preview" name="preview" value="Preview" onClick={handlePreview} className="" />
                                                                                                            <input type="button" id="download" name="download" value="Download PDF" onClick={handleGeneratePDF} className="" />
                                                                                                        </>
                                                                                                    )}
                                                                                                </>
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        {/* <!-- End_Module_1526 --> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="footer">
                        <div className="right">
                            <br />
                            <p className="">Copyright &copy; 2023 Federal University of Technology, Owerri</p>
                            <div className="clear"></div>
                        </div>

                        <div className="left">
                            <ul className="removeListStyle">
                                <li><a href="./">Home</a>| </li>
                                <li><a href="">Students</a>| </li>
                                <li><a href="">Schools</a>| </li>
                                <li><a href="">Alumni</a>| </li>
                                <li><a href="">Visitors</a>| </li>
                                <li><a href="">Contact</a></li>
                            </ul>
                            <div className="clear"></div>
                            <ul className="removeListStyle">
                                <li><a href="">About Futo</a>| </li>
                                <li><a href="">Admissions</a>| </li>
                                <li><a href="">Schools</a>| </li>
                                <li><a href="">Research Centers</a>| </li>
                                <li><a href="">Resources</a></li>
                            </ul>
                            <div className="clear"></div>
                            <ul className="removeListStyle">
                                <li><a href="">Privacy Statement</a></li>
                            </ul>
                            <div className="clear"></div>
                        </div>
                        <div className="clearh20"></div>
                    </div>
                </div>
            </div >
        </>
    );
};