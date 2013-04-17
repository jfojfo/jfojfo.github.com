(function() {
  window.console || (window.console = {
    log: function() {
      return {}
    },
    error: function() {
      return {}
    },
    warn: function() {
      return {}
    }
  })
}).call(this),
function(e, t) {
  function u(e) {
    var t = o[e] = {},
    n,
    r;
    e = e.split(/\s+/);
    for (n = 0, r = e.length; n < r; n++) t[e[n]] = !0;
    return t
  }
  function c(e, n, r) {
    if (r === t && e.nodeType === 1) {
      var i = "data-" + n.replace(l, "-$1").toLowerCase();
      r = e.getAttribute(i);
      if (typeof r == "string") {
        try {
          r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null: s.isNumeric(r) ? parseFloat(r) : f.test(r) ? s.parseJSON(r) : r
        } catch(o) {}
        s.data(e, n, r)
      } else r = t
    }
    return r
  }
  function h(e) {
    for (var t in e) {
      if (t === "data" && s.isEmptyObject(e[t])) continue;
      if (t !== "toJSON") return ! 1
    }
    return ! 0
  }
  function p(e, t, n) {
    var r = t + "defer",
    i = t + "queue",
    o = t + "mark",
    u = s._data(e, r);
    u && (n === "queue" || !s._data(e, i)) && (n === "mark" || !s._data(e, o)) && setTimeout(function() { ! s._data(e, i) && !s._data(e, o) && (s.removeData(e, r, !0), u.fire())
    },
    0)
  }
  function H() {
    return ! 1
  }
  function B() {
    return ! 0
  }
  function W(e) {
    return ! e || !e.parentNode || e.parentNode.nodeType === 11
  }
  function X(e, t, n) {
    t = t || 0;
    if (s.isFunction(t)) return s.grep(e,
    function(e, r) {
      var i = !!t.call(e, r, e);
      return i === n
    });
    if (t.nodeType) return s.grep(e,
    function(e, r) {
      return e === t === n
    });
    if (typeof t == "string") {
      var r = s.grep(e,
      function(e) {
        return e.nodeType === 1
      });
      if (q.test(t)) return s.filter(t, r, !n);
      t = s.filter(t, r)
    }
    return s.grep(e,
    function(e, r) {
      return s.inArray(e, t) >= 0 === n
    })
  }
  function V(e) {
    var t = $.split("|"),
    n = e.createDocumentFragment();
    if (n.createElement) while (t.length) n.createElement(t.pop());
    return n
  }
  function at(e, t) {
    return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
  }
  function ft(e, t) {
    if (t.nodeType !== 1 || !s.hasData(e)) return;
    var n, r, i, o = s._data(e),
    u = s._data(t, o),
    a = o.events;
    if (a) {
      delete u.handle,
      u.events = {};
      for (n in a) for (r = 0, i = a[n].length; r < i; r++) s.event.add(t, n + (a[n][r].namespace ? ".": "") + a[n][r].namespace, a[n][r], a[n][r].data)
    }
    u.data && (u.data = s.extend({},
    u.data))
  }
  function lt(e, t) {
    var n;
    if (t.nodeType !== 1) return;
    t.clearAttributes && t.clearAttributes(),
    t.mergeAttributes && t.mergeAttributes(e),
    n = t.nodeName.toLowerCase();
    if (n === "object") t.outerHTML = e.outerHTML;
    else if (n !== "input" || e.type !== "checkbox" && e.type !== "radio") {
      if (n === "option") t.selected = e.defaultSelected;
      else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
    } else e.checked && (t.defaultChecked = t.checked = e.checked),
    t.value !== e.value && (t.value = e.value);
    t.removeAttribute(s.expando)
  }
  function ct(e) {
    return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
  }
  function ht(e) {
    if (e.type === "checkbox" || e.type === "radio") e.defaultChecked = e.checked
  }
  function pt(e) {
    var t = (e.nodeName || "").toLowerCase();
    t === "input" ? ht(e) : t !== "script" && typeof e.getElementsByTagName != "undefined" && s.grep(e.getElementsByTagName("input"), ht)
  }
  function dt(e) {
    var t = n.createElement("div");
    return ut.appendChild(t),
    t.innerHTML = e.outerHTML,
    t.firstChild
  }
  function vt(e, t) {
    t.src ? s.ajax({
      url: t.src,
      async: !1,
      dataType: "script"
    }) : s.globalEval((t.text || t.textContent || t.innerHTML || "").replace(st, "/*$0*/")),
    t.parentNode && t.parentNode.removeChild(t)
  }
  function Lt(e, t, n) {
    var r = t === "width" ? e.offsetWidth: e.offsetHeight,
    i = t === "width" ? xt: Tt,
    o = 0,
    u = i.length;
    if (r > 0) {
      if (n !== "border") for (; o < u; o++) n || (r -= parseFloat(s.css(e, "padding" + i[o])) || 0),
      n === "margin" ? r += parseFloat(s.css(e, n + i[o])) || 0 : r -= parseFloat(s.css(e, "border" + i[o] + "Width")) || 0;
      return r + "px"
    }
    r = Nt(e, t, t);
    if (r < 0 || r == null) r = e.style[t] || 0;
    r = parseFloat(r) || 0;
    if (n) for (; o < u; o++) r += parseFloat(s.css(e, "padding" + i[o])) || 0,
    n !== "padding" && (r += parseFloat(s.css(e, "border" + i[o] + "Width")) || 0),
    n === "margin" && (r += parseFloat(s.css(e, n + i[o])) || 0);
    return r + "px"
  }
  function Gt(e) {
    return function(t, n) {
      typeof t != "string" && (n = t, t = "*");
      if (s.isFunction(n)) {
        var r = t.toLowerCase().split(Rt),
        i = 0,
        o = r.length,
        u,
        a,
        f;
        for (; i < o; i++) u = r[i],
        f = /^\+/.test(u),
        f && (u = u.substr(1) || "*"),
        a = e[u] = e[u] || [],
        a[f ? "unshift": "push"](n)
      }
    }
  }
  function Yt(e, n, r, i, s, o) {
    s = s || n.dataTypes[0],
    o = o || {},
    o[s] = !0;
    var u = e[s],
    a = 0,
    f = u ? u.length: 0,
    l = e === Xt,
    c;
    for (; a < f && (l || !c); a++) c = u[a](n, r, i),
    typeof c == "string" && (!l || o[c] ? c = t: (n.dataTypes.unshift(c), c = Yt(e, n, r, i, c, o)));
    return (l || !c) && !o["*"] && (c = Yt(e, n, r, i, "*", o)),
    c
  }
  function Zt(e, n) {
    var r, i, o = s.ajaxSettings.flatOptions || {};
    for (r in n) n[r] !== t && ((o[r] ? e: i || (i = {}))[r] = n[r]);
    i && s.extend(!0, e, i)
  }
  function en(e, t, n, r) {
    if (s.isArray(t)) s.each(t,
    function(t, i) {
      n || Ot.test(e) ? r(e, i) : en(e + "[" + (typeof i == "object" || s.isArray(i) ? t: "") + "]", i, n, r)
    });
    else if (!n && t != null && typeof t == "object") for (var i in t) en(e + "[" + i + "]", t[i], n, r);
    else r(e, t)
  }
  function tn(e, n, r) {
    var i = e.contents,
    s = e.dataTypes,
    o = e.responseFields,
    u, a, f, l;
    for (a in o) a in r && (n[o[a]] = r[a]);
    while (s[0] === "*") s.shift(),
    u === t && (u = e.mimeType || n.getResponseHeader("content-type"));
    if (u) for (a in i) if (i[a] && i[a].test(u)) {
      s.unshift(a);
      break
    }
    if (s[0] in r) f = s[0];
    else {
      for (a in r) {
        if (!s[0] || e.converters[a + " " + s[0]]) {
          f = a;
          break
        }
        l || (l = a)
      }
      f = f || l
    }
    if (f) return f !== s[0] && s.unshift(f),
    r[f]
  }
  function nn(e, n) {
    e.dataFilter && (n = e.dataFilter(n, e.dataType));
    var r = e.dataTypes,
    i = {},
    o, u, a = r.length,
    f, l = r[0],
    c,
    h,
    p,
    d,
    v;
    for (o = 1; o < a; o++) {
      if (o === 1) for (u in e.converters) typeof u == "string" && (i[u.toLowerCase()] = e.converters[u]);
      c = l,
      l = r[o];
      if (l === "*") l = c;
      else if (c !== "*" && c !== l) {
        h = c + " " + l,
        p = i[h] || i["* " + l];
        if (!p) {
          v = t;
          for (d in i) {
            f = d.split(" ");
            if (f[0] === c || f[0] === "*") {
              v = i[f[1] + " " + l];
              if (v) {
                d = i[d],
                d === !0 ? p = v: v === !0 && (p = d);
                break
              }
            }
          }
        } ! p && !v && s.error("No conversion from " + h.replace(" ", " to ")),
        p !== !0 && (n = p ? p(n) : v(d(n)))
      }
    }
    return n
  }
  function fn() {
    try {
      return new e.XMLHttpRequest
    } catch(t) {}
  }
  function ln() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP")
    } catch(t) {}
  }
  function bn() {
    return setTimeout(wn, 0),
    yn = s.now()
  }
  function wn() {
    yn = t
  }
  function En(e, t) {
    var n = {};
    return s.each(gn.concat.apply([], gn.slice(0, t)),
    function() {
      n[this] = e
    }),
    n
  }
  function Sn(e) {
    if (!cn[e]) {
      var t = n.body,
      r = s("<" + e + ">").appendTo(t),
      i = r.css("display");
      r.remove();
      if (i === "none" || i === "") {
        hn || (hn = n.createElement("iframe"), hn.frameBorder = hn.width = hn.height = 0),
        t.appendChild(hn);
        if (!pn || !hn.createElement) pn = (hn.contentWindow || hn.contentDocument).document,
        pn.write((n.compatMode === "CSS1Compat" ? "<!doctype html>": "") + "<html><body>"),
        pn.close();
        r = pn.createElement(e),
        pn.body.appendChild(r),
        i = s.css(r, "display"),
        t.removeChild(hn)
      }
      cn[e] = i
    }
    return cn[e]
  }
  function Nn(e) {
    return s.isWindow(e) ? e: e.nodeType === 9 ? e.defaultView || e.parentWindow: !1
  }
  var n = e.document,
  r = e.navigator,
  i = e.location,
  s = function() {
    function H() {
      if (i.isReady) return;
      try {
        n.documentElement.doScroll("left")
      } catch(e) {
        setTimeout(H, 1);
        return
      }
      i.ready()
    }
    var i = function(e, t) {
      return new i.fn.init(e, t, u)
    },
    s = e.jQuery,
    o = e.$,
    u,
    a = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    f = /\S/,
    l = /^\s+/,
    c = /\s+$/,
    h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
    p = /^[\],:{}\s]*$/,
    d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    m = /(?:^|:|,)(?:\s*\[)+/g,
    g = /(webkit)[ \/]([\w.]+)/,
    y = /(opera)(?:.*version)?[ \/]([\w.]+)/,
    b = /(msie) ([\w.]+)/,
    w = /(mozilla)(?:.*? rv:([\w.]+))?/,
    E = /-([a-z]|[0-9])/ig,
    S = /^-ms-/,
    x = function(e, t) {
      return (t + "").toUpperCase()
    },
    T = r.userAgent,
    N,
    C,
    k,
    L = Object.prototype.toString,
    A = Object.prototype.hasOwnProperty,
    O = Array.prototype.push,
    M = Array.prototype.slice,
    _ = String.prototype.trim,
    D = Array.prototype.indexOf,
    P = {};
    return i.fn = i.prototype = {
      constructor: i,
      init: function(e, r, s) {
        var o, u, f, l;
        if (!e) return this;
        if (e.nodeType) return this.context = this[0] = e,
        this.length = 1,
        this;
        if (e === "body" && !r && n.body) return this.context = n,
        this[0] = n.body,
        this.selector = e,
        this.length = 1,
        this;
        if (typeof e == "string") {
          e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? o = [null, e, null] : o = a.exec(e);
          if (o && (o[1] || !r)) {
            if (o[1]) return r = r instanceof i ? r[0] : r,
            l = r ? r.ownerDocument || r: n,
            f = h.exec(e),
            f ? i.isPlainObject(r) ? (e = [n.createElement(f[1])], i.fn.attr.call(e, r, !0)) : e = [l.createElement(f[1])] : (f = i.buildFragment([o[1]], [l]), e = (f.cacheable ? i.clone(f.fragment) : f.fragment).childNodes),
            i.merge(this, e);
            u = n.getElementById(o[2]);
            if (u && u.parentNode) {
              if (u.id !== o[2]) return s.find(e);
              this.length = 1,
              this[0] = u
            }
            return this.context = n,
            this.selector = e,
            this
          }
          return ! r || r.jquery ? (r || s).find(e) : this.constructor(r).find(e)
        }
        return i.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), i.makeArray(e, this))
      },
      selector: "",
      jquery: "1.7.1",
      length: 0,
      size: function() {
        return this.length
      },
      toArray: function() {
        return M.call(this, 0)
      },
      get: function(e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
      },
      pushStack: function(e, t, n) {
        var r = this.constructor();
        return i.isArray(e) ? O.apply(r, e) : i.merge(r, e),
        r.prevObject = this,
        r.context = this.context,
        t === "find" ? r.selector = this.selector + (this.selector ? " ": "") + n: t && (r.selector = this.selector + "." + t + "(" + n + ")"),
        r
      },
      each: function(e, t) {
        return i.each(this, e, t)
      },
      ready: function(e) {
        return i.bindReady(),
        C.add(e),
        this
      },
      eq: function(e) {
        return e = +e,
        e === -1 ? this.slice(e) : this.slice(e, e + 1)
      },
      first: function() {
        return this.eq(0)
      },
      last: function() {
        return this.eq( - 1)
      },
      slice: function() {
        return this.pushStack(M.apply(this, arguments), "slice", M.call(arguments).join(","))
      },
      map: function(e) {
        return this.pushStack(i.map(this,
        function(t, n) {
          return e.call(t, n, t)
        }))
      },
      end: function() {
        return this.prevObject || this.constructor(null)
      },
      push: O,
      sort: [].sort,
      splice: [].splice
    },
    i.fn.init.prototype = i.fn,
    i.extend = i.fn.extend = function() {
      var e, n, r, s, o, u, a = arguments[0] || {},
      f = 1,
      l = arguments.length,
      c = !1;
      typeof a == "boolean" && (c = a, a = arguments[1] || {},
      f = 2),
      typeof a != "object" && !i.isFunction(a) && (a = {}),
      l === f && (a = this, --f);
      for (; f < l; f++) if ((e = arguments[f]) != null) for (n in e) {
        r = a[n],
        s = e[n];
        if (a === s) continue;
        c && s && (i.isPlainObject(s) || (o = i.isArray(s))) ? (o ? (o = !1, u = r && i.isArray(r) ? r: []) : u = r && i.isPlainObject(r) ? r: {},
        a[n] = i.extend(c, u, s)) : s !== t && (a[n] = s)
      }
      return a
    },
    i.extend({
      noConflict: function(t) {
        return e.$ === i && (e.$ = o),
        t && e.jQuery === i && (e.jQuery = s),
        i
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function(e) {
        e ? i.readyWait++:i.ready(!0)
      },
      ready: function(e) {
        if (e === !0 && !--i.readyWait || e !== !0 && !i.isReady) {
          if (!n.body) return setTimeout(i.ready, 1);
          i.isReady = !0;
          if (e !== !0 && --i.readyWait > 0) return;
          C.fireWith(n, [i]),
          i.fn.trigger && i(n).trigger("ready").off("ready")
        }
      },
      bindReady: function() {
        if (C) return;
        C = i.Callbacks("once memory");
        if (n.readyState === "complete") return setTimeout(i.ready, 1);
        if (n.addEventListener) n.addEventListener("DOMContentLoaded", k, !1),
        e.addEventListener("load", i.ready, !1);
        else if (n.attachEvent) {
          n.attachEvent("onreadystatechange", k),
          e.attachEvent("onload", i.ready);
          var t = !1;
          try {
            t = e.frameElement == null
          } catch(r) {}
          n.documentElement.doScroll && t && H()
        }
      },
      isFunction: function(e) {
        return i.type(e) === "function"
      },
      isArray: Array.isArray ||
      function(e) {
        return i.type(e) === "array"
      },
      isWindow: function(e) {
        return e && typeof e == "object" && "setInterval" in e
      },
      isNumeric: function(e) {
        return ! isNaN(parseFloat(e)) && isFinite(e)
      },
      type: function(e) {
        return e == null ? String(e) : P[L.call(e)] || "object"
      },
      isPlainObject: function(e) {
        if (!e || i.type(e) !== "object" || e.nodeType || i.isWindow(e)) return ! 1;
        try {
          if (e.constructor && !A.call(e, "constructor") && !A.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
        } catch(n) {
          return ! 1
        }
        var r;
        for (r in e);
        return r === t || A.call(e, r)
      },
      isEmptyObject: function(e) {
        for (var t in e) return ! 1;
        return ! 0
      },
      error: function(e) {
        throw new Error(e)
      },
      parseJSON: function(t) {
        if (typeof t != "string" || !t) return null;
        t = i.trim(t);
        if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
        if (p.test(t.replace(d, "@").replace(v, "]").replace(m, ""))) return (new Function("return " + t))();
        i.error("Invalid JSON: " + t)
      },
      parseXML: function(n) {
        var r, s;
        try {
          e.DOMParser ? (s = new DOMParser, r = s.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch(o) {
          r = t
        }
        return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n),
        r
      },
      noop: function() {},
      globalEval: function(t) {
        t && f.test(t) && (e.execScript ||
        function(t) {
          e.eval.call(e, t)
        })(t)
      },
      camelCase: function(e) {
        return e.replace(S, "ms-").replace(E, x)
      },
      nodeName: function(e, t) {
        return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
      },
      each: function(e, n, r) {
        var s, o = 0,
        u = e.length,
        a = u === t || i.isFunction(e);
        if (r) {
          if (a) {
            for (s in e) if (n.apply(e[s], r) === !1) break
          } else for (; o < u;) if (n.apply(e[o++], r) === !1) break
        } else if (a) {
          for (s in e) if (n.call(e[s], s, e[s]) === !1) break
        } else for (; o < u;) if (n.call(e[o], o, e[o++]) === !1) break;
        return e
      },
      trim: _ ?
      function(e) {
        return e == null ? "": _.call(e)
      }: function(e) {
        return e == null ? "": e.toString().replace(l, "").replace(c, "")
      },
      makeArray: function(e, t) {
        var n = t || [];
        if (e != null) {
          var r = i.type(e);
          e.length == null || r === "string" || r === "function" || r === "regexp" || i.isWindow(e) ? O.call(n, e) : i.merge(n, e)
        }
        return n
      },
      inArray: function(e, t, n) {
        var r;
        if (t) {
          if (D) return D.call(t, e, n);
          r = t.length,
          n = n ? n < 0 ? Math.max(0, r + n) : n: 0;
          for (; n < r; n++) if (n in t && t[n] === e) return n
        }
        return - 1
      },
      merge: function(e, n) {
        var r = e.length,
        i = 0;
        if (typeof n.length == "number") for (var s = n.length; i < s; i++) e[r++] = n[i];
        else while (n[i] !== t) e[r++] = n[i++];
        return e.length = r,
        e
      },
      grep: function(e, t, n) {
        var r = [],
        i;
        n = !!n;
        for (var s = 0,
        o = e.length; s < o; s++) i = !!t(e[s], s),
        n !== i && r.push(e[s]);
        return r
      },
      map: function(e, n, r) {
        var s, o, u = [],
        a = 0,
        f = e.length,
        l = e instanceof i || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || i.isArray(e));
        if (l) for (; a < f; a++) s = n(e[a], a, r),
        s != null && (u[u.length] = s);
        else for (o in e) s = n(e[o], o, r),
        s != null && (u[u.length] = s);
        return u.concat.apply([], u)
      },
      guid: 1,
      proxy: function(e, n) {
        if (typeof n == "string") {
          var r = e[n];
          n = e,
          e = r
        }
        if (!i.isFunction(e)) return t;
        var s = M.call(arguments, 2),
        o = function() {
          return e.apply(n, s.concat(M.call(arguments)))
        };
        return o.guid = e.guid = e.guid || o.guid || i.guid++,
        o
      },
      access: function(e, n, r, s, o, u) {
        var a = e.length;
        if (typeof n == "object") {
          for (var f in n) i.access(e, f, n[f], s, o, r);
          return e
        }
        if (r !== t) {
          s = !u && s && i.isFunction(r);
          for (var l = 0; l < a; l++) o(e[l], n, s ? r.call(e[l], l, o(e[l], n)) : r, u);
          return e
        }
        return a ? o(e[0], n) : t
      },
      now: function() {
        return (new Date).getTime()
      },
      uaMatch: function(e) {
        e = e.toLowerCase();
        var t = g.exec(e) || y.exec(e) || b.exec(e) || e.indexOf("compatible") < 0 && w.exec(e) || [];
        return {
          browser: t[1] || "",
          version: t[2] || "0"
        }
      },
      sub: function() {
        function e(t, n) {
          return new e.fn.init(t, n)
        }
        i.extend(!0, e, this),
        e.superclass = this,
        e.fn = e.prototype = this(),
        e.fn.constructor = e,
        e.sub = this.sub,
        e.fn.init = function(r, s) {
          return s && s instanceof i && !(s instanceof e) && (s = e(s)),
          i.fn.init.call(this, r, s, t)
        },
        e.fn.init.prototype = e.fn;
        var t = e(n);
        return e
      },
      browser: {}
    }),
    i.each("Boolean Number String Function Array Date RegExp Object".split(" "),
    function(e, t) {
      P["[object " + t + "]"] = t.toLowerCase()
    }),
    N = i.uaMatch(T),
    N.browser && (i.browser[N.browser] = !0, i.browser.version = N.version),
    i.browser.webkit && (i.browser.safari = !0),
    f.test("?") && (l = /^[\s\xA0]+/, c = /[\s\xA0]+$/),
    u = i(n),
    n.addEventListener ? k = function() {
      n.removeEventListener("DOMContentLoaded", k, !1),
      i.ready()
    }: n.attachEvent && (k = function() {
      n.readyState === "complete" && (n.detachEvent("onreadystatechange", k), i.ready())
    }),
    i
  } (),
  o = {};
  s.Callbacks = function(e) {
    e = e ? o[e] || u(e) : {};
    var n = [],
    r = [],
    i,
    a,
    f,
    l,
    c,
    h = function(t) {
      var r, i, o, u, a;
      for (r = 0, i = t.length; r < i; r++) o = t[r],
      u = s.type(o),
      u === "array" ? h(o) : u === "function" && (!e.unique || !d.has(o)) && n.push(o)
    },
    p = function(t, s) {
      s = s || [],
      i = !e.memory || [t, s],
      a = !0,
      c = f || 0,
      f = 0,
      l = n.length;
      for (; n && c < l; c++) if (n[c].apply(t, s) === !1 && e.stopOnFalse) {
        i = !0;
        break
      }
      a = !1,
      n && (e.once ? i === !0 ? d.disable() : n = [] : r && r.length && (i = r.shift(), d.fireWith(i[0], i[1])))
    },
    d = {
      add: function() {
        if (n) {
          var e = n.length;
          h(arguments),
          a ? l = n.length: i && i !== !0 && (f = e, p(i[0], i[1]))
        }
        return this
      },
      remove: function() {
        if (n) {
          var t = arguments,
          r = 0,
          i = t.length;
          for (; r < i; r++) for (var s = 0; s < n.length; s++) if (t[r] === n[s]) {
            a && s <= l && (l--, s <= c && c--),
            n.splice(s--, 1);
            if (e.unique) break
          }
        }
        return this
      },
      has: function(e) {
        if (n) {
          var t = 0,
          r = n.length;
          for (; t < r; t++) if (e === n[t]) return ! 0
        }
        return ! 1
      },
      empty: function() {
        return n = [],
        this
      },
      disable: function() {
        return n = r = i = t,
        this
      },
      disabled: function() {
        return ! n
      },
      lock: function() {
        return r = t,
        (!i || i === !0) && d.disable(),
        this
      },
      locked: function() {
        return ! r
      },
      fireWith: function(t, n) {
        return r && (a ? e.once || r.push([t, n]) : (!e.once || !i) && p(t, n)),
        this
      },
      fire: function() {
        return d.fireWith(this, arguments),
        this
      },
      fired: function() {
        return !! i
      }
    };
    return d
  };
  var a = [].slice;
  s.extend({
    Deferred: function(e) {
      var t = s.Callbacks("once memory"),
      n = s.Callbacks("once memory"),
      r = s.Callbacks("memory"),
      i = "pending",
      o = {
        resolve: t,
        reject: n,
        notify: r
      },
      u = {
        done: t.add,
        fail: n.add,
        progress: r.add,
        state: function() {
          return i
        },
        isResolved: t.fired,
        isRejected: n.fired,
        then: function(e, t, n) {
          return a.done(e).fail(t).progress(n),
          this
        },
        always: function() {
          return a.done.apply(a, arguments).fail.apply(a, arguments),
          this
        },
        pipe: function(e, t, n) {
          return s.Deferred(function(r) {
            s.each({
              done: [e, "resolve"],
              fail: [t, "reject"],
              progress: [n, "notify"]
            },
            function(e, t) {
              var n = t[0],
              i = t[1],
              o;
              s.isFunction(n) ? a[e](function() {
                o = n.apply(this, arguments),
                o && s.isFunction(o.promise) ? o.promise().then(r.resolve, r.reject, r.notify) : r[i + "With"](this === a ? r: this, [o])
              }) : a[e](r[i])
            })
          }).promise()
        },
        promise: function(e) {
          if (e == null) e = u;
          else for (var t in u) e[t] = u[t];
          return e
        }
      },
      a = u.promise({}),
      f;
      for (f in o) a[f] = o[f].fire,
      a[f + "With"] = o[f].fireWith;
      return a.done(function() {
        i = "resolved"
      },
      n.disable, r.lock).fail(function() {
        i = "rejected"
      },
      t.disable, r.lock),
      e && e.call(a, a),
      a
    },
    when: function(e) {
      function c(e) {
        return function(n) {
          t[e] = arguments.length > 1 ? a.call(arguments, 0) : n,
          --o || f.resolveWith(f, t)
        }
      }
      function h(e) {
        return function(t) {
          i[e] = arguments.length > 1 ? a.call(arguments, 0) : t,
          f.notifyWith(l, i)
        }
      }
      var t = a.call(arguments, 0),
      n = 0,
      r = t.length,
      i = new Array(r),
      o = r,
      u = r,
      f = r <= 1 && e && s.isFunction(e.promise) ? e: s.Deferred(),
      l = f.promise();
      if (r > 1) {
        for (; n < r; n++) t[n] && t[n].promise && s.isFunction(t[n].promise) ? t[n].promise().then(c(n), f.reject, h(n)) : --o;
        o || f.resolveWith(f, t)
      } else f !== e && f.resolveWith(f, r ? [e] : []);
      return l
    }
  }),
  s.support = function() {
    var t, r, i, o, u, a, f, l, c, h, p, d, v, m = n.createElement("div"),
    g = n.documentElement;
    m.setAttribute("className", "t"),
    m.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
    r = m.getElementsByTagName("*"),
    i = m.getElementsByTagName("a")[0];
    if (!r || !r.length || !i) return {};
    o = n.createElement("select"),
    u = o.appendChild(n.createElement("option")),
    a = m.getElementsByTagName("input")[0],
    t = {
      leadingWhitespace: m.firstChild.nodeType === 3,
      tbody: !m.getElementsByTagName("tbody").length,
      htmlSerialize: !!m.getElementsByTagName("link").length,
      style: /top/.test(i.getAttribute("style")),
      hrefNormalized: i.getAttribute("href") === "/a",
      opacity: /^0.55/.test(i.style.opacity),
      cssFloat: !!i.style.cssFloat,
      checkOn: a.value === "on",
      optSelected: u.selected,
      getSetAttribute: m.className !== "t",
      enctype: !!n.createElement("form").enctype,
      html5Clone: n.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
      submitBubbles: !0,
      changeBubbles: !0,
      focusinBubbles: !1,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0
    },
    a.checked = !0,
    t.noCloneChecked = a.cloneNode(!0).checked,
    o.disabled = !0,
    t.optDisabled = !u.disabled;
    try {
      delete m.test
    } catch(y) {
      t.deleteExpando = !1
    } ! m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick",
    function() {
      t.noCloneEvent = !1
    }), m.cloneNode(!0).fireEvent("onclick")),
    a = n.createElement("input"),
    a.value = "t",
    a.setAttribute("type", "radio"),
    t.radioValue = a.value === "t",
    a.setAttribute("checked", "checked"),
    m.appendChild(a),
    l = n.createDocumentFragment(),
    l.appendChild(m.lastChild),
    t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked,
    t.appendChecked = a.checked,
    l.removeChild(a),
    l.appendChild(m),
    m.innerHTML = "",
    e.getComputedStyle && (f = n.createElement("div"), f.style.width = "0", f.style.marginRight = "0", m.style.width = "2px", m.appendChild(f), t.reliableMarginRight = (parseInt((e.getComputedStyle(f, null) || {
      marginRight: 0
    }).marginRight, 10) || 0) === 0);
    if (m.attachEvent) for (d in {
      submit: 1,
      change: 1,
      focusin: 1
    }) p = "on" + d,
    v = p in m,
    v || (m.setAttribute(p, "return;"), v = typeof m[p] == "function"),
    t[d + "Bubbles"] = v;
    return l.removeChild(m),
    l = o = u = f = m = a = null,
    s(function() {
      var e, r, i, o, u, a, f, l, h, p, d, g = n.getElementsByTagName("body")[0];
      if (!g) return;
      f = 1,
      l = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
      h = "visibility:hidden;border:0;",
      p = "style='" + l + "border:5px solid #000;padding:0;'",
      d = "<div " + p + "><div></div></div>" + "<table " + p + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>",
      e = n.createElement("div"),
      e.style.cssText = h + "width:0;height:0;position:static;top:0;margin-top:" + f + "px",
      g.insertBefore(e, g.firstChild),
      m = n.createElement("div"),
      e.appendChild(m),
      m.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",
      c = m.getElementsByTagName("td"),
      v = c[0].offsetHeight === 0,
      c[0].style.display = "",
      c[1].style.display = "none",
      t.reliableHiddenOffsets = v && c[0].offsetHeight === 0,
      m.innerHTML = "",
      m.style.width = m.style.paddingLeft = "1px",
      s.boxModel = t.boxModel = m.offsetWidth === 2,
      typeof m.style.zoom != "undefined" && (m.style.display = "inline", m.style.zoom = 1, t.inlineBlockNeedsLayout = m.offsetWidth === 2, m.style.display = "", m.innerHTML = "<div style='width:4px;'></div>", t.shrinkWrapBlocks = m.offsetWidth !== 2),
      m.style.cssText = l + h,
      m.innerHTML = d,
      r = m.firstChild,
      i = r.firstChild,
      u = r.nextSibling.firstChild.firstChild,
      a = {
        doesNotAddBorder: i.offsetTop !== 5,
        doesAddBorderForTableAndCells: u.offsetTop === 5
      },
      i.style.position = "fixed",
      i.style.top = "20px",
      a.fixedPosition = i.offsetTop === 20 || i.offsetTop === 15,
      i.style.position = i.style.top = "",
      r.style.overflow = "hidden",
      r.style.position = "relative",
      a.subtractsBorderForOverflowNotVisible = i.offsetTop === -5,
      a.doesNotIncludeMarginInBodyOffset = g.offsetTop !== f,
      g.removeChild(e),
      m = e = null,
      s.extend(t, a)
    }),
    t
  } ();
  var f = /^(?:\{.*\}|\[.*\])$/,
  l = /([A-Z])/g;
  s.extend({
    cache: {},
    uuid: 0,
    expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
    noData: {
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet: !0
    },
    hasData: function(e) {
      return e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando],
      !!e && !h(e)
    },
    data: function(e, n, r, i) {
      if (!s.acceptData(e)) return;
      var o, u, a, f = s.expando,
      l = typeof n == "string",
      c = e.nodeType,
      h = c ? s.cache: e,
      p = c ? e[f] : e[f] && f,
      d = n === "events";
      if ((!p || !h[p] || !d && !i && !h[p].data) && l && r === t) return;
      p || (c ? e[f] = p = ++s.uuid: p = f),
      h[p] || (h[p] = {},
      c || (h[p].toJSON = s.noop));
      if (typeof n == "object" || typeof n == "function") i ? h[p] = s.extend(h[p], n) : h[p].data = s.extend(h[p].data, n);
      return o = u = h[p],
      i || (u.data || (u.data = {}), u = u.data),
      r !== t && (u[s.camelCase(n)] = r),
      d && !u[n] ? o.events: (l ? (a = u[n], a == null && (a = u[s.camelCase(n)])) : a = u, a)
    },
    removeData: function(e, t, n) {
      if (!s.acceptData(e)) return;
      var r, i, o, u = s.expando,
      a = e.nodeType,
      f = a ? s.cache: e,
      l = a ? e[u] : u;
      if (!f[l]) return;
      if (t) {
        r = n ? f[l] : f[l].data;
        if (r) {
          s.isArray(t) || (t in r ? t = [t] : (t = s.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
          for (i = 0, o = t.length; i < o; i++) delete r[t[i]];
          if (! (n ? h: s.isEmptyObject)(r)) return
        }
      }
      if (!n) {
        delete f[l].data;
        if (!h(f[l])) return
      }
      s.support.deleteExpando || !f.setInterval ? delete f[l] : f[l] = null,
      a && (s.support.deleteExpando ? delete e[u] : e.removeAttribute ? e.removeAttribute(u) : e[u] = null)
    },
    _data: function(e, t, n) {
      return s.data(e, t, n, !0)
    },
    acceptData: function(e) {
      if (e.nodeName) {
        var t = s.noData[e.nodeName.toLowerCase()];
        if (t) return t !== !0 && e.getAttribute("classid") === t
      }
      return ! 0
    }
  }),
  s.fn.extend({
    data: function(e, n) {
      var r, i, o, u = null;
      if (typeof e == "undefined") {
        if (this.length) {
          u = s.data(this[0]);
          if (this[0].nodeType === 1 && !s._data(this[0], "parsedAttrs")) {
            i = this[0].attributes;
            for (var a = 0,
            f = i.length; a < f; a++) o = i[a].name,
            o.indexOf("data-") === 0 && (o = s.camelCase(o.substring(5)), c(this[0], o, u[o]));
            s._data(this[0], "parsedAttrs", !0)
          }
        }
        return u
      }
      return typeof e == "object" ? this.each(function() {
        s.data(this, e)
      }) : (r = e.split("."), r[1] = r[1] ? "." + r[1] : "", n === t ? (u = this.triggerHandler("getData" + r[1] + "!", [r[0]]), u === t && this.length && (u = s.data(this[0], e), u = c(this[0], e, u)), u === t && r[1] ? this.data(r[0]) : u) : this.each(function() {
        var t = s(this),
        i = [r[0], n];
        t.triggerHandler("setData" + r[1] + "!", i),
        s.data(this, e, n),
        t.triggerHandler("changeData" + r[1] + "!", i)
      }))
    },
    removeData: function(e) {
      return this.each(function() {
        s.removeData(this, e)
      })
    }
  }),
  s.extend({
    _mark: function(e, t) {
      e && (t = (t || "fx") + "mark", s._data(e, t, (s._data(e, t) || 0) + 1))
    },
    _unmark: function(e, t, n) {
      e !== !0 && (n = t, t = e, e = !1);
      if (t) {
        n = n || "fx";
        var r = n + "mark",
        i = e ? 0 : (s._data(t, r) || 1) - 1;
        i ? s._data(t, r, i) : (s.removeData(t, r, !0), p(t, n, "mark"))
      }
    },
    queue: function(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue",
      r = s._data(e, t),
      n && (!r || s.isArray(n) ? r = s._data(e, t, s.makeArray(n)) : r.push(n)),
      r || []
    },
    dequeue: function(e, t) {
      t = t || "fx";
      var n = s.queue(e, t),
      r = n.shift(),
      i = {};
      r === "inprogress" && (r = n.shift()),
      r && (t === "fx" && n.unshift("inprogress"), s._data(e, t + ".run", i), r.call(e,
      function() {
        s.dequeue(e, t)
      },
      i)),
      n.length || (s.removeData(e, t + "queue " + t + ".run", !0), p(e, t, "queue"))
    }
  }),
  s.fn.extend({
    queue: function(e, n) {
      return typeof e != "string" && (n = e, e = "fx"),
      n === t ? s.queue(this[0], e) : this.each(function() {
        var t = s.queue(this, e, n);
        e === "fx" && t[0] !== "inprogress" && s.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        s.dequeue(this, e)
      })
    },
    delay: function(e, t) {
      return e = s.fx ? s.fx.speeds[e] || e: e,
      t = t || "fx",
      this.queue(t,
      function(t, n) {
        var r = setTimeout(t, e);
        n.stop = function() {
          clearTimeout(r)
        }
      })
    },
    clearQueue: function(e) {
      return this.queue(e || "fx", [])
    },
    promise: function(e, n) {
      function h() {--u || r.resolveWith(i, [i])
      }
      typeof e != "string" && (n = e, e = t),
      e = e || "fx";
      var r = s.Deferred(),
      i = this,
      o = i.length,
      u = 1,
      a = e + "defer",
      f = e + "queue",
      l = e + "mark",
      c;
      while (o--) if (c = s.data(i[o], a, t, !0) || (s.data(i[o], f, t, !0) || s.data(i[o], l, t, !0)) && s.data(i[o], a, s.Callbacks("once memory"), !0)) u++,
      c.add(h);
      return h(),
      r.promise()
    }
  });
  var d = /[\n\t\r]/g,
  v = /\s+/,
  m = /\r/g,
  g = /^(?:button|input)$/i,
  y = /^(?:button|input|object|select|textarea)$/i,
  b = /^a(?:rea)?$/i,
  w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
  E = s.support.getSetAttribute,
  S, x, T;
  s.fn.extend({
    attr: function(e, t) {
      return s.access(this, e, t, !0, s.attr)
    },
    removeAttr: function(e) {
      return this.each(function() {
        s.removeAttr(this, e)
      })
    },
    prop: function(e, t) {
      return s.access(this, e, t, !0, s.prop)
    },
    removeProp: function(e) {
      return e = s.propFix[e] || e,
      this.each(function() {
        try {
          this[e] = t,
          delete this[e]
        } catch(n) {}
      })
    },
    addClass: function(e) {
      var t, n, r, i, o, u, a;
      if (s.isFunction(e)) return this.each(function(t) {
        s(this).addClass(e.call(this, t, this.className))
      });
      if (e && typeof e == "string") {
        t = e.split(v);
        for (n = 0, r = this.length; n < r; n++) {
          i = this[n];
          if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;
          else {
            o = " " + i.className + " ";
            for (u = 0, a = t.length; u < a; u++)~o.indexOf(" " + t[u] + " ") || (o += t[u] + " ");
            i.className = s.trim(o)
          }
        }
      }
      return this
    },
    removeClass: function(e) {
      var n, r, i, o, u, a, f;
      if (s.isFunction(e)) return this.each(function(t) {
        s(this).removeClass(e.call(this, t, this.className))
      });
      if (e && typeof e == "string" || e === t) {
        n = (e || "").split(v);
        for (r = 0, i = this.length; r < i; r++) {
          o = this[r];
          if (o.nodeType === 1 && o.className) if (e) {
            u = (" " + o.className + " ").replace(d, " ");
            for (a = 0, f = n.length; a < f; a++) u = u.replace(" " + n[a] + " ", " ");
            o.className = s.trim(u)
          } else o.className = ""
        }
      }
      return this
    },
    toggleClass: function(e, t) {
      var n = typeof e,
      r = typeof t == "boolean";
      return s.isFunction(e) ? this.each(function(n) {
        s(this).toggleClass(e.call(this, n, this.className, t), t)
      }) : this.each(function() {
        if (n === "string") {
          var i, o = 0,
          u = s(this),
          a = t,
          f = e.split(v);
          while (i = f[o++]) a = r ? a: !u.hasClass(i),
          u[a ? "addClass": "removeClass"](i)
        } else if (n === "undefined" || n === "boolean") this.className && s._data(this, "__className__", this.className),
        this.className = this.className || e === !1 ? "": s._data(this, "__className__") || ""
      })
    },
    hasClass: function(e) {
      var t = " " + e + " ",
      n = 0,
      r = this.length;
      for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(d, " ").indexOf(t) > -1) return ! 0;
      return ! 1
    },
    val: function(e) {
      var n, r, i, o = this[0];
      if (!arguments.length) {
        if (o) return n = s.valHooks[o.nodeName.toLowerCase()] || s.valHooks[o.type],
        n && "get" in n && (r = n.get(o, "value")) !== t ? r: (r = o.value, typeof r == "string" ? r.replace(m, "") : r == null ? "": r);
        return
      }
      return i = s.isFunction(e),
      this.each(function(r) {
        var o = s(this),
        u;
        if (this.nodeType !== 1) return;
        i ? u = e.call(this, r, o.val()) : u = e,
        u == null ? u = "": typeof u == "number" ? u += "": s.isArray(u) && (u = s.map(u,
        function(e) {
          return e == null ? "": e + ""
        })),
        n = s.valHooks[this.nodeName.toLowerCase()] || s.valHooks[this.type];
        if (!n || !("set" in n) || n.set(this, u, "value") === t) this.value = u
      })
    }
  }),
  s.extend({
    valHooks: {
      option: {
        get: function(e) {
          var t = e.attributes.value;
          return ! t || t.specified ? e.value: e.text
        }
      },
      select: {
        get: function(e) {
          var t, n, r, i, o = e.selectedIndex,
          u = [],
          a = e.options,
          f = e.type === "select-one";
          if (o < 0) return null;
          n = f ? o: 0,
          r = f ? o + 1 : a.length;
          for (; n < r; n++) {
            i = a[n];
            if (i.selected && (s.support.optDisabled ? !i.disabled: i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !s.nodeName(i.parentNode, "optgroup"))) {
              t = s(i).val();
              if (f) return t;
              u.push(t)
            }
          }
          return f && !u.length && a.length ? s(a[o]).val() : u
        },
        set: function(e, t) {
          var n = s.makeArray(t);
          return s(e).find("option").each(function() {
            this.selected = s.inArray(s(this).val(), n) >= 0
          }),
          n.length || (e.selectedIndex = -1),
          n
        }
      }
    },
    attrFn: {
      val: !0,
      css: !0,
      html: !0,
      text: !0,
      data: !0,
      width: !0,
      height: !0,
      offset: !0
    },
    attr: function(e, n, r, i) {
      var o, u, a, f = e.nodeType;
      if (!e || f === 3 || f === 8 || f === 2) return;
      if (i && n in s.attrFn) return s(e)[n](r);
      if (typeof e.getAttribute == "undefined") return s.prop(e, n, r);
      a = f !== 1 || !s.isXMLDoc(e),
      a && (n = n.toLowerCase(), u = s.attrHooks[n] || (w.test(n) ? x: S));
      if (r !== t) {
        if (r === null) {
          s.removeAttr(e, n);
          return
        }
        return u && "set" in u && a && (o = u.set(e, r, n)) !== t ? o: (e.setAttribute(n, "" + r), r)
      }
      return u && "get" in u && a && (o = u.get(e, n)) !== null ? o: (o = e.getAttribute(n), o === null ? t: o)
    },
    removeAttr: function(e, t) {
      var n, r, i, o, u = 0;
      if (t && e.nodeType === 1) {
        r = t.toLowerCase().split(v),
        o = r.length;
        for (; u < o; u++) i = r[u],
        i && (n = s.propFix[i] || i, s.attr(e, i, ""), e.removeAttribute(E ? i: n), w.test(i) && n in e && (e[n] = !1))
      }
    },
    attrHooks: {
      type: {
        set: function(e, t) {
          if (g.test(e.nodeName) && e.parentNode) s.error("type property can't be changed");
          else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t),
            n && (e.value = n),
            t
          }
        }
      },
      value: {
        get: function(e, t) {
          return S && s.nodeName(e, "button") ? S.get(e, t) : t in e ? e.value: null
        },
        set: function(e, t, n) {
          if (S && s.nodeName(e, "button")) return S.set(e, t, n);
          e.value = t
        }
      }
    },
    propFix: {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
    prop: function(e, n, r) {
      var i, o, u, a = e.nodeType;
      if (!e || a === 3 || a === 8 || a === 2) return;
      return u = a !== 1 || !s.isXMLDoc(e),
      u && (n = s.propFix[n] || n, o = s.propHooks[n]),
      r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i: e[n] = r: o && "get" in o && (i = o.get(e, n)) !== null ? i: e[n]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          var n = e.getAttributeNode("tabindex");
          return n && n.specified ? parseInt(n.value, 10) : y.test(e.nodeName) || b.test(e.nodeName) && e.href ? 0 : t
        }
      }
    }
  }),
  s.attrHooks.tabindex = s.propHooks.tabIndex,
  x = {
    get: function(e, n) {
      var r, i = s.prop(e, n);
      return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
    },
    set: function(e, t, n) {
      var r;
      return t === !1 ? s.removeAttr(e, n) : (r = s.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())),
      n
    }
  },
  E || (T = {
    name: !0,
    id: !0
  },
  S = s.valHooks.button = {
    get: function(e, n) {
      var r;
      return r = e.getAttributeNode(n),
      r && (T[n] ? r.nodeValue !== "": r.specified) ? r.nodeValue: t
    },
    set: function(e, t, r) {
      var i = e.getAttributeNode(r);
      return i || (i = n.createAttribute(r), e.setAttributeNode(i)),
      i.nodeValue = t + ""
    }
  },
  s.attrHooks.tabindex.set = S.set, s.each(["width", "height"],
  function(e, t) {
    s.attrHooks[t] = s.extend(s.attrHooks[t], {
      set: function(e, n) {
        if (n === "") return e.setAttribute(t, "auto"),
        n
      }
    })
  }), s.attrHooks.contenteditable = {
    get: S.get,
    set: function(e, t, n) {
      t === "" && (t = "false"),
      S.set(e, t, n)
    }
  }),
  s.support.hrefNormalized || s.each(["href", "src", "width", "height"],
  function(e, n) {
    s.attrHooks[n] = s.extend(s.attrHooks[n], {
      get: function(e) {
        var r = e.getAttribute(n, 2);
        return r === null ? t: r
      }
    })
  }),
  s.support.style || (s.attrHooks.style = {
    get: function(e) {
      return e.style.cssText.toLowerCase() || t
    },
    set: function(e, t) {
      return e.style.cssText = "" + t
    }
  }),
  s.support.optSelected || (s.propHooks.selected = s.extend(s.propHooks.selected, {
    get: function(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
      null
    }
  })),
  s.support.enctype || (s.propFix.enctype = "encoding"),
  s.support.checkOn || s.each(["radio", "checkbox"],
  function() {
    s.valHooks[this] = {
      get: function(e) {
        return e.getAttribute("value") === null ? "on": e.value
      }
    }
  }),
  s.each(["radio", "checkbox"],
  function() {
    s.valHooks[this] = s.extend(s.valHooks[this], {
      set: function(e, t) {
        if (s.isArray(t)) return e.checked = s.inArray(s(e).val(), t) >= 0
      }
    })
  });
  var N = /^(?:textarea|input|select)$/i,
  C = /^([^\.]*)?(?:\.(.+))?$/,
  k = /\bhover(\.\S+)?\b/,
  L = /^key/,
  A = /^(?:mouse|contextmenu)|click/,
  O = /^(?:focusinfocus|focusoutblur)$/,
  M = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
  _ = function(e) {
    var t = M.exec(e);
    return t && (t[1] = (t[1] || "").toLowerCase(), t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")),
    t
  },
  D = function(e, t) {
    var n = e.attributes || {};
    return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
  },
  P = function(e) {
    return s.event.special.hover ? e: e.replace(k, "mouseenter$1 mouseleave$1")
  };
  s.event = {
    add: function(e, n, r, i, o) {
      var u, a, f, l, c, h, p, d, v, m, g, y;
      if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(u = s._data(e))) return;
      r.handler && (v = r, r = v.handler),
      r.guid || (r.guid = s.guid++),
      f = u.events,
      f || (u.events = f = {}),
      a = u.handle,
      a || (u.handle = a = function(e) {
        return typeof s == "undefined" || !!e && s.event.triggered === e.type ? t: s.event.dispatch.apply(a.elem, arguments)
      },
      a.elem = e),
      n = s.trim(P(n)).split(" ");
      for (l = 0; l < n.length; l++) {
        c = C.exec(n[l]) || [],
        h = c[1],
        p = (c[2] || "").split(".").sort(),
        y = s.event.special[h] || {},
        h = (o ? y.delegateType: y.bindType) || h,
        y = s.event.special[h] || {},
        d = s.extend({
          type: h,
          origType: c[1],
          data: i,
          handler: r,
          guid: r.guid,
          selector: o,
          quick: _(o),
          namespace: p.join(".")
        },
        v),
        g = f[h];
        if (!g) {
          g = f[h] = [],
          g.delegateCount = 0;
          if (!y.setup || y.setup.call(e, i, p, a) === !1) e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a)
        }
        y.add && (y.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)),
        o ? g.splice(g.delegateCount++, 0, d) : g.push(d),
        s.event.global[h] = !0
      }
      e = null
    },
    global: {},
    remove: function(e, t, n, r, i) {
      var o = s.hasData(e) && s._data(e),
      u,
      a,
      f,
      l,
      c,
      h,
      p,
      d,
      v,
      m,
      g,
      y;
      if (!o || !(d = o.events)) return;
      t = s.trim(P(t || "")).split(" ");
      for (u = 0; u < t.length; u++) {
        a = C.exec(t[u]) || [],
        f = l = a[1],
        c = a[2];
        if (!f) {
          for (f in d) s.event.remove(e, f + t[u], n, r, !0);
          continue
        }
        v = s.event.special[f] || {},
        f = (r ? v.delegateType: v.bindType) || f,
        g = d[f] || [],
        h = g.length,
        c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
        for (p = 0; p < g.length; p++) y = g[p],
        (i || l === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (g.splice(p--, 1), y.selector && g.delegateCount--, v.remove && v.remove.call(e, y));
        g.length === 0 && h !== g.length && ((!v.teardown || v.teardown.call(e, c) === !1) && s.removeEvent(e, f, o.handle), delete d[f])
      }
      s.isEmptyObject(d) && (m = o.handle, m && (m.elem = null), s.removeData(e, ["events", "handle"], !0))
    },
    customEvent: {
      getData: !0,
      setData: !0,
      changeData: !0
    },
    trigger: function(n, r, i, o) {
      if (!i || i.nodeType !== 3 && i.nodeType !== 8) {
        var u = n.type || n,
        a = [],
        f,
        l,
        c,
        h,
        p,
        d,
        v,
        m,
        g,
        y;
        if (O.test(u + s.event.triggered)) return;
        u.indexOf("!") >= 0 && (u = u.slice(0, -1), l = !0),
        u.indexOf(".") >= 0 && (a = u.split("."), u = a.shift(), a.sort());
        if ((!i || s.event.customEvent[u]) && !s.event.global[u]) return;
        n = typeof n == "object" ? n[s.expando] ? n: new s.Event(u, n) : new s.Event(u),
        n.type = u,
        n.isTrigger = !0,
        n.exclusive = l,
        n.namespace = a.join("."),
        n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
        d = u.indexOf(":") < 0 ? "on" + u: "";
        if (!i) {
          f = s.cache;
          for (c in f) f[c].events && f[c].events[u] && s.event.trigger(n, r, f[c].handle.elem, !0);
          return
        }
        n.result = t,
        n.target || (n.target = i),
        r = r != null ? s.makeArray(r) : [],
        r.unshift(n),
        v = s.event.special[u] || {};
        if (v.trigger && v.trigger.apply(i, r) === !1) return;
        g = [[i, v.bindType || u]];
        if (!o && !v.noBubble && !s.isWindow(i)) {
          y = v.delegateType || u,
          h = O.test(y + u) ? i: i.parentNode,
          p = null;
          for (; h; h = h.parentNode) g.push([h, y]),
          p = h;
          p && p === i.ownerDocument && g.push([p.defaultView || p.parentWindow || e, y])
        }
        for (c = 0; c < g.length && !n.isPropagationStopped(); c++) h = g[c][0],
        n.type = g[c][1],
        m = (s._data(h, "events") || {})[n.type] && s._data(h, "handle"),
        m && m.apply(h, r),
        m = d && h[d],
        m && s.acceptData(h) && m.apply(h, r) === !1 && n.preventDefault();
        return n.type = u,
        !o && !n.isDefaultPrevented() && (!v._default || v._default.apply(i.ownerDocument, r) === !1) && (u !== "click" || !s.nodeName(i, "a")) && s.acceptData(i) && d && i[u] && (u !== "focus" && u !== "blur" || n.target.offsetWidth !== 0) && !s.isWindow(i) && (p = i[d], p && (i[d] = null), s.event.triggered = u, i[u](), s.event.triggered = t, p && (i[d] = p)),
        n.result
      }
      return
    },
    dispatch: function(n) {
      n = s.event.fix(n || e.event);
      var r = (s._data(this, "events") || {})[n.type] || [],
      i = r.delegateCount,
      o = [].slice.call(arguments, 0),
      u = !n.exclusive && !n.namespace,
      a = [],
      f,
      l,
      c,
      h,
      p,
      d,
      v,
      m,
      g,
      y,
      b;
      o[0] = n,
      n.delegateTarget = this;
      if (i && !n.target.disabled && (!n.button || n.type !== "click")) {
        h = s(this),
        h.context = this.ownerDocument || this;
        for (c = n.target; c != this; c = c.parentNode || this) {
          d = {},
          m = [],
          h[0] = c;
          for (f = 0; f < i; f++) g = r[f],
          y = g.selector,
          d[y] === t && (d[y] = g.quick ? D(c, g.quick) : h.is(y)),
          d[y] && m.push(g);
          m.length && a.push({
            elem: c,
            matches: m
          })
        }
      }
      r.length > i && a.push({
        elem: this,
        matches: r.slice(i)
      });
      for (f = 0; f < a.length && !n.isPropagationStopped(); f++) {
        v = a[f],
        n.currentTarget = v.elem;
        for (l = 0; l < v.matches.length && !n.isImmediatePropagationStopped(); l++) {
          g = v.matches[l];
          if (u || !n.namespace && !g.namespace || n.namespace_re && n.namespace_re.test(g.namespace)) n.data = g.data,
          n.handleObj = g,
          p = ((s.event.special[g.origType] || {}).handle || g.handler).apply(v.elem, o),
          p !== t && (n.result = p, p === !1 && (n.preventDefault(), n.stopPropagation()))
        }
      }
      return n.result
    },
    props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode: t.keyCode),
        e
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(e, r) {
        var i, s, o, u = r.button,
        a = r.fromElement;
        return e.pageX == null && r.clientX != null && (i = e.target.ownerDocument || n, s = i.documentElement, o = i.body, e.pageX = r.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = r.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)),
        !e.relatedTarget && a && (e.relatedTarget = a === e.target ? r.toElement: a),
        !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
        e
      }
    },
    fix: function(e) {
      if (e[s.expando]) return e;
      var r, i, o = e,
      u = s.event.fixHooks[e.type] || {},
      a = u.props ? this.props.concat(u.props) : this.props;
      e = s.Event(o);
      for (r = a.length; r;) i = a[--r],
      e[i] = o[i];
      return e.target || (e.target = o.srcElement || n),
      e.target.nodeType === 3 && (e.target = e.target.parentNode),
      e.metaKey === t && (e.metaKey = e.ctrlKey),
      u.filter ? u.filter(e, o) : e
    },
    special: {
      ready: {
        setup: s.bindReady
      },
      load: {
        noBubble: !0
      },
      focus: {
        delegateType: "focusin"
      },
      blur: {
        delegateType: "focusout"
      },
      beforeunload: {
        setup: function(e, t, n) {
          s.isWindow(this) && (this.onbeforeunload = n)
        },
        teardown: function(e, t) {
          this.onbeforeunload === t && (this.onbeforeunload = null)
        }
      }
    },
    simulate: function(e, t, n, r) {
      var i = s.extend(new s.Event, n, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? s.event.trigger(i, null, t) : s.event.dispatch.call(t, i),
      i.isDefaultPrevented() && n.preventDefault()
    }
  },
  s.event.handle = s.event.dispatch,
  s.removeEvent = n.removeEventListener ?
  function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  }: function(e, t, n) {
    e.detachEvent && e.detachEvent("on" + t, n)
  },
  s.Event = function(e, t) {
    if (! (this instanceof s.Event)) return new s.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? B: H) : this.type = e,
    t && s.extend(this, t),
    this.timeStamp = e && e.timeStamp || s.now(),
    this[s.expando] = !0
  },
  s.Event.prototype = {
    preventDefault: function() {
      this.isDefaultPrevented = B;
      var e = this.originalEvent;
      if (!e) return;
      e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
    stopPropagation: function() {
      this.isPropagationStopped = B;
      var e = this.originalEvent;
      if (!e) return;
      e.stopPropagation && e.stopPropagation(),
      e.cancelBubble = !0
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = B,
      this.stopPropagation()
    },
    isDefaultPrevented: H,
    isPropagationStopped: H,
    isImmediatePropagationStopped: H
  },
  s.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  },
  function(e, t) {
    s.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function(e) {
        var n = this,
        r = e.relatedTarget,
        i = e.handleObj,
        o = i.selector,
        u;
        if (!r || r !== n && !s.contains(n, r)) e.type = i.origType,
        u = i.handler.apply(this, arguments),
        e.type = t;
        return u
      }
    }
  }),
  s.support.submitBubbles || (s.event.special.submit = {
    setup: function() {
      if (s.nodeName(this, "form")) return ! 1;
      s.event.add(this, "click._submit keypress._submit",
      function(e) {
        var n = e.target,
        r = s.nodeName(n, "input") || s.nodeName(n, "button") ? n.form: t;
        r && !r._submit_attached && (s.event.add(r, "submit._submit",
        function(e) {
          this.parentNode && !e.isTrigger && s.event.simulate("submit", this.parentNode, e, !0)
        }), r._submit_attached = !0)
      })
    },
    teardown: function() {
      if (s.nodeName(this, "form")) return ! 1;
      s.event.remove(this, "._submit")
    }
  }),
  s.support.changeBubbles || (s.event.special.change = {
    setup: function() {
      if (N.test(this.nodeName)) {
        if (this.type === "checkbox" || this.type === "radio") s.event.add(this, "propertychange._change",
        function(e) {
          e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
        }),
        s.event.add(this, "click._change",
        function(e) {
          this._just_changed && !e.isTrigger && (this._just_changed = !1, s.event.simulate("change", this, e, !0))
        });
        return ! 1
      }
      s.event.add(this, "beforeactivate._change",
      function(e) {
        var t = e.target;
        N.test(t.nodeName) && !t._change_attached && (s.event.add(t, "change._change",
        function(e) {
          this.parentNode && !e.isSimulated && !e.isTrigger && s.event.simulate("change", this.parentNode, e, !0)
        }), t._change_attached = !0)
      })
    },
    handle: function(e) {
      var t = e.target;
      if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
    },
    teardown: function() {
      return s.event.remove(this, "._change"),
      N.test(this.nodeName)
    }
  }),
  s.support.focusinBubbles || s.each({
    focus: "focusin",
    blur: "focusout"
  },
  function(e, t) {
    var r = 0,
    i = function(e) {
      s.event.simulate(t, e.target, s.event.fix(e), !0)
    };
    s.event.special[t] = {
      setup: function() {
        r++===0 && n.addEventListener(e, i, !0)
      },
      teardown: function() {--r === 0 && n.removeEventListener(e, i, !0)
      }
    }
  }),
  s.fn.extend({
    on: function(e, n, r, i, o) {
      var u, a;
      if (typeof e == "object") {
        typeof n != "string" && (r = n, n = t);
        for (a in e) this.on(a, n, r, e[a], o);
        return this
      }
      r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
      if (i === !1) i = H;
      else if (!i) return this;
      return o === 1 && (u = i, i = function(e) {
        return s().off(e),
        u.apply(this, arguments)
      },
      i.guid = u.guid || (u.guid = s.guid++)),
      this.each(function() {
        s.event.add(this, e, i, r, n)
      })
    },
    one: function(e, t, n, r) {
      return this.on.call(this, e, t, n, r, 1)
    },
    off: function(e, n, r) {
      if (e && e.preventDefault && e.handleObj) {
        var i = e.handleObj;
        return s(e.delegateTarget).off(i.namespace ? i.type + "." + i.namespace: i.type, i.selector, i.handler),
        this
      }
      if (typeof e == "object") {
        for (var o in e) this.off(o, n, e[o]);
        return this
      }
      if (n === !1 || typeof n == "function") r = n,
      n = t;
      return r === !1 && (r = H),
      this.each(function() {
        s.event.remove(this, e, r, n)
      })
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    live: function(e, t, n) {
      return s(this.context).on(e, this.selector, t, n),
      this
    },
    die: function(e, t) {
      return s(this.context).off(e, this.selector || "**", t),
      this
    },
    delegate: function(e, t, n, r) {
      return this.on(t, e, n, r)
    },
    undelegate: function(e, t, n) {
      return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
    },
    trigger: function(e, t) {
      return this.each(function() {
        s.event.trigger(e, t, this)
      })
    },
    triggerHandler: function(e, t) {
      if (this[0]) return s.event.trigger(e, t, this[0], !0)
    },
    toggle: function(e) {
      var t = arguments,
      n = e.guid || s.guid++,
      r = 0,
      i = function(n) {
        var i = (s._data(this, "lastToggle" + e.guid) || 0) % r;
        return s._data(this, "lastToggle" + e.guid, i + 1),
        n.preventDefault(),
        t[i].apply(this, arguments) || !1
      };
      i.guid = n;
      while (r < t.length) t[r++].guid = n;
      return this.click(i)
    },
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }
  }),
  s.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
  function(e, t) {
    s.fn[t] = function(e, n) {
      return n == null && (n = e, e = null),
      arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    },
    s.attrFn && (s.attrFn[t] = !0),
    L.test(t) && (s.event.fixHooks[t] = s.event.keyHooks),
    A.test(t) && (s.event.fixHooks[t] = s.event.mouseHooks)
  }),
  function() {
    function S(e, t, n, i, s, o) {
      for (var u = 0,
      a = i.length; u < a; u++) {
        var f = i[u];
        if (f) {
          var l = !1;
          f = f[e];
          while (f) {
            if (f[r] === n) {
              l = i[f.sizset];
              break
            }
            f.nodeType === 1 && !o && (f[r] = n, f.sizset = u);
            if (f.nodeName.toLowerCase() === t) {
              l = f;
              break
            }
            f = f[e]
          }
          i[u] = l
        }
      }
    }
    function x(e, t, n, i, s, o) {
      for (var u = 0,
      a = i.length; u < a; u++) {
        var f = i[u];
        if (f) {
          var l = !1;
          f = f[e];
          while (f) {
            if (f[r] === n) {
              l = i[f.sizset];
              break
            }
            if (f.nodeType === 1) {
              o || (f[r] = n, f.sizset = u);
              if (typeof t != "string") {
                if (f === t) {
                  l = !0;
                  break
                }
              } else if (h.filter(t, [f]).length > 0) {
                l = f;
                break
              }
            }
            f = f[e]
          }
          i[u] = l
        }
      }
    }
    var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
    r = "sizcache" + (Math.random() + "").replace(".", ""),
    i = 0,
    o = Object.prototype.toString,
    u = !1,
    a = !0,
    f = /\\/g,
    l = /\r\n/g,
    c = /\W/; [0, 0].sort(function() {
      return a = !1,
      0
    });
    var h = function(t, r, i, s) {
      i = i || [],
      r = r || n;
      var u = r;
      if (r.nodeType !== 1 && r.nodeType !== 9) return [];
      if (!t || typeof t != "string") return i;
      var a, f, l, c, p, m, g, b, w = !0,
      E = h.isXML(r),
      S = [],
      x = t;
      do {
        e.exec(""), a = e.exec(x);
        if (a) {
          x = a[3],
          S.push(a[1]);
          if (a[2]) {
            c = a[3];
            break
          }
        }
      } while ( a );
      if (S.length > 1 && v.exec(t)) if (S.length === 2 && d.relative[S[0]]) f = T(S[0] + S[1], r, s);
      else {
        f = d.relative[S[0]] ? [r] : h(S.shift(), r);
        while (S.length) t = S.shift(),
        d.relative[t] && (t += S.shift()),
        f = T(t, f, s)
      } else { ! s && S.length > 1 && r.nodeType === 9 && !E && d.match.ID.test(S[0]) && !d.match.ID.test(S[S.length - 1]) && (p = h.find(S.shift(), r, E), r = p.expr ? h.filter(p.expr, p.set)[0] : p.set[0]);
        if (r) {
          p = s ? {
            expr: S.pop(),
            set: y(s)
          }: h.find(S.pop(), S.length !== 1 || S[0] !== "~" && S[0] !== "+" || !r.parentNode ? r: r.parentNode, E),
          f = p.expr ? h.filter(p.expr, p.set) : p.set,
          S.length > 0 ? l = y(f) : w = !1;
          while (S.length) m = S.pop(),
          g = m,
          d.relative[m] ? g = S.pop() : m = "",
          g == null && (g = r),
          d.relative[m](l, g, E)
        } else l = S = []
      }
      l || (l = f),
      l || h.error(m || t);
      if (o.call(l) === "[object Array]") if (!w) i.push.apply(i, l);
      else if (r && r.nodeType === 1) for (b = 0; l[b] != null; b++) l[b] && (l[b] === !0 || l[b].nodeType === 1 && h.contains(r, l[b])) && i.push(f[b]);
      else for (b = 0; l[b] != null; b++) l[b] && l[b].nodeType === 1 && i.push(f[b]);
      else y(l, i);
      return c && (h(c, u, i, s), h.uniqueSort(i)),
      i
    };
    h.uniqueSort = function(e) {
      if (w) {
        u = a,
        e.sort(w);
        if (u) for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
      }
      return e
    },
    h.matches = function(e, t) {
      return h(e, null, null, t)
    },
    h.matchesSelector = function(e, t) {
      return h(t, null, null, [e]).length > 0
    },
    h.find = function(e, t, n) {
      var r, i, s, o, u, a;
      if (!e) return [];
      for (i = 0, s = d.order.length; i < s; i++) {
        u = d.order[i];
        if (o = d.leftMatch[u].exec(e)) {
          a = o[1],
          o.splice(1, 1);
          if (a.substr(a.length - 1) !== "\\") {
            o[1] = (o[1] || "").replace(f, ""),
            r = d.find[u](o, t, n);
            if (r != null) {
              e = e.replace(d.match[u], "");
              break
            }
          }
        }
      }
      return r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []),
      {
        set: r,
        expr: e
      }
    },
    h.filter = function(e, n, r, i) {
      var s, o, u, a, f, l, c, p, v, m = e,
      g = [],
      y = n,
      b = n && n[0] && h.isXML(n[0]);
      while (e && n.length) {
        for (u in d.filter) if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
          l = d.filter[u],
          c = s[1],
          o = !1,
          s.splice(1, 1);
          if (c.substr(c.length - 1) === "\\") continue;
          y === g && (g = []);
          if (d.preFilter[u]) {
            s = d.preFilter[u](s, y, r, g, i, b);
            if (!s) o = a = !0;
            else if (s === !0) continue
          }
          if (s) for (p = 0; (f = y[p]) != null; p++) f && (a = l(f, s, p, y), v = i ^ a, r && a != null ? v ? o = !0 : y[p] = !1 : v && (g.push(f), o = !0));
          if (a !== t) {
            r || (y = g),
            e = e.replace(d.match[u], "");
            if (!o) return [];
            break
          }
        }
        if (e === m) {
          if (o != null) break;
          h.error(e)
        }
        m = e
      }
      return y
    },
    h.error = function(e) {
      throw new Error("Syntax error, unrecognized expression: " + e)
    };
    var p = h.getText = function(e) {
      var t, n, r = e.nodeType,
      i = "";
      if (r) {
        if (r === 1 || r === 9) {
          if (typeof e.textContent == "string") return e.textContent;
          if (typeof e.innerText == "string") return e.innerText.replace(l, "");
          for (e = e.firstChild; e; e = e.nextSibling) i += p(e)
        } else if (r === 3 || r === 4) return e.nodeValue
      } else for (t = 0; n = e[t]; t++) n.nodeType !== 8 && (i += p(n));
      return i
    },
    d = h.selectors = {
      order: ["ID", "NAME", "TAG"],
      match: {
        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
      },
      leftMatch: {},
      attrMap: {
        "class": "className",
        "for": "htmlFor"
      },
      attrHandle: {
        href: function(e) {
          return e.getAttribute("href")
        },
        type: function(e) {
          return e.getAttribute("type")
        }
      },
      relative: {
        "+": function(e, t) {
          var n = typeof t == "string",
          r = n && !c.test(t),
          i = n && !r;
          r && (t = t.toLowerCase());
          for (var s = 0,
          o = e.length,
          u; s < o; s++) if (u = e[s]) {
            while ((u = u.previousSibling) && u.nodeType !== 1);
            e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
          }
          i && h.filter(t, e, !0)
        },
        ">": function(e, t) {
          var n, r = typeof t == "string",
          i = 0,
          s = e.length;
          if (r && !c.test(t)) {
            t = t.toLowerCase();
            for (; i < s; i++) {
              n = e[i];
              if (n) {
                var o = n.parentNode;
                e[i] = o.nodeName.toLowerCase() === t ? o: !1
              }
            }
          } else {
            for (; i < s; i++) n = e[i],
            n && (e[i] = r ? n.parentNode: n.parentNode === t);
            r && h.filter(t, e, !0)
          }
        },
        "": function(e, t, n) {
          var r, s = i++,
          o = x;
          typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S),
          o("parentNode", t, s, e, r, n)
        },
        "~": function(e, t, n) {
          var r, s = i++,
          o = x;
          typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S),
          o("previousSibling", t, s, e, r, n)
        }
      },
      find: {
        ID: function(e, t, n) {
          if (typeof t.getElementById != "undefined" && !n) {
            var r = t.getElementById(e[1]);
            return r && r.parentNode ? [r] : []
          }
        },
        NAME: function(e, t) {
          if (typeof t.getElementsByName != "undefined") {
            var n = [],
            r = t.getElementsByName(e[1]);
            for (var i = 0,
            s = r.length; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
            return n.length === 0 ? null: n
          }
        },
        TAG: function(e, t) {
          if (typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e[1])
        }
      },
      preFilter: {
        CLASS: function(e, t, n, r, i, s) {
          e = " " + e[1].replace(f, "") + " ";
          if (s) return e;
          for (var o = 0,
          u; (u = t[o]) != null; o++) u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
          return ! 1
        },
        ID: function(e) {
          return e[1].replace(f, "")
        },
        TAG: function(e, t) {
          return e[1].replace(f, "").toLowerCase()
        },
        CHILD: function(e) {
          if (e[1] === "nth") {
            e[2] || h.error(e[0]),
            e[2] = e[2].replace(/^\+|\s*/g, "");
            var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
            e[2] = t[1] + (t[2] || 1) - 0,
            e[3] = t[3] - 0
          } else e[2] && h.error(e[0]);
          return e[0] = i++,
          e
        },
        ATTR: function(e, t, n, r, i, s) {
          var o = e[1] = e[1].replace(f, "");
          return ! s && d.attrMap[o] && (e[1] = d.attrMap[o]),
          e[4] = (e[4] || e[5] || "").replace(f, ""),
          e[2] === "~=" && (e[4] = " " + e[4] + " "),
          e
        },
        PSEUDO: function(t, n, r, i, s) {
          if (t[1] === "not") {
            if (! ((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
              var o = h.filter(t[3], n, r, !0 ^ s);
              return r || i.push.apply(i, o),
              !1
            }
            t[3] = h(t[3], null, null, n)
          } else if (d.match.POS.test(t[0]) || d.match.CHILD.test(t[0])) return ! 0;
          return t
        },
        POS: function(e) {
          return e.unshift(!0),
          e
        }
      },
      filters: {
        enabled: function(e) {
          return e.disabled === !1 && e.type !== "hidden"
        },
        disabled: function(e) {
          return e.disabled === !0
        },
        checked: function(e) {
          return e.checked === !0
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex,
          e.selected === !0
        },
        parent: function(e) {
          return !! e.firstChild
        },
        empty: function(e) {
          return ! e.firstChild
        },
        has: function(e, t, n) {
          return !! h(n[3], e).length
        },
        header: function(e) {
          return /h\d/i.test(e.nodeName)
        },
        text: function(e) {
          var t = e.getAttribute("type"),
          n = e.type;
          return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
        },
        radio: function(e) {
          return e.nodeName.toLowerCase() === "input" && "radio" === e.type
        },
        checkbox: function(e) {
          return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
        },
        file: function(e) {
          return e.nodeName.toLowerCase() === "input" && "file" === e.type
        },
        password: function(e) {
          return e.nodeName.toLowerCase() === "input" && "password" === e.type
        },
        submit: function(e) {
          var t = e.nodeName.toLowerCase();
          return (t === "input" || t === "button") && "submit" === e.type
        },
        image: function(e) {
          return e.nodeName.toLowerCase() === "input" && "image" === e.type
        },
        reset: function(e) {
          var t = e.nodeName.toLowerCase();
          return (t === "input" || t === "button") && "reset" === e.type
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return t === "input" && "button" === e.type || t === "button"
        },
        input: function(e) {
          return /input|select|textarea|button/i.test(e.nodeName)
        },
        focus: function(e) {
          return e === e.ownerDocument.activeElement
        }
      },
      setFilters: {
        first: function(e, t) {
          return t === 0
        },
        last: function(e, t, n, r) {
          return t === r.length - 1
        },
        even: function(e, t) {
          return t % 2 === 0
        },
        odd: function(e, t) {
          return t % 2 === 1
        },
        lt: function(e, t, n) {
          return t < n[3] - 0
        },
        gt: function(e, t, n) {
          return t > n[3] - 0
        },
        nth: function(e, t, n) {
          return n[3] - 0 === t
        },
        eq: function(e, t, n) {
          return n[3] - 0 === t
        }
      },
      filter: {
        PSEUDO: function(e, t, n, r) {
          var i = t[1],
          s = d.filters[i];
          if (s) return s(e, n, t, r);
          if (i === "contains") return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
          if (i === "not") {
            var o = t[3];
            for (var u = 0,
            a = o.length; u < a; u++) if (o[u] === e) return ! 1;
            return ! 0
          }
          h.error(i)
        },
        CHILD: function(e, t) {
          var n, i, s, o, u, a, f, l = t[1],
          c = e;
          switch (l) {
          case "only":
          case "first":
            while (c = c.previousSibling) if (c.nodeType === 1) return ! 1;
            if (l === "first") return ! 0;
            c = e;
          case "last":
            while (c = c.nextSibling) if (c.nodeType === 1) return ! 1;
            return ! 0;
          case "nth":
            n = t[2],
            i = t[3];
            if (n === 1 && i === 0) return ! 0;
            s = t[0],
            o = e.parentNode;
            if (o && (o[r] !== s || !e.nodeIndex)) {
              a = 0;
              for (c = o.firstChild; c; c = c.nextSibling) c.nodeType === 1 && (c.nodeIndex = ++a);
              o[r] = s
            }
            return f = e.nodeIndex - i,
            n === 0 ? f === 0 : f % n === 0 && f / n >= 0
          }
        },
        ID: function(e, t) {
          return e.nodeType === 1 && e.getAttribute("id") === t
        },
        TAG: function(e, t) {
          return t === "*" && e.nodeType === 1 || !!e.nodeName && e.nodeName.toLowerCase() === t
        },
        CLASS: function(e, t) {
          return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
        },
        ATTR: function(e, t) {
          var n = t[1],
          r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
          i = r + "",
          s = t[2],
          o = t[4];
          return r == null ? s === "!=": !s && h.attr ? r != null: s === "=" ? i === o: s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o: s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o: s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-": !1 : i && r !== !1
        },
        POS: function(e, t, n, r) {
          var i = t[2],
          s = d.setFilters[i];
          if (s) return s(e, n, t, r)
        }
      }
    },
    v = d.match.POS,
    m = function(e, t) {
      return "\\" + (t - 0 + 1)
    };
    for (var g in d.match) d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source),
    d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m));
    var y = function(e, t) {
      return e = Array.prototype.slice.call(e, 0),
      t ? (t.push.apply(t, e), t) : e
    };
    try {
      Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
    } catch(b) {
      y = function(e, t) {
        var n = 0,
        r = t || [];
        if (o.call(e) === "[object Array]") Array.prototype.push.apply(r, e);
        else if (typeof e.length == "number") for (var i = e.length; n < i; n++) r.push(e[n]);
        else for (; e[n]; n++) r.push(e[n]);
        return r
      }
    }
    var w, E;
    n.documentElement.compareDocumentPosition ? w = function(e, t) {
      return e === t ? (u = !0, 0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1 : 1 : e.compareDocumentPosition(t) & 4 ? -1 : 1
    }: (w = function(e, t) {
      if (e === t) return u = !0,
      0;
      if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
      var n, r, i = [],
      s = [],
      o = e.parentNode,
      a = t.parentNode,
      f = o;
      if (o === a) return E(e, t);
      if (!o) return - 1;
      if (!a) return 1;
      while (f) i.unshift(f),
      f = f.parentNode;
      f = a;
      while (f) s.unshift(f),
      f = f.parentNode;
      n = i.length,
      r = s.length;
      for (var l = 0; l < n && l < r; l++) if (i[l] !== s[l]) return E(i[l], s[l]);
      return l === n ? E(e, s[l], -1) : E(i[l], t, 1)
    },
    E = function(e, t, n) {
      if (e === t) return n;
      var r = e.nextSibling;
      while (r) {
        if (r === t) return - 1;
        r = r.nextSibling
      }
      return 1
    }),
    function() {
      var e = n.createElement("div"),
      r = "script" + (new Date).getTime(),
      i = n.documentElement;
      e.innerHTML = "<a name='" + r + "'/>",
      i.insertBefore(e, i.firstChild),
      n.getElementById(r) && (d.find.ID = function(e, n, r) {
        if (typeof n.getElementById != "undefined" && !r) {
          var i = n.getElementById(e[1]);
          return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t: []
        }
      },
      d.filter.ID = function(e, t) {
        var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
        return e.nodeType === 1 && n && n.nodeValue === t
      }),
      i.removeChild(e),
      i = e = null
    } (),
    function() {
      var e = n.createElement("div");
      e.appendChild(n.createComment("")),
      e.getElementsByTagName("*").length > 0 && (d.find.TAG = function(e, t) {
        var n = t.getElementsByTagName(e[1]);
        if (e[1] === "*") {
          var r = [];
          for (var i = 0; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
          n = r
        }
        return n
      }),
      e.innerHTML = "<a href='#'></a>",
      e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (d.attrHandle.href = function(e) {
        return e.getAttribute("href", 2)
      }),
      e = null
    } (),
    n.querySelectorAll &&
    function() {
      var e = h,
      t = n.createElement("div"),
      r = "__sizzle__";
      t.innerHTML = "<p class='TEST'></p>";
      if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) return;
      h = function(t, i, s, o) {
        i = i || n;
        if (!o && !h.isXML(i)) {
          var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
          if (u && (i.nodeType === 1 || i.nodeType === 9)) {
            if (u[1]) return y(i.getElementsByTagName(t), s);
            if (u[2] && d.find.CLASS && i.getElementsByClassName) return y(i.getElementsByClassName(u[2]), s)
          }
          if (i.nodeType === 9) {
            if (t === "body" && i.body) return y([i.body], s);
            if (u && u[3]) {
              var a = i.getElementById(u[3]);
              if (!a || !a.parentNode) return y([], s);
              if (a.id === u[3]) return y([a], s)
            }
            try {
              return y(i.querySelectorAll(t), s)
            } catch(f) {}
          } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
            var l = i,
            c = i.getAttribute("id"),
            p = c || r,
            v = i.parentNode,
            m = /^\s*[+~]/.test(t);
            c ? p = p.replace(/'/g, "\\$&") : i.setAttribute("id", p),
            m && v && (i = i.parentNode);
            try {
              if (!m || v) return y(i.querySelectorAll("[id='" + p + "'] " + t), s)
            } catch(g) {} finally {
              c || l.removeAttribute("id")
            }
          }
        }
        return e(t, i, s, o)
      };
      for (var i in e) h[i] = e[i];
      t = null
    } (),
    function() {
      var e = n.documentElement,
      t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
      if (t) {
        var r = !t.call(n.createElement("div"), "div"),
        i = !1;
        try {
          t.call(n.documentElement, "[test!='']:sizzle")
        } catch(s) {
          i = !0
        }
        h.matchesSelector = function(e, n) {
          n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
          if (!h.isXML(e)) try {
            if (i || !d.match.PSEUDO.test(n) && !/!=/.test(n)) {
              var s = t.call(e, n);
              if (s || !r || e.document && e.document.nodeType !== 11) return s
            }
          } catch(o) {}
          return h(n, null, null, [e]).length > 0
        }
      }
    } (),
    function() {
      var e = n.createElement("div");
      e.innerHTML = "<div class='test e'></div><div class='test'></div>";
      if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) return;
      e.lastChild.className = "e";
      if (e.getElementsByClassName("e").length === 1) return;
      d.order.splice(1, 0, "CLASS"),
      d.find.CLASS = function(e, t, n) {
        if (typeof t.getElementsByClassName != "undefined" && !n) return t.getElementsByClassName(e[1])
      },
      e = null
    } (),
    n.documentElement.contains ? h.contains = function(e, t) {
      return e !== t && (e.contains ? e.contains(t) : !0)
    }: n.documentElement.compareDocumentPosition ? h.contains = function(e, t) {
      return !! (e.compareDocumentPosition(t) & 16)
    }: h.contains = function() {
      return ! 1
    },
    h.isXML = function(e) {
      var t = (e ? e.ownerDocument || e: 0).documentElement;
      return t ? t.nodeName !== "HTML": !1
    };
    var T = function(e, t, n) {
      var r, i = [],
      s = "",
      o = t.nodeType ? [t] : t;
      while (r = d.match.PSEUDO.exec(e)) s += r[0],
      e = e.replace(d.match.PSEUDO, "");
      e = d.relative[e] ? e + "*": e;
      for (var u = 0,
      a = o.length; u < a; u++) h(e, o[u], i, n);
      return h.filter(s, i)
    };
    h.attr = s.attr,
    h.selectors.attrMap = {},
    s.find = h,
    s.expr = h.selectors,
    s.expr[":"] = s.expr.filters,
    s.unique = h.uniqueSort,
    s.text = h.getText,
    s.isXMLDoc = h.isXML,
    s.contains = h.contains
  } ();
  var j = /Until$/,
  F = /^(?:parents|prevUntil|prevAll)/,
  I = /,/,
  q = /^.[^:#\[\.,]*$/,
  R = Array.prototype.slice,
  U = s.expr.match.POS,
  z = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  s.fn.extend({
    find: function(e) {
      var t = this,
      n, r;
      if (typeof e != "string") return s(e).filter(function() {
        for (n = 0, r = t.length; n < r; n++) if (s.contains(t[n], this)) return ! 0
      });
      var i = this.pushStack("", "find", e),
      o,
      u,
      a;
      for (n = 0, r = this.length; n < r; n++) {
        o = i.length,
        s.find(e, this[n], i);
        if (n > 0) for (u = o; u < i.length; u++) for (a = 0; a < o; a++) if (i[a] === i[u]) {
          i.splice(u--, 1);
          break
        }
      }
      return i
    },
    has: function(e) {
      var t = s(e);
      return this.filter(function() {
        for (var e = 0,
        n = t.length; e < n; e++) if (s.contains(this, t[e])) return ! 0
      })
    },
    not: function(e) {
      return this.pushStack(X(this, e, !1), "not", e)
    },
    filter: function(e) {
      return this.pushStack(X(this, e, !0), "filter", e)
    },
    is: function(e) {
      return !! e && (typeof e == "string" ? U.test(e) ? s(e, this.context).index(this[0]) >= 0 : s.filter(e, this).length > 0 : this.filter(e).length > 0)
    },
    closest: function(e, t) {
      var n = [],
      r,
      i,
      o = this[0];
      if (s.isArray(e)) {
        var u = 1;
        while (o && o.ownerDocument && o !== t) {
          for (r = 0; r < e.length; r++) s(o).is(e[r]) && n.push({
            selector: e[r],
            elem: o,
            level: u
          });
          o = o.parentNode,
          u++
        }
        return n
      }
      var a = U.test(e) || typeof e != "string" ? s(e, t || this.context) : 0;
      for (r = 0, i = this.length; r < i; r++) {
        o = this[r];
        while (o) {
          if (a ? a.index(o) > -1 : s.find.matchesSelector(o, e)) {
            n.push(o);
            break
          }
          o = o.parentNode;
          if (!o || !o.ownerDocument || o === t || o.nodeType === 11) break
        }
      }
      return n = n.length > 1 ? s.unique(n) : n,
      this.pushStack(n, "closest", e)
    },
    index: function(e) {
      return e ? typeof e == "string" ? s.inArray(this[0], s(e)) : s.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length: -1
    },
    add: function(e, t) {
      var n = typeof e == "string" ? s(e, t) : s.makeArray(e && e.nodeType ? [e] : e),
      r = s.merge(this.get(), n);
      return this.pushStack(W(n[0]) || W(r[0]) ? r: s.unique(r))
    },
    andSelf: function() {
      return this.add(this.prevObject)
    }
  }),
  s.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && t.nodeType !== 11 ? t: null
    },
    parents: function(e) {
      return s.dir(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
      return s.dir(e, "parentNode", n)
    },
    next: function(e) {
      return s.nth(e, 2, "nextSibling")
    },
    prev: function(e) {
      return s.nth(e, 2, "previousSibling")
    },
    nextAll: function(e) {
      return s.dir(e, "nextSibling")
    },
    prevAll: function(e) {
      return s.dir(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
      return s.dir(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
      return s.dir(e, "previousSibling", n)
    },
    siblings: function(e) {
      return s.sibling(e.parentNode.firstChild, e)
    },
    children: function(e) {
      return s.sibling(e.firstChild)
    },
    contents: function(e) {
      return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: s.makeArray(e.childNodes)
    }
  },
  function(e, t) {
    s.fn[e] = function(n, r) {
      var i = s.map(this, t, n);
      return j.test(e) || (r = n),
      r && typeof r == "string" && (i = s.filter(r, i)),
      i = this.length > 1 && !z[e] ? s.unique(i) : i,
      (this.length > 1 || I.test(r)) && F.test(e) && (i = i.reverse()),
      this.pushStack(i, e, R.call(arguments).join(","))
    }
  }),
  s.extend({
    filter: function(e, t, n) {
      return n && (e = ":not(" + e + ")"),
      t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
    },
    dir: function(e, n, r) {
      var i = [],
      o = e[n];
      while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 || !s(o).is(r))) o.nodeType === 1 && i.push(o),
      o = o[n];
      return i
    },
    nth: function(e, t, n, r) {
      t = t || 1;
      var i = 0;
      for (; e; e = e[n]) if (e.nodeType === 1 && ++i === t) break;
      return e
    },
    sibling: function(e, t) {
      var n = [];
      for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
      return n
    }
  });
  var $ = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
  J = / jQuery\d+="(?:\d+|null)"/g,
  K = /^\s+/,
  Q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
  G = /<([\w:]+)/,
  Y = /<tbody/i,
  Z = /<|&#?\w+;/,
  et = /<(?:script|style)/i,
  tt = /<(?:script|object|embed|option|style)/i,
  nt = new RegExp("<(?:" + $ + ")", "i"),
  rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
  it = /\/(java|ecma)script/i,
  st = /^\s*<!(?:\[CDATA\[|\-\-)/,
  ot = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    area: [1, "<map>", "</map>"],
    _default: [0, "", ""]
  },
  ut = V(n);
  ot.optgroup = ot.option,
  ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead,
  ot.th = ot.td,
  s.support.htmlSerialize || (ot._default = [1, "div<div>", "</div>"]),
  s.fn.extend({
    text: function(e) {
      return s.isFunction(e) ? this.each(function(t) {
        var n = s(this);
        n.text(e.call(this, t, n.text()))
      }) : typeof e != "object" && e !== t ? this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e)) : s.text(this)
    },
    wrapAll: function(e) {
      if (s.isFunction(e)) return this.each(function(t) {
        s(this).wrapAll(e.call(this, t))
      });
      if (this[0]) {
        var t = s(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]),
        t.map(function() {
          var e = this;
          while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
          return e
        }).append(this)
      }
      return this
    },
    wrapInner: function(e) {
      return s.isFunction(e) ? this.each(function(t) {
        s(this).wrapInner(e.call(this, t))
      }) : this.each(function() {
        var t = s(this),
        n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e)
      })
    },
    wrap: function(e) {
      var t = s.isFunction(e);
      return this.each(function(n) {
        s(this).wrapAll(t ? e.call(this, n) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        s.nodeName(this, "body") || s(this).replaceWith(this.childNodes)
      }).end()
    },
    append: function() {
      return this.domManip(arguments, !0,
      function(e) {
        this.nodeType === 1 && this.appendChild(e)
      })
    },
    prepend: function() {
      return this.domManip(arguments, !0,
      function(e) {
        this.nodeType === 1 && this.insertBefore(e, this.firstChild)
      })
    },
    before: function() {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
      function(e) {
        this.parentNode.insertBefore(e, this)
      });
      if (arguments.length) {
        var e = s.clean(arguments);
        return e.push.apply(e, this.toArray()),
        this.pushStack(e, "before", arguments)
      }
    },
    after: function() {
      if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
      function(e) {
        this.parentNode.insertBefore(e, this.nextSibling)
      });
      if (arguments.length) {
        var e = this.pushStack(this, "after", arguments);
        return e.push.apply(e, s.clean(arguments)),
        e
      }
    },
    remove: function(e, t) {
      for (var n = 0,
      r; (r = this[n]) != null; n++) if (!e || s.filter(e, [r]).length) ! t && r.nodeType === 1 && (s.cleanData(r.getElementsByTagName("*")), s.cleanData([r])),
      r.parentNode && r.parentNode.removeChild(r);
      return this
    },
    empty: function() {
      for (var e = 0,
      t; (t = this[e]) != null; e++) {
        t.nodeType === 1 && s.cleanData(t.getElementsByTagName("*"));
        while (t.firstChild) t.removeChild(t.firstChild)
      }
      return this
    },
    clone: function(e, t) {
      return e = e == null ? !1 : e,
      t = t == null ? e: t,
      this.map(function() {
        return s.clone(this, e, t)
      })
    },
    html: function(e) {
      if (e === t) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(J, "") : null;
      if (typeof e == "string" && !et.test(e) && (s.support.leadingWhitespace || !K.test(e)) && !ot[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
        e = e.replace(Q, "<$1></$2>");
        try {
          for (var n = 0,
          r = this.length; n < r; n++) this[n].nodeType === 1 && (s.cleanData(this[n].getElementsByTagName("*")), this[n].innerHTML = e)
        } catch(i) {
          this.empty().append(e)
        }
      } else s.isFunction(e) ? this.each(function(t) {
        var n = s(this);
        n.html(e.call(this, t, n.html()))
      }) : this.empty().append(e);
      return this
    },
    replaceWith: function(e) {
      return this[0] && this[0].parentNode ? s.isFunction(e) ? this.each(function(t) {
        var n = s(this),
        r = n.html();
        n.replaceWith(e.call(this, t, r))
      }) : (typeof e != "string" && (e = s(e).detach()), this.each(function() {
        var t = this.nextSibling,
        n = this.parentNode;
        s(this).remove(),
        t ? s(t).before(e) : s(n).append(e)
      })) : this.length ? this.pushStack(s(s.isFunction(e) ? e() : e), "replaceWith", e) : this
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, n, r) {
      var i, o, u, a, f = e[0],
      l = [];
      if (!s.support.checkClone && arguments.length === 3 && typeof f == "string" && rt.test(f)) return this.each(function() {
        s(this).domManip(e, n, r, !0)
      });
      if (s.isFunction(f)) return this.each(function(i) {
        var o = s(this);
        e[0] = f.call(this, i, n ? o.html() : t),
        o.domManip(e, n, r)
      });
      if (this[0]) {
        a = f && f.parentNode,
        s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length ? i = {
          fragment: a
        }: i = s.buildFragment(e, this, l),
        u = i.fragment,
        u.childNodes.length === 1 ? o = u = u.firstChild: o = u.firstChild;
        if (o) {
          n = n && s.nodeName(o, "tr");
          for (var c = 0,
          h = this.length,
          p = h - 1; c < h; c++) r.call(n ? at(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, !0, !0) : u)
        }
        l.length && s.each(l, vt)
      }
      return this
    }
  }),
  s.buildFragment = function(e, t, r) {
    var i, o, u, a, f = e[0];
    return t && t[0] && (a = t[0].ownerDocument || t[0]),
    a.createDocumentFragment || (a = n),
    e.length === 1 && typeof f == "string" && f.length < 512 && a === n && f.charAt(0) === "<" && !tt.test(f) && (s.support.checkClone || !rt.test(f)) && (s.support.html5Clone || !nt.test(f)) && (o = !0, u = s.fragments[f], u && u !== 1 && (i = u)),
    i || (i = a.createDocumentFragment(), s.clean(e, a, i, r)),
    o && (s.fragments[f] = u ? i: 1),
    {
      fragment: i,
      cacheable: o
    }
  },
  s.fragments = {},
  s.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  },
  function(e, t) {
    s.fn[e] = function(n) {
      var r = [],
      i = s(n),
      o = this.length === 1 && this[0].parentNode;
      if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1) return i[t](this[0]),
      this;
      for (var u = 0,
      a = i.length; u < a; u++) {
        var f = (u > 0 ? this.clone(!0) : this).get();
        s(i[u])[t](f),
        r = r.concat(f)
      }
      return this.pushStack(r, e, i.selector)
    }
  }),
  s.extend({
    clone: function(e, t, n) {
      var r, i, o, u = s.support.html5Clone || !nt.test("<" + e.nodeName) ? e.cloneNode(!0) : dt(e);
      if ((!s.support.noCloneEvent || !s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e)) {
        lt(e, u),
        r = ct(e),
        i = ct(u);
        for (o = 0; r[o]; ++o) i[o] && lt(r[o], i[o])
      }
      if (t) {
        ft(e, u);
        if (n) {
          r = ct(e),
          i = ct(u);
          for (o = 0; r[o]; ++o) ft(r[o], i[o])
        }
      }
      return r = i = null,
      u
    },
    clean: function(e, t, r, i) {
      var o;
      t = t || n,
      typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || n);
      var u = [],
      a;
      for (var f = 0,
      l; (l = e[f]) != null; f++) {
        typeof l == "number" && (l += "");
        if (!l) continue;
        if (typeof l == "string") if (!Z.test(l)) l = t.createTextNode(l);
        else {
          l = l.replace(Q, "<$1></$2>");
          var c = (G.exec(l) || ["", ""])[1].toLowerCase(),
          h = ot[c] || ot._default,
          p = h[0],
          d = t.createElement("div");
          t === n ? ut.appendChild(d) : V(t).appendChild(d),
          d.innerHTML = h[1] + l + h[2];
          while (p--) d = d.lastChild;
          if (!s.support.tbody) {
            var v = Y.test(l),
            m = c === "table" && !v ? d.firstChild && d.firstChild.childNodes: h[1] === "<table>" && !v ? d.childNodes: [];
            for (a = m.length - 1; a >= 0; --a) s.nodeName(m[a], "tbody") && !m[a].childNodes.length && m[a].parentNode.removeChild(m[a])
          } ! s.support.leadingWhitespace && K.test(l) && d.insertBefore(t.createTextNode(K.exec(l)[0]), d.firstChild),
          l = d.childNodes
        }
        var g;
        if (!s.support.appendChecked) if (l[0] && typeof(g = l.length) == "number") for (a = 0; a < g; a++) pt(l[a]);
        else pt(l);
        l.nodeType ? u.push(l) : u = s.merge(u, l)
      }
      if (r) {
        o = function(e) {
          return ! e.type || it.test(e.type)
        };
        for (f = 0; u[f]; f++) if (i && s.nodeName(u[f], "script") && (!u[f].type || u[f].type.toLowerCase() === "text/javascript")) i.push(u[f].parentNode ? u[f].parentNode.removeChild(u[f]) : u[f]);
        else {
          if (u[f].nodeType === 1) {
            var y = s.grep(u[f].getElementsByTagName("script"), o);
            u.splice.apply(u, [f + 1, 0].concat(y))
          }
          r.appendChild(u[f])
        }
      }
      return u
    },
    cleanData: function(e) {
      var t, n, r = s.cache,
      i = s.event.special,
      o = s.support.deleteExpando;
      for (var u = 0,
      a; (a = e[u]) != null; u++) {
        if (a.nodeName && s.noData[a.nodeName.toLowerCase()]) continue;
        n = a[s.expando];
        if (n) {
          t = r[n];
          if (t && t.events) {
            for (var f in t.events) i[f] ? s.event.remove(a, f) : s.removeEvent(a, f, t.handle);
            t.handle && (t.handle.elem = null)
          }
          o ? delete a[s.expando] : a.removeAttribute && a.removeAttribute(s.expando),
          delete r[n]
        }
      }
    }
  });
  var mt = /alpha\([^)]*\)/i,
  gt = /opacity=([^)]*)/,
  yt = /([A-Z]|^ms)/g,
  bt = /^-?\d+(?:px)?$/i,
  wt = /^-?\d/,
  Et = /^([\-+])=([\-+.\de]+)/,
  St = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
  xt = ["Left", "Right"],
  Tt = ["Top", "Bottom"],
  Nt,
  Ct,
  kt;
  s.fn.css = function(e, n) {
    return arguments.length === 2 && n === t ? this: s.access(this, e, n, !0,
    function(e, n, r) {
      return r !== t ? s.style(e, n, r) : s.css(e, n)
    })
  },
  s.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = Nt(e, "opacity", "opacity");
            return n === "" ? "1": n
          }
          return e.style.opacity
        }
      }
    },
    cssNumber: {
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": s.support.cssFloat ? "cssFloat": "styleFloat"
    },
    style: function(e, n, r, i) {
      if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
      var o, u, a = s.camelCase(n),
      f = e.style,
      l = s.cssHooks[a];
      n = s.cssProps[a] || a;
      if (r === t) return l && "get" in l && (o = l.get(e, !1, i)) !== t ? o: f[n];
      u = typeof r,
      u === "string" && (o = Et.exec(r)) && (r = +(o[1] + 1) * +o[2] + parseFloat(s.css(e, n)), u = "number");
      if (r == null || u === "number" && isNaN(r)) return;
      u === "number" && !s.cssNumber[a] && (r += "px");
      if (!l || !("set" in l) || (r = l.set(e, r)) !== t) try {
        f[n] = r
      } catch(c) {}
    },
    css: function(e, n, r) {
      var i, o;
      n = s.camelCase(n),
      o = s.cssHooks[n],
      n = s.cssProps[n] || n,
      n === "cssFloat" && (n = "float");
      if (o && "get" in o && (i = o.get(e, !0, r)) !== t) return i;
      if (Nt) return Nt(e, n)
    },
    swap: function(e, t, n) {
      var r = {};
      for (var i in t) r[i] = e.style[i],
      e.style[i] = t[i];
      n.call(e);
      for (i in t) e.style[i] = r[i]
    }
  }),
  s.curCSS = s.css,
  s.each(["height", "width"],
  function(e, t) {
    s.cssHooks[t] = {
      get: function(e, n, r) {
        var i;
        if (n) return e.offsetWidth !== 0 ? Lt(e, t, r) : (s.swap(e, St,
        function() {
          i = Lt(e, t, r)
        }), i)
      },
      set: function(e, t) {
        if (!bt.test(t)) return t;
        t = parseFloat(t);
        if (t >= 0) return t + "px"
      }
    }
  }),
  s.support.opacity || (s.cssHooks.opacity = {
    get: function(e, t) {
      return gt.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "": t ? "1": ""
    },
    set: function(e, t) {
      var n = e.style,
      r = e.currentStyle,
      i = s.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")": "",
      o = r && r.filter || n.filter || "";
      n.zoom = 1;
      if (t >= 1 && s.trim(o.replace(mt, "")) === "") {
        n.removeAttribute("filter");
        if (r && !r.filter) return
      }
      n.filter = mt.test(o) ? o.replace(mt, i) : o + " " + i
    }
  }),
  s(function() {
    s.support.reliableMarginRight || (s.cssHooks.marginRight = {
      get: function(e, t) {
        var n;
        return s.swap(e, {
          display: "inline-block"
        },
        function() {
          t ? n = Nt(e, "margin-right", "marginRight") : n = e.style.marginRight
        }),
        n
      }
    })
  }),
  n.defaultView && n.defaultView.getComputedStyle && (Ct = function(e, t) {
    var n, r, i;
    return t = t.replace(yt, "-$1").toLowerCase(),
    (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t), n === "" && !s.contains(e.ownerDocument.documentElement, e) && (n = s.style(e, t))),
    n
  }),
  n.documentElement.currentStyle && (kt = function(e, t) {
    var n, r, i, s = e.currentStyle && e.currentStyle[t],
    o = e.style;
    return s === null && o && (i = o[t]) && (s = i),
    !bt.test(s) && wt.test(s) && (n = o.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), o.left = t === "fontSize" ? "1em": s || 0, s = o.pixelLeft + "px", o.left = n, r && (e.runtimeStyle.left = r)),
    s === "" ? "auto": s
  }),
  Nt = Ct || kt,
  s.expr && s.expr.filters && (s.expr.filters.hidden = function(e) {
    var t = e.offsetWidth,
    n = e.offsetHeight;
    return t === 0 && n === 0 || !s.support.reliableHiddenOffsets && (e.style && e.style.display || s.css(e, "display")) === "none"
  },
  s.expr.filters.visible = function(e) {
    return ! s.expr.filters.hidden(e)
  });
  var At = /%20/g,
  Ot = /\[\]$/,
  Mt = /\r?\n/g,
  _t = /#.*$/,
  Dt = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
  Pt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
  Ht = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
  Bt = /^(?:GET|HEAD)$/,
  jt = /^\/\//,
  Ft = /\?/,
  It = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  qt = /^(?:select|textarea)/i,
  Rt = /\s+/,
  Ut = /([?&])_=[^&]*/,
  zt = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
  Wt = s.fn.load,
  Xt = {},
  Vt = {},
  $t, Jt, Kt = ["*/"] + ["*"];
  try {
    $t = i.href
  } catch(Qt) {
    $t = n.createElement("a"),
    $t.href = "",
    $t = $t.href
  }
  Jt = zt.exec($t.toLowerCase()) || [],
  s.fn.extend({
    load: function(e, n, r) {
      if (typeof e != "string" && Wt) return Wt.apply(this, arguments);
      if (!this.length) return this;
      var i = e.indexOf(" ");
      if (i >= 0) {
        var o = e.slice(i, e.length);
        e = e.slice(0, i)
      }
      var u = "GET";
      n && (s.isFunction(n) ? (r = n, n = t) : typeof n == "object" && (n = s.param(n, s.ajaxSettings.traditional), u = "POST"));
      var a = this;
      return s.ajax({
        url: e,
        type: u,
        dataType: "html",
        data: n,
        complete: function(e, t, n) {
          n = e.responseText,
          e.isResolved() && (e.done(function(e) {
            n = e
          }), a.html(o ? s("<div>").append(n.replace(It, "")).find(o) : n)),
          r && a.each(r, [n, t, e])
        }
      }),
      this
    },
    serialize: function() {
      return s.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        return this.elements ? s.makeArray(this.elements) : this
      }).filter(function() {
        return this.name && !this.disabled && (this.checked || qt.test(this.nodeName) || Pt.test(this.type))
      }).map(function(e, t) {
        var n = s(this).val();
        return n == null ? null: s.isArray(n) ? s.map(n,
        function(e, n) {
          return {
            name: t.name,
            value: e.replace(Mt, "\r\n")
          }
        }) : {
          name: t.name,
          value: n.replace(Mt, "\r\n")
        }
      }).get()
    }
  }),
  s.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
  function(e, t) {
    s.fn[t] = function(e) {
      return this.on(t, e)
    }
  }),
  s.each(["get", "post"],
  function(e, n) {
    s[n] = function(e, r, i, o) {
      return s.isFunction(r) && (o = o || i, i = r, r = t),
      s.ajax({
        type: n,
        url: e,
        data: r,
        success: i,
        dataType: o
      })
    }
  }),
  s.extend({
    getScript: function(e, n) {
      return s.get(e, t, n, "script")
    },
    getJSON: function(e, t, n) {
      return s.get(e, t, n, "json")
    },
    ajaxSetup: function(e, t) {
      return t ? Zt(e, s.ajaxSettings) : (t = e, e = s.ajaxSettings),
      Zt(e, t),
      e
    },
    ajaxSettings: {
      url: $t,
      isLocal: Ht.test(Jt[1]),
      global: !0,
      type: "GET",
      contentType: "application/x-www-form-urlencoded",
      processData: !0,
      async: !0,
      accepts: {
        xml: "application/xml, text/xml",
        html: "text/html",
        text: "text/plain",
        json: "application/json, text/javascript",
        "*": Kt
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText"
      },
      converters: {
        "* text": e.String,
        "text html": !0,
        "text json": s.parseJSON,
        "text xml": s.parseXML
      },
      flatOptions: {
        context: !0,
        url: !0
      }
    },
    ajaxPrefilter: Gt(Xt),
    ajaxTransport: Gt(Vt),
    ajax: function(e, n) {
      function S(e, n, c, h) {
        if (y === 2) return;
        y = 2,
        m && clearTimeout(m),
        v = t,
        p = h || "",
        E.readyState = e > 0 ? 4 : 0;
        var d, g, w, S = n,
        x = c ? tn(r, E, c) : t,
        T,
        N;
        if (e >= 200 && e < 300 || e === 304) {
          if (r.ifModified) {
            if (T = E.getResponseHeader("Last-Modified")) s.lastModified[l] = T;
            if (N = E.getResponseHeader("Etag")) s.etag[l] = N
          }
          if (e === 304) S = "notmodified",
          d = !0;
          else try {
            g = nn(r, x),
            S = "success",
            d = !0
          } catch(C) {
            S = "parsererror",
            w = C
          }
        } else {
          w = S;
          if (!S || e) S = "error",
          e < 0 && (e = 0)
        }
        E.status = e,
        E.statusText = "" + (n || S),
        d ? u.resolveWith(i, [g, S, E]) : u.rejectWith(i, [E, S, w]),
        E.statusCode(f),
        f = t,
        b && o.trigger("ajax" + (d ? "Success": "Error"), [E, r, d ? g: w]),
        a.fireWith(i, [E, S]),
        b && (o.trigger("ajaxComplete", [E, r]), --s.active || s.event.trigger("ajaxStop"))
      }
      typeof e == "object" && (n = e, e = t),
      n = n || {};
      var r = s.ajaxSetup({},
      n),
      i = r.context || r,
      o = i !== r && (i.nodeType || i instanceof s) ? s(i) : s.event,
      u = s.Deferred(),
      a = s.Callbacks("once memory"),
      f = r.statusCode || {},
      l,
      c = {},
      h = {},
      p,
      d,
      v,
      m,
      g,
      y = 0,
      b,
      w,
      E = {
        readyState: 0,
        setRequestHeader: function(e, t) {
          if (!y) {
            var n = e.toLowerCase();
            e = h[n] = h[n] || e,
            c[e] = t
          }
          return this
        },
        getAllResponseHeaders: function() {
          return y === 2 ? p: null
        },
        getResponseHeader: function(e) {
          var n;
          if (y === 2) {
            if (!d) {
              d = {};
              while (n = Dt.exec(p)) d[n[1].toLowerCase()] = n[2]
            }
            n = d[e.toLowerCase()]
          }
          return n === t ? null: n
        },
        overrideMimeType: function(e) {
          return y || (r.mimeType = e),
          this
        },
        abort: function(e) {
          return e = e || "abort",
          v && v.abort(e),
          S(0, e),
          this
        }
      };
      u.promise(E),
      E.success = E.done,
      E.error = E.fail,
      E.complete = a.add,
      E.statusCode = function(e) {
        if (e) {
          var t;
          if (y < 2) for (t in e) f[t] = [f[t], e[t]];
          else t = e[E.status],
          E.then(t, t)
        }
        return this
      },
      r.url = ((e || r.url) + "").replace(_t, "").replace(jt, Jt[1] + "//"),
      r.dataTypes = s.trim(r.dataType || "*").toLowerCase().split(Rt),
      r.crossDomain == null && (g = zt.exec(r.url.toLowerCase()), r.crossDomain = !(!g || g[1] == Jt[1] && g[2] == Jt[2] && (g[3] || (g[1] === "http:" ? 80 : 443)) == (Jt[3] || (Jt[1] === "http:" ? 80 : 443)))),
      r.data && r.processData && typeof r.data != "string" && (r.data = s.param(r.data, r.traditional)),
      Yt(Xt, r, n, E);
      if (y === 2) return ! 1;
      b = r.global,
      r.type = r.type.toUpperCase(),
      r.hasContent = !Bt.test(r.type),
      b && s.active++===0 && s.event.trigger("ajaxStart");
      if (!r.hasContent) {
        r.data && (r.url += (Ft.test(r.url) ? "&": "?") + r.data, delete r.data),
        l = r.url;
        if (r.cache === !1) {
          var x = s.now(),
          T = r.url.replace(Ut, "$1_=" + x);
          r.url = T + (T === r.url ? (Ft.test(r.url) ? "&": "?") + "_=" + x: "")
        }
      } (r.data && r.hasContent && r.contentType !== !1 || n.contentType) && E.setRequestHeader("Content-Type", r.contentType),
      r.ifModified && (l = l || r.url, s.lastModified[l] && E.setRequestHeader("If-Modified-Since", s.lastModified[l]), s.etag[l] && E.setRequestHeader("If-None-Match", s.etag[l])),
      E.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + Kt + "; q=0.01": "") : r.accepts["*"]);
      for (w in r.headers) E.setRequestHeader(w, r.headers[w]);
      if (!r.beforeSend || r.beforeSend.call(i, E, r) !== !1 && y !== 2) {
        for (w in {
          success: 1,
          error: 1,
          complete: 1
        }) E[w](r[w]);
        v = Yt(Vt, r, n, E);
        if (!v) S( - 1, "No Transport");
        else {
          E.readyState = 1,
          b && o.trigger("ajaxSend", [E, r]),
          r.async && r.timeout > 0 && (m = setTimeout(function() {
            E.abort("timeout")
          },
          r.timeout));
          try {
            y = 1,
            v.send(c, S)
          } catch(N) {
            if (! (y < 2)) throw N;
            S( - 1, N)
          }
        }
        return E
      }
      return E.abort(),
      !1
    },
    param: function(e, n) {
      var r = [],
      i = function(e, t) {
        t = s.isFunction(t) ? t() : t,
        r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
      };
      n === t && (n = s.ajaxSettings.traditional);
      if (s.isArray(e) || e.jquery && !s.isPlainObject(e)) s.each(e,
      function() {
        i(this.name, this.value)
      });
      else for (var o in e) en(o, e[o], n, i);
      return r.join("&").replace(At, "+")
    }
  }),
  s.extend({
    active: 0,
    lastModified: {},
    etag: {}
  });
  var rn = s.now(),
  sn = /(\=)\?(&|$)|\?\?/i;
  s.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      return s.expando + "_" + rn++
    }
  }),
  s.ajaxPrefilter("json jsonp",
  function(t, n, r) {
    var i = t.contentType === "application/x-www-form-urlencoded" && typeof t.data == "string";
    if (t.dataTypes[0] === "jsonp" || t.jsonp !== !1 && (sn.test(t.url) || i && sn.test(t.data))) {
      var o, u = t.jsonpCallback = s.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
      a = e[u],
      f = t.url,
      l = t.data,
      c = "$1" + u + "$2";
      return t.jsonp !== !1 && (f = f.replace(sn, c), t.url === f && (i && (l = l.replace(sn, c)), t.data === l && (f += (/\?/.test(f) ? "&": "?") + t.jsonp + "=" + u))),
      t.url = f,
      t.data = l,
      e[u] = function(e) {
        o = [e]
      },
      r.always(function() {
        e[u] = a,
        o && s.isFunction(a) && e[u](o[0])
      }),
      t.converters["script json"] = function() {
        return o || s.error(u + " was not called"),
        o[0]
      },
      t.dataTypes[0] = "json",
      "script"
    }
  }),
  s.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /javascript|ecmascript/
    },
    converters: {
      "text script": function(e) {
        return s.globalEval(e),
        e
      }
    }
  }),
  s.ajaxPrefilter("script",
  function(e) {
    e.cache === t && (e.cache = !1),
    e.crossDomain && (e.type = "GET", e.global = !1)
  }),
  s.ajaxTransport("script",
  function(e) {
    if (e.crossDomain) {
      var r, i = n.head || n.getElementsByTagName("head")[0] || n.documentElement;
      return {
        send: function(s, o) {
          r = n.createElement("script"),
          r.async = "async",
          e.scriptCharset && (r.charset = e.scriptCharset),
          r.src = e.url,
          r.onload = r.onreadystatechange = function(e, n) {
            if (n || !r.readyState || /loaded|complete/.test(r.readyState)) r.onload = r.onreadystatechange = null,
            i && r.parentNode && i.removeChild(r),
            r = t,
            n || o(200, "success")
          },
          i.insertBefore(r, i.firstChild)
        },
        abort: function() {
          r && r.onload(0, 1)
        }
      }
    }
  });
  var on = e.ActiveXObject ?
  function() {
    for (var e in an) an[e](0, 1)
  }: !1,
  un = 0,
  an;
  s.ajaxSettings.xhr = e.ActiveXObject ?
  function() {
    return ! this.isLocal && fn() || ln()
  }: fn,
  function(e) {
    s.extend(s.support, {
      ajax: !!e,
      cors: !!e && "withCredentials" in e
    })
  } (s.ajaxSettings.xhr()),
  s.support.ajax && s.ajaxTransport(function(n) {
    if (!n.crossDomain || s.support.cors) {
      var r;
      return {
        send: function(i, o) {
          var u = n.xhr(),
          a,
          f;
          n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async);
          if (n.xhrFields) for (f in n.xhrFields) u[f] = n.xhrFields[f];
          n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType),
          !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
          try {
            for (f in i) u.setRequestHeader(f, i[f])
          } catch(l) {}
          u.send(n.hasContent && n.data || null),
          r = function(e, i) {
            var f, l, c, h, p;
            try {
              if (r && (i || u.readyState === 4)) {
                r = t,
                a && (u.onreadystatechange = s.noop, on && delete an[a]);
                if (i) u.readyState !== 4 && u.abort();
                else {
                  f = u.status,
                  c = u.getAllResponseHeaders(),
                  h = {},
                  p = u.responseXML,
                  p && p.documentElement && (h.xml = p),
                  h.text = u.responseText;
                  try {
                    l = u.statusText
                  } catch(d) {
                    l = ""
                  } ! f && n.isLocal && !n.crossDomain ? f = h.text ? 200 : 404 : f === 1223 && (f = 204)
                }
              }
            } catch(v) {
              i || o( - 1, v)
            }
            h && o(f, l, h, c)
          },
          !n.async || u.readyState === 4 ? r() : (a = ++un, on && (an || (an = {},
          s(e).unload(on)), an[a] = r), u.onreadystatechange = r)
        },
        abort: function() {
          r && r(0, 1)
        }
      }
    }
  });
  var cn = {},
  hn, pn, dn = /^(?:toggle|show|hide)$/,
  vn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
  mn, gn = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
  yn;
  s.fn.extend({
    show: function(e, t, n) {
      var r, i;
      if (e || e === 0) return this.animate(En("show", 3), e, t, n);
      for (var o = 0,
      u = this.length; o < u; o++) r = this[o],
      r.style && (i = r.style.display, !s._data(r, "olddisplay") && i === "none" && (i = r.style.display = ""), i === "" && s.css(r, "display") === "none" && s._data(r, "olddisplay", Sn(r.nodeName)));
      for (o = 0; o < u; o++) {
        r = this[o];
        if (r.style) {
          i = r.style.display;
          if (i === "" || i === "none") r.style.display = s._data(r, "olddisplay") || ""
        }
      }
      return this
    },
    hide: function(e, t, n) {
      if (e || e === 0) return this.animate(En("hide", 3), e, t, n);
      var r, i, o = 0,
      u = this.length;
      for (; o < u; o++) r = this[o],
      r.style && (i = s.css(r, "display"), i !== "none" && !s._data(r, "olddisplay") && s._data(r, "olddisplay", i));
      for (o = 0; o < u; o++) this[o].style && (this[o].style.display = "none");
      return this
    },
    _toggle: s.fn.toggle,
    toggle: function(e, t, n) {
      var r = typeof e == "boolean";
      return s.isFunction(e) && s.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function() {
        var t = r ? e: s(this).is(":hidden");
        s(this)[t ? "show": "hide"]()
      }) : this.animate(En("toggle", 3), e, t, n),
      this
    },
    fadeTo: function(e, t, n, r) {
      return this.filter(":hidden").css("opacity", 0).show().end().animate({
        opacity: t
      },
      e, n, r)
    },
    animate: function(e, t, n, r) {
      function o() {
        i.queue === !1 && s._mark(this);
        var t = s.extend({},
        i),
        n = this.nodeType === 1,
        r = n && s(this).is(":hidden"),
        o,
        u,
        a,
        f,
        l,
        c,
        h,
        p,
        d;
        t.animatedProperties = {};
        for (a in e) {
          o = s.camelCase(a),
          a !== o && (e[o] = e[a], delete e[a]),
          u = e[o],
          s.isArray(u) ? (t.animatedProperties[o] = u[1], u = e[o] = u[0]) : t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing";
          if (u === "hide" && r || u === "show" && !r) return t.complete.call(this);
          n && (o === "height" || o === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], s.css(this, "display") === "inline" && s.css(this, "float") === "none" && (!s.support.inlineBlockNeedsLayout || Sn(this.nodeName) === "inline" ? this.style.display = "inline-block": this.style.zoom = 1))
        }
        t.overflow != null && (this.style.overflow = "hidden");
        for (a in e) f = new s.fx(this, t, a),
        u = e[a],
        dn.test(u) ? (d = s._data(this, "toggle" + a) || (u === "toggle" ? r ? "show": "hide": 0), d ? (s._data(this, "toggle" + a, d === "show" ? "hide": "show"), f[d]()) : f[u]()) : (l = vn.exec(u), c = f.cur(), l ? (h = parseFloat(l[2]), p = l[3] || (s.cssNumber[a] ? "": "px"), p !== "px" && (s.style(this, a, (h || 1) + p), c = (h || 1) / f.cur() * c, s.style(this, a, c + p)), l[1] && (h = (l[1] === "-=" ? -1 : 1) * h + c), f.custom(c, h, p)) : f.custom(c, u, ""));
        return ! 0
      }
      var i = s.speed(t, n, r);
      return s.isEmptyObject(e) ? this.each(i.complete, [!1]) : (e = s.extend({},
      e), i.queue === !1 ? this.each(o) : this.queue(i.queue, o))
    },
    stop: function(e, n, r) {
      return typeof e != "string" && (r = n, n = e, e = t),
      n && e !== !1 && this.queue(e || "fx", []),
      this.each(function() {
        function u(e, t, n) {
          var i = t[n];
          s.removeData(e, n, !0),
          i.stop(r)
        }
        var t, n = !1,
        i = s.timers,
        o = s._data(this);
        r || s._unmark(!0, this);
        if (e == null) for (t in o) o[t] && o[t].stop && t.indexOf(".run") === t.length - 4 && u(this, o, t);
        else o[t = e + ".run"] && o[t].stop && u(this, o, t);
        for (t = i.length; t--;) i[t].elem === this && (e == null || i[t].queue === e) && (r ? i[t](!0) : i[t].saveState(), n = !0, i.splice(t, 1)); (!r || !n) && s.dequeue(this, e)
      })
    }
  }),
  s.each({
    slideDown: En("show", 1),
    slideUp: En("hide", 1),
    slideToggle: En("toggle", 1),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  },
  function(e, t) {
    s.fn[e] = function(e, n, r) {
      return this.animate(t, e, n, r)
    }
  }),
  s.extend({
    speed: function(e, t, n) {
      var r = e && typeof e == "object" ? s.extend({},
      e) : {
        complete: n || !n && t || s.isFunction(e) && e,
        duration: e,
        easing: n && t || t && !s.isFunction(t) && t
      };
      r.duration = s.fx.off ? 0 : typeof r.duration == "number" ? r.duration: r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default;
      if (r.queue == null || r.queue === !0) r.queue = "fx";
      return r.old = r.complete,
      r.complete = function(e) {
        s.isFunction(r.old) && r.old.call(this),
        r.queue ? s.dequeue(this, r.queue) : e !== !1 && s._unmark(this)
      },
      r
    },
    easing: {
      linear: function(e, t, n, r) {
        return n + r * e
      },
      swing: function(e, t, n, r) {
        return ( - Math.cos(e * Math.PI) / 2 + .5) * r + n
      }
    },
    timers: [],
    fx: function(e, t, n) {
      this.options = t,
      this.elem = e,
      this.prop = n,
      t.orig = t.orig || {}
    }
  }),
  s.fx.prototype = {
    update: function() {
      this.options.step && this.options.step.call(this.elem, this.now, this),
      (s.fx.step[this.prop] || s.fx.step._default)(this)
    },
    cur: function() {
      if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
        var e, t = s.css(this.elem, this.prop);
        return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t: e
      }
      return this.elem[this.prop]
    },
    custom: function(e, n, r) {
      function u(e) {
        return i.step(e)
      }
      var i = this,
      o = s.fx;
      this.startTime = yn || bn(),
      this.end = n,
      this.now = this.start = e,
      this.pos = this.state = 0,
      this.unit = r || this.unit || (s.cssNumber[this.prop] ? "": "px"),
      u.queue = this.options.queue,
      u.elem = this.elem,
      u.saveState = function() {
        i.options.hide && s._data(i.elem, "fxshow" + i.prop) === t && s._data(i.elem, "fxshow" + i.prop, i.start)
      },
      u() && s.timers.push(u) && !mn && (mn = setInterval(o.tick, o.interval))
    },
    show: function() {
      var e = s._data(this.elem, "fxshow" + this.prop);
      this.options.orig[this.prop] = e || s.style(this.elem, this.prop),
      this.options.show = !0,
      e !== t ? this.custom(this.cur(), e) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()),
      s(this.elem).show()
    },
    hide: function() {
      this.options.orig[this.prop] = s._data(this.elem, "fxshow" + this.prop) || s.style(this.elem, this.prop),
      this.options.hide = !0,
      this.custom(this.cur(), 0)
    },
    step: function(e) {
      var t, n, r, i = yn || bn(),
      o = !0,
      u = this.elem,
      a = this.options;
      if (e || i >= a.duration + this.startTime) {
        this.now = this.end,
        this.pos = this.state = 1,
        this.update(),
        a.animatedProperties[this.prop] = !0;
        for (t in a.animatedProperties) a.animatedProperties[t] !== !0 && (o = !1);
        if (o) {
          a.overflow != null && !s.support.shrinkWrapBlocks && s.each(["", "X", "Y"],
          function(e, t) {
            u.style["overflow" + t] = a.overflow[e]
          }),
          a.hide && s(u).hide();
          if (a.hide || a.show) for (t in a.animatedProperties) s.style(u, t, a.orig[t]),
          s.removeData(u, "fxshow" + t, !0),
          s.removeData(u, "toggle" + t, !0);
          r = a.complete,
          r && (a.complete = !1, r.call(u))
        }
        return ! 1
      }
      return a.duration == Infinity ? this.now = i: (n = i - this.startTime, this.state = n / a.duration, this.pos = s.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration), this.now = this.start + (this.end - this.start) * this.pos),
      this.update(),
      !0
    }
  },
  s.extend(s.fx, {
    tick: function() {
      var e, t = s.timers,
      n = 0;
      for (; n < t.length; n++) e = t[n],
      !e() && t[n] === e && t.splice(n--, 1);
      t.length || s.fx.stop()
    },
    interval: 13,
    stop: function() {
      clearInterval(mn),
      mn = null
    },
    speeds: {
      slow: 600,
      fast: 200,
      _default: 400
    },
    step: {
      opacity: function(e) {
        s.style(e.elem, "opacity", e.now)
      },
      _default: function(e) {
        e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = e.now + e.unit: e.elem[e.prop] = e.now
      }
    }
  }),
  s.each(["width", "height"],
  function(e, t) {
    s.fx.step[t] = function(e) {
      s.style(e.elem, t, Math.max(0, e.now) + e.unit)
    }
  }),
  s.expr && s.expr.filters && (s.expr.filters.animated = function(e) {
    return s.grep(s.timers,
    function(t) {
      return e === t.elem
    }).length
  });
  var xn = /^t(?:able|d|h)$/i,
  Tn = /^(?:body|html)$/i;
  "getBoundingClientRect" in n.documentElement ? s.fn.offset = function(e) {
    var t = this[0],
    n;
    if (e) return this.each(function(t) {
      s.offset.setOffset(this, e, t)
    });
    if (!t || !t.ownerDocument) return null;
    if (t === t.ownerDocument.body) return s.offset.bodyOffset(t);
    try {
      n = t.getBoundingClientRect()
    } catch(r) {}
    var i = t.ownerDocument,
    o = i.documentElement;
    if (!n || !s.contains(o, t)) return n ? {
      top: n.top,
      left: n.left
    }: {
      top: 0,
      left: 0
    };
    var u = i.body,
    a = Nn(i),
    f = o.clientTop || u.clientTop || 0,
    l = o.clientLeft || u.clientLeft || 0,
    c = a.pageYOffset || s.support.boxModel && o.scrollTop || u.scrollTop,
    h = a.pageXOffset || s.support.boxModel && o.scrollLeft || u.scrollLeft,
    p = n.top + c - f,
    d = n.left + h - l;
    return {
      top: p,
      left: d
    }
  }: s.fn.offset = function(e) {
    var t = this[0];
    if (e) return this.each(function(t) {
      s.offset.setOffset(this, e, t)
    });
    if (!t || !t.ownerDocument) return null;
    if (t === t.ownerDocument.body) return s.offset.bodyOffset(t);
    var n, r = t.offsetParent,
    i = t,
    o = t.ownerDocument,
    u = o.documentElement,
    a = o.body,
    f = o.defaultView,
    l = f ? f.getComputedStyle(t, null) : t.currentStyle,
    c = t.offsetTop,
    h = t.offsetLeft;
    while ((t = t.parentNode) && t !== a && t !== u) {
      if (s.support.fixedPosition && l.position === "fixed") break;
      n = f ? f.getComputedStyle(t, null) : t.currentStyle,
      c -= t.scrollTop,
      h -= t.scrollLeft,
      t === r && (c += t.offsetTop, h += t.offsetLeft, s.support.doesNotAddBorder && (!s.support.doesAddBorderForTableAndCells || !xn.test(t.nodeName)) && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0), i = r, r = t.offsetParent),
      s.support.subtractsBorderForOverflowNotVisible && n.overflow !== "visible" && (c += parseFloat(n.borderTopWidth) || 0, h += parseFloat(n.borderLeftWidth) || 0),
      l = n
    }
    if (l.position === "relative" || l.position === "static") c += a.offsetTop,
    h += a.offsetLeft;
    return s.support.fixedPosition && l.position === "fixed" && (c += Math.max(u.scrollTop, a.scrollTop), h += Math.max(u.scrollLeft, a.scrollLeft)),
    {
      top: c,
      left: h
    }
  },
  s.offset = {
    bodyOffset: function(e) {
      var t = e.offsetTop,
      n = e.offsetLeft;
      return s.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(s.css(e, "marginTop")) || 0, n += parseFloat(s.css(e, "marginLeft")) || 0),
      {
        top: t,
        left: n
      }
    },
    setOffset: function(e, t, n) {
      var r = s.css(e, "position");
      r === "static" && (e.style.position = "relative");
      var i = s(e),
      o = i.offset(),
      u = s.css(e, "top"),
      a = s.css(e, "left"),
      f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a]) > -1,
      l = {},
      c = {},
      h,
      p;
      f ? (c = i.position(), h = c.top, p = c.left) : (h = parseFloat(u) || 0, p = parseFloat(a) || 0),
      s.isFunction(t) && (t = t.call(e, n, o)),
      t.top != null && (l.top = t.top - o.top + h),
      t.left != null && (l.left = t.left - o.left + p),
      "using" in t ? t.using.call(e, l) : i.css(l)
    }
  },
  s.fn.extend({
    position: function() {
      if (!this[0]) return null;
      var e = this[0],
      t = this.offsetParent(),
      n = this.offset(),
      r = Tn.test(t[0].nodeName) ? {
        top: 0,
        left: 0
      }: t.offset();
      return n.top -= parseFloat(s.css(e, "marginTop")) || 0,
      n.left -= parseFloat(s.css(e, "marginLeft")) || 0,
      r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0,
      r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0,
      {
        top: n.top - r.top,
        left: n.left - r.left
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var e = this.offsetParent || n.body;
        while (e && !Tn.test(e.nodeName) && s.css(e, "position") === "static") e = e.offsetParent;
        return e
      })
    }
  }),
  s.each(["Left", "Top"],
  function(e, n) {
    var r = "scroll" + n;
    s.fn[r] = function(n) {
      var i, o;
      return n === t ? (i = this[0], i ? (o = Nn(i), o ? "pageXOffset" in o ? o[e ? "pageYOffset": "pageXOffset"] : s.support.boxModel && o.document.documentElement[r] || o.document.body[r] : i[r]) : null) : this.each(function() {
        o = Nn(this),
        o ? o.scrollTo(e ? s(o).scrollLeft() : n, e ? n: s(o).scrollTop()) : this[r] = n
      })
    }
  }),
  s.each(["Height", "Width"],
  function(e, n) {
    var r = n.toLowerCase();
    s.fn["inner" + n] = function() {
      var e = this[0];
      return e ? e.style ? parseFloat(s.css(e, r, "padding")) : this[r]() : null
    },
    s.fn["outer" + n] = function(e) {
      var t = this[0];
      return t ? t.style ? parseFloat(s.css(t, r, e ? "margin": "border")) : this[r]() : null
    },
    s.fn[r] = function(e) {
      var i = this[0];
      if (!i) return e == null ? null: this;
      if (s.isFunction(e)) return this.each(function(t) {
        var n = s(this);
        n[r](e.call(this, t, n[r]()))
      });
      if (s.isWindow(i)) {
        var o = i.document.documentElement["client" + n],
        u = i.document.body;
        return i.document.compatMode === "CSS1Compat" && o || u && u["client" + n] || o
      }
      if (i.nodeType === 9) return Math.max(i.documentElement["client" + n], i.body["scroll" + n], i.documentElement["scroll" + n], i.body["offset" + n], i.documentElement["offset" + n]);
      if (e === t) {
        var a = s.css(i, r),
        f = parseFloat(a);
        return s.isNumeric(f) ? f: a
      }
      return this.css(r, typeof e == "string" ? e: e + "px")
    }
  }),
  e.jQuery = e.$ = s,
  typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [],
  function() {
    return s
  })
} (window),
function(e, t) {
  var n;
  e.rails = n = {
    linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
    inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
    formSubmitSelector: "form",
    formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
    disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
    enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
    requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
    fileInputSelector: "input:file",
    linkDisableSelector: "a[data-disable-with]",
    CSRFProtection: function(t) {
      var n = e('meta[name="csrf-token"]').attr("content");
      n && t.setRequestHeader("X-CSRF-Token", n)
    },
    fire: function(t, n, r) {
      var i = e.Event(n);
      return t.trigger(i, r),
      i.result !== !1
    },
    confirm: function(e) {
      return confirm(e)
    },
    ajax: function(t) {
      return e.ajax(t)
    },
    handleRemote: function(r) {
      var i, s, o, u = r.data("cross-domain") || null,
      a = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType,
      f;
      if (n.fire(r, "ajax:before")) {
        if (r.is("form")) {
          i = r.attr("method"),
          s = r.attr("action"),
          o = r.serializeArray();
          var l = r.data("ujs:submit-button");
          l && (o.push(l), r.data("ujs:submit-button", null))
        } else r.is(n.inputChangeSelector) ? (i = r.data("method"), s = r.data("url"), o = r.serialize(), r.data("params") && (o = o + "&" + r.data("params"))) : (i = r.data("method"), s = r.attr("href"), o = r.data("params") || null);
        return f = {
          type: i || "GET",
          data: o,
          dataType: a,
          crossDomain: u,
          beforeSend: function(e, i) {
            return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script),
            n.fire(r, "ajax:beforeSend", [e, i])
          },
          success: function(e, t, n) {
            r.trigger("ajax:success", [e, t, n])
          },
          complete: function(e, t) {
            r.trigger("ajax:complete", [e, t])
          },
          error: function(e, t, n) {
            r.trigger("ajax:error", [e, t, n])
          }
        },
        s && (f.url = s),
        n.ajax(f)
      }
      return ! 1
    },
    handleMethod: function(n) {
      var r = n.attr("href"),
      i = n.data("method"),
      s = n.attr("target"),
      o = e("meta[name=csrf-token]").attr("content"),
      u = e("meta[name=csrf-param]").attr("content"),
      a = e('<form method="post" action="' + r + '"></form>'),
      f = '<input name="_method" value="' + i + '" type="hidden" />';
      u !== t && o !== t && (f += '<input name="' + u + '" value="' + o + '" type="hidden" />'),
      s && a.attr("target", s),
      a.hide().append(f).appendTo("body"),
      a.submit()
    },
    disableFormElements: function(t) {
      t.find(n.disableSelector).each(function() {
        var t = e(this),
        n = t.is("button") ? "html": "val";
        t.data("ujs:enable-with", t[n]()),
        t[n](t.data("disable-with")),
        t.prop("disabled", !0)
      })
    },
    enableFormElements: function(t) {
      t.find(n.enableSelector).each(function() {
        var t = e(this),
        n = t.is("button") ? "html": "val";
        t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")),
        t.prop("disabled", !1)
      })
    },
    allowAction: function(e) {
      var t = e.data("confirm"),
      r = !1,
      i;
      return t ? (n.fire(e, "confirm") && (r = n.confirm(t), i = n.fire(e, "confirm:complete", [r])), r && i) : !0
    },
    blankInputs: function(t, n, r) {
      var i = e(),
      s,
      o = n || "input,textarea";
      return t.find(o).each(function() {
        s = e(this);
        if (r ? s.val() : !s.val()) i = i.add(s)
      }),
      i.length ? i: !1
    },
    nonBlankInputs: function(e, t) {
      return n.blankInputs(e, t, !0)
    },
    stopEverything: function(t) {
      return e(t.target).trigger("ujs:everythingStopped"),
      t.stopImmediatePropagation(),
      !1
    },
    callFormSubmitBindings: function(n, r) {
      var i = n.data("events"),
      s = !0;
      return i !== t && i.submit !== t && e.each(i.submit,
      function(e, t) {
        if (typeof t.handler == "function") return s = t.handler(r)
      }),
      s
    },
    disableElement: function(e) {
      e.data("ujs:enable-with", e.html()),
      e.html(e.data("disable-with")),
      e.bind("click.railsDisable",
      function(e) {
        return n.stopEverything(e)
      })
    },
    enableElement: function(e) {
      e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)),
      e.unbind("click.railsDisable")
    }
  },
  e.ajaxPrefilter(function(e, t, r) {
    e.crossDomain || n.CSRFProtection(r)
  }),
  e(document).delegate(n.linkDisableSelector, "ajax:complete",
  function() {
    n.enableElement(e(this))
  }),
  e(document).delegate(n.linkClickSelector, "click.rails",
  function(r) {
    var i = e(this),
    s = i.data("method"),
    o = i.data("params");
    if (!n.allowAction(i)) return n.stopEverything(r);
    i.is(n.linkDisableSelector) && n.disableElement(i);
    if (i.data("remote") !== t) return (r.metaKey || r.ctrlKey) && (!s || s === "GET") && !o ? !0 : (n.handleRemote(i) === !1 && n.enableElement(i), !1);
    if (i.data("method")) return n.handleMethod(i),
    !1
  }),
  e(document).delegate(n.inputChangeSelector, "change.rails",
  function(t) {
    var r = e(this);
    return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(t)
  }),
  e(document).delegate(n.formSubmitSelector, "submit.rails",
  function(r) {
    var i = e(this),
    s = i.data("remote") !== t,
    o = n.blankInputs(i, n.requiredInputSelector),
    u = n.nonBlankInputs(i, n.fileInputSelector);
    if (!n.allowAction(i)) return n.stopEverything(r);
    if (o && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [o])) return n.stopEverything(r);
    if (s) return u ? n.fire(i, "ajax:aborted:file", [u]) : !e.support.submitBubbles && e().jquery < "1.7" && n.callFormSubmitBindings(i, r) === !1 ? n.stopEverything(r) : (n.handleRemote(i), !1);
    setTimeout(function() {
      n.disableFormElements(i)
    },
    13)
  }),
  e(document).delegate(n.formInputClickSelector, "click.rails",
  function(t) {
    var r = e(this);
    if (!n.allowAction(r)) return n.stopEverything(t);
    var i = r.attr("name"),
    s = i ? {
      name: i,
      value: r.val()
    }: null;
    r.closest("form").data("ujs:submit-button", s)
  }),
  e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails",
  function(t) {
    this == t.target && n.disableFormElements(e(this))
  }),
  e(document).delegate(n.formSubmitSelector, "ajax:complete.rails",
  function(t) {
    this == t.target && n.enableFormElements(e(this))
  })
} (jQuery),
function(e) {
  function n(e) {
    return typeof e == "object" ? e: {
      top: e,
      left: e
    }
  }
  var t = e.scrollTo = function(t, n, r) {
    e(window).scrollTo(t, n, r)
  };
  t.defaults = {
    axis: "xy",
    duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1
  },
  t.window = function(t) {
    return e(window)._scrollable()
  },
  e.fn._scrollable = function() {
    return this.map(function() {
      var t = this,
      n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
      if (!n) return t;
      var r = (t.contentWindow || t).document || t.ownerDocument || t;
      return e.browser.safari || r.compatMode == "BackCompat" ? r.body: r.documentElement
    })
  },
  e.fn.scrollTo = function(r, i, s) {
    return typeof i == "object" && (s = i, i = 0),
    typeof s == "function" && (s = {
      onAfter: s
    }),
    r == "max" && (r = 9e9),
    s = e.extend({},
    t.defaults, s),
    i = i || s.speed || s.duration,
    s.queue = s.queue && s.axis.length > 1,
    s.queue && (i /= 2),
    s.offset = n(s.offset),
    s.over = n(s.over),
    this._scrollable().each(function() {
      function h(e) {
        u.animate(l, i, s.easing, e &&
        function() {
          e.call(this, r, s)
        })
      }
      var o = this,
      u = e(o),
      a = r,
      f,
      l = {},
      c = u.is("html,body");
      switch (typeof a) {
      case "number":
      case "string":
        if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(a)) {
          a = n(a);
          break
        }
        a = e(a, this);
      case "object":
        if (a.is || a.style) f = (a = e(a)).offset()
      }
      e.each(s.axis.split(""),
      function(e, n) {
        var r = n == "x" ? "Left": "Top",
        i = r.toLowerCase(),
        p = "scroll" + r,
        d = o[p],
        v = t.max(o, n);
        if (f) l[p] = f[i] + (c ? 0 : d - u.offset()[i]),
        s.margin && (l[p] -= parseInt(a.css("margin" + r)) || 0, l[p] -= parseInt(a.css("border" + r + "Width")) || 0),
        l[p] += s.offset[i] || 0,
        s.over[i] && (l[p] += a[n == "x" ? "width": "height"]() * s.over[i]);
        else {
          var m = a[i];
          l[p] = m.slice && m.slice( - 1) == "%" ? parseFloat(m) / 100 * v: m
        }
        /^\d+$/.test(l[p]) && (l[p] = l[p] <= 0 ? 0 : Math.min(l[p], v)),
        !e && s.queue && (d != l[p] && h(s.onAfterFirst), delete l[p])
      }),
      h(s.onAfter)
    }).end()
  },
  t.max = function(t, n) {
    var r = n == "x" ? "Width": "Height",
    i = "scroll" + r;
    if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
    var s = "client" + r,
    o = t.ownerDocument.documentElement,
    u = t.ownerDocument.body;
    return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
  }
} (jQuery),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function(e, t, n, r, i) {
    return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
  },
  easeInQuad: function(e, t, n, r, i) {
    return r * (t /= i) * t + n
  },
  easeOutQuad: function(e, t, n, r, i) {
    return - r * (t /= i) * (t - 2) + n
  },
  easeInOutQuad: function(e, t, n, r, i) {
    return (t /= i / 2) < 1 ? r / 2 * t * t + n: -r / 2 * (--t * (t - 2) - 1) + n
  },
  easeInCubic: function(e, t, n, r, i) {
    return r * (t /= i) * t * t + n
  },
  easeOutCubic: function(e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t + 1) + n
  },
  easeInOutCubic: function(e, t, n, r, i) {
    return (t /= i / 2) < 1 ? r / 2 * t * t * t + n: r / 2 * ((t -= 2) * t * t + 2) + n
  },
  easeInQuart: function(e, t, n, r, i) {
    return r * (t /= i) * t * t * t + n
  },
  easeOutQuart: function(e, t, n, r, i) {
    return - r * ((t = t / i - 1) * t * t * t - 1) + n
  },
  easeInOutQuart: function(e, t, n, r, i) {
    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n: -r / 2 * ((t -= 2) * t * t * t - 2) + n
  },
  easeInQuint: function(e, t, n, r, i) {
    return r * (t /= i) * t * t * t * t + n
  },
  easeOutQuint: function(e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t * t * t + 1) + n
  },
  easeInOutQuint: function(e, t, n, r, i) {
    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n: r / 2 * ((t -= 2) * t * t * t * t + 2) + n
  },
  easeInSine: function(e, t, n, r, i) {
    return - r * Math.cos(t / i * (Math.PI / 2)) + r + n
  },
  easeOutSine: function(e, t, n, r, i) {
    return r * Math.sin(t / i * (Math.PI / 2)) + n
  },
  easeInOutSine: function(e, t, n, r, i) {
    return - r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
  },
  easeInExpo: function(e, t, n, r, i) {
    return t == 0 ? n: r * Math.pow(2, 10 * (t / i - 1)) + n
  },
  easeOutExpo: function(e, t, n, r, i) {
    return t == i ? n + r: r * ( - Math.pow(2, -10 * t / i) + 1) + n
  },
  easeInOutExpo: function(e, t, n, r, i) {
    return t == 0 ? n: t == i ? n + r: (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n: r / 2 * ( - Math.pow(2, -10 * --t) + 2) + n
  },
  easeInCirc: function(e, t, n, r, i) {
    return - r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
  },
  easeOutCirc: function(e, t, n, r, i) {
    return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
  },
  easeInOutCirc: function(e, t, n, r, i) {
    return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n: r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
  },
  easeInElastic: function(e, t, n, r, i) {
    var s = 1.70158,
    o = 0,
    u = r;
    if (t == 0) return n;
    if ((t /= i) == 1) return n + r;
    o || (o = i * .3);
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return - (u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
  },
  easeOutElastic: function(e, t, n, r, i) {
    var s = 1.70158,
    o = 0,
    u = r;
    if (t == 0) return n;
    if ((t /= i) == 1) return n + r;
    o || (o = i * .3);
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
  },
  easeInOutElastic: function(e, t, n, r, i) {
    var s = 1.70158,
    o = 0,
    u = r;
    if (t == 0) return n;
    if ((t /= i / 2) == 2) return n + r;
    o || (o = i * .3 * 1.5);
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(r / u);
    return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n: u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
  },
  easeInBack: function(e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158),
    r * (t /= i) * t * ((s + 1) * t - s) + n
  },
  easeOutBack: function(e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158),
    r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
  },
  easeInOutBack: function(e, t, n, r, i, s) {
    return s == undefined && (s = 1.70158),
    (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n: r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
  },
  easeInBounce: function(e, t, n, r, i) {
    return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
  },
  easeOutBounce: function(e, t, n, r, i) {
    return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n: t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n: t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n: r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
  },
  easeInOutBounce: function(e, t, n, r, i) {
    return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n: jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
  }
}),
function(e, t, n, r, i) {
  "$:nomunge";
  var s = e(r),
  o = "waypoint.reached",
  u = function(e, n) {
    e.element.trigger(o, n),
    e.options.triggerOnce && e.element[t]("destroy")
  },
  a = function(e, t) {
    var n = t.waypoints.length - 1;
    while (n >= 0 && t.waypoints[n].element[0] !== e[0]) n -= 1;
    return n
  },
  f = [],
  l = function(t) {
    e.extend(this, {
      element: e(t),
      oldScroll: -99999,
      waypoints: [],
      didScroll: !1,
      didResize: !1,
      doScroll: e.proxy(function() {
        var t = this.element.scrollTop(),
        r = t > this.oldScroll,
        i = this,
        s = e.grep(this.waypoints,
        function(e, n) {
          return r ? e.offset > i.oldScroll && e.offset <= t: e.offset <= i.oldScroll && e.offset > t
        }),
        o = s.length; (!this.oldScroll || !t) && e[n]("refresh"),
        this.oldScroll = t;
        if (!o) return;
        r || s.reverse(),
        e.each(s,
        function(e, t) { (t.options.continuous || e === o - 1) && u(t, [r ? "down": "up"])
        })
      },
      this)
    }),
    e(t).scroll(e.proxy(function() {
      this.didScroll || (this.didScroll = !0, r.setTimeout(e.proxy(function() {
        this.doScroll(),
        this.didScroll = !1
      },
      this), e[n].settings.scrollThrottle))
    },
    this)).resize(e.proxy(function() {
      this.didResize || (this.didResize = !0, r.setTimeout(e.proxy(function() {
        e[n]("refresh"),
        this.didResize = !1
      },
      this), e[n].settings.resizeThrottle))
    },
    this)),
    s.load(e.proxy(function() {
      this.doScroll()
    },
    this))
  },
  c = function(t) {
    var n = null;
    return e.each(f,
    function(e, r) {
      if (r.element[0] === t) return n = r,
      !1
    }),
    n
  },
  h = {
    init: function(r, i) {
      return this.each(function() {
        var s = e.fn[t].defaults.context,
        u,
        h = e(this);
        i && i.context && (s = i.context),
        e.isWindow(s) || (s = h.closest(s)[0]),
        u = c(s),
        u || (u = new l(s), f.push(u));
        var p = a(h, u),
        d = p < 0 ? e.fn[t].defaults: u.waypoints[p].options,
        v = e.extend({},
        d, i);
        v.offset = v.offset === "bottom-in-view" ?
        function() {
          var t = e.isWindow(s) ? e[n]("viewportHeight") : e(s).height();
          return t - e(this).outerHeight()
        }: v.offset,
        p < 0 ? u.waypoints.push({
          element: h,
          offset: h.offset().top,
          options: v
        }) : u.waypoints[p].options = v,
        r && h.bind(o, r)
      }),
      e[n]("refresh"),
      this
    },
    remove: function() {
      return this.each(function(t, n) {
        var r = e(n);
        e.each(f,
        function(e, t) {
          var n = a(r, t);
          n >= 0 && t.waypoints.splice(n, 1)
        })
      })
    },
    destroy: function() {
      return this.unbind(o)[t]("remove")
    }
  },
  p = {
    refresh: function() {
      e.each(f,
      function(t, r) {
        var i = e.isWindow(r.element[0]),
        s = i ? 0 : r.element.offset().top,
        o = i ? e[n]("viewportHeight") : r.element.height(),
        a = i ? 0 : r.element.scrollTop();
        e.each(r.waypoints,
        function(e, t) {
          var n = t.options.offset,
          i = t.offset;
          if (typeof t.options.offset == "function") n = t.options.offset.apply(t.element);
          else if (typeof t.options.offset == "string") {
            var f = parseFloat(t.options.offset);
            n = t.options.offset.indexOf("%") ? Math.ceil(o * (f / 100)) : f
          }
          t.offset = t.element.offset().top - s + a - n,
          r.oldScroll > i && r.oldScroll <= t.offset ? u(t, ["up"]) : r.oldScroll < i && r.oldScroll >= t.offset && u(t, ["down"])
        }),
        r.waypoints.sort(function(e, t) {
          return e.offset - t.offset
        })
      })
    },
    viewportHeight: function() {
      return r.innerHeight ? r.innerHeight: s.height()
    },
    aggregate: function() {
      var t = e();
      return e.each(f,
      function(n, r) {
        e.each(r.waypoints,
        function(e, n) {
          t = t.add(n.element)
        })
      }),
      t
    }
  };
  e.fn[t] = function(n) {
    if (h[n]) return h[n].apply(this, Array.prototype.slice.call(arguments, 1));
    if (typeof n == "function" || !n) return h.init.apply(this, arguments);
    if (typeof n == "object") return h.init.apply(this, [null, n]);
    e.error("Method " + n + " does not exist on jQuery " + t)
  },
  e.fn[t].defaults = {
    continuous: !0,
    offset: 0,
    triggerOnce: !1,
    context: r
  },
  e[n] = function(e) {
    return p[e] ? p[e].apply(this) : p.aggregate()
  },
  e[n].settings = {
    resizeThrottle: 200,
    scrollThrottle: 100
  },
  s.load(function() {
    e[n]("refresh")
  })
} (jQuery, "waypoint", "waypoints", this),
function(e, t) {
  function h(t, n, r, i) {
    var u = {
      data: i || (n ? n.data: {}),
      _wrap: n ? n._wrap: null,
      tmpl: null,
      parent: n || null,
      nodes: [],
      calls: w,
      nest: E,
      wrap: S,
      html: x,
      update: T
    };
    return t && e.extend(u, t, {
      nodes: [],
      parent: n
    }),
    r && (u.tmpl = r, u._ctnt = u._ctnt || u.tmpl(e, u), u.key = ++f, (c.length ? o: s)[f] = u),
    u
  }
  function p(t, n, i) {
    var s, o = i ? e.map(i,
    function(e) {
      return typeof e == "string" ? t.key ? e.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + r + '="' + t.key + '" $2') : e: p(e, t, e._ctnt)
    }) : t;
    return n ? o: (o = o.join(""), o.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
    function(t, n, r, i) {
      s = e(r).get(),
      b(s),
      n && (s = d(n).concat(s)),
      i && (s = s.concat(d(i)))
    }), s ? s: d(o))
  }
  function d(t) {
    var n = document.createElement("div");
    return n.innerHTML = t,
    e.makeArray(n.childNodes)
  }
  function v(t) {
    return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + e.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
    function(t, n, r, i, s, o, u) {
      var a = e.tmpl.tag[r],
      f,
      l,
      c;
      if (!a) throw "Template command not found: " + r;
      return f = a._default || [],
      o && !/\w$/.test(s) && (s += o, o = ""),
      s ? (s = g(s), u = u ? "," + g(u) + ")": o ? ")": "", l = o ? s.indexOf(".") > -1 ? s + o: "(" + s + ").call($item" + u: s, c = o ? l: "(typeof(" + s + ")==='function'?(" + s + ").call($item):(" + s + "))") : c = l = f.$1 || "null",
      i = g(i),
      "');" + a[n ? "close": "open"].split("$notnull_1").join(s ? "typeof(" + s + ")!=='undefined' && (" + s + ")!=null": "true").split("$1a").join(c).split("$1").join(l).split("$2").join(i ? i.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,
      function(e, t, n, r) {
        return r = r ? "," + r + ")": n ? ")": "",
        r ? "(" + t + ").call($item" + r: e
      }) : f.$2 || "") + "_.push('"
    }) + "');}return _;")
  }
  function m(t, n) {
    t._wrap = p(t, !0, e.isArray(n) ? n: [i.test(n) ? n: e(n).html()]).join("")
  }
  function g(e) {
    return e ? e.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
  }
  function y(e) {
    var t = document.createElement("div");
    return t.appendChild(e.cloneNode(!0)),
    t.innerHTML
  }
  function b(t) {
    function v(t) {
      function v(e) {
        e += n,
        p = a[e] = a[e] || h(p, s[p.parent.key + n] || p.parent, null, !0)
      }
      var i, u = t,
      c, p, d;
      if (d = t.getAttribute(r)) {
        while (u.parentNode && (u = u.parentNode).nodeType === 1 && !(i = u.getAttribute(r)));
        i !== d && (u = u.parentNode ? u.nodeType === 11 ? 0 : u.getAttribute(r) || 0 : 0, (p = s[d]) || (p = o[d], p = h(p, s[u] || o[u], null, !0), p.key = ++f, s[f] = p), l && v(d)),
        t.removeAttribute(r)
      } else l && (p = e.data(t, "tmplItem")) && (v(p.key), s[p.key] = p, u = e.data(t.parentNode, "tmplItem"), u = u ? u.key: 0);
      if (p) {
        c = p;
        while (c && c.key != u) c.nodes.push(t),
        c = c.parent;
        delete p._ctnt,
        delete p._wrap,
        e.data(t, "tmplItem", p)
      }
    }
    var n = "_" + l,
    i, u, a = {},
    c, p, d;
    for (c = 0, p = t.length; c < p; c++) {
      if ((i = t[c]).nodeType !== 1) continue;
      u = i.getElementsByTagName("*");
      for (d = u.length - 1; d >= 0; d--) v(u[d]);
      v(i)
    }
  }
  function w(e, t, n, r) {
    if (!e) return c.pop();
    c.push({
      _: e,
      tmpl: t,
      item: this,
      data: n,
      options: r
    })
  }
  function E(t, n, r) {
    return e.tmpl(e.template(t), n, r, this)
  }
  function S(t, n) {
    var r = t.options || {};
    return r.wrapped = n,
    e.tmpl(e.template(t.tmpl), t.data, r, t.item)
  }
  function x(t, n) {
    var r = this._wrap;
    return e.map(e(e.isArray(r) ? r.join("") : r).filter(t || "*"),
    function(e) {
      return n ? e.innerText || e.textContent: e.outerHTML || y(e)
    })
  }
  function T() {
    var t = this.nodes;
    e.tmpl(null, null, null, this).insertBefore(t[0]),
    e(t).remove()
  }
  var n = e.fn.domManip,
  r = "_tmplitem",
  i = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
  s = {},
  o = {},
  u, a = {
    key: 0,
    data: {}
  },
  f = 0,
  l = 0,
  c = [];
  e.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  },
  function(t, n) {
    e.fn[t] = function(r) {
      var i = [],
      o = e(r),
      a,
      f,
      c,
      h,
      p = this.length === 1 && this[0].parentNode;
      u = s || {};
      if (p && p.nodeType === 11 && p.childNodes.length === 1 && o.length === 1) o[n](this[0]),
      i = this;
      else {
        for (f = 0, c = o.length; f < c; f++) l = f,
        a = (f > 0 ? this.clone(!0) : this).get(),
        e.fn[n].apply(e(o[f]), a),
        i = i.concat(a);
        l = 0,
        i = this.pushStack(i, t, o.selector)
      }
      return h = u,
      u = null,
      e.tmpl.complete(h),
      i
    }
  }),
  e.fn.extend({
    tmpl: function(t, n, r) {
      return e.tmpl(this[0], t, n, r)
    },
    tmplItem: function() {
      return e.tmplItem(this[0])
    },
    template: function(t) {
      return e.template(t, this[0])
    },
    domManip: function(t, r, i, o) {
      if (t[0] && t[0].nodeType) {
        var a = e.makeArray(arguments),
        f = t.length,
        c = 0,
        h;
        while (c < f && !(h = e.data(t[c++], "tmplItem")));
        f > 1 && (a[0] = [e.makeArray(t)]),
        h && l && (a[2] = function(t) {
          e.tmpl.afterManip(this, t, i)
        }),
        n.apply(this, a)
      } else n.apply(this, arguments);
      return l = 0,
      u || e.tmpl.complete(s),
      this
    }
  }),
  e.extend({
    tmpl: function(t, n, r, i) {
      var u, f = !i;
      if (f) i = a,
      t = e.template[t] || e.template(null, t),
      o = {};
      else if (!t) return t = i.tmpl,
      s[i.key] = i,
      i.nodes = [],
      i.wrapped && m(i, i.wrapped),
      e(p(i, null, i.tmpl(e, i)));
      return t ? (typeof n == "function" && (n = n.call(i || {})), r && r.wrapped && m(r, r.wrapped), u = e.isArray(n) ? e.map(n,
      function(e) {
        return e ? h(r, i, t, e) : null
      }) : [h(r, i, t, n)], f ? e(p(i, null, u)) : u) : []
    },
    tmplItem: function(t) {
      var n;
      t instanceof e && (t = t[0]);
      while (t && t.nodeType === 1 && !(n = e.data(t, "tmplItem")) && (t = t.parentNode));
      return n || a
    },
    template: function(t, n) {
      return n ? (typeof n == "string" ? n = v(n) : n instanceof e && (n = n[0] || {}), n.nodeType && (n = e.data(n, "tmpl") || e.data(n, "tmpl", v(n.innerHTML))), typeof t == "string" ? e.template[t] = n: n) : t ? typeof t != "string" ? e.template(null, t) : e.template[t] || e.template(null, i.test(t) ? t: e(t)) : null
    },
    encode: function(e) {
      return ("" + e).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
    }
  }),
  e.extend(e.tmpl, {
    tag: {
      tmpl: {
        _default: {
          $2: "null"
        },
        open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
      },
      wrap: {
        _default: {
          $2: "null"
        },
        open: "$item.calls(_,$1,$2);_=[];",
        close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
      },
      each: {
        _default: {
          $2: "$index, $value"
        },
        open: "if($notnull_1){$.each($1a,function($2){with(this){",
        close: "}});}"
      },
      "if": {
        open: "if(($notnull_1) && $1a){",
        close: "}"
      },
      "else": {
        _default: {
          $1: "true"
        },
        open: "}else if(($notnull_1) && $1a){"
      },
      html: {
        open: "if($notnull_1){_.push($1a);}"
      },
      "=": {
        _default: {
          $1: "$data"
        },
        open: "if($notnull_1){_.push($.encode($1a));}"
      },
      "!": {
        open: ""
      }
    },
    complete: function(e) {
      s = {}
    },
    afterManip: function(n, r, i) {
      var s = r.nodeType === 11 ? e.makeArray(r.childNodes) : r.nodeType === 1 ? [r] : [];
      i.call(n, r),
      b(s),
      l++
    }
  })
} (jQuery),
function(e) {
  function t() {
    var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
    window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
  }
  e.fn.ajaxSubmit = function(n) {
    function b(i) {
      function S(e) {
        var t = e.contentWindow ? e.contentWindow.document: e.contentDocument ? e.contentDocument: e.document;
        return t
      }
      function x() {
        function u() {
          try {
            var e = S(p).readyState;
            t("state = " + e),
            e.toLowerCase() == "uninitialized" && setTimeout(u, 50)
          } catch(n) {
            t("Server abort: ", n, " (", n.name, ")"),
            L(E),
            y && clearTimeout(y),
            y = undefined
          }
        }
        var n = o.attr("target"),
        i = o.attr("action");
        s.setAttribute("target", c),
        r || s.setAttribute("method", "POST"),
        i != f.url && s.setAttribute("action", f.url),
        !f.skipEncodingOverride && (!r || /post/i.test(r)) && o.attr({
          encoding: "multipart/form-data",
          enctype: "multipart/form-data"
        }),
        f.timeout && (y = setTimeout(function() {
          g = !0,
          L(w)
        },
        f.timeout));
        var a = [];
        try {
          if (f.extraData) for (var l in f.extraData) a.push(e('<input type="hidden" name="' + l + '" />').attr("value", f.extraData[l]).appendTo(s)[0]);
          f.iframeTarget || (h.appendTo("body"), p.attachEvent ? p.attachEvent("onload", L) : p.addEventListener("load", L, !1)),
          setTimeout(u, 15),
          s.submit()
        } finally {
          s.setAttribute("action", i),
          n ? s.setAttribute("target", n) : o.removeAttr("target"),
          e(a).remove()
        }
      }
      function L(n) {
        if (d.aborted || k) return;
        try {
          N = S(p)
        } catch(r) {
          t("cannot access response document: ", r),
          n = E
        }
        if (n === w && d) {
          d.abort("timeout");
          return
        }
        if (n == E && d) {
          d.abort("server abort");
          return
        }
        if (!N || N.location.href == f.iframeSrc) if (!g) return;
        p.detachEvent ? p.detachEvent("onload", L) : p.removeEventListener("load", L, !1);
        var i = "success",
        s;
        try {
          if (g) throw "timeout";
          var o = f.dataType == "xml" || N.XMLDocument || e.isXMLDoc(N);
          t("isXml=" + o);
          if (!o && window.opera && (N.body == null || N.body.innerHTML == "") && --C) {
            t("requeing onLoad callback, DOM not available"),
            setTimeout(L, 250);
            return
          }
          var u = N.body ? N.body: N.documentElement;
          d.responseText = u ? u.innerHTML: null,
          d.responseXML = N.XMLDocument ? N.XMLDocument: N,
          o && (f.dataType = "xml"),
          d.getResponseHeader = function(e) {
            var t = {
              "content-type": f.dataType
            };
            return t[e]
          },
          u && (d.status = Number(u.getAttribute("status")) || d.status, d.statusText = u.getAttribute("statusText") || d.statusText);
          var a = f.dataType || "",
          c = /(json|script|text)/.test(a.toLowerCase());
          if (c || f.textarea) {
            var v = N.getElementsByTagName("textarea")[0];
            if (v) d.responseText = v.value,
            d.status = Number(v.getAttribute("status")) || d.status,
            d.statusText = v.getAttribute("statusText") || d.statusText;
            else if (c) {
              var m = N.getElementsByTagName("pre")[0],
              b = N.getElementsByTagName("body")[0];
              m ? d.responseText = m.textContent ? m.textContent: m.innerHTML: b && (d.responseText = b.innerHTML)
            }
          } else f.dataType == "xml" && !d.responseXML && d.responseText != null && (d.responseXML = A(d.responseText));
          try {
            T = M(d, f.dataType, f)
          } catch(n) {
            i = "parsererror",
            d.error = s = n || i
          }
        } catch(n) {
          t("error caught: ", n),
          i = "error",
          d.error = s = n || i
        }
        d.aborted && (t("upload aborted"), i = null),
        d.status && (i = d.status >= 200 && d.status < 300 || d.status === 304 ? "success": "error"),
        i === "success" ? (f.success && f.success.call(f.context, T, "success", d), l && e.event.trigger("ajaxSuccess", [d, f])) : i && (s == undefined && (s = d.statusText), f.error && f.error.call(f.context, d, i, s), l && e.event.trigger("ajaxError", [d, f, s])),
        l && e.event.trigger("ajaxComplete", [d, f]),
        l && !--e.active && e.event.trigger("ajaxStop"),
        f.complete && f.complete.call(f.context, d, i),
        k = !0,
        f.timeout && clearTimeout(y),
        setTimeout(function() {
          f.iframeTarget || h.remove(),
          d.responseXML = null
        },
        100)
      }
      var s = o[0],
      u,
      a,
      f,
      l,
      c,
      h,
      p,
      d,
      v,
      m,
      g,
      y,
      b = !!e.fn.prop;
      if (i) for (a = 0; a < i.length; a++) u = e(s[i[a].name]),
      u[b ? "prop": "attr"]("disabled", !1);
      if (e(":input[name=submit],:input[id=submit]", s).length) {
        alert('Error: Form elements must not have name or id of "submit".');
        return
      }
      f = e.extend(!0, {},
      e.ajaxSettings, n),
      f.context = f.context || f,
      c = "jqFormIO" + (new Date).getTime(),
      f.iframeTarget ? (h = e(f.iframeTarget), m = h.attr("name"), m == null ? h.attr("name", c) : c = m) : (h = e('<iframe name="' + c + '" src="' + f.iframeSrc + '" />'), h.css({
        position: "absolute",
        top: "-1000px",
        left: "-1000px"
      })),
      p = h[0],
      d = {
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: "n/a",
        getAllResponseHeaders: function() {},
        getResponseHeader: function() {},
        setRequestHeader: function() {},
        abort: function(n) {
          var r = n === "timeout" ? "timeout": "aborted";
          t("aborting upload... " + r),
          this.aborted = 1,
          h.attr("src", f.iframeSrc),
          d.error = r,
          f.error && f.error.call(f.context, d, r, n),
          l && e.event.trigger("ajaxError", [d, f, r]),
          f.complete && f.complete.call(f.context, d, r)
        }
      },
      l = f.global,
      l && !(e.active++) && e.event.trigger("ajaxStart"),
      l && e.event.trigger("ajaxSend", [d, f]);
      if (f.beforeSend && f.beforeSend.call(f.context, d, f) === !1) {
        f.global && e.active--;
        return
      }
      if (d.aborted) return;
      v = s.clk,
      v && (m = v.name, m && !v.disabled && (f.extraData = f.extraData || {},
      f.extraData[m] = v.value, v.type == "image" && (f.extraData[m + ".x"] = s.clk_x, f.extraData[m + ".y"] = s.clk_y)));
      var w = 1,
      E = 2;
      f.forceSync ? x() : setTimeout(x, 10);
      var T, N, C = 50,
      k, A = e.parseXML ||
      function(e, t) {
        return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"),
        t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t: null
      },
      O = e.parseJSON ||
      function(e) {
        return window.eval("(" + e + ")")
      },
      M = function(t, n, r) {
        var i = t.getResponseHeader("content-type") || "",
        s = n === "xml" || !n && i.indexOf("xml") >= 0,
        o = s ? t.responseXML: t.responseText;
        return s && o.documentElement.nodeName === "parsererror" && e.error && e.error("parsererror"),
        r && r.dataFilter && (o = r.dataFilter(o, n)),
        typeof o == "string" && (n === "json" || !n && i.indexOf("json") >= 0 ? o = O(o) : (n === "script" || !n && i.indexOf("javascript") >= 0) && e.globalEval(o)),
        o
      }
    }
    if (!this.length) return t("ajaxSubmit: skipping submit process - no element selected"),
    this;
    var r, i, s, o = this;
    typeof n == "function" && (n = {
      success: n
    }),
    r = this.attr("method"),
    i = this.attr("action"),
    s = typeof i == "string" ? e.trim(i) : "",
    s = s || window.location.href || "",
    s && (s = (s.match(/^([^#]+)/) || [])[1]),
    n = e.extend(!0, {
      url: s,
      success: e.ajaxSettings.success,
      type: r || "GET",
      iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
    },
    n);
    var u = {};
    this.trigger("form-pre-serialize", [this, n, u]);
    if (u.veto) return t("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),
    this;
    if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSerialize callback"),
    this;
    var a, f, l = this.formToArray(n.semantic);
    if (n.data) {
      n.extraData = n.data;
      for (a in n.data) if (n.data[a] instanceof Array) for (var c in n.data[a]) l.push({
        name: a,
        value: n.data[a][c]
      });
      else f = n.data[a],
      f = e.isFunction(f) ? f() : f,
      l.push({
        name: a,
        value: f
      })
    }
    if (n.beforeSubmit && n.beforeSubmit(l, this, n) === !1) return t("ajaxSubmit: submit aborted via beforeSubmit callback"),
    this;
    this.trigger("form-submit-validate", [l, this, n, u]);
    if (u.veto) return t("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
    this;
    var h = e.param(l);
    n.type.toUpperCase() == "GET" ? (n.url += (n.url.indexOf("?") >= 0 ? "&": "?") + h, n.data = null) : n.data = h;
    var p = [];
    n.resetForm && p.push(function() {
      o.resetForm()
    }),
    n.clearForm && p.push(function() {
      o.clearForm()
    });
    if (!n.dataType && n.target) {
      var d = n.success ||
      function() {};
      p.push(function(t) {
        var r = n.replaceTarget ? "replaceWith": "html";
        e(n.target)[r](t).each(d, arguments)
      })
    } else n.success && p.push(n.success);
    n.success = function(e, t, r) {
      var i = n.context || n;
      for (var s = 0,
      u = p.length; s < u; s++) p[s].apply(i, [e, t, r || o, o])
    };
    var v = e("input:file", this).length > 0,
    m = "multipart/form-data",
    g = o.attr("enctype") == m || o.attr("encoding") == m;
    if (n.iframe !== !1 && (v || n.iframe || g)) n.closeKeepAlive ? e.get(n.closeKeepAlive,
    function() {
      b(l)
    }) : b(l);
    else {
      if (e.browser.msie && r == "get") {
        var y = o[0].getAttribute("method");
        typeof y == "string" && (n.type = y)
      }
      e.ajax(n)
    }
    return this.trigger("form-submit-notify", [this, n]),
    this
  },
  e.fn.ajaxForm = function(n) {
    if (this.length === 0) {
      var r = {
        s: this.selector,
        c: this.context
      };
      return ! e.isReady && r.s ? (t("DOM not ready, queuing ajaxForm"), e(function() {
        e(r.s, r.c).ajaxForm(n)
      }), this) : (t("terminating; zero elements found by selector" + (e.isReady ? "": " (DOM not ready)")), this)
    }
    return this.ajaxFormUnbind().bind("submit.form-plugin",
    function(t) {
      t.isDefaultPrevented() || (t.preventDefault(), e(this).ajaxSubmit(n))
    }).bind("click.form-plugin",
    function(t) {
      var n = t.target,
      r = e(n);
      if (!r.is(":submit,input:image")) {
        var i = r.closest(":submit");
        if (i.length == 0) return;
        n = i[0]
      }
      var s = this;
      s.clk = n;
      if (n.type == "image") if (t.offsetX != undefined) s.clk_x = t.offsetX,
      s.clk_y = t.offsetY;
      else if (typeof e.fn.offset == "function") {
        var o = r.offset();
        s.clk_x = t.pageX - o.left,
        s.clk_y = t.pageY - o.top
      } else s.clk_x = t.pageX - n.offsetLeft,
      s.clk_y = t.pageY - n.offsetTop;
      setTimeout(function() {
        s.clk = s.clk_x = s.clk_y = null
      },
      100)
    })
  },
  e.fn.ajaxFormUnbind = function() {
    return this.unbind("submit.form-plugin click.form-plugin")
  },
  e.fn.formToArray = function(t) {
    var n = [];
    if (this.length === 0) return n;
    var r = this[0],
    i = t ? r.getElementsByTagName("*") : r.elements;
    if (!i) return n;
    var s, o, u, a, f, l, c;
    for (s = 0, l = i.length; s < l; s++) {
      f = i[s],
      u = f.name;
      if (!u) continue;
      if (t && r.clk && f.type == "image") { ! f.disabled && r.clk == f && (n.push({
          name: u,
          value: e(f).val()
        }), n.push({
          name: u + ".x",
          value: r.clk_x
        },
        {
          name: u + ".y",
          value: r.clk_y
        }));
        continue
      }
      a = e.fieldValue(f, !0);
      if (a && a.constructor == Array) for (o = 0, c = a.length; o < c; o++) n.push({
        name: u,
        value: a[o]
      });
      else a !== null && typeof a != "undefined" && n.push({
        name: u,
        value: a
      })
    }
    if (!t && r.clk) {
      var h = e(r.clk),
      p = h[0];
      u = p.name,
      u && !p.disabled && p.type == "image" && (n.push({
        name: u,
        value: h.val()
      }), n.push({
        name: u + ".x",
        value: r.clk_x
      },
      {
        name: u + ".y",
        value: r.clk_y
      }))
    }
    return n
  },
  e.fn.formSerialize = function(t) {
    return e.param(this.formToArray(t))
  },
  e.fn.fieldSerialize = function(t) {
    var n = [];
    return this.each(function() {
      var r = this.name;
      if (!r) return;
      var i = e.fieldValue(this, t);
      if (i && i.constructor == Array) for (var s = 0,
      o = i.length; s < o; s++) n.push({
        name: r,
        value: i[s]
      });
      else i !== null && typeof i != "undefined" && n.push({
        name: this.name,
        value: i
      })
    }),
    e.param(n)
  },
  e.fn.fieldValue = function(t) {
    for (var n = [], r = 0, i = this.length; r < i; r++) {
      var s = this[r],
      o = e.fieldValue(s, t);
      if (o === null || typeof o == "undefined" || o.constructor == Array && !o.length) continue;
      o.constructor == Array ? e.merge(n, o) : n.push(o)
    }
    return n
  },
  e.fieldValue = function(t, n) {
    var r = t.name,
    i = t.type,
    s = t.tagName.toLowerCase();
    n === undefined && (n = !0);
    if (n && (!r || t.disabled || i == "reset" || i == "button" || (i == "checkbox" || i == "radio") && !t.checked || (i == "submit" || i == "image") && t.form && t.form.clk != t || s == "select" && t.selectedIndex == -1)) return null;
    if (s == "select") {
      var o = t.selectedIndex;
      if (o < 0) return null;
      var u = [],
      a = t.options,
      f = i == "select-one",
      l = f ? o + 1 : a.length;
      for (var c = f ? o: 0; c < l; c++) {
        var h = a[c];
        if (h.selected) {
          var p = h.value;
          p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text: h.value);
          if (f) return p;
          u.push(p)
        }
      }
      return u
    }
    return e(t).val()
  },
  e.fn.clearForm = function() {
    return this.each(function() {
      e("input,select,textarea", this).clearFields()
    })
  },
  e.fn.clearFields = e.fn.clearInputs = function() {
    var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
    return this.each(function() {
      var t = this.type,
      n = this.tagName.toLowerCase();
      e.test(t) || n == "textarea" ? this.value = "": t == "checkbox" || t == "radio" ? this.checked = !1 : n == "select" && (this.selectedIndex = -1)
    })
  },
  e.fn.resetForm = function() {
    return this.each(function() { (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) && this.reset()
    })
  },
  e.fn.enable = function(e) {
    return e === undefined && (e = !0),
    this.each(function() {
      this.disabled = !e
    })
  },
  e.fn.selected = function(t) {
    return t === undefined && (t = !0),
    this.each(function() {
      var n = this.type;
      if (n == "checkbox" || n == "radio") this.checked = t;
      else if (this.tagName.toLowerCase() == "option") {
        var r = e(this).parent("select");
        t && r[0] && r[0].type == "select-one" && r.find("option").selected(!1),
        this.selected = t
      }
    })
  }
} (jQuery),
!
function(e) {
  "use strict";
  function r(e, t, n) {
    return typeof e == "function" ? e.apply(t, n) : e
  }
  var t;
  e(document).ready(function() {
    e.support.transition = function() {
      var e = document.body || document.documentElement,
      t = e.style,
      n = t.transition !== undefined || t.WebkitTransition !== undefined || t.MozTransition !== undefined || t.MsTransition !== undefined || t.OTransition !== undefined;
      return n
    } (),
    e.support.transition && (t = "TransitionEnd", e.browser.webkit ? t = "webkitTransitionEnd": e.browser.mozilla ? t = "transitionend": e.browser.opera && (t = "oTransitionEnd"))
  });
  var n = function(t, n) {
    this.$element = e(t),
    this.options = n,
    this.enabled = !0,
    this.fixTitle()
  };
  n.prototype = {
    show: function() {
      var t, n, i, s, o, u;
      if (this.hasContent() && this.enabled) {
        o = this.tip(),
        this.setContent(),
        this.options.animate && o.addClass("fade"),
        o.remove().css({
          top: 0,
          left: 0,
          display: "block"
        }).prependTo(document.body),
        t = e.extend({},
        this.$element.offset(), {
          width: this.$element[0].offsetWidth,
          height: this.$element[0].offsetHeight
        }),
        n = o[0].offsetWidth,
        i = o[0].offsetHeight,
        s = r(this.options.placement, this, [o[0], this.$element[0]]);
        switch (s) {
        case "below":
          u = {
            top: t.top + t.height + this.options.offset,
            left: t.left + t.width / 2 - n / 2
          };
          break;
        case "above":
          u = {
            top: t.top - i - this.options.offset,
            left: t.left + t.width / 2 - n / 2
          };
          break;
        case "left":
          u = {
            top: t.top + t.height / 2 - i / 2,
            left: t.left - n - this.options.offset
          };
          break;
        case "right":
          u = {
            top: t.top + t.height / 2 - i / 2,
            left: t.left + t.width + this.options.offset
          }
        }
        o.css(u).addClass(s).addClass("in")
      }
    },
    setContent: function() {
      var e = this.tip();
      e.find(".twipsy-inner")[this.options.html ? "html": "text"](this.getTitle()),
      e[0].className = "twipsy"
    },
    hide: function() {
      function i() {
        r.remove()
      }
      var n = this,
      r = this.tip();
      r.removeClass("in"),
      e.support.transition && this.$tip.hasClass("fade") ? r.bind(t, i) : i()
    },
    fixTitle: function() {
      var e = this.$element; (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
    },
    hasContent: function() {
      return this.getTitle()
    },
    getTitle: function() {
      var e, t = this.$element,
      n = this.options;
      return this.fixTitle(),
      typeof n.title == "string" ? e = t.attr(n.title == "title" ? "data-original-title": n.title) : typeof n.title == "function" && (e = n.title.call(t[0])),
      e = ("" + e).replace(/(^\s*|\s*$)/, ""),
      e || n.fallback
    },
    tip: function() {
      return this.$tip = this.$tip || e('<div class="twipsy" />').html(this.options.template)
    },
    validate: function() {
      this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    },
    enable: function() {
      this.enabled = !0
    },
    disable: function() {
      this.enabled = !1
    },
    toggleEnabled: function() {
      this.enabled = !this.enabled
    },
    toggle: function() {
      this[this.tip().hasClass("in") ? "hide": "show"]()
    }
  },
  e.fn.twipsy = function(t) {
    return e.fn.twipsy.initWith.call(this, t, n, "twipsy"),
    this
  },
  e.fn.twipsy.initWith = function(t, n, r) {
    function a(i) {
      var s = e.data(i, r);
      return s || (s = new n(i, e.fn.twipsy.elementOptions(i, t)), e.data(i, r, s)),
      s
    }
    function f() {
      var e = a(this);
      e.hoverState = "in",
      t.delayIn == 0 ? e.show() : (e.fixTitle(), setTimeout(function() {
        e.hoverState == "in" && e.show()
      },
      t.delayIn))
    }
    function l() {
      var e = a(this);
      e.hoverState = "out",
      t.delayOut == 0 ? e.hide() : setTimeout(function() {
        e.hoverState == "out" && e.hide()
      },
      t.delayOut)
    }
    var i, s, o, u;
    return t === !0 ? this.data(r) : typeof t == "string" ? (i = this.data(r), i && i[t](), this) : (t = e.extend({},
    e.fn[r].defaults, t), t.live || this.each(function() {
      a(this)
    }), t.trigger != "manual" && (s = t.live ? "live": "bind", o = t.trigger == "hover" ? "mouseenter": "focus", u = t.trigger == "hover" ? "mouseleave": "blur", this[s](o, f)[s](u, l)), this)
  },
  e.fn.twipsy.Twipsy = n,
  e.fn.twipsy.defaults = {
    animate: !0,
    delayIn: 0,
    delayOut: 0,
    fallback: "",
    placement: "above",
    html: !1,
    live: !1,
    offset: 0,
    title: "title",
    trigger: "hover",
    template: '<div class="twipsy-arrow"></div><div class="twipsy-inner"></div>'
  },
  e.fn.twipsy.rejectAttrOptions = ["title"],
  e.fn.twipsy.elementOptions = function(t, n) {
    var r = e(t).data(),
    i = e.fn.twipsy.rejectAttrOptions,
    s = i.length;
    while (s--) delete r[i[s]];
    return e.extend({},
    n, r)
  }
} (window.jQuery || window.ender),
function(e) {
  function t(t, n) {
    this.carouselRoot = e(t);
    var r = this;
    this._az = !1,
    this._by = !1,
    this._cx = "",
    this._dw = "",
    this._ev = "",
    this._fu,
    this._gt,
    this._hs,
    this._ir,
    this._jq,
    this._kp = 0,
    this.settings = e.extend({},
    e.fn.touchCarousel.defaults, n),
    this._lo = this.carouselRoot.find(".touchcarousel-container"),
    this._loStyle = this._lo[0].style,
    this._az1 = this._lo.wrap(e('<div class="touchcarousel-wrapper" />')).parent();
    var i = this._lo.find(".touchcarousel-item");
    this.items = [],
    this.numItems = i.length,
    this._by1,
    this._cx1 = !1,
    this._dw1 = 0,
    this._ev1 = 0,
    this._fu1 = 0,
    this._gt1 = !1,
    this._hs1 = !1,
    this._ir1 = !1;
    if ("ontouchstart" in window) this.hasTouch = !0,
    this._cx = "touchstart.rs",
    this._dw = "touchmove.rs",
    this._ev = "touchend.rs",
    this._jq1 = this.settings.baseTouchFriction;
    else {
      this.hasTouch = !1,
      this._jq1 = this.settings.baseMouseFriction;
      if (this.settings.dragUsingMouse) {
        this._cx = "mousedown.rs",
        this._dw = "mousemove.rs",
        this._ev = "mouseup.rs",
        this._kp1,
        this._lo1;
        var s = e.browser;
        s.msie || s.opera ? this._kp1 = this._lo1 = "move": s.mozilla && (this._kp1 = "-moz-grab", this._lo1 = "-moz-grabbing"),
        this._mn1()
      } else this._az1.addClass("auto-cursor")
    } (this.hasTouch || this.settings.useWebkit3d) && "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix && (this._lo.css({
      "-webkit-transform-origin": "0 0",
      "-webkit-transform": "translateZ(0)"
    }), this._ir1 = !0),
    this._ir1 ? (this._az2 = "-webkit-transform", this._by2 = "translate3d(", this._cx2 = "px, 0, 0)") : (this._az2 = "left", this._by2 = "", this._cx2 = "px"),
    this.hasTouch && (this.settings.directionNavAutoHide = !1),
    this.settings.directionNav || (this.settings.loopItems ? (this._dw2 = !0, this._ev2 = !0) : (this._dw2 = !1, this._ev2 = !1), this.settings.loopItems = !0);
    var o, u, a, f, l = 0;
    i.eq(this.numItems - 1).addClass("last"),
    i.each(function(t) {
      u = e(this),
      o = {},
      o.item = u,
      o.index = t,
      o.posX = l,
      o.width = u.outerWidth(!0) || r.settings.itemFallbackWidth,
      l += o.width;
      if (!this.hasTouch) u.find("a").bind("click.touchcarousel",
      function(e) {
        if (r._cx1) return e.preventDefault(),
        !1
      });
      else {
        var n = u.find("a"),
        i;
        n.each(function() {
          i = e(this),
          i.data("tc-href", i.attr("href")),
          i.data("tc-target", i.attr("target")),
          i.attr("href", "#"),
          i.bind("click",
          function(t) {
            t.preventDefault();
            if (r._cx1) return ! 1;
            var n = e(this).data("tc-href"),
            i = e(this).data("tc-target"); ! i || i.toLowerCase() === "_fu2" ? window.location.href = n: window.open(n)
          })
        })
      }
      u.find(".non-draggable").bind(r._cx,
      function(e) {
        r._cx1 = !1,
        e.stopImmediatePropagation()
      }),
      r.items.push(o)
    }),
    this._gt2 = this._fu = l,
    this.settings.itemsPerMove > 0 ? this._hs2 = this.settings.itemsPerMove: this._hs2 = 1;
    if (this.settings.pagingNav) {
      this.settings.snapToItems = !0,
      this._ir2 = !0,
      this._jq2 = Math.ceil(this.numItems / this._hs2),
      this._kp2 = 0;
      if (this.settings.pagingNavControls) {
        this._lo2 = e('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');
        var c = this._lo2.find(".tc-paging-centerer-inside"),
        h;
        for (var p = 1; p <= this._jq2; p++) h = e('<a class="tc-paging-item" href="#">' + p + "</a>").data("tc-id", p),
        p === this._kp2 + 1 && h.addClass("current"),
        c.append(h);
        this._mn2 = c.find(".tc-paging-item").click(function(t) {
          t.preventDefault(),
          r.goTo((e(t.currentTarget).data("tc-id") - 1) * r._hs2)
        }),
        this._az1.after(this._lo2)
      }
    } else this._ir2 = !1;
    this._lo.css({
      width: l
    }),
    this.settings.directionNav && (this._az1.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>"), this.arrowLeft = this.carouselRoot.find(".arrow-holder.left"), this.arrowRight = this.carouselRoot.find(".arrow-holder.right"), this.arrowLeft.length < 1 || this.arrowRight.length < 1 ? this.settings.directionNav = !1 : this.settings.directionNavAutoHide && (this.arrowLeft.hide(), this.arrowRight.hide(), this.carouselRoot.one("mousemove.arrowshover",
    function() {
      r.arrowLeft.fadeIn("fast"),
      r.arrowRight.fadeIn("fast")
    }), this.carouselRoot.hover(function() {
      r.arrowLeft.fadeIn("fast"),
      r.arrowRight.fadeIn("fast")
    },
    function() {
      r.arrowLeft.fadeOut("fast"),
      r.arrowRight.fadeOut("fast")
    })), this._by3(0), this.settings.directionNav && (this.arrowRight.click(function(e) {
      e.preventDefault(),
      (r.settings.loopItems && !r._gt1 || !r._ev2) && r.next()
    }), this.arrowLeft.click(function(e) {
      e.preventDefault(),
      (r.settings.loopItems && !r._gt1 || !r._dw2) && r.prev()
    }))),
    this.carouselWidth,
    this._cx3 = "onorientationchange" in window ? "orientationchange.touchcarousel": "resize.touchcarousel";
    var d;
    e(window).bind(this._cx3,
    function() {
      d && clearTimeout(d),
      d = setTimeout(function() {
        r.updateCarouselSize(!1)
      },
      100)
    }),
    this.settings.scrollbar ? (this._dw3 = e("<div class='scrollbar-holder'><div class='scrollbar" + (this.settings.scrollbarTheme.toLowerCase() === "light" ? " light": " dark") + "'></div></div>"), this._dw3.appendTo(this.carouselRoot), this.scrollbarJQ = this._dw3.find(".scrollbar"), this._ev3 = "", this._fu3 = this.scrollbarJQ[0].style, this._gt3 = 0, this.settings.scrollbarAutoHide ? (this._hs3 = !1, this.scrollbarJQ.css("opacity", 0)) : this._hs3 = !0) : this.settings.scrollbarAutoHide = !1,
    this.updateCarouselSize(!0),
    this._az1.bind(this._cx,
    function(e) {
      r._ir3(e)
    }),
    this.settings.autoplay && this.settings.autoplayDelay > 0 ? (this._jq3 = !1, this.autoplayTimer = "", this.wasAutoplayRunning = !0, this.hasTouch || this.carouselRoot.hover(function() {
      r._jq3 = !0,
      r._kp3()
    },
    function() {
      r._jq3 = !1,
      r._lo3()
    }), this.autoplay = !0, this._mn3()) : this.autoplay = !1,
    this.settings.keyboardNav && e(document).bind("keydown.touchcarousel",
    function(e) {
      r._gt1 || (e.keyCode === 37 ? r.prev() : e.keyCode === 39 && r.next())
    }),
    this.carouselRoot.css("overflow", "visible")
  }
  t.prototype = {
    goTo: function(e, t) {
      var n = this.items[e];
      if (n) { ! t && this.autoplay && this.settings.autoplayStopAtAction && this.stopAutoplay(),
        this._az4(e),
        this.endPos = this._by4();
        var r = -n.posX;
        r > 0 ? r = 0 : r < this.carouselWidth - this._gt2 && (r = this.carouselWidth - this._gt2),
        this.animateTo(r, this.settings.transitionSpeed, "easeInOutSine")
      }
    },
    next: function(e) {
      var t = this._by4(),
      n = this._cx4(t).index;
      if (!this._ir2) n += this._hs2,
      this.settings.loopItems && t <= this.carouselWidth - this._gt2 && (n = 0),
      n > this.numItems - 1 && (n = this.numItems - 1);
      else {
        var r = this._kp2 + 1;
        r > this._jq2 - 1 ? this.settings.loopItems ? n = 0 : n = (this._jq2 - 1) * this._hs2: n = r * this._hs2
      }
      this.goTo(n, e)
    },
    prev: function(e) {
      var t = this._by4(),
      n = this._cx4(t).index;
      if (!this._ir2) n -= this._hs2,
      n < 0 && (this.settings.loopItems ? t < 0 ? n = 0 : n = this.numItems - 1 : n = 0);
      else {
        var r = this._kp2 - 1;
        r < 0 ? this.settings.loopItems ? n = (this._jq2 - 1) * this._hs2: n = 0 : n = r * this._hs2
      }
      this.goTo(n, e)
    },
    getCurrentId: function() {
      var e = this._cx4(this._by4()).index;
      return e
    },
    setXPos: function(e, t) {
      t ? this._fu3[this._az2] = this._by2 + e + this._cx2: this._loStyle[this._az2] = this._by2 + e + this._cx2
    },
    stopAutoplay: function() {
      this._kp3(),
      this.autoplay = !1,
      this.wasAutoplayRunning = !1
    },
    resumeAutoplay: function() {
      this.autoplay = !0,
      this.wasAutoplayRunning || this._lo3()
    },
    updateCarouselSize: function(e) {
      var t = this;
      this.carouselWidth = this.carouselRoot.width();
      if (this.settings.scrollToLast) {
        var n = 0;
        if (this._ir2) {
          var r = this.numItems % this._hs2;
          if (r > 0) for (var i = this.numItems - r; i < this.numItems; i++) n += this.items[i].width;
          else n = this.carouselWidth
        } else n = this.items[this.numItems - 1].width;
        this._gt2 = this._fu + this.carouselWidth - n
      } else this._gt2 = this._fu;
      if (this.settings.scrollbar) {
        var s = Math.round(this._dw3.width() / (this._gt2 / this.carouselWidth));
        this.scrollbarJQ.css("width", s),
        this._gt3 = this._dw3.width() - s
      }
      if (!this.settings.scrollToLast) {
        if (this.carouselWidth >= this._fu) {
          this._hs1 = !0,
          this.settings.loopItems || (this._ev2 = !0, this.arrowRight.addClass("disabled"), this._dw2 = !0, this.arrowLeft.addClass("disabled")),
          this.setXPos(0);
          return
        }
        this._hs1 && (this._hs1 = !1, this._ev2 = !1, this._dw2 = !1, this.arrowRight.removeClass("disabled"), this.arrowLeft.removeClass("disabled"))
      }
      if (!e) {
        var o = this.endPos = this._by4();
        o > 0 ? o = 0 : o < this.carouselWidth - this._gt2 && (o = this.carouselWidth - this._gt2),
        this.animateTo(o, 300, "easeInOutSine")
      }
    },
    animateTo: function(t, n, r, i, s, o, u) {
      function b() {
        a._by = !1,
        a._mn3(),
        a.settings.scrollbarAutoHide && a._fu4(),
        a.settings.onAnimComplete !== null && a.settings.onAnimComplete.call(a)
      }
      this.settings.onAnimStart !== null && this.settings.onAnimStart.call(this),
      this.autoplay && this.autoplayTimer && (this.wasAutoplayRunning = !0, this._kp3()),
      this._dw4();
      var a = this,
      f = this.settings.scrollbar,
      l = a._az2,
      c = a._by2,
      h = a._cx2,
      p = {
        containerPos: this.endPos
      },
      d = {
        containerPos: t
      },
      v = {
        containerPos: s
      },
      s = i ? s: t,
      m = a._loStyle;
      a._by = !0;
      if (f) {
        var g = this._fu3,
        y = a._gt2 - a.carouselWidth;
        this.settings.scrollbarAutoHide && (this._hs3 || this._ev4())
      }
      this._by3(s),
      this._by1 = e(p).animate(d, {
        duration: n,
        easing: r,
        step: function() {
          f && (g[l] = c + Math.round(a._gt3 * ( - this.containerPos / y)) + h),
          m[l] = c + Math.round(this.containerPos) + h
        },
        complete: function() {
          i ? a._by1 = e(d).animate(v, {
            duration: o,
            easing: u,
            step: function() {
              f && (g[l] = c + Math.round(a._gt3 * ( - this.containerPos / y)) + h),
              m[l] = c + Math.round(this.containerPos) + h
            },
            complete: function() {
              f && (g[l] = c + Math.round(a._gt3 * ( - v.containerPos / y)) + h),
              m[l] = c + Math.round(v.containerPos) + h,
              b()
            }
          }) : (f && (g[l] = c + Math.round(a._gt3 * ( - d.containerPos / y)) + h), m[l] = c + Math.round(d.containerPos) + h, b())
        }
      })
    },
    destroy: function() {
      this.stopAutoplay(),
      this._az1.unbind(this._cx),
      e(document).unbind(this._dw).unbind(this._ev),
      e(window).unbind(this._cx3),
      this.settings.keyboardNav && e(document).unbind("keydown.touchcarousel"),
      this.carouselRoot.remove()
    },
    _az4: function(e) {
      if (this._ir2) {
        var t = this._gt4(e);
        this._kp2 = t,
        this.settings.pagingNavControls && (this._mn2.removeClass("current"), this._mn2.eq(t).addClass("current"))
      }
    },
    _gt4: function(e) {
      var t = this._hs2;
      for (var n = 0; n < this._jq2; n++) if (e >= n * t && e < n * t + t) return n;
      return e < 0 ? 0 : e >= this._jq2 ? this._jq2 - 1 : !1
    },
    _hs4: function() {
      this.settings.loopItems || (this._dw2 ? (this._dw2 = !1, this.arrowLeft.removeClass("disabled")) : this._ev2 && (this._ev2 = !1, this.arrowRight.removeClass("disabled")))
    },
    _az3: function() { ! this._dw2 && !this.settings.loopItems && (this._dw2 = !0, this.arrowLeft.addClass("disabled"), this._ev2 && (this._ev2 = !1, this.arrowRight.removeClass("disabled")))
    },
    _ir4: function() { ! this._ev2 && !this.settings.loopItems && (this._ev2 = !0, this.arrowRight.addClass("disabled"), this._dw2 && (this._dw2 = !1, this.arrowLeft.removeClass("disabled")))
    },
    _cx4: function(e) {
      var t = this;
      e = -e;
      var n;
      for (var r = 0; r < t.numItems; r++) {
        n = t.items[r];
        if (e >= n.posX && e < n.posX + n.width) return n
      }
      return - 1
    },
    _mn3: function() {
      this.autoplay && this.wasAutoplayRunning && (this._jq3 || this._lo3(), this.wasAutoplayRunning = !1)
    },
    _fu4: function() {
      var e = this;
      this._hs3 = !1,
      this._ev3 && clearTimeout(this._ev3),
      this._ev3 = setTimeout(function() {
        e.scrollbarJQ.animate({
          opacity: 0
        },
        150, "linear")
      },
      450)
    },
    _ev4: function() {
      this._hs3 = !0,
      this._ev3 && clearTimeout(this._ev3),
      this.scrollbarJQ.stop().animate({
        opacity: 1
      },
      150, "linear")
    },
    _dw4: function() {
      this._by1 && this._by1.stop()
    },
    _lo3: function() {
      if (this.autoplay) {
        var e = this;
        this.autoplayTimer || (this.autoplayTimer = setInterval(function() { ! e._jq4 && !e._by && e.next(!0)
        },
        this.settings.autoplayDelay))
      }
    },
    _kp3: function() {
      this.autoplayTimer && (clearInterval(this.autoplayTimer), this.autoplayTimer = "")
    },
    _by4: function(e) {
      var t = e ? this.scrollbarJQ: this._lo;
      if (!this._ir1) return Math.round(t.position().left);
      var n = t.css("-webkit-transform"),
      r = n.replace(/^matrix\(/i, "").split(/, |\)$/g);
      return parseInt(r[4], 10)
    },
    _ir3: function(t) {
      if (!this._jq4) {
        this.autoplay && this.settings.autoplayStopAtAction && this.stopAutoplay(),
        this._dw4(),
        this.settings.scrollbarAutoHide && this._ev4();
        var n;
        if (this.hasTouch) {
          this._az = !1;
          var r = t.originalEvent.touches;
          if (! (r && r.length > 0)) return ! 1;
          n = r[0]
        } else n = t,
        t.preventDefault();
        this._kp4(),
        this._jq4 = !0;
        var i = this;
        this._ir1 && i._lo.css({
          "-webkit-transition-duration": "0",
          "-webkit-transition-property": "none"
        }),
        e(document).bind(this._dw,
        function(e) {
          i._lo4(e)
        }),
        e(document).bind(this._ev,
        function(e) {
          i._mn4(e)
        }),
        this._az5 = this._by4(),
        this._ir = n.clientX,
        this._cx1 = !1,
        this._kp = t.timeStamp || Date.now(),
        this._fu1 = 0,
        this._ev1 = this._dw1 = n.clientX,
        this._by5 = n.clientY
      }
    },
    _lo4: function(e) {
      var t = e.timeStamp || Date.now(),
      n;
      if (this.hasTouch) {
        if (this._az) return ! 1;
        var r = e.originalEvent.touches;
        if (r.length > 1) return ! 1;
        n = r[0];
        if (Math.abs(n.clientY - this._by5) > Math.abs(n.clientX - this._dw1) + 3) return this.settings.lockAxis && (this._az = !0),
        !1;
        e.preventDefault()
      } else n = e,
      e.preventDefault();
      this._jq = n.clientX,
      this._cx5 = this._dw5;
      var i = n.clientX - this._ev1;
      this._cx5 != i && (this._dw5 = i);
      if (i != 0) {
        var s = this._az5 + this._fu1;
        s >= 0 ? (i /= 4, this._az3()) : s <= this.carouselWidth - this._gt2 ? (this._ir4(), i /= 4) : this._hs4(),
        this._fu1 += i,
        this.setXPos(s),
        this.settings.scrollbar && this.setXPos(this._gt3 * ( - s / (this._gt2 - this.carouselWidth)), !0)
      }
      return this._ev1 = n.clientX,
      t - this._kp > 350 && (this._kp = t, this._ir = n.clientX),
      this.settings.onDragStart !== null && this.settings.onDragStart.call(this),
      !1
    },
    _mn4: function(t) {
      if (this._jq4) {
        var n = this;
        this._jq4 = !1,
        this._mn1(),
        this.endPos = this._by4(),
        this.isdrag = !1,
        e(document).unbind(this._dw).unbind(this._ev);
        if (this.endPos == this._az5) {
          this._cx1 = !1,
          this.settings.scrollbarAutoHide && this._fu4();
          return
        }
        this._cx1 = !0;
        var r = this._jq - this._ir,
        i = Math.max(40, (t.timeStamp || Date.now()) - this._kp),
        s = .5,
        o = 2,
        u = Math.abs(r) / i;
        function a(e) {
          return e > 0 ? e = 0 : e < n.carouselWidth - n._gt2 && (e = n.carouselWidth - n._gt2),
          e
        }
        if (!this.settings.snapToItems) {
          var f = 0;
          u <= 2 ? (s = this._jq1 * 3.5, f = 0) : u > 2 && u <= 3 ? (s = this._jq1 * 4, f = 200) : u > 3 && (f = 300, u > 4 && (u = 4, f = 400, s = this._jq1 * 6), s = this._jq1 * 5);
          var l = u * u * o / (2 * s);
          l *= r < 0 ? -1 : 1;
          var c = u * o / s + f;
          this.endPos + l > 0 ? this.endPos > 0 ? this.animateTo(0, 800, "easeOutCubic") : this.animateTo(this.carouselWidth / 10 * ((f + 200) / 1e3), Math.abs(this.endPos) * 1.1 / u, "easeOutSine", !0, 0, 400, "easeOutCubic") : this.endPos + l < this.carouselWidth - this._gt2 ? this.endPos < this.carouselWidth - this._gt2 ? this.animateTo(this.carouselWidth - this._gt2, 800, "easeOutCubic") : this.animateTo(this.carouselWidth - this._gt2 - this.carouselWidth / 10 * ((f + 200) / 1e3), Math.abs(this.carouselWidth - this._gt2 - this.endPos) * 1.1 / u, "easeOutSine", !0, this.carouselWidth - this._gt2, 400, "easeOutCubic") : this.animateTo(this.endPos + l, c, "easeOutCubic")
        } else {
          this.autoplay && this.settings.autoplayStopAtAction && this.stopAutoplay();
          var h = Boolean(this._dw1 - this._ev1 > 0),
          p = a(this._by4()),
          d = this._cx4(p).index;
          if (!this._ir2) d += h ? this._hs2: -this._hs2 + 1;
          else {
            h && (p = Math.max(p - this.carouselWidth - 1, 1 - n._gt2), d = this._cx4(p).index, d === undefined && (d = this.numItems - 1));
            var v = this._gt4(d);
            d = v * this._hs2
          }
          h ? d = Math.min(d, this.numItems - 1) : d = Math.max(d, 0);
          var m = this.items[d];
          this._az4(d);
          if (m) {
            p = a( - m.posX);
            var g = Math.abs(this.endPos - p),
            y = Math.max(g * 1.08 / u, 150),
            b = Boolean(y < 180),
            w = g * .08;
            h && (w *= -1),
            this.animateTo(b ? p + w: p, Math.min(y, 400), "easeOutSine", b, p, 300, "easeOutCubic")
          }
        }
        this.settings.onDragRelease !== null && this.settings.onDragRelease.call(this)
      }
      return ! 1
    },
    _by3: function(e) {
      e === undefined && (e = this._by4()),
      this.settings.loopItems || (e >= 0 ? this._az3() : e <= this.carouselWidth - this._gt2 ? this._ir4() : this._hs4())
    },
    _mn1: function() {
      this._kp1 ? this._az1.css("cursor", this._kp1) : (this._az1.removeClass("grabbing-cursor"), this._az1.addClass("grab-cursor"))
    },
    _kp4: function() {
      this._lo1 ? this._az1.css("cursor", this._lo1) : (this._az1.removeClass("grab-cursor"), this._az1.addClass("grabbing-cursor"))
    }
  },
  e.fn.touchCarousel = function(n) {
    return this.each(function() {
      var r = new t(e(this), n);
      e(this).data("touchCarousel", r)
    })
  },
  e.fn.touchCarousel.defaults = {
    itemsPerMove: 1,
    snapToItems: !1,
    pagingNav: !1,
    pagingNavControls: !0,
    autoplay: !1,
    autoplayDelay: 3e3,
    autoplayStopAtAction: !0,
    scrollbar: !0,
    scrollbarAutoHide: !1,
    scrollbarTheme: "dark",
    transitionSpeed: 600,
    directionNav: !0,
    directionNavAutoHide: !1,
    loopItems: !1,
    keyboardNav: !1,
    dragUsingMouse: !0,
    scrollToLast: !1,
    itemFallbackWidth: 500,
    baseMouseFriction: .0012,
    baseTouchFriction: 8e-4,
    lockAxis: !0,
    useWebkit3d: !1,
    onAnimStart: null,
    onAnimComplete: null,
    onDragStart: null,
    onDragRelease: null
  },
  e.fn.touchCarousel.settings = {},
  e.extend(jQuery.easing, {
    easeInOutSine: function(e, t, n, r, i) {
      return - r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeOutSine: function(e, t, n, r, i) {
      return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeOutCubic: function(e, t, n, r, i) {
      return r * ((t = t / i - 1) * t * t + 1) + n
    }
  })
} (jQuery),
function(e, t, n) {
  function f(e) {
    return e = e || location.href,
    "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
  }
  var r = "hashchange",
  i = document,
  s, o = e.event.special,
  u = i.documentMode,
  a = "on" + r in t && (u === n || u > 7);
  e.fn[r] = function(e) {
    return e ? this.bind(r, e) : this.trigger(r)
  },
  e.fn[r].delay = 50,
  o[r] = e.extend(o[r], {
    setup: function() {
      if (a) return ! 1;
      e(s.start)
    },
    teardown: function() {
      if (a) return ! 1;
      e(s.stop)
    }
  }),
  s = function() {
    function m() {
      var n = f(),
      i = v(u);
      n !== u ? (p(u = n, i), e(t).trigger(r)) : i !== u && (location.href = location.href.replace(/#.*/, "") + i),
      o = setTimeout(m, e.fn[r].delay)
    }
    var s = {},
    o, u = f(),
    l = function(e) {
      return e
    },
    p = l,
    v = l;
    return s.start = function() {
      o || m()
    },
    s.stop = function() {
      o && clearTimeout(o),
      o = n
    },
    e.browser.msie && !a &&
    function() {
      var t, n;
      s.start = function() {
        t || (n = e.fn[r].src, n = n && n + f(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load",
        function() {
          n || p(f()),
          m()
        }).attr("src", n || "javascript:0").insertAfter("body")[0].contentWindow, i.onpropertychange = function() {
          try {
            event.propertyName === "title" && (t.document.title = i.title)
          } catch(e) {}
        })
      },
      s.stop = l,
      v = function() {
        return f(t.location.href)
      },
      p = function(n, s) {
        var o = t.document,
        u = e.fn[r].domain;
        n !== s && (o.title = i.title, o.open(), u && o.write('<script>document.domain="' + u + '"</script>'), o.close(), t.location.hash = n)
      }
    } (),
    s
  } ()
} (jQuery, this),
function(e, t) {
  function i(e, t) {
    var n = e === null || typeof e in r;
    return n ? e === t: !1
  }
  var n = e.ko = {};
  n.exportSymbol = function(t, n) {
    var r = t.split("."),
    i = e;
    for (var s = 0; s < r.length - 1; s++) i = i[r[s]];
    i[r[r.length - 1]] = n
  },
  n.exportProperty = function(e, t, n) {
    e[t] = n
  },
  n.utils = new
  function() {
    function p(e, t) {
      if (e.tagName != "INPUT" || !e.type) return ! 1;
      if (t.toLowerCase() != "click") return ! 1;
      var n = e.type.toLowerCase();
      return n == "checkbox" || n == "radio"
    }
    var r = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
    i = /MSIE 6/i.test(navigator.userAgent),
    s = /MSIE 7/i.test(navigator.userAgent),
    o = {},
    u = {},
    a = /Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent": "UIEvents";
    o[a] = ["keyup", "keydown", "keypress"],
    o.MouseEvents = ["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave"];
    for (var f in o) {
      var l = o[f];
      if (l.length) for (var c = 0,
      h = l.length; c < h; c++) u[l[c]] = f
    }
    return {
      fieldsIncludedWithJsonPost: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
      arrayForEach: function(e, t) {
        for (var n = 0,
        r = e.length; n < r; n++) t(e[n])
      },
      arrayIndexOf: function(e, t) {
        if (typeof e.indexOf == "function") return e.indexOf(t);
        for (var n = 0,
        r = e.length; n < r; n++) if (e[n] === t) return n;
        return - 1
      },
      arrayFirst: function(e, t, n) {
        for (var r = 0,
        i = e.length; r < i; r++) if (t.call(n, e[r])) return e[r];
        return null
      },
      arrayRemoveItem: function(e, t) {
        var r = n.utils.arrayIndexOf(e, t);
        r >= 0 && e.splice(r, 1)
      },
      arrayGetDistinctValues: function(e) {
        e = e || [];
        var t = [];
        for (var r = 0,
        i = e.length; r < i; r++) n.utils.arrayIndexOf(t, e[r]) < 0 && t.push(e[r]);
        return t
      },
      arrayMap: function(e, t) {
        e = e || [];
        var n = [];
        for (var r = 0,
        i = e.length; r < i; r++) n.push(t(e[r]));
        return n
      },
      arrayFilter: function(e, t) {
        e = e || [];
        var n = [];
        for (var r = 0,
        i = e.length; r < i; r++) t(e[r]) && n.push(e[r]);
        return n
      },
      arrayPushAll: function(e, t) {
        for (var n = 0,
        r = t.length; n < r; n++) e.push(t[n])
      },
      emptyDomNode: function(e) {
        while (e.firstChild) n.removeNode(e.firstChild)
      },
      setDomNodeChildren: function(e, t) {
        n.utils.emptyDomNode(e),
        t && n.utils.arrayForEach(t,
        function(t) {
          e.appendChild(t)
        })
      },
      replaceDomNodes: function(e, t) {
        var r = e.nodeType ? [e] : e;
        if (r.length > 0) {
          var i = r[0],
          s = i.parentNode;
          for (var o = 0,
          u = t.length; o < u; o++) s.insertBefore(t[o], i);
          for (var o = 0,
          u = r.length; o < u; o++) n.removeNode(r[o])
        }
      },
      setOptionNodeSelectionState: function(e, t) {
        navigator.userAgent.indexOf("MSIE 6") >= 0 ? e.setAttribute("selected", t) : e.selected = t
      },
      getElementsHavingAttribute: function(e, t) {
        if (!e || e.nodeType != 1) return [];
        var n = [];
        e.getAttribute(t) !== null && n.push(e);
        var r = e.getElementsByTagName("*");
        for (var i = 0,
        s = r.length; i < s; i++) r[i].getAttribute(t) !== null && n.push(r[i]);
        return n
      },
      stringTrim: function(e) {
        return (e || "").replace(r, "")
      },
      stringTokenize: function(e, t) {
        var r = [],
        i = (e || "").split(t);
        for (var s = 0,
        o = i.length; s < o; s++) {
          var u = n.utils.stringTrim(i[s]);
          u !== "" && r.push(u)
        }
        return r
      },
      stringStartsWith: function(e, t) {
        return e = e || "",
        t.length > e.length ? !1 : e.substring(0, t.length) === t
      },
      evalWithinScope: function(e, n) {
        return n === t ? (new Function("return " + e))() : (new Function("sc", "with(sc) { return (" + e + ") }"))(n)
      },
      domNodeIsContainedBy: function(e, t) {
        if (t.compareDocumentPosition) return (t.compareDocumentPosition(e) & 16) == 16;
        while (e != null) {
          if (e == t) return ! 0;
          e = e.parentNode
        }
        return ! 1
      },
      domNodeIsAttachedToDocument: function(e) {
        return n.utils.domNodeIsContainedBy(e, document)
      },
      registerEventHandler: function(e, t, n) {
        if (typeof jQuery != "undefined") {
          if (p(e, t)) {
            var r = n;
            n = function(e, t) {
              var n = this.checked;
              t && (this.checked = t.checkedStateBeforeEvent !== !0),
              r.call(this, e),
              this.checked = n
            }
          }
          jQuery(e).bind(t, n)
        } else if (typeof e.addEventListener == "function") e.addEventListener(t, n, !1);
        else {
          if (typeof e.attachEvent == "undefined") throw new Error("Browser doesn't support addEventListener or attachEvent");
          e.attachEvent("on" + t,
          function(t) {
            n.call(e, t)
          })
        }
      },
      triggerEvent: function(t, n) {
        if (!t || !t.nodeType) throw new Error("element must be a DOM node when calling triggerEvent");
        if (typeof jQuery != "undefined") {
          var r = [];
          p(t, n) && r.push({
            checkedStateBeforeEvent: t.checked
          }),
          jQuery(t).trigger(n, r)
        } else if (typeof document.createEvent == "function") {
          if (typeof t.dispatchEvent != "function") throw new Error("The supplied element doesn't support dispatchEvent");
          var i = u[n] || "HTMLEvents",
          s = document.createEvent(i);
          s.initEvent(n, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t),
          t.dispatchEvent(s)
        } else {
          if (typeof t.fireEvent == "undefined") throw new Error("Browser doesn't support triggering events");
          n == "click" && t.tagName == "INPUT" && (t.type.toLowerCase() == "checkbox" || t.type.toLowerCase() == "radio") && (t.checked = t.checked !== !0),
          t.fireEvent("on" + n)
        }
      },
      unwrapObservable: function(e) {
        return n.isObservable(e) ? e() : e
      },
      domNodeHasCssClass: function(e, t) {
        var r = (e.className || "").split(/\s+/);
        return n.utils.arrayIndexOf(r, t) >= 0
      },
      toggleDomNodeCssClass: function(e, t, r) {
        var i = n.utils.domNodeHasCssClass(e, t);
        if (r && !i) e.className = (e.className || "") + " " + t;
        else if (i && !r) {
          var s = (e.className || "").split(/\s+/),
          o = "";
          for (var u = 0; u < s.length; u++) s[u] != t && (o += s[u] + " ");
          e.className = n.utils.stringTrim(o)
        }
      },
      range: function(e, t) {
        e = n.utils.unwrapObservable(e),
        t = n.utils.unwrapObservable(t);
        var r = [];
        for (var i = e; i <= t; i++) r.push(i);
        return r
      },
      makeArray: function(e) {
        var t = [];
        for (var n = 0,
        r = e.length; n < r; n++) t.push(e[n]);
        return t
      },
      isIe6: i,
      isIe7: s,
      getFormFields: function(e, t) {
        var r = n.utils.makeArray(e.getElementsByTagName("INPUT")).concat(n.utils.makeArray(e.getElementsByTagName("TEXTAREA"))),
        i = typeof t == "string" ?
        function(e) {
          return e.name === t
        }: function(e) {
          return t.test(e.name)
        },
        s = [];
        for (var o = r.length - 1; o >= 0; o--) i(r[o]) && s.push(r[o]);
        return s
      },
      parseJson: function(t) {
        if (typeof t == "string") {
          t = n.utils.stringTrim(t);
          if (t) return e.JSON && e.JSON.parse ? e.JSON.parse(t) : (new Function("return " + t))()
        }
        return null
      },
      stringifyJson: function(e) {
        if (typeof JSON == "undefined" || typeof JSON.stringify == "undefined") throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
        return JSON.stringify(n.utils.unwrapObservable(e))
      },
      postJson: function(e, t, r) {
        r = r || {};
        var i = r.params || {},
        s = r.includeFields || this.fieldsIncludedWithJsonPost,
        o = e;
        if (typeof e == "object" && e.tagName == "FORM") {
          var u = e;
          o = u.action;
          for (var a = s.length - 1; a >= 0; a--) {
            var f = n.utils.getFormFields(u, s[a]);
            for (var l = f.length - 1; l >= 0; l--) i[f[l].name] = f[l].value
          }
        }
        t = n.utils.unwrapObservable(t);
        var c = document.createElement("FORM");
        c.style.display = "none",
        c.action = o,
        c.method = "post";
        for (var h in t) {
          var p = document.createElement("INPUT");
          p.name = h,
          p.value = n.utils.stringifyJson(n.utils.unwrapObservable(t[h])),
          c.appendChild(p)
        }
        for (var h in i) {
          var p = document.createElement("INPUT");
          p.name = h,
          p.value = i[h],
          c.appendChild(p)
        }
        document.body.appendChild(c),
        r.submitter ? r.submitter(c) : c.submit(),
        setTimeout(function() {
          c.parentNode.removeChild(c)
        },
        0)
      }
    }
  },
  n.exportSymbol("ko.utils", n.utils),
  n.exportSymbol("ko.utils.arrayForEach", n.utils.arrayForEach),
  n.exportSymbol("ko.utils.arrayFirst", n.utils.arrayFirst),
  n.exportSymbol("ko.utils.arrayFilter", n.utils.arrayFilter),
  n.exportSymbol("ko.utils.arrayGetDistinctValues", n.utils.arrayGetDistinctValues),
  n.exportSymbol("ko.utils.arrayIndexOf", n.utils.arrayIndexOf),
  n.exportSymbol("ko.utils.arrayMap", n.utils.arrayMap),
  n.exportSymbol("ko.utils.arrayPushAll", n.utils.arrayPushAll),
  n.exportSymbol("ko.utils.arrayRemoveItem", n.utils.arrayRemoveItem),
  n.exportSymbol("ko.utils.fieldsIncludedWithJsonPost", n.utils.fieldsIncludedWithJsonPost),
  n.exportSymbol("ko.utils.getElementsHavingAttribute", n.utils.getElementsHavingAttribute),
  n.exportSymbol("ko.utils.getFormFields", n.utils.getFormFields),
  n.exportSymbol("ko.utils.postJson", n.utils.postJson),
  n.exportSymbol("ko.utils.parseJson", n.utils.parseJson),
  n.exportSymbol("ko.utils.registerEventHandler", n.utils.registerEventHandler),
  n.exportSymbol("ko.utils.stringifyJson", n.utils.stringifyJson),
  n.exportSymbol("ko.utils.range", n.utils.range),
  n.exportSymbol("ko.utils.toggleDomNodeCssClass", n.utils.toggleDomNodeCssClass),
  n.exportSymbol("ko.utils.triggerEvent", n.utils.triggerEvent),
  n.exportSymbol("ko.utils.unwrapObservable", n.utils.unwrapObservable),
  Function.prototype.bind || (Function.prototype.bind = function(e) {
    var t = this,
    n = Array.prototype.slice.call(arguments),
    e = n.shift();
    return function() {
      return t.apply(e, n.concat(Array.prototype.slice.call(arguments)))
    }
  }),
  n.utils.domData = new
  function() {
    var e = 0,
    r = "__ko__" + (new Date).getTime(),
    i = {};
    return {
      get: function(e, r) {
        var i = n.utils.domData.getAll(e, !1);
        return i === t ? t: i[r]
      },
      set: function(e, r, i) {
        if (i === t && n.utils.domData.getAll(e, !1) === t) return;
        var s = n.utils.domData.getAll(e, !0);
        s[r] = i
      },
      getAll: function(n, s) {
        var o = n[r];
        if (!o) {
          if (!s) return t;
          o = n[r] = "ko" + e++,
          i[o] = {}
        }
        return i[o]
      },
      clear: function(e) {
        var t = e[r];
        t && (delete i[t], e[r] = null)
      }
    }
  },
  n.utils.domNodeDisposal = new
  function() {
    function r(r, i) {
      var s = n.utils.domData.get(r, e);
      return s === t && i && (s = [], n.utils.domData.set(r, e, s)),
      s
    }
    function i(r) {
      n.utils.domData.set(r, e, t)
    }
    function s(e) {
      var t = r(e, !1);
      if (t) {
        t = t.slice(0);
        for (var i = 0; i < t.length; i++) t[i](e)
      }
      n.utils.domData.clear(e),
      typeof jQuery == "function" && typeof jQuery["cleanData"] == "function" && jQuery.cleanData([e])
    }
    var e = "__ko_domNodeDisposal__" + (new Date).getTime();
    return {
      addDisposeCallback: function(e, t) {
        if (typeof t != "function") throw new Error("Callback must be a function");
        r(e, !0).push(t)
      },
      removeDisposeCallback: function(e, t) {
        var s = r(e, !1);
        s && (n.utils.arrayRemoveItem(s, t), s.length == 0 && i(e))
      },
      cleanNode: function(e) {
        if (e.nodeType != 1 && e.nodeType != 9) return;
        s(e);
        var t = [];
        n.utils.arrayPushAll(t, e.getElementsByTagName("*"));
        for (var r = 0,
        i = t.length; r < i; r++) s(t[r])
      },
      removeNode: function(e) {
        n.cleanNode(e),
        e.parentNode && e.parentNode.removeChild(e)
      }
    }
  },
  n.cleanNode = n.utils.domNodeDisposal.cleanNode,
  n.removeNode = n.utils.domNodeDisposal.removeNode,
  n.exportSymbol("ko.cleanNode", n.cleanNode),
  n.exportSymbol("ko.removeNode", n.removeNode),
  n.exportSymbol("ko.utils.domNodeDisposal", n.utils.domNodeDisposal),
  n.exportSymbol("ko.utils.domNodeDisposal.addDisposeCallback", n.utils.domNodeDisposal.addDisposeCallback),
  n.exportSymbol("ko.utils.domNodeDisposal.removeDisposeCallback", n.utils.domNodeDisposal.removeDisposeCallback),
  function() {
    function e(e) {
      var t = n.utils.stringTrim(e).toLowerCase(),
      r = document.createElement("div"),
      i = t.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !t.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!t.indexOf("<td") || !t.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""];
      r.innerHTML = i[1] + e + i[2];
      while (i[0]--) r = r.lastChild;
      return n.utils.makeArray(r.childNodes)
    }
    n.utils.parseHtmlFragment = function(t) {
      return typeof jQuery != "undefined" ? jQuery.clean([t]) : e(t)
    },
    n.utils.setHtml = function(e, r) {
      n.utils.emptyDomNode(e);
      if (r !== null && r !== t) {
        typeof r != "string" && (r = r.toString());
        if (typeof jQuery != "undefined") jQuery(e).html(r);
        else {
          var i = n.utils.parseHtmlFragment(r);
          for (var s = 0; s < i.length; s++) e.appendChild(i[s])
        }
      }
    }
  } (),
  n.memoization = function() {
    function r() {
      return ((1 + Math.random()) * 4294967296 | 0).toString(16).substring(1)
    }
    function i() {
      return r() + r()
    }
    function s(e, t) {
      if (!e) return;
      if (e.nodeType == 8) {
        var r = n.memoization.parseMemoText(e.nodeValue);
        r != null && t.push({
          domNode: e,
          memoId: r
        })
      } else if (e.nodeType == 1) for (var i = 0,
      o = e.childNodes,
      u = o.length; i < u; i++) s(o[i], t)
    }
    var e = {};
    return {
      memoize: function(t) {
        if (typeof t != "function") throw new Error("You can only pass a function to ko.memoization.memoize()");
        var n = i();
        return e[n] = t,
        "<!--[ko_memo:" + n + "]-->"
      },
      unmemoize: function(n, r) {
        var i = e[n];
        if (i === t) throw new Error("Couldn't find any memo with ID " + n + ". Perhaps it's already been unmemoized.");
        try {
          return i.apply(null, r || []),
          !0
        } finally {
          delete e[n]
        }
      },
      unmemoizeDomNodeAndDescendants: function(e, t) {
        var r = [];
        s(e, r);
        for (var i = 0,
        o = r.length; i < o; i++) {
          var u = r[i].domNode,
          a = [u];
          t && n.utils.arrayPushAll(a, t),
          n.memoization.unmemoize(r[i].memoId, a),
          u.nodeValue = "",
          u.parentNode && u.parentNode.removeChild(u)
        }
      },
      parseMemoText: function(e) {
        var t = e.match(/^\[ko_memo\:(.*?)\]$/);
        return t ? t[1] : null
      }
    }
  } (),
  n.exportSymbol("ko.memoization", n.memoization),
  n.exportSymbol("ko.memoization.memoize", n.memoization.memoize),
  n.exportSymbol("ko.memoization.unmemoize", n.memoization.unmemoize),
  n.exportSymbol("ko.memoization.parseMemoText", n.memoization.parseMemoText),
  n.exportSymbol("ko.memoization.unmemoizeDomNodeAndDescendants", n.memoization.unmemoizeDomNodeAndDescendants),
  n.subscription = function(e, t) {
    this.callback = e,
    this.dispose = function() {
      this.isDisposed = !0,
      t()
    }.bind(this),
    n.exportProperty(this, "dispose", this.dispose)
  },
  n.subscribable = function() {
    var e = [];
    this.subscribe = function(t, r) {
      var i = r ? t.bind(r) : t,
      s = new n.subscription(i,
      function() {
        n.utils.arrayRemoveItem(e, s)
      });
      return e.push(s),
      s
    },
    this.notifySubscribers = function(t) {
      n.utils.arrayForEach(e.slice(0),
      function(e) {
        e && e.isDisposed !== !0 && e.callback(t)
      })
    },
    this.getSubscriptionsCount = function() {
      return e.length
    },
    n.exportProperty(this, "subscribe", this.subscribe),
    n.exportProperty(this, "notifySubscribers", this.notifySubscribers),
    n.exportProperty(this, "getSubscriptionsCount", this.getSubscriptionsCount)
  },
  n.isSubscribable = function(e) {
    return typeof e.subscribe == "function" && typeof e.notifySubscribers == "function"
  },
  n.exportSymbol("ko.subscribable", n.subscribable),
  n.exportSymbol("ko.isSubscribable", n.isSubscribable),
  n.dependencyDetection = function() {
    var e = [];
    return {
      begin: function() {
        e.push([])
      },
      end: function() {
        return e.pop()
      },
      registerDependency: function(t) {
        if (!n.isSubscribable(t)) throw "Only subscribable things can act as dependencies";
        e.length > 0 && e[e.length - 1].push(t)
      }
    }
  } ();
  var r = {
    "undefined": !0,
    "boolean": !0,
    number: !0,
    string: !0
  };
  n.observable = function(e) {
    function r() {
      if (arguments.length > 0) {
        if (!r.equalityComparer || !r.equalityComparer(t, arguments[0])) t = arguments[0],
        r.notifySubscribers(t);
        return this
      }
      return n.dependencyDetection.registerDependency(r),
      t
    }
    var t = e;
    return r.__ko_proto__ = n.observable,
    r.valueHasMutated = function() {
      r.notifySubscribers(t)
    },
    r.equalityComparer = i,
    n.subscribable.call(r),
    n.exportProperty(r, "valueHasMutated", r.valueHasMutated),
    r
  },
  n.isObservable = function(e) {
    return e === null || e === t || e.__ko_proto__ === t ? !1 : e.__ko_proto__ === n.observable ? !0 : n.isObservable(e.__ko_proto__)
  },
  n.isWriteableObservable = function(e) {
    return typeof e == "function" && e.__ko_proto__ === n.observable ? !0 : typeof e == "function" && e.__ko_proto__ === n.dependentObservable && e.hasWriteFunction ? !0 : !1
  },
  n.exportSymbol("ko.observable", n.observable),
  n.exportSymbol("ko.isObservable", n.isObservable),
  n.exportSymbol("ko.isWriteableObservable", n.isWriteableObservable),
  n.observableArray = function(e) {
    arguments.length == 0 && (e = []);
    if (e === null || e === t || "length" in e) {
      var r = new n.observable(e);
      return n.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
      function(e) {
        r[e] = function() {
          var t = r(),
          n = t[e].apply(t, arguments);
          return r.valueHasMutated(),
          n
        }
      }),
      n.utils.arrayForEach(["slice"],
      function(e) {
        r[e] = function() {
          var t = r();
          return t[e].apply(t, arguments)
        }
      }),
      r.remove = function(e) {
        var t = r(),
        n = [],
        i = [],
        s = typeof e == "function" ? e: function(t) {
          return t === e
        };
        for (var o = 0,
        u = t.length; o < u; o++) {
          var a = t[o];
          s(a) ? i.push(a) : n.push(a)
        }
        return r(n),
        i
      },
      r.removeAll = function(e) {
        if (e === t) {
          var i = r();
          return r([]),
          i
        }
        return e ? r.remove(function(t) {
          return n.utils.arrayIndexOf(e, t) >= 0
        }) : []
      },
      r.destroy = function(e) {
        var t = r(),
        n = typeof e == "function" ? e: function(t) {
          return t === e
        };
        for (var i = t.length - 1; i >= 0; i--) {
          var s = t[i];
          n(s) && (t[i]._destroy = !0)
        }
        r.valueHasMutated()
      },
      r.destroyAll = function(e) {
        return e === t ? r.destroy(function() {
          return ! 0
        }) : e ? r.destroy(function(t) {
          return n.utils.arrayIndexOf(e, t) >= 0
        }) : []
      },
      r.indexOf = function(e) {
        var t = r();
        return n.utils.arrayIndexOf(t, e)
      },
      r.replace = function(e, t) {
        var n = r.indexOf(e);
        n >= 0 && (r()[n] = t, r.valueHasMutated())
      },
      n.exportProperty(r, "remove", r.remove),
      n.exportProperty(r, "removeAll", r.removeAll),
      n.exportProperty(r, "destroy", r.destroy),
      n.exportProperty(r, "destroyAll", r.destroyAll),
      n.exportProperty(r, "indexOf", r.indexOf),
      r
    }
    throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")
  },
  n.exportSymbol("ko.observableArray", n.observableArray),
  n.dependentObservable = function(e, t, r) {
    function l() {
      n.utils.arrayForEach(f,
      function(e) {
        e.dispose()
      }),
      f = []
    }
    function c(e) {
      l(),
      n.utils.arrayForEach(e,
      function(e) {
        f.push(e.subscribe(h))
      })
    }
    function h() {
      if (s && typeof r["disposeWhen"] == "function" && r.disposeWhen()) {
        p.dispose();
        return
      }
      try {
        n.dependencyDetection.begin(),
        i = r.owner ? r.read.call(r.owner) : r.read()
      } finally {
        var e = n.utils.arrayGetDistinctValues(n.dependencyDetection.end());
        c(e)
      }
      p.notifySubscribers(i),
      s = !0
    }
    function p() {
      if (! (arguments.length > 0)) return s || h(),
      n.dependencyDetection.registerDependency(p),
      i;
      if (typeof r["write"] != "function") throw "Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.";
      var e = arguments[0];
      r.owner ? r.write.call(r.owner, e) : r.write(e)
    }
    var i, s = !1;
    e && typeof e == "object" ? r = e: (r = r || {},
    r.read = e || r.read, r.owner = t || r.owner);
    if (typeof r["read"] != "function") throw "Pass a function that returns the value of the dependentObservable";
    var o = typeof r["disposeWhenNodeIsRemoved"] == "object" ? r.disposeWhenNodeIsRemoved: null,
    u = null;
    if (o) {
      u = function() {
        p.dispose()
      },
      n.utils.domNodeDisposal.addDisposeCallback(o, u);
      var a = r.disposeWhen;
      r.disposeWhen = function() {
        return ! n.utils.domNodeIsAttachedToDocument(o) || typeof a == "function" && a()
      }
    }
    var f = [];
    return p.__ko_proto__ = n.dependentObservable,
    p.getDependenciesCount = function() {
      return f.length
    },
    p.hasWriteFunction = typeof r.write == "function",
    p.dispose = function() {
      o && n.utils.domNodeDisposal.removeDisposeCallback(o, u),
      l()
    },
    n.subscribable.call(p),
    r.deferEvaluation !== !0 && h(),
    n.exportProperty(p, "dispose", p.dispose),
    n.exportProperty(p, "getDependenciesCount", p.getDependenciesCount),
    p
  },
  n.dependentObservable.__ko_proto__ = n.observable,
  n.exportSymbol("ko.dependentObservable", n.dependentObservable),
  function() {
    function r(e, n, o) {
      o = o || new s,
      e = n(e);
      var u = typeof e == "object" && e !== null && e !== t;
      if (!u) return e;
      var a = e instanceof Array ? [] : {};
      return o.save(e, a),
      i(e,
      function(i) {
        var s = n(e[i]);
        switch (typeof s) {
        case "boolean":
        case "number":
        case "string":
        case "function":
          a[i] = s;
          break;
        case "object":
        case "undefined":
          var u = o.get(s);
          a[i] = u !== t ? u: r(s, n, o)
        }
      }),
      a
    }
    function i(e, t) {
      if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n);
      else for (var r in e) t(r)
    }
    function s() {
      var e = [],
      r = [];
      this.save = function(t, i) {
        var s = n.utils.arrayIndexOf(e, t);
        s >= 0 ? r[s] = i: (e.push(t), r.push(i))
      },
      this.get = function(i) {
        var s = n.utils.arrayIndexOf(e, i);
        return s >= 0 ? r[s] : t
      }
    }
    var e = 10;
    n.toJS = function(t) {
      if (arguments.length == 0) throw new Error("When calling ko.toJS, pass the object you want to convert.");
      return r(t,
      function(t) {
        for (var r = 0; n.isObservable(t) && r < e; r++) t = t();
        return t
      })
    },
    n.toJSON = function(e) {
      var t = n.toJS(e);
      return n.utils.stringifyJson(t)
    }
  } (),
  n.exportSymbol("ko.toJS", n.toJS),
  n.exportSymbol("ko.toJSON", n.toJSON),
  function() {
    n.selectExtensions = {
      readValue: function(e) {
        return e.tagName == "OPTION" ? e.__ko__hasDomDataOptionValue__ === !0 ? n.utils.domData.get(e, n.bindingHandlers.options.optionValueDomDataKey) : e.getAttribute("value") : e.tagName == "SELECT" ? e.selectedIndex >= 0 ? n.selectExtensions.readValue(e.options[e.selectedIndex]) : t: e.value
      },
      writeValue: function(e, r) {
        if (e.tagName == "OPTION") switch (typeof r) {
        case "string":
        case "number":
          n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, t),
          "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__,
          e.value = r;
          break;
        default:
          n.utils.domData.set(e, n.bindingHandlers.options.optionValueDomDataKey, r),
          e.__ko__hasDomDataOptionValue__ = !0,
          e.value = ""
        } else if (e.tagName == "SELECT") {
          for (var i = e.options.length - 1; i >= 0; i--) if (n.selectExtensions.readValue(e.options[i]) == r) {
            e.selectedIndex = i;
            break
          }
        } else {
          if (r === null || r === t) r = "";
          e.value = r
        }
      }
    }
  } (),
  n.exportSymbol("ko.selectExtensions", n.selectExtensions),
  n.exportSymbol("ko.selectExtensions.readValue", n.selectExtensions.readValue),
  n.exportSymbol("ko.selectExtensions.writeValue", n.selectExtensions.writeValue),
  n.jsonExpressionRewriting = function() {
    function i(t, n) {
      return t.replace(e,
      function(e, t) {
        return n[t]
      })
    }
    function s(e) {
      return n.utils.arrayIndexOf(r, n.utils.stringTrim(e).toLowerCase()) >= 0 ? !1 : e.match(t) !== null
    }
    var e = /\[ko_token_(\d+)\]/g,
    t = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i,
    r = ["true", "false"];
    return {
      parseJson: function(e) {
        e = n.utils.stringTrim(e);
        if (e.length < 3) return {};
        var t = [],
        r = null,
        s;
        for (var o = e.charAt(0) == "{" ? 1 : 0; o < e.length; o++) {
          var u = e.charAt(o);
          if (r === null) switch (u) {
          case '"':
          case "'":
          case "/":
            r = o,
            s = u;
            break;
          case "{":
            r = o,
            s = "}";
            break;
          case "[":
            r = o,
            s = "]"
          } else if (u == s) {
            var a = e.substring(r, o + 1);
            t.push(a);
            var f = "[ko_token_" + (t.length - 1) + "]";
            e = e.substring(0, r) + f + e.substring(o + 1),
            o -= a.length - f.length,
            r = null
          }
        }
        var l = {},
        c = e.split(",");
        for (var h = 0,
        p = c.length; h < p; h++) {
          var d = c[h],
          v = d.indexOf(":");
          if (v > 0 && v < d.length - 1) {
            var m = n.utils.stringTrim(d.substring(0, v)),
            g = n.utils.stringTrim(d.substring(v + 1));
            m.charAt(0) == "{" && (m = m.substring(1)),
            g.charAt(g.length - 1) == "}" && (g = g.substring(0, g.length - 1)),
            m = n.utils.stringTrim(i(m, t)),
            g = n.utils.stringTrim(i(g, t)),
            l[m] = g
          }
        }
        return l
      },
      insertPropertyAccessorsIntoJson: function(e) {
        var t = n.jsonExpressionRewriting.parseJson(e),
        r = [];
        for (var i in t) {
          var o = t[i];
          s(o) && (r.length > 0 && r.push(", "), r.push(i + " : function(__ko_value) { " + o + " = __ko_value; }"))
        }
        if (r.length > 0) {
          var u = r.join("");
          e = e + ", '_ko_property_writers' : { " + u + " } "
        }
        return e
      }
    }
  } (),
  n.exportSymbol("ko.jsonExpressionRewriting", n.jsonExpressionRewriting),
  n.exportSymbol("ko.jsonExpressionRewriting.parseJson", n.jsonExpressionRewriting.parseJson),
  n.exportSymbol("ko.jsonExpressionRewriting.insertPropertyAccessorsIntoJson", n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson),
  function() {
    function i(t, r) {
      try {
        var i = " { " + n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t) + " } ";
        return n.utils.evalWithinScope(i, r === null ? e: r)
      } catch(s) {
        throw new Error("Unable to parse binding attribute.\nMessage: " + s + ";\nAttribute value: " + t)
      }
    }
    function s(e, t, n, r, i) {
      e(t, n, r, i)
    }
    var r = "data-bind";
    n.bindingHandlers = {},
    n.applyBindingsToNode = function(e, t, o, u) {
      function l(e) {
        return function() {
          return f[e]
        }
      }
      function c() {
        return f
      }
      var a = !0;
      u = u || r;
      var f;
      new n.dependentObservable(function() {
        var r = typeof t == "function" ? t() : t;
        f = r || i(e.getAttribute(u), o);
        if (a) for (var h in f) n.bindingHandlers[h] && typeof n.bindingHandlers[h]["init"] == "function" && s(n.bindingHandlers[h].init, e, l(h), c, o);
        for (var h in f) n.bindingHandlers[h] && typeof n.bindingHandlers[h]["update"] == "function" && s(n.bindingHandlers[h].update, e, l(h), c, o)
      },
      null, {
        disposeWhenNodeIsRemoved: e
      }),
      a = !1
    },
    n.applyBindings = function(i, s) {
      if (s && s.nodeType == t) throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node (note: this is a breaking change since KO version 1.05)");
      s = s || e.document.body;
      var o = n.utils.getElementsHavingAttribute(s, r);
      n.utils.arrayForEach(o,
      function(e) {
        n.applyBindingsToNode(e, null, i)
      })
    },
    n.exportSymbol("ko.bindingHandlers", n.bindingHandlers),
    n.exportSymbol("ko.applyBindings", n.applyBindings),
    n.exportSymbol("ko.applyBindingsToNode", n.applyBindingsToNode)
  } ();
  var s = ["click"];
  n.utils.arrayForEach(s,
  function(e) {
    n.bindingHandlers[e] = {
      init: function(t, r, i, s) {
        var o = function() {
          var t = {};
          return t[e] = r(),
          t
        };
        return n.bindingHandlers.event.init.call(this, t, o, i, s)
      }
    }
  }),
  n.bindingHandlers.event = {
    init: function(e, t, r, i) {
      var s = t() || {};
      for (var o in s)(function() {
        var s = o;
        typeof s == "string" && n.utils.registerEventHandler(e, s,
        function(e) {
          var n, o = t()[s];
          if (!o) return;
          var u = r();
          try {
            n = o.apply(i, arguments)
          } finally {
            n !== !0 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
          }
          var a = u[s + "Bubble"] !== !1;
          a || (e.cancelBubble = !0, e.stopPropagation && e.stopPropagation())
        })
      })()
    }
  },
  n.bindingHandlers.submit = {
    init: function(e, t, r, i) {
      if (typeof t() != "function") throw new Error("The value for a submit binding must be a function to invoke on submit");
      n.utils.registerEventHandler(e, "submit",
      function(n) {
        var r, s = t();
        try {
          r = s.call(i, e)
        } finally {
          r !== !0 && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
        }
      })
    }
  },
  n.bindingHandlers.visible = {
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t()),
      i = e.style.display != "none";
      r && !i ? e.style.display = "": !r && i && (e.style.display = "none")
    }
  },
  n.bindingHandlers.enable = {
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t());
      r && e.disabled ? e.removeAttribute("disabled") : !r && !e.disabled && (e.disabled = !0)
    }
  },
  n.bindingHandlers.disable = {
    update: function(e, t) {
      n.bindingHandlers.enable.update(e,
      function() {
        return ! n.utils.unwrapObservable(t())
      })
    }
  },
  n.bindingHandlers.value = {
    init: function(e, t, r) {
      var i = ["change"],
      s = r().valueUpdate;
      s && (typeof s == "string" && (s = [s]), n.utils.arrayPushAll(i, s), i = n.utils.arrayGetDistinctValues(i)),
      n.utils.arrayForEach(i,
      function(i) {
        var s = !1;
        n.utils.stringStartsWith(i, "after") && (s = !0, i = i.substring("after".length));
        var o = s ?
        function(e) {
          setTimeout(e, 0)
        }: function(e) {
          e()
        };
        n.utils.registerEventHandler(e, i,
        function() {
          o(function() {
            var i = t(),
            s = n.selectExtensions.readValue(e);
            if (n.isWriteableObservable(i)) i(s);
            else {
              var o = r();
              o._ko_property_writers && o._ko_property_writers.value && o._ko_property_writers.value(s)
            }
          })
        })
      })
    },
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t()),
      i = n.selectExtensions.readValue(e),
      s = r != i;
      r === 0 && i !== 0 && i !== "0" && (s = !0);
      if (s) {
        var o = function() {
          n.selectExtensions.writeValue(e, r)
        };
        o();
        var u = e.tagName == "SELECT";
        u && setTimeout(o, 0)
      }
      e.tagName == "SELECT" && (i = n.selectExtensions.readValue(e), i !== r && n.utils.triggerEvent(e, "change"))
    }
  },
  n.bindingHandlers.options = {
    update: function(e, r, i) {
      if (e.tagName != "SELECT") throw new Error("options binding applies only to SELECT elements");
      var s = n.utils.arrayMap(n.utils.arrayFilter(e.childNodes,
      function(e) {
        return e.tagName && e.tagName == "OPTION" && e.selected
      }),
      function(e) {
        return n.selectExtensions.readValue(e) || e.innerText || e.textContent
      }),
      o = e.scrollTop,
      u = n.utils.unwrapObservable(r()),
      a = e.value;
      n.utils.emptyDomNode(e);
      if (u) {
        var f = i();
        typeof u.length != "number" && (u = [u]);
        if (f.optionsCaption) {
          var l = document.createElement("OPTION");
          l.innerHTML = f.optionsCaption,
          n.selectExtensions.writeValue(l, t),
          e.appendChild(l)
        }
        for (var c = 0,
        h = u.length; c < h; c++) {
          var l = document.createElement("OPTION"),
          p = typeof f["optionsValue"] == "string" ? u[c][f.optionsValue] : u[c];
          p = n.utils.unwrapObservable(p),
          n.selectExtensions.writeValue(l, p);
          var d = f.optionsText;
          typeof d == "function" ? optionText = d(u[c]) : typeof d == "string" ? optionText = u[c][d] : optionText = p;
          if (optionText === null || optionText === t) optionText = "";
          optionText = n.utils.unwrapObservable(optionText).toString(),
          typeof l.innerText == "string" ? l.innerText = optionText: l.textContent = optionText,
          e.appendChild(l)
        }
        var v = e.getElementsByTagName("OPTION"),
        m = 0;
        for (var c = 0,
        h = v.length; c < h; c++) n.utils.arrayIndexOf(s, n.selectExtensions.readValue(v[c])) >= 0 && (n.utils.setOptionNodeSelectionState(v[c], !0), m++);
        o && (e.scrollTop = o)
      }
    }
  },
  n.bindingHandlers.options.optionValueDomDataKey = "__ko.bindingHandlers.options.optionValueDomData__",
  n.bindingHandlers.selectedOptions = {
    getSelectedValuesFromSelectNode: function(e) {
      var t = [],
      r = e.childNodes;
      for (var i = 0,
      s = r.length; i < s; i++) {
        var o = r[i];
        o.tagName == "OPTION" && o.selected && t.push(n.selectExtensions.readValue(o))
      }
      return t
    },
    init: function(e, t, r) {
      n.utils.registerEventHandler(e, "change",
      function() {
        var e = t();
        if (n.isWriteableObservable(e)) e(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this));
        else {
          var i = r();
          i._ko_property_writers && i._ko_property_writers.value && i._ko_property_writers.value(n.bindingHandlers.selectedOptions.getSelectedValuesFromSelectNode(this))
        }
      })
    },
    update: function(e, t) {
      if (e.tagName != "SELECT") throw new Error("values binding applies only to SELECT elements");
      var r = n.utils.unwrapObservable(t());
      if (r && typeof r.length == "number") {
        var i = e.childNodes;
        for (var s = 0,
        o = i.length; s < o; s++) {
          var u = i[s];
          u.tagName == "OPTION" && n.utils.setOptionNodeSelectionState(u, n.utils.arrayIndexOf(r, n.selectExtensions.readValue(u)) >= 0)
        }
      }
    }
  },
  n.bindingHandlers.text = {
    update: function(e, r) {
      var i = n.utils.unwrapObservable(r());
      if (i === null || i === t) i = "";
      typeof e.innerText == "string" ? e.innerText = i: e.textContent = i
    }
  },
  n.bindingHandlers.html = {
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t());
      n.utils.setHtml(e, r)
    }
  },
  n.bindingHandlers.css = {
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t() || {});
      for (var i in r) if (typeof i == "string") {
        var s = n.utils.unwrapObservable(r[i]);
        n.utils.toggleDomNodeCssClass(e, i, s)
      }
    }
  },
  n.bindingHandlers.style = {
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t() || {});
      for (var i in r) if (typeof i == "string") {
        var s = n.utils.unwrapObservable(r[i]);
        e.style[i] = s || ""
      }
    }
  },
  n.bindingHandlers.uniqueName = {
    init: function(e, t) {
      t() && (e.name = "ko_unique_" + ++n.bindingHandlers.uniqueName.currentIndex, n.utils.isIe6 && e.mergeAttributes(document.createElement("<input name='" + e.name + "'/>"), !1))
    }
  },
  n.bindingHandlers.uniqueName.currentIndex = 0,
  n.bindingHandlers.checked = {
    init: function(e, t, r) {
      var i = function() {
        var i;
        if (e.type == "checkbox") i = e.checked;
        else {
          if (e.type != "radio" || !e.checked) return;
          i = e.value
        }
        var s = t();
        if (e.type == "checkbox" && n.utils.unwrapObservable(s) instanceof Array) {
          var o = n.utils.arrayIndexOf(n.utils.unwrapObservable(s), e.value);
          e.checked && o < 0 ? s.push(e.value) : !e.checked && o >= 0 && s.splice(o, 1)
        } else if (n.isWriteableObservable(s)) s() !== i && s(i);
        else {
          var u = r();
          u._ko_property_writers && u._ko_property_writers.checked && u._ko_property_writers.checked(i)
        }
      };
      n.utils.registerEventHandler(e, "click", i),
      e.type == "radio" && !e.name && n.bindingHandlers.uniqueName.init(e,
      function() {
        return ! 0
      })
    },
    update: function(e, t) {
      var r = n.utils.unwrapObservable(t());
      e.type == "checkbox" ? (r instanceof Array ? e.checked = n.utils.arrayIndexOf(r, e.value) >= 0 : e.checked = r, r && n.utils.isIe6 && e.mergeAttributes(document.createElement("<input type='checkbox' checked='checked' />"), !1)) : e.type == "radio" && (e.checked = e.value == r, e.value == r && (n.utils.isIe6 || n.utils.isIe7) && e.mergeAttributes(document.createElement("<input type='radio' checked='checked' />"), !1))
    }
  },
  n.bindingHandlers.attr = {
    update: function(e, r, i) {
      var s = n.utils.unwrapObservable(r()) || {};
      for (var o in s) if (typeof o == "string") {
        var u = n.utils.unwrapObservable(s[o]);
        u === !1 || u === null || u === t ? e.removeAttribute(o) : e.setAttribute(o, u.toString())
      }
    }
  },
  n.templateEngine = function() {
    this.renderTemplate = function(e, t, n) {
      throw "Override renderTemplate in your ko.templateEngine subclass"
    },
    this.isTemplateRewritten = function(e) {
      throw "Override isTemplateRewritten in your ko.templateEngine subclass"
    },
    this.rewriteTemplate = function(e, t) {
      throw "Override rewriteTemplate in your ko.templateEngine subclass"
    },
    this.createJavaScriptEvaluatorBlock = function(e) {
      throw "Override createJavaScriptEvaluatorBlock in your ko.templateEngine subclass"
    }
  },
  n.exportSymbol("ko.templateEngine", n.templateEngine),
  n.templateRewriting = function() {
    var e = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;
    return {
      ensureTemplateIsRewritten: function(e, t) {
        t.isTemplateRewritten(e) || t.rewriteTemplate(e,
        function(e) {
          return n.templateRewriting.memoizeBindingAttributeSyntax(e, t)
        })
      },
      memoizeBindingAttributeSyntax: function(t, r) {
        return t.replace(e,
        function() {
          var e = arguments[1],
          t = arguments[6];
          t = n.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(t);
          var i = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                     return (function() { return { " + t + " } })()                 })";
          return r.createJavaScriptEvaluatorBlock(i) + e
        })
      },
      applyMemoizedBindingsToNextSibling: function(e) {
        return n.memoization.memoize(function(t, r) {
          t.nextSibling && n.applyBindingsToNode(t.nextSibling, e, r)
        })
      }
    }
  } (),
  n.exportSymbol("ko.templateRewriting", n.templateRewriting),
  n.exportSymbol("ko.templateRewriting.applyMemoizedBindingsToNextSibling", n.templateRewriting.applyMemoizedBindingsToNextSibling),
  function() {
    function r(e) {
      return e.nodeType ? e: e.length > 0 ? e[0] : null
    }
    function i(t, r, i, s, o) {
      var u = n.utils.unwrapObservable(s);
      o = o || {};
      var a = o.templateEngine || e;
      n.templateRewriting.ensureTemplateIsRewritten(i, a);
      var f = a.renderTemplate(i, u, o);
      if (typeof f.length != "number" || f.length > 0 && typeof f[0].nodeType != "number") throw "Template engine must return an array of DOM nodes";
      f && n.utils.arrayForEach(f,
      function(e) {
        n.memoization.unmemoizeDomNodeAndDescendants(e, [s])
      });
      switch (r) {
      case "replaceChildren":
        n.utils.setDomNodeChildren(t, f);
        break;
      case "replaceNode":
        n.utils.replaceDomNodes(t, f);
        break;
      case "ignoreTargetNode":
        break;
      default:
        throw new Error("Unknown renderMode: " + r)
      }
      return o.afterRender && o.afterRender(f, s),
      f
    }
    function o(e, t) {
      var r = n.utils.domData.get(e, s);
      r && typeof r.dispose == "function" && r.dispose(),
      n.utils.domData.set(e, s, t)
    }
    var e;
    n.setTemplateEngine = function(r) {
      if (! (r == t || r instanceof n.templateEngine)) throw "templateEngine must inherit from ko.templateEngine";
      e = r
    },
    n.renderTemplate = function(s, o, u, a, f) {
      u = u || {};
      if ((u["templateEngine"] || e) == t) throw "Set a template engine before calling renderTemplate";
      f = f || "replaceChildren";
      if (a) {
        var l = r(a),
        c = function() {
          return ! l || !n.utils.domNodeIsAttachedToDocument(l)
        },
        h = l && f == "replaceNode" ? l.parentNode: l;
        return new n.dependentObservable(function() {
          var e = typeof s == "function" ? s(o) : s,
          t = i(a, f, e, o, u);
          f == "replaceNode" && (a = t, l = r(a))
        },
        null, {
          disposeWhen: c,
          disposeWhenNodeIsRemoved: h
        })
      }
      return n.memoization.memoize(function(e) {
        n.renderTemplate(s, o, u, e, "replaceNode")
      })
    },
    n.renderTemplateForEach = function(e, t, r, s) {
      return new n.dependentObservable(function() {
        var o = n.utils.unwrapObservable(t) || [];
        typeof o.length == "undefined" && (o = [o]);
        var u = n.utils.arrayFilter(o,
        function(e) {
          return r.includeDestroyed || !e._destroy
        });
        n.utils.setDomNodeChildrenFromArrayMapping(s, u,
        function(t) {
          var n = typeof e == "function" ? e(t) : e;
          return i(null, "ignoreTargetNode", n, t, r)
        },
        r)
      },
      null, {
        disposeWhenNodeIsRemoved: s
      })
    };
    var s = "__ko__templateSubscriptionDomDataKey__";
    n.bindingHandlers.template = {
      update: function(e, t, r, i) {
        var s = n.utils.unwrapObservable(t()),
        u = typeof s == "string" ? s: s.name,
        a;
        if (typeof s["foreach"] != "undefined") a = n.renderTemplateForEach(u, s.foreach || [], {
          templateOptions: s.templateOptions,
          afterAdd: s.afterAdd,
          beforeRemove: s.beforeRemove,
          includeDestroyed: s.includeDestroyed,
          afterRender: s.afterRender
        },
        e);
        else {
          var f = s.data;
          a = n.renderTemplate(u, typeof f == "undefined" ? i: f, {
            templateOptions: s.templateOptions,
            afterRender: s.afterRender
          },
          e)
        }
        o(e, a)
      }
    }
  } (),
  n.exportSymbol("ko.setTemplateEngine", n.setTemplateEngine),
  n.exportSymbol("ko.renderTemplate", n.renderTemplate),
  function() {
    function e(e, n, r) {
      var i = [];
      for (var s = 0; s <= n.length; s++) i[s] = [];
      for (var s = 0,
      o = Math.min(e.length, r); s <= o; s++) i[0][s] = s;
      for (var s = 1,
      o = Math.min(n.length, r); s <= o; s++) i[s][0] = s;
      var u, a = e.length,
      f, l = n.length,
      c, h;
      for (u = 1; u <= a; u++) {
        var p = Math.max(1, u - r),
        d = Math.min(l, u + r);
        for (f = p; f <= d; f++) if (e[u - 1] === n[f - 1]) i[f][u] = i[f - 1][u - 1];
        else {
          var v = i[f - 1][u] === t ? Number.MAX_VALUE: i[f - 1][u] + 1,
          m = i[f][u - 1] === t ? Number.MAX_VALUE: i[f][u - 1] + 1;
          i[f][u] = Math.min(v, m)
        }
      }
      return i
    }
    function r(e, n, r) {
      var i = n.length,
      s = r.length,
      o = [],
      u = e[s][i];
      if (u === t) return null;
      while (i > 0 || s > 0) {
        var a = e[s][i],
        f = s > 0 ? e[s - 1][i] : u + 1,
        l = i > 0 ? e[s][i - 1] : u + 1,
        c = s > 0 && i > 0 ? e[s - 1][i - 1] : u + 1;
        if (f === t || f < a - 1) f = u + 1;
        if (l === t || l < a - 1) l = u + 1;
        c < a - 1 && (c = u + 1),
        f <= l && f < c ? (o.push({
          status: "added",
          value: r[s - 1]
        }), s--) : l < f && l < c ? (o.push({
          status: "deleted",
          value: n[i - 1]
        }), i--) : (o.push({
          status: "retained",
          value: n[i - 1]
        }), s--, i--)
      }
      return o.reverse()
    }
    n.utils.compareArrays = function(i, s, o) {
      if (o === t) return n.utils.compareArrays(i, s, 1) || n.utils.compareArrays(i, s, 10) || n.utils.compareArrays(i, s, Number.MAX_VALUE);
      i = i || [],
      s = s || [];
      var u = e(i, s, o);
      return r(u, i, s)
    }
  } (),
  n.exportSymbol("ko.utils.compareArrays", n.utils.compareArrays),
  function() {
    function e(e, t, r) {
      var i = [],
      s = n.dependentObservable(function() {
        var e = t(r) || [];
        i.length > 0 && n.utils.replaceDomNodes(i, e),
        i.splice(0, i.length),
        n.utils.arrayPushAll(i, e)
      },
      null, {
        disposeWhenNodeIsRemoved: e,
        disposeWhen: function() {
          return i.length == 0 || !n.utils.domNodeIsAttachedToDocument(i[0])
        }
      });
      return {
        mappedNodes: i,
        dependentObservable: s
      }
    }
    n.utils.setDomNodeChildrenFromArrayMapping = function(r, i, s, o) {
      i = i || [],
      o = o || {};
      var u = n.utils.domData.get(r, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === t,
      a = n.utils.domData.get(r, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [],
      f = n.utils.arrayMap(a,
      function(e) {
        return e.arrayEntry
      }),
      l = n.utils.compareArrays(f, i),
      c = [],
      h = 0,
      p = [],
      d = [],
      v = null;
      for (var m = 0,
      g = l.length; m < g; m++) switch (l[m].status) {
      case "retained":
        var y = a[h];
        c.push(y),
        y.domNodes.length > 0 && (v = y.domNodes[y.domNodes.length - 1]),
        h++;
        break;
      case "deleted":
        a[h].dependentObservable.dispose(),
        n.utils.arrayForEach(a[h].domNodes,
        function(e) {
          p.push({
            element: e,
            index: m,
            value: l[m].value
          }),
          v = e
        }),
        h++;
        break;
      case "added":
        var b = e(r, s, l[m].value),
        w = b.mappedNodes;
        c.push({
          arrayEntry: l[m].value,
          domNodes: w,
          dependentObservable: b.dependentObservable
        });
        for (var E = 0,
        S = w.length; E < S; E++) {
          var x = w[E];
          d.push({
            element: x,
            index: m,
            value: l[m].value
          }),
          v == null ? r.firstChild ? r.insertBefore(x, r.firstChild) : r.appendChild(x) : v.nextSibling ? r.insertBefore(x, v.nextSibling) : r.appendChild(x),
          v = x
        }
      }
      n.utils.arrayForEach(p,
      function(e) {
        n.cleanNode(e.element)
      });
      var T = !1;
      if (!u) {
        if (o.afterAdd) for (var m = 0; m < d.length; m++) o.afterAdd(d[m].element, d[m].index, d[m].value);
        if (o.beforeRemove) {
          for (var m = 0; m < p.length; m++) o.beforeRemove(p[m].element, p[m].index, p[m].value);
          T = !0
        }
      }
      T || n.utils.arrayForEach(p,
      function(e) {
        e.element.parentNode && e.element.parentNode.removeChild(e.element)
      }),
      n.utils.domData.set(r, "setDomNodeChildrenFromArrayMapping_lastMappingResult", c)
    }
  } (),
  n.exportSymbol("ko.utils.setDomNodeChildrenFromArrayMapping", n.utils.setDomNodeChildrenFromArrayMapping),
  n.jqueryTmplTemplateEngine = function() {
    this.jQueryTmplVersion = function() {
      if (typeof jQuery == "undefined" || !jQuery.tmpl) return 0;
      if (jQuery.tmpl.tag) return jQuery.tmpl.tag.tmpl && jQuery.tmpl.tag.tmpl.open && jQuery.tmpl.tag.tmpl.open.toString().indexOf("__") >= 0 ? 3 : 2;
      return 1
    } (),
    this.getTemplateNode = function(e) {
      var t = document.getElementById(e);
      if (t == null) throw new Error("Cannot find template with ID=" + e);
      return t
    };
    var e = "__ko_apos__",
    t = new RegExp(e, "g");
    this.renderTemplate = function(e, n, r) {
      r = r || {};
      if (this.jQueryTmplVersion == 0) throw new Error("jquery.tmpl not detected.\nTo use KO's default template engine, reference jQuery and jquery.tmpl. See Knockout installation documentation for more details.");
      if (this.jQueryTmplVersion == 1) {
        var i = '<script type="text/html">' + this.getTemplateNode(e).text + "</script>",
        s = jQuery.tmpl(i, n),
        o = s[0].text.replace(t, "'");
        return jQuery.clean([o], document)
      }
      if (! (e in jQuery.template)) {
        var u = this.getTemplateNode(e).text;
        jQuery.template(e, u)
      }
      n = [n];
      var a = jQuery.tmpl(e, n, r.templateOptions);
      return a.appendTo(document.createElement("div")),
      jQuery.fragments = {},
      a
    },
    this.isTemplateRewritten = function(e) {
      return e in jQuery.template ? !0 : this.getTemplateNode(e).isRewritten === !0
    },
    this.rewriteTemplate = function(t, r) {
      var i = this.getTemplateNode(t);
      text = i.text.replace(/([\w-]+)=([\w-]+)([ >])/g,
      function(e, t, n, r, i, s) {
        return t + '="' + n + '"' + r
      });
      var s = r(text);
      this.jQueryTmplVersion == 1 && (s = n.utils.stringTrim(s), s = s.replace(/([\s\S]*?)(\${[\s\S]*?}|{{[\=a-z][\s\S]*?}}|$)/g,
      function(t) {
        var n = arguments[1],
        r = arguments[2];
        return n.replace(/\'/g, e) + r
      })),
      i.text = s,
      i.isRewritten = !0
    },
    this.createJavaScriptEvaluatorBlock = function(e) {
      return this.jQueryTmplVersion == 1 ? "{{= " + e + "}}": "{{ko_code ((function() { return " + e + " })()) }}"
    },
    this.addTemplate = function(e, t) {
      document.write("<script type='text/html' id='" + e + "'>" + t + "</script>")
    },
    n.exportProperty(this, "addTemplate", this.addTemplate),
    this.jQueryTmplVersion > 1 && (jQuery.tmpl.tag.ko_code = {
      open: (this.jQueryTmplVersion < 3 ? "_": "__") + ".push($1 || '');"
    })
  },
  n.jqueryTmplTemplateEngine.prototype = new n.templateEngine,
  n.setTemplateEngine(new n.jqueryTmplTemplateEngine),
  n.exportSymbol("ko.jqueryTmplTemplateEngine", n.jqueryTmplTemplateEngine)
} (window),
ko.exportSymbol = function(e, t) {
  var n = e.split("."),
  r = window;
  for (var i = 0; i < n.length - 1; i++) r = r[n[i]];
  r[n[n.length - 1]] = t
},
ko.exportProperty = function(e, t, n) {
  e[t] = n
},
function() {
  function i(e, t) {
    for (var n in t) t.hasOwnProperty(n) && t[n] && (!e[n] || e[n] instanceof Array ? e[n] = t[n] : i(e[n], t[n]))
  }
  function s(e, t) {
    var n = {};
    return i(n, e),
    i(n, t),
    n
  }
  function o(e) {
    return e && typeof e == "object" && e.constructor == (new Date).constructor ? "date": typeof e
  }
  function u(e, t) {
    e = e || {};
    if (e.create instanceof Function || e.key instanceof Function || e.arrayChanged instanceof Function) e = {
      "": e
    };
    return t && (e.ignore = a(t.ignore, e.ignore), e.include = a(t.include, e.include), e.copy = a(t.copy, e.copy)),
    e.ignore = a(e.ignore, r.ignore),
    e.include = a(e.include, r.include),
    e.copy = a(e.copy, r.copy),
    e.mappedProperties = {},
    e
  }
  function a(e, t) {
    var n = [];
    return e instanceof Array || (o(e) === "undefined" ? e = [] : e = [e]),
    t instanceof Array || (o(t) === "undefined" ? t = [] : t = [t]),
    e.concat(t)
  }
  function f(e) {
    var n = ko.dependentObservable;
    ko.dependentObservable = function() {
      var e = arguments[2] || {};
      e.deferEvaluation = !0;
      var n = new t(arguments[0], arguments[1], e);
      return n.__ko_proto__ = t,
      n
    };
    var r = e();
    return ko.dependentObservable = n,
    r
  }
  function l(t, n, r, i, u, a, h) {
    var g = ko.utils.unwrapObservable(n) instanceof Array;
    h = h || "";
    if (ko.mapping.isMapped(t)) {
      var b = ko.utils.unwrapObservable(t)[e];
      r = s(b, r)
    }
    var w = function() {
      return r[u] && r[u].create instanceof Function
    };
    i = i || new y;
    if (i.get(n)) return t;
    u = u || "";
    if (!g) if (!m(n)) switch (o(n)) {
    case "function":
      t = n;
      break;
    default:
      ko.isWriteableObservable(t) ? t(ko.utils.unwrapObservable(n)) : w() ? t = f(function() {
        return r[u].create({
          data: n,
          parent: a
        })
      }) : t = ko.observable(ko.utils.unwrapObservable(n))
    } else {
      if (!t) {
        if (w()) {
          var E = f(function() {
            return r[u].create({
              data: n,
              parent: a
            })
          });
          return E
        }
        t = {}
      }
      i.save(n, t),
      v(n,
      function(e) {
        var s = h.length ? h + "." + e: e;
        if (ko.utils.arrayIndexOf(r.ignore, s) != -1) return;
        if (ko.utils.arrayIndexOf(r.copy, s) != -1) {
          t[e] = n[e];
          return
        }
        var o, u = i.get(n[e]);
        u ? t[e] = u: t[e] = l(t[e], n[e], r, i, e, t, s),
        r.mappedProperties[s] = !0
      })
    } else {
      var S = [],
      x = function(e) {
        return e
      };
      r[u] && r[u].key && (x = r[u].key);
      var T = function(e) {
        return e
      };
      w() && (T = function(e) {
        return r[u].create({
          data: e,
          parent: a
        })
      }),
      ko.isObservable(t) || (t = ko.observableArray([]), t.mappedRemove = function(e) {
        var n = typeof e == "function" ? e: function(t) {
          return t === x(e)
        };
        return t.remove(function(e) {
          return n(x(e))
        })
      },
      t.mappedRemoveAll = function(e) {
        var n = d(e, x);
        return t.remove(function(e) {
          return ko.utils.arrayIndexOf(n, x(e)) != -1
        })
      },
      t.mappedDestroy = function(e) {
        var n = typeof e == "function" ? e: function(t) {
          return t === x(e)
        };
        return t.destroy(function(e) {
          return n(x(e))
        })
      },
      t.mappedDestroyAll = function(e) {
        var n = d(e, x);
        return t.destroy(function(e) {
          return ko.utils.arrayIndexOf(n, x(e)) != -1
        })
      },
      t.mappedIndexOf = function(e) {
        var n = d(t(), x),
        r = x(e);
        return ko.utils.arrayIndexOf(n, r)
      },
      t.mappedCreate = function(e) {
        if (t.mappedIndexOf(e) !== -1) throw new Error("There already is an object with the key that you specified.");
        var n = T(e);
        return t.push(n),
        n
      });
      var N = d(ko.utils.unwrapObservable(t), x).sort(),
      C = d(n, x).sort(),
      k = ko.utils.compareArrays(N, C),
      L = {},
      A = [];
      for (var O = 0,
      M = k.length; O < M; O++) {
        var _ = k[O],
        D,
        P = h + "[" + O + "]";
        switch (_.status) {
        case "added":
          var H = p(ko.utils.unwrapObservable(n), _.value, x);
          D = ko.utils.unwrapObservable(l(undefined, H, r, i, u, t, P));
          var B = c(ko.utils.unwrapObservable(n), H, L);
          A[B] = D,
          L[B] = !0;
          break;
        case "retained":
          var H = p(ko.utils.unwrapObservable(n), _.value, x);
          D = p(t, _.value, x),
          l(D, H, r, i, u, t, P);
          var B = c(ko.utils.unwrapObservable(n), H, L);
          A[B] = D,
          L[B] = !0;
          break;
        case "deleted":
          D = p(t, _.value, x)
        }
        S.push({
          event: _.status,
          item: D
        })
      }
      t(A),
      r[u] && r[u].arrayChanged && ko.utils.arrayForEach(S,
      function(e) {
        r[u].arrayChanged(e.event, e.item)
      })
    }
    return t
  }
  function c(e, t, n) {
    for (var r = 0,
    i = e.length; r < i; r++) {
      if (n[r] === !0) continue;
      if (e[r] == t) return r
    }
    return null
  }
  function h(e, t) {
    var n;
    return t && (n = t(e)),
    o(n) === "undefined" && (n = e),
    ko.utils.unwrapObservable(n)
  }
  function p(e, t, n) {
    var r = ko.utils.arrayFilter(ko.utils.unwrapObservable(e),
    function(e) {
      return h(e, n) == t
    });
    if (r.length == 0) throw new Error("When calling ko.update*, the key '" + t + "' was not found!");
    if (r.length > 1 && m(r[0])) throw new Error("When calling ko.update*, the key '" + t + "' was not unique!");
    return r[0]
  }
  function d(e, t) {
    return ko.utils.arrayMap(ko.utils.unwrapObservable(e),
    function(e) {
      return t ? h(e, t) : e
    })
  }
  function v(e, t) {
    if (e instanceof Array) for (var n = 0; n < e.length; n++) t(n);
    else for (var r in e) t(r)
  }
  function m(e) {
    var t = o(e);
    return t == "object" && e !== null && t !== "undefined"
  }
  function g(e, t, n) {
    var r = e || "";
    return t instanceof Array ? e && (r += "[" + n + "]") : (e && (r += "."), r += n),
    r
  }
  function y() {
    var e = [],
    t = [];
    this.save = function(n, r) {
      var i = ko.utils.arrayIndexOf(e, n);
      i >= 0 ? t[i] = r: (e.push(n), t.push(r))
    },
    this.get = function(n) {
      var r = ko.utils.arrayIndexOf(e, n);
      return r >= 0 ? t[r] : undefined
    }
  }
  ko.mapping = {};
  var e = "__ko_mapping__",
  t = ko.dependentObservable,
  n = {
    include: ["_destroy"],
    ignore: [],
    copy: []
  },
  r = n;
  ko.mapping.fromJS = function(t, n, r) {
    if (arguments.length == 0) throw new Error("When calling ko.fromJS, pass the object you want to convert.");
    n = u(n);
    var i = l(r, t, n);
    return i[e] = s(i[e], n),
    i
  },
  ko.mapping.fromJSON = function(e, t) {
    var n = ko.utils.parseJson(e);
    return ko.mapping.fromJS(n, t)
  },
  ko.mapping.isMapped = function(t) {
    var n = ko.utils.unwrapObservable(t);
    return n && n[e]
  },
  ko.mapping.updateFromJS = function(t, n) {
    if (arguments.length < 2) throw new Error("When calling ko.updateFromJS, pass: the object to update and the object you want to update from.");
    if (!t) throw new Error("The object is undefined.");
    if (!t[e]) throw new Error("The object you are trying to update was not created by a 'fromJS' or 'fromJSON' mapping.");
    return l(t, n, t[e])
  },
  ko.mapping.updateFromJSON = function(e, t, n) {
    var r = ko.utils.parseJson(t);
    return ko.mapping.updateFromJS(e, r, n)
  },
  ko.mapping.toJS = function(t, n) {
    r || ko.mapping.resetDefaultOptions();
    if (arguments.length == 0) throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.");
    if (r.ignore instanceof Array) {
      if (r.include instanceof Array) {
        if (r.copy instanceof Array) return n = u(n, t[e]),
        ko.mapping.visitModel(t,
        function(e) {
          return ko.utils.unwrapObservable(e)
        },
        n);
        throw new Error("ko.mapping.defaultOptions().copy should be an array.")
      }
      throw new Error("ko.mapping.defaultOptions().include should be an array.")
    }
    throw new Error("ko.mapping.defaultOptions().ignore should be an array.")
  },
  ko.mapping.toJSON = function(e, t) {
    var n = ko.mapping.toJS(e, t);
    return ko.utils.stringifyJson(n)
  },
  ko.mapping.defaultOptions = function() {
    if (! (arguments.length > 0)) return r;
    r = arguments[0]
  },
  ko.mapping.resetDefaultOptions = function() {
    r = {
      include: n.include.slice(0),
      ignore: n.ignore.slice(0),
      copy: n.copy.slice(0)
    }
  },
  ko.mapping.visitModel = function(t, n, r) {
    r = r || {},
    r.visitedObjects = r.visitedObjects || new y,
    r.parentName || (r = u(r));
    var i, s = ko.utils.unwrapObservable(t);
    if (!m(s)) return n(t, r.parentName);
    n(t, r.parentName),
    i = s instanceof Array ? [] : {},
    r.visitedObjects.save(t, i);
    var a = r.parentName;
    return v(s,
    function(t) {
      if (r.ignore && ko.utils.arrayIndexOf(r.ignore, t) != -1) return;
      var u = s[t];
      r.parentName = g(a, s, t);
      if (ko.utils.arrayIndexOf(r.copy, t) === -1 && ko.utils.arrayIndexOf(r.include, t) === -1 && s[e] && s[e].mappedProperties && !s[e].mappedProperties[t] && !(s instanceof Array)) return;
      var f;
      switch (o(ko.utils.unwrapObservable(u))) {
      case "object":
      case "undefined":
        var l = r.visitedObjects.get(u);
        i[t] = o(l) !== "undefined" ? l: ko.mapping.visitModel(u, n, r);
        break;
      default:
        i[t] = n(u, r.parentName)
      }
    }),
    i
  },
  ko.exportSymbol("ko.mapping", ko.mapping),
  ko.exportSymbol("ko.mapping.fromJS", ko.mapping.fromJS),
  ko.exportSymbol("ko.mapping.fromJSON", ko.mapping.fromJSON),
  ko.exportSymbol("ko.mapping.isMapped", ko.mapping.isMapped),
  ko.exportSymbol("ko.mapping.defaultOptions", ko.mapping.defaultOptions),
  ko.exportSymbol("ko.mapping.toJS", ko.mapping.toJS),
  ko.exportSymbol("ko.mapping.toJSON", ko.mapping.toJSON),
  ko.exportSymbol("ko.mapping.updateFromJS", ko.mapping.updateFromJS),
  ko.exportSymbol("ko.mapping.updateFromJSON", ko.mapping.updateFromJSON),
  ko.exportSymbol("ko.mapping.visitModel", ko.mapping.visitModel)
} (),
function(e) {
  var t = "data-bind";
  e.currentlyBindingNamespace = "",
  e.applyBindings = function(n, r, i) {
    r && r.nodeType !== undefined ? (i = r, r = "") : (r = r || "", i = i || window.document.body),
    e.currentlyBindingNamespace = r;
    var s = r.length > 0 ? "-" + r: "",
    o = t + s,
    u = e.utils.getElementsHavingAttribute(i, o);
    e.utils.arrayForEach(u,
    function(t) {
      e.applyBindingsToNode(t, null, n, o)
    }),
    e.currentlyBindingNamespace = ""
  },
  e.templateRewriting = function() {
    var t = /(<[a-z]+\d*(\s+(?!data-bind(-[a-z0-9\-]*)?=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind(-[a-z0-9\-]*)?=(["'])([\s\S]*?)\7/gi;
    return {
      ensureTemplateIsRewritten: function(t, n) {
        n.isTemplateRewritten(t) || n.rewriteTemplate(t,
        function(t) {
          return e.templateRewriting.memoizeBindingAttributeSyntax(t, n)
        })
      },
      memoizeBindingAttributeSyntax: function(n, r) {
        return n.replace(t,
        function(t) {
          var n = arguments[1],
          i = arguments[8],
          s = arguments[6] ? arguments[6].slice(1) : "";
          if (s === "" || s === e.currentlyBindingNamespace) {
            i = e.jsonExpressionRewriting.insertPropertyAccessorsIntoJson(i);
            var o = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {                         return (function() { return { " + i + " } })()                     })";
            return r.createJavaScriptEvaluatorBlock(o) + n
          }
          return t
        })
      },
      applyMemoizedBindingsToNextSibling: function(t) {
        return e.memoization.memoize(function(n, r) {
          n.nextSibling && e.applyBindingsToNode(n.nextSibling, t, r)
        })
      }
    }
  } ()
} (ko),
function() {
  function C(e, t, n) {
    if (e === t) return e !== 0 || 1 / e == 1 / t;
    if (e == null || t == null) return e === t;
    e._chain && (e = e._wrapped),
    t._chain && (t = t._wrapped);
    if (e.isEqual && S.isFunction(e.isEqual)) return e.isEqual(t);
    if (t.isEqual && S.isFunction(t.isEqual)) return t.isEqual(e);
    var r = a.call(e);
    if (r != a.call(t)) return ! 1;
    switch (r) {
    case "[object String]":
      return e == String(t);
    case "[object Number]":
      return e != +e ? t != +t: e == 0 ? 1 / e == 1 / t: e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return + e == +t;
    case "[object RegExp]":
      return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
    }
    if (typeof e != "object" || typeof t != "object") return ! 1;
    var i = n.length;
    while (i--) if (n[i] == e) return ! 0;
    n.push(e);
    var s = 0,
    o = !0;
    if (r == "[object Array]") {
      s = e.length,
      o = s == t.length;
      if (o) while (s--) if (! (o = s in e == s in t && C(e[s], t[s], n))) break
    } else {
      if ("constructor" in e != "constructor" in t || e.constructor != t.constructor) return ! 1;
      for (var u in e) if (S.has(e, u)) {
        s++;
        if (! (o = S.has(t, u) && C(e[u], t[u], n))) break
      }
      if (o) {
        for (u in t) if (S.has(t, u) && !(s--)) break;
        o = !s
      }
    }
    return n.pop(),
    o
  }
  var e = this,
  t = e._,
  n = {},
  r = Array.prototype,
  i = Object.prototype,
  s = Function.prototype,
  o = r.slice,
  u = r.unshift,
  a = i.toString,
  f = i.hasOwnProperty,
  l = r.forEach,
  c = r.map,
  h = r.reduce,
  p = r.reduceRight,
  d = r.filter,
  v = r.every,
  m = r.some,
  g = r.indexOf,
  y = r.lastIndexOf,
  b = Array.isArray,
  w = Object.keys,
  E = s.bind,
  S = function(e) {
    return new O(e)
  };
  typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = S), exports._ = S) : e._ = S,
  S.VERSION = "1.3.1";
  var x = S.each = S.forEach = function(e, t, r) {
    if (e == null) return;
    if (l && e.forEach === l) e.forEach(t, r);
    else if (e.length === +e.length) {
      for (var i = 0,
      s = e.length; i < s; i++) if (i in e && t.call(r, e[i], i, e) === n) return
    } else for (var o in e) if (S.has(e, o) && t.call(r, e[o], o, e) === n) return
  };
  S.map = S.collect = function(e, t, n) {
    var r = [];
    return e == null ? r: c && e.map === c ? e.map(t, n) : (x(e,
    function(e, i, s) {
      r[r.length] = t.call(n, e, i, s)
    }), e.length === +e.length && (r.length = e.length), r)
  },
  S.reduce = S.foldl = S.inject = function(e, t, n, r) {
    var i = arguments.length > 2;
    e == null && (e = []);
    if (h && e.reduce === h) return r && (t = S.bind(t, r)),
    i ? e.reduce(t, n) : e.reduce(t);
    x(e,
    function(e, s, o) {
      i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
    });
    if (!i) throw new TypeError("Reduce of empty array with no initial value");
    return n
  },
  S.reduceRight = S.foldr = function(e, t, n, r) {
    var i = arguments.length > 2;
    e == null && (e = []);
    if (p && e.reduceRight === p) return r && (t = S.bind(t, r)),
    i ? e.reduceRight(t, n) : e.reduceRight(t);
    var s = S.toArray(e).reverse();
    return r && !i && (t = S.bind(t, r)),
    i ? S.reduce(s, t, n, r) : S.reduce(s, t)
  },
  S.find = S.detect = function(e, t, n) {
    var r;
    return T(e,
    function(e, i, s) {
      if (t.call(n, e, i, s)) return r = e,
      !0
    }),
    r
  },
  S.filter = S.select = function(e, t, n) {
    var r = [];
    return e == null ? r: d && e.filter === d ? e.filter(t, n) : (x(e,
    function(e, i, s) {
      t.call(n, e, i, s) && (r[r.length] = e)
    }), r)
  },
  S.reject = function(e, t, n) {
    var r = [];
    return e == null ? r: (x(e,
    function(e, i, s) {
      t.call(n, e, i, s) || (r[r.length] = e)
    }), r)
  },
  S.every = S.all = function(e, t, r) {
    var i = !0;
    return e == null ? i: v && e.every === v ? e.every(t, r) : (x(e,
    function(e, s, o) {
      if (! (i = i && t.call(r, e, s, o))) return n
    }), i)
  };
  var T = S.some = S.any = function(e, t, r) {
    t || (t = S.identity);
    var i = !1;
    return e == null ? i: m && e.some === m ? e.some(t, r) : (x(e,
    function(e, s, o) {
      if (i || (i = t.call(r, e, s, o))) return n
    }), !!i)
  };
  S.include = S.contains = function(e, t) {
    var n = !1;
    return e == null ? n: g && e.indexOf === g ? e.indexOf(t) != -1 : (n = T(e,
    function(e) {
      return e === t
    }), n)
  },
  S.invoke = function(e, t) {
    var n = o.call(arguments, 2);
    return S.map(e,
    function(e) {
      return (S.isFunction(t) ? t || e: e[t]).apply(e, n)
    })
  },
  S.pluck = function(e, t) {
    return S.map(e,
    function(e) {
      return e[t]
    })
  },
  S.max = function(e, t, n) {
    if (!t && S.isArray(e)) return Math.max.apply(Math, e);
    if (!t && S.isEmpty(e)) return - Infinity;
    var r = {
      computed: -Infinity
    };
    return x(e,
    function(e, i, s) {
      var o = t ? t.call(n, e, i, s) : e;
      o >= r.computed && (r = {
        value: e,
        computed: o
      })
    }),
    r.value
  },
  S.min = function(e, t, n) {
    if (!t && S.isArray(e)) return Math.min.apply(Math, e);
    if (!t && S.isEmpty(e)) return Infinity;
    var r = {
      computed: Infinity
    };
    return x(e,
    function(e, i, s) {
      var o = t ? t.call(n, e, i, s) : e;
      o < r.computed && (r = {
        value: e,
        computed: o
      })
    }),
    r.value
  },
  S.shuffle = function(e) {
    var t = [],
    n;
    return x(e,
    function(e, r, i) {
      r == 0 ? t[0] = e: (n = Math.floor(Math.random() * (r + 1)), t[r] = t[n], t[n] = e)
    }),
    t
  },
  S.sortBy = function(e, t, n) {
    return S.pluck(S.map(e,
    function(e, r, i) {
      return {
        value: e,
        criteria: t.call(n, e, r, i)
      }
    }).sort(function(e, t) {
      var n = e.criteria,
      r = t.criteria;
      return n < r ? -1 : n > r ? 1 : 0
    }), "value")
  },
  S.groupBy = function(e, t) {
    var n = {},
    r = S.isFunction(t) ? t: function(e) {
      return e[t]
    };
    return x(e,
    function(e, t) {
      var i = r(e, t); (n[i] || (n[i] = [])).push(e)
    }),
    n
  },
  S.sortedIndex = function(e, t, n) {
    n || (n = S.identity);
    var r = 0,
    i = e.length;
    while (r < i) {
      var s = r + i >> 1;
      n(e[s]) < n(t) ? r = s + 1 : i = s
    }
    return r
  },
  S.toArray = function(e) {
    return e ? e.toArray ? e.toArray() : S.isArray(e) ? o.call(e) : S.isArguments(e) ? o.call(e) : S.values(e) : []
  },
  S.size = function(e) {
    return S.toArray(e).length
  },
  S.first = S.head = function(e, t, n) {
    return t != null && !n ? o.call(e, 0, t) : e[0]
  },
  S.initial = function(e, t, n) {
    return o.call(e, 0, e.length - (t == null || n ? 1 : t))
  },
  S.last = function(e, t, n) {
    return t != null && !n ? o.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
  },
  S.rest = S.tail = function(e, t, n) {
    return o.call(e, t == null || n ? 1 : t)
  },
  S.compact = function(e) {
    return S.filter(e,
    function(e) {
      return !! e
    })
  },
  S.flatten = function(e, t) {
    return S.reduce(e,
    function(e, n) {
      return S.isArray(n) ? e.concat(t ? n: S.flatten(n)) : (e[e.length] = n, e)
    },
    [])
  },
  S.without = function(e) {
    return S.difference(e, o.call(arguments, 1))
  },
  S.uniq = S.unique = function(e, t, n) {
    var r = n ? S.map(e, n) : e,
    i = [];
    return S.reduce(r,
    function(n, r, s) {
      if (0 == s || (t === !0 ? S.last(n) != r: !S.include(n, r))) n[n.length] = r,
      i[i.length] = e[s];
      return n
    },
    []),
    i
  },
  S.union = function() {
    return S.uniq(S.flatten(arguments, !0))
  },
  S.intersection = S.intersect = function(e) {
    var t = o.call(arguments, 1);
    return S.filter(S.uniq(e),
    function(e) {
      return S.every(t,
      function(t) {
        return S.indexOf(t, e) >= 0
      })
    })
  },
  S.difference = function(e) {
    var t = S.flatten(o.call(arguments, 1));
    return S.filter(e,
    function(e) {
      return ! S.include(t, e)
    })
  },
  S.zip = function() {
    var e = o.call(arguments),
    t = S.max(S.pluck(e, "length")),
    n = new Array(t);
    for (var r = 0; r < t; r++) n[r] = S.pluck(e, "" + r);
    return n
  },
  S.indexOf = function(e, t, n) {
    if (e == null) return - 1;
    var r, i;
    if (n) return r = S.sortedIndex(e, t),
    e[r] === t ? r: -1;
    if (g && e.indexOf === g) return e.indexOf(t);
    for (r = 0, i = e.length; r < i; r++) if (r in e && e[r] === t) return r;
    return - 1
  },
  S.lastIndexOf = function(e, t) {
    if (e == null) return - 1;
    if (y && e.lastIndexOf === y) return e.lastIndexOf(t);
    var n = e.length;
    while (n--) if (n in e && e[n] === t) return n;
    return - 1
  },
  S.range = function(e, t, n) {
    arguments.length <= 1 && (t = e || 0, e = 0),
    n = arguments[2] || 1;
    var r = Math.max(Math.ceil((t - e) / n), 0),
    i = 0,
    s = new Array(r);
    while (i < r) s[i++] = e,
    e += n;
    return s
  };
  var N = function() {};
  S.bind = function(t, n) {
    var r, i;
    if (t.bind === E && E) return E.apply(t, o.call(arguments, 1));
    if (!S.isFunction(t)) throw new TypeError;
    return i = o.call(arguments, 2),
    r = function() {
      if (this instanceof r) {
        N.prototype = t.prototype;
        var e = new N,
        s = t.apply(e, i.concat(o.call(arguments)));
        return Object(s) === s ? s: e
      }
      return t.apply(n, i.concat(o.call(arguments)))
    }
  },
  S.bindAll = function(e) {
    var t = o.call(arguments, 1);
    return t.length == 0 && (t = S.functions(e)),
    x(t,
    function(t) {
      e[t] = S.bind(e[t], e)
    }),
    e
  },
  S.memoize = function(e, t) {
    var n = {};
    return t || (t = S.identity),
    function() {
      var r = t.apply(this, arguments);
      return S.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
    }
  },
  S.delay = function(e, t) {
    var n = o.call(arguments, 2);
    return setTimeout(function() {
      return e.apply(e, n)
    },
    t)
  },
  S.defer = function(e) {
    return S.delay.apply(S, [e, 1].concat(o.call(arguments, 1)))
  },
  S.throttle = function(e, t) {
    var n, r, i, s, o, u = S.debounce(function() {
      o = s = !1
    },
    t);
    return function() {
      n = this,
      r = arguments;
      var a = function() {
        i = null,
        o && e.apply(n, r),
        u()
      };
      i || (i = setTimeout(a, t)),
      s ? o = !0 : e.apply(n, r),
      u(),
      s = !0
    }
  },
  S.debounce = function(e, t) {
    var n;
    return function() {
      var r = this,
      i = arguments,
      s = function() {
        n = null,
        e.apply(r, i)
      };
      clearTimeout(n),
      n = setTimeout(s, t)
    }
  },
  S.once = function(e) {
    var t = !1,
    n;
    return function() {
      return t ? n: (t = !0, n = e.apply(this, arguments))
    }
  },
  S.wrap = function(e, t) {
    return function() {
      var n = [e].concat(o.call(arguments, 0));
      return t.apply(this, n)
    }
  },
  S.compose = function() {
    var e = arguments;
    return function() {
      var t = arguments;
      for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
      return t[0]
    }
  },
  S.after = function(e, t) {
    return e <= 0 ? t() : function() {
      if (--e < 1) return t.apply(this, arguments)
    }
  },
  S.keys = w ||
  function(e) {
    if (e !== Object(e)) throw new TypeError("Invalid object");
    var t = [];
    for (var n in e) S.has(e, n) && (t[t.length] = n);
    return t
  },
  S.values = function(e) {
    return S.map(e, S.identity)
  },
  S.functions = S.methods = function(e) {
    var t = [];
    for (var n in e) S.isFunction(e[n]) && t.push(n);
    return t.sort()
  },
  S.extend = function(e) {
    return x(o.call(arguments, 1),
    function(t) {
      for (var n in t) e[n] = t[n]
    }),
    e
  },
  S.defaults = function(e) {
    return x(o.call(arguments, 1),
    function(t) {
      for (var n in t) e[n] == null && (e[n] = t[n])
    }),
    e
  },
  S.clone = function(e) {
    return S.isObject(e) ? S.isArray(e) ? e.slice() : S.extend({},
    e) : e
  },
  S.tap = function(e, t) {
    return t(e),
    e
  },
  S.isEqual = function(e, t) {
    return C(e, t, [])
  },
  S.isEmpty = function(e) {
    if (S.isArray(e) || S.isString(e)) return e.length === 0;
    for (var t in e) if (S.has(e, t)) return ! 1;
    return ! 0
  },
  S.isElement = function(e) {
    return !! e && e.nodeType == 1
  },
  S.isArray = b ||
  function(e) {
    return a.call(e) == "[object Array]"
  },
  S.isObject = function(e) {
    return e === Object(e)
  },
  S.isArguments = function(e) {
    return a.call(e) == "[object Arguments]"
  },
  S.isArguments(arguments) || (S.isArguments = function(e) {
    return !! e && !!S.has(e, "callee")
  }),
  S.isFunction = function(e) {
    return a.call(e) == "[object Function]"
  },
  S.isString = function(e) {
    return a.call(e) == "[object String]"
  },
  S.isNumber = function(e) {
    return a.call(e) == "[object Number]"
  },
  S.isNaN = function(e) {
    return e !== e
  },
  S.isBoolean = function(e) {
    return e === !0 || e === !1 || a.call(e) == "[object Boolean]"
  },
  S.isDate = function(e) {
    return a.call(e) == "[object Date]"
  },
  S.isRegExp = function(e) {
    return a.call(e) == "[object RegExp]"
  },
  S.isNull = function(e) {
    return e === null
  },
  S.isUndefined = function(e) {
    return e === void 0
  },
  S.has = function(e, t) {
    return f.call(e, t)
  },
  S.noConflict = function() {
    return e._ = t,
    this
  },
  S.identity = function(e) {
    return e
  },
  S.times = function(e, t, n) {
    for (var r = 0; r < e; r++) t.call(n, r)
  },
  S.escape = function(e) {
    return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
  },
  S.mixin = function(e) {
    x(S.functions(e),
    function(t) {
      _(t, S[t] = e[t])
    })
  };
  var k = 0;
  S.uniqueId = function(e) {
    var t = k++;
    return e ? e + t: t
  },
  S.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };
  var L = /.^/,
  A = function(e) {
    return e.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
  };
  S.template = function(e, t) {
    var n = S.templateSettings,
    r = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(n.escape || L,
    function(e, t) {
      return "',_.escape(" + A(t) + "),'"
    }).replace(n.interpolate || L,
    function(e, t) {
      return "'," + A(t) + ",'"
    }).replace(n.evaluate || L,
    function(e, t) {
      return "');" + A(t).replace(/[\r\n\t]/g, " ") + ";__p.push('"
    }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
    i = new Function("obj", "_", r);
    return t ? i(t, S) : function(e) {
      return i.call(this, e, S)
    }
  },
  S.chain = function(e) {
    return S(e).chain()
  };
  var O = function(e) {
    this._wrapped = e
  };
  S.prototype = O.prototype;
  var M = function(e, t) {
    return t ? S(e).chain() : e
  },
  _ = function(e, t) {
    O.prototype[e] = function() {
      var e = o.call(arguments);
      return u.call(e, this._wrapped),
      M(t.apply(S, e), this._chain)
    }
  };
  S.mixin(S),
  x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
  function(e) {
    var t = r[e];
    O.prototype[e] = function() {
      var n = this._wrapped;
      t.apply(n, arguments);
      var r = n.length;
      return (e == "shift" || e == "splice") && r === 0 && delete n[0],
      M(n, this._chain)
    }
  }),
  x(["concat", "join", "slice"],
  function(e) {
    var t = r[e];
    O.prototype[e] = function() {
      return M(t.apply(this._wrapped, arguments), this._chain)
    }
  }),
  O.prototype.chain = function() {
    return this._chain = !0,
    this
  },
  O.prototype.value = function() {
    return this._wrapped
  }
}.call(this),
function(e, t, n, r) {
  "use strict";
  var i = n(e),
  s = n(t),
  o = n.fancybox = function() {
    o.open.apply(this, arguments)
  },
  u = null,
  a = t.createTouch !== r,
  f = function(e) {
    return e && e.hasOwnProperty && e instanceof n
  },
  l = function(e) {
    return e && n.type(e) === "string"
  },
  c = function(e) {
    return l(e) && e.indexOf("%") > 0
  },
  h = function(e) {
    return e && (!e.style.overflow || e.style.overflow !== "hidden") && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight)
  },
  p = function(e, t) {
    var n = parseInt(e, 10);
    return t && c(e) && (n = o.getViewport()[t] / 100 * n),
    Math.ceil(n)
  },
  d = function(e, t) {
    return p(e, t) + "px"
  };
  n.extend(o, {
    version: "2.1.0",
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !a,
      autoCenter: !a,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: .5,
      leftRatio: .5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3e3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: {
        dataType: "html",
        headers: {
          "X-fancyBox": !0
        }
      },
      iframe: {
        scrolling: "auto",
        preload: !0
      },
      swf: {
        wmode: "transparent",
        allowfullscreen: "true",
        allowscriptaccess: "always"
      },
      keys: {
        next: {
          13 : "left",
          34 : "up",
          39 : "left",
          40 : "up"
        },
        prev: {
          8 : "right",
          33 : "down",
          37 : "right",
          38 : "down"
        },
        close: [27],
        play: [32],
        toggle: [70]
      },
      direction: {
        next: "left",
        prev: "right"
      },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + (n.browser.msie ? ' allowtransparency="true"': "") + "></iframe>",
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
        overlay: {
          closeClick: !0,
          speedOut: 200,
          showEarly: !0,
          css: {}
        },
        title: {
          type: "float"
        }
      },
      onCancel: n.noop,
      beforeLoad: n.noop,
      afterLoad: n.noop,
      beforeShow: n.noop,
      afterShow: n.noop,
      beforeChange: n.noop,
      beforeClose: n.noop,
      afterClose: n.noop
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: !1
    },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function(e, t) {
      if (!e) return;
      n.isPlainObject(t) || (t = {});
      if (!1 === o.close(!0)) return;
      return n.isArray(e) || (e = f(e) ? n(e).get() : [e]),
      n.each(e,
      function(i, s) {
        var u = {},
        a, c, h, p, d, v, m;
        n.type(s) === "object" && (s.nodeType && (s = n(s)), f(s) ? (u = {
          href: s.attr("href"),
          title: s.attr("title"),
          isDom: !0,
          element: s
        },
        n.metadata && n.extend(!0, u, s.metadata())) : u = s),
        a = t.href || u.href || (l(s) ? s: null),
        c = t.title !== r ? t.title: u.title || "",
        h = t.content || u.content,
        p = h ? "html": t.type || u.type,
        !p && u.isDom && (p = s.data("fancybox-type"), p || (d = s.prop("class").match(/fancybox\.(\w+)/), p = d ? d[1] : null)),
        l(a) && (p || (o.isImage(a) ? p = "image": o.isSWF(a) ? p = "swf": a.charAt(0) === "#" ? p = "inline": l(s) && (p = "html", h = s)), p === "ajax" && (v = a.split(/\s+/, 2), a = v.shift(), m = v.shift())),
        h || (p === "inline" ? a ? h = n(l(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : u.isDom && (h = s) : p === "html" ? h = a: !p && !a && u.isDom && (p = "inline", h = s)),
        n.extend(u, {
          href: a,
          type: p,
          content: h,
          title: c,
          selector: m
        }),
        e[i] = u
      }),
      o.opts = n.extend(!0, {},
      o.defaults, t),
      t.keys !== r && (o.opts.keys = t.keys ? n.extend({},
      o.defaults.keys, t.keys) : !1),
      o.group = e,
      o._start(o.opts.index)
    },
    cancel: function() {
      var e = o.coming;
      if (!e || !1 === o.trigger("onCancel")) return;
      o.hideLoading(),
      o.ajaxLoad && o.ajaxLoad.abort(),
      o.ajaxLoad = null,
      o.imgPreload && (o.imgPreload.onload = o.imgPreload.onerror = null),
      e.wrap && e.wrap.stop(!0).trigger("onReset").remove(),
      o.current || o.trigger("afterClose"),
      o.coming = null
    },
    close: function(e) {
      o.cancel();
      if (!1 === o.trigger("beforeClose")) return;
      o.unbindEvents(),
      !o.isOpen || e === !0 ? (n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), o._afterZoomOut()) : (o.isOpen = o.isOpened = !1, o.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), o.wrap.stop(!0, !0).removeClass("fancybox-opened"), o.wrap.css("position") === "fixed" && o.wrap.css(o._getPosition(!0)), o.transitions[o.current.closeMethod]())
    },
    play: function(e) {
      var t = function() {
        clearTimeout(o.player.timer)
      },
      r = function() {
        t(),
        o.current && o.player.isActive && (o.player.timer = setTimeout(o.next, o.current.playSpeed))
      },
      i = function() {
        t(),
        n("body").unbind(".player"),
        o.player.isActive = !1,
        o.trigger("onPlayEnd")
      },
      s = function() {
        o.current && (o.current.loop || o.current.index < o.group.length - 1) && (o.player.isActive = !0, n("body").bind({
          "afterShow.player onUpdate.player": r,
          "onCancel.player beforeClose.player": i,
          "beforeLoad.player": t
        }), r(), o.trigger("onPlayStart"))
      };
      e === !0 || !o.player.isActive && e !== !1 ? s() : i()
    },
    next: function(e) {
      var t = o.current;
      t && (l(e) || (e = t.direction.next), o.jumpto(t.index + 1, e, "next"))
    },
    prev: function(e) {
      var t = o.current;
      t && (l(e) || (e = t.direction.prev), o.jumpto(t.index - 1, e, "prev"))
    },
    jumpto: function(e, t, n) {
      var i = o.current;
      if (!i) return;
      e = p(e),
      o.direction = t || i.direction[e >= i.index ? "next": "prev"],
      o.router = n || "jumpto",
      i.loop && (e < 0 && (e = i.group.length + e % i.group.length), e %= i.group.length),
      i.group[e] !== r && (o.cancel(), o._start(e))
    },
    reposition: function(e, t) {
      var n;
      o.isOpen && (n = o._getPosition(t), e && e.type === "scroll" ? (delete n.position, o.wrap.stop(!0, !0).animate(n, 200)) : o.wrap.css(n))
    },
    update: function(e) {
      var t = e && e.type,
      n = !t || t === "orientationchange";
      n && (clearTimeout(u), u = null);
      if (!o.isOpen || u) return;
      if (n || a) o.wrap.removeAttr("style").addClass("fancybox-tmp"),
      o.trigger("onUpdate");
      u = setTimeout(function() {
        var n = o.current;
        if (!n) return;
        o.wrap.removeClass("fancybox-tmp"),
        t !== "scroll" && o._setDimension(),
        (t !== "scroll" || !n.canShrink) && o.reposition(e),
        o.trigger("onUpdate"),
        u = null
      },
      a ? 500 : n ? 20 : 300)
    },
    toggle: function(e) {
      o.isOpen && (o.current.fitToView = n.type(e) === "boolean" ? e: !o.current.fitToView, o.update())
    },
    hideLoading: function() {
      s.unbind("keypress.fb"),
      n("#fancybox-loading").remove()
    },
    showLoading: function() {
      var e, t;
      o.hideLoading(),
      s.bind("keypress.fb",
      function(e) { (e.which || e.keyCode) === 27 && (e.preventDefault(), o.cancel())
      }),
      e = n('<div id="fancybox-loading"><div></div></div>').click(o.cancel).appendTo("body"),
      o.defaults.fixed || (t = o.getViewport(), e.css({
        position: "absolute",
        top: t.h * .5 + t.y,
        left: t.w * .5 + t.x
      }))
    },
    getViewport: function() {
      var t = o.current ? o.current.locked: !1,
      n = {
        x: i.scrollLeft(),
        y: i.scrollTop()
      };
      return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) : (n.w = a && e.innerWidth ? e.innerWidth: i.width(), n.h = a && e.innerHeight ? e.innerHeight: i.height()),
      n
    },
    unbindEvents: function() {
      o.wrap && f(o.wrap) && o.wrap.unbind(".fb"),
      s.unbind(".fb"),
      i.unbind(".fb")
    },
    bindEvents: function() {
      var e = o.current,
      t;
      if (!e) return;
      i.bind("orientationchange.fb" + (a ? "": " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb": ""), o.update),
      t = e.keys,
      t && s.bind("keydown.fb",
      function(i) {
        var s = i.which || i.keyCode,
        u = i.target || i.srcElement; ! i.ctrlKey && !i.altKey && !i.shiftKey && !i.metaKey && (!u || !u.type && !n(u).is("[contenteditable]")) && n.each(t,
        function(t, u) {
          if (e.group.length > 1 && u[s] !== r) return o[t](u[s]),
          i.preventDefault(),
          !1;
          if (n.inArray(s, u) > -1) return o[t](),
          i.preventDefault(),
          !1
        })
      }),
      n.fn.mousewheel && e.mouseWheel && o.wrap.bind("mousewheel.fb",
      function(t, r, i, s) {
        var u = t.target || null,
        a = n(u),
        f = !1;
        while (a.length) {
          if (f || a.is(".fancybox-skin") || a.is(".fancybox-wrap")) break;
          f = h(a[0]),
          a = n(a).parent()
        }
        r !== 0 && !f && o.group.length > 1 && !e.canShrink && (s > 0 || i > 0 ? o.prev(s > 0 ? "down": "left") : (s < 0 || i < 0) && o.next(s < 0 ? "up": "right"), t.preventDefault())
      })
    },
    trigger: function(e, t) {
      var r, i = t || o.coming || o.current;
      if (!i) return;
      n.isFunction(i[e]) && (r = i[e].apply(i, Array.prototype.slice.call(arguments, 1)));
      if (r === !1) return ! 1;
      e === "onCancel" && !o.isOpened && (o.isActive = !1),
      i.helpers && n.each(i.helpers,
      function(t, r) {
        r && o.helpers[t] && n.isFunction(o.helpers[t][e]) && o.helpers[t][e](r, i)
      }),
      n.event.trigger(e + ".fb")
    },
    isImage: function(e) {
      return l(e) && e.match(/\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$/i)
    },
    isSWF: function(e) {
      return l(e) && e.match(/\.(swf)((\?|#).*)?$/i)
    },
    _start: function(e) {
      var t = {},
      r, i, s, u, f;
      e = p(e),
      r = o.group[e] || null;
      if (!r) return ! 1;
      t = n.extend(!0, {},
      o.opts, r),
      u = t.margin,
      f = t.padding,
      n.type(u) === "number" && (t.margin = [u, u, u, u]),
      n.type(f) === "number" && (t.padding = [f, f, f, f]),
      t.modal && n.extend(!0, t, {
        closeBtn: !1,
        closeClick: !1,
        nextClick: !1,
        arrows: !1,
        mouseWheel: !1,
        keys: null,
        helpers: {
          overlay: {
            closeClick: !1
          }
        }
      }),
      t.autoSize && (t.autoWidth = t.autoHeight = !0),
      t.width === "auto" && (t.autoWidth = !0),
      t.height === "auto" && (t.autoHeight = !0),
      t.group = o.group,
      t.index = e,
      o.coming = t;
      if (!1 === o.trigger("beforeLoad")) {
        o.coming = null;
        return
      }
      s = t.type,
      i = t.href;
      if (!s) return o.coming = null,
      o.current && o.router && o.router !== "jumpto" ? (o.current.index = e, o[o.router](o.direction)) : !1;
      o.isActive = !0;
      if (s === "image" || s === "swf") t.autoHeight = t.autoWidth = !1,
      t.scrolling = "visible";
      s === "image" && (t.aspectRatio = !0),
      s === "iframe" && a && (t.scrolling = "scroll"),
      t.wrap = n(t.tpl.wrap).addClass("fancybox-" + (a ? "mobile": "desktop") + " fancybox-type-" + s + " fancybox-tmp " + t.wrapCSS).appendTo(t.parent),
      n.extend(t, {
        skin: n(".fancybox-skin", t.wrap),
        outer: n(".fancybox-outer", t.wrap),
        inner: n(".fancybox-inner", t.wrap)
      }),
      n.each(["Top", "Right", "Bottom", "Left"],
      function(e, n) {
        t.skin.css("padding" + n, d(t.padding[e]))
      }),
      o.trigger("onReady");
      if (s === "inline" || s === "html") {
        if (!t.content || !t.content.length) return o._error("content")
      } else if (!i) return o._error("href");
      s === "image" ? o._loadImage() : s === "ajax" ? o._loadAjax() : s === "iframe" ? o._loadIframe() : o._afterLoad()
    },
    _error: function(e) {
      n.extend(o.coming, {
        type: "html",
        autoWidth: !0,
        autoHeight: !0,
        minWidth: 0,
        minHeight: 0,
        scrolling: "no",
        hasError: e,
        content: o.coming.tpl.error
      }),
      o._afterLoad()
    },
    _loadImage: function() {
      var e = o.imgPreload = new Image;
      e.onload = function() {
        this.onload = this.onerror = null,
        o.coming.width = this.width,
        o.coming.height = this.height,
        o._afterLoad()
      },
      e.onerror = function() {
        this.onload = this.onerror = null,
        o._error("image")
      },
      e.src = o.coming.href,
      (e.complete === r || !e.complete) && o.showLoading()
    },
    _loadAjax: function() {
      var e = o.coming;
      o.showLoading(),
      o.ajaxLoad = n.ajax(n.extend({},
      e.ajax, {
        url: e.href,
        error: function(e, t) {
          o.coming && t !== "abort" ? o._error("ajax", e) : o.hideLoading()
        },
        success: function(t, n) {
          n === "success" && (e.content = t, o._afterLoad())
        }
      }))
    },
    _loadIframe: function() {
      var e = o.coming,
      t = n(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", a ? "auto": e.iframe.scrolling).attr("src", e.href);
      n(e.wrap).bind("onReset",
      function() {
        try {
          n(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
        } catch(e) {}
      }),
      e.iframe.preload && (o.showLoading(), t.one("load",
      function() {
        n(this).data("ready", 1),
        a || n(this).bind("load.fb", o.update),
        n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),
        o._afterLoad()
      })),
      e.content = t.appendTo(e.inner),
      e.iframe.preload || o._afterLoad()
    },
    _preloadImages: function() {
      var e = o.group,
      t = o.current,
      n = e.length,
      r = t.preload ? Math.min(t.preload, n - 1) : 0,
      i,
      s;
      for (s = 1; s <= r; s += 1) i = e[(t.index + s) % n],
      i.type === "image" && i.href && ((new Image).src = i.href)
    },
    _afterLoad: function() {
      var e = o.coming,
      t = o.current,
      r = "fancybox-placeholder",
      i, s, u, a, l, c;
      o.hideLoading();
      if (!e || o.isActive === !1) return;
      if (!1 === o.trigger("afterLoad", e, t)) {
        e.wrap.stop(!0).trigger("onReset").remove(),
        o.coming = null;
        return
      }
      t && (o.trigger("beforeChange", t), t.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove(), t.wrap.css("position") === "fixed" && t.wrap.css(o._getPosition(!0))),
      o.unbindEvents(),
      i = e,
      s = e.content,
      u = e.type,
      a = e.scrolling,
      n.extend(o, {
        wrap: i.wrap,
        skin: i.skin,
        outer: i.outer,
        inner: i.inner,
        current: i,
        previous: t
      }),
      l = i.href;
      switch (u) {
      case "inline":
      case "ajax":
      case "html":
        i.selector ? s = n("<div>").html(s).find(i.selector) : f(s) && (s.data(r) || s.data(r, n('<div class="' + r + '"></div>').insertAfter(s).hide()), s = s.show().detach(), i.wrap.bind("onReset",
        function() {
          n(this).find(s).length && s.hide().replaceAll(s.data(r)).data(r, !1)
        }));
        break;
      case "image":
        s = i.tpl.image.replace("{href}", l);
        break;
      case "swf":
        s = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + l + '"></param>',
        c = "",
        n.each(i.swf,
        function(e, t) {
          s += '<param name="' + e + '" value="' + t + '"></param>',
          c += " " + e + '="' + t + '"'
        }),
        s += '<embed src="' + l + '" type="application/x-shockwave-flash" width="100%" height="100%"' + c + "></embed></object>"
      } (!f(s) || !s.parent().is(i.inner)) && i.inner.append(s),
      o.trigger("beforeShow"),
      i.inner.css("overflow", a === "yes" ? "scroll": a === "no" ? "hidden": a),
      o._setDimension(),
      i.wrap.removeClass("fancybox-tmp"),
      i.pos = n.extend({},
      i.dim, o._getPosition(!0)),
      o.isOpen = !1,
      o.coming = null,
      o.bindEvents(),
      o.isOpened ? t.prevMethod && o.transitions[t.prevMethod]() : n(".fancybox-wrap").not(i.wrap).stop(!0).trigger("onReset").remove(),
      o.transitions[o.isOpened ? i.nextMethod: i.openMethod](),
      o._preloadImages()
    },
    _setDimension: function() {
      var e = o.getViewport(),
      t = 0,
      r = !1,
      i = !1,
      s = o.wrap,
      u = o.skin,
      a = o.inner,
      f = o.current,
      l = f.width,
      h = f.height,
      v = f.minWidth,
      m = f.minHeight,
      g = f.maxWidth,
      y = f.maxHeight,
      b = f.scrolling,
      w = f.scrollOutside ? f.scrollbarWidth: 0,
      E = f.margin,
      S = E[1] + E[3],
      x = E[0] + E[2],
      T,
      N,
      C,
      k,
      L,
      A,
      O,
      M,
      _,
      D,
      P,
      H,
      B,
      j,
      I;
      s.add(u).add(a).width("auto").height("auto"),
      T = u.outerWidth(!0) - u.width(),
      N = u.outerHeight(!0) - u.height(),
      C = S + T,
      k = x + N,
      L = c(l) ? (e.w - C) * p(l) / 100 : l,
      A = c(h) ? (e.h - k) * p(h) / 100 : h;
      if (f.type === "iframe") {
        j = f.content;
        if (f.autoHeight && j.data("ready") === 1) try {
          j[0].contentWindow.document.location && (a.width(L).height(9999), I = j.contents().find("body"), w && I.css("overflow-x", "hidden"), A = I.height())
        } catch(q) {}
      } else if (f.autoWidth || f.autoHeight) a.addClass("fancybox-tmp"),
      f.autoWidth || a.width(L),
      f.autoHeight || a.height(A),
      f.autoWidth && (L = a.width()),
      f.autoHeight && (A = a.height()),
      a.removeClass("fancybox-tmp");
      l = p(L),
      h = p(A),
      _ = L / A,
      v = p(c(v) ? p(v, "w") - C: v),
      g = p(c(g) ? p(g, "w") - C: g),
      m = p(c(m) ? p(m, "h") - k: m),
      y = p(c(y) ? p(y, "h") - k: y),
      O = g,
      M = y,
      H = e.w - S,
      B = e.h - x,
      f.aspectRatio ? (l > g && (l = g, h = l / _), h > y && (h = y, l = h * _), l < v && (l = v, h = l / _), h < m && (h = m, l = h * _)) : (l = Math.max(v, Math.min(l, g)), h = Math.max(m, Math.min(h, y)));
      if (f.fitToView) {
        g = Math.min(e.w - C, g),
        y = Math.min(e.h - k, y),
        a.width(p(l)).height(p(h)),
        s.width(p(l + T)),
        D = s.width(),
        P = s.height();
        if (f.aspectRatio) while ((D > H || P > B) && l > v && h > m) {
          if (t++>19) break;
          h = Math.max(m, Math.min(y, h - 10)),
          l = h * _,
          l < v && (l = v, h = l / _),
          l > g && (l = g, h = l / _),
          a.width(p(l)).height(p(h)),
          s.width(p(l + T)),
          D = s.width(),
          P = s.height()
        } else l = Math.max(v, Math.min(l, l - (D - H))),
        h = Math.max(m, Math.min(h, h - (P - B)))
      }
      w && b === "auto" && h < A && l + T + w < H && (l += w),
      a.width(p(l)).height(p(h)),
      s.width(p(l + T)),
      D = s.width(),
      P = s.height(),
      r = (D > H || P > B) && l > v && h > m,
      i = f.aspectRatio ? l < O && h < M && l < L && h < A: (l < O || h < M) && (l < L || h < A),
      n.extend(f, {
        dim: {
          width: d(D),
          height: d(P)
        },
        origWidth: L,
        origHeight: A,
        canShrink: r,
        canExpand: i,
        wPadding: T,
        hPadding: N,
        wrapSpace: P - u.outerHeight(!0),
        skinSpace: u.height() - h
      }),
      !j && f.autoHeight && h > m && h < y && !i && a.height("auto")
    },
    _getPosition: function(e) {
      var t = o.current,
      n = o.getViewport(),
      r = t.margin,
      i = o.wrap.width() + r[1] + r[3],
      s = o.wrap.height() + r[0] + r[2],
      u = {
        position: "absolute",
        top: r[0],
        left: r[3]
      };
      return t.autoCenter && t.fixed && !e && s <= n.h && i <= n.w ? u.position = "fixed": t.locked || (u.top += n.y, u.left += n.x),
      u.top = d(Math.max(u.top, u.top + (n.h - s) * t.topRatio)),
      u.left = d(Math.max(u.left, u.left + (n.w - i) * t.leftRatio)),
      u
    },
    _afterZoomIn: function() {
      var e = o.current;
      if (!e) return;
      o.isOpen = o.isOpened = !0,
      o.wrap.addClass("fancybox-opened").css("overflow", "visible"),
      o.reposition(),
      (e.closeClick || e.nextClick) && o.inner.css("cursor", "pointer").bind("click.fb",
      function(t) { ! n(t.target).is("a") && !n(t.target).parent().is("a") && o[e.closeClick ? "close": "next"]()
      }),
      e.closeBtn && n(e.tpl.closeBtn).appendTo(o.skin).bind("click.fb", o.close),
      e.arrows && o.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(o.outer).bind("click.fb", o.prev), (e.loop || e.index < o.group.length - 1) && n(e.tpl.next).appendTo(o.outer).bind("click.fb", o.next)),
      o.trigger("afterShow"),
      !e.loop && e.index === e.group.length - 1 ? o.play(!1) : o.opts.autoPlay && !o.player.isActive && (o.opts.autoPlay = !1, o.play())
    },
    _afterZoomOut: function() {
      var e = o.current;
      n(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
      n.extend(o, {
        group: {},
        opts: {},
        router: !1,
        current: null,
        isActive: !1,
        isOpened: !1,
        isOpen: !1,
        isClosing: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      }),
      o.trigger("afterClose", e)
    }
  }),
  o.transitions = {
    getOrigPosition: function() {
      var e = o.current,
      t = e.element,
      n = e.orig,
      r = {},
      i = 50,
      s = 50,
      u = e.hPadding,
      a = e.wPadding,
      l = o.getViewport();
      return ! n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)),
      f(n) ? (r = n.offset(), n.is("img") && (i = n.outerWidth(), s = n.outerHeight())) : (r.top = l.y + (l.h - s) * e.topRatio, r.left = l.x + (l.w - i) * e.leftRatio),
      e.locked && (r.top -= l.y, r.left -= l.x),
      r = {
        top: d(r.top - u * e.topRatio),
        left: d(r.left - a * e.leftRatio),
        width: d(i + a),
        height: d(s + u)
      },
      r
    },
    step: function(e, t) {
      var n, r, i, s = t.prop,
      u = o.current,
      a = u.wrapSpace,
      f = u.skinSpace;
      if (s === "width" || s === "height") n = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start),
      o.isClosing && (n = 1 - n),
      r = s === "width" ? u.wPadding: u.hPadding,
      i = e - r,
      o.skin[s](p(s === "width" ? i: i - a * n)),
      o.inner[s](p(s === "width" ? i: i - a * n - f * n))
    },
    zoomIn: function() {
      var e = o.current,
      t = e.pos,
      r = e.openEffect,
      i = r === "elastic",
      s = n.extend({
        opacity: 1
      },
      t);
      delete s.position,
      i ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : r === "fade" && (t.opacity = .1),
      o.wrap.css(t).animate(s, {
        duration: r === "none" ? 0 : e.openSpeed,
        easing: e.openEasing,
        step: i ? this.step: null,
        complete: o._afterZoomIn
      })
    },
    zoomOut: function() {
      var e = o.current,
      t = e.closeEffect,
      n = t === "elastic",
      r = {
        opacity: .1
      };
      n && (r = this.getOrigPosition(), e.closeOpacity && (r.opacity = .1)),
      o.wrap.animate(r, {
        duration: t === "none" ? 0 : e.closeSpeed,
        easing: e.closeEasing,
        step: n ? this.step: null,
        complete: o._afterZoomOut
      })
    },
    changeIn: function() {
      var e = o.current,
      t = e.nextEffect,
      n = e.pos,
      r = {
        opacity: 1
      },
      i = o.direction,
      s = 200,
      u;
      n.opacity = .1,
      t === "elastic" && (u = i === "down" || i === "up" ? "top": "left", i === "down" || i === "right" ? (n[u] = d(p(n[u]) - s), r[u] = "+=" + s + "px") : (n[u] = d(p(n[u]) + s), r[u] = "-=" + s + "px")),
      t === "none" ? o._afterZoomIn() : o.wrap.css(n).animate(r, {
        duration: e.nextSpeed,
        easing: e.nextEasing,
        complete: o._afterZoomIn
      })
    },
    changeOut: function() {
      var e = o.previous,
      t = e.prevEffect,
      r = {
        opacity: .1
      },
      i = o.direction,
      s = 200;
      t === "elastic" && (r[i === "down" || i === "up" ? "top": "left"] = (i === "up" || i === "left" ? "-": "+") + "=" + s + "px"),
      e.wrap.animate(r, {
        duration: t === "none" ? 0 : e.prevSpeed,
        easing: e.prevEasing,
        complete: function() {
          n(this).trigger("onReset").remove()
        }
      })
    }
  },
  o.helpers.overlay = {
    overlay: null,
    update: function() {
      var e = "100%",
      r;
      this.overlay.width(e).height("100%"),
      n.browser.msie ? (r = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), s.width() > r && (e = s.width())) : s.width() > i.width() && (e = s.width()),
      this.overlay.width(e).height(s.height())
    },
    onReady: function(e, r) {
      n(".fancybox-overlay").stop(!0, !0),
      this.overlay || n.extend(this, {
        overlay: n('<div class="fancybox-overlay"></div>').appendTo(r.parent),
        margin: s.height() > i.height() || n("body").css("overflow-y") === "scroll" ? n("body").css("margin-right") : !1,
        el: t.all && !t.querySelector ? n("html") : n("body")
      }),
      r.fixed && !a && (this.overlay.addClass("fancybox-overlay-fixed"), r.autoCenter && (this.overlay.append(r.wrap), r.locked = this.overlay)),
      e.showEarly === !0 && this.beforeShow.apply(this, arguments)
    },
    beforeShow: function(e, t) {
      var r = this.overlay.unbind(".fb").width("auto").height("auto").css(e.css);
      e.closeClick && r.bind("click.fb",
      function(e) {
        n(e.target).hasClass("fancybox-overlay") && o.close()
      }),
      t.fixed && !a ? t.locked && (this.el.addClass("fancybox-lock"), this.margin !== !1 && n("body").css("margin-right", p(this.margin) + t.scrollbarWidth)) : this.update(),
      r.show()
    },
    onUpdate: function(e, t) { (!t.fixed || a) && this.update()
    },
    afterClose: function(e) {
      var t = this,
      r = e.speedOut || 0;
      t.overlay && !o.isActive && t.overlay.fadeOut(r || 0,
      function() {
        n("body").css("margin-right", t.margin),
        t.el.removeClass("fancybox-lock"),
        t.overlay.remove(),
        t.overlay = null
      })
    }
  },
  o.helpers.title = {
    beforeShow: function(e) {
      var t = o.current.title,
      r = e.type,
      i, s;
      if (!l(t) || n.trim(t) === "") return;
      i = n('<div class="fancybox-title fancybox-title-' + r + '-wrap">' + t + "</div>");
      switch (r) {
      case "inside":
        s = o.skin;
        break;
      case "outside":
        s = o.wrap;
        break;
      case "over":
        s = o.inner;
        break;
      default:
        s = o.skin,
        i.appendTo("body").width(i.width()).wrapInner('<span class="child"></span>'),
        o.current.margin[2] += Math.abs(p(i.css("margin-bottom")))
      }
      e.position === "top" ? i.prependTo(s) : i.appendTo(s)
    }
  },
  n.fn.fancybox = function(e) {
    var t, r = n(this),
    i = this.selector || "",
    u = function(s) {
      var u = n(this).blur(),
      a = t,
      f,
      l; ! (s.ctrlKey || s.altKey || s.shiftKey || s.metaKey) && !u.is(".fancybox-wrap") && (f = e.groupAttr || "data-fancybox-group", l = u.attr(f), l || (f = "rel", l = u.get(0)[f]), l && l !== "" && l !== "nofollow" && (u = i.length ? n(i) : r, u = u.filter("[" + f + '="' + l + '"]'), a = u.index(this)), e.index = a, o.open(u, e) !== !1 && s.preventDefault())
    };
    return e = e || {},
    t = e.index || 0,
    !i || e.live === !1 ? r.unbind("click.fb-start").bind("click.fb-start", u) : s.undelegate(i, "click.fb-start").delegate(i + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", u),
    this
  },
  s.ready(function() {
    n.scrollbarWidth === r && (n.scrollbarWidth = function() {
      var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
      t = e.children(),
      r = t.innerWidth() - t.height(99).innerWidth();
      return e.remove(),
      r
    }),
    n.support.fixedPosition === r && (n.support.fixedPosition = function() {
      var e = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
      t = e[0].offsetTop === 20 || e[0].offsetTop === 15;
      return e.remove(),
      t
    } ()),
    n.extend(o.defaults, {
      scrollbarWidth: n.scrollbarWidth(),
      fixed: n.support.fixedPosition,
      parent: n("body")
    })
  })
} (window, document, jQuery),
function(e) {
  var t = e.fancybox;
  t.helpers.buttons = {
    tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>',
    list: null,
    buttons: null,
    beforeLoad: function(e, t) {
      if (e.skipSingle && t.group.length < 2) {
        t.helpers.buttons = !1,
        t.closeBtn = !0;
        return
      }
      t.margin[e.position === "bottom" ? 2 : 0] += 30
    },
    onPlayStart: function() {
      this.buttons && this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn")
    },
    onPlayEnd: function() {
      this.buttons && this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn")
    },
    afterShow: function(n, r) {
      var i = this.buttons;
      i || (this.list = e(n.tpl || this.tpl).addClass(n.position || "top").appendTo("body"), i = {
        prev: this.list.find(".btnPrev").click(t.prev),
        next: this.list.find(".btnNext").click(t.next),
        play: this.list.find(".btnPlay").click(t.play),
        toggle: this.list.find(".btnToggle").click(t.toggle)
      }),
      r.index > 0 || r.loop ? i.prev.removeClass("btnDisabled") : i.prev.addClass("btnDisabled"),
      r.loop || r.index < r.group.length - 1 ? (i.next.removeClass("btnDisabled"), i.play.removeClass("btnDisabled")) : (i.next.addClass("btnDisabled"), i.play.addClass("btnDisabled")),
      this.buttons = i,
      this.onUpdate(n, r)
    },
    onUpdate: function(e, t) {
      var n;
      if (!this.buttons) return;
      n = this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),
      t.canShrink ? n.addClass("btnToggleOn") : t.canExpand || n.addClass("btnDisabled")
    },
    beforeClose: function() {
      this.list && this.list.remove(),
      this.list = null,
      this.buttons = null
    }
  }
} (jQuery),
function(e) {
  var t = e.fancybox;
  t.helpers.thumbs = {
    wrap: null,
    list: null,
    width: 0,
    source: function(t) {
      var n;
      return t.element && (n = e(t.element).find("img").attr("src")),
      !n && t.type === "image" && t.href && (n = t.href),
      n
    },
    init: function(t, n) {
      var r = this,
      i, s = t.width || 50,
      o = t.height || 50,
      u = t.source || this.source;
      i = "";
      for (var a = 0; a < n.group.length; a++) i += '<li><a style="width:' + s + "px;height:" + o + 'px;" href="javascript:jQuery.fancybox.jumpto(' + a + ');"></a></li>';
      this.wrap = e('<div id="fancybox-thumbs"></div>').addClass(t.position || "bottom").appendTo("body"),
      this.list = e("<ul>" + i + "</ul>").appendTo(this.wrap),
      e.each(n.group,
      function(t) {
        var i = u(n.group[t]);
        if (!i) return;
        e("<img />").load(function() {
          var n = this.width,
          i = this.height,
          u, a, f;
          if (!r.list || !n || !i) return;
          u = n / s,
          a = i / o,
          f = r.list.children().eq(t).find("a"),
          u >= 1 && a >= 1 && (u > a ? (n = Math.floor(n / a), i = o) : (n = s, i = Math.floor(i / u))),
          e(this).css({
            width: n,
            height: i,
            top: Math.floor(o / 2 - i / 2),
            left: Math.floor(s / 2 - n / 2)
          }),
          f.width(s).height(o),
          e(this).hide().appendTo(f).fadeIn(300)
        }).attr("src", i)
      }),
      this.width = this.list.children().eq(0).outerWidth(!0),
      this.list.width(this.width * (n.group.length + 1)).css("left", Math.floor(e(window).width() * .5 - (n.index * this.width + this.width * .5)))
    },
    beforeLoad: function(e, t) {
      if (t.group.length < 2) {
        t.helpers.thumbs = !1;
        return
      }
      t.margin[e.position === "top" ? 0 : 2] += (e.height || 50) + 15
    },
    afterShow: function(e, t) {
      this.list ? this.onUpdate(e, t) : this.init(e, t),
      this.list.children().removeClass("active").eq(t.index).addClass("active")
    },
    onUpdate: function(t, n) {
      this.list && this.list.stop(!0).animate({
        left: Math.floor(e(window).width() * .5 - (n.index * this.width + this.width * .5))
      },
      150)
    },
    beforeClose: function() {
      this.wrap && this.wrap.remove(),
      this.wrap = null,
      this.list = null,
      this.width = 0
    }
  }
} (jQuery),
function(e) {
  "use strict";
  var t = e.fancybox,
  n = function(t, n, r) {
    return r = r || "",
    e.type(r) === "object" && (r = e.param(r, !0)),
    e.each(n,
    function(e, n) {
      t = t.replace("$" + e, n || "")
    }),
    r.length && (t += (t.indexOf("?") > 0 ? "&": "?") + r),
    t
  };
  t.helpers.media = {
    types: {
      youtube: {
        matcher: /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed)?([\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: "opaque",
          enablejsapi: 1
        },
        type: "iframe",
        url: "//www.youtube.com/embed/$3"
      },
      vimeo: {
        matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          color: "",
          fullscreen: 1
        },
        type: "iframe",
        url: "//player.vimeo.com/video/$1"
      },
      metacafe: {
        matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
        params: {
          autoPlay: "yes"
        },
        type: "swf",
        url: function(t, n, r) {
          return r.swf.flashVars = "playerVars=" + e.param(n, !0),
          "//www.metacafe.com/fplayer/" + t[1] + "/.swf"
        }
      },
      dailymotion: {
        matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
        params: {
          additionalInfos: 0,
          autoStart: 1
        },
        type: "swf",
        url: "//www.dailymotion.com/swf/video/$1"
      },
      twitvid: {
        matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
        params: {
          autoplay: 0
        },
        type: "iframe",
        url: "//www.twitvid.com/embed.php?guid=$1"
      },
      twitpic: {
        matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
        type: "image",
        url: "//twitpic.com/show/full/$1/"
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: "image",
        url: "//$1/p/$2/media/"
      },
      google_maps: {
        matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
        type: "iframe",
        url: function(e) {
          return "//maps.google." + e[1] + "/" + e[3] + "" + e[4] + "&output=" + (e[4].indexOf("layer=c") > 0 ? "svembed": "embed")
        }
      }
    },
    beforeLoad: function(t, r) {
      var i = r.href || "",
      s = !1,
      o, u, a, f;
      for (o in this.types) {
        u = this.types[o],
        a = i.match(u.matcher);
        if (a) {
          s = u.type,
          f = e.extend(!0, {},
          u.params, r[o] || (e.isPlainObject(t[o]) ? t[o].params: null)),
          i = e.type(u.url) === "function" ? u.url.call(this, a, f, r) : n(u.url, a, f);
          break
        }
      }
      s && (r.href = i, r.type = s, r.autoHeight = !1)
    }
  }
} (jQuery),
function() {
  _.templateSettings = {
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g
  }
}.call(this),
function() {
  window.Bobcat = window.Bobcat || {},
  window.Bobcat.GALLERY_COUNTER = 1,
  window.Bobcat.DOM = {
    SLIDES: ".slides .slide",
    PAGE_DATA_SCOPE: "page",
    EDITPAGE_DATA_SCOPE: "editpage",
    NAVIGATOR: ".navigator",
    FOOTER: "#footer",
    FOOTER_LOGO_EDITOR: "#edit-logo-footer",
    EDITOR_OVERLAY: ".edit-overlay",
    EDITOR: ".editor",
    CONTENT: ".content",
    PAGE_SETTING_DIALOG: "#page-settings-menu",
    SELECT_THEME_DIALOG: "#select-theme-dialog",
    NEW_PAGE_MESSAGE_DIALOG: "#new-page-message-dialog",
    SHARE_DIALOG: "#sharing-options-dialog",
    PUBLISH_DIALOG: "#publish-dialog",
    FEEDBACK_DIALOG: "#feedback-dialog",
    FEEDBACK_DIALOG_STEP1: ".step-1",
    FEEDBACK_DIALOG_STEP2: ".step-2",
    DIALOG_INACTIVE_CLASS: "inactive",
    FACEBOOK_ROOT: "#fb-root",
    FONT_SELECTOR: "select.fontselector",
    STRIKINGLY_LOGO: "#strikingly-footer-logo",
    IMAGE_TITLE: function(e) {
      return e.find("img").attr("alt") || ""
    },
    IMAGE_DESCRIPTION: function(e) {
      return e.find("img").attr("data-description") || ""
    },
    GALLERY: function(e) {
      var t, n, r, i;
      i = e.parent().find("a.item");
      for (n = 0, r = i.length; n < r; n++) t = i[n],
      $(t).attr("rel", "gallery_" + window.Bobcat.GALLERY_COUNTER);
      return $("a.item[rel=gallery_" + window.Bobcat.GALLERY_COUNTER+++"]")
    },
    GALLERY_IMAGES: function(e) {
      return e.find("a.item")
    },
    GALLERY_IMAGES_EDITOR: function(e) {
      return e.find(".gallery-editor-image")
    }
  }
}.call(this),
function() {
  var e = function(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  };
  Bobcat.AnalyticsEngine = function() {
    function t(t, n) {
      this.user_id = t,
      this.user_email = n,
      this.save = e(this.save, this),
      this.track = e(this.track, this),
      this.trackWithoutMixpanel = e(this.trackWithoutMixpanel, this)
    }
    return t.prototype.trackWithoutMixpanel = function(e) {
      if (this.user_id && this.user_email) return this.save(this.user_id, e)
    },
    t.prototype.track = function(e, t) {
      window.mixpanel.track(e, t);
      if (this.user_id && this.user_email) return this.save(this.user_id, e)
    },
    t.prototype.save = function(e, t) {
      var n = this;
      return $.ajax({
        type: "POST",
        url: "https://stats.striking.ly/events",
        data: {
          user_id: e,
          event: t
        },
        success: function(e, r, i) {
          if (t === "Editor - edit") return _veroq.push(["user", {
            email: n.user_email,
            edit_count: e.count
          }])
        },
        dataType: "json"
      })
    },
    t
  } (),
  $(function() {
    if (window.user_data) return Bobcat.AE = new Bobcat.AnalyticsEngine(window.user_data.id, window.user_data.email)
  })
}.call(this),
function() {
  var e, t = {}.hasOwnProperty,
  n = function(e, n) {
    function i() {
      this.constructor = e
    }
    for (var r in n) t.call(n, r) && (e[r] = n[r]);
    return i.prototype = n.prototype,
    e.prototype = new i,
    e.__super__ = n.prototype,
    e
  },
  r = [].indexOf ||
  function(e) {
    for (var t = 0,
    n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
    return - 1
  };
  window.partial = function(e, t) {
    return _.template($("#" + e + "-partial").html(), t)
  },
  window.Singleton = function() {
    function n() {}
    var t;
    return t = void 0,
    n.get = function(n) {
      return t != null ? t: t = new e(n)
    },
    n
  } (),
  e = function() {
    function e(e) {
      this.args = e
    }
    return e.prototype.echo = function() {
      return this.args
    },
    e
  } (),
  Bobcat.IndexGenerator = function() {
    function e() {
      this.currentIndex = 0
    }
    return e.prototype.increment = function() {
      return this.currentIndex += 1
    },
    e.prototype.getNext = function() {
      var e;
      return e = this.currentIndex,
      this.increment(),
      "model" + e
    },
    e
  } (),
  Bobcat.PageTransformer = function() {
    function e(e, t) {
      this.domTree = e,
      this.isEdit = t,
      this.textTransformer = new Bobcat.TextTransformer,
      this.imageTransformer = new Bobcat.ImageTransformer,
      this.htmlTransformer = new Bobcat.HtmlTransformer
    }
    return e.prototype.transform = function() {
      var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v;
      p = this.domTree.find("[data-component='repeatable_item_template']");
      for (s = 0, f = p.length; s < f; s++) n = p[s],
      t = $(n),
      $("<div id='" + t.attr("id") + "_temp' style='display:none;'>" + t.html() + "</div>").appendTo(this.domTree);
      this.indexGenerator = new Bobcat.IndexGenerator,
      i = [this.textTransformer, this.imageTransformer, this.htmlTransformer];
      for (o = 0, l = i.length; o < l; o++) r = i[o],
      r.indexGenerator = this.indexGenerator;
      for (u = 0, c = i.length; u < c; u++) r = i[u],
      r.transform(this.domTree, this.isEdit);
      d = this.domTree.find("[data-component='repeatable_item_template']"),
      v = [];
      for (a = 0, h = d.length; a < h; a++) n = d[a],
      t = $(n),
      e = $("#" + t.attr("id") + "_temp"),
      $.browser.msie && e.find("*").filter(function() {
        return $(this).attr("class") !== ""
      }).addClass("ie-fix ie-fix2"),
      n.text = e.html(),
      v.push(e.remove());
      return v
    },
    e
  } (),
  Bobcat.Transformer = function() {
    function e() {}
    return e.prototype.validateName = function(e) {
      return e.attr("data-name") == null && (this.warning("The following DOM doesn't have data-name."), this.warning(e)),
      !0
    },
    e.prototype.getDataName = function(e) {
      var t;
      return t = e.attr("data-name"),
      t || (t = this.indexGenerator.getNext()),
      t
    },
    e.prototype.clearDom = function(e) {
      return e.html("")
    },
    e.prototype.isEditable = function(e) {
      var t;
      return t = e.attr("data-show"),
      t !== "true"
    },
    e.prototype.warning = function(e) {
      return console.warn(e)
    },
    e.prototype.error = function(e) {
      return console.error(e)
    },
    e
  } (),
  Bobcat.TextTransformer = function(e) {
    function t() {}
    return n(t, e),
    t.prototype.transform = function(e, t) {
      var n = this;
      return this.domTree = e,
      this.isEdit = t != null ? t: !1,
      this.domTree.find("[data-component='text']").each(function(e, t) {
        var r;
        r = $(t);
        if (n.validate(r)) return n.isEdit && n.isEditable(r) ? n.transformToEditable(r) : n.transformToShow(r)
      })
    },
    t.prototype.getTextType = function(e) {
      var t;
      t = e.attr("data-text-type");
      if (t) {
        if (t === "heading") return "headingFont";
        if (t === "title") return "titleFont";
        if (t === "navigation") return "navFont"
      }
      return "bodyFont"
    },
    t.prototype.getUseFont = function(e) {
      var t;
      return t = e.attr("data-use-font"),
      t === "false" ? !1 : !0
    },
    t.prototype.buildData = function(e) {
      var t, n, r, i;
      return t = e.html(),
      n = this.getDataName(e),
      r = this.getTextType(e),
      i = this.getUseFont(e),
      {
        content: t,
        name: n,
        textType: r,
        useFont: i
      }
    },
    t.prototype.transformToShow = function(e) {
      var t, n;
      return t = this.buildData(e),
      e.addClass("text-component").html(""),
      n = _.template($("#textContent-partial").html())(t),
      $(n).appendTo(e)
    },
    t.prototype.transformToEditable = function(e) {
      var t, n;
      return t = this.buildData(e),
      this.clearDom(e),
      e.addClass("editable text-component"),
      e.attr("data-text-type", "" + t.textType),
      e.attr("data-name", "" + t.name),
      e.attr("data-bind", "mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
      n = _.template($("#textEditor").html())(t),
      $(n).appendTo(e)
    },
    t.prototype.validate = function(e) {
      var t;
      return t = this.validateName(e) && this.validateTextType(e)
    },
    t.prototype.validateTextType = function(e) {
      var t, n, i, s;
      return i = !0,
      n = e.attr("data-text-type"),
      t = ["body", "heading", "title", "navigation"],
      n && (s = !n, r.call(t, s) >= 0) && (i = !1, this.warning("data-text-type should be one of " + t.join(", ")), this.warning(e)),
      i
    },
    t
  } (Bobcat.Transformer),
  Bobcat.ImageTransformer = function(e) {
    function t() {
      return t.__super__.constructor.apply(this, arguments)
    }
    return n(t, e),
    t.prototype.transform = function(e, t) {
      var n = this;
      return this.domTree = e,
      this.isEdit = t,
      this.domTree.find("[data-component='image']").each(function(e, t) {
        var r;
        r = $(t);
        if (n.validate(r)) return n.isEdit && n.isEditable(r) ? n.transformToEditable(r) : n.transformToShow(r)
      })
    },
    t.prototype.validate = function(e) {
      var t;
      return t = this.validateName(e) && this.validateUrl(e) && this.validateImageSize(e) && this.validateThumbSize(e)
    },
    t.prototype.getImageDom = function(e) {
      return e.imageDom ? e.imageDom: e.imageDom = e.find("img").first()
    },
    t.prototype.validateUrl = function(e) {
      return typeof this.getImageDom(e).attr("src") == "undefined" ? (this.error("img doesn't have a src"), this.error(this.getImageDom(e)), !1) : !0
    },
    t.prototype.transformToEditable = function(e) {
      var t, n;
      return t = this.buildData(e),
      this.clearDom(e),
      e.addClass("editable image-component"),
      e.attr("data-name", "" + t.name),
      e.attr("data-bind", "css: {'empty-image':!" + t.name + ".hasContent()}, mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
      n = _.template($("#imageEditor").html())(t),
      $(n).appendTo(e)
    },
    t.prototype.transformToShow = function(e) {
      var t, n;
      return t = this.buildData(e),
      e.html(""),
      n = _.template($("#imageContent-partial").html())(t),
      $(n).appendTo(e)
    },
    t.prototype.validateSize = function(e) {
      return e === "small" || e === "medium" || e === "large" || e === "background" ? !0 : /^\d+x\d+[><^#]+$/.test(e) ? !0 : typeof e == "undefined" ? !0 : !1
    },
    t.prototype.validateThumbSize = function(e) {
      var t, n;
      return t = e.attr("data-thumb-size"),
      n = this.validateSize(t),
      n || (this.warning("size format is wrong"), this.warning(e)),
      n
    },
    t.prototype.validateImageSize = function(e) {
      var t, n;
      return t = e.attr("data-image-size"),
      n = this.validateSize(t),
      n || (this.warning("size format is wrong"), this.warning(e)),
      n
    },
    t.prototype.getImageSize = function(e) {
      var t;
      return t = e.attr("data-image-size"),
      t || (t = "medium")
    },
    t.prototype.getThumbSize = function(e) {
      var t;
      return t = e.attr("data-thumb-size"),
      t || (t = "128x128#")
    },
    t.prototype.getHasUrl = function(e) {
      var t;
      return t = e.attr("data-use-url"),
      t === "true"
    },
    t.prototype.buildData = function(e) {
      var t, n, r, i, s, o, u;
      return o = this.getImageDom(e).attr("src"),
      t = this.getImageDom(e).attr("alt"),
      r = this.getDataName(e),
      i = this.getImageSize(e),
      s = this.getThumbSize(e),
      u = this.getHasUrl(e),
      t || (t = ""),
      n = {
        url: o,
        caption: t,
        name: r,
        imageSize: i,
        useUrl: u,
        thumbSize: s
      }
    },
    t
  } (Bobcat.Transformer),
  Bobcat.HtmlTransformer = function(e) {
    function t() {}
    return n(t, e),
    t.prototype.transform = function(e, t) {
      var n = this;
      return this.domTree = e,
      this.isEdit = t,
      this.domTree.find("[data-component='html']").each(function(e, t) {
        var r;
        r = $(t);
        if (n.validate(r)) return n.isEdit && n.isEditable(r) ? n.transformToEditable(r) : n.transformToShow(r)
      })
    },
    t.prototype.validate = function(e) {
      var t;
      return t = this.validateName(e)
    },
    t.prototype.transformToEditable = function(e) {
      var t, n;
      return t = this.buildData(e),
      this.clearDom(e),
      e.addClass("editable html-component"),
      e.attr("data-name", "" + t.name),
      e.attr("data-bind", "mouseenter : " + t.name + ".mouseenterHandler, mouseleave: " + t.name + ".mouseleaveHandler, mouseclick:" + t.name + ".clickEditorHandler"),
      n = _.template($("#htmlEditor").html())(t),
      $(n).appendTo(e)
    },
    t.prototype.buildData = function(e) {
      var t;
      return t = this.getDataName(e),
      {
        name: t
      }
    },
    t.prototype.transformToShow = function(e) {
      var t, n;
      return t = this.buildData(e),
      e.html(""),
      n = _.template($("#htmlContent-partial").html())(t),
      $(n).appendTo(e)
    },
    t
  } (Bobcat.Transformer)
}.call(this),
function() {
  var e = function(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  };
  Bobcat.ShowPage = function() {
    function t(t) {
      this.setupStrikinglyLogo = e(this.setupStrikinglyLogo, this),
      this.data = new Bobcat.PageData(t),
      this.Event = new Bobcat.Event,
      this.unsavedChanges = ko.observable(!1),
      this.isShowPage = !0
    }
    return t.prototype.setupStrikinglyLogo = function() {
      var e, t, n, r, i, s = this;
      n = $(window),
      e = $(document),
      t = $(Bobcat.DOM.STRIKINGLY_LOGO);
      if (!t || !t.is(":visible")) return;
      return Bobcat.TH.isMobile() ? (t.css({
        bottom: -100
      }), r = !1, $(window).scroll(function() {
        return r = !0
      }), setInterval(function() {
        if (r) {
          r = !1;
          if (n.scrollTop() >= e.height() - n.height() - 20) return t.animate({
            bottom: -20
          },
          450, "easeInOutBack");
          if (n.scrollTop() < e.height() - n.height() - 80) return t.css({
            bottom: -100
          })
        }
      },
      125)) : (t.css({
        bottom: -100,
        position: "fixed"
      }).hide(), i = 450, n.scroll(function() {
        var e, n, r;
        r = $(document).height() - i,
        e = $(document).scrollTop() + $(window).height();
        if (e > r - 100) return n = -100 + (e - r) / i * 80,
        n > -20 && (n = -20),
        n < -100 && (n = -100),
        t.css({
          bottom: n
        }).show()
      }))
    },
    t.prototype.init = function() {
      var e, t, n, r, i;
      this.data.bindSlides(),
      this.setupStrikinglyLogo(),
      r = window.runAfterDomBinding.getAllJobs(),
      i = [];
      for (t = 0, n = r.length; t < n; t++) e = r[t],
      i.push(e());
      return i
    },
    t
  } ()
}.call(this),
function() {
  var e = this;
  Bobcat.TH = {
    fixNavOnScroll: function(e, t) {
      var n, r;
      return n = function() {
        return $("ul.slides li.slide").css({
          "padding-top": 0
        }),
        $("ul.slides li.slide").first().css({
          "padding-top": e.outerHeight(!1)
        })
      },
      r = function() {
        var n, r, i;
        if (e.length === 0) return;
        return n = $(window).height(),
        r = e.height(),
        i = $(window).scrollTop(),
        i > t && (i = t),
        $(".demo-bar-spacer").length && (i -= $(".demo-bar-spacer").outerHeight()),
        e.stop().animate({
          top: -i
        })
      },
      $(window).scroll(r),
      $(window).resize(n),
      n(),
      e.css("position", "fixed")
    },
    isMobile: function() {
      return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
    },
    isAndroid: function() {
      return navigator.userAgent.match(/(android)/i)
    },
    isIpad: function() {
      return navigator.userAgent.match(/(iPad)/i)
    },
    isIOS: function() {
      return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)
    },
    isSmallScreen: function() {
      return $(window).width() <= 727 || $(window).height() < 400
    },
    iOSversion: function() {
      var e, t;
      if (/iP(hone|od|ad)/.test(navigator.platform)) return e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
      t = [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)],
      t[0]
    },
    androidVersion: function() {
      var e;
      if (Bobcat.TH.isAndroid()) return e = navigator.userAgent,
      parseFloat(e.slice(e.indexOf("Android") + 8))
    },
    isAndroid2x: function() {
      return Bobcat.TH.isAndroid() && Bobcat.TH.androidVersion() < 3
    },
    showDrawer: function(e) {
      var t, n, r, i;
      e == null && (e = !1);
      if (!$(".navbar-drawer").length) return;
      n = 450,
      t = "easeInOutQuart",
      e ? ($(".navbar-drawer").css({
        left: 0
      }), $(".show-content, .navbar-drawer-bar").css({
        left: "200px"
      }), $('.show-content *:not(".strikingly-fixed")').filter(function() {
        return $(this).css("position") === "fixed"
      }).css({
        "margin-left": "-100px"
      })) : ($(".navbar-drawer").animate({
        left: "0px"
      },
      n, t), i = $(".show-content").width(), $(".show-content").width(i).animate({
        left: "200px"
      },
      n, t), $(".navbar-drawer-bar").animate({
        left: "200px"
      },
      n, t), Bobcat.TH.isAndroid() && $("body").css({
        overflow: "hidden"
      }), $("body").css({
        "overflow-x": "hidden"
      }));
      if (Bobcat.TH.androidVersion() < 3) return r = $(window).scrollTop(),
      $("#nav-drawer-list").attr("data-top", r)
    },
    hideDrawer: function(e) {
      var t, n, r, i;
      e == null && (e = !1),
      n = $(".navbar-drawer"),
      t = $(".show-content");
      if (!n.length) return;
      if (parseInt(n.css("left"), 10) === -200 && parseInt(t.css("left"), 10) === 0) return;
      return i = 450,
      r = "easeInOutQuart",
      e ? (n.css({
        left: -200
      }), t.css({
        left: 0
      }), $(".navbar-drawer-bar").css({
        left: 0
      }), t.find('*:not(".strikingly-fixed")').filter(function() {
        return $(this).css("position") === "fixed"
      }).css({
        left: 0
      })) : (n.animate({
        left: -200
      },
      i, r), t.animate({
        left: 0
      },
      i, r,
      function() {
        return $("body").css({
          overflow: "visible"
        }),
        $("body").css({
          "overflow-x": "visible"
        }),
        t.css({
          width: "auto"
        })
      }), $(".navbar-drawer-bar").animate({
        left: "0px"
      },
      i, r), t.find('*:not(".strikingly-fixed")').filter(function() {
        return $(this).css("position") === "fixed"
      }).animate({
        left: 0
      },
      i, r))
    },
    toggleDrawer: function(e) {
      e == null && (e = !0);
      if (!Bobcat.TH.isMobile() || Bobcat.TH.isIOS()) e = !1;
      return parseInt($(".navbar-drawer").css("left"), 10) === -200 ? Bobcat.TH.showDrawer(e) : Bobcat.TH.hideDrawer(e)
    },
    applyTouchNav: function() {
      var e, t, n;
      return e = $(".navbar-touch").first(),
      e.length ? ($("body").bind("touchstart",
      function(e) {}), t = e.touchCarousel({
        pagingNav: !1,
        snapToItems: !1,
        itemsPerMove: 1,
        scrollToLast: !1,
        loopItems: !1,
        scrollbar: !1
      }).data("touchCarousel"), $("body").attr("ontouchstart", "").attr("screen_capture_injected", "true"), window.edit_page.Event.subscribe("Menu.beforeChange",
      function(e, n) {
        return t.goTo(window.edit_page.data.getShownNavIndex(n.split("#")[1] - 1))
      })) : $(".navbar-drawer").length && (n = $("#nav-drawer-list"), $(".navbar-drawer, .navbar-drawer-bar").removeClass("hidden"), $("body").bind("touchstart",
      function(e) {}), $("body").attr("ontouchstart", "").attr("screen_capture_injected", "true"), Bobcat.TH.isAndroid2x() ? $(window).height() < n.height() && (n.css({
        overflow: "visible",
        height: "auto"
      }), $(window).scroll(function() {
        var e, t, r, i;
        e = parseInt(n.attr("data-top"), 10);
        if (!e && e !== 0) return;
        return i = $(window).scrollTop(),
        r = e - i,
        r > 0 && (r = 0),
        t = $(window).height() - n.height(),
        r < t && (r = t),
        n.css({
          top: r
        })
      })) : n.height($(window).height())),
      $(window).resize(function() {
        n = $("#nav-drawer-list"),
        Bobcat.TH.isAndroid2x() || n.height($(window).height());
        if (!$(".navbar-drawer").is(":visible")) return Bobcat.TH.hideDrawer()
      })
    },
    matchHeights: function(e) {
      var t, n, r, i;
      if (!e) return;
      typeof e == "string" && (e = $(e));
      if (e.length === 0) return;
      r = {},
      n = 0,
      e.each(function() {
        var e;
        return e = $(this),
        n = e.offset().top + "",
        r[n] ? r[n] = r[n].add(e) : r[n] = e
      }),
      i = [];
      for (n in r) t = r[n],
      i.push(Bobcat.TH.matchHeightsAll(t));
      return i
    },
    matchHeightsAll: function(e) {
      var t, n;
      if (e.length === 0) return;
      return t = 0,
      n = e.first().offset().top,
      e.each(function() {
        var e;
        e = $(this),
        e.css("height", "auto");
        if (e.height() > t) return t = e.height()
      }),
      e.each(function() {
        return $(this).css("height", t)
      })
    },
    applyMatchHeights: function(e, t) {
      var n, r;
      t == null && (t = ".match-heights"),
      n = function() {
        return $(t).each(function() {
          var t;
          return t = $(this),
          Bobcat.TH.matchHeights($(this).find(e)),
          $(this).find("img").load(function() {
            return Bobcat.TH.matchHeights(t.find(e))
          })
        })
      },
      $(window).resize(n),
      n();
      if (!window.edit_page.isShowPage) return r = function(n, r) {
        var i, s, o;
        s = r.target,
        o = s.closest(t);
        if (!o.length) return;
        return i = o.find(e),
        Bobcat.TH.matchHeights(i)
      },
      window.edit_page.Event.subscribe("RichTextComponent.afterTextChange", r),
      window.edit_page.Event.subscribe("ImageComponent.afterChange", r),
      window.edit_page.Event.subscribe("Repeatable.add", r)
    },
    fitText: function(e) {
      if (e.length === 0) return;
      return e.each(function(e, t) {
        var n, r, i, s, o;
        o = $(this),
        s = o.width(),
        i = parseInt(o.css("font-size")),
        n = o.css({
          position: "absolute"
        }).width(),
        o.css({
          position: "relative"
        });
        if (n <= s) return;
        return e === 0 && console.log("origf=" + i + ",origw=" + s + ",natw=" + n),
        r = i * s / n,
        o.css({
          "font-size": r
        })
      })
    },
    isTouchDevice: function() {
      try {
        return document.createEvent("TouchEvent"),
        !0
      } catch(e) {
        return ! 1
      }
    },
    touchScroll: function(e) {
      var t;
      if (Bobcat.TH.isTouchDevice()) return t = 0,
      e.addEventListener("touchstart",
      function(e) {
        return t = this.scrollTop + e.touches[0].pageY
      },
      !1),
      e.addEventListener("touchmove",
      function(e) {
        return this.scrollTop = t - e.touches[0].pageY
      },
      !1)
    }
  }
}.call(this),
function() {
  Bobcat.Event = function() {
    function e() {
      this.topics = {},
      this.subUid = -1
    }
    return e.prototype.subscribe = function(e, t) {
      var n;
      return this.topics[e] || (this.topics[e] = []),
      n = (++this.subUid).to_s,
      this.topics[e].push({
        token: n,
        func: t
      }),
      n
    },
    e.prototype.publish = function(e, t) {
      var n, r, i, s, o;
      if (!this.topics[e]) return ! 1;
      s = this.topics[e],
      o = [];
      for (r = 0, i = s.length; r < i; r++) n = s[r],
      o.push(n.func(e, t));
      return o
    },
    e.prototype.unsubscribe = function(e) {
      var t, n, r, i, s;
      s = this.topics;
      for (i in s) {
        r = s[i];
        for (t in r) {
          n = r[t];
          if (n.token === e) return r.splice(t, 1),
          e
        }
      }
      return ! 1
    },
    e
  } ()
}.call(this),
function() {
  var e = function(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  };
  window.Bobcat = window.Bobcat || {},
  Bobcat.Navigator = function() {
    function t() {
      this.registerSlideWaypoint = e(this.registerSlideWaypoint, this),
      this.hashTagChangeHandler = e(this.hashTagChangeHandler, this),
      this.setupKeyBindings = e(this.setupKeyBindings, this),
      this.prev = e(this.prev, this),
      this.next = e(this.next, this),
      this.isLast = e(this.isLast, this),
      this.isFirst = e(this.isFirst, this),
      this.slideIndex = e(this.slideIndex, this),
      this.unlockKeyboard = e(this.unlockKeyboard, this),
      this.lockKeyboard = e(this.lockKeyboard, this),
      this.setupHashTagChangeHandler = e(this.setupHashTagChangeHandler, this),
      this.runMobileOptimization = e(this.runMobileOptimization, this),
      this.scrolling = !1,
      this.keyboardLock = !1,
      this.firstTime = !0,
      this.current = ko.observable()
    }
    return t.prototype.init = function() {
      return this.selectSlide($(".slides .slide").first()),
      this.setupHashTagChangeHandler(),
      this.registerSlideWaypoint($(".slides .slide")),
      this.setupKeyBindings(),
      this.runMobileOptimization()
    },
    t.prototype.runMobileOptimization = function() {
      var e;
      e = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
      if (e && !location.hash) return setTimeout(function() {
        return window.scrollTo(0, 1)
      },
      1e3)
    },
    t.prototype.setupHashTagChangeHandler = function() {
      var e = this;
      return $(window).hashchange(function() {
        return e.hashTagChangeHandler(location.hash)
      }),
      window.setTimeout(function() {
        return $(window).hashchange()
      },
      1500)
    },
    t.prototype.lockKeyboard = function() {
      return this.keyboardLock = !0
    },
    t.prototype.unlockKeyboard = function() {
      return this.keyboardLock = !1
    },
    t.prototype.slideIndex = function(e) {
      var t;
      return t = $(".slides .slide"),
      t.index(e)
    },
    t.prototype.isFirst = function() {
      var e;
      return e = this.slideIndex(this.current()),
      e === 0
    },
    t.prototype.isLast = function() {
      var e, t;
      return t = $(".slides .slide"),
      e = this.slideIndex(this.current()),
      e === t.length - 1
    },
    t.prototype.next = function() {
      var e, t;
      t = $(".slides .slide"),
      e = t.index(this.current());
      if (t.length - 1 > e) return this.selectAndGotoSlideWithIndex(e + 1);
      if (e === t.length - 1) return $("html, body").stop().animate({
        scrollTop: $(document).height() - $(window).height()
      },
      1200, "easeInOutQuart")
    },
    t.prototype.prev = function() {
      var e, t;
      return t = $(".slides .slide"),
      e = t.index(this.current()),
      e > 0 ? this.selectAndGotoSlideWithIndex(e - 1) : $("html, body").stop().animate({
        scrollTop: 0
      },
      1200, "easeInOutQuart")
    },
    t.prototype.setupKeyBindings = function() {
      var e, t, n = this;
      return t = !1,
      e = !0,
      $(document).on({
        keydown: function(t) {
          t.keyCode === 13 && t.shiftKey && window.editorTracker.closeLastEditor();
          if (n.keyboardLock) return;
          if (window.editable && window.currentComponent && window.currentComponent.isState("editor")) return;
          if ($("input:focus, textarea:focus, select:focus").length) return;
          switch (t.keyCode) {
          case 32:
            t.preventDefault();
            break;
          case 38:
            t.preventDefault();
            break;
          case 40:
            t.preventDefault()
          }
          return e = !0
        },
        keyup: function(r) {
          clearTimeout(t),
          t = !1;
          if (!e) {
            e = !0;
            return
          }
          if (n.keyboardLock) return;
          if (window.editable && window.currentComponent && window.currentComponent.isState("editor")) return;
          if ($("input:focus, textarea:focus, select:focus").length) return;
          switch (r.keyCode) {
          case 32:
            return r.preventDefault(),
            n.next();
          case 38:
            return r.preventDefault(),
            n.prev();
          case 40:
            return r.preventDefault(),
            n.next()
          }
        }
      })
    },
    t.prototype.hashTagChangeHandler = function(e) {
      var t, n, r = this;
      if (this.hashChangeOnWaypointChange) {
        window.edit_page.Event.publish("Menu.beforeChange", e),
        this.hashChangeOnWaypointChange = !1,
        window.edit_page.Event.publish("Menu.afterChange", e);
        return
      }
      $("html, body").stop(),
      t = $('a[data-scroll-name="' + e + '"]'),
      n = t.closest(".slide");
      if (t.length > 0) return this.scrolling = !0,
      window.edit_page.Event.publish("Menu.beforeChange", e),
      $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "1px"),
      this.selectSlide(n),
      $("html, body").stop().animate({
        scrollTop: t.first().offset().top
      },
      1200, "easeInOutQuart",
      function() {
        return $(Bobcat.DOM.FACEBOOK_ROOT).css("height", "0px"),
        window.edit_page.Event.publish("Menu.afterChange", e),
        r.scrolling = !1
      })
    },
    t.prototype.registerSlideWaypoint = function(e) {
      var t = this;
      return e.waypoint(function(e, n) {
        var r;
        if (t.firstTime) {
          t.firstTime = !1;
          return
        }
        if (!t.scrolling) {
          if (n === "down") return r = $(e.target),
          t.selectSlide(r),
          t.hashChangeOnWaypointChange = !0,
          window.location.replace(("" + window.location).split("#")[0] + "#" + (t.slideIndex(r) + 1));
          if (n === "up") return r = $(e.target),
          t.selectSlide(r.prev()),
          t.hashChangeOnWaypointChange = !0,
          window.location.replace(("" + window.location).split("#")[0] + "#" + t.slideIndex(r))
        }
      },
      {
        offset: "50%",
        continuous: !1
      })
    },
    t.prototype.selectSlide = function(e) {
      $(".slides .slide").removeClass("selected"),
      e.addClass("selected"),
      this.current(e),
      $("ul.fontselector").hide();
      if (window.edit_page.hideFontMenu) return window.edit_page.hideFontMenu()
    },
    t.prototype.selectAndGotoSlideWithIndex = function(e) {
      return window.location.hash = e + 1
    },
    t
  } ()
}.call(this),
function() {
  var e, t, n = [].indexOf ||
  function(e) {
    for (var t = 0,
    n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
    return - 1
  },
  r = function(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  },
  i = {}.hasOwnProperty,
  s = function(e, t) {
    function r() {
      this.constructor = e
    }
    for (var n in t) i.call(t, n) && (e[n] = t[n]);
    return r.prototype = t.prototype,
    e.prototype = new r,
    e.__super__ = t.prototype,
    e
  };
  t = ["extended", "included"],
  e = function() {
    function e() {}
    return e.extend = function(e) {
      var r, i, s;
      for (r in e) i = e[r],
      n.call(t, r) < 0 && (this[r] = i);
      return (s = e.extended) != null && s.apply(this),
      this
    },
    e.include = function(e) {
      var r, i, s;
      for (r in e) i = e[r],
      n.call(t, r) < 0 && (this.prototype[r] = i);
      return (s = e.included) != null && s.apply(this),
      this
    },
    e
  } (),
  window.currentComponent = null,
  window.currentRepeatable = null,
  Bobcat.EditorTracker = function(e) {
    function t() {
      this.closeLastEditor = r(this.closeLastEditor, this),
      this.addOpenedEditor = r(this.addOpenedEditor, this),
      this.removeFromOpenedEditors = r(this.removeFromOpenedEditors, this),
      this.hasOpenedEditor = r(this.hasOpenedEditor, this),
      this.openedEditors = []
    }
    return s(t, e),
    t.prototype.hasOpenedEditor = function() {
      return this.openedEditors.length === 0
    },
    t.prototype.removeFromOpenedEditors = function(e) {
      var t;
      t = $.inArray(e, this.openedEditors);
      if (t > -1) return this.openedEditors.splice(t, 1)
    },
    t.prototype.addOpenedEditor = function(e) {
      return this.openedEditors.push(e)
    },
    t.prototype.closeLastEditor = function() {
      var e;
      return e = this.openedEditors.pop(),
      e && (Bobcat.AE.track("Editor - Combo Key - Done"), e.doneClickHandler()),
      e
    },
    t
  } (e),
  window.editorTracker = new Bobcat.EditorTracker,
  Bobcat.Component = function(e) {
    function t(e, t) {
      e == null && (e = {}),
      t == null && (t = {}),
      this.loadData = r(this.loadData, this),
      this.doneClickHandler = r(this.doneClickHandler, this),
      this.hideEditorHandler = r(this.hideEditorHandler, this),
      this.clickEditorHandler = r(this.clickEditorHandler, this),
      this.mouseleaveHandler = r(this.mouseleaveHandler, this),
      this.mouseenterHandler = r(this.mouseenterHandler, this),
      this.firstTimeToLoad = !0,
      this.loadData(e, t),
      this.selected = ko.observable(),
      this.dialogOpen = ko.observable(!1),
      this.state = ko.observable(0)
    }
    return s(t, e),
    t.prototype.isState = function(e) {
      return e === "normal" && this.state() === 0 ? !0 : e === "overlay" && this.state() === 1 ? !0 : e === "editor" && this.state() === 2 ? !0 : !1
    },
    t.prototype.gotoState = function(e) {
      if (e === "normal") return this === window.currentComponent && (window.currentComponent = null),
      this === window.currentRepeatable && (window.currentRepeatable = null),
      this.state(0),
      window.editorTracker.removeFromOpenedEditors(this);
      if (e === "overlay") {
        if (!this.type || this.type() !== "RepeatableItem") if (window.currentComponent && window.currentComponent.isState("overlay")) {
          window.currentComponent.gotoState("normal");
          return
        }
        return this.type && this.type() === "RepeatableItem" ? window.currentRepeatable = this: window.currentComponent = this,
        this.state(1)
      }
      if (e === "editor") return window.editorTracker.addOpenedEditor(this),
      this.state(2)
    },
    t.prototype.mouseenterHandler = function(e) {
      if (this.isState("normal")) return this.gotoState("overlay")
    },
    t.prototype.mouseleaveHandler = function(e) {
      if (this.isState("overlay")) return this.gotoState("normal")
    },
    t.prototype.clickEditorHandler = function(e) {
      if (this.isState("overlay")) return this.gotoState("editor")
    },
    t.prototype.hideEditorHandler = function(e) {
      if (this.isState("editor")) return this.gotoState("normal")
    },
    t.prototype.doneClickHandler = function(e) {
      return this.hideEditorHandler(e),
      window.edit_page.unsavedChanges() && Bobcat.AE.trackWithoutMixpanel("Editor - Edited " + this.type()),
      window.edit_page.saveWhenUnsaved(!0)
    },
    t.prototype.loadData = function(e, t) {
      var n, r, i = this;
      e == null && (e = {}),
      t == null && (t = {}),
      this.firstTimeToLoad && (this.lastData = e, this.firstTimeToLoad = !1),
      ko.mapping.fromJS(e, t, this);
      for (n in e) r = e[n],
      this[n] && ko.isSubscribable(this[n]) && this[n].subscribe(function(e) {
        return window.edit_page.unsavedChanges(!0)
      });
      if (window.edit_page && window.edit_page.unsavedChanges() && !this.firstTimeToLoad) return window.edit_page.pushModification(function() {
        return ko.mapping.fromJS(i.lastData, t, i)
      }),
      this.lastData = e
    },
    t
  } (e)
}.call(this),
function() {
  var e = function(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  },
  t = {}.hasOwnProperty,
  n = function(e, n) {
    function i() {
      this.constructor = e
    }
    for (var r in n) t.call(n, r) && (e[r] = n[r]);
    return i.prototype = n.prototype,
    e.prototype = new i,
    e.__super__ = n.prototype,
    e
  };
  Bobcat.DelayJob = function() {
    function t() {
      this.getAllJobs = e(this.getAllJobs, this),
      this.getJob = e(this.getJob, this),
      this.add = e(this.add, this),
      this.jobs = {}
    }
    return t.prototype.add = function(e, t) {
      return this.jobs[e] = t
    },
    t.prototype.getJob = function(e) {
      return this.jobs[e]
    },
    t.prototype.getAllJobs = function() {
      var e, t, n, r;
      n = [],
      r = this.jobs;
      for (t in r) e = r[t],
      n.push(e);
      return n
    },
    t
  } (),
  window.runAfterDomBinding = new Bobcat.DelayJob,
  Bobcat.UrlHelper = {
    isEmail: function(e) {
      var t;
      return t = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      t.test(e)
    },
    hasProtocol: function(e) {
      var t, n;
      return t = /^((http|https|ftp|mailto|tel|fb):)/,
      n = /^(#)/,
      t.test(e) || n.test(e)
    },
    addProtocol: function(e) {
      // by jfo, do *not* add 'http://' if has no protocol
      return $.trim(e).length === 0 ? e = "javascript:void(0);": this.isEmail(e) ? e = "mailto:" + e: this.hasProtocol(e) || (e = /*"http://" + window.location.host +*/ e),
      e
    }
  },
  Bobcat.ImageOptionHelper = {
    IMAGE_SIZE: {
      small: "300x225>",
      medium: "720x540>",
      large: "1200x900>",
      background: "2000x1200>"
    },
    getOptions: function(e) {
      var t, n, r, i, s;
      return this.conversions ? this.conversions: (window.form = e, n = e.find('[name="asset[image_size]"]').get(0), i = e.find('[name="asset[thumb_size]"]').get(0), r = this.toImageSize($(n).val()), s = this.toImageSize($(i).val()), t = {
        custom: {
          size: r
        },
        thumb: {
          size: s
        }
      },
      this.conversions = t)
    },
    toImageSize: function(e) {
      if (e === "small" || e === "medium" || e === "large" || e === "background") e = this.IMAGE_SIZE[e];
      return e
    }
  },
  Bobcat.PageData = function(t) {
    function r(t) {
      this.getShownNavIndex = e(this.getShownNavIndex, this);
      var n;
      typeof t.showNavigationButtons == "undefined" && (t.showNavigationButtons = !1);
      if (typeof t.submenu == "undefined" || !t.submenu) t.submenu = {
        type: "SubMenu",
        list: [],
        components: {
          link: {
            type: "Button",
            url: "http://www.wordpress.com",
            text: "Blog",
            new_target: !0
          }
        }
      };
      n = {
        slides: {
          create: function(e) {
            return new Bobcat.Slide(e.data)
          }
        },
        menu: {
          create: function(e) {
            return new Bobcat.Menu(e.data)
          }
        },
        footer: {
          create: function(e) {
            return new Bobcat.Footer(e.data)
          }
        },
        submenu: {
          create: function(e) {
            return new Bobcat.SubMenu(e.data)
          }
        }
      },
      r.__super__.constructor.call(this, t, n)
    }
    return n(r, t),
    r.prototype.bindSlides = function() {
      var e, t, n, r, i, s, o, u, a, f, l = this;
      this.menu.bind($(Bobcat.DOM.NAVIGATOR)),
      this.footer.bind($(Bobcat.DOM.FOOTER)),
      $(Bobcat.DOM.SLIDES).length !== this.slides().length && console.warn("Slide data and .slide classes are different."),
      u = this.slides();
      for (t = r = 0, s = u.length; r < s; t = ++r) n = u[t],
      e = $(Bobcat.DOM.SLIDES).eq(t),
      n.index(t),
      n.html(e);
      this.slides.subscribe(function(e) {
        var n, r, i, s, o;
        for (t = r = 0, s = e.length; r < s; t = ++r) n = e[t],
        n.index(t);
        for (i = 0, o = e.length; i < o; i++) n = e[i],
        n.html().find(".section-anchor").attr("data-scroll-name", "#" + (n.index() + 1)),
        n.beforeMoveHandler(),
        $(".slides").append(n.html()),
        n.afterMovedHandler();
        return $.waypoints("refresh")
      }),
      ko.applyBindings(this, Bobcat.DOM.PAGE_DATA_SCOPE),
      a = this.slides(),
      f = [];
      for (i = 0, o = a.length; i < o; i++) n = a[i],
      f.push(n.bind());
      return f
    },
    r.prototype.addSlideData = function(e, t) {
      return this.slides.splice(e, 0, t),
      window.edit_page.createTwipsy()
    },
    r.prototype.removeSlideData = function(e) {
      return this.slides.splice(e, 1),
      window.edit_page.removeTwipsy()
    },
    r.prototype.hideAllEditors = function() {
      var e, t, n, r;
      r = this.slides();
      for (t = 0, n = r.length; t < n; t++) e = r[t],
      e.hideAllEditors();
      return this.menu.hideAllEditors()
    },
    r.prototype.getShownNavIndex = function(e) {
      var t, n, r, i, s, o;
      e = parseInt(e, 10);
      if (e < 0) return 0;
      t = 0,
      o = this.slides();
      for (r = i = 0, s = o.length; i < s; r = ++i) {
        n = o[r];
        if (e === r) {
          n.isHidden() && (t -= 1);
          break
        }
        n.isHidden() || (t += 1)
      }
      return t < 0 && (t = 0),
      t
    },
    r
  } (Bobcat.Component),
  Bobcat.Slide = function(t) {
    function r(t) {
      var n;
      this.data = t,
      this.isHidden = e(this.isHidden, this),
      this.selectSlide = e(this.selectSlide, this),
      this.toggleMenu = e(this.toggleMenu, this),
      this.renameDone = e(this.renameDone, this),
      this.rename = e(this.rename, this),
      n = {
        components: {
          create: function(e) {
            var t, n, r, i;
            n = {},
            i = e.data;
            for (t in i) r = i[t],
            n[t] = new Bobcat[r.type](r),
            typeof n[t].init != "undefined" && n[t].init();
            return n
          }
        }
      },
      r.__super__.constructor.call(this, this.data, n),
      this.html = ko.observable(),
      this.index = ko.observable(),
      this.renameMode = ko.observable(!1)
    }
    return n(r, t),
    r.StripHtml = function(e) {
      return Bobcat.Gallery.StripHtml(e)
    },
    r.prototype.html_copy = function() {
      return this.html().html()
    },
    r.prototype.hideAllEditors = function() {
      var e, t, n, r;
      n = this.components,
      r = [];
      for (t in n) e = n[t],
      r.push(e.hideEditorHandler());
      return r
    },
    r.prototype.bind = function() {
      return ko.applyBindings(this.components, this.html().get(0))
    },
    r.prototype.rename = function(e) {
      return this.renameMode(!0),
      window.dom = e,
      $(e.closest(".section").find("input").first()).focus(),
      window.slide_navigator.lockKeyboard()
    },
    r.prototype.renameDone = function() {
      return this.renameMode(!1),
      window.slide_navigator.unlockKeyboard(),
      Bobcat.AE.track("Editor - Rename Section")
    },
    r.prototype.toggleMenu = function() {
      var e;
      return e = this.components.slideSettings.show_nav(),
      this.components.slideSettings.show_nav(!e)
    },
    r.prototype.selectSlide = function(e) {
      return this.isSelected() ? this.rename(e) : window.slide_navigator.selectAndGotoSlideWithIndex(this.index())
    },
    r.prototype.isHidden = function() {
      return ! this.components.slideSettings.show_nav()
    },
    r.prototype.hashHref = function() {
      return "#" + (this.index() + 1)
    },
    r.prototype.isSelected = function() {
      return window.slide_navigator.current().is(this.html())
    },
    r.prototype.deleteSlide = function(e) {
      return window.edit_page.deleteSlide(this.index())
    },
    r.prototype.duplicateSlide = function(e) {
      return window.edit_page.duplicateSlide(this.index()),
      window.edit_page.removeTwipsy()
    },
    r.prototype.beforeMoveHandler = function() {
      var e, t, n, r;
      n = this.components,
      r = [];
      for (t in n) e = n[t],
      e.beforeMoveHandler != null ? r.push(e.beforeMoveHandler()) : r.push(void 0);
      return r
    },
    r.prototype.afterMovedHandler = function() {},
    r
  } (Bobcat.Component),
  Bobcat.Text = function(e) {
    function t(e) {
      var n, r = this;
      n = {
        style: {
          create: function(e) {
            return new Bobcat.TextStyle(e.data)
          }
        }
      },
      t.__super__.constructor.call(this, e, n),
      this.oldValue = ko.observable()
    }
    return n(t, e),
    t.prototype.edit = function() {
      t.__super__.edit.call(this);
      if (this["default"]()) return this.oldValue(this.value()),
      this.value("&nbsp;")
    },
    t.prototype.deselect = function() {
      t.__super__.deselect.call(this);
      if (this["default"]()) return this.value() === "&nbsp;" ? this.value(this.oldValue()) : this["default"](!1)
    },
    t
  } (Bobcat.Component),
  Bobcat.RichText = function(t) {
    function r(t) {
      this.hasContent = e(this.hasContent, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.changeFontHandler = e(this.changeFontHandler, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.doneClickHandler = e(this.doneClickHandler, this),
      this.deleteHandler = e(this.deleteHandler, this),
      r.__super__.constructor.call(this, t),
      this.textarea = null,
      this.editor = null,
      this.origin_text = null
    }
    return n(r, t),
    r.prototype.deleteHandler = function(e, t) {
      t.stopPropagation();
      if (this.editor && this.editor.tinymce()) return this.editor.tinymce().setContent(""),
      this.editor.tinymce().focus()
    },
    r.prototype.init = function() {},
    r.prototype.doneClickHandler = function(e) {
      return this.done(),
      window.edit_page.Event.publish("RichTextComponent.afterTextChange", {
        target: e.closest(".text-component")
      }),
      r.__super__.doneClickHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.cancel(),
      this.hideEditorHandler()
    },
    r.prototype.changeFontHandler = function(e) {
      return this.doneClickHandler(e),
      window.edit_page.showFontMenu(e.attr("text-type")),
      window.edit_page.showMenu()
    },
    r.prototype.clickEditorHandler = function(e) {
      if (!r.__super__.clickEditorHandler.call(this, e)) return;
      this.textarea = e.find(Bobcat.DOM.EDITOR).find("textarea"),
      this.origin_text = this.textarea.val();
      if (!this.editor || !this.editor.tinymce()) this.editor = this.textarea.tinymce({
        theme: "advanced",
        skin: "striking",
        plugins: "autoresize,paste,inlinepopups",
        forced_root_block: "div",
        remove_linebreaks: !1,
        theme_advanced_buttons1: "bold,italic,underline,link,unlink,bullist,numlist,justifyleft,justifycenter,justifyright,justifyfull",
        theme_advanced_buttons2: "",
        theme_advanced_statusbar_location: "none",
        theme_advanced_toolbar_align: "left",
        paste_text_sticky: !0,
        setup: function(e) {
          return e.onInit.add(function(e) {
            return e.pasteAsPlainText = !0
          }),
          e.onKeyDown.add(function(e, t) {
            if (t.keyCode === 13 && t.shiftKey && window.editorTracker.closeLastEditor()) return t.preventDefault()
          })
        }
      });
      if (this.editor.tinymce()) return this.editor.tinymce().focus()
    },
    r.prototype.hasContent = function() {
      return ! /^\s*$/.test(this.value())
    },
    r.prototype.done = function() {
      var e;
      if (this.editor && this.editor.tinymce()) return e = this.filterText(this.textarea.val()),
      this.value(e),
      this.origin_text = e
    },
    r.prototype.filterText = function(e) {
      return window.abcd = e,
      e.replace(/^<div>(\s|&nbsp;)?<\/div>$/, "")
    },
    r.prototype.cancel = function() {
      if (this.editor && this.editor.tinymce()) return this.value(this.origin_text),
      this.textarea.tinymce().execCommand("mceSetContent", !1, this.origin_text)
    },
    r.prototype.beforeMoveHandler = function() {
      if (this.editor && this.editor.tinymce()) return this.editor.tinymce().remove(),
      this.gotoState("normal")
    },
    r.prototype.afterMoveHandler = function() {},
    r
  } (Bobcat.Text),
  Bobcat.HtmlComponent = function(t) {
    function r(t) {
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.doneClickHandler = e(this.doneClickHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.deselectApp = e(this.deselectApp, this),
      this.selectAppClickHandler = e(this.selectAppClickHandler, this),
      this.isAppEditorState = e(this.isAppEditorState, this),
      this.goToAppEditorState = e(this.goToAppEditorState, this),
      t.htmlValue = unescape(t.value),
      t.appEditorState = 0,
      r.__super__.constructor.call(this, t),
      this.app = null
    }
    return n(r, t),
    r.prototype.goToAppEditorState = function(e) {
      if (e === "selector") return this.appEditorState(0);
      if (e === "editor") return this.appEditorState(1)
    },
    r.prototype.isAppEditorState = function(e) {
      return e === "selector" && this.appEditorState() === 0 ? !0 : e === "editor" && this.appEditorState() === 1 ? !0 : !1
    },
    r.prototype.selectAppClickHandler = function(e) {
      var t;
      return t = e.attr("data-app-name"),
      this.goToAppEditorState("editor")
    },
    r.prototype.deselectApp = function() {
      return this.goToAppEditorState("selector")
    },
    r.prototype.clickEditorHandler = function(e) {
      if (!r.__super__.clickEditorHandler.call(this, e)) return;
      return this.textarea = e.find(Bobcat.DOM.EDITOR).find("textarea"),
      this.origin_text = this.textarea.val()
    },
    r.prototype.doneClickHandler = function(e) {
      return this.done(),
      r.__super__.doneClickHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.cancel(),
      this.hideEditorHandler()
    },
    r.prototype.done = function() {
      var e;
      return e = this.textarea.val(),
      this.value(escape(e)),
      this.htmlValue(e),
      this.origin_text = e
    },
    r.prototype.cancel = function() {
      return this.value(escape(this.origin_text)),
      this.htmlValue(this.origin_text)
    },
    r
  } (Bobcat.Component),
  Bobcat.App = function(e) {
    function t(e) {
      t.__super__.constructor.call(this, e)
    }
    return n(t, e),
    t
  } (Bobcat.Component),
  Bobcat.GoogleMapApp = function(e) {
    function t(e) {
      t.__super__.constructor.call(this, e)
    }
    return n(t, e),
    t
  } (Bobcat.App),
  Bobcat.People = function(t) {
    function r(t) {
      this.add = e(this.add, this);
      var n, i = this;
      n = {
        list: {
          create: function(e) {
            return new Bobcat.Person(e.data, i)
          }
        }
      },
      r.__super__.constructor.call(this, t, n)
    }
    return n(r, t),
    r.prototype.add = function() {
      var e;
      return e = {
        name: {
          type: "RichText",
          value: "John Doe",
          "default": !0,
          style: {
            type: "TextStyle",
            fontSize: "",
            fontFamily: ""
          }
        },
        title: {
          type: "RichText",
          value: "President",
          "default": !0,
          style: {
            type: "TextStyle",
            fontSize: "",
            fontFamily: ""
          }
        },
        image: {
          type: "Image",
          thumb_url: "//www.strikingly.com/assets/icons/new-person-d0fec4089d3e69c91f8d19c75c2c462f.png",
          url: "//www.strikingly.com/assets/icons/new-person-d0fec4089d3e69c91f8d19c75c2c462f.png"
        }
      },
      this.list.push(new Bobcat.Person(e, this))
    },
    r
  } (Bobcat.Component),
  Bobcat.SocialMediaList = function(t) {
    function r(t) {
      this.doneClickHandler = e(this.doneClickHandler, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.bind = e(this.bind, this);
      var n, i = this;
      n = {
        link_list: {
          create: function(e) {
            return new Bobcat[e.data.type](e.data, i)
          }
        },
        button_list: {
          create: function(e) {
            return new Bobcat[e.data.type](e.data, i)
          }
        }
      },
      r.__super__.constructor.call(this, t, n),
      this.link_list().length === 0 && (this.link_list = ko.observableArray(), window.social_media_config.getDefaultLinkList(this)),
      this.button_list().length === 0 && (this.button_list = ko.observableArray(), window.social_media_config.getDefaultButtonList(this)),
      this.mediaListHtml = ko.observable()
    }
    return n(r, t),
    r.prototype.bind = function() {
      return this.render()
    },
    r.prototype.render = function() {
      var e, t, n, r, i, s, o, u, a, f;
      n = "",
      u = this.button_list();
      for (r = 0, s = u.length; r < s; r++) t = u[r],
      t.show_button() && (n += t.getTemplate());
      this.mediaListHtml(n),
      a = this.button_list(),
      f = [];
      for (i = 0, o = a.length; i < o; i++) t = a[i],
      e = $('meta[name="force-social-js"]') && "true" === $('meta[name="force-social-js"]').attr("content"),
      window.edit_page.isShowPage ? t.show_button() || e ? f.push(t.reRender()) : f.push(void 0) : f.push(t.reRender());
      return f
    },
    r.prototype.clickEditorHandler = function(e) {
      return r.__super__.clickEditorHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.hideEditorHandler()
    },
    r.prototype.doneClickHandler = function(e) {
      return this.render(),
      r.__super__.doneClickHandler.call(this, e)
    },
    r
  } (Bobcat.Component),
  Bobcat.SocialMediaItem = function(t) {
    function r(t) {
      this.onScriptLoad = e(this.onScriptLoad, this);
      var n = this;
      t.link_url || (t.link_url = ""),
      t.share_text || (t.share_text = "Spotted an one pager on Striking.ly, Check it out @SimplyStriking"),
      t.url = window.social_media_config.get("url"),
      r.__super__.constructor.call(this, t),
      this.show_link = ko.dependentObservable(function() {
        return n.link_url().length > 0
      })
    }
    return n(r, t),
    r.prototype.getSubtitle = function() {
      return ""
    },
    r.prototype.onScriptLoad = function(e) {
      return this.runScript()
    },
    r.prototype.createScriptTag = function(e, t) {
      var n, r;
      return n = $("<div></div>").addClass(e),
      r = $("<script></script>").attr({
        async: !0,
        src: t
      }),
      r.bind("load", this.onScriptLoad),
      n.get(0).appendChild(r.get(0)),
      $("#fb-root").get(0).appendChild(n.get(0))
    },
    r
  } (Bobcat.Component),
  Bobcat.Facebook = function(t) {
    function r(t, n) {
      this.parent = n,
      this.runScript = e(this.runScript, this);
      if (!t.app_id || t.app_id.length < 1) t.app_id = window.social_media_config.get("fb_app_id");
      t.imageUrl = "//www.strikingly.com/assets/icons/facebook-006df763e767e6198c6e922e7d560056.png",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.getSubtitle = function() {
      return "Facebook Like button"
    },
    r.prototype.getTemplate = function() {
      return '<div class="col fb-counter"><fb:like href="' + this.url() + '" send="false" layout="button_count" data-width="100" show_faces="false" font="arial"></fb:like></div>'
    },
    r.prototype.runScript = function() {
      if (typeof FB != "undefined") return FB.init({
        appId: this.app_id(),
        status: !0,
        cookie: !0,
        xfbml: !0
      }),
      FB.Event.subscribe("edge.create",
      function(e) {
        return e === "https://www.facebook.com/strikingly" ? (window.mixpanel.track("Editor - Notification - Liked"), $.ajax({
          url: "/s/free_periods.jsm",
          type: "POST",
          dataType: "json",
          data: {
            type: "like_on_facebook"
          }
        })) : $("#footer").css("margin-bottom", "150px")
      })
    },
    r.prototype.reRender = function() {
      return $("#fb-root .facebook_script").length < 1 ? this.createScriptTag("facebook_script", document.location.protocol + "//connect.facebook.net/en_US/all.js") : this.runScript()
    },
    r
  } (Bobcat.SocialMediaItem),
  Bobcat.Twitter = function(t) {
    function r(t, n) {
      this.parent = n,
      this.runScript = e(this.runScript, this),
      t.imageUrl = "/assets/icons/twitter-287881e23131de8062be8c2da861dec0.png",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.getTemplate = function() {
      return '<div class="col twitter-counter"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + this.url() + '" data-text="' + this.share_text() + '"  data-count="horizontal">Tweet</a></div>'
    },
    r.prototype.getSubtitle = function() {
      return "Tweet button"
    },
    r.prototype.runScript = function() {
      if (typeof twttr != "undefined" && typeof twttr.widgets != "undefined") return twttr.widgets.load()
    },
    r.prototype.reRender = function() {
      return $("#fb-root .twitter_script").length < 1 ? this.createScriptTag("twitter_script", document.location.protocol + "//platform.twitter.com/widgets.js") : this.runScript()
    },
    r
  } (Bobcat.SocialMediaItem),
  Bobcat.GPlus = function(t) {
    function r(t, n) {
      this.parent = n,
      this.runScript = e(this.runScript, this),
      t.imageUrl = "/assets/icons/gplus-3e1280ac0334cf0254794201449e9c4a.png",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.getTemplate = function() {
      return '<div class="col gplus-counter"><g:plusone size="medium" annotation="bubble" href="' + this.url() + '" ></g:plusone></div>'
    },
    r.prototype.getSubtitle = function() {
      return "Google +1 button"
    },
    r.prototype.runScript = function() {
      var e;
      if (typeof gapi != "undefined" && typeof gapi.plusone != "undefined") return e = $(".gplus-counter"),
      e.each(function() {
        return gapi.plusone.go(this)
      })
    },
    r.prototype.reRender = function() {
      return $("#fb-root .gplus_script").length < 1 ? this.createScriptTag("gplus_script", document.location.protocol + "//apis.google.com/js/plusone.js") : this.runScript()
    },
    r
  } (Bobcat.SocialMediaItem),
  Bobcat.Renren = function(t) {
    function r(t, n) {
      this.parent = n,
      this.runScript = e(this.runScript, this),
      t.imageUrl = "/assets/icons/renren-a30469695c7f6d63135454cbcbf96df8.png",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.getSubtitle = function() {
      return "人人喜欢"
    },
    r.prototype.getTemplate = function() {
      var e, t;
      this.p = [],
      e = {
        url: this.url(),
        title: window.social_media_config.get("title"),
        description: window.social_media_config.get("description"),
        image: window.social_media_config.get("image")
      };
      for (t in e) this.p.push(t + "=" + encodeURIComponent(e[t] || ""));
      return '<div class="col renren-counter"><iframe scrolling="no" frameborder="0" allowtransparency="true" src="http://www.connect.renren.com/like/v2?' + this.p.join("&") + '" style="width:130px;height:24px;"></iframe></div>'
    },
    r.prototype.runScript = function() {},
    r.prototype.reRender = function() {},
    r
  } (Bobcat.SocialMediaItem),
  Bobcat.SinaWeibo = function(t) {
    function r(t, n) {
      this.parent = n,
      this.runScript = e(this.runScript, this),
      this.getTemplate = e(this.getTemplate, this),
      t.imageUrl = "/assets/icons/weibo-b705d88459da23225ace09ba2f789e45.png",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.getSubtitle = function() {
      return "新浪微博"
    },
    r.prototype.getTemplate = function() {
      var e, t, n, r, i;
      i = 72,
      r = 24,
      t = {
        url: this.url(),
        type: "3",
        count: "1",
        title: "看看这个吧！@jfojfo",
        pic: window.social_media_config.get("image"),
        rnd: (new Date).valueOf()
      },
      n = [];
      for (e in t) n.push(e + "=" + encodeURIComponent(t[e] || ""));
      return '<div class="col sinaweibo-counter"><iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + n.join("&") + '" width="' + i + '" height="' + r + '"></iframe></div>'
    },
    r.prototype.runScript = function() {},
    r.prototype.reRender = function() {},
    r
  } (Bobcat.SocialMediaItem),
  Bobcat.Person = function(e) {
    function t(e, n) {
      this.parent = n,
      t.__super__.constructor.call(this, e),
      this.name = new Bobcat.RichText(this.name),
      this.name.init(),
      this.title = new Bobcat.RichText(this.title),
      this.title.init(),
      this.image = new Bobcat.Image(this.image, {}),
      this.choosingImage = ko.observable(!1)
    }
    return n(t, e),
    t.prototype.remove = function() {
      return this.parent.list.remove(this)
    },
    t.prototype.toggleImageChooser = function() {
      return this.choosingImage(!this.choosingImage())
    },
    t
  } (Bobcat.Component),
  Bobcat.Video = function(t) {
    function r(t) {
      this.remove = e(this.remove, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.upload = e(this.upload, this),
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.upload = function(e) {
      var t = this;
      return window.edit_page.isLoading(!0),
      e.target && (e = $(e.target)),
      e.closest("form").ajaxSubmit({
        beforeSubmit: function(e, t, n) {
          return n.dataType = "json"
        },
        success: function(e, n) {
          return window.edit_page.isLoading(!1),
          t.html(e.html),
          Bobcat.AE.track("Editor - Add Video")
        },
        error: function(e, t, n) {
          return window.edit_page.isLoading(!1),
          alert("Invalid url.")
        }
      })
    },
    r.prototype.clickEditorHandler = function(e) {
      return this.oldHtml = this.html(),
      r.__super__.clickEditorHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.html(this.oldHtml),
      this.hideEditorHandler()
    },
    r.prototype.remove = function() {
      return this.html(""),
      this.url("")
    },
    r
  } (Bobcat.Component),
  Bobcat.Repeatable = function(t) {
    function r(t) {
      this.selectedIndex = e(this.selectedIndex, this),
      this.changeToPrev = e(this.changeToPrev, this),
      this.changeToNext = e(this.changeToNext, this),
      this.changeSelected = e(this.changeSelected, this),
      this.add = e(this.add, this);
      var n, i = this;
      typeof t.subItemClassName == "undefined" && (t.subItemClassName = "RepeatableItem"),
      n = {
        list: {
          create: function(e) {
            return new Bobcat[t.subItemClassName](e.data, i)
          }
        },
        components: {
          create: function(e) {
            return e.data
          }
        }
      },
      r.__super__.constructor.call(this, t, n),
      this.selected = ko.observable(),
      this.direction = ko.observable(1)
    }
    return n(r, t),
    r.prototype.add = function(e) {
      var t;
      return t = new(Bobcat[this.subItemClassName()])({
        components: this.components
      },
      this),
      this.changeSelected(t),
      this.list.push(t),
      this.changeSelected(t),
      window.edit_page.Event.publish("Repeatable.add", {
        target: e
      }),
      Bobcat.AE.track("Editor - Add Repeatable")
    },
    r.prototype.changeSelected = function(e) {
      return this.selected() && e.index() > 0 && this.selectedIndex() > e.index() ? this.direction( - 1) : this.direction(1),
      this.selected(e)
    },
    r.prototype.changeToNext = function(e) {
      return this.changeSelected(this.list()[(e.index() + 1) % this.list().length])
    },
    r.prototype.changeToPrev = function(e) {
      return this.changeSelected(this.list()[(e.index() - 1) % this.list().length])
    },
    r.prototype.beforeMoveHandler = function() {
      var e, t, n, r, i;
      r = this.list(),
      i = [];
      for (t = 0, n = r.length; t < n; t++) e = r[t],
      e.beforeMoveHandler != null ? i.push(e.beforeMoveHandler()) : i.push(void 0);
      return i
    },
    r.prototype.afterMovedHandler = function() {},
    r.prototype.selectedIndex = function() {
      if (!this.selected()) return;
      return this.selected().index()
    },
    r
  } (Bobcat.Component),
  Bobcat.RepeatableItem = function(t) {
    function r(t, n) {
      var i, s = this;
      this.parent = n,
      this.deselect = e(this.deselect, this),
      this.selectForEdit = e(this.selectForEdit, this),
      this.direction = e(this.direction, this),
      this.prev = e(this.prev, this),
      this.next = e(this.next, this),
      this.select = e(this.select, this),
      this.showEditor = e(this.showEditor, this),
      this.leaveDeleteHandler = e(this.leaveDeleteHandler, this),
      this.enterDeleteHandler = e(this.enterDeleteHandler, this),
      this.isLast = e(this.isLast, this),
      this.isFirst = e(this.isFirst, this),
      this.isEven = e(this.isEven, this),
      this.index = e(this.index, this),
      this.remove = e(this.remove, this),
      i = {
        components: {
          create: function(e) {
            var t, n, r, i;
            n = {},
            i = e.data;
            for (t in i) r = i[t],
            n[t] = new Bobcat[r.type](r),
            typeof n[t].init != "undefined" && n[t].init();
            return n
          }
        }
      },
      t.type = "RepeatableItem",
      t.deleteOverlayEnabled = !1,
      r.__super__.constructor.call(this, t, i),
      this.isSelected = ko.dependentObservable(function() {
        return s.parent.selected() === s
      },
      this)
    }
    return n(r, t),
    r.prototype.remove = function(e) {
      return this.parent.list.remove(this),
      Bobcat.AE.track("Editor - Remove Repeatable")
    },
    r.prototype.index = function() {
      return $.inArray(this, this.parent.list())
    },
    r.prototype.isEven = function() {
      return this.index() % 2 === 0
    },
    r.prototype.isFirst = function() {
      return this.index() === 0
    },
    r.prototype.isLast = function() {
      return this.index() === this.parent.list().length - 1
    },
    r.prototype.enterDeleteHandler = function() {
      return this.deleteOverlayEnabled(!0)
    },
    r.prototype.leaveDeleteHandler = function() {
      return this.deleteOverlayEnabled(!1)
    },
    r.prototype.showEditor = function() {
      var e, t, n, r;
      n = !0,
      r = this.components;
      for (t in r) e = r[t],
      n = n && (e.isState("normal") || e.isState("overlay"));
      return n
    },
    r.prototype.select = function(e) {
      return this.parent.changeSelected(this)
    },
    r.prototype.next = function(e) {
      return this.deselect(),
      this.parent.changeToNext(this)
    },
    r.prototype.prev = function(e) {
      return this.deselect(),
      this.parent.changeToPrev(this)
    },
    r.prototype.direction = function() {
      return this.parent.direction()
    },
    r.prototype.selectForEdit = function(e) {
      var t, n, r;
      this.deselect(),
      this.select(e),
      r = this.components;
      for (n in r) {
        t = r[n];
        if (t.type() === "Image") {
          t.mouseenterHandler(),
          t.clickEditorHandler();
          return
        }
      }
    },
    r.prototype.deselect = function() {
      var e, t, n, r, i, s, o;
      s = this.parent.list(),
      o = [];
      for (r = 0, i = s.length; r < i; r++) t = s[r],
      o.push(function() {
        var r, i;
        r = t.components,
        i = [];
        for (n in r) e = r[n],
        e.type() === "Image" && e.isState("editor") ? i.push(e.clickCancelEditorHandler()) : i.push(void 0);
        return i
      } ());
      return o
    },
    r.prototype.beforeMoveHandler = function() {
      var e, t, n, r;
      n = this.components,
      r = [];
      for (t in n) e = n[t],
      e.beforeMoveHandler != null ? r.push(e.beforeMoveHandler()) : r.push(void 0);
      return r
    },
    r.prototype.afterMovedHandler = function() {},
    r
  } (Bobcat.Component),
  Bobcat.SubMenu = function(t) {
    function r(t) {
      this.add = e(this.add, this),
      t.subItemClassName = "SubMenuItem",
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.prototype.add = function(e) {
      return r.__super__.add.call(this, e),
      this.selected().edit(),
      Bobcat.AE.track("Editor - Add External Link")
    },
    r
  } (Bobcat.Repeatable),
  Bobcat.SubMenuItem = function(t) {
    function r() {
      return this.select = e(this.select, this),
      this.editDone = e(this.editDone, this),
      this.edit = e(this.edit, this),
      r.__super__.constructor.apply(this, arguments)
    }
    return n(r, t),
    r.prototype.edit = function() {
      return this.gotoState("editor")
    },
    r.prototype.editDone = function() {
      return this.gotoState("normal"),
      this.parent.selected(null)
    },
    r.prototype.select = function(e) {
      return this.isSelected() ? this.parent.selected(null) : (r.__super__.select.call(this, e), this.edit())
    },
    r
  } (Bobcat.RepeatableItem),
  Bobcat.Gallery = function(t) {
    function r(t) {
      this.prevImage = e(this.prevImage, this),
      this.nextImage = e(this.nextImage, this),
      this.changeImage = e(this.changeImage, this),
      this.error_callback = e(this.error_callback, this),
      this.upload = e(this.upload, this),
      this.clickRemoveCurrentHandler = e(this.clickRemoveCurrentHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.mouseleaveHandler = e(this.mouseleaveHandler, this),
      this.mouseenterHandler = e(this.mouseenterHandler, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.add = e(this.add, this);
      var n, i, s = this;
      i = {
        sources: {
          create: function(e) {
            return new Bobcat.Image(e.data, {},
            s)
          }
        }
      },
      r.__super__.constructor.call(this, t, i),
      this.nullImage = new Bobcat.Image({
        type: "Image",
        url: "",
        caption: "",
        description: ""
      },
      {},
      this),
      n = function() {
        return ""
      },
      this.emptyImage = {
        url: n,
        caption: n,
        description: n
      },
      this.current = ko.observable(),
      this.sources().length ? this.current(this.sources()[0]) : this.current(this.nullImage),
      this.empty = ko.dependentObservable(function() {
        return s.sources().length === 0
      },
      this)
    }
    return n(r, t),
    r.include(Bobcat.ImageOptionHelper),
    r.StripHtml = function(e) {
      return Bobcat.DOM.GALLERY_IMAGES(e).remove(),
      Bobcat.DOM.GALLERY_IMAGES_EDITOR(e).remove()
    },
    r.prototype.add = function(e) {
      var t;
      return t = new Bobcat.Image(e, {},
      this),
      this.sources.push(t),
      this.current(t)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.hideEditorHandler()
    },
    r.prototype.mouseenterHandler = function(e) {
      if (this.isState("normal")) return this.gotoState("overlay")
    },
    r.prototype.mouseleaveHandler = function(e) {
      if (this.isState("overlay")) return this.gotoState("normal")
    },
    r.prototype.clickEditorHandler = function(e) {
      return this.current(e),
      this.gotoState("editor")
    },
    r.prototype.clickRemoveCurrentHandler = function(e) {
      return this.current() && (this.current().clickRemoveHandler(), this.current(this.nullImage)),
      this.gotoState("normal")
    },
    r.prototype.upload = function(e) {
      var t = this;
      e.target && (e = $(e.target));
      if (typeof filepicker == "undefined") {
        alert("Oops, a network issue prevents you from uploading, please refresh and try again."),
        _gaq.push(["_trackEvent", "UploadError", "network error"]);
        return
      }
      return filepicker.pickAndStore($.extend({
        multiple: !0
      },
      window.filepicker_options), window.store_options,
      function(n) {
        var r, i, s, o;
        window.edit_page.isLoading(!0),
        console.log(n),
        r = e.closest("form");
        for (s = 0, o = n.length; s < o; s++) i = n[s],
        i.style = t.getOptions(r);
        return r.ajaxSubmit({
          beforeSerialize: function(e, t) {
            return t.dataType = "json",
            t.data = {
              assets: JSON.stringify(n),
              multiple: !0
            }
          },
          error: t.error_callback,
          success: function(e) {
            var n, r, i, s, o, u;
            console.log(e),
            n = e.images.length,
            o = e.images,
            u = [];
            for (i = 0, s = o.length; i < s; i++) r = o[i],
            u.push(function(e) {
              var r, i;
              return console.log(e),
              i = function(r) {
                r && (e.url = r),
                t.add(e),
                n--,
                console.log(n);
                if (n === 0) return window.edit_page.isLoading(!1),
                window.edit_page.save(!0)
              },
              r = new Bobcat.Beacon(e.url, i, t.error_callback),
              r.blink(3e3)
            } (r));
            return u
          }
        },
        t.error_callback)
      })
    },
    r.prototype.error_callback = function(e) {
      window.edit_page.isLoading(!1),
      alert("A network issue prevents you from uploading, please try again.");
      if (e) return _gaq.push(["_trackEvent", "GalleryUploadErrors", e])
    },
    r.prototype.changeImage = function(e) {
      var t;
      return t = (this.sources.indexOf(this.current()) + e) % this.sources().length,
      t < 0 && (t += this.sources().length),
      this.current(this.sources()[t])
    },
    r.prototype.nextImage = function() {
      return this.changeImage(1)
    },
    r.prototype.prevImage = function() {
      return this.changeImage( - 1)
    },
    r.prototype.isLastElement = function(e) {
      return e.parent().find(".thumb").index(e) === this.sources().length - 1
    },
    r.prototype.afterRender = function(e) {
      var t;
      if (this.isLastElement($(e))) return t = Bobcat.DOM.GALLERY($(e)),
      t.fancybox({
        beforeLoad: function() {
          var e;
          e = Bobcat.DOM.IMAGE_DESCRIPTION($(this.element)),
          this.title = Bobcat.DOM.IMAGE_TITLE($(this.element));
          if (e.length) return this.title += " - " + Bobcat.DOM.IMAGE_DESCRIPTION($(this.element))
        },
        closeBtn: !1,
        helpers: {
          buttons: {},
          thumbs: {
            width: 40,
            height: 40
          }
        },
        margin: [20, 8, 8, 8],
        padding: 5,
        arrows: !1,
        nextClick: !0
      })
    },
    r
  } (Bobcat.Component),
  Bobcat.Button = function(t) {
    function r(t) {
      this.toggleTarget = e(this.toggleTarget, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.changeUrl = e(this.changeUrl, this),
      this.doneClickHandler = e(this.doneClickHandler, this),
      this.link_url = e(this.link_url, this),
      this.target = e(this.target, this),
      typeof t.new_target == "undefined" && (t.new_target = !0),
      r.__super__.constructor.call(this, t)
    }
    return n(r, t),
    r.include(Bobcat.UrlHelper),
    r.prototype.target = function() {
      return this.new_target() ? "_blank": "_self"
    },
    r.prototype.link_url = function() {
      var e;
      return e = this.url(),
      this.addProtocol(e)
    },
    r.prototype.doneClickHandler = function(e) {
      var t;
      return t = this.addProtocol(this.url()),
      this.url(t),
      r.__super__.doneClickHandler.call(this, e)
    },
    r.prototype.changeUrl = function(e) {
      return this.url(e.attr("data-url"))
    },
    r.prototype.clickEditorHandler = function(e) {
      return this.oldText = this.text(),
      this.oldUrl = this.url(),
      r.__super__.clickEditorHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.text(this.oldText),
      this.url(this.oldUrl),
      this.hideEditorHandler()
    },
    r.prototype.toggleTarget = function(e) {
      return this.new_target(!this.new_target())
    },
    r
  } (Bobcat.Component),
  Bobcat.Image = function(t) {
    function r(t, n, i) {
      var s = this;
      this.parent = i,
      this.hasContent = e(this.hasContent, this),
      this.remove = e(this.remove, this),
      this.clickRemoveHandler = e(this.clickRemoveHandler, this),
      this.clickGalleryEditorHandler = e(this.clickGalleryEditorHandler, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.addFilter = e(this.addFilter, this),
      this.error_callback = e(this.error_callback, this),
      this.upload = e(this.upload, this),
      this.link = e(this.link, this),
      this.doneClickHandler = e(this.doneClickHandler, this),
      this.showDescriptionInput = e(this.showDescriptionInput, this),
      this.openDescriptionInput = e(this.openDescriptionInput, this),
      this.showLinkInput = e(this.showLinkInput, this),
      this.openLinkInput = e(this.openLinkInput, this),
      this.goToDescriptionField = e(this.goToDescriptionField, this),
      this.goToLinkUrlField = e(this.goToLinkUrlField, this),
      this.target = e(this.target, this),
      typeof t.new_target == "undefined" && (t.new_target = !0),
      t.linkInputEnabled = t.link_url ? t.link_url.length > 0 : !1,
      t.descriptionInputEnabled = t.caption ? t.caption.length > 0 : !1,
      r.__super__.constructor.call(this, t, n),
      this.parent && (this.selected = ko.dependentObservable(function() {
        return s === s.parent.current()
      },
      this)),
      this.loadingSpinner = !0
    }
    return n(r, t),
    r.include(Bobcat.UrlHelper),
    r.include(Bobcat.ImageOptionHelper),
    r.prototype.target = function() {
      return this.new_target() ? "_blank": "_self"
    },
    r.prototype.goToLinkUrlField = function(e, t) {
      return e.preventDefault(),
      $(t).closest("form").find(".link_url").focus(),
      window.el = t
    },
    r.prototype.goToDescriptionField = function(e, t) {
      return e.preventDefault(),
      $(t).closest("form").find("textarea").focus(),
      window.el = t
    },
    r.prototype.openLinkInput = function(e) {
      return this.linkInputEnabled(!0)
    },
    r.prototype.showLinkInput = function() {
      return this.linkInputEnabled()
    },
    r.prototype.openDescriptionInput = function(e) {
      return this.descriptionInputEnabled(!0)
    },
    r.prototype.showDescriptionInput = function() {
      return this.descriptionInputEnabled()
    },
    r.prototype.doneClickHandler = function(e) {
      return window.edit_page.Event.publish("ImageComponent.afterChange", {
        target: e.closest(".image-component")
      }),
      r.__super__.doneClickHandler.call(this, e)
    },
    r.prototype.link = function() {
      var e;
      return e = this.link_url(),
      this.addProtocol(e)
    },
    r.prototype.upload = function(e) {
      var t = this;
      e.target && (e = $(e.target));
      if (typeof filepicker == "undefined") {
        alert("Oops, a network issue prevents you from uploading, please refresh and try again."),
        _gaq.push(["_trackEvent", "UploadError", "network error"]);
        return
      }
      return filepicker.pickAndStore(window.filepicker_options, window.store_options,
      function(n) {
        var r, i;
        return console.log(n),
        i = n[0],
        r = e.closest("form"),
        i.style = t.getOptions(r),
        console.log(i),
        window.edit_page.isLoading(!0),
        t.oldUrl = t.url(),
        t.loadingSpinner && t.url($('meta[name="loading-image-spinner"]').attr("content")),
        r.ajaxSubmit({
          beforeSerialize: function(e, t) {
            return t.dataType = "json",
            t.data = {
              "asset[image_json]": JSON.stringify(i)
            }
          },
          error: t.error_callback,
          success: function(e) {
            var n, r;
            return console.log(e),
            r = function(n) {
              n && (e.url = n),
              t.loadData(e),
              window.edit_page.isLoading(!1),
              Bobcat.AE.track("Editor - Upload Image");
              if (t.type() === "BackgroundImage") return t.oldUrl = t.url()
            },
            n = new Bobcat.Beacon(e.url, r, t.error_callback),
            n.blink(3e3)
          }
        },
        t.error_callback)
      })
    },
    r.prototype.error_callback = function(e) {
      this.url(this.oldUrl),
      window.edit_page.isLoading(!1),
      alert("A network issue prevents you from uploading, please try again.");
      if (e) return _gaq.push(["_trackEvent", "UploadErrors", e])
    },
    r.prototype.addFilter = function(e) {
      var t, n, r, i = this;
      if (typeof window.featherEditor == "undefined" || typeof filepicker == "undefined") {
        alert("Oops, a network issue prevents you from adding effects, please refresh and try again."),
        _gaq.push(["_trackEvent", "UploadError", "network error"]);
        return
      }
      return e.target && (e = $(e.target)),
      t = $(document).scrollTop() + ($(window).height() - $("#avpw_controls").height()) / 2,
      $("#avpw_controls").css("top", t),
      $("#avpw_control_cancel_pane").css("top", t),
      window.user_data.plan === "free" ? r = ["effects", "crop", "orientation", "resize", "sharpness", "brightness", "contrast"] : r = ["enhance", "effects", "crop", "orientation", "resize", "warmth", "brightness", "contrast", "saturation", "sharpness", "text", "redeye", "whiten", "blemish"],
      n = function(e) {
        var t, n;
        return t = $("meta[name=asset-url]").attr("content"),
        t && (n = /^\/assets\//, n.test(e) && (e = t + e, /^\/\//.test(e) && (e = "http:" + e))),
        e.replace("https", "http")
      },
      window.featherEditor.launch({
        tools: r,
        onSave: function(t, n) {
          return window.edit_page.isLoading(!0),
          i.oldUrl = i.url(),
          i.loadingSpinner && i.url($('meta[name="loading-image-spinner"]').attr("content")),
          window.featherEditor.close(),
          filepicker.storeUrl(n, window.store_options,
          function(t) {
            var n;
            return n = e.closest("form"),
            t.style = i.getOptions(n),
            n.ajaxSubmit({
              beforeSerialize: function(e, n) {
                return n.dataType = "json",
                n.data = {
                  "asset[image_json]": JSON.stringify(t)
                }
              },
              error: i.error_callback,
              success: function(e) {
                var t, n;
                return console.log(e),
                n = function(t) {
                  t && (e.url = t),
                  i.loadData(e),
                  window.edit_page.isLoading(!1),
                  Bobcat.AE.track("Editor - Add Image Effects");
                  if (i.type() === "BackgroundImage") return i.oldUrl = i.url()
                },
                t = new Bobcat.Beacon(e.url, n, i.error_callback),
                t.blink(3e3)
              }
            })
          },
          i.error_callback)
        },
        image: e.closest("form").find("img"),
        url: n(this.url())
      })
    },
    r.prototype.clickEditorHandler = function(e) {
      return this.oldUrl = this.url(),
      this.oldThumbUrl = this.thumb_url(),
      r.__super__.clickEditorHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.url(this.oldUrl),
      this.thumb_url(this.oldThumbUrl),
      this.hideEditorHandler()
    },
    r.prototype.clickGalleryEditorHandler = function(e) {
      var t = this;
      if (this.parent) return this.parent.current(this),
      this.parent.gotoState("editor"),
      setTimeout(function() {
        return $(window).scrollTo(e.closest(".editable").find(".editor"), {
          easing: "easeOutQuint",
          duration: 300,
          axis: "y",
          offset: -150
        })
      },
      200)
    },
    r.prototype.clickRemoveHandler = function() {
      return this.parent.sources.remove(this)
    },
    r.prototype.remove = function(e) {
      return this.url("//www.strikingly.com/assets/icons/transparent.png"),
      this.thumb_url("//www.strikingly.com/assets/icons/transparent.png")
    },
    r.prototype.hasContent = function() {
      return this.url() !== "//www.strikingly.com/assets/icons/transparent.png"
    },
    r
  } (Bobcat.Component),
  Bobcat.TextStyle = function(e) {
    function t(e, n) {
      this.parent = n,
      t.__super__.constructor.call(this, e)
    }
    return n(t, e),
    t
  } (Bobcat.Component),
  Bobcat.BackgroundImage = function(t) {
    function r(t) {
      this.onDoneHandler = e(this.onDoneHandler, this),
      this.onClickHandler = e(this.onClickHandler, this),
      this.selectImage = e(this.selectImage, this),
      this.recover = e(this.recover, this),
      this.previewImage = e(this.previewImage, this),
      this.remove = e(this.remove, this),
      this.textStyle = e(this.textStyle, this);
      var n, i = this;
      n = {},
      n.textStyles = {
        create: function(e) {
          return new Bobcat.TextStyle(e.data, this)
        }
      };
      if (typeof t.textStyles == "undefined" || !t.textStyles || !t.selectedClassName) t.textStyles = [],
      t.textStyles.push({
        type: "TextStyle",
        displayName: "Light Text",
        colorCode: "#ffffff",
        className: "strikingly-light-text"
      }),
      t.textStyles.push({
        type: "TextStyle",
        displayName: "Dark Text",
        colorCode: "#222222",
        className: "strikingly-dark-text"
      }),
      t.selectedClassName = "strikingly-light";
      r.__super__.constructor.call(this, t, n),
      this.opacity_f = ko.dependentObservable(function() {
        return i.opacity() / 100
      }),
      this.onPreview = !1,
      this.formOpen = !1,
      this.loadingSpinner = !1
    }
    return n(r, t),
    r.prototype.textStyle = function() {
      var e, t = this;
      return e = this.textStyles().filter(function(e) {
        return e.className() === t.selectedClassName()
      }),
      e[0]
    },
    r.prototype.remove = function(e) {
      return this.url("//www.strikingly.com/assets/icons/transparent.png")
    },
    r.prototype.previewImage = function(e) {
      return this.oldUrl || (this.oldUrl = this.url(), this.oldStyle = this.style()),
      this.url(window.theme_background_images[parseInt(e.attr("data-image-index"))].url),
      this.style(window.theme_background_images[parseInt(e.attr("data-image-index"))].style),
      this.onPreview = !0
    },
    r.prototype.recover = function(e) {
      if (this.onPreview) return this.url(this.oldUrl),
      this.style(this.oldStyle),
      this.oldUrl = "",
      this.oldStyle = ""
    },
    r.prototype.selectImage = function(e) {
      return this.url(window.theme_background_images[parseInt(e.attr("data-image-index"))].url),
      this.style(window.theme_background_images[parseInt(e.attr("data-image-index"))].style),
      this.oldUrl = "",
      this.oldStyle = "",
      this.onPreview = !1,
      window.edit_page.unsavedChanges() && Bobcat.AE.track("Editor - Edit Background"),
      window.edit_page.saveWhenUnsaved()
    },
    r.prototype.onClickHandler = function(e) {
      var t;
      return t = e.parent().find(".background-form"),
      this.formOpen ? (t.slideUp(), this.formOpen = !1) : (t.slideDown(), this.formOpen = !0)
    },
    r.prototype.onDoneHandler = function(e) {
      var t;
      return t = e.closest(".background-form"),
      t.slideUp(),
      window.edit_page.unsavedChanges() && Bobcat.AE.track("Editor - Edit Background"),
      window.edit_page.saveWhenUnsaved(),
      this.formOpen = !1
    },
    r
  } (Bobcat.Image),
  Bobcat.SlideSettings = function(e) {
    function t() {
      return t.__super__.constructor.apply(this, arguments)
    }
    return n(t, e),
    t
  } (Bobcat.Component),
  Bobcat.Menu = function(e) {
    function t(e) {
      var n;
      this.data = e,
      n = {},
      n.components = {
        create: function(e) {
          var t, n, r, i;
          n = {},
          i = e.data;
          for (t in i) r = i[t],
          n[t] = new Bobcat[r.type](r),
          typeof n[t].init != "undefined" && n[t].init();
          return n
        }
      },
      t.__super__.constructor.call(this, this.data, n)
    }
    return n(t, e),
    t.prototype.bind = function(e) {
      var t, n, r, i;
      if (e.length > 0) {
        i = [];
        for (n = 0, r = e.length; n < r; n++) t = e[n],
        i.push(ko.applyBindings(this.components, t));
        return i
      }
      return console.warn("Cannot find .navigator")
    },
    t.prototype.hideAllEditors = function() {
      return this.logo.hideEditorHandler()
    },
    t
  } (Bobcat.Component),
  Bobcat.Footer = function(e) {
    function t(e) {
      var n, r = this;
      n = {
        socialMedia: {
          create: function(e) {
            return new Bobcat[e.data.type](e.data, r)
          }
        },
        copyright: {
          create: function(e) {
            return new Bobcat[e.data.type](e.data, r)
          }
        }
      },
      t.__super__.constructor.call(this, e, n)
    }
    return n(t, e),
    t.prototype.bind = function(e) {
      return e.length > 0 ? (ko.applyBindings(this, e.get(0)), this.socialMedia.bind()) : console.warn("Cannot find #footer")
    },
    t
  } (Bobcat.Component),
  Bobcat.Media = function(t) {
    function r(t) {
      this.hasNoContent = e(this.hasNoContent, this),
      this.showImage = e(this.showImage, this),
      this.showVideo = e(this.showVideo, this),
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this);
      var n, i = this;
      n = {
        video: {
          create: function(e) {
            return new Bobcat.Video(e.data, i)
          }
        },
        image: {
          create: function(e) {
            return new Bobcat.Image(e.data, {},
            i)
          }
        }
      },
      r.__super__.constructor.call(this, t, n)
    }
    return n(r, t),
    r.prototype.clickEditorHandler = function(e) {
      return r.__super__.clickEditorHandler.call(this, e),
      this.image.clickEditorHandler(e),
      this.video.clickEditorHandler(e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.hideEditorHandler(),
      this.image.hideEditorHandler(e),
      this.video.hideEditorHandler(e)
    },
    r.prototype.showVideo = function() {
      return this.current() === "video" && this.video.html() && this.video.html().length > 0
    },
    r.prototype.showImage = function() {
      return this.current() === "image"
    },
    r.prototype.hasNoContent = function() {
      return ! this.isState("editor") && (this.current() === "video" && (!this.video.html() || this.video.html().length === 0) || this.current() === "image" && this.image.url().length === 0)
    },
    r
  } (Bobcat.Component),
  Bobcat.EmailForm = function(t) {
    function r(t) {
      this.clickCancelEditorHandler = e(this.clickCancelEditorHandler, this),
      this.clickEditorHandler = e(this.clickEditorHandler, this),
      this.hasMessageBox = e(this.hasMessageBox, this),
      this.isEmailInvalid = e(this.isEmailInvalid, this),
      this.isNameEmpty = e(this.isNameEmpty, this),
      this.isSuccess = e(this.isSuccess, this),
      this.isError = e(this.isError, this),
      this.submit = e(this.submit, this),
      t.isLoading = !1,
      t.recipient || (t.recipient = ""),
      typeof t.hideMessageBox == "undefined" && (t.hideMessageBox = !1),
      t.name_label || (t.name_label = "Name", t.email_label = "Email", t.message_label = "Message"),
      r.__super__.constructor.call(this, t),
      this.status = ko.observable(""),
      this.invalidEmail = ko.observable(!1),
      this.invalidName = ko.observable(!1)
    }
    return n(r, t),
    r.include(Bobcat.UrlHelper),
    r.prototype.isRecipientEmailValid = function() {
      return this.recipient().length === 0 || this.isEmail(this.recipient())
    },
    r.prototype.reset = function() {
      return this.invalidEmail(!1),
      this.invalidName(!1),
      this.isLoading(!1)
    },
    r.prototype.submit = function(e) {
      var t = this;
      return this.reset(),
      this.isLoading(!0),
      e.closest("form").ajaxSubmit({
        success: function(e, n) {
          return console.log(e),
          t.status(e.status),
          t.isLoading(!1),
          _gaq.push(["_trackEvent", "Actions", "EmailCollected"])
        },
        error: function(e, n, r) {
          var i;
          return i = jQuery.parseJSON(e.responseText),
          console.log(i),
          t.status(i.status),
          i.message.invalid_email && t.invalidEmail(!0),
          i.message.invalid_name && t.invalidName(!0),
          t.isLoading(!1)
        }
      })
    },
    r.prototype.isError = function() {
      return this.status() === "error"
    },
    r.prototype.isSuccess = function() {
      return this.status() === "ok"
    },
    r.prototype.isNameEmpty = function() {
      return this.invalidName()
    },
    r.prototype.isEmailInvalid = function() {
      return this.invalidEmail()
    },
    r.prototype.hasMessageBox = function() {
      return ! this.hideMessageBox()
    },
    r.prototype.clickEditorHandler = function(e) {
      return r.__super__.clickEditorHandler.call(this, e)
    },
    r.prototype.clickCancelEditorHandler = function(e) {
      return this.hideEditorHandler()
    },
    r
  } (Bobcat.Component)
}.call(this),
function() {
  ko.bindingHandlers.enterKey = {
    init: function(e, t, n, r) {
      var i, s;
      return s = function(e) {
        if (e.which === 13) return t().call(this, e)
      },
      i = function() {
        return {
          keyup: s
        }
      },
      ko.bindingHandlers.event.init(e, i, n, r)
    }
  },
  ko.bindingHandlers.enterKeyPress = {
    init: function(e, t, n, r) {
      var i, s;
      return s = function(n) {
        return n.which === 13 ? t().call(this, n, e) : !0
      },
      i = function() {
        return {
          keypress: s
        }
      },
      ko.bindingHandlers.event.init(e, i, n, r)
    }
  },
  ko.bindingHandlers.className = {
    update: function(e, t) {
      var n;
      return e.__ko__previousClassValue__ && $(e).removeClass(e.__ko__previousClassValue__),
      n = ko.utils.unwrapObservable(t()),
      $(e).addClass(n),
      e.__ko__previousClassValue__ = n
    }
  },
  ko.bindingHandlers.htmlValue = {
    init: function(e, t, n) {
      return ko.utils.registerEventHandler(e, "blur",
      function() {
        var r, i, s;
        s = t(),
        i = e.innerHTML;
        if (ko.isWriteableObservable(s)) return s(i);
        r = n();
        if (r._ko_property_writers && r._ko_property_writers.htmlValue) return r._ko_property_writers.htmlValue(i)
      })
    },
    update: function(e, t) {
      var n;
      n = ko.utils.unwrapObservable(t());
      if (n === null || n === void 0) n = "";
      return e.tagName.toLowerCase() === "textarea" ? $(e).val(n) : e.innerHTML = n
    }
  },
  ko.bindingHandlers.mouseenter = {
    init: function(e, t, n, r) {
      return $(e).mouseenter(function(e) {
        return t()($(this), e)
      })
    },
    update: function(e, t) {}
  },
  ko.bindingHandlers.mouseleave = {
    init: function(e, t, n, r) {
      return $(e).mouseleave(function(e) {
        return t()($(this), e)
      })
    },
    update: function(e, t) {}
  },
  ko.bindingHandlers.mouseover = {
    init: function(e, t, n, r) {
      return $(e).mouseover(function(e) {
        return t()($(this), e)
      })
    },
    update: function(e, t) {}
  },
  ko.bindingHandlers.mouseout = {
    init: function(e, t, n, r) {
      return $(e).mouseout(function(e) {
        return t()($(this), e)
      })
    },
    update: function(e, t) {}
  },
  ko.bindingHandlers.mouseclick = {
    init: function(e, t, n, r) {
      return $(e).click(function(e) {
        return t()($(this), e)
      })
    },
    update: function(e, t) {}
  },
  ko.bindingHandlers.fadeVisible = {
    init: function(e, t) {
      return $(e).toggle(ko.utils.unwrapObservable(t()))
    },
    update: function(e, t) {
      return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) : $(e).stop().fadeTo(400, 0,
      function() {
        return $(e).css("visibility", "hidden")
      })
    }
  },
  ko.bindingHandlers.fadeVisibleAndHide = {
    init: function(e, t) {
      return $(e).toggle(ko.utils.unwrapObservable(t()))
    },
    update: function(e, t) {
      return ko.utils.unwrapObservable(t()) ? $(e).css("visibility", "visible").stop().fadeTo(600, 1) : $(e).stop().hide()
    }
  },
  ko.bindingHandlers.data = {
    update: function(e, t, n) {
      var r, i, s, o;
      s = ko.utils.unwrapObservable(t()) || {},
      o = [];
      for (r in s) i = s[r],
      i = ko.utils.unwrapObservable(i),
      r === "other" && i !== "bananas" && console.log(i),
      o.push($(e).data(r, i));
      return o
    }
  },
  ko.bindingHandlers.bind = {
    init: function(e, t) {
      var n, r, i;
      i = ko.utils.unwrapObservable(t()),
      n = ko.utils.unwrapObservable(i.data),
      r = ko.utils.unwrapObservable(i.html);
      if (r) return $(e).html(r),
      ko.applyBindings(n, e)
    },
    update: function(e, t) {
      var n, r, i;
      i = ko.utils.unwrapObservable(t()),
      n = ko.utils.unwrapObservable(i.data),
      r = ko.utils.unwrapObservable(i.html);
      if (r) return $(e).html(r),
      ko.applyBindings(n, e)
    }
  },
  ko.bindingHandlers.slideVisible = {
    init: function(e, t) {
      var n, r;
      return r = t(),
      n = allBindingsAccessor(),
      $(e).toggle(r),
      $(e).data("animating", !1)
    },
    update: function(e, t) {
      var n;
      return n = t(),
      n ? ($(e).data("animating", !0), $(e).stop().slideDown(600, "swing",
      function() {
        return $(this).data("animating", !1)
      })) : ($(e).data("animating", !0), $(e).slideUp(600, "swing",
      function() {
        return $(this).data("animating", !1)
      }))
    }
  },
  ko.bindingHandlers.slideVisibleAndMoveTo = {
    init: function(e, t) {
      var n;
      return n = t(),
      $(e).toggle(n),
      $(e).data("animating", !1)
    },
    update: function(e, t) {
      var n, r = this;
      return n = t(),
      n ? ($(e).data("animating", !0), $("html, body").stop().animate({
        scrollTop: $(e).parent().offset().top - 100
      },
      1200, "easeInOutQuart",
      function() {
        return $(e).slideDown(600, "swing",
        function() {
          return $(this).data("animating", !1)
        })
      })) : ($(e).data("animating", !0), $(e).slideUp(600, "swing",
      function() {
        return $(this).data("animating", !1)
      }))
    }
  },
  ko.bindingHandlers.bannerVisible = {
    init: function(e, t, n, r) {
      return r.isFirst() && r.select(),
      $(e).show().css({
        left: "0%"
      })
    },
    update: function(e, t, n, r) {
      var i, s, o, u;
      u = $(e),
      o = ko.utils.unwrapObservable(t()),
      i = r.parent.direction(),
      window.lol = r.parent;
      if (o) {
        if (r.animated) return;
        return console.log("show " + r.index() + " " + i),
        s = i > 0 ? "100%": "-100%",
        u.stop().css({
          left: s
        }).animate({
          left: "0%"
        }),
        r.animated = !0
      }
      if (r.animated === !1) return;
      return console.log("hide " + r.index() + " " + i),
      s = i > 0 ? "-100%": "100%",
      u.stop().css({
        left: "0%"
      }).animate({
        left: s
      }),
      r.animated = !1
    }
  },
  ko.bindingHandlers.slidyButtonSlide = {
    init: function(e, t) {},
    update: function(e, t) {
      var n, r, i;
      i = t();
      if (!i) {
        n = $(e).children(".icon"),
        r = $(e).children(".title");
        if (!$(e).data("mouseover")) return r.stop(!0),
        r.css("left", "0"),
        r.hide("slide", {
          direction: "left"
        },
        250),
        r.removeClass("hover"),
        n.removeClass("hover")
      }
    }
  },
  ko.bindingHandlers.slideVisibleWidth = {
    init: function(e, t) {
      var n;
      return n = t(),
      $(e).toggle(n)
    },
    update: function(e, t) {
      var n;
      return n = t(),
      n ? $(e).show("slide", {
        direction: "right"
      },
      600) : $(e).hide("slide", {
        direction: "right"
      },
      600)
    }
  },
  ko.bindingHandlers.dialogVisible = {
    update: function(e, t) {
      var n;
      n = !!ko.utils.unwrapObservable(t());
      if ($(e).hasClass("dialog")) return n ? $(e).dialog("open") : $(e).dialog("close")
    }
  },
  ko.bindingHandlers.theme = {
    init: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      $(e).addClass(n),
      $(e).data("theme", n)
    },
    update: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      $(e).removeClass($(e).data("theme")),
      $(e).addClass(n),
      $(e).data("theme", n)
    }
  },
  ko.bindingHandlers.currentDisabled = {
    init: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") : $(e).attr("disabled", "disabled")
    },
    update: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      n && n.style && n.style.fontFamily ? $(e).removeAttr("disabled") : $(e).attr("disabled", "disabled")
    }
  },
  ko.bindingHandlers.ensureVisible = {
    init: function(e, t) {},
    update: function(e, t) {
      var n, r, i, s, o, u;
      if (!ko.utils.unwrapObservable(t())) return;
      n = $(e),
      r = n.parent(),
      u = n.position().top,
      i = u + n.height(),
      o = r.scrollTop(),
      s = r.height();
      if (u < o || i > s) return r.scrollTo(n)
    }
  },
  ko.bindingHandlers.background = {
    init: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      $(e).attr("src", n)
    },
    update: function(e, t) {
      var n;
      return n = ko.utils.unwrapObservable(t()),
      $(e).attr("src", n)
    }
  },
  ko.bindingHandlers.computedStyles = {
    init: function(e, t) {}
  },
  ko.bindingHandlers.fontSelector = {
    init: function(e, t) {
      return $(e).fontSelector(),
      t().subscribe(function() {
        return $(".fontselector").remove(),
        $(e).fontSelector()
      })
    }
  },
  ko.bindingHandlers.tinymce = {
    init: function(e, t, n, r) {
      var i, s, o, u;
      return o = n().tinymceOptions || {},
      s = t(),
      u = ko.utils.unwrapObservable(t()),
      i = $(e),
      o.setup = function(e) {
        return e.onChange.add(function(e, t) {
          if (ko.isWriteableObservable(s)) return s(t.content)
        }),
        e.onInit.add(function(e, t) {
          var n, r;
          return r = e.dom,
          n = e.getDoc(),
          tinymce.dom.Event.add(n, "blur",
          function(t) {
            if (ko.isWriteableObservable(s)) return s(e.getContent({
              format: "raw"
            }))
          })
        })
      },
      ko.utils.domNodeDisposal.addDisposeCallback(e,
      function() {
        return $(e).parent().find("span.mceEditor,div.mceEditor").each(function(e, t) {
          var n;
          n = tinyMCE.get(t.id.replace(/_parent$/, ""));
          if (n) return n.remove()
        })
      }),
      setTimeout(function() {
        return $(e).tinymce(o)
      },
      0),
      i.val(u)
    },
    update: function(e, t, n, r) {
      var i, s, o, u;
      s = $(e),
      u = ko.utils.unwrapObservable(t()),
      o = s.attr("id");
      if (o !== void 0 && o !== "") {
        i = tinyMCE.getInstanceById(o).getContent({
          format: "raw"
        });
        if (i !== u) return s.val(u)
      }
    }
  }
}.call(this),
function() {
  var e;
  e = window.Bobcat || {},
  e.SocialMediaConfig = function() {
    function t(e) {
      this.settings = e
    }
    return t.prototype.get = function(e) {
      return this.settings[e]
    },
    t.prototype.getDefaultLinkList = function(t) {
      var n, r, i, s, o;
      n = [new e.Facebook({
        type: "Facebook",
        link_url: ""
      },
      t), new e.Twitter({
        type: "Twitter",
        link_url: ""
      },
      t), new e.Renren({
        type: "Renren",
        link_url: ""
      },
      t), new e.SinaWeibo({
        type: "SinaWeibo",
        link_url: ""
      },
      t), new e.GPlus({
        type: "GPlus",
        link_url: ""
      },
      t)],
      o = [];
      for (i = 0, s = n.length; i < s; i++) r = n[i],
      o.push(t.link_list.push(r));
      return o
    },
    t.prototype.getDefaultButtonList = function(t) {
      var n, r, i, s, o;
      n = [new e.Facebook({
        type: "Facebook",
        show_button: !0
      },
      t), new e.Twitter({
        type: "Twitter",
        show_button: !0
      },
      t), new e.Renren({
        type: "Renren",
        show_button: !1
      },
      t), new e.SinaWeibo({
        type: "SinaWeibo",
        show_button: !1
      },
      t), new e.GPlus({
        type: "GPlus",
        show_button: !0
      },
      t)],
      o = [];
      for (i = 0, s = n.length; i < s; i++) r = n[i],
      o.push(t.button_list.push(r));
      return o
    },
    t
  } ()
}.call(this);
