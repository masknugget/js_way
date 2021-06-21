if (top.HlpSys === undefined) {
    top.HlpSys = new Object();
}

top.HlpSys.search = function(){
    var self = null;
    var workingDocument = null;

    var searchState = new CookieWorker(top.document, "autodesk_search_state", 24000);

    function saveState(config) {
        searchState.store(config);
    }

    function restoreState(config) {
        searchState.load(config);
        //convert string values into boolean
        config.highlightEnable = config.highlightEnable == "true" ? true : false;
        config.wholeWords = config.wholeWords == "true" ? true : false;
        config.caseSensitive = config.caseSensitive == "true" ? true : false;
    }

    function prepareQuery(query) {
        var regexp = /(\x20\x20)/g;
        while (query.match(regexp)) query = query.replace(regexp, "\x20");
        regexp = /(^\x20)|(\x20$)/g;
        while (query.match(regexp)) query = query.replace(regexp, "");
        return query;
    };

    function filterQuery(queryArr, buffer, data) {
        var isStopWord = false;
        var isSameWord = false;
        var resultArr = new Array();
        var filteredStopWords = "";
        var StopWords = data.stopWordsList;

        for (var i = 0; i < queryArr.length; i++) {
            isStopWord = false;
            isSameWord = false;
            if (StopWords[queryArr[i].toLowerCase()]) {
                isStopWord = true;
            }
            for (var j = 0; j < i; j++) {
                if (queryArr[j] == queryArr[i]) {
                    isSameWord = true;
                    break;
                }
            }
            if (!isStopWord && !isSameWord) {
                resultArr[resultArr.length] = queryArr[i];
            } else {
                filteredStopWords += "\"" + queryArr[i] + "\" ";
            }
        }

        buffer.filteredStopWords = filteredStopWords;
        buffer.querryWordList = resultArr;
        return resultArr;
    };

    function generateRegExpArray(queryArr, config) {
        var resultArray = new Array(queryArr.length);
        var caseSensitive = config.caseSensitive;
        var wholeWords = config.wholeWords;

        var parameters = "";
        for (var i = 0; i<queryArr.length; i++) {
            if (caseSensitive) {
                parameters = "";
            } else {
                parameters = "i";
            }
            if (wholeWords)
                resultArray[i] = new RegExp('\\b' + queryArr[i] + '\\b', parameters);
            else
                resultArray[i] = new RegExp(queryArr[i], parameters);
        }

        return resultArray;
    };

    function getSmallestDifference(array1, array2) {
        var min = 32000;
        var stopWord = 1;
        for (var i1 = 0; i1 < array1.length; i1++) {
            for (var i2 = 0; i2 < array2.length; i2++) {
                if ((abs(abs(array1[i1]) - abs(array2[i2])) < min) && (abs(array2[i2]) < abs(array1[i1]))) {
                    min = abs(abs(array1[i1]) - abs(array2[i2]));
                    stopWord = ((array1[i1] < 0) || (abs(array2[i2]) > abs(array1[i1]))) ? -1 : 1;
                }
            }
        }
        if (min == 0) {
            //		alert("SOMETHING Wrong")
        }
        return stopWord * min;
    };

    function abs(value) {
        return value < 0 ? value * -1 : value;
    };

    function RenderBookList(searchProviders) {
        if (workingDocument !== null) {
            var bookList = workingDocument.getElementById("collapsible_search_books");

            if (bookList) {
                for (var i in searchProviders) {
                    var searchProvider = searchProviders[i];
                    var bookElement = workingDocument.createElement("div");
                    var bookSwitch = workingDocument.createElement("input");
                    bookSwitch.setAttribute("id", "book" + searchProvider.getName());
                    bookSwitch.setAttribute("type", "checkbox");
                    if (searchProvider.isEnabled()) {
                        bookSwitch.setAttribute("checked", "true");
                    }
                    bookSwitch.setAttribute("onClick", "top.HlpSys.search.data.searchProviders['"+i+"'].switchState()");
                    bookElement.appendChild(bookSwitch);

                    var text = workingDocument.createTextNode(searchProvider.getFullName());
                    bookElement.appendChild(text);
                    bookList.appendChild(bookElement);
                }
            }
        }
    }

    return {
        init : function(doc) {
            self = this;
            workingDocument = doc;
            restoreState(this.config);
            RenderBookList(this.data.searchProviders);
        },

        restoreState: function(doc) {
            var searchForm = doc.searchForm;

            var searchMethodState = this.config.searchMethod;
            for (var i = 0; i < searchForm.searchMethod.length; i++) {
                var radioElement = searchForm.searchMethod[i];
                if (radioElement.value == searchMethodState) {
                    radioElement.checked = true;
                }
            }

            var highlightCheckBox = searchForm.highlightSwitch;
            if (highlightCheckBox) {
                var highlightState = this.config.highlightEnable;
                highlightCheckBox.checked = highlightState;
            }

            var caseSensitiveSwitch = searchForm.caseSensitiveSwitch;
            if (caseSensitiveSwitch) {
                var caseSensitiveState = this.config.caseSensitive;
                caseSensitiveSwitch.checked = caseSensitiveState;
            }

            var wholeWordsSwitch = searchForm.wholeWordsSwitch;
            if (wholeWordsSwitch) {
                var wholeWordsState = this.config.wholeWords;
                wholeWordsSwitch.checked = wholeWordsState;
            }

            var searchTermField = searchForm.searchData;
            if (searchTermField) {
                var searchTermState = this.config.searchTerm;
                searchTermField.value = searchTermState;
            }
        },

        config:{
            workingDocument : null,
			caseSensitive: false,
			wholeWords: true,
			searchMethod: 'and',
			highlightEnable: true,
            searchTerm: "",

            setSearchMethod : function(option) {
                this.searchMethod = option;
                saveState(this);
            },

            setWholeWords : function(option) {
                if (typeof option == "boolean") {
                    this.wholeWords = option;
                } else {
                    this.wholeWords = !this.wholeWords;
                }
                saveState(this);
            },

            setHighlighting : function(option) {
                if (typeof option == "boolean") {
                    this.highlightEnable = option;
                } else {
                    this.highlightEnable = !this.highlightEnable;
                }
                saveState(this);
            },

            setCaseSensitive : function(option) {
                if (typeof option == "boolean") {
                    this.caseSensitive = option;
                } else {
                    this.caseSensitive = !this.caseSensitive;
                }
                saveState(this);
            }
		},

		data:{
			stopWordsList: new Array(),
            searchProviders: new Array(),

            registerSearchProvider : function(provider) {
                this.searchProviders[provider.getName()] = provider;
            },

            registerSearchDataProvider : function(name, dataProvider) {
                name = name != "" ? name : "default";
                var searchProvider = this.getSearchProvider(name);
                if (searchProvider) {
                    searchProvider.registerDataProvider(dataProvider);
                }
            },

            getSearchProvider : function(name) {
                name = name != "" ? name : "default";
                return this.searchProviders[name];
            }
		},

		buffer:{
			filteredStopWords:"",
			querryWordList: new Array()
		},

        SearchString: function(query) {
            //    document.getElementById("searchList").length = 0;
            var preQuery = prepareQuery(query);
            var preQueryArr = preQuery.split(" ");
            var queryArr = filterQuery(preQueryArr, this.buffer, this.data);
            queryArr = this.SearchStemmer.stem(queryArr);
            var regexpArr = generateRegExpArray(queryArr, this.config);

            var results = new this.ResultList();
            for (var i in this.data.searchProviders) {
                var searchProvider = this.data.searchProviders[i];
                if (searchProvider.isEnabled()) {
                    var resultsFromBook = searchProvider.SearchString(regexpArr, queryArr, this.config.searchMethod);
                    results.mergeResults(resultsFromBook);
                }
            }

            results.sortResults();
            return results;
        },

        doSearch : function(query, searchFrame) {
            this.ui.clearWarnings();
            this.config.searchTerm = query;
            saveState(this.config);
            var results = this.SearchString(query);
            if (this.buffer.filteredStopWords != "") {
                this.ui.showWarning("filtered.stopwords", this.buffer.filteredStopWords);
            }
            this.ui.displaySearchResult(results, searchFrame, this.config);
        },

        SearchResult: function(href, title, rank, bookName, description, ancestry) {
            return {
                href : href,
                title : title,
                rank: rank,
                bookName: bookName,
                description: description,
                ancestry: ancestry
            };
        },

        ResultList : function () {
            var list = new Array();
            var searchQuery = "";

            function quicksort(m, n, desc) {
                if (n <= m + 1) return;
                if ((n - m) == 2) {
                    if (compare(getElement(n - 1), getElement(m), desc)) exchange(n - 1, m);
                    return;
                }
                var i = m + 1;
                var j = n - 1;
                if (compare(getElement(m), getElement(i), desc)) exchange(i, m);
                if (compare(getElement(j), getElement(m), desc)) exchange(m, j);
                if (compare(getElement(m), getElement(i), desc)) exchange(i, m);
                var pivot = getElement(m);
                while (true) {
                    j--;
                    while (compare(pivot, getElement(j), desc)) j--;
                    i++;
                    while (compare(getElement(i), pivot, desc)) i++;
                    if (j <= i) break;
                    exchange(i, j);
                }
                exchange(m, j);
                if ((j - m) < (n - j)) {
                    quicksort(m, j, desc);
                    quicksort(j + 1, n, desc);
                } else {
                    quicksort(j + 1, n, desc);
                    quicksort(m, j, desc);
                }
            }

            ;

            function getElement(i) {
                return list[i].rank;
            }

            ;

            function compare(val1, val2, desc) {
                return (desc) ? val1 > val2 : val1 < val2;
            }

            ;

            function exchange(i, j) {
                // exchange adjacent
                // var tResult = new Array(4);
                var exchangeBuffer = list[i];
                list[i] = list[j];
                list[j] = exchangeBuffer;
            }

            ;

            return {
                addResult : function(searchResult) {
                    list[list.length] = searchResult;
                },

                sortResults : function(order) {
                    if (order === undefined) {
                        order = true;
                    }
                    quicksort(0, list.length, order);
                },

                getResults : function() {
                    return list;
                },

                addSearchQuery : function(query) {
                    searchQuery = query;
                },

                getSearchQuery : function() {
                    return searchQuery;
                },

                mergeResults : function(resultObject) {
                    var results = resultObject.getResults();
                    for (var i = 0; i< results.length; i++) {
                        list[list.length] = results[i];
                    }
                    searchQuery = resultObject.getSearchQuery();
                }
            };
        },

        SearchStemmer : function() {
            var step2list = new Array();
            step2list["ational"]="ate";
            step2list["tional"]="tion";
            step2list["enci"]="ence";
            step2list["anci"]="ance";
            step2list["izer"]="ize";
            step2list["bli"]="ble";
            step2list["alli"]="al";
            step2list["entli"]="ent";
            step2list["eli"]="e";
            step2list["ousli"]="ous";
            step2list["ization"]="ize";
            step2list["ation"]="ate";
            step2list["ator"]="ate";
            step2list["alism"]="al";
            step2list["iveness"]="ive";
            step2list["fulness"]="ful";
            step2list["ousness"]="ous";
            step2list["aliti"]="al";
            step2list["iviti"]="ive";
            step2list["biliti"]="ble";
            step2list["logi"]="log";

            var step3list = new Array();
            step3list["icate"]="ic";
            step3list["ative"]="";
            step3list["alize"]="al";
            step3list["iciti"]="ic";
            step3list["ical"]="ic";
            step3list["ful"]="";
            step3list["ness"]="";

            var c = "[^aeiou]";          // consonant
            var v = "[aeiouy]";          // vowel
            var C = c + "[^aeiouy]*";    // consonant sequence
            var V = v + "[aeiou]*";      // vowel sequence

            var mgr0 = "^(" + C + ")?" + V + C;               // [C]VC... is m>0
            var meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";  // [C]VC[V] is m=1
            var mgr1 = "^(" + C + ")?" + V + C + V + C;       // [C]VCVC... is m>1
            var s_v   = "^(" + C + ")?" + v;                   // vowel in stem

            function stemWord(w) {
                var stem;
                var suffix;
                var firstch;

                if (w.length < 3) { return w; }

                   var re;
                   var re2;
                   var re3;
                   var re4;

                firstch = w.substr(0,1);
                if (firstch == "y") {
                    w = firstch.toUpperCase() + w.substr(1);
                }

                // Step 1a
                   re = /^(.+?)(ss|i)es$/;
                   re2 = /^(.+?)([^s])s$/;

                   if (re.test(w)) { w = w.replace(re,"$1$2"); }
                   else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }

                // Step 1b
                re = /^(.+?)eed$/;
                re2 = /^(.+?)(ed|ing)$/;
                if (re.test(w)) {
                    var fp1 = re.exec(w);
                    re = new RegExp(mgr0);
                    if (re.test(fp1[1])) {
                        re = /.$/;
                        w = w.replace(re,"");
                    }
                } else if (re2.test(w)) {
                    var fp2 = re2.exec(w);
                    stem = fp2[1];
                    re2 = new RegExp(s_v);
                    if (re2.test(stem)) {
                        w = stem;
                        re2 = /(at|bl|iz)$/;
                        re3 = new RegExp("([^aeiouylsz])\\1$");
                        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                        if (re2.test(w)) {	w = w + "e"; }
                        else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
                        else if (re4.test(w)) { w = w + "e"; }
                    }
                }

                // Step 1c
                re = /^(.+?)y$/;
                if (re.test(w)) {
                    var fp3 = re.exec(w);
                    stem = fp3[1];
                    re = new RegExp(s_v);
                    if (re.test(stem)) { w = stem + "i"; }
                }

                // Step 2
                re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
                if (re.test(w)) {
                    var fp4 = re.exec(w);
                    stem = fp4[1];
                    suffix = fp4[2];
                    re = new RegExp(mgr0);
                    if (re.test(stem)) {
                        w = stem + step2list[suffix];
                    }
                }

                // Step 3
                re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
                if (re.test(w)) {
                    var fp5 = re.exec(w);
                    stem = fp5[1];
                    suffix = fp5[2];
                    re = new RegExp(mgr0);
                    if (re.test(stem)) {
                        w = stem + step3list[suffix];
                    }
                }

                // Step 4
                re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
                re2 = /^(.+?)(s|t)(ion)$/;
                if (re.test(w)) {
                    var fp6 = re.exec(w);
                    stem = fp6[1];
                    re = new RegExp(mgr1);
                    if (re.test(stem)) {
                        w = stem;
                    }
                } else if (re2.test(w)) {
                    var fp7 = re2.exec(w);
                    stem = fp7[1] + fp7[2];
                    re2 = new RegExp(mgr1);
                    if (re2.test(stem)) {
                        w = stem;
                    }
                }

                // Step 5
                re = /^(.+?)e$/;
                if (re.test(w)) {
                    var fp8 = re.exec(w);
                    stem = fp8[1];
                    re = new RegExp(mgr1);
                    re2 = new RegExp(meq1);
                    re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                    if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                        w = stem;
                    }
                }

                re = /ll$/;
                re2 = new RegExp(mgr1);
                if (re.test(w) && re2.test(w)) {
                    re = /.$/;
                    w = w.replace(re,"");
                }

                // and turn initial Y back to y

                if (firstch == "y") {
                    w = firstch.toLowerCase() + w.substr(1);
                }

                return w;

            }

            return {
                stem : function(words) {
                    if (top.HlpSys.config && top.HlpSys.config.locale == 'en_US' && !top.HlpSys.search.config.wholeWords) {
                        var resultWords = new Array();
                        for (var i = 0; i < words.length; i++) {
                            resultWords[resultWords.length] = stemWord(words[i]);
                        }
                        return resultWords;
                    } else {
                        return words;
                    }
                }
            };
        }(),

        ui : {
            messages : new Array(),

            //Shows warning from on of predefined messages.
            //@param message - messege type to show in warning block.
            //@param parameters - that should be added to the message
            showWarning : function(message, param) {
                var result_message = "";
                switch (message) {
                    case "results.limit" : {
                        result_message = top.HlpSys.search.ui.messages[message];
                        break;
                    }
                    case "filtered.stopwords" : {
                        result_message = top.HlpSys.search.ui.messages[message] + param;
                        break;
                    }
                }

                if (result_message != "") {
                    var warningBlock = workingDocument.getElementById("warningBlock");
                    var warning = workingDocument.createElement("div");
                    warning.setAttribute("class", "warning");

                    var text = workingDocument.createTextNode(result_message);
                    warning.appendChild(text);
                    warningBlock.appendChild(warning);
                }
            },

            //Clear warnings displayed during search
            clearWarnings : function() {
                var warningBlock = workingDocument.getElementById("warningBlock");
                for (var i = 0; i <warningBlock.childNodes.length; i++) {
                    var node = warningBlock.childNodes[i];
                    warningBlock.removeChild(node);
                }
            },

            //Update progress bar of search process.
            //Not Implemented
            updateProgress: function() {

            },

            //Displays result of the search.
            //@param results  - ResultList objects that contains all results and search query for highlithing.
            //@param resultsDocument - document which was passed to the function doSearch. Usually we sending document where results should be displayed.
            displaySearchResult : function(resultList, resultsDocument) {

                var results = resultList.getResults();
                var searchQuery = resultList.getSearchQuery();
                var searchList = resultsDocument.getElementById("searchList");
                searchList.length = 0;

                for (var i = 0; i < results.length; i++)
                {
                    var element = resultsDocument.createElement("OPTION");
                    element.text = results[i].rank + ": " + results[i].title;
                    element.value = results[i].href + "?"+searchQuery;
                    try
                    {
                        searchList.add(element, null);
                        // standards compliant
                    }
                    catch(ex)
                    {
                        searchList.add(element);
                        // IE only
                    }
                }

                if (searchList.length == 0) {
                    this.showWarning("Search gives no results");
                }
            },

            viewResult : function(resultsDocument) {
                var searchList = resultsDocument.getElementById("searchList");
                if (searchList.selectedIndex > -1 ) {
                    window.open(searchList.options[searchList.selectedIndex].value, "content");
                }
            }

        }
    };
}();


// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEPp8
// SIG // jPuvwhRj0fKWTQBpFnagghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEFcMsRFVZt/3tIj1M7LhyeYwPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAT+5ph7UYnWzgm4TyymA4bq6qw9EQr+OBPziLy2ad
// SIG // dS7+HaU3X/hHowhm23bGrM2oF6nhLPRsj2MxW/aOFIgk
// SIG // 2/v+d9YaUW7sKJtNb0z6pSjh3oJusLpbotm7a4tNtMBk
// SIG // LMvRM1FiXp8wJE8HoRNzErdoPHio89hDw16cXxvTIKyh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDE0OFowIwYJKoZIhvcNAQkEMRYEFMfy3O6P9OWS430h
// SIG // MNcPLZCk940NMA0GCSqGSIb3DQEBAQUABIGAHzq/HS01
// SIG // YcOs/GwisigHka3A1AtTofUf7g9xdEHi6Jzn+dVko5/C
// SIG // R/VehiepU1zIA5R7S/H3pC39HhKqRvSJPfR1UPtnz7JX
// SIG // EDcAcALvfelO1FtJiiMivWqYQTvu+VsyTBbGx6Tu/G5G
// SIG // KWsOnnIubr2Wywa475xNf5hjyUn3Quc=
// SIG // End signature block
