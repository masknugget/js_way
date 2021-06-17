# Sorting Tables


var arr = [3, 32, 2, 5]
arr.sort();
alert(arr.toString()); //outputs “2,3,32,5”


function comparison_function(value1, value2) {
if (value1 < value 2) {
    return –1;
} else if (value1 > value2) {
return 1;
} else {
return 0;
}
};


arr.sort(comparison_function);


function comparison_function_desc(value1, value2) {
if (value1 < value 2) {
return 1;
} else if (value1 > value2) {
return -1;
} else {
return 0;
}
};


function compareStrings(string1, string2) {
return string1.localeCompare(string2);
}


function compareStringsDesc(string1, string2) {
return -string1.localeCompare(string2);
}


function compareIntegers(vNum1, vNum2) {
var iNum1 = parseInt(vNum1);
var iNum2 = parseInt(vNum2);

if (iNum1 < iNum2) {
return –1;
} else if (iNum1 > iNum2) {
return 1;
} else {
return 0;
}
}


var arr = [3, 32, 2, 5]
arr.sort(compareIntegers);
alert(arr.toString()); //outputs “2,3,5,32”



var arr = [3, 32, 2, 5]
arr.sort(compareIntegers);
alert(arr.toString()); //outputs “2,3,5,32”
arr.reverse();
alert(arr.toString()); //outputs “32,5,3,2”




<table border=”1” id=”tblSort”>
<thead>
<tr>
<th>Last Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>Smith</td>
</tr>
<tr>
<td>Johnson</td>
</tr>
<tr>
<td>Henderson</td>
</tr>
<tr>
<td>Williams</td>
</tr>
<tr>
<td>Gilliam</td>
</tr>
<tr>
<td>Walker</td>
</tr>
</tbody>
</table>


var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;


var sSmith = colDataRows[0].cells[0].firstChild.nodeValue;


function compareTRs(oTR1, oTR2) {
var sValue1 = oTR1.cells[0].firstChild.nodeValue;
var sValue2 = oTR2.cells[0].firstChild.nodeValue;
return sValue1.localeCompare(sValue2);
}


function sortTable(sTableID) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
//...
}


function sortTable(sTableID) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs.push(colDataRows[i]);
}
//...
}


function sortTable(sTableID) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs.push(colDataRows[i]);
}
aTRs.sort(compareTRs);
//...
}



function sortTable(sTableID) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs[i] = colDataRows[i];
}
aTRs.sort(compareTRs);
var oFragment = document.createDocumentFragment();
for (var i=0; i < aTRs.length; i++) {
oFragment.appendChild(aTRs[i]);
}
oTBody.appendChild(oFragment);
}




<table border=”1” id=”tblSort”>
<thead>
<tr>
<th onclick=”sortTable(‘tblSort’)”
style=”cursor:pointer”>Last Name</th>
</tr>
</thead>
<tbody>
<!-- data rows -->
</tbody>
</table>



<table border=”1” id=”tblSort”>
<thead>
<tr>
<th>Last Name</th>
<th>First Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>Smith</td>
<td>John</td>
</tr>
<tr>
<td>Johnson</td>
<td>Betty</td>
</tr>
<tr>
<td>Henderson</td>
<td>Nathan</td>
</tr>
<tr>
<td>Williams</td>
<td>James</td>
</tr>
<tr>
<td>Gilliam</td>
<td>Michael</td>
</tr>
<tr>
<td>Walker</td>
<td>Matthew</td>
</tr>
</tbody>
</table>




function generateCompareTRs(iCol) {
return function compareTRs(oTR1, oTR2) {
var sValue1 = oTR1.cells[iCol].firstChild.nodeValue;
var sValue2 = oTR2.cells[iCol].firstChild.nodeValue;
return sValue1.localeCompare(sValue2);
};
}


var compareTRs = generateCompareTRs(0);
var compareTRs1 = generateCompareTRs(1);
var compareTRs2 = generateCompareTRs(2);


aTRs.sort(generateCompareTRs(0));



function sortTable(sTableID, iCol) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs[i] = colDataRows[i];
}
aTRs.sort(generateCompareTRs(iCol));
var oFragment = document.createDocumentFragment();
for (var i=0; i < aTRs.length; i++) {
oFragment.appendChild(aTRs[i]);
}
oTBody.appendChild(oFragment);
}



<table border=”1” id=”tblSort”>
<thead>
<tr>
<th onclick=”sortTable(‘tblSort’, 0)”
style=”cursor:pointer”>Last Name</th>
<th onclick=”sortTable(‘tblSort’, 1)”
style=”cursor:pointer”>First Name</th>
</tr>
</thead>
<tbody>
<!-- data rows -->
</tbody>
</table>



function sortTable(sTableID, iCol) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs[i] = colDataRows[i];
}

aTRs.sort(generateCompareTRs(iCol));
var oFragment = document.createDocumentFragment();
for (var i=0; i < aTRs.length; i++) {
oFragment.appendChild(aTRs[i]);
}
oTBody.appendChild(oFragment);
oTable.sortCol = iCol;
}


function sortTable(sTableID, iCol) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs[i] = colDataRows[i];
}
if (oTable.sortCol == iCol) {
aTRs.reverse();
} else {
aTRs.sort(generateCompareTRs(iCol));
}
var oFragment = document.createDocumentFragment();
for (var i=0; i < aTRs.length; i++) {
oFragment.appendChild(aTRs[i]);
}
oTBody.appendChild(oFragment);
oTable.sortCol = iCol;
}


Creating a conversion function


❑ “int” to convert to an integer
❑ “float” to convert to a float
❑ “date” to convert to a date
❑ Any other value always returns a string


function convert(sValue, sDataType) {
switch(sDataType) {
case “int”:
return parseInt(sValue);
case “float”:
return parseFloat(sValue);
case “date”:
return new Date(Date.parse(sValue));
default:
return sValue.toString();
}
}


var sValue = “25”;
var iValue = convert(sValue, “int”);
alert(typeof iValue); //outputs “number”
var sValue2 = convert(sValue, “string”);
alert(typeof sValue2); //outputs “string”
var sValue3 = convert(sValue);
alert(typeof sValue3); //outputs “string”
var sValue4 = convert(sValue, “football”);
alert(typeof sValue4); //outputs “string”


function generateCompareTRs(iCol, sDataType) {
return function compareTRs(oTR1, oTR2) {
var vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue,
sDataType);
var vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue,
sDataType);
//...
};
}

function generateCompareTRs(iCol, sDataType) {
return function compareTRs(oTR1, oTR2) {
var vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue,
sDataType);
var vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue,
sDataType);
if (vValue1 < vValue2) {
return –1;
} else if (vValue1 > vValue2) {
return 1;
} else {
return 0;
}
};
}





function sortTable(sTableID, iCol, sDataType) {
var oTable = document.getElementById(sTableID);
var oTBody = oTable.tBodies[0];
var colDataRows = oTBody.rows;
var aTRs = new Array;
for (var i=0; i < colDataRows.length; i++) {
aTRs[i] = colDataRows[i];
}
aTRs.sort(generateCompareTRs(iCol, sDataType));
var oFragment = document.createDocumentFragment();
for (var i=0; i < aTRs.length; i++) {
oFragment.appendChild(aTRs[i]);
}
oTBody.appendChild(oFragment);
oTable.sortCol = iCol;
}



<table border=”1” id=”tblSort”>
<thead>
<tr>
<th onclick=”sortTable(‘tblSort’, 0)”
style=”cursor:pointer”>Last Name</th>
<th onclick=”sortTable(‘tblSort’, 1)”
style=”cursor:pointer”>First Name</th>
<th onclick=”sortTable(‘tblSort’, 2, ‘date’)”
style=”cursor:pointer”>Birthday</th>
<th onclick=”sortTable(‘tblSort’, 3, ‘int’)”
style=”cursor:pointer”>Siblings</th>
</tr>
</thead>
<tbody>
<tr>
<td>Smith</td>
<td>John</td>
<td>7/12/1978</td>
<td>2</td>
</tr>
<tr>
<td>Johnson</td>
<td>Betty</td>
<td>10/15/1977</td>
<td>4</td>
</tr>
<tr>
<td>Henderson</td>
<td>Nathan</td>
<td>2/25/1949</td>
<td>1</td>
</tr>
<tr>
<td>Williams</td>
<td>James</td>
<td>7/8/1980</td>
<td>4</td>
</tr>
<tr>
<td>Gilliam</td>
<td>Michael</td>
<td>7/22/1949</td>
<td>1</td>
</tr>
<tr>
<td>Walker</td>
<td>Matthew</td>
<td>1/14/2000</td>
<td>3</td>
</tr>
</tbody>
</table>

<td value=”blue”><img src=”blueimage.gif” /></td>

var sValue = oTD.getAttribute(“value”);


<table border=”1” id=”tblSort”>
<thead>
<tr>
<th>Type</th>
<th>Filename</th>
</tr>
</thead>
<tbody>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>My Resume.doc</td>
</tr>
<tr>
<td value=”xls”><img src=”images/excelicon.gif”/></td>
<td>Fall Budget.xls</td>
</tr>
<tr>
<td value=”pdf”><img src=”images/acrobaticon.gif”/></td>
<td>How to be a better programmer.pdf</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>My Old Resume.doc</td>
</tr>
<tr>
<td value=”txt”><img src=”images/notepadicon.gif”/></td>
<td>Notes from Meeting.txt</td>
</tr>
<tr>
<td value=”zip”><img src=”images/zippedfoldericon.gif”/></td>
<td>Backups.zip</td>
</tr>
<tr>
<td value=”xls”><img src=”images/excelicon.gif”/></td>
<td>Spring Budget.xls</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>Job Description - Web Designer.doc</td>
</tr>
<tr>
<td value=”pdf”><img src=”images/acrobaticon.gif”/></td>
<td>Saved Web Page.pdf</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>Chapter 1.doc</td>
</tr>
</tbody>
</table>



function generateCompareTRs(iCol, sDataType) {
return function compareTRs(oTR1, oTR2) {
var vValue1, vValue2;
if (oTR1.cells[iCol].getAttribute(“value”)) {
vValue1 = convert(oTR1.cells[iCol].getAttribute(“value”),
sDataType);
vValue2 = convert(oTR2.cells[iCol].getAttribute(“value”),
sDataType);
} else {
vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue,
sDataType);
vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue,
sDataType);
}
if (vValue1 < vValue2) {
return –1;
} else if (vValue1 > vValue2) {
return 1;
} else {
return 0;
}
};
}





<table border=”1” id=”tblSort”>
<thead>
<tr>
<th onclick=”sortTable(‘tblSort’, 0)”
style=”cursor:pointer”>Type</th>
<th onclick=”sortTable(‘tblSort’, 1)”
style=”cursor:pointer”>Filename</th>
</tr>
</thead>
<tbody>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>My Resume.doc</td>
</tr>
<tr>
<td value=”xls”><img src=”images/excelicon.gif”/></td>
<td>Fall Budget.xls</td>
</tr>
<tr>
<td value=”pdf”><img src=”images/acrobaticon.gif”/></td>
<td>How to be a better programmer.pdf</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>My Old Resume.doc</td>
</tr>
<tr>
<td value=”txt”><img src=”images/notepadicon.gif”/></td>
<td>Notes from Meeting.txt</td>
</tr>
<tr>
<td value=”zip”><img src=”images/zippedfoldericon.gif”/></td>
<td>Backups.zip</td>
</tr>

<tr>
<td value=”xls”><img src=”images/excelicon.gif”/></td>
<td>Spring Budget.xls</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>Job Description - Web Designer.doc</td>
</tr>
<tr>
<td value=”pdf”><img src=”images/acrobaticon.gif”/></td>
<td>Saved Web Page.pdf</td>
</tr>
<tr>
<td value=”doc”><img src=”images/wordicon.gif”/></td>
<td>Chapter 1.doc</td>
</tr>
</tbody>
</table>

