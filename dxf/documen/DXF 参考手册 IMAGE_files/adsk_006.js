if (top.HlpSys === undefined) {
    top.HlpSys = new Object();
}

top.HlpSys.favorites = function() {
    var cookieWorker = new CookieWorker(top.document, "autodesk_online_help_favorites", 24000);
    var favoritesData = {
        urlString : "",
        titleString : ""
    };

    var favoritesList = new Array();
    var selectedFavoriteItem = 0;



    return {
        selectFavoriteItem: function(number) {
            selectedFavoriteItem = number;
        },

        removeSeceltedFavoriteItem: function() {

            if (selectedFavoriteItem < favoritesList.length) {
                favoritesList.splice(selectedFavoriteItem, 1);
                this.synchronizeFavoriteData();
            }
        },

        initalFavoritesLoad: function () {
            cookieWorker.load(favoritesData);
        },

        addToFavorites: function(doc)
        {
            var url = doc.URL;
            if (url.indexOf("?") != -1) {
                url = url.substring(0, url.indexOf("?"));
            }
            var title = doc.title;
            cookieWorker.load(favoritesData);
            if (favoritesData.urlString.indexOf(url) == -1) {
                if (favoritesData.urlString) favoritesData.urlString += ";" + url;
                else favoritesData.urlString = url;
                if (favoritesData.titleString) favoritesData.titleString += ";" + title;
                else favoritesData.titleString = title;
                cookieWorker.store(favoritesData);
                this.refreshFavoritesList();
            }
            this.refreshFavoritesPanel();
        },

        refreshFavoritesPanel: function() {
            if (navigator.appName == "Netscape")
            {
                top.left_tab.document.getElementById('iframeFavoritesFrame').contentDocument.location.reload();
            }
            else if (navigator.appName == "Microsoft Internet Explorer")
            {
                top.left_tab.document.frames("iframeFavoritesFrame").document.location.reload();
            }
            else alert("Unsupported browser !");


        },

        refreshFavoritesList: function()
        {
            cookieWorker.load(favoritesData);
            var urls = favoritesData.urlString.split(";");
            var titles = favoritesData.titleString.split(";");
            for (i = 0; i < urls.length; i++) {
                favoritesList[i] = new Array();
                favoritesList[i][0] = urls[i];
                favoritesList[i][1] = titles[i];
            }
        },

        synchronizeFavoriteData: function()
        {
            var url = "";
            var titles = "";
            for (i = 0; i < favoritesList.length; i++) {
                url += favoritesList[i][0];
                titles += favoritesList[i][1];
                if (i != (favoritesList.length - 1)) {
                    url += ";";
                    titles += ";";
                }
            }
            favoritesData.urlString = url;
            favoritesData.titleString = titles;
            cookieWorker.store(favoritesData);
            this.refreshFavoritesPanel();
        },

        loadFromFavorites: function()
        {
            if (navigator.appName == "Netscape")
            {
                document.getElementById('favoritesList').contentDocument.open();
                document.getElementById('favoritesList').contentDocument.write('<html><head><link rel="stylesheet" type="text/css" href="style/adsk.panels.css"><link rel="stylesheet" type="text/css" href="style/adsk.panels.custom.css"></head><body>');
                for (i = 0; i < favoritesList.length; i++) {
                    document.getElementById('favoritesList').contentDocument.write('<div ><a class="favoritesLink" target="content" onclick="top.HlpSys.favorites.selectFavoriteItem(' + i + ');" href="' + favoritesList[i][0] + '">' + favoritesList[i][1] + '</a></div>');
                }
                document.getElementById("favoritesList").contentDocument.write('</body></html>');
                document.getElementById('favoritesList').contentDocument.close();
            }
            else if (navigator.appName == "Microsoft Internet Explorer")
            {
                document.frames("favoritesList").document.open();
                document.frames("favoritesList").document.write('<html><head><link rel="stylesheet" type="text/css" href="style/adsk.panels.css"><link rel="stylesheet" type="text/css" href="style/adsk.panels.custom.css"></head><body>');
                for (i = 0; i < favoritesList.length; i++) {
                    var url = favoritesList[i][0];
                    url = unescape(url)
                    if (url.match(/^[\\\/][A-Z]:/g)) {
                        url = url.slice(1);
                    }
                    document.frames("favoritesList").document.write('<div><a class="favoritesLink" target="content"  onclick="top.HlpSys.favorites.selectFavoriteItem(' + i + ');" href="' + url + '">' + favoritesList[i][1] + '</a></div>');
                }
                document.frames("favoritesList").document.write('</body></html>');
                document.frames("favoritesList").document.close();
            }
            else alert("Unsupported browser !");
        }


    };
}();








// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEMzA
// SIG // r7j/TaZkZSwXLilAh5CgghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEKMUQ8WeV/SeQviyBgqu1MwwPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAq4zmekC1U8yzqd3QMhgPzgHEpwu+V4+ym7v1jlCF
// SIG // PkB/MugDiVksl+E62eVlBAShCothh6rZA/xyR4OeKEPY
// SIG // jMrBB1YuW3xD3K7nC15GbhkT35ku7fLFtjuPjA/yP+9G
// SIG // FssNKwQrkdwpi3bmshGzjiJ0M/V+8WobO8yEkeHdezqh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDIwMFowIwYJKoZIhvcNAQkEMRYEFCD/u0npH5nQNJ4g
// SIG // LDPbnuyu7EHCMA0GCSqGSIb3DQEBAQUABIGAkF4Lnyvi
// SIG // Rvh+uUHfsHjs039Vr+JTfwupuh/8ZPfwOMHMenllYQqw
// SIG // 7xpbUyMPt/CvyOtyQersaG7jnT5jADbJCFPZ/tB8q5YR
// SIG // j5b11JwUxOWftmLiMitBV0daEM+2ilpkZmEllCaCp5XZ
// SIG // NXEz1zcdmYZegIg6rqsjOJpPkyrWtpA=
// SIG // End signature block
