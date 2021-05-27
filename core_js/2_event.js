
canplay loadeddata playing stalled
canplaythrough loadedmetadata progress suspend
durationchange loadstart ratechange timeupdate
emptied pause seeked volumechange
ended play seeking waiting

dragstart drag dragend
dragenter dragover dragleave
drop

cached checking downloading error
noupdate obsolete progress updateready


// The function is the event handler: it is invoked when the document loads.
window.onload = function() {
// Look up a <form> element
var elt = document.getElementById("shipping_address");
// Register an event handler function that will be invoked right
// before the form is submitted.
elt.onsubmit = function() { return validate(this); }
}

<button onclick="alert('Thank you');">Click Here</button>


onafterprint onfocus ononline onresize
onbeforeprint onhashchange onpagehide onstorage
onbeforeunload onload onpageshow onundo
onblur onmessage onpopstate onunload
onerror onoffline onredo


function(event) {
with(document) {
with(this.form || {}) {
with(this) {
/* your code here */
}
}
}
}

<button id="mybutton">Click me</button>
<script>
var b = document.getElementById("mybutton");
b.onclick = function() { alert("Thanks for clicking me!"); };
b.addEventListener("click", function() { alert("Thanks again!"); }, false);
</script>

document.removeEventListener("mousemove", handleMouseMove, true);
document.removeEventListener("mouseup", handleMouseUp, true);


var b = document.getElementById("mybutton");
var handler = function() { alert("Thanks!"); };
if (b.addEventListener)
b.addEventListener("click", handler, false);
else if (b.attachEvent)
b.attachEvent("onclick", handler);


function handler(event) {
event = event || window.event;
// Handler code goes here
}
e.onclick = function() { /* handler code */ };


function addEvent(target, type, handler) {
if (target.addEventListener)
target.addEventListener(type, handler, false);
else
target.attachEvent("on" + type,
function(event) {
// Invoke the handler as a method of target,
// passing on the event object
return handler.call(target, event);
});
}



function cancelHandler(event) {
var event = event || window.event; // For IE
/* Do something to handle the event here */
// Now cancel the default action associated with the event
if (event.preventDefault) event.preventDefault(); // Standard technique
if (event.returnValue) event.returnValue = false; // IE
return false; // For handlers registered as object properties
}


/*
* Pass a function to whenReady() and it will be invoked (as a method of the
* document) when the document is parsed and ready for manipulation. Registered
* functions are triggered by the first DOMContentLoaded, readystatechange, or
* load event that occurs. Once the document is ready and all functions have
* been invoked, any functions passed to whenReady() will be invoked
* immediately.
*/
var whenReady = (function() { // This function returns the whenReady() function
var funcs = []; // The functions to run when we get an event
var ready = false; // Switches to true when the handler is triggered
// The event handler invoked when the document becomes ready
function handler(e) {
// If we've already run once, just return
if (ready) return;
// If this was a readystatechange event where the state changed to
// something other than "complete", then we're not ready yet
if (e.type === "readystatechange" && document.readyState !== "complete")
return;
// Run all registered functions.
// Note that we look up funcs.length each time, in case calling
// one of these functions causes more functions to be registered.
for(var i = 0; i < funcs.length; i++)
funcs[i].call(document);
// Now set the ready flag to true and forget the functions
ready = true;
funcs = null;
}
// Register the handler for any event we might receive
if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", handler, false);
document.addEventListener("readystatechange", handler, false);
window.addEventListener("load", handler, false);
}
else if (document.attachEvent) {
document.attachEvent("onreadystatechange", handler);
window.attachEvent("onload", handler);
}
// Return the whenReady function
return function whenReady(f) {
if (ready) f.call(document); // If already ready, just run it
else funcs.push(f); // Otherwise, queue it for later.
}
}());



click A higher-level event fired when the user presses and releases a mouse button or otherwise “activates” an
element.
contextmenu A cancelable event fired when a contextmenu is about to be popped up. Current browsers display context
menus on right mouse clicks, so this event can also be used like the click event.
dblclick Fired when the user double-clicks the mouse
mousedown Fired when the user presses a mouse button
mouseup Fired when the user releases a mouse button
mousemove Fired when the user moves the mouse.
mouseover Fired when the mouse enters an element. relatedTarget (or fromElement in IE); specifies what element
the mouse is coming from.
mouseout Fired when the mouse leaves an element. relatedTarget (or toElement in IE); specifies what element
the mouse is going to.
mouseenter Like “mouseover”, but does not bubble. Introduced by IE and standardized in HTML5 but not yet widely
implemented.
mouseleave Like “mouseout”, but does not bubble. Introduced by IE and standardized in HTML5 but not yet widely
implemented.

<img src="draggable.gif"
style="position:absolute; left:100px; top:100px;"
onmousedown="if (event.shiftKey) drag(this, event);">


function drag(elementToDrag, event) {
// The initial mouse position, converted to document coordinates
var scroll = getScrollOffsets(); // A utility function from elsewhere
var startX = event.clientX + scroll.x;
var startY = event.clientY + scroll.y;
// The original position (in document coordinates) of the element
// that is going to be dragged. Since elementToDrag is absolutely
// positioned, we assume that its offsetParent is the document body.
var origX = elementToDrag.offsetLeft;
var origY = elementToDrag.offsetTop;
// Compute the distance between the mouse down event and the upper-left
// corner of the element. We'll maintain this distance as the mouse moves.
var deltaX = startX - origX;
var deltaY = startY - origY;
// Register the event handlers that will respond to the mousemove events
// and the mouseup event that follow this mousedown event.
if (document.addEventListener) { // Standard event model
// Register capturing event handlers on the document
document.addEventListener("mousemove", moveHandler, true);
document.addEventListener("mouseup", upHandler, true);
}
else if (document.attachEvent) { // IE Event Model for IE5-8
// In the IE event model, we capture events by calling
// setCapture() on the element to capture them.
elementToDrag.setCapture();
elementToDrag.attachEvent("onmousemove", moveHandler);
elementToDrag.attachEvent("onmouseup", upHandler);
// Treat loss of mouse capture as a mouseup event.
elementToDrag.attachEvent("onlosecapture", upHandler);
}
// We've handled this event. Don't let anybody else see it.
if (event.stopPropagation) event.stopPropagation(); // Standard model
else event.cancelBubble = true; // IE
// Now prevent any default action.
if (event.preventDefault) event.preventDefault(); // Standard model
else event.returnValue = false; // IE
/**
* This is the handler that captures mousemove events when an element
* is being dragged. It is responsible for moving the element.
**/
function moveHandler(e) {
if (!e) e = window.event; // IE event Model
// Move the element to the current mouse position, adjusted by the
// position of the scrollbars and the offset of the initial click.
var scroll = getScrollOffsets();
elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
// And don't let anyone else see this event.
if (e.stopPropagation) e.stopPropagation(); // Standard
else e.cancelBubble = true; // IE
}
/**
* This is the handler that captures the final mouseup event that
* occurs at the end of a drag.
**/
function upHandler(e) {
if (!e) e = window.event; // IE Event Model
// Unregister the capturing event handlers.
if (document.removeEventListener) { // DOM event model
document.removeEventListener("mouseup", upHandler, true);
document.removeEventListener("mousemove", moveHandler, true);
}
else if (document.detachEvent) { // IE 5+ Event Model
elementToDrag.detachEvent("onlosecapture", upHandler);
elementToDrag.detachEvent("onmouseup", upHandler);
elementToDrag.detachEvent("onmousemove", moveHandler);
elementToDrag.releaseCapture();
}
// And don't let the event propagate any further.
if (e.stopPropagation) e.stopPropagation(); // Standard model
else e.cancelBubble = true; // IE
}
}




<script src="getScrollOffsets.js"></script> <!-- drag() requires this -->
<script src="Drag.js"></script> <!-- defines drag() -->
<!-- The element to be dragged -->
<div style="position:absolute; left:100px; top:100px; width:250px;
background-color: white; border: solid black;">
<!-- The "titlebar" to drag it with. Note the onmousedown attribute. -->
<div style="background-color: gray; border-bottom: dotted black;
padding: 3px; font-family: sans-serif; font-weight: bold;"
onmousedown="drag(this.parentNode, event);">
Drag Me <!-- The content of the titlebar -->
</div>
<!-- Content of the draggable element -->
<p>This is a test. Testing, testing, testing.</p><p>Test</p><p>Test</p>
</div>


<script src="whenReady.js"></script>
<script src="Enclose.js"></script>
<script>
whenReady(function() {
enclose(document.getElementById("content"),400,200,-200,-300);
});
</script>
<style>div.enclosure { border: solid black 10px; margin: 10px; }</style>
<img id="content" src="testimage.jpg"/>


function enclose(content, framewidth, frameheight, contentX, contentY) {
// These arguments aren't just the initial values: they maintain the
// current state and are used and modified by the mousewheel handler.
framewidth = Math.max(framewidth, 50);
frameheight = Math.max(frameheight, 50);
contentX = Math.min(contentX, 0) || 0;
contentY = Math.min(contentY, 0) || 0;
// Create the frame element and set a CSS classname and styles
var frame = document.createElement("div");
frame.className = "enclosure"; // So we can define styles in a stylesheet
frame.style.width = framewidth + "px"; // Set the frame size.
frame.style.height = frameheight + "px";
frame.style.overflow = "hidden"; // No scrollbars, no overflow
frame.style.boxSizing = "border-box"; // Border-box simplifies the
frame.style.webkitBoxSizing = "border-box"; // calculations for resizing
frame.style.MozBoxSizing = "border-box"; // the frame.
// Put the frame in the document and move the content elt into the frame.
content.parentNode.insertBefore(frame, content);
frame.appendChild(content);
// Position the element relative to the frame
content.style.position = "relative";
content.style.left = contentX + "px";
content.style.top = contentY + "px";
// We'll need to work around some browser-specific quirks below
var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 &&
navigator.userAgent.indexOf("WebKit") !== -1);
var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);
// Register mousewheel event handlers.
frame.onwheel = wheelHandler; // Future browsers
frame.onmousewheel = wheelHandler; // Most current browsers
if (isFirefox) // Firefox only
frame.addEventListener("DOMMouseScroll", wheelHandler, false);
function wheelHandler(event) {
var e = event || window.event; // Standard or IE event object
// Extract the amount of rotation from the event object, looking
// for properties of a wheel event object, a mousewheel event object
// (in both its 2D and 1D forms), and the Firefox DOMMouseScroll event.
// Scale the deltas so that one "click" toward the screen is 30 pixels.
// If future browsers fire both "wheel" and "mousewheel" for the same
// event, we'll end up double-counting it here. Hopefully, however,
// cancelling the wheel event will prevent generation of mousewheel.
var deltaX = e.deltaX*-30 || // wheel event
e.wheelDeltaX/4 || // mousewheel
0; // property not defined
var deltaY = e.deltaY*-30 || // wheel event
e.wheelDeltaY/4 || // mousewheel event in Webkit
(e.wheelDeltaY===undefined && // if there is no 2D property then
e.wheelDelta/4) || // use the 1D wheel property
e.detail*-10 || // Firefox DOMMouseScroll event
0; // property not defined
// Most browsers generate one event with delta 120 per mousewheel click.
// On Macs, however, the mousewheels seem to be velocity-sensitive and
// the delta values are often larger multiples of 120, at
// least with the Apple Mouse. Use browser-testing to defeat this.
if (isMacWebkit) {
deltaX /= 30;
deltaY /= 30;
}
// If we ever get a mousewheel or wheel event in (a future version of)
// Firefox, then we don't need DOMMouseScroll anymore.
if (isFirefox && e.type !== "DOMMouseScroll")
frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
// Get the current dimensions of the content element
var contentbox = content.getBoundingClientRect();


var contentwidth = contentbox.right - contentbox.left;
var contentheight = contentbox.bottom - contentbox.top;
if (e.altKey) { // If Alt key is held down, resize the frame
if (deltaX) {
framewidth -= deltaX; // New width, but not bigger than the
framewidth = Math.min(framwidth, contentwidth); // content
framewidth = Math.max(framewidth,50); // and no less than 50.
frame.style.width = framewidth + "px"; // Set it on frame
}
if (deltaY) {
frameheight -= deltaY; // Do the same for the frame height
frameheight = Math.min(frameheight, contentheight);
frameheight = Math.max(frameheight-deltaY, 50);
frame.style.height = frameheight + "px";
}
}
else { // Without the Alt modifier, pan the content within the frame
if (deltaX) {
// Don't scroll more than this
var minoffset = Math.min(framewidth-contentwidth, 0);
// Add deltaX to contentX, but don't go lower than minoffset
contentX = Math.max(contentX + deltaX, minoffset);
contentX = Math.min(contentX, 0); // or higher than 0
content.style.left = contentX + "px"; // Set new offset
}
if (deltaY) {
var minoffset = Math.min(frameheight - contentheight, 0);
// Add deltaY to contentY, but don't go lower than minoffset
contentY = Math.max(contentY + deltaY, minoffset);
contentY = Math.min(contentY, 0); // Or higher than 0
content.style.top = contentY + "px"; // Set the new offset.
}
}
// Don't let this event bubble. Prevent any default action.
// This stops the browser from using the mousewheel event to scroll
// the document. Hopefully calling preventDefault() on a wheel event
// will also prevent the generation of a mousewheel event for the
// same rotation.
if (e.preventDefault) e.preventDefault();
if (e.stopPropagation) e.stopPropagation();
e.cancelBubble = true; // IE events
e.returnValue = false; // IE events
return false;
}
}


<script src="whenReady.js"></script>
<script>
whenReady(function() {
var clock = document.getElementById("clock"); // The clock element
var icon = new Image(); // An image to drag
icon.src = "clock-icon.png"; // Image URL
// Display the time once every minute
function displayTime() {
var now = new Date(); // Get current time
var hrs = now.getHours(), mins = now.getMinutes();
if (mins < 10) mins = "0" + mins;
clock.innerHTML = hrs + ":" + mins; // Display current time
setTimeout(displayTime, 60000); // Run again in 1 minute
}
displayTime();
// Make the clock draggable
// We can also do this with an HTML attribute: <span draggable="true">...
clock.draggable = true;
// Set up drag event handlers
clock.ondragstart = function(event) {
var event = event || window.event; // For IE compatability
// The dataTransfer property is key to the drag-and-drop API
var dt = event.dataTransfer;
// Tell the browser what is being dragged.
// The Date() constructor used as a function returns a timestamp string
dt.setData("Text", Date() + "\n");
// Tell the browser to drag our icon to represent the timestamp, in
// browsers that support that. Without this line, the browser may
// use an image of the clock text as the value to drag.
if (dt.setDragImage) dt.setDragImage(icon, 0, 0);
};
});
</script>
<style>
#clock { /* Make the clock look nice */
font: bold 24pt sans; background: #ddf; padding: 10px;
border: solid black 2px; border-radius: 10px;
}
</style>
<h1>Drag timestamps from the clock</h1>
<span id="clock"></span> <!-- The time is displayed here -->
<textarea cols=60 rows=20></textarea> <!-- You can drop timestamps here -->



/*
* The DnD API is quite complicated, and browsers are not fully interoperable.
* This example gets the basics right, but each browser is a little different
* and each one seems to have its own unique bugs. This code does not attempt
* browser-specific workarounds.
*/
whenReady(function() { // Run this function when the document is ready
// Find all <ul class='dnd'> elements and call the dnd() function on them
var lists = document.getElementsByTagName("ul");
var regexp = /\bdnd\b/;
for(var i = 0; i < lists.length; i++)
if (regexp.test(lists[i].className)) dnd(lists[i]);
// Add drag-and-drop handlers to a list element
function dnd(list) {
var original_class = list.className; // Remember original CSS class
var entered = 0; // Track enters and leaves
// This handler is invoked when a drag first enters the list. It checks
// that the drag contains data in a format it can process and, if so,
// returns false to indicate interest in a drop. In that case, it also
// highlights the drop target to let the user know of that interest.
list.ondragenter = function(e) {
e = e || window.event; // Standard or IE event
var from = e.relatedTarget;
// dragenter and dragleave events bubble, which makes it tricky to
// If we entered from outside the list or if
// this is the first entrance then we need to do some stuff
entered++;
if ((from && !ischild(from, list)) || entered == 1) {
// All the DnD info is in this dataTransfer object
var dt = e.dataTransfer;
// The dt.types object lists the types or formats that the data
// being dragged is available in. HTML5 says the type has a
// contains() method. In some browsers it is an array with an
// indexOf method. In IE8 and before, it simply doesn't exist.
var types = dt.types; // What formats data is available in
// If we don't have any type data or if data is
// available in plain text format, then highlight the
// list to let the user know we're listening for drop
// and return false to let the browser know.
if (!types || // IE
(types.contains && types.contains("text/plain")) || //HTML5
(types.indexOf && types.indexOf("text/plain")!=-1)) //Webkit
{
list.className = original_class + " droppable";
return false;
}
// If we don't recognize the data type, we don't want a drop
return; // without canceling
}
return false; // If not the first enter, we're still interested
};
// This handler is invoked as the mouse moves over the list.
// We have to define this handler and return false or the drag
// will be canceled.
list.ondragover = function(e) { return false; };
// This handler is invoked when the drag moves out of the list
// or out of one of its children. If we are actually leaving the list
// (not just going from one list item to another), then unhighlight it.
list.ondragleave = function(e) {
e = e || window.event;
var to = e.relatedTarget;
// If we're leaving for something outside the list or if this leave
// balances out the enters, then unhighlight the list
entered--;
if ((to && !ischild(to,list)) || entered <= 0) {
list.className = original_class;
entered = 0;
}
return false;
};
// This handler is invoked when a drop actually happens.
// We take the dropped text and make it into a new <li> element
list.ondrop = function(e) {
e = e || window.event; // Get the event
// Get the data that was dropped in plain text format.
// "Text" is a nickname for "text/plain".
// IE does not support "text/plain", so we use "Text" here.
var dt = e.dataTransfer; // dataTransfer object
var text = dt.getData("Text"); // Get dropped data as plain text.
// If we got some text, turn it into a new item at list end.
if (text) {
var item = document.createElement("li"); // Create new <li>
item.draggable = true; // Make it draggable
item.appendChild(document.createTextNode(text)); // Add text
list.appendChild(item); // Add it to the list
// Restore the list's original style and reset the entered count
list.className = original_class;
entered = 0;
return false;
}
};
// Make all items that were originally in the list draggable
var items = list.getElementsByTagName("li");
for(var i = 0; i < items.length; i++)
items[i].draggable = true;
// And register event handlers for dragging list items.
// Note that we put these handlers on the list and let events
// bubble up from the items.
// This handler is invoked when a drag is initiated within the list.
list.ondragstart = function(e) {
var e = e || window.event;
var target = e.target || e.srcElement;
// If it bubbled up from something other than a <li>, ignore it
if (target.tagName !== "LI") return false;
// Get the all-important dataTransfer object
var dt = e.dataTransfer;
// Tell it what data we have to drag and what format it is in
dt.setData("Text", target.innerText || target.textContent);
// Tell it we know how to allow copies or moves of the data
dt.effectAllowed = "copyMove";
};
// This handler is invoked after a successful drop occurs
list.ondragend = function(e) {
e = e || window.event;
var target = e.target || e.srcElement;
// copy or move operation.
if (e.dataTransfer.dropEffect === "move")
target.parentNode.removeChild(target);
}
// This is the utility function we used in ondragenter and ondragleave.
// Return true if a is a child of b.
function ischild(a,b) {
for(; a; a = a.parentNode) if (a === b) return true;
return false;
}
}
});


/**
* InputFilter.js: unobtrusive filtering of keystrokes for <input> elements
*
* This module finds all <input type="text"> elements in the document that
* have an "data-allowed-chars" attribute. It registers keypress, textInput, and
* textinput event handlers for any such element to restrict the user's input
* so that only characters that appear in the value of the attribute may be
* entered. If the <input> element also has an attribute named "data-messageid",
* the value of that attribute is taken to be the id of another document
* element. If the user types a character that is not allowed, the message
* element is made visible. If the user types a character that is allowed, the
* message element is hidden. This message id element is intended to offer
* an explanation to the user of why her keystroke was rejected. It should
* typically be styled with CSS so that it is initially invisible.
*
* Here is sample HTML that uses this module.
* Zipcode: <input id="zip" type="text"
* data-allowed-chars="0123456789" data-messageid="zipwarn">
* <span id="zipwarn" style="color:red;visibility:hidden">Digits only</span>
*
* This module is purely unobtrusive: it does not define any symbols in
* the global namespace.
*/
whenReady(function () { // Run this function when the document is loaded
// Find all <input> elements
var inputelts = document.getElementsByTagName("input");
// Loop through them all
for(var i = 0 ; i < inputelts.length; i++) {
var elt = inputelts[i];
// Skip those that aren't text fields or that don't have
// a data-allowed-chars attribute.
if (elt.type != "text" || !elt.getAttribute("data-allowed-chars"))
continue;
// Register our event handler function on this input element
// keypress is a legacy event handler that works everywhere.
// textInput (mixed-case) is supported by Safari and Chrome in 2010.
// textinput (lowercase) is the version in the DOM Level 3 Events draft.
if (elt.addEventListener) {
elt.addEventListener("keypress", filter, false);
elt.addEventListener("textInput", filter, false);
elt.addEventListener("textinput", filter, false);
}
else { // textinput not supported versions of IE w/o addEventListener()
elt.attachEvent("onkeypress", filter);
}
}
// This is the keypress and textInput handler that filters the user's input
function filter(event) {
// Get the event object and the target element target
var e = event || window.event; // Standard or IE model
var target = e.target || e.srcElement; // Standard or IE model
var text = null; // The text that was entered
// Get the character or text that was entered
if (e.type === "textinput" || e.type === "textInput") text = e.data;
else { // This was a legacy keypress event
// Firefox uses charCode for printable key press events
var code = e.charCode || e.keyCode;
// If this keystroke is a function key of any kind, do not filter it
if (code < 32 || // ASCII control character
e.charCode == 0 || // Function key (Firefox only)
e.ctrlKey || e.altKey) // Modifier key held down
return; // Don't filter this event
// Convert character code into a string
var text = String.fromCharCode(code);
}
// Now look up information we need from this input element
var allowed = target.getAttribute("data-allowed-chars"); // Legal chars
var messageid = target.getAttribute("data-messageid"); // Message id
if (messageid) // If there is a message id, get the element
var messageElement = document.getElementById(messageid);
// Loop through the characters of the input text
for(var i = 0; i < text.length; i++) {
var c = text.charAt(i);
if (allowed.indexOf(c) == -1) { // Is this a disallowed character?
// Display the message element, if there is one
if (messageElement) messageElement.style.visibility = "visible";
// Cancel the default action so the text isn't inserted
if (e.preventDefault) e.preventDefault();
if (e.returnValue) e.returnValue = false;
return false;
}
}
// If all the characters were legal, hide the message if there is one.
if (messageElement) messageElement.style.visibility = "hidden";
}
});


function forceToUpperCase(element) {
if (typeof element === "string") element = document.getElementById(element);
element.oninput = upcase;
element.onpropertychange = upcaseOnPropertyChange;
// Easy case: the handler for the input event
function upcase(event) { this.value = this.value.toUpperCase(); }
// Hard case: the handler for the propertychange event
function upcaseOnPropertyChange(event) {
var e = event || window.event;
// If the value property changed
if (e.propertyName === "value") {
// Remove onpropertychange handler to avoid recursion
this.onpropertychange = null;
// Change the value to all uppercase
this.value = this.value.toUpperCase();
// And restore the original propertychange handler
this.onpropertychange = upcaseOnPropertyChange;
}
}
}

// This is the constructor function
function Keymap(bindings) {
this.map = {}; // Define the key identifier->handler map
if (bindings) { // Copy initial bindings into it
for(name in bindings) this.bind(name, bindings[name]);
}
}
// Bind the specified key identifier to the specified handler function
Keymap.prototype.bind = function(key, func) {
this.map[Keymap.normalize(key)] = func;
};
// Delete the binding for the specified key identifier
Keymap.prototype.unbind = function(key) {
delete this.map[Keymap.normalize(key)];
};
// Install this Keymap on the specified HTML element
Keymap.prototype.install = function(element) {
// This is the event-handler function
var keymap = this;
function handler(event) { return keymap.dispatch(event, element); }
// Now install it
if (element.addEventListener)
element.addEventListener("keydown", handler, false);
else if (element.attachEvent)
element.attachEvent("onkeydown", handler);
};
// This method dispatches key events based on the keymap bindings.
Keymap.prototype.dispatch = function(event, element) {
// We start off with no modifiers and no key name
var modifiers = ""
var keyname = null;
// Build the modifier string in canonical lowercase alphabetical order.
if (event.altKey) modifiers += "alt_";
if (event.ctrlKey) modifiers += "ctrl_";
if (event.metaKey) modifiers += "meta_";
if (event.shiftKey) modifiers += "shift_";
// The keyname is easy if the DOM Level 3 key property is implemented:
if (event.key) keyname = event.key;
// Use the keyIdentifier on Safari and Chrome for function key names
else if (event.keyIdentifier && event.keyIdentifier.substring(0,2) !== "U+")
keyname = event.keyIdentifier;
// Otherwise, use the keyCode property and the code-to-name map below
else keyname = Keymap.keyCodeToKeyName[event.keyCode];
// If we couldn't figure out a key name, just return and ignore the event.
if (!keyname) return;
// The canonical key id is modifiers plus lowercase key name
var keyid = modifiers + keyname.toLowerCase();
// Now see if the key identifier is bound to anything
var handler = this.map[keyid];
if (handler) { // If there is a handler for this key, handle it
// Invoke the handler function
var retval = handler.call(element, event, keyid);
// If the handler returns false, cancel default and prevent bubbling
if (retval === false) {
if (event.stopPropagation) event.stopPropagation(); // DOM model
else event.cancelBubble = true; // IE model
if (event.preventDefault) event.preventDefault(); // DOM
else event.returnValue = false; // IE
}
// Return whatever the handler returned
return retval;
}
};
// Utility function to convert a key identifier to canonical form.
// On non-Macintosh hardware, we could map "meta" to "ctrl" here, so that
// Meta-C would be "Command-C" on the Mac and "Ctrl-C" everywhere else.
Keymap.normalize = function(keyid) {
keyid = keyid.toLowerCase(); // Everything lowercase
var words = keyid.split(/\s+|[\-+_]/); // Split modifiers from name
var keyname = words.pop(); // keyname is the last word
keyname = Keymap.aliases[keyname] || keyname; // Is it an alias?
words.sort(); // Sort remaining modifiers
words.push(keyname); // Add the normalized name back
return words.join("_"); // Concatenate them all
};
Keymap.aliases = { // Map common key aliases to their "official"
"escape":"esc", // key names used by DOM Level 3 and by
"delete":"del", // the key code to key name map below.
"return":"enter", // Both keys and values must be lowercase here.
"ctrl":"control",
"space":"spacebar",
"ins":"insert"
};
// The legacy keyCode property of the keydown event object is not standardized
// But the following values seem to work for most browsers and OSes.
Keymap.keyCodeToKeyName = {
// Keys with words or arrows on them
8:"Backspace", 9:"Tab", 13:"Enter", 16:"Shift", 17:"Control", 18:"Alt",
19:"Pause", 20:"CapsLock", 27:"Esc", 32:"Spacebar", 33:"PageUp",
34:"PageDown", 35:"End", 36:"Home", 37:"Left", 38:"Up", 39:"Right",
40:"Down", 45:"Insert", 46:"Del",
// Number keys on main keyboard (not keypad)
48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
// Letter keys. Note that we don't distinguish upper and lower case
65:"A", 66:"B", 67:"C", 68:"D", 69:"E", 70:"F", 71:"G", 72:"H", 73:"I",
74:"J", 75:"K", 76:"L", 77:"M", 78:"N", 79:"O", 80:"P", 81:"Q", 82:"R",
83:"S", 84:"T", 85:"U", 86:"V", 87:"W", 88:"X", 89:"Y", 90:"Z",
// Keypad numbers and punctuation keys. (Opera does not support these.)
96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
106:"Multiply", 107:"Add", 109:"Subtract", 110:"Decimal", 111:"Divide",
// Function keys
112:"F1", 113:"F2", 114:"F3", 115:"F4", 116:"F5", 117:"F6",
118:"F7", 119:"F8", 120:"F9", 121:"F10", 122:"F11", 123:"F12",
124:"F13", 125:"F14", 126:"F15", 127:"F16", 128:"F17", 129:"F18",
130:"F19", 131:"F20", 132:"F21", 133:"F22", 134:"F23", 135:"F24",
// Punctuation keys that don't require holding down Shift
// Hyphen is nonportable: FF returns same code as Subtract
59:";", 61:"=", 186:";", 187:"=", // Firefox and Opera return 59,61
188:",", 190:".", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"
};


