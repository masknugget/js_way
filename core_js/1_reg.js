var pattern = /s$/;
var pattern = new RegExp("s$");


/\d{2,4}/ // Match between two and four digits
/\w{3}\d?/ // Match exactly three word characters and an optional digit
/\s+java\s+/ // Match "java" with one or more spaces before and after
/[^(]*/ // Match zero or more characters that are not open parenthesis
"JavaScript".search(/script/i);


// No matter how it is capitalized, replace it with the correct capitalization
text.replace(/javascript/gi, "JavaScript");


// nonquotation-mark characters (which we remember), followed
// by another quotation mark.
var quote = /"([^"]*)"/g;
// Replace the straight quotation marks with curly quotes,
// leaving the quoted text (stored in $1) unchanged.
text.replace(quote, '“$1”');


var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var result = text.match(url);
if (result != null) {
    var fullurl = result[0]; // Contains "http://www.example.com/~david"
    var protocol = result[1]; // Contains "http"
    var host = result[2]; // Contains "www.example.com"
    var path = result[3]; // Contains "~david"
}

"123,456,789".split(","); // Returns ["123","456","789"]
"1, 2, 3, 4, 5".split(/\s*,\s*/); // Returns ["1","2","3","4","5"]

// Find all five-digit numbers in a string. Note the double \\ in this case.
var zipcode = new RegExp("\\d{5}", "g");


var pattern = /Java/g;
var text = "JavaScript is more fun than Java!";
var result;
while ((result = pattern.exec(text)) != null) {
    alert("Matched '" + result[0] + "'" +
        " at position " + result.index +
        "; next search begins at " + pattern.lastIndex);
}

var pattern = /java/i;
pattern.test("JavaScript"); // Returns true