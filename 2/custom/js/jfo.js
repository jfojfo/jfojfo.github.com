/**
 * Ctrl+Q quick document
 * Ctrl+O(F12) quick outline
 * Ctrl+Shift+I  view quick definition of symbol
 * Ctrl+B  jump to function definition
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
                list: [
                    {text:"发布文章", link:"#post/new", func: postController.newPost},
                    {text:"Check category count", link:"", func: postController.checkCategoryCount},
                ]
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
            },
            doDeleteRelationship: function(relationship) {
                return wrapParseDeferred(relationship.destroy, relationship);
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
            var postModel = toPostBindData(this);
            postModel.showReadMore = true;
            arr.push(postModel);
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
        post.post_content = obj.get('post_content');
        post.post_excerpt = obj.get('post_excerpt');
        post.post_link = "#post/" + post.id;
        post.post_status = obj.get('post_status');

        post.postCategoryListModel = obj.postCategoryListModel;
        // todo...
        post.post_category_link = 'post_category_link';
        post.comment_link = 'comment_link';
        //this.get('comment_link');
        post.post_views = obj.get('post_views');;
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
            var postModelList = toPageBindData(r);
            ko.applyBindings(postModelList, $("#posts").get(0));
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
            var postModel = toPostBindData(result);
            postModel.showReadMore = false;

            var query = new Parse.Query(TermRelationships);
            query.equalTo('post', result);
            query.include('term');
            wrapParseDeferred(query.find, query).done(function(relation_list){
                var list = new CategoryListModel();
                $.each(relation_list, function(){
                    var term = this.get("term");
                    list.push(new CategoryModel({
                        name: term.get("name"),
                        term_id: term.get("term_id"),
                        term: term
                    }));
                });
                postModel.postCategoryListModel = list;
                var dom = $("#article").get(0);
                ko.applyBindings(postModel, dom);
                $('#page').hide(), $('#post_full').show(), $('#post_editor').hide();
                // todo...
                loadSyntaxHighlighterDynamically(["shBrushJScript.js", "shBrushJava.js",
                    "shBrushPlain.js", "shBrushAS3.js"
                ]).done(function(){
                        var elems = $(SyntaxHighlighter.config.tagName, dom).get();
                        $.each(elems, function(){
                            SyntaxHighlighter.highlight({}, this);
                        });
                    });
                scroll(0,0);
            });
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
                $.extend(this, postEditorModel.postModel);
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
            $.extend(this, {
                name: "",
                term_id: 0,
                term: null
            }, opt);
        }
    });

    var CategoryListModel = MyCollection.extend("CategoryListModel", {}, {
        getTermList: function() {
            var list = [];
            for (var i = 0; i < this.length; i++) {
                list.push(this[i].term);
            }
            return list;
        },
        setTermList: function(categoryModelList) {
            var args = categoryModelList.slice();
            args.unshift(this.length);
            args.unshift(0);
            this.splice.apply(this, args);
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
                scroll(0,0);
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
                scroll(0,0);
            },
            savePost: function(postEditorModel) {
                if (!checkLogin()) return;
                postEditorModel.post_content(tinyMCE.get('post_editor_content').getContent());
                var postModel = postEditorModel.postModel || new PostModel();
                postModel.fillFromPostEditorModel(postEditorModel);
                if (!postEditorModel.postModel) {
                    API.savePost(postModel).done(function(p){
                        log("--->new post saved success.", p.toJSON());
                        var term = postEditorModel.getSelectedCategory();
                        // insert new record into TermRelationships
                        var relationship = TermRelationships.create();
                        relationship.set("object_id", p.get("ID"));
                        relationship.set("term_id", term.get("term_id"));
                        relationship.set("post", p);
                        relationship.set("term", term);
                        API.saveRelationship(relationship).done(function(r){
                            log("--->new relationship saved success.", r.toJSON());
                            // update Terms count
                            term.increment("count", 1);
                            API.saveTerm(term).done(function(t){
                                log("--->update term count success.", t.toJSON());
                                $(".notifications").notify({message: "成功发表文章《" + p.get("post_title") + "》"}).show();
                                goHome();
                            }).fail(notifyFail);
                        }).fail(notifyFail);
                    }).fail(notifyFail);
                } else {
                    API.savePost(postModel).done(function(p){
                        log("--->post updated success.", p.toJSON());
                        var term = postEditorModel.getSelectedCategory();
                        var origTermList = postModel.postCategoryListModel.getTermList();
                        var newPostCategoryModel = new CategoryModel({
                            name: term.get("name"),
                            term_id: term.get("term_id"),
                            term: term
                        });
                        postModel.postCategoryListModel.setTermList([newPostCategoryModel]);
                        // update TermRelationships
                        var query = new Parse.Query(TermRelationships);
                        query.equalTo("post", p);
                        wrapParseDeferred(query.find, query).done(function(results){
                            var deferList = [];
                            $.each(results, function(){
                                var r = this;
                                deferList.push(API.deleteRelationship(r).done(function(obj){
                                    log("--->delete a relationship success:", obj.toJSON());
                                }).fail(function(obj, err){
                                        log("--->delete a relationship fail:" + err.code + ":" + err.message);
                                    }));
                            });
                            $.when.apply(this, deferList).done(function(){
                                log("--->all relationship deleted.");
                                var relationship = TermRelationships.create();
                                relationship.set("object_id", p.get("ID"));
                                relationship.set("term_id", term.get("term_id"));
                                relationship.set("post", p);
                                relationship.set("term", term);
                                API.saveRelationship(relationship).done(function(r){
                                    log("--->new relationship saved success.", r.toJSON());
                                    // update Terms count
                                    term.increment("count", 1);
                                    API.saveTerm(term).done(function(t){
                                        log("--->update new term count success.", t.toJSON());
                                        var deferList = [];
                                        $.each(origTermList, function(){
                                            var origTerm = this;
                                            origTerm.increment("count", -1);
                                            deferList.push(API.saveTerm(origTerm).done(function(t){
                                                log("--->update orig term count success.", t.toJSON());
                                            }).fail(function(obj, err){
                                                    log("--->update orig term count fail:" + err.code + ":" + err.message);
                                                }));
                                        });
                                        $.when.apply(this, deferList).done(function(){
                                            log("--->all orig term count updated.");
                                            $(".notifications").notify({message: "成功更新文章《" + p.get("post_title") + "》"}).show();
                                            goHome();
                                        }).fail(notifyFail);
                                    }).fail(function(obj, err){
                                            log("--->update new term count fail:" + err.code + ":" + err.message, obj.toJSON());
                                        }).fail(notifyFail);
                                }).fail(notifyFail);
                            }).fail(notifyFail);
                        }).fail(notifyFail);
                    }).fail(notifyFail);
                }
                function notifyFail(arg, err) {
                    log("save post fail.", err, arg);
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
                            log("--->delete post success", p.toJSON());
                            var query = new Parse.Query(TermRelationships);
                            query.equalTo("post", p);
                            wrapParseDeferred(query.find, query).done(function(results){
                                var deferList = [];
                                $.each(results, function(){
                                    var r = this;
                                    deferList.push(API.deleteRelationship(r).done(function(obj){
                                        log("--->delete a relationship success:", obj.toJSON());
                                    }).fail(function(obj, err){
                                            log("--->delete a relationship fail:" + err.code + ":" + err.message, obj.toJSON());
                                        }));
                                });
                                $.when.apply(this, deferList).done(function(){
                                    log("--->all relationship deleted.");
                                    var deferList = [];
                                    var termList = postModel.postCategoryListModel.getTermList();
                                    $.each(termList, function(){
                                        var term = this;
                                        term.increment("count", -1);
                                        deferList.push(API.saveTerm(term).done(function(t){
                                            log("--->update term count success.", t.toJSON());
                                        }).fail(function(obj, err){
                                                log("--->update term count fail:" + err.code + ":" + err.message, obj.toJSON());
                                            }));
                                    });
                                    $.when.apply(this, deferList).done(function(){
                                        log("--->all term count updated.");
                                        $(".notifications").notify({message: "成功删除文章《" + postModel.post_title + "》"}).show();
                                        goHome();
                                    }).fail(notifyFail);
                                }).fail(notifyFail);
                            }).fail(notifyFail);
                        }).fail(notifyFail);
                        $dlg.modal("hide");
                    });
                function notifyFail(arg, err) {
                    log("delete post fail.", err, arg);
                    $(".notifications").notify({message: "删除文章失败:" + err.code + ":" + err.message, type: 'error'}).show();
                }
            },
            cancel: function() {
                goHome();
            },
            checkCategoryCount: checkTermsCount
        });
    }

    function goHome() {
        window.location.href = "";
    }
    function checkTermsCount() {
        var count = {};
        var query = new Parse.Query(TermRelationships);
        query.descending("object_id");
        //query.include("post");
        queryAll(query).progress(function(list){
            $.each(list, function(){
                log("object_id:", this.get("object_id"), this.toJSON());
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
    var app_router = new AppRouter();
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

    function updateTermRelationshipsACL() {
        login().done(function() {
            var query = new Parse.Query(TermRelationships);
            query.descending("object_id");
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("object_id:" + this.get("object_id"), this);
                    var ACL = new Parse.ACL(Parse.User.current());
                    ACL.setPublicReadAccess(true);
                    this.setACL(ACL);
                });
                Parse.Object.saveAll(list);
            });
        });
    }
    function updateTermsACL() {
        login().done(function() {
            var query = new Parse.Query(Terms);
            query.descending("term_id");
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("term_id:" + this.get("term_id"), this.get("name"), this.get("count"), this);
                    var ACL = new Parse.ACL(Parse.User.current());
                    ACL.setPublicReadAccess(true);
                    this.setACL(ACL);
                });
                Parse.Object.saveAll(list);
            });
        });
    }
    function checkTermRelationshipsACL() {
        login().done(function() {
            var query = new Parse.Query(TermRelationships);
            query.descending("object_id");
            var problemList = [];
            queryAll(query).progress(function(list){
                $.each(list, function(){
                    log("object_id:" + this.get("object_id"), this);
                    var ACL = this.getACL();
                    if (!ACL) {
                        problemList.push(this);
                    }
                });
            }).done(function(){
                    log("problemList:", problemList);
                    for (var i = 0; i < problemList.length; i++) {
                        var relation = problemList[i];
                        console.warn("object_id:" + relation.get("object_id"), this);
                    }
                });
        });
    }

    function updateImgUrl() {
        login().done(function() {
            var replaceList = [];
            var tmp = [];
            var query = new Parse.Query(Posts);
            query.descending("ID");
//            query.greaterThan("ID", 500);
            queryAll(query).progress(function(list){
                var saveList = [];
                $.each(list, function(){
                    log("ID:" + this.get("ID"), this);
                    var needSave = false;
                    var cl = [];
                    var content = this.get("post_content");
                    content = content.replace(/src=(["|'])http:\/\/localhost\/wp-content\/uploads\/pic\/([^'"]+)\1/g, function(target, quote, picFileName, index, src){
                        var ret = 'src="static/uploads/pic/' + picFileName + '"';
                        log("===>", target, ret);
                        var start = index;
                        while (index - start < 100 && start > 0) {
                            if (src[start] == "<")
                                break;
                            start = start - 1;
                        }
                        var end = index + target.length;
                        while (end - index < 100 + target.length && end < src.length) {
                            if (src[end++] == ">")
                                break;
                        }
                        var targetMore = src.slice(start, end);
                        cl.push(targetMore + "\n" + ret);
                        if (start == 0) {
                            tmp.push(targetMore + ":" + ret);
                        }
                        needSave = true;
                        return ret;
                    });
                    if (needSave) {
                        var excerpt = content.slice(0, 1000);
                        this.set("post_content", content);
                        this.set("post_excerpt", excerpt);
                        saveList.push(this);
                        replaceList.push({"ID":this.get("ID"), "urls":cl.join("\n")});
                    }
                });
                if (saveList.length > 0) {
                    Parse.Object.saveAll(saveList);
                }
            }).done(function(){
                    log("replaceList:", replaceList);
                    for (var i = 0; i < replaceList.length; i++) {
                        var item = replaceList[i];
                        console.warn(item.ID, item.urls);
                    }
                    log("problemList:", tmp);
                });
        });
    }

    function insertPosts() {
        var arr = [{"ID": 527,"post_author": 1,"post_date": "2012-12-21 18:27:00","post_date_gmt": "2012-12-21 10:27:00","post_content": " <p><br /></p><p><a href=\"http://blog.csdn.net/zmyde2010/article/details/6863717\" target=\"_blank\">http://blog.csdn.net/zmyde2010/article/details/6863717</a><br /></p><p><br /></p><p>有时候需要在显示UI的时候不中断原来的Activity</p><p>比如在播放视频时或者玩游戏时，需要显示某个菜单(可以是系统提示，或类似于TV菜单)</p><p>显然用Activity来做是不行的，因为新Activity启动的时候会把原来的Activity&nbsp;pause掉</p><p>怎么做呢，可以参考系统电量提示窗口或statusbar那样在service中启动窗口</p><p>新窗口将会出现在UI最上层，但不会中断原来的Activity</p><p>效果图，一个是播视频中，一个是玩游戏中:</p><p><img width=\"440\" height=\"330\" src=\"http://localhost/wp-content/uploads/pic/ac345982b2b7d0a2698e3a4bcbef76094a369aa4.jpg\" /></p><p><img width=\"440\" height=\"330\" src=\"http://localhost/wp-content/uploads/pic/8644ebf81a4c510f9ba2dccc6059252dd52aa585.jpg\" /></p><p><br /></p><p><br /></p><p>看一下WindowManager.LayoutParams的两个属性:</p><p>intTYPE_SYSTEM_ALERT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Window&nbsp;type:&nbsp;system&nbsp;window,&nbsp;such&nbsp;as&nbsp;low&nbsp;power&nbsp;alert.<br />intTYPE_SYSTEM_OVERLAYWindow&nbsp;type:&nbsp;system&nbsp;overlay&nbsp;windows,&nbsp;which&nbsp;need&nbsp;to&nbsp;be&nbsp;displayed&nbsp;on&nbsp;top&nbsp;of&nbsp;everything&nbsp;else.<br /></p><p>这两个不错，正是我们想要的，上代码~</p><p><br /></p><p>Seivece中代码</p><pre class=\"brush: java;toolbar:false;\">private&nbsp;void&nbsp;showSystemDialog()&nbsp;{&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;create&nbsp;ui&nbsp;*/&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;View&nbsp;v&nbsp;=&nbsp;View.inflate(mContext,&nbsp;R.layout.main,&nbsp;null);\n&nbsp;&nbsp;&nbsp;&nbsp;AlertDialog.Builder&nbsp;b&nbsp;=&nbsp;new&nbsp;AlertDialog.Builder(mContext);\n&nbsp;&nbsp;&nbsp;&nbsp;b.setView(v);\n&nbsp;&nbsp;&nbsp;&nbsp;d&nbsp;=&nbsp;b.create();&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;d.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT);\n&nbsp;&nbsp;&nbsp;&nbsp;//d.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_OVERLAY);\n&nbsp;&nbsp;&nbsp;&nbsp;d.show();&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;set&nbsp;size&nbsp;&amp;&nbsp;pos&nbsp;*/\n&nbsp;&nbsp;&nbsp;&nbsp;WindowManager.LayoutParams&nbsp;lp&nbsp;=&nbsp;d.getWindow().getAttributes();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;WindowManager&nbsp;wm&nbsp;=&nbsp;(WindowManager)&nbsp;getSystemService(WINDOW_SERVICE);\n&nbsp;&nbsp;&nbsp;&nbsp;Display&nbsp;display&nbsp;=&nbsp;wm.getDefaultDisplay();\n&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(display.getHeight()&nbsp;&gt;&nbsp;display.getWidth())&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//lp.height&nbsp;=&nbsp;(int)&nbsp;(display.getHeight()&nbsp;*&nbsp;0.5);\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lp.width&nbsp;=&nbsp;(int)&nbsp;(display.getWidth()&nbsp;*&nbsp;1.0);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;else&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//lp.height&nbsp;=&nbsp;(int)&nbsp;(display.getHeight()&nbsp;*&nbsp;0.75);\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lp.width&nbsp;=&nbsp;(int)&nbsp;(display.getWidth()&nbsp;*&nbsp;0.5);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;d.getWindow().setAttributes(lp);\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;update&nbsp;ui&nbsp;data&nbsp;*/\n&nbsp;&nbsp;&nbsp;&nbsp;lv&nbsp;=&nbsp;(ListView)&nbsp;d.getWindow().findViewById(R.id.listview);&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;SimpleAdapter&nbsp;adapter&nbsp;=&nbsp;new&nbsp;SimpleAdapter(mContext,&nbsp;getListData(),&nbsp;R.layout.list_item,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new&nbsp;String[]{&quot;item_text&quot;,&nbsp;&quot;item_img&quot;},&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new&nbsp;int[]{R.id.item_text,&nbsp;R.id.item_img});&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;lv.setAdapter(adapter);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;/*&nbsp;set&nbsp;listener&nbsp;*/\n&nbsp;&nbsp;&nbsp;&nbsp;lv.setOnItemClickListener(new&nbsp;OnItemClickListener()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;onItemClick(AdapterView&lt;?&gt;&nbsp;parent,&nbsp;View&nbsp;view,&nbsp;int&nbsp;pos,\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;long&nbsp;id)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d.dismiss();&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;});&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n&nbsp;&nbsp;&nbsp;\n}</pre><p><span>创建了一个dialog，可以调整dialog的位置、大小，dialog的从R.layout.main创建，动态添加UI数据</span></p><p>响应Ui上的OnClick操作</p><p><br /></p><p>*&nbsp;manifest中需要相应的permission</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;uses-permission&nbsp;android:name=&quot;android.permission.SYSTEM_ALERT_WINDOW&quot;&nbsp;/&gt;&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;uses-permission&nbsp;android:name=&quot;android.permission.SYSTEM_OVERLAY_WINDOW&quot;&nbsp;/&gt;&nbsp;<br /></p><p>*&nbsp;TYPE_SYSTEM_ALERT跟TYPE_SYSTEM_OVERLAY的区别</p><p>&nbsp;&nbsp;&nbsp;以上面的代码为例，system_alert窗口可以获得焦点，响应操作</p><p>&nbsp;&nbsp;&nbsp;system_overlay窗口显示的时候焦点在后面的Activity上，仍旧可以操作后面的Activity</p><p>*&nbsp;上面的代码中请留意d.show()的位置，只有在show之后才能调整dialog大小及更新数据</p><p>*&nbsp;可以调整的Attributes，先dump出来</p><p>&nbsp;&nbsp;&nbsp;lp.flags&nbsp;=&nbsp;0x20002,&nbsp;//&nbsp;FLAG_DIM_BEHIND&nbsp;|&nbsp;FLAG_ALT_FOCUSABLE_IM</p><p>&nbsp;&nbsp;&nbsp;lp.gravity&nbsp;=&nbsp;0x11,&nbsp;//&nbsp;CENTER</p><p>&nbsp;&nbsp;&nbsp;lp.type&nbsp;=&nbsp;0x7d3,&nbsp;//&nbsp;TYPE_SYSTEM_ALERT</p><p>&nbsp;&nbsp;&nbsp;这些Attr都可以设置，具体定义在API文档WindowManager.LayoutParams中</p><p><br /></p><p><br /></p><p><br /></p><p><br /></p> ","post_title": "Service中创建窗口显示(TYPE_SYSTEM_ALERT, TYPE_SYSTEM_OVERLAY)","post_excerpt": "","post_status": "publish","comment_status": "open","ping_status": "open","post_password": "","post_name": "the_service_created_window_displays_type_system_alert_type_system_overlay","to_ping": "","pinged": "","post_modified": "2012-12-21 18:27:00","post_modified_gmt": "2012-12-21 10:27:00","post_content_filtered": "","post_parent": 0,"guid": "http://localhost/?p=527","menu_order": 0,"post_type": "post","post_mime_type": "","comment_count": 0}, {"ID": 528,"post_author": 1,"post_date": "2013-01-20 11:56:00","post_date_gmt": "2013-01-20 03:56:00","post_content": " <p>wget&nbsp;--no-cookies&nbsp;--header&nbsp;&quot;Cookie:&nbsp;gpw_e24=aaa&quot;&nbsp;http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-linux-x64.bin<br /></p><p><br /></p><p>reference:&nbsp;<a href=\"http://ivan-site.com/2012/05/download-oracle-java-jre-jdk-using-a-script/\" target=\"_blank\" title=\"http://ivan-site.com/2012/05/download-oracle-java-jre-jdk-using-a-script/\">http://ivan-site.com/2012/05/download-oracle-java-jre-jdk-using-a-script/</a><br /></p><p><br /></p><div><p style=\"line-height: 18px; margin-bottom: 15px;\"><strong>JDK&nbsp;7u10</strong></p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-linux-i586.rpm</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-linux-i586.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-linux-x64.rpm</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-linux-x64.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-macosx-x64.dmg</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-i586.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-i586.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-sparc.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-sparc.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-sparcv9.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-sparcv9.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-x64.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-solaris-x64.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-windows-i586.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-windows-x64.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jdk-7u10-linux-arm-sfp.tar.gz</p><p style=\"line-height: 18px; margin-bottom: 15px;\"><strong>JDK&nbsp;6u38</strong></p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-linux-i586-rpm.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-linux-i586.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-linux-x64-rpm.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-linux-x64.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-i586.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-i586.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-sparc.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-sparc.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-sparcv9.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-sparcv9.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-x64.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-solaris-x64.tar.Z</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-windows-i586.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jdk-6u38-windows-x64.exe</p><p style=\"line-height: 18px; margin-bottom: 15px;\"><strong>JRE&nbsp;7u10</strong></p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-linux-i586.rpm</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-linux-i586.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-linux-x64.rpm</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-linux-x64.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-macosx-x64.dmg</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-macosx-x64.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-solaris-i586.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-solaris-sparc.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-solaris-sparcv9.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-solaris-x64.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-windows-i586-iftw.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-windows-i586.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-windows-i586.tar.gz</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-windows-x64.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/7u10-b18/jre-7u10-windows-x64.tar.gz</p><p style=\"line-height: 18px; margin-bottom: 15px;\"><strong>JRE&nbsp;6u38</strong></p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-linux-i586-rpm.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-linux-i586.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-linux-x64-rpm.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-linux-x64.bin</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-solaris-i586.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-solaris-sparc.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-solaris-sparcv9.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-solaris-x64.sh</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-windows-i586-iftw-k.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-windows-i586-iftw.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-windows-i586.exe</p><p>http://download.oracle.com/otn-pub/java/jdk/6u38-b05/jre-6u38-windows-x64.exe</p></div><p><br /></p> ","post_title": "用wget从oracle官网下载jre,jdk","post_excerpt": "","post_status": "publish","comment_status": "open","ping_status": "open","post_password": "","post_name": "wget_from_oracle_official_website_to_download_jre_jdk","to_ping": "","pinged": "","post_modified": "2013-01-20 11:56:00","post_modified_gmt": "2013-01-20 03:56:00","post_content_filtered": "","post_parent": 0,"guid": "http://localhost/?p=528","menu_order": 0,"post_type": "post","post_mime_type": "","comment_count": 0}, {"ID": 529,"post_author": 1,"post_date": "2013-01-21 11:39:00","post_date_gmt": "2013-01-21 03:39:00","post_content": " <p><br /></p><p><span style=\"font-family: Calibri; background-color: #ffffff;\">VBoxManage.exe&nbsp;modifyhd&nbsp;E:ubuntu_64</span><span style=\"font-family: Calibri; background-color: #ffffff;\">.vdi&nbsp;&nbsp;showhdinfo</span><br /></p><p><span style=\"\">UUID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d476f654-3100-4530-b645-31dcaf80ae56</span></p><p><span style=\"\">Accessible:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yes</span></p><p><span style=\"\">Logical&nbsp;size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;28723&nbsp;MBytes</span></p><p><span style=\"\">Current&nbsp;size&nbsp;on&nbsp;disk:&nbsp;23389&nbsp;MBytes</span></p><p><span style=\"\">Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;normal&nbsp;(base)</span></p><p><span style=\"\">Storage&nbsp;format:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VDI</span></p><p><span style=\"\">Format&nbsp;variant:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dynamic&nbsp;default</span></p><p><span style=\"\">In&nbsp;use&nbsp;by&nbsp;VMs:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ubuntu64_build_android&nbsp;(UUID:&nbsp;b787cc4e-69b5-4c05-99d3-f060</span><span>29b9d910)</span></p><p><span style=\"\">Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E:ubuntu64.vdi</span></p><p><span style=\"font-family: Calibri; background-color: #ffffff;\"><br /></span></p><p><span style=\"font-family: Calibri; background-color: #ffffff;\">VBoxManage.exe&nbsp;<span style=\"font-family: Calibri; background-color: #ffffff;\">modifyhd&nbsp;</span><span style=\"font-family: Calibri; background-color: #ffffff;\">--resize&nbsp;30000</span>&nbsp;E:ubuntu_64</span><span style=\"font-family: Calibri; background-color: #ffffff;\">.vdi</span></p><p style=\"font-family: Arial; background-color: #ffffff; line-height: 26px;\"><span style=\"font-family: Calibri;\">0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%</span></p><p><br /></p><p><br /></p><p><br /></p><p>用<span>ubuntu</span>光盘启动进入Linux系统</p><p style=\"font-size: 12px; font-family: Verdana,\'BitStream vera Sans\',Tahoma,Helvetica,sans-serif; color: #555555; background-color: #ffffff; line-height: 17px; margin-bottom: 10px;\">1、执行&nbsp;fdisk&nbsp;-l&nbsp;&gt;&nbsp;/tmp/fdisk.out&nbsp;命令，将&nbsp;fdisk&nbsp;的信息保存;</p><p style=\"font-size: 12px; font-family: Verdana,\'BitStream vera Sans\',Tahoma,Helvetica,sans-serif; color: #555555; background-color: #ffffff; line-height: 17px; margin-bottom: 10px;\">2、执行&nbsp;fdisk&nbsp;/dev/sdb&nbsp;命令，对&nbsp;sdb&nbsp;设备进行操作，<br />输入&nbsp;d&nbsp;将唯一一个分区删除;(只要不保存就不会影响数据的)<br />输入&nbsp;n&nbsp;建立一个主分区，分区号和之前的保持一致;<br />在&nbsp;First&nbsp;cylinder&nbsp;处输入之前分区的&nbsp;start&nbsp;值，如果不清楚，可以查看备份出来的&nbsp;fdisk.out&nbsp;文件，关于&nbsp;/dev/sdb1&nbsp;的start&nbsp;值;(此处非常重要！)<br />Last&nbsp;cylinder&nbsp;可以直接回车，默认最大，也就是说将全部空间给该分区，当然也可以手动输入，但不能比之前的小;<br />输入&nbsp;w&nbsp;保存。</p><p style=\"font-size: 12px; font-family: Verdana,\'BitStream vera Sans\',Tahoma,Helvetica,sans-serif; color: #555555; background-color: #ffffff; line-height: 17px; margin-bottom: 10px;\">3、e2fsck&nbsp;-y&nbsp;/dev/sdb1&nbsp;检测文件系统;</p><p style=\"font-size: 12px; font-family: Verdana,\'BitStream vera Sans\',Tahoma,Helvetica,sans-serif; color: #555555; background-color: #ffffff; line-height: 17px; margin-bottom: 10px;\">4、resize2fs&nbsp;/dev/sdb1&nbsp;使扩大的文件系统生效。</p><p style=\"font-size: 12px; font-family: Verdana,\'BitStream vera Sans\',Tahoma,Helvetica,sans-serif; color: #555555; background-color: #ffffff; line-height: 17px; margin-bottom: 10px;\">需要说明的是，如果设备上有很多分区，只能扩最后一个分区。</p><p><br /></p> ","post_title": "virtualbox中调整虚拟机的硬盘大小，再fdisk 扩大ext3分区","post_excerpt": "","post_status": "publish","comment_status": "open","ping_status": "open","post_password": "","post_name": "virtualbox_to_adjust_the_size_of_the_virtual_machine39s_hard_disk_and_then_fdisk_to_expand_the_ext3_partition","to_ping": "","pinged": "","post_modified": "2013-01-21 11:39:00","post_modified_gmt": "2013-01-21 03:39:00","post_content_filtered": "","post_parent": 0,"guid": "http://localhost/?p=529","menu_order": 0,"post_type": "post","post_mime_type": "","comment_count": 0}, {"ID": 530,"post_author": 1,"post_date": "2013-02-24 16:50:00","post_date_gmt": "2013-02-24 08:50:00","post_content": " <pre class=\"brush: js;toolbar:false;\">function()&nbsp;{\n&nbsp;&nbsp;var&nbsp;e&nbsp;=&nbsp;function(e,&nbsp;t)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;function()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;e.apply(t,&nbsp;arguments)\n&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;},\n&nbsp;&nbsp;t&nbsp;=&nbsp;{}.hasOwnProperty,\n&nbsp;&nbsp;n&nbsp;=&nbsp;function(e,&nbsp;n)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;function&nbsp;i()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.constructor&nbsp;=&nbsp;e\n&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(var&nbsp;r&nbsp;in&nbsp;n)&nbsp;t.call(n,&nbsp;r)&nbsp;&amp;&amp;&nbsp;(e[r]&nbsp;=&nbsp;n[r]);\n&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;i.prototype&nbsp;=&nbsp;n.prototype,\n&nbsp;&nbsp;&nbsp;&nbsp;e.prototype&nbsp;=&nbsp;new&nbsp;i,\n&nbsp;&nbsp;&nbsp;&nbsp;e.__super__&nbsp;=&nbsp;n.prototype,\n&nbsp;&nbsp;&nbsp;&nbsp;e\n&nbsp;&nbsp;};\n&nbsp;\n&nbsp;&nbsp;Bobcat.Text&nbsp;=&nbsp;function(e)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;function&nbsp;t(e)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;n,&nbsp;r&nbsp;=&nbsp;this;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;n&nbsp;=&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style:&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;create:&nbsp;function(e)&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;new&nbsp;Bobcat.TextStyle(e.data)\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.__super__.constructor.call(this,&nbsp;e,&nbsp;n),\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.oldValue&nbsp;=&nbsp;ko.observable()\n&nbsp;&nbsp;&nbsp;&nbsp;}\n&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;n(t,&nbsp;e),\n&nbsp;&nbsp;&nbsp;&nbsp;t.prototype.edit&nbsp;=&nbsp;function()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.__super__.edit.call(this);\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(this[&quot;default&quot;]())&nbsp;return&nbsp;this.oldValue(this.value()),\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.value(&quot;&amp;nbsp;&quot;)\n&nbsp;&nbsp;&nbsp;&nbsp;},\n&nbsp;&nbsp;&nbsp;&nbsp;t.prototype.deselect&nbsp;=&nbsp;function()&nbsp;{\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.__super__.deselect.call(this);\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(this[&quot;default&quot;]())&nbsp;return&nbsp;this.value()&nbsp;===&nbsp;&quot;&amp;nbsp;&quot;&nbsp;?&nbsp;this.value(this.oldValue())&nbsp;:&nbsp;this[&quot;default&quot;](!1)\n&nbsp;&nbsp;&nbsp;&nbsp;},\n&nbsp;&nbsp;&nbsp;&nbsp;t\n&nbsp;&nbsp;}&nbsp;(Bobcat.Component),\n&nbsp;\n}&nbsp;(window);</pre><p><br /></p> ","post_title": "javascript继承","post_excerpt": "","post_status": "publish","comment_status": "open","ping_status": "open","post_password": "","post_name": "javascript_inheritance","to_ping": "","pinged": "","post_modified": "2013-02-24 16:50:00","post_modified_gmt": "2013-02-24 08:50:00","post_content_filtered": "","post_parent": 0,"guid": "http://localhost/?p=530","menu_order": 0,"post_type": "post","post_mime_type": "","comment_count": 2}];
        login().done(function(){
            log(arr);
            var postList = [];
            $.each(arr, function(){
                var post = new Posts();
                for (var p in this) {
                    post.set(p, this[p]);
                }
                var currUser = Parse.User.current();
                post.set("post_author", currUser);
                post.set("post_views", 0);
                post.set("post_excerpt", this.post_content.slice(0, 1000));
                var postACL = new Parse.ACL(currUser);
                postACL.setPublicReadAccess(true);
                post.setACL(postACL);
                postList.push(post);
            });
            log(postList);
            Parse.Object.saveAll(postList);
        });
    }

})();
