//<![CDATA[
var theForm = document.forms['Form'];
if (!theForm) {
    theForm = document.Form;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>

function xexporter() {
    if (document.getElementById("printOptions").value == "excel") {
        $('#previousApp').tableExport({ type: 'excel', escape: 'false' });
    } else if (document.getElementById("printOptions").value == "pdf") {
        $('#previousApp').tableExport({ type: 'pdf', escape: 'false' });
    } else if (document.getElementById("printOptions").value == "png") {
        $('#previousApp').tableExport({ type: 'png', escape: 'false' });
    } else if (document.getElementById("printOptions").value == "doc") {
        $('#previousApp').tableExport({ type: 'doc', escape: 'false' });
    }
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-32182194-1']);
_gaq.push(['_trackPageview']);

$(function () {
    $('.menu #dnnMenu .topLevel .item a').mouseenter(function () {
        $('.MenuContent').show();
        $('.currentanchor').css('color', '#fff').removeClass('currentanchor');
        $(this).addClass('currentanchor').css('color', 'Yellow');
        $('.MenuContent .content').remove();
    });

    $('.menu').mouseleave(function () {
        $('.MenuContent').hide();
        $('.currentanchor').css('color', '#fff').removeClass('currentanchor');
    });
})

//This code is to force a refresh of browser cache
//in case an old version of dnn.js is loaded
//It should be removed as soon as .js versioning is added
jQuery(document).ready(function () {
    if (navigator.userAgent.indexOf(" Chrome/") == -1) {
        if ((typeof dnnJscriptVersion === 'undefined' || dnnJscriptVersion !== "6.0.0") && typeof dnn !== 'undefined') {
            window.location.reload(true);
        }
    }
});

//<![CDATA[
var theForm = document.forms['Form'];
if (!theForm) {
    theForm = document.Form;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>

//This code is to force a refresh of browser cache
//in case an old version of dnn.js is loaded
//It should be removed as soon as .js versioning is added
jQuery(document).ready(function () {
    if (navigator.userAgent.indexOf(" Chrome/") == -1) {
        if ((typeof dnnJscriptVersion === 'undefined' || dnnJscriptVersion !== "6.0.0") && typeof dnn !== 'undefined') {
            window.location.reload(true);
        }
    }
});

// Retrieve the stored email from session storage
const studentEmail = sessionStorage.getItem('studentEmail');
async function getStudentInfo(studentEmail) {
    var response = await axios({
        method: 'get',
        url: `https://tps-api-852849bdc6c6.herokuapp.com/student-info/${studentEmail}`,
        headers: { 'Content-Type': 'application/json' }
    });
    const studentInfo = response.data.data;

    // Populate the form fields with the student data
    document.getElementById('LastName').value = studentInfo.lname;
    document.getElementById('FirstName').value = studentInfo.fname;
    document.getElementById('MiddleName').value = studentInfo.middleName;
    document.getElementById('RegNumber').value = studentInfo.regNumber;
    document.getElementById('Email').value = studentInfo.emailAddress;
}
getStudentInfo(studentEmail);

function faculty() {
    var programSelect = document.getElementById("program");
    var facultySelect = document.getElementById("school");

    if (programSelect.value === "B.Eng.") {
        facultySelect.disabled = false;
    } else {
        facultySelect.selectedIndex = 0;
        facultySelect.disabled = true;
    }
}

function dept() {
    var facultySelect = document.getElementById("school");
    var departmentSelect = document.getElementById("department");

    if (facultySelect.value === "SEET") {
        departmentSelect.disabled = false;
    } else {
        departmentSelect.selectedIndex = 0;
        departmentSelect.disabled = true;
    }
}

function tpsRequest() {
    var q = document.getElementById("RegNumber").value;
    var r = document.getElementById("school").value;
    r = encodeURIComponent(r);
    var s = document.getElementById("department").value;
    s = encodeURIComponent(s);
    var w = "Institution Phone Number";
    var y = document.getElementById("tpsformat").value;
    var z = document.getElementById("txtCost").value;
    var c = document.getElementById("Email").value;
    var d = document.getElementById("datepicker").value;
    var e = document.getElementById("LastName").value + " " + document.getElementById("FirstName").value + " " + document.getElementById("MiddleName").value;
    var f = document.getElementById("txtcategory").value;
    var xmlhttp;

    if (d == "") {
        alert("Date of graduation is required to process your transcript.\n");
        return;
    }
    if (q == "") {
        alert("Your Registration Number is required to process your transcript.\n");
        return;
    }
    if (r == "") {
        alert("Your School/Facualty is required to process your transcript.\n");
        return;
    }
    if (s == "") {
        alert("Your Department is required to process your transcript.\n");
        return;
    }
    if (w == "") {
        //alert("Destination Institution Phone Number is required to process your transcript.\n");
        //return;
    }
    if (y == "") {
        alert("Method of sending the transcript is required to process your transcript.\n");
        return;
    }
    if (z == "") {
        alert("Invalid Processing Fee was specified.\n");
        return;
    }

    if (document.getElementById("tpsformat").value == "email") {

    } else if (document.getElementById("tpsformat").value == "post") {

    } else if (document.getElementById("tpsformat").value == "both") {

    } else {
        if (y == "") {
            alert("Method of sending the transcript is required to process your transcript.\n");
            return;
        }
    }

    document.getElementById('progress_tbl').style.display = "block";

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById('progress_tbl').style.display = "none";

            var nstr = xmlhttp.responseText;
            var ns = nstr.split("``");
            var nt = "";
            nt = ns[0];
            alert(nt);
            document.getElementById("previousRQST").innerHTML = ns[1];
        }
    }
    xmlhttp.open("POST", "tpsrequest.php?q=" + q + "&r=" + r + "&s=" + s + "&w=" + w + "&y=" + y + "&z=" + z + "&a=" + a + "&c=" + c + "&d=" + d + "&e=" + e + "&f=" + f, true);
    xmlhttp.send();
}