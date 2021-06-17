Client-Server
Communication

Cookies
❑ Name — Each cookie is represented by a unique name. This name can be made up of letters,
numbers, and underscores. Unlike JavaScript variables, cookie names are not case-sensitive, so
myCookie and MyCookie are considered to be the same. In reality, however, it’s always best to
treat the cookie names as case-sensitive because some server software may treat them as such.
❑ Value — The string value stored in the cookie. This value must be encoded using
encodeURIComponent() before being stored in order to avoid losing data or corrupting the
cookie. The total number of bytes stored in the name and value combined cannot exceed 4095
bytes, or roughly 4 KB.
❑ Domain — For security purposes, Web sites cannot access cookies created by other domains.
When a cookie is created, the domain is stored as a part of the cookie. It is possible to override
this setting, however, to allow a different Web site to access the cookie, although that is typically
not the case.
❑ Path — Another security feature of cookies, paths restrict access of a cookie to a particular
directory on a Web server. For example, you can specify that the cookie only accessible from
http://www.wrox.com/books so pages at http://www.wrox.com can’t access it even though
the request comes from the same domain.
❑ Expiration — When the cookie should be deleted. By default, all cookies are deleted when the
browser closes; however, it is possible to set another time for the deletion. This value is set as a
date in GMT format (using the toGMTString() method of the Date object) and specifies an
exact time when the cookie should be deleted. Because of this, a cookie can remain on a user’s
machine even after the browser is closed. When you set an expiration time that has already
occurred, the cookie is deleted immediately.
❑ Secure Flag — Atrue/false value indicating whether the cookie can be accessed only from
secure sites (those using SSL and the https protocol). Setting this value to true provides
another layer of protection to ensure the cookie isn’t accessible by other Web sites.



❑ Each domain can only store up to 20 cookies on a user’s machine.
❑ The total size of the cookie cannot exceed 4096 bytes.
❑ The total number of cookies allowed on a user’s machine is 300.



cookie_name=cookie_value; expires=expiration_time; path=domain_path;
domain=domain_name; secure

document.cookie = “name=Nicholas”;
document.cookie = “book=” + encodeURIComponent(“Professional JavaScript”);

function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
var sCookie = sName + “=” + encodeURIComponent(sValue);
if (oExpires) {
sCookie += “; expires=” + oExpires.toGMTString();
}
if (sPath) {
sCookie += “; path=” + sPath;
}
if (sDomain) {
sCookie += “; domain=” + sDomain;
}
if (bSecure) {
sCookie += “; secure”;
}
document.cookie = sCookie;
}



setCookie(“name”, “Nicholas”);
setCookie(“book”, “Professional JavaScript”, new Date(Date.parse(“Jan 1, 2006”)));
setCookie(“message”, “Hello World! “, new Date(Date.parse(“Jan 1, 2006”)),
“/books”, “http://www.wrox.com”, true);

function getCookie(sName) {
var sRE = “(?:; )?” + sName + “=([^;]*);?”;
var oRE = new RegExp(sRE);
if (oRE.test(document.cookie)) {
return decodeURIComponent(RegExp[“$1”]);
} else {
return null;
}
}


var sName = getCookie(“name”);
var sBook = getCookie(“book”);
var sMessage = getCookie(“message”);


function deleteCookie(sName, sPath, sDomain) {
setCookie(sName, “”, new Date(0), sPath, sDomain);
}



<form name=”feedbackForm” method=”post” action=”submitfeedback.php”>
<p>Name: <input type=”text” name=”personName” /><br />
E-mail Address: <input type=”text” name=”personEmail” /><br />
Feedback: <textarea rows=”10” cols=”50” name=”feedbackText”>
</textarea><br />
<input type=”checkbox” name=”rememberMe” value=”yes” /> Remember Me<br />
<input type=”submit” value=”Submit Feedback” />
</form>


<?php
//send e-mail
mail(“you@yourdomain.com”, “User Feedback”, $feedbackText,
“From: feedback@{$_SERVER[‘SERVER_NAME’]}”);
//if flag is set, set cookies
if ($rememberMe == “yes”) {
setcookie(“personName”, $personName, time() + 1000 * 60 * 60 * 24 * 365);
setcookie(“personEmail”, $personEmail, time() + 1000* 60 * 60 * 24 * 365);
}
?>
<!-- thank you message goes here -->



window.onload = function () {
var sName = getCookie(“personName”);
var sEmail = getCookie(“personEmail”);
if (sName && sEmail) {
var oForm = document.forms[“feedbackForm”];
oForm.personName.value = sName;
oForm.personEmail.value = sEmail;
}
};



html>
<head>
<title>Hidden Frame Example</title>
</head>
<frameset rows=”*,0”>
<frame src=”HiddenFrameExampleMain.htm” name=”mainFrame” />
<frame src=”HiddenFrameExampleBlank.htm” name=”hiddenFrame” />
</frameset>
</html>


function getServerInfo() {
parent.frames[“hiddenFrame”].location.href = “HiddenFrameExampleCom.htm”’
}

function handleResponse(sResponseText) {
alert(“The server returned: “ + sResponseText);
}

<html>
<head>
<title>Hidden Frame Example (Response)</title>
<script type=”text/javascript”>
window.onload = function () {
parent.frames[0].handleResponse(
document.forms[“formResponse”].result.value);
};
</script>
</head>
<body>
<form name=”formResponse”>
<textarea name=”result”>This is some data coming from the
server.</textarea>
</form>
</body>
</html>




var oHiddenFrame = null;
function getServerInfo() {
if (oHiddenFrame == null) {
oHiddenFrame = document.createElement(“iframe”);
oHiddenFrame.name = “hiddenFrame”;
oHiddenFrame.id = “hiddenFrame”;
oHiddenFrame.style.height = “0px”;
oHiddenFrame.style.width = “0px”;
oHiddenFrame.style.position = “absolute”;
oHiddenFrame.style.visibility = “hidden”;
document.body.appendChild(oHiddenFrame);
}
setTimeout(function () {
frames[“hiddenFrame”].location.href = “HiddenFrameExampleCom2.htm”;
}, 10);
}

<html>
<head>
<title>Hidden Frame Example (Response)</title>
<script type=”text/javascript”>
window.onload = function () {
parent.handleResponse(document.forms[“formResponse”].result.value);
};
</script>
</head>
<body>
<form name=”formResponse”>
<textarea name=”result”>This is some data coming from the
server.</textarea>
</form>
</body>
</html>



var oRequest = new ActiveXObject(“Microsoft.XMLHTTP”);
function createXMLHTTP() {
var arrSignatures = [“MSXML2.XMLHTTP.5.0”, “MSXML2.XMLHTTP.4.0”,
“MSXML2.XMLHTTP.3.0”, “MSXML2.XMLHTTP”,
“Microsoft.XMLHTTP”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oRequest = new ActiveXObject(arrSignatures[i]);
return oRequest;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
}



oRequest.open(“get”, “example.txt”, false);
oRequest.send(null);


var oRequest = createXMLHTTP();
oRequest.open(“get”, “example.txt”, false);
oRequest.send(null);
alert(“Status is “ + oRequest.status + “ (“ + oRequest.statusText + “)”);
alert(“Response text is: “ + oRequest.responseText);


var oRequest = createXMLHTTP();
oRequest.open(“get”, “example.xml”, false);
oRequest.send(null);
alert(“Status is “ + oRequest.status + “ (“ + oRequest.statusText + “)”);
alert(“Response text is: “ + oRequest.responseText);
alert(“Tag name of document element is: “ +
oRequest.responseXML.documentElement.tagname);


var oRequest = createXMLHTTP();
oRequest.open(“get”, “example.txt”, true);
oRequest.onreadystatechange = function () {
if (oRequest.readyState == 4) {
alert(“Status is “ + oRequest.status + “ (“ + oRequest.statusText + “)”);
alert(“Response text is: “ + oRequest.responseText);
}
}
oRequest.send(null);


var oRequest = createXMLHTTP();
oRequest.open(“get”, “example.txt”, true);
oRequest.onreadystatechange = function () {
if (oRequest.readyState == 3) {
oRequest.abort();
} else if (oRequest.readyState == 4) {
alert(“Status is “ + oRequest.status + “ (“ + oRequest.statusText + “)”);
alert(“Response text is: “ + oRequest.responseText);
}
}
oRequest.send(null);

var sValue = oRequest.getResponseHeader(“Server”);
oRequest.setRequestHeader(“myheader”, “yippee”);
oRequest.setRequestheader(“weather”, “warm”);



if (typeof XMLHttpRequest == “undefined” && window.ActiveXObject) {
function XMLHttpRequest() {
var arrSignatures = [“MSXML2.XMLHTTP.5.0”, “MSXML2.XMLHTTP.4.0”,
“MSXML2.XMLHTTP.3.0”, “MSXML2.XMLHTTP”,
“Microsoft.XMLHTTP”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oRequest = new ActiveXObject(arrSignatures[i]);
return oRequest;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
}
}

var oRequest = new XMLHttpRequest();

oRequest.open(“get”, “http://www.somewhere.com/page.php?name1=value1”, false);

function addURLParam(sURL, sParamName, sParamValue) {
sURL += (sURL.indexOf(“?”) == -1 ? “?” : “&”);
sURL += encodeURIComponent(sParamName) + “=” + encodeURIComponent(sParamValue);
return sURL;
}


var sURL = “http://www.somwhere.com/page.php”;
sURL = addURLParam(sURL, “name”, “Nicholas”);
sURL = addURLParam(sURL, “book”, “Professional JavaScript”);
oRequest.open(“get”, sURL, false);


oRequest.open(“post”, “page.php”, false);
oRequest.send(“name1=value1&name2=value2”);


function addPostParam(sParams, sParamName, sParamValue) {
if (sParams.length > 0) {
sParams += “&”;
}
return sParams + encodeURIComponent(sParamName) + “=”
+ encodeURIComponent(sParamValue);
}



var sParams = “”;
sParams = addPostParam(sParams, “name”, “Nicholas”);
sParams = addPostParam(sParams, “book”, “Professional JavaScript”);
oRequest.open(“post”, “page.php”, false);
oRequest.send(sParams);



var sParams = “”;
sParams = addPostParam(sParams, “name”, “Nicholas”);
sParams = addPostParam(sParams, “book”, “Professional JavaScript”);
oRequest.open(“post”, “page.php”, false);
oRequest.setRequestHeader(“Content-Type”, “application/x-www-form-urlencoded”);
oRequest.send(sParams);


function httpGet(sURL) {
var oURL = new java.net.URL(sURL);
//...
}


function httpGet(sURL) {
var oURL = new java.net.URL(sURL);
var oStream = oURL.openStream();
var oReader = new java.io.BufferedReader(new
java.io.InputStreamReader(oStream));
//...
}


function httpGet(sURL) {
var oURL = new java.net.URL(sURL);
var oStream = oURL.openStream();
var oReader = new java.io.BufferedReader(new
java.io.InputStreamReader(oStream));
var sResponseText = “”;
var sLine = oReader.readLine();
while (sLine != null) {
sResponseText += sLine + “\n”;
sLine = oReader.readLine();
}
//...
}


function httpGet(sURL) {
var oURL = new java.net.URL(sURL);
var oStream = oURL.openStream();
var oReader = new java.io.BufferedReader(new
java.io.InputStreamReader(oStream));
var sResponseText = “”;
var sLine = oReader.readLine();
while (sLine != null) {
sResponseText += sLine + “\n”;
sLine = oReader.readLine();
}
oReader.close();
return sResponseText;
}

