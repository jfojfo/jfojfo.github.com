// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

var DEBUG = true;
var log = function() {
    if (DEBUG)
        console.log.apply(console, arguments);
};
var errorHandler = function() {
    log.apply(this, arguments);
};
var _ = require('underscore');
(function(scope) {
    var $ = {};
    $.Deferred = Deferred;
    function Deferred() {
        return new Deferred.prototype.init();
    }


    Deferred.prototype.init = function() {
        this.state = 0;
        this.doneQueue = [];
        this.failQueue = [];
        return this;
    };
    Deferred.prototype.init.prototype = Deferred.prototype;
    Deferred.prototype.promise = function() {
        return this;
    };
    Deferred.prototype.done = function(cbDone) {
        this.doneQueue.push(cbDone);
        if (this.state != 0)
            this._finish();
        return this;
    };
    Deferred.prototype.fail = function(cbFail) {
        this.failQueue.push(cbFail);
        if (this.state != 0)
            this._finish();
        return this;
    };
    Deferred.prototype.resolve = function() {
        this.state = 1;
        this.args = arguments;
        this._finish();
    };
    Deferred.prototype.reject = function() {
        this.state = 2;
        this.args = arguments;
        this._finish();
    };
    Deferred.prototype._finish = function() {
        var queue = [];
        if (this.state == 1)
            queue = this.doneQueue;
        else if (state == 2)
            queue = this.failQueue;
        for (var i = 0; i < queue.length; i++) {
            var cb = queue[i];
            cb.apply(this, this.args);
        }
    };
    scope.$ = $;
})(this)

function wrapParseDeferred(func, obj) {
    var defer = $.Deferred();
    var args = [];
    for (var i = 2; i < arguments.length; i++)
        args.push(arguments[i]);
    args.push({
        success : function() {
            defer.resolve.apply(defer, arguments);
        },
        error : function() {
            defer.reject.apply(defer, arguments);
        }
    });
    func.apply(obj, args);
    return defer.promise();
}

function queryAll(query, show_log) {
    var i = 0;
    var list = [];
    function r(cb) {
        query.skip(i);
        query.limit(20);
        wrapParseDeferred(query.find, query).done(function(results) {
            if (results.length == 0) {
                if (cb.success) {
                    cb.success.call(this, list);
                }
                return;
            }
            _.each(results, function(obj) {
                if (show_log)
                    log(JSON.stringify(obj));
                list.push(obj);
            });
            i += results.length;
            r(cb);
        }).fail(function() {
            if (cb.error) {
                var args = Array.prototype.slice.call(arguments, 0, arguments.length);
                args.unshift(list);
                cb.error.apply(this, args);
            }
        });
    }

    return wrapParseDeferred(r, this);
}

Parse.Cloud.define("hello", function(request, response) {
    response.success("Hello world!");
});

Parse.Cloud.define("getArchiveDateList", function(request, response) {
    var Posts = Parse.Object.extend('Posts');
    function getArchive() {
        var query = new Parse.Query(Posts);
        query.descending("post_date");
        return queryAll(query);
    }


    getArchive().done(function(results) {
        var archives = results;
        var ar_list = [];
        var ar_map = {};
        for (var i = 0; i < archives.length; i++) {
            var ar = archives[i];
            var post_date = ar.get('post_date');
            post_date = post_date.slice(0, 7);
            if (!ar_map[post_date]) {
                ar_map[post_date] = 1;
                ar_list.push(post_date);
            } else {
                ar_map[post_date]++;
            }
        }
        var archive_list = [];
        for (var i = 0; i < ar_list.length; i++) {
            var post_date = ar_list[i];
            archive_list.push({
                text : post_date,
                count : ar_map[post_date]
            });
        }
        response.success(archive_list);
    }).fail(function() {
        response.success.apply(response, arguments);
    });
});
