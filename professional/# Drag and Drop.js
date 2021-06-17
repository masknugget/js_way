# Drag and Drop

1. dragstart
2. drag
3. dragend


<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
    function handleDragDropEvent(oEvent) {
        var oTextbox = document.getElementById(“txt1”);
        oTextbox.value += oEvent.type + “\n”;
    }

    </script>
</head>
<body>
<form>
    <p>Try dragging the image.</p>
    <p><img src=”images/smiley.gif” alt=””
            ondragstart=”handleDragDropEvent(event)”
            ondrag=”handleDragDropEvent(event)”
            ondragend=”handleDragDropEvent(event)”/></p>
    <p><textarea rows=”10” cols=”25” readonly=”readonly”
                 id=”txt1”></textarea></p>
</form>
</body>
</html>



<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += oEvent.type + “\n”;
}

    </script>
</head>
<body>
<form>
    <p>Try dragging the text from the left textbox to the right one.</p>
    <p><input type=”text” value=”drag this text”/>
        <input type=”text” ondragenter=”handleDragDropEvent(event)”
               ondragover=”handleDragDropEvent(event)”
               ondragleave=”handleDragDropEvent(event)”
               ondrop=”handleDragDropEvent(event)”/></p>
    <p><textarea rows=”10” cols=”25” readonly=”readonly”
                 id=”txt1”></textarea></p>
</form>
</body>
</html>



<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += oEvent.type + “\n”;
}

    </script>
</head>
<body>
<p>Try dragging the text from the left textbox to the right one.</p>
<form>
    <p><input type=”text” value=”drag this text”
              ondragstart=”handleDragDropEvent(event)”
              ondrag=”handleDragDropEvent(event)”
              ondragend=”handleDragDropEvent(event)”/>
        <input type=”text” ondragenter=”handleDragDropEvent(event)”
               ondragover=”handleDragDropEvent(event)”
               ondragleave=”handleDragDropEvent(event)”
               ondrop=”handleDragDropEvent(event)”/></p>
    <p><textarea rows=”10” cols=”25” readonly=”readonly”
                 id=”txt1”></textarea></p>
</form>
</body>
</html>





<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += oEvent.type + “\n”;
}

    </script>
</head>
<body>
<p>Try dragging the text from the textbox to the red square.
    No drop target events fire.</p>
<form>
    <p><input type=”text” value=”drag this text”
              ondragstart=”handleDragDropEvent(event)”
              ondrag=”handleDragDropEvent(event)”
              ondragend=”handleDragDropEvent(event)”/>
    <div style=”background-color: red; height: 100px; width: 100px”
         ondragenter=”handleDragDropEvent(event)”
         ondragover=”handleDragDropEvent(event)”
         ondragleave=”handleDragDropEvent(event)”
         ondrop=”handleDragDropEvent(event)”></div>
    </p>
    <p><textarea rows=”10” cols=”25” readonly=”readonly”
                 id=”txt1”></textarea></p>
</form>
</body>
</html>




<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
var oTextbox = document.getElementById(“txt1”);
oTextbox.value += oEvent.type + “\n”;
switch(oEvent.type) {
case “dragover”:
case “dragenter”:
oEvent.returnValue = false;
}
}

    </script>
</head>
<body>
<p>Try dragging the text from the textbox to the red square.
    Drop target events fire now.</p>
<form>
    <p><input type=”text” value=”drag this text”
              ondragstart=”handleDragDropEvent(event)”
              ondrag=”handleDragDropEvent(event)”
              ondragend=”handleDragDropEvent(event)”/>
    <div style=”background-color: red; height: 100px; width: 100px”
         ondragenter=”handleDragDropEvent(event)”
         ondragover=”handleDragDropEvent(event)”
         ondragleave=”handleDragDropEvent(event)”
         ondrop=”handleDragDropEvent(event)”></div>
    </p>
    <p><textarea rows=”10” cols=”25” readonly=”readonly”
                 id=”txt1”></textarea></p>
</form>
</body>
</html>



oEvent.dataTransfer.setData(“text”, “some text”);
var sData = oEvent.dataTransfer.getData(“text”);
oEvent.dataTransfer.setData(“URL”, “http://www.wrox.com/”);
var sURL = oEvent.dataTransfer.getData(“URL”);



<html>
<head>
    <title>System Drag And Drop Example</title>
    <script type=”text/javascript”>
    function handleDragDropEvent(oEvent) {
        switch(oEvent.type) {
            case “dragover”:
            case “dragenter”:
                oEvent.returnValue = false;
            break;
            case “drop”:
        alert(oEvent.dataTransfer.getData(“text”));
    }
}

    </script>
</head>
<body>
<p>Try dragging the text from the textbox to the red square.
    It will show you the selected text when dropped.</p>
<p><input type=”text” value=”drag this text”/>
<div style=”background-color: red; height: 100px; width: 100px”
     ondragenter=”handleDragDropEvent(event)”
     ondragover=”handleDragDropEvent(event)”
     ondrop=”handleDragDropEvent(event)”></div>
</p>
</body>
</html>





<html>
<head>
<title>System Drag And Drop Example</title>
<script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
switch(oEvent.type) {
case “dragover”:
case “dragenter”:
oEvent.returnValue = false;
break;
case “drop”:
alert(oEvent.dataTransfer.getData(“URL”));
}
}
</script>
</head>
<body>
<p>Try dragging the link to the red square.
It will show you the URL when dropped.</p>
<p><a href=”http://www.wrox.com” target=”_blank”>Wrox Home Page</a>
<div style=”background-color: red; height: 100px; width: 100px”
ondragenter=”handleDragDropEvent(event)”
ondragover=”handleDragDropEvent(event)”
ondrop=”handleDragDropEvent(event)”></div></p>
</body>
</html>



The dropEffect property is set on the drop target to determine which type of drop behavior is allowed.
These are four possible values:
❑ “none” — Adragged item cannot be dropped here. This is the default value for everything but
text boxes.
❑ “move” — Indicates that the dragged item should be moved to the drop target.
❑ “copy” — Indicates that the dragged item should be copied to the drop target.
❑ “link” — Indicates that the drop target will navigate to the dragged item (but only if it is a URL).


❑ “uninitialized” — No action has been set for the dragged item.
❑ “none” — No action is allowed on the dragged item.
❑ “copy” — Only dropEffect “copy” is allowed.
❑ “link” — Only dropEffect “link” is allowed.
❑ “move” — Only dropEffect “move” is allowed.
❑ “copyLink” — dropEffect s “copy” and “link” are allowed.
❑ “copyMove” — dropEffect s “copy” and “move” are allowed.
❑ “linkMove” — dropEffect s “link” and “move” are allowed.
❑ “all” — All dropEffect s are allowed.



<html>
<head>
<title>System Drag And Drop Example</title>
<script type=”text/javascript”>
function handleDragDropEvent(oEvent) {
switch(oEvent.type) {
case “dragstart”:
oEvent.dataTransfer.effectAllowed = “move”;
break;
case “dragenter”:
oEvent.dataTransfer.dropEffect = “move”;
oEvent.returnValue = false;
break;
case “dragover”:
oEvent.returnValue = false;
break;
case “drop”:
oEvent.returnValue = false;
oEvent.srcElement.innerHTML =
oEvent.dataTransfer.getData(“text”);
}
}
</script>
</head>
<body>
<p>Try dragging the text in the textbox to the red square.
The text will be “moved” to the red square.</p>
<p><input type=”text” value=”drag this text”
ondragstart=”handleDragDropEvent(event)” />
<div style=”background-color: red; height: 100px; width: 100px”
ondragenter=”handleDragDropEvent(event)”
ondragover=”handleDragDropEvent(event)”
ondrop=”handleDragDropEvent(event)”></div>
</p>
</body>
</html>



oElement.onmousemove = function (oEvent) {
if (oEvent.button == 1) {
    oElement.dragDrop();
}
};





<html>
<head>
<title>System Drag And Drop Example</title>
<script type=”text/javascript”>
function handleMouseMove(oEvent) {
if (oEvent.button == 1) {
oEvent.srcElement.dragDrop();
}
}
function handleDragDropEvent(oEvent) {
oEvent.dataTransfer.setData(“text”, “This is a red square”);
}
</script>
</head>
<body>
<p>Try dragging the red square into the textbox.</p>
<p><div style=”background-color: red; height: 100px; width: 100px”
onmousemove=”handleMouseMove(event)”
ondragstart=”handleDragDropEvent(event)”>This is a red square</div>
</p>
<form>
<p><input type=”text” value=”” /></p>
</form>
</body>
</html>




<html>
<head>
<title>System Drag And Drop Example</title>
<script type=”text/javascript”>
function handleMouseMove(oEvent) {
if (oEvent.button == 1) {
    oEvent.srcElement.dragDrop();
}
}
function handleDragDropEvent(oEvent) {
oEvent.dataTransfer.setData(“URL”, “http://www.wrox.com/”);
}
</script>
</head>
<body>
<p>Try dragging the red square into another browser window.</p>
<p><div style=”background-color: red; height: 100px; width: 100px”
onmousemove=”handleMouseMove(event)”
ondragstart=”handleDragDropEvent(event)”>http://www.wrox.com</div>
</p>
</body>
</html>




<html>
<head>
<title>Simulated Drag And Drop Example</title>
<script type=”text/javascript”>

function handleMouseMove(oEvent) {
var oDiv = document.getElementById(“div1”);
oDiv.style.left = oEvent.clientX;
oDiv.style.top = oEvent.clientY;
}
</script>
<style type=”text/css”>
#div1 {
background-color: red;
height: 100px;
width: 100px;
position: absolute;
}
</style>
</head>
<body onmousemove=”handleMouseMove(event)”>
<p>Try moving your mouse around.</p>
<p><div id=”div1”></div> </p>
</body>
</html>



<html>
<head>
<title>Simulated Drag And Drop Example</title>
<script type=”text/javascript” src=”eventutil.js”></script>
<script type=”text/javascript”>
function handleMouseMove() {
var oEvent = EventUtil.getEvent();
var oDiv = document.getElementById(“div1”);
oDiv.style.left = oEvent.clientX;
oDiv.style.top = oEvent.clientY;
}
function handleMouseDown() {
EventUtil.addEventHandler(document.body, “mousemove”,
handleMouseMove);
EventUtil.addEventHandler(document.body, “mouseup”,
handleMouseUp);
}
function handleMouseUp() {
EventUtil.removeEventHandler(document.body, “mousemove”,
handleMouseMove);
EventUtil.removeEventHandler(document.body, “mouseup”,
handleMouseUp);
}
</script>
<style type=”text/css”>
#div1 {
background-color: red;
height: 100px;
width: 100px;
position: absolute;
}
</style>
</head>
<body>
<p>Try dragging the red square.</p>
<p><div id=”div1” onmousedown=”handleMouseDown()”></div> </p>
</body>
</html>



var iDiffX = 0;
var iDiffY = 0;
function handleMouseMove() {
var oEvent = EventUtil.getEvent();
var oDiv = document.getElementById(“div1”);
oDiv.style.left = oEvent.clientX - iDiffX;
oDiv.style.top = oEvent.clientY - iDiffY;
}
function handleMouseDown() {
var oEvent = EventUtil.getEvent();
var oDiv = document.getElementById(“div1”);
iDiffX = oEvent.clientX - oDiv.offsetLeft;
iDiffY = oEvent.clientY - oDiv.offsetTop;
EventUtil.addEventHandler(document.body, “mousemove”, handleMouseMove);
EventUtil.addEventHandler(document.body, “mouseup”, handleMouseUp);
}
function handleMouseUp() {
EventUtil.removeEventHandler(document.body, “mousemove”, handleMouseMove);
EventUtil.removeEventHandler(document.body, “mouseup”, handleMouseUp);
}





function isOverDropTarget(iX, iY) {
var oTarget = document.getElementById(“divDropTarget”);
var iX1 = oTarget.offsetLeft;
var iX2 = iX1 + oTarget.offsetWidth;
var iY1 = oTarget.offsetTop;
var iY2 = iY1 + oTarget.offsetHeight;
return (iX >= iX1 && iX <= iX2 && iY >= iY1 && iY <= iY2);
}



function handleMouseUp() {
var oEvent = EventUtil.getEvent();
EventUtil.removeEventHandler(document.body, “mousemove”, handleMouseMove);
EventUtil.removeEventHandler(document.body, “mouseup”, handleMouseUp);
if (isOverDropTarget(oEvent.clientX,oEvent.clientY)) {
alert(“dropped!”);
var oDiv = document.getElementById(“divDropTarget”);
var oTarget = document.getElementById(“div2”);
oDiv.style.left = oTarget.offsetLeft;
oDiv.style.top = oTarget.offsetTop;
}
}



<html>
<head>
<title>Simulated Drag And Drop Example</title>
<script type=”text/javascript” src=”eventutil.js”></script>
<script type=”text/javascript”>
var iDiffX = 0;
var iDiffY = 0;
function handleMouseMove() {
var oEvent = EventUtil.getEvent();
var oDiv = document.getElementById(“div1”);
oDiv.style.left = oEvent.clientX - iDiffX;
oDiv.style.top = oEvent.clientY - iDiffY;
}
function handleMouseDown() {
var oEvent = EventUtil.getEvent();
var oDiv = document.getElementById(“div1”);
iDiffX = oEvent.clientX - oDiv.offsetLeft;
iDiffY = oEvent.clientY - oDiv.offsetTop;
EventUtil.addEventHandler(document.body, “mousemove”,
handleMouseMove);
EventUtil.addEventHandler(document.body, “mouseup”, handleMouseUp);
}
function handleMouseUp() {
var oEvent = EventUtil.getEvent();
EventUtil.removeEventHandler(document.body, “mousemove”,
handleMouseMove);
EventUtil.removeEventHandler(document.body, “mouseup”,
handleMouseUp);
if (isOverDropTarget(oEvent.clientX,oEvent.clientY)) {
alert(“dropped!”);
var oDiv = document.getElementById(“div1”);
var oTarget = document.getElementById(“divDropTarget”);
oDiv.style.left = oTarget.offsetLeft;
oDiv.style.top = oTarget.offsetTop;
}
}
function isOverDropTarget(iX, iY) {
var oTarget = document.getElementById(“divDropTarget”);
var iX1 = oTarget.offsetLeft;
var iX2 = iX1 + oTarget.offsetWidth;
var iY1 = oTarget.offsetTop;
var iY2 = iY1 + oTarget.offsetHeight;
return (iX >= iX1 && iX <= iX2 && iY >= iY1 && iY <= iY2);
}
</script>
<style type=”text/css”>
#div1 {
background-color: red;
height: 100px;
width: 100px;
position: absolute;
z-index: 10;
}
#divDropTarget {
background-color: blue;
height: 200px;
width: 200px;
position: absolute;
left: 300px;
}
</style>
</head>
<body>
<p>Try dragging the red square onto the blue square.</p>
<div id=”div1” onmousedown=”handleMouseDown(event)”></div>
<div id=”divDropTarget”></div>
</body>
</html>

var oDiv = document.getElementById(“divToDrag”);
var oDraggable = new zDraggable(oDiv, zDraggable.DRAG_X);


var oDiv = document.getElementById(“divToDrag”);
var oDraggable = new zDraggable(oDiv, zDraggable.DRAG_Y);

var oDiv = document.getElementById(“divToDrag”);
var oDraggable = new zDraggable(oDiv, zDraggable.DRAG_X | zDraggable.DRAG_Y);

var oDivTarget = document.getElementById(“divDropTarget”);
var oDropTarget = new zDropTarget(oDiv);



var oDivToDrag = document.getElementById(“divToDrag”);
var oDivTarget = document.getElementById(“divDropTarget”);
var oDraggable = new zDraggable(oDiv, zDraggable.DRAG_X | zDraggable.DRAG_Y);
var oDropTarget = new zDropTarget(oDiv);
oDraggable.addDropTarget(oDropTarget);



❑ dragstart — Occurs immediately before beginning to drag the element.
❑ drag — Fires continuously while the element is being dragged.
❑ dragend —Fires after the element has stopped being dragged, regardless of whether it has
been dropped on a valid drop target.


oDropTarget.addEventListener(“drop”, function () {
alert(“dropped”);
});


function handleDragEnd() {
alert(“drag end”);
}
oDraggable.addEventListener(“dragend”, handleDragEnd);
//other code here
oDraggable.removeEventListner(“dragend”, handleDragEnd);


oDraggable.addEventListener(“dragstart”, function (oEvent) {
alert(oEvent.type + “ occurred at “ + oEvent.timeStamp);
oEvent.preventDefault();
});


❑ zDraggable.moveTo(x, y) — Moves the zDraggable element to the position x,y.
❑ zDropTarget.getLeft() — Returns the left coordinate of the drop target.
❑ zDropTarget.getTop() — Returns the top coordinate of the drop target.


<html>
<head>
<title>Simulated Drag And Drop Example</title>
<script type=”text/javascript” src=”zdragdroplib.js”></script>
<script type=”text/javascript”>
function doLoad() {
var oDraggable = new zDraggable(document.getElementById(“div1”),
zDraggable.DRAG_X | zDraggable.DRAG_Y);
var oDropTarget =
new zDropTarget(document.getElementById(“divDropTarget”));
oDraggable.addDropTarget(oDropTarget);
oDropTarget.addEventListener(“drop”, function (oEvent) {
oEvent.relatedTarget.moveTo(oDropTarget.getLeft(),
oDropTarget.getTop());
});
}
</script>
<style type=”text/css”>
#div1 {
background-color: red;
height: 100px;
width: 100px;
position: absolute;
z-index: 10;
}
#divDropTarget {
background-color: blue;
height: 200px;
width: 200px;
position: absolute;
left: 300px;
}
</style>
</head>
<body onload=”doLoad()”>
<p>Try dragging the red square onto the blue square.</p>
<div id=”div1”></div>
<div id=”divDropTarget”></div>
</body>
</html>


