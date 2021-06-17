CSS Style Attribute JavaScript Style Property
background-color style.backgroundColor
color style.color
font style.font
font-family style.fontFamily
font-weight style.fontWeight



var oDiv = document.getElementById(“div1”);
oDiv.style.border = “1px solid black”;



<html>
<head>
<title>Style Example</title>
<script type=”text/javascript”>
function sayStyle() {
var oDiv = document.getElementById(“div1”);
alert(oDiv.style.backgroundColor);
}
</script>
</head>
<body>
<div id=”div1” style=”background-color: red; height: 50px; width:
50px”></div><br />
<input type=”button” value=”Get Background Color” onclick=”sayStyle()” />
</body>
</html>



<html>
<head>
<title>Style Example</title>
</head>
<body>
<div id=”div1”
style=”background-color: red; height: 50px; width: 50px”
onmouseover=”this.style.backgroundColor = ‘blue’”
onmouseout=”this.style.backgroundColor = ‘red’”></div>
</body>
</html>




<html>
<head>
<title>Style Example</title>
</head>
<body>
<div id=”div1”
style=”background-color: red; height: 50px; width: 50px”
onclick=”alert(this.style.cssText)”></div>
</body>
</html>


DOM style methods
❑ getPropertyValue(propertyName) — Returns the string value of the CSS property
propertyName . The property must be specified in CSS style, such as “background-color”
instead of “backgroundColor” .
❑ getPropertyPriority() — Returns the string “important” if the CSS property
“!important” is specified in the rule; otherwise it returns an empty string
❑ item(index) — Returns the name of the CSS property at the given index , such as
“background-color”
❑ removeProperty(propertyName) — Removes propertyName from the CSS definition
❑ setProperty(propertyName, value, priority) — Sets the CSS property propertyName
to value with the given priority (either “important” or an empty string)


<html>
<head>
<title>Style Example</title>
<script type=”text/javascript”>
function useMethods() {
var oDiv = document.getElementById(“div1”);
alert(oDiv.style.item(0)); //outputs “background-color”
alert(oDiv.style.getPropertyValue(“background-color”));
alert(oDiv.style.removeProperty(“background-color”);
}
</script>
</head>
<body>
<div id=”div1” style=”background-color: red; height: 50px; width:
50px”></div><br />
<input type=”button” value=”Use Methods” onclick=”useMethods()” />
</body>
</html>





<html>
<head>
<title>Style Example</title>
<script type=”text/javascript”>
function sayStyle() {
var oDiv = document.getElementById(“div1”);
alert(oDiv.style.getPropertyValue(“background-color”));
}
</script>
</head>
<body>
<div id=”div1” style=”background-color: red; height: 50px; width:
50px”></div><br />
<input type=”button” value=”Get Background Color” onclick=”sayStyle()” />
</body>
</html>




<html>
<head>
<title>Style Example</title>
</head>
<body>
<div id=”div1”
style=”background-color: red; height: 50px; width: 50px”
onmouseover=”this.style.setProperty(‘background-color’, ‘blue’, ‘’)”
onmouseout=”this.style.setProperty(‘background-color’, ‘red’, ‘’)”>
</div>
</body>
</html>


<a href=”http://www.wrox.com” title=”Wrox Site”>Wrox</a>




<html>
<head>
<title>Style Example</title>
<script type=”text/javascript”>
function showTip(oEvent) {
var oDiv = document.getElementById(“divTip1”);
oDiv.style.visibility = “visible”;
oDiv.style.left = oEvent.clientX + 5;
oDiv.style.top = oEvent.clientY + 5;
}
function hideTip(oEvent) {
var oDiv = document.getElementById(“divTip1”);
oDiv.style.visibility = “hidden”;
}
</script>
</head>
<body>
<p>Move your mouse over the red square.</p>
<div id=”div1”
style=”background-color: red; height: 50px; width: 50px”
onmouseover=”showTip(event)” onmouseout=”hideTip(event)”></div>
<div id=”divTip1”
style=”background-color: yellow; position: absolute; visibility:
hidden; padding: 5px”>
<span style=”font-weight: bold”>Custom Tooltip</span><br />
More details can go here.
</div>
</body>
</html>



<html>
<head>
<title>Style Example</title>
<script type=”text/javascript”>
function toggle(sDivId) {
var oDiv = document.getElementById(sDivId);
oDiv.style.display = (oDiv.style.display == “none”) ? “block” :
“none”;
}
</script>
</head>
<body>
<div style=”background-color: blue; color: white; font-weight: bold;
padding: 10px; cursor: pointer”
onclick=”toggle(‘divContent1’)”>Click Here</div>
<div style=”border: 3px solid blue; height: 100px; padding: 10px”
id=”divContent1”>This is some content
to show and hide.</div>
<p>&nbsp;</p>
<div style=”background-color: blue; color: white; font-weight: bold;
padding: 10px; cursor: pointer”
onclick=”toggle(‘divContent2’)”>Click Here</div>
<div style=”border: 3px solid blue; height: 100px; padding: 10px”
id=”divContent2”>This is some content
to show and hide.</div>
</body>
</html>




<html>
<head>
<title>Runtime Style Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function getBackgroundColor() {
var oDiv = document.getElementById(“div1”);
alert(oDiv.style.backgroundColor);
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<input type=”button” value=”Get Background Color”
onclick=”getBackgroundColor()” />
</body>
</html>


var oCSSRules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}


<html>
<head>
<title>Accessing Style Sheets Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function getBackgroundColor() {
var oCSSRules = document.styleSheets[0].cssRules ||
document.styleSheets[0].rules;
alert(oCSSRules[0].style.backgroundColor);
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<input type=”button” value=”Get Background Color”
onclick=”getBackgroundColor()” />
</body>
</html>



<html>
<head>
<title>Accessing Style Sheets Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function changeBackgroundColor() {
var oCSSRules = document.styleSheets[0].cssRules ||
document.styleSheets[0].rules;
oCSSRules[0].style.backgroundColor = “blue”;
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<div id=”div2” class=”special”></div>
<div id=”div3” class=”special”></div>
<input type=”button” value=”Change Background Color”
onclick=”changeBackgroundColor()” />
</body>
</html>




<html>
<head>
<title>Accessing Style Sheets Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function changeBackgroundColor() {
var oDiv = document.getElementById(“div1”);
oDiv.style.backgroundColor = “blue”;
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<div id=”div2” class=”special”></div>
<div id=”div3” class=”special”></div>
<input type=”button” value=”Change Background Color”
onclick=”changeBackgroundColor()” />
</body>
</html>




<html>
<head>
<title>Computed Style Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function getBackgroundColor() {
var oDiv = document.getElementById(“div1”);
alert(oDiv.currentStyle.backgroundColor);
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<input type=”button” value=”Get Background Color”
onclick=”getBackgroundColor()” />
</body>
</html>



<html>
<head>
<title>Computed Style Example</title>
<style type=”text/css”>
div.special {
background-color: red;
height: 10px;
width: 10px;
margin: 10px;
}
</style>
<script type=”text/javascript”>
function getBackgroundColor() {
var oDiv = document.getElementById(“div1”);
alert(document.defaultView.getComputedStyle(oDiv,
null).backgroundColor);
}
</script>
</head>
<body>
<div id=”div1” class=”special”></div>
<input type=”button” value=”Get Background Color”
onclick=”getBackgroundColor()” />
</body>
</html>



oDiv.appendChild(document.createTextNode(“New text for the div.”));
oDiv.innerText = “New text for the div.”;
oDiv.innerText = “New text for the <div/>.”;

var oStrong = document.createElement(“strong”);
oStrong.appendChild(document.createTextNode(“Hello”));
var oEm = document.createElement(“em”);
oEm.appendChild(document.createTextNode(“World”));
oDiv.appendChild(oStrong);
oDiv.appendChild(document.createTextNode(“”)); //space between “Hello” and “World”
oDiv.appendChild(oEm);

oDiv.innerHTML = “<strong>Hello</strong> <em>World</em>”;

oDiv.innerText = oDiv.innerText;
oDiv.outerText = “Hello world!”;

var oText = document.createTextNode(“Hello world! “);
var oDivParent = oDiv.parentNode;
oDivParent.replaceChild(oText, oDiv);
oDiv.outerHTML = “<p>This is a paragraph.</p>”;


var oP = document.createElement(“p”);
oP.appendChild(document.createTextNode(“This is a paragraph. “));
var oDivParent = oDiv.parentNode;
oDivParent.replaceChild(oP, oDiv);



<div>Hello world</div> “Hello world” “<div>Hello world</div>”
<div><b>Hello</b>
world</div> “Hello world” “<div><b>Hello</b> world</div>”
<div><span></span></div> “” “<div><span></span></div>”



<html>
<head>
<title>OuterText Example</title>
<style type=”text/css”>
div.special {

    background-color: red;
padding: 10px;
}
</style>
<script type=”text/javascript”>
function useOuterText() {
var oDiv = document.getElementById(“div1”);
oDiv.outerText = oDiv.outerText;
alert(document.getElementById(“div1”));
}
</script>
</head>
<body>
<div id=”div1” class=”special”>This is my original text</div>
<input type=”button” value=”Use OuterText” onclick=”useOuterText()” />
</body>
</html>


var oRange = document.createRange();
var supportsDOMRanges = document.implementation.hasFeature(“Range”, “2.0”);

if (supportsDOMRange) {
var oRange = document.createRange();
//range code here
}

<p id=”p1”><b>Hello</b> World</p>

var oRange1 = document.createRange();
var oRange2 = document.createRange();
var oP1 = document.getElementById(“p1”);
oRange1.selectNode(oP1);
oRange2.selectNodeContents(oP1);


<html>
<head>
<title>DOM Range Example</title>
<script type=”text/javascript”>
function useRanges() {
var oRange1 = document.createRange();
var oRange2 = document.createRange();
var oP1 = document.getElementById(“p1”);
oRange1.selectNode(oP1);
oRange2.selectNodeContents(oP1);
document.getElementById(“txtStartContainer1”).value =
oRange1.startContainer.tagName;
document.getElementById(“txtStartOffset1”).value =
oRange1.startOffset;
document.getElementById(“txtEndContainer1”).value =
oRange1.endContainer.tagName;
document.getElementById(“txtEndOffset1”).value = oRange1.endOffset;
document.getElementById(“txtCommonAncestor1”).value =
oRange1.commonAncestorContainer.tagName;
document.getElementById(“txtStartContainer2”).value =
oRange2.startContainer.tagName;
document.getElementById(“txtStartOffset2”).value =
oRange2.startOffset;
document.getElementById(“txtEndContainer2”).value =
oRange2.endContainer.tagName;
document.getElementById(“txtEndOffset2”).value = oRange2.endOffset;
document.getElementById(“txtCommonAncestor2”).value =
oRange2.commonAncestorContainer.tagName;
}
</script>
</head>
<body><p id=”p1”><b>Hello</b> World</p>
<input type=”button” value=”Use Ranges” onclick=”useRanges()” />
<table border=”0”>
<tr>
<td>
<fieldset>
<legend>oRange1</legend>
Start Container: <input type=”text” id=”txtStartContainer1”
/><br />
Start Offset: <input type=”text” id=”txtStartOffset1” /><br />
End Container: <input type=”text” id=”txtEndContainer1” /><br
/>
End Offset: <input type=”text” id=”txtEndOffset1” /><br />
Common Ancestor: <input type=”text” id=”txtCommonAncestor1”
/><br />
</fieldset>
</td>
<td>
<fieldset>
<legend>oRange2</legend>
Start Container: <input type=”text” id=”txtStartContainer2”
/><br />
Start Offset: <input type=”text” id=”txtStartOffset2” /><br />
End Container: <input type=”text” id=”txtEndContainer2” /><br
/>
End Offset: <input type=”text” id=”txtEndOffset2” /><br />
Common Ancestor: <input type=”text” id=”txtCommonAncestor2”
/><br />
</fieldset>
</td>
</tr>
</table>
</body>
</html>


function useRanges() {
var oRange1 = document.createRange();
var oRange2 = document.createRange();
var oP1 = document.getElementById(“p1”);
var iP1Index = -1;
for (var i=0; i < oP1.parentNode.childNodes.length; i++) {
if (oP1.parentNode.childNodes[i] == oP1) {
iP1Index = i;
break;
}
}
oRange1.setStart(oP1.parentNode, iP1Index);
oRange1.setEnd(oP1.parentNode, iP1Index + 1);
oRange2.setStart(oP1, 0);
oRange2.setEnd(oP1, oP1.childNodes.length);
//textbox assignments here
}

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;
var oRange = document.createRange();
oRange.setStart(oHello, 2);
oRange.setEnd(oWorld, 3);


<p><b>He</b>rld</p>

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;
var oRange = document.createRange();
oRange.setStart(oHello, 2);
oRange.setEnd(oWorld, 3);
var oFragment = oRange.extractContents();
document.body.appendChild(oFragment);

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;
var oRange = document.createRange();
oRange.setStart(oHello, 2);
oRange.setEnd(oWorld, 3);
var oFragment = oRange.cloneContents();
document.body.appendChild(oFragment);

<span style=”color: red”>Inserted text</span>

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;
var oRange = document.createRange();
var oSpan = document.createElement(“span”);
oSpan.style.color = “red”;
oSpan.appendChild(document.createTextNode(“Inserted text”));
oRange.setStart(oHello, 2);
oRange.setEnd(oWorld, 3);
oRange.insertNode(oSpan);

<p id=”p1”><b>He<span style=”color: red”>Inserted text</span>llo</b> World</p>

var oP1 = document.getElementById(“p1”);
var oHello = oP1.firstChild.firstChild;
var oWorld = oP1.lastChild;
var oRange = document.createRange();
var oSpan = document.createElement(“span”);
oSpan.style.backgroundColor = “yellow”;
oRange.setStart(oHello, 2);
oRange.setEnd(oWorld, 3);
oRange.surroundContents(oSpan);

oRange.collapse(true); //collapse to the starting point
alert(oRange.collapsed); //outputs “true”

<p id=”p1”>Paragraph 1</p><p id=”p2”>Paragraph 2</p>

var oP1 = document.getElementById(“p1”);
var oP2 = document.getElementById(“p2”);
var oRange = document.createRange();
oRange.setStartAfter(oP1);
oRange.setStartBefore(oP2);
alert(oRange.collapsed); //outputs “true”


❑ START_TO_START (0) — Compares the starting point of the first range to the starting point of
the second
❑ START_TO_END (1) — Compares the starting point of the first range to the end point of the
second
❑ END_TO_END (2) — Compares the end point of the first range to the end point of the second.
❑ END_TO_START (3) — Compares the end point of the first range to the start point of the second


var oRange1 = document.createRange();
var oRange2 = document.createRange();
var oP1 = document.getElementById(“p1”);
oRange1.selectNodeContents(oP1);
oRange2.selectNodeContents(oP1);
oRange2.setEndBefore(oP1.lastChild);
alert(oRange1.compareBoundaryPoints(Range.START_TO_START, oRange2)); //outputs 0
alert(oRange1.compareBoundaryPoints(Range.END_TO_END, oRange2)); //outputs 1

var oNewRange = oRange.cloneRange();
oRange.detach();
var oRange = document.body.createTextRange();

<p id=”p1”><b>Hello</b> World</p>
var oRange = document.body.createTextRange();
var bFound = oRange.findText(“Hello”);

alert(bFound);
alert(oRange.text)


var bFound = oRange.findText(“Hello”);
var bFoundAgain = oRange.findText(“Hello”, 1);


var oRange = document.body.createTextRange();
var oP1 = document.getElementById(“p1”);
oRange.moveToElementText(oP1);

alert(oRange.htmlText);
var oCommonAncestor = oRange.parentElement();


❑ “character” — Moves a point by one character
❑ “word” — Moves a point by one word (a sequence of non-whitespace characters)
❑ “sentence” — Moves a point by one sentence (a sequence of characters ending with a period,
question mark, or exclamation point)
❑ “textedit” — Moves a point to the start or end of the current range selection

oRange.moveStart(“word”, 2); //move the start point by two words
oRange.moveEnd(“character”, 1); //move the ending point by two words
oRange.move(“character”, 5); //move over five characters



var oRange = document.body.createTextRange();
oRange.findText(“Hello”);
oRange.text = “Howdy”;

<p id=”p1”><b>Howdy</b> World</p>

var oRange = document.body.createTextRange();
oRange.findText(“Hello”);
oRange.pasteHTML(“<em>Howdy</em>”);

<p id=”p1”><b><em>Howdy</em></b> World</p>
oRange.collapse(true);

var bIsCollapsed = (oRange.boundingWidth == 0);


var oRange1 = document.body.createTextRange();
var oRange2 = document.body.createTextRange();
oRange1.findText(“Hello World”);
oRange2.findText(“Hello”);
alert(oRange1.compareEndPoints(“StartToStart”, oRange2)); //outputs 0
alert(oRange1.compareEndPoints(“EndToEnd”, oRange2)); //outputs 1;

var oRange1 = document.body.createTextRange();
var oRange2 = document.body.createTextRange();
oRange1.findText(“Hello World”);
oRange2.findText(“Hello”);
alert(“oRange1.isEqual(oRange2): “ + oRange1.isEqual(oRange2)); //outputs “false”
alert(“oRange1.inRange(oRange2): “ + oRange1.inRange(oRange2)); //outputs “true”
var oNewRange = oRange.duplicate();


