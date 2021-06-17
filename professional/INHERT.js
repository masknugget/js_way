function ClassA(sColor) {
this.color = sColor;
this.sayColor = function () {
alert(this.color);
};
}
function ClassB(sColor) {
}


function ClassB(sColor) {
this.newMethod = ClassA;
this.newMethod(sColor);
delete this.newMethod;
}

function ClassB(sColor, sName) {
this.newMethod = ClassA;
this.newMethod(sColor);
delete this.newMethod;
this.name = sName;
this.sayName = function () {
alert(this.name);
};
}

var objA = new ClassA(“red”);
var objB = new ClassB(“blue”, “Nicholas”);
objA.sayColor(); //outputs “red”
objB.sayColor(); //outputs “blue”
objB.sayName(); //outputs “Nicholas”

function ClassZ() {
this.newMethod = ClassX;
this.newMethod();
delete this.newMethod;
this.newMethod = ClassY;
this.newMethod();
delete this.newMethod;
}

function sayColor(sPrefix, sSuffix) {
alert(sPrefix + this.color + sSuffix);
};
var obj = new Object();
obj.color = “red”;
//outputs “The color is red, a very nice color indeed. “
sayColor.call(obj, “The color is “, “, a very nice color indeed. “);


function ClassB(sColor, sName) {
//this.newMethod = ClassA;
//this.newMethod(sColor);
//delete this.newMethod;
ClassA.call(this, sColor);
this.name = sName;
this.sayName = function () {
alert(this.name);
};
}


function sayColor(sPrefix, sSuffix) {
alert(sPrefix + this.color + sSuffix);
};
var obj = new Object();
obj.color = “red”;
//outputs “The color is red, a very nice color indeed. “
sayColor.apply(obj, new Array(“The color is “,”, a very nice color indeed.”));


function ClassB(sColor, sName) {
//this.newMethod = ClassA;
//this.newMethod(sColor);
//delete this.newMethod;
ClassA.apply(this, new Array(sColor));
this.name = sName;
this.sayName = function () {
alert(this.name);
};


function ClassB(sColor, sName) {
//this.newMethod = ClassA;
//this.newMethod(sColor);
//delete this.newMethod;
ClassA.apply(this, arguments);
this.name = sName;
this.sayName = function () {
alert(this.name);
};
}


function ClassA() {
}
ClassA.prototype.color = “red”;
ClassA.prototype.sayColor = function () {
alert(this.color);
};
function ClassB() {
}
ClassB.prototype = new ClassA();


function ClassB() {
}
ClassB.prototype = new ClassA();

ClassB.prototype.name = “”;
ClassB.prototype.sayName = function () {
alert(this.name);
};



var objA = new ClassA();
var objB = new ClassB();
objA.color = “red”;
objB.color = “blue”;
objB.name = “Nicholas”;
objA.sayColor(); //outputs “red”
objB.sayColor(); //outputs “blue”
objB.sayName(); //outputs “Nicholas”

var objB = new ClassB();
alert(objB instanceof ClassA); //outputs “true”;
alert(objB instanceof ClassB); //outputs “true”


function ClassA(sColor) {
this.color = sColor;
}
ClassA.prototype.sayColor = function () {
alert(this.color);
};
function ClassB(sColor, sName) {
    ClassA.call(this, sColor);
    this.name = sName;
}
ClassB.prototype = new ClassA();
ClassB.prototype.sayName = function () {
    alert(this.name);
};


var objA = new ClassA(“red”);
var objB = new ClassB(“blue”, “Nicholas”);
objA.sayColor(); //outputs “red”
objB.sayColor(); //outputs “blue”
objB.sayName(); //outputs “Nicholas”


function Polygon(iSides) {
    this.sides = iSides;
}
Polygon.prototype.getArea = function () {
    return 0;
};


function Triangle(iBase, iHeight) {
    Polygon.call(this, 3);
    this.base = iBase;
    this.height = iHeight;
}
Triangle.prototype = new Polygon();
Triangle.prototype.getArea = function () {
    return 0.5 * this.base * this.height;
};


function Rectangle(iLength, iWidth) {
Polygon.call(this, 4);
this.length = iLength;
this.width = iWidth;
}
Rectangle.prototype = new Polygon();
Rectangle.prototype.getArea = function () {
return this.length * this.width;
};


var triangle = new Triangle(12, 4);
var rectangle = new Rectangle(22, 10);
alert(triangle.sides); //outputs “3”
alert(triangle.getArea()); //outputs “24”
alert(rectangle.sides); //outputs “4”
alert(rectangle.getArea()); //outputs “220”


function Polygon(iSides) {
this.sides = iSides;
if (typeof Polygon._initialized == “undefined”) {
Polygon.prototype.getArea = function () {
return 0;
};
Polygon._initialized = true;
}
}
function Triangle(iBase, iHeight) {
    Polygon.call(this, 3);
this.base = iBase;
this.height = iHeight;
if (typeof Triangle._initialized == “undefined”) {
Triangle.prototype = new Polygon();
Triangle.prototype.getArea = function () {
return 0.5 * this.base * this.height;
};
Triangle._initialized = true;
}
}


function Triangle(iBase, iHeight) {
Polygon.call(this, 3);
this.base = iBase;
this.height = iHeight;
if (typeof Triangle._initialized == “undefined”) {
Triangle.prototype.getArea = function () {
return 0.5 * this.base * this.height;
};
Triangle._initialized = true;
}
}
Triangle.prototype = new Polygon();

ClassB.prototype = new ClassA();
ClassB.prototype.inheritFrom(ClassA);
ClassB instanceof ClassA
ClassB.instanceOf(ClassA);



function Polygon(iSides) {
this.sides = iSides;
}
Polygon.prototype.getArea = function () {
return 0;
};
function Triangle(iBase, iHeight) {
Polygon.call(this, 3);
this.base = iBase;
this.height = iHeight;
}
Triangle.prototype.inheritFrom(Polygon);
Triangle.prototype.getArea = function () {
return 0.5 * this.base * this.height;
};
function Rectangle(iLength, iWidth) {
Polygon.call(this, 4);
this.length = iLength;
this.width = iWidth;
}
Rectangle.prototype.inheritFrom(Polygon);
Rectangle.prototype.getArea = function () {
return this.length * this.width;
};


var triangle = new Triangle(12, 4);
var rectangle = new Rectangle(22, 10);
alert(triangle.sides);
alert(triangle.getArea());
alert(rectangle.sides);
alert(rectangle.getArea());
alert(triangle.instanceOf(Triangle)); //outputs “true”
alert(triangle.instanceOf(Polygon)); //outputs “true”
alert(rectangle.instanceOf(Rectangle)); //outputs “true”
alert(rectangle.instanceOf(Polygon)); //outputs “true”



function Polygon(iSides) {
this.sides = iSides;
if (typeof Polygon._initialized == “undefined”) {
Polygon.prototype.getArea = function () {
return 0;
};
Polygon._initialized = true;
}
}
function Triangle(iBase, iHeight) {
Polygon.call(this, 3);
this.base = iBase;
this.height = iHeight;
if (typeof Triangle._initialized == “undefined”) {
Triangle.prototype.inheritFrom(Polygon);
Triangle.prototype.getArea = function () {
return 0.5 * this.base * this.height;
};
Triangle._initialized = true;
}
}
function Rectangle(iLength, iWidth) {
Polygon.call(this, 4);
this.length = iLength;
this.width = iWidth;
if (typeof Rectangle._initialized == “undefined”) {
Rectangle.prototype.inheritFrom(Polygon);
Rectangle.prototype.getArea = function () {
return this.length * this.width;
};
Rectangle._initialized = true;
}
}


function ClassX() {
this.messageX = “This is the X message. “;
if (typeof ClassX._initialized == “undefined”) {
ClassX.prototype.sayMessageX = function () {
alert(this.messageX);
};
ClassX._initialized = true;
}
}
function ClassY() {
this.messageY = “This is the Y message. “;
if (typeof ClassY._initialized == “undefined”) {
ClassY.prototype.sayMessageY = function () {
alert(this.messageY);
};
ClassY._initialized = true;
}
}

function ClassZ() {
ClassX.apply(this);
ClassY.apply(this);
this.messageZ = “This is the Z message. “;
if (typeof ClassZ._initialized == “undefined”) {
ClassZ.prototype.inheritFrom(ClassX);
ClassZ.prototype.inheritFrom(ClassY);
ClassZ.prototype.sayMessageZ = function () {
alert(this.messageZ);
};
ClassZ._initialized = true;
}
}


var objZ = new ClassZ();
objZ.sayMessageX(); //outputs “This is X message. “
objZ.sayMessageY(); //outputs “This is Y message.”
objZ.sayMessageZ(); //outputs “This is Z message.”

_classes.registerClass(“Subclass_Name”, “Superclass_Name”);

_classes.registerClass(“ClassA”);
function ClassA(color) {
_classes.defineClass(“ClassA”, prototypeFunction);
function prototypeFunction() {
//...
}
}


_classes.registerClass(“ClassA”);
function ClassA(sColor) {
_classes.defineClass(“ClassA”, prototypeFunction);
this.init(sColor);
function prototypeFunction() {
ClassA.prototype.init = function (sColor) {
this.parentMethod(“init”);
this.color = sColor;
};
}
}



_classes.registerClass(“ClassA”);
function ClassA(sColor) {
_classes.defineClass(“ClassA”, prototypeFunction);
this.init(sColor);
function prototypeFunction() {
ClassA.prototype.init = function (sColor) {
this.parentMethod(“init”);
this.color = sColor;
};
ClassA.prototype.sayColor = function () {
alert(this.color);
};
}
}


var objA = new ClassA(“red”);
objA.sayColor(); //outputs “red”


_classes.registerClass(“Polygon”);
function Polygon(sides) {
_classes.defineClass(“Polygon”, prototypeFunction);
this.init(sides);
function prototypeFunction() {
Polygon.prototype.init = function(iSides) {
this.parentMethod(“init”);
this.sides = iSides;
};
Polygon.prototype.getArea = function () {
return 0;
};
}
}


_classes.registerClass(“Triangle”, “Polygon”);
function Triangle(iBase, iHeight) {
_classes.defineClass(“Triangle”, prototypeFunction);
this.init(iBase,iHeight);
function prototypeFunction() {
Triangle.prototype.init = function(iBase, iHeight) {
this.parentMethod(“init”, 3);
this.base = iBase;
this.height = iHeight;
};
Triangle.prototype.getArea = function () {
return 0.5 * this.base * this.height;
};
}
}

_classes.registerClass(“Rectangle”, “Polygon”);
function Rectangle(iLength, iWidth) {
_classes.defineClass(“Rectangle”, prototypeFunction);
this.init(iLength, iWidth);
function prototypeFunction() {
Rectangle.prototype.init = function(iLength, iWidth) {
this.parentMethod(“init”, 4);
this.length = iLength;
this.width = iWidth;
}
Rectangle.prototype.getArea = function () {
return this.length * this.width;
};
}
}


