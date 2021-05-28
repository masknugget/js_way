const pi = 3.14; // Define a constant and give it a value.
pi = 4; // Any future assignments to it are silently ignored.
const pi = 4; // It is an error to redeclare a constant.
var pi = 4; // This is also an error.


function oddsums(n) {
    let total = 0, result = []; // Defined throughout the function
    for (let x = 1; x <= n; x++) { // x is only defined in the loop
        let odd = 2 * x - 1; // odd only defined in this loop
        total += odd;
        result.push(total);
    }
// Using x or odd here would cause a ReferenceError
    return result;
}

oddsums(5); // Returns [1,4,9,16,25]

o = {x: 1, y: 2};
for (let p in o) console.log(p); // Prints x and y
for each(let v in o
)
console.log(v); // Prints 1 and 2
console.log(p) // ReferenceError: p is not defined

let x = 1;
for (let x = x + 1; x < 5; x++)
    console.log(x); // Prints 2,3,4

{ // Begin a block to create a new variable scope
    let x = x + 1; // x is undefined, so x+1 is NaN
    console.log(x); // Prints NaN
}

let x = 1, y = 2;
let (x = x + 1,y = x + 2) { // Note that we're shadowing variables
    console.log(x + y); // Prints 5
}
;
console.log(x + y); // Prints 3
let x = 1, y = 2;
console.log(let (x = x + 1,y = x + 2) x + y); // Prints 5

let [x, y] = [1, 2]; // Same as let x=1, y=2
[x, y] = [x + 1, y + 1]; // Same as x = x + 1, y = y+1
[x, y] = [y, x]; // Swap the value of the two variables
console.log([x, y]); // Prints [3,2]


// Convert [x,y] coordinates to [r,theta] polar coordinates
function polar(x, y) {
    return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
}

// Convert polar to Cartesian coordinates
function cartesian(r, theta) {
    return [r * Math.cos(theta), r * Math.sin(theta)];
}

let [r, theta] = polar(1.0, 1.0); // r=Math.sqrt(2), theta=Math.PI/4
let [x, y] = cartesian(r, theta); // x=1.0, y=1.0

let [x, y] = [1]; // x = 1, y = undefined
[x, y] = [1, 2, 3]; // x = 1, y = 2
[, x, , y] = [1, 2, 3, 4]; // x = 2, y = 4

let first, second, all;
all = [first, second] = [1, 2, 3, 4]; // first=1, second=2, all=[1,2,3,4]
let [one, [twoA, twoB]] = [1, [2, 2.5], 3]; // one=1, twoA=2, twoB=2.5


let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1.0}; // A RGBA color
let {r: red, g: green, b: blue} = transparent; // red=0.0,green=0.0,blue=0.0

// Same as let sin=Math.sin, cos=Math.cos, tan=Math.tan
let {sin: sin, cos: cos, tan: tan} = Math;


// A nested data structure: an object that contains an array of objects
let data = {
    name: "destructuring assignment",
    type: "extension",
    impl: [{engine: "spidermonkey", version: 1.7},
        {engine: "rhino", version: 1.7}]
};
// Use destructuring assignment to extract four values from the data structure
let ({name: feature, impl: [{engine: impl1, version: v1}, {engine: impl2}]} = data) {
    console.log(feature); // Prints "destructuring assignment"
    console.log(impl1); // Prints "spidermonkey"
    console.log(v1); // Prints 1.7
    console.log(impl2); // Prints "rhino"
}


let o = {one: 1, two: 2, three: 3}
for (let p in o) console.log(p); // for/in: prints 'one', 'two', 'three'
for each(let v in o
)
console.log(v); // for/each: prints 1, 2, 3

a = ['one', 'two', 'three'];
for (let p in a) console.log(p); // Prints array indexes 0, 1, 2
for each(let v in a
)
console.log(v); // Prints array elts 'one', 'two', 'three'

// A function that returns an iterator;
function counter(start) {
    let nextValue = Math.round(start); // Private state of the iterator
    return {
        next: function () {
            return nextValue++;
        }
    }; // Return iterator obj
}

let serialNumberGenerator = counter(1000);
let sn1 = serialNumberGenerator.next(); // 1000
let sn2 = serialNumberGenerator.next(); // 1001


// A function that returns an iterator for a range of integers
function rangeIter(first, last) {
    let nextValue = Math.ceil(first);
    return {
        next: function () {
            if (nextValue > last) throw StopIteration;
            return nextValue++;
        }
    };
}

// An awkward iteration using the range iterator.
let r = rangeIter(1, 5); // Get an iterator object
while (true) { // Now use it in a loop
    try {
        console.log(r.next()); // Try to call its next() method
    } catch (e) {
        if (e == StopIteration) break; // Exit the loop on StopIteration
        else throw e;
    }
}


// Return an iterable object that represents an inclusive range of numbers
function range(min, max) {
    return { // Return an object representing a range.
        get min() {
            return min;
        }, // The range's bounds are immutable.
        get max() {
            return max;
        }, // and stored in the closure.
        includes: function (x) { // Ranges can test for membership.
            return min <= x && x <= max;
        },
        toString: function () { // Ranges have a string representation.
            return "[" + min + "," + max + "]";
        },
        __iterator__: function () { // The integers in a range are iterable.
            let val = Math.ceil(min); // Store current position in closure.
            return { // Return an iterator object.
                next: function () { // Return next integer in the range.
                    if (val > max) // If we're past the end then stop.
                        throw StopIteration;
                    return val++; // Otherwise return next and increment.
                }
            };
        }
    };
}

// Here's how we can iterate over a range:
for (let i in range(1, 10)) console.log(i); // Prints numbers from 1 to 10

for (let [k, v] in Iterator({a: 1, b: 2})) // Iterate keys and values
    console.log(k + "=" + v); // Prints "a=1" and "b=2"

o = {x: 1, y: 2} // An object with two properties
Object.prototype.z = 3; // Now all objects inherit z
for (p in o) console.log(p); // Prints "x", "y", and "z"
for (p in Iterator(o, true)) console.log(p); // Prints only "x" and "y"


// Define a generator function for iterating over a range of integers
function range(min, max) {
    for (let i = Math.ceil(min); i <= max; i++) yield i;
}

// Invoke the generator function to obtain a generator, then iterate it.
for (let n in range(3, 8)) console.log(n); // Prints numbers 3 through 8


// A generator function that yields the Fibonacci sequence
function fibonacci() {
    let x = 0, y = 1;
    while (true) {
        yield y;
        [x, y] = [y, x + y];
    }
}

// Invoke the generator function to obtain a generator.
f = fibonacci();
// Use the generator as an iterator, printing the first 10 Fibonacci numbers.
for (let i = 0; i < 10; i++) console.log(f.next());

f.close();

// A generator to yield the lines of the string s one at a time.
// Note that we don't use s.split(), because that would process the entire
// string at once, allocating an array, and we want to be lazy instead.
function eachline(s) {
    let p;
    while ((p = s.indexOf('\n')) != -1) {
        yield s.substring(0, p);
        s = s.substring(p + 1);
    }
    if (s.length > 0) yield s;
}

// A generator function that yields f(x) for each element x of the iterable i
function map(i, f) {
    for (let x in i) yield f(x);
}

// A generator function that yields the elements of i for which f(x) is true
function select(i, f) {
    for (let x in i) {
        if (f(x)) yield x;
    }
}

// Start with a string of text to process
let text = " #comment \n \n hello \nworld\n quit \n unreached \n";
// Now build up a pipeline of generators to process it.
// First, break the text into lines
let lines = eachline(text);
// Next, trim whitespace from the start and end of each line
let trimmed = map(lines, function (line) {
    return line.trim();
});
// Finally, ignore blank lines and comments
let nonblank = select(trimmed, function (line) {
    return line.length > 0 && line[0] != "#"
});
// Now pull trimmed and filtered lines from the pipeline and process them,
// stopping when we see the line "quit".
for (let line in nonblank) {
    if (line === "quit") break;
    console.log(line);
}

// A generator function that counts from an initial value.
// Use send() on the generator to specify an increment.
// Use throw("reset") on the generator to reset to the initial value.
// This is for example only; this use of throw() is bad style.
function counter(initial) {
    let nextValue = initial; // Start with the initial value
    while (true) {
        try {
            let increment = yield nextValue; // Yield a value and get increment
            if (increment) // If we were sent an increment...
                nextValue += increment; // ...then use it.
            else nextValue++; // Otherwise increment by 1
        } catch (e) { // We get here if someone calls
            if (e === "reset") // throw() on the generator
                nextValue = initial;
            else throw e;
        }
    }
}

let c = counter(10); // Create the generator at 10
console.log(c.next()); // Prints 10
console.log(c.send(2)); // Prints 12
console.log(c.throw("reset")); // Prints 10

let evensquares = [x * x
for (x in range(0, 10)) if (x % 2 === 0)]
let evensquares = [];
for (x in range(0, 10)) {
    if (x % 2 === 0)
        evensquares.push(x * x);
}


data = [2, 3, 4, -5]; // An array of numbers
squares = [x * x
for each(x in data)]
; // Square each one: [4,9,16,25]
// Now take the square root of each non-negative element
roots = [Math.sqrt(x)
for each(x in data) if (x >= 0)]
// Now we'll create arrays of property names of an object
o = {
    a: 1, b: 2, f: function () {
    }
}
let allkeys = [p
for (p in o)]
let ownkeys = [p
for (p in o) if (o.hasOwnProperty(p))]
let notfuncs = [k
for ([k, v] in Iterator(o)) if (typeof v !== "function")]

function map(i, f) { // A generator that yields f(x) for each element of i
    for (let x in i) yield f(x);
}

let h = (f(x) for (x in g));
let lines = eachline(text);
let trimmed = (l.trim() for (l in lines));
let nonblank = (l for (l in trimmed) if (l.length > 0 && l[0] != '#'));

let succ = function (x)
x + 1, yes = function ()
true, no = function ()
false;

// Sort an array in reverse numerical order
data.sort(function (a, b)
b - a
)
;
// Define a function that returns the sum of the squares of an array of data
let sumOfSquares = function (data)
Array.reduce(Array.map(data, function (x)
x * x
),

function (x, y)

x + y
)
;


try {
// multiple exception types can be thrown here
    throw 1;
} catch (e if e instanceof ReferenceError) {
// Handle reference errors here
} catch (e if e
===
"quit"
)
{
// Handle the thrown string "quit"
}
catch
(e
if typeof e === "string") {
// Handle any other thrown strings here
}
catch
(e)
{
// Handle anything else here
}
finally
{
// The finally clause works as normal
}

// Create an XML object
var pt =
<
periodictable >
< element
id = "1" > < name > Hydrogen < /name></
element >
< element
id = "2" > < name > Helium < /name></
element >
< element
id = "3" > < name > Lithium < /name></
element >
< /periodictable>;
// Add a new element to the table
pt.element +=
<
element
id = "4" > < name > Beryllium < /name></
element >;

pt =
<
periodictable > < /periodictable>; /
/ Start with empty table
var elements = ["Hydrogen", "Helium", "Lithium"]; // Elements to add
// Create XML tags using array contents
for (var n = 0; n < elements.length; n++) {
    pt.element +=
<
    element
    id = {n+1} > < name > {elements[n]} < /name></
    element >;
}

pt.element += new XML('<element id="5"><name>Boron</name></element>');
pt.element += new XMLList('<element id="6"><name>Carbon</name></element>' +
    '<element id="7"><name>Nitrogen</name></element>');

var elements = pt.element; // Evaluates to a list of all <element> tags
var names = pt.element.name; // A list of all <name> tags
var n = names[0]; // "Hydrogen": content of <name> tag 0.

// Here is another way to get a list of all <name> tags
var names2 = pt..name;
// Get all descendants of all <element> tags.
// This is yet another way to get a list of all <name> tags. var
names3 = pt.element. *;

// What is the atomic number of Helium?
var atomicNumber = pt.element[1].@id;


/ A list of all attributes of all <element> tags
var atomicNums = pt.element.@ *;


// it includes only those whose id attribute is < 3
var lightElements = pt.element.(@id < 3);
// Start with a list of all <element> tags and filter so it includes only
// those whose names begin with "B". Then make a list of the <name> tags
// of each of those remaining <element> tags.
var bElementNames = pt.element.(name.charAt(0) == 'B').name;

// Print the names of each element in the periodic table
for each(var e
in
pt.element
)
{
    console.log(e.name);
}
// Print the atomic numbers of the elements
for each(var n
in
pt.element.@ *
)
console.log(n);

pt.element[0].@symbol = "H";
pt.element[0].weight = 1.00794;

delete pt.element[0].@symbol; // delete an attribute
delete pt..weight; // delete all <weight> tags

pt.insertChildBefore(pt.element[1],
< element
id = "1" > < name > Deuterium < /name></
element >
)
;

// Declare the default namespace using a "default xml namespace" statement:
default
xml
namespace = "http://www.w3.org/1999/xhtml";
// Here's an xhtml document that contains some svg tags, too:
d =
<
html >
< body >
This
is
a
small
red
square:
    <
svg
xmlns = "http://www.w3.org/2000/svg"
width = "10"
height = "10" >
    < rect
x = "0"
y = "0"
width = "10"
height = "10"
fill = "red" / >
    < /svg>
    < /body>
    < /html>
// The body element and its namespace uri and its local name
var tagname = d.body.name();
var bodyns = tagname.uri;
var localname = tagname.localName;
// Selecting the <svg> element is trickier because it is not in the
// default namespace. So create a Namespace object for svg, and use the
// :: operator to add a namespace to a tagname
var svg = new Namespace('http://www.w3.org/2000/svg');
var color = d..svg::rect.@fill // "red"