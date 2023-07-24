import Head from "next/head";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function TpsDashboard() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [email, setEmail] = useState('');
    const [programSelectedValue, setProgramSelectedValue] = useState('');
    const [facultySelectedValue, setFacultySelectedValue] = useState('');
    const [departmentSelectedValue, setDepartmentSelectedValue] = useState('');
    const [isFacultyDisabled, setIsFacultyDisabled] = useState(true);
    const [isDepartmentDisabled, setIsDepartmentDisabled] = useState(true);

    async function getStudentInfo(studentEmail) {
        const response = await fetch(`/api/student-info?email=${studentEmail}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const studentInfo = await response.json();

        // Populate the form fields with the student data
        setFirstName(studentInfo.data.fname);
        setMiddleName(studentInfo.data.middleName);
        setLastName(studentInfo.data.lname);
        setRegNumber(studentInfo.data.regNumber);
        setEmail(studentInfo.data.email);
    }

    useEffect(() => {
        // Retrieve the stored email from session storage
        const studentEmail = sessionStorage.getItem('studentEmail');
        if (studentEmail) {
            getStudentInfo(studentEmail)
        } else {
            // Redirect to tps-login page
            router.push('/tps-login');
        }
    }, []);

    useEffect(() => {
        if (programSelectedValue === "B.Eng.") {
            setIsFacultyDisabled(false);
        } else {
            setProgramSelectedValue('');
            setIsFacultyDisabled(true);
        }
        if (facultySelectedValue === "SEET") {
            setIsDepartmentDisabled(false);
        } else {
            setFacultySelectedValue('');
            setIsDepartmentDisabled(true);
        }
    }, [programSelectedValue, facultySelectedValue]);

    return (
        <>
            <Head id="Head">
                <link href="images/futologo3.png" rel="shortcut icon" type="image/x-icon" />
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
                    <link href="images/futologo3.png" rel="shortcut icon" type="image/x-icon" />

                    <link rel="stylesheet" href="/css/demos.css" />

                    <div id="page" className="" style={{ backgroundColor: "#FFF", color: "#000" }}>
                        <div className="header" style={{ backgroundImage: "url('images/futoHeaderbg.jpg')", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}>
                            <div id="ControlPanelWrapper"></div>
                            <div className="clear"></div>
                            <div className="">
                                <div className="clear"></div>
                                <div id="LogoCont" className="left" style={{ backgroundImage: "url('images/futologo3.png')" }}></div>
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
                                    {/* <div className="contactContent ui-corner-bl ui-corner-br" "=""> */}
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
                                                                                <label htmlFor='RegNumber' title='Your Registration Number'>REG. NUMBER:</label>
                                                                            </td>
                                                                            <td>
                                                                                <input readOnly autoComplete='off' id='RegNumber' name='RegNumber' type='text' value={regNumber} style={{ width: "200px", resize: 'none', }} />
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
                                                                                    <option id='prog_1' value=''></option>
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
                                                                                <label htmlFor="school" title="Your School/Faculty">SCHOOL:</label>
                                                                            </td>
                                                                            <td>
                                                                                <select data-val="true" data-val-required="*" id="school" name="school" value={facultySelectedValue} onChange={(e) => setFacultySelectedValue(e.target.value)} style={{ width: "200px" }} disabled={isFacultyDisabled}>
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

                                                                        <tr style={{ height: "10px" }}>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <button style={{ float: "left", marginLeft: "20px" }}>Request Transcript</button>
                                                                <br />
                                                                <br />
                                                                <div style={{ marginBottom: "20px" }}></div>

                                                                <div id="tps_info"
                                                                    style={{ minHeight: "25px", height: "auto", width: "960px", textAlign: "center", marginLeft: "20px", color: "#F00" }}>
                                                                    <p style={{ textAlign: "center", marginLeft: "0px", color: "#F00" }}>Please
                                                                        note that upon successful payment, destination information
                                                                        ceases to be editable. A payment once completed, cannot be
                                                                        reversed. </p>
                                                                    <p style={{ textAlign: "center", marginLeft: "0px", color: "#F00" }}>To
                                                                        confirm
                                                                        your payment and print or re-print your receipt, click the
                                                                        <span style={{ fontStyle: "italic" }}>Payment Status</span> button
                                                                        above. </p>
                                                                </div>
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

                                                                <fieldset id="previousApp"
                                                                    style={{ height: "310px", width: "960px", marginLeft: "20px", overflow: "auto" }}>
                                                                    <legend>PREVIOUS APPLICATIONS</legend>
                                                                    <div style={{ display: "none" }}>
                                                                        <input readOnly id="txtcategory" name="txtcategory" type="text" value="transcript" />
                                                                    </div>
                                                                    <div id="previousRQST" style={{ color: "#000" }}>

                                                                        <table width='104%' style={{ borderWidth: "1px" }}>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width='10%'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        REQUEST ID</td>
                                                                                    <td width='40%'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold" }}>
                                                                                        RECEIVING
                                                                                        INSTITUTION</td>
                                                                                    <td width='7%'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        SEND BY</td>
                                                                                    <td width='7%'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        COST</td>
                                                                                    <td width='7%'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                        STATUS</td>
                                                                                    <td width='auto'
                                                                                        style={{ borderWidth: "1px", fontWeight: "bold", textAlign: "center" }}>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td>&nbsp;</td>
                                                                                    <td style={{ borderWidth: "1px" }}>&nbsp;</td>
                                                                                </tr>
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