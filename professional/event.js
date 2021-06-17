<html>
<head>
<title>Example</title>
</head>
<body onclick=”handleClick()”>
<div onclick=”handleClick()”>Click Me</div>
</body>
</html>




<html onclick=”handleClick()”>
<head>
<title>Example</title>
</head>
<body onclick=”handleClick()”>
<div onclick=”handleClick()”>Click Me</div>
</body>
</html>


var oDiv = document.getElementById(“div1”);
oDiv.onclick = function () {
alert(“I was clicked”);
};

<div onclick=”alert(‘I was clicked’)”></div>

oDiv.onclick = function () {
alert(“I was clicked”);
};


[Object].attachEvent(“name_of_event_handler”, fnHandler);
[Object].detachEvent(“name_of_event_handler”, fnHandler);


var fnClick = function () {
alert(“Clicked!”);
};
var oDiv = document.getElementById(“div”);
oDiv.attachEvent(“onclick”, fnClick); //add the event handler
//do some other stuff here
oDiv.detachEvent(“onclick”, fnClick); //remove the event handler


var fnClick1 = function () {
    alert(“Clicked!”);
};
var fnClick2 = function () {
    alert(“Also clicked! “);
};
var oDiv = document.getElementById(“div”);
oDiv.attachEvent(“onclick”, fnClick1);
oDiv.attachEvent(“onclick”, fnClick2);


var oDiv = document.getElementById(“div”);
oDiv.onclick = fnClick1;
oDiv.attachEvent(“onclick”, fnClick2);


[Object].addEventListener(“name_of_event”, fnHandler, bCapture);
[Object].removeEventListener(“name_of_event”, fnHandler, bCapture);


var fnClick = function () {
alert(“Clicked!”);
};

var oDiv = document.getElementById(“div1”);
oDiv.addEventListener(“click”, fnClick, false); //add the event handler
//do some other stuff here
oDiv.removeEventListener(“click”, fnClick, false); //remove the event
handler

var fnClick1 = function () {
alert(“Clicked!”);
};
var fnClick2 = function () {
alert(“Also clicked!”);
};
var oDiv = document.getElementById(“div1”);
oDiv.addEventListener(“onclick”, fnClick1);
oDiv.addEventListener(“onclick”, fnClick2);



var oDiv = document.getElementById(“div1”);
//add the event handler in the bubbling phase
oDiv.addEventListener(“click”, fnClick, false);
//do some other stuff here
//try to remove the event handler, but the third parameter is true
//instead false...this will fail, though it won’t cause an error.
oDiv.removeEventListener(“click”, fnClick, true);

oDiv.onclick = fnClick;
oDiv.addEventListener(“click”, fnClick, false);
oDiv.onclick = fnClick;
oDiv.onclick = fnDifferentClick;



oDiv.onclick = function () {
var oEvent = window.event;
}

oDiv.onclick = function () {
var oEvent = arguments[0];
}

oDiv.onclick = function (oEvent) {
}






Property/Method Type R/W Description
altKey Boolean R/W True indicates the ALT key is pressed; false indicates it
is not.
button Integer R/W The mouse button has been clicked for certain mouse
events. Values:
0 – No button is pressed.
1 – Left button is pressed.
2 – Right button is pressed.
3 – Left and right buttons are both pressed.
4 – Middle button is pressed.
5 – Left and middle buttons are both pressed.
6 – Right and middle buttons are both pressed.
7 – Left, middle, and right buttons are all pressed.
cancelBubble Boolean R/W The developer sets this to true to stop the bubbling up
of an event.
clientX Integer R/W The x-coordinate of the mouse pointer within the client
area (excludes toolbars, scrollbars, and so on) when the
event occurs
clientY Integer R/W The y-coordinate of the mouse pointer within the client
area (excludes toolbars, scrollbars, and so on) when the
event occurs
ctrlKey Boolean R/W True indicates the CTRL key is pressed; false indicates
it is not.
fromElement Element R/W The element that the mouse is leaving during some
mouse events
keyCode Integer R/W For the keypress event, indicates the Unicode charac-
ter of the key that was pressed; for the keydown / keyup
events, numeric indicator as to the key that was
pressed.
offsetX Integer R/W The x-coordinate of the mouse pointer relative to the
object that caused the event
offsetY Integer R/W The y-coordinate of the mouse pointer relative to the
object that caused the event
repeat Boolean R True if the keydown event is being fired repeatedly;
false if not
returnValue Boolean R/W The developer sets this to false in order to cancel the
default action for the event.
screenX Integer R/W The x-coordinate of the mouse pointer relative to the
entire computer screen
screenY Integer R/W The y-coordinate of the mouse pointer relative to the
entire computer screen
shiftKey Boolean R/W True indicates the Shift key is pressed; false indicates it
is not.
srcElement Element R/W The element that caused the event.
toElement Element R/W The element that the mouse is entering during some
mouse events.
type String R/W The name of the event.
x Integer R/W The x-coordinate of the mouse pointer relative to the
parent element of the element that caused the event
y Integer R/W The y-coordinate of the mouse pointer relative to the
parent element of the element that caused the event






Property/Method Type R/W Description
altKey Boolean R/W True indicates the ALT key is pressed; false indicates it
is not.
bubbles Boolean R Indicates if the event bubbles.
button Integer R/W The mouse button that has been pressed for certain
mouse events. Values:
0 – No button is pressed.
1 – Left button is pressed.
2 – Right button is pressed.
3 – Left and right buttons are both pressed.
4 – Middle button is pressed.
5 – Left and middle buttons are both pressed.
6 – Right and middle buttons are both pressed.
7 – Left, middle, and right buttons are all pressed.
cancelable Boolean R Indicates if the event can be cancelled.
cancelBubble Boolean R Indicates whether event bubbling has been cancelled
charCode Integer R The Unicode value of the character for the key that was
pressed
clientX Integer R The x-coordinate of the mouse pointer within the client
area (excludes toolbars, scrollbars, and so on) when the
event occurs
clientY Integer R The y-coordinate of the mouse pointer within the client
area (excludes toolbars, scrollbars, and so on) when the
event occurs
ctrlKey Boolean R True indicates the CTRL key is pressed; false indicates
it is not.
currentTarget Element R The element that is currently the event target
detail Integer R The number of times the mouse button has been
clicked
eventPhase Integer R The phase of the event, which is one of the following
values:
0 – capturing phase
1 – at target
2 – bubbling phase
isChar Boolean R Indicates if the key that was pressed has a character
associated with it
keyCode Integer R/W Numeric indicator as to the key that was pressed
metaKey Integer R Indicates if the METAkey has been pressed
pageX Integer R The x-coordinate of the mouse pointer relative to
the page
pageX Integer R The y-coordinate of the mouse pointer relative to
the page
prevent Function N/A You can call this method to prevent the default
Default() behavior for the event.
relatedTarget Element R The secondary target of the event, most often used in
mouse events
screenX Integer R The x-coordinate of the mouse pointer relative to the
entire computer screen
screenY Integer R The y-coordinate of the mouse pointer relative to the
entire computer screen
shiftKey Boolean R True indicates the Shift key is pressed; false indicates it
is not.
stop Function N/A You can call this method to prevent the further
Propagation() propagation (bubbling) of the event.
target Element R The element/object that caused the event
timeStamp Long R The time that this event occurred in milliseconds after
midnight on January 1, 1970
type String R The name of the event

var sType = oEvent.type;

function handleEvent(oEvent) {
    if (oEvent.type == “click”) {
        alert(“Clicked!”);
    } else if (oEvent.type == “mouseover”) {
        alert(“Mouse Over!”);
    }
}
oDiv.onclick = handleEvent;
oDiv.onmouseover = handleEvent;


var iKeyCode = oEvent.keyCode;

var bShift = oEvent.shiftKey;
var bAlt = oEvent.altKey;
var bCtrl = oEvent.ctrlKey

var iClientX = oEvent.clientX;
var iClientY = oEvent.clientY;

var iScreenX = oEvent.screenX;
var iScreenY = oEvent.screenY;
var oTarget = oEvent.srcElement;
var oTarget = oEvent.target;

var iCharCode = oEvent.keyCode;
var iCharCode = oEvent.charCode;
var sChar = String.fromCharCode(oEvent.charCode);



if (oEvent.isChar) {
    var iCharCode = oEvent.charCode;
}
oEvent.returnValue = false;
oEvent.preventDefault();


document.body.oncontextmenu = function (oEvent) {
    if (isIE) {
        oEvent = window.event;
        oEvent.returnValue = false;
    } else {
        oEvent.preventDefault();
    }
};

oEvent.cancelBubble = true;
oEvent.stopPropagation ();



<html onclick=”alert(‘html’)”>
<head>
<title>Event Propagation Example</title>
</head>
<body onclick=”alert(‘body’)”>
<input type=”button” value=”Click Me” onclick=”alert(‘input’)” />
</body>
</html>




html onclick=”alert(‘html’)”>
<head>
<title>Stopping Event Propagation Example</title>
<script type=”text/javascript” src=”detect.js”></script>
<script type=”text/javascript”>
function handleClick(oEvent) {
alert(“input”);
if (isIE) {
oEvent.cancelBubble = true;
} else {
oEvent.stopPropagation();
}
}
</script>
</head>
<body onclick=”alert(‘body’)”>
<input type=”button” value=”Click Me” onclick=”handleClick(event)” />
</body>
</html>



Types of Events
❑ Mouse Events are fired when the user uses the mouse to perform certain actions.
❑ Keyboard Events are fired when the user types on the keyboard.
❑ HTML Events are fired when certain changes occur to the browser window or specific client-
server interaction occurs.
❑ Mutation Events are fired when a change occurs to the underlying DOM structure.


Mouse events
❑ click — Occurs when the user clicks the left mouse button (not if the right mouse button is
used). Also occurs when focus is on a button and the user presses the Enter key.
❑ dblclick — Occurs when the user double clicks the left mouse button (not if the right mouse
button is used).
❑ mousedown — Occurs when the user pushes any mouse button down.
❑ mouseout — Occurs when the cursor is over an element and the user moves it outside the
boundaries of the element.
❑ mouseover — Occurs when the cursor is outside of an element and the user moves it over the
element.
❑ mouseup — Occurs when the user releases any mouse button.
❑ mousemove — Occurs repeatedly when the cursor is over an element.


<html>
<head>
<title>Mouse Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n” + oEvent.type;
}
</script>
</head>
<body>
<p>Use your mouse to click and double click the red square.</p>
<div style=”width: 100px; height: 100px; background-color: red”
onmouseover=”handleEvent(event)”
onmouseout=”handleEvent(event)”
onmousedown=”handleEvent(event)”
onmouseup=”handleEvent(event)”
onclick=”handleEvent(event)”
ondblclick=”handleEvent(event)” id=”div1”></div>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>



<img src=”image1.gif” onmouseover=”this.src=’image2.gif’”
onmouseout=”this.src=’image1’.gif” />

Event properties

❑ Coordinate properties (such as clientX and clientY , and so on)
❑ The type property
❑ The target (DOM) or srcElement (IE) property
❑ The shiftKey , ctrlKey , altKey , and metaKey (DOM) properties
❑ The button property (only on mousedown , mousemove , mouseout , mouseover , and mouseup
events)



<html>
<head>
<title>Mouse Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
oTextbox.value += “\n target is “ + (oEvent.target ||
oEvent.srcElement).id;
oTextbox.value += “\n at (“ + oEvent.clientX + “,” +
oEvent.clientY + “) in the client”;
oTextbox.value += “\n at (“ + oEvent.screenX + “,” +
oEvent.screenY + “) on the screen”;
oTextbox.value += “\n button down is “ + oEvent.button;
var arrKeys = [];
if (oEvent.shiftKey) {
arrKeys.push(“Shift”);
}
if (oEvent.ctrlKey) {
arrKeys.push(“Ctrl”);
}
if (oEvent.altKey) {
arrKeys.push(“Alt”);
}
oTextbox.value += “\n keys down are “ + arrKeys;
}
</script>
</head>
<body>
<p>Use your mouse to click and double click the red square.</p>
<div style=”width: 100px; height: 100px; background-color: red”
onmouseover=”handleEvent(event)”
onmouseout=”handleEvent(event)”
onmousedown=”handleEvent(event)”
onmouseup=”handleEvent(event)”
onclick=”handleEvent(event)”
ondblclick=”handleEvent(event)” id=”div1”></div>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>




<html>
<head>
<title>IE Mouse Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
oTextbox.value += “\n target is “ + oEvent.srcElement.tagName;
if (oEvent.fromElement) {
oTextbox.value += “\n fromElement is “ +
oEvent.fromElement.tagName;
}
if (oEvent.toElement) {
oTextbox.value += “\n toElement is “ +
oEvent.toElement.tagName;
} }
</script>
</head>
<body>
<p>Use your mouse to click and double click the red square.</p>
<div style=”width: 100px; height: 100px; background-color: red”
onmouseover=”handleEvent(event)”
onmouseout=”handleEvent(event)”
onmousedown=”handleEvent(event)”
onmouseup=”handleEvent(event)”
onclick=”handleEvent(event)”
ondblclick=”handleEvent(event)” id=”div1”></div>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>






<html>
<head>
<title>DOM Mouse Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
oTextbox.value += “\n target is “ + oEvent.target.tagName;
oTextbox.value += “\n relatedTarget is “ +
oEvent.relatedTarget.tagName;
}
</script>
</head>
<body>
<p>Use your mouse to click and double click the red square.</p>
<div style=”width: 100px; height: 100px; background-color: red”
onmouseover=”handleEvent(event)”
onmouseout=”handleEvent(event)”
onmousedown=”handleEvent(event)”
onmouseup=”handleEvent(event)”
onclick=”handleEvent(event)”
ondblclick=”handleEvent(event)” id=”div1”></div>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>


Sequencing

1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dblclick

Keyboard events
❑ keydown — Occurs when the user presses a key on the keyboard. It also occurs repeatedly as
the key is being held down.
❑ keypress — Occurs when the user presses a key on the keyboard that results in a character
(disregards keys like Shift and Alt). It also occurs repeatedly as the key is being held down.
❑ keyup — Occurs when the user releases a key that was down.


<html>
<head>
<title>Key Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
}
</script>
</head>
<body>
<p>Type some characters into the first textbox.</p>
<p><textarea id=”txtInput” rows=”15” cols=”50”
onkeydown=”handleEvent(event)”
onkeyup=”handleEvent(event)”
onkeypress=”handleEvent(event)”></textarea></p>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>

Event properties
❑ The keyCode property
❑ The charCode property (DOM only)
❑ The target (DOM) or srcElement (IE) property
❑ The shiftKey , ctrlKey , altKey , and metaKey (DOM) properties


<html>
<head>
<title>Key Events Example</title>
<script type=”text/javascript”>
function handleEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
oTextbox.value += “\n target is “ + (oEvent.target ||
oEvent.srcElement).id;
oTextbox.value += “\n keyCode is “ + oEvent.keyCode;
oTextbox.value += “\n charCode is “ + oEvent.charCode;
var arrKeys = [];
if (oEvent.shiftKey) {
arrKeys.push(“Shift”);
}
if (oEvent.ctrlKey) {
arrKeys.push(“Ctrl”);
}
if (oEvent.altKey) {
arrKeys.push(“Alt”);
}
oTextbox.value += “\n keys down are “ + arrKeys;
}
</script>
</head>
<body>
<p>Type some characters into the first textbox.</p>
<p><textarea id=”txtInput” rows=”15” cols=”50”
onkeydown=”handleEvent(event)”
onkeyup=”handleEvent(event)”
onkeypress=”handleEvent(event)”></textarea></p>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>



Sequencing

1. keydown
1. keypress
2. keyup

HTML events

❑ The load event, which fires on a window when the page has been completely loaded, on a
frameset when all frames have been completely loaded, on an <img/> element when it has been
completely loaded, or on an <object /> element when it has been completely loaded.
❑ The unload event, which fires on a window when the page has been completely unloaded, on a
frameset when all frames have been completely unloaded, or on an <object/> element when it
has been completely unloaded.
❑ The abort event, which fires on an <object/> element if it is not fully loaded before the user
stops the download process.
❑ The error event, which fires on a window when a JavaScript error occurs, on an <img/> ele-
ment if the image specified cannot be loaded, on an <object/> element if it cannot be loaded,
or on frameset if one or more frames cannot be loaded. This event is discussed in Chapter 14,
“Error Handling.”
❑ The select event, which fires when the user selects one or more characters in a text box (either
<input/> or <textarea/> ). This event is discussed further in Chapter 11, “Forms and Data
Integrity.”
❑ The change event, which fires on a text box (either <input/> or <textarea/> ) when it loses
focus and the value has changed since the textbox got focus, and on a <select/> element when
its value is changed. This event is discussed further in Chapter 11.
❑ The submit event, which fires on a <form/> when a Submit button ( <input type=”submit”/> )
is clicked. This event is discussed further in Chapter 11.
❑ The reset event, which fires on a <form/> when a Reset button ( <input type=”reset”/> ) is
clicked. This event is discussed further in Chapter 11.

❑ The resize event, which fires on a window or frame when it is resized.
❑ The scroll event, which fires on any element with a scrollbar when the user scrolls it. The
<body/> element contains the scrollbar for a loaded page.
❑ The focus event, which fires on any element or on the window itself when it gets focus (the user
clicks on it, tabs to it, or otherwise interacts with it).
❑ The blur event, which fires on any element or on the window itself when it loses focus.


<html>
<head>
<title>Onload Example</title>
<script type=”text/javascript”>
window.onload = function () {
alert(“Loaded”);
};
</script>
<body>
</body>
</html>

<html>
<head>
<title>Onload Example</title>
<script type=”text/javascript”>
function handleLoad() {
alert(window.onload);
}
</script>
<body onload=”handleLoad()”>
</body>
</html>

<html>
<head>
<title>Onload Example</title>
<script type=”text/javascript”>
document.body.onload = function () {
alert(“loaded”);
}
</script>
<body>
</body>
</html>


<html>
<head>
<title>OnUnload Example</title>
</head>
<body onunload=”alert(‘Goodbye’)”>
</body>
</html>



<html>
<head>
<title>OnResize Example</title>
</head>
<body onresize=”alert(‘Resizing’)”>
</body>
</html>




html>
<head>
<title>OnScroll Example</title>
</head>
<body onscroll=”alert(‘Scrolling’)”>
<p>Try scrolling this window.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</body>
</html>


<html>
<head>
<title>OnScroll Example</title>
<script type=”text/javascript”>
window.onscroll = function () {
alert(“scrolling”);
}
</script>
</head>
<body>
<p>Try scrolling this window.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</body>
</html>



<html>
<head>
<title>OnScroll Example</title>
<script type=”text/javascript”>
window.onscroll = function () {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\nscroll is at “ + document.body.scrollLeft + “
horizontally and “ + document.body.scrollTop + “ vertically.”;
}
</script>
</head>
<body>
<p>Try scrolling this window.</p>
<p><textarea rows=”15” cols=”50” id=”txt1”></textarea>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</body>
</html>

<html>
<head>
<title>OnScroll Example</title>
<script type=”text/javascript”>
window.onscroll = function () {
var oWatermark = document.getElementById(“divWatermark”);
oWatermark.style.top = document.body.scrollTop;
}
</script>
</head>
<body>
<p>Try scrolling this window.</p>
<div id=”divWatermark” style=”position: absolute; top: 0px; right: 0px;
color: #cccccc; width: 150px; height: 30px; background-color: navy”>Watermark</div>
<p>Line 1</p>
<p>Line 2</p>
<p>Line 3</p>
<p>Line 4</p>
<p>Line 5</p>
<p>Line 6</p>
<p>Line 7</p>
<p>Line 8</p>
<p>Line 9</p>
<p>Line 10</p>
<p>Line 11</p>
<p>Line 12</p>
</body>
</html>


Mutation events
❑ DOMSubtreeModified — fires when the subtree of a document or element is modified by
either adding or removing nodes
❑ DOMNodeInserted — fires when a node is inserted as a child of another node
❑ DOMNodeRemoved — fires when a node is removed as a child of another node
❑ DOMNodeRemovedFromDocument — fires when a node is removed from a document
❑ DOMNodeInsertedIntoDocument — fires when a new node is inserted into a document


var EventUtil = new Object;

EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
if (oTarget.addEventListener) { //for DOM-compliant browsers
oTarget.addEventListener(sEventType, fnHandler, false);
} else if (oTarget.attachEvent) { //for IE
oTarget.attachEvent(“on” + sEventType, fnHandler);
} else { //for all others
oTarget[“on” + sEventType] = fnHandler;
}
};


EventUtil.removeEventHandler = function (oTarget, sEventType, fnHandler) {
if (oTarget.removeEventListener) { //for DOM-compliant browsers
oTarget.removeEventListener(sEventType, fnHandler, false);
} else if (oTarget.detachEvent) { //for IE
oTarget.detachEvent(“on” + sEventType, fnHandler);
} else { //for all others
oTarget[“on” + sEventType] = null;
}
};


<html>
<head>
<title>Add/Remove Event Handlers Example</title>
<script type=”text/javascript”>
var EventUtil = new Object;
EventUtil.addEventHandler = function (oTarget, sEventType,
fnHandler) {
if (oTarget.addEventListener) {
oTarget.addEventListener(sEventType, fnHandler, false);
} else if (oTarget.attachEvent) {
oTarget.attachEvent(“on” + sEventType, fnHandler);
} else {
oTarget[“on” + sEventType] = fnHandler;
}
};
EventUtil.removeEventHandler = function (oTarget, sEventType,
fnHandler) {
if (oTarget.removeEventListener) {
oTarget.removeEventListener(sEventType, fnHandler, false);
} else if (oTarget.detachEvent) {
oTarget.detachEvent(“on” + sEventType, fnHandler);
} else {
oTarget[“on” + sEventType] = null;
}
};
function handleClick() {
alert(“Click!”);
var oDiv = document.getElementById(“div1”);
EventUtil.removeEventHandler(oDiv, “click”, handleClick);
}
window.onload = function() {
var oDiv = document.getElementById(“div1”);
EventUtil.addEventHandler(oDiv, “click”, handleClick);
}
</script>
</head>
<body>
<div id=”div1” style=”background-color: red; width: 100px; height:
100px”></div>
</body>
</html>


EventUtil.formatEvent = function (oEvent) {
return oEvent;
}



EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
}
return oEvent;
};

EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
}
return oEvent;
};


EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
}
return oEvent;
};


EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
oEvent.pageY = oEvent.clientY + document.body.scrollTop;
}
return oEvent;
};



EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
oEvent.pageY = oEvent.clientY + document.body.scrollTop;
oEvent.preventDefault = function () {
this.returnvalue = false;
};
}
return oEvent;
};


EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
oEvent.pageY = oEvent.clientY + document.body.scrollTop;
oEvent.preventDefault = function () {
this.returnValue = false;
};
if (oEvent.type == “mouseout”) {
oEvent.relatedTarget = oEvent.toElement;
} else if (oEvent.type == “mouseover”) {
oEvent.relatedTarget = oEvent.fromElement;
}
oEvent.stopPropagation = function () {
this.cancelBubble = true;
};
}
return oEvent;
};


EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
oEvent.pageY = oEvent.clientY + document.body.scrollTop;
oEvent.preventDefault = function () {
this.returnValue = false;
};
if (oEvent.type == “mouseout”) {
oEvent.relatedTarget = oEvent.toElement;
} else if (oEvent.type == “mouseover”) {
oEvent.relatedTarget = oEvent.fromElement;
}
oEvent.stopPropagation = function () {
this.cancelBubble = true;
};
oEvent.target = oEvent.srcElement;
}
return oEvent;
};

EventUtil.formatEvent = function (oEvent) {
if (isIE && isWin) {
oEvent.charCode = (oEvent.type == “keypress”) ? oEvent.keyCode : 0;
oEvent.eventPhase = 2;
oEvent.isChar = (oEvent.charCode > 0);
oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
oEvent.pageY = oEvent.clientY + document.body.scrollTop;
oEvent.preventDefault = function () {
this.returnValue = false;
};
if (oEvent.type == “mouseout”) {
oEvent.relatedTarget = oEvent.toElement;
} else if (oEvent.type == “mouseover”) {
oEvent.relatedTarget = oEvent.fromElement;
}
oEvent.stopPropagation = function () {
this.cancelBubble = true;
};
oEvent.target = oEvent.srcElement;
oEvent.time = (new Date).getTime();
}
return oEvent;
};


EventUtil.getEvent = function() {
if (window.event) {
return this.formatEvent(window.event);
}
};


EventUtil.getEvent = function() {
if (window.event) {
return this.formatEvent(window.event);
} else {
return EventUtil.getEvent.caller.arguments[0];
}
};

oDiv.onclick = function () {
var oEvent = EventUtil.getEvent();
};




<html>
<head>
<title>Mouse Events Example</title>
<script type=”text/javascript” src=”detect.js”></script>
<script type=”text/javascript” src=”eventutil.js”></script>
<script type=”text/javascript”>
EventUtil.addEventHandler(window, “load”, function () {
var oDiv = document.getElementById(“div1”);
EventUtil.addEventHandler(oDiv, “mouseover”, handleEvent);
EventUtil.addEventHandler(oDiv, “mouseout”, handleEvent);
EventUtil.addEventHandler(oDiv, “mousedown”, handleEvent);
EventUtil.addEventHandler(oDiv, “mouseup”, handleEvent);
EventUtil.addEventHandler(oDiv, “click”, handleEvent);
EventUtil.addEventHandler(oDiv, “dblclick”, handleEvent);
});
function handleEvent() {
var oEvent = EventUtil.getEvent();
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += “\n>” + oEvent.type;
oTextbox.value += “\n target is “ + oEvent.target.tagName;
if (oEvent.relatedTarget) {
oTextbox.value += “\n relatedTarget is “
+ oEvent.relatedTarget.tagName;
}
}
</script>
</head>
<body>
<p>Use your mouse to click and double click the red square.</p>
<div style=”width: 100px; height: 100px; background-color: red”
id=”div1”></div>
<p><textarea id=”txt1” rows=”15” cols=”50”></textarea></p>
</body>
</html>