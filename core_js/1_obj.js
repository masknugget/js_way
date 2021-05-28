var empty = {}; // An object with no properties
var point = {x: 0, y: 0}; // Two properties
var point2 = {x: point.x, y: point.y + 1}; // More complex values
var book = {
    "main title": "JavaScript", // Property names include spaces,
    'sub-title': "The Definitive Guide", // and hyphens, so use string literals
    "for": "all audiences", // for is a reserved word, so quote
    author: { // The value of this property is
        firstname: "David", // itself an object. Note that
        surname: "Flanagan" // these property names are unquoted.
    }
};

var o = new Object(); // Create an empty object: same as {}.
var a = new Array(); // Create an empty array: same as [].
var d = new Date(); // Create a Date object representing the current time
var r = new RegExp("js"); // Create a RegExp object for pattern matching.


var o1 = Object.create({x: 1, y: 2}); // o1 inherits properties x and y.

var o2 = Object.create(null); // o2 inherits no props or methods.
var o3 = Object.create(Object.prototype); // o3 is like {} or new Object().


// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create) // If Object.create() is defined...
        return Object.create(p); // then just use it.
    var t = typeof p; // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();

    function f() {
    }; // Define a dummy constructor function.
    f.prototype = p; // Set its prototype property to p.
    return new f(); // Use f() to create an "heir" of p.
}

var o = {x: "don't change this value"};
library_function(inherit(o)); // Guard against accidental modifications of o

var author = book.author; // Get the "author" property of the book.
var name = author.surname // Get the "surname" property of the author.
var title = book["main title"] // Get the "main title" property of the book.

book.edition = 6; // Create an "edition" property of book.
book["main title"] = "ECMAScript"; // Set the "main title" property

object.property
object["property"]
var addr = "";
for (i = 0; i < 4; i++) {
    addr += customer["address" + i] + '\n';

    function addstock(portfolio, stockname, shares) {
        portfolio[stockname] = shares;
    }


    function getvalue(portfolio) {
        var total = 0.0;
        for (stock in portfolio) { // For each stock in the portfolio:
            var shares = portfolio[stock]; // get the number of shares
            var price = getquote(stock); // look up share price
            total += shares * price; // add stock value to total value
        }
        return total; // Return total value.
    }


    var o = {} // o inherits object methods from Object.prototype
    o.x = 1; // and has an own property x.
    var p = inherit(o); // p inherits properties from o and Object.prototype
    p.y = 2; // and has an own property y.
    var q = inherit(p); // q inherits properties from p, o, and Object.prototype
    q.z = 3; // and has an own property z.
    var s = q.toString(); // toString is inherited from Object.prototype
    q.x + q.y // => 3: x and y are inherited from o and p

    var unitcircle = {r: 1}; // An object to inherit from
    var c = inherit(unitcircle); // c inherits the property r
    c.x = 1;
    c.y = 1; // c defines two properties of its own
    c.r = 2; // c overrides its inherited property
    unitcircle.r; // => 1: the prototype object is not affected


    book.subtitle; // => undefined: property doesn't exist

// Raises a TypeError exception. undefined doesn't have a length property
    var len = book.subtitle.length;


// A verbose and explicit technique
    var len = undefined;
    if (book) {
        if (book.subtitle) len = book.subtitle.length;
    }
// A concise and idiomatic alternative to get subtitle length or undefined
    var len = book && book.subtitle && book.subtitle.length;

// The prototype properties of built-in constructors are read-only.
    Object.prototype = 0; // Assignment fails silently; Object.prototype unchanged


    delete book.author; // The book object now has no author property.
    delete book["main title"]; // Now it doesn't have "main title", either

    o = {x: 1}; // o has own property x and inherits property toString
    delete o.x; // Delete x, and return true
    delete o.x; // Do nothing (x doesn't exist), and return true
    delete o.toString; // Do nothing (toString isn't an own property), return true
    delete 1; // Nonsense, but evaluates to true


    delete Object.prototype; // Can't delete; property is non-configurable
    var x = 1; // Declare a global variable
    delete this.x; // Can't delete this property
    function f() {
    } // Declare a global function
    delete this.f; // Can't delete this property either

    this.x = 1; // Create a configurable global property (no var)
    delete x; // And delete it

    delete x; // SyntaxError in strict mode
    delete this.x; // This works


    var o = {x: 1}
    "x" in o; // true: o has an own property "x"
    "y" in o; // false: o doesn't have a property "y"
    "toString" in o; // true: o inherits a toString property


    var o = {x: 1}
    o.hasOwnProperty("x"); // true: o has an own property x
    o.hasOwnProperty("y"); // false: o doesn't have a property y
    o.hasOwnProperty("toString"); // false: toString is an inherited property

    var o = inherit({y: 2});
    o.x = 1;
    o.propertyIsEnumerable("x"); // true: o has an own enumerable property x
    o.propertyIsEnumerable("y"); // false: y is inherited, not own
    Object.prototype.propertyIsEnumerable("toString"); // false: not enumerable

    var o = {x: 1}
    o.x !== undefined; // true: o has a property x
    o.y !== undefined; // false: o doesn't have a property y
    o.toString !== undefined; // true: o inherits a toString property


    var o = {x: undefined} // Property is explicitly set to undefined
    o.x !== undefined // false: property exists but is undefined
    o.y !== undefined // false: property doesn't even exist
    "x" in o // true: the property exists
    "y" in o // false: the property doesn't exists
    delete o.x; // Delete the property x
    "x" in o // false: it doesn't exist anymore

// If o has a property x whose value is not null or undefined, double it.
    if (o.x != null) o.x *= 2;
// If o has a property x whose value does not convert to false, double it.
// If x is undefined, null, false, "", 0, or NaN, leave it alone.
    if (o.x) o.x *= 2;


    var o = {x: 1, y: 2, z: 3}; // Three enumerable own properties
    o.propertyIsEnumerable("toString") // => false: not enumerable
    for (p in o) // Loop through the properties
        console.log(p); // Prints x, y, and z, but not toString


    for (p in o) {
        if (!o.hasOwnProperty(p)) continue; // Skip inherited properties
    }

    for (p in o) {
        if (typeof o[p] === "function") continue; // Skip methods
    }

    function extend(o, p) {
        for (prop in p) { // For all props in p.
            o[prop] = p[prop]; // Add the property to o.
        }
        return o;
    }

    /*
    * Copy the enumerable properties of p to o, and return o.
    * If o and p have a property by the same name, o's property is left alone.
    * This function does not handle getters and setters or copy attributes.
    */
    function merge(o, p) {
        for (prop in p) { // For all props in p.
            if (o.hasOwnProperty[prop]) continue; // Except those already in o.
            o[prop] = p[prop]; // Add the property to o.
        }
        return o;
    }

    /*
    * Remove properties from o if there is not a property with the same name in p.
    * Return o.
    */
    function restrict(o, p) {
        for (prop in o) { // For all props in o
            if (!(prop in p)) delete o[prop]; // Delete if not in p
        }
        return o;
    }

    /*
    * For each property of p, delete the property with the same name from o.
    * Return o.
    */
    function subtract(o, p) {
        for (prop in p) { // For all props in p
            delete o[prop]; // Delete from o (deleting a
// nonexistent prop is harmless)
        }
        return o;
    }

    /*
    * Return a new object that holds the properties of both o and p.
    * If o and p have properties by the same name, the values from o are used.
    */
    function union(o, p) {
        return extend(extend({}, o), p);
    }

    /*
    * Return a new object that holds only the properties of o that also appear
    * in p. This is something like the intersection of o and p, but the values of
    * the properties in p are discarded
    */
    function intersection(o, p) {
        return restrict(extend({}, o), p);
    }

    /*
    * Return an array that holds the names of the enumerable own properties of o.
    */
    function keys(o) {
        if (typeof o !== "object") throw TypeError(); // Object argument required
        var result = []; // The array we will return
        for (var prop in o) { // For all enumerable properties
            if (o.hasOwnProperty(prop)) // If it is an own property
                result.push(prop); // add it to the array.
        }
        return result; // Return the array.
    }


    var o = {
// An ordinary data property
        data_prop: value,
// An accessor property defined as a pair of functions
        get accessor_prop() { /* function body here */
        },
        set accessor_prop(value) { /* function body here */
        }
    };


    var p = {
// x and y are regular read-write data properties.
        x: 1.0,
        y: 1.0,
// r is a read-write accessor property with getter and setter.
// Don't forget to put a comma after accessor methods.
        get r() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        set r(newvalue) {
            var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
            var ratio = newvalue / oldvalue;
            this.x *= ratio;
            this.y *= ratio;
        },
// theta is a read-only accessor property with getter only.
        get theta() {
            return Math.atan2(this.y, this.x);
        }
    };

    var q = inherit(p); // Create a new object that inherits getters and setters
    q.x = 0, q.y = 0; // Create q's own data properties
    console.log(q.r); // And use the inherited accessor properties
    console.log(q.theta);

// This object generates strictly increasing serial numbers
    var serialnum = {
// This data property holds the next serial number.
// The $ in the property name hints that it is a private property.
        $n: 0,
// Return the current value and increment it
        get next() {
            return this.$n++;
        },
// Set a new value of n, but only if it is larger than current
        set next(n) {
            if (n >= this.$n) this.$n = n;
            else throw "serial number can only be set to a larger value";
        }
    };


// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
    var random = {
        get octet() {
            return Math.floor(Math.random() * 256);
        },
        get uint16() {
            return Math.floor(Math.random() * 65536);
        },
        get int16() {
            return Math.floor(Math.random() * 65536) - 32768;
        }
    };


// Returns {value: 1, writable:true, enumerable:true, configurable:true}
    Object.getOwnPropertyDescriptor({x: 1}, "x");
// Now query the octet property of the random object defined above.
// Returns { get: /*func*/, set:undefined, enumerable:true, configurable:true}
    Object.getOwnPropertyDescriptor(random, "octet");
// Returns undefined for inherited properties and properties that don't exist.
    Object.getOwnPropertyDescriptor({}, "x"); // undefined, no such prop
    Object.getOwnPropertyDescriptor({}, "toString"); // undefined, inherited


    var o = {}; // Start with no properties at all
// Add a nonenumerable data property x with value 1.
    Object.defineProperty(o, "x", {
        value: 1,
        writable: true,
        enumerable: false,
        configurable: true
    });
// Check that the property is there but is nonenumerable
    o.x; // => 1
    Object.keys(o) // => []
// Now modify the property x so that it is read-only
    Object.defineProperty(o, "x", {writable: false});
// Try to change the value of the property
    o.x = 2; // Fails silently or throws TypeError in strict mode
    o.x // => 1
// The property is still configurable, so we can change its value like this:
    Object.defineProperty(o, "x", {value: 2});
    o.x // => 2
// Now change x from a data property to an accessor property
    Object.defineProperty(o, "x", {
        get: function () {
            return 0;
        }
    });
    o.x // => 0

    var p = Object.defineProperties({}, {
        x: {value: 1, writable: true, enumerable: true, configurable: true},
        y: {value: 1, writable: true, enumerable: true, configurable: true},
        r: {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            enumerable: true,
            configurable: true
        }
    });


    /*
    * Add a nonenumerable extend() method to Object.prototype.
    * This method extends the object on which it is called by copying properties
    * from the object passed as its argument. All property attributes are
    * copied, not just the property value. All own properties (even non-
    * enumerable ones) of the argument object are copied unless a property
    * with the same name already exists in the target object.
    */
    Object.defineProperty(Object.prototype,
        "extend", // Define Object.prototype.extend
        {
            writable: true,
            enumerable: false, // Make it nonenumerable
            configurable: true,
            value: function (o) { // Its value is this function
// Get all own props, even nonenumerable ones
                var names = Object.getOwnPropertyNames(o);
// Loop through them
                for (var i = 0; i < names.length; i++) {
// Skip props already in this object
                    if (names[i] in this) continue;
// Get property description from o
                    var desc = Object.getOwnPropertyDescriptor(o, names[i]);
// Use it to create property on this
                    Object.defineProperty(this, names[i], desc);
                }
            }
        });

    var p = {x: 1}; // Define a prototype object.
    var o = Object.create(p); // Create an object with that prototype.
    p.isPrototypeOf(o) // => true: o inherits from p
    Object.prototype.isPrototypeOf(o) // => true: p inherits from Object.prototype


    function classof(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    classof(null) // => "Null"
    classof(1) // => "Number"
    classof("") // => "String"
    classof(false) // => "Boolean"
    classof({}) // => "Object"
    classof([]) // => "Array"
    classof(/./) // => "Regexp"
    classof(new Date()) // => "Date"
    classof(window) // => "Window" (a client-side host object)
    function f() {
    }; // Define a custom constructor
    classof(new f()); // => "Object"


// Create a sealed object with a frozen prototype and a nonenumerable property
    var o = Object.seal(Object.create(Object.freeze({x: 1}),
        {y: {value: 2, writable: true}}));

    o = {x: 1, y: {z: [false, null, ""]}}; // Define a test object
    s = JSON.stringify(o); // s is '{"x":1,"y":{"z":[false,null,""]}}'
    p = JSON.parse(s); // p is a deep copy of o

    var s = {x: 1, y: 1}.toString();
