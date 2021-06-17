❑ The Core (ECMAScript)
    ❑ Syntax
    ❑ Types
    ❑ Statements
    ❑ Keywords
    ❑ Reserved Words
    ❑ Operators
    ❑ Objects
❑ The Document Object Model (DOM)
❑ The Browser Object Model (BOM)



❑ DOM Views — describes interfaces to keep track of the various views of a document (that is,
the document before CSS styling and the document after CSS styling)
❑ DOM Events — describes interfaces for events
❑ DOM Style — describes interfaces to deal with CSS-based styles
❑ DOM Traversal and Range — describes interfaces to traverse and manipulate a document tree


var color = “red”;
var num = 25;
var visible = true;

var test1 = “red”
var test2 = “blue”;


if (test1 == “red”) {
    test1 = “blue”;
    alert(test1);
}

var test = “hi”;
var test = “hi”, test2 = “hola”;
var test = “hi”, age = 25;

var test;


var test = “hi”;
alert(test); //outputs “hi”
//do something else here
test = 55;
alert(test); //outputs “55”


var sTest = “hello “;
sTest2 = sTest + “world”;
alert(sTest2); //outputs “hello world”



break else new var
case finally return void
catch for switch while
continue function this with
default if throw
delete in try
do instanceof typeof


abstract enum int short
boolean export interface static
byte extends long super
char final native synchronized
class float package throws
const goto private transient
debugger implements protected volatile
double import public


var sTemp = “test string”;
alert(typeof sTemp); //outputs “string”
alert(typeof 95); //outputs “number”


❑ “undefined” if the variable is of the Undefined type.
❑ “boolean” if the variable is of the Boolean type.
❑ “number” if the variable is of the Number type.
❑ “string” if the variable is of the String type.
❑ “object” if the variable is of a reference type or of the Null type

var oTemp;
var oTemp;
alert(oTemp == undefined);

var oTemp;
alert(typeof oTemp); //outputs “undefined”

var oTemp;
//make sure this variable isn’t defined
//var oTemp2;
//try outputting
alert(typeof oTemp); //outputs “undefined”
alert(typeof oTemp2); //outputs “undefined”



//try outputting
alert(oTemp2 == undefined); //causes error


function testFunc() {
//leave the function blank
}
alert(testFunc() == undefined); //outputs “true”



alert(null == undefined); //outputs “true”


var bFound = true;
var bLost = false;

var iNum = 55;

var iNum = 070; //070 is equal to 56 in decimal

var iNum = 0x1f; //0x1f is equal to 31 in decimal
var iNum2 = 0xAB; //0xAB is equal to 171 in decimal

var fNum = 5.0;
var fNum = 3.125e7;


var iResult = iNum* some_really_large_number;
if (isFinite(iResult)) {
    alert(“Number is finite.”);
} else {
    alert(“Number is infinite.”);
}

alert(NaN == NaN); //outputs “false”

alert(isNaN(“blue”)); //outputs “true”
alert(isNaN(“123”)); //outputs “false”

var sColor1 = “blue”;
var sColor2 = ‘blue’;

var sColor = “blue”;
alert(sColor.length); //outp


var bFound = false;
alert(bFound.toString()); //outputs “false”



var iNum1 = 10;
var fNum2 = 10.0;
alert(iNum1.toString()); //outputs “10”
alert(fNum2.toString()); //outputs “10”


var iNum = 10;
alert(iNum1.toString(2)); //outputs “1010”
alert(iNum1.toString(8)); //outputs “12”
alert(iNum1.toString(16)); //outputs “A”



var iNum1 = parseInt(“1234blue”); //returns 1234
var iNum2 = parseInt(“0xA”); //returns 10
var iNum3 = parseInt(“22.5”); //returns 22
var iNum4 = parseInt(“blue”); //returns NaN


var iNum1 = parseInt(“AF”, 16); //returns 175

var iNum1 = parseInt(“10”, 2); //returns 2
var iNum2 = parseInt(“10”, 8); //returns 8
var iNum2 = parseInt(“10”, 10); //returns 10



var iNum1 = parseInt(“010”); //returns 8
var iNum2 = parseInt(“010”, 8); //returns 8
var iNum3 = parseInt(“010”, 10); //returns 10


var fNum1 = parseFloat(“1234blue”); //returns 1234.0
var fNum2 = parseFloat(“0xA”); //returns NaN
var fNum3 = parseFloat(“22.5”); //returns 22.5
var fNum4 = parseFloat(“22.34.5”); //returns 22.34
var fNum5 = parseFloat(“0908”); //returns 908
var fNum6 = parseFloat(“blue”); //returns NaN



var b1 = Boolean(“”); //false – empty string
var b2 = Boolean(“hi”); //true – non-empty string
var b3 = Boolean(100); //true – non-zero number
var b4 = Boolean(null); //false - null
var b5 = Boolean(0); //false - zero
var b6 = Boolean(new Object()); //true – object



Number(false) 0
Number(true) 1
Number(undefined) NaN
Number(null) 0
Number(“5.5”) 5.5
Number(“56”) 56
Number(“5.6.7”) NaN
Number(new Object()) NaN
Number(100) 100

var s1 = String(null); //”null”
var oNull = null;
var s2 = oNull.toString(); //won’t work, causes an error

var o = new Object();
var o = new Object;


The Object class has the following properties:
❑ constructor — Areference value (pointer) to the function that created the object. For the
Object class, this points to the native Object() function.
❑ prototype — Areference value to the object prototype for this object. Prototypes are discussed
further in Chapter 3. For the all classes, this returns an instance of Object by default.



The Object class also has several methods:
❑ hasOwnProperty(property) — Determines if a given property exists for the object. The
property must be specified as a string (for example, o.hasOwnProperty(“name”) ).
❑ isPrototypeOf(object) — Determines if the object is a prototype of another object.
❑ propertyIsEnumerable(property) — Determines if a given property can be enumerated by
using the for...in statement (discussed later in this chapter).
❑ toString() — Returns a primitive string representation of the object. For the Object class,
this value is undefined in ECMA-262 and, as such, differs in each implementation.
❑ valueOf() — Returns the most appropriate primitive value of this object. For many classes,
this returns the same value as toString() 

var oBooleanaobject = new Boolean(true);

var oFalseObject = new Boolean(false);
var bResult = oFalseObject && true; //outputs true
var oNumberObject = new Number(55);
var iNumber = oNumberObject.valueOf();

var oNumberObject = new Number(99);
alert(oNumberObject.toFixed(2)); //outputs “99.00”

var oNumberObject = new Number(99);
alert(oNumberObject.toExponential(1)); //outputs “9.9e+1”


var oNumberObject = new Number(99);
alert(oNumberObject.toPrecision(1)); //outputs “1e+2”

var oNumberObject = new Number(99);
alert(oNumberObject.toPrecision(2)); //outputs “99”

var oNumberObject = new Number(99);
alert(oNumberObject.toPrecision(3)); //outputs “99.0”

var oStringObject = new String(“hello world”);
alert(oStringObject.valueOf() == oStringObject.toString()); //outputs “true”

var oStringObject = new String(“hello world”);
alert(oStringObject.length); //outputs “11”

var oStringObject = new String(“hello world”);
alert(oStringObject.charAt(1)); //outputs “e”

var oStringObject = new String(“hello world”);
alert(oStringObject.charCodeAt(1)); //outputs “101”


var oStringObject = new String(“hello “);
var sResult = oStringObject.concat(“world”);
alert(sResult); //outputs “hello world”
alert(oStringObject); //outputs “hello “

var oStringObject = new String(“hello “);
var sResult = oStringObject + “world”;
alert(sResult); //outputs “hello world”
alert(oStringObject); //outputs “hello “

var oStringObject = new String(“hello world”);
alert(oStringObject.indexOf(“o”)); //outputs “4”
alert(oStringObject.lastIndexOf(“o”)); //outputs “7”


var oStringObject = new String(“yellow”);
alert(oStringObject.localeCompare(“brick”)); //outputs “1”
alert(oStringObject.localeCompare(“yellow”)); //outputs “0”
alert(oStringObject.localeCompare (“zoo”)); //outputs “-1”


var oStringObject1 = new String(“yellow”);
var oStringObject2 = new String(“brick”);
var iResult = sTestString.localeCompare(“brick”);
if(iResult < 0) {
    alert(oStringObject1 + “ comes before “ + oStringObject2);
} else if (iResult > 0) {
    alert(oStringObject1 + “ comes after “ + oStringObject2);
} else {
    alert(“The two strings are equal”);
}


var oStringObject = new String(“hello world”);
alert(oStringObject.slice(3)); //outputs “lo world”
alert(oStringObject.substring(3)); //outputs “lo world”
alert(oStringObject.slice(3, 7)); //outputs “lo w”
alert(oStringObject.substring(3,7)); //outputs “lo w”

var oStringObject= new String(“hello world”);
alert(oStringObject.slice(-3)); //outputs “rld”
alert(oStringObject.substring(-3)); //outputs “hello world”
alert(oStringObject.slice(3, -4)); //outputs “lo w”
alert(oStringObject.substring(3,-4)); //outputs “hel”

var oStringObject= new String(“Hello World”);
alert(oStringObject.toLocaleUpperCase()); //outputs “HELLO WORLD”
alert(oStringObject.toUpperCase()); //outputs “HELLO WORLD”
alert(oStringObject.toLocaleLowerCase()); //outputs “hello world”
alert(oStringObject.toLowerCase()); //outputs “hello world”


var oStringObject = new String(“hello world”);
alert(oStringObject instanceof String); //outputs “true”


var o = new Object;
o.name = “Nicholas”;
alert(o.name); //outputs “Nicholas”
delete o.name;
alert(o.name); //outputs “undefined”


delete o.toString;

<a href=”javascript:window.open(‘about:blank’)”>Click Me</a>
<a href=”javascript:void(window.open(‘about:blank’))”>Click Me</a>

var iNum = 10;
++iNum


var iNum = 10;
iNum = iNum + 1;

var iNum = 10;
--iNum;

var iNum = 10;
--iNum;
alert(iNum); //outputs “9”
alert(--iNum); //outputs “8”
alert(iNum); //outputs “8”

var iNum1 = 2;
var iNum2 = 20;
var iNum3 = --iNum1 + ++iNum2; //equals 22
var iNum4 = iNum1 + iNum2; //equals 22


var iNum = 10;
iNum++


var iNum = 10;
iNum--;


var iNum = 10;
iNum--;
alert(iNum); //outputs “9”
alert(iNum--); //outputs “9”
alert(iNum); //outputs “8”

var iNum1 = 2;
var iNum2 = 20;
var iNum3 = iNum1-- + iNum2++; //equals 22
var iNum4 = iNum1 + iNum2; //equals 22


var iNum= 25;
iNum = +iNum;
alert(iNum); //outputs “25”

var sNum = “25”;
alert(typeof sNum); //outputs “string”
var iNum = +sNum;
alert(typeof iNum); //outputs “number”

var iNum= 25;
iNum = -iNum;
alert(iNum); //outputs “-25”

var sNum = “25”;
alert(typeof sNum); //outputs “string”
var iNum = -sNum;
alert(iNum); //outputs “-25”
alert(typeof iNum); //outputs “number”

var iNum = 18;
alert(iNum.toString(2)); //outputs “10010”

var iNum = -18;
alert(iNum.toString(2)); //outputs “-10010”


var iNum1 = 25; //25 is equal to 00000000000000000000000000011001
var iNum2 = ~iNum1; //convert to 111111111111111111111111111100110
alert(iNum2); //outputs “-26”

var iNum1 = 25;
var iNum2 = -iNum1 – 1;
alert(iNum2); //outputs “-26”

var iNum1 = 25;
var iNum2 = -iNum1 – 1;
alert(iNum2); //outputs “-26”

var iResult = 25 | 3;
alert(iResult); //outputs “27”

var iResult = 25 ^ 3;
alert(iResult); //outputs “26”

var iOld = 2; //equal to binary 10
var iNew = iOld << 5; //equal to binary 1000000 which is decimal 64

var iOld = 64; //equal to binary 1000000
var iNew = iOld >> 5; //equal to binary 10 with is decimal 2


var iOld = 64; //equal to binary 1000000
var iNew = iOld >>> 5; //equal to binary 10 with is decimal 2

var iUnsigned64 = 64 >>> 0;

alert(iUnsigned64.toString(2));


var bFound = false;
var i = 0;
while (!bFound) {
    if (aValues[i] == vSearchValue) {
        bFound = true;
    } else {
        i++;
    }
}


var bFalse = false;
var sBlue = “blue”;
var iZero = 0;
var iThreeFourFive = 345;
var oObject = new Object;
document.write(“The Boolean value of bFalse is “ + (!!bFalse));
document.write(“<br />The Boolean value of sBlue is “ + (!!sBlue));
document.write(“<br />The Boolean value of iZero is “ + (!!iZero));
document.write(“<br />The Boolean value of iThreeFourFive is “ +
(!!iThreeFourFive));
document.write(“<br />The Boolean value of oObject is “ + (!!oObject));

var bTrue = true;
var bFalse = false;
var bResult = bTrue && bFalse;


var bTrue = true;
var bResult = (bTrue && bUnknown); //error occurs here
alert(bResult); //this line never executes

var bFalse = false;
var bResult = (bFalse && bUnknown);
alert(bResult); //outputs “false”

var bTrue = true;
var bFalse = false;
var bResult = bTrue || bFalse;

var bTrue = true;
var bResult = (bTrue || bUnknown);
alert(bResult); //outputs “true”

var bFalse = false;
var bResult = (bTrue || bUnknown); //error occurs here
alert(bResult); //this line never executes

var iResult = 34 * 56;
var iResult = 26 % 5; //equal to 1
var iResult = 1 + 2;

var result1 = 5 + 5; //two numbers
alert(result); //outputs “10”
var result2 = 5 + “5”; //a number and a string
alert(result); //outputs “55”
var iResult = 2 – 1;

var bResult1 = 5 > 3; //true
var bResult2 = 5 < 3; //false

var bResult = “Brick” < “alphabet”;
alert(bResult); //outputs “true”

var bResult = “Brick”.toLowerCase() < “alphabet”.toLowerCase();
alert(bResult); //outputs “false”

var bResult = “23” < “3”;
alert(bResult); //outputs “true”

var bResult = “23” < 3;
alert(bResult); //outputs “false”

var bResult = “a” < 3;
alert(bResult);

var bResult = “a” >= 3;
alert(bResult);

var sNum = “55”;
var iNum = 55;
alert(sNum == iNum); //outputs “true”
alert(sNum === iNum); //outputs “false”


var sNum = “55”;
var iNum = 55;
alert(sNum != iNum); //outputs “false”
alert(sNum !== iNum); //outputs “true”

variable = boolean_expression ? true_value : false_value;

var iMax = (iNum1 > iNum2) ? iNum1 : iNum2;
var iNum = 10;
var iNum = 10;
iNum = iNum + 10;

var iNum = 10;
iNum += 10;
var iNum1=1, iNum2=2, iNum3=3;

if (condition) statement1 else statement2



if (i > 25)
    alert(“Greater than 25.”); //one-line statement
else {
    alert(“Less than or equal to 25.”); //block statement
}


if (condition1) statement1 else if (condition2) statement2 else statement3


if (i > 25) {
    alert(“Greater than 25.”)
} else if (i < 0) {
    alert(“Less than 0.”);
} else {
    alert(“Between 0 and 25, inclusive.”);
}


do {
    statement
} while (expression);

var i = 0;
do {
    i += 2;
} while (i < 10);



var i = 0;
while (i < 10) {
i += 2;
}

for (var i=0; i < iCount; i++){
alert(i);
}


for (sProp in window) {
alert(sProp);
}


var iNum = 0;
for (var i=1; i < 10; i++) {
    if (i % 5 == 0) {
        break;
    }
    iNum++;
}
alert(iNum); //outputs “4”


var iNum = 0;
for (var i=1; i < 10; i++) {
    if (i % 5 == 0) {
        continue;
    }
    iNum++;
}
alert(iNum); //outputs “8”


var iNum = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            break outermost;
        }
        iNum++;
    }
}
alert(iNum); //outputs “55”



var iNum = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            continue outermost;
        }
        iNum++;
    }
}
alert(iNum); //outputs “95”


var sMessage = “hello world”;
with(sMessage) {
    alert(toUpperCase()); //outputs “HELLO WORLD”
}



switch (expression) {
    case value: statement
        break;
    case value: statement
        break;
    case value: statement
        break;
    ...
    case value: statement
        break;
    default: statement
}


if (i == 25)
    alert(“25”);
else if (i == 35)
    alert(“35”);
else if (i == 45)
    alert(“45”);
else
    alert(“Other”);


switch (i) {
    case 25: alert(“25”);
        break;
    case 35: alert(“35”);
        break;
    case 45: alert(“45”);
        break;
    default: alert(“Other”);
}


var BLUE = “blue”, RED = “red”, GREEN = “green”;
switch (sColor) {
    case BLUE: alert(“Blue”);
        break;
    case RED: alert(“Red”);
        break;
    case GREEN: alert(“Green”);
        break;
    default: alert(“Other”);
}


function sayHi(sName, sMessage) {
    alert(“Hello “ + name + “,” + sMessage);
}

sayHi(“Nicholas”, “how are you today?”);

function sum(iNum1, iNum2) {
return iNum1 + iNum2;
}

var iResult = sum(1,1);
alert(iResult); //outputs “2”

function sum(iNum1, iNum2) {
return iNum1 + iNum2;
alert(iNum1 + iNum2); //never reached
}

function diff(iNum1, iNum2) {
if (iNum1 > iNum2) {
    return iNum1 – iNum2;
} else {
return iNum2 – iNum1;
}
}

function sayHi(sMessage) {
if (sMessage == “bye”){
return;
}
alert(sMessage);
}

function doAdd(iNum) {
alert(iNum + 100);
}
function doAdd(iNum) {
alert(iNum + 10);
}
doAdd(10);


function sayHi() {
if (arguments[0] == “bye”) {
return;
}
alert(arguments[0]);
}


function howManyArgs() {
alert(arguments.length);
}
howManyArgs(“string”, 45); //outputs “2”
howManyArgs(); //outputs “0”
howManyArgs(12); //outputs “1”


function doAdd() {
if(arguments.length == 1) {
alert(arguments[0] + 10);
} else if (arguments.length == 2) {
alert(arguments[0] + arguments[1]);
}
}
doAdd(10); //outputs “20”
doAdd(30, 20); //outputs “50”



var function_name = new Function(argument1, argument2,..,argumentN, function_body);

function sayHi(sName, sMessage) {
alert(“Hello “ + sName + “,” + sMessage);
}

var sayHi = new Function(“sName”, “sMessage”, “alert(\”Hello \” + sName + \”, \” +
sMessage + \”);”);


function doAdd(iNum) {
alert(iNum + 100);
}
function doAdd(iNum) {
alert(iNum + 10);
}
doAdd(10); //outputs “20”


doAdd = new Function(“iNum”, “alert(iNum + 100)”);
doAdd = new Function(“iNum”, “alert(iNum + 10)”);
doAdd(10);

var doAdd = new Function(“iNum”, “alert(iNum + 10) “);
var alsoDoAdd = doAdd;
doAdd(10); //outputs “20”
alsoDoAdd(10); //outputs “20”


function callAnotherFunc(fnFunction, vArgument) {
    fnFunction(vArgument);
}
var doAdd = new Function(“iNum”, “alert(iNum + 10)”);
callAnotherFunc(doAdd, 10); //outputs “20”


function doAdd(iNum) {
    alert(iNum + 10);
}
function sayHi() {
    alert(“Hi”);
}
alert(doAdd.length); //outputs “1”
alert(sayHi.length); //outputs “0”


function doAdd(iNum) {
    alert(iNum + 10);
}
alert(doAdd.toString());


var sMessage = “Hello World!”;
function sayHelloWorld() {
    alert(sMessage);
}
sayHelloWorld();


var iBaseNum = 10;
function addNumbers(iNum1, iNum2) {
    function doAddition() {
        return iNum1 + iNum2 + iBaseNum;
    }
    return doAddition();
}