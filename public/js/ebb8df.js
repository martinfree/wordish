(function(window, undefined) {
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    var jQuery = (function() {
        var jQuery = function(selector, context) {
                return new jQuery.fn.init(selector, context, rootjQuery);
            },
            _jQuery = window.jQuery,
            _$ = window.$,
            rootjQuery, quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
            rnotwhite = /\S/,
            trimLeft = /^\s+/,
            trimRight = /\s+$/,
            rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
            rvalidchars = /^[\],:{}\s]*$/,
            rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
            rwebkit = /(webkit)[ \/]([\w.]+)/,
            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            rmsie = /(msie) ([\w.]+)/,
            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
            rdashAlpha = /-([a-z]|[0-9])/ig,
            rmsPrefix = /^-ms-/,
            fcamelCase = function(all, letter) {
                return (letter + "").toUpperCase();
            },
            userAgent = navigator.userAgent,
            browserMatch, readyList, DOMContentLoaded, toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf,
            class2type = {};
        jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            init: function(selector, context, rootjQuery) {
                var match, elem, ret, doc;
                if (!selector) {
                    return this;
                }
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = selector;
                    this.length = 1;
                    return this;
                }
                if (typeof selector === "string") {
                    if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                        match = [null, selector, null];
                    } else {
                        match = quickExpr.exec(selector);
                    }
                    if (match && (match[1] || !context)) {
                        if (match[1]) {
                            context = context instanceof jQuery ? context[0] : context;
                            doc = (context ? context.ownerDocument || context : document);
                            ret = rsingleTag.exec(selector);
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true);
                                } else {
                                    selector = [doc.createElement(ret[1])];
                                }
                            } else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment).childNodes;
                            }
                            return jQuery.merge(this, selector);
                        } else {
                            elem = document.getElementById(match[2]);
                            if (elem && elem.parentNode) {
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    } else if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector);
                    } else {
                        return this.constructor(context).find(selector);
                    }
                } else if (jQuery.isFunction(selector)) {
                    return rootjQuery.ready(selector);
                }
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return jQuery.makeArray(selector, this);
            },
            selector: "",
            jquery: "1.7.2",
            length: 0,
            size: function() {
                return this.length;
            },
            toArray: function() {
                return slice.call(this, 0);
            },
            get: function(num) {
                return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
            },
            pushStack: function(elems, name, selector) {
                var ret = this.constructor();
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems);
                } else {
                    jQuery.merge(ret, elems);
                }
                ret.prevObject = this;
                ret.context = this.context;
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                } else if (name) {
                    ret.selector = this.selector + "." + name + "(" + selector + ")";
                }
                return ret;
            },
            each: function(callback, args) {
                return jQuery.each(this, callback, args);
            },
            ready: function(fn) {
                jQuery.bindReady();
                readyList.add(fn);
                return this;
            },
            eq: function(i) {
                i = +i;
                return i === -1 ? this.slice(i) : this.slice(i, i + 1);
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            end: function() {
                return this.prevObject || this.constructor(null);
            },
            push: push,
            sort: [].sort,
            splice: [].splice
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        jQuery.extend({
            noConflict: function(deep) {
                if (window.$ === jQuery) {
                    window.$ = _$;
                }
                if (deep && window.jQuery === jQuery) {
                    window.jQuery = _jQuery;
                }
                return jQuery;
            },
            isReady: false,
            readyWait: 1,
            holdReady: function(hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            },
            ready: function(wait) {
                if ((wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady)) {
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1);
                    }
                    jQuery.isReady = true;
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    readyList.fireWith(document, [jQuery]);
                    if (jQuery.fn.trigger) {
                        jQuery(document).trigger("ready").off("ready");
                    }
                }
            },
            bindReady: function() {
                if (readyList) {
                    return;
                }
                readyList = jQuery.Callbacks("once memory");
                if (document.readyState === "complete") {
                    return setTimeout(jQuery.ready, 1);
                }
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    window.addEventListener("load", jQuery.ready, false);
                } else if (document.attachEvent) {
                    document.attachEvent("onreadystatechange", DOMContentLoaded);
                    window.attachEvent("onload", jQuery.ready);
                    var toplevel = false;
                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {}
                    if (document.documentElement.doScroll && toplevel) {
                        doScrollCheck();
                    }
                }
            },
            isFunction: function(obj) {
                return jQuery.type(obj) === "function";
            },
            isArray: Array.isArray || function(obj) {
                return jQuery.type(obj) === "array";
            },
            isWindow: function(obj) {
                return obj != null && obj == obj.window;
            },
            isNumeric: function(obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj);
            },
            type: function(obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
            },
            isPlainObject: function(obj) {
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                try {
                    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
                var key;
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key);
            },
            isEmptyObject: function(obj) {
                for (var name in obj) {
                    return false;
                }
                return true;
            },
            error: function(msg) {
                throw new Error(msg);
            },
            parseJSON: function(data) {
                if (typeof data !== "string" || !data) {
                    return null;
                }
                data = jQuery.trim(data);
                if (window.JSON && window.JSON.parse) {
                    return window.JSON.parse(data);
                }
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                    return (new Function("return " + data))();
                }
                jQuery.error("Invalid JSON: " + data);
            },
            parseXML: function(data) {
                if (typeof data !== "string" || !data) {
                    return null;
                }
                var xml, tmp;
                try {
                    if (window.DOMParser) {
                        tmp = new DOMParser();
                        xml = tmp.parseFromString(data, "text/xml");
                    } else {
                        xml = new ActiveXObject("Microsoft.XMLDOM");
                        xml.async = "false";
                        xml.loadXML(data);
                    }
                } catch (e) {
                    xml = undefined;
                }
                if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                    jQuery.error("Invalid XML: " + data);
                }
                return xml;
            },
            noop: function() {},
            globalEval: function(data) {
                if (data && rnotwhite.test(data)) {
                    (window.execScript || function(data) {
                        window["eval"].call(window, data);
                    })(data);
                }
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
            },
            each: function(object, callback, args) {
                var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || jQuery.isFunction(object);
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break;
                            }
                        }
                    }
                } else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break;
                            }
                        }
                    } else {
                        for (; i < length;) {
                            if (callback.call(object[i], i, object[i++]) === false) {
                                break;
                            }
                        }
                    }
                }
                return object;
            },
            trim: trim ? function(text) {
                return text == null ? "" : trim.call(text);
            } : function(text) {
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
            },
            makeArray: function(array, results) {
                var ret = results || [];
                if (array != null) {
                    var type = jQuery.type(array);
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array);
                    } else {
                        jQuery.merge(ret, array);
                    }
                }
                return ret;
            },
            inArray: function(elem, array, i) {
                var len;
                if (array) {
                    if (indexOf) {
                        return indexOf.call(array, elem, i);
                    }
                    len = array.length;
                    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                    for (; i < len; i++) {
                        if (i in array && array[i] === elem) {
                            return i;
                        }
                    }
                }
                return -1;
            },
            merge: function(first, second) {
                var i = first.length,
                    j = 0;
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j];
                    }
                } else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }
                first.length = i;
                return first;
            },
            grep: function(elems, callback, inv) {
                var ret = [],
                    retVal;
                inv = !!inv;
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }
                return ret;
            },
            map: function(elems, callback, arg) {
                var value, key, ret = [],
                    i = 0,
                    length = elems.length,
                    isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }
                } else {
                    for (key in elems) {
                        value = callback(elems[key], key, arg);
                        if (value != null) {
                            ret[ret.length] = value;
                        }
                    }
                }
                return ret.concat.apply([], ret);
            },
            guid: 1,
            proxy: function(fn, context) {
                if (typeof context === "string") {
                    var tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                var args = slice.call(arguments, 2),
                    proxy = function() {
                        return fn.apply(context, args.concat(slice.call(arguments)));
                    };
                proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                return proxy;
            },
            access: function(elems, fn, key, value, chainable, emptyGet, pass) {
                var exec, bulk = key == null,
                    i = 0,
                    length = elems.length;
                if (key && typeof key === "object") {
                    for (i in key) {
                        jQuery.access(elems, fn, i, key[i], 1, emptyGet, value);
                    }
                    chainable = 1;
                } else if (value !== undefined) {
                    exec = pass === undefined && jQuery.isFunction(value);
                    if (bulk) {
                        if (exec) {
                            exec = fn;
                            fn = function(elem, key, value) {
                                return exec.call(jQuery(elem), value);
                            };
                        } else {
                            fn.call(elems, value);
                            fn = null;
                        }
                    }
                    if (fn) {
                        for (; i < length; i++) {
                            fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                        }
                    }
                    chainable = 1;
                }
                return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
            },
            now: function() {
                return (new Date()).getTime();
            },
            uaMatch: function(ua) {
                ua = ua.toLowerCase();
                var match = rwebkit.exec(ua) || ropera.exec(ua) || rmsie.exec(ua) || ua.indexOf("compatible") < 0 && rmozilla.exec(ua) || [];
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            },
            sub: function() {
                function jQuerySub(selector, context) {
                    return new jQuerySub.fn.init(selector, context);
                }
                jQuery.extend(true, jQuerySub, this);
                jQuerySub.superclass = this;
                jQuerySub.fn = jQuerySub.prototype = this();
                jQuerySub.fn.constructor = jQuerySub;
                jQuerySub.sub = this.sub;
                jQuerySub.fn.init = function init(selector, context) {
                    if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                        context = jQuerySub(context);
                    }
                    return jQuery.fn.init.call(this, selector, context, rootjQuerySub);
                };
                jQuerySub.fn.init.prototype = jQuerySub.fn;
                var rootjQuerySub = jQuerySub(document);
                return jQuerySub;
            },
            browser: {}
        });
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version;
        }
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true;
        }
        if (rnotwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/;
        }
        rootjQuery = jQuery(document);
        if (document.addEventListener) {
            DOMContentLoaded = function() {
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            };
        } else if (document.attachEvent) {
            DOMContentLoaded = function() {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", DOMContentLoaded);
                    jQuery.ready();
                }
            };
        }

        function doScrollCheck() {
            if (jQuery.isReady) {
                return;
            }
            try {
                document.documentElement.doScroll("left");
            } catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            jQuery.ready();
        }
        return jQuery;
    })();
    var flagsCache = {};

    function createFlags(flags) {
        var object = flagsCache[flags] = {},
            i, length;
        flags = flags.split(/\s+/);
        for (i = 0, length = flags.length; i < length; i++) {
            object[flags[i]] = true;
        }
        return object;
    }
    jQuery.Callbacks = function(flags) {
        flags = flags ? (flagsCache[flags] || createFlags(flags)) : {};
        var
            list = [],
            stack = [],
            memory, fired, firing, firingStart, firingLength, firingIndex, add = function(args) {
                var i, length, elem, type, actual;
                for (i = 0, length = args.length; i < length; i++) {
                    elem = args[i];
                    type = jQuery.type(elem);
                    if (type === "array") {
                        add(elem);
                    } else if (type === "function") {
                        if (!flags.unique || !self.has(elem)) {
                            list.push(elem);
                        }
                    }
                }
            },
            fire = function(context, args) {
                args = args || [];
                memory = !flags.memory || [context, args];
                fired = true;
                firing = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(context, args) === false && flags.stopOnFalse) {
                        memory = true;
                        break;
                    }
                }
                firing = false;
                if (list) {
                    if (!flags.once) {
                        if (stack && stack.length) {
                            memory = stack.shift();
                            self.fireWith(memory[0], memory[1]);
                        }
                    } else if (memory === true) {
                        self.disable();
                    } else {
                        list = [];
                    }
                }
            },
            self = {
                add: function() {
                    if (list) {
                        var length = list.length;
                        add(arguments);
                        if (firing) {
                            firingLength = list.length;
                        } else if (memory && memory !== true) {
                            firingStart = length;
                            fire(memory[0], memory[1]);
                        }
                    }
                    return this;
                },
                remove: function() {
                    if (list) {
                        var args = arguments,
                            argIndex = 0,
                            argLength = args.length;
                        for (; argIndex < argLength; argIndex++) {
                            for (var i = 0; i < list.length; i++) {
                                if (args[argIndex] === list[i]) {
                                    if (firing) {
                                        if (i <= firingLength) {
                                            firingLength--;
                                            if (i <= firingIndex) {
                                                firingIndex--;
                                            }
                                        }
                                    }
                                    list.splice(i--, 1);
                                    if (flags.unique) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return this;
                },
                has: function(fn) {
                    if (list) {
                        var i = 0,
                            length = list.length;
                        for (; i < length; i++) {
                            if (fn === list[i]) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                empty: function() {
                    list = [];
                    return this;
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    stack = undefined;
                    if (!memory || memory === true) {
                        self.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !stack;
                },
                fireWith: function(context, args) {
                    if (stack) {
                        if (firing) {
                            if (!flags.once) {
                                stack.push([context, args]);
                            }
                        } else if (!(flags.once && memory)) {
                            fire(context, args);
                        }
                    }
                    return this;
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!fired;
                }
            };
        return self;
    };
    var
        sliceDeferred = [].slice;
    jQuery.extend({
        Deferred: function(func) {
            var doneList = jQuery.Callbacks("once memory"),
                failList = jQuery.Callbacks("once memory"),
                progressList = jQuery.Callbacks("memory"),
                state = "pending",
                lists = {
                    resolve: doneList,
                    reject: failList,
                    notify: progressList
                },
                promise = {
                    done: doneList.add,
                    fail: failList.add,
                    progress: progressList.add,
                    state: function() {
                        return state;
                    },
                    isResolved: doneList.fired,
                    isRejected: failList.fired,
                    then: function(doneCallbacks, failCallbacks, progressCallbacks) {
                        deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);
                        return this;
                    },
                    always: function() {
                        deferred.done.apply(deferred, arguments).fail.apply(deferred, arguments);
                        return this;
                    },
                    pipe: function(fnDone, fnFail, fnProgress) {
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each({
                                done: [fnDone, "resolve"],
                                fail: [fnFail, "reject"],
                                progress: [fnProgress, "notify"]
                            }, function(handler, data) {
                                var fn = data[0],
                                    action = data[1],
                                    returned;
                                if (jQuery.isFunction(fn)) {
                                    deferred[handler](function() {
                                        returned = fn.apply(this, arguments);
                                        if (returned && jQuery.isFunction(returned.promise)) {
                                            returned.promise().then(newDefer.resolve, newDefer.reject, newDefer.notify);
                                        } else {
                                            newDefer[action + "With"](this === deferred ? newDefer : this, [returned]);
                                        }
                                    });
                                } else {
                                    deferred[handler](newDefer[action]);
                                }
                            });
                        }).promise();
                    },
                    promise: function(obj) {
                        if (obj == null) {
                            obj = promise;
                        } else {
                            for (var key in promise) {
                                obj[key] = promise[key];
                            }
                        }
                        return obj;
                    }
                },
                deferred = promise.promise({}),
                key;
            for (key in lists) {
                deferred[key] = lists[key].fire;
                deferred[key + "With"] = lists[key].fireWith;
            }
            deferred.done(function() {
                state = "resolved";
            }, failList.disable, progressList.lock).fail(function() {
                state = "rejected";
            }, doneList.disable, progressList.lock);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function(firstParam) {
            var args = sliceDeferred.call(arguments, 0),
                i = 0,
                length = args.length,
                pValues = new Array(length),
                count = length,
                pCount = length,
                deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ? firstParam : jQuery.Deferred(),
                promise = deferred.promise();

            function resolveFunc(i) {
                return function(value) {
                    args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                    if (!(--count)) {
                        deferred.resolveWith(deferred, args);
                    }
                };
            }

            function progressFunc(i) {
                return function(value) {
                    pValues[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                    deferred.notifyWith(promise, pValues);
                };
            }
            if (length > 1) {
                for (; i < length; i++) {
                    if (args[i] && args[i].promise && jQuery.isFunction(args[i].promise)) {
                        args[i].promise().then(resolveFunc(i), deferred.reject, progressFunc(i));
                    } else {
                        --count;
                    }
                }
                if (!count) {
                    deferred.resolveWith(deferred, args);
                }
            } else if (deferred !== firstParam) {
                deferred.resolveWith(deferred, length ? [firstParam] : []);
            }
            return promise;
        }
    });
    jQuery.support = (function() {
        var support, all, a, select, opt, input, fragment, tds, events, eventName, i, isSupported, div = document.createElement("div"),
            documentElement = document.documentElement;
        div.setAttribute("className", "t");
        div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        if (!all || !all.length || !a) {
            return {};
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.55/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            pixelMargin: true
        };
        jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false;
            });
            div.cloneNode(true).fireEvent("onclick");
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function");
                }
                support[i + "Bubbles"] = isSupported;
            }
        }
        fragment.removeChild(div);
        fragment = select = opt = div = input = null;
        jQuery(function() {
            var container, outer, inner, table, td, offsetSupport, marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight, paddingMarginBorderVisibility, paddingMarginBorder, body = document.getElementsByTagName("body")[0];
            if (!body) {
                return;
            }
            conMarginTop = 1;
            paddingMarginBorder = "padding:0;margin:0;border:";
            positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
            paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
            style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
            html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" + "<table " + style + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>";
            container = document.createElement("div");
            container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            if (window.getComputedStyle) {
                div.innerHTML = "";
                marginDiv = document.createElement("div");
                marginDiv.style.width = "0";
                marginDiv.style.marginRight = "0";
                div.style.width = "2px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = (parseInt((window.getComputedStyle(marginDiv, null) || {
                    marginRight: 0
                }).marginRight, 10) || 0) === 0;
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.width = div.style.padding = "1px";
                div.style.border = 0;
                div.style.overflow = "hidden";
                div.style.display = "inline";
                div.style.zoom = 1;
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div style='width:5px;'></div>";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
            }
            div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
            div.innerHTML = html;
            outer = div.firstChild;
            inner = outer.firstChild;
            td = outer.nextSibling.firstChild.firstChild;
            offsetSupport = {
                doesNotAddBorder: (inner.offsetTop !== 5),
                doesAddBorderForTableAndCells: (td.offsetTop === 5)
            };
            inner.style.position = "fixed";
            inner.style.top = "20px";
            offsetSupport.fixedPosition = (inner.offsetTop === 20 || inner.offsetTop === 15);
            inner.style.position = inner.style.top = "";
            outer.style.overflow = "hidden";
            outer.style.position = "relative";
            offsetSupport.subtractsBorderForOverflowNotVisible = (inner.offsetTop === -5);
            offsetSupport.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== conMarginTop);
            if (window.getComputedStyle) {
                div.style.marginTop = "1%";
                support.pixelMargin = (window.getComputedStyle(div, null) || {
                    marginTop: 0
                }).marginTop !== "1%";
            }
            if (typeof container.style.zoom !== "undefined") {
                container.style.zoom = 1;
            }
            body.removeChild(container);
            marginDiv = div = container = null;
            jQuery.extend(support, offsetSupport);
        });
        return support;
    })();
    var rbrace = /^(?:\{.*\}|\[.*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var privateCache, thisCache, ret, internalKey = jQuery.expando,
                getByName = typeof name === "string",
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : elem[internalKey] && internalKey,
                isEvents = name === "events";
            if ((!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined) {
                return;
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = ++jQuery.uuid;
                } else {
                    id = internalKey;
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop;
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name);
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name);
                }
            }
            privateCache = thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {};
                }
                thisCache = thisCache.data;
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data;
            }
            if (isEvents && !thisCache[name]) {
                return privateCache.events;
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)];
                }
            } else {
                ret = thisCache;
            }
            return ret;
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return;
            }
            var thisCache, i, l, internalKey = jQuery.expando,
                isNode = elem.nodeType,
                cache = isNode ? jQuery.cache : elem,
                id = isNode ? elem[internalKey] : internalKey;
            if (!cache[id]) {
                return;
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name];
                            } else {
                                name = name.split(" ");
                            }
                        }
                    }
                    for (i = 0, l = name.length; i < l; i++) {
                        delete thisCache[name[i]];
                    }
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                        return;
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return;
                }
            }
            if (jQuery.support.deleteExpando || !cache.setInterval) {
                delete cache[id];
            } else {
                cache[id] = null;
            }
            if (isNode) {
                if (jQuery.support.deleteExpando) {
                    delete elem[internalKey];
                } else if (elem.removeAttribute) {
                    elem.removeAttribute(internalKey);
                } else {
                    elem[internalKey] = null;
                }
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true);
        },
        acceptData: function(elem) {
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match);
                }
            }
            return true;
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0],
                i = 0,
                data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (name.indexOf("data-") === 0) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name]);
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this, function(value) {
                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [parts[0]]);
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data);
                    }
                    return data === undefined && parts[1] ? this.data(parts[0]) : data;
                }
                parts[1] = value;
                this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts);
                });
            }, null, value, arguments.length > 1, null, false);
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : jQuery.isNumeric(data) ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else {
                data = undefined;
            }
        }
        return data;
    }

    function isEmptyDataObject(obj) {
        for (var name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }
        return true;
    }

    function handleQueueMarkDefer(elem, type, src) {
        var deferDataKey = type + "defer",
            queueDataKey = type + "queue",
            markDataKey = type + "mark",
            defer = jQuery._data(elem, deferDataKey);
        if (defer && (src === "queue" || !jQuery._data(elem, queueDataKey)) && (src === "mark" || !jQuery._data(elem, markDataKey))) {
            setTimeout(function() {
                if (!jQuery._data(elem, queueDataKey) && !jQuery._data(elem, markDataKey)) {
                    jQuery.removeData(elem, deferDataKey, true);
                    defer.fire();
                }
            }, 0);
        }
    }
    jQuery.extend({
        _mark: function(elem, type) {
            if (elem) {
                type = (type || "fx") + "mark";
                jQuery._data(elem, type, (jQuery._data(elem, type) || 0) + 1);
            }
        },
        _unmark: function(force, elem, type) {
            if (force !== true) {
                type = elem;
                elem = force;
                force = false;
            }
            if (elem) {
                type = type || "fx";
                var key = type + "mark",
                    count = force ? 0 : ((jQuery._data(elem, key) || 1) - 1);
                if (count) {
                    jQuery._data(elem, key, count);
                } else {
                    jQuery.removeData(elem, key, true);
                    handleQueueMarkDefer(elem, type, "mark");
                }
            }
        },
        queue: function(elem, type, data) {
            var q;
            if (elem) {
                type = (type || "fx") + "queue";
                q = jQuery._data(elem, type);
                if (data) {
                    if (!q || jQuery.isArray(data)) {
                        q = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        q.push(data);
                    }
                }
                return q || [];
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                fn = queue.shift(),
                hooks = {};
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                jQuery._data(elem, type + ".run", hooks);
                fn.call(elem, function() {
                    jQuery.dequeue(elem, type);
                }, hooks);
            }
            if (!queue.length) {
                jQuery.removeData(elem, type + "queue " + type + ".run", true);
                handleQueueMarkDefer(elem, type, "queue");
            }
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, object) {
            if (typeof type !== "string") {
                object = type;
                type = undefined;
            }
            type = type || "fx";
            var defer = jQuery.Deferred(),
                elements = this,
                i = elements.length,
                count = 1,
                deferDataKey = type + "defer",
                queueDataKey = type + "queue",
                markDataKey = type + "mark",
                tmp;

            function resolve() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements]);
                }
            }
            while (i--) {
                if ((tmp = jQuery.data(elements[i], deferDataKey, undefined, true) || (jQuery.data(elements[i], queueDataKey, undefined, true) || jQuery.data(elements[i], markDataKey, undefined, true)) && jQuery.data(elements[i], deferDataKey, jQuery.Callbacks("once memory"), true))) {
                    count++;
                    tmp.add(resolve);
                }
            }
            resolve();
            return defer.promise(object);
        }
    });
    var rclass = /[\n\t\r]/g,
        rspace = /\s+/,
        rreturn = /\r/g,
        rtype = /^(?:button|input)$/i,
        rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea)?$/i,
        rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        getSetAttribute = jQuery.support.getSetAttribute,
        nodeHook, boolHook, fixSpecified;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className));
                });
            }
            if (value && typeof value === "string") {
                classNames = value.split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value;
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                if (!~setClass.indexOf(" " + classNames[c] + " ")) {
                                    setClass += classNames[c] + " ";
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(value) {
            var classNames, i, l, elem, className, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className));
                });
            }
            if ((value && typeof value === "string") || value === undefined) {
                classNames = (value || "").split(rspace);
                for (i = 0, l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            className = (" " + elem.className + " ").replace(rclass, " ");
                            for (c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = jQuery.trim(className);
                        } else {
                            elem.className = "";
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value,
                isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
                });
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        state = stateVal,
                        classNames = value.split(rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className);
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
                }
            });
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                }
                return;
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var self = jQuery(this),
                    val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction) {
                    val = value.call(this, i, self.val());
                } else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    var value, i, max, option, index = elem.selectedIndex,
                        values = [],
                        options = elem.options,
                        one = elem.type === "select-one";
                    if (index < 0) {
                        return null;
                    }
                    i = one ? index : 0;
                    max = one ? index + 1 : options.length;
                    for (; i < max; i++) {
                        option = options[i];
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    if (one && !values.length && options.length) {
                        return jQuery(options[index]).val();
                    }
                    return values;
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        },
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                } else if (hooks && "set" in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    elem.setAttribute(name, "" + value);
                    return value;
                }
            } else if (hooks && "get" in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            } else {
                ret = elem.getAttribute(name);
                return ret === null ? undefined : ret;
            }
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, l, isBool, i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.toLowerCase().split(rspace);
                l = attrNames.length;
                for (; i < l; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "");
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false;
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name);
                    }
                    return name in elem ? elem.value : null;
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name);
                    }
                    elem.value = value;
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
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                } else {
                    return (elem[name] = value);
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                } else {
                    return elem[name];
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
            }
        }
    });
    jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;
    boolHook = {
        get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined;
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name);
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true;
                }
                elem.setAttribute(name, name.toLowerCase());
            }
            return name;
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.nodeValue !== "" : ret.specified) ? ret.nodeValue : undefined;
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret);
                }
                return (ret.nodeValue = value + "");
            }
        };
        jQuery.attrHooks.tabindex.set = nodeHook.set;
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            });
        });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false";
                }
                nodeHook.set(elem, value, name);
            }
        };
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret;
                }
            });
        });
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined;
            },
            set: function(elem, value) {
                return (elem.style.cssText = "" + value);
            }
        };
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        });
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                }
            };
        });
    }
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0);
                }
            }
        });
    });
    var rformElems = /^(?:textarea|input|select)$/i,
        rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
        rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        quickParse = function(selector) {
            var quick = rquickIs.exec(selector);
            if (quick) {
                quick[1] = (quick[1] || "").toLowerCase();
                quick[3] = quick[3] && new RegExp("(?:^|\\s)" + quick[3] + "(?:\\s|$)");
            }
            return quick;
        },
        quickIs = function(elem, m) {
            var attrs = elem.attributes || {};
            return ((!m[1] || elem.nodeName.toLowerCase() === m[1]) && (!m[2] || (attrs.id || {}).value === m[2]) && (!m[3] || m[3].test((attrs["class"] || {}).value)));
        },
        hoverHack = function(events) {
            return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1");
        };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, quick, handlers, special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {};
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
                };
                eventHandle.elem = elem;
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    quick: selector && quickParse(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
            elem = null;
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var elemData = jQuery.hasData(elem) && jQuery._data(elem),
                t, tns, type, origType, namespaces, origCount, j, events, special, handle, eventType, handleObj;
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                handle = elemData.handle;
                if (handle) {
                    handle.elem = null;
                }
                jQuery.removeData(elem, ["events", "handle"], true);
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return;
            }
            var type = event.type || event,
                namespaces = [],
                cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true;
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return;
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type, event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true);
                    }
                }
                return;
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            eventPath = [
                [elem, special.bindType || type]
            ];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                old = null;
                for (; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur;
                }
                if (old && old === elem.ownerDocument) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType]);
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply(cur, data) === false) {
                    event.preventDefault();
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old;
                        }
                    }
                }
            }
            return event.result;
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var handlers = ((jQuery._data(this, "events") || {})[event.type] || []),
                delegateCount = handlers.delegateCount,
                args = [].slice.call(arguments, 0),
                run_all = !event.exclusive && !event.namespace,
                special = jQuery.event.special[event.type] || {},
                handlerQueue = [],
                i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                jqcur = jQuery(this);
                jqcur.context = this.ownerDocument || this;
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true) {
                        selMatch = {};
                        matches = [];
                        jqcur[0] = cur;
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = (handleObj.quick ? quickIs(cur, handleObj.quick) : jqcur.is(sel));
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            });
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                });
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }
                return event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }
                return event;
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }
            var i, prop, originalEvent = event,
                fixHook = jQuery.event.fixHooks[event.type] || {},
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i;) {
                prop = copy[--i];
                event[prop] = originalEvent[prop];
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            if (event.metaKey === undefined) {
                event.metaKey = event.ctrlKey;
            }
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        special: {
            ready: {
                setup: jQuery.bindReady
            },
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem);
            } else {
                jQuery.event.dispatch.call(elem, e);
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    } : function(elem, type, handle) {
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle);
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse;
        } else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true;
    };

    function returnFalse() {
        return false;
    }

    function returnTrue() {
        return true;
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj,
                    selector = handleObj.selector,
                    ret;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !form._submit_attached) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true;
                        });
                        form._submit_attached = true;
                    }
                });
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true);
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }
                jQuery.event.remove(this, "._submit");
            }
        };
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false;
                                jQuery.event.simulate("change", this, event, true);
                            }
                        });
                    }
                    return false;
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !elem._change_attached) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true);
                            }
                        });
                        elem._change_attached = true;
                    }
                });
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments);
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return rformElems.test(this.nodeName);
            }
        };
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0,
                handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
                };
            jQuery.event.special[fix] = {
                setup: function() {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function() {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };
        });
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one);
                }
                return this;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return this;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            if (types && types.preventDefault && types.handleObj) {
                var handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (var type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this;
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this;
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return arguments.length == 1 ? this.off(selector, "**") : this.off(types, selector, fn);
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true);
            }
        },
        toggle: function(fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function(event) {
                    var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                    jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false;
                };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid;
            }
            return this.click(toggler);
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            if (fn == null) {
                fn = data;
                data = null;
            }
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true;
        }
        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.keyHooks;
        }
        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.mouseHooks;
        }
    });
    (function() {
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            expando = "sizcache" + (Math.random() + '').replace('.', ''),
            done = 0,
            toString = Object.prototype.toString,
            hasDuplicate = false,
            baseHasDuplicate = true,
            rBackslash = /\\/g,
            rReturn = /\r\n/g,
            rNonWord = /\W/;
        [0, 0].sort(function() {
            baseHasDuplicate = false;
            return 0;
        });
        var Sizzle = function(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var origContext = context;
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            if (!selector || typeof selector !== "string") {
                return results;
            }
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
                contextXML = Sizzle.isXML(context),
                parts = [],
                soFar = selector;
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                if (m) {
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            } while (m);
            if (parts.length > 1 && origPOS.exec(selector)) {
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context, seed);
                } else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    while (parts.length) {
                        selector = parts.shift();
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        set = posProcess(selector, set, seed);
                    }
                }
            } else {
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                    } else {
                        prune = false;
                    }
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        if (!Expr.relative[cur]) {
                            cur = "";
                        } else {
                            pop = parts.pop();
                        }
                        if (pop == null) {
                            pop = context;
                        }
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                } else {
                    checkSet = parts = [];
                }
            }
            if (!checkSet) {
                checkSet = set;
            }
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                } else if (context && context.nodeType === 1) {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                            results.push(set[i]);
                        }
                    }
                } else {
                    for (i = 0; checkSet[i] != null; i++) {
                        if (checkSet[i] && checkSet[i].nodeType === 1) {
                            results.push(set[i]);
                        }
                    }
                }
            } else {
                makeArray(checkSet, results);
            }
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            return results;
        };
        Sizzle.uniqueSort = function(results) {
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            return results;
        };
        Sizzle.matches = function(expr, set) {
            return Sizzle(expr, null, null, set);
        };
        Sizzle.matchesSelector = function(node, expr) {
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        Sizzle.find = function(expr, context, isXML) {
            var set, i, len, match, type, left;
            if (!expr) {
                return [];
            }
            for (i = 0, len = Expr.order.length; i < len; i++) {
                type = Expr.order[i];
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    left = match[1];
                    match.splice(1, 1);
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(rBackslash, "");
                        set = Expr.find[type](match, context, isXML);
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            if (!set) {
                set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
            }
            return {
                set: set,
                expr: expr
            };
        };
        Sizzle.filter = function(expr, set, inplace, not) {
            var match, anyFound, type, found, item, filter, left, i, pass, old = expr,
                result = [],
                curLoop = set,
                isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            while (expr && set.length) {
                for (type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        filter = Expr.filter[type];
                        left = match[1];
                        anyFound = false;
                        match.splice(1, 1);
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        if (curLoop === result) {
                            result = [];
                        }
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            if (!match) {
                                anyFound = found = true;
                            } else if (match === true) {
                                continue;
                            }
                        }
                        if (match) {
                            for (i = 0;
                                (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    pass = not ^ found;
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                        } else {
                                            curLoop[i] = false;
                                        }
                                    } else if (pass) {
                                        result.push(item);
                                        anyFound = true;
                                    }
                                }
                            }
                        }
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            expr = expr.replace(Expr.match[type], "");
                            if (!anyFound) {
                                return [];
                            }
                            break;
                        }
                    }
                }
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                    } else {
                        break;
                    }
                }
                old = expr;
            }
            return curLoop;
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        var getText = Sizzle.getText = function(elem) {
            var i, node, nodeType = elem.nodeType,
                ret = "";
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === 'string') {
                        return elem.textContent;
                    } else if (typeof elem.innerText === 'string') {
                        return elem.innerText.replace(rReturn, '');
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
            } else {
                for (i = 0;
                    (node = elem[i]); i++) {
                    if (node.nodeType !== 8) {
                        ret += getText(node);
                    }
                }
            }
            return ret;
        };
        var Expr = Sizzle.selectors = {
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
                href: function(elem) {
                    return elem.getAttribute("href");
                },
                type: function(elem) {
                    return elem.getAttribute("type");
                }
            },
            relative: {
                "+": function(checkSet, part) {
                    var isPartStr = typeof part === "string",
                        isTag = isPartStr && !rNonWord.test(part),
                        isPartStrNotTag = isPartStr && !isTag;
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                },
                ">": function(checkSet, part) {
                    var elem, isPartStr = typeof part === "string",
                        i = 0,
                        l = checkSet.length;
                    if (isPartStr && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                    } else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                },
                "": function(checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                },
                "~": function(checkSet, part, isXML) {
                    var nodeCheck, doneName = done++,
                        checkFn = dirCheck;
                    if (typeof part === "string" && !rNonWord.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            find: {
                ID: function(match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m && m.parentNode ? [m] : [];
                    }
                },
                NAME: function(match, context) {
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [],
                            results = context.getElementsByName(match[1]);
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        return ret.length === 0 ? null : ret;
                    }
                },
                TAG: function(match, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(match[1]);
                    }
                }
            },
            preFilter: {
                CLASS: function(match, curLoop, inplace, result, not, isXML) {
                    match = " " + match[1].replace(rBackslash, "") + " ";
                    if (isXML) {
                        return match;
                    }
                    for (var i = 0, elem;
                        (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                            } else if (inplace) {
                                curLoop[i] = false;
                            }
                        }
                    }
                    return false;
                },
                ID: function(match) {
                    return match[1].replace(rBackslash, "");
                },
                TAG: function(match, curLoop) {
                    return match[1].replace(rBackslash, "").toLowerCase();
                },
                CHILD: function(match) {
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0]);
                        }
                        match[2] = match[2].replace(/^\+|\s*/g, '');
                        var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    } else if (match[2]) {
                        Sizzle.error(match[0]);
                    }
                    match[0] = done++;
                    return match;
                },
                ATTR: function(match, curLoop, inplace, result, not, isXML) {
                    var name = match[1] = match[1].replace(rBackslash, "");
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    match[4] = (match[4] || match[5] || "").replace(rBackslash, "");
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    return match;
                },
                PSEUDO: function(match, curLoop, inplace, result, not) {
                    if (match[1] === "not") {
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                        } else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            return false;
                        }
                    } else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                        return true;
                    }
                    return match;
                },
                POS: function(match) {
                    match.unshift(true);
                    return match;
                }
            },
            filters: {
                enabled: function(elem) {
                    return elem.disabled === false && elem.type !== "hidden";
                },
                disabled: function(elem) {
                    return elem.disabled === true;
                },
                checked: function(elem) {
                    return elem.checked === true;
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                parent: function(elem) {
                    return !!elem.firstChild;
                },
                empty: function(elem) {
                    return !elem.firstChild;
                },
                has: function(elem, i, match) {
                    return !!Sizzle(match[3], elem).length;
                },
                header: function(elem) {
                    return (/h\d/i).test(elem.nodeName);
                },
                text: function(elem) {
                    var attr = elem.getAttribute("type"),
                        type = elem.type;
                    return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null);
                },
                radio: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
                },
                checkbox: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
                },
                file: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
                },
                password: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
                },
                submit: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "submit" === elem.type;
                },
                image: function(elem) {
                    return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
                },
                reset: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && "reset" === elem.type;
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && "button" === elem.type || name === "button";
                },
                input: function(elem) {
                    return (/input|select|textarea|button/i).test(elem.nodeName);
                },
                focus: function(elem) {
                    return elem === elem.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function(elem, i) {
                    return i === 0;
                },
                last: function(elem, i, match, array) {
                    return i === array.length - 1;
                },
                even: function(elem, i) {
                    return i % 2 === 0;
                },
                odd: function(elem, i) {
                    return i % 2 === 1;
                },
                lt: function(elem, i, match) {
                    return i < match[3] - 0;
                },
                gt: function(elem, i, match) {
                    return i > match[3] - 0;
                },
                nth: function(elem, i, match) {
                    return match[3] - 0 === i;
                },
                eq: function(elem, i, match) {
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function(elem, match, i, array) {
                    var name = match[1],
                        filter = Expr.filters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    } else if (name === "contains") {
                        return (elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0;
                    } else if (name === "not") {
                        var not = match[3];
                        for (var j = 0, l = not.length; j < l; j++) {
                            if (not[j] === elem) {
                                return false;
                            }
                        }
                        return true;
                    } else {
                        Sizzle.error(name);
                    }
                },
                CHILD: function(elem, match) {
                    var first, last, doneName, parent, cache, count, diff, type = match[1],
                        node = elem;
                    switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            if (type === "first") {
                                return true;
                            }
                            node = elem;
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            return true;
                        case "nth":
                            first = match[2];
                            last = match[3];
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            doneName = match[0];
                            parent = elem.parentNode;
                            if (parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
                                count = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }
                                parent[expando] = doneName;
                            }
                            diff = elem.nodeIndex - last;
                            if (first === 0) {
                                return diff === 0;
                            } else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                },
                ID: function(elem, match) {
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                },
                TAG: function(elem, match) {
                    return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
                },
                CLASS: function(elem, match) {
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
                },
                ATTR: function(elem, match) {
                    var name = match[1],
                        result = Sizzle.attr ? Sizzle.attr(elem, name) : Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
                        value = result + "",
                        type = match[2],
                        check = match[4];
                    return result == null ? type === "!=" : !type && Sizzle.attr ? result != null : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                },
                POS: function(elem, match, i, array) {
                    var name = match[2],
                        filter = Expr.setFilters[name];
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        var origPOS = Expr.match.POS,
            fescape = function(all, num) {
                return "\\" + (num - 0 + 1);
            };
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        Expr.match.globalPOS = origPOS;
        var makeArray = function(array, results) {
            array = Array.prototype.slice.call(array, 0);
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            return array;
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function(array, results) {
                var i = 0,
                    ret = results || [];
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                } else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                    } else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                return ret;
            };
        }
        var sortOrder, siblingCheck;
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
        } else {
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                } else if (a.sourceIndex && b.sourceIndex) {
                    return a.sourceIndex - b.sourceIndex;
                }
                var al, bl, ap = [],
                    bp = [],
                    aup = a.parentNode,
                    bup = b.parentNode,
                    cur = aup;
                if (aup === bup) {
                    return siblingCheck(a, b);
                } else if (!aup) {
                    return -1;
                } else if (!bup) {
                    return 1;
                }
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                cur = bup;
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                al = ap.length;
                bl = bp.length;
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            siblingCheck = function(a, b, ret) {
                if (a === b) {
                    return ret;
                }
                var cur = a.nextSibling;
                while (cur) {
                    if (cur === b) {
                        return -1;
                    }
                    cur = cur.nextSibling;
                }
                return 1;
            };
        }
        (function() {
            var form = document.createElement("div"),
                id = "script" + (new Date()).getTime(),
                root = document.documentElement;
            form.innerHTML = "<a name='" + id + "'/>";
            root.insertBefore(form, root.firstChild);
            if (document.getElementById(id)) {
                Expr.find.ID = function(match, context, isXML) {
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                Expr.filter.ID = function(elem, match) {
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            root.removeChild(form);
            root = form = null;
        })();
        (function() {
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function(match, context) {
                    var results = context.getElementsByTagName(match[1]);
                    if (match[1] === "*") {
                        var tmp = [];
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        results = tmp;
                    }
                    return results;
                };
            }
            div.innerHTML = "<a href='#'></a>";
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {
                Expr.attrHandle.href = function(elem) {
                    return elem.getAttribute("href", 2);
                };
            }
            div = null;
        })();
        if (document.querySelectorAll) {
            (function() {
                var oldSizzle = Sizzle,
                    div = document.createElement("div"),
                    id = "__sizzle__";
                div.innerHTML = "<p class='TEST'></p>";
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                Sizzle = function(query, context, extra, seed) {
                    context = context || document;
                    if (!seed && !Sizzle.isXML(context)) {
                        var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);
                        if (match && (context.nodeType === 1 || context.nodeType === 9)) {
                            if (match[1]) {
                                return makeArray(context.getElementsByTagName(query), extra);
                            } else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
                                return makeArray(context.getElementsByClassName(match[2]), extra);
                            }
                        }
                        if (context.nodeType === 9) {
                            if (query === "body" && context.body) {
                                return makeArray([context.body], extra);
                            } else if (match && match[3]) {
                                var elem = context.getElementById(match[3]);
                                if (elem && elem.parentNode) {
                                    if (elem.id === match[3]) {
                                        return makeArray([elem], extra);
                                    }
                                } else {
                                    return makeArray([], extra);
                                }
                            }
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } catch (qsaError) {}
                        } else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            var oldContext = context,
                                old = context.getAttribute("id"),
                                nid = old || id,
                                hasParent = context.parentNode,
                                relativeHierarchySelector = /^\s*[+~]/.test(query);
                            if (!old) {
                                context.setAttribute("id", nid);
                            } else {
                                nid = nid.replace(/'/g, "\\$&");
                            }
                            if (relativeHierarchySelector && hasParent) {
                                context = context.parentNode;
                            }
                            try {
                                if (!relativeHierarchySelector || hasParent) {
                                    return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
                                }
                            } catch (pseudoError) {} finally {
                                if (!old) {
                                    oldContext.removeAttribute("id");
                                }
                            }
                        }
                    }
                    return oldSizzle(query, context, extra, seed);
                };
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                div = null;
            })();
        }
        (function() {
            var html = document.documentElement,
                matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
            if (matches) {
                var disconnectedMatch = !matches.call(document.createElement("div"), "div"),
                    pseudoWorks = false;
                try {
                    matches.call(document.documentElement, "[test!='']:sizzle");
                } catch (pseudoError) {
                    pseudoWorks = true;
                }
                Sizzle.matchesSelector = function(node, expr) {
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                var ret = matches.call(node, expr);
                                if (ret || !disconnectedMatch || node.document && node.document.nodeType !== 11) {
                                    return ret;
                                }
                            }
                        } catch (e) {}
                    }
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        (function() {
            var div = document.createElement("div");
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            div.lastChild.className = "e";
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function(match, context, isXML) {
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            div = null;
        })();

        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem[expando] === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1 && !isXML) {
                            elem[expando] = doneName;
                            elem.sizset = i;
                        }
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }

        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                if (elem) {
                    var match = false;
                    elem = elem[dir];
                    while (elem) {
                        if (elem[expando] === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem[expando] = doneName;
                                elem.sizset = i;
                            }
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                            } else if (Sizzle.filter(cur, [elem]).length > 0) {
                                match = elem;
                                break;
                            }
                        }
                        elem = elem[dir];
                    }
                    checkSet[i] = match;
                }
            }
        }
        if (document.documentElement.contains) {
            Sizzle.contains = function(a, b) {
                return a !== b && (a.contains ? a.contains(b) : true);
            };
        } else if (document.documentElement.compareDocumentPosition) {
            Sizzle.contains = function(a, b) {
                return !!(a.compareDocumentPosition(b) & 16);
            };
        } else {
            Sizzle.contains = function() {
                return false;
            };
        }
        Sizzle.isXML = function(elem) {
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        var posProcess = function(selector, context, seed) {
            var match, tmpSet = [],
                later = "",
                root = context.nodeType ? [context] : context;
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            selector = Expr.relative[selector] ? selector + "*" : selector;
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet, seed);
            }
            return Sizzle.filter(later, tmpSet);
        };
        Sizzle.attr = jQuery.attr;
        Sizzle.selectors.attrMap = {};
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
    })();
    var runtil = /Until$/,
        rparentsprev = /^(?:parents|prevUntil|prevAll)/,
        rmultiselector = /,/,
        isSimple = /^.[^:#\[\.,]*$/,
        slice = Array.prototype.slice,
        POS = jQuery.expr.match.globalPOS,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.fn.extend({
        find: function(selector) {
            var self = this,
                i, l;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0, l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                });
            }
            var ret = this.pushStack("", "find", selector),
                length, n, r;
            for (i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return ret;
        },
        has: function(target) {
            var targets = jQuery(target);
            return this.filter(function() {
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        is: function(selector) {
            return !!selector && (typeof selector === "string" ? POS.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0);
        },
        closest: function(selectors, context) {
            var ret = [],
                i, l, cur = this[0];
            if (jQuery.isArray(selectors)) {
                var level = 1;
                while (cur && cur.ownerDocument && cur !== context) {
                    for (i = 0; i < selectors.length; i++) {
                        if (jQuery(cur).is(selectors[i])) {
                            ret.push({
                                selector: selectors[i],
                                elem: cur,
                                level: level
                            });
                        }
                    }
                    cur = cur.parentNode;
                    level++;
                }
                return ret;
            }
            var pos = POS.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                    } else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context || cur.nodeType === 11) {
                            break;
                        }
                    }
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors);
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
                all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        }
    });

    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function(elem) {
            return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            return this.pushStack(ret, name, slice.call(arguments).join(","));
        };
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        nth: function(cur, result, dir, elem) {
            result = result || 1;
            var num = 0;
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            return cur;
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            return r;
        }
    });

    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem, i) {
                return (elem === qualifier) === keep;
            });
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function(elem) {
                return elem.nodeType === 1;
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep);
            } else {
                qualifier = jQuery.filter(qualifier, filtered);
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop());
            }
        }
        return safeFrag;
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style)/i,
        rnocache = /<(?:script|object|embed|option|style)/i,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /\/(java|ecma)script/i,
        rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        safeFragment = createSafeFragment(document);
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                } else {
                    self.append(html);
                }
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this);
                });
            } else if (arguments.length) {
                var set = jQuery.clean(arguments);
                set.push.apply(set, this.toArray());
                return this.pushStack(set, "before", arguments);
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            } else if (arguments.length) {
                var set = this.pushStack(this, "after", arguments);
                set.push.apply(set, jQuery.clean(arguments));
                return set;
            }
        },
        remove: function(selector, keepData) {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            return this;
        },
        empty: function() {
            for (var i = 0, elem;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : null;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function(value) {
            if (this[0] && this[0].parentNode) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this),
                            old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                return this.each(function() {
                    var next = this.nextSibling,
                        parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value);
                    } else {
                        jQuery(parent).append(value);
                    }
                });
            } else {
                return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this;
            }
        },
        detach: function(selector) {
            return this.remove(selector, true);
        },
        domManip: function(args, table, callback) {
            var results, first, fragment, parent, value = args[0],
                scripts = [];
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback, true);
                });
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            if (this[0]) {
                parent = value && value.parentNode;
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {
                        fragment: parent
                    };
                } else {
                    results = jQuery.buildFragment(args, this, scripts);
                }
                fragment = results.fragment;
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild;
                } else {
                    first = fragment.firstChild;
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (var i = 0, l = this.length, lastIndex = l - 1; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], results.cacheable || (l > 1 && i < lastIndex) ? jQuery.clone(fragment, true, true) : fragment);
                    }
                }
                if (scripts.length) {
                    jQuery.each(scripts, function(i, elem) {
                        if (elem.src) {
                            jQuery.ajax({
                                type: "GET",
                                global: false,
                                url: elem.src,
                                async: false,
                                dataType: "script"
                            });
                        } else {
                            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, "/*$0*/"));
                        }
                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem);
                        }
                    });
                }
            }
            return this;
        }
    });

    function root(elem, cur) {
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return;
        }
        if (dest.clearAttributes) {
            dest.clearAttributes();
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src);
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            dest.outerHTML = src.outerHTML;
        } else if (nodeName === "input" && (src.type === "checkbox" || src.type === "radio")) {
            if (src.checked) {
                dest.defaultChecked = dest.checked = src.checked;
            }
            if (dest.value !== src.value) {
                dest.value = src.value;
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected;
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        } else if (nodeName === "script" && dest.text !== src.text) {
            dest.text = src.text;
        }
        dest.removeAttribute(jQuery.expando);
        dest.removeAttribute("_submit_attached");
        dest.removeAttribute("_change_attached");
    }
    jQuery.buildFragment = function(args, nodes, scripts) {
        var fragment, cacheable, cacheresults, doc, first = args[0];
        if (nodes && nodes[0]) {
            doc = nodes[0].ownerDocument || nodes[0];
        }
        if (!doc.createDocumentFragment) {
            doc = document;
        }
        if (args.length === 1 && typeof first === "string" && first.length < 512 && doc === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            cacheresults = jQuery.fragments[first];
            if (cacheresults && cacheresults !== 1) {
                fragment = cacheresults;
            }
        }
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        if (cacheable) {
            jQuery.fragments[first] = cacheresults ? fragment : 1;
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    };
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var ret = [],
                insert = jQuery(selector),
                parent = this.length === 1 && this[0].parentNode;
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this;
            } else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });

    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*");
        } else if (typeof elem.querySelectorAll !== "undefined") {
            return elem.querySelectorAll("*");
        } else {
            return [];
        }
    }

    function fixDefaultChecked(elem) {
        if (elem.type === "checkbox" || elem.type === "radio") {
            elem.defaultChecked = elem.checked;
        }
    }

    function findInputs(elem) {
        var nodeName = (elem.nodeName || "").toLowerCase();
        if (nodeName === "input") {
            fixDefaultChecked(elem);
        } else if (nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined") {
            jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked);
        }
    }

    function shimCloneNode(elem) {
        var div = document.createElement("div");
        safeFragment.appendChild(div);
        div.innerHTML = elem.outerHTML;
        return div.firstChild;
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? elem.cloneNode(true) : shimCloneNode(elem);
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i]);
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            srcElements = destElements = null;
            return clone;
        },
        clean: function(elems, context, fragment, scripts) {
            var checkScriptType, script, j, ret = [];
            context = context || document;
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                if (!elem) {
                    continue;
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem);
                    } else {
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(),
                            wrap = wrapMap[tag] || wrapMap._default,
                            depth = wrap[0],
                            div = context.createElement("div"),
                            safeChildNodes = safeFragment.childNodes,
                            remove;
                        if (context === document) {
                            safeFragment.appendChild(div);
                        } else {
                            createSafeFragment(context).appendChild(div);
                        }
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild;
                        }
                        if (!jQuery.support.tbody) {
                            var hasBody = rtbody.test(elem),
                                tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j]);
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }
                        elem = div.childNodes;
                        if (div) {
                            div.parentNode.removeChild(div);
                            if (safeChildNodes.length > 0) {
                                remove = safeChildNodes[safeChildNodes.length - 1];
                                if (remove && remove.parentNode) {
                                    remove.parentNode.removeChild(remove);
                                }
                            }
                        }
                    }
                }
                var len;
                if (!jQuery.support.appendChecked) {
                    if (elem[0] && typeof(len = elem.length) === "number") {
                        for (j = 0; j < len; j++) {
                            findInputs(elem[j]);
                        }
                    } else {
                        findInputs(elem);
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem);
                } else {
                    ret = jQuery.merge(ret, elem);
                }
            }
            if (fragment) {
                checkScriptType = function(elem) {
                    return !elem.type || rscriptType.test(elem.type);
                };
                for (i = 0; ret[i]; i++) {
                    script = ret[i];
                    if (scripts && jQuery.nodeName(script, "script") && (!script.type || rscriptType.test(script.type))) {
                        scripts.push(script.parentNode ? script.parentNode.removeChild(script) : script);
                    } else {
                        if (script.nodeType === 1) {
                            var jsTags = jQuery.grep(script.getElementsByTagName("script"), checkScriptType);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                        }
                        fragment.appendChild(script);
                    }
                }
            }
            return ret;
        },
        cleanData: function(elems) {
            var data, id, cache = jQuery.cache,
                special = jQuery.event.special,
                deleteExpando = jQuery.support.deleteExpando;
            for (var i = 0, elem;
                (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue;
                }
                id = elem[jQuery.expando];
                if (id) {
                    data = cache[id];
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type);
                            } else {
                                jQuery.removeEvent(elem, type, data.handle);
                            }
                        }
                        if (data.handle) {
                            data.handle.elem = null;
                        }
                    }
                    if (deleteExpando) {
                        delete elem[jQuery.expando];
                    } else if (elem.removeAttribute) {
                        elem.removeAttribute(jQuery.expando);
                    }
                    delete cache[id];
                }
            }
        }
    });
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity=([^)]*)/,
        rupper = /([A-Z]|^ms)/g,
        rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
        rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        rrelNum = /^([\-+])=([\-+.\de]+)/,
        rmargin = /^margin/,
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        curCSS, getComputedStyle, currentStyle;
    jQuery.fn.css = function(name, value) {
        return jQuery.access(this, function(elem, name, value) {
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        }, name, value, arguments.length > 1);
    };
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    } else {
                        return elem.style.opacity;
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, origName = jQuery.camelCase(name),
                style = elem.style,
                hooks = jQuery.cssHooks[origName];
            name = jQuery.cssProps[origName] || origName;
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (+(ret[1] + 1) * +ret[2]) + parseFloat(jQuery.css(elem, name));
                    type = "number";
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return;
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    try {
                        style[name] = value;
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function(elem, name, extra) {
            var ret, hooks;
            name = jQuery.camelCase(name);
            hooks = jQuery.cssHooks[name];
            name = jQuery.cssProps[name] || name;
            if (name === "cssFloat") {
                name = "float";
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret;
            } else if (curCSS) {
                return curCSS(elem, name);
            }
        },
        swap: function(elem, options, callback) {
            var old = {},
                ret, name;
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        }
    });
    jQuery.curCSS = jQuery.css;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function(elem, name) {
            var ret, defaultView, computedStyle, width, style = elem.style;
            name = name.replace(rupper, "-$1").toLowerCase();
            if ((defaultView = elem.ownerDocument.defaultView) && (computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name);
                }
            }
            if (!jQuery.support.pixelMargin && computedStyle && rmargin.test(name) && rnumnonpx.test(ret)) {
                width = style.width;
                style.width = ret;
                ret = computedStyle.width;
                style.width = width;
            }
            return ret;
        };
    }
    if (document.documentElement.currentStyle) {
        currentStyle = function(elem, name) {
            var left, rsLeft, uncomputed, ret = elem.currentStyle && elem.currentStyle[name],
                style = elem.style;
            if (ret == null && style && (uncomputed = style[name])) {
                ret = uncomputed;
            }
            if (rnumnonpx.test(ret)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }
            return ret === "" ? "auto" : ret;
        };
    }
    curCSS = getComputedStyle || currentStyle;

    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            i = name === "width" ? 1 : 0,
            len = 4;
        if (val > 0) {
            if (extra !== "border") {
                for (; i < len; i += 2) {
                    if (!extra) {
                        val -= parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
                    }
                    if (extra === "margin") {
                        val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0;
                    } else {
                        val -= parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0;
                    }
                }
            }
            return val + "px";
        }
        val = curCSS(elem, name);
        if (val < 0 || val == null) {
            val = elem.style[name];
        }
        if (rnumnonpx.test(val)) {
            return val;
        }
        val = parseFloat(val) || 0;
        if (extra) {
            for (; i < len; i += 2) {
                val += parseFloat(jQuery.css(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(jQuery.css(elem, "border" + cssExpand[i] + "Width")) || 0;
                }
                if (extra === "margin") {
                    val += parseFloat(jQuery.css(elem, extra + cssExpand[i])) || 0;
                }
            }
        }
        return val + "px";
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        return getWidthOrHeight(elem, name, extra);
                    } else {
                        return jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra);
                        });
                    }
                }
            },
            set: function(elem, value) {
                return rnum.test(value) ? value + "px" : value;
            }
        };
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "") {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return;
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;
            }
        };
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                        "display": "inline-block"
                    }, function() {
                        if (computed) {
                            return curCSS(elem, "margin-right");
                        } else {
                            return elem.style.marginRight;
                        }
                    });
                }
            };
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            var width = elem.offsetWidth,
                height = elem.offsetHeight;
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none");
        };
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, parts = typeof value === "string" ? value.split(" ") : [value],
                    expanded = {};
                for (i = 0; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
    });
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rhash = /#.*$/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rquery = /\?/,
        rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        rselectTextarea = /^(?:select|textarea)/i,
        rspacesAjax = /\s+/,
        rts = /([?&])_=[^&]*/,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        _load = jQuery.fn.load,
        prefilters = {},
        transports = {},
        ajaxLocation, ajaxLocParts, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            if (jQuery.isFunction(func)) {
                var dataTypes = dataTypeExpression.toLowerCase().split(rspacesAjax),
                    i = 0,
                    length = dataTypes.length,
                    dataType, list, placeBefore;
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*";
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func);
                }
            }
        };
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var list = structure[dataType],
            i = 0,
            length = list ? list.length : 0,
            executeOnly = (structure === prefilters),
            selection;
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected);
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected);
        }
        return selection;
    }

    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
    }
    jQuery.fn.extend({
        load: function(url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            } else if (!this.length) {
                return this;
            }
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            var type = "GET";
            if (params) {
                if (jQuery.isFunction(params)) {
                    callback = params;
                    params = undefined;
                } else if (typeof params === "object") {
                    params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                    type = "POST";
                }
            }
            var self = this;
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                complete: function(jqXHR, status, responseText) {
                    responseText = jqXHR.responseText;
                    if (jqXHR.isResolved()) {
                        jqXHR.done(function(r) {
                            responseText = r;
                        });
                        self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText);
                    }
                    if (callback) {
                        self.each(callback, [responseText, status, jqXHR]);
                    }
                }
            });
            return this;
        },
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    });
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f);
        };
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        };
    });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings);
            } else {
                settings = target;
                target = jQuery.ajaxSettings;
            }
            ajaxExtend(target, settings);
            return target;
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
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
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var
                s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {},
                ifModifiedKey, requestHeaders = {},
                requestHeadersNames = {},
                responseHeadersString, responseHeaders, transport, timeoutTimer, parts, state = 0,
                fireGlobals, i, jqXHR = {
                    readyState: 0,
                    setRequestHeader: function(name, value) {
                        if (!state) {
                            var lname = name.toLowerCase();
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match === undefined ? null : match;
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    abort: function(statusText) {
                        statusText = statusText || "abort";
                        if (transport) {
                            transport.abort(statusText);
                        }
                        done(0, statusText);
                        return this;
                    }
                };

            function done(status, nativeStatusText, responses, headers) {
                if (state === 2) {
                    return;
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                var isSuccess, success, error, statusText = nativeStatusText,
                    response = responses ? ajaxHandleResponses(s, jqXHR, responses) : undefined,
                    lastModified, etag;
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        if ((lastModified = jqXHR.getResponseHeader("Last-Modified"))) {
                            jQuery.lastModified[ifModifiedKey] = lastModified;
                        }
                        if ((etag = jqXHR.getResponseHeader("Etag"))) {
                            jQuery.etag[ifModifiedKey] = etag;
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true;
                    } else {
                        try {
                            success = ajaxConvert(s, response);
                            statusText = "success";
                            isSuccess = true;
                        } catch (e) {
                            statusText = "parsererror";
                            error = e;
                        }
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = "" + (nativeStatusText || statusText);
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]];
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.then(tmp, tmp);
                    }
                }
                return this;
            };
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(rspacesAjax);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))));
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return false;
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data;
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now(),
                        ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey]);
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey]);
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                jqXHR.abort();
                return false;
            }
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i]);
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {
                    if (state < 2) {
                        done(-1, e);
                    } else {
                        throw e;
                    }
                }
            }
            return jqXHR;
        },
        param: function(a, traditional) {
            var s = [],
                add = function(key, value) {
                    value = jQuery.isFunction(value) ? value() : value;
                    s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }
            if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
                jQuery.each(a, function() {
                    add(this.name, this.value);
                });
            } else {
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            return s.join("&").replace(r20, "+");
        }
    });

    function buildParams(prefix, obj, traditional, add) {
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
                }
            });
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (var name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        } else {
            add(prefix, obj);
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });

    function ajaxHandleResponses(s, jqXHR, responses) {
        var contents = s.contents,
            dataTypes = s.dataTypes,
            responseFields = s.responseFields,
            ct, type, finalDataType, firstDataType;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type];
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    function ajaxConvert(s, response) {
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
        }
        var dataTypes = s.dataTypes,
            converters = {},
            i, key, length = dataTypes.length,
            tmp, current = dataTypes[0],
            prev, conversion, conv, conv1, conv2;
        for (i = 1; i < length; i++) {
            if (i === 1) {
                for (key in s.converters) {
                    if (typeof key === "string") {
                        converters[key.toLowerCase()] = s.converters[key];
                    }
                }
            }
            prev = current;
            current = dataTypes[i];
            if (current === "*") {
                current = prev;
            } else if (prev !== "*" && prev !== current) {
                conversion = prev + " " + current;
                conv = converters[conversion] || converters["* " + current];
                if (!conv) {
                    conv2 = undefined;
                    for (conv1 in converters) {
                        tmp = conv1.split(" ");
                        if (tmp[0] === prev || tmp[0] === "*") {
                            conv2 = converters[tmp[1] + " " + current];
                            if (conv2) {
                                conv1 = converters[conv1];
                                if (conv1 === true) {
                                    conv = conv2;
                                } else if (conv2 === true) {
                                    conv = conv1;
                                }
                                break;
                            }
                        }
                    }
                }
                if (!(conv || conv2)) {
                    jQuery.error("No conversion from " + conversion.replace(" ", " to "));
                }
                if (conv !== true) {
                    response = conv ? conv(response) : conv2(conv1(response));
                }
            }
        }
        return response;
    }
    var jsc = jQuery.now(),
        jsre = /(\=)\?(&|$)|\?\?/i;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return jQuery.expando + "_" + (jsc++);
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var inspectData = (typeof s.data === "string") && /^application\/x\-www\-form\-urlencoded/.test(s.contentType);
        if (s.dataTypes[0] === "jsonp" || s.jsonp !== false && (jsre.test(s.url) || inspectData && jsre.test(s.data))) {
            var responseContainer, jsonpCallback = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback,
                previous = window[jsonpCallback],
                url = s.url,
                data = s.data,
                replace = "$1" + jsonpCallback + "$2";
            if (s.jsonp !== false) {
                url = url.replace(jsre, replace);
                if (s.url === url) {
                    if (inspectData) {
                        data = data.replace(jsre, replace);
                    }
                    if (s.data === data) {
                        url += (/\?/.test(url) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
                    }
                }
            }
            s.url = url;
            s.data = data;
            window[jsonpCallback] = function(response) {
                responseContainer = [response];
            };
            jqXHR.always(function() {
                window[jsonpCallback] = previous;
                if (responseContainer && jQuery.isFunction(previous)) {
                    window[jsonpCallback](responseContainer[0]);
                }
            });
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(jsonpCallback + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            return "script";
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    if (script) {
                        script.onload(0, 1);
                    }
                }
            };
        }
    });
    var
        xhrOnUnloadAbort = window.ActiveXObject ? function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](0, 1);
            }
        } : false,
        xhrId = 0,
        xhrCallbacks;

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials" in xhr)
        });
    })(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var xhr = s.xhr(),
                            handle, i;
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password);
                        } else {
                            xhr.open(s.type, s.url, s.async);
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i];
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType);
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle];
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort();
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml;
                                        }
                                        try {
                                            responses.text = xhr.responseText;
                                        } catch (_) {}
                                        try {
                                            statusText = xhr.statusText;
                                        } catch (e) {
                                            statusText = "";
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404;
                                        } else if (status === 1223) {
                                            status = 204;
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException);
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders);
                            }
                        };
                        if (!s.async || xhr.readyState === 4) {
                            callback();
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1);
                        }
                    }
                };
            }
        });
    }
    var elemdisplay = {},
        iframe, iframeDoc, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        timerId, fxAttrs = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        fxNow;
    jQuery.fn.extend({
        show: function(speed, easing, callback) {
            var elem, display;
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback);
            } else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (!jQuery._data(elem, "olddisplay") && display === "none") {
                            display = elem.style.display = "";
                        }
                        if ((display === "" && jQuery.css(elem, "display") === "none") || !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                            jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = elem.style.display;
                        if (display === "" || display === "none") {
                            elem.style.display = jQuery._data(elem, "olddisplay") || "";
                        }
                    }
                }
                return this;
            }
        },
        hide: function(speed, easing, callback) {
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback);
            } else {
                var elem, display, i = 0,
                    j = this.length;
                for (; i < j; i++) {
                    elem = this[i];
                    if (elem.style) {
                        display = jQuery.css(elem, "display");
                        if (display !== "none" && !jQuery._data(elem, "olddisplay")) {
                            jQuery._data(elem, "olddisplay", display);
                        }
                    }
                }
                for (i = 0; i < j; i++) {
                    if (this[i].style) {
                        this[i].style.display = "none";
                    }
                }
                return this;
            }
        },
        _toggle: jQuery.fn.toggle,
        toggle: function(fn, fn2, callback) {
            var bool = typeof fn === "boolean";
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
            } else if (fn == null || bool) {
                this.each(function() {
                    var state = bool ? fn : jQuery(this).is(":hidden");
                    jQuery(this)[state ? "show" : "hide"]();
                });
            } else {
                this.animate(genFx("toggle", 3), fn, fn2, callback);
            }
            return this;
        },
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var optall = jQuery.speed(speed, easing, callback);
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete, [false]);
            }
            prop = jQuery.extend({}, prop);

            function doAnimation() {
                if (optall.queue === false) {
                    jQuery._mark(this);
                }
                var opt = jQuery.extend({}, optall),
                    isElement = this.nodeType === 1,
                    hidden = isElement && jQuery(this).is(":hidden"),
                    name, val, p, e, hooks, replace, parts, start, end, unit, method;
                opt.animatedProperties = {};
                for (p in prop) {
                    name = jQuery.camelCase(p);
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                    }
                    if ((hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
                        replace = hooks.expand(prop[name]);
                        delete prop[name];
                        for (p in replace) {
                            if (!(p in prop)) {
                                prop[p] = replace[p];
                            }
                        }
                    }
                }
                for (name in prop) {
                    val = prop[name];
                    if (jQuery.isArray(val)) {
                        opt.animatedProperties[name] = val[1];
                        val = prop[name] = val[0];
                    } else {
                        opt.animatedProperties[name] = opt.specialEasing && opt.specialEasing[name] || opt.easing || 'swing';
                    }
                    if (val === "hide" && hidden || val === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    if (isElement && (name === "height" || name === "width")) {
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        if (jQuery.css(this, "display") === "inline" && jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout || defaultDisplay(this.nodeName) === "inline") {
                                this.style.display = "inline-block";
                            } else {
                                this.style.zoom = 1;
                            }
                        }
                    }
                }
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                for (p in prop) {
                    e = new jQuery.fx(this, opt, p);
                    val = prop[p];
                    if (rfxtypes.test(val)) {
                        method = jQuery._data(this, "toggle" + p) || (val === "toggle" ? hidden ? "show" : "hide" : 0);
                        if (method) {
                            jQuery._data(this, "toggle" + p, method === "show" ? "hide" : "show");
                            e[method]();
                        } else {
                            e[val]();
                        }
                    } else {
                        parts = rfxnum.exec(val);
                        start = e.cur();
                        if (parts) {
                            end = parseFloat(parts[2]);
                            unit = parts[3] || (jQuery.cssNumber[p] ? "" : "px");
                            if (unit !== "px") {
                                jQuery.style(this, p, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(this, p, start + unit);
                            }
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            e.custom(start, end, unit);
                        } else {
                            e.custom(start, val, "");
                        }
                    }
                }
                return true;
            }
            return optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function() {
                var index, hadTimers = false,
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (!gotoEnd) {
                    jQuery._unmark(true, this);
                }

                function stopQueue(elem, data, index) {
                    var hooks = data[index];
                    jQuery.removeData(elem, index, true);
                    hooks.stop(gotoEnd);
                }
                if (type == null) {
                    for (index in data) {
                        if (data[index] && data[index].stop && index.indexOf(".run") === index.length - 4) {
                            stopQueue(this, data, index);
                        }
                    }
                } else if (data[index = type + ".run"] && data[index].stop) {
                    stopQueue(this, data, index);
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        if (gotoEnd) {
                            timers[index](true);
                        } else {
                            timers[index].saveState();
                        }
                        hadTimers = true;
                        timers.splice(index, 1);
                    }
                }
                if (!(gotoEnd && hadTimers)) {
                    jQuery.dequeue(this, type);
                }
            });
        }
    });

    function createFxNow() {
        setTimeout(clearFxNow, 0);
        return (fxNow = jQuery.now());
    }

    function clearFxNow() {
        fxNow = undefined;
    }

    function genFx(type, num) {
        var obj = {};
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function() {
            obj[this] = type;
        });
        return obj;
    }
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.extend({
        speed: function(speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            opt.old = opt.complete;
            opt.complete = function(noUnmark) {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                } else if (noUnmark !== false) {
                    jQuery._unmark(this);
                }
            };
            return opt;
        },
        easing: {
            linear: function(p) {
                return p;
            },
            swing: function(p) {
                return (-Math.cos(p * Math.PI) / 2) + 0.5;
            }
        },
        timers: [],
        fx: function(elem, options, prop) {
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            options.orig = options.orig || {};
        }
    });
    jQuery.fx.prototype = {
        update: function() {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
        },
        cur: function() {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            var parsed, r = jQuery.css(this.elem, this.prop);
            return isNaN(parsed = parseFloat(r)) ? !r || r === "auto" ? 0 : r : parsed;
        },
        custom: function(from, to, unit) {
            var self = this,
                fx = jQuery.fx;
            this.startTime = fxNow || createFxNow();
            this.end = to;
            this.now = this.start = from;
            this.pos = this.state = 0;
            this.unit = unit || this.unit || (jQuery.cssNumber[this.prop] ? "" : "px");

            function t(gotoEnd) {
                return self.step(gotoEnd);
            }
            t.queue = this.options.queue;
            t.elem = this.elem;
            t.saveState = function() {
                if (jQuery._data(self.elem, "fxshow" + self.prop) === undefined) {
                    if (self.options.hide) {
                        jQuery._data(self.elem, "fxshow" + self.prop, self.start);
                    } else if (self.options.show) {
                        jQuery._data(self.elem, "fxshow" + self.prop, self.end);
                    }
                }
            };
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval);
            }
        },
        show: function() {
            var dataShow = jQuery._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = dataShow || jQuery.style(this.elem, this.prop);
            this.options.show = true;
            if (dataShow !== undefined) {
                this.custom(this.cur(), dataShow);
            } else {
                this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            }
            jQuery(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = jQuery._data(this.elem, "fxshow" + this.prop) || jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0);
        },
        step: function(gotoEnd) {
            var p, n, complete, t = fxNow || createFxNow(),
                done = true,
                elem = this.elem,
                options = this.options;
            if (gotoEnd || t >= options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                options.animatedProperties[this.prop] = true;
                for (p in options.animatedProperties) {
                    if (options.animatedProperties[p] !== true) {
                        done = false;
                    }
                }
                if (done) {
                    if (options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        jQuery.each(["", "X", "Y"], function(index, value) {
                            elem.style["overflow" + value] = options.overflow[index];
                        });
                    }
                    if (options.hide) {
                        jQuery(elem).hide();
                    }
                    if (options.hide || options.show) {
                        for (p in options.animatedProperties) {
                            jQuery.style(elem, p, options.orig[p]);
                            jQuery.removeData(elem, "fxshow" + p, true);
                            jQuery.removeData(elem, "toggle" + p, true);
                        }
                    }
                    complete = options.complete;
                    if (complete) {
                        options.complete = false;
                        complete.call(elem);
                    }
                }
                return false;
            } else {
                if (options.duration == Infinity) {
                    this.now = t;
                } else {
                    n = t - this.startTime;
                    this.state = n / options.duration;
                    this.pos = jQuery.easing[options.animatedProperties[this.prop]](this.state, n, 0, 1, options.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos);
                }
                this.update();
            }
            return true;
        }
    };
    jQuery.extend(jQuery.fx, {
        tick: function() {
            var timer, timers = jQuery.timers,
                i = 0;
            for (; i < timers.length; i++) {
                timer = timers[i];
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
        },
        interval: 13,
        stop: function() {
            clearInterval(timerId);
            timerId = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(fx) {
                jQuery.style(fx.elem, "opacity", fx.now);
            },
            _default: function(fx) {
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = fx.now + fx.unit;
                } else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    jQuery.each(fxAttrs.concat.apply([], fxAttrs), function(i, prop) {
        if (prop.indexOf("margin")) {
            jQuery.fx.step[prop] = function(fx) {
                jQuery.style(fx.elem, prop, Math.max(0, fx.now) + fx.unit);
            };
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem;
            }).length;
        };
    }

    function defaultDisplay(nodeName) {
        if (!elemdisplay[nodeName]) {
            var body = document.body,
                elem = jQuery("<" + nodeName + ">").appendTo(body),
                display = elem.css("display");
            elem.remove();
            if (display === "none" || display === "") {
                if (!iframe) {
                    iframe = document.createElement("iframe");
                    iframe.frameBorder = iframe.width = iframe.height = 0;
                }
                body.appendChild(iframe);
                if (!iframeDoc || !iframe.createElement) {
                    iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                    iframeDoc.write((jQuery.support.boxModel ? "<!doctype html>" : "") + "<html><body>");
                    iframeDoc.close();
                }
                elem = iframeDoc.createElement(nodeName);
                iframeDoc.body.appendChild(elem);
                display = jQuery.css(elem, "display");
                body.removeChild(iframe);
            }
            elemdisplay[nodeName] = display;
        }
        return elemdisplay[nodeName];
    }
    var getOffset, rtable = /^t(?:able|d|h)$/i,
        rroot = /^(?:body|html)$/i;
    if ("getBoundingClientRect" in document.documentElement) {
        getOffset = function(elem, doc, docElem, box) {
            try {
                box = elem.getBoundingClientRect();
            } catch (e) {}
            if (!box || !jQuery.contains(docElem, elem)) {
                return box ? {
                    top: box.top,
                    left: box.left
                } : {
                    top: 0,
                    left: 0
                };
            }
            var body = doc.body,
                win = getWindow(doc),
                clientTop = docElem.clientTop || body.clientTop || 0,
                clientLeft = docElem.clientLeft || body.clientLeft || 0,
                scrollTop = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop,
                scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;
            return {
                top: top,
                left: left
            };
        };
    } else {
        getOffset = function(elem, doc, docElem) {
            var computedStyle, offsetParent = elem.offsetParent,
                prevOffsetParent = elem,
                body = doc.body,
                defaultView = doc.defaultView,
                prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle,
                top = elem.offsetTop,
                left = elem.offsetLeft;
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    if (jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent;
                }
                if (jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                prevComputedStyle = computedStyle;
            }
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            if (jQuery.support.fixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            return {
                top: top,
                left: left
            };
        };
    }
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
        }
        var elem = this[0],
            doc = elem && elem.ownerDocument;
        if (!doc) {
            return null;
        }
        if (elem === doc.body) {
            return jQuery.offset.bodyOffset(elem);
        }
        return getOffset(elem, doc, doc.documentElement);
    };
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop,
                left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            return {
                top: top,
                left: left
            };
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative";
            }
            var curElem = jQuery(elem),
                curOffset = curElem.offset(),
                curCSSTop = jQuery.css(elem, "top"),
                curCSSLeft = jQuery.css(elem, "left"),
                calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
                props = {},
                curPosition = {},
                curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return null;
            }
            var elem = this[0],
                offsetParent = this.offsetParent(),
                offset = this.offset(),
                parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : jQuery.support.boxModel && win.document.documentElement[method] || win.document.body[method] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        var clientProp = "client" + name,
            scrollProp = "scroll" + name,
            offsetProp = "offset" + name;
        jQuery.fn["inner" + name] = function() {
            var elem = this[0];
            return elem ? elem.style ? parseFloat(jQuery.css(elem, type, "padding")) : this[type]() : null;
        };
        jQuery.fn["outer" + name] = function(margin) {
            var elem = this[0];
            return elem ? elem.style ? parseFloat(jQuery.css(elem, type, margin ? "margin" : "border")) : this[type]() : null;
        };
        jQuery.fn[type] = function(value) {
            return jQuery.access(this, function(elem, type, value) {
                var doc, docElemProp, orig, ret;
                if (jQuery.isWindow(elem)) {
                    doc = elem.document;
                    docElemProp = doc.documentElement[clientProp];
                    return jQuery.support.boxModel && docElemProp || doc.body && doc.body[clientProp] || docElemProp;
                }
                if (elem.nodeType === 9) {
                    doc = elem.documentElement;
                    if (doc[clientProp] >= doc[scrollProp]) {
                        return doc[clientProp];
                    }
                    return Math.max(elem.body[scrollProp], doc[scrollProp], elem.body[offsetProp], doc[offsetProp]);
                }
                if (value === undefined) {
                    orig = jQuery.css(elem, type);
                    ret = parseFloat(orig);
                    return jQuery.isNumeric(ret) ? ret : orig;
                }
                jQuery(elem).css(type, value);
            }, type, value, arguments.length, null);
        };
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return jQuery;
        });
    }
})(window);;
(function($) {
    $.fn.textFitting = function(options) {
        var settings = $.extend({}, {
            area: {
                width: 200,
                height: 200
            },
            minFontSize: 18,
            maxFontSize: 64,
            lineHeightModifier: 1.2,
            childSelector: '.content',
            verticalAlignProperty: 'margin-top',
            middlePercentage: 0.5,
            fontWidthRatio: 0.7,
            averageWordBreak: 0.75,
            parentHeight: 0
        }, options);
        var getLongestWord = function(text) {
            var words = text.split(' ');
            words.sort(function(a, b) {
                return b.length - a.length;
            });
            return words.length > 0 ? words[0] : '';
        };
        var getContent = function($selector) {
            return $selector.is('textarea') ? $selector.val() : $selector.html();
        };
        var getContentHeight = function($selector) {
            var contentHeight = 0;
            if ($selector.is('textarea')) {
                if ($.isIE() > 0) {
                    contentHeight = $selector.get(0).scrollHeight;
                } else {
                    var originalHeight = $selector.height();
                    if (originalHeight !== 0) {
                        $selector.css({
                            height: 0
                        });
                        contentHeight = $selector.get(0).scrollHeight;
                        $selector.css({
                            height: originalHeight
                        });
                    }
                }
            } else {
                contentHeight = $selector.height();
            }
            return contentHeight;
        };
        var availableArea = settings.area.width * settings.area.height * settings.averageWordBreak;
        var $content = $(this).find(settings.childSelector);
        setTimeout(function() {
            $content.each(function(index, el) {
                var content = getContent($(this));
                var longestWordWidth = (settings.fontWidthRatio * settings.maxFontSize) * getLongestWord(content).length;
                var contentHeight = getContentHeight($(this));
                contentHeight = contentHeight * (32 / 37) + 32;
                var maxVerticalFontSize = Math.min(settings.maxFontSize, Math.floor(Math.sqrt(availableArea / settings.fontWidthRatio / content.length)));
                var maxHorizontalFontSize = Math.floor(Math.min(1, settings.area.width / longestWordWidth) * settings.maxFontSize);
                if (maxHorizontalFontSize < settings.minFontSize && maxHorizontalFontSize < maxVerticalFontSize) {
                    $(this).css('word-break', 'hyphenate');
                    maxHorizontalFontSize = settings.minFontSize;
                } else {
                    $(this).css('word-break', 'normal');
                }
                var fontSize = Math.min(maxVerticalFontSize, maxHorizontalFontSize);
                $(this).css({
                    fontSize: fontSize,
                    lineHeight: (fontSize * settings.lineHeightModifier) + 'px'
                });
                var parentHeight = Math.max($(this).parent().height(), settings.parentHeight);
                var estimatedContentHeight = getContentHeight($(this));
                var contentOffsetY = Math.max(0, (parentHeight - estimatedContentHeight) * settings.middlePercentage);
                $(this).css(settings.verticalAlignProperty, contentOffsetY).css('visibility', 'visible');
            });
        }, 1);
        return this;
    };
    $.isIE = function() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    };
})(jQuery);;
(function($) {
    $.fn.textFittingHall = function(options) {
        var settings = $.extend({}, {
            area: {
                width: 95,
                height: 98
            },
            minFontSize: 18,
            maxFontSize: 64,
            lineHeightModifier: 1.2,
            childSelector: '.content',
            verticalAlignProperty: 'top',
            middlePercentage: 0.5,
            fontWidthRatio: 0.7,
            averageWordBreak: 0.75,
            parentHeight: 0
        }, options);
        var getLongestWord = function(text) {
            var words = text.split(' ');
            words.sort(function(a, b) {
                return b.length - a.length;
            });
            return words.length > 0 ? words[0] : '';
        };
        var getContent = function($selector) {
            return $selector.is('textarea') ? $selector.val() : $selector.html();
        };
        var getContentHeight = function($selector) {
            var contentHeight = 0;
            if ($selector.is('textarea')) {
                if ($.isIE() > 0) {
                    contentHeight = $selector.get(0).scrollHeight;
                } else {
                    var originalHeight = $selector.height();
                    if (originalHeight !== 0) {
                        $selector.css({
                            height: 0
                        });
                        contentHeight = $selector.get(0).scrollHeight;
                        $selector.css({
                            height: originalHeight
                        });
                    }
                }
            } else {
                contentHeight = $selector.height();
            }
            return contentHeight;
        };
        var availableArea = settings.area.width * settings.area.height * settings.averageWordBreak;
        var $content = $(this).find(settings.childSelector);
        setTimeout(function() {
            $content.each(function(index, el) {
                var content = getContent($(this));
                var longestWordWidth = (settings.fontWidthRatio * settings.maxFontSize) * getLongestWord(content).length;
                var contentHeight = getContentHeight($(this));
                contentHeight = contentHeight * (32 / 37) + 32;
                var maxVerticalFontSize = Math.min(settings.maxFontSize, Math.floor(Math.sqrt(availableArea / settings.fontWidthRatio / content.length)));
                var maxHorizontalFontSize = Math.floor(Math.min(1, settings.area.width / longestWordWidth) * settings.maxFontSize);
                if (maxHorizontalFontSize < settings.minFontSize && maxHorizontalFontSize < maxVerticalFontSize) {
                    $(this).css('word-break', 'hyphenate');
                    maxHorizontalFontSize = settings.minFontSize;
                } else {
                    $(this).css('word-break', 'normal');
                }
                var fontSize = Math.min(maxVerticalFontSize, maxHorizontalFontSize);
                $(this).css({
                    fontSize: fontSize,
                    lineHeight: (fontSize * settings.lineHeightModifier) + 'px'
                });
                var parentHeight = Math.max($(this).parent().height(), settings.parentHeight);
                var estimatedContentHeight = getContentHeight($(this));
                var contentOffsetY = Math.max(0, (parentHeight - estimatedContentHeight) * settings.middlePercentage);
                $(this).css(settings.verticalAlignProperty, (contentOffsetY / 5)).css('visibility', 'visible');
            });
        }, 1);
        return this;
    };
    $.isIE = function() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    };
})(jQuery);

(function(a) {
    a.tiny = a.tiny || {};
    a.tiny.carousel = {
        options: {
            start: 1,
            display: 1,
            axis: "x",
            controls: true,
            pager: false,
            interval: false,
            intervaltime: 3000,
            rewind: false,
            animation: true,
            duration: 1000,
            callback: null
        }
    };
    a.fn.tinycarousel_start = function() {
        a(this).data("tcl").start()
    };
    a.fn.tinycarousel_stop = function() {
        a(this).data("tcl").stop()
    };
    a.fn.tinycarousel_move = function(c) {
        a(this).data("tcl").move(c - 1, true)
    };

    function b(q, e) {
        var i = this,
            h = a(".viewport:first", q),
            g = a(".overview:first", q),
            k = g.children(),
            f = a(".next:first", q),
            d = a(".prev:first", q),
            l = a(".pager:first", q),
            w = 0,
            u = 0,
            p = 0,
            j = undefined,
            o = false,
            n = true,
            s = e.axis === "x";

        function m() {
            if (e.controls) {
                d.toggleClass("disable", p <= 0);
                f.toggleClass("disable", !(p + 1 < u))
            }
            if (e.pager) {
                var x = a(".pagenum", l);
                x.removeClass("active");
                a(x[p]).addClass("active")
            }
        }

        function v(x) {
            if (a(this).hasClass("pagenum")) {
                i.move(parseInt(this.rel, 10), true)
            }
            return false
        }

        function t() {
            if (e.interval && !o) {
                clearTimeout(j);
                j = setTimeout(function() {
                    p = p + 1 === u ? -1 : p;
                    n = p + 1 === u ? false : p === 0 ? true : n;
                    i.move(n ? 1 : -1)
                }, e.intervaltime)
            }
        }

        function r() {
            if (e.controls && d.length > 0 && f.length > 0) {
                d.click(function() {
                    i.move(-1);
                    return false
                });
                f.click(function() {
                    i.move(1);
                    return false
                })
            }
            if (e.interval) {
                q.hover(i.stop, i.start)
            }
            if (e.pager && l.length > 0) {
                a("a", l).click(v)
            }
        }
        this.stop = function() {
            clearTimeout(j);
            o = true
        };
        this.start = function() {
            o = false;
            t()
        };
        this.move = function(y, z) {
            p = z ? y : p += y;
            if (p > -1 && p < u) {
                var x = {};
                x[s ? "left" : "top"] = -(p * (w * e.display));
                g.animate(x, {
                    queue: false,
                    duration: e.animation ? e.duration : 0,
                    complete: function() {
                        if (typeof e.callback === "function") {
                            e.callback.call(this, k[p], p)
                        }
                    }
                });
                m();
                t()
            }
        };

        function c() {
            w = s ? a(k[0]).outerWidth(true) : a(k[0]).outerHeight(true);
            var x = Math.ceil(((s ? h.outerWidth() : h.outerHeight()) / (w * e.display)) - 1);
            u = Math.max(1, Math.ceil(k.length / e.display) - x);
            p = Math.min(u, Math.max(1, e.start)) - 2;
            g.css(s ? "width" : "height", (w * k.length));
            i.move(1);
            r();
            return i
        }
        return c()
    }
    a.fn.tinycarousel = function(d) {
        var c = a.extend({}, a.tiny.carousel.options, d);
        this.each(function() {
            a(this).data("tcl", new b(a(this), c))
        });
        return this
    }
}(jQuery));

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}
if (typeof console == "undefined") {
    window.console = {
        log: function() {},
        dir: function() {}
    };
}

function getSegments(numSegments) {
    var path = window.location.pathname.replace(/\/+$/, '');
    while (path.substr(0, 1) == '/') {
        path = path.substr(1);
    }
    var parts = path.split('/');
    parts = parts.slice(0, Math.min(numSegments, parts.length));
    return parts.join('/');
}
window.$ = window.jQuery;
$.extend($.fn, {
    hasAncestor: function(anc) {
        return this.filter(function() {
            return !!$(this).closest(anc).length;
        });
    },
    outerHTML: function() {
        return $(this).clone().wrap('<div></div>').parent().html();
    },
    autoAlpha: function(value, onComplete) {
        TweenLite.to($(this), 0.3, {
            css: {
                autoAlpha: value
            },
            onComplete: onComplete
        });
        return this;
    },
    alert: function() {
        $(this).find('.close').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().addClass('hiding').slideUp(function() {
                $(this).remove();
            });
            clearTimeout($(this).data('timeout'));
        });
        if ($(this).hasClass('autohide')) {
            var $closeButton = $(this).find('.close');
            var autoHide = function($closeButton) {
                $closeButton.click();
            };
            $closeButton.data('timeout', setTimeout(function() {
                autoHide($closeButton);
            }, 5000));
        }
        return this;
    },
    setCursorPosition: function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    }
});

$(function() {
    $('.carousel.simple').each(function() {
        var timeout = $(this).hasClass('slow') ? 6000 : 3000;
        $(this).tinycarousel({
            pager: true,
            interval: true,
            duration: 400,
            intervaltime: timeout
        });
    });
    $('.carousel.advanced').each(function() {
        var timeout = $(this).hasClass('slow') ? 10000 : 4000;
        $(this).tinycarousel({
            controls: true,
            pager: true,
            interval: true,
            duration: 400,
            intervaltime: timeout,
            callback: function(el, index) {
                var title = $(el).find('img').attr('title');
                $(this).parents('.carousel').find('.label').html(title);
            }
        });
    });
    $('#alerts .alert').alert('ciao');
    $('.hall .belief').textFitting({
        minFontSize: 14,
        maxFontSize: 32,
        fontWidthRatio: 0.6,
        middlePercentage: 0.45,
        area: {
            width: 130,
            height: 140
        }
    });
    $('.new').textFittingHall({
        minFontSize: 12,
        maxFontSize: 30,
        fontWidthRatio: 0.6,
        middlePercentage: 0.45,
        area: {
            width: 95,
            height: 70
        }
    });
    $('.reframe .belief').textFittingHall({
        minFontSize: 12,
        maxFontSize: 30,
        fontWidthRatio: 0.6,
        middlePercentage: 0.45,
        lineHeightModifier: 0.9,
        area: {
            width: 150,
            height: 120
        }
    });
    var url = window.location.href;
    if (url.indexOf('hallofrefocuses') != -1) {
        $('#content').width(1000);
    }
    $('#share-fb').on('click', share_fb);
    $('#share-twitter').on('click', share_tw);
    $('#share-linkd').on('click', share_linkd);
    $('.header__menu').on('click', openMobileMenu);
    $('.header__nav__item--dropdown').on('click', openDropdown);
    $("body").on("autocompleteselect", '.facetwp-autocomplete', function(event, ui) {
        console.log('clicked!');
    });
});

function share_tw(c) {
    var left = (screen.width / 2) - (626 / 2);
    var top = (screen.height / 2) - (436 / 2);
    window.open(this.href, 'sharer', 'toolbar=0,status=0,width=626,height=436,top=' + top + ',left=' + left);
    return false;
}

function share_fb(c) {
    var left = (screen.width / 2) - (626 / 2);
    var top = (screen.height / 2) - (436 / 2);
    window.open(this.href, 'sharer', 'toolbar=0,status=0,width=626,height=436,top=' + top + ',left=' + left);
    return false;
}

function share_linkd(c) {
    var left = (screen.width / 2) - (626 / 2);
    var top = (screen.height / 2) - (436 / 2);
    window.open(this.href, 'sharer', 'toolbar=0,status=0,width=626,height=436,top=' + top + ',left=' + left);
    return false;
}

function openDropdown() {
    if ($(this).children(".nav__dropdown-container").hasClass('nav__dropdown-container--open')) {
        $(this).children(".nav__dropdown-container").toggleClass('nav__dropdown-container--open')
        $(this).toggleClass('open');
        $('body').removeClass('header-open');
    } else {
        $(".nav__dropdown-container").removeClass('nav__dropdown-container--open')
        $('.header__nav__item').removeClass('open');
        $(this).children(".nav__dropdown-container").addClass('nav__dropdown-container--open');
        $(this).addClass('open');
        $('body').addClass('header-open');
    }
}

function openMobileMenu() {
    $('.header').toggleClass('header--open')
    $('body').toggleClass('stop-scroll')
}

(function($) {
    "use strict";
    var methods = {
        init: function(options) {
            var form = this;
            if (!form.data('jqv') || form.data('jqv') == null) {
                options = methods._saveOptions(form, options);
                $(".formError").live("click", function() {
                    $(this).fadeOut(150, function() {
                        $(this).parent('.formErrorOuter').remove();
                        $(this).remove();
                    });
                });
            }
            return this;
        },
        attach: function(userOptions) {
            var form = this;
            var options;
            if (userOptions)
                options = methods._saveOptions(form, userOptions);
            else
                options = form.data('jqv');
            options.validateAttribute = (form.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
            if (options.binded) {
                form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", methods._onFieldEvent);
                form.on("click", "[" + options.validateAttribute + "*=validate][type=checkbox],[" + options.validateAttribute + "*=validate][type=radio]", methods._onFieldEvent);
                form.on(options.validationEventTrigger, "[" + options.validateAttribute + "*=validate][class*=datepicker]", {
                    "delay": 300
                }, methods._onFieldEvent);
            }
            if (options.autoPositionUpdate) {
                $(window).bind("resize", {
                    "noAnimation": true,
                    "formElem": form
                }, methods.updatePromptsPosition);
            }
            form.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
            form.removeData('jqv_submitButton');
            form.on("submit", methods._onSubmitEvent);
            return this;
        },
        detach: function() {
            var form = this;
            var options = form.data('jqv');
            form.find("[" + options.validateAttribute + "*=validate]").not("[type=checkbox]").off(options.validationEventTrigger, methods._onFieldEvent);
            form.find("[" + options.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", methods._onFieldEvent);
            form.off("submit", methods.onAjaxFormComplete);
            form.die("submit", methods.onAjaxFormComplete);
            form.removeData('jqv');
            form.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", methods._submitButtonClick);
            form.removeData('jqv_submitButton');
            if (options.autoPositionUpdate)
                $(window).unbind("resize", methods.updatePromptsPosition);
            return this;
        },
        validate: function() {
            var element = $(this);
            var valid = null;
            if ((element.is("form") || element.hasClass("validationEngineContainer")) && !element.hasClass('validating')) {
                element.addClass('validating');
                var options = element.data('jqv');
                var valid = methods._validateFields(this);
                setTimeout(function() {
                    element.removeClass('validating');
                }, 100);
                if (valid && options.onSuccess) {
                    options.onSuccess();
                } else if (!valid && options.onFailure) {
                    options.onFailure();
                }
            } else if (element.is('form') || element.hasClass('validationEngineContainer')) {
                element.removeClass('validating');
            } else {
                var form = element.closest('form, .validationEngineContainer'),
                    options = (form.data('jqv')) ? form.data('jqv') : $.validationEngine.defaults,
                    valid = methods._validateField(element, options);
                if (valid && options.onFieldSuccess)
                    options.onFieldSuccess();
                else if (options.onFieldFailure && options.InvalidFields.length > 0) {
                    options.onFieldFailure();
                }
            }
            if (options.onValidationComplete) {
                return !!options.onValidationComplete(form, valid);
            }
            return valid;
        },
        updatePromptsPosition: function(event) {
            if (event && this == window) {
                var form = event.data.formElem;
                var noAnimation = event.data.noAnimation;
            } else
                var form = $(this.closest('form, .validationEngineContainer'));
            var options = form.data('jqv');
            form.find('[' + options.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var field = $(this);
                if (options.prettySelect && field.is(":hidden"))
                    field = form.find("#" + options.usePrefix + field.attr('id') + options.useSuffix);
                var prompt = methods._getPrompt(field);
                var promptText = $(prompt).find(".formErrorContent").html();
                if (prompt)
                    methods._updatePrompt(field, $(prompt), promptText, undefined, false, options, noAnimation);
            });
            return this;
        },
        showPrompt: function(promptText, type, promptPosition, showArrow) {
            var form = this.closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            if (!options)
                options = methods._saveOptions(this, options);
            if (promptPosition)
                options.promptPosition = promptPosition;
            options.showArrow = showArrow == true;
            methods._showPrompt(this, promptText, type, false, options);
            return this;
        },
        hide: function() {
            var form = $(this).closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            var fadeDuration = (options && options.fadeDuration) ? options.fadeDuration : 0.3;
            var closingtag;
            if ($(this).is("form") || $(this).hasClass("validationEngineContainer")) {
                closingtag = "parentForm" + methods._getClassName($(this).attr("id"));
            } else {
                closingtag = methods._getClassName($(this).attr("id")) + "formError";
            }
            $('.' + closingtag).fadeTo(fadeDuration, 0.3, function() {
                $(this).parent('.formErrorOuter').remove();
                $(this).remove();
            });
            return this;
        },
        hideAll: function() {
            var form = this;
            var options = form.data('jqv');
            var duration = options ? options.fadeDuration : 300;
            $('.formError').fadeTo(duration, 300, function() {
                $(this).parent('.formErrorOuter').remove();
                $(this).remove();
            });
            return this;
        },
        _onFieldEvent: function(event) {
            var field = $(this);
            var form = field.closest('form, .validationEngineContainer');
            var options = form.data('jqv');
            options.eventTrigger = "field";
            window.setTimeout(function() {
                methods._validateField(field, options);
                if (options.InvalidFields.length == 0 && options.onFieldSuccess) {
                    options.onFieldSuccess();
                } else if (options.InvalidFields.length > 0 && options.onFieldFailure) {
                    options.onFieldFailure();
                }
            }, (event.data) ? event.data.delay : 0);
        },
        _onSubmitEvent: function() {
            var form = $(this);
            var options = form.data('jqv');
            if (form.data("jqv_submitButton")) {
                var submitButton = $("#" + form.data("jqv_submitButton"));
                if (submitButton) {
                    if (submitButton.length > 0) {
                        if (submitButton.hasClass("validate-skip") || submitButton.attr("data-validation-engine-skip") == "true")
                            return true;
                    }
                }
            }
            options.eventTrigger = "submit";
            var r = methods._validateFields(form);
            if (r && options.ajaxFormValidation) {
                methods._validateFormWithAjax(form, options);
                return false;
            }
            if (options.onValidationComplete) {
                return !!options.onValidationComplete(form, r);
            }
            return r;
        },
        _checkAjaxStatus: function(options) {
            var status = true;
            $.each(options.ajaxValidCache, function(key, value) {
                if (!value) {
                    status = false;
                    return false;
                }
            });
            return status;
        },
        _checkAjaxFieldStatus: function(fieldid, options) {
            return options.ajaxValidCache[fieldid] == true;
        },
        _validateFields: function(form) {
            var options = form.data('jqv');
            var errorFound = false;
            form.trigger("jqv.form.validating");
            var first_err = null;
            form.find('[' + options.validateAttribute + '*=validate]').not(":disabled").each(function() {
                var field = $(this);
                var names = [];
                if ($.inArray(field.attr('name'), names) < 0) {
                    errorFound |= methods._validateField(field, options);
                    if (errorFound && first_err == null)
                        if (field.is(":hidden") && options.prettySelect)
                            first_err = field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
                        else
                            first_err = field;
                    if (options.doNotShowAllErrosOnSubmit)
                        return false;
                    names.push(field.attr('name'));
                    if (options.showOneMessage == true && errorFound) {
                        return false;
                    }
                }
            });
            form.trigger("jqv.form.result", [errorFound]);
            if (errorFound) {
                if (options.scroll) {
                    var destination = first_err.offset().top;
                    var fixleft = first_err.offset().left;
                    var positionType = options.promptPosition;
                    if (typeof(positionType) == 'string' && positionType.indexOf(":") != -1)
                        positionType = positionType.substring(0, positionType.indexOf(":"));
                    if (positionType != "bottomRight" && positionType != "bottomLeft") {
                        var prompt_err = methods._getPrompt(first_err);
                        if (prompt_err) {
                            destination = prompt_err.offset().top;
                        }
                    }
                    if (options.scrollOffset) {
                        destination -= options.scrollOffset;
                    }
                    if (options.isOverflown) {
                        var overflowDIV = $(options.overflownDIV);
                        if (!overflowDIV.length) return false;
                        var scrollContainerScroll = overflowDIV.scrollTop();
                        var scrollContainerPos = -parseInt(overflowDIV.offset().top);
                        destination += scrollContainerScroll + scrollContainerPos - 5;
                        var scrollContainer = $(options.overflownDIV + ":not(:animated)");
                        scrollContainer.animate({
                            scrollTop: destination
                        }, 1100, function() {
                            if (options.focusFirstField) first_err.focus();
                        });
                    } else {
                        $("html, body").animate({
                            scrollTop: destination
                        }, 1100, function() {
                            if (options.focusFirstField) first_err.focus();
                        });
                        $("html, body").animate({
                            scrollLeft: fixleft
                        }, 1100)
                    }
                } else if (options.focusFirstField)
                    first_err.focus();
                return false;
            }
            return true;
        },
        _validateFormWithAjax: function(form, options) {
            var data = form.serialize();
            var type = (options.ajaxFormValidationMethod) ? options.ajaxFormValidationMethod : "GET";
            var url = (options.ajaxFormValidationURL) ? options.ajaxFormValidationURL : form.attr("action");
            var dataType = (options.dataType) ? options.dataType : "json";
            $.ajax({
                type: type,
                url: url,
                cache: false,
                dataType: dataType,
                data: data,
                form: form,
                methods: methods,
                options: options,
                beforeSend: function() {
                    return options.onBeforeAjaxFormValidation(form, options);
                },
                error: function(data, transport) {
                    methods._ajaxError(data, transport);
                },
                success: function(json) {
                    if ((dataType == "json") && (json !== true)) {
                        var errorInForm = false;
                        for (var i = 0; i < json.length; i++) {
                            var value = json[i];
                            var errorFieldId = value[0];
                            var errorField = $($("#" + errorFieldId)[0]);
                            if (errorField.length == 1) {
                                var msg = value[2];
                                if (value[1] == true) {
                                    if (msg == "" || !msg) {
                                        methods._closePrompt(errorField);
                                    } else {
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertTextOk;
                                            if (txt)
                                                msg = txt;
                                        }
                                        if (options.showPrompts) methods._showPrompt(errorField, msg, "pass", false, options, true);
                                    }
                                } else {
                                    errorInForm |= true;
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt)
                                            msg = txt;
                                    }
                                    if (options.showPrompts) methods._showPrompt(errorField, msg, "", false, options, true);
                                }
                            }
                        }
                        options.onAjaxFormComplete(!errorInForm, form, json, options);
                    } else
                        options.onAjaxFormComplete(true, form, json, options);
                }
            });
        },
        _validateField: function(field, options, skipAjaxValidation) {
            if (!field.attr("id")) {
                field.attr("id", "form-validation-field-" + $.validationEngine.fieldIdCounter);
                ++$.validationEngine.fieldIdCounter;
            }
            if (!options.validateNonVisibleFields && (field.is(":hidden") && !options.prettySelect || field.parent().is(":hidden")))
                return false;
            var rulesParsing = field.attr(options.validateAttribute);
            var getRules = /validate\[(.*)\]/.exec(rulesParsing);
            if (!getRules)
                return false;
            var str = getRules[1];
            var rules = str.split(/\[|,|\]/);
            var isAjaxValidator = false;
            var fieldName = field.attr("name");
            var promptText = "";
            var promptType = "";
            var required = false;
            var limitErrors = false;
            options.isError = false;
            options.showArrow = true;
            if (options.maxErrorsPerField > 0) {
                limitErrors = true;
            }
            var form = $(field.closest("form, .validationEngineContainer"));
            for (var i = 0; i < rules.length; i++) {
                rules[i] = rules[i].replace(" ", "");
                if (rules[i] === '') {
                    delete rules[i];
                }
            }
            for (var i = 0, field_errors = 0; i < rules.length; i++) {
                if (limitErrors && field_errors >= options.maxErrorsPerField) {
                    if (!required) {
                        var have_required = $.inArray('required', rules);
                        required = (have_required != -1 && have_required >= i);
                    }
                    break;
                }
                var errorMsg = undefined;
                switch (rules[i]) {
                    case "required":
                        required = true;
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._required);
                        break;
                    case "custom":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._custom);
                        break;
                    case "groupRequired":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        var firstOfGroup = form.find(classGroup).eq(0);
                        if (firstOfGroup[0] != field[0]) {
                            methods._validateField(firstOfGroup, options, skipAjaxValidation);
                            options.showArrow = true;
                        }
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._groupRequired);
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "ajax":
                        errorMsg = methods._ajax(field, rules, i, options);
                        if (errorMsg) {
                            promptType = "load";
                        }
                        break;
                    case "minSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minSize);
                        break;
                    case "maxSize":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxSize);
                        break;
                    case "min":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._min);
                        break;
                    case "max":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._max);
                        break;
                    case "past":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._past);
                        break;
                    case "future":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._future);
                        break;
                    case "dateRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "dateTimeRange":
                        var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
                        options.firstOfGroup = form.find(classGroup).eq(0);
                        options.secondOfGroup = form.find(classGroup).eq(1);
                        if (options.firstOfGroup[0].value || options.secondOfGroup[0].value) {
                            errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._dateTimeRange);
                        }
                        if (errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "maxCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._maxCheckbox);
                        break;
                    case "minCheckbox":
                        field = $(form.find("input[name='" + fieldName + "']"));
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._minCheckbox);
                        break;
                    case "equals":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._equals);
                        break;
                    case "funcCall":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._funcCall);
                        break;
                    case "creditCard":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._creditCard);
                        break;
                    case "condRequired":
                        errorMsg = methods._getErrorMessage(form, field, rules[i], rules, i, options, methods._condRequired);
                        if (errorMsg !== undefined) {
                            required = true;
                        }
                        break;
                    default:
                }
                var end_validation = false;
                if (typeof errorMsg == "object") {
                    switch (errorMsg.status) {
                        case "_break":
                            end_validation = true;
                            break;
                        case "_error":
                            errorMsg = errorMsg.message;
                            break;
                        case "_error_no_prompt":
                            return true;
                            break;
                        default:
                            break;
                    }
                }
                if (end_validation) {
                    break;
                }
                if (typeof errorMsg == 'string') {
                    promptText += errorMsg + "<br/>";
                    options.isError = true;
                    field_errors++;
                }
            }
            if (!required && !(field.val()) && field.val().length < 1) options.isError = false;
            var fieldType = field.prop("type");
            var positionType = field.data("promptPosition") || options.promptPosition;
            if ((fieldType == "radio" || fieldType == "checkbox") && form.find("input[name='" + fieldName + "']").size() > 1) {
                if (positionType === 'inline') {
                    field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:last"));
                } else {
                    field = $(form.find("input[name='" + fieldName + "'][type!=hidden]:first"));
                }
                options.showArrow = false;
            }
            if (field.is(":hidden") && options.prettySelect) {
                field = form.find("#" + options.usePrefix + methods._jqSelector(field.attr('id')) + options.useSuffix);
            }
            if (options.isError && options.showPrompts) {
                methods._showPrompt(field, promptText, promptType, false, options);
            } else {
                if (!isAjaxValidator) methods._closePrompt(field);
            }
            if (!isAjaxValidator) {
                field.trigger("jqv.field.result", [field, options.isError, promptText]);
            }
            var errindex = $.inArray(field[0], options.InvalidFields);
            if (errindex == -1) {
                if (options.isError)
                    options.InvalidFields.push(field[0]);
            } else if (!options.isError) {
                options.InvalidFields.splice(errindex, 1);
            }
            methods._handleStatusCssClasses(field, options);
            if (options.isError && options.onFieldFailure)
                options.onFieldFailure(field);
            if (!options.isError && options.onFieldSuccess)
                options.onFieldSuccess(field);
            return options.isError;
        },
        _handleStatusCssClasses: function(field, options) {
            if (options.addSuccessCssClassToField)
                field.removeClass(options.addSuccessCssClassToField);
            if (options.addFailureCssClassToField)
                field.removeClass(options.addFailureCssClassToField);
            if (options.addSuccessCssClassToField && !options.isError)
                field.addClass(options.addSuccessCssClassToField);
            if (options.addFailureCssClassToField && options.isError)
                field.addClass(options.addFailureCssClassToField);
        },
        _getErrorMessage: function(form, field, rule, rules, i, options, originalValidationMethod) {
            var rule_index = jQuery.inArray(rule, rules);
            if (rule === "custom" || rule === "funcCall") {
                var custom_validation_type = rules[rule_index + 1];
                rule = rule + "[" + custom_validation_type + "]";
                delete(rules[rule_index]);
            }
            var alteredRule = rule;
            var element_classes = (field.attr("data-validation-engine")) ? field.attr("data-validation-engine") : field.attr("class");
            var element_classes_array = element_classes.split(" ");
            var errorMsg;
            if (rule == "future" || rule == "past" || rule == "maxCheckbox" || rule == "minCheckbox") {
                errorMsg = originalValidationMethod(form, field, rules, i, options);
            } else {
                errorMsg = originalValidationMethod(field, rules, i, options);
            }
            if (errorMsg != undefined) {
                var custom_message = methods._getCustomErrorMessage($(field), element_classes_array, alteredRule, options);
                if (custom_message) errorMsg = custom_message;
            }
            return errorMsg;
        },
        _getCustomErrorMessage: function(field, classes, rule, options) {
            var custom_message = false;
            var validityProp = methods._validityProp[rule];
            if (validityProp != undefined) {
                custom_message = field.attr("data-errormessage-" + validityProp);
                if (custom_message != undefined)
                    return custom_message;
            }
            custom_message = field.attr("data-errormessage");
            if (custom_message != undefined)
                return custom_message;
            var id = '#' + field.attr("id");
            if (typeof options.custom_error_messages[id] != "undefined" && typeof options.custom_error_messages[id][rule] != "undefined") {
                custom_message = options.custom_error_messages[id][rule]['message'];
            } else if (classes.length > 0) {
                for (var i = 0; i < classes.length && classes.length > 0; i++) {
                    var element_class = "." + classes[i];
                    if (typeof options.custom_error_messages[element_class] != "undefined" && typeof options.custom_error_messages[element_class][rule] != "undefined") {
                        custom_message = options.custom_error_messages[element_class][rule]['message'];
                        break;
                    }
                }
            }
            if (!custom_message && typeof options.custom_error_messages[rule] != "undefined" && typeof options.custom_error_messages[rule]['message'] != "undefined") {
                custom_message = options.custom_error_messages[rule]['message'];
            }
            return custom_message;
        },
        _validityProp: {
            "required": "value-missing",
            "custom": "custom-error",
            "groupRequired": "value-missing",
            "ajax": "custom-error",
            "minSize": "range-underflow",
            "maxSize": "range-overflow",
            "min": "range-underflow",
            "max": "range-overflow",
            "past": "type-mismatch",
            "future": "type-mismatch",
            "dateRange": "type-mismatch",
            "dateTimeRange": "type-mismatch",
            "maxCheckbox": "range-overflow",
            "minCheckbox": "range-underflow",
            "equals": "pattern-mismatch",
            "funcCall": "custom-error",
            "creditCard": "pattern-mismatch",
            "condRequired": "value-missing"
        },
        _required: function(field, rules, i, options, condRequired) {
            switch (field.prop("type")) {
                case "text":
                case "password":
                case "textarea":
                case "file":
                case "select-one":
                case "select-multiple":
                default:
                    var field_val = $.trim(field.val());
                    var dv_placeholder = $.trim(field.attr("data-validation-placeholder"));
                    var placeholder = $.trim(field.attr("placeholder"));
                    if ((!field_val) || (dv_placeholder && field_val == dv_placeholder) || (placeholder && field_val == placeholder)) {
                        return options.allrules[rules[i]].alertText;
                    }
                    break;
                case "radio":
                case "checkbox":
                    if (condRequired) {
                        if (!field.attr('checked')) {
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                        }
                        break;
                    }
                    var form = field.closest("form, .validationEngineContainer");
                    var name = field.attr("name");
                    if (form.find("input[name='" + name + "']:checked").size() == 0) {
                        if (form.find("input[name='" + name + "']:visible").size() == 1)
                            return options.allrules[rules[i]].alertTextCheckboxe;
                        else
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                    }
                    break;
            }
        },
        _groupRequired: function(field, rules, i, options) {
            var classGroup = "[" + options.validateAttribute + "*=" + rules[i + 1] + "]";
            var isValid = false;
            field.closest("form, .validationEngineContainer").find(classGroup).each(function() {
                if (!methods._required($(this), rules, i, options)) {
                    isValid = true;
                    return false;
                }
            });
            if (!isValid) {
                return options.allrules[rules[i]].alertText;
            }
        },
        _custom: function(field, rules, i, options) {
            var customRule = rules[i + 1];
            var rule = options.allrules[customRule];
            var fn;
            if (!rule) {
                alert("jqv:custom rule not found - " + customRule);
                return;
            }
            if (rule["regex"]) {
                var ex = rule.regex;
                if (!ex) {
                    alert("jqv:custom regex not found - " + customRule);
                    return;
                }
                var pattern = new RegExp(ex);
                if (!pattern.test(field.val())) return options.allrules[customRule].alertText;
            } else if (rule["func"]) {
                fn = rule["func"];
                if (typeof(fn) !== "function") {
                    alert("jqv:custom parameter 'function' is no function - " + customRule);
                    return;
                }
                if (!fn(field, rules, i, options))
                    return options.allrules[customRule].alertText;
            } else {
                alert("jqv:custom type not allowed " + customRule);
                return;
            }
        },
        _funcCall: function(field, rules, i, options) {
            var functionName = rules[i + 1];
            var fn;
            if (functionName.indexOf('.') > -1) {
                var namespaces = functionName.split('.');
                var scope = window;
                while (namespaces.length) {
                    scope = scope[namespaces.shift()];
                }
                fn = scope;
            } else
                fn = window[functionName] || options.customFunctions[functionName];
            if (typeof(fn) == 'function')
                return fn(field, rules, i, options);
        },
        _equals: function(field, rules, i, options) {
            var equalsField = rules[i + 1];
            if (field.val() != $("#" + equalsField).val())
                return options.allrules.equals.alertText;
        },
        _maxSize: function(field, rules, i, options) {
            var max = rules[i + 1];
            var len = field.val().length;
            if (len > max) {
                var rule = options.allrules.maxSize;
                return rule.alertText + max + rule.alertText2;
            }
        },
        _minSize: function(field, rules, i, options) {
            var min = rules[i + 1];
            var len = field.val().length;
            if (len < min) {
                var rule = options.allrules.minSize;
                return rule.alertText + min + rule.alertText2;
            }
        },
        _min: function(field, rules, i, options) {
            var min = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());
            if (len < min) {
                var rule = options.allrules.min;
                if (rule.alertText2) return rule.alertText + min + rule.alertText2;
                return rule.alertText + min;
            }
        },
        _max: function(field, rules, i, options) {
            var max = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());
            if (len > max) {
                var rule = options.allrules.max;
                if (rule.alertText2) return rule.alertText + max + rule.alertText2;
                return rule.alertText + max;
            }
        },
        _past: function(form, field, rules, i, options) {
            var p = rules[i + 1];
            var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var pdate;
            if (p.toLowerCase() == "now") {
                pdate = new Date();
            } else if (undefined != fieldAlt.val()) {
                if (fieldAlt.is(":disabled"))
                    return;
                pdate = methods._parseDate(fieldAlt.val());
            } else {
                pdate = methods._parseDate(p);
            }
            var vdate = methods._parseDate(field.val());
            if (vdate > pdate) {
                var rule = options.allrules.past;
                if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        _future: function(form, field, rules, i, options) {
            var p = rules[i + 1];
            var fieldAlt = $(form.find("input[name='" + p.replace(/^#+/, '') + "']"));
            var pdate;
            if (p.toLowerCase() == "now") {
                pdate = new Date();
            } else if (undefined != fieldAlt.val()) {
                if (fieldAlt.is(":disabled"))
                    return;
                pdate = methods._parseDate(fieldAlt.val());
            } else {
                pdate = methods._parseDate(p);
            }
            var vdate = methods._parseDate(field.val());
            if (vdate < pdate) {
                var rule = options.allrules.future;
                if (rule.alertText2)
                    return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        _isDate: function(value) {
            var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return dateRegEx.test(value);
        },
        _isDateTime: function(value) {
            var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return dateTimeRegEx.test(value);
        },
        _dateCompare: function(start, end) {
            return (new Date(start.toString()) < new Date(end.toString()));
        },
        _dateRange: function(field, rules, i, options) {
            if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            if (!methods._isDate(options.firstOfGroup[0].value) || !methods._isDate(options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
        },
        _dateTimeRange: function(field, rules, i, options) {
            if ((!options.firstOfGroup[0].value && options.secondOfGroup[0].value) || (options.firstOfGroup[0].value && !options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            if (!methods._isDateTime(options.firstOfGroup[0].value) || !methods._isDateTime(options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
            if (!methods._dateCompare(options.firstOfGroup[0].value, options.secondOfGroup[0].value)) {
                return options.allrules[rules[i]].alertText + options.allrules[rules[i]].alertText2;
            }
        },
        _maxCheckbox: function(form, field, rules, i, options) {
            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = form.find("input[name='" + groupname + "']:checked").size();
            if (groupSize > nbCheck) {
                options.showArrow = false;
                if (options.allrules.maxCheckbox.alertText2)
                    return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
                return options.allrules.maxCheckbox.alertText;
            }
        },
        _minCheckbox: function(form, field, rules, i, options) {
            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = form.find("input[name='" + groupname + "']:checked").size();
            if (groupSize < nbCheck) {
                options.showArrow = false;
                return options.allrules.minCheckbox.alertText + " " + nbCheck + " " + options.allrules.minCheckbox.alertText2;
            }
        },
        _creditCard: function(field, rules, i, options) {
            var valid = false,
                cardNumber = field.val().replace(/ +/g, '').replace(/-+/g, '');
            var numDigits = cardNumber.length;
            if (numDigits >= 14 && numDigits <= 16 && parseInt(cardNumber) > 0) {
                var sum = 0,
                    i = numDigits - 1,
                    pos = 1,
                    digit, luhn = new String();
                do {
                    digit = parseInt(cardNumber.charAt(i));
                    luhn += (pos++ % 2 == 0) ? digit * 2 : digit;
                } while (--i >= 0)
                for (i = 0; i < luhn.length; i++) {
                    sum += parseInt(luhn.charAt(i));
                }
                valid = sum % 10 == 0;
            }
            if (!valid) return options.allrules.creditCard.alertText;
        },
        _ajax: function(field, rules, i, options) {
            var errorSelector = rules[i + 1];
            var rule = options.allrules[errorSelector];
            var extraData = rule.extraData;
            var extraDataDynamic = rule.extraDataDynamic;
            var data = {
                "fieldId": field.attr("id"),
                "fieldValue": field.val()
            };
            if (typeof extraData === "object") {
                $.extend(data, extraData);
            } else if (typeof extraData === "string") {
                var tempData = extraData.split("&");
                for (var i = 0; i < tempData.length; i++) {
                    var values = tempData[i].split("=");
                    if (values[0] && values[0]) {
                        data[values[0]] = values[1];
                    }
                }
            }
            if (extraDataDynamic) {
                var tmpData = [];
                var domIds = String(extraDataDynamic).split(",");
                for (var i = 0; i < domIds.length; i++) {
                    var id = domIds[i];
                    if ($(id).length) {
                        var inputValue = field.closest("form, .validationEngineContainer").find(id).val();
                        var keyValue = id.replace('#', '') + '=' + escape(inputValue);
                        data[id.replace('#', '')] = inputValue;
                    }
                }
            }
            if (options.eventTrigger == "field") {
                delete(options.ajaxValidCache[field.attr("id")]);
            }
            if (!options.isError && !methods._checkAjaxFieldStatus(field.attr("id"), options)) {
                $.ajax({
                    type: options.ajaxFormValidationMethod,
                    url: rule.url,
                    cache: false,
                    dataType: "json",
                    data: data,
                    field: field,
                    rule: rule,
                    methods: methods,
                    options: options,
                    beforeSend: function() {},
                    error: function(data, transport) {
                        methods._ajaxError(data, transport);
                    },
                    success: function(json) {
                        var errorFieldId = json[0];
                        var errorField = $("#" + errorFieldId).eq(0);
                        if (errorField.length == 1) {
                            var status = json[1];
                            var msg = json[2];
                            if (!status) {
                                options.ajaxValidCache[errorFieldId] = false;
                                options.isError = true;
                                if (msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt) {
                                            msg = txt;
                                        }
                                    }
                                } else
                                    msg = rule.alertText;
                                if (options.showPrompts) methods._showPrompt(errorField, msg, "", true, options);
                            } else {
                                options.ajaxValidCache[errorFieldId] = true;
                                if (msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertTextOk;
                                        if (txt) {
                                            msg = txt;
                                        }
                                    }
                                } else
                                    msg = rule.alertTextOk;
                                if (options.showPrompts) {
                                    if (msg)
                                        methods._showPrompt(errorField, msg, "pass", true, options);
                                    else
                                        methods._closePrompt(errorField);
                                }
                                if (options.eventTrigger == "submit")
                                    field.closest("form").submit();
                            }
                        }
                        errorField.trigger("jqv.field.result", [errorField, options.isError, msg]);
                    }
                });
                return rule.alertTextLoad;
            }
        },
        _ajaxError: function(data, transport) {
            if (data.status == 0 && transport == null)
                alert("The page is not served from a server! ajax call failed");
            else if (typeof console != "undefined")
                console.log("Ajax error: " + data.status + " " + transport);
        },
        _dateToString: function(date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        },
        _parseDate: function(d) {
            var dateParts = d.split("-");
            if (dateParts == d)
                dateParts = d.split("/");
            if (dateParts == d) {
                dateParts = d.split(".");
                return new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
            }
            return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
        },
        _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
            var prompt = methods._getPrompt(field);
            if (ajaxform) prompt = false;
            if ($.trim(promptText)) {
                if (prompt)
                    methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
                else
                    methods._buildPrompt(field, promptText, type, ajaxed, options);
            }
        },
        _buildPrompt: function(field, promptText, type, ajaxed, options) {
            var prompt = $('<div>');
            prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
            prompt.addClass("parentForm" + methods._getClassName(field.closest('form, .validationEngineContainer').attr("id")));
            prompt.addClass("formError");
            switch (type) {
                case "pass":
                    prompt.addClass("greenPopup");
                    break;
                case "load":
                    prompt.addClass("blackPopup");
                    break;
                default:
            }
            if (ajaxed)
                prompt.addClass("ajaxed");
            var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);
            var positionType = field.data("promptPosition") || options.promptPosition;
            if (options.showArrow) {
                var arrow = $('<div>').addClass("formErrorArrow");
                if (typeof(positionType) == 'string') {
                    var pos = positionType.indexOf(":");
                    if (pos != -1)
                        positionType = positionType.substring(0, pos);
                }
                switch (positionType) {
                    case "bottomLeft":
                    case "bottomRight":
                        prompt.find(".formErrorContent").before(arrow);
                        arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case "topLeft":
                    case "topRight":
                        arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        prompt.append(arrow);
                        break;
                }
            }
            if (options.addPromptClass)
                prompt.addClass(options.addPromptClass);
            var requiredOverride = field.attr('data-required-class');
            if (requiredOverride !== undefined) {
                prompt.addClass(requiredOverride);
            } else {
                if (options.prettySelect) {
                    if ($('#' + field.attr('id')).next().is('select')) {
                        var prettyOverrideClass = $('#' + field.attr('id').substr(options.usePrefix.length).substring(options.useSuffix.length)).attr('data-required-class');
                        if (prettyOverrideClass !== undefined) {
                            prompt.addClass(prettyOverrideClass);
                        }
                    }
                }
            }
            prompt.css({
                "opacity": 0
            });
            if (positionType === 'inline') {
                prompt.addClass("inline");
                if (typeof field.attr('data-prompt-target') !== 'undefined' && $('#' + field.attr('data-prompt-target')).length > 0) {
                    prompt.appendTo($('#' + field.attr('data-prompt-target')));
                } else {
                    field.after(prompt);
                }
            } else {
                field.before(prompt);
            }
            var pos = methods._calculatePosition(field, prompt, options);
            prompt.css({
                'position': positionType === 'inline' ? 'relative' : 'absolute',
                "top": pos.callerTopPosition,
                "left": pos.callerleftPosition,
                "marginTop": pos.marginTopSize,
                "opacity": 0
            }).data("callerField", field);
            if (options.autoHidePrompt) {
                setTimeout(function() {
                    prompt.animate({
                        "opacity": 0
                    }, function() {
                        prompt.closest('.formErrorOuter').remove();
                        prompt.remove();
                    });
                }, options.autoHideDelay);
            }
            return prompt.animate({
                "opacity": 0.87
            });
        },
        _updatePrompt: function(field, prompt, promptText, type, ajaxed, options, noAnimation) {
            if (prompt) {
                if (typeof type !== "undefined") {
                    if (type == "pass")
                        prompt.addClass("greenPopup");
                    else
                        prompt.removeClass("greenPopup");
                    if (type == "load")
                        prompt.addClass("blackPopup");
                    else
                        prompt.removeClass("blackPopup");
                }
                if (ajaxed)
                    prompt.addClass("ajaxed");
                else
                    prompt.removeClass("ajaxed");
                prompt.find(".formErrorContent").html(promptText);
                var pos = methods._calculatePosition(field, prompt, options);
                var css = {
                    "top": pos.callerTopPosition,
                    "left": pos.callerleftPosition,
                    "marginTop": pos.marginTopSize
                };
                if (noAnimation)
                    prompt.css(css);
                else
                    prompt.animate(css);
            }
        },
        _closePrompt: function(field) {
            var prompt = methods._getPrompt(field);
            if (prompt)
                prompt.fadeTo("fast", 0, function() {
                    prompt.parent('.formErrorOuter').remove();
                    prompt.remove();
                });
        },
        closePrompt: function(field) {
            return methods._closePrompt(field);
        },
        _getPrompt: function(field) {
            var formId = $(field).closest('form, .validationEngineContainer').attr('id');
            var className = methods._getClassName(field.attr("id")) + "formError";
            var match = $("." + methods._escapeExpression(className) + '.parentForm' + formId)[0];
            if (match)
                return $(match);
        },
        _escapeExpression: function(selector) {
            return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
        },
        isRTL: function(field) {
            var $document = $(document);
            var $body = $('body');
            var rtl = (field && field.hasClass('rtl')) || (field && (field.attr('dir') || '').toLowerCase() === 'rtl') || $document.hasClass('rtl') || ($document.attr('dir') || '').toLowerCase() === 'rtl' || $body.hasClass('rtl') || ($body.attr('dir') || '').toLowerCase() === 'rtl';
            return Boolean(rtl);
        },
        _calculatePosition: function(field, promptElmt, options) {
            var promptTopPosition, promptleftPosition, marginTopSize;
            var fieldWidth = field.width();
            var fieldLeft = field.position().left;
            var fieldTop = field.position().top;
            var fieldHeight = field.height();
            var promptHeight = promptElmt.height();
            promptTopPosition = promptleftPosition = 0;
            marginTopSize = -promptHeight;
            var positionType = field.data("promptPosition") || options.promptPosition;
            var shift1 = "";
            var shift2 = "";
            var shiftX = 0;
            var shiftY = 0;
            if (typeof(positionType) == 'string') {
                if (positionType.indexOf(":") != -1) {
                    shift1 = positionType.substring(positionType.indexOf(":") + 1);
                    positionType = positionType.substring(0, positionType.indexOf(":"));
                    if (shift1.indexOf(",") != -1) {
                        shift2 = shift1.substring(shift1.indexOf(",") + 1);
                        shift1 = shift1.substring(0, shift1.indexOf(","));
                        shiftY = parseInt(shift2);
                        if (isNaN(shiftY)) shiftY = 0;
                    };
                    shiftX = parseInt(shift1);
                    if (isNaN(shift1)) shift1 = 0;
                };
            };
            switch (positionType) {
                default:
                    case "topRight":
                    promptleftPosition += fieldLeft + fieldWidth - 30;promptTopPosition += fieldTop;
                break;
                case "topLeft":
                        promptTopPosition += fieldTop;promptleftPosition += fieldLeft;
                    break;
                case "centerRight":
                        promptTopPosition = fieldTop + 4;marginTopSize = 0;promptleftPosition = fieldLeft + field.outerWidth(true) + 5;
                    break;
                case "centerLeft":
                        promptleftPosition = fieldLeft - (promptElmt.width() + 2);promptTopPosition = fieldTop + 4;marginTopSize = 0;
                    break;
                case "bottomLeft":
                        promptTopPosition = fieldTop + field.height() + 5;marginTopSize = 0;promptleftPosition = fieldLeft;
                    break;
                case "bottomRight":
                        promptleftPosition = fieldLeft + fieldWidth - 30;promptTopPosition = fieldTop + field.height() + 5;marginTopSize = 0;
                    break;
                case "inline":
                        promptleftPosition = 0;promptTopPosition = 0;marginTopSize = 0;
            };
            promptleftPosition += shiftX;
            promptTopPosition += shiftY;
            return {
                "callerTopPosition": promptTopPosition + "px",
                "callerleftPosition": promptleftPosition + "px",
                "marginTopSize": marginTopSize + "px"
            };
        },
        _saveOptions: function(form, options) {
            if ($.validationEngineLanguage)
                var allRules = $.validationEngineLanguage.allRules;
            else
                $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
            $.validationEngine.defaults.allrules = allRules;
            var userOptions = $.extend(true, {}, $.validationEngine.defaults, options);
            form.data('jqv', userOptions);
            return userOptions;
        },
        _getClassName: function(className) {
            if (className)
                return className.replace(/:/g, "_").replace(/\./g, "_");
        },
        _jqSelector: function(str) {
            return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
        },
        _condRequired: function(field, rules, i, options) {
            var idx, dependingField;
            for (idx = (i + 1); idx < rules.length; idx++) {
                dependingField = jQuery("#" + rules[idx]).first();
                if (dependingField.length && methods._required(dependingField, ["required"], 0, options, true) == undefined) {
                    return methods._required(field, ["required"], 0, options);
                }
            }
        },
        _submitButtonClick: function(event) {
            var button = $(this);
            var form = button.closest('form, .validationEngineContainer');
            form.data("jqv_submitButton", button.attr("id"));
        }
    };
    $.fn.validationEngine = function(method) {
        var form = $(this);
        if (!form[0]) return form;
        if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {
            if (method != "showPrompt" && method != "hide" && method != "hideAll")
                methods.init.apply(form);
            return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            methods.init.apply(form, arguments);
            return methods.attach.apply(form);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.validationEngine');
        }
    };
    $.validationEngine = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: "blur",
            scroll: true,
            focusFirstField: true,
            showPrompts: true,
            validateNonVisibleFields: false,
            promptPosition: "topRight",
            bindMethod: "bind",
            inlineAjax: false,
            ajaxFormValidation: false,
            ajaxFormValidationURL: false,
            ajaxFormValidationMethod: 'get',
            onAjaxFormComplete: $.noop,
            onBeforeAjaxFormValidation: $.noop,
            onValidationComplete: false,
            doNotShowAllErrosOnSubmit: false,
            custom_error_messages: {},
            binded: true,
            showArrow: true,
            isError: false,
            maxErrorsPerField: false,
            ajaxValidCache: {},
            autoPositionUpdate: false,
            InvalidFields: [],
            onFieldSuccess: false,
            onFieldFailure: false,
            onSuccess: false,
            onFailure: false,
            validateAttribute: "class",
            addSuccessCssClassToField: "",
            addFailureCssClassToField: "",
            autoHidePrompt: false,
            autoHideDelay: 10000,
            fadeDuration: 0.3,
            prettySelect: false,
            addPromptClass: "",
            usePrefix: "",
            useSuffix: "",
            showOneMessage: false
        }
    };
    $(function() {
        $.validationEngine.defaults.promptPosition = methods.isRTL() ? 'topLeft' : "topRight"
    });
})(jQuery);

(function($) {
    $.fn.validationEngineLanguage = function() {};
    $.validationEngineLanguage = {
        newLang: function() {
            $.validationEngineLanguage.allRules = {
                "required": {
                    "regex": "none",
                    "alertText": "* This field is required",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "requiredInFunction": {
                    "func": function(field, rules, i, options) {
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Range"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minimum ",
                    "alertText2": " characters required"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " characters allowed"
                },
                "groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minimum value is "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maximum value is "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " options allowed"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Please select ",
                    "alertText2": " options"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Fields do not match"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
                    "regex": /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    "alertText": "* Invalid phone number"
                },
                "email": {
                    "regex": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "alertText": "* Invalid email address"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Not a valid integer"
                },
                "number": {
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* Invalid floating decimal number"
                },
                "date": {
                    "func": function(field) {
                        var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
                        var match = pattern.exec(field.val());
                        if (match == null)
                            return false;
                        var year = match[1];
                        var month = match[2] * 1;
                        var day = match[3] * 1;
                        var date = new Date(year, month - 1, day);
                        return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
                    },
                    "alertText": "* Invalid date, must be in YYYY-MM-DD format"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Numbers only"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Letters only"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "* No special characters allowed"
                },
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    "extraData": "name=eric",
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    "url": "ajaxValidateFieldName",
                    "alertText": "* This name is already taken",
                    "alertTextOk": "* This name is available",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCallPhp": {
                    "url": "phpajax/ajaxValidateFieldName.php",
                    "alertText": "* This name is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },
                "dateFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
                "dateTimeFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ",
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
                }
            };
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);

(function() {
    var root = this;
    var previousUnderscore = root._;
    var breaker = {};
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    _.VERSION = '1.4.3';
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (_.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function(value, index, list) {
            results[results.length] = iterator.call(context, value, index, list);
        });
        return results;
    };
    var reduceError = 'Reduce of empty array with no initial value';
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function(value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else {
                memo = iterator.call(context, memo, obj[index], index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };
    _.find = _.detect = function(obj, iterator, context) {
        var result;
        any(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };
    _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
        each(obj, function(value, index, list) {
            if (iterator.call(context, value, index, list)) results[results.length] = value;
        });
        return results;
    };
    _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list);
        }, context);
    };
    _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
        each(obj, function(value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
        each(obj, function(value, index, list) {
            if (result || (result = iterator.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };
    _.contains = _.include = function(obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function(value) {
            return value === target;
        });
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        return _.map(obj, function(value) {
            return (_.isFunction(method) ? method : value[method]).apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key];
        });
    };
    _.where = function(obj, attrs) {
        if (_.isEmpty(attrs)) return [];
        return _.filter(obj, function(value) {
            for (var key in attrs) {
                if (attrs[key] !== value[key]) return false;
            }
            return true;
        });
    };
    _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.max.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return -Infinity;
        var result = {
            computed: -Infinity,
            value: -Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
            return Math.min.apply(Math, obj);
        }
        if (!iterator && _.isEmpty(obj)) return Infinity;
        var result = {
            computed: Infinity,
            value: Infinity
        };
        each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed < result.computed && (result = {
                value: value,
                computed: computed
            });
        });
        return result.value;
    };
    _.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function(value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value];
        };
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index < right.index ? -1 : 1;
        }), 'value');
    };
    var group = function(obj, value, context, behavior) {
        var result = {};
        var iterator = lookupIterator(value || _.identity);
        each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value);
        });
        return result;
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
        });
    };
    _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
            if (!_.has(result, key)) result[key] = 0;
            result[key]++;
        });
    };
    _.sortedIndex = function(array, obj, iterator, context) {
        iterator = iterator == null ? _.identity : lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0,
            high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function(obj) {
        if (obj == null) return 0;
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
    };
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };
    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if ((n != null) && !guard) {
            return slice.call(array, Math.max(array.length - n, 0));
        } else {
            return array[array.length - 1];
        }
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, output) {
        each(input, function(value) {
            if (_.isArray(value)) {
                shallow ? push.apply(output, value) : flatten(value, shallow, output);
            } else {
                output.push(value);
            }
        });
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, []);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iterator, context) {
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var initial = iterator ? _.map(array, iterator, context) : array;
        var results = [];
        var seen = [];
        each(initial, function(value, index) {
            if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
                seen.push(value);
                results.push(array[index]);
            }
        });
        return results;
    };
    _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments));
    };
    _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0;
            });
        });
    };
    _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        var args = slice.call(arguments);
        var length = _.max(_.pluck(args, 'length'));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(args, "" + i);
        }
        return results;
    };
    _.object = function(list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, l = list.length; i < l; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };
    _.indexOf = function(array, item, isSorted) {
        if (array == null) return -1;
        var i = 0,
            l = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < l; i++)
            if (array[i] === item) return i;
        return -1;
    };
    _.lastIndexOf = function(array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--)
            if (array[i] === item) return i;
        return -1;
    };
    _.range = function(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;
        var len = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(len);
        while (idx < len) {
            range[idx++] = start;
            start += step;
        }
        return range;
    };
    var ctor = function() {};
    _.bind = function(func, context) {
        var args, bound;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };
    _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length == 0) funcs = _.functions(obj);
        each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };
    _.throttle = function(func, wait) {
        var context, args, timeout, result;
        var previous = 0;
        var later = function() {
            previous = new Date;
            timeout = null;
            result = func.apply(context, args);
        };
        return function() {
            var now = new Date;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    };
    _.once = function(func) {
        var ran = false,
            memo;
        return function() {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };
    _.wrap = function(func, wrapper) {
        return function() {
            var args = [func];
            push.apply(args, arguments);
            return wrapper.apply(this, args);
        };
    };
    _.compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };
    _.after = function(times, func) {
        if (times <= 0) return func();
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError('Invalid object');
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys[keys.length] = key;
        return keys;
    };
    _.values = function(obj) {
        var values = [];
        for (var key in obj)
            if (_.has(obj, key)) values.push(obj[key]);
        return values;
    };
    _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj)
            if (_.has(obj, key)) pairs.push([key, obj[key]]);
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        for (var key in obj)
            if (_.has(obj, key)) result[obj[key]] = key;
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        each(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    _.omit = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) {
            if (!_.contains(keys, key)) copy[key] = obj[key];
        }
        return copy;
    };
    _.defaults = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] == null) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            case '[object String]':
                return a == String(b);
            case '[object Number]':
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case '[object Date]':
            case '[object Boolean]':
                return +a == +b;
            case '[object RegExp]':
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        var length = aStack.length;
        while (length--) {
            if (aStack[length] == a) return bStack[length] == b;
        }
        aStack.push(a);
        bStack.push(b);
        var size = 0,
            result = true;
        if (className == '[object Array]') {
            size = a.length;
            result = size == b.length;
            if (result) {
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) && _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
                return false;
            }
            for (var key in a) {
                if (_.has(a, key)) {
                    size++;
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !(size--)) break;
                }
                result = !size;
            }
        }
        aStack.pop();
        bStack.pop();
        return result;
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], []);
    };
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj)
            if (_.has(obj, key)) return false;
        return true;
    };
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) == '[object Array]';
    };
    _.isObject = function(obj) {
        return obj === Object(obj);
    };
    each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return !!(obj && _.has(obj, 'callee'));
        };
    }
    if (typeof(/./) !== 'function') {
        _.isFunction = function(obj) {
            return typeof obj === 'function';
        };
    }
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj;
    };
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };
    _.isNull = function(obj) {
        return obj === null;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.times = function(n, iterator, context) {
        var accum = Array(n);
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
    };
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + (0 | Math.random() * (max - min + 1));
    };
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };
    _.each(['escape', 'unescape'], function(method) {
        _[method] = function(string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match];
            });
        };
    });
    _.result = function(object, property) {
        if (object == null) return null;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };
    _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = '' + (++idCounter);
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = new RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, function(match) {
                return '\\' + escapes[match];
            });
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";
        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _);
        };
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
        return template;
    };
    _.chain = function(obj) {
        return _(obj).chain();
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj;
    };
    _.mixin(_);
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });
    each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });
    _.extend(_.prototype, {
        chain: function() {
            this._chain = true;
            return this;
        },
        value: function() {
            return this._wrapped;
        }
    });
}).call(this);

(function() {
    var root = this;
    var previousBackbone = root.Backbone;
    var array = [];
    var push = array.push;
    var slice = array.slice;
    var splice = array.splice;
    var Backbone;
    if (typeof exports !== 'undefined') {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }
    Backbone.VERSION = '0.9.10';
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');
    Backbone.$ = root.jQuery || root.Zepto || root.ender;
    Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
    };
    Backbone.emulateHTTP = false;
    Backbone.emulateJSON = false;
    var eventSplitter = /\s+/;
    var eventsApi = function(obj, action, name, rest) {
        if (!name) return true;
        if (typeof name === 'object') {
            for (var key in name) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
        } else if (eventSplitter.test(name)) {
            var names = name.split(eventSplitter);
            for (var i = 0, l = names.length; i < l; i++) {
                obj[action].apply(obj, [names[i]].concat(rest));
            }
        } else {
            return true;
        }
    };
    var triggerEvents = function(events, args) {
        var ev, i = -1,
            l = events.length;
        switch (args.length) {
            case 0:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx);
                return;
            case 1:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, args[0]);
                return;
            case 2:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
                return;
            case 3:
                while (++i < l)(ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
                return;
            default:
                while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
        }
    };
    var Events = Backbone.Events = {
        on: function(name, callback, context) {
            if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
            this._events || (this._events = {});
            var list = this._events[name] || (this._events[name] = []);
            list.push({
                callback: callback,
                context: context,
                ctx: context || this
            });
            return this;
        },
        once: function(name, callback, context) {
            if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
            var self = this;
            var once = _.once(function() {
                self.off(name, once);
                callback.apply(this, arguments);
            });
            once._callback = callback;
            this.on(name, once, context);
            return this;
        },
        off: function(name, callback, context) {
            var list, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
            if (!name && !callback && !context) {
                this._events = {};
                return this;
            }
            names = name ? [name] : _.keys(this._events);
            for (i = 0, l = names.length; i < l; i++) {
                name = names[i];
                if (list = this._events[name]) {
                    events = [];
                    if (callback || context) {
                        for (j = 0, k = list.length; j < k; j++) {
                            ev = list[j];
                            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
                                events.push(ev);
                            }
                        }
                    }
                    this._events[name] = events;
                }
            }
            return this;
        },
        trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', name, args)) return this;
            var events = this._events[name];
            var allEvents = this._events.all;
            if (events) triggerEvents(events, args);
            if (allEvents) triggerEvents(allEvents, arguments);
            return this;
        },
        listenTo: function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {});
            var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
            listeners[id] = obj;
            obj.on(name, typeof name === 'object' ? this : callback, this);
            return this;
        },
        stopListening: function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return;
            if (obj) {
                obj.off(name, typeof name === 'object' ? this : callback, this);
                if (!name && !callback) delete listeners[obj._listenerId];
            } else {
                if (typeof name === 'object') callback = this;
                for (var id in listeners) {
                    listeners[id].off(name, callback, this);
                }
                this._listeners = {};
            }
            return this;
        }
    };
    Events.bind = Events.on;
    Events.unbind = Events.off;
    _.extend(Backbone, Events);
    var Model = Backbone.Model = function(attributes, options) {
        var defaults;
        var attrs = attributes || {};
        this.cid = _.uniqueId('c');
        this.attributes = {};
        if (options && options.collection) this.collection = options.collection;
        if (options && options.parse) attrs = this.parse(attrs, options) || {};
        if (defaults = _.result(this, 'defaults')) {
            attrs = _.defaults({}, attrs, defaults);
        }
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };
    _.extend(Model.prototype, Events, {
        changed: null,
        idAttribute: 'id',
        initialize: function() {},
        toJSON: function(options) {
            return _.clone(this.attributes);
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        get: function(attr) {
            return this.attributes[attr];
        },
        escape: function(attr) {
            return _.escape(this.get(attr));
        },
        has: function(attr) {
            return this.get(attr) != null;
        },
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (key == null) return this;
            if (typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            options || (options = {});
            if (!this._validate(attrs, options)) return false;
            unset = options.unset;
            silent = options.silent;
            changes = [];
            changing = this._changing;
            this._changing = true;
            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];
            for (attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(current[attr], val)) changes.push(attr);
                if (!_.isEqual(prev[attr], val)) {
                    this.changed[attr] = val;
                } else {
                    delete this.changed[attr];
                }
                unset ? delete current[attr] : current[attr] = val;
            }
            if (!silent) {
                if (changes.length) this._pending = true;
                for (var i = 0, l = changes.length; i < l; i++) {
                    this.trigger('change:' + changes[i], this, current[changes[i]], options);
                }
            }
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: true
            }));
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: true
            }));
        },
        hasChanged: function(attr) {
            if (attr == null) return !_.isEmpty(this.changed);
            return _.has(this.changed, attr);
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
            var val, changed = false;
            var old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], (val = diff[attr]))) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },
        previous: function(attr) {
            if (attr == null || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            options.success = function(model, resp, options) {
                if (!model.set(model.parse(resp, options), options)) return false;
                if (success) success(model, resp, options);
            };
            return this.sync('read', this, options);
        },
        save: function(key, val, options) {
            var attrs, success, method, xhr, attributes = this.attributes;
            if (key == null || typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }
            if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;
            options = _.extend({
                validate: true
            }, options);
            if (!this._validate(attrs, options)) return false;
            if (attrs && options.wait) {
                this.attributes = _.extend({}, attributes, attrs);
            }
            if (options.parse === void 0) options.parse = true;
            success = options.success;
            options.success = function(model, resp, options) {
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                    return false;
                }
                if (success) success(model, resp, options);
            };
            method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
            if (method === 'patch') options.attrs = attrs;
            xhr = this.sync(method, this, options);
            if (attrs && options.wait) this.attributes = attributes;
            return xhr;
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            var destroy = function() {
                model.trigger('destroy', model, model.collection, options);
            };
            options.success = function(model, resp, options) {
                if (options.wait || model.isNew()) destroy();
                if (success) success(model, resp, options);
            };
            if (this.isNew()) {
                options.success(this, null, options);
                return false;
            }
            var xhr = this.sync('delete', this, options);
            if (!options.wait) destroy();
            return xhr;
        },
        url: function() {
            var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return this.id == null;
        },
        isValid: function(options) {
            return !this.validate || !this.validate(this.attributes, options);
        },
        _validate: function(attrs, options) {
            if (!options.validate || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            if (!error) return true;
            this.trigger('invalid', this, error, options || {});
            return false;
        }
    });
    var Collection = Backbone.Collection = function(models, options) {
        options || (options = {});
        if (options.model) this.model = options.model;
        if (options.comparator !== void 0) this.comparator = options.comparator;
        this.models = [];
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, _.extend({
            silent: true
        }, options));
    };
    _.extend(Collection.prototype, Events, {
        model: Model,
        initialize: function() {},
        toJSON: function(options) {
            return this.map(function(model) {
                return model.toJSON(options);
            });
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments);
        },
        add: function(models, options) {
            models = _.isArray(models) ? models.slice() : [models];
            options || (options = {});
            var i, l, model, attrs, existing, doSort, add, at, sort, sortAttr;
            add = [];
            at = options.at;
            sort = this.comparator && (at == null) && options.sort != false;
            sortAttr = _.isString(this.comparator) ? this.comparator : null;
            for (i = 0, l = models.length; i < l; i++) {
                if (!(model = this._prepareModel(attrs = models[i], options))) {
                    this.trigger('invalid', this, attrs, options);
                    continue;
                }
                if (existing = this.get(model)) {
                    if (options.merge) {
                        existing.set(attrs === model ? model.attributes : attrs, options);
                        if (sort && !doSort && existing.hasChanged(sortAttr)) doSort = true;
                    }
                    continue;
                }
                add.push(model);
                model.on('all', this._onModelEvent, this);
                this._byId[model.cid] = model;
                if (model.id != null) this._byId[model.id] = model;
            }
            if (add.length) {
                if (sort) doSort = true;
                this.length += add.length;
                if (at != null) {
                    splice.apply(this.models, [at, 0].concat(add));
                } else {
                    push.apply(this.models, add);
                }
            }
            if (doSort) this.sort({
                silent: true
            });
            if (options.silent) return this;
            for (i = 0, l = add.length; i < l; i++) {
                (model = add[i]).trigger('add', model, this, options);
            }
            if (doSort) this.trigger('sort', this, options);
            return this;
        },
        remove: function(models, options) {
            models = _.isArray(models) ? models.slice() : [models];
            options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; i < l; i++) {
                model = this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byId[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger('remove', model, this, options);
                }
                this._removeReference(model);
            }
            return this;
        },
        push: function(model, options) {
            model = this._prepareModel(model, options);
            this.add(model, _.extend({
                at: this.length
            }, options));
            return model;
        },
        pop: function(options) {
            var model = this.at(this.length - 1);
            this.remove(model, options);
            return model;
        },
        unshift: function(model, options) {
            model = this._prepareModel(model, options);
            this.add(model, _.extend({
                at: 0
            }, options));
            return model;
        },
        shift: function(options) {
            var model = this.at(0);
            this.remove(model, options);
            return model;
        },
        slice: function(begin, end) {
            return this.models.slice(begin, end);
        },
        get: function(obj) {
            if (obj == null) return void 0;
            this._idAttr || (this._idAttr = this.model.prototype.idAttribute);
            return this._byId[obj.id || obj.cid || obj[this._idAttr] || obj];
        },
        at: function(index) {
            return this.models[index];
        },
        where: function(attrs) {
            if (_.isEmpty(attrs)) return [];
            return this.filter(function(model) {
                for (var key in attrs) {
                    if (attrs[key] !== model.get(key)) return false;
                }
                return true;
            });
        },
        sort: function(options) {
            if (!this.comparator) {
                throw new Error('Cannot sort a set without a comparator');
            }
            options || (options = {});
            if (_.isString(this.comparator) || this.comparator.length === 1) {
                this.models = this.sortBy(this.comparator, this);
            } else {
                this.models.sort(_.bind(this.comparator, this));
            }
            if (!options.silent) this.trigger('sort', this, options);
            return this;
        },
        pluck: function(attr) {
            return _.invoke(this.models, 'get', attr);
        },
        update: function(models, options) {
            options = _.extend({
                add: true,
                merge: true,
                remove: true
            }, options);
            if (options.parse) models = this.parse(models, options);
            var model, i, l, existing;
            var add = [],
                remove = [],
                modelMap = {};
            if (!_.isArray(models)) models = models ? [models] : [];
            if (options.add && !options.remove) return this.add(models, options);
            for (i = 0, l = models.length; i < l; i++) {
                model = models[i];
                existing = this.get(model);
                if (options.remove && existing) modelMap[existing.cid] = true;
                if ((options.add && !existing) || (options.merge && existing)) {
                    add.push(model);
                }
            }
            if (options.remove) {
                for (i = 0, l = this.models.length; i < l; i++) {
                    model = this.models[i];
                    if (!modelMap[model.cid]) remove.push(model);
                }
            }
            if (remove.length) this.remove(remove, options);
            if (add.length) this.add(add, options);
            return this;
        },
        reset: function(models, options) {
            options || (options = {});
            if (options.parse) models = this.parse(models, options);
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i]);
            }
            options.previousModels = this.models.slice();
            this._reset();
            if (models) this.add(models, _.extend({
                silent: true
            }, options));
            if (!options.silent) this.trigger('reset', this, options);
            return this;
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === void 0) options.parse = true;
            var success = options.success;
            options.success = function(collection, resp, options) {
                var method = options.update ? 'update' : 'reset';
                collection[method](resp, options);
                if (success) success(collection, resp, options);
            };
            return this.sync('read', this, options);
        },
        create: function(model, options) {
            options = options ? _.clone(options) : {};
            if (!(model = this._prepareModel(model, options))) return false;
            if (!options.wait) this.add(model, options);
            var collection = this;
            var success = options.success;
            options.success = function(model, resp, options) {
                if (options.wait) collection.add(model, options);
                if (success) success(model, resp, options);
            };
            model.save(null, options);
            return model;
        },
        parse: function(resp, options) {
            return resp;
        },
        clone: function() {
            return new this.constructor(this.models);
        },
        _reset: function() {
            this.length = 0;
            this.models.length = 0;
            this._byId = {};
        },
        _prepareModel: function(attrs, options) {
            if (attrs instanceof Model) {
                if (!attrs.collection) attrs.collection = this;
                return attrs;
            }
            options || (options = {});
            options.collection = this;
            var model = new this.model(attrs, options);
            if (!model._validate(attrs, options)) return false;
            return model;
        },
        _removeReference: function(model) {
            if (this === model.collection) delete model.collection;
            model.off('all', this._onModelEvent, this);
        },
        _onModelEvent: function(event, model, collection, options) {
            if ((event === 'add' || event === 'remove') && collection !== this) return;
            if (event === 'destroy') this.remove(model, options);
            if (model && event === 'change:' + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                if (model.id != null) this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        },
        sortedIndex: function(model, value, context) {
            value || (value = this.comparator);
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _.sortedIndex(this.models, model, iterator, context);
        }
    });
    var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl', 'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest', 'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf', 'isEmpty', 'chain'];
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            args.unshift(this.models);
            return _[method].apply(_, args);
        };
    });
    var attributeMethods = ['groupBy', 'countBy', 'sortBy'];
    _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
            var iterator = _.isFunction(value) ? value : function(model) {
                return model.get(value);
            };
            return _[method](this.models, iterator, context);
        };
    });
    var Router = Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        initialize: function() {},
        route: function(route, name, callback) {
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (!callback) callback = this[name];
            Backbone.history.route(route, _.bind(function(fragment) {
                var args = this._extractParameters(route, fragment);
                callback && callback.apply(this, args);
                this.trigger.apply(this, ['route:' + name].concat(args));
                this.trigger('route', name, args);
                Backbone.history.trigger('route', this, name, args);
            }, this));
            return this;
        },
        navigate: function(fragment, options) {
            Backbone.history.navigate(fragment, options);
            return this;
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var route, routes = _.keys(this.routes);
            while ((route = routes.pop()) != null) {
                this.route(route, this.routes[route]);
            }
        },
        _routeToRegExp: function(route) {
            route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function(match, optional) {
                return optional ? match : '([^\/]+)';
            }).replace(splatParam, '(.*?)');
            return new RegExp('^' + route + '$');
        },
        _extractParameters: function(route, fragment) {
            return route.exec(fragment).slice(1);
        }
    });
    var History = Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
        if (typeof window !== 'undefined') {
            this.location = window.location;
            this.history = window.history;
        }
    };
    var routeStripper = /^[#\/]|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var isExplorer = /msie [\w.]+/;
    var trailingSlash = /\/$/;
    History.started = false;
    _.extend(History.prototype, Events, {
        interval: 50,
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : '';
        },
        getFragment: function(fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = this.location.pathname;
                    var root = this.root.replace(trailingSlash, '');
                    if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
                } else {
                    fragment = this.getHash();
                }
            }
            return fragment.replace(routeStripper, '');
        },
        start: function(options) {
            if (History.started) throw new Error("Backbone.history has already been started");
            History.started = true;
            this.options = _.extend({}, {
                root: '/'
            }, this.options, options);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment();
            var docMode = document.documentMode;
            var oldIE = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
            this.root = ('/' + this.root + '/').replace(rootStripper, '/');
            if (oldIE && this._wantsHashChange) {
                this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
                this.navigate(fragment);
            }
            if (this._hasPushState) {
                Backbone.$(window).on('popstate', this.checkUrl);
            } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
                Backbone.$(window).on('hashchange', this.checkUrl);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }
            this.fragment = fragment;
            var loc = this.location;
            var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
                this.fragment = this.getFragment(null, true);
                this.location.replace(this.root + this.location.search + '#' + this.fragment);
                return true;
            } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
                this.fragment = this.getHash().replace(routeStripper, '');
                this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
            }
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function() {
            Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
            clearInterval(this._checkUrlInterval);
            History.started = false;
        },
        route: function(route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            });
        },
        checkUrl: function(e) {
            var current = this.getFragment();
            if (current === this.fragment && this.iframe) {
                current = this.getFragment(this.getHash(this.iframe));
            }
            if (current === this.fragment) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl() || this.loadUrl(this.getHash());
        },
        loadUrl: function(fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride);
            var matched = _.any(this.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
            return matched;
        },
        navigate: function(fragment, options) {
            if (!History.started) return false;
            if (!options || options === true) options = {
                trigger: options
            };
            fragment = this.getFragment(fragment || '');
            if (this.fragment === fragment) return;
            this.fragment = fragment;
            var url = this.root + fragment;
            if (this._hasPushState) {
                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, fragment, options.replace);
                if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
                    if (!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, fragment, options.replace);
                }
            } else {
                return this.location.assign(url);
            }
            if (options.trigger) this.loadUrl(fragment);
        },
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, '');
                location.replace(href + '#' + fragment);
            } else {
                location.hash = '#' + fragment;
            }
        }
    });
    Backbone.history = new History;
    var View = Backbone.View = function(options) {
        this.cid = _.uniqueId('view');
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];
    _.extend(View.prototype, Events, {
        tagName: 'div',
        $: function(selector) {
            return this.$el.find(selector);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this;
        },
        setElement: function(element, delegate) {
            if (this.$el) this.undelegateEvents();
            this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },
        delegateEvents: function(events) {
            if (!(events || (events = _.result(this, 'events')))) return;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                var match = key.match(delegateEventSplitter);
                var eventName = match[1],
                    selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.on(eventName, method);
                } else {
                    this.$el.on(eventName, selector, method);
                }
            }
        },
        undelegateEvents: function() {
            this.$el.off('.delegateEvents' + this.cid);
        },
        _configure: function(options) {
            if (this.options) options = _.extend({}, _.result(this, 'options'), options);
            _.extend(this, _.pick(options, viewOptions));
            this.options = options;
        },
        _ensureElement: function() {
            if (!this.el) {
                var attrs = _.extend({}, _.result(this, 'attributes'));
                if (this.id) attrs.id = _.result(this, 'id');
                if (this.className) attrs['class'] = _.result(this, 'className');
                var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
                this.setElement($el, false);
            } else {
                this.setElement(_.result(this, 'el'), false);
            }
        }
    });
    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'patch': 'PATCH',
        'delete': 'DELETE',
        'read': 'GET'
    };
    Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: 'json'
        };
        if (!options.url) {
            params.url = _.result(model, 'url') || urlError();
        }
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
        if (options.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {
                model: params.data
            } : {};
        }
        if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
            params.type = 'POST';
            if (options.emulateJSON) params.data._method = type;
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', type);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }
        if (params.type !== 'GET' && !options.emulateJSON) {
            params.processData = false;
        }
        var success = options.success;
        options.success = function(resp) {
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
        };
        var error = options.error;
        options.error = function(xhr) {
            if (error) error(model, xhr, options);
            model.trigger('error', model, xhr, options);
        };
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments);
    };
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function() {
                return parent.apply(this, arguments);
            };
        }
        _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        if (protoProps) _.extend(child.prototype, protoProps);
        child.__super__ = parent.prototype;
        return child;
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };
}).call(this);

(function(undefined) {
    "use strict";
    var _, Backbone, exports;
    if (typeof window === 'undefined') {
        _ = require('underscore');
        Backbone = require('backbone');
        exports = module.exports = Backbone;
    } else {
        _ = window._;
        Backbone = window.Backbone;
        exports = window;
    }
    Backbone.Relational = {
        showWarnings: true
    };
    Backbone.Semaphore = {
        _permitsAvailable: null,
        _permitsUsed: 0,
        acquire: function() {
            if (this._permitsAvailable && this._permitsUsed >= this._permitsAvailable) {
                throw new Error('Max permits acquired');
            } else {
                this._permitsUsed++;
            }
        },
        release: function() {
            if (this._permitsUsed === 0) {
                throw new Error('All permits released');
            } else {
                this._permitsUsed--;
            }
        },
        isLocked: function() {
            return this._permitsUsed > 0;
        },
        setAvailablePermits: function(amount) {
            if (this._permitsUsed > amount) {
                throw new Error('Available permits cannot be less than used permits');
            }
            this._permitsAvailable = amount;
        }
    };
    Backbone.BlockingQueue = function() {
        this._queue = [];
    };
    _.extend(Backbone.BlockingQueue.prototype, Backbone.Semaphore, {
        _queue: null,
        add: function(func) {
            if (this.isBlocked()) {
                this._queue.push(func);
            } else {
                func();
            }
        },
        process: function() {
            while (this._queue && this._queue.length) {
                this._queue.shift()();
            }
        },
        block: function() {
            this.acquire();
        },
        unblock: function() {
            this.release();
            if (!this.isBlocked()) {
                this.process();
            }
        },
        isBlocked: function() {
            return this.isLocked();
        }
    });
    Backbone.Relational.eventQueue = new Backbone.BlockingQueue();
    Backbone.Store = function() {
        this._collections = [];
        this._reverseRelations = [];
        this._subModels = [];
        this._modelScopes = [exports];
    };
    _.extend(Backbone.Store.prototype, Backbone.Events, {
        addModelScope: function(scope) {
            this._modelScopes.push(scope);
        },
        addSubModels: function(subModelTypes, superModelType) {
            this._subModels.push({
                'superModelType': superModelType,
                'subModels': subModelTypes
            });
        },
        setupSuperModel: function(modelType) {
            _.find(this._subModels || [], function(subModelDef) {
                return _.find(subModelDef.subModels || [], function(subModelTypeName, typeValue) {
                    var subModelType = this.getObjectByName(subModelTypeName);
                    if (modelType === subModelType) {
                        subModelDef.superModelType._subModels[typeValue] = modelType;
                        modelType._superModel = subModelDef.superModelType;
                        modelType._subModelTypeValue = typeValue;
                        modelType._subModelTypeAttribute = subModelDef.superModelType.prototype.subModelTypeAttribute;
                        return true;
                    }
                }, this);
            }, this);
        },
        addReverseRelation: function(relation) {
            var exists = _.any(this._reverseRelations || [], function(rel) {
                return _.all(relation || [], function(val, key) {
                    return val === rel[key];
                });
            });
            if (!exists && relation.model && relation.type) {
                this._reverseRelations.push(relation);
                var addRelation = function(model, relation) {
                    if (!model.prototype.relations) {
                        model.prototype.relations = [];
                    }
                    model.prototype.relations.push(relation);
                    _.each(model._subModels || [], function(subModel) {
                        addRelation(subModel, relation);
                    }, this);
                };
                addRelation(relation.model, relation);
                this.retroFitRelation(relation);
            }
        },
        retroFitRelation: function(relation) {
            var coll = this.getCollection(relation.model);
            coll.each(function(model) {
                if (!(model instanceof relation.model)) {
                    return;
                }
                new relation.type(model, relation);
            }, this);
        },
        getCollection: function(model) {
            if (model instanceof Backbone.RelationalModel) {
                model = model.constructor;
            }
            var rootModel = model;
            while (rootModel._superModel) {
                rootModel = rootModel._superModel;
            }
            var coll = _.detect(this._collections, function(c) {
                return c.model === rootModel;
            });
            if (!coll) {
                coll = this._createCollection(rootModel);
            }
            return coll;
        },
        getObjectByName: function(name) {
            var parts = name.split('.'),
                type = null;
            _.find(this._modelScopes || [], function(scope) {
                type = _.reduce(parts || [], function(memo, val) {
                    return memo ? memo[val] : undefined;
                }, scope);
                if (type && type !== scope) {
                    return true;
                }
            }, this);
            return type;
        },
        _createCollection: function(type) {
            var coll;
            if (type instanceof Backbone.RelationalModel) {
                type = type.constructor;
            }
            if (type.prototype instanceof Backbone.RelationalModel) {
                coll = new Backbone.Collection();
                coll.model = type;
                this._collections.push(coll);
            }
            return coll;
        },
        resolveIdForItem: function(type, item) {
            var id = _.isString(item) || _.isNumber(item) ? item : null;
            if (id === null) {
                if (item instanceof Backbone.RelationalModel) {
                    id = item.id;
                } else if (_.isObject(item)) {
                    id = item[type.prototype.idAttribute];
                }
            }
            if (!id && id !== 0) {
                id = null;
            }
            return id;
        },
        find: function(type, item) {
            var id = this.resolveIdForItem(type, item);
            var coll = this.getCollection(type);
            if (coll) {
                var obj = coll.get(id);
                if (obj instanceof type) {
                    return obj;
                }
            }
            return null;
        },
        register: function(model) {
            var coll = this.getCollection(model);
            if (coll) {
                if (coll.get(model)) {
                    if (Backbone.Relational.showWarnings && typeof console !== 'undefined') {
                        console.warn('Duplicate id! Old RelationalModel:%o, New RelationalModel:%o', coll.get(model), model);
                    }
                    throw new Error("Cannot instantiate more than one Backbone.RelationalModel with the same id per type!");
                }
                var modelColl = model.collection;
                coll.add(model);
                model.bind('destroy', this.unregister, this);
                model.collection = modelColl;
            }
        },
        update: function(model) {
            var coll = this.getCollection(model);
            coll._onModelEvent('change:' + model.idAttribute, model, coll);
        },
        unregister: function(model) {
            model.unbind('destroy', this.unregister);
            var coll = this.getCollection(model);
            coll && coll.remove(model);
        }
    });
    Backbone.Relational.store = new Backbone.Store();
    Backbone.Relation = function(instance, options) {
        this.instance = instance;
        options = _.isObject(options) ? options : {};
        this.reverseRelation = _.defaults(options.reverseRelation || {}, this.options.reverseRelation);
        this.reverseRelation.type = !_.isString(this.reverseRelation.type) ? this.reverseRelation.type : Backbone[this.reverseRelation.type] || Backbone.Relational.store.getObjectByName(this.reverseRelation.type);
        this.model = options.model || this.instance.constructor;
        this.options = _.defaults(options, this.options, Backbone.Relation.prototype.options);
        this.key = this.options.key;
        this.keySource = this.options.keySource || this.key;
        this.keyDestination = this.options.keyDestination || this.keySource || this.key;
        this.relatedModel = this.options.relatedModel;
        if (_.isString(this.relatedModel)) {
            this.relatedModel = Backbone.Relational.store.getObjectByName(this.relatedModel);
        }
        if (!this.checkPreconditions()) {
            return;
        }
        if (instance) {
            var contentKey = this.keySource;
            if (contentKey !== this.key && typeof this.instance.get(this.key) === 'object') {
                contentKey = this.key;
            }
            this.keyContents = this.instance.get(contentKey);
            if (this.keySource !== this.key) {
                this.instance.unset(this.keySource, {
                    silent: true
                });
            }
            this.instance._relations.push(this);
        }
        if (!this.options.isAutoRelation && this.reverseRelation.type && this.reverseRelation.key) {
            Backbone.Relational.store.addReverseRelation(_.defaults({
                isAutoRelation: true,
                model: this.relatedModel,
                relatedModel: this.model,
                reverseRelation: this.options
            }, this.reverseRelation));
        }
        _.bindAll(this, '_modelRemovedFromCollection', '_relatedModelAdded', '_relatedModelRemoved');
        if (instance) {
            this.initialize();
            if (options.autoFetch) {
                this.instance.fetchRelated(options.key, _.isObject(options.autoFetch) ? options.autoFetch : {});
            }
            Backbone.Relational.store.getCollection(this.instance).bind('relational:remove', this._modelRemovedFromCollection);
            Backbone.Relational.store.getCollection(this.relatedModel).bind('relational:add', this._relatedModelAdded).bind('relational:remove', this._relatedModelRemoved);
        }
    };
    Backbone.Relation.extend = Backbone.Model.extend;
    _.extend(Backbone.Relation.prototype, Backbone.Events, Backbone.Semaphore, {
        options: {
            createModels: true,
            includeInJSON: true,
            isAutoRelation: false,
            autoFetch: false
        },
        instance: null,
        key: null,
        keyContents: null,
        relatedModel: null,
        reverseRelation: null,
        related: null,
        _relatedModelAdded: function(model, coll, options) {
            var dit = this;
            model.queue(function() {
                dit.tryAddRelated(model, options);
            });
        },
        _relatedModelRemoved: function(model, coll, options) {
            this.removeRelated(model, options);
        },
        _modelRemovedFromCollection: function(model) {
            if (model === this.instance) {
                this.destroy();
            }
        },
        checkPreconditions: function() {
            var i = this.instance,
                k = this.key,
                m = this.model,
                rm = this.relatedModel,
                warn = Backbone.Relational.showWarnings && typeof console !== 'undefined';
            if (!m || !k || !rm) {
                warn && console.warn('Relation=%o; no model, key or relatedModel (%o, %o, %o)', this, m, k, rm);
                return false;
            }
            if (!(m.prototype instanceof Backbone.RelationalModel)) {
                warn && console.warn('Relation=%o; model does not inherit from Backbone.RelationalModel (%o)', this, i);
                return false;
            }
            if (!(rm.prototype instanceof Backbone.RelationalModel)) {
                warn && console.warn('Relation=%o; relatedModel does not inherit from Backbone.RelationalModel (%o)', this, rm);
                return false;
            }
            if (this instanceof Backbone.HasMany && this.reverseRelation.type === Backbone.HasMany) {
                warn && console.warn('Relation=%o; relation is a HasMany, and the reverseRelation is HasMany as well.', this);
                return false;
            }
            if (i && i._relations.length) {
                var exists = _.any(i._relations || [], function(rel) {
                    var hasReverseRelation = this.reverseRelation.key && rel.reverseRelation.key;
                    return rel.relatedModel === rm && rel.key === k && (!hasReverseRelation || this.reverseRelation.key === rel.reverseRelation.key);
                }, this);
                if (exists) {
                    warn && console.warn('Relation=%o between instance=%o.%s and relatedModel=%o.%s already exists', this, i, k, rm, this.reverseRelation.key);
                    return false;
                }
            }
            return true;
        },
        setRelated: function(related, options) {
            this.related = related;
            this.instance.acquire();
            this.instance.attributes[this.key] = related;
            this.instance.release();
        },
        _isReverseRelation: function(relation) {
            if (relation.instance instanceof this.relatedModel && this.reverseRelation.key === relation.key && this.key === relation.reverseRelation.key) {
                return true;
            }
            return false;
        },
        getReverseRelations: function(model) {
            var reverseRelations = [];
            var models = !_.isUndefined(model) ? [model] : this.related && (this.related.models || [this.related]);
            _.each(models || [], function(related) {
                _.each(related.getRelations() || [], function(relation) {
                    if (this._isReverseRelation(relation)) {
                        reverseRelations.push(relation);
                    }
                }, this);
            }, this);
            return reverseRelations;
        },
        sanitizeOptions: function(options) {
            options = options ? _.clone(options) : {};
            if (options.silent) {
                options.silentChange = true;
                delete options.silent;
            }
            return options;
        },
        unsanitizeOptions: function(options) {
            options = options ? _.clone(options) : {};
            if (options.silentChange) {
                options.silent = true;
                delete options.silentChange;
            }
            return options;
        },
        destroy: function() {
            Backbone.Relational.store.getCollection(this.instance).unbind('relational:remove', this._modelRemovedFromCollection);
            Backbone.Relational.store.getCollection(this.relatedModel).unbind('relational:add', this._relatedModelAdded).unbind('relational:remove', this._relatedModelRemoved);
            _.each(this.getReverseRelations() || [], function(relation) {
                relation.removeRelated(this.instance);
            }, this);
        }
    });
    Backbone.HasOne = Backbone.Relation.extend({
        options: {
            reverseRelation: {
                type: 'HasMany'
            }
        },
        initialize: function() {
            _.bindAll(this, 'onChange');
            this.instance.bind('relational:change:' + this.key, this.onChange);
            var model = this.findRelated({
                silent: true
            });
            this.setRelated(model);
            _.each(this.getReverseRelations() || [], function(relation) {
                relation.addRelated(this.instance);
            }, this);
        },
        findRelated: function(options) {
            var item = this.keyContents;
            var model = null;
            if (item instanceof this.relatedModel) {
                model = item;
            } else if (item || item === 0) {
                model = this.relatedModel.findOrCreate(item, {
                    create: this.options.createModels
                });
            }
            return model;
        },
        onChange: function(model, attr, options) {
            if (this.isLocked()) {
                return;
            }
            this.acquire();
            options = this.sanitizeOptions(options);
            var changed = _.isUndefined(options._related);
            var oldRelated = changed ? this.related : options._related;
            if (changed) {
                this.keyContents = attr;
                if (attr instanceof this.relatedModel) {
                    this.related = attr;
                } else if (attr) {
                    var related = this.findRelated(options);
                    this.setRelated(related);
                } else {
                    this.setRelated(null);
                }
            }
            if (oldRelated && this.related !== oldRelated) {
                _.each(this.getReverseRelations(oldRelated) || [], function(relation) {
                    relation.removeRelated(this.instance, options);
                }, this);
            }
            _.each(this.getReverseRelations() || [], function(relation) {
                relation.addRelated(this.instance, options);
            }, this);
            if (!options.silentChange && this.related !== oldRelated) {
                var dit = this;
                Backbone.Relational.eventQueue.add(function() {
                    dit.instance.trigger('update:' + dit.key, dit.instance, dit.related, options);
                });
            }
            this.release();
        },
        tryAddRelated: function(model, options) {
            if (this.related) {
                return;
            }
            options = this.sanitizeOptions(options);
            var item = this.keyContents;
            if (item || item === 0) {
                var id = Backbone.Relational.store.resolveIdForItem(this.relatedModel, item);
                if (!_.isNull(id) && model.id === id) {
                    this.addRelated(model, options);
                }
            }
        },
        addRelated: function(model, options) {
            if (model !== this.related) {
                var oldRelated = this.related || null;
                this.setRelated(model);
                this.onChange(this.instance, model, {
                    _related: oldRelated
                });
            }
        },
        removeRelated: function(model, options) {
            if (!this.related) {
                return;
            }
            if (model === this.related) {
                var oldRelated = this.related || null;
                this.setRelated(null);
                this.onChange(this.instance, model, {
                    _related: oldRelated
                });
            }
        }
    });
    Backbone.HasMany = Backbone.Relation.extend({
        collectionType: null,
        options: {
            reverseRelation: {
                type: 'HasOne'
            },
            collectionType: Backbone.Collection,
            collectionKey: true,
            collectionOptions: {}
        },
        initialize: function() {
            _.bindAll(this, 'onChange', 'handleAddition', 'handleRemoval', 'handleReset');
            this.instance.bind('relational:change:' + this.key, this.onChange);
            this.collectionType = this.options.collectionType;
            if (_.isString(this.collectionType)) {
                this.collectionType = Backbone.Relational.store.getObjectByName(this.collectionType);
            }
            if (!this.collectionType.prototype instanceof Backbone.Collection) {
                throw new Error('collectionType must inherit from Backbone.Collection');
            }
            if (this.keyContents instanceof Backbone.Collection) {
                this.setRelated(this._prepareCollection(this.keyContents));
            } else {
                this.setRelated(this._prepareCollection());
            }
            this.findRelated({
                silent: true
            });
        },
        _getCollectionOptions: function() {
            return _.isFunction(this.options.collectionOptions) ? this.options.collectionOptions(this.instance) : this.options.collectionOptions;
        },
        _prepareCollection: function(collection) {
            if (this.related) {
                this.related.unbind('relational:add', this.handleAddition).unbind('relational:remove', this.handleRemoval).unbind('relational:reset', this.handleReset)
            }
            if (!collection || !(collection instanceof Backbone.Collection)) {
                collection = new this.collectionType([], this._getCollectionOptions());
            }
            collection.model = this.relatedModel;
            if (this.options.collectionKey) {
                var key = this.options.collectionKey === true ? this.options.reverseRelation.key : this.options.collectionKey;
                if (collection[key] && collection[key] !== this.instance) {
                    if (Backbone.Relational.showWarnings && typeof console !== 'undefined') {
                        console.warn('Relation=%o; collectionKey=%s already exists on collection=%o', this, key, this.options.collectionKey);
                    }
                } else if (key) {
                    collection[key] = this.instance;
                }
            }
            collection.bind('relational:add', this.handleAddition).bind('relational:remove', this.handleRemoval).bind('relational:reset', this.handleReset);
            return collection;
        },
        findRelated: function(options) {
            if (this.keyContents) {
                var models = [];
                if (this.keyContents instanceof Backbone.Collection) {
                    models = this.keyContents.models;
                } else {
                    this.keyContents = _.isArray(this.keyContents) ? this.keyContents : [this.keyContents];
                    _.each(this.keyContents || [], function(item) {
                        var model = null;
                        if (item instanceof this.relatedModel) {
                            model = item;
                        } else if (item || item === 0) {
                            model = this.relatedModel.findOrCreate(item, {
                                create: this.options.createModels
                            });
                        }
                        if (model && !this.related.get(model)) {
                            models.push(model);
                        }
                    }, this);
                }
                if (models.length) {
                    options = this.unsanitizeOptions(options);
                    this.related.add(models, options);
                }
            }
        },
        onChange: function(model, attr, options) {
            options = this.sanitizeOptions(options);
            this.keyContents = attr;
            if (attr instanceof Backbone.Collection) {
                this._prepareCollection(attr);
                this.related = attr;
            } else {
                var oldIds = {},
                    newIds = {};
                if (!_.isArray(attr) && attr !== undefined) {
                    attr = [attr];
                }
                _.each(attr, function(attributes) {
                    newIds[attributes.id] = true;
                });
                var coll = this.related;
                if (coll instanceof Backbone.Collection) {
                    _.each(coll.models.slice(0), function(model) {
                        if (!options.keepNewModels || !model.isNew()) {
                            oldIds[model.id] = true;
                            coll.remove(model, {
                                silent: (model.id in newIds)
                            });
                        }
                    });
                } else {
                    coll = this._prepareCollection();
                }
                _.each(attr, function(attributes) {
                    var model = this.relatedModel.findOrCreate(attributes, {
                        create: this.options.createModels
                    });
                    if (model) {
                        coll.add(model, {
                            silent: (model.id in oldIds)
                        });
                    }
                }, this);
                this.setRelated(coll);
            }
            var dit = this;
            Backbone.Relational.eventQueue.add(function() {
                !options.silentChange && dit.instance.trigger('update:' + dit.key, dit.instance, dit.related, options);
            });
        },
        tryAddRelated: function(model, options) {
            options = this.sanitizeOptions(options);
            if (!this.related.get(model)) {
                var item = _.any(this.keyContents || [], function(item) {
                    var id = Backbone.Relational.store.resolveIdForItem(this.relatedModel, item);
                    return !_.isNull(id) && id === model.id;
                }, this);
                if (item) {
                    this.related.add(model, options);
                }
            }
        },
        handleAddition: function(model, coll, options) {
            if (!(model instanceof Backbone.Model)) {
                return;
            }
            options = this.sanitizeOptions(options);
            _.each(this.getReverseRelations(model) || [], function(relation) {
                relation.addRelated(this.instance, options);
            }, this);
            var dit = this;
            Backbone.Relational.eventQueue.add(function() {
                !options.silentChange && dit.instance.trigger('add:' + dit.key, model, dit.related, options);
            });
        },
        handleRemoval: function(model, coll, options) {
            if (!(model instanceof Backbone.Model)) {
                return;
            }
            options = this.sanitizeOptions(options);
            _.each(this.getReverseRelations(model) || [], function(relation) {
                relation.removeRelated(this.instance, options);
            }, this);
            var dit = this;
            Backbone.Relational.eventQueue.add(function() {
                !options.silentChange && dit.instance.trigger('remove:' + dit.key, model, dit.related, options);
            });
        },
        handleReset: function(coll, options) {
            options = this.sanitizeOptions(options);
            var dit = this;
            Backbone.Relational.eventQueue.add(function() {
                !options.silentChange && dit.instance.trigger('reset:' + dit.key, dit.related, options);
            });
        },
        addRelated: function(model, options) {
            var dit = this;
            options = this.unsanitizeOptions(options);
            model.queue(function() {
                if (dit.related && !dit.related.get(model)) {
                    dit.related.add(model, options);
                }
            });
        },
        removeRelated: function(model, options) {
            options = this.unsanitizeOptions(options);
            if (this.related.get(model)) {
                this.related.remove(model, options);
            }
        }
    });
    Backbone.RelationalModel = Backbone.Model.extend({
        relations: null,
        _relations: null,
        _isInitialized: false,
        _deferProcessing: false,
        _queue: null,
        subModelTypeAttribute: 'type',
        subModelTypes: null,
        constructor: function(attributes, options) {
            var dit = this;
            if (options && options.collection) {
                this._deferProcessing = true;
                var processQueue = function(model) {
                    if (model === dit) {
                        dit._deferProcessing = false;
                        dit.processQueue();
                        options.collection.unbind('relational:add', processQueue);
                    }
                };
                options.collection.bind('relational:add', processQueue);
                _.defer(function() {
                    processQueue(dit);
                });
            }
            this._queue = new Backbone.BlockingQueue();
            this._queue.block();
            Backbone.Relational.eventQueue.block();
            Backbone.Model.apply(this, arguments);
            Backbone.Relational.eventQueue.unblock();
        },
        trigger: function(eventName) {
            if (eventName.length > 5 && 'change' === eventName.substr(0, 6)) {
                var dit = this,
                    args = arguments;
                Backbone.Relational.eventQueue.add(function() {
                    Backbone.Model.prototype.trigger.apply(dit, args);
                });
            } else {
                Backbone.Model.prototype.trigger.apply(this, arguments);
            }
            return this;
        },
        initializeRelations: function() {
            this.acquire();
            this._relations = [];
            _.each(this.relations || [], function(rel) {
                var type = !_.isString(rel.type) ? rel.type : Backbone[rel.type] || Backbone.Relational.store.getObjectByName(rel.type);
                if (type && type.prototype instanceof Backbone.Relation) {
                    new type(this, rel);
                } else {
                    Backbone.Relational.showWarnings && typeof console !== 'undefined' && console.warn('Relation=%o; missing or invalid type!', rel);
                }
            }, this);
            this._isInitialized = true;
            this.release();
            this.processQueue();
        },
        updateRelations: function(options) {
            if (this._isInitialized && !this.isLocked()) {
                _.each(this._relations || [], function(rel) {
                    var val = this.attributes[rel.keySource] || this.attributes[rel.key];
                    if (rel.related !== val) {
                        this.trigger('relational:change:' + rel.key, this, val, options || {});
                    }
                }, this);
            }
        },
        queue: function(func) {
            this._queue.add(func);
        },
        processQueue: function() {
            if (this._isInitialized && !this._deferProcessing && this._queue.isBlocked()) {
                this._queue.unblock();
            }
        },
        getRelation: function(key) {
            return _.detect(this._relations, function(rel) {
                if (rel.key === key) {
                    return true;
                }
            }, this);
        },
        getRelations: function() {
            return this._relations;
        },
        fetchRelated: function(key, options, update) {
            options || (options = {});
            var setUrl, requests = [],
                rel = this.getRelation(key),
                keyContents = rel && rel.keyContents,
                toFetch = keyContents && _.select(_.isArray(keyContents) ? keyContents : [keyContents], function(item) {
                    var id = Backbone.Relational.store.resolveIdForItem(rel.relatedModel, item);
                    return !_.isNull(id) && (update || !Backbone.Relational.store.find(rel.relatedModel, id));
                }, this);
            if (toFetch && toFetch.length) {
                var models = _.map(toFetch, function(item) {
                    var model;
                    if (_.isObject(item)) {
                        model = rel.relatedModel.findOrCreate(item);
                    } else {
                        var attrs = {};
                        attrs[rel.relatedModel.prototype.idAttribute] = item;
                        model = rel.relatedModel.findOrCreate(attrs);
                    }
                    return model;
                }, this);
                if (rel.related instanceof Backbone.Collection && _.isFunction(rel.related.url)) {
                    setUrl = rel.related.url(models);
                }
                if (setUrl && setUrl !== rel.related.url()) {
                    var opts = _.defaults({
                        error: function() {
                            var args = arguments;
                            _.each(models || [], function(model) {
                                model.trigger('destroy', model, model.collection, options);
                                options.error && options.error.apply(model, args);
                            });
                        },
                        url: setUrl
                    }, options, {
                        add: true
                    });
                    requests = [rel.related.fetch(opts)];
                } else {
                    requests = _.map(models || [], function(model) {
                        var opts = _.defaults({
                            error: function() {
                                model.trigger('destroy', model, model.collection, options);
                                options.error && options.error.apply(model, arguments);
                            }
                        }, options);
                        return model.fetch(opts);
                    }, this);
                }
            }
            return requests;
        },
        set: function(key, value, options) {
            Backbone.Relational.eventQueue.block();
            var attributes;
            if (_.isObject(key) || key == null) {
                attributes = key;
                options = value;
            } else {
                attributes = {};
                attributes[key] = value;
            }
            var result = Backbone.Model.prototype.set.apply(this, arguments);
            if (!this._isInitialized && !this.isLocked()) {
                this.constructor.initializeModelHierarchy();
                Backbone.Relational.store.register(this);
                this.initializeRelations();
            } else if (attributes && this.idAttribute in attributes) {
                Backbone.Relational.store.update(this);
            }
            if (attributes) {
                this.updateRelations(options);
            }
            Backbone.Relational.eventQueue.unblock();
            return result;
        },
        unset: function(attribute, options) {
            Backbone.Relational.eventQueue.block();
            var result = Backbone.Model.prototype.unset.apply(this, arguments);
            this.updateRelations(options);
            Backbone.Relational.eventQueue.unblock();
            return result;
        },
        clear: function(options) {
            Backbone.Relational.eventQueue.block();
            var result = Backbone.Model.prototype.clear.apply(this, arguments);
            this.updateRelations(options);
            Backbone.Relational.eventQueue.unblock();
            return result;
        },
        clone: function() {
            var attributes = _.clone(this.attributes);
            if (!_.isUndefined(attributes[this.idAttribute])) {
                attributes[this.idAttribute] = null;
            }
            _.each(this.getRelations() || [], function(rel) {
                delete attributes[rel.key];
            });
            return new this.constructor(attributes);
        },
        toJSON: function(options) {
            if (this.isLocked()) {
                return this.id;
            }
            this.acquire();
            var json = Backbone.Model.prototype.toJSON.call(this, options);
            if (this.constructor._superModel && !(this.constructor._subModelTypeAttribute in json)) {
                json[this.constructor._subModelTypeAttribute] = this.constructor._subModelTypeValue;
            }
            _.each(this._relations || [], function(rel) {
                var value = json[rel.key];
                if (rel.options.includeInJSON === true) {
                    if (value && _.isFunction(value.toJSON)) {
                        json[rel.keyDestination] = value.toJSON(options);
                    } else {
                        json[rel.keyDestination] = null;
                    }
                } else if (_.isString(rel.options.includeInJSON)) {
                    if (value instanceof Backbone.Collection) {
                        json[rel.keyDestination] = value.pluck(rel.options.includeInJSON);
                    } else if (value instanceof Backbone.Model) {
                        json[rel.keyDestination] = value.get(rel.options.includeInJSON);
                    } else {
                        json[rel.keyDestination] = null;
                    }
                } else if (_.isArray(rel.options.includeInJSON)) {
                    if (value instanceof Backbone.Collection) {
                        var valueSub = [];
                        value.each(function(model) {
                            var curJson = {};
                            _.each(rel.options.includeInJSON, function(key) {
                                curJson[key] = model.get(key);
                            });
                            valueSub.push(curJson);
                        });
                        json[rel.keyDestination] = valueSub;
                    } else if (value instanceof Backbone.Model) {
                        var valueSub = {};
                        _.each(rel.options.includeInJSON, function(key) {
                            valueSub[key] = value.get(key);
                        });
                        json[rel.keyDestination] = valueSub;
                    } else {
                        json[rel.keyDestination] = null;
                    }
                } else {
                    delete json[rel.key];
                }
                if (rel.keyDestination !== rel.key) {
                    delete json[rel.key];
                }
            });
            this.release();
            return json;
        }
    }, {
        setup: function(superModel) {
            this.prototype.relations = (this.prototype.relations || []).slice(0);
            this._subModels = {};
            this._superModel = null;
            if (this.prototype.hasOwnProperty('subModelTypes')) {
                Backbone.Relational.store.addSubModels(this.prototype.subModelTypes, this);
            } else {
                this.prototype.subModelTypes = null;
            }
            _.each(this.prototype.relations || [], function(rel) {
                if (!rel.model) {
                    rel.model = this;
                }
                if (rel.reverseRelation && rel.model === this) {
                    var preInitialize = true;
                    if (_.isString(rel.relatedModel)) {
                        var relatedModel = Backbone.Relational.store.getObjectByName(rel.relatedModel);
                        preInitialize = relatedModel && (relatedModel.prototype instanceof Backbone.RelationalModel);
                    }
                    var type = !_.isString(rel.type) ? rel.type : Backbone[rel.type] || Backbone.Relational.store.getObjectByName(rel.type);
                    if (preInitialize && type && type.prototype instanceof Backbone.Relation) {
                        new type(null, rel);
                    }
                }
            }, this);
            return this;
        },
        build: function(attributes, options) {
            var model = this;
            this.initializeModelHierarchy();
            if (this._subModels && this.prototype.subModelTypeAttribute in attributes) {
                var subModelTypeAttribute = attributes[this.prototype.subModelTypeAttribute];
                var subModelType = this._subModels[subModelTypeAttribute];
                if (subModelType) {
                    model = subModelType;
                }
            }
            return new model(attributes, options);
        },
        initializeModelHierarchy: function() {
            if (_.isUndefined(this._superModel) || _.isNull(this._superModel)) {
                Backbone.Relational.store.setupSuperModel(this);
                if (this._superModel) {
                    if (this._superModel.prototype.relations) {
                        var supermodelRelationsExist = _.any(this.prototype.relations || [], function(rel) {
                            return rel.model && rel.model !== this;
                        }, this);
                        if (!supermodelRelationsExist) {
                            this.prototype.relations = this._superModel.prototype.relations.concat(this.prototype.relations);
                        }
                    }
                } else {
                    this._superModel = false;
                }
            }
            if (this.prototype.subModelTypes && _.keys(this.prototype.subModelTypes).length !== _.keys(this._subModels).length) {
                _.each(this.prototype.subModelTypes || [], function(subModelTypeName) {
                    var subModelType = Backbone.Relational.store.getObjectByName(subModelTypeName);
                    subModelType && subModelType.initializeModelHierarchy();
                });
            }
        },
        findOrCreate: function(attributes, options) {
            options || (options = {});
            var parsedAttributes = (_.isObject(attributes) && this.prototype.parse) ? this.prototype.parse(attributes) : attributes;
            var model = Backbone.Relational.store.find(this, parsedAttributes);
            if (_.isObject(attributes)) {
                if (model && options.update !== false) {
                    model.set(parsedAttributes, options);
                } else if (!model && options.create !== false) {
                    model = this.build(attributes, options);
                }
            }
            return model;
        }
    });
    _.extend(Backbone.RelationalModel.prototype, Backbone.Semaphore);
    Backbone.Collection.prototype.__prepareModel = Backbone.Collection.prototype._prepareModel;
    Backbone.Collection.prototype._prepareModel = function(attrs, options) {
        var model;
        if (attrs instanceof Backbone.Model) {
            if (!attrs.collection) {
                attrs.collection = this;
            }
            model = attrs;
        } else {
            options || (options = {});
            options.collection = this;
            if (typeof this.model.findOrCreate !== 'undefined') {
                model = this.model.findOrCreate(attrs, options);
            } else {
                model = new this.model(attrs, options);
            }
            if (!model._validate(attrs, options)) {
                model = false;
            }
        }
        return model;
    };
    var add = Backbone.Collection.prototype.__add = Backbone.Collection.prototype.add;
    Backbone.Collection.prototype.add = function(models, options) {
        options || (options = {});
        if (!_.isArray(models)) {
            models = [models];
        }
        var modelsToAdd = [];
        _.each(models || [], function(model) {
            if (!(model instanceof Backbone.Model)) {
                model = Backbone.Collection.prototype._prepareModel.call(this, model, options);
            }
            if (model instanceof Backbone.Model && !this.get(model)) {
                modelsToAdd.push(model);
            }
        }, this);
        if (modelsToAdd.length) {
            add.call(this, modelsToAdd, options);
            _.each(modelsToAdd || [], function(model) {
                this.trigger('relational:add', model, this, options);
            }, this);
        }
        return this;
    };
    var remove = Backbone.Collection.prototype.__remove = Backbone.Collection.prototype.remove;
    Backbone.Collection.prototype.remove = function(models, options) {
        options || (options = {});
        if (!_.isArray(models)) {
            models = [models];
        } else {
            models = models.slice(0);
        }
        _.each(models || [], function(model) {
            model = this.get(model);
            if (model instanceof Backbone.Model) {
                remove.call(this, model, options);
                this.trigger('relational:remove', model, this, options);
            }
        }, this);
        return this;
    };
    var reset = Backbone.Collection.prototype.__reset = Backbone.Collection.prototype.reset;
    Backbone.Collection.prototype.reset = function(models, options) {
        reset.call(this, models, options);
        this.trigger('relational:reset', this, options);
        return this;
    };
    var sort = Backbone.Collection.prototype.__sort = Backbone.Collection.prototype.sort;
    Backbone.Collection.prototype.sort = function(options) {
        sort.call(this, options);
        this.trigger('relational:reset', this, options);
        return this;
    };
    var trigger = Backbone.Collection.prototype.__trigger = Backbone.Collection.prototype.trigger;
    Backbone.Collection.prototype.trigger = function(eventName) {
        if (eventName === 'add' || eventName === 'remove' || eventName === 'reset') {
            var dit = this,
                args = arguments;
            if (eventName === 'add') {
                args = _.toArray(args);
                if (_.isObject(args[3])) {
                    args[3] = _.clone(args[3]);
                }
            }
            Backbone.Relational.eventQueue.add(function() {
                trigger.apply(dit, args);
            });
        } else {
            trigger.apply(this, arguments);
        }
        return this;
    };
    Backbone.RelationalModel.extend = function(protoProps, classProps) {
        var child = Backbone.Model.extend.apply(this, arguments);
        child.setup(this);
        return child;
    };
})();

(function() {
    var _loadUrl = Backbone.History.prototype.loadUrl;
    Backbone.History.prototype.loadUrl = function(fragmentOverride) {
        var matched = _loadUrl.apply(this, arguments),
            fragment = this.fragment = this.getFragment(fragmentOverride);
        if (Backbone.history.root !== undefined) fragment = Backbone.history.root + fragment;
        if (!/^\//.test(fragment)) fragment = '/' + fragment;
        if (window._gaq !== undefined) window._gaq.push(['_trackPageview', fragment]);
        return matched;
    };
}).call(this);

(function(global) {
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this._priority = priority || 0;
    }
    SignalBinding.prototype = {
        active: true,
        params: null,
        execute: function(paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params ? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },
        detach: function() {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        },
        isBound: function() {
            return (!!this._signal && !!this._listener);
        },
        getListener: function() {
            return this._listener;
        },
        _destroy: function() {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },
        isOnce: function() {
            return this._isOnce;
        },
        toString: function() {
            return '[SignalBinding isOnce:' + this._isOnce + ', isBound:' + this.isBound() + ', active:' + this.active + ']';
        }
    };

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
        }
    }

    function Signal() {
        this._bindings = [];
        this._prevParams = null;
    }
    Signal.prototype = {
        VERSION: '0.8.1',
        memorize: false,
        _shouldPropagate: true,
        active: true,
        _registerListener: function(listener, isOnce, listenerContext, priority) {
            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;
            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add' + (isOnce ? '' : 'Once') + '() then add' + (!isOnce ? '' : 'Once') + '() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }
            if (this.memorize && this._prevParams) {
                binding.execute(this._prevParams);
            }
            return binding;
        },
        _addBinding: function(binding) {
            var n = this._bindings.length;
            do {
                --n;
            } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },
        _indexOfListener: function(listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },
        has: function(listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },
        add: function(listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },
        addOnce: function(listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },
        remove: function(listener, context) {
            validateListener(listener, 'remove');
            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy();
                this._bindings.splice(i, 1);
            }
            return listener;
        },
        removeAll: function() {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },
        getNumListeners: function() {
            return this._bindings.length;
        },
        halt: function() {
            this._shouldPropagate = false;
        },
        dispatch: function(params) {
            if (!this.active) {
                return;
            }
            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;
            if (this.memorize) {
                this._prevParams = paramsArr;
            }
            if (!n) {
                return;
            }
            bindings = this._bindings.slice();
            this._shouldPropagate = true;
            do {
                n--;
            } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },
        forget: function() {
            this._prevParams = null;
        },
        dispose: function() {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },
        toString: function() {
            return '[Signal active:' + this.active + ' numListeners:' + this.getNumListeners() + ']';
        }
    };
    var signals = Signal;
    signals.Signal = Signal;
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return signals;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = signals;
    } else {
        global['signals'] = signals;
    }
}(this));

(window._gsQueue || (window._gsQueue = [])).push(function() {
    _gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
        var TweenMax = function(target, duration, vars) {
                TweenLite.call(this, target, duration, vars);
                this._cycle = 0;
                this._yoyo = (this.vars.yoyo == true);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._dirty = true;
            },
            p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),
            _blankArray = [];
        p.constructor = TweenMax;
        p.kill()._gc = false;
        TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;
        TweenMax.getTweensOf = TweenLite.getTweensOf;
        TweenMax.ticker = TweenLite.ticker;
        p.invalidate = function() {
            this._yoyo = (this.vars.yoyo == true);
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return TweenLite.prototype.invalidate.call(this);
        };
        p.updateTo = function(vars, resetDuration) {
            var curRatio = this.ratio,
                p;
            if (resetDuration)
                if (this.timeline != null)
                    if (this._startTime < this._timeline._time) {
                        this._startTime = this._timeline._time;
                        this._uncache(false);
                        if (this._gc) {
                            this._enabled(true, false);
                        } else {
                            this._timeline.insert(this, this._startTime - this._delay);
                        }
                    }
            for (p in vars) {
                this.vars[p] = vars[p];
            }
            if (this._initted) {
                if (resetDuration) {
                    this._initted = false;
                } else {
                    if (this._notifyPluginsOfEnabled && this._firstPT) {
                        TweenLite._onPluginEvent("_onDisable", this);
                    }
                    if (this._time / this._duration > 0.998) {
                        var prevTime = this._time;
                        this.render(0, true, false);
                        this._initted = false;
                        this.render(prevTime, true, false);
                    } else if (this._time > 0) {
                        this._initted = false;
                        this._init();
                        var inv = 1 / (1 - curRatio),
                            pt = this._firstPT,
                            endValue;
                        while (pt) {
                            endValue = pt.s + pt.c;
                            pt.c *= inv;
                            pt.s = endValue - pt.c;
                            pt = pt._next;
                        }
                    }
                }
            }
            return this;
        };
        p.render = function(time, suppressEvents, force) {
            var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                prevTime = this._time,
                prevTotalTime = this._totalTime,
                prevCycle = this._cycle,
                isComplete, callback, pt;
            if (time >= totalDur) {
                this._totalTime = totalDur;
                this._cycle = this._repeat;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                } else {
                    this._time = this._duration;
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
                }
                if (!this._reversed) {
                    isComplete = true;
                    callback = "onComplete";
                }
                if (this._duration === 0) {
                    if (time === 0 || this._rawPrevTime < 0)
                        if (this._rawPrevTime !== time) {
                            force = true;
                        }
                    this._rawPrevTime = time;
                }
            } else if (time <= 0) {
                this._totalTime = this._time = this._cycle = 0;
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
                if (prevTotalTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
                    callback = "onReverseComplete";
                    isComplete = this._reversed;
                }
                if (time < 0) {
                    this._active = false;
                    if (this._duration === 0) {
                        if (this._rawPrevTime >= 0) {
                            force = true;
                        }
                        this._rawPrevTime = time;
                    }
                } else if (!this._initted) {
                    force = true;
                }
            } else {
                this._totalTime = this._time = time;
                if (this._repeat !== 0) {
                    var cycleDuration = this._duration + this._repeatDelay;
                    this._cycle = (this._totalTime / cycleDuration) >> 0;
                    if (this._cycle !== 0)
                        if (this._cycle === this._totalTime / cycleDuration) {
                            this._cycle--;
                        }
                    this._time = this._totalTime - (this._cycle * cycleDuration);
                    if (this._yoyo)
                        if ((this._cycle & 1) !== 0) {
                            this._time = this._duration - this._time;
                        }
                    if (this._time > this._duration) {
                        this._time = this._duration;
                    } else if (this._time < 0) {
                        this._time = 0;
                    }
                }
                if (this._easeType) {
                    var r = this._time / this._duration,
                        type = this._easeType,
                        pow = this._easePower;
                    if (type === 1 || (type === 3 && r >= 0.5)) {
                        r = 1 - r;
                    }
                    if (type === 3) {
                        r *= 2;
                    }
                    if (pow === 1) {
                        r *= r;
                    } else if (pow === 2) {
                        r *= r * r;
                    } else if (pow === 3) {
                        r *= r * r * r;
                    } else if (pow === 4) {
                        r *= r * r * r * r;
                    }
                    if (type === 1) {
                        this.ratio = 1 - r;
                    } else if (type === 2) {
                        this.ratio = r;
                    } else if (this._time / this._duration < 0.5) {
                        this.ratio = r / 2;
                    } else {
                        this.ratio = 1 - (r / 2);
                    }
                } else {
                    this.ratio = this._ease.getRatio(this._time / this._duration);
                }
            }
            if (prevTime === this._time && !force) {
                return;
            } else if (!this._initted) {
                this._init();
                if (!isComplete && this._time) {
                    this.ratio = this._ease.getRatio(this._time / this._duration);
                }
            }
            if (!this._active)
                if (!this._paused) {
                    this._active = true;
                }
            if (prevTotalTime == 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0 || this._duration === 0)
                        if (!suppressEvents) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
                        }
            pt = this._firstPT;
            while (pt) {
                if (pt.f) {
                    pt.t[pt.p](pt.c * this.ratio + pt.s);
                } else {
                    pt.t[pt.p] = pt.c * this.ratio + pt.s;
                }
                pt = pt._next;
            }
            if (this._onUpdate)
                if (!suppressEvents) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
                }
            if (this._cycle != prevCycle)
                if (!suppressEvents)
                    if (!this._gc)
                        if (this.vars.onRepeat) {
                            this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
                        }
            if (callback)
                if (!this._gc) {
                    if (isComplete) {
                        if (this._timeline.autoRemoveChildren) {
                            this._enabled(false, false);
                        }
                        this._active = false;
                    }
                    if (!suppressEvents)
                        if (this.vars[callback]) {
                            this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
                        }
                }
        };
        TweenMax.to = function(target, duration, vars) {
            return new TweenMax(target, duration, vars);
        };
        TweenMax.from = function(target, duration, vars) {
            vars.runBackwards = true;
            if (vars.immediateRender != false) {
                vars.immediateRender = true;
            }
            return new TweenMax(target, duration, vars);
        };
        TweenMax.fromTo = function(target, duration, fromVars, toVars) {
            toVars.startAt = fromVars;
            if (fromVars.immediateRender) {
                toVars.immediateRender = true;
            }
            return new TweenMax(target, duration, toVars);
        };
        TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            stagger = stagger || 0;
            var a = [],
                l = targets.length,
                delay = vars.delay || 0,
                copy, i, p;
            for (i = 0; i < l; i++) {
                copy = {};
                for (p in vars) {
                    copy[p] = vars[p];
                }
                copy.delay = delay;
                if (i === l - 1)
                    if (onCompleteAll) {
                        copy.onComplete = function() {
                            if (vars.onComplete) {
                                vars.onComplete.apply(vars.onCompleteScope, vars.onCompleteParams);
                            }
                            onCompleteAll.apply(onCompleteAllScope, onCompleteAllParams);
                        }
                    }
                a[i] = new TweenMax(targets[i], duration, copy);
                delay += stagger;
            }
            return a;
        };
        TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            vars.runBackwards = true;
            if (vars.immediateRender != false) {
                vars.immediateRender = true;
            }
            return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
        };
        TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            toVars.startAt = fromVars;
            if (fromVars.immediateRender) {
                toVars.immediateRender = true;
            }
            return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
        };
        TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {
            return new TweenMax(callback, 0, {
                delay: delay,
                onComplete: callback,
                onCompleteParams: params,
                onCompleteScope: scope,
                onReverseComplete: callback,
                onReverseCompleteParams: params,
                onReverseCompleteScope: scope,
                immediateRender: false,
                useFrames: useFrames,
                overwrite: 0
            });
        };
        TweenMax.set = function(target, vars) {
            return new TweenMax(target, 0, vars);
        };
        TweenMax.isTweening = function(target) {
            var a = TweenLite.getTweensOf(target),
                i = a.length,
                tween;
            while (--i > -1) {
                if (((tween = a[i])._active || (tween._startTime === tween.timeline._time && tween.timeline._active))) {
                    return true;
                }
            }
            return false;
        };
        var _getChildrenOf = function(timeline, includeTimelines) {
                var a = [],
                    cnt = 0,
                    tween = timeline._first;
                while (tween) {
                    if (tween instanceof TweenLite) {
                        a[cnt++] = tween;
                    } else {
                        if (includeTimelines) {
                            a[cnt++] = tween;
                        }
                        a = a.concat(_getChildrenOf(tween, includeTimelines));
                        cnt = a.length;
                    }
                    tween = tween._next;
                }
                return a;
            },
            getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {
                var a = _getChildrenOf(Animation._rootTimeline, includeTimelines);
                return a.concat(_getChildrenOf(Animation._rootFramesTimeline, includeTimelines));
            };
        TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {
            if (tweens == null) {
                tweens = true;
            }
            if (delayedCalls == null) {
                delayedCalls = true;
            }
            var a = getAllTweens((timelines != false)),
                l = a.length,
                allTrue = (tweens && delayedCalls && timelines),
                isDC, tween, i;
            for (i = 0; i < l; i++) {
                tween = a[i];
                if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
                    if (complete) {
                        tween.totalTime(tween.totalDuration());
                    } else {
                        tween._enabled(false, false);
                    }
                }
            }
        };
        TweenMax.killChildTweensOf = function(parent, complete) {
            if (parent == null) {
                return;
            }
            if (parent.jquery) {
                parent.each(function(i, e) {
                    TweenMax.killChildTweensOf(e, complete);
                });
                return;
            }
            var tl = TweenLite._tweenLookup,
                a = [],
                target, curParent, p, i, l;
            for (p in tl) {
                curParent = tl[p].target.parentNode;
                while (curParent) {
                    if (curParent === parent) {
                        a = a.concat(tl[p].tweens);
                    }
                    curParent = curParent.parentNode;
                }
            }
            l = a.length;
            for (i = 0; i < l; i++) {
                if (complete) {
                    a[i].totalTime(a[i].totalDuration());
                }
                a[i]._enabled(false, false);
            }
        };
        TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {
            _changePause(true, tweens, delayedCalls, timelines);
        };
        TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {
            _changePause(false, tweens, delayedCalls, timelines);
        };
        var _changePause = function(pause, tweens, delayedCalls, timelines) {
            if (tweens == undefined) {
                tweens = true;
            }
            if (delayedCalls == undefined) {
                delayedCalls = true;
            }
            var a = getAllTweens(timelines),
                allTrue = (tweens && delayedCalls && timelines),
                i = a.length,
                isDC, tween;
            while (--i > -1) {
                tween = a[i];
                if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
                    tween.paused(pause);
                }
            }
        };
        p.progress = function(value) {
            return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value + (this._cycle * this._duration), false);
        };
        p.totalProgress = function(value) {
            return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, false);
        };
        p.time = function(value, suppressEvents) {
            if (!arguments.length) {
                return this._time;
            }
            if (this._dirty) {
                this.totalDuration();
            }
            if (value > this._duration) {
                value = this._duration;
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
            } else if (this._repeat != 0) {
                value += this._cycle * (this._duration + this._repeatDelay);
            }
            return this.totalTime(value, suppressEvents);
        };
        p.totalDuration = function(value) {
            if (!arguments.length) {
                if (this._dirty) {
                    this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
                    this._dirty = false;
                }
                return this._totalDuration;
            }
            return (this._repeat == -1) ? this : this.duration((value - (this._repeat * this._repeatDelay)) / (this._repeat + 1));
        };
        p.repeat = function(value) {
            if (!arguments.length) {
                return this._repeat;
            }
            this._repeat = value;
            return this._uncache(true);
        };
        p.repeatDelay = function(value) {
            if (!arguments.length) {
                return this._repeatDelay;
            }
            this._repeatDelay = value;
            return this._uncache(true);
        };
        p.yoyo = function(value) {
            if (!arguments.length) {
                return this._yoyo;
            }
            this._yoyo = value;
            return this;
        };
        return TweenMax;
    }, true);
    _gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
        "use strict";
        var TimelineLite = function(vars) {
                SimpleTimeline.call(this, vars);
                this._labels = {};
                this.autoRemoveChildren = (this.vars.autoRemoveChildren == true);
                this.smoothChildTiming = (this.vars.smoothChildTiming == true);
                this._sortChildren = true;
                this._onUpdate = this.vars.onUpdate;
                var i = _paramProps.length,
                    j, a;
                while (--i > -1) {
                    if ((a = this.vars[_paramProps[i]])) {
                        j = a.length;
                        while (--j > -1) {
                            if (a[j] === "{self}") {
                                a = this.vars[_paramProps[i]] = a.concat();
                                a[j] = this;
                            }
                        }
                    }
                }
                if (this.vars.tweens instanceof Array) {
                    this.insertMultiple(this.vars.tweens, 0, this.vars.align || "normal", this.vars.stagger || 0);
                }
            },
            _paramProps = ["onStartParams", "onUpdateParams", "onCompleteParams", "onReverseCompleteParams", "onRepeatParams"],
            _blankArray = [],
            _copy = function(vars) {
                var copy = {},
                    p;
                for (p in vars) {
                    copy[p] = vars[p];
                }
                return copy;
            },
            p = TimelineLite.prototype = new SimpleTimeline();
        p.constructor = TimelineLite;
        p.kill()._gc = false;
        p.to = function(target, duration, vars, offset, baseTimeOrLabel) {
            return this.insert(new TweenLite(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        p.from = function(target, duration, vars, offset, baseTimeOrLabel) {
            return this.insert(TweenLite.from(target, duration, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        p.fromTo = function(target, duration, fromVars, toVars, offset, baseTimeOrLabel) {
            return this.insert(TweenLite.fromTo(target, duration, fromVars, toVars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        p.staggerTo = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            var tl = new TimelineLite({
                onComplete: onCompleteAll,
                onCompleteParams: onCompleteAllParams,
                onCompleteScope: onCompleteAllScope
            });
            stagger = stagger || 0;
            for (var i = 0; i < targets.length; i++) {
                if (vars.startAt != null) {
                    vars.startAt = _copy(vars.startAt);
                }
                tl.insert(new TweenLite(targets[i], duration, _copy(vars)), i * stagger);
            }
            return this.insert(tl, this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        p.staggerFrom = function(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            if (vars.immediateRender == null) {
                vars.immediateRender = true;
            }
            vars.runBackwards = true;
            return this.staggerTo(targets, duration, vars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
        }
        p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
            toVars.startAt = fromVars;
            if (fromVars.immediateRender) {
                toVars.immediateRender = true;
            }
            return this.staggerTo(targets, duration, toVars, stagger, offset, baseTimeOrLabel, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
        }
        p.call = function(callback, params, scope, offset, baseTimeOrLabel) {
            return this.insert(TweenLite.delayedCall(0, callback, params, scope), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        p.set = function(target, vars, offset, baseTimeOrLabel) {
            vars.immediateRender = false;
            return this.insert(new TweenLite(target, 0, vars), this._parseTimeOrLabel(baseTimeOrLabel) + (offset || 0));
        }
        TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {
            vars = vars || {};
            if (vars.smoothChildTiming == null) {
                vars.smoothChildTiming = true;
            }
            var tl = new TimelineLite(vars),
                root = tl._timeline;
            if (ignoreDelayedCalls == null) {
                ignoreDelayedCalls = true;
            }
            root._remove(tl, true);
            tl._startTime = 0;
            tl._rawPrevTime = tl._time = tl._totalTime = root._time;
            var tween = root._first,
                next;
            while (tween) {
                next = tween._next;
                if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target == tween.vars.onComplete)) {
                    tl.insert(tween, tween._startTime - tween._delay);
                }
                tween = next;
            }
            root.insert(tl, 0);
            return tl;
        }
        p.insert = function(value, timeOrLabel) {
            if (value instanceof Animation) {} else if (value instanceof Array) {
                return this.insertMultiple(value, timeOrLabel);
            } else if (typeof(value) === "string") {
                return this.addLabel(value, this._parseTimeOrLabel(timeOrLabel || 0, true));
            } else if (typeof(value) === "function") {
                value = TweenLite.delayedCall(0, value);
            } else {
                throw ("ERROR: Cannot insert() " + value + " into the TimelineLite/Max because it is neither a tween, timeline, function, nor a String.");
                return this;
            }
            SimpleTimeline.prototype.insert.call(this, value, this._parseTimeOrLabel(timeOrLabel || 0, true));
            if (this._gc)
                if (!this._paused)
                    if (this._time === this._duration)
                        if (this._time < this.duration()) {
                            var tl = this;
                            while (tl._gc && tl._timeline) {
                                if (tl._timeline.smoothChildTiming) {
                                    tl.totalTime(tl._totalTime, true);
                                } else {
                                    tl._enabled(true, false);
                                }
                                tl = tl._timeline;
                            }
                        }
            return this;
        }
        p.remove = function(value) {
            if (value instanceof Animation) {
                return this._remove(value, false);
            } else if (value instanceof Array) {
                var i = value.length;
                while (--i > -1) {
                    this.remove(value[i]);
                }
                return this;
            } else if (typeof(value) === "string") {
                return this.removeLabel(value);
            }
            return this.kill(null, value);
        }
        p.append = function(value, offset) {
            return this.insert(value, this.duration() + (offset || 0));
        }
        p.insertMultiple = function(tweens, timeOrLabel, align, stagger) {
            align = align || "normal";
            stagger = stagger || 0;
            var i, tween, curTime = this._parseTimeOrLabel(timeOrLabel || 0, true),
                l = tweens.length;
            for (i = 0; i < l; i++) {
                if ((tween = tweens[i]) instanceof Array) {
                    tween = new TimelineLite({
                        tweens: tween
                    });
                }
                this.insert(tween, curTime);
                if (typeof(tween) === "string" || typeof(tween) === "function") {} else if (align === "sequence") {
                    curTime = tween._startTime + (tween.totalDuration() / tween._timeScale);
                } else if (align === "start") {
                    tween._startTime -= tween.delay();
                }
                curTime += stagger;
            }
            return this._uncache(true);
        }
        p.appendMultiple = function(tweens, offset, align, stagger) {
            return this.insertMultiple(tweens, this.duration() + (offset || 0), align, stagger);
        }
        p.addLabel = function(label, time) {
            this._labels[label] = time;
            return this;
        }
        p.removeLabel = function(label) {
            delete this._labels[label];
            return this;
        }
        p.getLabelTime = function(label) {
            return (this._labels[label] != null) ? this._labels[label] : -1;
        }
        p._parseTimeOrLabel = function(timeOrLabel, appendIfAbsent) {
            if (timeOrLabel == null) {
                return this.duration();
            } else if (typeof(timeOrLabel) === "string" && isNaN(timeOrLabel)) {
                if (this._labels[timeOrLabel] == null) {
                    return (appendIfAbsent) ? (this._labels[timeOrLabel] = this.duration()) : 0;
                }
                return this._labels[timeOrLabel];
            }
            return Number(timeOrLabel);
        }
        p.seek = function(timeOrLabel, suppressEvents) {
            return this.totalTime(this._parseTimeOrLabel(timeOrLabel, false), (suppressEvents != false));
        }
        p.stop = function() {
            return this.paused(true);
        }
        p.gotoAndPlay = function(timeOrLabel, suppressEvents) {
            return SimpleTimeline.prototype.play.call(this, timeOrLabel, suppressEvents);
        }
        p.gotoAndStop = function(timeOrLabel, suppressEvents) {
            return this.pause(timeOrLabel, suppressEvents);
        }
        p.render = function(time, suppressEvents, force) {
            if (this._gc) {
                this._enabled(true, false);
            }
            this._active = !this._paused;
            var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                prevTime = this._time,
                prevStart = this._startTime,
                prevTimeScale = this._timeScale,
                prevPaused = this._paused,
                tween, isComplete, next, callback;
            if (time >= totalDur) {
                this._totalTime = this._time = totalDur;
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        isComplete = true;
                        callback = "onComplete";
                        if (this._duration === 0)
                            if (time === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== time) {
                                    force = true;
                                }
                    }
                this._rawPrevTime = time;
                time = totalDur + 0.000001;
            } else if (time <= 0) {
                this._totalTime = this._time = 0;
                if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
                    callback = "onReverseComplete";
                    isComplete = this._reversed;
                }
                if (time < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0) {
                            force = true;
                        }
                } else if (!this._initted) {
                    force = true;
                }
                this._rawPrevTime = time;
                time = -0.000001;
            } else {
                this._totalTime = this._time = this._rawPrevTime = time;
            }
            if (this._time === prevTime && !force) {
                return;
            } else if (!this._initted) {
                this._initted = true;
            }
            if (prevTime === 0)
                if (this.vars.onStart)
                    if (this._time !== 0)
                        if (!suppressEvents) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
                        }
            if (this._time > prevTime) {
                tween = this._first;
                while (tween) {
                    next = tween._next;
                    if (this._paused && !prevPaused) {
                        break;
                    } else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
                        if (!tween._reversed) {
                            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
                        } else {
                            tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
                        }
                    }
                    tween = next;
                }
            } else {
                tween = this._last;
                while (tween) {
                    next = tween._prev;
                    if (this._paused && !prevPaused) {
                        break;
                    } else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
                        if (!tween._reversed) {
                            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
                        } else {
                            tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
                        }
                    }
                    tween = next;
                }
            }
            if (this._onUpdate)
                if (!suppressEvents) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
                }
            if (callback)
                if (!this._gc)
                    if (prevStart === this._startTime || prevTimeScale != this._timeScale)
                        if (this._time === 0 || totalDur >= this.totalDuration()) {
                            if (isComplete) {
                                if (this._timeline.autoRemoveChildren) {
                                    this._enabled(false, false);
                                }
                                this._active = false;
                            }
                            if (!suppressEvents)
                                if (this.vars[callback]) {
                                    this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
                                }
                        }
        }
        p._hasPausedChild = function() {
            var tween = this._first;
            while (tween) {
                if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {
                    return true;
                }
                tween = tween._next;
            }
            return false;
        }
        p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {
            ignoreBeforeTime = ignoreBeforeTime || -9999999999;
            var a = [],
                tween = this._first,
                cnt = 0;
            while (tween) {
                if (tween._startTime < ignoreBeforeTime) {} else if (tween instanceof TweenLite) {
                    if (tweens != false) {
                        a[cnt++] = tween;
                    }
                } else {
                    if (timelines != false) {
                        a[cnt++] = tween;
                    }
                    if (nested != false) {
                        a = a.concat(tween.getChildren(true, tweens, timelines));
                        cnt = a.length;
                    }
                }
                tween = tween._next;
            }
            return a;
        }
        p.getTweensOf = function(target, nested) {
            var tweens = TweenLite.getTweensOf(target),
                i = tweens.length,
                a = [],
                cnt = 0;
            while (--i > -1) {
                if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {
                    a[cnt++] = tweens[i];
                }
            }
            return a;
        }
        p._contains = function(tween) {
            var tl = tween.timeline;
            while (tl) {
                if (tl === this) {
                    return true;
                }
                tl = tl.timeline;
            }
            return false;
        }
        p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {
            ignoreBeforeTime = ignoreBeforeTime || 0;
            var tween = this._first;
            while (tween) {
                if (tween._startTime >= ignoreBeforeTime) {
                    tween._startTime += amount;
                }
                tween = tween._next;
            }
            if (adjustLabels) {
                for (var p in this._labels) {
                    if (this._labels[p] >= ignoreBeforeTime) {
                        this._labels[p] += amount;
                    }
                }
            }
            return this._uncache(true);
        }
        p._kill = function(vars, target) {
            if (vars == null)
                if (target == null) {
                    return this._enabled(false, false);
                }
            var tweens = (target == null) ? this.getChildren(true, true, false) : this.getTweensOf(target),
                i = tweens.length,
                changed = false;
            while (--i > -1) {
                if (tweens[i]._kill(vars, target)) {
                    changed = true;
                }
            }
            return changed;
        }
        p.clear = function(labels) {
            var tweens = this.getChildren(false, true, true),
                i = tweens.length;
            this._time = this._totalTime = 0;
            while (--i > -1) {
                tweens[i]._enabled(false, false);
            }
            if (labels != false) {
                this._labels = {};
            }
            return this._uncache(true);
        }
        p.invalidate = function() {
            var tween = this._first;
            while (tween) {
                tween.invalidate();
                tween = tween._next;
            }
            return this;
        }
        p._enabled = function(enabled, ignoreTimeline) {
            if (enabled == this._gc) {
                var tween = this._first;
                while (tween) {
                    tween._enabled(enabled, true);
                    tween = tween._next;
                }
            }
            return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);
        }
        p.progress = function(value) {
            return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, false);
        }
        p.duration = function(value) {
            if (!arguments.length) {
                if (this._dirty) {
                    this.totalDuration();
                }
                return this._duration;
            }
            if (this.duration() !== 0)
                if (value !== 0) {
                    this.timeScale(this._duration / value);
                }
            return this;
        }
        p.totalDuration = function(value) {
            if (!arguments.length) {
                if (this._dirty) {
                    var max = 0,
                        tween = this._first,
                        prevStart = -999999999999,
                        next, end;
                    while (tween) {
                        next = tween._next;
                        if (tween._startTime < prevStart && this._sortChildren) {
                            this.insert(tween, tween._startTime - tween._delay);
                        } else {
                            prevStart = tween._startTime;
                        }
                        if (tween._startTime < 0) {
                            max -= tween._startTime;
                            this.shiftChildren(-tween._startTime, false, -9999999999);
                        }
                        end = tween._startTime + ((!tween._dirty ? tween._totalDuration : tween.totalDuration()) / tween._timeScale);
                        if (end > max) {
                            max = end;
                        }
                        tween = next;
                    }
                    this._duration = this._totalDuration = max;
                    this._dirty = false;
                }
                return this._totalDuration;
            }
            if (this.totalDuration() !== 0)
                if (value !== 0) {
                    this.timeScale(this._totalDuration / value);
                }
            return this;
        }
        p.usesFrames = function() {
            var tl = this._timeline;
            while (tl._timeline) {
                tl = tl._timeline;
            }
            return (tl === Animation._rootFramesTimeline);
        }
        p.rawTime = function() {
            return (this._paused || (this._totalTime !== 0 && this._totalTime !== this._totalDuration)) ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;
        }
        return TimelineLite;
    }, true);
    _gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(TimelineLite, TweenLite, Ease) {
        var TimelineMax = function(vars) {
                TimelineLite.call(this, vars);
                this._repeat = this.vars.repeat || 0;
                this._repeatDelay = this.vars.repeatDelay || 0;
                this._cycle = 0;
                this._yoyo = (this.vars.yoyo == true);
                this._dirty = true;
            },
            _blankArray = [],
            _easeNone = new Ease(null, null, 1, 0),
            _getGlobalPaused = function(tween) {
                while (tween) {
                    if (tween._paused) {
                        return true;
                    }
                    tween = tween._timeline;
                }
                return false;
            },
            p = TimelineMax.prototype = new TimelineLite();
        p.constructor = TimelineMax;
        p.kill()._gc = false;
        TimelineMax.version = 12.0;
        p.invalidate = function() {
            this._yoyo = (this.vars.yoyo == true);
            this._repeat = this.vars.repeat || 0;
            this._repeatDelay = this.vars.repeatDelay || 0;
            this._uncache(true);
            return TimelineLite.prototype.invalidate.call(this);
        }
        p.addCallback = function(callback, timeOrLabel, params, scope) {
            return this.insert(TweenLite.delayedCall(0, callback, params, scope), timeOrLabel);
        }
        p.removeCallback = function(callback, timeOrLabel) {
            if (timeOrLabel == null) {
                this._kill(null, callback);
            } else {
                var a = this.getTweensOf(callback, false),
                    i = a.length,
                    time = this._parseTimeOrLabel(timeOrLabel, false);
                while (--i > -1) {
                    if (a[i]._startTime === time) {
                        a[i]._enabled(false, false);
                    }
                }
            }
            return this;
        }
        p.tweenTo = function(timeOrLabel, vars) {
            vars = vars || {};
            var copy = {
                    ease: _easeNone,
                    overwrite: 2,
                    useFrames: this.usesFrames(),
                    immediateRender: false
                },
                p, t;
            for (p in vars) {
                copy[p] = vars[p];
            }
            copy.time = this._parseTimeOrLabel(timeOrLabel, false);
            t = new TweenLite(this, (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001, copy);
            copy.onStart = function() {
                t.target.paused(true);
                if (t.vars.time != t.target.time()) {
                    t.duration(Math.abs(t.vars.time - t.target.time()) / t.target._timeScale);
                }
                if (vars.onStart) {
                    vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);
                }
            }
            return t;
        }
        p.tweenFromTo = function(fromTimeOrLabel, toTimeOrLabel, vars) {
            vars = vars || {};
            vars.startAt = {
                time: this._parseTimeOrLabel(fromTimeOrLabel, false)
            };
            var t = this.tweenTo(toTimeOrLabel, vars);
            return t.duration((Math.abs(t.vars.time - t.vars.startAt.time) / this._timeScale) || 0.001);
        }
        p.render = function(time, suppressEvents, force) {
            if (this._gc) {
                this._enabled(true, false);
            }
            this._active = !this._paused;
            var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),
                prevTime = this._time,
                prevTotalTime = this._totalTime,
                prevStart = this._startTime,
                prevTimeScale = this._timeScale,
                prevRawPrevTime = this._rawPrevTime,
                prevPaused = this._paused,
                prevCycle = this._cycle,
                tween, isComplete, next, dur, callback;
            if (time >= totalDur) {
                if (!this._locked) {
                    this._totalTime = totalDur;
                    this._cycle = this._repeat;
                }
                if (!this._reversed)
                    if (!this._hasPausedChild()) {
                        isComplete = true;
                        callback = "onComplete";
                        if (this._duration === 0)
                            if (time === 0 || this._rawPrevTime < 0)
                                if (this._rawPrevTime !== time) {
                                    force = true;
                                }
                    }
                this._rawPrevTime = time;
                if (this._yoyo && (this._cycle & 1) !== 0) {
                    this._time = 0;
                    time = -0.000001;
                } else {
                    this._time = this._duration;
                    time = this._duration + 0.000001;
                }
            } else if (time <= 0) {
                if (!this._locked) {
                    this._totalTime = this._cycle = 0;
                }
                this._time = 0;
                if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
                    callback = "onReverseComplete";
                    isComplete = this._reversed;
                }
                if (time < 0) {
                    this._active = false;
                    if (this._duration === 0)
                        if (this._rawPrevTime >= 0) {
                            force = true;
                        }
                } else if (!this._initted) {
                    force = true;
                }
                this._rawPrevTime = time;
                time = -0.000001;
            } else {
                this._time = this._rawPrevTime = time;
                if (!this._locked) {
                    this._totalTime = time;
                    if (this._repeat !== 0) {
                        var cycleDuration = this._duration + this._repeatDelay;
                        this._cycle = (this._totalTime / cycleDuration) >> 0;
                        if (this._cycle !== 0)
                            if (this._cycle === this._totalTime / cycleDuration) {
                                this._cycle--;
                            }
                        this._time = this._totalTime - (this._cycle * cycleDuration);
                        if (this._yoyo)
                            if ((this._cycle & 1) != 0) {
                                this._time = this._duration - this._time;
                            }
                        if (this._time > this._duration) {
                            this._time = this._duration;
                            time = this._duration + 0.000001;
                        } else if (this._time < 0) {
                            this._time = 0;
                            time = -0.000001;
                        } else {
                            time = this._time;
                        }
                    }
                }
            }
            if (this._cycle !== prevCycle)
                if (!this._locked) {
                    var backwards = (this._yoyo && (prevCycle & 1) !== 0),
                        wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),
                        recTotalTime = this._totalTime,
                        recCycle = this._cycle,
                        recRawPrevTime = this._rawPrevTime,
                        recTime = this._time;
                    this._totalTime = prevCycle * this._duration;
                    if (this._cycle < prevCycle) {
                        backwards = !backwards;
                    } else {
                        this._totalTime += this._duration;
                    }
                    this._time = prevTime;
                    this._rawPrevTime = prevRawPrevTime;
                    this._cycle = prevCycle;
                    this._locked = true;
                    prevTime = (backwards) ? 0 : this._duration;
                    this.render(prevTime, suppressEvents, false);
                    if (!suppressEvents)
                        if (!this._gc) {
                            if (this.vars.onRepeat) {
                                this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);
                            }
                        }
                    if (wrap) {
                        prevTime = (backwards) ? this._duration + 0.000001 : -0.000001;
                        this.render(prevTime, true, false);
                    }
                    this._time = recTime;
                    this._totalTime = recTotalTime;
                    this._cycle = recCycle;
                    this._rawPrevTime = recRawPrevTime;
                    this._locked = false;
                }
            if (this._time === prevTime && !force) {
                return;
            } else if (!this._initted) {
                this._initted = true;
            }
            if (prevTotalTime === 0)
                if (this.vars.onStart)
                    if (this._totalTime !== 0)
                        if (!suppressEvents) {
                            this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
                        }
            if (this._time > prevTime) {
                tween = this._first;
                while (tween) {
                    next = tween._next;
                    if (this._paused && !prevPaused) {
                        break;
                    } else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {
                        if (!tween._reversed) {
                            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
                        } else {
                            tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
                        }
                    }
                    tween = next;
                }
            } else {
                tween = this._last;
                while (tween) {
                    next = tween._prev;
                    if (this._paused && !prevPaused) {
                        break;
                    } else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {
                        if (!tween._reversed) {
                            tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
                        } else {
                            tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
                        }
                    }
                    tween = next;
                }
            }
            if (this._onUpdate)
                if (!suppressEvents) {
                    this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
                }
            if (callback)
                if (!this._locked)
                    if (!this._gc)
                        if (prevStart === this._startTime || prevTimeScale != this._timeScale)
                            if (this._time === 0 || totalDur >= this.totalDuration()) {
                                if (isComplete) {
                                    if (this._timeline.autoRemoveChildren) {
                                        this._enabled(false, false);
                                    }
                                    this._active = false;
                                }
                                if (!suppressEvents)
                                    if (this.vars[callback]) {
                                        this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
                                    }
                            }
        }
        p.getActive = function(nested, tweens, timelines) {
            if (nested == null) {
                nested = true;
            }
            if (tweens == null) {
                tweens = true;
            }
            if (timelines == null) {
                timelines = false;
            }
            var a = [],
                all = this.getChildren(nested, tweens, timelines),
                cnt = 0,
                l = all.length,
                i, tween;
            for (i = 0; i < l; i++) {
                tween = all[i];
                if (!tween._paused)
                    if (tween._timeline._time >= tween._startTime)
                        if (tween._timeline._time < tween._startTime + tween._totalDuration / tween._timeScale)
                            if (!_getGlobalPaused(tween._timeline)) {
                                a[cnt++] = tween;
                            }
            }
            return a;
        }
        p.getLabelAfter = function(time) {
            if (!time)
                if (time !== 0) {
                    time = this._time;
                }
            var labels = this.getLabelsArray(),
                l = labels.length,
                i;
            for (i = 0; i < l; i++) {
                if (labels[i].time > time) {
                    return labels[i].name;
                }
            }
            return null;
        }
        p.getLabelBefore = function(time) {
            if (time == null) {
                time = this._time;
            }
            var labels = this.getLabelsArray(),
                i = labels.length;
            while (--i > -1) {
                if (labels[i].time < time) {
                    return labels[i].name;
                }
            }
            return null;
        }
        p.getLabelsArray = function() {
            var a = [],
                cnt = 0,
                p;
            for (p in this._labels) {
                a[cnt++] = {
                    time: this._labels[p],
                    name: p
                };
            }
            a.sort(function(a, b) {
                return a.time - b.time;
            });
            return a;
        }
        p.progress = function(value) {
            return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value + (this._cycle * this._duration), false);
        }
        p.totalProgress = function(value) {
            return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime(this.totalDuration() * value, false);
        }
        p.totalDuration = function(value) {
            if (!arguments.length) {
                if (this._dirty) {
                    TimelineLite.prototype.totalDuration.call(this);
                    this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
                }
                return this._totalDuration;
            }
            return (this._repeat == -1) ? this : this.duration((value - (this._repeat * this._repeatDelay)) / (this._repeat + 1));
        }
        p.time = function(value, suppressEvents) {
            if (!arguments.length) {
                return this._time;
            }
            if (this._dirty) {
                this.totalDuration();
            }
            if (value > this._duration) {
                value = this._duration;
            }
            if (this._yoyo && (this._cycle & 1) !== 0) {
                value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));
            } else if (this._repeat != 0) {
                value += this._cycle * (this._duration + this._repeatDelay);
            }
            return this.totalTime(value, suppressEvents);
        }
        p.repeat = function(value) {
            if (!arguments.length) {
                return this._repeat;
            }
            this._repeat = value;
            return this._uncache(true);
        }
        p.repeatDelay = function(value) {
            if (!arguments.length) {
                return this._repeatDelay;
            }
            this._repeatDelay = value;
            return this._uncache(true);
        }
        p.yoyo = function(value) {
            if (!arguments.length) {
                return this._yoyo;
            }
            this._yoyo = value;
            return this;
        }
        p.currentLabel = function(value) {
            if (!arguments.length) {
                return this.getLabelBefore(this._time + 0.00000001);
            }
            return this.seek(value, true);
        }
        return TimelineMax;
    }, true);
    _gsDefine("plugins.BezierPlugin", ["plugins.TweenPlugin"], function(TweenPlugin) {
        var BezierPlugin = function(props, priority) {
                TweenPlugin.call(this, "bezier", -1);
                this._overwriteProps.pop();
                this._func = {};
                this._round = {};
            },
            p = BezierPlugin.prototype = new TweenPlugin("bezier", 1),
            _RAD2DEG = 180 / Math.PI,
            _r1 = [],
            _r2 = [],
            _r3 = [],
            _corProps = {},
            Segment = function Segment(a, b, c, d) {
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.da = d - a;
                this.ca = c - a;
                this.ba = b - a;
            },
            _correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
            bezierThrough = BezierPlugin.bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {
                var obj = {},
                    props = [],
                    i, p;
                correlate = (typeof(correlate) === "string") ? "," + correlate + "," : _correlate;
                if (curviness == null) {
                    curviness = 1;
                }
                for (p in values[0]) {
                    props.push(p);
                }
                _r1.length = _r2.length = _r3.length = 0;
                i = props.length;
                while (--i > -1) {
                    p = props[i];
                    _corProps[p] = (correlate.indexOf("," + p + ",") !== -1);
                    obj[p] = _parseAnchors(values, p, _corProps[p], prepend);
                }
                i = _r1.length;
                while (--i > -1) {
                    _r1[i] = Math.sqrt(_r1[i]);
                    _r2[i] = Math.sqrt(_r2[i]);
                }
                if (!basic) {
                    i = props.length;
                    while (--i > -1) {
                        if (_corProps[p]) {
                            a = obj[props[i]];
                            l = a.length - 1;
                            for (j = 0; j < l; j++) {
                                r = a[j + 1].da / _r2[j] + a[j].da / _r1[j];
                                _r3[j] = (_r3[j] || 0) + r * r;
                            }
                        }
                    }
                    i = _r3.length;
                    while (--i > -1) {
                        _r3[i] = Math.sqrt(_r3[i]);
                    }
                }
                i = props.length;
                while (--i > -1) {
                    p = props[i];
                    _calculateControlPoints(obj[p], curviness, quadratic, basic, _corProps[p]);
                }
                return obj;
            },
            _parseBezierData = function(values, type, prepend) {
                type = type || "soft";
                var obj = {},
                    inc = (type === "cubic") ? 3 : 2,
                    soft = (type === "soft"),
                    props = [],
                    a, b, c, d, cur, i, j, l, p, cnt, tmp;
                if (soft && prepend) {
                    values = [prepend].concat(values);
                }
                if (values == null || values.length < inc + 1) {
                    throw "invalid Bezier data";
                }
                for (p in values[0]) {
                    props.push(p);
                }
                i = props.length;
                while (--i > -1) {
                    p = props[i];
                    obj[p] = cur = [];
                    cnt = 0;
                    l = values.length;
                    for (j = 0; j < l; j++) {
                        a = (prepend == null) ? values[j][p] : (typeof((tmp = values[j][p])) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
                        if (soft)
                            if (j > 1)
                                if (j < l - 1) {
                                    cur[cnt++] = (a + cur[cnt - 2]) / 2;
                                }
                        cur[cnt++] = a;
                    }
                    l = cnt - inc + 1;
                    cnt = 0;
                    for (j = 0; j < l; j += inc) {
                        a = cur[j];
                        b = cur[j + 1];
                        c = cur[j + 2];
                        d = (inc === 2) ? 0 : cur[j + 3];
                        cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
                    }
                    cur.length = cnt;
                }
                return obj;
            },
            _parseAnchors = function(values, p, correlate, prepend) {
                var a = [],
                    l, i, obj, p1, p2, p3, r1, tmp;
                if (prepend) {
                    values = [prepend].concat(values);
                    i = values.length;
                    while (--i > -1) {
                        if (typeof((tmp = values[i][p])) === "string")
                            if (tmp.charAt(1) === "=") {
                                values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2));
                            }
                    }
                }
                l = values.length - 2;
                if (l < 0) {
                    a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);
                    return a;
                }
                for (i = 0; i < l; i++) {
                    p1 = values[i][p];
                    p2 = values[i + 1][p];
                    a[i] = new Segment(p1, 0, 0, p2);
                    if (correlate) {
                        p3 = values[i + 2][p];
                        _r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);
                        _r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);
                    }
                }
                a[i] = new Segment(values[i][p], 0, 0, values[i + 1][p]);
                return a;
            },
            _calculateControlPoints = function(a, curviness, quad, basic, correlate) {
                var l = a.length - 1,
                    ii = 0,
                    cp1 = a[0].a,
                    i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;
                for (i = 0; i < l; i++) {
                    seg = a[ii];
                    p1 = seg.a;
                    p2 = seg.d;
                    p3 = a[ii + 1].d;
                    if (correlate) {
                        r1 = _r1[i];
                        r2 = _r2[i];
                        tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);
                        m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : tl / r1);
                        m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : tl / r2);
                        mm = p2 - (m1 + (m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4);
                    } else {
                        m1 = p2 - (p2 - p1) * curviness * 0.5;
                        m2 = p2 + (p3 - p2) * curviness * 0.5;
                        mm = p2 - (m1 + m2) / 2;
                    }
                    m1 += mm;
                    m2 += mm;
                    seg.c = cp2 = m1;
                    if (i != 0) {
                        seg.b = cp1;
                    } else {
                        seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6;
                    }
                    seg.da = p2 - p1;
                    seg.ca = cp2 - p1;
                    seg.ba = cp1 - p1;
                    if (quad) {
                        qb = cubicToQuadratic(p1, cp1, cp2, p2);
                        a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
                        ii += 4;
                    } else {
                        ii++;
                    }
                    cp1 = m2;
                }
                seg = a[ii];
                seg.b = cp1;
                seg.c = cp1 + (seg.d - cp1) * 0.4;
                seg.da = seg.d - seg.a;
                seg.ca = seg.c - seg.a;
                seg.ba = cp1 - seg.a;
                if (quad) {
                    qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);
                    a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);
                }
            },
            cubicToQuadratic = BezierPlugin.cubicToQuadratic = function(a, b, c, d) {
                var q1 = {
                        a: a
                    },
                    q2 = {},
                    q3 = {},
                    q4 = {
                        c: d
                    },
                    mab = (a + b) / 2,
                    mbc = (b + c) / 2,
                    mcd = (c + d) / 2,
                    mabc = (mab + mbc) / 2,
                    mbcd = (mbc + mcd) / 2,
                    m8 = (mbcd - mabc) / 8;
                q1.b = mab + (a - mab) / 4;
                q2.b = mabc + m8;
                q1.c = q2.a = (q1.b + q2.b) / 2;
                q2.c = q3.a = (mabc + mbcd) / 2;
                q3.b = mbcd - m8;
                q4.b = mcd + (d - mcd) / 4;
                q3.c = q4.a = (q3.b + q4.b) / 2;
                return [q1, q2, q3, q4];
            },
            quadraticToCubic = BezierPlugin.quadraticToCubic = function(a, b, c) {
                return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
            },
            _parseLengthData = function(obj, resolution) {
                resolution = resolution >> 0 || 6;
                var a = [],
                    lengths = [],
                    d = 0,
                    total = 0,
                    threshold = resolution - 1,
                    segments = [],
                    curLS = [],
                    p, i, l, index;
                for (p in obj) {
                    _addCubicLengths(obj[p], a, resolution);
                }
                l = a.length;
                for (i = 0; i < l; i++) {
                    d += Math.sqrt(a[i]);
                    index = i % resolution;
                    curLS[index] = d;
                    if (index === threshold) {
                        total += d;
                        index = (i / resolution) >> 0;
                        segments[index] = curLS;
                        lengths[index] = total;
                        d = 0;
                        curLS = [];
                    }
                }
                return {
                    length: total,
                    lengths: lengths,
                    segments: segments
                };
            },
            _addCubicLengths = function(a, steps, resolution) {
                var inc = 1 / resolution,
                    j = a.length,
                    d, d1, s, da, ca, ba, p, i, inv, bez, index;
                while (--j > -1) {
                    bez = a[j];
                    s = bez.a;
                    da = bez.d - s;
                    ca = bez.c - s;
                    ba = bez.b - s;
                    d = d1 = 0;
                    for (i = 1; i <= resolution; i++) {
                        p = inc * i;
                        inv = 1 - p;
                        d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);
                        index = j * resolution + i - 1;
                        steps[index] = (steps[index] || 0) + d * d;
                    }
                }
            };
        p.constructor = BezierPlugin;
        BezierPlugin.API = 2;
        p._onInitTween = function(target, vars, tween) {
            this._target = target;
            if (vars instanceof Array) {
                vars = {
                    values: vars
                };
            }
            this._props = [];
            this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution);
            var values = vars.values || [],
                first = {},
                second = values[0],
                autoRotate = vars.autoRotate || tween.vars.orientToBezier,
                p, isFunc, i, j, prepend;
            this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [
                ["x", "y", "rotation", ((autoRotate === true) ? 0 : Number(autoRotate) || 0)]
            ] : null;
            for (p in second) {
                this._props.push(p);
            }
            i = this._props.length;
            while (--i > -1) {
                p = this._props[i];
                this._overwriteProps.push(p);
                isFunc = this._func[p] = (typeof(target[p]) === "function");
                first[p] = (!isFunc) ? parseFloat(target[p]) : target[((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]();
                if (!prepend)
                    if (first[p] !== values[0][p]) {
                        prepend = first;
                    }
            }
            this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
            this._segCount = this._beziers[p].length;
            if (this._timeRes) {
                var ld = _parseLengthData(this._beziers, this._timeRes);
                this._length = ld.length;
                this._lengths = ld.lengths;
                this._segments = ld.segments;
                this._l1 = this._li = this._s1 = this._si = 0;
                this._l2 = this._lengths[0];
                this._curSeg = this._segments[0];
                this._s2 = this._curSeg[0];
                this._prec = 1 / this._curSeg.length;
            }
            if ((autoRotate = this._autoRotate)) {
                if (!(autoRotate[0] instanceof Array)) {
                    this._autoRotate = autoRotate = [autoRotate];
                }
                i = autoRotate.length;
                while (--i > -1) {
                    for (j = 0; j < 3; j++) {
                        p = autoRotate[i][j];
                        this._func[p] = (typeof(target[p]) === "function") ? target[((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))] : false;
                    }
                }
            }
            return true;
        }
        p.setRatio = function(v) {
            var segments = this._segCount,
                func = this._func,
                target = this._target,
                curIndex, inv, i, p, b, t, val, l, lengths, curSeg;
            if (!this._timeRes) {
                curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;
                t = (v - (curIndex * (1 / segments))) * segments;
            } else {
                lengths = this._lengths;
                curSeg = this._curSeg;
                v *= this._length;
                i = this._li;
                if (v > this._l2 && i < segments - 1) {
                    l = segments - 1;
                    while (i < l && (this._l2 = lengths[++i]) <= v) {}
                    this._l1 = lengths[i - 1];
                    this._li = i;
                    this._curSeg = curSeg = this._segments[i];
                    this._s2 = curSeg[(this._s1 = this._si = 0)];
                } else if (v < this._l1 && i > 0) {
                    while (i > 0 && (this._l1 = lengths[--i]) >= v) {}
                    if (i === 0 && v < this._l1) {
                        this._l1 = 0;
                    } else {
                        i++;
                    }
                    this._l2 = lengths[i];
                    this._li = i;
                    this._curSeg = curSeg = this._segments[i];
                    this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;
                    this._s2 = curSeg[this._si];
                }
                curIndex = i;
                v -= this._l1;
                i = this._si;
                if (v > this._s2 && i < curSeg.length - 1) {
                    l = curSeg.length - 1;
                    while (i < l && (this._s2 = curSeg[++i]) <= v) {}
                    this._s1 = curSeg[i - 1];
                    this._si = i;
                } else if (v < this._s1 && i > 0) {
                    while (i > 0 && (this._s1 = curSeg[--i]) >= v) {}
                    if (i === 0 && v < this._s1) {
                        this._s1 = 0;
                    } else {
                        i++;
                    }
                    this._s2 = curSeg[i];
                    this._si = i;
                }
                t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec;
            }
            inv = 1 - t;
            i = this._props.length;
            while (--i > -1) {
                p = this._props[i];
                b = this._beziers[p][curIndex];
                val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;
                if (this._round[p]) {
                    val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0;
                }
                if (func[p]) {
                    target[p](val);
                } else {
                    target[p] = val;
                }
            }
            if (this._autoRotate) {
                var ar = this._autoRotate,
                    b2, x1, y1, x2, y2, add, conv;
                i = ar.length;
                while (--i > -1) {
                    p = ar[i][2];
                    add = ar[i][3] || 0;
                    conv = (ar[i][4] == true) ? 1 : _RAD2DEG;
                    b = this._beziers[ar[i][0]][curIndex];
                    b2 = this._beziers[ar[i][1]][curIndex];
                    x1 = b.a + (b.b - b.a) * t;
                    x2 = b.b + (b.c - b.b) * t;
                    x1 += (x2 - x1) * t;
                    x2 += ((b.c + (b.d - b.c) * t) - x2) * t;
                    y1 = b2.a + (b2.b - b2.a) * t;
                    y2 = b2.b + (b2.c - b2.b) * t;
                    y1 += (y2 - y1) * t;
                    y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;
                    val = Math.atan2(y2 - y1, x2 - x1) * conv + add;
                    if (func[p]) {
                        func[p].call(target, val);
                    } else {
                        target[p] = val;
                    }
                }
            }
        }
        p._roundProps = function(lookup, value) {
            var op = this._overwriteProps,
                i = op.length;
            while (--i > -1) {
                if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {
                    this._round[op[i]] = value;
                }
            }
        }
        p._kill = function(lookup) {
            var a = this._props,
                p, i;
            for (p in _beziers) {
                if (p in lookup) {
                    delete this._beziers[p];
                    delete this._func[p];
                    i = a.length;
                    while (--i > -1) {
                        if (a[i] === p) {
                            a.splice(i, 1);
                        }
                    }
                }
            }
            return TweenPlugin.prototype._kill.call(this, lookup);
        }
        TweenPlugin.activate([BezierPlugin]);
        return BezierPlugin;
    }, true);
    _gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(TweenPlugin, TweenLite) {
        "use strict";
        var CSSPlugin = function() {
                TweenPlugin.call(this, "css");
                this._overwriteProps.pop();
            },
            p = CSSPlugin.prototype = new TweenPlugin("css");
        p.constructor = CSSPlugin;
        CSSPlugin.API = 2;
        CSSPlugin.suffixMap = {
            top: "px",
            right: "px",
            bottom: "px",
            left: "px",
            width: "px",
            height: "px",
            fontSize: "px",
            padding: "px",
            margin: "px"
        };
        var _NaNExp = /[^\d\-\.]/g,
            _suffixExp = /(\d|\-|\+|=|#|\.)*/g,
            _numExp = /(\d|\.)+/g,
            _opacityExp = /opacity *= *([^)]*)/,
            _opacityValExp = /opacity:([^;]*)/,
            _capsExp = /([A-Z])/g,
            _camelExp = /-([a-z])/gi,
            _camelFunc = function(s, g) {
                return g.toUpperCase();
            },
            _horizExp = /(Left|Right|Width)/i,
            _ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            _ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            _DEG2RAD = Math.PI / 180,
            _RAD2DEG = 180 / Math.PI,
            _forcePT = {},
            _doc = document,
            _tempDiv = _doc.createElement("div"),
            _agent = navigator.userAgent,
            _autoRound, _reqSafariFix, _isSafari, _ieVers, _supportsOpacity = (function() {
                var i = _agent.indexOf("Android"),
                    d = _doc.createElement("div"),
                    a;
                _isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i + 8, 1)) > 3));
                (/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent);
                _ieVers = parseFloat(RegExp.$1);
                d.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>";
                a = d.getElementsByTagName("a")[0];
                return a ? /^0.55/.test(a.style.opacity) : false;
            })(),
            _parseColor = function(v) {
                if (!v || v === "") {
                    return _colorLookup.black;
                } else if (_colorLookup[v]) {
                    return _colorLookup[v];
                } else if (typeof(v) === "number") {
                    return [v >> 16, (v >> 8) & 255, v & 255];
                } else if (v.charAt(0) === "#") {
                    if (v.length === 4) {
                        var c1 = v.charAt(1),
                            c2 = v.charAt(2),
                            c3 = v.charAt(3);
                        v = "#" + c1 + c1 + c2 + c2 + c3 + c3;
                    }
                    v = parseInt(v.substr(1), 16);
                    return [v >> 16, (v >> 8) & 255, v & 255];
                } else {
                    return v.match(_numExp) || _colorLookup.transparent;
                }
            },
            _getIEOpacity = function(obj) {
                return (_opacityExp.test(((typeof(obj) === "string") ? obj : (obj.currentStyle ? obj.currentStyle.filter : obj.style.filter) || "")) ? (parseFloat(RegExp.$1) / 100) : 1);
            },
            _getComputedStyle = (_doc.defaultView) ? _doc.defaultView.getComputedStyle : function(o, s) {},
            _getStyle = function(t, p, cs, calc) {
                if (!_supportsOpacity && p === "opacity") {
                    return _getIEOpacity(t);
                } else if (!calc && t.style[p]) {
                    return t.style[p];
                } else if ((cs = cs || _getComputedStyle(t, null))) {
                    t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
                    return (t || cs.length) ? t : cs[p];
                } else if (t.currentStyle) {
                    cs = t.currentStyle, calc = cs[p];
                    if (!calc && p === "backgroundPosition") {
                        return cs[p + "X"] + " " + cs[p + "Y"];
                    }
                    return calc;
                }
                return null;
            },
            _getStyles = function(t, cs) {
                var s = {},
                    i;
                if ((cs = cs || _getComputedStyle(t, null))) {
                    if ((i = cs.length)) {
                        while (--i > -1) {
                            s[cs[i].replace(_camelExp, _camelFunc)] = cs.getPropertyValue(cs[i]);
                        }
                    } else {
                        for (i in cs) {
                            s[i] = cs[i];
                        }
                    }
                } else if ((cs = t.currentStyle || t.style)) {
                    for (i in cs) {
                        s[i.replace(_camelExp, _camelFunc)] = cs[i];
                    }
                }
                if (!_supportsOpacity) {
                    s.opacity = _getIEOpacity(t);
                }
                var tr = _getTransform(t, cs, false);
                s.rotation = tr.rotation * _RAD2DEG;
                s.skewX = tr.skewX * _RAD2DEG;
                s.scaleX = tr.scaleX;
                s.scaleY = tr.scaleY;
                s.x = tr.x;
                s.y = tr.y;
                if (s.filters != null) {
                    delete s.filters;
                }
                return s;
            },
            _cssDif = function(s1, s2, v, d) {
                var s = {},
                    val, p;
                for (p in s2) {
                    if (p !== "cssText")
                        if (p !== "length")
                            if (isNaN(p))
                                if (s1[p] != (val = s2[p]))
                                    if (val !== _transformProp)
                                        if (typeof(val) === "number" || typeof(val) === "string") {
                                            s[p] = ((val === "" || val === "auto") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val;
                                            if (d) {
                                                d.props.push(p);
                                            }
                                        }
                }
                if (v) {
                    for (p in v) {
                        if (p !== "className") {
                            s[p] = v[p];
                        }
                    }
                }
                return s;
            },
            _transformMap = {
                scaleX: 1,
                scaleY: 1,
                x: 1,
                y: 1,
                rotation: 1,
                shortRotation: 1,
                skewX: 1,
                skewY: 1,
                scale: 1
            },
            _prefixCSS = "",
            _prefix = "",
            _checkPropPrefix = function(p, e) {
                e = e || _tempDiv;
                var s = e.style,
                    a, i;
                if (s[p] !== undefined) {
                    return p;
                }
                p = p.substr(0, 1).toUpperCase() + p.substr(1);
                a = ["O", "Moz", "ms", "Ms", "Webkit"];
                i = 5;
                while (--i > -1 && s[a[i] + p] === undefined) {}
                if (i >= 0) {
                    _prefix = (i === 3) ? "ms" : a[i];
                    _prefixCSS = "-" + _prefix.toLowerCase() + "-";
                    return _prefix + p;
                }
                return null;
            },
            _transformProp = _checkPropPrefix("transform"),
            _transformPropCSS = _prefixCSS + "transform",
            _getTransform = function(t, cs, rec) {
                var tm = t._gsTransform,
                    s;
                if (_transformProp) {
                    s = _getStyle(t, _transformPropCSS, cs, true);
                } else if (t.currentStyle) {
                    s = t.currentStyle.filter.match(_ieGetMatrixExp);
                    s = (s && s.length === 4) ? s[0].substr(4) + "," + Number(s[2].substr(4)) + "," + Number(s[1].substr(4)) + "," + s[3].substr(4) + "," + (tm ? tm.x : 0) + "," + (tm ? tm.y : 0) : null;
                }
                var v = (s || "").replace(/[^\d\-\.e,]/g, "").split(","),
                    k = (v.length >= 6),
                    a = k ? Number(v[0]) : 1,
                    b = k ? Number(v[1]) : 0,
                    c = k ? Number(v[2]) : 0,
                    d = k ? Number(v[3]) : 1,
                    min = 0.000001,
                    m = rec ? tm || {
                        skewY: 0
                    } : {
                        skewY: 0
                    },
                    invX = (m.scaleX < 0);
                m.x = (k ? Number(v[4]) : 0);
                m.y = (k ? Number(v[5]) : 0);
                m.scaleX = Math.sqrt(a * a + b * b);
                m.scaleY = Math.sqrt(d * d + c * c);
                m.rotation = (a || b) ? Math.atan2(b, a) : m.rotation || 0;
                m.skewX = (c || d) ? Math.atan2(c, d) + m.rotation : m.skewX || 0;
                if (Math.abs(m.skewX) > Math.PI / 2 && Math.abs(m.skewX) < Math.PI * 1.5) {
                    if (invX) {
                        m.scaleX *= -1;
                        m.skewX += (m.rotation <= 0) ? Math.PI : -Math.PI;
                        m.rotation += (m.rotation <= 0) ? Math.PI : -Math.PI;
                    } else {
                        m.scaleY *= -1;
                        m.skewX += (m.skewX <= 0) ? Math.PI : -Math.PI;
                    }
                }
                if (m.rotation < min)
                    if (m.rotation > -min)
                        if (a || b) {
                            m.rotation = 0;
                        }
                if (m.skewX < min)
                    if (m.skewX > -min)
                        if (b || c) {
                            m.skewX = 0;
                        }
                if (rec) {
                    t._gsTransform = m;
                }
                return m;
            },
            _dimensions = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            _margins = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            _getDimension = function(n, t, cs) {
                var v = parseFloat((n === "width") ? t.offsetWidth : t.offsetHeight),
                    a = _dimensions[n],
                    i = a.length,
                    cs = cs || _getComputedStyle(t, null);
                while (--i > -1) {
                    v -= parseFloat(_getStyle(t, "padding" + a[i], cs, true)) || 0;
                    v -= parseFloat(_getStyle(t, "border" + a[i] + "Width", cs, true)) || 0;
                }
                return v;
            },
            _convertToPixels = function(t, p, v, sfx, recurse) {
                if (sfx === "px" || !sfx) {
                    return v;
                }
                if (sfx === "auto" || !v) {
                    return 0;
                }
                var horiz = _horizExp.test(p),
                    node = t,
                    style = _tempDiv.style,
                    neg = (v < 0);
                if (neg) {
                    v = -v;
                }
                style.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;";
                if (sfx === "%" || sfx === "em" || !node.appendChild) {
                    node = t.parentNode || _doc.body;
                    style[(horiz ? "width" : "height")] = v + sfx;
                } else {
                    style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
                }
                node.appendChild(_tempDiv);
                var pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
                node.removeChild(_tempDiv);
                if (pix === 0 && !recurse) {
                    pix = _convertToPixels(t, p, v, sfx, true);
                }
                return neg ? -pix : pix;
            },
            _parsePosition = function(v, o) {
                if (v == null || v === "" || v === "auto" || v === "auto auto") {
                    v = "0 0";
                }
                o = o || {};
                var x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : v.split(" ")[0],
                    y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : v.split(" ")[1];
                if (y == null) {
                    y = "0";
                } else if (y === "center") {
                    y = "50%";
                }
                if (x === "center") {
                    x = "50%";
                }
                o.oxp = (x.indexOf("%") !== -1);
                o.oyp = (y.indexOf("%") !== -1);
                o.oxr = (x.charAt(1) === "=");
                o.oyr = (y.charAt(1) === "=");
                o.ox = parseFloat(x.replace(_NaNExp, ""));
                o.oy = parseFloat(y.replace(_NaNExp, ""));
                return o;
            },
            _parseVal = function(v, d) {
                return (v == null) ? d : (typeof(v) === "string" && v.indexOf("=") === 1) ? Number(v.split("=").join("")) + d : Number(v);
            },
            _parseAngle = function(v, d) {
                var m = (v.indexOf("rad") === -1) ? _DEG2RAD : 1,
                    r = (v.indexOf("=") === 1);
                v = Number(v.replace(_NaNExp, "")) * m;
                return r ? v + d : v;
            },
            _colorLookup = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            };
        p._onInitTween = function(target, value, tween) {
            if (!target.nodeType) {
                return false;
            }
            this._target = target;
            this._tween = tween;
            this._classData = this._transform = null;
            _autoRound = value.autoRound;
            var s = this._style = target.style,
                cs = _getComputedStyle(target, ""),
                copy, start, v;
            if (_reqSafariFix)
                if (s.zIndex === "") {
                    v = _getStyle(target, "zIndex", cs);
                    if (v === "auto" || v === "") {
                        s.zIndex = 1;
                    }
                }
            if (typeof(value) === "string") {
                copy = s.cssText;
                start = _getStyles(target, cs);
                s.cssText = copy + ";" + value;
                v = _cssDif(start, _getStyles(target));
                if (!_supportsOpacity && _opacityValExp.test(value)) {
                    v.opacity = parseFloat(RegExp.$1);
                }
                value = v;
                s.cssText = copy;
            } else if (value.className) {
                copy = target.className;
                this._classData = {
                    b: copy,
                    e: (value.className.charAt(1) !== "=") ? value.className : (value.className.charAt(0) === "+") ? target.className + " " + value.className.substr(2) : target.className.split(value.className.substr(2)).join(""),
                    props: []
                }
                if (tween._duration) {
                    start = _getStyles(target, cs);
                    target.className = this._classData.e;
                    value = _cssDif(start, _getStyles(target), value, this._classData);
                    target.className = copy;
                } else {
                    value = {};
                }
            }
            this._parseVars(value, target, cs, value.suffixMap || CSSPlugin.suffixMap);
            return true;
        }
        p._parseVars = function(vars, t, cs, map) {
            var s = this._style,
                p, v, pt, beg, clr1, clr2, bsfx, esfx, rel, start, copy, isStr;
            for (p in vars) {
                v = vars[p];
                if (p === "transform" || p === _transformProp) {
                    this._parseTransform(t, v, cs, map);
                    continue;
                } else if (_transformMap[p] || p === "transformOrigin") {
                    this._parseTransform(t, vars, cs, map);
                    continue;
                } else if (p === "alpha" || p === "autoAlpha") {
                    p = "opacity";
                } else if (p === "margin" || p === "padding") {
                    copy = (v + "").split(" ");
                    rel = copy.length;
                    pt = {};
                    pt[p + "Top"] = copy[0];
                    pt[p + "Right"] = (rel > 1) ? copy[1] : copy[0];
                    pt[p + "Bottom"] = (rel === 4) ? copy[2] : copy[0];
                    pt[p + "Left"] = (rel === 4) ? copy[3] : (rel === 2) ? copy[1] : copy[0];
                    this._parseVars(pt, t, cs, map);
                    continue;
                } else if (p === "backgroundPosition" || p === "backgroundSize") {
                    pt = _parsePosition(v);
                    start = _parsePosition((beg = _getStyle(t, p, cs)));
                    this._firstPT = pt = {
                        _next: this._firstPT,
                        t: s,
                        p: p,
                        b: beg,
                        f: false,
                        n: "css_" + p,
                        type: 3,
                        s: start.ox,
                        c: pt.oxr ? pt.ox : pt.ox - start.ox,
                        ys: start.oy,
                        yc: pt.oyr ? pt.oy : pt.oy - start.oy,
                        sfx: pt.oxp ? "%" : "px",
                        ysfx: pt.oyp ? "%" : "px",
                        r: (!pt.oxp && vars.autoRound !== false)
                    };
                    pt.e = (pt.s + pt.c) + pt.sfx + " " + (pt.ys + pt.yc) + pt.ysfx;
                    continue;
                } else if (p === "border") {
                    copy = (v + "").split(" ");
                    this._parseVars({
                        borderWidth: copy[0],
                        borderStyle: copy[1] || "none",
                        borderColor: copy[2] || "#000000"
                    }, t, cs, map);
                    continue;
                } else if (p === "bezier") {
                    this._parseBezier(v, t, cs, map);
                    continue;
                } else if (p === "autoRound") {
                    continue;
                }
                beg = _getStyle(t, p, cs);
                beg = (beg != null) ? beg + "" : "";
                this._firstPT = pt = {
                    _next: this._firstPT,
                    t: s,
                    p: p,
                    b: beg,
                    f: false,
                    n: "css_" + p,
                    sfx: "",
                    r: false,
                    type: 0
                };
                if (p === "opacity")
                    if (vars.autoAlpha != null) {
                        if (beg === "1")
                            if (_getStyle(t, "visibility", cs) === "hidden") {
                                beg = pt.b = "0";
                            }
                        this._firstPT = pt._prev = {
                            _next: pt,
                            t: s,
                            p: "visibility",
                            f: false,
                            n: "css_visibility",
                            r: false,
                            type: -1,
                            b: (Number(beg) !== 0) ? "visible" : "hidden",
                            i: "visible",
                            e: (Number(v) === 0) ? "hidden" : "visible"
                        };
                        this._overwriteProps.push("css_visibility");
                    }
                isStr = (typeof(v) === "string");
                if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && !v.indexOf("rgb("))) {
                    clr1 = _parseColor(beg);
                    clr2 = _parseColor(v);
                    pt.e = pt.i = ((clr2.length > 3) ? "rgba(" : "rgb(") + clr2.join(",") + ")";
                    pt.b = ((clr1.length > 3) ? "rgba(" : "rgb(") + clr1.join(",") + ")";
                    pt.s = Number(clr1[0]);
                    pt.c = Number(clr2[0]) - pt.s;
                    pt.gs = Number(clr1[1]);
                    pt.gc = Number(clr2[1]) - pt.gs;
                    pt.bs = Number(clr1[2]);
                    pt.bc = Number(clr2[2]) - pt.bs;
                    pt.type = 1;
                    if (clr1.length > 3 || clr2.length > 3) {
                        if (_supportsOpacity) {
                            pt.as = (clr1.length < 4) ? 1 : Number(clr1[3]);
                            pt.ac = ((clr2.length < 4) ? 1 : Number(clr2[3])) - pt.as;
                            pt.type = 2;
                        } else {
                            if (clr2[3] == 0) {
                                pt.e = pt.i = "transparent";
                                pt.type = -1;
                            }
                            if (clr1[3] == 0) {
                                pt.b = "transparent";
                            }
                        }
                    }
                } else {
                    bsfx = beg.replace(_suffixExp, "");
                    if (beg === "" || beg === "auto") {
                        if (p === "width" || p === "height") {
                            start = _getDimension(p, t, cs);
                            bsfx = "px";
                        } else {
                            start = (p !== "opacity") ? 0 : 1;
                            bsfx = "";
                        }
                    } else {
                        start = (beg.indexOf(" ") === -1) ? parseFloat(beg.replace(_NaNExp, "")) : NaN;
                    }
                    if (isStr) {
                        rel = (v.charAt(1) === "=");
                        esfx = v.replace(_suffixExp, "");
                        v = (v.indexOf(" ") === -1) ? parseFloat(v.replace(_NaNExp, "")) : NaN;
                    } else {
                        rel = false;
                        esfx = "";
                    }
                    if (esfx === "") {
                        esfx = map[p] || bsfx;
                    }
                    pt.e = (v || v === 0) ? (rel ? v + start : v) + esfx : vars[p];
                    if (bsfx !== esfx)
                        if (esfx !== "")
                            if (v || v === 0)
                                if (start || start === 0) {
                                    start = _convertToPixels(t, p, start, bsfx);
                                    if (esfx === "%") {
                                        start /= _convertToPixels(t, p, 100, "%") / 100;
                                        if (start > 100) {
                                            start = 100;
                                        }
                                    } else if (esfx === "em") {
                                        start /= _convertToPixels(t, p, 1, "em");
                                    } else {
                                        v = _convertToPixels(t, p, v, esfx);
                                        esfx = "px";
                                    }
                                    if (rel)
                                        if (v || v === 0) {
                                            pt.e = (v + start) + esfx;
                                        }
                                }
                    if ((start || start === 0) && (v || v === 0) && (pt.c = (rel ? v : v - start))) {
                        pt.s = start;
                        pt.sfx = esfx;
                        if (p === "opacity") {
                            if (!_supportsOpacity) {
                                pt.type = 4;
                                pt.p = "filter";
                                pt.b = "alpha(opacity=" + (pt.s * 100) + ")";
                                pt.e = "alpha(opacity=" + ((pt.s + pt.c) * 100) + ")";
                                pt.dup = (vars.autoAlpha != null);
                                this._style.zoom = 1;
                            }
                        } else if (_autoRound !== false && (esfx === "px" || p === "zIndex")) {
                            pt.r = true;
                        }
                    } else {
                        pt.type = -1;
                        pt.i = (p === "display" && pt.e === "none") ? pt.b : pt.e;
                        pt.s = pt.c = 0;
                    }
                }
                this._overwriteProps.push("css_" + p);
                if (pt._next) {
                    pt._next._prev = pt;
                }
            }
        }
        p._parseTransform = function(t, v, cs, map) {
            if (this._transform) {
                return;
            }
            var m1 = this._transform = _getTransform(t, cs, true),
                s = this._style,
                min = 0.000001,
                m2, skewY, p, pt, copy, orig;
            if (typeof(v) === "object") {
                m2 = {
                    scaleX: _parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
                    scaleY: _parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
                    x: _parseVal(v.x, m1.x),
                    y: _parseVal(v.y, m1.y)
                };
                if (v.shortRotation != null) {
                    m2.rotation = (typeof(v.shortRotation) === "number") ? v.shortRotation * _DEG2RAD : _parseAngle(v.shortRotation, m1.rotation);
                    var dif = (m2.rotation - m1.rotation) % (Math.PI * 2);
                    if (dif !== dif % Math.PI) {
                        dif += Math.PI * ((dif < 0) ? 2 : -2);
                    }
                    m2.rotation = m1.rotation + dif;
                } else {
                    m2.rotation = (v.rotation == null) ? m1.rotation : (typeof(v.rotation) === "number") ? v.rotation * _DEG2RAD : _parseAngle(v.rotation, m1.rotation);
                }
                m2.skewX = (v.skewX == null) ? m1.skewX : (typeof(v.skewX) === "number") ? v.skewX * _DEG2RAD : _parseAngle(v.skewX, m1.skewX);
                m2.skewY = (v.skewY == null) ? m1.skewY : (typeof(v.skewY) === "number") ? v.skewY * _DEG2RAD : _parseAngle(v.skewY, m1.skewY);
                if ((skewY = m2.skewY - m1.skewY)) {
                    m2.skewX += skewY
                    m2.rotation += skewY;
                }
                if (m2.skewY < min)
                    if (m2.skewY > -min) {
                        m2.skewY = 0;
                    }
                if (m2.skewX < min)
                    if (m2.skewX > -min) {
                        m2.skewX = 0;
                    }
                if (m2.rotation < min)
                    if (m2.rotation > -min) {
                        m2.rotation = 0;
                    }
                if ((orig = v.transformOrigin) != null) {
                    if (_transformProp) {
                        p = _transformProp + "Origin";
                        this._firstPT = pt = {
                            _next: this._firstPT,
                            t: s,
                            p: p,
                            s: 0,
                            c: 0,
                            n: p,
                            f: false,
                            r: false,
                            b: s[p],
                            e: orig,
                            i: orig,
                            type: -1,
                            sfx: ""
                        };
                        if (pt._next) {
                            pt._next._prev = pt;
                        }
                    } else {
                        _parsePosition(orig, m1);
                    }
                }
            } else if (typeof(v) === "string" && _transformProp) {
                copy = s[_transformProp];
                s[_transformProp] = v;
                m2 = _getTransform(t, null, false);
                s[_transformProp] = copy;
            } else {
                return;
            }
            if (!_transformProp) {
                s.zoom = 1;
            } else if (_isSafari) {
                _reqSafariFix = true;
                if (s.WebkitBackfaceVisibility === "") {
                    s.WebkitBackfaceVisibility = "hidden";
                }
                if (s.zIndex === "") {
                    copy = _getStyle(t, "zIndex", cs);
                    if (copy === "auto" || copy === "") {
                        s.zIndex = 1;
                    }
                }
            }
            for (p in _transformMap) {
                if (m1[p] !== m2[p] || _forcePT[p] != null)
                    if (p !== "shortRotation")
                        if (p !== "scale") {
                            this._firstPT = pt = {
                                _next: this._firstPT,
                                t: m1,
                                p: p,
                                s: m1[p],
                                c: m2[p] - m1[p],
                                n: p,
                                f: false,
                                r: false,
                                b: m1[p],
                                e: m2[p],
                                type: 0,
                                sfx: 0
                            };
                            if (pt._next) {
                                pt._next._prev = pt;
                            }
                            this._overwriteProps.push("css_" + p);
                        }
            }
        };
        p._parseBezier = function(v, t, cs, map) {
            if (!window.com.greensock.plugins.BezierPlugin) {
                console.log("Error: BezierPlugin not loaded.");
                return;
            }
            if (v instanceof Array) {
                v = {
                    values: v
                };
            }
            var values = v.values || [],
                l = values.length,
                points = [],
                b = this._bezier = {
                    _pt: []
                },
                bp = b._proxy = {},
                cnt = 0,
                pcnt = 0,
                lookup = {},
                l2 = l - 1,
                oldForce = _forcePT,
                plugin = b._plugin = new window.com.greensock.plugins.BezierPlugin(),
                p, i, pt, bpt, curPoint, tfm;
            for (i = 0; i < l; i++) {
                curPoint = {};
                this._transform = null;
                bpt = this._firstPT;
                this._parseVars((_forcePT = values[i]), t, cs, map);
                pt = this._firstPT;
                if (i === 0) {
                    tfm = this._transform;
                    while (pt !== bpt) {
                        bp[pt.p] = pt.s;
                        b._pt[pcnt++] = lookup[pt.p] = pt;
                        if (pt.type === 1 || pt.type === 2) {
                            bp[pt.p + "_g"] = pt.gs;
                            bp[pt.p + "_b"] = pt.bs;
                            if (pt.type === 2) {
                                bp[pt.p + "_a"] = pt.as;
                            }
                        } else if (pt.type === 3) {
                            bp[pt.p + "_y"] = pt.ys;
                        }
                        pt = pt._next;
                    }
                    pt = this._firstPT;
                } else {
                    this._firstPT = bpt;
                    if (bpt._prev) {
                        bpt._prev._next = null;
                    }
                    bpt._prev = null;
                    bpt = null;
                }
                while (pt !== bpt) {
                    if (lookup[pt.p]) {
                        curPoint[pt.p] = pt.s + pt.c;
                        if (i === l2) {
                            lookup[pt.p].e = pt.e;
                        }
                        if (pt.type === 1 || pt.type === 2) {
                            curPoint[pt.p + "_g"] = pt.gs + pt.gc;
                            curPoint[pt.p + "_b"] = pt.bs + pt.bc;
                            if (pt.type === 2) {
                                curPoint[pt.p + "_a"] = pt.as + pt.ac;
                            }
                        } else if (pt.type === 3) {
                            curPoint[pt.p + "_y"] = pt.ys + pt.yc;
                        }
                        if (i === 0) {
                            pt.c = pt.ac = pt.gc = pt.bc = pt.yc = 0;
                        }
                    }
                    pt = pt._next;
                }
                points[cnt++] = curPoint;
            }
            this._transform = tfm;
            _forcePT = oldForce;
            v.values = points;
            if (v.autoRotate === 0) {
                v.autoRotate = true;
            }
            if (v.autoRotate)
                if (!(v.autoRotate instanceof Array)) {
                    i = (v.autoRotate == true) ? 0 : Number(v.autoRotate) * Math.PI / 180;
                    v.autoRotate = (points[0].left != null) ? [
                        ["left", "top", "rotation", i, true]
                    ] : (points[0].x != null) ? [
                        ["x", "y", "rotation", i, true]
                    ] : false;
                }
            if ((b._autoRotate = v.autoRotate))
                if (!tfm) {
                    this._transform = _getTransform(t, cs, true);
                }
            plugin._onInitTween(bp, v, this._tween);
            v.values = values;
        };
        p.setRatio = function(v) {
            var pt = this._firstPT,
                bz = this._bezier,
                min = 0.000001,
                val, i, y;
            if (bz) {
                bz._plugin.setRatio(v);
                var bpt = bz._pt,
                    bp = bz._proxy;
                i = bpt.length;
                while (--i > -1) {
                    pt = bpt[i];
                    pt.s = bp[pt.p];
                    if (pt.type === 1 || pt.type === 2) {
                        pt.gs = bp[pt.p + "_g"];
                        pt.bs = bp[pt.p + "_b"];
                        if (pt.type === 2) {
                            pt.as = bp[pt.p + "_a"];
                        }
                    } else if (pt.type === 3) {
                        pt.ys = bp[pt.p + "_y"];
                    }
                }
                if (bz._autoRotate) {
                    this._transform.rotation = bp.rotation;
                }
            }
            if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (pt) {
                    pt.t[pt.p] = pt.e;
                    if (pt.type === 4)
                        if (pt.s + pt.c === 1) {
                            this._style.removeAttribute("filter");
                            if (_getStyle(this._target, "filter")) {
                                pt.t[pt.p] = pt.e;
                            }
                        }
                    pt = pt._next;
                }
            } else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0)) {
                while (pt) {
                    val = pt.c * v + pt.s;
                    if (pt.r) {
                        val = (val > 0) ? (val + 0.5) >> 0 : (val - 0.5) >> 0;
                    } else if (val < min)
                        if (val > -min) {
                            val = 0;
                        }
                    if (!pt.type) {
                        pt.t[pt.p] = val + pt.sfx;
                    } else if (pt.type === 1) {
                        pt.t[pt.p] = "rgb(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ")";
                    } else if (pt.type === 2) {
                        pt.t[pt.p] = "rgba(" + (val >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + ", " + (pt.as + (v * pt.ac)) + ")";
                    } else if (pt.type === -1) {
                        pt.t[pt.p] = pt.i;
                    } else if (pt.type === 3) {
                        y = pt.ys + v * pt.yc;
                        if (pt.r) {
                            y = (y > 0) ? (y + 0.5) >> 0 : (y - 0.5) >> 0;
                        }
                        pt.t[pt.p] = val + pt.sfx + " " + y + pt.ysfx;
                    } else {
                        if (pt.dup) {
                            pt.t.filter = pt.t.filter || "alpha(opacity=100)";
                        }
                        if (pt.t.filter.indexOf("opacity") === -1) {
                            pt.t.filter += " alpha(opacity=" + ((val * 100) >> 0) + ")";
                        } else {
                            pt.t.filter = pt.t.filter.replace(_opacityExp, "opacity=" + ((val * 100) >> 0));
                        }
                    }
                    pt = pt._next;
                }
            } else {
                while (pt) {
                    pt.t[pt.p] = pt.b;
                    if (pt.type === 4)
                        if (pt.s === 1) {
                            this._style.removeAttribute("filter");
                            if (_getStyle(this._target, "filter")) {
                                pt.t[pt.p] = pt.b;
                            }
                        }
                    pt = pt._next;
                }
            }
            if (this._transform) {
                pt = this._transform;
                if (_transformProp && !pt.rotation && !pt.skewX) {
                    this._style[_transformProp] = ((pt.x || pt.y) ? "translate(" + pt.x + "px," + pt.y + "px) " : "") + ((pt.scaleX !== 1 || pt.scaleY !== 1) ? "scale(" + pt.scaleX + "," + pt.scaleY + ")" : "") || "translate(0px,0px)";
                } else {
                    var ang = _transformProp ? pt.rotation : -pt.rotation,
                        skew = _transformProp ? ang - pt.skewX : ang + pt.skewX,
                        a = Math.cos(ang) * pt.scaleX,
                        b = Math.sin(ang) * pt.scaleX,
                        c = Math.sin(skew) * -pt.scaleY,
                        d = Math.cos(skew) * pt.scaleY,
                        cs;
                    if (a < min)
                        if (a > -min) {
                            a = 0;
                        }
                    if (b < min)
                        if (b > -min) {
                            b = 0;
                        }
                    if (c < min)
                        if (c > -min) {
                            c = 0;
                        }
                    if (d < min)
                        if (d > -min) {
                            d = 0;
                        }
                    if (_transformProp) {
                        this._style[_transformProp] = "matrix(" + a + "," + b + "," + c + "," + d + "," + pt.x + "," + pt.y + ")";
                    } else if ((cs = this._target.currentStyle)) {
                        min = b;
                        b = -c;
                        c = -min;
                        var filters = cs.filter;
                        this._style.filter = "";
                        var w = this._target.offsetWidth,
                            h = this._target.offsetHeight,
                            clip = (cs.position !== "absolute"),
                            m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
                            ox = pt.x,
                            oy = pt.y,
                            dx, dy;
                        if (pt.ox != null) {
                            dx = ((pt.oxp) ? w * pt.ox * 0.01 : pt.ox) - w / 2;
                            dy = ((pt.oyp) ? h * pt.oy * 0.01 : pt.oy) - h / 2;
                            ox = dx - (dx * a + dy * b) + pt.x;
                            oy = dy - (dx * c + dy * d) + pt.y;
                        }
                        if (!clip) {
                            var mult = (_ieVers < 8) ? 1 : -1,
                                marg, prop, dif;
                            dx = pt.ieOffsetX || 0;
                            dy = pt.ieOffsetY || 0;
                            pt.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
                            pt.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
                            for (i = 0; i < 4; i++) {
                                prop = _margins[i];
                                marg = cs[prop];
                                val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this._target, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
                                if (val !== pt[prop]) {
                                    dif = (i < 2) ? -pt.ieOffsetX : -pt.ieOffsetY;
                                } else {
                                    dif = (i < 2) ? dx - pt.ieOffsetX : dy - pt.ieOffsetY;
                                }
                                this._style[prop] = (pt[prop] = Math.round(val - dif * ((i === 0 || i === 2) ? 1 : mult))) + "px";
                            }
                            m += ", sizingMethod='auto expand')";
                        } else {
                            dx = (w / 2), dy = (h / 2);
                            m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
                        }
                        if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
                            this._style.filter = filters.replace(_ieSetMatrixExp, m);
                        } else {
                            this._style.filter = m + " " + filters;
                        }
                        if (v === 0 || v === 1)
                            if (a === 1)
                                if (b === 0)
                                    if (c === 0)
                                        if (d === 1)
                                            if (!clip || m.indexOf("Dx=0, Dy=0") !== -1)
                                                if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) {
                                                    this._style.removeAttribute("filter");
                                                }
                    }
                }
            }
            if (this._classData) {
                pt = this._classData;
                if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
                    var i = pt.props.length;
                    while (--i > -1) {
                        this._style[pt.props[i]] = "";
                    }
                    this._target.className = pt.e;
                } else if (this._target.className !== pt.b) {
                    this._target.className = pt.b;
                }
            }
        }
        p._kill = function(lookup) {
            var copy = lookup,
                p;
            if (lookup.autoAlpha || lookup.alpha) {
                copy = {};
                for (p in lookup) {
                    copy[p] = lookup[p];
                }
                copy.opacity = 1;
                if (copy.autoAlpha) {
                    copy.visibility = 1;
                }
            }
            return TweenPlugin.prototype._kill.call(this, copy);
        }
        TweenPlugin.activate([CSSPlugin]);
        return CSSPlugin;
    }, true);
    _gsDefine("plugins.RoundPropsPlugin", ["plugins.TweenPlugin"], function(TweenPlugin) {
        var RoundPropsPlugin = function(props, priority) {
                TweenPlugin.call(this, "roundProps", -1);
                this._overwriteProps.length = 0;
            },
            p = RoundPropsPlugin.prototype = new TweenPlugin("roundProps", -1);
        p.constructor = RoundPropsPlugin;
        RoundPropsPlugin.API = 2;
        p._onInitTween = function(target, value, tween) {
            this._tween = tween;
            return true;
        }
        p._onInitAllProps = function() {
            var tween = this._tween,
                rp = (tween.vars.roundProps instanceof Array) ? tween.vars.roundProps : tween.vars.roundProps.split(","),
                i = rp.length,
                lookup = {},
                rpt = tween._propLookup.roundProps,
                prop, pt, next;
            while (--i > -1) {
                lookup[rp[i]] = 1;
            }
            i = rp.length;
            while (--i > -1) {
                prop = rp[i];
                pt = tween._firstPT;
                while (pt) {
                    next = pt._next;
                    if (pt.pg) {
                        pt.t._roundProps(lookup, true);
                    } else if (pt.n === prop) {
                        this._add(pt.t, prop, pt.s, pt.c);
                        if (next) {
                            next._prev = pt._prev;
                        }
                        if (pt._prev) {
                            pt._prev._next = next;
                        } else if (_tween._firstPT === pt) {
                            tween._firstPT = next;
                        }
                        pt._next = pt._prev = null;
                        tween._propLookup[prop] = rpt;
                    }
                    pt = next;
                }
            }
            return false;
        }
        p._add = function(target, p, s, c) {
            this._addTween(target, p, s, s + c, p, true);
            this._overwriteProps.push(p);
        }
        TweenPlugin.activate([RoundPropsPlugin]);
        return RoundPropsPlugin;
    }, true);
    _gsDefine("easing.Back", ["easing.Ease"], function(Ease) {
        var gs = window.com.greensock,
            _class = gs._class,
            _create = function(n, f) {
                var c = _class("easing." + n, function() {}, true),
                    p = c.prototype = new Ease();
                p.constructor = c;
                p.getRatio = f;
                return c;
            },
            _createBack = function(n, f) {
                var c = _class("easing." + n, function(overshoot) {
                        this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;
                        this._p2 = this._p1 * 1.525;
                    }, true),
                    p = c.prototype = new Ease();
                p.constructor = c;
                p.getRatio = f;
                p.config = function(overshoot) {
                    return new c(overshoot);
                };
                return c;
            },
            BackOut = _createBack("BackOut", function(p) {
                return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);
            }),
            BackIn = _createBack("BackIn", function(p) {
                return p * p * ((this._p1 + 1) * p - this._p1);
            }),
            BackInOut = _createBack("BackInOut", function(p) {
                return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
            }),
            BounceOut = _create("BounceOut", function(p) {
                if (p < 1 / 2.75) {
                    return 7.5625 * p * p;
                } else if (p < 2 / 2.75) {
                    return 7.5625 * (p -= 1.5 / 2.75) * p + .75;
                } else if (p < 2.5 / 2.75) {
                    return 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
                } else {
                    return 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
                }
            }),
            BounceIn = _create("BounceIn", function(p) {
                if ((p = 1 - p) < 1 / 2.75) {
                    return 1 - (7.5625 * p * p);
                } else if (p < 2 / 2.75) {
                    return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + .75);
                } else if (p < 2.5 / 2.75) {
                    return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + .9375);
                } else {
                    return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + .984375);
                }
            }),
            BounceInOut = _create("BounceInOut", function(p) {
                var invert = (p < 0.5);
                if (invert) {
                    p = 1 - (p * 2);
                } else {
                    p = (p * 2) - 1;
                }
                if (p < 1 / 2.75) {
                    p = 7.5625 * p * p;
                } else if (p < 2 / 2.75) {
                    p = 7.5625 * (p -= 1.5 / 2.75) * p + .75;
                } else if (p < 2.5 / 2.75) {
                    p = 7.5625 * (p -= 2.25 / 2.75) * p + .9375;
                } else {
                    p = 7.5625 * (p -= 2.625 / 2.75) * p + .984375;
                }
                return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;
            }),
            CircOut = _create("CircOut", function(p) {
                return Math.sqrt(1 - (p = p - 1) * p);
            }),
            CircIn = _create("CircIn", function(p) {
                return -(Math.sqrt(1 - (p * p)) - 1);
            }),
            CircInOut = _create("CircInOut", function(p) {
                return ((p *= 2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);
            }),
            _2PI = Math.PI * 2,
            _createElastic = function(n, f, def) {
                var c = _class("easing." + n, function(amplitude, period) {
                        this._p1 = amplitude || 1;
                        this._p2 = period || def;
                        this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);
                    }, true),
                    p = c.prototype = new Ease();
                p.constructor = c;
                p.getRatio = f;
                p.config = function(amplitude, period) {
                    return new c(amplitude, period);
                };
                return c;
            },
            ElasticOut = _createElastic("ElasticOut", function(p) {
                return this._p1 * Math.pow(2, -10 * p) * Math.sin((p - this._p3) * _2PI / this._p2) + 1;
            }, 0.3),
            ElasticIn = _createElastic("ElasticIn", function(p) {
                return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * _2PI / this._p2));
            }, 0.3),
            ElasticInOut = _createElastic("ElasticInOut", function(p) {
                return ((p *= 2) < 1) ? -.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin((p - this._p3) * _2PI / this._p2)) : this._p1 * Math.pow(2, -10 * (p -= 1)) * Math.sin((p - this._p3) * _2PI / this._p2) * .5 + 1;
            }, 0.45),
            ExpoOut = _create("ExpoOut", function(p) {
                return 1 - Math.pow(2, -10 * p);
            }),
            ExpoIn = _create("ExpoIn", function(p) {
                return Math.pow(2, 10 * (p - 1)) - 0.001;
            }),
            ExpoInOut = _create("ExpoInOut", function(p) {
                return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
            }),
            _HALF_PI = Math.PI / 2,
            SineOut = _create("SineOut", function(p) {
                return Math.sin(p * _HALF_PI);
            }),
            SineIn = _create("SineIn", function(p) {
                return -Math.cos(p * _HALF_PI) + 1;
            }),
            SineInOut = _create("SineInOut", function(p) {
                return -0.5 * (Math.cos(Math.PI * p) - 1);
            }),
            SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {
                power = (power || power === 0) ? power : 0.7;
                if (linearRatio == null) {
                    linearRatio = 0.7;
                } else if (linearRatio > 1) {
                    linearRatio = 1;
                }
                this._p = (linearRatio != 1) ? power : 0;
                this._p1 = (1 - linearRatio) / 2;
                this._p2 = linearRatio;
                this._p3 = this._p1 + this._p2;
                this._calcEnd = (yoyoMode === true);
            }, true),
            p = SlowMo.prototype = new Ease();
        p.constructor = SlowMo;
        p.getRatio = function(p) {
            var r = p + (0.5 - p) * this._p;
            if (p < this._p1) {
                return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);
            } else if (p > this._p3) {
                return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
            }
            return this._calcEnd ? 1 : r;
        };
        SlowMo.ease = new SlowMo(0.7, 0.7);
        p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {
            return new SlowMo(linearRatio, power, yoyoMode);
        };
        var SteppedEase = _class("easing.SteppedEase", function(steps) {
            steps = steps || 1;
            this._p1 = 1 / steps;
            this._p2 = steps + 1;
        }, true);
        p = SteppedEase.prototype = new Ease();
        p.constructor = SteppedEase;
        p.getRatio = function(p) {
            if (p < 0) {
                p = 0;
            } else if (p >= 1) {
                p = 0.999999999;
            }
            return ((this._p2 * p) >> 0) * this._p1;
        };
        p.config = SteppedEase.config = function(steps) {
            return new SteppedEase(steps);
        };
        _class("easing.Bounce", {
            easeOut: new BounceOut(),
            easeIn: new BounceIn(),
            easeInOut: new BounceInOut()
        }, true);
        _class("easing.Circ", {
            easeOut: new CircOut(),
            easeIn: new CircIn(),
            easeInOut: new CircInOut()
        }, true);
        _class("easing.Elastic", {
            easeOut: new ElasticOut(),
            easeIn: new ElasticIn(),
            easeInOut: new ElasticInOut()
        }, true);
        _class("easing.Expo", {
            easeOut: new ExpoOut(),
            easeIn: new ExpoIn(),
            easeInOut: new ExpoInOut()
        }, true);
        _class("easing.Sine", {
            easeOut: new SineOut(),
            easeIn: new SineIn(),
            easeInOut: new SineInOut()
        }, true);
        return {
            easeOut: new BackOut(),
            easeIn: new BackIn(),
            easeInOut: new BackInOut()
        };
    }, true);
});
(function(window) {
    "use strict";
    var _namespace = function(ns) {
            var a = ns.split("."),
                p = window,
                i;
            for (i = 0; i < a.length; i++) {
                p[a[i]] = p = p[a[i]] || {};
            }
            return p;
        },
        gs = _namespace("com.greensock"),
        a, i, e, e2, p, _gsInit, _classLookup = {},
        _DepClass = function(ns, dep, def, global) {
            this.sc = (_classLookup[ns]) ? _classLookup[ns].sc : [];
            _classLookup[ns] = this;
            this.gsClass = null;
            this.def = def;
            var _dep = dep || [],
                _classes = [];
            this.check = function(init) {
                var i = _dep.length,
                    cnt = 0,
                    cur;
                while (--i > -1) {
                    if ((cur = _classLookup[_dep[i]] || new _DepClass(_dep[i])).gsClass) {
                        _classes[i] = cur.gsClass;
                    } else {
                        cnt++;
                        if (init) {
                            cur.sc.push(this);
                        }
                    }
                }
                if (cnt === 0 && def) {
                    var a = ("com.greensock." + ns).split("."),
                        n = a.pop(),
                        cl = _namespace(a.join("."))[n] = this.gsClass = def.apply(def, _classes);
                    if (global) {
                        (window.GreenSockGlobals || window)[n] = cl;
                        if (typeof(define) === "function" && define.amd) {
                            define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").join("/"), [], function() {
                                return cl;
                            });
                        } else if (typeof(module) !== "undefined" && module.exports) {
                            module.exports = cl;
                        }
                    }
                    for (i = 0; i < this.sc.length; i++) {
                        this.sc[i].check(false);
                    }
                }
            };
            this.check(true);
        },
        _class = gs._class = function(ns, f, g) {
            new _DepClass(ns, [], function() {
                return f;
            }, g);
            return f;
        };
    window._gsDefine = function(ns, dep, f, g) {
        return new _DepClass(ns, dep, f, g);
    };
    var _baseParams = [0, 0, 1, 1],
        _blankArray = [],
        Ease = _class("easing.Ease", function(func, extraParams, type, power) {
            this._func = func;
            this._type = type || 0;
            this._power = power || 0;
            this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
        }, true);
    p = Ease.prototype;
    p._calcEnd = false;
    p.getRatio = function(p) {
        if (this._func) {
            this._params[0] = p;
            return this._func.apply(null, this._params);
        } else {
            var t = this._type,
                pw = this._power,
                r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
            if (pw === 1) {
                r *= r;
            } else if (pw === 2) {
                r *= r * r;
            } else if (pw === 3) {
                r *= r * r * r;
            } else if (pw === 4) {
                r *= r * r * r * r;
            }
            return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
        }
    };
    a = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
    i = a.length;
    while (--i > -1) {
        e = _class("easing." + a[i], function() {}, true);
        e2 = _class("easing.Power" + i, function() {}, true);
        e.easeOut = e2.easeOut = new Ease(null, null, 1, i);
        e.easeIn = e2.easeIn = new Ease(null, null, 2, i);
        e.easeInOut = e2.easeInOut = new Ease(null, null, 3, i);
    }
    _class("easing.Strong", gs.easing.Power4, true);
    gs.easing.Linear.easeNone = gs.easing.Linear.easeIn;
    var EventDispatcher = _class("events.EventDispatcher", function(target) {
        this._listeners = {};
        this._eventTarget = target || this;
    });
    p = EventDispatcher.prototype;
    p.addEventListener = function(type, callback, scope, useParam, priority) {
        priority = priority || 0;
        var list = this._listeners[type],
            index = 0,
            listener, i;
        if (list == null) {
            this._listeners[type] = list = [];
        }
        i = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.c === callback) {
                list.splice(i, 1);
            } else if (index === 0 && listener.pr < priority) {
                index = i + 1;
            }
        }
        list.splice(index, 0, {
            c: callback,
            s: scope,
            up: useParam,
            pr: priority
        });
    };
    p.removeEventListener = function(type, callback) {
        var list = this._listeners[type];
        if (list) {
            var i = list.length;
            while (--i > -1) {
                if (list[i].c === callback) {
                    list.splice(i, 1);
                    return;
                }
            }
        }
    };
    p.dispatchEvent = function(type) {
        var list = this._listeners[type];
        if (list) {
            var i = list.length,
                listener, t = this._eventTarget;
            while (--i > -1) {
                listener = list[i];
                if (listener.up) {
                    listener.c.call(listener.s || t, {
                        type: type,
                        target: t
                    });
                } else {
                    listener.c.call(listener.s || t);
                }
            }
        }
    };
    var _reqAnimFrame = window.requestAnimationFrame,
        _cancelAnimFrame = window.cancelAnimationFrame,
        _getTime = Date.now || function() {
            return new Date().getTime();
        };
    a = ["ms", "moz", "webkit", "o"];
    i = a.length;
    while (--i > -1 && !_reqAnimFrame) {
        _reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
        _cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
    }
    _class("Ticker", function(fps, useRAF) {
        var _self = this,
            _startTime = _getTime(),
            _useRAF = (useRAF !== false && _reqAnimFrame),
            _fps, _req, _id, _gap, _nextTime, _cancelReq = function() {
                if (_id == null) {
                    return;
                }
                if (!_useRAF || !_cancelAnimFrame) {
                    window.clearTimeout(_id);
                } else {
                    _cancelAnimFrame(_id);
                }
                _id = null;
            },
            _tick = function(manual) {
                _self.time = (_getTime() - _startTime) / 1000;
                if (!_fps || _self.time >= _nextTime || manual) {
                    _self.frame++;
                    _nextTime = (_self.time > _nextTime) ? _self.time + _gap - (_self.time - _nextTime) : _self.time + _gap - 0.001;
                    if (_nextTime < _self.time + 0.001) {
                        _nextTime = _self.time + 0.001;
                    }
                    _self.dispatchEvent("tick");
                }
                if (manual !== true) {
                    _id = _req(_tick);
                }
            };
        EventDispatcher.call(_self);
        this.time = this.frame = 0;
        this.tick = function() {
            _tick(true);
        };
        this.fps = function(value) {
            if (!arguments.length) {
                return _fps;
            }
            _fps = value;
            _gap = 1 / (_fps || 60);
            _nextTime = this.time + _gap;
            _req = (_fps === 0) ? function(f) {} : (!_useRAF || !_reqAnimFrame) ? function(f) {
                return window.setTimeout(f, (((_nextTime - _self.time) * 1000 + 1) >> 0) || 1);
            } : _reqAnimFrame;
            _cancelReq();
            _id = _req(_tick);
        };
        this.useRAF = function(value) {
            if (!arguments.length) {
                return _useRAF;
            }
            _cancelReq();
            _useRAF = value;
            _self.fps(_fps);
        };
        _self.fps(fps);
        window.setTimeout(function() {
            if (_useRAF && !_id) {
                _self.useRAF(false);
            }
        }, 1000);
    });
    p = gs.Ticker.prototype = new gs.events.EventDispatcher();
    p.constructor = gs.Ticker;
    var Animation = _class("core.Animation", function(duration, vars) {
            this.vars = vars || {};
            this._duration = this._totalDuration = duration || 0;
            this._delay = Number(this.vars.delay) || 0;
            this._timeScale = 1;
            this._active = (this.vars.immediateRender == true);
            this.data = this.vars.data;
            this._reversed = (this.vars.reversed == true);
            if (!_rootTimeline) {
                return;
            }
            if (!_gsInit) {
                _ticker.tick();
                _gsInit = true;
            }
            var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
            tl.insert(this, tl._time);
            if (this.vars.paused) {
                this.paused(true);
            }
        }),
        _ticker = Animation.ticker = new gs.Ticker();
    p = Animation.prototype;
    p._dirty = p._gc = p._initted = p._paused = false;
    p._totalTime = p._time = 0;
    p._rawPrevTime = -1;
    p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
    p._paused = false;
    p.play = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek(from, suppressEvents);
        }
        this.reversed(false);
        return this.paused(false);
    };
    p.pause = function(atTime, suppressEvents) {
        if (arguments.length) {
            this.seek(atTime, suppressEvents);
        }
        return this.paused(true);
    };
    p.resume = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek(from, suppressEvents);
        }
        return this.paused(false);
    };
    p.seek = function(time, suppressEvents) {
        return this.totalTime(Number(time), (suppressEvents != false));
    };
    p.restart = function(includeDelay, suppressEvents) {
        this.reversed(false);
        this.paused(false);
        return this.totalTime((includeDelay) ? -this._delay : 0, (suppressEvents != false));
    };
    p.reverse = function(from, suppressEvents) {
        if (arguments.length) {
            this.seek((from || this.totalDuration()), suppressEvents);
        }
        this.reversed(true);
        return this.paused(false);
    };
    p.render = function() {};
    p.invalidate = function() {
        return this;
    };
    p._enabled = function(enabled, ignoreTimeline) {
        this._gc = !enabled;
        this._active = (enabled && !this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
        if (ignoreTimeline != true) {
            if (enabled && this.timeline == null) {
                this._timeline.insert(this, this._startTime - this._delay);
            } else if (!enabled && this.timeline != null) {
                this._timeline._remove(this, true);
            }
        }
        return false;
    };
    p._kill = function(vars, target) {
        return this._enabled(false, false);
    };
    p.kill = function(vars, target) {
        this._kill(vars, target);
        return this;
    };
    p._uncache = function(includeSelf) {
        var tween = includeSelf ? this : this.timeline;
        while (tween) {
            tween._dirty = true;
            tween = tween.timeline;
        }
        return this;
    };
    p.eventCallback = function(type, callback, params, scope) {
        if (type == null) {
            return null;
        } else if (type.substr(0, 2) === "on") {
            if (arguments.length === 1) {
                return this.vars[type];
            }
            if (callback == null) {
                delete this.vars[type];
            } else {
                this.vars[type] = callback;
                this.vars[type + "Params"] = params;
                this.vars[type + "Scope"] = scope;
                if (params) {
                    var i = params.length;
                    while (--i > -1) {
                        if (params[i] === "{self}") {
                            params = this.vars[type + "Params"] = params.concat();
                            params[i] = this;
                        }
                    }
                }
            }
            if (type === "onUpdate") {
                this._onUpdate = callback;
            }
        }
        return this;
    }
    p.delay = function(value) {
        if (!arguments.length) {
            return this._delay;
        }
        if (this._timeline.smoothChildTiming) {
            this.startTime(this._startTime + value - this._delay);
        }
        this._delay = value;
        return this;
    };
    p.duration = function(value) {
        if (!arguments.length) {
            this._dirty = false;
            return this._duration;
        }
        this._duration = this._totalDuration = value;
        this._uncache(true);
        if (this._timeline.smoothChildTiming)
            if (this._active)
                if (value != 0) {
                    this.totalTime(this._totalTime * (value / this._duration), true);
                }
        return this;
    };
    p.totalDuration = function(value) {
        this._dirty = false;
        return (!arguments.length) ? this._totalDuration : this.duration(value);
    };
    p.time = function(value, suppressEvents) {
        if (!arguments.length) {
            return this._time;
        }
        if (this._dirty) {
            this.totalDuration();
        }
        if (value > this._duration) {
            value = this._duration;
        }
        return this.totalTime(value, suppressEvents);
    };
    p.totalTime = function(time, suppressEvents) {
        if (!arguments.length) {
            return this._totalTime;
        }
        if (this._timeline) {
            if (time < 0) {
                time += this.totalDuration();
            }
            if (this._timeline.smoothChildTiming) {
                if (this._dirty) {
                    this.totalDuration();
                }
                if (time > this._totalDuration) {
                    time = this._totalDuration;
                }
                this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - ((!this._reversed ? time : this._totalDuration - time) / this._timeScale);
                if (!this._timeline._dirty) {
                    this._uncache(false);
                }
                if (!this._timeline._active) {
                    var tl = this._timeline;
                    while (tl._timeline) {
                        tl.totalTime(tl._totalTime, true);
                        tl = tl._timeline;
                    }
                }
            }
            if (this._gc) {
                this._enabled(true, false);
            }
            if (this._totalTime != time) {
                this.render(time, suppressEvents, false);
            }
        }
        return this;
    };
    p.startTime = function(value) {
        if (!arguments.length) {
            return this._startTime;
        }
        if (value != this._startTime) {
            this._startTime = value;
            if (this.timeline)
                if (this.timeline._sortChildren) {
                    this.timeline.insert(this, value - this._delay);
                }
        }
        return this;
    };
    p.timeScale = function(value) {
        if (!arguments.length) {
            return this._timeScale;
        }
        value = value || 0.000001;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var t = (this._pauseTime || this._pauseTime == 0) ? this._pauseTime : this._timeline._totalTime;
            this._startTime = t - ((t - this._startTime) * this._timeScale / value);
        }
        this._timeScale = value;
        return this._uncache(false);
    };
    p.reversed = function(value) {
        if (!arguments.length) {
            return this._reversed;
        }
        if (value != this._reversed) {
            this._reversed = value;
            this.totalTime(this._totalTime, true);
        }
        return this;
    };
    p.paused = function(value) {
        if (!arguments.length) {
            return this._paused;
        }
        if (value != this._paused)
            if (this._timeline) {
                if (!value && this._timeline.smoothChildTiming) {
                    this._startTime += this._timeline.rawTime() - this._pauseTime;
                    this._uncache(false);
                }
                this._pauseTime = (value) ? this._timeline.rawTime() : null;
                this._paused = value;
                this._active = (!this._paused && this._totalTime > 0 && this._totalTime < this._totalDuration);
            }
        if (this._gc)
            if (!value) {
                this._enabled(true, false);
            }
        return this;
    };
    var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
        Animation.call(this, 0, vars);
        this.autoRemoveChildren = this.smoothChildTiming = true;
    });
    p = SimpleTimeline.prototype = new Animation();
    p.constructor = SimpleTimeline;
    p.kill()._gc = false;
    p._first = p._last = null;
    p._sortChildren = false;
    p.insert = function(tween, time) {
        tween._startTime = Number(time || 0) + tween._delay;
        if (tween._paused)
            if (this !== tween._timeline) {
                tween._pauseTime = tween._startTime + ((this.rawTime() - tween._startTime) / tween._timeScale);
            }
        if (tween.timeline) {
            tween.timeline._remove(tween, true);
        }
        tween.timeline = tween._timeline = this;
        if (tween._gc) {
            tween._enabled(true, true);
        }
        var prevTween = this._last;
        if (this._sortChildren) {
            var st = tween._startTime;
            while (prevTween && prevTween._startTime > st) {
                prevTween = prevTween._prev;
            }
        }
        if (prevTween) {
            tween._next = prevTween._next;
            prevTween._next = tween;
        } else {
            tween._next = this._first;
            this._first = tween;
        }
        if (tween._next) {
            tween._next._prev = tween;
        } else {
            this._last = tween;
        }
        tween._prev = prevTween;
        if (this._timeline) {
            this._uncache(true);
        }
        return this;
    };
    p._remove = function(tween, skipDisable) {
        if (tween.timeline === this) {
            if (!skipDisable) {
                tween._enabled(false, true);
            }
            tween.timeline = null;
            if (tween._prev) {
                tween._prev._next = tween._next;
            } else if (this._first === tween) {
                this._first = tween._next;
            }
            if (tween._next) {
                tween._next._prev = tween._prev;
            } else if (this._last === tween) {
                this._last = tween._prev;
            }
            if (this._timeline) {
                this._uncache(true);
            }
        }
        return this;
    };
    p.render = function(time, suppressEvents, force) {
        var tween = this._first,
            next;
        this._totalTime = this._time = this._rawPrevTime = time;
        while (tween) {
            next = tween._next;
            if (tween._active || (time >= tween._startTime && !tween._paused)) {
                if (!tween._reversed) {
                    tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, false);
                } else {
                    tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, false);
                }
            }
            tween = next;
        }
    };
    p.rawTime = function() {
        return this._totalTime;
    };
    var TweenLite = _class("TweenLite", function(target, duration, vars) {
        Animation.call(this, duration, vars);
        if (target == null) {
            throw "Cannot tween an undefined reference.";
        }
        this.target = target;
        this._overwrite = (this.vars.overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(this.vars.overwrite) === "number") ? this.vars.overwrite >> 0 : _overwriteLookup[this.vars.overwrite];
        var jq, i, targ;
        if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") {
            this._targets = target.slice(0);
            this._propLookup = [];
            this._siblings = [];
            for (i = 0; i < this._targets.length; i++) {
                targ = this._targets[i];
                if (targ.jquery) {
                    this._targets.splice(i--, 1);
                    this._targets = this._targets.concat(targ.constructor.makeArray(targ));
                    continue;
                }
                this._siblings[i] = _register(targ, this, false);
                if (this._overwrite === 1)
                    if (this._siblings[i].length > 1) {
                        _applyOverwrite(targ, this, null, 1, this._siblings[i]);
                    }
            }
        } else {
            this._propLookup = {};
            this._siblings = _register(target, this, false);
            if (this._overwrite === 1)
                if (this._siblings.length > 1) {
                    _applyOverwrite(target, this, null, 1, this._siblings);
                }
        }
        if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender != false)) {
            this.render(-this._delay, false, true);
        }
    }, true);
    p = TweenLite.prototype = new Animation();
    p.constructor = TweenLite;
    p.kill()._gc = false;
    p.ratio = 0;
    p._firstPT = p._targets = p._overwrittenProps = null;
    p._notifyPluginsOfEnabled = false;
    TweenLite.version = 12;
    TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
    TweenLite.defaultOverwrite = "auto";
    TweenLite.ticker = _ticker;
    var _plugins = TweenLite._plugins = {},
        _tweenLookup = TweenLite._tweenLookup = {},
        _tweenLookupNum = 0,
        _reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            orientToBezier: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1
        },
        _overwriteLookup = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        _rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
        _rootTimeline = Animation._rootTimeline = new SimpleTimeline();
    _rootTimeline._startTime = _ticker.time;
    _rootFramesTimeline._startTime = _ticker.frame;
    _rootTimeline._active = _rootFramesTimeline._active = true;
    Animation._updateRoot = function() {
        _rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
        _rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
        if (!(_ticker.frame % 120)) {
            var i, a, p;
            for (p in _tweenLookup) {
                a = _tweenLookup[p].tweens;
                i = a.length;
                while (--i > -1) {
                    if (a[i]._gc) {
                        a.splice(i, 1);
                    }
                }
                if (a.length === 0) {
                    delete _tweenLookup[p];
                }
            }
        }
    };
    _ticker.addEventListener("tick", Animation._updateRoot);
    var _register = function(target, tween, scrub) {
            var id = target._gsTweenID,
                a, i;
            if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
                _tweenLookup[id] = {
                    target: target,
                    tweens: []
                };
            }
            if (tween) {
                a = _tweenLookup[id].tweens;
                a[(i = a.length)] = tween;
                if (scrub) {
                    while (--i > -1) {
                        if (a[i] === tween) {
                            a.splice(i, 1);
                        }
                    }
                }
            }
            return _tweenLookup[id].tweens;
        },
        _applyOverwrite = function(target, tween, props, mode, siblings) {
            var i, changed, curTween;
            if (mode === 1 || mode >= 4) {
                var l = siblings.length;
                for (i = 0; i < l; i++) {
                    if ((curTween = siblings[i]) !== tween) {
                        if (!curTween._gc)
                            if (curTween._enabled(false, false)) {
                                changed = true;
                            }
                    } else if (mode === 5) {
                        break;
                    }
                }
                return changed;
            }
            var startTime = tween._startTime + 0.0000000001,
                overlaps = [],
                oCount = 0,
                globalStart;
            i = siblings.length;
            while (--i > -1) {
                if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {} else if (curTween._timeline !== tween._timeline) {
                    globalStart = globalStart || _checkOverlap(tween, 0);
                    if (_checkOverlap(curTween, globalStart) === 0) {
                        overlaps[oCount++] = curTween;
                    }
                } else if (curTween._startTime <= startTime)
                    if (curTween._startTime + curTween.totalDuration() / curTween._timeScale + 0.0000000001 > startTime)
                        if (!((tween._duration === 0 || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
                            overlaps[oCount++] = curTween;
                        }
            }
            i = oCount;
            while (--i > -1) {
                curTween = overlaps[i];
                if (mode === 2)
                    if (curTween._kill(props, target)) {
                        changed = true;
                    }
                if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
                    if (curTween._enabled(false, false)) {
                        changed = true;
                    }
                }
            }
            return changed;
        },
        _checkOverlap = function(tween, reference) {
            var tl = tween._timeline,
                ts = tl._timeScale,
                t = tween._startTime;
            while (tl._timeline) {
                t += tl._startTime;
                ts *= tl._timeScale;
                if (tl._paused) {
                    return -100;
                }
                tl = tl._timeline;
            }
            t /= ts;
            return (t > reference) ? t - reference : (!tween._initted && t - reference < 0.0000000002) ? 0.0000000001 : ((t = t + tween.totalDuration() / tween._timeScale / ts) > reference) ? 0 : t - reference - 0.0000000001;
        };
    p._init = function() {
        if (this.vars.startAt) {
            this.vars.startAt.overwrite = 0;
            this.vars.startAt.immediateRender = true;
            TweenLite.to(this.target, 0, this.vars.startAt);
        }
        var i, initPlugins, pt;
        if (this.vars.ease instanceof Ease) {
            this._ease = (this.vars.easeParams instanceof Array) ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease;
        } else if (typeof(this.vars.ease) === "function") {
            this._ease = new Ease(this.vars.ease, this.vars.easeParams);
        } else {
            this._ease = TweenLite.defaultEase;
        }
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets) {
            i = this._targets.length;
            while (--i > -1) {
                if (this._initProps(this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (this._overwrittenProps ? this._overwrittenProps[i] : null))) {
                    initPlugins = true;
                }
            }
        } else {
            initPlugins = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
        }
        if (initPlugins) {
            TweenLite._onPluginEvent("_onInitAllProps", this);
        }
        if (this._overwrittenProps)
            if (this._firstPT == null)
                if (typeof(this.target) !== "function") {
                    this._enabled(false, false);
                }
        if (this.vars.runBackwards) {
            pt = this._firstPT;
            while (pt) {
                pt.s += pt.c;
                pt.c = -pt.c;
                pt = pt._next;
            }
        }
        this._onUpdate = this.vars.onUpdate;
        this._initted = true;
    };
    p._initProps = function(target, propLookup, siblings, overwrittenProps) {
        var p, i, initPlugins, plugin, a, pt, v;
        if (target == null) {
            return false;
        }
        for (p in this.vars) {
            if (_reservedProps[p]) {
                if (p === "onStartParams" || p === "onUpdateParams" || p === "onCompleteParams" || p === "onReverseCompleteParams" || p === "onRepeatParams")
                    if ((a = this.vars[p])) {
                        i = a.length;
                        while (--i > -1) {
                            if (a[i] === "{self}") {
                                a = this.vars[p] = a.concat();
                                a[i] = this;
                            }
                        }
                    }
            } else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {
                this._firstPT = pt = {
                    _next: this._firstPT,
                    t: plugin,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: true,
                    n: p,
                    pg: true,
                    pr: plugin._priority
                };
                i = plugin._overwriteProps.length;
                while (--i > -1) {
                    propLookup[plugin._overwriteProps[i]] = this._firstPT;
                }
                if (plugin._priority || plugin._onInitAllProps) {
                    initPlugins = true;
                }
                if (plugin._onDisable || plugin._onEnable) {
                    this._notifyPluginsOfEnabled = true;
                }
            } else {
                this._firstPT = propLookup[p] = pt = {
                    _next: this._firstPT,
                    t: target,
                    p: p,
                    f: (typeof(target[p]) === "function"),
                    n: p,
                    pg: false,
                    pr: 0
                };
                pt.s = (!pt.f) ? parseFloat(target[p]) : target[((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3))]();
                v = this.vars[p];
                pt.c = (typeof(v) === "number") ? v - pt.s : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1") * Number(v.substr(2)) : Number(v) || 0;
            }
            if (pt)
                if (pt._next) {
                    pt._next._prev = pt;
                }
        }
        if (overwrittenProps)
            if (this._kill(overwrittenProps, target)) {
                return this._initProps(target, propLookup, siblings, overwrittenProps);
            }
        if (this._overwrite > 1)
            if (this._firstPT)
                if (siblings.length > 1)
                    if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
                        this._kill(propLookup, target);
                        return this._initProps(target, propLookup, siblings, overwrittenProps);
                    }
        return initPlugins;
    };
    p.render = function(time, suppressEvents, force) {
        var prevTime = this._time,
            isComplete, callback, pt;
        if (time >= this._duration) {
            this._totalTime = this._time = this._duration;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
            if (!this._reversed) {
                isComplete = true;
                callback = "onComplete";
            }
            if (this._duration === 0) {
                if (time === 0 || this._rawPrevTime < 0)
                    if (this._rawPrevTime !== time) {
                        force = true;
                    }
                this._rawPrevTime = time;
            }
        } else if (time <= 0) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime > 0)) {
                callback = "onReverseComplete";
                isComplete = this._reversed;
            }
            if (time < 0) {
                this._active = false;
                if (this._duration === 0) {
                    if (this._rawPrevTime >= 0) {
                        force = true;
                    }
                    this._rawPrevTime = time;
                }
            } else if (!this._initted) {
                force = true;
            }
        } else {
            this._totalTime = this._time = time;
            if (this._easeType) {
                var r = time / this._duration,
                    type = this._easeType,
                    pow = this._easePower;
                if (type === 1 || (type === 3 && r >= 0.5)) {
                    r = 1 - r;
                }
                if (type === 3) {
                    r *= 2;
                }
                if (pow === 1) {
                    r *= r;
                } else if (pow === 2) {
                    r *= r * r;
                } else if (pow === 3) {
                    r *= r * r * r;
                } else if (pow === 4) {
                    r *= r * r * r * r;
                }
                if (type === 1) {
                    this.ratio = 1 - r;
                } else if (type === 2) {
                    this.ratio = r;
                } else if (time / this._duration < 0.5) {
                    this.ratio = r / 2;
                } else {
                    this.ratio = 1 - (r / 2);
                }
            } else {
                this.ratio = this._ease.getRatio(time / this._duration);
            }
        }
        if (this._time === prevTime && !force) {
            return;
        } else if (!this._initted) {
            this._init();
            if (!isComplete && this._time) {
                this.ratio = this._ease.getRatio(this._time / this._duration);
            }
        }
        if (!this._active)
            if (!this._paused) {
                this._active = true;
            }
        if (prevTime === 0)
            if (this.vars.onStart)
                if (this._time !== 0 || this._duration === 0)
                    if (!suppressEvents) {
                        this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);
                    }
        pt = this._firstPT;
        while (pt) {
            if (pt.f) {
                pt.t[pt.p](pt.c * this.ratio + pt.s);
            } else {
                pt.t[pt.p] = pt.c * this.ratio + pt.s;
            }
            pt = pt._next;
        }
        if (this._onUpdate)
            if (!suppressEvents) {
                this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);
            }
        if (callback)
            if (!this._gc) {
                if (isComplete) {
                    if (this._timeline.autoRemoveChildren) {
                        this._enabled(false, false);
                    }
                    this._active = false;
                }
                if (!suppressEvents)
                    if (this.vars[callback]) {
                        this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);
                    }
            }
    };
    p._kill = function(vars, target) {
        if (vars === "all") {
            vars = null;
        }
        if (vars == null)
            if (target == null || target == this.target) {
                return this._enabled(false, false);
            }
        target = target || this._targets || this.target;
        var i, overwrittenProps, p, pt, propLookup, changed, killProps, record;
        if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") {
            i = target.length;
            while (--i > -1) {
                if (this._kill(vars, target[i])) {
                    changed = true;
                }
            }
        } else {
            if (this._targets) {
                i = this._targets.length;
                while (--i > -1) {
                    if (target === this._targets[i]) {
                        propLookup = this._propLookup[i] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
                        break;
                    }
                }
            } else if (target !== this.target) {
                return false;
            } else {
                propLookup = this._propLookup;
                overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
            }
            if (propLookup) {
                killProps = vars || propLookup;
                record = (vars != overwrittenProps && overwrittenProps != "all" && vars != propLookup && (vars == null || vars._tempKill != true));
                for (p in killProps) {
                    if ((pt = propLookup[p])) {
                        if (pt.pg && pt.t._kill(killProps)) {
                            changed = true;
                        }
                        if (!pt.pg || pt.t._overwriteProps.length === 0) {
                            if (pt._prev) {
                                pt._prev._next = pt._next;
                            } else if (pt === this._firstPT) {
                                this._firstPT = pt._next;
                            }
                            if (pt._next) {
                                pt._next._prev = pt._prev;
                            }
                            pt._next = pt._prev = null;
                        }
                        delete propLookup[p];
                    }
                    if (record) {
                        overwrittenProps[p] = 1;
                    }
                }
            }
        }
        return changed;
    };
    p.invalidate = function() {
        if (this._notifyPluginsOfEnabled) {
            TweenLite._onPluginEvent("_onDisable", this);
        }
        this._firstPT = null;
        this._overwrittenProps = null;
        this._onUpdate = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = false;
        this._propLookup = (this._targets) ? {} : [];
        return this;
    };
    p._enabled = function(enabled, ignoreTimeline) {
        if (enabled && this._gc) {
            if (this._targets) {
                var i = this._targets.length;
                while (--i > -1) {
                    this._siblings[i] = _register(this._targets[i], this, true);
                }
            } else {
                this._siblings = _register(this.target, this, true);
            }
        }
        Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
        if (this._notifyPluginsOfEnabled)
            if (this._firstPT) {
                return TweenLite._onPluginEvent(((enabled) ? "_onEnable" : "_onDisable"), this);
            }
        return false;
    };
    TweenLite.to = function(target, duration, vars) {
        return new TweenLite(target, duration, vars);
    };
    TweenLite.from = function(target, duration, vars) {
        vars.runBackwards = true;
        if (vars.immediateRender != false) {
            vars.immediateRender = true;
        }
        return new TweenLite(target, duration, vars);
    };
    TweenLite.fromTo = function(target, duration, fromVars, toVars) {
        toVars.startAt = fromVars;
        if (fromVars.immediateRender) {
            toVars.immediateRender = true;
        }
        return new TweenLite(target, duration, toVars);
    };
    TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
        return new TweenLite(callback, 0, {
            delay: delay,
            onComplete: callback,
            onCompleteParams: params,
            onCompleteScope: scope,
            onReverseComplete: callback,
            onReverseCompleteParams: params,
            onReverseCompleteScope: scope,
            immediateRender: false,
            useFrames: useFrames,
            overwrite: 0
        });
    };
    TweenLite.set = function(target, vars) {
        return new TweenLite(target, 0, vars);
    };
    TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, vars) {
        var a = TweenLite.getTweensOf(target),
            i = a.length;
        while (--i > -1) {
            a[i]._kill(vars, target);
        }
    };
    TweenLite.getTweensOf = function(target) {
        if (target == null) {
            return;
        }
        var i, a, j, t;
        if ((target instanceof Array || target.jquery) && typeof(target[0]) === "object") {
            i = target.length;
            a = [];
            while (--i > -1) {
                a = a.concat(TweenLite.getTweensOf(target[i]));
            }
            i = a.length;
            while (--i > -1) {
                t = a[i];
                j = i;
                while (--j > -1) {
                    if (t === a[j]) {
                        a.splice(i, 1);
                    }
                }
            }
        } else {
            a = _register(target).concat();
            i = a.length;
            while (--i > -1) {
                if (a[i]._gc) {
                    a.splice(i, 1);
                }
            }
        }
        return a;
    };
    var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
        this._overwriteProps = (props || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = priority || 0;
    }, true);
    p = TweenPlugin.prototype;
    TweenPlugin.version = 12;
    TweenPlugin.API = 2;
    p._firstPT = null;
    p._addTween = function(target, prop, start, end, overwriteProp, round) {
        var c, pt;
        if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0) + "1") * Number(end.substr(2)))) {
            this._firstPT = pt = {
                _next: this._firstPT,
                t: target,
                p: prop,
                s: start,
                c: c,
                f: (typeof(target[prop]) === "function"),
                n: overwriteProp || prop,
                r: round
            };
            if (pt._next) {
                pt._next._prev = pt;
            }
        }
    }
    p.setRatio = function(v) {
        var pt = this._firstPT,
            val;
        while (pt) {
            val = pt.c * v + pt.s;
            if (pt.r) {
                val = (val + ((val > 0) ? 0.5 : -0.5)) >> 0;
            }
            if (pt.f) {
                pt.t[pt.p](val);
            } else {
                pt.t[pt.p] = val;
            }
            pt = pt._next;
        }
    }
    p._kill = function(lookup) {
        if (lookup[this._propName] != null) {
            this._overwriteProps = [];
        } else {
            var i = this._overwriteProps.length;
            while (--i > -1) {
                if (lookup[this._overwriteProps[i]] != null) {
                    this._overwriteProps.splice(i, 1);
                }
            }
        }
        var pt = this._firstPT;
        while (pt) {
            if (lookup[pt.n] != null) {
                if (pt._next) {
                    pt._next._prev = pt._prev;
                }
                if (pt._prev) {
                    pt._prev._next = pt._next;
                    pt._prev = null;
                } else if (this._firstPT === pt) {
                    this._firstPT = pt._next;
                }
            }
            pt = pt._next;
        }
        return false;
    }
    p._roundProps = function(lookup, value) {
        var pt = this._firstPT;
        while (pt) {
            if (lookup[this._propName] || (pt.n != null && lookup[pt.n.split(this._propName + "_").join("")])) {
                pt.r = value;
            }
            pt = pt._next;
        }
    }
    TweenLite._onPluginEvent = function(type, tween) {
        var pt = tween._firstPT,
            changed;
        if (type === "_onInitAllProps") {
            var pt2, first, last, next;
            while (pt) {
                next = pt._next;
                pt2 = first;
                while (pt2 && pt2.pr > pt.pr) {
                    pt2 = pt2._next;
                }
                if ((pt._prev = pt2 ? pt2._prev : last)) {
                    pt._prev._next = pt;
                } else {
                    first = pt;
                }
                if ((pt._next = pt2)) {
                    pt2._prev = pt;
                } else {
                    last = pt;
                }
                pt = next;
            }
            pt = tween._firstPT = first;
        }
        while (pt) {
            if (pt.pg)
                if (typeof(pt.t[type]) === "function")
                    if (pt.t[type]()) {
                        changed = true;
                    }
            pt = pt._next;
        }
        return changed;
    }
    TweenPlugin.activate = function(plugins) {
        var i = plugins.length;
        while (--i > -1) {
            if (plugins[i].API === TweenPlugin.API) {
                TweenLite._plugins[(new plugins[i]())._propName] = plugins[i];
            }
        }
        return true;
    }
    if ((a = window._gsQueue)) {
        for (i = 0; i < a.length; i++) {
            a[i]();
        }
        for (p in _classLookup) {
            if (!_classLookup[p].def) {
                console.log("Warning: TweenLite encountered missing dependency: com.greensock." + p);
            }
        }
    }
})(window);

injector = {};
injector.Injector = function() {
    this._mappings = {};
    this._createMapping = function(type, name, id) {
        if (this.hasMapping(type, name)) {
            throw new Error("Already has mapping for " + type);
        }
        var mapping = new injector.InjectionMapping(type, name, id);
        this._mappings[id] = mapping;
        return mapping;
    };
    this._getMappingID = function(type, name) {
        name = name == undefined ? '' : name;
        return type + '|' + name;
    };
    this._postConstruct = function(object) {
        var postConstructs = object.postConstructs !== undefined ? object.postConstructs instanceof Array ? object.postConstructs : [] : [],
            index, methodName, method;
        for (index in postConstructs) {
            methodName = postConstructs[index];
            method = object[methodName] === undefined ? null : object[methodName];
            if (typeof method === 'function') {
                method.apply(object);
            }
        }
    };
};
injector.Injector.prototype = {
    map: function(type, name) {
        var mappingID = this._getMappingID(type, name);
        return this._mappings[mappingID] || this._createMapping(type, name, mappingID);
    },
    hasMapping: function(type, name) {
        var mappingID = this._getMappingID(type, name);
        return this._mappings[mappingID] !== undefined;
    },
    getInstance: function(type, name) {
        if (this.hasMapping(type, name)) {
            return this.getMapping(type, name).getValue();
        } else {
            var nameError = name == undefined ? "" : " by name " + name;
            throw new Error("Cannot return instance \"" + type + nameError + "\" because no mapping has been found");
        }
    },
    getMapping: function(type, name) {
        if (this.hasMapping(type, name)) {
            var mappingID = this._getMappingID(type, name);
            return this._mappings[mappingID];
        } else {
            var nameError = name == undefined ? "" : " by name " + name;
            throw new Error("Mapping \"" + type + nameError + "\" was not found");
        }
    },
    injectInto: function(object) {
        var member, injectionObject;
        if (!object) {
            return;
        }
        for (member in object) {
            injectionObject = injector.utils.stringToObject(member, object[member]);
            if (injectionObject !== null) {
                if (this.hasMapping(injectionObject.type, injectionObject.name)) {
                    object[member] = this.getInstance(injectionObject.type, injectionObject.name);
                } else {
                    throw new Error("Cannot inject " + injectionObject.type + " into " + object + " due to a missing rule");
                }
            }
        }
        this.injectInto(object.__proto__);
        this._postConstruct(object);
    }
};

injector.utils = {};
injector.utils.stringToObject = function(type, injectionString) {
    if (typeof injectionString !== "string")
        return null;
    var injectionObject = {
            name: '',
            type: type
        },
        startsWithInjectRegExp = new RegExp('^inject'),
        injectionNameRegExp = new RegExp(/[\w:\-]?name[\s]*?=[\s]*?("[^"]+"|'[^']+'|\w+)/),
        toTypeRegExp = new RegExp('[^:]+$'),
        name, toType;
    if (injectionString == 'inject') {
        return injectionObject;
    } else if (injectionString.match(startsWithInjectRegExp)) {
        name = injectionNameRegExp.exec(injectionString);
        toType = toTypeRegExp.exec(injectionString);
        injectionObject.name = name != null && name.length == 2 ? name[1].replace(/"/gm, "") : '';
        injectionObject.type = toType != null && toType.length == 1 ? toType[0] : type;
        return injectionObject;
    }
    return null;
};

injector.InjectionMapping = function(type, name, id) {
    this._type = type;
    this._name = name;
    this._id = id;
    this._value = null;
    this._toType = null;
    this._isValid = function() {
        return this._value != null || this._toType != null;
    }
    this._validateBeforeCreation = function() {
        if (this._isValid()) {
            throw new Error("Could not create mapping for " + this._id + " because it already has been defined");
            return false;
        }
        return true;
    }
}
injector.InjectionMapping.prototype = {
    toValue: function(value) {
        if (!this._validateBeforeCreation()) {
            return;
        }
        this._value = value;
    },
    toType: function(type) {
        if (!this._validateBeforeCreation()) {
            return;
        }
        this._toType = type;
    },
    toSingleton: function(type) {
        this.toValue(new type());
    },
    getValue: function() {
        if (!this._isValid()) {
            throw new Error("Could not get value for " + this._id + " because the mapping is invalid");
            return;
        }
        if (this._value != null) {
            return this._value;
        } else if (this._toType != null) {
            return new this._toType();
        }
    }
}

$(document).ready(function() {
    if (!window.belief_templates) {
        console.log('Cannot start app without templates');
        return;
    }
    var initMethods = app.init.methods;
    initMethods.initExtensions();
    initMethods.initSettings();
    app.router = new app.classes.routers.AppRouter();
    app.appView = new app.classes.views.AppView({
        router: app.router
    });
});
$(window).load(function() {
    app.init.methods.startup();
    delete app.init;
});
var app = {
    classes: {
        models: {},
        views: {
            base: {},
            gui: {},
            steps: {},
            components: {
                beliefs: {},
                stepmanager: {},
                instructions: {},
                splash: {},
                share: {}
            }
        },
        collections: {},
        routers: {},
        utils: {}
    },
    init: {
        data: {},
        methods: {}
    }
};
app.init.methods = {
    initExtensions: function() {
        _.mixin({});
    },
    initSettings: function() {
        app.Settings = app.classes.utils.Settings;
        _.templateSettings = app.Settings.templateSettings;
        Backbone.emulateHTTP = true;
    },
    startup: function() {
        app.appView.render();
        app.init = null;
        app.router.start();
    }
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}
if (typeof console == "undefined") {
    window.console = {
        log: function() {},
        dir: function() {}
    };
}

function getSegments(numSegments) {
    var path = window.location.pathname.replace(/\/+$/, '');
    while (path.substr(0, 1) == '/') {
        path = path.substr(1);
    }
    var parts = path.split('/');
    parts = parts.slice(0, Math.min(numSegments, parts.length));
    return parts.join('/');
}
window.$ = window.jQuery;
$.extend($.fn, {
    hasAncestor: function(anc) {
        return this.filter(function() {
            return !!$(this).closest(anc).length;
        });
    },
    outerHTML: function() {
        return $(this).clone().wrap('<div></div>').parent().html();
    },
    autoAlpha: function(value, onComplete) {
        TweenLite.to($(this), 0.3, {
            css: {
                autoAlpha: value
            },
            onComplete: onComplete
        });
        return this;
    },
    alert: function() {
        $(this).find('.close').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().slideUp();
            clearTimeout($(this).data('timeout'));
        });
        if ($(this).hasClass('autohide')) {
            var $closeButton = $(this).find('.close');
            var autoHide = function($closeButton) {
                $closeButton.click();
            };
            $closeButton.data('timeout', setTimeout(function() {
                autoHide($closeButton);
            }, 5000));
        }
        return this;
    },
    setCursorPosition: function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    }
});

var inject = {
    injector: new injector.Injector(),
    _superConfigure: null,
    _configure: function(options) {
        if (this._superConfigure !== null) {
            this._superConfigure(options);
        }
        if (this.injector !== undefined) {
            this.injector.injectInto(this);
        }
    }
};
var viewSuperConfigure = Backbone.View.prototype._configure;
_.extend(Backbone.View.prototype, inject);
Backbone.View.prototype._superConfigure = viewSuperConfigure;
Backbone.View.prototype.parent = Backbone.Model.prototype.parent = Backbone.Collection.prototype.parent = function(attribute, options) {
    if (attribute == "inherit") {
        this.parent('initialize', options);
        if (this.events) {
            $.extend(this.events, this.parent('events'));
            this.delegateEvents();
        }
        return;
    }
    return (_.isFunction(this.constructor.__super__[attribute])) ? this.constructor.__super__[attribute].apply(this, _.rest(arguments)) : this.constructor.__super__[attribute];
};
var modelSuperConfigure = Backbone.Model.prototype.initialize;
_.extend(Backbone.Model.prototype, inject);
Backbone.Model.prototype._superConfigure = modelSuperConfigure;

app.classes.utils.BoxFitting = {
    getLetterBox: function(dimensionsSource, dimensionsTarget) {
        var sourceRatio = dimensionsSource.x / dimensionsSource.y;
        var targetRatio = dimensionsTarget.x / dimensionsTarget.y;
        if (sourceRatio > targetRatio) {
            var targetheight = dimensionsTarget.x / sourceRatio;
            var targetyoffset = (dimensionsTarget.y - targetheight) / 2;
            return {
                x: 0,
                y: targetyoffset,
                width: dimensionsTarget.x,
                height: targetheight
            };
        }
        var targetwidth = dimensionsTarget.y * sourceRatio;
        var targetxoffset = (dimensionsTarget.x - targetwidth) / 2;
        return {
            x: targetxoffset,
            y: 0,
            width: targetwidth,
            height: dimensionsTarget.y
        };
    },
    getFillBox: function(dimensionsSource, dimensionsTarget) {
        var sourceRatio = dimensionsSource.x / dimensionsSource.y;
        var targetRatio = dimensionsTarget.x / dimensionsTarget.y;
        if (sourceRatio < targetRatio) {
            var targetheight = dimensionsTarget.x / sourceRatio;
            var targetyoffset = (dimensionsTarget.y - targetheight) / 2;
            return {
                x: 0,
                y: targetyoffset,
                width: dimensionsTarget.x,
                height: targetheight
            };
        }
        var targetwidth = dimensionsTarget.y * sourceRatio;
        var targetxoffset = (dimensionsTarget.x - targetwidth) / 2;
        return {
            x: targetxoffset,
            y: 0,
            width: targetwidth,
            height: dimensionsTarget.y
        };
    },
    applyBox: function(box, $selector) {
        if (!$selector || $selector.length === 0) {
            console.log('Cannot get dimensions of empty selector.');
            return false;
        }
        $container = $selector.parent();
        $container.css('overflow', 'hidden');
        this._upgradePositionTo('absolute', $selector);
        this._upgradePositionTo('relative', $container);
        $selector.css({
            top: box.y,
            left: box.x,
            width: box.width,
            height: box.height
        });
    },
    getDimensionsOfSelector: function($selector) {
        if (!$selector || $selector.length === 0) {
            console.log('Cannot get dimensions of empty selector.');
            return false;
        }
        return {
            x: $selector.width(),
            y: $selector.height()
        };
    },
    _upgradePositionTo: function(position, $selector) {
        var positions = ['', 'static', 'relative', 'absolute', 'fixed'];
        var index = _.indexOf(positions, $selector.css('position'));
        var targetIndex = _.indexOf(positions, position);
        if (targetIndex > index) {
            $selector.css('position', position);
        }
    }
};

app.classes.utils.BrowserUtils = {
    isIOS: function() {
        return navigator.userAgent.match(/(iPod|iPhone|iPad)/i);
    }
};

app.classes.utils.LayoutUtils = Backbone.Model.extend({
    layouts: null,
    templates: {
        TEMPLATE_MANUAL: 'manual',
        TEMPLATE_FINDING_SUPPORTING: 'fsb',
        TEMPLATE_FINDING_CORE: 'fcb',
        TEMPLATE_FRAME: 'frm',
        TEMPLATE_FRAME_NO_CORE: 'frmnc',
        TEMPLATE_FINDING_OPPOSITE_TL: 'tl',
        TEMPLATE_FINDING_OPPOSITE_TR: 'tr',
        TEMPLATE_FINDING_OPPOSITE_BR: 'br',
        TEMPLATE_FINDING_OPPOSITE_BL: 'bl'
    },
    signals: {
        windowResized: null,
        layoutChanged: null
    },
    throttledResize: null,
    currentLayoutLabel: null,
    initialize: function() {
        this.layouts = {};
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        this.throttledResize = _.throttle(_.bind(this.resize, this), 500, true);
        $(window).resize(this.throttledResize);
    },
    add: function(dimensions, label) {
        this.layouts[label] = dimensions;
    },
    resize: function() {
        var newLayout = this.getCurrentLayoutLabel();
        if (newLayout && newLayout != this.currentLayoutLabel) {
            $('body').removeClass('layout-' + this.currentLayoutLabel).addClass('layout-' + newLayout);
            this.currentLayoutLabel = newLayout;
            this.signals.layoutChanged.dispatch(newLayout);
        }
        this.signals.windowResized.dispatch();
    },
    getBeliefTransformation: function(options) {
        options = _.extend({
            index: 0,
            total: 0,
            offset: {
                x: 0,
                y: 0
            },
            isCore: false,
            template: this.templates.TEMPLATE_FINDING_SUPPORTING,
            layout: this.getCurrentLayoutLabel()
        }, options);
        var templates = belief_templates[options.layout];
        if (!templates) {
            console.log('No template set, cannot get transformation.');
            return null;
        }
        if (!templates[options.template]) {
            console.log('Template ' + options.template + ' not found in templates.');
            return null;
        }
        if (!templates[options.template][options.total]) {
            console.log('Total ' + (options.total + 1) + ' in template ' + options.template + ' not found in templates.');
            return null;
        }
        options.offset = options.offset || {
            x: 0,
            y: 0
        };
        var templateGroup = templates[options.template][options.total];
        var template = options.isCore ? templateGroup.p : templateGroup.s[options.index];
        if (!template) {
            console.log('Cannot find the template for index ' + (options.index + 1) + ' / ' + (options.total + 1) + '.');
            return null;
        }
        return {
            left: options.offset.x + template.x,
            top: options.offset.y + template.y,
            scale: template.s
        };
    },
    getDimensions: function(label) {
        return this.layouts[label];
    },
    getCurrentOffset: function() {
        var dimensions = this.getCurrentLayoutDimensions();
        if (!dimensions) {
            return {
                x: 0,
                y: 0
            };
        }
        return {
            x: ($(window).width() - dimensions.width) / 2,
            y: ($(window).height() - dimensions.height) / 2
        };
    },
    getScreenCenter: function() {
        return {
            x: $(window).width() / 2,
            y: $(window).height() / 2
        };
    },
    getCurrentLayoutLabel: function() {
        return this._getLayoutByDimensions($(window).width(), $(window).height());
    },
    getCurrentLayoutDimensions: function() {
        return this.getDimensions(this.getCurrentLayoutLabel());
    },
    _getLayoutByDimensions: function(screenWidth, screenHeight) {
        var smallest = {
            width: -1,
            height: -1
        };
        var smallestKey = 'tiny';
        $.each(this.layouts, function(label, dimensions) {
            if (screenWidth > dimensions.width && screenHeight > dimensions.height && dimensions.width > smallest.width && dimensions.height > smallest.height) {
                smallest = dimensions;
                smallestKey = label;
            }
        });
        return smallestKey;
    }
});

app.classes.utils.Settings = {
    defaultFPS: 30,
    templateSettings: {
        interpolate: /\{\{(.+?)\}\}/g
    },
    baseURL: window.base_url,
    rootURL: window.root_url,
    appURL: window.base_url + 'tool/',
    apiEmailURL: window.base_url + 'api/v1/email/',
    apiPutInHallURL: window.base_url + 'api/v1/putinhall/',
    development: window.environment == 'development',
    maxAJAXRetries: 1,
    minCoreBeliefLength: 20,
    maxCoreBeliefLength: 100,
    minSupportingBeliefs: 4,
    maxSupportingBeliefs: 4,
    normalSupportingBeliefs: 6,
    moreSupportingBeliefs: 10,
    minOppositeBeliefs: 3,
    maxOppositeBeliefs: 3,
    supportingBeliefSelectionSize: 4,
    reframeGUID: window.reframe_guid,
    reframeID: window.reframe_id
};

app.classes.utils.SignalUtils = {
    create: function(obj) {
        var scope = app.classes.utils.SignalMap;
        var newObj = {};
        _.each(obj, function(value, key, list) {
            newObj[key] = new signals.Signal();
        });
        return newObj;
    }
};

app.classes.utils.StringUtils = {
    stripTrailingSlash: function(str) {
        if (str.substr(-1) == '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    },
    getClassPartial: function(classesString, startPart, requireString) {
        var classes = classesString.split(' ');
        var secondPart;
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].indexOf(startPart + '-') === 0) {
                secondPart = classes[i].substr(startPart.length + 1);
                if (!requireString) {
                    return secondPart;
                }
                if (isNaN(parseFloat(secondPart))) {
                    return secondPart;
                }
            }
        }
        return false;
    },
    generateGUID: function() {
        var S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    intToEnglishString: function(value) {
        var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        return numbers[value];
    }
};

app.classes.models.BeliefModel = Backbone.RelationalModel.extend({
    defaults: {
        id: null,
        text: '',
        created: null,
        is_opposite: false,
        is_selected: false,
        is_core: false
    },
    relations: [{
        type: Backbone.HasOne,
        key: 'parent',
        relatedModel: 'app.classes.models.BeliefModel',
        includeInJSON: 'id',
        autoFetch: false
    }],
    beliefsCollection: 'inject',
    appSettings: 'inject',
    initialize: function() {},
    save: function(data) {
        if (data.text === '' && !this.get('id')) {
            return;
        }
        app.classes.models.BeliefModel.__super__.save.apply(this, [data]);
    },
    url: function() {
        if (this.isNew()) {
            return app.Settings.baseURL + 'api/v1/beliefs/';
        }
        return app.Settings.baseURL + 'api/v1/beliefs/id/' + this.get('id');
    },
    parse: function(object) {
        var data = object.success !== undefined ? object.data : object;
        if (data.parent === undefined) {
            data.parent = data.parent_id;
        }
        delete data.parent_id;
        return data;
    },
    getChildren: function() {
        return this.beliefsCollection.where({
            parent_id: this.id
        });
    }
});

app.classes.collections.BeliefsCollection = Backbone.Collection.extend({
    model: app.classes.models.BeliefModel,
    initialize: function(options) {
        this.on('change', function(model) {});
    },
    countWhere: function(where) {
        var searchForText = where.text && where.text == '*';
        if (searchForText) {
            delete where.text;
        }
        var filtered = this.where(where);
        if (searchForText) {
            filtered = _.reject(filtered, function(beliefModel) {
                return beliefModel.get('text') === '';
            });
        }
        return filtered.length;
    },
    forceOneEmpty: function(data) {
        data = _.extend({
            text: ''
        }, data || {});
        var emptyOnes = this.where(data);
        if (emptyOnes.length === 0) {
            return this.add(data);
        }
        while (emptyOnes.length > 1) {
            this.remove(emptyOnes.pop());
        }
        return false;
    },
    removeEmpty: function() {
        _.each(this.where({
            text: '',
            is_core: false
        }), _.bind(function(model) {
            model.parent = null;
            model.destroy({
                error: function(model, response) {
                    console.log('destroyed model ', response);
                }
            });
        }, this));
    }
});

app.classes.views.base.ComponentView = Backbone.View.extend({
    rendered: false,
    _isShown: false,
    options: null,
    baseSignals: {
        showStarted: null,
        showCompleted: null,
        hideStarted: null,
        hideCompleted: null
    },
    initialize: function(options) {
        this.options = options;
        this.baseSignals = app.classes.utils.SignalUtils.create(this.baseSignals);
    },
    show: function($container) {
        this.baseSignals.showStarted.dispatch(this);
        if (!$container && this.options && this.options.container) {
            $container = this.options.container;
        }
        if (!$container) {
            $container = $('#content');
        }
        if (!this.rendered) {
            this.rendered = true;
            this.$el.appendTo($container);
        } else {
            this.$el.css({
                display: 'block'
            });
        }
        this._isShown = true;
        this.baseSignals.showCompleted.dispatch(this);
        return this;
    },
    hide: function(options) {
        this.baseSignals.hideStarted.dispatch(this);
        options = _.extend({
            preventCSS: false
        }, options);
        if (!options.preventCSS) {
            this.$el.css({
                display: 'none'
            });
        }
        this._isShown = false;
        this.baseSignals.hideCompleted.dispatch(this);
        return this;
    },
    render: function() {
        throw new Error('The render method for this component is not implemented.');
    },
    isShown: function() {
        return this._isShown;
    },
    isDone: function() {
        throw new Error('The isDone method is not implemented for component ' + this);
    }
});

app.classes.views.base.StepView = Backbone.View.extend({
    signals: {
        showStepStarted: null,
        showStepCompleted: null,
        hideStepStarted: null,
        hideStepCompleted: null,
        stepCompletedChanged: null,
        subStepCompletedChanged: null
    },
    _isCompleted: false,
    _isShown: false,
    initialize: function(options) {
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
    },
    show: function() {
        if (this._isShown) {
            return this;
        }
        this._isShown = true;
        this.signals.showStepStarted.dispatch(this, this._onShowCompleted);
        return this;
    },
    hide: function() {
        if (!this._isShown) {
            return this;
        }
        this._isShown = false;
        this.signals.hideStepStarted.dispatch(this, this._onHideCompleted);
        return this;
    },
    isShown: function() {
        return this._isShown;
    },
    isCompleted: function() {
        return this._isCompleted;
    },
    setStepCompleted: function(completed, data) {
        if (this._isCompleted == completed) {
            return;
        }
        this._isCompleted = completed;
        this.signals.stepCompletedChanged.dispatch(this, completed, data);
    },
    setSubStepCompleted: function(completed, data) {
        console.log('substep set to completed: ', completed);
        this.signals.subStepCompletedChanged.dispatch(this, completed, data);
    },
    canSkipStep: function() {
        return false;
    },
    _onShowCompleted: function() {
        this.signals.showStepCompleted.dispatch(this, this._onHideCompleted);
        return this;
    },
    _onHideCompleted: function() {
        this.signals.hideStepCompleted.dispatch(this);
        return this;
    }
});

app.classes.views.base.ViewSwapperView = Backbone.View.extend({
    views: null,
    currentView: null,
    viewClass: null,
    viewClassOptions: null,
    onHiddenCallback: null,
    initialize: function(options) {
        this.views = [];
        this.viewClass = options.viewClass;
        this.viewClassOptions = options.viewClassOptions;
    },
    addExistingView: function(model, options, isCurrent) {
        var view = this.getViewByModel(model);
        if (!view) {
            view = this._createViewByModel(model, options);
            this.views.push(view);
        }
        if (isCurrent) {
            this.currentView = view;
        }
        return view;
    },
    showView: function(model, options) {
        if (this.currentView && this.currentView.model == model) {
            console.log('Already showing the view that belongs to model ', model);
            return;
        }
        var view = this.getViewByModel(model);
        if (!view) {
            view = this._createViewByModel(model, options);
            this.views.push(view);
        }
        if (this.currentView) {
            var oldView = this.currentView;
            this.currentView = view;
            oldView.hide(_.bind(this._showCurrentView, this));
            return view;
        }
        this.currentView = view;
        this._showCurrentView();
        return view;
    },
    hideView: function(onHiddenCallback) {
        if (this.currentView) {
            var viewToHide = this.currentView;
            this.onHiddenCallback = onHiddenCallback;
            this.currentView = null;
            viewToHide.hide(onHiddenCallback);
            return;
        }
        if (onHiddenCallback) {
            onHiddenCallback();
        }
    },
    getViewByModel: function(model) {
        for (var i = 0; i < this.views.length; i++) {
            if (this.views[i].model == model) {
                return this.views[i];
            }
        }
        return false;
    },
    getCurrentView: function() {
        return this.currentView;
    },
    _showCurrentView: function() {
        if (this.onHiddenCallback) {
            this.onHiddenCallback();
            this.onHiddenCallback = null;
        }
        this.currentView.render().show();
    },
    _createViewByModel: function(model, options) {
        if (!options) {
            options = {};
        }
        options.model = model;
        var viewClass = this.viewClass;
        if (!$.isFunction(this.viewClass)) {
            _.map(this.viewClass, function(viewClasses, filter) {
                var filterValue = model.get(filter);
                var filteredViewClass = viewClasses[filterValue];
                if (!filteredViewClass) {
                    console.log('Cannot show View. The filter ' + filter + ' has a value (' + filterValue + ') that is not mapped in the hash object (' + _.keys(viewClasses).join(',') + ').');
                    return;
                }
                viewClass = filteredViewClass;
            });
        }
        if (!viewClass || !$.isFunction(viewClass)) {
            console.log('Unable to construct the viewClass.');
            return;
        }
        return new viewClass(_.extend(options, this.viewClassOptions));
    }
});

app.classes.views.components.beliefs.BeliefBaseView = app.classes.views.base.ComponentView.extend({
    modes: {
        MODE_EMPTY: 'empty',
        MODE_EDITING: 'editing',
        MODE_FILLED: 'filled',
        MODE_FIXED: 'fixed',
        MODE_FIXED_CHECK: 'fixed-check',
        MODE_TOGGLE: 'toggle',
        MODE_PICK: 'pick',
        MODE_PICK_CHECK: 'pick-check',
        MODE_FIXED_BIG: 'fixedbig'
    },
    template: $('#template_component_beliefinput').html(),
    visualElements: {},
    app: 'inject',
    _currentMode: '',
    _removeAllowed: false,
    signals: {
        modeChanged: null,
        mouseOver: null,
        mouseOut: null,
        clicked: null,
        valueChanged: null
    },
    settings: {
        emptyScale: 0.4,
        bigScale: 1.6,
        editScale: 1,
        normalScale: 0.9,
        maxFontSize: 22,
        minFontSize: 12
    },
    fittingTimeout: 0,
    fitAttempts: 0,
    maxFitAttempts: 999999999999,
    fitAttemptInterval: 300,
    _disabled: false,
    initialize: function(options) {
        this._componentSuper = app.classes.views.components.beliefs.BeliefBaseView.__super__;
        this._componentSuper.initialize.call(this, options);
        _.bindAll(this);
        this.options = _.extend({
            type: 'core',
            mode: this.modes.MODE_EMPTY
        }, options);
        this.settings = _.extend({}, this.settings);
        this.visualElements = {};
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        this._render();
        this.setValue(this.model.get('text'));
        this.baseSignals.showCompleted.add(this.fitText);
    },
    tweenToTransformation: function(transformation) {
        var pos = this.$el.position();
        var currentLocation = window.location.href;
        if (pos.top === 0 && pos.left === 0) {
            if (currentLocation.indexOf('7') != -1 && transformation.top == 360 && transformation.left == 380) {
                TweenMax.set(this.$el, {
                    css: {
                        top: '210',
                        left: '410',
                        scale: 0
                    }
                });
                console.log("Hiding footer on step 9.");
                $('footer').hide();
            } else {
                TweenMax.set(this.$el, {
                    css: {
                        top: transformation.top,
                        left: transformation.left,
                        scale: 0
                    }
                });
            }
        }
        if (currentLocation.indexOf('7') != -1) {
            $('.beliefinput.oppositecore').addClass('moveOpCore');
            $('.beliefinput.core').addClass('moveCore');
            /*
            setTimeout(function(){
                $('.beliefinput.mode-filtering').hide();
                $('.moveCore, .moveOpCore').css('margin-top',0);
                $('.moveCore, .moveOpCore').css('top',($('#firstShare h2').first().offset().top-20));
            },500);
            */
        }
        if (this.$el.hasClass('core') == true && currentLocation.indexOf('7') != -1) {
            TweenLite.to(this.$el, 0.3, {
                css: transformation
            });
            this.$el.addClass('moveCore');
        } else
            TweenLite.to(this.$el, 0.3, {
                css: transformation
            });
    },
    setEditModeBasedOnValue: function() {
        if (this.getValue() === '') {
            this.setMode(this.modes.MODE_EMPTY);
            return this;
        }
        this.setMode(this.modes.MODE_FILLED);
        return this;
    },
    fitText: function() {
        if (!$.contains(document.documentElement, this.$el.get(0))) {
            this.fitAttempts++;
            if (this.fitAttempts > this.maxFitAttempts) {
                this.fitAttempts = 0;
                return;
            }
            this.fittingTimeout = _.delay(this.fitText, this.fitAttemptInterval);
            return;
        }
        this.fitAttempts = 0;
        this.$el.textFitting({
            minFontSize: 12,
            maxFontSize: 32,
            verticalAlignProperty: 'top',
            childSelector: 'textarea',
            fontWidthRatio: 0.7,
            averageWordBreak: 0.7,
            middlePercentage: 0.45,
            area: {
                width: 144,
                height: 124
            },
            parentHeight: 200
        });
        return this;
    },
    disable: function(options) {
        options = options || {};
        _.defaults(options, {
            gray: false
        });
        this._disabled = true;
        this.$el.addClass('disabled');
        if (options.gray) {
            this.$el.addClass('gray');
        }
        return this;
    },
    enable: function(options) {
        options = options || {};
        _.defaults(options, {
            gray: false
        });
        this._disabled = false;
        this.$el.removeClass('disabled gray');
        return this;
    },
    getMode: function() {
        return this._currentMode;
    },
    setRemoveAllowed: function(value) {
        if (this._removeAllowed != value) {
            this._removeAllowed = value;
            this._updateRemove();
        }
    },
    setValue: function(value) {
        this.visualElements.textarea.val(value);
        this.setEditModeBasedOnValue();
        this.signals.valueChanged.dispatch(this.getValue());
        this.fitText();
        return this;
    },
    getValue: function() {
        return $.trim(this.visualElements.textarea.val());
    },
    setMode: function(mode) {
        if (this._currentMode == mode) {
            return this;
        }
        if (!_.contains(this.modes, mode)) {
            throw new Error('Cannot change to mode ' + mode + ', this mode is not recognized');
        }
        this.$el.removeClass('mode-' + this._currentMode).addClass('mode-' + mode);
        var previousMode = this._currentMode;
        this._currentMode = mode;
        this.visualElements.body.off('click', this._onBodyClicked);
        this.visualElements.doc.off('keydown', this._onKeyDowned);
        switch (mode) {
            case this.modes.MODE_EMPTY:
                TweenMax.to([this.visualElements.background, this.visualElements.hitarea.show()], 0.5, {
                    css: {
                        scale: this.settings.emptyScale
                    }
                });
                TweenMax.to(this.visualElements.edit, 0.3, {
                    css: {
                        autoAlpha: 1
                    }
                });
                TweenMax.to(this.visualElements.textarea, 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: this.settings.emptyScale
                    }
                });
                TweenMax.to([this.visualElements.checkmark, this.visualElements.done, this.visualElements.remove], 0.3, {
                    css: {
                        autoAlpha: 0
                    }
                });
                this.visualElements.textarea.blur();
                break;
            case this.modes.MODE_FIXED_CHECK:
            case this.modes.MODE_PICK_CHECK:
                TweenMax.to([this.visualElements.background, this.visualElements.hitarea.show()], 0.5, {
                    css: {
                        scale: this.settings.normalScale
                    }
                });
                TweenMax.to(this.visualElements.edit, 0.3, {
                    css: {
                        autoAlpha: 0
                    }
                });
                TweenMax.to(this.visualElements.textarea, 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: this.settings.normalScale
                    }
                });
                TweenMax.to(this.visualElements.checkmark, 0.3, {
                    css: {
                        autoAlpha: 1,
                        scale: this.settings.normalScale
                    }
                });
                TweenMax.to([this.visualElements.done, this.visualElements.remove], 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: 0
                    }
                });
                this.visualElements.textarea.attr('readonly', 'readonly');
                break;
            case this.modes.MODE_TOGGLE:
            case this.modes.MODE_FIXED:
            case this.modes.MODE_FIXED_DISABLED:
            case this.modes.MODE_FILLED:
            case this.modes.MODE_PICK:
                TweenMax.to([this.visualElements.background, this.visualElements.hitarea.show()], 0.5, {
                    css: {
                        scale: this.settings.normalScale
                    }
                });
                TweenMax.to(this.visualElements.edit, 0.3, {
                    css: {
                        autoAlpha: 0
                    }
                });
                TweenMax.to(this.visualElements.textarea, 0.3, {
                    css: {
                        autoAlpha: 1,
                        scale: this.settings.normalScale
                    }
                });
                TweenMax.to([this.visualElements.checkmark, this.visualElements.done, this.visualElements.remove], 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: 0
                    }
                });
                this.visualElements.textarea.attr('readonly', 'readonly').blur();
                break;
            case this.modes.MODE_FIXED_BIG:
                TweenMax.to([this.visualElements.background, this.visualElements.hitarea.show()], 0.5, {
                    css: {
                        scale: this.settings.bigScale
                    }
                });
                TweenMax.to(this.visualElements.edit, 0.3, {
                    css: {
                        autoAlpha: 0
                    }
                });
                TweenMax.to(this.visualElements.textarea, 0.3, {
                    css: {
                        autoAlpha: 1,
                        scale: this.settings.bigScale
                    }
                });
                TweenMax.to([this.visualElements.checkmark, this.visualElements.done, this.visualElements.remove], 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: 0
                    }
                });
                this.visualElements.textarea.attr('readonly', 'readonly');
                break;
            case this.modes.MODE_EDITING:
                TweenMax.to([this.visualElements.background, this.visualElements.hitarea.hide()], 0.5, {
                    css: {
                        scale: this.settings.editScale
                    },
                    ease: Cubic.easeOut
                });
                TweenMax.to(this.visualElements.edit, 0.3, {
                    css: {
                        autoAlpha: 0
                    }
                });
                TweenMax.to([this.visualElements.textarea, this.visualElements.done], 0.3, {
                    css: {
                        autoAlpha: 1,
                        scale: this.settings.editScale
                    },
                    onComplete: _.bind(function(tween, value) {
                        tween.target[0].focus().setCursorPosition(value.length);
                    }, this),
                    onCompleteParams: ["{self}", this.getValue()]
                });
                TweenMax.to([this.visualElements.checkmark, this.visualElements.remove], 0.3, {
                    css: {
                        autoAlpha: 0,
                        scale: 0
                    }
                });
                this._updateRemove();
                this.visualElements.doc.on('keydown', this._onKeyDowned);
                this.visualElements.textarea.show().css({
                    visibility: 'visible'
                }).removeAttr('readonly').focus().setCursorPosition(this.getValue().length);
                this.visualElements.body.on('click', this._onBodyClicked);
                break;
            default:
                throw new Error('Set to valid mode, but mode not handled in setMode method.');
        }
        this.signals.modeChanged.dispatch(mode, this, previousMode);
        if (previousMode == this.modes.MODE_EDITING || mode == this.modes.MODE_EDITING) {
            this.app.signals.beliefEditStateChanged.dispatch(mode, this);
        }
        return this;
    },
    _render: function() {
        this.$el = $(this.template).addClass(this.options.type);
        this.visualElements.edit = this.$el.find('.edit');
        this.visualElements.done = this.$el.find('.done');
        this.visualElements.remove = this.$el.find('.remove');
        this.visualElements.checkmark = this.$el.find('.checkmark');
        this.visualElements.textarea = this.$el.find('textarea');
        this.visualElements.background = this.$el.find('.background');
        this.visualElements.body = $('body');
        this.visualElements.hitarea = this.$el.find('.hitarea');
        this.visualElements.doc = $(document);
        this.visualElements.hitarea.on('click', _.bind(function(event) {
            if (this._disabled) {
                return;
            }
            this.signals.clicked.dispatch(event, this);
        }, this)).on('mouseenter', this._onBaseMouseOver).on('mouseleave', this._onBaseMouseOut);
        this.visualElements.done.on('click', this._onDoneClicked);
        this.visualElements.remove.on('click', this._onRemoveClicked);
        this.visualElements.edit.on('click', this._onEditClicked);
        this.visualElements.textarea.on('keyup change', this._onTextChanged);
        return this;
    },
    _onBaseMouseOver: function(event) {
        if (this._disabled) {
            return;
        }
        this.$el.addClass('hover');
        this.signals.mouseOver.dispatch(event, this);
    },
    _onBaseMouseOut: function(event) {
        if (this._disabled) {
            return;
        }
        this.$el.removeClass('hover');
        this.signals.mouseOut.dispatch(event, this);
    },
    _onEditClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.signals.clicked.dispatch(event);
    },
    _onDoneClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setEditModeBasedOnValue();
    },
    _onRemoveClicked: function(event) {
        this.model.destroy();
    },
    _onBodyClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._disabled) {
            return;
        }
        if ($(event.target).hasAncestor(this.$el).length === 0) {
            this.setEditModeBasedOnValue();
        }
    },
    _onKeyDowned: function(event) {
        if (this._disabled) {
            return;
        }
        if (event.keyCode == 13) {
            this.setEditModeBasedOnValue();
        }
    },
    _onTextChanged: function(event) {
        this.fitText();
        this.signals.valueChanged.dispatch(this.getValue());
    },
    _updateRemove: function() {
        if (this._removeAllowed && this.modes.MODE_EDITING == this._currentMode) {
            TweenMax.to(this.visualElements.remove, 0.3, {
                css: {
                    autoAlpha: 1,
                    scale: this.settings.editScale * 0.7
                }
            });
        } else {
            TweenMax.to(this.visualElements.remove, 0.3, {
                css: {
                    autoAlpha: 0,
                    scale: 0
                }
            });
        }
    }
});

app.classes.views.components.beliefs.BeliefCoreView = app.classes.views.components.beliefs.BeliefBaseView.extend({
    layouts: 'inject',
    _currentTemplate: null,
    disableAutoAlign: false,
    _manualTrans: null,
    initialize: function(options) {
        options = options || {};
        this._super = this.constructor.__super__;
        this._super.initialize.call(this, options);
        this.layouts.signals.windowResized.add(this.align);
        this.signals.clicked.add(this._onClicked);
        this.signals.mouseOver.add(this._onMouseOver);
        this.signals.mouseOut.add(this._onMouseOut);
        this.signals.modeChanged.add(this._onModeChanged);
        this.align();
    },
    setTemplate: function(template, manualTransformation) {
        this._currentTemplate = template;
        this._manualTrans = manualTransformation;
        this.align();
        return this;
    },
    isDone: function() {
        return this.getMode() == this.modes.MODE_FILLED;
    },
    align: function(options) {
        if (this.disableAutoAlign) {
            return this;
        }
        if (!this._currentTemplate) {
            return this;
        }
        var transformation = null;
        if (this._currentTemplate == this.layouts.templates.TEMPLATE_MANUAL) {
            transformation = this._manualTrans;
        } else {
            transformation = this.layouts.getBeliefTransformation({
                isCore: true,
                offset: this.layouts.getCurrentOffset(),
                template: this._currentTemplate
            });
        }
        if (options && options.instant) {
            this.$el.css(options.position);
        } else {
            this.tweenToTransformation(transformation);
        }
        return this;
    },
    _onModeChanged: function(mode) {
        switch (mode) {
            case this.modes.MODE_FILLED:
            case this.modes.MODE_EMPTY:
                this.model.save({
                    text: this.getValue()
                });
                break;
        }
    },
    _onClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
            case this.modes.MODE_FILLED:
                this.setMode(this.modes.MODE_EDITING);
                break;
        }
    },
    _onMouseOver: function(event) {
        var elements = [this.visualElements.background, this.visualElements.hitarea, this.visualElements.textarea];
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.emptyScale + 0.1
                    },
                    ease: Cubic.easeOut
                });
                break;
            case this.modes.MODE_FILLED:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.editScale
                    },
                    ease: Cubic.easeOut
                });
                break;
        }
    },
    _onMouseOut: function(event) {
        var elements = [this.visualElements.background, this.visualElements.hitarea, this.visualElements.textarea];
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.emptyScale
                    },
                    ease: Cubic.easeOut
                });
                break;
            case this.modes.MODE_FILLED:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.normalScale
                    },
                    ease: Cubic.easeOut
                });
                break;
        }
    }
});

app.classes.views.components.beliefs.BeliefSupportingView = app.classes.views.components.beliefs.BeliefBaseView.extend({
    initialize: function(options) {
        options.type = this.model.get('is_opposite') ? 'oppositesupporting' : 'supporting';
        this._super = this.constructor.__super__;
        this._super.initialize.call(this, options);
        this.signals = _.extend(app.classes.utils.SignalUtils.create({
            selected: null,
            deselected: null
        }), this.signals);
        _.bindAll(this);
        this.signals.clicked.add(this._onClicked);
        this.signals.mouseOver.add(this._onMouseOver);
        this.signals.mouseOut.add(this._onMouseOut);
        this.signals.modeChanged.add(this._onModeChanged);
        this._onModeChanged(this.getMode(), this, '');
        if (this.model.get('is_selected')) {
            this.$el.addClass('selected');
        }
    },
    select: function() {
        this.model.save({
            is_selected: true
        });
        this.$el.addClass('selected');
        this.signals.selected.dispatch(this);
    },
    deselect: function() {
        this.model.save({
            is_selected: false
        });
        this.$el.removeClass('selected');
        this.signals.deselected.dispatch(this);
    },
    isSelected: function() {
        return this.model.get('is_selected');
    },
    _onModeChanged: function(mode, belief, previousMode) {
        if (mode == this.modes.MODE_FILLED) {
            this.setRemoveAllowed(true);
        }
        if (previousMode !== belief.modes.MODE_EDITING) {
            return;
        }
        switch (mode) {
            case this.modes.MODE_FILLED:
                this.setRemoveAllowed(true);
                this.model.save({
                    text: this.getValue()
                });
                break;
            case this.modes.MODE_EMPTY:
                this.model.save({
                    text: this.getValue()
                });
                break;
        }
    },
    _onClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
            case this.modes.MODE_FILLED:
                this.setMode(this.modes.MODE_EDITING);
                break;
            case this.modes.MODE_TOGGLE:
                this._onToggleClick(event);
                break;
        }
    },
    _onToggleClick: function(event) {
        if (this.model.get('is_selected')) {
            this.deselect();
        } else {
            this.select();
        }
    },
    _onMouseOver: function(event) {
        var elements = [this.visualElements.background, this.visualElements.hitarea, this.visualElements.textarea];
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.emptyScale + 0.1
                    },
                    ease: Cubic.easeOut
                });
                break;
            case this.modes.MODE_PICK:
            case this.modes.MODE_PICK_CHECK:
            case this.modes.MODE_TOGGLE:
            case this.modes.MODE_FILLED:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.editScale
                    },
                    ease: Cubic.easeOut
                });
                break;
        }
    },
    _onMouseOut: function(event) {
        var elements = [this.visualElements.background, this.visualElements.hitarea, this.visualElements.textarea];
        switch (this.getMode()) {
            case this.modes.MODE_EMPTY:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.emptyScale
                    },
                    ease: Cubic.easeOut
                });
                break;
            case this.modes.MODE_PICK:
            case this.modes.MODE_PICK_CHECK:
            case this.modes.MODE_TOGGLE:
            case this.modes.MODE_FILLED:
                TweenMax.to(elements, 0.3, {
                    css: {
                        scale: this.settings.normalScale
                    },
                    ease: Cubic.easeOut
                });
                break;
        }
    }
});

app.classes.views.components.beliefs.ListBeliefsSupportingView = app.classes.views.base.ComponentView.extend({
    tagName: 'div',
    className: 'supportingbeliefs',
    index: 0,
    signals: {
        modeChanged: null,
        beliefSelected: null,
        beliefDeselected: null,
        beliefModeChanged: null,
        beliefClicked: null
    },
    modes: {
        MODE_FINDING: 'finding',
        MODE_FILTERING: 'filtering',
        MODE_STATIC: 'static',
        MODE_MENU: 'menu'
    },
    _beliefViews: null,
    whereFilter: null,
    _currentMode: '',
    _currentTemplate: '',
    _primaryBelief: null,
    _cluster: null,
    layouts: 'inject',
    beliefsCollection: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        options = _.defaults(options, {
            where: {},
            classes: ''
        });
        this.whereFilter = options.where;
        this.$el.addClass(options.classes);
        this.index = options.index || this.index;
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        this._beliefViews = [];
        this.beliefsCollection.on('add', this.addBelief);
        this.beliefsCollection.on('reset', this._onReset);
        this.beliefsCollection.on('remove', this.removeBelief);
        for (var key in this.whereFilter) {
            this.beliefsCollection.on('change:' + key, this._onRelevantPropertyChanged);
        }
        this.layouts.signals.windowResized.add(this.align);
        this.baseSignals.showCompleted.add(this._onShowCompleted);
        this.baseSignals.hideStarted.add(this._onHideStarted);
        this._onReset(this.beliefsCollection);
    },
    setWhereFilter: function(where) {
        if (_.isEqual(where, this.whereFilter)) {
            return this;
        }
        this.whereFilter = where;
        _.each(this._beliefViews, _.bind(function(beliefView) {
            this.removeBelief(beliefView.model);
        }, this));
        this.beliefsCollection.each(_.bind(function(model) {
            this.addBelief(model, true);
        }, this));
        this.align();
        return this;
    },
    isDone: function() {
        var firstInEditingMode = _.find(this._beliefViews, function(beliefView) {
            return beliefView.getMode() == beliefView.modes.MODE_EDITING;
        });
        return !firstInEditingMode;
    },
    disable: function(options) {
        _.invoke(this._beliefViews, 'disable', options);
        return this;
    },
    enable: function(options) {
        _.invoke(this._beliefViews, 'enable', options);
        return this;
    },
    setClustering: function(cluster, disableNonEmpty) {
        this._cluster = cluster;
        if (cluster && disableNonEmpty) {
            _.each(this._beliefViews, function(beliefView) {
                if (beliefView.getValue() !== '') {
                    beliefView.disable({
                        gray: true
                    });
                }
            });
        } else {
            _.each(this._beliefViews, function(beliefView) {
                beliefView.enable();
            });
        }
        return this;
    },
    align: function(options) {
        if (this._cluster) {
            this._alignAround(this._cluster);
            return;
        }
        this._updateLayout();
        return this;
    },
    setTemplate: function(template) {
        this._currentTemplate = template;
        this.align();
        return this;
    },
    setPrimaryBelief: function(belief) {
        if (this._primaryBelief) {
            this._primaryBelief.disableAutoAlign = false;
            this._primaryBelief = null;
        }
        if (belief) {
            this._primaryBelief = belief;
            this._primaryBelief.disableAutoAlign = true;
            this.align();
        }
        return this;
    },
    getTemplate: function() {
        return this._currentTemplate;
    },
    filterBeliefs: function(where) {
        _.each(this._beliefViews, _.bind(function(beliefView) {
            if (this._modelMatchesWhere(beliefView.model, where)) {
                beliefView.show();
            } else {
                beliefView.hide();
            }
        }, this));
        return this;
    },
    addBelief: function(model, skipAlign) {
        if (!this._modelMatchesWhere(model, this.whereFilter)) {
            return;
        }
        if (_.find(this._beliefViews, function(beliefView) {
                return beliefView.model == model;
            })) {
            return;
        }
        var newBelief = new app.classes.views.components.beliefs.BeliefSupportingView({
            model: model,
            container: this.$el
        });
        newBelief.signals.selected.add(this._onBeliefSelected);
        newBelief.signals.deselected.add(this._onBeliefDeselected);
        newBelief.signals.modeChanged.add(this._onBeliefModeChanged);
        newBelief.signals.clicked.add(this._onBeliefClicked);
        newBelief.show();
        this._beliefViews.push(newBelief);
        if (skipAlign !== true) {
            this.align();
        }
        return this;
    },
    removeBelief: function(model) {
        var oldBeliefView = _.find(this._beliefViews, function(view) {
            return view.model == model;
        });
        if (!oldBeliefView) {
            return;
        }
        this._beliefViews = _.reject(this._beliefViews, function(view) {
            return view == oldBeliefView;
        });
        TweenLite.to(oldBeliefView.$el, 0.3, {
            css: {
                scale: 0
            },
            onCompleteParams: [oldBeliefView.$el],
            onComplete: function($belief) {
                $belief.remove();
            }
        });
        this.align();
        return this;
    },
    getNumBeliefs: function() {
        return this._beliefViews.length;
    },
    getBeliefs: function() {
        return this._beliefViews;
    },
    getMode: function() {
        return this._currentMode;
    },
    setMode: function(mode) {
        if (this._currentMode == mode) {
            return this;
        }
        if (!_.contains(this.modes, mode)) {
            throw new Error('Cannot change to mode ' + mode + ', this mode is not recognized');
        }
        this.$el.removeClass('mode-' + this._currentMode).addClass('mode-' + mode);
        this._currentMode = mode;
        switch (mode) {
            case this.modes.MODE_FINDING:
                _.invoke(this._beliefViews, 'setEditModeBasedOnValue');
                break;
            case this.modes.MODE_FILTERING:
                _.each(this._beliefViews, function(beliefView) {
                    beliefView.setMode(beliefView.modes.MODE_TOGGLE);
                });
                break;
            case this.modes.MODE_STATIC:
                _.each(this._beliefViews, function(beliefView) {
                    beliefView.setMode(beliefView.modes.MODE_FIXED);
                });
                break;
            case this.modes.MODE_MENU:
                _.each(this._beliefViews, function(beliefView) {
                    beliefView.setMode(beliefView.modes.MODE_PICK);
                });
                break;
        }
        return this;
    },
    _onReset: function(models) {
        models.each(_.bind(function(model) {
            this.addBelief(model, true);
        }, this));
        this.align();
    },
    _onBeliefSelected: function(beliefView) {
        this.signals.beliefSelected.dispatch(beliefView);
    },
    _onBeliefDeselected: function(beliefView) {
        this.signals.beliefDeselected.dispatch(beliefView);
    },
    _onBeliefClicked: function(event, beliefView) {
        if (this.getMode() == this.modes.MODE_MENU) {
            this.signals.beliefClicked.dispatch(beliefView);
        }
    },
    _onRelevantPropertyChanged: function(beliefModel) {
        if (this._modelMatchesWhere(beliefModel, this.whereFilter)) {
            this.addBelief(beliefModel);
            return;
        }
        this.removeBelief(beliefModel);
    },
    _onBeliefModeChanged: function(mode, beliefView) {
        this.signals.beliefModeChanged.dispatch(mode, beliefView);
    },
    _onShowCompleted: function($container) {},
    _onHideStarted: function(options) {},
    _updateLayout: function() {
        if (!this._currentTemplate) {
            return;
        }
        var views = _.filter(this._beliefViews, function(beliefView) {
            return beliefView.isShown();
        });
        var offset = this.layouts.getCurrentOffset();
        var transformation = null;
        for (var i = 0; i < views.length; i++) {
            transformation = this.layouts.getBeliefTransformation({
                index: i,
                total: views.length - 1,
                offset: offset,
                template: this._currentTemplate
            });
            if (transformation) {
                views[i].tweenToTransformation(transformation);
            }
        }
        if (this._primaryBelief) {
            transformation = this.layouts.getBeliefTransformation({
                total: Math.max(0, views.length - 1),
                offset: offset,
                template: this._currentTemplate,
                isCore: true
            });
            if (transformation) {
                this._primaryBelief.tweenToTransformation(transformation);
            }
        }
        return this;
    },
    _alignAround: function(clusterData) {
        var views = _.filter(this._beliefViews, function(beliefView) {
            return beliefView.isShown();
        });
        var offset = this.layouts.getCurrentOffset();
        var centerTransformation = this.layouts.getBeliefTransformation(clusterData);
        var screenCenter = this.layouts.getScreenCenter();
        var delta, angle, transformation, angleOffset;
        var emptyRadius = 80;
        var normalRadius = 10;
        for (var i = 0; i < views.length; i++) {
            if (views[i].getValue() === '') {
                delta = {
                    x: screenCenter.x - (centerTransformation.left + offset.x),
                    y: screenCenter.y - (centerTransformation.top + offset.y)
                };
                angleOffset = this._angleToXY(Math.atan2(delta.y, delta.x) + Math.PI, emptyRadius * centerTransformation.scale);
                transformation = {
                    top: centerTransformation.top + offset.y + angleOffset.y,
                    left: centerTransformation.left + offset.x + angleOffset.x,
                    scale: centerTransformation.scale,
                    zIndex: 1
                };
            } else {
                angleOffset = this._angleToXY(Math.random() * 2 * Math.PI, normalRadius * centerTransformation.scale);
                transformation = {
                    top: centerTransformation.top + offset.y + angleOffset.y,
                    left: centerTransformation.left + offset.x + angleOffset.x,
                    scale: centerTransformation.scale,
                    zIndex: 0
                };
            }
            views[i].tweenToTransformation(transformation);
        }
    },
    _modelMatchesWhere: function(model, where) {
        for (var key in where) {
            if (where[key] !== model.get(key)) return false;
        }
        return true;
    },
    _angleToXY: function(angle, radius) {
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    }
});

app.classes.views.components.instructions.InstructionsMessagesContainerView = app.classes.views.base.ComponentView.extend({
    _currentIndex: 0,
    options: null,
    currentOptions: null,
    messageProgress: 0,
    _progressTween: null,
    _isPaused: false,
    _iVisible: false,
    modes: {
        MODE_I_OPEN: 'open',
        MODE_I_CLOSED: 'closed'
    },
    initialize: function(options) {
        this.options = _.defaults(options.options || {}, {
            transitionInDuration: 0.3,
            transitionOutDuration: 0.3,
            nextMessageDelay: 9,
            initialDelay: 0
        });
        _.bindAll(this);
        this.signals = options.signals;
        this.signals.progressClicked.add(this._onProgressClicked);
        this.signals.paused.add(this._onPaused);
        this.signals.resumed.add(this._onResumed);
    },
    getNumMessages: function() {
        return this.$el.find('.message').length;
    },
    setI: function(message) {
        this._setIVisibility(message && message !== '');
        return this;
    },
    pause: function() {
        this.$el.find('.moreinfotrigger').addClass('open');
        this._isPaused = true;
        if (this._progressTween) {
            this._progressTween.pause();
        }
        this.signals.paused.dispatch();
        return this;
    },
    resume: function() {
        this.$el.find('.moreinfotrigger').removeClass('open');
        this._isPaused = false;
        if (this._progressTween) {
            this._progressTween.resume();
        }
        this.signals.resumed.dispatch();
        return this;
    },
    togglePause: function() {
        if (this._isPaused) {
            this.resume();
        } else {
            this.pause();
        }
        return this;
    },
    set: function(messageOrMessages, options) {
        options = options || {};
        this.$el.html('');
        this.$el.html(this._createMessagesHTML(messageOrMessages)).find('.message').css({
            visibility: 'hidden',
            opacity: 0
        }).find('.moreinfotrigger').click(this._onMoreInfoTriggerClicked);
        this.currentOptions = _.extend(options, this.options);
        this._currentIndex = 0;
        this._showMessage(0, _.extend({
            delay: this.currentOptions.initialDelay
        }, this.currentOptions));
        this._setIVisibility(this._iVisible);
        this.$el.css({
            cursor: typeof messageOrMessages == 'string' ? 'default' : 'pointer'
        });
        return this;
    },
    _showMessage: function(index, options) {
        var $oldMessage = this.$el.find('.message:eq(' + this._currentIndex + ')');
        TweenMax.to($oldMessage, options.transitionOutDuration, {
            css: {
                autoAlpha: 0
            }
        });
        this._currentIndex = index;
        var $message = this.$el.find('.message:eq(' + index + ')');
        var toTransformation = {
            css: {
                autoAlpha: 1,
                top: 0
            },
            onStart: _.bind(function($message) {
                if (this._startDispatched) {
                    this.signals.messageTransitionStarted.dispatch($message);
                } else {
                    _.delay(_.bind(function() {
                        this.signals.messageTransitionStarted.dispatch($message);
                    }, this), 200);
                }
            }, this),
            onStartParams: [$message],
            onComplete: _.bind(this._onMessageShown, this),
            onCompleteParams: [$message]
        };
        var fromTransformation = {
            css: {
                autoAlpha: 0
            }
        };
        if (options.delay > 0 || this.first) {
            fromTransformation.delay = options.delay;
        }
        TweenMax.fromTo($message, options.transitionInDuration, fromTransformation, toTransformation);
    },
    _showNextMessage: function() {
        if (this.$el.find('.message').length <= 1) {
            return;
        }
        this._showMessage(this._getNextIndex(), this.currentOptions);
    },
    _getNextIndex: function() {
        return (this._currentIndex + 1) % this.$el.find('.message').length;
    },
    _createMessageContainer: function(message) {
        return '<li class="message">' + message + ' <a href="#" class="moreinfotrigger"></a></li>';
    },
    _createMessagesHTML: function(messageOrMessages) {
        var newHTML = '';
        if (typeof messageOrMessages != 'string') {
            _.each(messageOrMessages, _.bind(function(message) {
                newHTML += this._createMessageContainer(message);
            }, this));
        } else {
            newHTML = this._createMessageContainer(messageOrMessages);
        }
        return newHTML;
    },
    _onMessageShown: function($message) {
        this.signals.messageTransitionCompleted.dispatch($message);
        this.messageProgress = 0;
        this._progressTween = TweenMax.to(this, this.currentOptions.nextMessageDelay, {
            messageProgress: 1,
            onUpdate: _.bind(function(event) {
                this.signals.messageWaitUpdated.dispatch(event.ratio);
            }, this),
            onUpdateParams: ['{self}'],
            onComplete: this._showNextMessage
        });
        if (this._isPaused) {
            this._progressTween.pause();
        }
    },
    _onProgressClicked: function(index) {
        if (this._progressTween) {
            this._progressTween.kill();
        }
        this._showMessage(index, this.currentOptions);
    },
    _onPaused: function() {
        this.$el.addClass('paused');
    },
    _onResumed: function() {
        this.$el.removeClass('paused');
    },
    _setIVisibility: function(visible) {
        this._iVisible = visible;
        if (visible) {
            this.$el.find('.moreinfotrigger').autoAlpha(1);
        } else {
            this.$el.find('.moreinfotrigger').autoAlpha(0);
        }
    },
    _onMoreInfoTriggerClicked: function(event) {
        event.stopPropagation();
        event.preventDefault();
        this.signals.moreInfoTriggerClicked.dispatch($(event.target));
    }
});

app.classes.views.components.instructions.InstructionsMoreInformationView = app.classes.views.base.ComponentView.extend({
    $panel: null,
    $close: null,
    messages: null,
    initialize: function(options) {
        this.$panel = this.$el.find('.moreinfopanel');
        this.$close = this.$el.find('.close');
        this.messages = options.messages;
        _.bindAll(this);
        this.$close.on('click', this._onCloseClicked);
        options.signals.moreInfoTriggerClicked.add(this._onTriggerClicked);
    },
    setI: function(message) {
        if (!message || message === '') {
            this._hideI();
        } else {
            var $wrapper = this.$panel.find('.wrapper');
            $wrapper.ready(_.bind(function() {
                $wrapper.html(message);
            }, this));
        }
        return this;
    },
    _onTriggerClicked: function($i) {
        if (this._iShown) {
            this._hideI();
        } else {
            this._showI($i);
        }
    },
    _onBodyClicked: function(event) {
        if ($(event.target).hasAncestor(this.$el).length === 0) {
            this._hideI();
        }
    },
    _onCloseClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this._hideI();
    },
    _hideI: function() {
        this._iShown = false;
        this.$panel.addClass('hidden').autoAlpha(0);
        $('body').off('click', this._onBodyClicked);
        this.messages.resume();
    },
    _showI: function($i) {
        this._iShown = true;
        this.$panel.removeClass('hidden');
        var pos = $i.position();
        pos.left += 40;
        pos.top -= 45;
        this.$panel.css(pos).autoAlpha(1);
        $('body').on('click', this._onBodyClicked);
        this.messages.pause();
    }
});

app.classes.views.components.instructions.InstructionsPlayPauseView = app.classes.views.base.ComponentView.extend({
    messages: null,
    signals: null,
    initialize: function(options) {
        _.bindAll(this);
        this.messages = options.messages;
        this.signals = options.signals;
        this.signals.paused.add(this._onPaused);
        this.signals.resumed.add(this._onResumed);
        this.$el.parent().find('.messages').on('mouseenter', this._onMouseOver).on('mouseleave', this._onMouseOut).on('click', this._onClick);
        TweenMax.set(this.$el, {
            css: {
                autoAlpha: 0
            }
        });
    },
    _onMouseOver: function(event) {
        if (this.messages.getNumMessages() <= 1) {
            return;
        }
        this.dimensions = {
            width: this.$el.width(),
            height: this.$el.height()
        }, this.$el.parent().on('mousemove', this._onMouseMove);
        this.$el.autoAlpha(1);
    },
    _onMouseOut: function(event) {
        this.$el.parent().off('mousemove', this._onMouseMove);
        this.$el.autoAlpha(0);
    },
    _onClick: function(event) {
        if (this.messages.getNumMessages() <= 1) {
            return;
        }
        this.messages.togglePause();
    },
    _onMouseMove: function(event) {
        var pos = this.$el.parent().offset();
        this.$el.css({
            left: event.clientX - pos.left + 15,
            top: event.clientY - pos.top + 15
        });
    },
    _onPaused: function() {
        this.$el.addClass('paused');
    },
    _onResumed: function() {
        this.$el.removeClass('paused');
    }
});

app.classes.views.components.instructions.InstructionsProgressView = app.classes.views.base.ComponentView.extend({
    messages: null,
    animated: false,
    initialize: function(options) {
        this.signals = options.signals;
        _.bindAll(this);
        this.signals.messageTransitionStarted.add(this._onMessageShowStarted);
        this.signals.messageTransitionCompleted.add(this._onMessageShowCompleted);
        this.signals.messageWaitUpdated.add(this._onMessageWaitUpdate);
        this.signals.paused.add(this._onPaused);
        this.signals.resumed.add(this._onResumed);
    },
    setMessages: function(messageOrMessages) {
        this.messages = messageOrMessages;
        this.render();
    },
    render: function() {
        var newHTML = '';
        var progressHTML = '<li> <div class="background"></div> <div class="mask"></div> </li>';
        if (typeof this.messages != 'string') {
            _.each(this.messages, _.bind(function(message) {
                newHTML += progressHTML;
            }, this));
        } else {
            newHTML = progressHTML;
        }
        this.$el.html(newHTML);
        this.$el.find('li').on('click', this._onProgressDotClicked);
        this.animated = this.$el.find('li').length > 1;
        this.$el.autoAlpha(this.animated ? 1 : 0);
    },
    _onMessageShowStarted: function($message) {
        this.$currentBackground = this.$el.find('li').removeClass('current').eq($message.index()).addClass('current').find('.background').width('0%');
        if (this.$el.hasClass('paused')) {
            this._onPaused();
        }
    },
    _onMessageShowCompleted: function($message) {
        if (!this.animated && this.$currentBackground) {
            this.$currentBackground.width('100%');
        }
    },
    _onMessageWaitUpdate: function(progress) {
        if (this.animated && this.$currentBackground) {
            this.$currentBackground.width((progress * 100) + '%');
        }
    },
    _onProgressDotClicked: function(event) {
        this.signals.progressClicked.dispatch($(event.delegateTarget).index());
    },
    _onPaused: function() {
        this.$el.addClass('paused');
        this.$currentBackground.width('100%');
    },
    _onResumed: function() {
        this.$el.removeClass('paused');
    }
});

app.classes.views.components.instructions.InstructionsView = app.classes.views.base.ComponentView.extend({
    template: $('#template_component_instructions').html(),
    messageOptions: null,
    modes: {
        MODE_FINDING_CORE: 'fcb',
        MODE_SPLASH: 'splash',
        MODE_DEFAULT: 'fsb'
    },
    _currentMode: '',
    _iShown: false,
    instructionMessages: null,
    layouts: 'inject',
    settings: {
        maxWidth: 700,
        coreBeliefSpacing: 50,
        beliefDimensions: 180,
        edgeMargin: 20
    },
    moreInformationView: null,
    progressView: null,
    messagesView: null,
    signals: null,
    $playpause: null,
    playpauseDimensions: null,
    initialize: function(options) {
        this._componentSuper = app.classes.views.components.instructions.InstructionsView.__super__;
        this._componentSuper.initialize.call(this, options);
        _.bindAll(this);
        this.instructionMessages = window.instructions;
        this.layouts.signals.windowResized.add(this.align);
        this.signals = {
            messageTransitionStarted: null,
            messageTransitionCompleted: null,
            messageWaitUpdated: null,
            progressClicked: null,
            paused: null,
            resumed: null,
            moreInfoTriggerClicked: null
        };
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
    },
    getMode: function() {
        return this._currentMode;
    },
    setMode: function(mode) {
        if (this._currentMode == mode) {
            return this;
        }
        if (!_.contains(this.modes, mode)) {
            throw new Error('Cannot change to mode ' + mode + ', this mode is not recognized');
        }
        this.$el.removeClass('mode-' + this._currentMode).addClass('mode-' + mode);
        this._currentMode = mode;
        return this.align();
    },
    setI: function(message) {
        this.moreInformationView.setI(message);
        this.messagesView.setI(message);
        return this;
    },
    setMessages: function(messageOrMessages) {
        this.messagesView.set(messageOrMessages);
        this.progressView.setMessages(messageOrMessages);
        this.align();
        return this;
    },
    render: function() {
        this.$el = $(this.template);
        var pkg = app.classes.views.components.instructions;
        this.messagesView = new pkg.InstructionsMessagesContainerView({
            el: this.$el.find('.messages'),
            options: this.messageOptions,
            signals: this.signals
        });
        this.moreInformationView = new pkg.InstructionsMoreInformationView({
            el: this.$el.find('.moreinfo'),
            signals: this.signals,
            messages: this.messagesView
        });
        this.progressView = new pkg.InstructionsProgressView({
            el: this.$el.find('.progress'),
            signals: this.signals
        });
        this.playpauseView = new pkg.InstructionsPlayPauseView({
            el: this.$el.find('.playpause'),
            signals: this.signals,
            messages: this.messagesView
        });
        return this;
    },
    align: function(options) {
        var fullWidth = $(window).width();
        var fullHeight = $(window).height();
        var nextWidth = $('.nextstep').width();
        var spacing = 50;
        var instructionWidth = Math.min(this.settings.maxWidth, fullWidth - this.settings.edgeMargin * 2 - nextWidth - spacing);
        var offset = {
            top: 0,
            left: 0
        };
        switch (this._currentMode) {
            case this.modes.MODE_FINDING_CORE:
                var coreBeliefPosition = this.layouts.getBeliefTransformation({
                    isCore: true,
                    offset: this.layouts.getCurrentOffset(),
                    template: this._currentMode
                });
                offset.left = coreBeliefPosition.left - instructionWidth - this.settings.coreBeliefSpacing - this.settings.beliefDimensions / 2;
                offset.top = coreBeliefPosition.top - this.settings.beliefDimensions / 2 + 60;
                break;
            case this.modes.MODE_SPLASH:
                offset.left = this.settings.edgeMargin + 45;
                offset.top = fullHeight / 2 - 30;
                break;
            case this.modes.MODE_DEFAULT:
            default:
                if (this.layouts.getCurrentLayoutLabel() == 'large') {
                    var contentOffset = this.layouts.getCurrentOffset();
                    offset.left = contentOffset.x + this.settings.edgeMargin;
                    offset.top = contentOffset.y + this.settings.edgeMargin;
                } else {
                    offset.left = this.settings.edgeMargin;
                    offset.top = this.settings.edgeMargin;
                }
                break;
        }
        if (offset.left < this.settings.edgeMargin) {
            var diff = this.settings.edgeMargin - offset.left;
            instructionWidth -= diff;
            offset.left = this.settings.edgeMargin;
        }
        var transformation = _.extend(offset, {
            width: instructionWidth
        });
        if (options && options.instant) {
            this.$el.css(transformation);
        } else {
            TweenMax.to(this.$el, 0.3, {
                css: transformation
            });
        }
        return this;
    },
    getInstruction: function(id, data) {
        data = data || {};
        var instructions = this.instructionMessages[id];
        if (typeof instructions != 'string') {
            return _.map(instructions, function(instruction) {
                if (instruction === '') {
                    return '';
                }
                return _.template(instruction, data);
            });
        }
        if (instructions === '') {
            return '';
        }
        return _.template(instructions, data);
    }
});

app.classes.views.components.share.ShareView = app.classes.views.base.ComponentView.extend({
    template: $('#template_component_share').html(),
    appSettings: 'inject',
    initialize: function(options) {
        this._componentSuper = app.classes.views.components.beliefs.BeliefBaseView.__super__;
        this._componentSuper.initialize.call(this, options);
        _.bindAll(this);
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
    },
    render: function() {
        $('.beliefinput').addClass('try');
        this.$el = $(_.template(this.template, {
            base_url: this.appSettings.baseURL
        }));
        this.$el.find('#share_save').validationEngine().on('submit', this._onSaveSubmit);
        this.$el.find('.add_to_hall').on('click', this._onAddToHallClicked);
        return this;
    },
    _onSaveSubmit: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if ($(event.target).validationEngine('validate')) {
            var data = {
                email: $(event.target).find('input.email').val(),
                guid: this.appSettings.reframeGUID
            };
            this._setSaveMessage('Sending...');
            $.post(this.appSettings.apiEmailURL, data, this._onSaveSubmitCompleted);
        }
    },
    _onAddToHallClicked: function(event) {
        var data = {
            guid: this.appSettings.reframeGUID
        };
        $.post(this.appSettings.apiPutInHallURL, data, this._onAddToHallComplete);
    },
    _onAddToHallComplete: function(data, textStatus, jqXHR) {
        if (data.success) {
            this._setHallMessage('Your refocus was marked as public, now everyone can read it. Thank you for sharing with us.', 'success');
        } else {
            this._setHallMessage(data.error, 'error');
        }
    },
    _setHallMessage: function(message, classes) {
        $('.messageHall').html(message).attr('class', 'message').addClass(classes);
    },
    _onSaveSubmitCompleted: function(data, textStatus, jqXHR) {
        if (data.success) {
            $('#share_save input.email').val('');
            this._setSaveMessage('The email was sent.', 'success');
        } else {
            this._setSaveMessage(data.error, 'error');
        }
    },
    _setSaveMessage: function(message, classes) {
        $('#share_save .message').html(message).attr('class', 'message').addClass(classes);
    }
});


app.classes.views.components.splash.SplashView = app.classes.views.base.ComponentView.extend({
    template: $('#template_component_splash').html(),
    appSettings: 'inject',
    initialize: function(options) {
        this._componentSuper = app.classes.views.components.beliefs.BeliefBaseView.__super__;
        this._componentSuper.initialize.call(this, options);
        _.bindAll(this);
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        this.baseSignals.showStarted.add(this._onShowStarted);
        this.baseSignals.hideStarted.add(this._onHideStarted);
    },
    render: function() {
        this.$el = $(_.template(this.template, {
            base_url: this.appSettings.baseURL
        }));
        return this;
    },
    _onShowStarted: function() {
        $('#container').append(this.$el.find('.hint.dots'));
    },
    _onHideStarted: function() {
        $('#container').find('.hint.dots').appendTo(this.$el);
    }
});

app.classes.views.components.stepmanager.StepsManagerView = Backbone.View.extend({
    _steps: [],
    _currentStep: null,
    _currentStatus: null,
    _container: null,
    signals: {
        added: null,
        numCompletedStepsChanged: null,
        currentStepCompletedUpdate: null,
        currentStepChanged: null,
        currentSubStepChanged: null,
        currentSubStepCompletedUpdate: null
    },
    initialize: function(options) {
        options = options || {};
        _.bindAll(this);
        this._container = options.container;
        this._currentStatus = {
            current: 0,
            currentSub: null,
            total: 0
        };
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
    },
    addStep: function(stepClass) {
        var step = new stepClass();
        step.signals.stepCompletedChanged.add(this._onStepCompletedChanged);
        this._steps.push(step);
        this._currentStatus.total = this._steps.length;
        this.signals.added.dispatch(this._currentStatus);
        step.updateCompletedState();
    },
    canSkipStep: function(stepIndex) {
        return this._steps[stepIndex - 1].canSkipStep();
    },
    skipStep: function(stepIndex) {
        var step = this._steps[stepIndex - 1];
        if (step && step.skipStep) {
            step.skipStep();
        }
        return this;
    },
    jumpToStep: function(stepIndex, subStepIndex) {
        if (stepIndex === 0) {
            console.log('The starting index for steps is 1');
            return false;
        }
        if (this._steps.length < stepIndex) {
            console.log('This step is not available.');
            return false;
        }
        if (stepIndex - 1 > this.getNumCompletedSteps()) {
            console.log('This step is not available, the previous steps have to be completed first.');
            return false;
        }
        var statusObject = {
            current: stepIndex * 1,
            currentSub: subStepIndex ? subStepIndex * 1 : null,
            total: this._steps.length
        };
        var previousStatusObject = this._currentStatus;
        this._currentStatus = statusObject;
        if (this._currentStatus.current != previousStatusObject.current) {
            if (this._currentStep) {
                this._currentStep.hide();
                this._currentStep = null;
            }
            this._currentStep = this._steps[stepIndex - 1];
            this._currentStep.signals.subStepCompletedChanged.add(this._onSubStepCompleted);
            this._currentStep.show();
            this.signals.currentStepChanged.dispatch(this._currentStep, this._currentStep.isCompleted(), statusObject);
        }
        if (this._currentStatus.current != previousStatusObject.current || this._currentStatus.currentSub != previousStatusObject.currentSub) {
            this.signals.currentSubStepChanged.dispatch(this._currentStep, this._currentStep.isCompleted(), statusObject);
        }
        this._currentStep.updateCompletedState();
        return true;
    },
    getNumCompletedSteps: function() {
        for (var i = 0; i < this._steps.length; i++) {
            if (!this._steps[i].isCompleted()) {
                return i;
            }
        }
        return i;
    },
    getNumSteps: function() {
        return this._steps.length;
    },
    getCurrentStatus: function() {
        return this._currentStatus;
    },
    getCurrentStep: function() {
        return this._currentStep;
    },
    _onStepCompletedChanged: function(step, completed, data) {
        this.signals.numCompletedStepsChanged.dispatch(this.getNumCompletedSteps());
        if (step == this._currentStep) {
            this.signals.currentStepCompletedUpdate.dispatch(step, completed, data);
        }
    },
    _onSubStepCompleted: function(step, completed, data) {
        this.signals.currentSubStepCompletedUpdate.dispatch(step, completed, _.extend(this._currentStatus, data));
    },
    getIndexOfStep: function(step) {
        return _.indexOf(this._steps, step);
    }
});

app.classes.views.gui.AlertFactoryView = Backbone.View.extend({
    appSettings: 'inject',
    el: $('#alerts'),
    types: {
        TYPE_SUCCESS: 'success',
        TYPE_WARNING: 'warning',
        TYPE_ERROR: 'error'
    },
    signals: {
        alertShown: null
    },
    template: $('#template_alert').html(),
    initialize: function(options) {
        _.bindAll(this);
        this._preloadImages();
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
    },
    create: function(options) {
        options = options || {};
        _.defaults(options, {
            message: '',
            type: this.types.TYPE_WARNING,
            autoHide: true,
            onClose: null
        });
        var html = _.template(this.template, {
            classes: [options.type, options.autoHide ? 'autohide' : ''].join(' '),
            message: options.message
        });
        var $alert = $(html).appendTo(this.$el).alert().hide().slideDown();
        if (options.onClose) {
            $alert.find('.close').click(options.onClose);
        }
        this.signals.alertShown.dispatch($alert);
        return this;
    },
    hideAll: function() {
        this.$el.find('.close').click();
    },
    render: function() {
        return this;
    },
    _preloadImages: function() {
        var images = ['alert_error.png', 'alert_close.png', 'alert_normal.png', 'alert_warning.png'];
        var baseURL = this.appSettings.baseURL;
        $(images).each(function() {
            $('<img/>').get(0).src = baseURL + 'img/' + this;
        });
    }
});

app.classes.views.gui.ContentView = Backbone.View.extend({
    el: $('#content'),
    layouts: 'inject',
    header: null,
    initialize: function(options) {
        _.bindAll(this);
    },
    updateDimensions: function() {
        return this;
    },
    render: function() {
        return this;
    }
});

app.classes.views.gui.FooterView = Backbone.View.extend({
    el: $('footer'),
    initialize: function() {
        _.bindAll(this);
    },
    render: function() {
        return this;
    }
});

app.classes.views.gui.GUIView = Backbone.View.extend({
    footer: null,
    header: null,
    content: null,
    stepsProgress: null,
    nextStepButton: null,
    loadingMonitor: null,
    pageWrapper: null,
    classes: app.classes.views.gui,
    initialize: function(options) {
        this.header = new this.classes.HeaderView();
        this.content = new this.classes.ContentView({
            header: this.header
        });
        this.footer = new this.classes.FooterView();
        this.stepsProgress = new this.classes.StepProgressView();
        this.nextStepButton = new this.classes.NextStepButton();
        this.saveNewButtons = new this.classes.SaveNewButtonsView();
        this.loadingMonitor = new this.classes.LoadingMonitorView();
        this.pageWrapper = new this.classes.PageWrapperView();
    },
    render: function() {
        _.invoke(this.shareViews, 'render');
        this.header.render();
        this.footer.render();
        this.content.render();
        this.stepsProgress.render();
        this.nextStepButton.render();
        this.saveNewButtons.render();
        this.loadingMonitor.render();
        this.pageWrapper.render();
    }
});

app.classes.views.gui.HeaderView = Backbone.View.extend({
    el: $('header'),
    defaultWidth: 100,
    signals: {
        expanded: null,
        collapsed: null
    },
    _isCollapsed: false,
    initialize: function() {
        _.bindAll(this);
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        //this.$el.on('mouseenter', this.expand);
        //this.$el.on('mouseleave', this.collapse);
        //this.$el.on('click', this.expand);
        var that = this
        /*
        this.$el.on('click', function(){
            if(that._isCollapsed){
                that.expand()
            } else {
                that.collapse()
            }
        });*/
        //that.collapse()
    },
    expand: function() {
        if (!this._isCollapsed) {
            return;
        }
        this.$el.find('h1,.nav').autoAlpha(1);
        //this.$el.find('.icon').autoAlpha(0);
        this.$el.find('.branding').autoAlpha(1);
        this.$el.removeClass('collapsed');
        TweenLite.to(this.$el, 0.3, {
            css: {
                width: this.defaultWidth
            }
        });
        this.signals.expanded.dispatch();
        this._isCollapsed = false;
    },
    collapse: function() {
        if (this._isCollapsed) {
            return;
        }
        this.$el.find('h1,.nav').autoAlpha(0);
        this.$el.find('.icon').autoAlpha(1);
        this.$el.find('.branding').autoAlpha(0);
        this.$el.addClass('collapsed');
        TweenLite.to(this.$el, 0.3, {
            css: {
                width: 41
            },
            ease: Circ.easeOut
        });
        this.signals.collapsed.dispatch();
        this._isCollapsed = true;
    },
    render: function() {
       // _.delay(this.collapse, 1000);
        this.defaultWidth = this.$el.width();
        return this;
    },
    _onIconClicked: function(event) {
        this.$el.toggleClass('opened');
        if (this.$el.hasClass('opened')) {
            this.expand();
        } else {
            this.collapse();
        }
    },
    _onMouseMove: function(event) {
        if (event.clientX < this.defaultWidth) {
            this.expand();
        } else {
            this.collapse();
        }
    }
});

app.classes.views.gui.LoadingMonitorView = Backbone.View.extend({
    $loadingicon: null,
    alertFactory: 'inject',
    appSettings: 'inject',
    initialize: function(options) {
        _.bindAll(this);
        $(document).ajaxComplete(this._onAjaxComplete).ajaxStart(this._onAjaxStart).ajaxStop(this._onAjaxStop);
        this.$loadingicon = $('.loading-icon');
    },
    _onAjaxComplete: function(event, xhr, options) {
        var alertData = {
            message: 'An unknown error occured. Your changes were NOT saved. Please contact us if the error persists.',
            type: this.alertFactory.types.TYPE_ERROR,
            autoHide: false
        };
        var data = $.parseJSON(xhr.responseText);
        if (!data) {
            alertData.onClose = _.bind(function() {
                var retryData = options;
                this._retry(retryData);
            }, this);
            if (options.retryAttempts == this.appSettings.maxAJAXRetries) {
                alertData.message = 'We retried saving your data. It seems the connection if still broken. To prevent a loss of data, we will reload the application when you hit close. If the problem persists, you can contact us at <a href="http://www.thnk.org" target="_blank">www.thnk.org</a>.';
            } else {
                alertData.message = 'Your changes were NOT saved. Please double check your internet connection is still working properly.';
            }
            this.alertFactory.create(alertData);
            return;
        }
        if (!data.success) {
            alertData.message = data.error ? data.error : alertData.message;
            this.alertFactory.create(alertData);
            return;
        }
    },
    _retry: function(options) {
        if (options.retryAttempts >= this.appSettings.maxAJAXRetries) {
            document.location.reload(true);
            return;
        }
        options.retryAttempts = options.retryAttempts ? options.retryAttempts + 1 : 1;
        $.ajax(options);
    },
    _onAjaxStart: function(event) {
        this.$loadingicon.autoAlpha(1);
    },
    _onAjaxStop: function(event) {
        this.$loadingicon.autoAlpha(0);
    }
});

app.classes.views.gui.NextStepButton = Backbone.View.extend({
    el: $('.nextstep'),
    steps: 'inject',
    layouts: 'inject',
    settings: {
        edgeMargin: 20
    },
    initialize: function() {
        _.bindAll(this);
        this.$el.on('click', this._onClick);
        this.hide();
        this.steps.signals.currentStepCompletedUpdate.add(this._onStepCompletedUpdate);
        this.steps.signals.currentSubStepCompletedUpdate.add(this._onSubStepCompletedUpdate);
        this.steps.signals.currentStepChanged.add(this._onStepChanged);
        this.steps.signals.currentSubStepChanged.add(this._onSubStepChanged);
        this.layouts.signals.windowResized.add(this.align);
    },
    show: function(step) {
        if (this.steps.getIndexOfStep(step) == this.steps.getNumSteps() - 1) {
            return;
        }
        TweenMax.to(this.$el, 0, {
            css: {
                autoAlpha: 1
            }
        });
        this.align();
    },
    hide: function() {
        TweenMax.to(this.$el, 0, {
            css: {
                autoAlpha: 0
            }
        });
    },
    align: function() {
        var offset = {
            top: '50%',
            right: this.settings.edgeMargin,
            marginTop: -25
        };
        TweenMax.to(this.$el, 0.3, {
            css: offset
        });
    },
    _onStepCompletedUpdate: function(step, completed, data) {
        if (completed) {
            this.show(step);
        } else {
            this.hide();
        }
    },
    _onSubStepCompletedUpdate: function(step, completed, data) {
        if (!data || !data.next) {
            throw new Error('Cannot complete a substep without telling me where to go to.');
        }
        if (completed) {
            this._setButtonHref(data.next);
            this.show(step);
        } else {
            this.hide();
        }
    },
    _onStepChanged: function(step, completed, data) {
        this._setToNextStep(data);
        if (!completed || this.steps.getIndexOfStep(step) == this.steps.getNumSteps() - 1) {
            this.hide();
        } else {
            this.show(step);
        }
    },
    _onSubStepChanged: function(step, completed, data) {
        if (!data.currentSub) {
            this._setToNextStep(data);
        }
        if (completed) {
            this.show(step);
        } else {
            this.hide();
        }
    },
    _setButtonHref: function(url) {
        var parts = url.split('/');
        var stepNumber = parts[parts.indexOf('step') + 1];
        this.$el.find('.stepnumber').html(stepNumber ? 'to step ' + stepNumber : 'to the next step');
        this.$el.attr('href', url);
    },
    _setToNextStep: function(data) {
        this._setButtonHref(app.Settings.appURL + 'step/' + (data.current + 1) + '/');
    }
});

app.classes.views.gui.PageWrapperView = Backbone.View.extend({
    el: $('#pagewrapper'),
    alertFactory: 'inject',
    initialize: function() {
        _.bindAll(this);
        this.alertFactory.signals.alertShown.add(this._onAlertShown);
    },
    _onAlertShown: function($alert) {
        this._showBlocker();
        $alert.find('.close').click(_.bind(function(event) {
            this._hideBlocker($(event.target).parent());
        }, this));
    },
    _showBlocker: function() {
        if (this.$el.find('#blocker').length === 0) {
            $('<div id="blocker" />').appendTo(this.$el).autoAlpha(0.8);
        }
    },
    _hideBlocker: function($alert) {
        if ($alert.parent().find('.alert:not(.hiding)').length > 1) {
            return;
        }
        $('#blocker').autoAlpha(0, function() {
            $('#blocker').remove();
        });
    }
});

app.classes.views.gui.SaveNewButtonsView = Backbone.View.extend({
    appSettings: 'inject',
    app: 'inject',
    $saveButton: null,
    $newButton: null,
    initialize: function() {
        _.bindAll(this);
        this.$saveButton = $('footer .button.save');
        this.$newButton = $('footer .button.new');
        this.$saveButton.on('click', this._onSaveClicked);
        this.$newButton.on('click', this._onNewClicked);
        $('body').on('click', this._onBodyClicked);
        $('#footer_save').validationEngine().on('submit', this._onSaveSubmit);
        this.app.signals.beliefEditStateChanged.add(this._onBeliefEditModeChanged);
    },
    show: function() {
        this.$saveButton.autoAlpha(1);
        this.$newButton.autoAlpha(1);
    },
    _showSave: function() {
        $('.hint.save').css({
            left: this.$saveButton.position().left
        }).autoAlpha(1, function() {
            $('.hint.save .email').focus();
        });
        $('#share_save').validationEngine('hideAll');
        this.$saveButton.addClass('toggled');
        this._hideNew();
    },
    _showNew: function() {
        $('.hint.new').css({
            left: this.$newButton.position().left
        }).autoAlpha(1);
        this.$newButton.addClass('toggled');
        this._hideSave();
    },
    hide: function() {
        this.$saveButton.autoAlpha(0);
        this.$newButton.autoAlpha(0);
        this._hideSave();
        this._hideNew();
    },
    _hideSave: function() {
        $('.hint.save').autoAlpha(0);
        this.$saveButton.removeClass('toggled');
    },
    _hideNew: function() {
        $('.hint.new').autoAlpha(0);
        this.$newButton.removeClass('toggled');
    },
    _onSaveClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.$saveButton.hasClass('disabled')) {
            return;
        }
        if (!this.$saveButton.hasClass('toggled')) {
            this._showSave();
        } else {
            this._hideSave();
        }
    },
    _onNewClicked: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.$saveButton.hasClass('disabled')) {
            return;
        }
        if (!this.$newButton.hasClass('toggled')) {
            this._showNew();
        } else {
            this._hideNew();
        }
    },
    _onBodyClicked: function(event) {
        if ($(event.target).hasAncestor($('footer')).length === 0) {
            this._hideSave();
            this._hideNew();
        }
    },
    _onSaveSubmit: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if ($(event.target).validationEngine('validate')) {
            var data = {
                email: $(event.target).find('input.email').val(),
                guid: this.appSettings.reframeGUID
            };
            this._setMessage('Sending...');
            $.post(this.appSettings.apiEmailURL, data, this._onSaveSubmitCompleted);
        }
    },
    _onSaveSubmitCompleted: function(data, textStatus, jqXHR) {
        if (data.success) {
            $('footer input.email').val('');
            this._setMessage('The email was sent.', 'success');
        } else {
            this._setMessage(data.error, 'error');
        }
    },
    _onBeliefEditModeChanged: function(mode, belief) {
        if (mode == 'editing') {
            this.$saveButton.addClass('disabled');
            this.$newButton.addClass('disabled');
        } else {
            this.$saveButton.removeClass('disabled');
            this.$newButton.removeClass('disabled');
        }
    },
    _setMessage: function(message, classes) {
        $('footer .message').html(message).attr('class', 'message').addClass(classes);
    }
});

app.classes.views.gui.StepProgressView = Backbone.View.extend({
    el: $('.stepprogress'),
    steps: 'inject',
    initialize: function() {
        _.bindAll(this);
        this.steps.signals.numCompletedStepsChanged.add(this._onStepsCompletedChanged);
        this.steps.signals.currentStepChanged.add(this._onCurrentStepChanged);
        this.steps.signals.currentStepCompletedUpdate.add(this._onCurrentStepCompleted);
        this.steps.signals.added.add(this._onStepAdded);
    },
    _onStepsCompletedChanged: function(numCompleted) {
        this.$el.find('li a').removeClass('done accessible').each(function(index, el) {
            if (index < numCompleted) {
                $(this).addClass('done accessible');
            }
            if (index == numCompleted) {
                $(this).addClass('accessible');
            }
        });
    },
    _onCurrentStepCompleted: function(step, completed, data) {},
    _onCurrentStepChanged: function(step, completed, data) {
        this.$el.find('li a').removeClass('current').eq(data.current - 1).addClass('current');
    },
    _onStepAdded: function(data) {
        $('<li><a href="' + app.Settings.appURL + 'step/' + data.total + '/">' + data.total + '</a></li>').appendTo(this.$el).find('a').click(this._onStepClicked);
    },
    _onStepClicked: function(event) {
        if (!$(event.target).hasClass('accessible')) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
});

app.classes.views.steps.BaseOppositeSupporting = app.classes.views.base.StepView.extend({
    supportingBeliefsView: 'inject',
    oppositesSupportingBeliefsTLView: 'inject',
    oppositesSupportingBeliefsTRView: 'inject',
    oppositesSupportingBeliefsBLView: 'inject',
    oppositesSupportingBeliefsBRView: 'inject',
    beliefsCollection: 'inject',
    layouts: 'inject',
    steps: 'inject',
    router: 'inject',
    appSettings: 'inject',
    postConstructs: ['_onPostConstruct'],
    mode: '',
    modes: {
        MODE_OVERVIEW: 'overview',
        MODE_FINDING_OPPOSITES: 'findingopposites'
    },
    currentOpposites: null,
    _opposites: [],
    initialize: function(options) {
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        _.bindAll(this);
        this.signals.showStepStarted.add(_.bind(this._showBaseStep, this));
        this.signals.hideStepStarted.add(_.bind(this._hideBaseStep, this));
    },
    gotoOppositeList: function(chosenOppositeList) {
        if (this.mode == this.modes.MODE_FINDING_OPPOSITES && this.currentOpposites == chosenOppositeList) {
            return;
        }
        this.mode = this.modes.MODE_FINDING_OPPOSITES;
        this.currentOpposites = chosenOppositeList;
        _.each(this._opposites, _.bind(function(oppositeList) {
            if (oppositeList == chosenOppositeList) {
                oppositeList.filterBeliefs({}).show().setPrimaryBelief(this._getSupportingByOppositeList(oppositeList)).setClustering(false);
            } else {
                oppositeList.hide();
            }
        }, this));
        this.supportingBeliefsView.filterBeliefs({
            id: chosenOppositeList.whereFilter.parent.get('id')
        });
        chosenOppositeList.align();
        return this;
    },
    gotoOverview: function() {
        if (this.mode == this.modes.MODE_OVERVIEW) {
            return;
        }
        $('body').focus().click();
        this.mode = this.modes.MODE_OVERVIEW;
        this.currentOpposites = null;
        var cluster = null;
        _.each(this._opposites, _.bind(function(oppositeBeliefs, index) {
            cluster = {
                index: index,
                total: 3,
                template: this.layouts.templates.TEMPLATE_FRAME_NO_CORE
            };
            oppositeBeliefs.setPrimaryBelief(null).setClustering(cluster, true).show().align();
        }, this));
        this.supportingBeliefsView.filterBeliefs({
            is_selected: true
        });
        this.supportingBeliefsView.align();
    },
    _getOppositeListBySupporting: function(supportingBelief) {
        return _.find(this._opposites, function(oppositeBeliefs) {
            return supportingBelief.model == oppositeBeliefs.whereFilter.parent;
        });
    },
    _onPostConstruct: function() {
        this._opposites = [
            this.oppositesSupportingBeliefsTLView, 
            this.oppositesSupportingBeliefsTRView, 
            this.oppositesSupportingBeliefsBLView, 
            this.oppositesSupportingBeliefsBRView
        ];
    },
    _showBaseStep: function(step, onComplete) {
        this.supportingBeliefsView.filterBeliefs({
            is_selected: true
        });
        this.supportingBeliefsView.setTemplate(this.layouts.templates.TEMPLATE_FRAME_NO_CORE);
        this.oppositesSupportingBeliefsTRView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_OPPOSITE_TR);
        this.oppositesSupportingBeliefsTLView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_OPPOSITE_TL);
        this.oppositesSupportingBeliefsBRView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_OPPOSITE_BR);
        this.oppositesSupportingBeliefsBLView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_OPPOSITE_BL);
        this.supportingBeliefsView.show();
        _.each(this._opposites, function(oppositeList) {
            oppositeList.show();
        });
        this.gotoOverview();
    },
    _hideBaseStep: function(step, onComplete) {
        this.supportingBeliefsView.filterBeliefs({});
        this.supportingBeliefsView.hide();
        _.invoke(this._opposites, 'hide');
        this.mode = '';
    },
    _getNumSupportingBeliefsDone: function() {
        var done = 0;
        _.each(this._opposites, _.bind(function(oppositesList) {
            numEntries = this.beliefsCollection.countWhere(_.extend({
                text: '*',
                is_core: false
            }, oppositesList.whereFilter));
            done += numEntries >= this.appSettings.minOppositeBeliefs ? 1 : 0;
        }, this));
        return done;
    },
    _getOppositeListByOpposite: function(oppositeBelief) {
        return _.find(this._opposites, function(oppositeList) {
            return oppositeList.whereFilter.parent == oppositeBelief.model.get('parent');
        });
    },
    _getSupportingByOppositeList: function(oppositeList) {
        return _.find(this.supportingBeliefsView.getBeliefs(), _.bind(function(beliefView) {
            return (beliefView.model == oppositeList.whereFilter.parent);
        }, this));
    }
});

app.classes.views.steps.Explanation = app.classes.views.base.StepView.extend({
    instructions: 'inject',
    splash: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        this.setStepCompleted(true);
    },
    _showStep: function(step, onComplete) {
        this.instructions.setMessages(this.instructions.getInstruction('explanation')).setMode(this.instructions.modes.MODE_SPLASH).show();
        this.splash.show();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.instructions.setMode(this.instructions.modes.MODE_DEFAULT).setI().hide();
        this.splash.hide();
        onComplete();
    }
});

app.classes.views.steps.FilterOppositeSupporting = app.classes.views.steps.BaseOppositeSupporting.extend({
    instructions: 'inject',
    appSettings: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        var numEntries = 0,
            supportingBelief = null;
        _.each(this._opposites, _.bind(function(oppositesList) {
            numEntries = this.beliefsCollection.countWhere(_.extend({
                is_selected: true
            }, oppositesList.whereFilter));
            supportingBelief = this._getSupportingByOppositeList(oppositesList);
            if (supportingBelief) {
                if (numEntries == 1) {
                    supportingBelief.setMode(supportingBelief.modes.MODE_PICK_CHECK);
                } else {
                    supportingBelief.setMode(supportingBelief.modes.MODE_PICK);
                }
            }
        }, this));
        this.setStepCompleted(this._getNumOppositeListsDone() == this._opposites.length);
    },
    gotoOppositeList: function(chosenOppositeList) {
        app.classes.views.steps.FilterOppositeSupporting.__super__.gotoOppositeList.apply(this, [chosenOppositeList]);
        this.updateCompletedState();
        chosenOppositeList.enable();
        this._updateInstructionsOppositeList();
        return this;
    },
    gotoOverview: function() {
        app.classes.views.steps.FilterOppositeSupporting.__super__.gotoOverview.apply(this, []);
        this.updateCompletedState();
        this._updateInstructionsOverview();
        return this;
    },
    _showStep: function(step, onComplete) {
        this.beliefsCollection.removeEmpty();
        _.each(this._opposites, _.bind(function(oppositeList) {
            oppositeList.setMode(oppositeList.modes.MODE_FILTERING);
            oppositeList.signals.beliefSelected.add(this._onOppositeSelected);
            oppositeList.signals.beliefDeselected.add(this._onOppositeSelected);
        }, this));
        this.supportingBeliefsView.setMode(this.supportingBeliefsView.modes.MODE_MENU);
        this.supportingBeliefsView.signals.beliefClicked.add(this._onSupportingClicked);
        this.instructions.show();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        _.each(this._opposites, _.bind(function(oppositeList) {
            oppositeList.signals.beliefSelected.remove(this._onOppositeSelected);
            oppositeList.signals.beliefDeselected.remove(this._onOppositeSelected);
        }, this));
        this.supportingBeliefsView.signals.beliefClicked.remove(this._onSupportingClicked);
        this.instructions.setI().hide();
        onComplete();
    },
    _updateInstructionsOppositeList: function() {
        if (!this.currentOpposites) {
            return;
        }
        var numSelectedOpposites = this.beliefsCollection.countWhere(_.extend({
            text: '*',
            is_core: false,
            is_selected: true
        }, this.currentOpposites.whereFilter));
        var id = '';
        switch (numSelectedOpposites) {
            case 0:
                id = 'filter_opposites_beliefs_opposite';
                if (this._currentInstructionID == id) {
                    return;
                }
                break;
            case 1:
                id = 'filter_opposites_beliefs_opposite_complete';
                if (this._currentInstructionID == id) {
                    return;
                }
                break;
            default:
                id = 'filter_opposites_beliefs_opposite_toomany';
                break;
        }
        this._currentInstructionID = id;
        var data = {
            supporting_belief: this._getSupportingByOppositeList(this.currentOpposites).getValue(),
            num_too_many: app.classes.utils.StringUtils.intToEnglishString(numSelectedOpposites - 1)
        };
        this.instructions.setI(this.instructions.getInstruction('filter_opposites_beliefs_i')).setMessages(this.instructions.getInstruction(id, data));
    },
    _updateInstructionsOverview: function() {
        var id = 'filter_opposites_beliefs_overview';
        var numSupportingDone = this._getNumOppositeListsDone();
        if (numSupportingDone === 0) {
            id = 'filter_opposites_beliefs_overview';
        } else if (numSupportingDone < this.appSettings.supportingBeliefSelectionSize) {
            id = 'filter_opposites_beliefs_overview_rest';
        } else {
            id = 'filter_opposites_beliefs_overview_complete';
        }
        if (this._currentInstructionID == id) {
            return;
        }
        this._currentInstructionID = id;
        this.instructions.setI().setMessages(this.instructions.getInstruction(id));
    },
    _onOppositeSelected: function(oppositeBelief) {
        var numSelected = this.beliefsCollection.countWhere(_.extend({
            is_selected: true
        }, this._getOppositeListByOpposite(oppositeBelief).whereFilter));
        if (numSelected == 1) {
            this._getOppositeListByOpposite(oppositeBelief).disable();
            this.updateCompletedState();
            _.delay(this.gotoOverview, 100);
        } else {
            this._updateInstructionsOppositeList();
            this.updateCompletedState();
        }
    },
    _onSupportingClicked: function(supportingBelief) {
        if (this.mode == this.modes.MODE_OVERVIEW) {
            this.gotoOppositeList(this._getOppositeListBySupporting(supportingBelief));
        } else {
            this.gotoOverview();
        }
    },
    _getNumOppositeListsDone: function() {
        var done = 0,
            numEntries = 0;
        _.each(this._opposites, _.bind(function(oppositesList) {
            numEntries = this.beliefsCollection.countWhere(_.extend({
                is_selected: true
            }, oppositesList.whereFilter));
            done += numEntries == 1 ? 1 : 0;
        }, this));
        return done;
    }
});

app.classes.views.steps.FilterSupporting = app.classes.views.base.StepView.extend({
    coreBeliefView: 'inject',
    supportingBeliefsView: 'inject',
    beliefsCollection: 'inject',
    layouts: 'inject',
    instructions: 'inject',
    appSettings: 'inject',
    router: 'inject',
    oppositesSupportingBeliefsTLView: 'inject',
    oppositesSupportingBeliefsTRView: 'inject',
    oppositesSupportingBeliefsBLView: 'inject',
    oppositesSupportingBeliefsBRView: 'inject',
    postConstructs: ['_onPostConstruct'],
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.supportingBeliefsView.signals.beliefSelected.add(this._onBeliefSelected);
        this.supportingBeliefsView.signals.beliefDeselected.add(this._onBeliefDeselected);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    canSkipStep: function() {
        this.beliefsCollection.removeEmpty();
        return this.supportingBeliefsView.getNumBeliefs() == this.appSettings.minSupportingBeliefs;
    },
    skipStep: function() {
        _.invoke(this.supportingBeliefsView.getBeliefs(), 'select');
        this._linkSelectedToOppositeLists();
    },
    updateCompletedState: function() {
        var numSelected = this.getNumSelected();
        this.setStepCompleted(numSelected == this.appSettings.supportingBeliefSelectionSize);
        this._updateInstructions(numSelected);
        return this;
    },
    getNumSelected: function() {
        return _.filter(this.supportingBeliefsView.getBeliefs(), function(beliefView) {
            return beliefView.model.get('is_selected');
        }).length;
    },
    _onPostConstruct: function() {
        this._opposites = [this.oppositesSupportingBeliefsTLView, this.oppositesSupportingBeliefsTRView, this.oppositesSupportingBeliefsBLView, this.oppositesSupportingBeliefsBRView];
    },
    _showStep: function(step, onComplete) {
        this.supportingBeliefsView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_SUPPORTING).setMode(this.supportingBeliefsView.modes.MODE_FILTERING).setPrimaryBelief(this.coreBeliefView).show();
        this.coreBeliefView.setMode(this.coreBeliefView.modes.MODE_FIXED).disable().show();
        this.instructions.show();
        this._updateInstructions(this.getNumSelected());
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this._linkSelectedToOppositeLists();
        this.beliefsCollection.removeEmpty();
        this.coreBeliefView.enable().hide();
        this.instructions.hide();
        this.supportingBeliefsView.setPrimaryBelief(null).hide();
        onComplete();
    },
    _linkSelectedToOppositeLists: function() {
        var selectedSupportingBeliefs = this.beliefsCollection.where({
            is_selected: true,
            is_opposite: false,
            is_core: false
        });
        _.each(this._opposites, _.bind(function(data, index) {
            var where = {
                is_opposite: true,
                is_core: false
            };
            if (selectedSupportingBeliefs[index]) {
                this._opposites[index].whereFilter.parent = selectedSupportingBeliefs[index];
            }
        }, this));
    },
    _updateInstructions: function(numSelected) {
        var id = 'filter_supporting_belief';
        if (numSelected === 0) {
            id = 'filter_supporting_belief';
        } else if (numSelected < this.appSettings.supportingBeliefSelectionSize) {
            id = 'filter_supporting_belief_toofew';
        } else if (numSelected == this.appSettings.supportingBeliefSelectionSize) {
            id = 'filter_supporting_belief_done';
        } else {
            id = 'filter_supporting_belief_toomany';
        }
        var data = {
            num_too_many: app.classes.utils.StringUtils.intToEnglishString(numSelected - this.appSettings.supportingBeliefSelectionSize),
            num_too_few: app.classes.utils.StringUtils.intToEnglishString(this.appSettings.supportingBeliefSelectionSize - numSelected)
        };
        this.instructions.setMessages(this.instructions.getInstruction(id, data));
    },
    _onBeliefSelected: function(beliefView) {
        this.updateCompletedState();
    },
    _onBeliefDeselected: function(beliefView) {
        this.updateCompletedState();
    }
});

app.classes.views.steps.FilterSupportingDone = app.classes.views.base.StepView.extend({
    coreBeliefView: 'inject',
    supportingBeliefsView: 'inject',
    instructions: 'inject',
    layouts: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        this.setStepCompleted(true);
    },
    _showStep: function(step, onComplete) {
        this.supportingBeliefsView.filterBeliefs({
            is_selected: true
        }).setTemplate(this.layouts.templates.TEMPLATE_FRAME).setPrimaryBelief(this.coreBeliefView).setMode(this.supportingBeliefsView.modes.MODE_STATIC).disable().show();
        this.coreBeliefView.setMode(this.coreBeliefView.modes.MODE_FIXED).disable().show();
        this.instructions.setMessages(this.instructions.getInstruction('confirm_frame')).show();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.supportingBeliefsView.filterBeliefs({}).setPrimaryBelief(null).enable().hide();
        this.coreBeliefView.enable().hide();
        this.instructions.hide();
        onComplete();
    }
});

app.classes.views.steps.FindCore = app.classes.views.base.StepView.extend({
    coreBeliefView: 'inject',
    layouts: 'inject',
    instructions: 'inject',
    appSettings: 'inject',
    alertFactory: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.coreBeliefView.signals.modeChanged.add(this._onCoreModeChanged);
        this.coreBeliefView.signals.valueChanged.add(this._updateInstructionsBasedOnValue);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        this.setStepCompleted(this.coreBeliefView.getValue() !== '');
    },
    _showStep: function(step, onComplete) {
        this.coreBeliefView.setEditModeBasedOnValue().setTemplate(this.layouts.templates.TEMPLATE_FINDING_SUPPORTING).show();
        this.instructions.setMessages(this.instructions.getInstruction('find_core_belief')).setI(this.instructions.getInstruction('find_core_belief_i')).show();
        this.alertFactory.hideAll();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.coreBeliefView.hide();
        this.instructions.setI().hide();
        onComplete();
    },
    _onCoreModeChanged: function(mode) {
        this._updateInstructionsBasedOnMode(mode);
        this.updateCompletedState();
    },
    _updateInstructionsBasedOnMode: function(mode) {
        switch (mode) {
            case this.coreBeliefView.modes.MODE_EMPTY:
                this._updateInstructions('find_core_belief');
                break;
            case this.coreBeliefView.modes.MODE_EDITING:
                this._updateInstructionsBasedOnValue();
                break;
            case this.coreBeliefView.modes.MODE_FILLED:
                this._updateInstructions('find_core_belief_done');
                break;
        }
    },
    _updateInstructionsBasedOnValue: function() {
        var valueLength = this.coreBeliefView.getValue().length;
        if (valueLength === 0) {
            return this._updateInstructions('find_core_belief');
        }
        if (valueLength < this.appSettings.minCoreBeliefLength) {
            return this._updateInstructions('find_core_belief_short');
        }
        if (valueLength > this.appSettings.maxCoreBeliefLength) {
            return this._updateInstructions('find_core_belief_long');
        }
        this._updateInstructions('find_core_belief_check');
    },
    _updateInstructions: function(id) {
        if (this._currentInstructionID == id) {
            return;
        }
        this._currentInstructionID = id;
        this.instructions.setMessages(this.instructions.getInstruction(id));
    }
});

app.classes.views.steps.FindNewCore = app.classes.views.base.StepView.extend({
    newCoreBeliefView: 'inject',
    supportingOppositeBeliefsView: 'inject',
    layouts: 'inject',
    instructions: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.newCoreBeliefView.signals.modeChanged.add(this._onCoreModeChanged);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        this.setStepCompleted(this.newCoreBeliefView.getValue() !== '');
    },
    _showStep: function(step, onComplete) {
        this.supportingOppositeBeliefsView.disable().setPrimaryBelief(this.newCoreBeliefView).setTemplate(this.layouts.templates.TEMPLATE_FRAME).setMode(this.supportingOppositeBeliefsView.modes.MODE_STATIC).show();
        this.newCoreBeliefView.setEditModeBasedOnValue().show();
        this.instructions.setI(this.instructions.getInstruction('find_new_core_belief_i')).show();
        this._updateInstructionsBasedOnMode();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.newCoreBeliefView.hide();
        this.instructions.setI().hide();
        this.supportingOppositeBeliefsView.enable().setPrimaryBelief(null).hide();
        onComplete();
    },
    _updateInstructionsBasedOnMode: function() {
        var id = 'find_new_core_belief';
        if (this.newCoreBeliefView.getMode() == this.newCoreBeliefView.modes.MODE_FILLED) {
            id = 'find_new_core_belief_complete';
        }
        this.instructions.setMessages(this.instructions.getInstruction(id));
    },
    _onCoreModeChanged: function(mode) {
        this.updateCompletedState();
        this._updateInstructionsBasedOnMode();
    }
});

app.classes.views.steps.FindNewCoreDone = app.classes.views.base.StepView.extend({
    coreBeliefView: 'inject',
    newCoreBeliefView: 'inject',
    layouts: 'inject',
    instructions: 'inject',
    share: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.newCoreBeliefView.signals.modeChanged.add(this.updateCompletedState);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        this.setStepCompleted(true);
    },
    _showStep: function(step, onComplete) {
        this.newCoreBeliefView.disable().setMode(this.newCoreBeliefView.modes.MODE_FIXED).setTemplate(this.layouts.templates.TEMPLATE_MANUAL, {
            scale: 1,
            top: 360,
            left: 380
        }).show();
        this.coreBeliefView.disable().setMode(this.coreBeliefView.modes.MODE_FIXED).setTemplate(this.layouts.templates.TEMPLATE_MANUAL, {
            scale: 1,
            top: 360,
            left: 210
        }).show();
        this.share.show();
        try {
            FB.XFBML.parse();
        } catch (ex) {}
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.newCoreBeliefView.enable().hide();
        this.coreBeliefView.enable().hide();
        this.share.hide();
        onComplete();
    }
});

app.classes.views.steps.FindOppositeSupporting = app.classes.views.steps.BaseOppositeSupporting.extend({
    steps: 'inject',
    appSettings: 'inject',
    instructions: 'inject',
    router: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
        this.steps.signals.currentSubStepChanged.add(this._onSubStepChanged);
    },
    updateCompletedState: function() {
        var numEntries = 0;
        if (this.mode == this.modes.MODE_FINDING_OPPOSITES) {
            numEntries = this.beliefsCollection.countWhere(_.extend({
                text: '*',
                is_core: false
            }, this.currentOpposites.whereFilter));
            if (numEntries >= this.appSettings.minOppositeBeliefs) {
                this.setSubStepCompleted(true, {
                    next: '/step/' + this.steps.getCurrentStatus().current + '/'
                });
            } else {
                this.setStepCompleted(false);
            }
        } else {
            var done = 0,
                thisIsDone = false,
                supportingBeliefView = null;
            _.each(this._opposites, _.bind(function(oppositesList) {
                numEntries = this.beliefsCollection.countWhere(_.extend({
                    text: '*',
                    is_core: false
                }, oppositesList.whereFilter));
                thisIsDone = numEntries >= this.appSettings.minOppositeBeliefs;
                supportingBeliefView = this._getSupportingByOppositeList(oppositesList);
                if (thisIsDone) {
                    done++;
                    supportingBeliefView && supportingBeliefView.setMode(supportingBeliefView.modes.MODE_FIXED_CHECK);
                } else {
                    supportingBeliefView && supportingBeliefView.setMode(supportingBeliefView.modes.MODE_FIXED);
                }
            }, this));
            this.setStepCompleted(done == this._opposites.length);
        }
    },
    gotoOppositeList: function(chosenOppositeList) {
        app.classes.views.steps.FindOppositeSupporting.__super__.gotoOppositeList.apply(this, [chosenOppositeList]);
        this.updateCompletedState();
        this.supportingBeliefsView.enable().setMode(this.supportingBeliefsView.modes.MODE_MENU);
        this._updateInstructionsOppositeList();
        return this;
    },
    gotoOverview: function() {
        app.classes.views.steps.FindOppositeSupporting.__super__.gotoOverview.apply(this);
        _.each(this._opposites, _.bind(function(oppositeBeliefs) {
            this.beliefsCollection.forceOneEmpty(oppositeBeliefs.whereFilter);
        }, this));
        this.supportingBeliefsView.disable().setMode(this.supportingBeliefsView.modes.MODE_STATIC);
        this._updateInstructionsOverview();
        this.updateCompletedState();
    },
    _showStep: function(step, onComplete) {
        _.each(this._opposites, _.bind(function(oppositeList) {
            var supportingBelief = this._getSupportingByOppositeList(oppositeList, true);
            if (!supportingBelief) {
                console.error('Error: cannot find supporting belief of ', oppositeList.whereFilter);
                return;
            }
            oppositeList.setWhereFilter({
                is_core: false,
                is_opposite: true,
                parent: supportingBelief.model
            }).setMode(oppositeList.modes.MODE_FINDING);
            oppositeList.signals.beliefModeChanged.add(this._onOppositeModeChanged);
        }, this));
        this.supportingBeliefsView.signals.beliefClicked.add(this._onSupportingClicked);
        this.instructions.show();
        this.gotoOverview();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.beliefsCollection.removeEmpty();
        _.each(this._opposites, _.bind(function(oppositeList) {
            oppositeList.signals.beliefModeChanged.remove(this._onOppositeModeChanged);
        }, this));
        this.supportingBeliefsView.enable();
        this.supportingBeliefsView.signals.beliefClicked.remove(this._onSupportingClicked);
        this.instructions.setI().hide();
        onComplete();
    },
    _onOppositeModeChanged: function(mode, beliefView) {
        if (!this.isShown()) {
            return;
        }
        var oppositeBeliefs = this._getOppositeListByOpposite(beliefView);
        if (this.mode == this.modes.MODE_OVERVIEW) {
            this.router.navigate('/step/' + this.steps.getCurrentStatus().current + '/' + oppositeBeliefs.index + '/', {
                trigger: true
            });
        } else {
            var numEntries = this.beliefsCollection.countWhere(_.extend({
                text: '*'
            }, oppositeBeliefs.whereFilter));
            if (mode == beliefView.modes.MODE_FILLED && numEntries < this.appSettings.maxOppositeBeliefs) {
                this.beliefsCollection.forceOneEmpty(oppositeBeliefs.whereFilter);
            }
            this._updateInstructionsOppositeList();
        }
        this.updateCompletedState();
    },
    _onSupportingClicked: function(beliefView) {
        this.router.navigate('/step/' + this.steps.getCurrentStatus().current + '/', {
            trigger: true
        });
    },
    _onSubStepChanged: function(step, completed, data) {
        if (step !== this) {
            return;
        }
        if (!data.currentSub || data.currentSub === 0) {
            this.gotoOverview();
            return;
        }
        var index = data.currentSub - 1;
        if (index >= 0 && index <= this._opposites.length) {
            this.gotoOppositeList(this._opposites[index]);
        }
    },
    _updateInstructionsOppositeList: function() {
        var numSupportingDone = this._getNumSupportingBeliefsDone();
        var numOpposites = this.beliefsCollection.countWhere(_.extend({
            text: '*',
            is_core: false
        }, this.currentOpposites.whereFilter));
        var messageID = '';
        var iID = '';
        switch (numOpposites) {
            case 0:
                messageID = 'find_opposites_beliefs_opposite_first';
                iID = 'find_opposites_beliefs_opposite_first_i';
                break;
            case 1:
                messageID = 'find_opposites_beliefs_opposite_second';
                iID = 'find_opposites_beliefs_opposite_second_i';
                break;
            case 2:
                messageID = 'find_opposites_beliefs_opposite_third';
                iID = 'find_opposites_beliefs_opposite_third_i';
                break;
            case 3:
            default:
                messageID = 'find_opposites_beliefs_opposite_fourth';
                break;
        }
        messageID += numSupportingDone === 0 ? '' : '_short';
        if (this._currentInstructionID == messageID) {
            return;
        }
        this._currentInstructionID = messageID;
        var data = {
            supporting_belief: this._getSupportingByOppositeList(this.currentOpposites).getValue()
        };
        this.instructions.setMessages(this.instructions.getInstruction(messageID, data));
        var iText = iID === '' ? '' : this.instructions.getInstruction(iID);
        this.instructions.setI(iText);
    },
    _updateInstructionsOverview: function() {
        var id = 'find_opposites_beliefs_overview_first';
        var numSupportingDone = this._getNumSupportingBeliefsDone();
        if (this._previousStepIsOpposite()) {
            if (numSupportingDone === 0) {
                id = 'find_opposites_beliefs_overview_first';
            } else if (numSupportingDone < 2) {
                id = 'find_opposites_beliefs_overview_second';
            } else if (numSupportingDone < this.appSettings.supportingBeliefSelectionSize) {
                id = 'find_opposites_beliefs_overview_rest';
            } else if (this._previousStepIsOpposite) {
                id = 'find_opposites_beliefs_overview_complete';
            }
        } else {
            id = 'find_opposites_beliefs_overview_first';
        }
        if (this._currentInstructionID == id) {
            return;
        }
        this._currentInstructionID = id;
        this.instructions.setI().setMessages(this.instructions.getInstruction(id));
    },
    _previousStepIsOpposite: function() {
        var lastItem = _.last(this.router.history);
        if (!lastItem) {
            return false;
        }
        if (lastItem.indexOf(this.router.getCurrentPath()) !== 0) {
            return false;
        }
        return lastItem.substr(this.router.getCurrentPath().length) !== '';
    }
});

app.classes.views.steps.FindSupporting = app.classes.views.base.StepView.extend({
    coreBeliefView: 'inject',
    supportingBeliefsView: 'inject',
    beliefsCollection: 'inject',
    instructions: 'inject',
    layouts: 'inject',
    appSettings: 'inject',
    initialize: function(options) {
        this.parent('inherit', options);
        _.bindAll(this);
        this.supportingBeliefsView.signals.beliefModeChanged.add(this._onBeliefModeChanged);
        this.signals.showStepStarted.add(this._showStep);
        this.signals.hideStepStarted.add(this._hideStep);
    },
    updateCompletedState: function() {
        var numEntries = this._getNumNonEmpty();
        this.setStepCompleted(numEntries >= this.appSettings.minSupportingBeliefs);
        this._updateInstructionsBasedOnNumBeliefs(numEntries);
    },
    _showStep: function(step, onComplete) {
        this.coreBeliefView.setMode(this.coreBeliefView.modes.MODE_FIXED).disable().show();
        this.supportingBeliefsView.setTemplate(this.layouts.templates.TEMPLATE_FINDING_SUPPORTING).setMode(this.supportingBeliefsView.modes.MODE_FINDING).setPrimaryBelief(this.coreBeliefView).show();
        this.instructions.setI(this.instructions.getInstruction('find_supporting_belief_i')).show();
        this._updateInstructionsBasedOnNumBeliefs();
        this._addEmptySupportingBelief();
        onComplete();
    },
    _hideStep: function(step, onComplete) {
        this.beliefsCollection.removeEmpty();
        this.coreBeliefView.enable().hide();
        this.instructions.setI().hide();
        this.supportingBeliefsView.setPrimaryBelief(null).hide();
        onComplete();
    },
    _addEmptySupportingBelief: function() {
        var numEntries = this.beliefsCollection.countWhere(_.extend({
            text: '*'
        }, this.supportingBeliefsView.whereFilter));
        if (numEntries < this.appSettings.maxSupportingBeliefs) {
            this.beliefsCollection.forceOneEmpty({
                parent: this.coreBeliefView.model
            });
        }
    },
    _onBeliefModeChanged: function(mode, beliefView) {
        if (mode == beliefView.modes.MODE_FILLED) {
            this._addEmptySupportingBelief();
        }
        if (mode == beliefView.modes.MODE_FILLED || mode == beliefView.modes.MODE_EMPTY || mode == beliefView.modes.MODE_EDIT) {
            this.updateCompletedState();
        }
    },
    _updateInstructionsBasedOnNumBeliefs: function(numBeliefs) {
        var id = 'find_supporting_belief';
        if (numBeliefs === 0) {
            id = 'find_supporting_belief';
        } else if (numBeliefs > 0 && numBeliefs < this.appSettings.minSupportingBeliefs) {
            id = 'find_supporting_belief_few';
        } else if (numBeliefs < this.appSettings.normalSupportingBeliefs) {
            id = 'find_supporting_belief_normal';
            this.instructions.setI(null)
        } else if (numBeliefs < this.appSettings.moreSupportingBeliefs) {
            id = 'find_supporting_belief_more';
        } else {
            id = 'find_supporting_belief_many';
        }
        if (this._currentInstructionID == id) {
            return;
        }
        this._currentInstructionID = id;
        var instructionData = {
            core_belief: this.coreBeliefView.getValue()
        };
        this.instructions.setMessages(this.instructions.getInstruction(id, instructionData));
    },
    _getNumNonEmpty: function() {
        return this.beliefsCollection.countWhere(_.extend({
            text: '*'
        }, this.supportingBeliefsView.whereFilter));
    }
});

app.classes.views.AppView = Backbone.View.extend({
    el: $('#container'),
    steps: '_inject',
    gui: '_inject',
    beliefsCollection: '_inject',
    signals: {
        beliefEditStateChanged: null
    },
    initialize: function(options) {
        this.layouts = new app.classes.utils.LayoutUtils();
        this.layouts.add({
            width: 760,
            height: 420
        }, 'tiny');
        this.layouts.add({
            width: 980,
            height: 599
        }, 'small');
        this.layouts.add({
            width: 1240,
            height: 600
        }, 'medium');
        this.layouts.add({
            width: 1560,
            height: 1000
        }, 'large');
        this.layouts.resize();
        this.signals = app.classes.utils.SignalUtils.create(this.signals);
        this.injector.map('app').toValue(this);
        this.injector.map('appSettings').toValue(app.Settings);
        this.injector.map('router').toValue(options.router);
        var beliefsCollection = new app.classes.collections.BeliefsCollection(window.beliefs);
        this.injector.map('beliefsCollection').toValue(beliefsCollection);
        beliefsCollection.on('add', _.bind(this._onBeliefAdded, this));
        var coreBeliefModel = this._findOrCreateBelief({
            is_core: true,
            is_opposite: false
        }, beliefsCollection);
        var newCoreBeliefModel = this._findOrCreateBelief({
            is_core: true,
            is_opposite: true
        }, beliefsCollection);
        this.injector.map('coreBeliefModel').toValue(coreBeliefModel);
        this.injector.map('newCoreBeliefModel').toValue(newCoreBeliefModel);
        this.injector.map('layouts').toValue(this.layouts);
        this.injector.map('alertFactory').toValue(new app.classes.views.gui.AlertFactoryView());
        var compObject = app.classes.views.components;
        this.injector.map('coreBeliefView').toValue(new compObject.beliefs.BeliefCoreView({
            model: coreBeliefModel,
            type: 'core'
        }));
        this.injector.map('newCoreBeliefView').toValue(new compObject.beliefs.BeliefCoreView({
            model: newCoreBeliefModel,
            type: 'oppositecore'
        }));
        this.injector.map('supportingBeliefsView').toValue(new compObject.beliefs.ListBeliefsSupportingView({
            where: {
                is_opposite: false,
                is_core: false
            }
        }));
        this.injector.map('instructions').toValue(new compObject.instructions.InstructionsView().render());
        this.injector.map('splash').toValue(new compObject.splash.SplashView().render());
        this.injector.map('share').toValue(new compObject.share.ShareView().render());
        var opposites = [{
            id: 'oppositesSupportingBeliefsTLView',
            name: 'topleft'
        }, {
            id: 'oppositesSupportingBeliefsTRView',
            name: 'topright'
        }, {
            id: 'oppositesSupportingBeliefsBLView',
            name: 'bottomleft'
        }, {
            id: 'oppositesSupportingBeliefsBRView',
            name: 'bottomright'
        }];
        var selectedSupportingBeliefs = beliefsCollection.where({
            is_selected: true,
            is_opposite: false,
            is_core: false
        });
        _.each(opposites, _.bind(function(data, index) {
            var where = {
                is_opposite: true,
                is_core: false,
                parent: selectedSupportingBeliefs[index]
            };
            this.injector.map(data.id).toValue(new app.classes.views.components.beliefs.ListBeliefsSupportingView({
                index: index + 1,
                where: where,
                classes: 'opposites ' + data.name
            }));
        }, this));
        this.injector.map('supportingOppositeBeliefsView').toValue(new compObject.beliefs.ListBeliefsSupportingView({
            where: {
                is_opposite: true,
                is_selected: true,
                is_core: false
            }
        }));
        this.injector.map('steps').toValue(new app.classes.views.components.stepmanager.StepsManagerView());
        this.injector.map('gui').toValue(new app.classes.views.gui.GUIView());
        this._selfInjection();
        this.injector.injectInto(options.router);
        var stepsObject = app.classes.views.steps;
        //this.steps.addStep(stepsObject.Explanation);
        this.steps.addStep(stepsObject.FindCore);
        this.steps.addStep(stepsObject.FindSupporting);
        this.steps.addStep(stepsObject.FilterSupporting);
        //this.steps.addStep(stepsObject.FilterSupportingDone);
        this.steps.addStep(stepsObject.FindOppositeSupporting);
        this.steps.addStep(stepsObject.FilterOppositeSupporting);
        this.steps.addStep(stepsObject.FindNewCore);
        this.steps.addStep(stepsObject.FindNewCoreDone);
    },
    render: function() {
        this.gui.render();
        this.steps.render();
        $(document).on('keydown', _.bind(function(event) {
            if (event.keyCode == 192) {
                console.log(JSON.stringify(this.beliefsCollection.toJSON()));
            }
        }, this));
        return this;
    },
    _selfInjection: function() {
        for (var index in this) {
            if (this[index] == '_inject') {
                this[index] = 'inject';
            }
        }
        this.injector.injectInto(this);
    },
    _findOrCreateBelief: function(whereFilter, collection) {
        var belief = collection.where(whereFilter)[0];
        if (!belief) {
            belief = new app.classes.models.BeliefModel(whereFilter);
            collection.add(belief);
        }
        return belief;
    },
    _onBeliefAdded: function(beliefModel) {
        this.injector.injectInto(beliefModel);
    }
});

app.classes.routers.AppRouter = Backbone.Router.extend({
    routes: {
        'step/:index/': 'navToStep',
        'step/:index/:substep/': 'navToStep',
        '*actions': 'defaultAction'
    },
    history: null,
    initialize: function(options) {
        this._initAnchors();
        this.history = [];
        this.bind('all', _.bind(this._onRouteChanged, this));
    },
    start: function() {
        var root = '/' + app.Settings.appURL.substr(app.Settings.rootURL.length);
        Backbone.history.start({
            pushState: history && history.pushState,
            root: root
        });
    },
    navToStep: function(index, subindex) {
        if (app.appView.steps.canSkipStep(index)) {
            var nextStep = (parseInt(index, 10) + 1).toString();
            if (nextStep <= app.appView.steps.getNumSteps()) {
                app.appView.steps.skipStep(index);
                this.navigate('step/' + nextStep + '/', {
                    trigger: true,
                    replace: true
                });
                return;
            }
        }
        if (app.appView.steps.jumpToStep(index, subindex)) {
            if (index == 1) {
                app.appView.gui.saveNewButtons.hide();
            } else {
                app.appView.gui.saveNewButtons.show();
            }
            return;
        }
        this.pathNotFound(this.getCurrentPath(), {
            forwardToLastStep: false
        });
    },
    defaultAction: function(path) {
        this.pathNotFound(path);
    },
    _onRouteChanged: function(path) {
        this.history.push(Backbone.history.fragment);
    },
    pathNotFound: function(path, options) {
        if (!path) {
            path = this.getCurrentPath();
        }
        options = options || {};
        _.defaults(options, {
            forwardToLastStep: true,
            defaultCompletedSteps: 1
        });
        _.delay(_.bind(function() {
            var path = '';
            if (options.forwardToLastStep) {
                var completedSteps = app.appView.steps.getNumCompletedSteps();
                if (options.defaultCompletedSteps == completedSteps) {
                    completedSteps = 0;
                }
                path = 'step/' + Math.min(1 + completedSteps, app.appView.steps.getNumSteps()) + '/';
            } else {
                path = 'step/1/';
            }
            this.navigate(path, {
                trigger: true,
                replace: true
            });
        }, this), 100, this);
    },
    getCurrentPath: function() {
        return Backbone.history.fragment;
    },
    getPathFromURL: function(url) {
        if (!url || !url.length) {
            url = '';
        }
        if (url == app.classes.utils.StringUtils.stripTrailingSlash(app.Settings.appURL)) {
            return '';
        }
        var path = url.replace(app.Settings.appURL, '');
        if (!history || !history.pushState) {
            if (path.substr(0, 1) == '/') {
                path = path.substr(1);
            }
            path = '#' + path;
        }
        return path;
    },
    _initAnchors: function() {
        var strippedBaseURL = app.classes.utils.StringUtils.stripTrailingSlash(app.Settings.appURL);
        $('a[href^="' + strippedBaseURL + '"]:not([data-norouter]), a:not([href^="http://"])').live('click', _.bind(function(event) {
            $a = $(event.target);
            if ($a.prop("tagName") != 'A') {
                $a = $a.parents('a');
            }
            if ($a.attr('target') == '_blank') {
                return true;
            }
            if ($a.hasClass('disabled')) {
                event.stopPropagation();
                return true;
            }
            event.preventDefault();
            this.navigate(this.getPathFromURL($a.attr('href')), {
                trigger: true
            });
        }, this));
    }
});