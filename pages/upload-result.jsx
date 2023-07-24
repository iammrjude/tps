import Head from "next/head";

export default function UploadResult() {
    return (
        <>
            <Head>
                <title>Upload Result - Result Upload Portal</title>
                {/* <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> */}
                <link rel="icon" href="/images/cropped-FUTO-main-logo-32x32.png" sizes="32x32" />
                <link rel="icon" href="/images/cropped-FUTO-main-logo-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="/images/cropped-FUTO-main-logo-180x180.png" />
                <meta name="msapplication-TileImage" content="/images/cropped-FUTO-main-logo-270x270.png" />
                <link href="/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
            </Head>

            <div>
                <div className="container">
                    <h2 className="page-header">
                        Upload Result
                    </h2>
                    <p className="danger">
                        <span id="ctl00_ContentPlaceHolder1_lblError"></span>
                    </p>
                    <table className="table table-stripped">
                        <tbody>
                            <tr>
                                <td>Faculty</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlFaculty" id="ctl00_ContentPlaceHolder1_ddlFaculty"
                                        className="form-control" onChange="updateDepartmentOptions()">
                                        <option value="Select Faculty">Select Faculty</option>
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
                            </tr>
                            <tr>
                                <td>Department</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlDepartment" id="ctl00_ContentPlaceHolder1_ddlDepartment"
                                        className="form-control" onChange="updateSessionOptions()" disabled>
                                        <option value="Select Department">Select Department</option>
                                        <option value="ABE">Agricultural and Bio resources Engineering</option>
                                        <option value="CHE">Chemical Engineering</option>
                                        <option value="CIE">Civil Engineering</option>
                                        <option value="EEE">Electrical and Electronics Engineering</option>
                                        <option value="FST">Food Science and technology</option>
                                        <option value="MME">Material and Matallurgical Engineering</option>
                                        <option value="MEE">Mechanical Engineering</option>
                                        <option value="MCE">Mechatronic Engineering</option>
                                        <option value="PET">Petroleum Engineering</option>
                                        <option value="PTE">Polymer and Textile Engineering</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Session</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlSession" id="ctl00_ContentPlaceHolder1_ddlSession"
                                        className="form-control" onChange="updateClassOptions()" disabled>
                                        <option defaultValue="Select Session">Select Session</option>
                                        <option value="2001-2002">2001-2002</option>
                                        <option value="2002-2003">2002-2003</option>
                                        <option value="2003-2004">2003-2004</option>
                                        <option value="2004-2005">2004-2005</option>
                                        <option value="2005-2006">2005-2006</option>
                                        <option value="2006-2007">2006-2007</option>
                                        <option value="2007-2008">2007-2008</option>
                                        <option value="2008-2009">2008-2009</option>
                                        <option value="2009-2010">2009-2010</option>
                                        <option value="2010-2011">2010-2011</option>
                                        <option value="2011-2012">2011-2012</option>
                                        <option value="2012-2013">2012-2013</option>
                                        <option value="2013-2014">2013-2014</option>
                                        <option value="2014-2015">2014-2015</option>
                                        <option value="2015-2016">2015-2016</option>
                                        <option value="2016-2017">2016-2017</option>
                                        <option value="2017-2018">2017-2018</option>
                                        <option value="2018-2019">2018-2019</option>
                                        <option value="2019-2020">2019-2020</option>
                                        <option value="2020-2021">2020-2021</option>
                                        <option value="2021-2022">2021-2022</option>
                                        <option value="2022-2023">2022-2023</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Class</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlClass" id="ctl00_ContentPlaceHolder1_ddlClass"
                                        className="form-control" onChange="updateSemesterOptions()" disabled>
                                        <option value="Select Class">Select Class</option>
                                        <option value="100Level">100 Level</option>
                                        <option value="200Level">200 Level</option>
                                        <option value="300Level">300 Level</option>
                                        <option value="400Level">400 Level</option>
                                        <option value="500Level">500 Level</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlSemester" id="ctl00_ContentPlaceHolder1_ddlSemester"
                                        className="form-control" onChange="updateCourseOptions()" disabled>
                                        <option value="Select Semester">Select Semester</option>
                                        <option value="1">Harmattan Semester</option>
                                        <option value="2">Rain Semester</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Course</td>
                                <td>
                                    <select name="ctl00$ContentPlaceHolder1$ddlCourse" id="ctl00_ContentPlaceHolder1_ddlCourse"
                                        className="form-control" onChange="handleGetDataArray()" disabled>
                                        <option value="Select Course">Select Course</option>
                                        <option value="GST101">Use of English 1</option>
                                        <option value="GST103">Humanities 1</option>
                                        <option value="MTH101">Elementary Mathematics 1</option>
                                        <option value="PHY101">General Physics 1</option>
                                        <option value="CHM101">General Chemistry 1</option>
                                        <option value="BIO101">Biology for Physical Sciences</option>
                                        <option value="ENG101">Workshop Practice 1</option>
                                        <option value="ENG103">Engineering Drawing 1</option>
                                        <option value="FRN101">Use of French 1</option>
                                        <option value="IGB101">Introduction to Igbo 1</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="table-responsive">
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>MatricNum</th>
                                    <th>FullName</th>
                                    <th>Course</th>
                                    <th>Unit</th>
                                    <th>Grade</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody"></tbody>
                        </table>
                    </div>
                    <br />
                    <button className="btn btn-success" id="uploadButton" onClick="handleUploadResult()" disabled>Upload</button>
                </div>
            </div>
        </>
    );
};