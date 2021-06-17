Deployment Issues

alert(frames[1].location.href);
alert(frames[1].document.location.href); //fails

var oWindow = window.open(“page.htm”, “mywindow”);
if (oWindow == null) {
alert(“Your popup blocker won’t allow you access to this window.”);
} else {
//continue on
}


netscape.security.PrivilegeManager.enablePrivilege(“UniversalBrowserRead”);

netscape.security.PrivilegeManager.enablePrivilege(“UniversalBrowserRead”);
for (var i=0; i < history.length; i++){
alert(history[i]);
}


netscape.security.PrivilegeManager.enablePrivilege(“UniversalBrowserRead”);
for (var i=0; i < history.length; i++){
alert(history[i]);
}


var sLang = navigator.language; //won’t work in IE

var sLang = navigator.language || navigator.browserLanguage;

if (sLang.toLowerCase() == “fr”) {
document.location.replace(“index_fr.htm”);
}


alert(“The date you entered is incorrect.”);
var sIncorrectDateMessage = “The date you entered is incorrect.”;
//more code here
alert(sIncorrectDateMessage);



$supported = array(“en”,”de”,”fr”);
if (in_array($lang, $supported)) {
$filename = “Strings_$lang.js”;
} else {
$filename = “Strings_en.js”;
}
<script type=”text/javascript”
src=”scripts/<?php echo $filename ?>”></script>

alert(“\u0048\u0045\u004C\u004C\u004F \u0057\u004F\u0052\u004C\u0044”);



<% String sJspHello = “Hello”; %>
<!-- more code here -->
<script type=”text/javascript”>
var sJavaScriptHello = “<%= sJspHello %>”;

alert(sJavaScriptHello);
</script>



<script type=”text/javascript”>
var sJavaScriptHello = “Hello”;
alert(sJavaScriptHello);
</script>



<!-- more code here -->
<script type=”text/javascript”>
var sJavaScriptHeSaidHi = “<%= sJspHeSaidHi %>”;
alert(sJavaScriptHeSaidHi);
</script>



<script type=”text/javascript”>
var sJavaScriptHeSaidHi = “He said, “hi.””;
alert(sJavaScriptHeSaidHi);
</script>


<% String sJspHeSaidHi = “He said, \”hi.\””; %>
<!-- more code here -->
<script type=”text/javascript”>
var sJavaScriptHeSaidHi = “<%= sJspHeSaidHi.replaceAll(“\\\””, “\\\””) %>”;
alert(sJavaScriptHeSaidHi);
</script>


sHello = “Hello”;
sHello = ‘Hello’;



function doSomething ( arg1, arg2, arg3 ) { alert(arg1 + arg2 + arg3); }
function doSomething(arg1,arg2,arg3){alert(arg1+arg2+arg3);}



var bFound = false;
for (var i=0; i < aTest.length && !bFound; i++) {
if (aTest[i] == vTest) {
bFound = true;
}
}


var bFound = 0;
for (var i=0; i < aTest.length && !bFound; i++) {
if (aTest[i] == vTest) {
bFound = 1;
}
}



if (oTest != undefined) {
//do something
}
if (oTest != null) {
//do something
}
if (oTest != false) {
//do something
}

if (!oTest) {
//do something
}



var aTest = new Array;
var aTest = [];


var oTest = new Object;
var oTest = {};



var oFruit = new Object;
oFruit.color = “red”;
oFruit.name = “apple”;


var oFruit = { color: “red”, name: “apple” };



var sMyFirstName = “Nicholas”;
function fn1() {
alert(sMyFirstName);
}
function fn2() {
var sMyLastName = “Zakas”;
fn1();
}
function fn3() {
var sMyMiddleInitial = “C”;
fn2();
}
fn3();


function sayFirstName() {
sMyFirstName = “Nicholas”;
alert(sMyFirstName);
}



function sayFirstName() {
sMyFirstName = “Nicholas”;
alert(sMyFirstName);
}
function sayFirstNameToo() {
alert(sMyFirstName);
}
sayFirstName();
sayFirstNameToo();



function sayFirstName() {
var sMyFirstName = “Nicholas”;
alert(sMyFirstName);
}
function sayFirstNameToo() {
alert(sMyFirstName);
}
sayFirstName();
sayFirstNameToo();


alert(document.title);
alert(document.body.tagName);
alert(document.location);



with (document) {
alert(title);
alert(body.tagName);
alert(location);
}


var iFive = 5;
var iSum = 10 + iFive;
alert(iSum);

var aNumbers = [5,10];
var iSum = aNumbers[0] + aNumbers[1];
alert(iSum);


for (var i=0; i < aNumbers.length; i++) {
if (aNumbers[i] == 5) {
alert(“Found 5”);
break;
}
}



var aValues = [1, 2, 3, 4, 5, 6, 7, 8];
function testFunc() {
for (var i=0; i < aValues.length; i++) {
alert(i + “/” + aValues.length + “=” + aValues[i]);
}
}


var aValues = [1, 2, 3, 4, 5, 6, 7, 8];
function testFunc() {
for (var i=0, iCount=aValues.length; i < iCount; i++) {
alert(i + “/” + iCount + “=” + aValues[i]);
}
}


for (var i=0; i < aValues.length; i++) {
//do something here
}

for (var i=aValues.length-1; i >= 0; i--) {
//do something here
}



var i=0;
while (i < aValues.length) {
//do something here
i++;
}


var i=0;



do {
//do something here
i++;
} while (i < aValues.length);



var i=aValues.length-1;
do {
//do something here
i--;
} while (i >= 0);


var i=aValues.length-1;
do {
//do something here
} while (i-- >= 0);



var aValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var iSum = 0;
for (var i=0; i < aValues.length; i++) {
iSum += aValues[i];
}


var aValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var iSum = 0;
for (var i=0; i < aValues.length; i++) {
iSum += aValues[i];
i++;
iSum += aValues[i];
i++;
iSum += aValues[i];
i++;

iSum += aValues[i];
i++;
iSum += aValues[i];
i++;
}



var aValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var iSum = 0;
for (var i=0; i < aValues.length; i++) {
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
}



var iLoopCount = Math.ceil(iIterations / 8);
var iTestValue = iIterations % 8;
do {
switch (iTestValue) {
case 0: [execute statement];
case 7: [execute statement];
case 6: [execute statement];
case 5: [execute statement];
case 4: [execute statement];
case 3: [execute statement];
case 2: [execute statement];
case 1: [execute statement];
iTestValue = 0;
} while (--iLoopCount > 0);





var aValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var iIterations = aValues.length;
var iLoopCount = Math.ceil(iIterations / 8);
var iTestValue = iIterations % 8;
var iSum = 0;
var i = 0;
do {
switch (iTestValue) {
case 0: iSum+= aValues[i++];
case 7: iSum+= aValues[i++];
case 6: iSum+= aValues[i++];
case 5: iSum+= aValues[i++];
case 4: iSum+= aValues[i++];
case 3: iSum+= aValues[i++];
case 2: iSum+= aValues[i++];
case 1: iSum+= aValues[i++];
}
iTestValue = 0;
} while (--iLoopCount > 0);



var iLoopCount = iIterations % 8;
while (iLoopCount--) {
[execute statement]
}



iLoopCount = Math.floor(iIterations / 8);
while (iLoopCount--) {
[execute statement]
[execute statement]
[execute statement]
[execute statement]
[execute statement]
[execute statement]
[execute statement]
[execute statement]
}



var iIterations = aValues.length;
var iLoopCount = iIterations % 8;
var iSum = 0;
var i = 0;
while (iLoopCount--) {
iSum += aValues[i++];
}
iLoopCount = Math.floor(iIterations / 8);
while (iLoopCount--) {
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
iSum += aValues[i++];
}


if (iNum > 0 && iNum < 10) {
alert(“Between 0 and 10”);
} else if (iNum > 9 && iNum < 20) {
alert(“Between 10 and 20”);
} else if (iNum > 19 && iNum < 30) {
alert(“Between 20 and 30”);
} else {
alert(“Less than or equal to 0 or greater than or equal to 30”);
}

if (iNum > 0) {
if (iNum < 10) {
alert(“Between 0 and 10”);
} else {
if (iNum < 20) {
alert(“Between 10 and 20”);
} else {
if (iNum < 30) {
alert(“Between 20 and 30”);
} else {
alert(“Greater than or equal to 30”);
}
}
}
} else {
alert(“Less than or equal to 0”);
}


function power(iNum, n) {
var iResult = iNum;
for (var i=1; i < n; i++) {
iResult *= iNum;
}
return iResult;
}

alert(Math.pow(3, 4)); //raise 3 to the 4th power
oDiv1.style.left = document.body.clientWidth;
oDiv2.style.left = document.body.clientWidth;


var iClientWidth = document.body.clientWidth;
oDiv1.style.left = iClientWidth;
oDiv2.style.left = iClientWidth;

var iFive = 5;
var sColor = “blue”;
var aValues = [1,2,3];
var oDate = new Date();

var iFive = 5 , sColor = “blue”, aValues = [1,2,3], oDate = new Date();

var sName = aValues[i];
i++;

var sName = aValues[i++];
var oFruit = new Object;
oFruit.color = “red”;
oFruit.name = “apple”;


var oFruit = { color: “red”, name: “apple” };



var oUL = document.getElementById(“ulItems”);
for (var i=0; i < 10; i++) {
var oLI = document.createElement(“li”);
oUL.appendChild(oLI);
oLI.appendChild(document.createTextNode(“Item “ + i));
}


var oUL = document.getElementById(“ulItems”);
var oFragment = document.createDocumentFragment();
for (var i=0; i < 10; i++) {
var oLI = document.createElement(“li”);
oLI.appendChild(document.createTextNode(“Item “ + i));
oFragment.appendChild(oLI);
}
oUL.appendChild(oFragment);




var oUL = document.getElementById(“ulItems”);
var oFragment = document.createDocumentFragment();
for (var i=0; i < 10; i++) {
var oLI = document.createElement(“li”);
oLI.appendChild(document.createTextNode(“Item “ + i));
oFragment.appendChild(oLI);
}
oUL.appendChild(oFragment);

