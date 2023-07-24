import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Home() {
    const slideImages = [
        'images/slide01.jpg',
        'images/slide03.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideshowRef = useRef(null);

    useEffect(() => {
        // Increment the slide index every 5 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
        }, 5000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [slideImages.length]);
    return (
        <>
            <Head>
                <title>Home - Federal University Of Technology, Owerri</title>
                <meta charSet="utf-8" />
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> */}
                <link rel="icon" href="./images/cropped-FUTO-main-logo-32x32.png" sizes="32x32" />
                <link rel="icon" href="./images/cropped-FUTO-main-logo-192x192.png" sizes="192x192" />
                <link rel="apple-touch-icon" href="./images/cropped-FUTO-main-logo-180x180.png" />
                <meta name="msapplication-TileImage" content="./images/cropped-FUTO-main-logo-270x270.png" />
                <link rel="stylesheet" href="/css/animations.css" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/css/fonts.css" />
                <link rel="stylesheet" href="/css/main.css" className="color-switcher-link" />
            </Head>

            <div>
                {/* <!-- wrappers for visual page editor and boxed version of template --> */}
                <div id="canvas">
                    <div id="box_wrapper">

                        {/* <!-- template sections --> */}

                        <section className="page_topline ls ms table_section visible-xs">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 text-center">

                                        <ul className="inline-list menu darklinks">
                                            <li>
                                                <a href="./staff-login" className="small-text theme_button color2 two_lines_button">Result Upload</a>
                                            </li>
                                            <li>
                                                <a href="./tps-login" className="small-text theme_button color2 two_lines_button">Transcript</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <header className="page_header header_white toggler_xs_right">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 display_table">
                                        <div className="header_left_logo display_table_cell">
                                            <a href="./" className="logo top_logo">
                                                <img src="images/logo.png" alt="" />
                                            </a>
                                        </div>

                                        <div className="header_mainmenu display_table_cell text-center">
                                            {/* <!-- main nav start --> */}
                                            <nav className="mainmenu_wrapper">
                                                <ul className="mainmenu nav sf-menu">
                                                    <li className="active">
                                                        <a href="./">Home</a>
                                                    </li>
                                                    <li>
                                                        <a href="">About</a>
                                                    </li>
                                                    {/* <!-- eof pages --> */}

                                                    {/* <!-- courses --> */}
                                                    <li>
                                                        <a href="">Academics</a>
                                                    </li>
                                                    {/* <!-- eof courses --> */}

                                                    <li>
                                                        <a href="">Admission</a>
                                                    </li>
                                                    {/* <!-- eof features --> */}


                                                    {/* <!-- gallery --> */}
                                                    <li>
                                                        <a href="">Administration</a>
                                                    </li>
                                                    {/* <!-- eof Gallery --> */}

                                                    {/* <!-- blog --> */}
                                                    <li>
                                                        <a href="">Units</a>
                                                    </li>
                                                    {/* <!-- eof blog --> */}

                                                    {/* <!-- contacts --> */}
                                                    <li>
                                                        <a href="">Research</a>
                                                    </li>
                                                    {/* <!-- eof contacts --> */}
                                                </ul>
                                            </nav>
                                            {/* <!-- eof main nav --> */}
                                            {/* <!-- header toggler --> */}
                                            <span className="toggle_menu">
                                                <span></span>
                                            </span>
                                        </div>

                                        <div className="header_right_buttons display_table_cell text-right hidden-xs ls">
                                            <ul className="inline-list menu darklinks">
                                                <li>
                                                    <a href="./staff-login" className="small-text medium theme_button color2 two_lines_button">Result Upload</a>
                                                </li>
                                                <li>
                                                    <a href="./tps-login" className="small-text medium theme_button color2 two_lines_button">Transcript</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <section className="intro_section page_mainslider ds">
                            <div className="slide-container">
                                <Fade ref={slideshowRef}>
                                    {slideImages.map((image, index) => (
                                        <div key={index} className={index === currentIndex ? 'each-fade active' : 'each-fade'}>
                                            <img src={image} alt="" />
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-sm-12 text-left">
                                                        <div className="slide_description_wrapper">
                                                            <div className="slide_description">
                                                                {index === 0 && (
                                                                    <>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <h3>
                                                                                <span className="highlight2">Welcome To Federal University Of Technology</span>
                                                                                <br /> <span className="highlight2">OWERRI</span>
                                                                            </h3>
                                                                        </div>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <p>
                                                                                Make education your dream and it will help you to fulfill your
                                                                                dream.<br /> Education takes us to the heights of success.
                                                                            </p>
                                                                        </div>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <a href="#" className="theme_button color2 two_lines_button">
                                                                                About FUTO
                                                                            </a>
                                                                        </div>
                                                                    </>
                                                                )}
                                                                {index === 1 && (
                                                                    <>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <h2>
                                                                                <span className="highlight2">Education</span> is like passport to
                                                                                <br /> the
                                                                                <span className="highlight2">Better Future</span>!
                                                                            </h2>
                                                                        </div>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <p>
                                                                                Make education your dream and it will help you to fulfill your
                                                                                dream.<br /> Education takes us to the heights of success.
                                                                            </p>
                                                                        </div>
                                                                        <div className="intro-layer" data-animation="fadeInUp">
                                                                            <a href="" className="theme_button color2 two_lines_button">
                                                                                About FUTO
                                                                            </a>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            {/* <!-- eof .slide_description --> */}
                                                        </div>
                                                        {/* <!-- eof .slide_description_wrapper --> */}
                                                    </div>
                                                    {/* <!-- eof .col-* --> */}
                                                </div>
                                                {/* <!-- eof .row --> */}
                                            </div>
                                            {/* <!-- eof .container --> */}
                                        </div>
                                    ))}
                                </Fade>
                            </div>
                        </section>

                        {/* <!-- icon-background-teaser --> */}

                        <section
                            className="ls section_padding_top_100 section_padding_bottom_100 columns_margin_bottom_30 columns_padding_25 table_section table_section_md">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="with_pos_button left_button">
                                            <img src="images/about.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h2 className="section_header highlight">
                                            Mission
                                        </h2>
                                        <p className="fontsize_18">
                                            To re-engineer and re-position the Federal University of Technology
                                            to be a truly world className university through recreating,
                                            nurturing and developing uniquely promising students
                                            and exceptional staff in Science, Technology
                                            and enterprise to the benefit of our globalized world.
                                        </p>
                                        <h2 className="section_header highlight">
                                            Vision
                                        </h2>
                                        <p className="fontsize_18">
                                            To operate practical and training geared towards
                                            transforming the nation&apos;s economy from
                                            consumer-oriented to production-oriented,
                                            with a sound technological base.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="ls section_padding_top_100 section_padding_bottom_100">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                    </div>
                                </div>
                            </div>
                        </section>

                        <footer className="page_footer cs section_padding_top_100 section_padding_bottom_65 table_section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 col-sm-6 text-center text-sm-left">
                                        <div className="widget widget_text">
                                            <a href="./" className="logo vertical_logo">
                                                <img src="images/logo-vertical.png" alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center text-sm-left">
                                        <div className="widget widget_text">
                                            <h4 className="widget-title">Calender</h4>
                                            <ul className="elementor-icon-list-items">
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Academic Calender </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Event Calender </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Admission Calender </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text"> Recruitment Calender</span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Revised Undergraduate Academic Calender </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Amended Revised PG Academic Calender </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center text-sm-left">
                                        <div className="widget widget_twitter">
                                            <h4 className="widget-title">Students</h4>
                                            <ul className="elementor-icon-list-items">
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Student Information </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Schedule of Classes </span>
                                                    </a>
                                                </li>
                                                <li className="footer-margin">
                                                    <a href="">
                                                        <span className="elementor-icon-list-text">Student Portal </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="">
                                                        <span className="elementor-icon-list-text"> Admission Brochure</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 text-center text-sm-left">
                                        <div className="widget widget_mailchimp">

                                            <h4 className="widget-title">Subscribe Newsletter</h4>

                                            <form className="signup" action="" method="get">
                                                <p className="fontsize_14">
                                                    Enter Email here to be updated. We promise not to send you spam!
                                                </p>
                                                <div className="form-group">
                                                    <label htmlFor="mailchimp" className="sr-only">Enter your email here</label>
                                                    <i className="flaticon-envelope icon2-"></i>
                                                    <input name="email" type="email" id="mailchimp"
                                                        className="mailchimp_email form-control" placeholder="Email Address" />
                                                    <button type="submit" className="theme_button color1" disabled>Subscribe</button>
                                                </div>

                                                <div className="response"></div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>

                        <section className="cs page_copyright section_padding_15 with_top_border_container">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 text-center">
                                        <p>&copy; Copyright 2023. All Rights Reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    {/* <!-- eof #box_wrapper --> */}
                </div>
                {/* <!-- eof #canvas --> */}
            </div>
        </>
    );
};