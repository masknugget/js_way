//Variables
var globalVar;
var contentFrame = top;
var mResultList = new Array();
var DEFAULT_WIDTH = 100;
var DEFAULT_HEIGHT = 500;

// Moved from Acad-header.html - 10/13/09
top.HlpSys.search.data.stopWordsList =
            { a: "a", about: "about",
                after: "after", all: "all", also: "also", am: "am", an: "an", and: "and", another: "another", any: "any", are: "are", as: "as", at: "at", be: "be",
                because: "because", been: "been", before: "before", being: "being", between: "between", both: "both", but: "but", by: "by", came: "came", can: "can",
                come: "come", copyright: "copyright", corp: "corp", corporation: "corporation", could: "could", did: "did", does: "does", each: "each",
                etc: "etc", from: "from", get: "get", goes: "goes", got: "got", had: "had", has: "has", have: "have", he: "he", her: "her", here: "here",
                him: "him", himself: "himself", his: "his", how: "how", inc: "inc", into: "into", is: "is", it: "it", its: "its", let: "let",
                like: "like", make: "make", many: "many", me: "me", might: "might", more: "more", most: "most", much: "much", must: "must", my: "my", never: "never",
                nor: "nor", not: "not", now: "now", of: "of", off: "off", on: "on", one: "one", only: "only", or: "or", other: "other", our: "our", out: "out", over: "over",
                own: "own", reserved: "reserved", rights: "rights", said: "said", same: "same", see: "see", set: "set", shall: "shall", she: "she", should: "should",
                since: "since", so: "so", some: "some", still: "still", such: "such", take: "take", than: "than", that: "that", the: "the", their: "their", them: "them",
                then: "then", there: "there", these: "these", they: "they", those: "those", though: "though", through: "through", to: "to", too: "too",
                under: "under", us: "us", use: "use", very: "very", was: "was", way: "way", we: "we", well: "well", were: "were", what: "what", when: "when",
                where: "where", which: "which", who: "who", why: "why", will: "will", would: "would", yes: "yes", yet: "yet",
                you: "you", your: "your"
            };

top.HlpSys.search.ui.messages = {
    'results.limit': 'Too many occurences found. Please refine your query.',
    'filtered.stopwords': 'Following stop words was filtered:'
};

// Changed to include the root parameter - 10/13/09
function loadSearchResults(searchTerm, root) {
    setCookie("globalVar", searchTerm, 1);
    if (root == undefined)
        contentFrame.location = "acad-search.html";
    else
        contentFrame.location = root + "acad-search.html";
}


function displayResults(resultList) {
    for (var i = 0; i < resultList.getResults().length; i++) {
        ArrangeResults(resultList.getResults()[i]);
    }
    ActuallyDisplayResults();
    UpdateSelected(0);
}

function ArrangeResults(resultItem) {
    var bookPresent = false;
    if (mResultList.length > 0) {
        for (var i = 0; i < mResultList.length; i++) {
            if (mResultList[i].title == resultItem.bookName) {
                mResultList[i].appendChild(CreateBookItem(resultItem));
                bookPresent = true;
            }
        }
        if (!bookPresent)
            mResultList[mResultList.length] = CreateNewBookDiv(resultItem);
    }
    else {
        mResultList[0] = CreateNewBookDiv(resultItem);
    }
}

function CreateNewBookDiv(resultItem) {
    var bookResults = document.createElement('div');
    bookResults.setAttribute('id', 'DisplayResultContainer');
    bookResults.setAttribute('title', resultItem.bookName);
    bookResults.className = 'resultContainer';
    bookResults.appendChild(CreateBookItem(resultItem));
    return bookResults;
}

function CreateBookItem(resultItem) {
    var bookItem = document.createElement('div');
    bookItem.setAttribute('id', 'bookItem');
    bookItem.innerHTML = '<div class="search-result">' +
                         '<div class="search-result_title"><a target="_parent" href="' + resultItem.href + '">' + resultItem.title + '</a></div>'
    //                         +
    //                         '<div class="search-result_description">resultItem.description - Not provided</div>' + 
    //                         '<div class="search-result_breadcrumb">resultItem.breadcrumb - Not provided</div>'

    return bookItem;
}

function ActuallyDisplayResults() {
    //resultContainer1.appendChild(mResultList[0]);
    var resultContainer = contentFrame.document.getElementById("ResultContainer");
    CreateLayout(resultContainer);
}

function CreateLayout(srcHolder) {
    srcHolder.innerHTML = "";
    var srcDIV = document.createElement("div");
    srcDIV.className = 'search-result_table_wrapper';
    srcHolder.appendChild(srcDIV);

    var srcDIVLeft = document.createElement("div");
    srcDIVLeft.className = 'search-result_table_Col1';
    srcDIVLeft.innerHTML = getOuterHTML(CompileTitleList());
    srcDIV.appendChild(srcDIVLeft);

    var srcDIVRight = document.createElement("div");
    srcDIVRight.className = 'search-result_table_Col2';
    srcDIVRight.innerHTML = getOuterHTML(mResultList[0]);
    srcDIV.appendChild(srcDIVRight);
}

function CreateTable2(rowCount, colCount, srcHolder) {
    srcHolder.innerHTML = "";
    var srcDIV = document.createElement("div");
    srcDIV.className = 'search-result_table_wrapper';
    srcHolder.appendChild(srcDIV);

    var srcTable = document.createElement("table");
    srcTable.className = 'search-result_table';
    //    srcTable.border = 1;
    //    srcTable.borderColor = "Blue";
    srcTable.height = DEFAULT_HEIGHT;
    //srcTable.width = DEFAULT_WIDTH;
    var tmpRow = null;
    var tmpCell = null;
    for (i = 0; i < rowCount; i++) {
        tmpRow = AppendRow(srcTable)
        tmpRow.className = 'search-result_table_row'

        for (j = 0; j < colCount; j++) {
            tmpCell = AppendCell(tmpRow);

            if (j == 0) {
                var tmpHtml = getOuterHTML(CompileTitleList());
                tmpCell.className = 'search-result_table_cell1'
            }
            else {
                var tmpHtml = getOuterHTML(mResultList[i]);
                tmpCell.className = 'search-result_table_cell2'
            }

            tmpCell.innerHTML = tmpHtml;
        }
        tmpRow = null;
    }
    srcDIV.appendChild(srcTable);
}

function CompileTitleList() {
    var bookList = document.createElement('div');
    for (ii = 0; ii < mResultList.length; ii++) {
        var bookTitleItem = document.createElement('div');
        bookTitleItem.setAttribute('id', 'bookTitleItem');
        //bookTitleItem.setAttribute('title', ii);
        if (ii == 0) {
            bookTitleItem.innerHTML = '<div class="search-result_book_selected" id="SearchResultBook' + ii + '" onclick="UpdateResult(' + ii + '); UpdateSelected(' + ii + ');">'
                                    + mResultList[ii].title + '</div>';
        }
        else {
            bookTitleItem.innerHTML = '<div class="search-result_book" id="SearchResultBook' + ii + '" onclick="UpdateResult(' + ii + '); UpdateSelected(' + ii + ');">'
                                    + mResultList[ii].title + '</div>';
        }

        bookList.appendChild(bookTitleItem);
    }
    return bookList;
}

function UpdateResult(topicNumber) {
    var tmpvar = contentFrame.document.getElementById("DisplayResultContainer");
    tmpvar.innerHTML = getOuterHTML(mResultList[topicNumber]);
}

function UpdateSelected(selectedBook) {
    for (ii = 0; ii < mResultList.length; ii++) {
        if (ii == selectedBook)
            contentFrame.document.getElementById("SearchResultBook" + ii).className='search-result_book_selected';
        else
            contentFrame.document.getElementById("SearchResultBook" + ii).className='search-result_book';
    }
    UpdateResultsDisplayed(selectedBook);
}

function UpdateResultsDisplayed(selectedBook) {
    var tip = contentFrame.document.getElementById("searchResultsTip");
    if (mResultList.length != 0)
        tip.innerHTML = searchResultsDisplaying + "<b>" + mResultList[selectedBook].title + "</b>" + searchMoreResults;
    else tip.innerHTML = searchNoResults;
}

function AppendRow(srcTable) {
    if (srcTable != null) {
        return srcTable.insertRow();
    }
}

function AppendCell(srcRow) {
    if (srcRow != null) {
        return srcRow.insertCell();
    }
}

function searchResultLoaded() {
    //delay query now.
    var searchTerm = getCookie("globalVar");
    var searchField = document.getElementById('searchData');
    searchField.value = searchTerm;

    top.HlpSys.search.ui.clearWarnings()
    var resultsWithBookNames = top.HlpSys.search.SearchString(searchTerm);
    displayResults(resultsWithBookNames);
}

function JumpToResult(url) {
    var highlightUrl = url + "?highlighting=" + getCookie("globalVar");
    contentFrame.location = highlightUrl;
    //window.open(highlightUrl, "content");
    //./files/WS1a9193826455f5ff3d6161141208a8044f3-7f3d.htm?highlighting=test
}

function getCookie(Name) {
    var re = new RegExp(Name + "=[^;]+", "i");
    if (document.cookie.match(re)) {
        var searchTerm = unescape(document.cookie.match(re)[0].split("=")[1]);
        return searchTerm;
    }
    return "";
}

//escape the cookie before saving
function setCookie(name, value, days) {
    var expireDate = new Date()
    var expstring = expireDate.setDate(expireDate.getDate() + parseInt(days))
    document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString() + "; path=/";
}


function getOuterHTML(ele) {
    if (ele == null || ele == undefined)
        return "";
    else {
        var el = document.createElement("temp");
        el.appendChild(ele);
        var shtml = el.innerHTML;
        return shtml;
    }
}


// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEDJq
// SIG // BLSA6OOXhkuqXrjNPXmgghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEJZ1WquqlTpbE5T/XcLp0C0wPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGABUUzdO/73Cnlzq8bvn2NmQb5dIobGbsBbnAsRVEN
// SIG // 7DCytgeR/oAqgccDXzdhxcQKaEPU1mZ+MZbqyTu/QX3O
// SIG // 5HJJ0Vkicz+9Ey/Tu9SWOqLFh8TEIeu+3uGWmmZ3yL8j
// SIG // 2NiWNiHN7AvoRn0/40DfPigDqGoqpbXHpeXnyKmX75Sh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDE0OVowIwYJKoZIhvcNAQkEMRYEFGfXR3yyccfeKtZe
// SIG // yg4aVt8EBOQGMA0GCSqGSIb3DQEBAQUABIGAMQ+4q49F
// SIG // ZcEAZjreaWTXLstb1uQH8mgeGhqpPaVifNeH2X4KD8s5
// SIG // LttlPgC7Z24oKvV/YBYEYqzCkk8KcMoNRue1UEjr/XEB
// SIG // sjVbcDwN3FDn1BNxqa9KXYPzYy7GMCJ/AwffyU7QINnd
// SIG // elEMcjMhU8pduRvgNrnPOv3zy4373/c=
// SIG // End signature block
