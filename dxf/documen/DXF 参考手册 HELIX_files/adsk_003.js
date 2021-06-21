if (top.HlpSys === undefined) {
    top.HlpSys = new Object();
}

top.HlpSys.highlight = function(){
    var searchObj;
    var highlightObj;

    function decodeReferrer(q, config) {
        var query = new Array();

        if (q != null && q.length > 0) {
            query[0] = q[0];
            for (var i1 = 0; i1 < q.length; i1++) {
                query[query.length] = q[i1];
                if (i1 != 0) {
                    query[0] += "[^\\w]+" + q[i1];
                }
            }

        } else {
            return null;
        }

        var caseSens = config.caseSensitive;
        var exact = config.wholeWords;
        var qre = new Array();
        for (var i2 = 0; i2 < query.length; i2 ++) {
            query[i2] = caseSens ? query[i2] : query[i2].toLowerCase();
            if (exact)
                qre.push('\\b' + query[i2] + '\\b');
            else
                qre.push(query[i2]);
        }

        for (var i3 = 0; i3 < qre.length; i3 ++) {
            qre[i3] = new RegExp(qre[i3], caseSens ? "" : "i");
        }

        return qre;

    };

    function hiliteElement(elm, query) {
        if (!query || elm.childNodes.length == 0)
            return;

        var qre = query;
        var searchMethod = searchObj.config.searchMethod;

        var textproc = function(node, querryNum) {
            var q = querryNum;
            var match = null;
            var continuedSearch = true;
            if (searchMethod == 'phrase') {
                if (querryNum == 0) {
                    match = qre[q].exec(node.data);
                    q++;
                    querryNum++;
                    continuedSearch = false;
                }
                if (match) {
                    var val = match[0];
                    var k = '';
                    var node2 = node.splitText(match.index);
                    var node3 = node2.splitText(val.length);
                    var span = node.ownerDocument.createElement('SPAN');
                    node.parentNode.replaceChild(span, node2);
                    span.className = highlightObj.config.stylemapper[0];
                    span.appendChild(node2);
                    return span;
                } else {
                    if (qre[q] && qre[q].exec(node.data)) {
                        var words = normalizeSpace(node.data).split(/[\[ | \^ | \$ | \. | \| | \+ | \( | \) | ` | ~ | ! | # | % | & | - | \- | _ | = | \] | { | } | ; | ' | " | < | > | ,]/);
                        var w = 0;
                        var wrongSearch = false;
                        if (q == 1) {
                            for (w = 0; w < words.length; w++) {
                                if (qre[q].exec(words[w])) {
                                    break;
                                }
                            }
                        }
                        while (q < qre.length && w < words.length) {
                            if (qre[q].exec(words[w])) {
                                q++;
                                w++;
                            } else if (searchObj.data.stopWordsList[words[w].toLowerCase()] || words[w].length == 0) {
                                w++;
                            } else {
                                wrongSearch = true;
                                break;
                            }
                        }
                        if (!wrongSearch) {
                            q--;
                            if (q + 1 == qre.length) {
                                var matchS = qre[querryNum].exec(node.data);
                                var node2 = node.splitText(matchS.index);
                                var matchE = qre[q].exec(node2.data);
                                var node3 = node2.splitText(matchE.index + matchE[0].length);
                                var span = node.ownerDocument.createElement('SPAN');
                                node.parentNode.replaceChild(span, node2);
                                span.className = highlightObj.config.stylemapper[0];
                                span.appendChild(node2);
                                return span;
                            } else {
                                var nextNode = getFollowingTextNode(node);
                                if (nextNode != null) {
                                    var nextProcessedNode = textproc(nextNode, q + 1)
                                    if (nextNode != nextProcessedNode) {
                                        var matchS = qre[querryNum].exec(node.data);
                                        var node2 = node.splitText(matchS.index);
                                        var span = node.ownerDocument.createElement('SPAN');
                                        node.parentNode.replaceChild(span, node2);
                                        span.className = highlightObj.config.stylemapper[0];
                                        span.appendChild(node2);
                                        return nextProcessedNode;
                                    }
                                }
                            }
                        } else if (!continuedSearch && w < words.length) {
                            var matchT = (new RegExp(words[w], "i")).exec(node.data)
                            if (matchT) {
                                var node2 = node.splitText(matchT.index + matchT[0].length);
                                if (node.data.length - matchT.index - matchT[0].length == 0) {
                                    return node;
                                } else {
                                    return textproc(node2, 0);
                                }
                            }
                        }
                    }
                    return node;
                }
            } else {
                for (var i = 0; i < qre.length; i++) {
                    match = qre[i].exec(node.data);
                    if (match) {
                        var val = match[0];
                        var node2 = node.splitText(match.index);
                        var node3 = node2.splitText(val.length);
                        var span = node.ownerDocument.createElement('SPAN');
                        node.parentNode.replaceChild(span, node2);
                        span.className = highlightObj.config.stylemapper[0];
                        span.appendChild(node2);
                        return span;
                    }
                }
                return node;
            }
        };
        walkElements(elm.childNodes[0], 1, textproc);
    };

    function walkElements(node, depth, textproc) {
        var skipre = /^(head|script|style|textarea)/i;
        var count = 0;
        while (node && depth > 0) {
            count ++;
            if (count >= highlightObj.config.max_nodes) {
                var handler = function() {
                    walkElements(node, depth, textproc);
                };
                setTimeout(handler, 50);
                return;
            }

            if (node.nodeType == 1) { // ELEMENT_NODE
                if (!skipre.test(node.tagName) && node.childNodes.length > 0) {
                    node = node.childNodes[0];
                    depth ++;
                    continue;
                }
            } else if (node.nodeType == 3) { // TEXT_NODE
                node = textproc(node, 0);
                if (node.parentNode == null) {
                    alert(node.nodeName + ":1" + node.data + ":");
                }
            }

            if (node == null) {
                return;
            }

            if (node.nextSibling) {
                node = node.nextSibling;
            } else {
                while (depth > 0) {
                    node = node.parentNode;
                    depth --;
                    if (node.nextSibling) {
                        node = node.nextSibling;
                        break;
                    }
                }
            }
        }
    };

    function getFollowingTextNode(node) {
        node = getFollowingNode(node);
        if (node) {
            if (node.nodeType == 3 && normalizeSpace(node.data).length > 0) {
                return node;
            } else {
                return getFollowingTextNode(node);
            }
        } else {
            return null;
        }
    };

    function getFollowingNode(node) {
        if (node) {
            if (node.firstChild) {
                return node.firstChild;
            } else if (node.nextSibling) {
                return node.nextSibling;
            } else {
                while (node.parentNode) {
                    node = node.parentNode;
                    if (node.nextSibling) {
                        return node.nextSibling;
                    }
                }
                return null;
            }
        } else return null;
    };

    function normalizeSpace(string) {
        var regexp = new RegExp("[\\s][\\s]+","g");
        while(string.match(regexp)) {
            string = string.replace(regexp," ");
        }
        if (string.length == 1 && string == " ") {
            return "";
        } else {
            return string;
        }
    };

    function disHilite(node, config) {
        if (node != null) {
            if (node.nodeType == 1 || node.nodeType == 9) { // ELEMENT_NODE
                if ((node.nodeName.toLowerCase() == "span") && (node.attributes["class"] != null) && (node.attributes["class"].nodeValue.indexOf(config.stylename) == 0)) {
                    var childs1 = node.childNodes;
                    for (var j = 0; j < childs1.length; j++) {
                        node.parentNode.insertBefore(childs1[j], node);
                    }
                    node.parentNode.removeChild(node);
                } else if (node.childNodes.length > 0) {
                    var childs2 = node.childNodes;
                    for (var i = 0; i < childs2.length; i++) {
                        disHilite(childs2[i], config);
                    }
                }
            }
        }
    }

    function parseUrlParameters(queryString) {
        var args = new Object();
        var pairs = queryString.split(",");                 // Break at comma
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');          // Look for "name=value"
            if (pos == -1) continue;                  // If not found, skip
            var argname = pairs[i].substring(0, pos);  // Extract the name
            var value = pairs[i].substring(pos + 1);    // Extract the value
            args[argname] = unescape(value);
        }

        return args;
    };



    return {
		config: {
            onload: true,
			elementid: '',
			max_nodes: 500,
			stylename: 'hilite',
			stylemapper: ['hilite','hilite1','hilite2'],
			debug_referrer: ''
		},

        onload: function() {
            if (top.HlpSys.search !== undefined) {
                searchObj = top.HlpSys.search;
                highlightObj = top.HlpSys.highlight;
                var parameters = window.location.search.substring(1);
                var args = parseUrlParameters(parameters);
                var arg = args["highlighting"];
                if (arg && arg.length > 0) {
                    var decodedWords = decodeURIComponent(arg);
                    var words = decodedWords.split("|");
                    var q = decodeReferrer(words, searchObj.config);
                    top.HlpSys.highlight.hilite(window.document, q, searchObj.config.highlightEnable);
                }
            }
        },

		hilite: function(doc, query, enable) {
			if (enable && query.length > 0) {
				if (doc != null) {
					hiliteElement(doc, query);
				}
			} else {
				disHilite(doc, this.config);
			}
		}
    };
}();

if (top.HlpSys.highlight.config.onload) {
    AddOnLoadFunction(top.HlpSys.highlight.onload);
}

// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEDkO
// SIG // JG7t8wcOFN6ZLVg30KmgghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEGl1j+lW/XqX/gQlFjjCZSowPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAtmUAZv8OEDd1T4jxK8vA/N0TytKyjivvNJX/kKLX
// SIG // /G7RZC/3IsFGezZZpq3dAKbfuvllERhkwPABav+OVFfV
// SIG // TQKGFc4jmny57fN3uXjuvdlPv+OUKlRr/cHzUkE435Tx
// SIG // ROJJX87Ac5ndCOSAhsqOXNvtGGZtCmtHAERD8QWV+iKh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDIwMVowIwYJKoZIhvcNAQkEMRYEFOpPT6a9B33Zpe2Q
// SIG // hK2OmiK/1YQUMA0GCSqGSIb3DQEBAQUABIGAvJfpcZxU
// SIG // nTYSFYtMHd0NUzADZfIxpZTd+eIiullHuTj5y5xv4Xbd
// SIG // ILzr5q379TIVKDhnvqk2nsdVp5TVKY0bwnKlboGgJVtM
// SIG // 3IYcndCSECsPnlQs5K9rkb7BufLtmvhbhcPRo6vgFsz+
// SIG // +i8eCbrDVHI8GQJVNLqmbCXBqASZ6cI=
// SIG // End signature block
