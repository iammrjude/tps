import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterStudent() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState('');
    const [studentId, setStudentId] = useState('');
    const [nationality, setNationality] = useState('');
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [dateOfEntry, setDateOfEntry] = useState('');
    const [modeOfEntry, setModeOfEntry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [option, setOption] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/register-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, middleName, lastName, sex, dob, studentId, nationality, stateOfOrigin, dateOfEntry, modeOfEntry, email, password, faculty, department, option })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setMessage(data.message);
            if (data.success) {
                // Redirect to student login page
                router.push('/login-student');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <>
            <Head>
                <title>Sign Up - Transcript Processing System</title>
                <link rel="shortcut icon" type="image/x-icon" href="images/futologo3.png" />
                <link rel=" stylesheet" media="all" href="/css/app.css" />
            </Head>

            <div id="Body">
                <div className="outer">
                    <div className="outer__inner">
                        <div className="login">
                            <div className="login__col" style={{ backgroundImage: "url('images/about.jpg')" }}>
                                <a className="login__logo" href="../index.html">
                                    <img src="/images/logo.png" alt="Logo" />
                                    <img src="/images/logo.png" alt="Logo" />
                                </a>
                            </div>
                            <div className="login__col">
                                <div className="login__head">Already have an account?<Link className="login__link" href="/login-student">Login</Link></div>
                                <div className="login__wrap">
                                    <div className="registration">
                                        <form id="registrationForm" onSubmit={handleSubmit}>
                                            <div className="registration__form">
                                                <div className="entry__top">
                                                    <h3 className="entry__title h3">Student Registration</h3>
                                                </div>
                                                <div className="registration__fieldset">
                                                    <div className="field">
                                                        <div className="field__label">First Name</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="field__label">Middle Name</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="middleName" id="middleName" placeholder="Enter Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        <div className="field__label">Last Name</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Sex</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="sex" id="sex" placeholder="MALE or FEMALE?" value={sex} onChange={(e) => setSex(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">DOB</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Faculty</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="faculty" id="faculty" placeholder="School of Engineering and Engineering Technology" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Department</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="department" id="department" placeholder="Electrical and Electronic Engineering" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Option</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="option" id="option" placeholder="COE, PSE" value={option} onChange={(e) => setOption(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Matriculation Number</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="studentId" id="studentId" placeholder="20171045385" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Nationality</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="nationality" id="nationality" placeholder="Nigerian" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">State of Origin</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="stateOfOrigin" id="stateOfOrigin" placeholder="Imo State" value={stateOfOrigin} onChange={(e) => setStateOfOrigin(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Date of Entry</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="dateOfEntry" id="dateOfEntry" placeholder="2017/2018" value={dateOfEntry} onChange={(e) => setDateOfEntry(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Mode of Entry</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="text" name="modeOfEntry" id="modeOfEntry" placeholder="UME" value={modeOfEntry} onChange={(e) => setModeOfEntry(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">Email</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="email" name="email" id="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="field field_view">
                                                        <div className="field__label">password</div>
                                                        <div className="field__wrap">
                                                            <input className="field__input" type="password" name="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <label className="checkbox">
                                                        <input className="checkbox__input" type="checkbox" required />
                                                        <span className="checkbox__inner">
                                                            <span className="checkbox__tick"></span>
                                                            <span className="checkbox__text">By signing up I agree to the <a className="checkbox__link" href="">Terms & Conditions</a></span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <button className="button registration__button" type="submit" style={{
                                                    background: "rgb(234, 163, 163)",
                                                    background: "linear-gradient(90deg, rgb(234, 163, 163) 0%, rgb(224, 77, 77) 35%, rgb(233, 19, 19) 100%)",
                                                    fontWeight: "800", fontSize: "19px"
                                                }}>Sign up</button>
                                            </div>
                                        </form>
                                        <p id="message">{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}