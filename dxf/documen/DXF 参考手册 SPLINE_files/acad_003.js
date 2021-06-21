// Used to assign a default value to global variables if missing (do not localize)
if (typeof(homeText) == "undefined") homeText = "*Home*";
if (typeof(indexText) == "undefined") indexText = "*Index*";
if (typeof(helpText) == "undefined") helpText = "*Help*";
if (typeof(searchText) == "undefined") searchText = "*Search*";
if (typeof(continuedText) == "undefined") continuedText = "*Continued*";

var scriptPath = "scripts/";
var stylePath = "style/";
var imagePath = "images/PTDCPM/";
var imagePathProduct = "images/PTDCPM/";
var imagePathCommon = "images/";
var tocPath = "";
var filePath = "files/";
var pageTopic_id = "";
var pageTopic_name = "";
var lastTopicNumber = "";
var topicNumber = "";

// Display the TOC on the content page
function displayTableOfContents ()
{
    var leftDiv = addLeftContentDIV();

   // Create column
   var tocDiv = document.createElement("div");
   tocDiv.className = "acad-contents";
   tocDiv.id = "acad-contents";
   leftDiv.appendChild(tocDiv);

   // Create table
   var table = document.createElement("table");
   table.border = "0";
   table.id = "tbl-acad-contents";
   tocDiv.appendChild(table);

   var tbody = document.createElement("tbody");
   tbody.id = "tbody-acad-contents";
   table.appendChild(tbody);

   g_cont = false;
   recurseTOCitem(tbody, '', top.tocItems, true, 0);
}

// Highlight/select a TOC item for the current content page
function highlightTOCItem (base_id, level, highlight, current)
{
    if (base_id != parent.topicNumber || current == true)
    {
        var col1 = document.getElementById("td" + base_id + "_i");
        var col2 = document.getElementById("td" + base_id);
        var col3 = document.getElementById("td" + base_id + "_it");

        if (highlight == true)
        {
            if (col1 != null) col1.className = "toc_item_selected";
            if (col2 != null) col2.className = "toc_entry_" + level + "_selected";
            if (col3 != null) col3.className = "toc_item_top_selected";
        }
        else
        {
            if (col1 != null) col1.className = "toc_item";
            if (col2 != null) col2.className = "toc_entry_" + level;
            if (col3 != null) col3.className = "toc_item_top";
        }
    }
}

// Build the TOC for the content page
function recurseTOCitem(tbody, parentItem, items, cont, indent)
{
    var b_cont = cont;

    if (b_cont == true) 
    {
        var level = 0;

        for (var nItems = 0; nItems < items.length; nItems++)
        {
           if (items[nItems].id == parent.topicNumber)
           {
               if (typeof(parentItem) != "undefined" && parentItem != "")
               {
                   var tr = document.createElement("tr");
                   tr.setAttribute("onClick", "parent.location.href=\"../" + parentItem.ln + "\"");
                   tr.setAttribute("onMouseOver", "highlightTOCItem('" + parentItem.id + "', " + level + ", true, false)");
                   tr.setAttribute("onMouseOut", "highlightTOCItem('" + parentItem.id + "', " + level + ", false, false)");
                   tbody.appendChild(tr);

                   var td = document.createElement("td");
                   td.className = "toc_item";
                   td.id = "td" + parentItem.id + "_i";
                   tr.appendChild(td);

                   td = document.createElement("td");
                   td.className = "toc_entry_" + level;
                   td.id = "td" + parentItem.id;
                   td.innerHTML = parentItem.ttl;
                   tr.appendChild(td);

                   td = document.createElement("td");
                   td.className = "toc_item_top";
                   td.id = "td" + parentItem.id + "_it";
                   td.innerHTML = "<img alt='' src='../" + imagePathCommon + "top_topic.gif' />";
                   tr.appendChild(td);

                   level = level + 1;
               }


               for (var nChildItems = 0; nChildItems < items.length; nChildItems++)
               {

                   var tr = document.createElement("tr");
                   tr.setAttribute("onClick", "parent.location.href=\"../" + items[nChildItems].ln + "\"");
                   tr.setAttribute("onMouseOver", "highlightTOCItem('" + items[nChildItems].id + "', " + level + ", true, false)");
                   tr.setAttribute("onMouseOut", "highlightTOCItem('" + items[nChildItems].id + "', " + level + ", false, false)");
                   tbody.appendChild(tr);

                   var td = document.createElement("td");
                   td.className = "toc_item";
                   td.id = "td" + items[nChildItems].id + "_i";
                   tr.appendChild(td);

                   td = document.createElement("td");
                   td.colSpan = 2;
                   td.className = "toc_entry_" + level;
                   td.id = "td" + items[nChildItems].id;
                   td.innerHTML = items[nChildItems].ttl;
                   tr.appendChild(td);

                   if (items[nChildItems].id == parent.topicNumber)
                   {
                       if (typeof(items[nChildItems].children) != "undefined")
                       {
                           grandChileItems = items[nChildItems].children;
                           level = level + 1;

                           for (var nGrandchildItems = 0; nGrandchildItems < grandChileItems.length; nGrandchildItems++)
                           {

                               var tr = document.createElement("tr");
                               tr.setAttribute("onClick", "parent.location.href=\"../" + grandChileItems[nGrandchildItems].ln + "\"");
                               tr.setAttribute("onMouseOver", "highlightTOCItem('" + grandChileItems[nGrandchildItems].id + "', " + level + ", true, false)");
                               tr.setAttribute("onMouseOut", "highlightTOCItem('" + grandChileItems[nGrandchildItems].id + "', " + level + ", false, false)");
                               tbody.appendChild(tr);

                               var td = document.createElement("td");
                               td.className = "toc_item";
                               td.id = "td" + grandChileItems[nGrandchildItems].id + "_i";
                               tr.appendChild(td);

                               td = document.createElement("td");
                               td.colSpan = 2;
                               td.className = "toc_entry_" + level;
                               td.id = "td" + grandChileItems[nGrandchildItems].id;
                               td.innerHTML = grandChileItems[nGrandchildItems].ttl;
                               tr.appendChild(td);
                           }

                           level = level - 1;
                       }
                   }
               }

               highlightTOCItem(items[nItems].id, level, true, true);

               return false;
           }

           if (typeof(items[nItems].children) != "undefined" && b_cont == true)
           {
               b_cont = recurseTOCitem(tbody, items[nItems], items[nItems].children, b_cont, indent);
           }
        }
    }

    return b_cont;
}

// Used to include a JS file dynamically
function include_js (file)
{
   var head = document.getElementsByTagName('head').item(0);
   script_file = document.createElement('script');
   script_file.src = file;
   script_file.type = 'text/javascript';
   head.appendChild(script_file)
}

// Used to include a CSS file dynamically
function include_style (file)
{
   var head = document.getElementsByTagName('head').item(0);
   style_file = document.createElement('link');
   style_file.rel = 'stylesheet';
   style_file.type = 'text/css';
   style_file.href = file;
   head.appendChild(style_file)
}

// Define which Style files to load
function includeStyleFiles ()
{
   // Standard styles
//   include_style("style/adsk.cpm.css");
//   include_style("style/adsk.panels.css");
//   include_style("style/acad-contents.css");
//   include_style("style/acad_html.css");
//   include_style("style/acad-landing.css");
}

function loadTocContent (frame, file)
{
   top.frames[frame].location = file;
}

function buildLandingTOC ()
{
   for (var nBooks = 0; nBooks < bookMapping.length; nBooks++)
   {
      var book = bookMapping[nBooks];

      try { if(book.found == 1 && book.display == 1){ addTOCLink(book.id, book.title);}} catch (err) {}
   }
}

// Used to build the TOC links on the landing pages
function addTOCLink (bookID, title)
{
   // Append the new TOC item
   var pos = bookID.indexOf('SEPARATOR:');
   if (pos == -1) {
       document.getElementById('divTocLinks').innerHTML = document.getElementById('divTocLinks').innerHTML + "<div class='toc_entry' id='" + bookID + "' onClick='buildLandingContentLinks(\"" + bookID + "\");'>" + title + "</div>";
   } else {
       document.getElementById('divTocLinks').innerHTML = document.getElementById('divTocLinks').innerHTML + "<div class='toc_separator'>" + title + "</div>";
   }
}

// Control which content is displayed on the landing page for the selected book
function buildLandingContentLinks(bookCode)
{
   var cookieWorker = new CookieWorker(top.document, "autodesk_landing", 24000);

   var lastBook = {
        bookString : ""
   };

   cookieWorker.load(lastBook);

//   var lastBook = getCookie("lastBook");

   var firstBook = "";
   var validBook = false;

   for (var nBooks = 0; nBooks < bookMapping.length; nBooks++)
   {
      var book = bookMapping[nBooks];
      var pos = book.id.indexOf('SEPARATOR:');

      if (firstBook == "" && nBooks > 0 && book.found == 1 && pos == -1) firstBook = book.id;
      if (lastBook.bookString == book.id) validBook = true;

      if (document.getElementById(book.id)) document.getElementById(book.id).className='toc_entry';
   }

   if (validBook == false) lastBook.bookString = firstBook;

   if (typeof(g_currentBook) == "undefined") g_currentBook = "";
   if (typeof(bookCode) == "undefined") bookCode = "";
   if (lastBook.bookString != "" && bookCode == "") bookCode = lastBook.bookString;

   if(bookCode.toLowerCase() == "hammer-acr")
   {
           var landingTOCDiv = document.getElementById('landingTOC');
           landingTOCDiv.innerHTML = '';
         
           landingTOCDiv.innerHTML = '<iframe id="subColumn2" name="featureframe" src="acr-topics.htm" scrolling="no" width="100%" height="590px" style="border: none; overflow:auto; overflow-x:hidden;" frameborder="0">';

           for (var nBooks = 0; nBooks < bookMapping.length; nBooks++)
           {
               var book = bookMapping[nBooks];

               if (book.id.toLowerCase() == bookCode.toLowerCase())
               {
                   lastBook.bookString = book.id;

                   cookieWorker.store(lastBook);
//                   setCookie("lastBook", book.id , 1);
                   bookCode = book.id;
               }
            }
        }
        else
        {
           if (bookCode == "")
           {
              for (var nBooks = 0; nBooks < bookMapping.length; nBooks++)
              {
                 var book = bookMapping[nBooks];

                 if (book.id.toLowerCase() == g_currentBook.toLowerCase())
                 {
                     lastBook.bookString = book.id;

                     cookieWorker.store(lastBook);
//                     setCookie("lastBook", book.id , 1);
                     displayTOCContent(book.bookVar);
                     bookCode = book.id;
                 }
              }
           }
           else
           {
              for (var nBooks = 0; nBooks < bookMapping.length; nBooks++)
              {
                 var book = bookMapping[nBooks];

                 if (book.id.toLowerCase() == bookCode.toLowerCase())
                 {
                     lastBook.bookString = book.id;

                     cookieWorker.store(lastBook);
//                     setCookie("lastBook", book.id , 1);
                     displayTOCContent(book.bookVar);
                     bookCode = book.id;
                 }
              }
           }
        }

   if (document.getElementById(bookCode)) document.getElementById(bookCode).className='toc_entry_selected';
}
// End Landing page TOC functions

function createLink (styleClass, fileName, linkTitle)
{
   document.write('<a class="' + styleClass + '" href="' + fileName + '" target="_parent">' + linkTitle + '</a><br>');
}

function createLinkNoBreak (styleClass, fileName, linkTitle)
{
   document.write('<a class="' + styleClass + '" href="' + fileName + '" target="_parent">' + linkTitle + '</a>&nbsp;');
}

function displayTOCContent (localTocItems)
{
   var landingTOCDiv = document.getElementById('landingTOC');
   landingTOCDiv.innerHTML = '';

   // Create column
   var divColumn = document.createElement("div");
   divColumn.className = "";
   landingTOCDiv.appendChild(divColumn);

   var nTotalItems = 0;
   var bFlagBreak = false;

   // Get the parent items and count up the total number of links and parent items
   for (var nParents = 0; nParents < localTocItems.length; nParents++) {
      var parent = localTocItems[nParents];

      // Increment the counter to determine column break
      nTotalItems = nTotalItems + 1;

      // Get the children TOC items
      if (parent.children)
      {
          nTotalItems = nTotalItems + parent.children.length;
      }
   }

   var nCountTotal = 0;

   // Get the parent items
   for (var nParents = 0; nParents < localTocItems.length; nParents++) {
      var parent = localTocItems[nParents];

      // Increment the counter to determine column break
      nCountTotal = nCountTotal + 1;

      // Get the children TOC items
      if (parent.children)
      {
         // Create the DIV - Chapter
         var divChapter = document.createElement("div");
         divChapter.className = "toc-chapter";

         // Append the DIV
         divColumn.appendChild(divChapter);

         // Create the DIV - Title
         var divTitle = document.createElement("div");
         divTitle.className = "toc-title";
            var aLink = document.createElement("a");
            aLink.className = "_toc-link";
            aLink.href = parent.ln;
            aLink.target = "_parent";
            aLink.innerHTML = parent.ttl;
            divTitle.appendChild(aLink);
            //divTitle.innerHTML = aLink; //parent.ttl; 

         var prevTitle = parent.ttl;

         // Append the DIV
         divChapter.appendChild(divTitle);

         // Append a break
         var br = document.createElement('br');
         divTitle.appendChild(br);

         for (var nChildren = 0; nChildren < parent.children.length; nChildren++)
         {
           if ((nCountTotal > (nTotalItems / 2)) && bFlagBreak==false && nTotalItems > 30)
           {
              bFlagBreak = true;
              divColumn = document.createElement("div");
              divColumn.className = "";
              landingTOCDiv.appendChild(divColumn);

              // Create the DIV - Chapter
              var divChapter = document.createElement("div");
              divChapter.className = "toc-chapter";

              // Append the DIV
              divColumn.appendChild(divChapter);

              // Append a break
              var br = document.createElement('br');
              divTitle.appendChild(br);
           }

         }
      }
      else
      {
         // Create the DIV - Chapter
         var divChapter = document.createElement("div");
         divChapter.className = "toc-chapter";

         // Append the DIV
         divColumn.appendChild(divChapter);

         var br = document.createElement('br');
         divTitle.appendChild(br);

         // Create and append link
         var aLink = document.createElement("a");
         aLink.className = "_toc-link";
         aLink.href = parent.ln;
         aLink.target = "_parent";
         aLink.innerHTML = parent.ttl;
         divTitle.appendChild(aLink);

         br = document.createElement('br');
         divTitle.appendChild(br);
      }
   }
}

// Used to display the secondary content on the right side of the page
function displaySecondaryContent ()
{
  try {
    if(tocItemsLanding)
    {
       var secondaryDiv = document.getElementById('secondarySection');

       // Create layout
       var divLayout = document.createElement("div");
       divLayout.className = "topic";
       secondaryDiv.appendChild(divLayout);

       var divTitle = document.createElement("div");
       divTitle.className = "topic-text";
       divTitle.innerHTML = secondaryHeading.replace('(productFullName)',productFullName);
       divLayout.appendChild(divTitle);

       var divDesc = document.createElement("div");
       divDesc.className = "topic-description";
       divDesc.innerHTML = secondaryDescription.replace('(productFullName)',productFullName);
       divLayout.appendChild(divDesc);

       // Get the parent items
       for (var nItem = 0; nItem < secondaryLinks.length; nItem++) {
          var item = secondaryLinks[nItem];

          var divLink = document.createElement("div");
          divLink.className = "topic-link";
          secondaryDiv.appendChild(divLink);

          var divLinkTitle = document.createElement("div");
          divLinkTitle.className = "topic-link-title";
          divLinkTitle.innerHTML = "<a href='" + item.ln + "' target='_parent'>" + item.ttl.replace('(productFullName)',productFullName) + "</a>";
          divLink.appendChild(divLinkTitle);

          var divLinkDesc = document.createElement("div");
          divLinkDesc.className = "topic-link-description";
          divLinkDesc.innerHTML = item.tld.replace('(productFullName)',productFullName);
          divLink.appendChild(divLinkDesc);
       }
    }
  }
  catch (err) {}
}

// Used to display the What's New box on a content page
function displayWhatsNewContent (elementId)
{
    if(typeof(whatsNewHeading) != "undefined")
    {
       var rightDiv = document.getElementById(elementId);

       // Create layout
       var whatsNewDiv = document.createElement("div");
       whatsNewDiv.className = "module_internal";
       rightDiv.appendChild(whatsNewDiv);

       var divHeader = document.createElement("div");
       divHeader.className = "module-header_internal";
       whatsNewDiv.appendChild(divHeader);

       var divTitle = document.createElement("div");
       divTitle.className = "module-title_internal";
       divTitle.innerHTML = whatsNewHeading.replace('(productFullName)',productFullName);
       divHeader.appendChild(divTitle);

       var divDesc = document.createElement("div");
       divDesc.className = "module-description_internal";
       divDesc.innerHTML = whatsNewDescription.replace('(productFullName)',productFullName);
       divHeader.appendChild(divDesc);

       var divLinks = document.createElement("div");
       divLinks.className = "module-content_internal";
       whatsNewDiv.appendChild(divLinks);

       var table = document.createElement("table");
       table.border = "0";
       divLinks.appendChild(table);

       var tbody = document.createElement("tbody");
       table.appendChild(tbody);
       
       // Get the parent items
       for (var nItem = 0; nItem < whatsNewLinks.length; nItem++)
       {
          var item = whatsNewLinks[nItem];
          
          var children = item.children;

          for (var nChild = 0; nChild < children.length; nChild++) {
             var child = children[nChild];

             if (child.fi == 1)
              {
                var tr = document.createElement("tr");
                tbody.appendChild(tr);

                var td = document.createElement("td");
                td.className = "module-link_internal";
                td.innerHTML = "<a href='" + child.ln + "' target='_parent'>" + child.ttl.replace('(productFullName)',productFullName) + "</a>";
                tr.appendChild(td);
              }
          }
       }
    }
}

// Creates a DIV element to use for the left side
function addLeftContentDIV ()
{
    var body = document.body;
    var leftDiv = document.createElement("div");
    leftDiv.className = "leftContent";
    leftDiv.id = "leftContent";
    body.appendChild(leftDiv);

    return leftDiv;
}
// Creates a DIV element to use for the right side
function addRightContentDIV ()
{
    var body = document.body;
    var rightDiv = document.createElement("div");
    rightDiv.className = "rightContent";
    rightDiv.id = "rightContent";
    body.appendChild(rightDiv);
}

// Used to display the online resouce links
function displayOnlineResources (elementId, root)
{
  if (typeof(onlineResHeading) != "undefined")
  {

   if (elementId == "")
   {
       var rightDiv = document.body;
   }
   else
   {
       var rightDiv = document.getElementById(elementId);
   }

   // Create layout
   var onlineResDiv = document.createElement("div");
   onlineResDiv.className = "module_external";
   rightDiv.appendChild(onlineResDiv);

   var divHeader = document.createElement("div");
   divHeader.className = "module-header_external";
   onlineResDiv.appendChild(divHeader);

   var divTitle = document.createElement("div");
   divTitle.className = "module-title_external";

   if (typeof(productFullName) != "undefined") divTitle.innerHTML = onlineResHeading.replace('(productFullName)',productFullName);
   divHeader.appendChild(divTitle);

   var divDesc = document.createElement("div");
   divDesc.className = "module-description_external";
   if (typeof(productFullName) != "undefined") divDesc.innerHTML = onlineResDescription.replace('(productFullName)',productFullName);
   divHeader.appendChild(divDesc);

   var divLinks = document.createElement("div");
   divLinks.className = "module-content_external";
   onlineResDiv.appendChild(divLinks);

   var table = document.createElement("table");
   table.border = "0";
   divLinks.appendChild(table);

   var tbody = document.createElement("tbody");
   table.appendChild(tbody);

   // Get the parent items
   for (var nItem = 0; nItem < onlineResLinks.length; nItem++) {
      var item = onlineResLinks[nItem];

      var tr = document.createElement("tr");
      tbody.appendChild(tr);

      var td = document.createElement("td");
      td.className = "module-link_external_main";
      td.innerHTML = "<a href='" + item.ln + "' target='_parent'>" + item.ttl.replace('(productFullName)',productFullName) + "</a>";
      tr.appendChild(td);
         
      td = document.createElement("td");
      td.className = "module-link_external";
      td.innerHTML = "<a href='" + item.ln + "' target='_parent'><img style='border:0;' alt='' src='" + root + imagePathCommon + "external_link.png' /></a>";
      tr.appendChild(td);
   }
  }
}

// Currently not used, used to determine if page is viewed locally or online
function isOnline()
{
  if (window.location.protocol == "http:")
    return true;
  else
    return false;
}

// Used to display the AutoCAD Exchange Search Results widget
function displayExchangeContentWidget (elementId, help_type, topic_id, topic_name)
{
   if (isOnline() == true)
   {
   if (elementId == "")
   {
       var element = document.body;
   }
   else
   {
       var element = document.getElementById(elementId);
   }

   // Replace the spaces in the title with %20
   var lastVal = "";
   while (lastVal != topic_name)
   {
       var lastVal = topic_name;
       topic_name = topic_name.replace(' ', '%20');
   }

   var div = document.createElement("div");
   div.className = "exchange_content_widget";
   div.innerHTML = "<iframe src='http://autocad.autodesk.com/?html=fragment-autocad_help_rightnav_widget2&topic_id=" + topic_id + "&topic_name=" + topic_name + "' frameborder='0' width='190' height='600' scrolling='no' marginheight='0' marginwidth='0'/>";

   element.appendChild(div);
}
}

// Used to display the AutoCAD Exchange widget
function displayExchangeWidget (elementId)
{
   if (isOnline() == true)
   {
   if (elementId == "")
   {
       var element = document.body;
   }
   else
   {
       var element = document.getElementById(elementId);
   }

   var div = document.createElement("div");
   div.className = "exchange_widget";
   div.innerHTML = "<object width='190' height='200'><param name='movie' value='http://autocad.autodesk.com/ama/orig/flash_widget/flash_loaders/preloader_medium.swf'></param><param name='flashvars' value='SWFfile=http://autocad.autodesk.com/ama/orig/flash_widget/flash_loaders/widget_medium.swf&XMLfile=http://autocad.autodesk.com/?nd=flash_widget_xml%26size=medium&tagent=widget__535&tabBg=eaf4ff&tabText=555555&activeBg=eaf4ff&activeText=004182'/><embed src='http://autocad.autodesk.com/ama/orig/flash_widget/flash_loaders/preloader_medium.swf' flashvars='SWFfile=http://autocad.autodesk.com/ama/orig/flash_widget/flash_loaders/widget_medium.swf&XMLfile=http://autocad.autodesk.com/?nd=flash_widget_xml%26size=medium&tagent=widget__535&tabBg=eaf4ff&tabText=555555&activeBg=eaf4ff&activeText=004182' type='application/x-shockwave-flash' width='190' height='200'></embed></object>";

   element.appendChild(div);
}
}

// Standard content page call to show the TOC for the page
function showTOC(topicNumber) {
    // Get body
    // Insert iFrame or other object
    // Setup TOC
    var docBody = document.body;
    if (docBody === null)
        return false;

    displayTableOfContents();
    top.lastTopicNumber = topicNumber;

    return true;

}

// Standard content page call to show the header
function showHeader() {
    appendHeaderToBody(productFullNameHelp, 'true', 'false', '../');
    return true;
}

function isLocal()
{
  if (window.location.protocol == "file:")
    return true;
  else
    return false;
}

function resizeIframe(id)
{
     var tocBlock = parent.document.getElementById(id);
     var j2Block = parent.document.getElementById('jump-to-block');
     var saBlock = parent.document.getElementById('see-also');

     var nHgt = 0;
     var nTop = 133;

     if (tocBlock)
       {
         nHgt=tocBlock.offsetHeight;

         tocBlock.style.left="0px";
         nTop = tocBlock.offsetTop;
     }

     // Need to add id="see-also" to the div element added to the docs.
     if (saBlock)
     {

          // The following reformats the elements used to format the title of the See Also block
          // A request to the CMS team was declined to change the HTML element from SPAN to DIV
          // The remain formatting is handled via Cascading Styles

          var strHTML = new String();
          strHTML = saBlock.innerHTML;

          var strTemp = strHTML;
          strHTML = strHTML.replace('<span class="see-also">', '<div class="see-also-title">');
          strHTML = strHTML.replace('<SPAN class="see-also">', '<div class="see-also-title">');
          strHTML = strHTML.replace('<SPAN class=see-also>', '<div class="see-also-title">');

          if (strTemp != strHTML)
          {
               strHTML = strHTML.replace('</span>', '</div>');
               strHTML = strHTML.replace('</SPAN>', '</div>');
          }

          saBlock.innerHTML=strHTML;

          saBlock.style.top=(nTop + nHgt)+"px";
          saBlock.style.left="0px";
     }

     // Need to add id="jump-to-block" to the div element added to the docs.
     if (j2Block)
     {
          var strStart;

          if (saBlock)
              nHgt = saBlock.offsetHeight;

          if (saBlock)
              j2Block.style.top=(saBlock.offsetTop + nHgt)+"px";
          else
              j2Block.style.top=(nTop + nHgt)+"px";

          j2Block.style.left="0px";
     }
}

//From commons-processing.js
function convSymbols() { 

}

// Standard content page call
function initFrame(url, tn, index) {
    topicNumber = tn;
    if (showTOC(topicNumber) === true) {

    }

    // Assign to global variable
    top.pageTopic_id = url;

    showHeader();
}

// Standard content page call
function initPage(title, bookTitle)
{
    // Assign to global variable
    pageTopic_name = title;

    // Assign to HTML page
    document.title = bookTitle + ": " + title;

    // Resize the iFrame for the TOC on the left
    resizeIframe('acad-contents');

    // Create a DIV to control the overall placement of the content on the right side
    addRightContentDIV();

    // Display the AutoCAD Exchange widget
    // displayExchangeWidget('rightContent');
    var topicId = pageTopic_id.split('/')[2];
    if (!topicId) {topicId="dummy";}
    else {topicId = topicId.split('.')[0];}

    // Display the search results from AutoCAD Exchange
    displayExchangeContentWidget('rightContent', 'autocadhelp_content', topicId, pageTopic_name);
}

// Used to display the page header for all pages
// title is used to push in the product name to the page
// includeSearch controls the display of the search components
// includeMarquee controls the display of the product marquee image
function appendHeaderToBody(title, includeSearch, includeMarquee, root)
{
   var headerText = "";

   headerText = headerText + "<div class='acad-header'>";
   headerText = headerText + "<table width='100%'><tr><td valign='top' align='left'><div class='header-links'><a href='" + root + "landing.html' target='_parent'>" + homeText + "</a><a href='" + root + "acad-indexes.html' target='_parent' class='header_link'>" + indexText + "</a></div></td>";

   if (includeSearch == 'true')
   {
       headerText = headerText + "<td valign='top' align='right'><form name='searchForm' onsubmit='loadSearchResults(searchData.value,\"" + root + "\"); return false;'><input type='text' name='searchData' id='searchData' value='" + searchText + "' onfocus='javascript:searchData.value=\"\"' class='query' /><input type='image' src='" + root + "images/searchSubmit.gif' name='searchButton' id='searchButton' class='searchButton' onclick='loadSearchResults(searchData.value,\"" + root + "\"); return false;' value='Search' /></form></td>";
   }
   else
   {
       headerText = headerText + "<td valign='top' align='right'><div style='color:black; height:39px;'>Search</div></td>";
   }

   headerText = headerText + "</tr><tr><td valign='top'><div class='productName'>" + title + "</div></td><td valign='top'><div class='companyLogo'><img src='" + root + "images/Autodesk.png'></img></div></td></tr></table>";

   headerText = headerText + "</div>";

   if (includeMarquee == 'true')
   {
       headerText = headerText + "<div class='marquee'><img alt='' src='" + imagePathCommon + "marquee.jpg' /></div>";
   }

   headerText = headerText;

   var body = document.body;
   body.innerHTML = headerText + body.innerHTML;
}

// Special Fixed width header for the lannding page.
function appendHeaderToLandingPage(title, includeSearch, includeMarquee, root) {
    var headerText = "";

    headerText = headerText + "<div class='acad-header'>";
    headerText = headerText + "<table width='960px'><tr class='headerTop' ><td align='left'><div class='header-links'><a href='" + root + "landing.html' target='_parent'>" + homeText + "</a><a href='" + root + "acad-indexes.html' target='_parent' class='header_link'>" + indexText + "</a></div></td>";

    if (includeSearch == 'true') {
        headerText = headerText + "<td align='right'><form name='searchForm' onsubmit='loadSearchResults(searchData.value,\"" + root + "\"); return false;'><input type='text' name='searchData' id='searchData' value='" + searchText + "' onfocus='javascript:searchData.value=\"\"' class='query' /><input type='image' src='" + root + "images/searchSubmit.gif' name='searchButton' id='searchButton' class='searchButton2' onclick='loadSearchResults(searchData.value,\"" + root + "\"); return false;' value='Search' /></form></td>";
    }
    else {
        headerText = headerText + "<td valign='top' align='right'><div style='color:black; height:39px;'>Search</div></td>";
    }

    headerText = headerText + "</tr><tr class='headerBottom'><td valign='top'><div class='productName'>" + title + "</div></td><td valign='top'><div class='companyLogo'><img src='" + root + "images/Autodesk_landing.png'></img></div></td></tr></table>";

    headerText = headerText + "</div>";

    if (includeMarquee == 'true') {
        headerText = headerText + "<div class='marquee'><img alt='' src='" + imagePathCommon + "marquee.jpg' /></div>";
    }

    headerText = headerText;

    var body = document.body;
    body.innerHTML = headerText + body.innerHTML;
}

// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEJno
// SIG // z6+ivXopBhvv9fwO2eigghEOMIIDejCCAmKgAwIBAgIQ
// SIG // OCXX+vhhr570kOcmtdZa1TANBgkqhkiG9w0BAQUFADBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0EwHhcNMDcwNjE1MDAwMDAw
// SIG // WhcNMTIwNjE0MjM1OTU5WjBcMQswCQYDVQQGEwJVUzEX
// SIG // MBUGA1UEChMOVmVyaVNpZ24sIEluYy4xNDAyBgNVBAMT
// SIG // K1ZlcmlTaWduIFRpbWUgU3RhbXBpbmcgU2VydmljZXMg
// SIG // U2lnbmVyIC0gRzIwgZ8wDQYJKoZIhvcNAQEBBQADgY0A
// SIG // MIGJAoGBAMS18lIVvIiGYCkWSlsvS5Frh5HzNVRYNerR
// SIG // Nl5iTVJRNHHCe2YdicjdKsRqCvY32Zh0kfaSrrC1dpbx
// SIG // qUpjRUcuawuSTksrjO5YSovUB+QaLPiCqljZzULzLcB1
// SIG // 3o2rx44dmmxMCJUe3tvvZ+FywknCnmA84eK+FqNjeGkU
// SIG // e60tAgMBAAGjgcQwgcEwNAYIKwYBBQUHAQEEKDAmMCQG
// SIG // CCsGAQUFBzABhhhodHRwOi8vb2NzcC52ZXJpc2lnbi5j
// SIG // b20wDAYDVR0TAQH/BAIwADAzBgNVHR8ELDAqMCigJqAk
// SIG // hiJodHRwOi8vY3JsLnZlcmlzaWduLmNvbS90c3MtY2Eu
// SIG // Y3JsMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4GA1Ud
// SIG // DwEB/wQEAwIGwDAeBgNVHREEFzAVpBMwETEPMA0GA1UE
// SIG // AxMGVFNBMS0yMA0GCSqGSIb3DQEBBQUAA4IBAQBQxUvI
// SIG // JIDf5A0kwt4asaECoaaCLQyDFYE3CoIOLLBaF2G12AX+
// SIG // iNvxkZGzVhpApuuSvjg5sHU2dDqYT+Q3upmJypVCHbC5
// SIG // x6CNV+D61WQEQjVOAdEzohfITaonx/LhhkwCOE2DeMb8
// SIG // U+Dr4AaH3aSWnl4MmOKlvr+ChcNg4d+tKNjHpUtk2scb
// SIG // W72sOQjVOCKhM4sviprrvAchP0RBCQe1ZRwkvEjTRIDr
// SIG // oc/JArQUz1THFqOAXPl5Pl1yfYgXnixDospTzn099io6
// SIG // uE+UAKVtCoNd+V5T9BizVw9ww/v1rZWgDhfexBaAYMkP
// SIG // K26GBPHr9Hgn0QXF7jRbXrlJMvIzMIIDxDCCAy2gAwIB
// SIG // AgIQR78Zld+NUkZD99ttSA0xpDANBgkqhkiG9w0BAQUF
// SIG // ADCBizELMAkGA1UEBhMCWkExFTATBgNVBAgTDFdlc3Rl
// SIG // cm4gQ2FwZTEUMBIGA1UEBxMLRHVyYmFudmlsbGUxDzAN
// SIG // BgNVBAoTBlRoYXd0ZTEdMBsGA1UECxMUVGhhd3RlIENl
// SIG // cnRpZmljYXRpb24xHzAdBgNVBAMTFlRoYXd0ZSBUaW1l
// SIG // c3RhbXBpbmcgQ0EwHhcNMDMxMjA0MDAwMDAwWhcNMTMx
// SIG // MjAzMjM1OTU5WjBTMQswCQYDVQQGEwJVUzEXMBUGA1UE
// SIG // ChMOVmVyaVNpZ24sIEluYy4xKzApBgNVBAMTIlZlcmlT
// SIG // aWduIFRpbWUgU3RhbXBpbmcgU2VydmljZXMgQ0EwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpyrKk
// SIG // zM0grwp9iayHdfC0TvHfwQ+/Z2G9o2Qc2rv5yjOrhDCJ
// SIG // WH6M22vdNp4Pv9HsePJ3pn5vPL+Trw26aPRslMq9Ui2r
// SIG // SD31ttVdXxsCn/ovax6k96OaphrIAuF/TFLjDmDsQBx+
// SIG // uQ3eP8e034e9X3pqMS4DmYETqEcgzjFzDVctzXg0M5US
// SIG // mRK53mgvqubjwoqMKsOLIYdmvYNYV291vzyqJoddyhAV
// SIG // PJ+E6lTBCm7E/sVK3bkHEZcifNs+J9EeeOyfMcnx5iIZ
// SIG // 28SzR0OaGl+gHpDkXvXufPF9q2IBj/VNC97QIlaolc2u
// SIG // iHau7roN8+RN2aD7aKCuFDuzh8G7AgMBAAGjgdswgdgw
// SIG // NAYIKwYBBQUHAQEEKDAmMCQGCCsGAQUFBzABhhhodHRw
// SIG // Oi8vb2NzcC52ZXJpc2lnbi5jb20wEgYDVR0TAQH/BAgw
// SIG // BgEB/wIBADBBBgNVHR8EOjA4MDagNKAyhjBodHRwOi8v
// SIG // Y3JsLnZlcmlzaWduLmNvbS9UaGF3dGVUaW1lc3RhbXBp
// SIG // bmdDQS5jcmwwEwYDVR0lBAwwCgYIKwYBBQUHAwgwDgYD
// SIG // VR0PAQH/BAQDAgEGMCQGA1UdEQQdMBukGTAXMRUwEwYD
// SIG // VQQDEwxUU0EyMDQ4LTEtNTMwDQYJKoZIhvcNAQEFBQAD
// SIG // gYEASmv56ljCRBwxiXmZK5a/gqwB1hxMzbCKWG7fCCmj
// SIG // XsjKkxPnBFIN70cnLwA4sOTJk06a1CJiFfc/NyFPcDGA
// SIG // 8Ys4h7Po6JcA/s9Vlk4k0qknTnqut2FB8yrO58nZXt27
// SIG // K4U+tZ212eFX/760xX71zwye8Jf+K9M7UhsbOCf3P0ow
// SIG // ggS/MIIEKKADAgECAhBBkaFaOXjfz0llZjgdTHXCMA0G
// SIG // CSqGSIb3DQEBBQUAMF8xCzAJBgNVBAYTAlVTMRcwFQYD
// SIG // VQQKEw5WZXJpU2lnbiwgSW5jLjE3MDUGA1UECxMuQ2xh
// SIG // c3MgMyBQdWJsaWMgUHJpbWFyeSBDZXJ0aWZpY2F0aW9u
// SIG // IEF1dGhvcml0eTAeFw0wNDA3MTYwMDAwMDBaFw0xNDA3
// SIG // MTUyMzU5NTlaMIG0MQswCQYDVQQGEwJVUzEXMBUGA1UE
// SIG // ChMOVmVyaVNpZ24sIEluYy4xHzAdBgNVBAsTFlZlcmlT
// SIG // aWduIFRydXN0IE5ldHdvcmsxOzA5BgNVBAsTMlRlcm1z
// SIG // IG9mIHVzZSBhdCBodHRwczovL3d3dy52ZXJpc2lnbi5j
// SIG // b20vcnBhIChjKTA0MS4wLAYDVQQDEyVWZXJpU2lnbiBD
// SIG // bGFzcyAzIENvZGUgU2lnbmluZyAyMDA0IENBMIIBIjAN
// SIG // BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvrzuvH7v
// SIG // g+vgN0/7AxA4vgjSjH2d+pJ/GQzCa+5CUoze0xxIEyXq
// SIG // wWN6+VFl7tOqO/XwlJwr+/Jm1CTa9/Wfbhk5NrzQo3YI
// SIG // HiInJGw4kSfihEmuG4qh/SWCLBAw6HGrKOh3SlHx7M34
// SIG // 8FTUb8DjbQqP2dhkjWOyLU4n9oUO/m3jKZnihUd8LYZ/
// SIG // 6FePrWfCMzKREyD8qSMUmm3ChEt2aATVcSxdIfqIDSb9
// SIG // Hy2RK+cBVU3ybTUogt/Za1y21tmqgf1fzYO6Y53QIvyp
// SIG // O0Jpso46tby0ng9exOosgoso/VMIlt21ASDR+aUY58Du
// SIG // UXA34bYFSFJIbzjqw+hse0SEuwIDAQABo4IBoDCCAZww
// SIG // EgYDVR0TAQH/BAgwBgEB/wIBADBEBgNVHSAEPTA7MDkG
// SIG // C2CGSAGG+EUBBxcDMCowKAYIKwYBBQUHAgEWHGh0dHBz
// SIG // Oi8vd3d3LnZlcmlzaWduLmNvbS9ycGEwMQYDVR0fBCow
// SIG // KDAmoCSgIoYgaHR0cDovL2NybC52ZXJpc2lnbi5jb20v
// SIG // cGNhMy5jcmwwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsG
// SIG // AQUFBwMDMA4GA1UdDwEB/wQEAwIBBjARBglghkgBhvhC
// SIG // AQEEBAMCAAEwKQYDVR0RBCIwIKQeMBwxGjAYBgNVBAMT
// SIG // EUNsYXNzM0NBMjA0OC0xLTQzMB0GA1UdDgQWBBQI9VHo
// SIG // +/49PWQ2fGjPW3io37nFNzCBgAYDVR0jBHkwd6FjpGEw
// SIG // XzELMAkGA1UEBhMCVVMxFzAVBgNVBAoTDlZlcmlTaWdu
// SIG // LCBJbmMuMTcwNQYDVQQLEy5DbGFzcyAzIFB1YmxpYyBQ
// SIG // cmltYXJ5IENlcnRpZmljYXRpb24gQXV0aG9yaXR5ghBw
// SIG // uuQdENkpNLY4ynsDzLq/MA0GCSqGSIb3DQEBBQUAA4GB
// SIG // AK46F7hKe1X6ZFXsQKTtSUGQmZyJvK8uHcp4I/kcGQ9/
// SIG // 62i8MtmION7cP9OJtD+xgpbxpFq67S4m0958AW4ACgCk
// SIG // BpIRSAlA+RwYeWcjJOC71eFQrhv1Dt3gLoHNgKNsUk+R
// SIG // dVWKuiLy0upBdYgvY1V9HlRalVnK2TSBwF9e9nq1MIIF
// SIG // ATCCA+mgAwIBAgIQTP3fo/z8BFSKKHcUZUrC+jANBgkq
// SIG // hkiG9w0BAQUFADCBtDELMAkGA1UEBhMCVVMxFzAVBgNV
// SIG // BAoTDlZlcmlTaWduLCBJbmMuMR8wHQYDVQQLExZWZXJp
// SIG // U2lnbiBUcnVzdCBOZXR3b3JrMTswOQYDVQQLEzJUZXJt
// SIG // cyBvZiB1c2UgYXQgaHR0cHM6Ly93d3cudmVyaXNpZ24u
// SIG // Y29tL3JwYSAoYykwNDEuMCwGA1UEAxMlVmVyaVNpZ24g
// SIG // Q2xhc3MgMyBDb2RlIFNpZ25pbmcgMjAwNCBDQTAeFw0w
// SIG // OTAxMjcwMDAwMDBaFw0xMjAyMjEyMzU5NTlaMIHEMQsw
// SIG // CQYDVQQGEwJDSDELMAkGA1UECBMCTkUxEjAQBgNVBAcT
// SIG // CU5ldWNoYXRlbDEiMCAGA1UEChQZQXV0b2Rlc2sgRGV2
// SIG // ZWxvcG1lbnQgU2FybDE+MDwGA1UECxM1RGlnaXRhbCBJ
// SIG // RCBDbGFzcyAzIC0gTWljcm9zb2Z0IFNvZnR3YXJlIFZh
// SIG // bGlkYXRpb24gdjIxDDAKBgNVBAsUA0RQRzEiMCAGA1UE
// SIG // AxQZQXV0b2Rlc2sgRGV2ZWxvcG1lbnQgU2FybDCBnzAN
// SIG // BgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwTciY3l9D35T
// SIG // aPD6J5CBW3dvCtN8TByPW2kMk9OXXZxucKVKfq2i8G+q
// SIG // cK6H/gr4gbgJsSbe5JuY/1hNmfcyylOLevfMzfh371V+
// SIG // XFlerCclSzRKjssKBOvr/Y8cg7f0QeX2qp+rCGio+Zl9
// SIG // Bi8hlhVtwudSifkMnjrTai3J6CECAwEAAaOCAX8wggF7
// SIG // MAkGA1UdEwQCMAAwDgYDVR0PAQH/BAQDAgeAMEAGA1Ud
// SIG // HwQ5MDcwNaAzoDGGL2h0dHA6Ly9DU0MzLTIwMDQtY3Js
// SIG // LnZlcmlzaWduLmNvbS9DU0MzLTIwMDQuY3JsMEQGA1Ud
// SIG // IAQ9MDswOQYLYIZIAYb4RQEHFwMwKjAoBggrBgEFBQcC
// SIG // ARYcaHR0cHM6Ly93d3cudmVyaXNpZ24uY29tL3JwYTAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzB1BggrBgEFBQcBAQRp
// SIG // MGcwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLnZlcmlz
// SIG // aWduLmNvbTA/BggrBgEFBQcwAoYzaHR0cDovL0NTQzMt
// SIG // MjAwNC1haWEudmVyaXNpZ24uY29tL0NTQzMtMjAwNC1h
// SIG // aWEuY2VyMB8GA1UdIwQYMBaAFAj1Uej7/j09ZDZ8aM9b
// SIG // eKjfucU3MBEGCWCGSAGG+EIBAQQEAwIEEDAWBgorBgEE
// SIG // AYI3AgEbBAgwBgEBAAEB/zANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAhnevCywQwquJmTICP63sFiy6adJpTqt/MgmuUKdW
// SIG // +zkRpZSmxW6cWnoGorq/WyNgWavEXJXws+s0C2z7kyMf
// SIG // MDMsy66NrlIkqJxr/FSPd7ZiQfn5AgXWZ68BQfHEZMj5
// SIG // St95kRix8q7w1o7n8fmTJ3icQHFmaKt5yeu74pwyFp3H
// SIG // tBHxFElS9ZVR/hjJqEEXqyAaxxlGivnhDFBewqAU/q/G
// SIG // CEPoJeAcXTzQGDnKPGr07ArF750acO7eNOnaSOJP19iI
// SIG // w9/LakN4E6fyoejbk40uUyzmyA87XWSoickmsbiHana2
// SIG // PTtPXjEPwqc/VILQElWnTwNclEkhV7QAfMIsRDGCA5Mw
// SIG // ggOPAgEBMIHJMIG0MQswCQYDVQQGEwJVUzEXMBUGA1UE
// SIG // ChMOVmVyaVNpZ24sIEluYy4xHzAdBgNVBAsTFlZlcmlT
// SIG // aWduIFRydXN0IE5ldHdvcmsxOzA5BgNVBAsTMlRlcm1z
// SIG // IG9mIHVzZSBhdCBodHRwczovL3d3dy52ZXJpc2lnbi5j
// SIG // b20vcnBhIChjKTA0MS4wLAYDVQQDEyVWZXJpU2lnbiBD
// SIG // bGFzcyAzIENvZGUgU2lnbmluZyAyMDA0IENBAhBM/d+j
// SIG // /PwEVIoodxRlSsL6MAwGCCqGSIb3DQIFBQCggZowGQYJ
// SIG // KoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGC
// SIG // NwIBCzEOMAwGCisGAQQBgjcCARUwHwYJKoZIhvcNAQkE
// SIG // MRIEEMQKvyZ4j9GDAKap4U5ZMoYwPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAC3ozy6l19T1tCJuRd/miCavIlbatYttEAiWgxiEM
// SIG // hz5b0RTsT1YuhPz67rV9cp+yZchVpChk0LIUkodywP9B
// SIG // hDjw6ExfVUBduXynHx8XMZeYC9BFy23yWj0tkeKvAEQI
// SIG // D8JaDsu+CciKSqFnCTnqzSOnUtyYwRMXsBF1qbzNrXWh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDQyMjA3
// SIG // NTc0MlowIwYJKoZIhvcNAQkEMRYEFGOK5m9N2SH9rWuH
// SIG // rNyZXHzUVze4MA0GCSqGSIb3DQEBAQUABIGAunnjPfBv
// SIG // GQM4MUjx898Hh3imunGTNkVSWwyRYgOwXJIv7jq/qZxz
// SIG // rMBh0FqX4xkY9w4F8hb3N6gYCDXla5dLOuYfPyQRYS0x
// SIG // dpcfj3+G7Uj6UelI89NUkDAfhHTjQULQp7Ho8TDcjPBe
// SIG // FHvNcGLqQxG1Kpu6lMkzqf6JhbcKC5o=
// SIG // End signature block
