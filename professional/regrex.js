var reCat = new RegExp(“cat”);
var reCat = new RegExp(“cat”, “g”);
var reCat = new RegExp(“cat”, “gi”);

var reCat = /cat/gi;

var sToMatch = “cat”;
var reCat = /cat/;
alert(reCat.test(sToMatch)); //outputs “true”

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reAt = /at/;
var arrMatches = reAt.exec(sToMatch);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reAt = /at/g;
var arrMatches = reAt.exec(sToMatch);
var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reAt = /at/gi;
var arrMatches = reAt.exec(sToMatch);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reAt = /at/gi;
var arrMatches = sToMatch.match(reAt);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reAt = /at/gi;
alert(sToMatch.search(reAt)); //outputs “3”

var sToChange = “The sky is red. “;
alert(sToChange.replace(“red”, “blue”)); //outputs “The sky is blue.”

var sToChange = “The sky is red.”;
var reRed = /red/;
alert(sToChange.replace(reRed, “blue”)); //outputs “The sky is blue. “


var sToChange = “The sky is red.”;
var reRed = /red/;
var sResultText = sToChange.replace(reRed, function(sMatch) {
return “blue”;
});
alert(sResultText); //outputs “The sky is blue.”

var sColor = “red,blue,yellow,green”;
var arrColors = sColor.split(“,”); //split at each comma

var sColor = “red,blue,yellow,green”;
var reComma = /\,/;
var arrColors = sColor.split(reComma); //split at each comma

var reQMark = /\?/;
var reQMark = new RegExp(“\\?”);

var sColor = “blue”;
var reB = /\x62/;
alert(reB.test(sColor)); //outputs “true”

var sColor = “blue”;
var reB = /\142/;
alert(reB.test(sColor)); //outputs “true”


var sColor = “blue”;
var reB = /\u0062/;
alert(reB.test(sColor)); //outputs “true”

var sColor = “blue”;
var reB = new RegExp(“\\u0062”)/;
alert(reB.test(sColor)); //outputs “true”

var sNewString = sStringWithNewLines.replace(/\n/g, “”);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reBatCatRat = /[bcf]at/gi;
var arrMatches = sToMatch.match(reBatCatRat);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reBatCatRat = /[\u0062cf]at/gi;
var arrMatches = sToMatch.match(reBatCatRat);

var sToMatch = “a bat, a Cat, a fAt baT, a faT cat”;
var reBatCatRat = /[^bc]at/gi;
var arrMatches = sToMatch.match(reBatCatRat);

var sToMatch = “num1, num2, num3, num4, num5, num6, num7, num8, num9”;
var reOneToFour = /num[1-4]/gi;
var arrMatches = sToMatch.match(reOneToFour);

[a-m1-4\n]

var sToMatch = “567 9838 abc”;
var reThreeNums = /[0-9][0-9][0-9]/;
alert(reThreeNums.test(sToMatch)); //outputs “true”

var sToMatch = “567 9838 abc”;
var reThreeNums = /\d\d\d/;
alert(reThreeNums.test(sToMatch)); //outputs “true”


var reBreadReadOrRed = /b?rea?d/;


Regular Expression Matches
ba?d “bd”, “bad”
ba*d “bd”, “bad”, “baad”, “baaad”
ba+d “bad”, “baad”, “baad”
ba{0,1}d “bd”, “bad”
ba{0,}d “bd”, “bad”, “baad”, “baaad”
ba{1,}d “bad”, “baad”, “baad”


var reBeadBaedBeedBaadBedBad = /b[ae]{1,2}d/;


var sToMatch =”abbbaabbbaaabbb1234”;
var re1 = /.*bbb/g; //greedy
var re2 = /.*?bbb/g; //reluctant
var re3 = /.*+bbb/g; //possessive

re1.test(“abbbaabbbaaabbb1234”); //false - no match
re1.test(“abbbaabbbaaabbb123”); //false - no match
re1.test(“abbbaabbbaaabbb12”); //false - no match
re1.test(“abbbaabbbaaabbb1”); //false - no match
re1.test(“abbbaabbbaaabbb”); //true – match!

re2.test(“a”); //false - no match
re2.test(“ab”); //false - no match
re2.test(“abb”); //false - no match
re2.test(“abbb”); //true – match!
//store this result and start with next letter
re2.test(“a”); //false - no match
re2.test(“aa”); //false - no match
re2.test(“aab”); //false - no match
re2.test(“aabb”); //true – match!
re2.test(“aabbb”); //true – match!
//store this result and start with next letter
re2.test(“a”); //false - no match
re2.test(“aa”); //false - no match
re2.test(“aaa”); //false - no match
re2.test(“aaab”); //true – match!
re2.test(“aaabb”); //false - no match
re2.test(“aaabbb”); //true – match!
//store this result and start with next letter
re2.test(“1”); //false - no match
re2.test(“12”); //false - no match
re2.test(“123”); //false - no match
re2.test(“1234”); //false - no match

re3.test(“abbbaabbbaaabbb1234”); //false – no match


var reDogDog = /dogdog/g;
var reDogDog = /(dog){2}/g;

var re1 = /(dog)?/; //match zero or one occurrences of “dog”
var re2 = /(dog)*/; //match zero or more occurrences of “dog”
var re3 = /(dog)+/; //match one or more occurrences of “dog”

var re = /([bd]ad?)*/; //match zero or more occurrences of “ba”, “da”, “bad”, or
“dad”

var re = /(mom( and dad)?)/; //match “mom” or “mom and dad”
var reExtraSpace = /^\s+(.*?)\s+$/;


String.prototype.trim = function () {
var reExtraSpace = /^\s+(.*?)\s+$/;
return this.replace(reExtraSpace, “$1”);
};



var sTest = “ this is a test “;
alert(“[“ + sTest + “]”); //outputs “ [ this is a test ] “
alert(“[“ + sTest.trim() + “]”); //outputs “ [this is a test]”

var sToMatch = “#123456789”;
var reNumbers = /#(\d+)/;
reNumbers.test(sToMatch);
alert(RegExp.$1); //outputs “123456789”

var sToMatch = “dogdog”;
var reDogDog = /(dog)\1/;
alert(reDogDog.test(sToMatch)); //outputs “true”

var sToChange = “1234 5678”;
var reMatch = /(\d{4}) (\d{4})/;
var sNew = sToChange.replace(reMatch, “$2 $1”);
alert(sNew); //outputs “5678 1234”

var sToMatch1 = “red”;
var sToMatch2 = “black”;
var reRed = /red/;
var reBlack = /black/;
alert(reRed.test(sToMatch1) || reBlack.test(sToMatch1)); //outputs “true”
alert(reRed.test(sToMatch2) || reBlack.test(sToMatch2)); //outputs “true”

var sToMatch1 = “red”;
var sToMatch2 = “black”;
var reRedOrBlack = /(red|black)/;
alert(reRedOrBlack.test(sToMatch1)); //outputs “true”
alert(reRedOrBlack.test(sToMatch2)); //outputs “true”



var sToMatch1 = “red”;
var sToMatch2 = “black”;
var sToMatch3 = “green”;
var reRedOrBlack = /(red|black|green)/;
alert(reRedOrBlack.test(sToMatch1)); //outputs “true”
alert(reRedOrBlack.test(sToMatch2)); //outputs “true”
alert(reRedOrBlack.test(sToMatch3)); //outputs “true”


var reBadWords = /badword|anotherbadword/gi;
var sUserInput = “This is a string using badword1 and badword2.”;
var sFinalText = sUserInput.replace(reBadWords, function(sMatch) {
return sMatch.replace(/./g, “*”);
});
alert(sFinalText); //output “This is a string using ******* and **************”

var sToMatch = “#123456789”;
var reNumbers = /#(?:\d+)/;
reNumbers.test(sToMatch);
alert(RegExp.$1); //outputs “”

var sToMatch = “#123456789”;
var reNumbers = /#(?:\d+)/;
alert(sToMatch.replace(reNumbers, “abcd$1”)); //outputs “abcd$1”

var reTag = /<(?:.|\s)*?>/g

String.prototype.stripHTML = function () {
var reTag = /<(?:.|\s)*?>/g;
return this.replace(reTag, “”);
};


var sTest = “<b>This would be bold</b>”;
alert(sTest.stripHTML()); //outputs “This would be bold”


var sToMatch1 = “bedroom”;
var sToMatch2 = “bedding”;
var reBed = /(bed(?=room))/;
alert(reBed.test(sToMatch1)); //outputs “true”
alert(RegExp.$1); //outputs “bed”
alert(reBed.test(sToMatch2)); //outputs “false”

var sToMatch1 = “bedroom”;
var sToMatch2 = “bedding”;
var reBed = /(bed(?!room))/;
alert(reBed.test(sToMatch1)); //outputs “false”
alert(reBed.test(sToMatch2)); //outputs “true”
alert(RegExp.$1); //outputs “bed”


Boundary Description
^ Beginning of the line
$ End of the line
\b Word boundary
\B Non-word boundary


var sToMatch = “Important word is the last one.”;
var reLastWord = /(\w+)\.$/;
reLastWord.test(sToMatch);
alert(RegExp.$1); //outputs “one”

var sToMatch = “Important word is the last one.”;
var reFirstWord = /^(\w+)/;
reFirstWord.test(sToMatch);
alert(RegExp.$1); //outputs “Important”


var sToMatch = “Important word is the last one.”;
var reFirstWord = /^(.+?)\b/;
reFirstWord.test(sToMatch);
alert(RegExp.$1); //outputs “Important”

var sToMatch = “First second third fourth fifth sixth”
var reWords = /\b(\S+?)\b/g;
var arrWords = sToMatch.match(reWords);

var sToMatch = “First second third fourth fifth sixth”
var reWords = /(\w+)/g;
var arrWords = sToMatch.match(reWords);

var sToMatch = “First second\nthird fourth\nfifth sixth”
var reLastWordOnLine = /(\w+)$/g;
var arrWords = sToMatch.match(reLastWordOnLine);

var sToMatch = “First second\nthird fourth\nfifth sixth”
var reLastWordOnLine = /(\w+)$/gm;
var arrWords = sToMatch.match(reLastWordOnLine);

var sToMatch = “First second\nthird fourth\nfifth sixth”
var reFirstWordOnLine = /^(\w+)/gm;
var arrWords = sToMatch.match(reFirstWordOnLine);


var reTest = /[ba]*/i;
alert(reTest.global); //outputs “false”
alert(reTest.ignoreCase); //outputs “true”
alert(reTest.multiline); //outputs “false”
alert(reTest.source); //outputs “[ba]*”


var sToMatch = “bbq is short for barbecue”;
var reB = /b/g;
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “1”
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “2”
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “18”
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “21”

var sToMatch = “bbq is short for barbecue”;
var reB = /b/g;
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “1”
reB.lastIndex = 0;
reB.exec(sToMatch);
alert(reB.lastIndex); //outputs “1”

var sToMatch = “this has been a short, short summer”;
var reShort = /(s)hort/g;
reS.test(sToMatch);
alert(RegExp.input); //outputs “this has been a short, short summer”
alert(RegExp.leftContext); //outputs “this has been a “
alert(RegExp.rightContext); //outputs “, short summer”
alert(RegExp.lastMatch); //outputs “short”
alert(RegExp.lastParen); //outputs “s”


var sToMatch = “this has been a short, short summer”;
var reShort = /(s)hort/g;
reShort.test(sToMatch);
alert(RegExp.$_); //outputs “this has been a short, short summer”
alert(RegExp[“$`”]); //outputs “this has been a “
alert(RegExp[“$’”]); //outputs “, short summer”
alert(RegExp[“$&”]); //outputs “short”
alert(RegExp[“$+”]); //outputs “s”

var sToMatch1 = “this has been a short, short summer”;
var sToMatch2 = “this has been a long, long summer”;
var reShort = /(s)hort/g;
var reLong = /(l)ong/g;
reShort.test(sToMatch1);
alert(RegExp.$_); //outputs “this has been a short, short summer”
alert(RegExp[“$`”]); //outputs “this has been a “
alert(RegExp[“$’”]); //outputs “, short summer”
alert(RegExp[“$&”]); //outputs “short”
alert(RegExp[“$+”]); //outputs “s”
reLong.test(sToMatch1);
alert(RegExp.$_); //outputs “this has been a long, long summer”
alert(RegExp[“$`”]); //outputs “this has been a “
alert(RegExp[“$’”]); //outputs “, long summer”
alert(RegExp[“$&”]); //outputs “long”
alert(RegExp[“$+”]); //outputs “l”

var sToMatch = “First second\nthird fourth\nfifth sixth”
var reLastWordOnLine = /(\w+)$/g;
RegExp.multiline = true;
var arrWords = sToMatch.match(reLastWordOnLine);



❑ Dates
❑ Credit Cards
❑ URLs
❑ E-mail Addresses
❑ m/d/yyyy (such as 6/13/2004)
❑ mmmm d, yyyy (such as January 12, 2004)


var reDate = /\d{1,2}\/\d{1,2}\/\d{4}/;
var reDay = /[0-3]?[0-9]/;
var reDay = /0[1-9]|[12][0-9]|3[01]/;
var reMonth = /0[1-9]|1[0-2]/;
var reYear = /19|20\d{2}/;

var reDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;

function isValidDate(sText) {
var reDate = /(?:0[1-9]|[12][0-9]|3[01])\/(?:0[1-9]|1[0-2])\/(?:19|20\d{2})/;
return reDate.test(sText);
}

alert(isValidDate(“5/5/2004”)); //outputs “true”
alert(isValidDate(“10/12/2009”)); //outputs “true”
alert(isValidDate(“6/13/2000”)); //outputs “false”

var reMasterCard = /^5[1-5]\d{14}$/;
var reMasterCard = /^5[1-5]\d{2}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}$/;
var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;


function isValidMasterCard(sText) {
var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;
if (reMasterCard.test(sText)) {
var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;
//Luhn algorithm here
} else {
return false;
}
}

function luhnCheckSum(sCardNum) {
var iOddSum = 0;
var bIsOdd = true;
for (var i=sCardNum.length-1; i >= 0; i--) {
var iNum = parseInt(sCardNum.charAt(i));
if (bIsOdd) {
iOddSum += iNum;
}
bIsOdd = !bIsOdd;
}
}



function luhnCheckSum(sCardNum) {
var iOddSum = 0;
var iEvenSum = 0;
var bIsOdd = true;
for (var i=sCardNum.length-1; i >= 0; i--) {
var iNum = parseInt(sCardNum.charAt(i));
if (bIsOdd) {
iOddSum += iNum;
} else {
iNum = iNum * 2;
if (iNum > 9) {
iNum = eval(iNum.toString().split(“”).join(“+”));
}
iEvenSum += iNum;
}
bIsOdd = !bIsOdd;
}
}



function luhnCheckSum(sCardNum) {
var iOddSum = 0;
var iEvenSum = 0;
var bIsOdd = true;
for (var i=sCardNum.length-1; i >= 0; i--) {
var iNum = parseInt(sCardNum.charAt(i));
if (bIsOdd) {
iOddSum += iNum;
} else {
iNum = iNum * 2;
if (iNum > 9) {
iNum = eval(iNum.toString().split(“”).join(“+”));
}
iEvenSum += iNum;
}
bIsOdd = !bIsOdd;
}
return ((iEvenSum + iOddSum) % 10 == 0);
}



function isValidMasterCard(sText) {
var reMasterCard = /^(5[1-5]\d{2})[\s\-]?(\d{4})[\s\-]?(\d{4})[\s\-]?(\d{4})$/;
if (reMasterCard.test(sText)) {
var sCardNum = RegExp.$1 + RegExp.$2 + RegExp.$3 + RegExp.$4;
return luhnCheckSum(sCardNum);
} else {
return false;
}
}

alert(isValidMasterCard(“5432 1234 5678 9012”)); //outputs “false”
alert(isValidMasterCard(“5432-1234-5678-9012”)); //outputs “false”
alert(isValidMasterCard(“5432123456789012”)); //outputs “false”

var reVisa = /^(4\d{12}(?:\d{3})?)$/;

function isValidVisa(sText) {
var reVisa = /^(4\d{12}(?:\d{3})?)$/;
if (reVisa.test(sText)) {
return luhnCheckSum(RegExp.$1);
} else {
return false;
}
}

❑ john@somewhere.com
❑ john.doe@somewhere.com
❑ John Doe <john.doe@somewhere.com>
❑ “john.doe”@somewhere.com
❑ john@[10.1.3.1]

var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;

function isValidEmail(sText) {
var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
return reEmail.test(sText);
}


alert(“john.doe@somewhere.com”); //outputs “true”
alert(“john.doe@somewhere.”); //outputs “false”
