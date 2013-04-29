(function(scope) {
    var CODES_RES_URL_PREFIX = "http://127.0.0.1:86";
    var TINYMCE_BASE = "/libs/js/tinymce4";
    var SYNTAXHIGHLIGHTER_BASE = "/libs/js/syntaxhighlighter2";
    var SYNTAXHIGHLIGHTER_CSS_BASE = "/libs/css/syntaxhighlighter2";
    var TINYMCE_URL = _T("tinymce.min.js");
    var TINYMCE_PREVIEW_PLUGIN_URL = _T("plugins/preview/plugin.js");
    var TINYMCE_OPT = {
        selector: "textarea",
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste syntaxhl"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "print media | forecolor backcolor emoticons | link image | syntaxhl preview",
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ],
        syntaxhl_tag : 'pre',
        plugin_preview_width: "800",
        content_css: [_Scss("shCore.css"), _Scss("shThemeDefault.css")],
        content_js: [_S("shCore.js"), _S("shBrushAS3.js"), _S("shBrushBash.js"), _S("shBrushColdFusion.js"),
            _S("shBrushCpp.js"), _S("shBrushCSharp.js"), _S("shBrushCss.js"),
            _S("shBrushDelphi.js"), _S("shBrushDiff.js"), _S("shBrushErlang.js"),
            _S("shBrushGroovy.js"), _S("shBrushJava.js"), _S("shBrushJavaFX.js"),
            _S("shBrushJScript.js"), _S("shBrushPerl.js"), _S("shBrushPhp.js"),
            _S("shBrushPlain.js"), _S("shBrushPowerShell.js"), _S("shBrushPython.js"),
            _S("shBrushRuby.js"), _S("shBrushScala.js"), _S("shBrushSql.js"),
            _S("shBrushVb.js"), _S("shBrushXml.js"),
            _S("shLegacy.js")],
        clipboardSwf: "http://127.0.0.1:86/libs/js/syntaxhighlighter2/clipboard.swf"
    };
    function _T(str) {
        return CODES_RES_URL_PREFIX + TINYMCE_BASE + "/" + str;
    }

    function _S(str) {
        return CODES_RES_URL_PREFIX + SYNTAXHIGHLIGHTER_BASE + "/" + str;
    }
    function _Scss(str) {
        return CODES_RES_URL_PREFIX + SYNTAXHIGHLIGHTER_CSS_BASE + "/" + str;
    }

    function loadTinymceDynamically() {
        if (typeof(tinymce) == "undefined") {
            log("loading tinymce...");
            function removeScript(event){
//                event.target.parentNode.removeChild(event.target);
            }
            function initTinymce(){
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.textContent = "(" + function(opt){
                    if (!tinymce.dom.Event.domLoaded) {
                        tinymce.dom.Event.domLoaded = true;
                    }
                    tinymce.init(opt);
                } + ")(" + JSON.stringify(TINYMCE_OPT) + ");";
                script.onload = removeScript;
                (document.head || document.documentElement).appendChild(script);
            }
            function loadTinymceCore(callback) {
                var tinymceScript = document.createElement('script');
                tinymceScript.type = "text/javascript";
                tinymceScript.src = TINYMCE_URL;
                tinymceScript.onload = callback;
                (document.head || document.documentElement).appendChild(tinymceScript);
            }
            function loadTinymcePreview(callback) {
                var tinymcePreviewScript = document.createElement('script');
                tinymcePreviewScript.type = "text/javascript";
                tinymcePreviewScript.src = TINYMCE_PREVIEW_PLUGIN_URL;
                tinymcePreviewScript.onload = callback;
                (document.head || document.documentElement).appendChild(tinymcePreviewScript);
            }
            loadTinymceCore(function(event){
                removeScript(event);
                loadTinymcePreview(function(event){
                    removeScript(event);
                    initTinymce();
                });
            });
        }
    }

    $.extend(scope, {
        loadTinymceDynamically: loadTinymceDynamically
    });
})(this);
