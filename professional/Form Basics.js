Form Basics

❑ method — Indicates whether the browser should sent a GET request or a POST request
❑ action — Indicates the URL to which the form should be submitted
❑ enctype — The way the data should be encoded when sent to the server. The default is
application/x-www-url-encoded , but it may be set to multipart/form - data if the
form is uploading a file.
❑ accept — Lists the mime types the server will handle correctly when a file is uploaded
❑ accept-charset — Lists the character encodings that are accepted by the server when
data is submitted
❑ <input/> —The main HTML input element. The type attribute determines what type of input
control is displayed:
    ❑ “text” — Asingle-line text box
    ❑ “ radio” — Aradio button
    ❑ “checkbox” — Acheck box
    ❑ “file” — Afile upload text box
    ❑ “password” – Apassword text box (where characters are not displayed as you type)
    ❑ “button” — Ageneric button that can be used to cause a custom action
    ❑ “submit” — Abutton whose sole purpose is to submit the form
    ❑ “reset” — Abutton whose sole purpose is to reset all fields in the form to their
    default values
    ❑ “hidden” — An input field that isn’t displayed on screen
    ❑ “image” — An image that is used just like a Submit button
❑ <select/> — Renders either a combo box or a list box composed of values defined by
<option/> elements
❑ <textarea/> — Renders a multiline text box in a size determined by the rows and cols
attributes.



<html>
<head>
<title>Sample Form</title>
</head>
<body>
<form method=”post” action=”handlepost.jsp”>
<!-- regular textbox -->
<label for=”txtName”>Name:</label><br />
<input type=”text” id=”txtName” name=”txtName” /><br />
<!-- password textbox -->
<label for=”txtPassword”>Password:</label><br />
<input type=”password” id=”txtPassword” name=”txtPassword” /><br />
<!-- age comboxbox (drop-down) -->
<label for=”selAge”>Age:</label><br />
<select name=”selAge” id=”selAge”>
<option>18-21</option>
<option>22-25</option>
<option>26-29</option>
<option>30-35</option>
<option>Over 35</option>
</select><br />
<!-- multiline textbox -->
<label for=”txtComments”>Comments:</label><br />
<textarea rows=”10” cols=”50” id=”txtComments”
name=”txtComments”></textarea><br />
<!-- submit button -->
<input type=”submit” value=”Submit Form” />
</form>
</body>
</html>

var oForm = document.getElementById(“form1”);

var oForm = document.forms[0]; //get the first form
var oOtherForm = document.forms[“formZ”]; //get the form whose name is “formZ”
var oFirstField = oForm.elements[0]; //get the first form field
var oTextbox1 = oForm.elements[“textbox1”];//get the field with the name “textbox1”


var oTextbox1 = oForm.textbox1; //get the field with the name “textbox1”
var oTextbox1 = oForm[“text box 1”]; //get the field with the name “text box 1”



❑ The disabled property is used both to indicate whether the control is disabled as well as to
actually disable the control (a disabled control doesn’t allow any user input, but gives no visual
indication that the control is disabled).
❑ The form property is a pointer back to the form of which the field is a part.
❑ The blur() method causes the form field to lose focus (by shifting the focus elsewhere).
❑ The focus() method causes the form field to gain focus (the control is selected for keyboard
interaction).
❑ The blur event occurs when the field loses focus; the onblur event handler is then executed.
❑ The focus event occurs when the field gains focus; the onfocus event handler is then executed.


var oField1 = oForm.elements[0];
var oField2 = oForm.elements[1];
//set the first field to be disabled
oField1.disabled = true;
//set the focus to the second field
oField2.focus();
//is the form property equal to oForm?
alert(oField1.form == oForm); //outputs “true”

document.forms[0].elements[0].focus();
var FormUtil = new Object;



FormUtil.focusOnFirst = function () {
if (document.forms.length > 0) {
//...
}
};



FormUtil.focusOnFirst = function () {
if (document.forms.length > 0) {
for (var i=0; i < document.forms[0].elements.length; i++) {
var oField = document.forms[0].elements[i];
if (oField.type != “hidden”) {
oField.focus();
return;
}
}
}
};


<body onload=”FormUtil.focusOnFirst()”>



<input type=”submit” value=”Submit” /> <!-- submit button -->
<input type=”image” src=”submit.gif” /> <!-- image button -->
<form method=”post” action=”javascript:alert(‘Submitted’)”>

oForm = document.getElementById(“form1”);
oForm = document.forms[“form1”];
oForm = document.forms[0];


oForm.submit();

<input type=”button” value=”Submit Form” onclick=”document.forms[0].submit()” />


function handleSubmit() {
var oEvent = EventUtil.getEvent();
oEvent.preventDefault();
}

<form method=”post” action=”javascript:alert(‘Submitted’)”
onsubmit=”handleSubmit()”>

<input type=”submit” value=”Submit” />

<input type=”button” value=”Submit”
onclick=”this.disabled=true; this.form.submit()” />


<input type=”reset” value=”Reset Values” />

<form method=”post” action=”javascript:alert(‘Submitted’) “ onreset=”alert(‘I am
resetting’) “>


<input type=”button” value=”Reset” onclick=”document.forms[0].reset()” />
<input type=”text” size=”25” maxlength=”50” value=”initial value” />

<textarea rows=”25” cols=”5”>initial value</textarea>


<html>
<head>
<title>Retrieving a Textbox Value Example</title>
<script type=”text/javascript”>
function getValues() {
var oTextbox1 = document.getElementById(“txt1”);
var oTextbox2 = document.getElementById(“txt2”);
alert(“The value of txt1 is \”” + oTextbox1.value + “\”\n” +
“The value of txt2 is \”” + oTextbox2.value + “\””);
}
</script>
</head>
<body>
<input type=”text” size=”12” id=”txt1” /><br />
<textarea rows=”5” cols=”25” id=”txt2”></textarea><br />
<input type=”button” value=”Get Values” onclick=”getValues()” />
</body>
</html>



<html>
<head>
<title>Retrieving a Textbox Length Example</title>
343
Forms and Data Integrity
<script type=”text/javascript”>
function getLengths() {
var oTextbox1 = document.getElementById(“txt1”);
var oTextbox2 = document.getElementById(“txt2”);
alert(“The length of txt1 is “ + oTextbox1.value.length + “\n”
+ “The length of txt2 is “ + oTextbox2.value.length);
}
</script>
</head>
<body>
<input type=”text” size=”12” id=”txt1” /><br />
<textarea rows=”5” cols=”25” id=”txt2”></textarea><br />
<input type=”button” value=”Get Lengths” onclick=”getLengths()” />
</body>
</html>



<html>
<head>
<title>Changing a Textbox Value Example</title>
<script type=”text/javascript”>
function setValues() {
var oTextbox1 = document.getElementById(“txt1”);
var oTextbox2 = document.getElementById(“txt2”);
oTextbox1.value = “first textbox”;
oTextbox2.value = “second textbox”;
}
</script>
</head>
<body>
<input type=”text” size=”12” id=”txt1” /><br />
<textarea rows=”5” cols=”25” id=”txt2”></textarea><br />
<input type=”button” value=”Set Values” onclick=”setValues()” />
</body>
</html>



<html>
<head>
<title>Select Text Example</title>
<script type=”text/javascript”>
function selectText() {
var oTextbox1 = document.getElementById(“txt1”);
oTextbox1.focus();
oTextbox1.select();
}
</script>
</head>
<body>
<input type=”text” size=”12” id=”txt1” value=”initial value” /><br />
<input type=”button” value=”Select Text” onclick=”selectText()” />
</body>
</html>


Textext box events

❑ change — Occurs when the text box loses focus after the user changed the value (does not fire
if you change the value setting the value property).
❑ select — Occurs when one or more characters have been selected, either manually or by
using the select() method.


<input type=”text” name=”textbox1” value=””
onblur=”alert(‘Blur’)” onchange=”alert(‘Change’)”/>

<input type=”text” name=”textbox1” value=”” onselect=”alert(‘Select’)”/>

<input type=”text” onfocus=”this.select()” />
<textarea onfocus=”this.select()”></textarea>



FormUtil.setTextboxes = function() {
var colInputs = document.getElementsByTagName(“input”);
var colTextAreas = document.getElementsByTagName(“textarea”);
for (var i=0; i < colInputs.length; i++){
if (colInputs[i].type == “text” || colInputs [i].type == “password”) {
colInputs[i].onfocus = function () { this.select(); };
}
}
for (var i=0; i < colTextAreas.length; i++){
colTextAreas[i].onfocus = function () { this.select(); };
}
};

<input type=”text” maxlength=”4” />

FormUtil.tabForward = function(oTextbox) {
var oForm = oTextbox.form;
//make sure the textbox is not the last field in the form
if (oForm.elements[oForm.elements.length-1] != oTextbox
&& oTextbox.value.length == oTextbox.getAttribute(“maxlength”)) {
for (var i=0; i < oForm.elements.length; i++) {
if (oForm.elements[i] == oTextbox) {
for(var j=i+1; j < oForm.elements.length; j++) {
if (oForm.elements[j].type != “hidden”) {
oForm.elements[j].focus();
return;
}
}
return;
}
}
}
};



<input type=”text” maxlength=”4” onkeyup=”FormUtil.tabForward(this) “ />


<input type=”text” id=”txtAreaCode” maxlength=”3”
onkeyup=”FormUtil.tabForward(this)” />
<input type=”text” id=”txtExchange” maxlength=”3”
onkeyup=”FormUtil.tabForward(this)” />
<input type=”text” id=”txtNumber” maxlength=”4”
onkeyup=”FormUtil.tabForward(this)” />

<textarea rows=”10” cols=”25” maxlength=”150”></textarea>

var TextUtil = new Object();


TextUtil.isNotMax = function(oTextArea) {
return oTextArea.value.length != oTextArea.getAttribute(“maxlength”);
}


<textarea rows=”10” cols=”25” maxlength=”150”
onkeypress=”return TextUtil.isNotMax(this)”></textarea>
<input type=”text” invalidchars=”0123456789” />

TextUtil.blockChars = function (oTextbox, oEvent) {
oEvent = EventUtil.formatEvent(oEvent);
var sInvalidChars = oTextbox.getAttribute(“invalidchars”);
var sChar = String.fromCharCode(oEvent.charCode);
var bIsValidChar = sInvalidChars.indexOf(sChar) == -1;
return bIsValidChar || oEvent.ctrlKey;
};



<input type=”text” invalidchars=”0123456789”
onkeypress=”return TextUtil.blockChars(this, event) “ />
<textarea rows=”10” cols=”25” invalidchars=”0123456789”
onkeypress=”return TextUtil.blockChars(this, event)” />



<!-- block all numbers -->
<input type=”text” onkeypress=”return FormUtil.block(this, event)”
invalidchars=”0123456789” />
<!-- block all uppercase letters -->
<input type=”text” onkeypress=”return FormUtil.block(this, event) “
invalidchars=”ABCDEFGHIJKLMNOPQRSTUVWXYZ” />
<!-- block all lowercase letters -->
<input type=”text” onkeypress=”return FormUtil.block(this, event)”
invalidchars=”abcdefghijklmnopqrstuvwxyz” />
<!-- block spaces -->
<input type=”text” onkeypress=”return FormUtil.block(this, event)”
invalidchars=” “ />



<input type=”text” validchars=”0123456789” />


TextUtil.allowChars = function (oTextbox, oEvent) {
oEvent = EventUtil.formatEvent(oEvent);
var sValidChars = oTextbox.getAttribute(“validchars”);
var sChar = String.fromCharCode(oEvent.charCode);
var bIsValidChar = sValidChars.indexOf(sChar) > -1;
return bIsValidChar || oEvent.ctrlKey;
};



<input type=”text” validchars=”0123456789”
onkeypress=”return TextUtil.allowChars(this, event)” />
<textarea rows=”10” cols=”25” validchars=”0123456789”
onkeypress=”return TextUtil.allowChars(this, event)” />



<!-- only allow positive integers -->
<input type=”text” validchars=”0123456789”
onkeypress=”return FormUtil.allow(this, event)” />
<!-- only allow “Y” or “N” -->
<input type=”text” validchars=”YN”
onkeypress=”return FormUtil.allow(this, event)” />



<input type=”text” onkeypress=”return allow(this, event) “ validchars=”0123456789”
onpaste=”return false” />


<input type=”text” onkeypress=”return allow(this, event) “ validchars=”0123456789”
onpaste=”return false” oncontextmenu=”return false” />

TextUtil.blockChars = function (oTextbox, oEvent, bBlockPaste) {
oEvent = EventUtil.formatEvent(oEvent);
var sInvalidChars = oTextbox.getAttribute(“invalidchars”);
var sChar = String.fromCharCode(oEvent.charCode);
var bIsValidChar = sInvalidChars.indexOf(sChar) == -1;
if (bBlockPaste) {
return bIsValidChar && !(oEvent.ctrlKey && sChar == “v”);
} else {
return bIsValidChar || oEvent.ctrlKey;
}
};



TextUtil.allowChars = function (oTextbox, oEvent, bBlockPaste) {
oEvent = EventUtil.formatEvent(oEvent);
var sValidChars = oTextbox.getAttribute(“validchars”);
var sChar = String.fromCharCode(oEvent.charCode);
var bIsValidChar = sValidChars.indexOf(sChar) > -1;
if (bBlockPaste) {
return bIsValidChar && !(oEvent.ctrlKey && sChar == “v”);
} else {
return bIsValidChar || oEvent.ctrlKey;
}
};




<input type=”text” validchars=”0123456789”
onpaste=”return false” oncontextmenu=”return false”
onkeypress=”return TextUtil.allowChars(this, event, true)” />
<textarea rows=”10” cols=”25” validchars=”0123456789”
onpaste=”return false” oncontextmenu=”return false”
onkeypress=”return TextUtil.allowChars(this, event, true)” />




TextUtil.blurBlock = function(oTextbox) {
var sInvalidChars = oTextbox.getAttribute(“invalidchars”);
var arrInvalidChars = sInvalidChars.split(“”);
for (var i=0; i< arrInvalidChars.length; i++){
if (oTextbox.value.indexOf(arrInvalidChars[i]) > -1) {
alert(“Character ‘“ + arrInvalidChars[i] + “‘ not allowed.”);
oTextbox.focus();
oTextbox.select();
return;
}
}
};



<input type=”text” onkeypress=”return TextUtil.blockChars(this, event)”
invalidchars=”0123456789” onblur=”TextUtil.blurBlock(this)” />



TextUtil.blurAllow = function(oTextbox) {
var sValidChars = oTextbox.getAttribute(“validchars”);
var arrTextChars = oTextbox.value.split(“”);
for (var i=0; i< arrTextChars.length; i++){
if (sValidChars.indexOf(arrTextChars[i]) == -1) {
alert(“Character ‘“ + arrTextChars[i] + “‘ not allowed.”);
oTextbox.focus();
oTextbox.select();
return;
}
}
};



<input type=”text” onkeypress=”return TextUtil.allowChars(this, event)”
validchars=”0123456789” onblur=”TextUtil.blurAllow(this)” />


TextUtil.numericScroll = function (oTextbox, oEvent) {
oEvent = EventUtil.formatEvent(oEvent);
var iValue = oTextbox.value.length == 0 ? 0 :parseInt(oTextbox.value);
if (oEvent.keyCode == 38) {
oTextbox.value = (iValue + 1);
} else if (oEvent.keyCode == 40){
oTextbox.value = (iValue - 1);
}
};



<input type=”text” onkeypress=”return TextUtil.allowChars(this, event)”
validchars=”0123456789” onblur=”TextUtil.blurAllow(this)”
onkeydown=”TextUtil.numericScroll(this, event)” />



TextUtil.numericScroll = function (oTextbox, oEvent) {
oEvent = EventUtil.formatEvent(oEvent);
var iValue = oTextbox.value.length == 0 ? 0 :parseInt(oTextbox.value);
var iMax = oTextbox.getAttribute(“max”);
var iMin = oTextbox.getAttribute(“min”);
if (oEvent.keyCode == 38) {
if (iMax == null || iValue < parseInt(iMax)) {
oTextbox.value = (iValue + 1);
}
} else if (oEvent.keyCode == 40){

    if (iMin == null || iValue > parseInt(iMin)) {
oTextbox.value = (iValue - 1);
}
}
};



<input type=”text” onkeypress=”return TextUtil.allowChars(this, event)”
validchars=”0123456789” onblur=”TextUtil.blurAllow(this)”
onkeydown=”TextUtil.numericScroll(this, event)”
max=”100” min=”0” />



<select name=”selAge” id=”selAge”>
<option value=”1”>18-21</option>
<option value=”2”>22-25</option>
<option value=”3”>26-29</option>
<option value=”4”>30-35</option>
<option value=”5”>Over 35</option>
</select>



<select name=”selAge” id=”selAge” size=”3”>
<option value=”1”>18-21</option>
<option value=”2”>22-25</option>
<option value=”3”>26-29</option>
<option value=”4”>30-35</option>
<option value=”5”>Over 35</option>
</select>



oListbox = document.getElementById(“selAge”);
oListbox = document.forms[“form1”].selAge;
oListbox = document.forms[0].selAge;


var ListUtil = new Object();

alert(oListbox.options[1].firstChild.nodeValue); //output display text
alert(oListbox.options[1].getAttribute(“value”)); //output value

alert(oListbox.options[1].text); //output display text
alert(oListbox.options[1].value); //output value


alert(oListbox.options[1].index); //outputs “1”
alert(“There are “ + oListbox.options.length + “ in the list.”);


alert(“The index of the selected option is “ + oListbox.selectedIndex);


<select name=”selAge” id=”selAge” size=”3” multiple=”multiple”>
<option value=”1”>18-21</option>
<option value=”2”>22-25</option>
<option value=”3”>26-29</option>
<option value=”4”>30-35</option>
<option value=”5”>Over 35</option>
</select>


ListUtil.getSelectedIndexes = function (oListbox) {
var arrIndexes = new Array;
for (var i=0; i < oListbox.options.length; i++) {
if (oListbox.options[i].selected) {
arrIndexes.push(i);
}
}
return arrIndexes;
};

var oListbox = document.getElementById(“selListbox”);
var arrIndexes = ListUtil.getSelectedIndexes(oListbox);
alert(“There are “ + arrIndexes.length + “ option selected.”
+ “The options have the indexes “ + arrIndexes + “.”);


ListUtil.add = function (oListbox, sName, sValue) {
//...
}


ListUtil.add = function (oListbox, sName, sValue) {
var oOption = document.createElement(“option”);
oOption.appendChild(document.createTextNode(sName));
//...
}

ListUtil.add = function (oListbox, sName, sValue) {
var oOption = document.createElement(“option”);
oOption.appendChild(document.createTextNode(sName));
if (arguments.length == 3) {
oOption.setAttribute(“value”, sValue);
}
//...
}


ListUtil.add = function (oListbox, sName, sValue) {
var oOption = document.createElement(“option”);
oOption.appendChild(document.createTextNode(sName));
if (arguments.length == 3) {
    oOption.setAttribute(“value”, sValue);
}
oListbox.appendChild(oOption);
}




var oListbox = document.getElementById(“selListbox”);
ListUtil.add(oListbox, “New Display Text”); //add option with no value
ListUtil.add(oListbox, “New Display Text 2”, “New value”); //add option with value


oListbox.options[1] = null;

var oListbox = document.getElementById(“selListbox”);
oListbox.remove(0); //remove the first option



ListUtil.remove = function (oListbox, iIndex) {
oListbox.remove(iIndex);
}

var oListbox = document.getElementById(“selListbox”);
ListUtil.remove(oListbox, 0); //remove the first option



ListUtil.clear = function (oListbox) {
for (var i=oListbox.options.length-1; i >= 0; i--) {
ListUtil.remove(oListbox, i);
}
};

ListUtil.move = function (oListboxFrom, oListboxTo, iIndex) {
var oOption = oListboxFrom.options[iIndex];
if (oOption != null) {
oListboxTo.appendChild(oOption);
}
}


var oListbox1 = document.getElementById(“selListbox1”);
var oListbox2 = document.getElementById(“selListbox2”);
ListUtil.move(oListbox1, oListbox2, 0); //move the first option

ListUtil.shiftUp = function (oListbox, iIndex) {
if (iIndex > 0) {
var oOption = oListbox.options[iIndex];
var oPrevOption = oListbox.options[iIndex-1];
oListbox.insertBefore(oOption, oPrevOption);
}
};


ListUtil.shiftDown = function (oListbox, iIndex) {
if (iIndex < oListbox.options.length - 1) {
var oOption = oListbox.options[iIndex];
var oNextOption = oListbox.options[iIndex+1];
oListbox.insertBefore(oNextOption, oOption);
}
};



var oListbox = document.getElementById(“selListbox”);
ListUtil.shiftUp(oListbox,1); //move the option in position 1 up one spot
ListUtil.shiftDown(oListbox,2); //move the option in position 2 down one spot

TextUtil.autosuggestMatch = function (sText, arrValues) {
var arrResult = new Array;
if (sText != “”) {
for (var i=0; i < arrValues.length; i++) {
if (arrValues[i].indexOf(sText) == 0) {
arrResult.push(arrValues[i]);
}
}
}
return arrResult;
};


<input type=”text”
onkeyup=”TextUtil.autosuggest(this, arrValues, ‘lstSuggestions’)” />

TextUtil.autosuggest = function (oTextbox, arrValues, sListboxId) {
var oListbox = document.getElementById(sListboxId);
ListUtil.clear(oListbox);
var arrMatches = TextUtil.autosuggestMatch(oTextbox.value, arrValues);
for (var i=0; i < arrMatches.length; i++) {
ListUtil.add(oListbox, arrMatches[i]);
}
};



<html>
<head>
<title>Autosuggest Textbox Example</title>
<script type=”text/javascript” src=”listutil.js”></script>
<script type=”text/javascript” src=”textutil.js”></script>
<script type=”text/javascript”>
var arrColors = [“red”, “orange”, “yellow”, “green”, “blue”, “indigo”,
“violet”, “brown”, “black”, “tan”, “ivory”, “navy”,
“aqua”, “white”, “purple”, “pink”, “gray”, “silver”];
arrColors.sort();
function setText(oListbox, sTextboxId) {
var oTextbox = document.getElementById(sTextboxId);
if (oListbox.selectedIndex > -1) {
oTextbox.value =
oListbox.options[oListbox.selectedIndex].text;
}
}
</script>
</head>
<body>
<p>Type in a color in lowercase:<br />
<input type=”text” value=”” id=”txtColor”
onkeyup=”TextUtil.autosuggest(this, arrColors, ‘lstColors’)” /><br />
<select id=”lstColors” size=”5” style=”width: 200px”
onclick=”setText(this, ‘txtColor’)”></select>
</p>
</body>
</html>


