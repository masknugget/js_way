# XML in JavaScript

var oXmlDom = new ActiveXObject(“Microsoft.XmlDom”);



function createXMLDOM() {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
}


oXmlDom.loadXML(“<root><child/></root>”);
oXmlDom.async = false;
oXmlDom.load(“test.xml”);



alert(“Tag name of the root element is “ + oXmlDom.documentElement.tagName);
alert(“The root element has this many children: “ +
oXmlDom.documentElement.childNodes.length);


❑ 0 — The DOM hasn’t been initialized with any information.
❑ 1 — The DOM is loading data.
❑ 2 — The DOM has completed loading the data.
❑ 3 — The DOM may be used although some sections may not be available.
❑ 4 — The DOM is completely loaded and ready to be used.



oXmlDom.onreadystatechange = function () {
if (oXmlDom.readyState == 4) {
alert(“Done”);
}
};


oXmlDom.onreadystatechange = function () {
if (oXmlDom.readyState == 4) {
alert(“Done”);
}
};
oXmlDom.load(“test.xml”);



oXmlDom.load(“test.xml”);
oXmlDom.load(“../test.xml”);
oXmlDom.load(“http://www.mydomain.com/test.xml”);


oXmlDom.load(“test.xml”);
alert(oXmlDom.xml);



var oNode = oXmlDom.documentElements.childNodes[1];
alert(oNode.xml);



❑ errorCode — Numeric code indicating the type of error that occurred (0 when there’s no error)
❑ filePos — Position within the file where the error occurred
❑ line — The line on which the error occurred
❑ linepos – The character on the line where the error occurred
❑ reason — Aplain text explanation of the error
❑ srcText — The code that caused the error
❑ url — The URL of the file that caused the error (if available)

if (oXmlDom.parseError != 0) {
//there were errors, do something about it here
}



if (oXmlDom.parseError != 0) {
var oError = oXmlDom.parseError;
alert(“An error occurred:\nError Code: “
+ oError.errorCode + “\n”
+ “Line: “ + oError.line + “\n”
+ “Line Pos: “ + oError.linepos + “\n”
+ “Reason: “ + oError.reason);
}




if (oXmlDom.parseError != 0) {
var oError = oXmlDom.parseError;
throw new Error(oError.reason + “ (at line “ + oError.line
+ “, position “ + oError.linepos + “)”);
}


var oXmlDom = document.implementation.createDocument(“”,””, null);


var oXmlDom = document.implementation.createDocument(“”,”root”, null);


var oXmlDom = document.implementation.createDocument(“http://www.wrox.com”,
“root”, null);


oXmlDom.async = false;
oXmlDom.load(“test.xml”);

oXmlDom.onload = function () {
alert(“Done”);
};
oXmlDom.load(“test.xml”);



var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(“<root/>”, “text/xml”);


Document.prototype.loadXML = function (sXml) {
//function body
};


Document.prototype.loadXML = function (sXml) {
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
//...
};


Document.prototype.loadXML = function (sXml) {
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
while (this.firstChild) {
this.removeChild(this.firstChild);
}
//...
};




Document.prototype.loadXML = function (sXml) {
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
while (this.firstChild) {
this.removeChild(this.firstChild);
}
for (var i=0; i < oXmlDom.childNodes.length; i++) {
var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
this.appendChild(oNewNode);
}
};


var oSerializer = new XMLSerializer();
var sXml = oSerializer.serializeToString(oXmlDom, “text/xml”);

var sValue = oXmlNode.nodeValue; //read mode
oXmlNode.nodeValue = “New value”; //write mode


oObject.__defineGetter__(“propertyName”, function() { return “propertyValue”; });

oObject.propertyName = “blue”;
oObject.__defineGetter__(“propertyName”, function() { return “propertyValue”; });


Node.prototype.__defineGetter__(“xml”, function () {
var oSerializer = new XMLSerializer();
return oSerializer.serializeToString(this, “text/xml”);
});



oXmlDom.load(“test.xml”);
alert(oXmlDom.xml);
var oNode = oXmlDom.documentElements.childNodes[1];
alert(oNode.xml);


var oParser = new DOMParser()
var oXmlDom = oParser.parseFromString(“<root><child></root>”);


if (oXmlDom.documentElement.tagName != “parsererror”) {
//continue on, no errors
} else {
//do something else, there was an error
}




var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column
(\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;



var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column
(\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;
if (oXmlDom.documentElement.tagName == “parsererror”) {
reError.test(oXmlDom.xml);
alert(“An error occurred:\nDescription: “
+ RegExp.$1 + “\n”
+ “File: “ + RegExp.$2 + “\n”
+ “Line: “ + RegExp.$3 + “\n”
+ “Line Pos: “ + RegExp.$4 + “\n”
+ “Source: “ + RegExp.$5);
}



var oXmlDom = new XmlDom();


function XmlDom() {
if (window.ActiveXObject) {
//IE-specific code
} else if (document.implementation && document.implementation.createDocument) {
//DOM-specific code
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}




function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
//DOM-specific code
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}


function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
var oXmlDom = document.implementation.createDocument(“”,””,null);
return oXmlDom;
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}



Document.prototype.readyState = 0;
Document.prototype.onreadystatechange = null;

Document.prototype.__changeReadyState__ = function (iReadyState) {
this.readyState = iReadyState;
if (typeof this.onreadystatechange == “function”) {
this.onreadystatechange();
}
};



Document.prototype.loadXML = function (sXml) {
this.__changeReadyState__(1);
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
while (this.firstChild) {
this.removeChild(this.firstChild);
}
for (var i=0; i < oXmlDom.childNodes.length; i++) {
var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
this.appendChild(oNewNode);
}
this.__changeReadyState__(4);
};


Document.prototype.__load__ = Document.prototype.load;


Document.prototype.load = function (sURL) {
this.__changeReadyState__(1);
this.__load__(sURL);
};


function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {

    var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
var oXmlDom = document.implementation.createDocument(“”,””,null);
oXmlDom.addEventListener(“load”, function () {
this.__changeReadyState__(4);
}, false);
return oXmlDom;
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}



var oXmlDom = new XmlDom();
oXmlDom.onreadystatechange = function () {
if (oXmlDom.readyState == 4) {
alert(oXmlDom.xml);
}
};
oXmlDom.load(“test.xml”);


function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
var oXmlDom = document.implementation.createDocument(“”,””,null);
oXmlDom.parseError = {
valueOf: function () { return this.errorCode; },
toString: function () { return this.errorCode.toString() }
};
oXmlDom.__initError__();
oXmlDom.addEventListener(“load”, function () {
this.__changeReadyState__(4);
}, false);
return oXmlDom;
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}



Document.prototype.__initError__ = function () {
this.parseError.errorCode = 0;
this.parseError.filepos = -1;
this.parseError.line = -1;
this.parseError.linepos = -1;
this.parseError.reason = null;
this.parseError.srcText = null;
this.parseError.url = null;
};



Document.prototype.__checkForErrors__ = function () {
if (this.documentElement.tagName == “parsererror”) {
var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column
(\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;
reError.test(this.xml);
this.parseError.errorCode = -999999;
this.parseError.reason = RegExp.$1;
this.parseError.url = RegExp.$2;
this.parseError.line = parseInt(RegExp.$3);
this.parseError.linepos = parseInt(RegExp.$4);
this.parseError.srcText = RegExp.$5;
}
};



function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
var oXmlDom = document.implementation.createDocument(“”,””,null);
oXmlDom.parseError = {
valueOf: function () { return this.errorCode; },
toString: function () { return this.errorCode.toString() }
};
oXmlDom.__initError__();
oXmlDom.addEventListener(“load”, function () {
this.__initError__();
this.__changeReadyState__(4);
}, false);
return oXmlDom;
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}
Document.prototype.load = function (sURL) {
this.__initError__();
this.__changeReadyState__(1);
this.__load__(sURL);
};
Document.prototype.loadXML = function (sXml) {
this.__initError__();
this.__changeReadyState__(1);
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
while (this.firstChild) {
this.removeChild(this.firstChild);
}
for (var i=0; i < oXmlDom.childNodes.length; i++) {
var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
this.appendChild(oNewNode);
}
this.__checkForErrors__();
this.__changeReadyState__(4);
};




var oXmlDom = new XmlDom();
oXmlDom.onreadystatechange = function () {
if (oXmlDom.readyState == 4) {
if (oXmlDom.parseError != 0) {
var oError = oXmlDom.parseError;
alert(“An error occurred:\nError Code: “
+ oError.errorCode + “\n”
+ “Line: “ + oError.line + “\n”
+ “Line Pos: “ + oError.linepos + “\n”
+ “Reason: “ + oError.reason);
}
}
};
oXmlDom.load(“errors.xml”);




function XmlDom() {
if (window.ActiveXObject) {
var arrSignatures = [“MSXML2.DOMDocument.5.0”, “MSXML2.DOMDocument.4.0”,
“MSXML2.DOMDocument.3.0”, “MSXML2.DOMDocument”,
“Microsoft.XmlDom”];
for (var i=0; i < arrSignatures.length; i++) {
try {
var oXmlDom = new ActiveXObject(arrSignatures[i]);
return oXmlDom;
} catch (oError) {
//ignore
}
}
throw new Error(“MSXML is not installed on your system.”);
} else if (document.implementation && document.implementation.createDocument) {
    var oXmlDom = document.implementation.createDocument(“”,””,null);
oXmlDom.parseError = {
valueOf: function () { return this.errorCode; },
toString: function () { return this.errorCode.toString() }
};
oXmlDom.__initError__();
oXmlDom.addEventListener(“load”, function () {
this.__checkForErrors__();
this.__changeReadyState__(4);
}, false);
return oXmlDom;
} else {
throw new Error(“Your browser doesn’t support an XML DOM object.”);
}
}
if (isMoz) {
Document.prototype.readyState = 0;
Document.prototype.onreadystatechange = null;
Document.prototype.__changeReadyState__ = function (iReadyState) {
this.readyState = iReadyState;
if (typeof this.onreadystatechange == “function”) {
this.onreadystatechange();
}
};
Document.prototype.__initError__ = function () {
this.parseError.errorCode = 0;
this.parseError.filepos = -1;
this.parseError.line = -1;
this.parseError.linepos = -1;
this.parseError.reason = null;
this.parseError.srcText = null;
this.parseError.url = null;
};
Document.prototype.__checkForErrors__ = function () {
if (this.documentElement.tagName == “parsererror”) {
var reError = />([\s\S]*?)Location:([\s\S]*?)Line Number (\d+), Column
(\d+):<sourcetext>([\s\S]*?)(?:\-*\^)/;
reError.test(this.xml);
this.parseError.errorCode = -999999;
this.parseError.reason = RegExp.$1;
this.parseError.url = RegExp.$2;
this.parseError.line = parseInt(RegExp.$3);
this.parseError.linepos = parseInt(RegExp.$4);
this.parseError.srcText = RegExp.$5;
}
};
Document.prototype.loadXML = function (sXml) {
this.__initError__();
this.__changeReadyState__(1);
var oParser = new DOMParser();
var oXmlDom = oParser.parseFromString(sXml, “text/xml”);
while (this.firstChild) {
this.removeChild(this.firstChild);
}
for (var i=0; i < oXmlDom.childNodes.length; i++) {
var oNewNode = this.importNode(oXmlDom.childNodes[i], true);
this.appendChild(oNewNode);
}
this.__checkForErrors__();
this.__changeReadyState__(4);
};
Document.prototype.__load__ = Document.prototype.load;
Document.prototype.load = function (sURL) {
this.__initError__();
this.__changeReadyState__(1);
this.__load__(sURL);
};
Node.prototype.__defineGetter__(“xml”, function () {
var oSerializer = new XMLSerializer();
return oSerializer.serializeToString(this, “text/xml”);
});




<?xml version=”1.0”?>
<employees>
<employee title=”Software Engineer”>
<name>Nicholas C. Zakas</name>
</employee>
<employee title=”Salesperson”>
<name>Jim Smith</name>
</employee>
</employees>


employee[position() = 1]/name

employee[@title = “Salesperson”]

var lstNodes = oXmlDom.documentElement.selectNodes(“employee/name”);

for (var i=0; i < lstNodes.length; i++) {
alert(lstNodes[i]);
}

var oElement = oXmlDom.documentElement.selectSingleNode(“employee/name”);

❑ XPathResult.ANY_TYPE — Returns the type of data appropriate for the XPath expression
❑ XPathResult.ANY_UNORDERED_NODE_TYPE — Returns a node set of matching nodes,
although the order may not match the order of the nodes within the document
❑ XPathResult.BOOLEAN_TYPE — Returns a Boolean value
❑ XPathResult.FIRST_ORDERED_NODE_TYPE — Returns a node set with only one node, which
is the first matching node in the document
❑ XPathResult.NUMBER_TYPE — Returns a number value
❑ XPathResult.ORDERED_NODE_ITERATOR_TYPE — Returns a node set of matching nodes in
the order in which they appear in the document. This is the most commonly used result type.
❑ XPathResult.ORDERED_NODE_SNAPSHOT_TYPE — Returns a node set snapshot, capturing the
nodes outside of the document so that any further document modification doesn’t affect the
node list. The nodes in the node set are in the same order as they appear in the document.
❑ XPathResult.STRING_TYPE — Returns a string value
❑ XPathResult.UNORDERED_NODE_ITERATOR_TYPE — Returns a node set of matching nodes,
although the order may not match the order of the nodes within the document
❑ XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE — Returns a node set snapshot, capturing the
nodes outside of the document so that any further document modification doesn’t affect the node
set. The nodes in the node set are not necessarily in the same order as they appear in the document.


var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
if (oResult != null) {
var oElement = oResult.iterateNext();
while(oElement) {
alert(oElement.tagName);
oElement = oResult.iterateNext();
}
}


Element.prototype.selectNodes = function (sXPath) [
var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(sXPath, this, null,
XPathResult.ORDERED_NODE_ITERATOR_TYPE,
null);
var aNodes = new Array;
if (oResult != null) {
var oElement = oResult.iterateNext();
while(oElement) {
aNodes.push(oElement);
oElement = oResult.iterateNext();
}
}
return aNodes;
};



var aNodes = oXmlDom.documentElement.selectNodes(“employee/name”);
for (var i=0; i < aNodes.length; i++) {
alert(aNodes[i].xml);
}


var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (oResult != null) {
for (var i=0; i < oResult.snapshotLength; i++) {
alert(oResult.snapshotItem(i).tagName);
}
}

var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null);
alert(oResult.singleNodeValue.xml);


Element.prototype.selectSingleNode = function (sXPath) {
var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(sXPath, this, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (oResult != null) {
return oResult.singleNodeValue;
} else {
return null;
}
}

var oNode = oXmlDom.documentElement.selectSingleNode(“employee/name”);
alert(oNode);



var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.BOOLEAN_TYPE, null);
alert(oResult.booleanValue);

var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“count(employee/name)”, oXmlDom.documentElement,
null, XPathResult.BOOLEAN_TYPE, null);
alert(oResult.numberValue);



var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.STRING_TYPE, null);
alert(oResult.stringValue);


var oEvaluator = new XPathEvaluator();
var oResult = oEvaluator.evaluate(“employee/name”, oXmlDom.documentElement, null,
XPathResult.STRING_TYPE, null);
if (oResult != null) {
switch(oResult.resultType) {
case XPath.STRING_TYPE:
//handle string type
break;
case XPath.NUMBER_TYPE:
//handle number type
break;
case XPath.BOOLEAN_TYPE:
//handle boolean type
break;
case XPath.UNORDERED_NODE_ITERATOR_TYPE:
//handle unordered node iterator type
break;
default:
//handle other possible result types
}
}


