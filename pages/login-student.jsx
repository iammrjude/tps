import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function TpsLogin() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/login-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setMessage(data.message);
            if (data.success) {
                // Store the email in session storage
                sessionStorage.setItem('studentEmail', email);
                
                // Redirect to tps-dashboard page
                router.push('/tps-dashboard');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <>
            <Head id="Head">
                <link href="images/icon.png" rel="shortcut icon" type="image/x-icon" />
                <style id="StylePlaceholder" type="text/css"></style>
                <link id="ADesktopModules_DNNInfo_News_module_css" rel="stylesheet" type="text/css" href="/css/module_002.css" />
                <link id="ADesktopModules_Announcements_module_css" rel="stylesheet" type="text/css" href="/css/module.css" />
                <link id="APortals__default_default_css" rel="stylesheet" type="text/css" href="/css/default.css" />
                <link id="APortals__default_Skins_Futo_skin_css" rel="stylesheet" type="text/css" href="/css/skin.css" />
                <link id="APortals__default_Containers_Futo_container_css" rel="stylesheet" type="text/css" href="./css/container.css" />
                <link href="./css/ComboBox.css" rel="stylesheet" type="text/css" />
                <title>Login - Transcript Processing System</title>
            </Head>

            <div id="Body">
                <div id="Form" encType="multipart/form-data">
                    <link href="images/icon.png" rel="shortcut icon" type="image/x-icon" />

                    <link rel="stylesheet" href="./css/demos.css" />

                    <div id="page" className="" style={{ backgroundColor: "#FFF", color: "#000" }}>
                        <div className="header"
                            style={{ backgroundImage: "url('/images/futoHeaderbg.jpg')", backgroundPosition: "top", backgroundRepeat: "no-repeat" }}>
                            <div id="ControlPanelWrapper">

                            </div>
                            <div className="clear"></div>
                            <div className="">
                                <div className="right">
                                    <div className="left toplinks1">
                                    </div>
                                </div>
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

                    <div id="page" className="Home" style={{ marginTop: "-5px" }}>

                        <div className="clear"></div>

                        <div id="main" style={{ width: "1000px" }}>
                            <div id="dnn_ContentPane">
                                <div className="DnnModule DnnModule-DNN_HTML DnnModule-1593"><a name="1593"></a></div>
                            </div>
                            <div id="dnn_LeftPane">
                                <div className="DnnModule DnnModule-DNNInfo_News_NewsList DnnModule-1526"><a name="1526"></a>

                                    <div className="News" style={{ width: "1020px" }}>
                                        <div id="dnn_ctr1526_ContentPane" className="scroll">
                                            {/* <!-- Start_Module_1526 --> */}
                                            <div id="dnn_ctr1526_ModuleContent" className="DNNModuleContent ModDNNInfoNewsNewsListC">

                                                <div className="DNNInfo_NewsList">

                                                    <div className="DNNInfo_NewsHeader">

                                                    </div>
                                                    <div className="DNNInfo_NewsList">
                                                        <div className="news_detailsbox">
                                                            <div className="news_detailstitle">
                                                                Welcome to FUTO Transcript Processing and Result Verification System
                                                            </div>
                                                            <div>
                                                                <form name="tpsForm" id="tpsForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                                                                    <p style={{ height: "25px", width: "410px", marginLeft: "100px", float: "left", color: "#F00" }}></p>
                                                                    <div title="Account Information"
                                                                        style={{ width: "430px", textAlign: "justify", marginLeft: "100px", marginTop: "0px", float: "left", borderStyle: "groove", borderWidth: "1px", height: "280px" }}>
                                                                        <table style={{ width: "auto", textAlign: "justify", marginLeft: "60px", marginTop: "50px", lineHeight: "5px" }}>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>
                                                                                        <label htmlFor="EmailAddress" title="Your valid email address">EMAIL ADDRESS:</label>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ height: "50px" }}>
                                                                                    <td>
                                                                                        <input name="EmailAddress" placeholder="Your email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "300px" }} required />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        <label htmlFor="Password" title="Your correct password">PASSWORD:</label>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr style={{ height: "50px" }}>
                                                                                    <td>
                                                                                        <input name="Password" placeholder="Your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "300px" }} />
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style={{ textAlign: "right" }}>
                                                                                        <button type="submit" id="cmdlogin" name="cmdlogin" value="Login" className="">Login</button>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan="2">
                                                                                        <div className="left">
                                                                                            <p>
                                                                                                <Link href="/register-student">Register</Link> | <Link href="">Forgot Password?</Link>
                                                                                            </p>
                                                                                            <br />
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <p name='message' style={{ fontSize: "Smaller", fontStyle: "italic", textAlign: "center" }}>{message}</p>
                                                                    </div>
                                                                </form>
                                                            </div>

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
            </div >
        </>
    );
};