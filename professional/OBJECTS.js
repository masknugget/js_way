var oObject = new Object();
var oStringObject = new String();

var oObject = new Object;
var oStringObject = new String;

var oObject = new Object;
//do something with the object here
oObject = null;


Object Function Array String
Boolean Number Date RegExp
Error EvalError RangeError ReferenceError
SyntaxError TypeError URIError

var aValues = new Array();
var aValues = new Array(20);

var aColors = new Array();
aColors[0] = “red”;
aColors[1] = “green”;
aColors[2] = “blue”;

var aColors = new Array(“red”, “green”, “blue”);
alert(aColors[1]); //outputs “green”


var aColors = new Array(“red”, “green”, “blue”);
alert(aColors.length); //outputs “3”

var aColors = new Array(“red”, “green”, “blue”);
alert(aColors.length); //outputs “3”
aColors[3] = “purple”;
alert(aColors.length); //outputs “4”

var aColors = new Array(“red”, “green”, “blue”);
alert(aColors.length); //outputs “3”
aColors[25] = “purple”;
aColors(arr.length); //outputs “26”


var aColors = [“red”, “green”, “blue”];
alert(aColors.length); //outputs “3”
aColors[25] = “purple”;
alert(aColors.length); //outputs “26”

var aColors = [“red”, “green”, “blue”];
alert(aColors.toString()); //outputs “red,green,blue”
alert(aColors.valueOf()); //outputs “red,green,blue”

var aColors = [“red”, “green”, “blue”];
alert(aColors.toLocaleString()); //outputs “red,green,blue”

var aColors = [“red”, “green”, “blue”];
alert(aColors.join(“,”)); //outputs “red,green,blue”
alert(aColors.join(“-spring-”)); //outputs “red-spring-green-spring-blue”
alert(aColors.join(“][“)); //outputs “red][green][blue”


var sColors = “red,green,blue”;
var aColors = sColors.split(“,”);

var sColors = “green”;
var aColors = sColors.split(“”);
alert(aColors.toString()); //outputs “g,r,e,e,n”


var aColors = [“red”, “green”, “blue”];
var aColors2 = arr.concat(“yellow”, “purple”);
alert(aColors2.toString()); //outputs “red,green,blue,yellow,purple”
alert(aColors.toString()); //outputs “red,green,blue”

var aColors = [“red”, “green”, “blue”, “yellow”, “purple”];
var aColors2 = arr.slice(1);
var aColors3 = arr.slice(1, 4);
alert(aColors2.toString()); //outputs “green,blue,yellow,purple”
alert(aColors3.toString()); //outputs “green,blue,yellow”


var stack = new Array;
stack.push(“red”);
stack.push(“green”);
stack.push(“yellow”);
alert(stack.toString()); //outputs “red,green,yellow”
var vItem = stack.pop();
alert(vItem); //outputs “yellow”
alert(stack.toString()); //outputs “red,green”


var stack = new Array;
stack[0] = “red”;
stack[1] = “green”;
stack[2] = “yellow”;
alert(stack.toString()); //outputs “red,green,yellow”
var vItem = stack.pop();
alert(vItem); //outputs “yellow”
alert(stack.toString()); //outputs “red,green”

var aColors = [“red”, “green”, “yellow”];
var vItem = aColors.shift();
alert(aColors.toString()); //outputs “green,yellow”
alert(vItem); //outputs “red”
aColors.unshift(“black”);
alert(aColors.toString()); //outputs “black,green,yellow”

var queue = [“red”, “green”, “yellow”];
queue.push(“black”);
alert(queue.toString()); //outputs “red,green,yellow,black”
var sNextColor = queue.shift();
alert(sNextColor); //outputs “red”
alert(queue.toString()); //outputs “green,yellow,black”

var aColors = [“red”, “green”, “blue”];
aColors.reverse();
alert(aColors.toString()); //outputs “blue,green,red”

var aColors = [“red”, “green”, “blue”, “yellow”];
aColors.sort();
alert(aColors.toString()); //outputs “blue,green,red,yellow”

var aColors = [3, 32, 2, 5]
aColors.sort();
alert(aColors.toString()); //outputs “2,3,32,5”

var d = new Date();
var d = new Date(0);
var d = new Date(Date.parse(“May 25, 2004”));
var d = new Date(Date.UTC(2003, 1, 5));
var d = new Date(Date.UTC(2003, 1, 5, 13, 5));
var d = new Date(2003, 1, 5);


❑ toDateString() — displays only the date part of a Date (only the month, day, and year) in an
implementation-dependent format
❑ toTimeString() — displays only the time part of a Date (hours, minutes, seconds, and time
zone) in an implementation-dependent format
❑ toLocaleString() — displays the date and time of a Date in a locale-specific format
❑ toLocaleDateString() — displays the date part of a Date value in a locale-specific format
❑ toLocaleTimeString() — displays the time part of a Date in a locale-specific format
❑ toUTCString() — displays the UTC date of a Date in an implementation-specific format


var d1 = new Date(2004, 0, 1);
var d2 = new Date(2004, 6, 1);
var bSupportsDaylightSavingTime = d1.getTimezoneOffset() != d2.getTimezoneOffset();

var pointer = Global;


var sUri = “http://www.wrox.com/illegal value.htm#start”;
alert(encodeURI(sUri));
alert(encodeURIComponent(sUri));


var sUri = “http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start”;
alert(decodeURI(sUri));
alert(decodeURIComponent(sUri));

eval(“alert(‘hi’)”);
alert(“hi”);


var msg = “hello world”;
eval(“alert(msg)”);

eval(“function sayHi() { alert(‘hi’); }”);
sayHi();

var iMax = Math.max(3, 54, 32, 16);
alert(iMax); //outputs “54”

var iMin = Math.min(3, 54, 32, 16);
alert(iMin); //outputs “3”


var iNegOne = Math.abs(-1);
alert(iNegOne); //outputs “1”
var iPosOne = Math.abs(1);
alert(iPosOne); //outputs “1”

alert(Math.ceil(25.5)); //outputs “26”
alert(Math.round(25.5)); //outputs “26”
alert(Math.floor(25.5)); //outputs “25”

var iNum = Math.log(Math.exp(10));
alert(iNum);

var iNum = Math.pow(2, 10);
var iNum = Math.sqrt(4);
alert(iNum); //outputs “2”

number = Math.floor(Math.random() * total_number_of_choices + first_possible_value)
var iNum = Math.floor(Math.random() * 10 + 1);
var iNum = Math.floor(Math.random() * 9 + 2);

function selectFrom(iFirstValue, iLastValue) {
var iChoices = iLastValue – iFirstValue + 1;
return Math.floor(Math.random() * iChoices + iFirstValue);
}
//select from between 2 and 10
var iNum = selectFrom(2, 10);

var aColors = [“red”, “green”, “blue”, “yellow”, “black”, “purple”, “brown”];
var sColor = aColors[selectFrom(0, aColors.length-1)];

obj.__color__ = “red”;


function sayHi() {
alert(“hi”);
}

sayHi.alternate = function() {
alert(“hola”);
};
sayHi(); //outputs “hi”
sayHi.alternate(); //outputs “hola”



var oCar = new Object;
oCar.color = “red”;
oCar.showColor = function () {
alert(this.color); //outputs “red”
};

var oCar = new Object;
oCar.color = “red”;
oCar.showColor = function () {
alert(oCar.color); //outputs “red”
};


function showColor() {
alert(this.color);
}
var oCar1 = new Object;
oCar1.color = “red”;
oCar1.showColor = showColor;
var oCar2 = new Object;
oCar2.color = “blue”;
oCar2.showColor = showColor;
oCar1.showColor(); //outputs “red”
oCar2.showColor(); //outputs “blue”

function showColor() {
alert(color);
}


var oCar = new Object;
oCar.color = “red”;
oCar.doors = 4;
oCar.mpg = 23;
oCar.showColor = function () {
alert(this.color);
};

function createCar() {
var oTempCar = new Object;
oTempCar.color = “red”;
oTempCar.doors = 4;
oTempCar.mpg = 23;
oTempCar.showColor = function () {
alert(this.color)
};
return oTempCar;
}
var oCar1 = createCar();
var oCar2 = createCar();


function createCar(sColor, iDoors, iMpg) {
var oTempCar = new Object;
oTempCar.color = sColor;
oTempCar.doors = iDoors;
oTempCar.mpg = iMpg;
oTempCar.showColor = function () {
alert(this.color)
};
return oTempCar;
}
var oCar1 = createCar(“red”, 4, 23);
var oCar1 = createCar(“blue”, 3, 25);
oCar1.showColor(); //outputs “red”
oCar2.showColor(); //outputs “blue”



function showColor() {
alert(this.color);
}
function createCar(sColor, iDoors, iMpg) {
var oTempCar = new Object;
oTempCar.color = sColor;
oTempCar.doors = iDoors;
oTempCar.mpg = iMpg;
oTempCar.showColor = showColor;
return oTempCar;
}
var oCar1 = createCar(“red”, 4, 23);
var oCar2 = createCar(“blue”, 3, 25);
oCar1.showColor(); //outputs “red”
oCar2.showColor(); //outputs “blue”

function Car(sColor, iDoors, iMpg) {
this.color = sColor;
this.doors = iDoors;
this.mpg = iMpg;
this.showColor = function () {
alert(this.color)
};
}
var oCar1 = new Car(“red”, 4, 23);
var oCar2 = new Car(“blue”, 3, 25);


function Car() {
}
Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.mpg = 23;
Car.prototype.showColor = function () {
alert(this.color);
};
var oCar1 = new Car();
var oCar2 = new Car();


function Car() {
}
Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.mpg = 23;
Car.prototype.showColor = function () {
    alert(this.color);
};
var oCar1 = new Car();
var oCar2 = new Car();

alert(oCar1 instanceof Car); //outputs “true”

function Car() {
}

Car.prototype.color = “red”;
Car.prototype.doors = 4;
Car.prototype.mpg = 23;
Car.prototype.drivers = new Array(“Mike”, “Sue”);
Car.prototype.showColor = function () {
alert(this.color);
};
var oCar1 = new Car();
var oCar2 = new Car();
oCar1.drivers.push(“Matt”);
alert(oCar1.drivers); //outputs “Mike,Sue,Matt”
alert(oCar2.drivers); //outputs “Mike,Sue,Matt”


function Car(sColor, iDoors, iMpg) {
    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.drivers = new Array(“Mike”, “Sue”);
}
Car.prototype.showColor = function () {
alert(this.color);
};
var oCar1 = new Car(“red”, 4, 23);
var oCar2 = new Car(“blue”, 3, 25);
oCar1.drivers.push(“Matt”);
alert(oCar1.drivers); //outputs “Mike,Sue,Matt”
alert(oCar2.drivers); //outputs “Mike,Sue”


class Car {
    public String color = “red”;
    public int doors = 4;
    public int mpg = 23;

    public Car(String color, int doors, int mpg) {
        this.color = color;
        this.doors = doors;
        this.mpg = mpg;
    }
    public void showColor() {
        System.out.println(color);
    }
}


function Car(sColor, iDoors, iMpg) {
this.color = sColor;
this.doors = iDoors;
this.mpg = iMpg;
this.drivers = new Array(“Mike”, “Sue”);
if (typeof Car._initialized == “undefined”) {
    Car.prototype.showColor = function () {
alert(this.color);
};
Car._initialized = true;
}
}


function Car() {
var oTempCar = new Object;
oTempCar.color = “red”;
oTempCar.doors = 4;
oTempCar.mpg = 23;
oTempCar.showColor = function () {
alert(this.color)
};
return oTempCar;
}

var car = new Car();


var arr = new Array;
arr[0] = “hello “;
arr[1] = “world”;
var str = arr.join(“”);

function StringBuffer() {
this.__strings__ = new Array;
}



StringBuffer.prototype.append = function (str) {
this.__strings__.push(str);
};
StringBuffer.prototype.toString = function () {
return this.__strings__.join(“”);
};

var buffer = new StringBuffer();
buffer.append(“hello “);
buffer.append(“world”);
var result = buffer.toString();


var d1 = new Date();
var str = “”;
for (var i=0; i < 10000; i++) {
    str += “text”;
}

var d2 = new Date();
document.write(“Concatenation with plus: “ + (d2.getTime() - d1.getTime()) + “
milliseconds”);

var oBuffer = new StringBuffer();
d1 = new Date();
for (var i=0; i < 10000; i++) {
    oBuffer.append(“text”);
}
var sResult = buffer.toString();
d2 = new Date();
document.write(“<br />Concatenation with StringBuffer: “ + (d2.getTime() -
d1.getTime()) + “ milliseconds”);


Number.prototype.toHexString = function () {
return this.toString(16);
};

var iNum = 15;
alert(iNum.toHexString()); //outputs “F”

Array.prototype.enqueue = function(vItem) {
    this.push(vItem);
};

Array.prototype.dequeue = function() {
    return this.shift();
};

Array.prototype.indexOf = function (vItem) {
for (var i=0; i < this.length; i++) {
if (vItem == this[i]) {
return i;
}
}
return -1;
}


var aColors = new Array(“red”, “green”, “yellow”);
alert(aColors.indexOf(“green”)); //outputs “1”


Object.prototype.showValue = function () {
alert(this.valueOf());
};
var str = “hello”;
var iNum = 25;
str.showValue(); //outputs “hello”
iNum.showValue(); //outputs “25”

Function.prototype.toString = function () {
return “Function code hidden”;
};

function sayHi() {
alert(“hi”);
}
alert(sayHi.toString()); //outputs “Function code hidden”


Function.prototype.originalToString = Function.prototype.toString;
Function.prototype.toString = function () {
if (this.originalToString().length > 100) {
return “Function too long to display.”;
} else {
return this.originalToString();
}
};


var o = new Object;
Object.prototype.sayHi = function () {
alert(“hi”);
};
o.sayHi();