(function(scope) {
    var CODES_RES_URL_PREFIX = "http://codesbase.github.com";
    var TINYMCE_BASE = "/libs/js/tinymce4";
    var SYNTAXHIGHLIGHTER_BASE = "/libs/js/syntaxhighlighter2";
    var SYNTAXHIGHLIGHTER_CSS_BASE = "/libs/css/syntaxhighlighter2";
    var TINYMCE_OPT = {
        selector: "textarea",
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste syntaxhl previewsyntaxhl"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "print media | forecolor backcolor emoticons | link image | syntaxhl previewsyntaxhl",
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
        clipboardSwf: _S("clipboard.swf")
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

    function loadJS(url) {
        var defer = $.Deferred();
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = url;
        script.onload = function(event) {
            defer.resolve(script);
        };
        (document.head || document.documentElement).appendChild(script);
        return defer.promise();
    }

    function loadJSContent(content) {
        var defer = $.Deferred();
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.textContent = content;
        script.onload = function(event) {
            defer.resolve(script);
        };
        (document.head || document.documentElement).appendChild(script);
        return defer.promise();
    }

    function loadCSS(url) {
        var defer = $.Deferred();
        var script = document.createElement('link');
        script.setAttribute("rel", "stylesheet");
        script.setAttribute("type", "text/css");
        script.setAttribute("href", url);
        script.onload = function(event) {
            defer.resolve(script);
        };
        (document.head || document.documentElement).appendChild(script);
        return defer.promise();
    }

    function removeScript(script){
        // script.parentNode.removeChild(script);
    }

    function loadTinymceDynamically() {
        if (typeof(tinymce) == "undefined") {
            log("loading tinymce...");
            var deferList = [];
            deferList.push(loadJS(_T("tinymce.min.js")));
            $.when.apply(this, deferList).done(function(){
                var results = Array.prototype.slice.call(arguments, 0, arguments.length);
                $.each(results, function(){
                    removeScript(this);
                });
                loadJSContent("(" + function(opt){
                    if (!tinymce.dom.Event.domLoaded) {
                        tinymce.dom.Event.domLoaded = true;
                    }
                    tinymce.init(opt);
                    log("loading tinymce done.");
                } + ")(" + JSON.stringify(TINYMCE_OPT) + ");").done(function(script){
                        removeScript(script);
                    });
            });
        }
    }

    function loadSyntaxHighlighterDynamically(brushList) {
        if (typeof(SyntaxHighlighter) == "undefined") {
            log("loading SyntaxHighlighter...");
            var deferList = [];
            deferList.push(loadJS(_S("shCore.js")));
            for (var i = 0; i < brushList.length; i++) {
                deferList.push(loadJS(_S(brushList[i])));
            }
            deferList.push(loadCSS(_Scss("shCore.css")));
            deferList.push(loadCSS(_Scss("shThemeDefault.css")));
            $.when.apply(this, deferList).done(function(){
                var results = Array.prototype.slice.call(arguments, 0, arguments.length);
                $.each(results, function(){
                    removeScript(this);
                });
                loadJSContent("(" + function(swfUrl){
                    var origAbout = SyntaxHighlighter.config.strings.aboutDialog;
                    SyntaxHighlighter.config.clipboardSwf = swfUrl;
                    SyntaxHighlighter.config.strings = {
                        expandSource : '展开代码',
                        viewSource : '查看代码',
                        copyToClipboard : '复制代码',
                        copyToClipboardConfirmation : '代码复制成功',
                        print : '打印',
                        help: '?',
                        noBrush: '不能找到刷子: ',
                        brushNotHtmlScript: '刷子没有配置html-script选项',
                        alert : "",
                        aboutDialog: origAbout
                    };
                    SyntaxHighlighter.highlight();
                    log("loading SyntaxHighlighter done.");
                } + ")('" + _S("clipboard.swf") + "');").done(function(script){
                        removeScript(script);
                    });
            });
        }
    }

    $.extend(scope, {
        loadTinymceDynamically: loadTinymceDynamically,
        loadSyntaxHighlighterDynamically: loadSyntaxHighlighterDynamically
    });

})(this);
