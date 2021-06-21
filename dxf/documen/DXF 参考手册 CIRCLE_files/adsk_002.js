var strLocalRootPath = null;
//Load Menu and Ribbon Data
function loadMenuData() 
{
    try 
    {
        //Find atleast one type of dynamic help tag.
        var dynHelps = document.all("divDynamicHelpMenu");
        if(dynHelps == null)
            dynHelps = document.all("divDynamicHelpDashboard");
        if(dynHelps == null)
            dynHelps = document.all("divDynamicHelpDashboardThenMenu");
        //For Backwards compatibility   
        if(dynHelps == null)
            dynHelps = document.all("divDynamicHelp");    
        //If no type of supported DynamicHelp tag exists - Nothing to do !
        if(dynHelps == null)
            return;
        
        //Workaround for loading ActiveX without warning dialog.
        var ocxObject = new ActiveXObject("ADDYNHELP.AdDynHelpCtrl.1");
        if (ocxObject == null)
            return;
        
        var strObj = "<object height=\"0\" width=\"0\" id=\"AdDynHelp\" CLASSID=\"clsid:C4B6CE2E-5743-4450-B798-5BE5CEC3BE9D\"></object>";
        
        //If single entry
        if (dynHelps.innerHTML != null)
            dynHelps.innerHTML = strObj + dynHelps.innerHTML;
        else  // Multiple DynHelp elements in the same page
            dynHelps(0).innerHTML = strObj + dynHelps(0).innerHTML;
        
        //invoke the mothod of ActiveX control
        var xml = (document.getElementById("AdDynHelp")).GetDynHelpXML("ACD/2011/CHS");
        if (xml == null || xml == "")
            return;
            
        //var strLocalRootPath = getcurpath();
        //var indexofLastSlash = xmlFile.lastIndexOf("\\");
        //if(indexofLastSlash != -1)
        //    strLocalRootPath = xmlFile.substr(0,indexofLastSlash);
        
        
        //define XMLDOMdocument object to analyse the xml file
        var objxml = new ActiveXObject("MSXML2.DOMDocument.3.0");
        objxml.async=false;
        objxml.loadXML(xml);
        objxml.setProperty("SelectionLanguage","XPath");
        
        // Update tags for all types of dynamic help entries on this page
        if (objxml.parseError.errorCode == 0)
        {
            DoDynamicHelpForMenu(objxml);
            DoDynamicHelpForDashboard(objxml);
            DoDynamicHelpForDashboardThenMenu(objxml);        
        }
    }
    catch(exception)
    {
        // check for "Automation server can't create object"
        if (exception.number & 0x7FFFFFFF == 0x000A01AD)
        {
                  
        }
    }
}

AddOnLoadFunction(loadMenuData);

// Gets the Full external path to this CHM File
function getcurpath () 
{
    var path = unescape(location.pathname);
    if( path.indexOf("@MSITStore:") == 0 ) 
    {
        path = path.substring(11,path.length);
    }
    if( path.indexOf("/") == 0 ) 
    {
        path = path.substring(1,path.length);
    }
    var i = path.lastIndexOf("::\\");
    if (i>0)
        path = path.substring(0,i);
    i = path.lastIndexOf("\\")
    if (i <= 0)
        i = path.lastIndexOf("/");
    path = path.substring(0,i+1);
    path = path.replace(/\//g,"\\");
    return path;
}

function DoDynamicHelpForMenu (objxml)
{
    var dynHelps = document.all("divDynamicHelpMenu");
    //For backwards compatibility
    if(dynHelps == null)
        dynHelps = document.all("divDynamicHelp");
    if(dynHelps == null)
        return;
    if(dynHelps.innerHTML != null)
        DoDynamicHelpForMenuItem(dynHelps,objxml);
    else
    {
        for (j=0; j<dynHelps.length; j++)
        {
            DoDynamicHelpForMenuItem(dynHelps(j),objxml);
        }
    }
}

function DoDynamicHelpForDashboard(objxml)
{
    var dynHelps = document.all("divDynamicHelpDashboard");
    if(dynHelps == null)
        return;
    if(dynHelps.innerHTML != null)
        DoDynamicHelpForDashboardItem(dynHelps,objxml, true);
    else
    {
        for (j=0; j<dynHelps.length; j++)
        {
            DoDynamicHelpForDashboardItem(dynHelps(j),objxml, true);
        }
    }
}

function DoDynamicHelpForDashboardThenMenu(objxml)
{
    var dynHelps = document.all("divDynamicHelpDashboardThenMenu");
    if(dynHelps != null);
    if(dynHelps.innerHTML != null)
    {
        if (DoDynamicHelpForDashboardItem(dynHelps,objxml, false)== false)
            DoDynamicHelpForMenuItem(dynHelps,objxml);
        
    }
    else
    {
        for (j=0; j<dynHelps.length; j++)
        {
            if (DoDynamicHelpForDashboardItem(dynHelps(j),objxml, false)== false)
                DoDynamicHelpForMenuItem(dynHelps(j),objxml);
        }
    }
}
            
function DoDynamicHelpForMenuItem(dynHelp, objxml)
{
    //According to menu's ID in HTML to determine which menu to load in HTML from xml file
    var value = objxml.selectSingleNode("//MenuItem[@ID='" + dynHelp.title.toUpperCase() + "']");
    var defaultContent=dynHelp.parentElement.all("DefaultContent");
    if(value!=null)
    {
        
        var re=/:/g;
        var result=(value.text).replace(re,"&nbsp;<span class=\"glyphArrow\"><img src=\".\\..\\images\\ac.menuaro.gif\"></span>");
     
        var reDialogEllipses=/\.\.\./g;
        //Within the Default Content Node - there are two types of data
        //  1. uis-unspecified tagged text that needs to be replaced
        //  2. plain text
        if(defaultContent.childNodes != null)
        {
            var children = defaultContent.childNodes;
            for(i=0;i<children.length; i++)
            {
                var thisNode = defaultContent.childNodes[i];
                if(thisNode.className=="uis-unspecified") 
                {
                    defaultContent.removeChild(thisNode);
                }
            }
            var dynText = value.text;
            var indexOfFirstColon = dynText.indexOf(":");
            if(indexOfFirstColon != -1)
            {
                var splitDynText1 = dynText.substr(0,indexOfFirstColon);
                var splitDynText2 = dynText.substr(indexOfFirstColon,dynText.length-1);
                result = splitDynText1 + defaultContent.innerText + splitDynText2;
                result = result.replace(re,"&nbsp;<span class=\"glyphArrow\"><img src=\".\\..\\images\\ac.menuaro.gif\"></span>");
                result = result.replace(reDialogEllipses,"");

            }
        }
        defaultContent.innerHTML = result;
        return true;
    }
    else 
    {
        var altContent = dynHelp.parentElement.all("AltContent");
        if( altContent != null &&
            altContent.innerHTML !=null &&
            altContent.innerHTML != "" && 
            altContent.innerHTML != " ")
        {
            var relatedContentElements = dynHelp.parentElement.all("RelatedContent");
            relatedContentElements[0].className="RelatedContentHidden";
            relatedContentElements[1].className="RelatedContentHidden";
            altContent.className="RelatedContent";
            defaultContent.className="RelatedContentHidden";
            return false;
        }
    }
    return false;
}


function DoDynamicHelpForDashboardItem(dynHelp, objxml, useAltContent)
{
    //According to menu's ID in HTML to determine which menu to load in HTML from xml file
    var value = objxml.selectSingleNode("//RibbonItem[@ID='" + dynHelp.title.toUpperCase() + "']");
    var defaultContent=dynHelp.parentElement.all("DefaultContent");
    if(value!=null)
    {
        var result;
        var re=/:/g;
        result=(value.text).replace(re,"&nbsp;<span class=\"glyphArrow\"><img src=\".\\..\\images\\ac.menuaro.gif\"></span>");
        
        var reDialogEllipses=/\.\.\./g;
        //Within the Default Content Node - there are two types of data
        //  1. uis-unspecified tagged text that needs to be replaced
        //  2. plain text
        if(defaultContent.childNodes != null)
        {
            var children = defaultContent.childNodes;
            for(i=0;i<children.length; i++)
            {
                var thisNode = defaultContent.childNodes[i];
                if(thisNode.className=="uis-unspecified") 
                {
                    defaultContent.removeChild(thisNode);
                }
            }
            var dynText = value.text;
            var indexOfFirstColon = dynText.indexOf(":");
            if(indexOfFirstColon != -1)
            {
                var splitDynText1 = dynText.substr(0,indexOfFirstColon);
                var splitDynText2 = dynText.substr(indexOfFirstColon,dynText.length-1);
                result = splitDynText1 + defaultContent.innerText + splitDynText2;
                result = result.replace(re,"&nbsp;<span class=\"glyphArrow\"><img src=\".\\..\\images\\ac.menuaro.gif\"></span>");
                result = result.replace(reDialogEllipses,"");
                result = result.replace(/expander/g,"<img src=\".\\..\\images\\ac.ribbonexpander.gif\">");
            }
        }
        defaultContent.innerHTML = result;
        return true;
    }
    else if(useAltContent)
    {
        var altContent = dynHelp.parentElement.all("AltContent");
        if( altContent != null &&
            altContent.innerHTML !=null &&
            altContent.innerHTML != "" && 
            altContent.innerHTML != " ")
        {
            var relatedContentElements = dynHelp.parentElement.all("RelatedContent");
            relatedContentElements[0].className="RelatedContentHidden";
            relatedContentElements[1].className="RelatedContentHidden";
            altContent.className="RelatedContent";
            defaultContent.className="RelatedContentHidden";
            return false;
        }
    }
    return false;
}

// SIG // Begin signature block
// SIG // MIIVNwYJKoZIhvcNAQcCoIIVKDCCFSQCAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEOUq
// SIG // 9glZpTdo/airhntjfNmgghEOMIIDejCCAmKgAwIBAgIQ
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
// SIG // MRIEEMzlSAMTJ6W9tvOQJhUFeVswPgYKKwYBBAGCNwIB
// SIG // DDEwMC6gEIAOAEcAZQBuAGUAcgBhAGyhGoAYaHR0cDov
// SIG // L3d3dy5hdXRvZGVzay5jb20gMA0GCSqGSIb3DQEBAQUA
// SIG // BIGAPoz544DKDEGLt1sXp/usYbYbyWV7LVQb4r6Lbe3u
// SIG // bSxMwTX8xxU3oQfKx231U9kEHxPdv1fEN6rGMt7HnSTl
// SIG // /mfTchZO0J3q+sKfJ8AJy8o/rhT1pgK/eporEFFrfD65
// SIG // 9+jNBlWErQPu5y2hJSkb2h+NyeG3Ddvh2fwJhn10GXCh
// SIG // ggF/MIIBewYJKoZIhvcNAQkGMYIBbDCCAWgCAQEwZzBT
// SIG // MQswCQYDVQQGEwJVUzEXMBUGA1UEChMOVmVyaVNpZ24s
// SIG // IEluYy4xKzApBgNVBAMTIlZlcmlTaWduIFRpbWUgU3Rh
// SIG // bXBpbmcgU2VydmljZXMgQ0ECEDgl1/r4Ya+e9JDnJrXW
// SIG // WtUwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTEwMDMyOTEw
// SIG // MDE1OVowIwYJKoZIhvcNAQkEMRYEFAHu/Qx2UfRlFO7T
// SIG // zz8sZvbW69lKMA0GCSqGSIb3DQEBAQUABIGAD5aFVNdt
// SIG // SwgnykS8e4bFHqMULVAdC23CPSO+rLJPXhiBirBOGuyg
// SIG // x3NCjHJ8IN51NtrHvr05+q2XvVRhVfXacnXoRXg5o0lI
// SIG // 4luj6HPEOHRync9y1/A9mwCia2Iowsbeq9dhz/2Z6Y59
// SIG // 7DohqsfTFHVt/Ltzy0HagYXgW8WY2qU=
// SIG // End signature block
