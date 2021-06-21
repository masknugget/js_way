// The constructor function: creates a Cookie object for the specified
// document, with a specified name and optional attributes.
// Arguments:
//   document: The Document object for which the cookie is stored. Required.
//   name:     A string that specifies a name for the cookie. Required.
//   hours:    An optional number that specifies the number of hours from now
//             after which the cookie should expire.
//   path:     An optional string that specifies the cookie path attribute.
//   domain:   An optional string that specifies the cookie domain attribute.
//   secure:   An optional boolean value that, if true, requests a secure cookie.
//

function CookieWorker(document, name, hours, path, domain, secure) {
    // All the predefined properties of this object begin with '$'
    // to distinguish them from other properties, which are the values to
    // be stored in the cookie
    this.$document = document;
    this.$name = name;
    if (hours) {
        this.$expiration = new Date((new Date()).getTime(  ) + hours*3600000);
    } else {
        this.$expiration = null;
    }
    if (path) {
        this.$path = path;
    } else {
        this.$path = null;
    }
    if (domain) {
        this.$domain = domain;
    } else {
        this.$domain = null;
    }
    if (secure) {
        this.$secure = true;
    } else {
        this.$secure = false;
    }}

// This function is the store(  ) method of the Cookie object
CookieWorker.prototype.store = function ( object ) {
    // First, loop through the properties of the Cookie object and
    // put together the value of the cookie. Since cookies use the
    // equals sign and semicolons as separators, we'll use colons
    // and ampersands for the individual state variables we store
    // within a single cookie value. Note that we escape the value
    // of each state variable, in case it contains punctuation or other
    // illegal characters.

    var cookieval = "";
    for(var prop in object) {
        // Ignore properties with names that begin with '$' and also methods
        if ((prop.charAt(0) == '$') || ((typeof object[prop]) == 'function')) {
            continue;
        }
        if (cookieval != "") {
            cookieval += '&';
        }
        cookieval += prop + ':' + escape(object[prop]);
    }

    // Now that we have the value of the cookie, put together the
    // complete cookie string, which includes the name and the various
    // attributes specified when the Cookie object was created
    var cookie = this.$name + '=' + cookieval;
    if (this.$expiration) {
        cookie += '; expires=' + this.$expiration.toGMTString(  );
    }
    if (this.$path) {
        cookie += '; path=' + this.$path;
    }
    if (this.$domain) {
        cookie += '; domain=' + this.$domain;
    }
    if (this.$secure) {
        cookie += '; secure';
    }

    // Now store the cookie by setting the magic Document.cookie property
    this.$document.cookie = cookie;
};


// This function is the load(  ) method of the Cookie object
CookieWorker.prototype.load = function( object ) {
    // First, get a list of all cookies that pertain to this document
    // We do this by reading the magic Document.cookie property
    var allcookies = this.$document.cookie;
    if (allcookies == "") return false;

    // Now extract just the named cookie from that list
    var start = allcookies.indexOf(this.$name + '=');
    if (start == -1) return false;   // Cookie not defined for this page
    start += this.$name.length + 1;  // Skip name and equals sign
    var end = allcookies.indexOf(';', start);
    if (end == -1) end = allcookies.length;
    var cookieval = allcookies.substring(start, end);    
    // Now that we've extracted the value of the named cookie, we
    // must break that value down into individual state variable
    // names and values. The name/value pairs are separated from each
    // other by ampersands, and the individual names and values are
    // separated from each other by colons. We use the split(  ) method
    // to parse everything.

    var a = cookieval.split('&');    // Break it into an array of name/value pairs
    for(var i1=0; i1 < a.length; i1++)  // Break each pair into an array
        a[i1] = a[i1].split(':');

    // Now that we've parsed the cookie value, set all the names and values
    // of the state variables in this Cookie object. Note that we unescape(  )
    // the property value, because we called escape(  ) when we stored it.
    for(var i2 = 0; i2 < a.length; i2++) {
        object[a[i2][0]] = unescape(a[i2][1]);
    }
    // We're done, so return the success code
    return true;
};

// This function is the remove(  ) method of the Cookie object
CookieWorker.prototype.remove = function(  ) {
    var cookie;
    cookie = this.$name + '=';
    if (this.$path) cookie += '; path=' + this.$path;
    if (this.$domain) cookie += '; domain=' + this.$domain;
    cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';

    this.$document.cookie = cookie;
};







// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEO3G
// SIG // iUHofKjOVRdy+Zl0pC+gghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEDwhgF5DVtm7yRj8hcGjpwMwPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAcJ3vRLl4z0XceJPDzYnFkyPvKZGD5H5BNO7ZhyDh
// SIG // qUwSqVmPLoGdDSK44x/eabYcPK8CB3ll/g+TNcOCO2LY
// SIG // wvb/EqWUvQeGkFj4g9MKgptpjc0wICBOz6yzSZuaJhdQ
// SIG // eV+DaTF4+aqlSxmgr5BnofV2/+jN89SRHJFFguAZx7+h
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDIxMVowIwYJKoZIhvcNAQkEMRYEFNTczoY6VJEBv6o3
// SIG // k67VYD1P59PdMA0GCSqGSIb3DQEBAQUABIGALB34GB4a
// SIG // cPqd7iiJAtE6SoJgIyEAf8D4rjZ19yIwwoCqTvNoOybz
// SIG // vgrgp6raqIrV3bHwGHPmCYtXhAKhptK5GvUFCP5UIUxK
// SIG // A0wrP2nmrZph79LbmGhiSuIhwFmYOvUst+rPkmuyOmBh
// SIG // GLxkHaSqJc6gTe0y34L+nMuciifAtv8=
// SIG // End signature block
