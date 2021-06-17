# Error Handling

var iLoc = findItem(colorarray, “blue”);
if (iLoc == -1) {
alert(“The item doesn’t exist. “);
} else {
alert(“The item is in location “ + iLoc + “.”);
}


document.write(“test”;

window.openMySpecialWindow();


<html>
<head>
<title>Exception Test</title>
<script type=”text/javascript”>
function handleLoad() {
window.openMySpecialWindow();
alert(“Loaded”);
}
function handleClick() {
alert(“Clicked”);
}
</script>
</head>
<body onload=”handleLoad()”>
<input type=”button” value=”Click Me” onclick=”handleClick()” />
</body>
</html>




<html>
<head>
<title>OnError Example</title>
<script type=”text/javascript”>
window.onerror = function () {
alert(“An error occurred. “);
}
</script>
</head>
<body onload=”nonExistentFunction()”>
</body>
</html>




<html>
<head>
<title>OnError Example</title>
<script type=”text/javascript”>
window.onerror = function () {
alert(“An error occurred. “);
return true;
}
</script>
</head>
<body onload=”nonExistentFunction()”>
</body>
</html>



❑ Error message — The same message that the browser would display for the given error
❑ URL — The file in which the error occurred
❑ Line number — The line number in the given URL that caused the error



<html>
<head>
<title>OnError Example</title>
<script type=”text/javascript”>
window.onerror = function (sMessage, sUrl, sLine) {
alert(“An error occurred:\n” + sMessage + “\nURL: “ + sUrl +
“\nLine Number: “ + sLine);
return true;
}
</script>
</head>
<body onload=”nonExistentFunction()”>
</body>
</html>




<html>
<head>
<title>Image Error Test</title>
</head>
<body>
<p>The image below attempts to load a file that doesn’t exist.</p>
<img src=”blue.gif”
onerror=”alert(‘An error occurred loading the image.’)” />
</body>
</html>



<html>
<head>
<title>Image Error Test</title>
<script type=”text/javascript”>
function handleLoad() {
document.images[0].onerror = function () {
alert(“An error occurred loading the image.”);
};
document.images[0].src = “blue.gif”;
}
</script>
</head>
<body onload=”handleLoad()”>
<p>The image below attempts to load a file that doesn’t exist.</p>
<img />
</body>
</html>



<html>
<head>
<title>OnError Example</title>
<script type=”text/javascript”>
alert(“Syntax error. “;
window.onerror = function (sMessage, sUrl, sLine) {
alert(“An error occurred:\n” + sMessage + “\nURL: “ + sUrl +
“\nLine Number: “ + sLine);
return true;
}
</script>
</head>
<body onload=”nonExistentFunction()”>
</body>
</html>





<html>
<head>
<title>OnError Example</title>
<script type=”text/javascript”>
window.onerror = function (sMessage, sUrl, sLine) {
alert(“An error occurred:\n” + sMessage + “\nURL: “ + sUrl +
“\nLine Number: “ + sLine);
return true;
}
alert(“Syntax error. “;
</script>
</head>
<body onload=”nonExistentFunction()”>
</body>
</html>



try {
//code to run
[break;]
} catch ([exception]) {
//code to run if an exception occurs and the expression is matched
[break;]
} [finally {
//code that is always executed regardless of an exception occurring
}]


try {
window.nonExistentFunction();
alert(“Method completed. “);
} catch (exception) {
alert(“An exception occurred.”);
} finally {
alert(“End of try...catch test.”);
}

connection.open();
try {
connection.send(data);
} catch (exception) {
alert(“An exception occurred.”);
} finally {
connection.close();
}



try {
eval(“a ++ b”); //causes error
} catch (oException) {
alert(“An exception occurred. “);
try {
var aErrors = new Array(10000000000000000000000); //causes error
aErrors.push(exception);
} catch (oException2) {
alert(“Another exception occurred.”);
}
} finally {
alert(“All done.”);
}



❑ name — Astring indicating the type of error
❑ message — The actual error message

eval(“a ++ b”);

try {
window.nonExistentFunction();
alert(“Method completed.”);
} catch (oException) {
alert(“An exception occurred: “ + oException.message);
} finally {
alert(“End of try...catch test.”);
}




try {
eval(“a ++ b”); //causes SyntaxError
} catch (oException) {
if (oException.name == “SyntaxError”) {
alert(“Syntax Error: “ + oException.message);
} else {
alert(“An unexpected error occurred: “ + oException.message);
}
}


try {
eval(“a ++ b”); //causes SyntaxError
} catch (oException) {
if (oException instanceof SyntaxError) {
alert(“Syntax Error: “ + oException.message);
} else {
alert(“An unexpected error occurred: “ + oException.message);
}
}


throw error_object;

throw “An error occurred.”;
throw 50067;
throw true;
throw new Object();


throw new SyntaxError(“I don’t like your syntax.”);
throw new TypeError(“What type of variable do you take me for?”);
throw new RangeError(“Sorry, you just don’t have the range.”);
throw new EvalError(“That doesn’t evaluate.”);

throw new URIError(“Uri, is that you?”);
throw new ReferenceError(“You didn’t cite your references properly.”);




function addTwoNumbers(a, b) {
if (arguments.length < 2) {
throw new Error(“Two numbers are required.”);
} else {
return a + b;
}
}



function addTwoNumbers(a, b) {
if (arguments.length < 2) {
throw new Error(“Two numbers are required.”);
} else {
return a + b;
}
}
try {
result = addTwoNumbers(90);
} catch (oException) {
alert(oException.message); //outputs “Two numbers are required.”
}



function addTwoNumbers(a, b) {
if (arguments.length < 2) {
throw new Error(“Two numbers are required.”);
} else {
return a + b;
}
}
try {
result = addTwoNumbers(90, parseInt(“z”));
} catch (oException) {
if (oException instanceof SyntaxError) {
alert(“Syntax Error: “ + oException.message);
} else if (oException instanceof Error) {
alert(oException.message);
}
}



function test_function() {
alert(“Entering function.”);
var iNumber1 = 5;
var iNumber2 = 10;
alert(“Before calculation.”);
var iResult = iNumber1 + iNumber2;
alert(“After calculation.”);
alert(“Leaving function.”);
}


System.out.println(“Message”);

function test_function() {
java.lang.System.out.println(“Entering function.”);
var iNumber1 = 5;
var iNumber2 = 10;
java.lang.System.out.println(“Before calculation.”);
var iResult = iNumber1 + iNumber2;
java.lang.System.out.println(“After calculation.”);
java.lang.System.out.println(“Leaving function.”);
}




function divide(iNum1, iNum2) {
if (arguments.length != 2) {
throw new Error(“divide() requires two arguments.”);
} else if (typeof iNum1 != “number” || typeof iNum2 != “number”) {
throw new Error(“divide() requires two numbers for arguments.”);
}
return iNum1.valueOf() / iNum2.valueOf();
}



function assert(bCondition, sErrorMessage) {
if (!bCondition) {
throw new Error(sErrorMessage);
}
}



function divide(iNum1, iNum2) {
assert(arguments.length == 2, “divide() requires two arguments.”);
assert(typeof iNum1 == “number” && typeof iNum2 == “number”,
“divide() requires two numbers for arguments.”);
return iNum1.valueOf() / iNum2.valueOf();
}


window.location.href;
