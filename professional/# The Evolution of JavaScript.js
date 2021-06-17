# The Evolution of JavaScript


var color : String = “red”;
var specialObject : MyClass = new MyClass();

const age = 32;


function sum(num1 : Integer, num2 : Integer) : Integer {
return num1 + num2;
}

function doNothing(num1 : Integer, num2 : Integer) : Void {
num1 + num2;
}

function sum(num1 : Integer, num2 : Integer) : Integer {
return num1 + num2;
}
function sum(num1 : Integer, num2 : Integer, num3 : Integer) : Integer {
return num1 + num2 + num3;
}

function sum(num1 : Integer, num2: Integer, named num3 : Integer = 7, named num4 :
Integer = 10) {
return num1 + num2 + num3 + num4;
}


result = sum(10, 20);
result = sum(10, 20, num3: 10);
result = sum(10, 20, num4: 10, num3: 20);


❑ Never — Has no values
❑ Void — Replaces the Undefined type from ECMAScript Edition 3
❑ Integer — All integer values
❑ char — All single 16-bit Unicode characters
❑ Type — The supertype of all types
❑ sbyte — Signed byte integer, values between –128 and 127
❑ byte — Byte integer, values between 0 and 255
❑ short — Short integer, values between –32768 and 32767
❑ ushort — Unsigned short integer, values between 0 and 65535
❑ int — Integer, values between –2147483648 and 2147483647
❑ uint — Unsigned integer, values between 0 and 4294967295
❑ long — Long integer, values between –9223372036854775808 and 9223372036854775807
❑ ulong – Unsigned long integer, values between 0 and 18446744073709551615
❑ float — Floating-point number, all single precision IEEE floating-point numbers


var b : byte = 10;
var longnum : long = L100;


class MyClass {
private var color : String = “red”;
public function MyClass(color : String) {
this.color = color;
}
public function sayColor() : Void {
alert(this.color);
}
}


var myObject : MyClass = new MyClass();



class MyClass {
private var color : String = “red”;
public function get myColor () {
return this.color;
}
public function set myColor (value : String) : Void {
this.color = value;
}
}

var myObject : MyClass = new MyClass();
myObject.myColor = “blue”;

class MyClass {
private var value : Integer = 25;
public function MyClass(value : Integer) {
this.value = value;
}
public function getValue() : Integer {
return this.value;
}
operator function “+” (anotherObject : MyClass) : MyClass {
return new MyClass(this.value + anotherObject.getValue());
}
}


var obj1 = new MyClass(20);
var obj2 = new MyClass(30);
var obj3 = obj1 + obj2;
alert(obj3.getValue()); //outputs “50”

class MyClass {
public static var value : Integer = 25;
}


var value : Integer = MyClass.value;

class ClassA {
private var value : Integer = 0;
public function ClassA(value : Integer) {
this.value = value;
}
public function getValue() : Integer {
return this.value;
}
}
class ClassB extends ClassA {
public function ClassB(value : Integer) {
super(value);
}
public function sayValue() : Integer {
alert(this.getValue());
}
}

const message = “Hello World!”;


function MyClass() {
this.__color__ = “red”;
}
MyClass.prototype.color getter = function () {
return this.__color__;
};
MyClass.prototype.color setter = function (value) {
this.__color__ = value;
alert(“Color changed to “ + value);
};
var obj = new MyClass();
alert(obj.color); //outputs “red”
obj.color = “blue”; //outputs “Color change to blue”



function MyClass() {
this.__color__ = “red”;
}
MyClass.prototype.__defineGetter__(“color”, function () {
return this.__color__;
});
MyClass.prototype.__defineSetter__(“color”, function (value) {
this.__color__ = value;
alert(“Color changed to “ + value);
});
var obj = new MyClass();
alert(obj.color); //outputs “red”
obj.color = “blue”; //outputs “Color change to blue”


for (var sProperty in arrItems) {
alert(arrItems[sProperty]);
}

var oNamespace1 = new Namespace(“http://www.wrox.com/”);
var oNamespace2 = new Namespace(“wrox”, “http://www.wrox.com/”);


var oWroxNS = new Namespace(“wrox”, “http://www.wrox.com/”);
var oQName = new QName(oWroxNS, “message”);
var oWroxNS = new Namespace(“wrox”, “http://www.wrox.com/”);
var oQName = new QName(oWroxNS, “message”);
alert(oQName.uri); //outputs “http://www.wrox.com/”
alert(oQName.localName); //outputs “message”

