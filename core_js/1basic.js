"café" === "caf\u00e9" // => true

12 // The number twelve
1.2 // The number one point two
"hello world" // A string of text
'Hi' // Another string
true // A Boolean value
false // The other Boolean value
/ javascript / gi // A "regular expression" literal (for pattern matching)
null // Absence of an object

{
    x:1, y
:
    2
} // An object initializer
[1, 2, 3, 4, 5] // An array initializer

a = 3;
b = 4;
a.sort(); // The object-oriented version of sort(a).


Math.pow(2, 53) // => 9007199254740992: 2 to the power 53
Math.round(.6) // => 1.0: round to the nearest integer
Math.ceil(.6) // => 1.0: round up to an integer
Math.floor(.6) // => 0.0: round down to an integer
Math.abs(-5) // => 5: absolute value
Math.max(x, y, z) // Return the largest argument
Math.min(x, y, z) // Return the smallest argument
Math.random() // Pseudo-random number x where 0 <= x < 1.0
Math.PI // π: circumference of a circle / diameter
Math.E // e: The base of the natural logarithm
Math.sqrt(3) // The square root of 3
Math.pow(3, 1 / 3) // The cube root of 3
Math.sin(0) // Trigonometry: also Math.cos, Math.atan, etc.
Math.log(10) // Natural logarithm of 10
Math.log(100) / Math.LN10 // Base 10 logarithm of 100
Math.log(512) / Math.LN2 // Base 2 logarithm of 512
Math.exp(3) // Math.E cubed


Infinity // A read/write variable initialized to Infinity.
Number.POSITIVE_INFINITY // Same value, read-only.
1 / 0 // This is also the same value.
Number.MAX_VALUE + 1 // This also evaluates to Infinity.
Number.NEGATIVE_INFINITY // These expressions are negative infinity.
- Infinity
- 1 / 0
- Number.MAX_VALUE - 1
NaN // A read/write variable initialized to NaN.
Number.NaN // A read-only property holding the same value.
0 / 0 // Evaluates to NaN.
Number.MIN_VALUE / 2 // Underflow: evaluates to 0
- Number.MIN_VALUE / 2 // Negative zero
- 1 / Infinity // Also negative 0
- 0


var zero = 0; // Regular zero
var negz = -0; // Negative zero
zero === negz // => true: zero and negative zero are equal
1 / zero === 1 / negz // => false: infinity and -infinity are not equal


var x = .3 - .2; // thirty cents minus 20 cents
var y = .2 - .1; // twenty cents minus 10 cents
x == y // => false: the two values are not the same!
x == .1 // => false: .3-.2 is not equal to .1
y == .1 // => true: .2-.1 is equal to .1


var then = new Date(2010, 0, 1); // The 1st day of the 1st month of 2010
var later = new Date(2010, 0, 1, // Same day, at 5:10:30pm, local time
    17, 10, 30);
var now = new Date(); // The current date and time
var elapsed = now - then; // Date subtraction: interval in milliseconds
later.getFullYear() // => 2010
later.getMonth() // => 0: zero-based months
later.getDate() // => 1: one-based days
later.getDay() // => 5: day of week. 0 is Sunday 5 is Friday.
later.getHours() // => 17: 5pm, local time
later.getUTCHours() // hours in UTC time; depends on timezone


later.toString() // => "Fri Jan 01 2010 17:10:30 GMT-0800 (PST)"
later.toUTCString() // => "Sat, 02 Jan 2010 01:10:30 GMT"
later.toLocaleDateString() // => "01/01/2010"
later.toLocaleTimeString() // => "05:10:30 PM"
later.toISOString() // => "2010-01-02T01:10:30.000Z"; ES5 only


var p = "π"; // π is 1 character with 16-bit codepoint 0x03c0
var e = "e"; // e is 1 character with 17-bit codepoint 0x1d452
p.length // => 1: p consists of 1 16-bit element
e.length // => 2: UTF-16 encoding of e is 2 16-bit values: "\ud835\udc52"


< button
onclick = "alert('Thank you')" > Click
Me < /button>

msg = "Hello, " + "world"; // Produces the string "Hello, world"
greeting = "Welcome to my blog," + " " + name;


var s = "hello, world" // Start with some text.
s.charAt(0) // => "h": the first character.
s.charAt(s.length - 1) // => "d": the last character.
s.substring(1, 4) // => "ell": the 2nd, 3rd and 4th characters.
s.slice(1, 4) // => "ell": same thing
s.slice(-3) // => "rld": last 3 characters
s.indexOf("l") // => 2: position of first letter l.
s.lastIndexOf("l") // => 10: position of last letter l.
s.indexOf("l", 3) // => 3: position of first "l" at or after 3

s.split(", ") // => ["hello", "world"] split into substrings
s.replace("h", "H") // => "Hello, world": replaces all instances
s.toUpperCase() // => "HELLO, WORLD"

s = "hello, world";
s[0] // => "h"
s[s.length - 1] // => "d"

text.replace(pattern, "#"); // => "testing: #, #, #"
text.split(/\D+/); // => ["","1","2","3"]: split on non-digits

a == 4


if (a == 4)
    b = b + 1;
else
    a = a + 1;

if ((x == 0 && y == 0) || !(z == 0)) {
// x and y are both zero or z is non-zero
}

var s = "hello world!"; // A string
var word = s.substring(s.indexOf(" ") + 1, s.length); // Use string properties

var s = "test"; // Start with a string value.
s.len = 4; // Set a property on it.
var t = s.len; // Now query the property.


var s = "test", n = 1, b = true; // A string, number, and boolean value.
var S = new String(s); // A String object
var N = new Number(n); // A Number object
var B = new Boolean(b); // A Boolean object


var s = "hello"; // Start with some lowercase text
s.toUpperCase(); // Returns "HELLO", but doesn't alter s
s // => "hello": the original string has not changed


var o = {x: 1}; // Start with an object
o.x = 2; // Mutate it by changing the value of a property
o.y = 3; // Mutate it again by adding a new property
var a = [1, 2, 3] // Arrays are also mutable
a[0] = 0; // Change the value of an array element
a[3] = 4; // Add a new array element


var o = {x: 1}, p = {x: 1}; // Two objects with the same properties
o === p // => false: distinct objects are never equal
var a = [], b = []; // Two distinct, empty arrays
a === b // => false: distinct arrays are never equal


var a = []; // The variable a refers to an empty array.
var b = a; // Now b refers to the same array.
b[0] = 1; // Mutate the array referred to by variable b.
a[0] // => 1: the change is also visible through variable a.
a === b // => true: a and b refer to the same object, so they are equal.

var a = ['a', 'b', 'c']; // An array we want to copy
var b = []; // A distinct array we'll copy into
for (var i = 0; i < a.length; i++) { // For each index of a[]
    b[i] = a[i]; // Copy an element of a into b
}


function equalArrays(a, b) {
    if (a.length != b.length) return false; // Different-size arrays not equal
    for (var i = 0; i < a.length; i++) // Loop through all elements
        if (a[i] !== b[i]) return false; // If any differ, arrays not equal
    return true; // Otherwise they are equal
}

10 + " objects" // => "10 objects". Number 10 converts to a string
"7" * "4" // => 28: both strings convert to numbers


var n = 1 - "x"; // => NaN: string "x" can't convert to a number
n + " objects" // => "NaN objects": NaN converts to string "NaN"


null == undefined // These two values are treated as equal.
"0" == 0 // String converts to a number before comparing.
0 == false // Boolean converts to number before comparing.
"0" == false // Both operands convert to numbers before comparing.


Number("3") // => 3
String(false) // => "false" Or use false.toString()
Boolean([]) // => true
Object(3) // => new Number(3)


x + "" // Same as String(x)
+ x // Same as Number(x). You may also see x-0
!!x // Same as Boolean(x). Note double !

var n = 17;
binary_string = n.toString(2); // Evaluates to "10001"
octal_string = "0" + n.toString(8); // Evaluates to "021"
hex_string = "0x" + n.toString(16); // Evaluates to "0x11"


var n = 123456.789;
n.toFixed(0); // "123457"
n.toFixed(2); // "123456.79"
n.toFixed(5); // "123456.78900"
n.toExponential(1); // "1.2e+5"
n.toExponential(3); // "1.235e+5"
n.toPrecision(4); // "1.235e+5"
n.toPrecision(7); // "123456.8"
n.toPrecision(10); // "123456.7890"


parseInt("3 blind mice") // => 3
parseFloat(" 3.14 meters") // => 3.14
parseInt("-12.34") // => -12
parseInt("0xFF") // => 255
parseInt("0xff") // => 255
parseInt("-0XFF") // => -255
parseFloat(".1") // => 0.1
parseInt("0.1") // => 0
parseInt(".1") // => NaN: integers can't start with "."
parseFloat("$72.47"); // => NaN: numbers can't start with "$"


parseInt("11", 2); // => 3 (1*2 + 1)
parseInt("ff", 16); // => 255 (15*16 + 15)
parseInt("zz", 36); // => 1295 (35*36 + 35)
parseInt("077", 8); // => 63 (7*8 + 7)
parseInt("077", 10); // => 77 (7*10 + 7)


({x: 1, y: 2}).toString() // => "[object Object]"

    [1, 2, 3].toString() // => "1,2,3"
    (function (x) {
        f(x);
    }).toString() // => "function(x) {\n f(x);\n}"
/\d + /g.toString() /
/ => "/\\d + /g"
new Date(2010, 0, 1).toString() // => "Fri Jan 01 2010 00:00:00 GMT-0800 (PST)"


var d = new Date(2010, 0, 1); // January 1st, 2010, (Pacific time)
d.valueOf() // => 1262332800000

var now = new Date(); // Create a Date object
typeof (now + 1) // => "string": + converts dates to strings
typeof (now - 1) // => "number": - uses object-to-number conversion

now == now.toString() // => true: implicit and explicit string conversions
now > (now - 1) // => true: > converts a Date to a number

for (var i = 0; i < 10; i++) console.log(i);
for (var i = 0, j = 10; i < 10; i++, j--) console.log(i * j);
for (var p in o) console.log(p);

var scope = "global"; // Declare a global variable
function checkscope() {
    var scope = "local"; // Declare a local variable with the same name
    return scope; // Return the local value, not the global one
}

checkscope() // => "local"

scope = "global"; // Declare a global variable, even without var.
function checkscope2() {
    scope = "local"; // Oops! We just changed the global variable.
    myscope = "local"; // This implicitly declares a new global variable.
    return [scope, myscope]; // Return two values.
}

checkscope2() // => ["local", "local"]: has side effects!
scope // => "local": global variable has changed.
myscope // => "local": global namespace cluttered up.

var scope = "global scope"; // A global variable
function checkscope() {
    var scope = "local scope"; // A local variable
    function nested() {
        var scope = "nested scope"; // A nested scope of local variables
        return scope; // Return the value in scope here
    }

    return nested();
}

checkscope() // => "nested scope"

function test(o) {
    var i = 0; // i is defined throughout function
    if (typeof o == "object") {
        var j = 0; // j is defined everywhere, not just block
        for (var k = 0; k < 10; k++) { // k is defined everywhere, not just loop
            console.log(k); // print numbers 0 through 9
        }
        console.log(k); // k is still defined: prints 10
    }
    console.log(j); // j is defined, but may not be initialized
}

var scope = "global";

function f() {
    console.log(scope); // Prints "undefined", not "global"
    var scope = "local"; // Variable initialized here, but defined everywhere
    console.log(scope); // Prints "local"
}

function f() {
    var scope; // Local variable is declared at the top of the function
    console.log(scope); // It exists here, but still has "undefined" value
    scope = "local"; // Now we initialize it and give it a value
    console.log(scope); // And here it has the value we expect
}


var truevar = 1; // A properly declared global variable, nondeletable.
fakevar = 2; // Creates a deletable property of the global object.
this.fakevar2 = 3; // This does the same thing.
delete truevar // => false: variable not deleted
delete fakevar // => true: variable deleted
delete this.fakevar2 // => true: variable deleted


1.23 // A number literal
"hello" // A string literal
/ pattern / // A regular expression literal

true // Evalutes to the boolean true value
false // Evaluates to the boolean false value
null // Evaluates to the null value
this // Evaluates to the "current" object

    [] // An empty array: no expressions inside brackets means no elements
    [1 + 2, 3 + 4] // A 2-element array. First element is 3, second is 7

var matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

var sparseArray = [1, , , , 5];
A
single
trailing
comma
is
allowe


var p = {x: 2.3, y: -1.2}; // An object with 2 properties
var q = {}; // An empty object with no properties
q.x = 2.3;
q.y = -1.2; // Now q has the same properties as p


var rectangle = {
    upperLeft: {x: 2, y: 2},
    lowerRight: {x: 4, y: 5}
};

var side = 1;
var square = {
    "upperLeft": {x: p.x, y: p.y},
    'lowerRight': {x: p.x + side, y: p.y + side}
};

// This function returns the square of the value passed to it.
var square = function (x) {
    return x * x;
}


var o = {x: 1, y: {z: 3}}; // An example object
var a = [o, 4, [5, 6]]; // An example array that contains the object
o.x // => 1: property x of expression o
o.y.z // => 3: property z of expression o.y
o["x"] // => 1: property x of object o
a[1] // => 4: element at index 1 of expression a
a[2]["1"] // => 6: element at index 1 of expression a[2]
a[0].x // => 1: property x of expression a[0]

f(0) // f is the function expression; 0 is the argument expression.
Math.max(x, y, z) // Math.max is the function; x, y and z are the arguments.
a.sort() // a.sort is the function; there are no arguments.


new Object()
new Point(2, 3)
w = x + y * z;
w = (x + y) * z;

w = x - y - z;

w = ((x - y) - z);

x = ~-y;
w = x = y = z;
q = a ? b : c ? d : e ? f : g;
x = ~(-y);
w = (x = (y = z));
q =
    a ? b : (c ? d : (e ? f : g));

1 + 2 // => 3
"hello" + " " + "there" // => "hello there"
"1" + "2" // => "12"


1 + 2 // => 3: addition
"1" + "2" // => "12": concatenation
"1" + 2 // => "12": concatenation after number-to-string
1 + {} // => "1[object Object]": concatenation after object-to-string
true + true // => 2: addition after boolean-to-number
2 + null // => 2: addition after null converts to 0
2 + undefined // => NaN: addition after undefined converts to NaN

1 + 2 + " blind mice"; // => "3 blind mice"
1 + (2 + " blind mice"); // => "12 blind mice"

var i = 1, j = ++i; // i and j are both 2
var i = 1, j = i++; // i is 2, j is 1

1 + 2 // Addition. Result is 3.
"1" + "2" // Concatenation. Result is "12".
"1" + 2 // Concatenation. 2 is converted to "2". Result is "12".
11 < 3 // Numeric comparison. Result is false.
"11" < "3" // String comparison. Result is true.
"11" < 3 // Numeric comparison. "11" converted to 11. Result is false.
"one" < 3 // Numeric comparison. "one" converted to NaN. Result is false.


var point = {x: 1, y: 1}; // Define an object
"x" in point // => true: object has property named "x"
"z" in point // => false: object has no "z" property.
"toString" in point // => true: object inherits toString method
var data = [7, 8, 9]; // An array with elements 0, 1, and 2
"0" in data // => true: array has an element "0"
1 in data // => true: numbers are converted to strings
3 in data // => false: no element 3

var d = new Date(); // Create a new object with the Date() constructor
d instanceof Date; // Evaluates to true; d was created with Date()
d instanceof Object; // Evaluates to true; all objects are instances of Object
d instanceof Number; // Evaluates to false; d is not a Number object
var a = [1, 2, 3]; // Create an array with array literal syntax
a instanceof Array; // Evaluates to true; a is an array
a instanceof Object; // Evaluates to true; all arrays are objects
a instanceof RegExp; // Evaluates to false; arrays are not regular expressions

x == 0 && y == 0 // true if, and only if x and y are both 0

var o = {x: 1};
var p = null;
o && o.x // => 1: o is truthy, so return value of o.x
p && p.x // => null: p is falsy, so return it and don't evaluate p.x


if (a == b) stop(); // Invoke stop() only if a == b
(a == b) && stop(); // This does the same thing


// the preferences object. If that is not defined use a hard-coded constant.
var max = max_width || preferences.max_width || 500;

// Copy the properties of o to p, and return p
function copy(o, p) {
    p = p || {}; // If no object passed for p, use a newly created object.
// function body goes here
}


// These two equalities hold for any values of p and q
!(p && q) === !p || !q
!(p || q) === !p && !q


i = 0 // Set the variable i to 0.
o.x = 1 // Set the property x of object o to 1
    (a = b) == 0

i = j = k = 0; // Initialize 3 variables to 0
data[i++] *= 2;
data[i++] = data[i++] * 2;

eval("3+2") // => 5

eval("function f() { return x+1; }");


var geval = eval; // Using another name does a global eval
var x = "global", y = "global"; // Two global variables
function f() { // This function does a local eval
    var x = "local"; // Define a local variable
    eval("x += 'changed';"); // Direct eval sets local variable
    return x; // Return changed local variable
}

function g() { // This function does a global eval
    var y = "local"; // A local variable
    geval("y += 'changed';"); // Indirect eval sets global variable
    return y; // Return unchanged local variable
}

console.log(f(), x); // Local variable changed: prints "localchanged global":
console.log(g(), y); // Global variable changed: prints "local globalchanged":


x > 0 ? x : -x // The absolute value of x

greeting = "hello " + (username ? username : "there");


greeting = "hello ";
if (username)
    greeting += username;
else
    greeting += "there";

(typeof value == "string") ? "'" + value + "'" : value

var o = {x: 1, y: 2}; // Start with an object
delete o.x; // Delete one of its properties
"x" in o // => false: the property does not exist anymore
var a = [1, 2, 3]; // Start with an array
delete a[2]; // Delete the last element of the array
a.length // => 2: array only has two elements now


var o = {x: 1, y: 2}; // Define a variable; initialize it to an object
delete o.x; // Delete one of the object properties; returns true
typeof o.x; // Property does not exist; returns "undefined"
delete o.x; // Delete a nonexistent property; returns true
delete o; // Can't delete a declared variable; returns false.
// Would raise an exception in strict mode.
delete 1; // Argument is not an lvalue: returns true
this.x = 1; // Define a property of the a global object without var
delete x; // Try to delete it: returns true in non-strict mode

i = 0, j = 1, k = 2;

for (var i = 0, j = 10; i < j; i++, j--)
    console.log(i + j);


greeting = "Hello " + name;
i *= 3;

counter++;

delete o.x;

alert(greeting);
window.close();

Math.cos(x);

cx = Math.cos(x);


{
    x = Math.PI;
    cx = Math.cos(x);
    console.log("cos(π) = " + cx);
}

// Initialize an array a
for (i = 0; i < a.length; a[i++] = 0) ;


if ((a == 0) || (b == 0)) ; // Oops! This line does nothing...
o = null; // and this line is always executed.

for (i = 0; i < a.length; a[i++] = 0) /* empty */ ;


var i; // One simple variable
var j = 0; // One var, one value
var p, q; // Two variables
var greeting = "hello" + name; // A complex initializer
var x = 2.34, y = Math.cos(0.75), r, theta; // Many variables
var x = 2, y = x * x; // Second var uses the first
var x = 2, // Multiple variables...
    f = function (x) {
        return x * x
    }, // each on its own line
    y = f(x);

for (var i = 0; i < 10; i++) console.log(i);
for (var i = 0, j = 10; i < 10; i++, j--) console.log(i * j);
for (var i in o) console.log(i);

var f = function (x) {
    return x + 1;
} // Expression assigned to a variable
function f(x) {
    return x + 1;
} // Statement includes variable name

function hypotenuse(x, y) {
    return Math.sqrt(x * x + y * y); // return is documented in the next section
}

function factorial(n) { // A recursive function
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}


if (username == null) // If username is null or undefined,
    username = "John Doe"; // define it

// If username is null, undefined, false, 0, "", or NaN, give it a new value
if (!username) username = "John Doe";


if (!address) {
    address = "";
    message = "Please specify a mailing address.";
}


if (expression)
    statement1
else
    statement2


if (n == 1)
    console.log("You have 1 new message.");
else
    console.log("You have " + n + " new messages.");


i = j = 1;
k = 2;
if (i == j)
    if (j == k)
        console.log("i equals k");
    else
        console.log("i doesn't equal j"); // WRONG!!


if (i == j) {
    if (j == k)
        console.log("i equals k");
    else
        console.log("i doesn't equal j"); // OOPS!
}


if (i == j) {
    if (j == k) {
        console.log("i equals k");
    }
} else { // What a difference the location of a curly brace makes!
    console.log("i doesn't equal j");
}

if (n == 1) {
// Execute code block #1
} else if (n == 2) {
// Execute code block #2
} else if (n == 3) {
// Execute code block #3
} else {
// If all else fails, execute block #4
}


if (n == 1) {
// Execute code block #1
} else {
    if (n == 2) {
// Execute code block #2
    } else {
        if (n == 3) {
// Execute code block #3
        } else {
// If all else fails, execute block #4
        }
    }
}

switch (n) {
    case 1: // Start here if n == 1
// Execute code block #1.
        break;
// Stop here
    case 2: // Start here if n == 2
// Execute code block #2.
        break; // Stop here
    case 3: // Start here if n == 3
// Execute code block #3.
        break; // Stop here
    default: // If all else fails...
// Execute code block #4.
        break; // stop here
}


function convert(x) {
    switch (typeof x) {
        case 'number': // Convert the number to a hexadecimal integer
            return x.toString(16);
        case 'string': // Return the string enclosed in quotes
            return '"' + x + '"';
        default: // Convert any other type in the usual way
            return String(x);
    }
}

var count = 0;
while (count < 10) {
    console.log(count);
    count++;
}

function printArray(a) {
    var len = a.length, i = 0;
    if (len == 0)
        console.log("Empty Array");
    else {
        do {
            console.log(a[i]);
        } while (++i < len);
    }
}

for (var count = 0; count < 10; count++)
    console.log(count);


var i, j;
for (i = 0, j = 10; i < 10; i++, j--)
    sum += i * j;


function tail(o) { // Return the tail of linked list o
    for (; o.next; o = o.next) /* empty */ ; // Traverse while o.next is truthy
    return o;
}


for (var i = 0; i < a.length; i++) // Assign array indexes to variable i
    console.log(a[i]); // Print the value of each array element


for (var p in o) // Assign property names of o to variable p
    console.log(o[p]); // Print the value of each property


var o = {x: 1, y: 2, z: 3};
var a = [], i = 0;
for (a[i++] in o) /* empty */;


for (i in a) console.log(i);

for (var i = 0; i < a.length; i++) {
    if (a[i] == target) break;
}


var matrix = getData(); // Get a 2D array of numbers from somewhere
// Now sum all the numbers in the matrix.
var sum = 0, success = false;
// Start with a labeled statement that we can break out of if errors occur
compute_sum: if (matrix) {
    for (var x = 0; x < matrix.length; x++) {
        var row = matrix[x];
        if (!row) break compute_sum;
        for (var y = 0; y < row.length; y++) {
            var cell = row[y];
            if (isNaN(cell)) break compute_sum;
            sum += cell;
        }
    }
    success = true;
}
// The break statements jump here. If we arrive here with success == false


for (i = 0; i < data.length; i++) {
    if (!data[i]) continue; // Can't proceed with undefined data
    total += data[i];
}


function display_object(o) {
// Return immediately if the argument is null or undefined.
    if (!o) return;
// Rest of function goes here...
}


function factorial(x) {
// If the input argument is invalid, throw an exception!
    if (x < 0) throw new Error("x must not be negative");
// Otherwise, compute a value and return normally
    for (var f = 1; x > 1; f *= x, x--) /* empty */ ;
    return f;
}


try {
// Normally, this code runs from the top of the block to the bottom
// without problems. But it can sometimes throw an exception,
// either directly, with a throw statement, or indirectly, by calling
// a method that throws an exception.
} catch (e) {
// The statements in this block are executed if, and only if, the try
// block throws an exception. These statements can use the local variable
// e to refer to the Error object or other value that was thrown.
// This block may handle the exception somehow, may ignore the
// exception by doing nothing, or may rethrow the exception with throw.
} finally {
// This block contains statements that are always executed, regardless of
// what happens in the try block. They are executed whether the try
// block terminates:
// 1) normally, after reaching the bottom of the block
// 2) because of a break, continue, or return statement
// 3) with an exception that is handled by a catch clause above
// 4) with an uncaught exception that is still propagating
}

try {
// Ask the user to enter a number
    var n = Number(prompt("Please enter a positive integer", ""));
// Compute the factorial of the number, assuming the input is valid
    var f = factorial(n);
// Display the result
    alert(n + "! = " + f);
} catch (ex) { // If the user's input was not valid, we end up here
    alert(ex); // Tell the user what the error is
}

with (document.forms[0]) {
// Access form elements directly here. For example:
    name.value = "";
    address.value = "";
    email.value = "";
}

var f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";

with (o) x = 1;

function f(o) {
    if (o === undefined) debugger; // Temporary line for debugging purposes
... // The rest of the function goes here.
}

var hasStrictMode = (function () {
    "use strict";
    return this === undefined
}());