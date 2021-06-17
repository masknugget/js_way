<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript”>
var i = 0;
</script>
<script language=”JavaScript” src=”../scripts/external.js”></script>
</head>
<body>
<!-- body goes here -->
</body>
</html>


<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript”>
function sayHi() {
alert(“Hi”);
}
</script>
</head>
<body>
<!-- body goes here -->
</body>
</html>

<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript” src=”external.js”></script>
</head>
<body>
<!-- body goes here -->
</body>
</html>






<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript”>
function sayHi() {
alert(“Hi”);
}
</script>
</head>
<body>
<script language=”JavaScript”>
sayHi();
</script>
<p>This is the first text the user will see.</p>
</body>
</html>



<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript”>
function sayHi() {
alert(“Hi”);
}
</script>
</head>
<body>
<input type=”button” value=”Call Function” onclick=”sayHi()” />
</body>
</html>


<html>
<head>
<title>Title of Page</title>
</head>
<body>
<script language=”JavaScript”>
sayHi();
</script>
<p>This is the first text the user will see.</p>
<script language=”JavaScript”>
function sayHi() {
alert(“Hi”);
}
</script>
</body>
</html>



<script language=”JavaScript”><!-- hide from older browsers
function sayHi() {
alert(“Hi”);
}
//-->
</script>





<html>
<head>
<title>Title of Page</title>
<script language=”JavaScript”>
function sayHi() {
alert(“Hi”);
}
</script>
</head>
<body>
<script language=”JavaScript”>
sayHi();
</script>
<noscript>
<p>Your browser doesn’t support JavaScript. If it did support
JavaScript, you would see this message: Hi!</p>
</noscript>
<p>This is the first text the user will see if JavaScript is enabled. If
JavaScript is disabled this is the second text the user will see.</p>
</body>
</html>



<script type=”text/javascript”>
function compare(a, b) {
if (a < b) {
alert(“A is less than B”);
} else if (a > b) {
alert(“A is greater than B”);
} else {
alert(“A is equal to B”);
}
}
</script>


//move the window right by 10 pixels and down by 20 pixels
window.moveBy(10, 20);
//resize the window to have a width of 150 and a height of 300
window.resizeTo(150, 300);
//resize the window to be 150 pixels wider, but leave the height alone
window.resizeBy(150, 0);
//move back to the upper-left corner of the screen (0,0)
window.moveTo(0, 0);

window.open(“http://www.wrox.com/”, “topFrame”);
window.open(“http://www.wrox.com/”, “wroxwindow”,
“height=150, width= 300, top=10, left= 10, resizable =yes”);

window.open(“http://www.wrox.com/”, “wroxwindow”,
“height=150,width=300,top=10,left=10,resizable=yes”);

var oNewWin = window.open(“http://www.wrox.com/”, “wroxwindow”,
“height=150,width=300,top=10,left=10,resizable=yes”);
oNewWin.moveTo(100, 100);
oNewWin.resizeTo(200, 200);
oNewWin.close()
window.close();

var oNewWin = window.open(“http://www.wrox.com/”, “wroxwindow”,
“height=150,width=300,top=10,left=10,resizable=yes”);
alert(oNewWin.opener == window); //outputs “true”

alert(“Hello world! “);
confirm(“Are you sure? “);

if (confirm(“Are you sure? “)) {
    alert(“I’m so glad you’re sure! “);
} else {
    alert(“I’m sorry to hear you’re not sure. “);
}

prompt(“What’s your name? “, “Michael”);

var sResult = prompt(“What is your name? “, “”);
if (sResult != null) {
alert(“Welcome, “ + sResult);
}

window.defaultStatus = “You are surfing www.wrox.com. “;

<a href=”books.htm” onmouseover=”window.status=’Information on Wrox books.’
“>Books</a>

<a href=”javascript:goSomewhere(1,2,3,4)” onmouseover=”window.status=’Information
on Wrox books.’ “>Books</a>

setTimeout(“alert(‘Hello world!’) “, 1000);
setTimeout(function() { alert(“Hello world!”); }, 1000);

function sayHelloWorld() {
alert(“Hello world!”);
}
setTimout(sayHelloWorld, 1000);

var iTimeoutId = setTimeout(“alert(‘Hello world!’)”, 1000);
//nevermind
clearTimeout(iTimeoutId);

setInterval(“alert(‘Hello world!’) “, 1000);
setInterval(function() { alert(“Hello world!”); }, 1000);
function sayHelloWorld() {
alert(“Hello world!”);
}
setInterval(sayHelloWorld, 1000);

var iNum = 0;
var iMax = 100;
var iIntervalId = null;
function incNum() {
    iNum++;

    if (iNum == iMax) {
        clearInterval(iIntervalId);
    }
}
iIntervalId = setInterval(incNum, 500);



var iNum = 0;
var iMax = 100;
function incNum() {
    iNum++;

    if (iNum != iMax) {
        setTimeout(incNum, 500);
    }
}
setTimeout(incNum, 500);



window.history.go(-1);
history.go(-1);
<a href=”javascript:history.go(-1)”>Back to the previous page</a>
history.go(1);

//go back one
history.back();
//go forward one
history.forward();

alert(“There are currently “ + history.length + “ pages in history.”);

alert(window.document == document);


Property Description
alinkColor The color for active links as defined by <body alink=”color”> *
bgColor The color for the page background as defined by <body
bgcolor=”color”> *
fgColor The color for text as defined by <body text=”color”> *
lastModified The date the page was last modified as a string
linkColor The color for links as defined by <body link=”color”> *
referrer The URL one position back in the browser history
title The text displayed in the <title/> tag
URL The URL of the currently loaded page
vlinkColor The color for visited links as defined by <body vlink=”color”> 


top.document.title = “New page title”;
document.URL = “http://www.wrox.com/”;


Collection Description
anchors Collection of all anchors in the page (represented by <a
name=”anchorname”></a> )
applets Collection of all applets in the page
embeds Collection of all embedded objects in the page (represented by the
<embed/> tag)
forms Collection of all forms in the page
images Collection of all images in the page
links Collection of all links in the page (represented by <a href=
”somewhere.htm”></a>)




<html>
<head>
<title>Document Example</title>
</head>
<body>
<p>Welcome to my <a href=”home.htm”>home</a> away from home.</p>
<img src=”home.jpg” align=”right” name=”imgHome” />
<form method=”post” action=”submit.cgi” name=”frmSubscribe”>
<input type=”text” name=”txtEmail” />
<input type=”submit” value=”Subscribe” />
</form>
</body>
</html>

❑ To access the link, refer to document.links[0] .
❑ To access the image, refer to document.images[0] or document.images[“imgHome”] .
❑ To access the form, refer to document.forms[0] or document.forms[“frmSubscribe”]

<html>
<head>
<title>Document Write Example</title>
</head>
<body>
<h1><script type=”text/javascript”>document.write(“this is a
test”)</script></h1>
</body>
</html>


<html>
<head>
<title>Document Example</title>
<script type=”text/javascript”>
document.write(“<script type=\”text/javascript\” src=\”external.js\”>”
+ “</scr” + “ipt>”);
</script>
</head>
<body>
</body>
</html>

var oNewWin = window.open(“about:blank”, “newwindow”,
“height=150,width=300,top=10,left=10,resizable=yes”);
oNewWin.document.open();
oNewWin.document.write(“<html><head><title>New Window</title></head>”);
oNewWin.document.write(“<body>This is a new window!</body></html>”);
oNewWin.document.close();


The location object

    ❑ hash — If the URL contains a pound sign ( # ), this returns the content after it (for example,
    http://www.somewhere.com/index#section1 has a hash equal to “#section1” ).
    ❑ host — The name of the server (for example, www.wrox.com)
    ❑ hostname — Most often equal to host , this sometimes eliminates the www. from the front.
    ❑ href — The full URL of the currently loaded page
    ❑ pathname — Everything after the host in the URL. For example, the pathname for
    http://www.somewhere.com/pictures/index.htm is “/pictures/index.htm” .
    ❑ port — The port of the request if specified in the URL. By default, most URLs don’t include
    the port as part of the URL so this property is typically blank. If a URL is used such as
    http://www.somewhere.com:8080/index.htm , the port is equal to 8080.
    ❑ protocol — The protocol used in the URL. This is everything before the two forward slashes
    ( // ) in the URL. For example, the protocol for http://www.wrox.com is http: and the
    protocol for ftp://www.wrox.com is ftp: .
    ❑ search — Otherwise known as the query string, this is everything after a question mark ( ? )
    in a URL performing a GET request. For example, the search for http://www.somewhere
    .com/search.htm?term=javascript is ?term=javascript 


location.href = “http://www.wrox.com/”;
location.assign(“http://www.wrox.com”);

<html>
<head>
<title>You won’t be able to get back here</title>
</head>
<body>
<p>Enjoy this page for a second, because you won’t be coming back here.</p>
<script type=”text/javascript”>
setTimeout(function () {
location.replace(“http://www.wrox.com/”);
}, 1000);
</script>
</body>
</html>

location.reload(true);
location.reload(false);
location.reload();

alert(location);
alert(location.href);

The navigator object
appCodeName String representing code name of the browser X X X X
(typically “Mozilla”)
appName String representing official browser name X X X X
appMinorVersion String representing extra version information X – – –
appVersion String representing the browser version X X X X
browserLanguage * String representing the language of the browser X – X –
or operating system
cookieEnabled Boolean indicating if cookies are enabled X X X –
cpuClass String representing the CPU class (“x86” , X – – –
“68K” , “Alpha” , “PPC” , or “Other” )
javaEnabled() Boolean indicating if Java is enabled X X X X
language String representing language of the browser – X X X
mimeTypes Array of mimetypes registered with the browser – X X X


The screen object
❑ availHeight — the height of the screen (in pixels) available for use by windows. This takes
into account the space needed by operating system elements such as the Windows taskbar.
❑ availWidth — the width of the screen (in pixels) available for use by windows
❑ colorDepth — the number of bits used to represent colors. For most systems, this is 32.
❑ height — the height of the screen in pixels
❑ width — the width of the screen in pixels

window.moveTo(0, 0);
window.resizeTo(screen.availWidth, screen.availHeight);

