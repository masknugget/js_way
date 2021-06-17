XML

❑ Document — The very top-level node to which all other nodes are attached
❑ DocumentType — The object representation of a DTD reference using the syntax <!DOCTYPE > ,
such as <!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.0 Transitional//EN”> . It can-
not contain child nodes.
❑ DocumentFragment — Can be used like a Document to hold other nodes
❑ Element — Represents the contents of a start tag and end tag, such as <tag></tag> or
<tag/> . This node type is the only one that can contain attributes as well as child nodes.
❑ Attr — Represents an attribute name-value pair. This node type cannot have child nodes.
❑ Text — Represents plain text in an XML document contained within start and end tags or
inside of a CData Section. This node type cannot have child nodes.
❑ CDataSection — The object representation of <![CDATA[ ]]> . This node type can have only
text nodes as child nodes.
❑ Entity — Represents an entity definition in a DTD, such as <!ENTITY foo “foo”> . This
node type cannot have child nodes.
❑ EntityReference — Represents an entity reference, such as &quot; . This node type cannot
have child nodes.
❑ ProcessingInstruction — Represents a PI. This node type cannot have child nodes.
❑ Comment — Represents an XML comment. This node type cannot have child nodes.
❑ Notation — Represents notation defined in a DTD. This is rarely used and so won’t be
included in this discussion.


❑ Node.ELEMENT_NODE (1)
❑ Node.ATTRIBUTE_NODE (2)
❑ Node.TEXT_NODE (3)
❑ Node.CDATA_SECTION_NODE (4)
❑ Node.ENTITY_REFERENCE_NODE (5)
❑ Node.ENTITY_NODE (6)
❑ Node.PROCESSING_INSTRUCTION_NODE (7)
❑ Node.COMMENT_NODE (8)
❑ Node.DOCUMENT_NODE (9)
❑ Node.DOCUMENT_TYPE_NODE (10)
❑ Node.DOCUMENT_FRAGMENT_NODE (11)
❑ Node.NOTATION_NODE (12)


Property/Method Type/Return Type Description
nodeName String The name of the node; this is defined depending
on the type of node.
nodeValue String The value of the node; this is defined depending
on the type of node.
nodeType Number One of the node type constant values
ownerDocument Document Pointer to the document that this node belongs to
firstChild Node Pointer to the first node in the childNodes list
lastChild Node Pointer to the last node in the childNodes list
childNodes NodeList Alist of all child nodes
previousSibling Node Pointer to the previous sibling; null if this is the
first sibling
nextSibling Node Pointer to the next sibling; null if this is the last
sibling
hasChildNodes() Boolean Returns true when childNodes contains one or
more nodes
attributes NamedNodeMap Contains Attr objects representing an element’s
attributes; only used for Element nodes
appendChild(node) Node Adds node to the end of childNodes
removeChild(node) Node Removes node from childNodes
replaceChild Node Replaces oldnode in childNodes with
(newnode, oldnode) newnode
insertBefore Node Inserts newnode before refnode in
(newnode, refnode) childNodes


❑ NodeList — an array of nodes indexed numerically; used to represent child nodes of an element
❑ NamedNodeMap — an array of nodes indexed both numerically and name; used to represent ele-
ment attributes



<html>
<head>
<title>DOM Example</title>
</head>
<body>
<p>Hello World!</p>
<p>Isn’t this exciting?</p>
<p>You’re learning to use the DOM!</p>
</body>
</html>

var oHead = oHtml.firstChild;
var oBody = oHtml.lastChild;


var oHead = oHtml.childNodes[0];
var oBody = oHtml.childNodes[1];
alert(oHtml.childNodes.length); //outputs “2”

var oHead = oHtml.childNodes.item(0);
var oBody = oHtml.childNodes.item(1);

var oBody = document.body;

alert(oHead.parentNode == oHtml); //outputs “true”
alert(oBody.parentNode == oHtml); //outputs “true”
alert(oBody.previousSibling == oHead); //outputs “true”
alert(oHead.nextSibling == oBody); //outputs “true”
alert(oHead.ownerDocument == document); //outputs “true”

alert(document.nodeType); //outputs “9”
alert(document.documentElement.nodeType); //outputs “1”
alert(document.nodeType == Node.DOCUMENT_NODE); //outputs “true”
alert(document.documentElement.nodeType == Node.ELEMENT_NODE); //outputs “true”

if (typeof Node == “undefined”) {
    var Node = {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    }
}

Dealing with attributes

    ❑ getNamedItem(name) — returns the node whose nodeName property is equal to name
    ❑ removeNamedItem(name) — removes the node whose nodeName property is equal to name
    from the list
    ❑ setNamedItem(node) — adds the node into the list, indexing it by its nodeName property
    ❑ item(pos) — just like NodeList , returns the node in the numerical position pos

<p style=”color: red” id=”p1”>Hello world!</p>
var sId = oP.attributes.getNamedItem(“id”).nodeValue;
var sId = oP.attributes.item(1).nodeValue;
oP.attributes.getNamedItem(“id”).nodeValue = “newId”;



❑ getAttribute(name) — same as attributes.getNamedItem(name).value
❑ setAttribute(name, newvalue) — same as attributes.getNamedItem(name).value =
newvalue
❑ removeAttribute(name) — same as attributes.removeNamedItem(name)

var sId = oP.getAttribute(“id”);
oP.setAttribute(“id”, “newId”);

var oImgs = document.getElementsByTagName(“img”);
alert(oImgs[0].tagName); //outputs “IMG”

var oPs = document.getElementsByTagname(“p”);
var oImgsInP = oPs[0].getElementsByTagName(“img”);
var oAllElements = document.getElementsByTagName(“*”);


<html>
<head>
<title>DOM Example</title>
</head>
<body>
<form method=”post” action=”dosomething.cgi”>
<fieldset>
<legend>What color do you like?</legend>
<input type=”radio” name=”radColor” value=”red” /> Red<br />
<input type=”radio” name=”radColor” value=”green” /> Green<br />
<input type=”radio” name=”radColor” value=”blue” /> Blue<br />
</fieldset>
<input type=”submit” value=”Submit” />
</form>
</body>
</html>


var oRadios = document.getElementsByName(“radColor”);
alert(oRadios[0].getAttribute(“value”)); //outputs “red”


<html>
<head>
<title>DOM Example</title>
</head>
<body>
<p>Hello World!</p>
<div id=”div1”>This is my first layer</div>
</body>
</html>


var oDivs = document.getElementsByTagName(“div”);
var oDiv1 = null;
for (var i=0; i < oDivs.length; i++){
if (oDivs[i].getAttribute(“id”) == “div1”) {
oDiv1 = oDivs[i];
break;
}
}

var oDiv1 = document.getElementById(“div1”);



Creating new nodes

createAttribute Creates an attribute node with X X X –
(name) the given name
createCDATASection Creates a CDATASection with a – X – –
(text) text child node containing tex
createComment Creates a comment node X X X X
(text) containing text
createDocument Creates a document fragment X X X X
Fragment() node
createElement Creates an element with a tag X X X X
(tagname) name of tagname
createEntity Creates an entity reference node – X – –
Reference(name) with the given name
createProcessing Creates a PI node with the – X – –
Instruction(target, given target and data
data)
createTextNode(text) Creates a text node containing text X X X X



<html>
<head>
<title>createElement() Example</title>
</head>
<body>
</body>
</html>


var oP = document.createElement(“p”);
var oText = document.createTextNode(“Hello World!”);
oP.appendChild(oText);
document.body.appendChild(oP);



<html>
<head>
<title>createElement() Example</title>
<script type=”text/javascript”>
function createMessage() {
var oP = document.createElement(“p”);
var oText = document.createTextNode(“Hello World! “);
oP.appendChild(oText);
document.body.appendChild(oP);
}
</script>
</head>
<body onload=”createMessage()”>
</body>
</html>


<html>
<head>
<title>removeChild() Example</title>
<script type=”text/javascript”>
    function removeMessage() {
        var oP = document.body.getElementsByTagName(“p”)[0];
        document.body.removeChild(oP);
    }
</script>
</head>
<body onload=”removeMessage()”>
<p>Hello World!</p>
</body>
</html>



<html>
<head>
<title>removeChild() Example</title>
<script type=”text/javascript”>
function removeMessage() {
var oP = document.body.getElementsByTagName(“p”)[0];
oP.parentNode.removeChild(oP);
}
</script>
</head>
<body onload=”replaceMessage()”>
<p>Hello World!</p>
</body>
</html>


<html>
<head>
<title>replaceChild() Example</title>
<script type=”text/javascript”>
function replaceMessage() {
var oNewP = document.createElement(“p”);
var oText = document.createTextNode(“Hello Universe! “);
oNewP.appendChild(oText);
var oOldP = document.body.getElementsByTagName(“p”)[0];
oOldP.parentNode.replaceChild(oNewP, oOldP);
}
</script>
</head>
<body onload=”replaceMessage()”>
<p>Hello World!</p>
</body>
</html>



<html>
<head>
<title>appendChild() Example</title>
<script type=”text/javascript”>
function appendMessage() {
var oNewP = document.createElement(“p”);
var oText = document.createTextNode(“Hello Universe! “);
oNewP.appendChild(oText);
document.body.appendChild(oNewP);
}
</script>
</head>
<body onload=”appendMessage()”>
<p>Hello World!</p>
</body>
</html>



<html>
<head>
<title>insertBefore() Example</title>
<script type=”text/javascript”>
function insertMessage() {
var oNewP = document.createElement(“p”);
var oText = document.createTextNode(“Hello Universe! “);
oNewP.appendChild(oText);
var oOldP = document.getElementsByTagName(“p”)[0];
document.body.insertBefore(oNewP, oOldP);
}
</script>
</head>
<body onload=”insertMessage()”>
<p>Hello World!</p>
</body>
</html>



var arrText = [“first”, “second”, “third”, “fourth”, “fifth”, “sixth”, “seventh”,
“eighth”, “ninth”, “tenth”];
for (var i=0; i < arrText.length; i++) {
var oP = document.createElement(“p”);
var oText = document.createTextNode(arrText[i]);
oP.appendChild(oText);
document.body.appendChild(oP);}


var arrText = [“first”, “second”, “third”, “fourth”, “fifth”, “sixth”, “seventh”,
“eighth”, “ninth”, “tenth”];
var oFragment = document.createDocumentFragment();
for (var i=0; i < arrText.length; i++) {
var oP = document.createElement(“p”);
var oText = document.createTextNode(arrText[i]);
oP.appendChild(oText);
oFragment.appendChild(oP);
}
document.body.appendChild(oFragment);



<img src=”mypicture.jpg” border=”0” />
alert(oImg.getAttribute(“src”));
alert(oImg.getAttribute(“border”));
oImg.setAttribute(“src”, “mypicture2.jpg”);
oImg.setAttribute(“border”, “1”);

alert(oImg.src);
alert(oImg.border);
oImg.src = “mypicture2.jpg”;
oImg.border = “1”;

<div class=”header”></div>
alert(oDiv.className);
oDiv.className = “footer”;




<table border=”1” width=”100%”> <tbody>
<tr>
<td>Cell 1,1</td>
<td>Cell 2,1</td>
</tr>
<tr>
<td>Cell 1,2</td>
<td>Cell 2,2</td>
</tr>
</tbody>
</table>


//create the table
var oTable = document.createElement(“table”);
oTable.setAttribute(“border”, “1”);
oTable.setAttribute(“width”, “100%”);
//create the tbody
var oTBody = document.createElement(“tbody”);
oTable.appendChild(oTBody);
//create the first row
var oTR1 = document.createElement(“tr”);
oTBody.appendChild(oTR1);
var oTD11 = document.createElement(“td”);
oTD11.appendChild(document.createTextNode(“Cell 1,1”));
oTR1.appendChild(oTD11);
var oTD21 = document.createElement(“td”);
oTD21.appendChild(document.createTextNode(“Cell 2,1”));
oTR1.appendChild(oTD21);
//create the second row
var oTR2 = document.createElement(“tr”);
oTBody.appendChild(oTR2);
var oTD12 = document.createElement(“td”);
oTD12.appendChild(document.createTextNode(“Cell 1,2”));
oTR2.appendChild(oTD12);
var oTD22 = document.createElement(“td”);
oTD22.appendChild(document.createTextNode(“Cell 2,2”));
oTR2.appendChild(oTD22);
//add the table to the document body
document.body.appendChild(oTable);


The <table/> element adds the following:
    ❑ caption — pointer to the <caption/> element (if it exists)
    ❑ tBodies — collection of <tbody/> elements
    ❑ tFoot — pointer to the <tfoot/> element (if it exists)
    ❑ tHead — pointer to the <thead/> element (if it exists)
    ❑ rows — collection of all rows in the table
    ❑ createTHead() — creates a <thead/> element and places it into the table
    ❑ createTFoot() — creates a <tfoot/> element and places it into the table
    ❑ createCaption() — creates a <caption/> element and places it into the table
    ❑ deleteTHead() — deletes the <thead/> element
    ❑ deleteTFoot() — deletes the <tfoot/> element
    ❑ deleteCaption() — deletes the <caption/> element
    ❑ deleteRow(position) — deletes the row in the given position
    ❑ insertRow(position) — inserts a row in the given position in the rows collection

The <tbody/> element adds the following:
    ❑ rows — collection of rows in the <tbody/> element
    ❑ deleteRow(position) — deletes the row in the given position
    ❑ insertRow(position) — inserts a row in the given position in the rows collection

The <tr/> element adds the following:
    ❑ cells — collection of cells in the <tr/> element
    ❑ deleteCell(position) — deletes the cell in the given position
    ❑ insertCell(position) — inserts a cell in the given position in the cells collection



//create the table
var oTable = document.createElement(“table”);
oTable.setAttribute(“border”, “1”);
oTable.setAttribute(“width”, “100%”);
//create the tbody
var oTBody = document.createElement(“tbody”);
oTable.appendChild(oTBody);
//create the first row
oTBody.insertRow(0);
oTBody.rows[0].insertCell(0);
oTBody.rows[0].cells[0].appendChild(document.createTextNode(“Cell 1,1”));
oTBody.rows[0].insertCell(1);
oTBody.rows[0].cells[1].appendChild(document.createTextNode(“Cell 2,1”));
//create the second row
oTBody.insertRow(1);
oTBody.rows[1].insertCell(0);
oTBody.rows[1].cells[0].appendChild(document.createTextNode(“Cell 1,2”));
oTBody.rows[1].insertCell(1);
oTBody.rows[1].cells[1].appendChild(document.createTextNode(“Cell 2,2”));
//add the table to the document body
document.body.appendChild(oTable);

<html>
<head>
<title>Example</title>
</head>
<body>
<p>Hello <b>World!</b></p>
</body>
</html>


1. root — the node in the tree that you wish to start searching from
2. whatToShow — a numerical code indicating which nodes should be visited
3. filter — a NodeFilter object to determine which nodes to ignore
4. entityReferenceExpansion — a Boolean value indicating whether entity references should
be expanded

❑ NodeFilter.SHOW_ALL — show all node types
❑ NodeFilter.SHOW_ELEMENT — show element nodes
❑ NodeFilter.SHOW_ATTRIBUTE — show attribute nodes
❑ NodeFilter.SHOW_TEXT — show text nodes
❑ NodeFilter.SHOW_CDATA_SECTION — show CData section nodes
❑ NodeFilter.SHOW_ENTITY_REFERENCE — show entity reference nodes
❑ NodeFilter.SHOW_ENTITY — show entity nodes
❑ NodeFilter.SHOW_PROCESSING_INSTRUCTION — show PI nodes
❑ NodeFilter.SHOW_COMMENT — show comment nodes
❑ NodeFilter.SHOW_DOCUMENT — show document nodes
❑ NodeFilter.SHOW_DOCUMENT_TYPE — show document type nodes
❑ NodeFilter.SHOW_DOCUMENT_FRAGMENT — show document fragment nodes
❑ NodeFilter.SHOW_NOTATION — show notation nodes

var iWhatToShow = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT;
var iterator = document.createNodeIterator(document, NodeFilter.SHOW_ALL, null,
false);

var node1 = iterator.nextNode();
var node2 = iterator.nextNode();
var node3 = iterator.previousNode();
alert(node1 == node3); ///outputs “true”



<html>
<head>
<title>NodeIterator Example</title>
<script type=”text/javascript”>
var iterator = null;
function makeList() {
var oDiv = document.getElementById(“div1”);
iterator = document.createNodeIterator(oDiv,
NodeFilter.SHOW_ELEMENT, null, false);
var oOutput = document.getElementById(“text1”);
var oNode = iterator.nextNode();
while (oNode) {
oOutput.value += oNode.tagName + “\n”;
oNode = iterator.nextNode();
}
}
</script>
</head>
<body>
<div id=”div1”>
<p>Hello <b>World!</b></p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
<li>List item 3</li>
</ul>
</div>
<textarea rows=”10” cols=”40” id=”text1”></textarea><br />
<input type=”button” value=”Make List” onclick=”makeList()” /> </body>
</html>


var oFilter = new Object;
oFilter.acceptNode = function (oNode) {
//filter logic goes here
};

var oFilter = new Object;
oFilter.acceptNode = function (oNode) {
return (oNode.tagName == “P”) ? NodeFilter.FILTER_REJECT :
NodeFilter.FILTER_ACCEPT;
};


<html>
<head>
<title>NodeIterator Example</title>
<script type=”text/javascript”>
var iterator = null;
function makeList() {
var oDiv = document.getElementById(“div1”);
var oFilter = new Object;
oFilter.acceptNode = function (oNode) {
return (oNode.tagName == “P”) ?
NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
};
iterator = document.createNodeIterator(oDiv,
NodeFilter.SHOW_ELEMENT, oFilter, false);
var oOutput = document.getElementById(“text1”);
var oNode = iterator.nextNode();
while (oNode) {
oOutput.value += oNode.tagName + “\n”;
oNode = iterator.nextNode();
}
}
</script>
</head>
<body>
<div id=”div1”>
<p>Hello <b>World!</b></p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
<li>List item 3</li>
</ul>
</div>
<textarea rows=”10” cols=”40” id=”text1”></textarea><br />
<input type=”button” value=”Make List” onclick=”makeList()” /> </body>
</html>

❑ parentNode() — travels to the current node’s parent
❑ firstChild() — travels to the first child of the current node
❑ lastChild() — travels to the last child of the current node
❑ nextSibling() — travels to the next sibling of the current node
❑ previousSibling() — travels to the previous sibling of the current nod

<html>
<head>
<title>TreeWalker Example</title>
<script type=”text/javascript”>
var walker = null;
function makeList() {
var oDiv = document.getElementById(“div1”);
var oFilter = new Object;
oFilter.acceptNode = function (oNode) {
return (oNode.tagName == “P”) ?
NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
};
walker = document.createTreeWalker(oDiv, NodeFilter.SHOW_ELEMENT,
oFilter, false);
var oOutput = document.getElementById(“text1”);
var oNode = walker.nextNode();
while (oNode) {
oOutput.value += oNode.tagName + “\n”;
oNode = walker.nextNode();
}
}
</script>
</head>
<body>
<div id=”div1”>
<p>Hello <b>World!</b></p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
<li>List item 3</li>
</ul>
</div>
<textarea rows=”10” cols=”40” id=”text1”></textarea><br />
<input type=”button” value=”Make List” onclick=”makeList()” /> </body>
</html>


<html>
<head>
<title>TreeWalker Example</title>
<script type=”text/javascript”>
var walker = null;
function makeList() {
var oDiv = document.getElementById(“div1”);
walker = document.createTreeWalker(oDiv, NodeFilter.SHOW_ELEMENT,
null, false);
var oOutput = document.getElementById(“text1”);
walker.firstChild(); //go to <p>
walker.nextSibling(); //go to <ul>
var oNode = walker.firstChild(); //go to first <li>
while (oNode) {
oOutput.value += oNode.tagName + “\n”;
oNode = walker.nextSibling();
}
}
</script>
</head>
<body>
<div id=”div1”>
<p>Hello <b>World!</b></p>
<ul>
<li>List item 1</li>
<li>List item 2</li>
<li>List item 3</li>
</ul>
</div>
<textarea rows=”10” cols=”40” id=”text1”></textarea><br />
<input type=”button” value=”Make List” onclick=”makeList()” />
</body>
</html>


var bXmlLevel1 = document.implementation.hasFeature(“XML”, “1.0”);