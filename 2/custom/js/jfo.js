/**
 * Ctrl+Q quick document
 * Ctrl+O(F12) quick outline
 *
 */
var DEBUG = true;
var console = console || { log: function() {} };
var log = function() {
    if (DEBUG)
        console.log.apply(console, arguments);
};
var errorHandler = function() {
    log.apply(this, arguments);
};
/*
function fn_extends(curr, base) {
    function dummy() {}
    dummy.prototype = base.prototype;
    curr.prototype = new dummy();
    curr.prototype.constructor = curr;
    return curr;
}
function fn_extends(curr__, base__, fnName) {
    // note: 'curr__.name == curr__' is not allowed!
    var name = fnName ? fnName : curr__.name;
    var s="(function(){function "+name+"(){}"+name+".prototype=base__.prototype;curr__.prototype=new "+name+"();curr__.prototype.constructor = curr__;return curr__;})()";
    return eval(s);
}
 */
function fn_extends(name, base) {
    name || (name = "");
    var s="(function(){var dummy=function "+name+"(){},curr=dummy;dummy.prototype=base.prototype;curr.prototype=new dummy();curr.prototype.constructor=curr;return curr;})()";
    return eval(s);
}
function fn_extends_with_init(name, base) {
    name || (name = "");
    var s="(function(){var dummy=function "+name+"(){},curr=function "+name+"(){this.init.apply(this,arguments);};dummy.prototype=base.prototype;curr.prototype=new dummy();curr.prototype.constructor=curr;return curr;})()";
    return eval(s);
}

Date.prototype.format = function (format, isUTC) {
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    var thiz = this;
    thiz.getFullYear = isUTC ? thiz.getUTCFullYear : thiz.getFullYear;
    thiz.getMonth = isUTC ? thiz.getUTCMonth : thiz.getMonth;
    thiz.getDate = isUTC ? thiz.getUTCDate : thiz.getDate;
    thiz.getHours = isUTC ? thiz.getUTCHours : thiz.getHours;
    thiz.getMinutes = isUTC ? thiz.getUTCMinutes : thiz.getMinutes;
    thiz.getSeconds = isUTC ? thiz.getUTCSeconds : thiz.getSeconds;
    thiz.getMilliseconds = isUTC ? thiz.getUTCMilliseconds : thiz.getMilliseconds;
    var o = {
        "M+": thiz.getMonth() + 1, //month
        "d+": thiz.getDate(),    //day
        "h+": thiz.getHours(),   //hour
        "m+": thiz.getMinutes(), //minute
        "s+": thiz.getSeconds(), //second
        "q+": Math.floor((thiz.getMonth() + 3) / 3),  //quarter
        "S": thiz.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (thiz.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

(function(scope) {
    var ApplicationID = "eiv32sFkByLILfAUSLW5H1d7rAlK4WvCaU8to5uI";
    var JavascriptKey = "7D4goPL0RxMJft4XQdF9VGBJ1K1yYUx5xWTkHFgt";
    Parse.initialize(ApplicationID, JavascriptKey);

    var CODES_RES_URL_PREFIX = "http://127.0.0.1:86";
    var TINYMCE_URL = CODES_RES_URL_PREFIX + "/libs/js/tinymce4/tinymce.min.js";
    var TINYMCE_PREVIEW_PLUGIN_URL = CODES_RES_URL_PREFIX + "/libs/js/tinymce4/plugins/preview/plugin.js";
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
        content_css: ["http://127.0.0.1:86/libs/css/syntaxhighlighter2/shCore.css",
            "http://127.0.0.1:86/libs/css/syntaxhighlighter2/shThemeDefault.css"],
        content_js: ["http://127.0.0.1:86/libs/js/syntaxhighlighter2/shCore.js",
            "http://127.0.0.1:86/libs/js/syntaxhighlighter2/shBrushJava.js",
            "http://127.0.0.1:86/libs/js/syntaxhighlighter2/shBrushJScript.js"],
        clipboardSwf: "http://127.0.0.1:86/libs/js/syntaxhighlighter2/clipboard.swf"
    };

    // todo... POSTS_PER_PAGE = 10
    var POSTS_PER_PAGE = 10;
    var PAGES_COUNT = 8;
    var COUNT_RECENT_POSTS = 15;
    var COUNT_RECENT_COMMENTS = 15;
    var MONTHS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    var Posts = Parse.Object.extend('Posts', {
        // Instance properties
    }, {
        // Class properties
        create: function() {
            var post = new Posts();
            post.set("ID", 0);
            post.set("comment_count", 0);
            post.set("comment_status", "open");
            post.set("guid", "");
            post.set("menu_order", 0);
            post.set("ping_status", "open");
            post.set("pinged", "");
            post.set("post_content", "");
            post.set("post_content_filtered", "");
            post.set("post_excerpt", "");
            post.set("post_mime_type", "");
            var currDate = new Date();
            var sdate = currDate.format("yyyy-MM-dd hh:mm:ss");
            var sdateUTC = currDate.format("yyyy-MM-dd hh:mm:ss", true);
            post.set("post_modified", sdate);
            post.set("post_modified_gmt", sdateUTC);
            post.set("post_name", "");
            post.set("post_parent", 0);
            post.set("post_password", "");
            post.set("post_status", "publish");
            post.set("post_title", "");
            post.set("post_type", "post");
            post.set("post_views", 0);
            post.set("to_ping", "");
            var currUser = Parse.User.current();
            if (currUser) {
                post.set("post_author", currUser);
                var postACL = new Parse.ACL(currUser);
                postACL.setPublicReadAccess(true);
                post.setACL(postACL);
            }
            return post;
        }
    });
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships', {}, {
        create: function() {
            var relationship = new TermRelationships();
            relationship.set("object_id", 0);
            relationship.set("term_order", 0);
            return relationship;
        }
    });
    var Comments = Parse.Object.extend('Comments');

    var mPage = 1, mTotalPages = 1;
    var mFuncGetQuery;
    var TYPE_QUERY_PAGE = 1, TYPE_QUERY_COUNT = 2;
    var API = new API_parse();
    var Cache = {};


    function wrapParseDeferred(func, obj) {
        var defer = $.Deferred();
        var args = [];
        for (var i = 2; i < arguments.length; i++)
            args.push(arguments[i]);
        args.push({
            success: function() {
                defer.resolve.apply(defer, arguments);
            },
            error: function() {
                defer.reject.apply(defer, arguments);
            },
            progress: function() {
                defer.notify.apply(defer, arguments);
            }
        });
        func.apply(obj, args);
        return defer.promise();
    }

    function initLogin() {
        var currUser = Parse.User.current();
        if (currUser) {
            $("#logout").show();
            $("#login").hide();
        } else {
            $("#logout").hide();
            $("#login").show();
        }
        initAdmin();
    }

    function initAdmin() {
        var currUser = Parse.User.current();
        if (currUser) {
            $("#sidebar_admin").show();
            ko.applyBindings({
                title: "Admin",
                list: [{text:"发布文章", link:""}]
            }, $("#sidebar_admin").get(0));
        } else {
            $("#sidebar_admin").hide();
        }
    }

    function checkLogin() {
        var currUser = Parse.User.current();
        if (!currUser) {
            $(".notifications").notify({message: "操作前请先登录", type: "error"}).show();
            return "";
        }
        return currUser.get("username");
    }

    function wrapAPI(prototype, ext) {
        var f = {};
        for (var p in ext) {
            if (typeof(ext[p]) == "function" && p.indexOf("do") == 0) {
                var fname = p[2].toLowerCase() + p.slice(3);
                f[fname] = (function(fname, func){
                    return function(){
                        var args = Array.prototype.slice.call(arguments, 0, arguments.length);
                        args.unshift(fname);
                        log.apply(this, args);
                        return func.apply(this, arguments);
                    }
                })(fname, ext[p]);
            }
        }
        function API() {}
        API.prototype = $.extend(prototype, ext, f);
        return new API();
    }

    function API_parse() {
        function toPostParseObj(postModel) {
            var obj = postModel.getTag() || Posts.create();
            obj.set("post_title", postModel.post_title);
            obj.set("post_content", postModel.post_content);
            obj.set("post_status", postModel.post_status);  // publish or private
            obj.set("post_type", postModel.post_type);  // post or draft
            obj.set("post_name", postModel.post_name);
            obj.set("post_excerpt", postModel.post_excerpt);
            if (!postModel.id) {
                obj.set("ID", new Date().getTime());
                obj.set("post_date", obj.get("post_modified"));
                obj.set("post_date_gmt", obj.get("post_modified_gmt"));
            }
            if (postModel.post_status == "private") {
                var postACL = new Parse.ACL(Parse.User.current());
                postACL.setPublicReadAccess(false);
                obj.setACL(postACL);
            }
            return obj;
        }

        return wrapAPI(API_parse.prototype, {
            doLogin: function(name, passwd) {
                return wrapParseDeferred(Parse.User.logIn, this, name, passwd);
            },
            doLogout: function() {
                Parse.User.logOut();
            },
            doSavePost: function(post) {
                var postForParse = toPostParseObj(post);
                return wrapParseDeferred(postForParse.save, postForParse, null);
            },
            doSaveRelationship: function(relationship) {
                return wrapParseDeferred(relationship.save, relationship, null);
            },
            doSaveTerm: function(term) {
                return wrapParseDeferred(term.save, term, null);
            },
            doDeletePost: function(id) {
                var post = new Posts();
                post.id = id;
                return wrapParseDeferred(post.destroy, post);
            }
        });
    }

    function queryAll(query, show_log) {
        var i = 0;
        var list = [];
        function r(cb) {
            query.skip(i);
            query.limit(20);
            wrapParseDeferred(query.find, query).done(function(results){
                if (results.length == 0) {
                    if (cb.success) {
                        cb.success.call(this, list);
                    }
                    return;
                }
                if (cb.progress)
                    cb.progress.call(this, results);
                $.each(results, function(){
                    if (show_log)
                        log($.toJSON(this));
                    list.push(this);
                });
                i += results.length;
                r(cb);
            }).fail(function(){
                if (cb.error) {
                    var args = Array.prototype.slice.call(arguments, 0, arguments.length);
                    args.unshift(list);
                    cb.error.apply(this, args);
                }
            });
        }
        return wrapParseDeferred(r, this);
    }

    function totalPosts() {
        var query = mFuncGetQuery(TYPE_QUERY_COUNT);
        return wrapParseDeferred(query.count, query);
    }

    // page starts from 1...
    function getPage(page) {
        function r(page, cb) {
            page = page - 1 < 0 ? 0 : page - 1;
            var query = mFuncGetQuery(TYPE_QUERY_PAGE);
            query.include("post_author");
            query.descending("post_date");
            query.skip(page * POSTS_PER_PAGE);
            query.limit(POSTS_PER_PAGE);
            wrapParseDeferred(query.find, query).done(function(posts){
                var query = new Parse.Query(TermRelationships);
                query.include('term');
                query.containedIn('post', posts);
                wrapParseDeferred(query.find, query).done(function(relation_list){
                    var map = {};
                    $.each(relation_list, function(relation){
                        relation = this;
                        var post = relation.get('post');
                        var term = relation.get('term');
                        if (!map[post.id])
                            map[post.id] = new CategoryListModel();
                        map[post.id].push(new CategoryModel({
                            name: term.get('name'),
                            term_id: term.get('term_id'),
                            term: term
                        }));
                    });
                    $.each(posts, function(post){
                        post = this;
                        post.postCategoryListModel = map[post.id];
                    });
                    if (cb.success) {
                        cb.success.call(this, posts);
                    }
                }).fail(cb.error);
            });
        }
        return wrapParseDeferred(r, this, page);
    }

    function toPageBindData(list) {
        var arr = [];
        $.each(list, function(){
            arr.push(toPostBindData(this));
        });
        return arr;
    }
    function toPostBindData(postObjFromParse) {
        var obj = postObjFromParse;
        var post = new PostModel();
        post.setTag(obj);
        var dateStr = obj.get('post_date');
        dateStr = dateStr.replace(new RegExp("-","gm"), "/");
        var date = new Date(dateStr);
        post.id = obj.id;
        post.ID = obj.get("ID");
        post.post_year = date.getFullYear();
        post.post_month = MONTHS[date.getMonth()];
        post.post_day = date.getDate();
        post.post_title = obj.get('post_title');
        post.post_author = obj.get('post_author').get('username');
        post.comment_count = obj.get('comment_count');
        post.post_content = obj.get('post_excerpt');
        post.post_link = "#post/" + post.id;
        post.post_status = obj.get('post_status');

        post.postCategoryListModel = obj.postCategoryListModel;
        // todo...
        post.post_category_link = 'post_category_link';
        post.comment_link = 'comment_link';
        //this.get('comment_link');
        post.post_views = obj.get('post_views');;
        post.showReadMore = true;
        post.username = Parse.User.current() ? Parse.User.current().get("username") : "";
        log(post, obj);
        return post;
    }

    function genPageArray(page, total) {
        var left = 1, right = total;
        if (total > PAGES_COUNT) {
            var middleLow = parseInt(PAGES_COUNT / 2);
            var middleHigh = total - middleLow;
            middleLow = PAGES_COUNT - middleLow;
            if (page < middleLow) {
                left = 1, right = left + PAGES_COUNT - 1;
            } else if (page > middleHigh) {
                right = total, left = right - PAGES_COUNT + 1;
            } else {
                right = page + parseInt(PAGES_COUNT / 2);
                left = right - PAGES_COUNT + 1;
            }
        }
        var arr = [];
        while (left <= right) {
            arr.push(left++);
        }
        return arr;
    }

    function initPagination(funcGetQuery) {
        mFuncGetQuery = funcGetQuery ? funcGetQuery : (function(){
            return new Parse.Query(Posts);
        });
        totalPosts().done(function(r){
            log("total posts:", r);
            mTotalPages = parseInt((r + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE);
            showPage(1);
        });
    }

    function showPagination() {
        var arr = genPageArray(mPage, mTotalPages);
        log(mPage, mTotalPages, arr);
        ko.applyBindings({
            'page' : mPage,
            'total' : mTotalPages,
            'page_array' : arr
        }, $("#pagination").get(0));
    }

    function showPage(page) {
        if (page < 1 || page > mTotalPages)
            return;
        log("show page:", page);
        getPage(page).done(function(r) {
            var data = toPageBindData(r);
            ko.applyBindings(data, $("#posts").get(0));
            $('#post_full').hide(), $('#page').show(), $('#post_editor').hide();
            mPage = page;
            scroll(0,0);
            showPagination();
        });
    }

    function showNextPage() {
        showPage(mPage + 1);
    }

    function showPrevPage() {
        showPage(mPage - 1);
    }

    function showPost(id) {
        log("showPost:" + id);
        if (!id) return;
        var query = new Parse.Query(Posts);
        wrapParseDeferred(query.get, query, id).done(function(result){
            var data = toPostBindData(result);
            data.post_content = result.get('post_content');
            data.showReadMore = false;
            ko.applyBindings(data, $("#article").get(0));
            $('#page').hide(), $('#post_full').show(), $('#post_editor').hide();
            scroll(0,0);
        });
    }

    function initArchivePagination(date) {
        initPagination(function(){
            var query = new Parse.Query('Posts');
            query.startsWith('post_date', date);
            return query;
        });
    }

    function initCategoryPagination(id) {
        initPagination(function(type){
            var query = new Parse.Query(TermRelationships);
            query.equalTo('term_id', id);
            if (type == TYPE_QUERY_COUNT) {
                return query;
            } else if (type == TYPE_QUERY_PAGE) {
                var outerQuery = new Parse.Query(Posts);
                outerQuery.matchesKeyInQuery("ID", "object_id", query);
                return outerQuery;
                // todo...
                // curl -k -X GET   -H "X-Parse-Application-Id: eiv32sFkByLILfAUSLW5H1d7rAlK4WvCaU8to5uI"   -H "X-Parse-REST-API-Key: AA9utK1pJgSzkjuhuOznyRscqaCXAWF3g7tIRhSJ"   -G   --data-urlencode 'where={"ID":{"$select":{"query":{"className":"TermRelationships","where":{"term_taxonomy_id":17}},"key":"object_id"}}}' --data-urlencode 'limit=1'  https://api.parse.com/1/classes/Posts
            }
        });
    }

    function getRecentPosts() {
        var query = new Parse.Query(Posts);
        query.descending("post_date");
        query.limit(COUNT_RECENT_POSTS);
        return wrapParseDeferred(query.find, query);
    }

    function getCategories() {
        var query = new Parse.Query(Terms);
        query.ascending("name");
        return wrapParseDeferred(query.find, query).done(function(terms){
            log("cache terms...");
            Cache.terms = terms;
        });
    }

    function getArchive(){
        return wrapParseDeferred(Parse.Cloud.run, this, 'getArchiveDateList', {});
    }

    function getRecentComments() {
        var query = new Parse.Query(Comments);
        query.include('post');
        query.descending("comment_date");
        query.limit(COUNT_RECENT_COMMENTS);
        return wrapParseDeferred(query.find, query);
    }

    function initSidebar() {
        getRecentPosts().done(function(recent_posts){
            var posts = [];
            for (var i = 0; i < recent_posts.length; i++) {
                var post = recent_posts[i];
                posts.push({
                    text : post.get('post_title'),
                    link : '#post/' + post.id
                });
            }
            ko.applyBindings({
                title: "Recent Posts",
                list: posts
            }, $("#sidebar_posts").get(0));
        });
        getCategories().done(function(categories){
            var cat_list = [];
            for (var i = 0; i < categories.length; i++) {
                var cat = categories[i];
                cat_list.push({
                    text : cat.get('name'),
                    count : cat.get('count'),
                    link : '#tag/' + cat.get('term_id')
                });
            }
            ko.applyBindings({
                title: "Categories",
                list: cat_list
            }, $("#sidebar_categories").get(0));
        });
        getArchive().done(function(archives){
            var archive_list = [];
            for (var i = 0; i < archives.length; i++) {
                var ar = archives[i];
                archive_list.push({
                    text : ar.text,
                    link : '#archive/' + ar.text,
                    count : ar.count
                });
            }
            ko.applyBindings({
                title: "Archive",
                list: archive_list
            }, $("#sidebar_archives").get(0));
        });
        getRecentComments().done(function(recent_comments){
            var comment_list = [];
            for (var i = 0; i < recent_comments.length; i++) {
                var comment = recent_comments[i];
                var post = comment.get('post');
                var id = post ? post.id : 0;
                comment_list.push({
                    comment_author: comment.get('comment_author'),
                    comment_author_url: comment.get('comment_author_url'),
                    comment_content: comment.get('comment_content'),
                    post_id: id
                });
            }
            ko.applyBindings({
                title: "Recent Comments",
                list: comment_list
            }, $("#sidebar_comments").get(0));
        });
    }

    var loginController = {
        login: function() {
            $().showDialog({
                header: 'Login',
                body: '<div>用户名：<input id="dlgLoginName" type="text"></div>' +
                    '<div>密　码：<input id="dlgLoginPasswd" type="password"></div>'
            }).confirm(function($dlg){
                    var name = $("#dlgLoginName", $dlg).val();
                    var passwd = $("#dlgLoginPasswd", $dlg).val();
                    API.login(name, passwd).done(function(user){
                        $dlg.modal("hide");
                        $(".notifications").notify({message: user.get("username") + "登陆成功", type: 'success'}).show();
                        initLogin();
                        window.location.reload();
                    }).fail(function(user, err){
                            $dlg.modal("hide");
                            $(".notifications").notify({message: "登陆失败:" + err.code + ":" + err.message, type: 'error'}).show();
                        });
                });
        },
        logout: function() {
            API.logout();
            $(".notifications").notify({message: "退出登录成功", type: 'success'}).show();
            initLogin();
            window.location.reload();
        }
    };

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

    function MyObject(){}
    MyObject.prototype.init = MyObject;
    MyObject.extend = function(name, instanceProperties, classProperties){
        instanceProperties || (instanceProperties = {});
        classProperties || (classProperties = {});
        var ChildClass = fn_extends_with_init(name, this);
        $.extend(ChildClass.prototype, {
            parent: this.prototype,
            init: function(){
                ChildClass.prototype.parent.init.apply(this, arguments);
            }
        }, classProperties);
        return $.extend(ChildClass, {extend: this.extend}, instanceProperties);
    };
    Array.extend = MyObject.extend;
    Array.prototype.init = MyObject;
    var MyCollection = Array.extend("MyCollection", {}, {});

    var Model = MyObject.extend("Model", {}, {
        setTag: function (obj) {
            this._tag = obj;
        },
        getTag: function () {
            return this._tag;
        }
    });

    var PostModel = Model.extend("PostModel", {}, {
        fillFromPostEditorModel: function (postEditorModel) {
            if (postEditorModel.postModel && this != postEditorModel.postModel) {
                $.extend(this, postModel);
            }
            this.post_title = postEditorModel.post_title();
            this.post_content = postEditorModel.post_content();
            this.post_excerpt = this.post_content.slice(0, 1000);
            this.post_status = postEditorModel.post_status();  // publish or private
            this.post_type = postEditorModel.post_type();  // post or draft
            this.post_name = escapeToUrl(this.post_title, "UTF-8");
        }
    });

    var PostEditorModel = Model.extend("PostEditorModel", {}, {
        init: function() {
            this.is_private = ko.observable(false);
            this.post_title = ko.observable("");
            this.post_content = ko.observable("");
            this.post_type = ko.observable("post");
            this.post_status = ko.computed(function(){
                return this.is_private() ? "private" : "publish";
            }, this);
        },
        fillCategoryOptions: function(terms) {
            if (!terms) return;
            var opt_list = [];
            for (var i = 0; i < terms.length; i++) {
                var term = terms[i];
                var name = term.get("name");
                var option = {name: name, term: term};
                opt_list.push(option);
                (name == "DefaultCategory") && (this.option_selected = ko.observable(option));
            }
            this.option_list = opt_list;
        },
        fillFromPostModel: function(postModel) {
            this.post_title(postModel.post_title);
            this.post_content(postModel.post_content);
            this.is_private(postModel.post_status == "private");
            this.postModel = postModel;
        },
        setSelectedCategory: function(postCategoryListModel) {
            // todo... multi-selected
            var selected = "DefaultCategory";
            if (postCategoryListModel && postCategoryListModel[0])
                selected = postCategoryListModel[0].name;
            for (var i = 0; i < this.option_list.length; i++) {
                var option = this.option_list[i];
                if (selected == option.name) {
                    this.option_selected = ko.observable(option);
                    break;
                }
            }
        },
        getSelectedCategory: function() {
            // todo... multi-selected
            return this.option_selected().term;
        }
    });

    var CategoryModel = Model.extend("CategoryModel", {}, {
        init: function(opt) {
            $.extend(this, opt);
        }
    });

    var CategoryListModel = MyCollection.extend("CategoryListModel", {}, {
        getTermList: function() {
            var list = [];
            for (var i = 0; i < this.length; i++) {
                list.push(this[i].term);
            }
            return list;
        }
    });

    function PostController() {
        $.extend(PostController.prototype, {
            newPost: function() {
                log("newPost");
                if (!checkLogin()) return;
                loadTinymceDynamically();
                $("#page").hide(), $("#post_full").hide(), $("#post_editor").show();
                var postEditorModel = new PostEditorModel();
                postEditorModel.fillCategoryOptions(Cache.terms);
                ko.applyBindings(postEditorModel, $("#post_editor").get(0));
            },
            editPost: function(postModel) {
                log("editPost:", postModel.id, postModel.post_title);
                if (!checkLogin()) return;
                loadTinymceDynamically();
                $("#page").hide(), $("#post_full").hide(), $("#post_editor").show();
                var postEditorModel = new PostEditorModel();
                postEditorModel.fillFromPostModel(postModel);
                postEditorModel.fillCategoryOptions(Cache.terms);
                postEditorModel.setSelectedCategory(postModel.postCategoryListModel);
                ko.applyBindings(postEditorModel, $("#post_editor").get(0));
            },
            savePost: function(postEditorModel) {
                if (!checkLogin()) return;
                postEditorModel.post_content(tinyMCE.get('post_editor_content').getContent());
                var postModel = postEditorModel.postModel || new PostModel();
                postModel.fillFromPostEditorModel(postEditorModel);
                if (!postEditorModel.postModel) {
                    API.savePost(postModel).done(function(p){
                        log("--->new post saved success.", p);
                        var term = postEditorModel.getSelectedCategory();
                        // insert new record into TermRelationships
                        var relationship = TermRelationships.create();
                        relationship.set("object_id", p.get("ID"));
                        relationship.set("term_id", term.get("term_id"));
                        relationship.set("post", p);
                        relationship.set("term", term);
                        API.saveRelationship(relationship).done(function(r){
                            log("--->new relationship saved success.", r);
                            // update Terms count
                            term.increment("count", 1);
                            API.saveTerm(term).done(function(t){
                                log("--->update term count success.", t.get("count"), t);
                            });
                            $(".notifications").notify({message: "成功发表文章《" + p.get("post_title") + "》"}).show();
                        }).fail(notifyFail);
                    }).fail(notifyFail);
                } else {
                    API.savePost(postModel).done(function(p){
                        log("post updated success.", p);
                        var term = postEditorModel.getSelectedCategory();
                        var origTermList = postModel.postCategoryListModel.getTermList();
                        // update TermRelationships
                        var query = new Parse.Query(TermRelationships);
                        query.equalTo("post", p);
                        wrapParseDeferred(query.find, query).done(function(results){
                            $.each(results, function(){
                                var r = this;
                                wrapParseDeferred(r.destroy, r).done(function(obj){
                                    log("--->delete a relationship:", obj);
                                }).fail(notifyFail);
                            });
                            var relationship = TermRelationships.create();
                            relationship.set("object_id", p.get("ID"));
                            relationship.set("term_id", term.get("term_id"));
                            relationship.set("post", p);
                            relationship.set("term", term);
                            API.saveRelationship(relationship).done(function(r){
                                log("--->new relationship saved success.", r);
                                // update Terms count
                                term.increment("count", 1);
                                API.saveTerm(term).done(function(t){
                                    log("--->update new term count success.", t.get("count"), t);
                                });
                                $.each(origTermList, function(){
                                    var origTerm = this;
                                    origTerm.increment("count", -1);
                                    API.saveTerm(origTerm).done(function(t){
                                        log("--->update orig term count success.", t.get("count"), t);
                                    });
                                });
                                $(".notifications").notify({message: "成功更新文章《" + p.get("post_title") + "》"}).show();
                            }).fail(notifyFail);
                        });
                    }).fail(notifyFail);
                }
                function notifyFail(arg, err) {
                    log("save post fail.", err);
                    $(".notifications").notify({message: "发表文章失败:" + err.code + ":" + err.message, type: 'error'}).show();
                }
            },
            delPost: function(postModel) {
                log("delPost:", postModel.id, postModel.post_title);
                if (!checkLogin()) return;
                // $.showDialog is wrong!
                $().showDialog({
                    header: "删除",
                    body: "是否删除文章：《" + postModel.post_title + "》"
                }).confirm(function($dlg){
                        API.deletePost(postModel.id).done(function(p){
                            log("delete post success");
                            var query = new Parse.Query(TermRelationships);
                            query.equalTo("post", p);
                            wrapParseDeferred(query.find, query).done(function(results){
                                var deferList = [];
                                $.each(results, function(){
                                    var r = this;
                                    deferList.push(wrapParseDeferred(r.destroy, r).done(function(obj){
                                        log("--->delete a relationship:", obj);
                                    }));
                                });
                                $.when.apply(this, deferList).done(function(){
                                    log("--->all relationship deleted.");
                                    var termList = postModel.postCategoryListModel.getTermList();
                                    $.each(termList, function(){
                                        var term = this;
                                        term.increment("count", -1);
                                        API.saveTerm(term).done(function(t){
                                            log("--->update term count success.", t.get("count"), t);
                                        }).fail(function(arg, err){
                                                log("--->update term count fail:" + err.code + ":" + err.message);
                                            });
                                    });
                                    $(".notifications").notify({message: "成功删除文章《" + postModel.post_title + "》"}).show();
                                }).fail(notifyFail);
                            });
                        }).fail(notifyFail);
                        $dlg.modal("hide");
                    });
                function notifyFail(arg, err) {
                    log("delete post fail.", err);
                    $(".notifications").notify({message: "删除文章失败:" + err.code + ":" + err.message, type: 'error'}).show();
                }
            }
        });
    }

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "showHome",
            "page/:id": "showPage",
            "tag/:id": "initCategoryPagination",
            "archive/:date": "initArchivePagination",
            "post/:id": "showPost",
            "post/:id/edit": "editPost",
            "post/:id/del": "deletePost",
            "*actions": "defaultRoute"
        },
        initCategoryPagination: function(id){
            initCategoryPagination(parseInt(id));
        },
        initArchivePagination: initArchivePagination,
        showHome: function() {
            log("===>showHome");
            initSidebar();
            initPagination();
        },
        showPage: function(page){
            showPage(parseInt(page));
        },
        showPost: showPost,
        editPost: function(id){
            API.editPost(id);
        },
        deletePost: function(id) {
            API.deletePost(id);
        },
        defaultRoute: function( actions ){
            log("defaultRoute->", actions);
        }
    });
    var app_router = new AppRouter;
    Backbone.history.start();

    $.extend(scope, {
        initPagination: initPagination,
        showPage: showPage,
        showNextPage: showNextPage,
        showPrevPage: showPrevPage,
        initSidebar: initSidebar,
        initLogin: initLogin,
        postController: new PostController(),
        loginController: loginController,
        API: API
    });
    scope.wrapParseDeferred = wrapParseDeferred;
    scope.queryAll = queryAll;

})(this);

(function() {
    var Posts = Parse.Object.extend('Posts');
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships');
    var TermTaxonomy = Parse.Object.extend('TermTaxonomy');
    var Comments = Parse.Object.extend('Comments');

    // for init data to Parse.com only
    function login() {
        return wrapParseDeferred(Parse.User.logIn, this, "jfo", "123456");
    }

    var updatePublicACL = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.equalTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var postACL = new Parse.ACL(Parse.User.current());
                        postACL.setPublicReadAccess(true);
                        this.setACL(postACL);
                        this.save();
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var updatePrivateACL = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.notEqualTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var postACL = new Parse.ACL(Parse.User.current());
                        this.setACL(postACL);
                        this.save();
                        // $.toJSON(this.getACL().permissionsById)
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkACL = function() {
        var start = "";
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            //query.notEqualTo("post_status", "publish");
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var post_status = this.get("post_status");
                        var postACL = this.getACL();
                        if (!postACL) {
                            var id = this.get("ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("ID"), $.toJSON(this.getACL().permissionsById), this);
                        }
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };
    var updatePostUser = function() {
        var start = "";
        var i = 0;
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        this.set("post_author", Parse.User.current());
                        this.save();
                        log(++i, "id:" + this.get("ID"), this);
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkPostUser = function() {
        var start = "";
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Posts);
            query.ascending("post_date");
            query.limit(20);
            query.greaterThan("post_date", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var author = this.get("post_author");
                        if (!author) {
                            var id = this.get("ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("ID"), this);
                        }
                        start = this.get("post_date");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };
    function updatePostViews() {
        login().done(function(){
            var query = new Parse.Query(Posts);
            query.descending('post_date');
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("id:" + this.get("ID"), this);
                    this.set('post_views', 0);
                });
                Parse.Object.saveAll(list);
            });
        });
    }
    function updatePostExcerpt() {
        login().done(function(){
            var query = new Parse.Query(Posts);
            query.descending('post_date');
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("id:" + this.get("ID"), this);
                    var content = this.get('post_content');
                    var excerpt = content.slice(0, 1000);
                    this.set('post_excerpt', excerpt);
                });
                Parse.Object.saveAll(list);
            });
        });
    }

    function getPost(post_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(Posts);
        query.equalTo("ID", post_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTermTaxonomyByTaxonomyId(term_taxonomy_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(TermTaxonomy);
        query.equalTo("term_taxonomy_id", term_taxonomy_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTermTaxonomyByTermId(term_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(TermTaxonomy);
        query.equalTo("term_id", term_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }
    function getTerm(term_id) {
        var defer = $.Deferred();
        var query = new Parse.Query(Terms);
        query.equalTo("term_id", term_id);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }

    var updateTermRelationships = function() {
        var start = 0;
        var i = 0;
        function r() {
            var query = new Parse.Query(TermRelationships);
            query.ascending("object_id");
            query.limit(20);
            query.greaterThan("object_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var relation = this;
                        var post_id = this.get("object_id");
                        var term_taxonomy_id = this.get("term_taxonomy_id");
                        getPost(post_id).done(function(post){
                            if (!post)
                                return
                            getTermTaxonomyByTaxonomyId(term_taxonomy_id).done(function(term_taxonomy){
                                getTerm(term_taxonomy.get("term_id")).done(function(term){
                                    relation.set("post", post);
                                    relation.set("term", term);
                                    relation.save();
                                });
                            });
                        });
                        log(++i, "object_id:" + this.get("object_id"), this);
                        start = this.get("object_id");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkTermRelationships = function() {
        var start = 0;
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(TermRelationships);
            query.ascending("object_id");
            query.limit(20);
            query.greaterThan("object_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var term = this.get("term");
                        var post = this.get("post");
                        if (!term || !post) {
                            var id = this.get("object_id");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("object_id"), this);
                        }
                        start = this.get("object_id");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };

    var updateTerms = function() {
        var start = 0;
        var i = 0;
        function r() {
            var query = new Parse.Query(Terms);
            query.ascending("term_id");
            query.limit(20);
            query.greaterThan("term_id", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        return;
                    }
                    $.each(results, function() {
                        var term = this;
                        var term_id = this.get("term_id");
                        getTermTaxonomyByTermId(term_id).done(function(term_taxonomy){
                            var count = term_taxonomy.get("count");
                            term.set("count", count);
                            term.save();
                        });
                        log(++i, "object_id:" + this.get("term_id"), this);
                        start = this.get("term_id");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    
    function getComment(comment_ID) {
        var defer = $.Deferred();
        var query = new Parse.Query(Comments);
        query.equalTo("comment_ID", comment_ID);
        query.first({
            success: function(r){
                defer.resolve(r);
            },
            error: errorHandler
        });
        return defer.promise();
    }

    var updateComments = function() {
        var start = 0;
        var i = 0;
        var postCommentMap = {};
        function r() {
            var query = new Parse.Query(Comments);
            query.ascending("comment_ID");
            query.limit(20);
            query.greaterThan("comment_ID", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        _.each(postCommentMap, function(v, k, list){
                            var query = new Parse.Query(Posts);
                            wrapParseDeferred(query.get, query, k).done(function(post){
                                post.set('comment_count', v);
                                post.save();
                            });
                        });
                        return;
                    }
                    $.each(results, function() {
                        var comment = this;
                        var post_id = this.get("comment_post_ID");
                        getPost(post_id).done(function(post){
                            if (!post)
                                return;
                            comment.set("post", post);
                            comment.save();
                            if (!postCommentMap[post.id])
                                postCommentMap[post.id] = 0;
                            postCommentMap[post.id]++;
                        });
                        var parent_comment_id = this.get("comment_parent");
                        if (parent_comment_id > 0) {
                            getComment(parent_comment_id).done(function(parent_comment){
                                comment.set("parent", parent_comment);
                            });
                        }
                        log(++i, "comment_ID:" + this.get("comment_ID"), this);
                        start = this.get("comment_ID");
                    });
                    r();
                },
                error : errorHandler
            });
        }
        login().done(r);
    };
    var checkComments = function() {
        var start = 0;
        var i = 0;
        var list = [];
        var defer = $.Deferred();
        function r() {
            var query = new Parse.Query(Comments);
            query.ascending("comment_ID");
            query.limit(20);
            query.greaterThan("comment_ID", start);
            query.find({
                success : function(results) {
                    log(results.length);
                    if (results.length == 0) {
                        defer.resolve();
                        return;
                    }
                    $.each(results, function() {
                        ++i;
                        var parent_comment_id = this.get("parent_comment");
                        var parent_comment = this.get("parent");
                        var post = this.get("post");
                        if (!post || (parent_comment_id > 0 && !parent_comment)) {
                            var id = this.get("comment_ID");
                            console.warn(i, "id:" + id, this);
                            list.push($.toJSON(this));
                        } else {
                            log(i, "id:" + this.get("comment_ID"), this);
                        }
                        start = this.get("comment_ID");
                    });
                    r();
                },
                error : errorHandler
            });
            return defer.promise();
        }
        login().done(function(){
            r().done(function(){
                log("fix list:", list);
            });
        });
    };

    function insertPost() {
        function r(user) {
            var post = new Posts();
            post.set("ID", 3);
            post.set("comment_count", 0);
            post.set("comment_status", "open");
            post.set("guid", "");
            post.set("menu_order", 0);
            post.set("ping_status", "open");
            post.set("pinged", "");
            post.set("post_author", user);
            post.set("post_content", "test content for post...");
            post.set("post_content_filtered", "");
            post.set("post_date", "2013-03-03 05:58:27");
            post.set("post_date_gmt", "2013-03-03 05:58:27");
            post.set("post_excerpt", "test");
            post.set("post_mime_type", "");
            post.set("post_modified", "2013-03-03 05:58:27");
            post.set("post_modified_gmt", "2013-03-03 05:58:27");
            post.set("post_name", "title");
            post.set("post_parent", 0);
            post.set("post_password", "");
            post.set("post_status", "publish");
            post.set("post_title", "title");
            post.set("post_type", "post");
            post.set("post_views", 34);
            post.set("to_ping", "");
            wrapParseDeferred(post.save, post, null).done(function(post){
                log("insertPost success", post);
            }).fail(function(post, err){
                    log("insertPost fail", err);
                });
        }
        login().done(r);
    }

    function renameTermTaxonomyId2TermId() {
        login().done(function(){
            var query = new Parse.Query(TermRelationships);
            query.descending("object_id");
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("object_id:" + this.get("object_id"), this);
                    this.set('term_id', this.get("term_taxonomy_id"));
                });
                Parse.Object.saveAll(list);
            });
        });
    }

    function checkTermsCount() {
        login().done(function(){
            var count = {};
            var query = new Parse.Query(TermRelationships);
            query.descending("object_id");
            //query.include("post");
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("object_id:" + this.get("object_id"), this);
                    var term = this.get("term");
                    var post = this.get("post");
                    var termId = term.id;
                    count[termId] || (count[termId] = 0);
                    count[termId] += 1;
                });
            }).done(function(list){
                    var oldCount = {};
                    query = new Parse.Query(Terms);
                    query.descending("term_id");
                    queryAll(query).done(function(list){
                        var termNameMap = {};
                        $.each(list, function(){
                            var termId = this.id;
                            var name = this.get("name");
                            oldCount[termId] = this.get("count");
                            termNameMap[termId] = name;
                        });
                        var problemList = [];
                        for (var termId in oldCount) {
                            if (!count[termId] || count[termId] != oldCount[termId])
                                problemList.push({termId:termId, oldCount:oldCount[termId], count:count[termId]});
                        }
                        for (var i = 0; i < problemList.length; i++) {
                            var p = problemList[i];
                            p.termName = termNameMap[p.termId];
                        }
                        log("===>count:", count);
                        log("===>oldCount:", oldCount);
                        log("===>problem list:", problemList);
                        for (var i = 0; i < problemList.length; i++) {
                            var p = JSON.stringify(problemList[i]);
                            log(p);
                        }
                    });
                });

        });
    }

})();
