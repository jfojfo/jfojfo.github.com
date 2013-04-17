var DEBUG = true;
var log = function() {
    if (DEBUG)
        console.log.apply(console, arguments);
};
var errorHandler = function() {
    log.apply(this, arguments);
};

(function(scope) {
    var ApplicationID = "eiv32sFkByLILfAUSLW5H1d7rAlK4WvCaU8to5uI";
    var JavascriptKey = "7D4goPL0RxMJft4XQdF9VGBJ1K1yYUx5xWTkHFgt";
    Parse.initialize(ApplicationID, JavascriptKey);

    var POSTS_PER_PAGE = 10;
    var PAGES_COUNT = 8;
    var COUNT_RECENT_POSTS = 15;
    var COUNT_RECENT_COMMENTS = 15;
    var MONTHS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    var Posts = Parse.Object.extend('Posts');
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships');
    var TermTaxonomy = Parse.Object.extend('TermTaxonomy');
    var Comments = Parse.Object.extend('Comments');

    var mPage = 1, mTotalPages = 1;
    var mFuncGetQuery;
    var TYPE_QUERY_PAGE = 1, TYPE_QUERY_COUNT = 2;
    
    scope.wrapParseDeferred = wrapParseDeferred;
    scope.login = login;
    scope.queryAll = queryAll;
    
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

    function login() {
        return wrapParseDeferred(Parse.User.logIn, this, 'jfo', '123456');
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
                            map[post.id] = [];
                        map[post.id].push({
                            name: term.get('name'),
                            term_id: term.get('term_id')
                        });
                    });
                    $.each(posts, function(post){
                        post = this;
                        post.post_category = map[post.id];
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
        var post = {};
        var dateStr = obj.get('post_date');
        dateStr = dateStr.replace(new RegExp("-","gm"), "/");
        var date = new Date(dateStr);
        post.id = obj.id;
        post.post_year = date.getFullYear();
        post.post_month = MONTHS[date.getMonth()];
        post.post_day = date.getDate();
        post.post_title = obj.get('post_title');
        post.post_author = obj.get('post_author').get('username');
        post.comment_count = obj.get('comment_count');
        post.post_content = obj.get('post_excerpt');
        post.post_link = "#post/" + post.id;

        post.post_category = obj.post_category;
        //this.get('post_category');
        post.post_category_link = 'post_category_link';
        //this.get('post_category_link');
        post.comment_link = 'comment_link';
        //this.get('comment_link');
        post.post_views = obj.get('post_views');;
        //this.get('post_views');
        post.showReadMore = true;
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
            $('#post_full').hide();
            $('#page').show();
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
            $('#page').hide();
            $('#post_full').show();
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
            query.equalTo('term_taxonomy_id', id);
            if (type == TYPE_QUERY_COUNT) {
                return query;
            } else if (type == TYPE_QUERY_PAGE) {
                var outerQuery = new Parse.Query(Posts);
                outerQuery.matchesKeyInQuery("ID", "object_id", query);
                return outerQuery;
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
        return wrapParseDeferred(query.find, query);
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
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            "page/:id": "showPage",
            "tag/:id": "initCategoryPagination",
            "archive/:date": "initArchivePagination",
            "post/:id": "showPost",
            "": "showHome",
            "*actions": "defaultRoute"
        },
        showHome: function() {
            log("===>showHome");
            initSidebar();
            initPagination();
        },
        showPage: function(page){
            showPage(parseInt(page));
        },
        showPost: showPost,
        initCategoryPagination: function(id){
            initCategoryPagination(parseInt(id));
        },
        initArchivePagination: initArchivePagination,
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
        initSidebar: initSidebar
    });
    
})(this);

(function() {
    var Posts = Parse.Object.extend('Posts');
    var Terms = Parse.Object.extend('Terms');
    var TermRelationships = Parse.Object.extend('TermRelationships');
    var TermTaxonomy = Parse.Object.extend('TermTaxonomy');
    var Comments = Parse.Object.extend('Comments');
    
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


})();

var testPostData = {
    post_year : "2013",
    post_month : "三",
    post_day : "5",
    post_title : "javascript继承",
    post_link : "#",
    post_author : "jfojfo",
    post_category : "Webapp",
    post_category_link : "#",
    post_views : 123,
    comment_link : "#",
    comment_count : 7,
    post_content : "<p>显然用Activity来做是不行的，因为新Activity启动的时候会把原来的Activity pause掉怎么做呢，可以参考系统电量提示窗口或statusbar那样在service中启动窗口</p>"
};
