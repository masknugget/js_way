// client-side

// Set the location property to navigate to a new web page
window.location = "http://www.oreilly.com/";

// Wait 2 seconds and then say hello
setTimeout(function() { alert("hello world"); }, 2000);

// Find the element with id="timestamp"
var timestamp = document.getElementById("timestamp");


// If the element is empty, then insert the current date and time into it
if (timestamp.firstChild == null)
timestamp.appendChild(document.createTextNode(new Date().toString()));


// Explicitly alter the presentation of the heading element
timestamp.style.backgroundColor = "yellow";
// Or just change the class and let the stylesheet specify the details:
timestamp.className = "highlight";

// Update the content of the timestamp element when the user clicks on it
timestamp.onclick = function() { this.innerHTML = new Date().toString(); }




<!DOCTYPE html>
<html>
<head>
<style>
/* CSS styles for this page */
.reveal * { display: none; } /* Children of class="reveal" are not shown */
.reveal *.handle { display: block;} /* Except for the class="handle" child */
</style>
<script>
// Don't do anything until the entire document has loaded
window.onload = function() {
// Find all container elements with class "reveal"
var elements = document.getElementsByClassName("reveal");
for(var i = 0; i < elements.length; i++) { // For each one...
var elt = elements[i];
// Find the "handle" element with the container
var title = elt.getElementsByClassName("handle")[0];
// When that element is clicked, reveal the rest of the content
title.onclick = function() {
if (elt.className == "reveal") elt.className = "revealed";
else if (elt.className == "revealed") elt.className = "reveal";
}
}
};
</script>
</head>
<body>
<div class="reveal">
<h1 class="handle">Click Here to Reveal Hidden Text</h1>
<p>This paragraph is hidden. It appears when you click on the title.</p>
</div>
</body>
</html>



<script>
// Your JavaScript code goes here
</script>



<!DOCTYPE html> <!-- This is an HTML5 file -->
<html> <!-- The root element -->
<head> <!-- Title, scripts & styles go here -->
<title>Digital Clock</title>
<script> // A script of js code
// Define a function to display the current time
function displayTime() {
var elt = document.getElementById("clock"); // Find element with id="clock"
var now = new Date(); // Get current time
elt.innerHTML = now.toLocaleTimeString(); // Make elt display it
setTimeout(displayTime, 1000); // Run again in 1 second
}
window.onload = displayTime; // Start displaying the time when document loads.
</script>
<style> /* A CSS stylesheet for the clock */
#clock { /* Style apply to element with id="clock" */
font: bold 24pt sans; /* Use a big bold font */
background: #ddf; /* On a light bluish-gray background */
padding: 10px; /* Surround it with some space */
border: solid black 2px; /* And a solid black border */
border-radius: 10px; /* Round the corners (where supported) */
}
</style>
</head>
<body> <!-- The body is the displayed parts of the doc. -->
<h1>Digital Clock</h1> <!-- Display a title -->
<span id="clock"></span> <!-- The time gets inserted here -->
</body>
</html>

<script src="../../scripts/util.js"></script>


<script type="text/vbscript">
' VBScript code goes here
</script>


<script language="javascript">
// JavaScript code here...
</script>

<input type="checkbox" name="options" value="giftwrap"
onchange="order.options.giftwrap = this.checked;">


<a href="javascript:new Date().toLocaleTimeString();">
What time is it?
</a>


<a href="javascript:alert(new Date().toLocaleTimeString());">
Check the time without overwriting the document
</a>

<a href="javascript:void window.open('about:blank');">Open Window</a>


<a href='javascript:
var e = "", r = ""; /* Expression to evaluate and the result */
do {
/* Display expression and result and ask for a new expression */
e = prompt("Expression: " + e + "\n" + r + "\n", e);
try { r = "Result: " + eval(e); } /* Try to evaluate the expression */
catch(ex) { r = ex; } /* Or remember the error instead */
} while(e); /* Continue until no expression entered or Cancel clicked */
void 0; /* This prevents the current document from being overwritten */
'>
JavaScript Evaluator
</a>

<h1>Table of Factorials</h1>
<script>
function factorial(n) { // A function to compute factorials
if (n <= 1) return n;
else return n*factorial(n-1);
}
document.write("<table>"); // Begin an HTML table
document.write("<tr><th>n</th><th>n!</th></tr>"); // Output table header
for(var i = 1; i <= 10; i++) { // Output 10 rows
document.write("<tr><td>" + i + "</td><td>" + factorial(i) + "</td></tr>");
}
document.write("</table>"); // End the table
document.write("Generated at " + new Date()); // Output a timestamp
</script>


<script defer src="deferred.js"></script>
<script async src="async.js"></script>

// Asynchronously load and execute a script from a specified URL
function loadasync(url) {
var head = document.getElementsByTagName("head")[0]; // Find document <head>
var s = document.createElement("script"); // Create a <script> element
s.src = url; // Set its src attribute
head.appendChild(s); // Insert the <script> into head
}


window.onload = function() { ... };
document.getElementById("button1").onclick = function() { ... };
function handleResponse() { ... }
request.onreadystatechange = handleResponse;

window.addEventListener("load", function() {...}, false);
request.addEventListener("readystatechange", function() {...}, false);
window.attachEvent("onload", function() {...});


// Register the function f to run when the document finishes loading.
// If the document has already loaded, run it asynchronously ASAP.
function onLoad(f) {
if (onLoad.loaded) // If document is already loaded
window.setTimeout(f, 0); // Queue f to be run as soon as possible
else if (window.addEventListener) // Standard event registration method
window.addEventListener("load", f, false);
else if (window.attachEvent) // IE8 and earlier use this instead
window.attachEvent("onload", f);
}
// Start by setting a flag that indicates that the document is not loaded yet.
onLoad.loaded = false;
// And register a function to set the flag when the document does load.
onLoad(function() { onLoad.loaded = true; });



if (element.addEventListener) { // Test for this W3C method before using it
element.addEventListener("keydown", handler, false);
element.addEventListener("keypress", handler, false);
}
else if (element.attachEvent) { // Test for this IE method before using it
element.attachEvent("onkeydown", handler);
element.attachEvent("onkeypress", handler);
}
else { // Otherwise, fall back on a universally supported technique
element.onkeydown = element.onkeypress = handler;
}



<script>
var name = decodeURIComponent(window.location.search.substring(1)) || "";
document.write("Hello " + name);
</script>

name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");


/*
* Schedule an invocation or invocations of f() in the future.
* Wait start milliseconds, then call f() every interval milliseconds,
* stopping after a total of start+end milliseconds.
* If interval is specified but end is omitted, then never stop invoking f.
* If interval and end are omitted, then just invoke f once after start ms.
* If only f is specified, behave as if start was 0.
* Note that the call to invoke() does not block: it returns right away.
*/
function invoke(f, start, interval, end) {
if (!start) start = 0; // Default to 0 ms
if (arguments.length <= 2) // Single-invocation case
setTimeout(f, start); // Single invocation after start ms.
else { // Multiple invocation case
setTimeout(repeat, start); // Repetitions begin in start ms
function repeat() { // Invoked by the timeout above
var h = setInterval(f, interval); // Invoke f every interval ms.
// And stop invoking after end ms, if end is defined
if (end) setTimeout(function() { clearInterval(h); }, end);
}
}
}



/*
* This function parses ampersand-separated name=value argument pairs from
* the query string of the URL. It stores the name=value pairs in
* properties of an object and returns that object. Use it like this:
*
* var args = urlArgs(); // Parse args from URL
* var q = args.q || ""; // Use argument, if defined, or a default value
* var n = args.n ? parseInt(args.n) : 10;
*/
function urlArgs() {
var args = {}; // Start with an empty object
var query = location.search.substring(1); // Get query string, minus '?'
var pairs = query.split("&"); // Split at ampersands
for(var i = 0; i < pairs.length; i++) { // For each fragment
var pos = pairs[i].indexOf('='); // Look for "name=value"
if (pos == -1) continue; // If not found, skip it
var name = pairs[i].substring(0,pos); // Extract the name
var value = pairs[i].substring(pos+1); // Extract the value
value = decodeURIComponent(value); // Decode the value
args[name] = value; // Store as a property
}
return args; // Return the parsed arguments
}

// If the browser does not support the XMLHttpRequest object
// redirect to a static page that does not require it.
if (!XMLHttpRequest) location.replace("staticpage.html");


// Define browser.name and browser.version for client sniffing, using code
// derived from jQuery 1.4.1. Both the name and number are strings, and both
// may differ from the public browser name and version. Detected names are:
//
// "webkit": Safari or Chrome; version is WebKit build number
// "opera": the Opera browser; version is the public version number
// "mozilla": Firefox or other gecko-based browsers; version is Gecko version
// "msie": IE; version is public version number
//
// Firefox 3.6, for example, returns: { name: "mozilla", version: "1.9.2" }.
var browser = (function() {
var s = navigator.userAgent.toLowerCase();
var match = /(webkit)[ \/]([\w.]+)/.exec(s) ||
/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) ||
/(msie) ([\w.]+)/.exec(s) ||
!/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
[];

return { name: match[1] || "", version: match[2] || "0" };
}());

do {
var name = prompt("What is your name?"); // Get a string
var correct = confirm("You entered '" + name + "'.\n" + // Get a boolean
} while(!correct)
alert("Hello, " + name); // Display a plain message



<!--
This is not a stand-alone HTML file. It must be invoked by showModalDialog().
It expects window.dialogArguments to be an array of strings.
The first element of the array is displayed at the top of the dialog.
Each remaining element is a label for a single-line text input field.
Returns an array of input field values when the user clicks Okay.
Use this file with code like this:
var p = showModalDialog("multiprompt.html",
["Enter 3D point coordinates", "x", "y", "z"],
"dialogwidth:400; dialogheight:300; resizable:yes");
-->
<form>
<fieldset id="fields"></fieldset> <!-- Dialog body filled in by script below -->
<div style="text-align:center"> <!-- Buttons to dismiss the dialog -->
<button onclick="okay()">Okay</button> <!-- Set return value and close -->
<button onclick="cancel()">Cancel</button> <!-- Close with no return value -->
</div>
<script>
// Create the HTML for the dialog body and display it in the fieldset
var args = dialogArguments;
var text = "<legend>" + args[0] + "</legend>";
for(var i = 1; i < args.length; i++)
text += "<label>" + args[i] + ": <input id='f" + i + "'></label><br>";
document.getElementById("fields").innerHTML = text;
// Close the dialog without setting a return value
function cancel() { window.close(); }
// Read the input field values and set a return value, then close
function okay() {
window.returnValue = []; // Return an array
for(var i = 1; i < args.length; i++) // Set elements from input fields
window.returnValue[i-1] = document.getElementById("f" + i).value;
window.close(); // Close the dialog. This makes showModalDialog() return.
}
</script>
</form>



// Display error messages in a dialog box, but never more than 3
window.onerror = function(msg, url, line) {
if (onerror.num++ < onerror.max) {
alert("ERROR: " + msg + "\n" + url + ":" + line);
return true;
}
}
onerror.max = 3;
onerror.num = 0;

var ui = ["input","prompt","heading"]; // An array of element ids
ui.forEach(function(id) { // For each id look up the element
ui[id] = document.getElementById(id); // and store it in a property
});


var $ = function(id) { return document.getElementById(id); };
ui.prompt = $("prompt");


var w = window.open("smallwin.html", "smallwin",
"width=400,height=350,status=yes,resizable=yes");
var w = window.open(); // Open a new, blank window.
w.alert("About to visit http://example.com"); // Call its alert() method
w.location = "http://example.com"; // Set its location property



w.opener !== null; // True for any window w created by open()
w.open().opener === w; // True for any window w
var iframeElement = document.getElementById("f1");
var childFrame = document.getElementById("f1").contentWindow;

var elt = document.getElementById("f1");
var win = elt.contentWindow;
win.frameElement === elt // Always true for frames
window.frameElement === null // For toplevel windows

var i = 3;
var s = new Set();
var Set = top.Set();
var s = new Set();
