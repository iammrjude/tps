import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function StaffLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/login-staff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setMessage(data.message);
            if (data.success) {
                // Redirect to results upload page
                router.push('/upload-result');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <>
            <Head>
                <title>Login - Result Upload Portal</title>
                {/* <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> */}
                <link rel="icon" href="./images/cropped-FUTO-main-logo-32x32.png" sizes="32x32" />
                <link rel="icon" href="./images/cropped-FUTO-main-logo-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="./images/cropped-FUTO-main-logo-180x180.png" />
                <link rel="stylesheet" href="/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="/css/reset.css"></link>
                <link rel="stylesheet" href="/css/style.css"></link>
            </Head>

            <div>
                <div style={{ width: "100%", height: "auto", background: "#114111" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1">
                                <img src="img/logo.png" alt="" />
                            </div>
                            <div className="col-md-11">
                                <nav className="navbar navbar-default">
                                    <div className="">
                                        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                                <span className="sr-only">Toggle navigation</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                        </div>

                                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                            <ul className="nav navbar-nav navbar-right">
                                                <li><a href="./">Home</a></li>
                                                <li><a href="">Certificate Verification</a></li>
                                                <li><a href="">Bursary</a></li>
                                                <li><a href="">Prospective Students</a></li>

                                                <li className="dropdown">
                                                    <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                                        aria-haspopup="true" aria-expanded="false">Postgraduate <span
                                                            className="caret"></span></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="">Check Admission Status</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="">PG Account Verification</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="">PG Progress Form</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="">2022/2023 Postgraduate Application</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="">Print School Fees Receipt</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="">Registration Procedure for Fresh Postgraduate Students</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><a href="">Help/Support</a></li>
                                            </ul>
                                        </div>
                                        {/* <!-- /.navbar-collapse --> */}
                                    </div>
                                    {/* <!-- /.container-fluid --> */}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-wrap">
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="img-circle"
                            style={{ background: "#114111", width: "70px", margin: "auto", marginBottom: "10px", padding: "10px" }}>
                            <span style={{ fontSize: "3em", color: "#FDF34A" }} className="glyphicon glyphicon-education"></span>
                        </div>

                        <div className="login-form">
                            <h5>Staff Login</h5>
                            <input name="loginEmail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input name="loginPassword" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                            <input type="submit" name="btnLogin" value="Login" id="btnLogin" style={{ color: "#FDF34A", backgroundColor: "#114111" }} />

                            <p className="message text-left text-bold">
                                <b><a href="">Forgot Password</a></b>
                                <br /><span className="text-muted">First time here? </span><a href="/register-staff">Register</a>
                            </p>
                            <p>
                                <br />
                                <span id="Label208" style={{ fontSize: "Smaller", fontStyle: "italic" }}></span>
                            </p>
                            <p name='message' style={{ fontSize: "Smaller", fontStyle: "italic" }}>{message}</p>
                        </div>
                    </div>
                </form >
            </div>
        </>
    );
};
