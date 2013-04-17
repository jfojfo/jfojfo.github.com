(function(scope) {
    var DEBUG = true;
    var log = function() {
        if (DEBUG) {
            console.log.apply(console, arguments);
        }
    }
    
    // var template = _.template('<li>{{ name }}</li>');
    // _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

    function fn_extends(curr__, base__, fnName) {
      // note: 'curr__.name == curr__' is not allowed!
      var name = fnName ? fnName : curr__.name;
      var s="(function(){function "+name+"(){}"+name+".prototype=base__.prototype;curr__.prototype=new "+name+"();curr__.prototype.constructor = curr__;return curr__;})()";
      return eval(s);
    }
    /*
    function fn_extends(curr, base) {
      function dummy() {}
      dummy.prototype = base.prototype;
      curr.prototype = new dummy();
      curr.prototype.constructor = curr;
      return curr;
    }*/
    var TMPL = {};
    TMPL.test = function() {
        function A() {}
        function curr(){}
        var r = fn_extends(curr, A);
        var a = new curr();
        
        function hello(name) {
            return "Hello: " + name;
        }
        var f = _.wrap(hello, function(func, a){
            return func(a);
        });
        log(f("jfo"));
    };
    TMPL.PageTransformer = (function() {
        function PageTransformer(jTarget){
            this.jTarget = jTarget;
        }
        var fn = PageTransformer;
        fn.prototype.transform = function(){
            var jHeader = this.jTarget.find("[data-template-header]");
            var o = {jHtml:jHeader, attrs:jHeader.data()};
            this.header = TMPL.Component.create("header", o);

            var arr = [];
            this.jTarget.find("[data-template-id]").each(function(){
                var o = {jHtml:$(this), attrs:$(this).data()};
                var slide = TMPL.Component.create("slide", o);
                arr.push(slide);
            });
            this.slides = arr;
            
            log(this);
        };
        fn.prototype.showPage = function(data){
            if (typeof(data) === 'string')
                data = $.evalJSON(data);
            this.data = data;
            console.assert(data.type == "PageData");
            
            var dataSlidesMap = {};
            for (var i = 0; i < data.slides.length; i++) {
                var slide = data.slides[i];
                console.assert(slide.type == "Slide");
                var template_id = slide.template_id;
                if (template_id != null)
                    dataSlidesMap[template_id] = slide;
            }
            log("dataMap", dataSlidesMap);

            var slideSettingList = [];
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides[i];
                var d = dataSlidesMap[slide.template_id];
                if (d != undefined) {
                    slide.bind(d);
                    slide.jHtml.attr('id', slide.template_id);
                    d.components.slideSettings.id = slide.template_id;
                    slideSettingList.push(d.components.slideSettings);
                }
            }
            
            if (slideSettingList.length > 0) {
                var dataMenu = data.menu;
                dataMenu.components.list = slideSettingList;
                log("dataMenu", dataMenu);
                this.header.bind(dataMenu);
            }
        };
        return fn;
    })();
    TMPL.Data = (function(){
        var fn;
        function Data(args){
            $.extend(this, args);
        }
        fn = Data;
        fn.prototype.init = function(ith, n) {
            this.index = ith;
            this.total = n;
            return this;
        };
        fn.prototype.first = function() {
            return this.index == 0;
        };
        fn.prototype.last = function() {
            return this.index + 1 == this.total;
        };
        fn.prototype.odd = function() {
            return this.index % 2 == 1;
        };
        fn.prototype.even = function() {
            return this.index % 2 == 0;
        };
        return fn;
    })();
    TMPL.Component = (function(){
        function Component(args){
            $.extend(this, args);
            this.bind = _.wrap(this.bind, function(f, d){
                return f.call(this, d instanceof TMPL.Data ? d : new TMPL.Data(d));
            });
        }
        var fn = Component;
        fn.create = function(type, args) {
            type = type.toLowerCase();
            if (type == "text") {
                return new TMPL.Text(args);
            } else if (type == "repeatable") {
                return new TMPL.RepeatableItem(args);
            } else if (type == "repeatable_item_template") {
                return new TMPL.RepeatableItemTemplate(args);
            } else if (type == "slide") {
                return new TMPL.Slide(args);
            } else if (type == "header") {
                return new TMPL.Header(args);
            }
        };
        fn.prototype.pick = function(object, keyChain) {
            var chain = keyChain.split('.');
            $.each(chain, function(index){
                object = object[this];
            });
            return object;
        };
        fn.prototype.bind = function(data) {
            if (this.attrs.bind == undefined)
                return;
            var elem = this.jHtml.get(0);
            ko.applyBindings(data, elem);
        };
        return fn;
    })();
    TMPL.Slide = (function(parent) {
        var fn;
        function Slide(args){
            parent.call(this, args);
            fn.prototype.init.call(this, args.jHtml);
        }
        fn = Slide;
        fn_extends(fn, parent);
        fn.prototype.init = function(jHtml) {
            var item = {};
            item.jHtml = jHtml;
            item.components = [];
            item.repeatableItemTemplates = {};
            item.jHtml.find("[data-component]").each(function(){
                var o = {};
                o.jHtml = $(this);
                o.attrs = $(this).data();
                if (o.attrs.component == "repeatable_item_template") {
                    var id = $(this).attr("id");
                    item.repeatableItemTemplates[id] = o;
                    o.template = $(this).html();
                } else {
                    item.components.push(o);
                }
            });
            $.each(item.components, function(){
                if (this.attrs.component == "repeatable") {
                    var id = this.attrs.template;
                    this.tmplComponent = item.repeatableItemTemplates[id];
                }
            });
            item.template_id = jHtml.data("template-id");
            $.extend(this, item);
        };
        fn.prototype.bind = function(data){
            parent.prototype.bind.call(this, data);
            log("===>bind:", this, data);
            for (var i = 0; i < this.components.length; i++) {
                var name = this.components[i].attrs.component;
                var obj = TMPL.Component.create(name, this.components[i]);
                obj.bind(data.components);
            }
        };
        return fn;
    })(TMPL.Component);
    TMPL.Header = (function(parent) {
        var fn;
        function Header(args){
            parent.call(this, args);
        }
        fn = Header;
        fn_extends(fn, parent);
        return fn;
    })(TMPL.Slide);
    TMPL.Text = (function(parent) {
        function Text(args){
            parent.call(this, args);
        }
        var fn = Text;
        fn_extends(fn, parent);
        fn.prototype.bind = function(data){
            this.jHtml.empty();
            parent.prototype.bind.call(this, data);
            var name = this.attrs.name;
            this.json = this.pick(data, name);
            this.jHtml.append(this.json.value);
        };
        return fn;
    })(TMPL.Component);
    TMPL.RepeatableItem = (function(parent) {
        function RepeatableItem(args){
            parent.call(this, args);
            var t = args.tmplComponent;
            this.tmplComponent = TMPL.Component.create(t.attrs.component, t);
        }
        var fn = RepeatableItem;
        fn_extends(fn, parent);
        fn.prototype.bind = function(data){
            this.jHtml.empty();
            parent.prototype.bind.call(this, data);
            var list = this.pick(data, this.attrs.name);
            for (var i = 0; i < list.length; i++) {
                var d = list[i];
                console.assert(d.type == "RepeatableItem" || d.type == "SlideSettings");
                var wrapD = new TMPL.Data(d);
                wrapD.init(i, list.length);
                var html = this.tmplComponent.bind(wrapD);
                
                var o = {jHtml:$(html), attrs:$(html).data()};
                var slide = TMPL.Component.create("slide", o);
                slide.bind(d);
                this.jHtml.append(slide.jHtml);
            }
        };
        return fn;
    })(TMPL.Component);
    TMPL.RepeatableItemTemplate = (function(parent) {
        function RepeatableItemTemplate(args){
            parent.call(this, args);
            this.template = args.template.trim();
        }
        var fn = RepeatableItemTemplate;
        fn_extends(fn, parent);
        fn.prototype.bind = function(data){
            var html = _.template(this.template, data);
            return html;
        };
        return fn;
    })(TMPL.Component);

    scope.TMPL = TMPL;
})(this);
