/*
 Highstock JS v7.0.2 (2019-01-17)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (R, H) { "object" === typeof module && module.exports ? (H["default"] = H, module.exports = R.document ? H(R) : H) : "function" === typeof define && define.amd ? define(function () { return H(R) }) : R.Highcharts = H(R) })("undefined" !== typeof window ? window : this, function (R) {
    var H = function () {
        var a = "undefined" === typeof R ? window : R, C = a.document, B = a.navigator && a.navigator.userAgent || "", F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, n = /(edge|msie|trident)/i.test(B) && !a.opera, g = -1 !==
            B.indexOf("Firefox"), t = -1 !== B.indexOf("Chrome"), w = g && 4 > parseInt(B.split("Firefox/")[1], 10); return a.Highcharts ? a.Highcharts.error(16, !0) : {
                product: "Highstock", version: "7.0.2", deg2rad: 2 * Math.PI / 360, doc: C, hasBidiBug: w, hasTouch: C && void 0 !== C.documentElement.ontouchstart, isMS: n, isWebKit: -1 !== B.indexOf("AppleWebKit"), isFirefox: g, isChrome: t, isSafari: !t && -1 !== B.indexOf("Safari"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B), SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {},
                svg: F, win: a, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { }, charts: []
            }
    }(); (function (a) {
    a.timers = []; var C = a.charts, B = a.doc, F = a.win; a.error = function (n, g, t) { var w = a.isNumber(n) ? "Highcharts error #" + n + ": www.highcharts.com/errors/" + n : n; t && a.fireEvent(t, "displayError", { code: n }); if (g) throw Error(w); F.console && console.log(w) }; a.Fx = function (a, g, t) { this.options = g; this.elem = a; this.prop = t }; a.Fx.prototype = {
        dSetter: function () {
            var a = this.paths[0], g = this.paths[1], t = [], w = this.now,
            v = a.length, x; if (1 === w) t = this.toD; else if (v === g.length && 1 > w) for (; v--;)x = parseFloat(a[v]), t[v] = isNaN(x) ? g[v] : w * parseFloat(g[v] - x) + x; else t = g; this.elem.attr("d", t, null, !0)
        }, update: function () { var a = this.elem, g = this.prop, t = this.now, w = this.options.step; if (this[g + "Setter"]) this[g + "Setter"](); else a.attr ? a.element && a.attr(g, t, null, !0) : a.style[g] = t + this.unit; w && w.call(a, t, this) }, run: function (n, g, t) {
            var w = this, v = w.options, x = function (a) { return x.stopped ? !1 : w.step(a) }, p = F.requestAnimationFrame || function (a) {
                setTimeout(a,
                    13)
            }, e = function () { for (var f = 0; f < a.timers.length; f++)a.timers[f]() || a.timers.splice(f--, 1); a.timers.length && p(e) }; n !== g || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = n, this.end = g, this.unit = t, this.now = this.start, this.pos = 0, x.elem = this.elem, x.prop = this.prop, x() && 1 === a.timers.push(x) && p(e)) : (delete v.curAnim[this.prop], v.complete && 0 === Object.keys(v.curAnim).length && v.complete.call(this.elem))
        }, step: function (n) {
            var g = +new Date, t, w = this.options, v = this.elem, x = w.complete, p = w.duration,
            e = w.curAnim; v.attr && !v.element ? n = !1 : n || g >= p + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), t = e[this.prop] = !0, a.objectEach(e, function (a) { !0 !== a && (t = !1) }), t && x && x.call(v), n = !1) : (this.pos = w.easing((g - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), n = !0); return n
        }, initPath: function (n, g, t) {
            function w(c) { var a, b; for (l = c.length; l--;)a = "M" === c[l] || "L" === c[l], b = /[a-zA-Z]/.test(c[l + 3]), a && b && c.splice(l + 1, 0, c[l + 1], c[l + 2], c[l + 1], c[l + 2]) } function v(a, m) {
                for (; a.length <
                    c;) { a[0] = m[c - a.length]; var b = a.slice(0, r);[].splice.apply(a, [0, 0].concat(b)); d && (b = a.slice(a.length - r), [].splice.apply(a, [a.length, 0].concat(b)), l--) } a[0] = "M"
            } function x(a, l) { for (var b = (c - a.length) / r; 0 < b && b--;)m = a.slice().splice(a.length / u - r, r * u), m[0] = l[c - r - b * r], q && (m[r - 6] = m[r - 2], m[r - 5] = m[r - 1]), [].splice.apply(a, [a.length / u, 0].concat(m)), d && b-- } g = g || ""; var p, e = n.startX, f = n.endX, q = -1 < g.indexOf("C"), r = q ? 7 : 3, c, m, l; g = g.split(" "); t = t.slice(); var d = n.isArea, u = d ? 2 : 1, G; q && (w(g), w(t)); if (e && f) {
                for (l = 0; l <
                    e.length; l++)if (e[l] === f[0]) { p = l; break } else if (e[0] === f[f.length - e.length + l]) { p = l; G = !0; break } void 0 === p && (g = [])
            } g.length && a.isNumber(p) && (c = t.length + p * u * r, G ? (v(g, t), x(t, g)) : (v(t, g), x(g, t))); return [g, t]
        }, fillSetter: function () { a.Fx.prototype.strokeSetter.apply(this, arguments) }, strokeSetter: function () { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0) }
    }; a.merge = function () {
        var n, g = arguments, t, w = {}, v = function (g, p) {
        "object" !== typeof g && (g = {}); a.objectEach(p, function (e,
            f) { !a.isObject(e, !0) || a.isClass(e) || a.isDOMElement(e) ? g[f] = p[f] : g[f] = v(g[f] || {}, e) }); return g
        }; !0 === g[0] && (w = g[1], g = Array.prototype.slice.call(g, 2)); t = g.length; for (n = 0; n < t; n++)w = v(w, g[n]); return w
    }; a.pInt = function (a, g) { return parseInt(a, g || 10) }; a.isString = function (a) { return "string" === typeof a }; a.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a }; a.isObject = function (n, g) { return !!n && "object" === typeof n && (!g || !a.isArray(n)) }; a.isDOMElement =
        function (n) { return a.isObject(n) && "number" === typeof n.nodeType }; a.isClass = function (n) { var g = n && n.constructor; return !(!a.isObject(n, !0) || a.isDOMElement(n) || !g || !g.name || "Object" === g.name) }; a.isNumber = function (a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a }; a.erase = function (a, g) { for (var n = a.length; n--;)if (a[n] === g) { a.splice(n, 1); break } }; a.defined = function (a) { return void 0 !== a && null !== a }; a.attr = function (n, g, t) {
            var w; a.isString(g) ? a.defined(t) ? n.setAttribute(g, t) : n && n.getAttribute &&
                ((w = n.getAttribute(g)) || "class" !== g || (w = n.getAttribute(g + "Name"))) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, g) { n.setAttribute(g, a) }); return w
        }; a.splat = function (n) { return a.isArray(n) ? n : [n] }; a.syncTimeout = function (a, g, t) { if (g) return setTimeout(a, g, t); a.call(0, t) }; a.clearTimeout = function (n) { a.defined(n) && clearTimeout(n) }; a.extend = function (a, g) { var n; a || (a = {}); for (n in g) a[n] = g[n]; return a }; a.pick = function () { var a = arguments, g, t, w = a.length; for (g = 0; g < w; g++)if (t = a[g], void 0 !== t && null !== t) return t };
        a.css = function (n, g) { a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")"); a.extend(n.style, g) }; a.createElement = function (n, g, t, w, v) { n = B.createElement(n); var x = a.css; g && a.extend(n, g); v && x(n, { padding: 0, border: "none", margin: 0 }); t && x(n, t); w && w.appendChild(n); return n }; a.extendClass = function (n, g) { var t = function () { }; t.prototype = new n; a.extend(t.prototype, g); return t }; a.pad = function (a, g, t) { return Array((g || 2) + 1 - String(a).replace("-", "").length).join(t || 0) + a }; a.relativeLength =
            function (a, g, t) { return /%$/.test(a) ? g * parseFloat(a) / 100 + (t || 0) : parseFloat(a) }; a.wrap = function (a, g, t) { var n = a[g]; a[g] = function () { var a = Array.prototype.slice.call(arguments), g = arguments, p = this; p.proceed = function () { n.apply(p, arguments.length ? arguments : g) }; a.unshift(n); a = t.apply(this, a); p.proceed = null; return a } }; a.datePropsToTimestamps = function (n) { a.objectEach(n, function (g, t) { a.isObject(g) && "function" === typeof g.getTime ? n[t] = g.getTime() : (a.isObject(g) || a.isArray(g)) && a.datePropsToTimestamps(g) }) }; a.formatSingle =
                function (n, g, t) { var w = /\.([0-9])/, v = a.defaultOptions.lang; /f$/.test(n) ? (t = (t = n.match(w)) ? t[1] : -1, null !== g && (g = a.numberFormat(g, t, v.decimalPoint, -1 < n.indexOf(",") ? v.thousandsSep : ""))) : g = (t || a.time).dateFormat(n, g); return g }; a.format = function (n, g, t) {
                    for (var w = "{", v = !1, x, p, e, f, q = [], r; n;) {
                        w = n.indexOf(w); if (-1 === w) break; x = n.slice(0, w); if (v) { x = x.split(":"); p = x.shift().split("."); f = p.length; r = g; for (e = 0; e < f; e++)r && (r = r[p[e]]); x.length && (r = a.formatSingle(x.join(":"), r, t)); q.push(r) } else q.push(x); n = n.slice(w +
                            1); w = (v = !v) ? "}" : "{"
                    } q.push(n); return q.join("")
                }; a.getMagnitude = function (a) { return Math.pow(10, Math.floor(Math.log(a) / Math.LN10)) }; a.normalizeTickInterval = function (n, g, t, w, v) { var x, p = n; t = a.pick(t, 1); x = n / t; g || (g = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === w && (1 === t ? g = g.filter(function (a) { return 0 === a % 1 }) : .1 >= t && (g = [1 / t]))); for (w = 0; w < g.length && !(p = g[w], v && p * t >= n || !v && x <= (g[w] + (g[w + 1] || g[w])) / 2); w++); return p = a.correctFloat(p * t, -Math.round(Math.log(.001) / Math.LN10)) }; a.stableSort = function (a,
                    g) { var n = a.length, w, v; for (v = 0; v < n; v++)a[v].safeI = v; a.sort(function (a, p) { w = g(a, p); return 0 === w ? a.safeI - p.safeI : w }); for (v = 0; v < n; v++)delete a[v].safeI }; a.arrayMin = function (a) { for (var g = a.length, n = a[0]; g--;)a[g] < n && (n = a[g]); return n }; a.arrayMax = function (a) { for (var g = a.length, n = a[0]; g--;)a[g] > n && (n = a[g]); return n }; a.destroyObjectProperties = function (n, g) { a.objectEach(n, function (a, w) { a && a !== g && a.destroy && a.destroy(); delete n[w] }) }; a.discardElement = function (n) {
                        var g = a.garbageBin; g || (g = a.createElement("div"));
                        n && g.appendChild(n); g.innerHTML = ""
                    }; a.correctFloat = function (a, g) { return parseFloat(a.toPrecision(g || 14)) }; a.setAnimation = function (n, g) { g.renderer.globalAnimation = a.pick(n, g.options.chart.animation, !0) }; a.animObject = function (n) { return a.isObject(n) ? a.merge(n) : { duration: n ? 500 : 0 } }; a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }; a.numberFormat = function (n, g, t, w) {
                        n = +n || 0; g = +g; var v = a.defaultOptions.lang, x = (n.toString().split(".")[1] || "").split("e")[0].length,
                            p, e, f = n.toString().split("e"); -1 === g ? g = Math.min(x, 20) : a.isNumber(g) ? g && f[1] && 0 > f[1] && (p = g + +f[1], 0 <= p ? (f[0] = (+f[0]).toExponential(p).split("e")[0], g = p) : (f[0] = f[0].split(".")[0] || 0, n = 20 > g ? (f[0] * Math.pow(10, f[1])).toFixed(g) : 0, f[1] = 0)) : g = 2; e = (Math.abs(f[1] ? f[0] : n) + Math.pow(10, -Math.max(g, x) - 1)).toFixed(g); x = String(a.pInt(e)); p = 3 < x.length ? x.length % 3 : 0; t = a.pick(t, v.decimalPoint); w = a.pick(w, v.thousandsSep); n = (0 > n ? "-" : "") + (p ? x.substr(0, p) + w : ""); n += x.substr(p).replace(/(\d{3})(?=\d)/g, "$1" + w); g && (n += t + e.slice(-g));
                        f[1] && 0 !== +n && (n += "e" + f[1]); return n
                    }; Math.easeInOutSine = function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) }; a.getStyle = function (n, g, t) {
                        if ("width" === g) return Math.max(0, Math.min(n.offsetWidth, n.scrollWidth, n.getBoundingClientRect && "none" === a.getStyle(n, "transform", !1) ? Math.floor(n.getBoundingClientRect().width) : Infinity) - a.getStyle(n, "padding-left") - a.getStyle(n, "padding-right")); if ("height" === g) return Math.max(0, Math.min(n.offsetHeight, n.scrollHeight) - a.getStyle(n, "padding-top") - a.getStyle(n, "padding-bottom"));
                        F.getComputedStyle || a.error(27, !0); if (n = F.getComputedStyle(n, void 0)) n = n.getPropertyValue(g), a.pick(t, "opacity" !== g) && (n = a.pInt(n)); return n
                    }; a.inArray = function (a, g, t) { return g.indexOf(a, t) }; a.find = Array.prototype.find ? function (a, g) { return a.find(g) } : function (a, g) { var n, w = a.length; for (n = 0; n < w; n++)if (g(a[n], n)) return a[n] }; a.keys = Object.keys; a.offset = function (a) {
                        var g = B.documentElement; a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 }; return {
                            top: a.top + (F.pageYOffset || g.scrollTop) -
                                (g.clientTop || 0), left: a.left + (F.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
                        }
                    }; a.stop = function (n, g) { for (var t = a.timers.length; t--;)a.timers[t].elem !== n || g && g !== a.timers[t].prop || (a.timers[t].stopped = !0) }; a.objectEach = function (a, g, t) { for (var n in a) a.hasOwnProperty(n) && g.call(t || a[n], a[n], n, a) }; a.objectEach({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (n, g) { a[g] = function (a) { return Array.prototype[n].apply(a, [].slice.call(arguments, 1)) } }); a.addEvent = function (n, g, t, w) {
                        var v,
                        x = n.addEventListener || a.addEventListenerPolyfill; v = "function" === typeof n && n.prototype ? n.prototype.protoEvents = n.prototype.protoEvents || {} : n.hcEvents = n.hcEvents || {}; a.Point && n instanceof a.Point && n.series && n.series.chart && (n.series.chart.runTrackerClick = !0); x && x.call(n, g, t, !1); v[g] || (v[g] = []); v[g].push(t); w && a.isNumber(w.order) && (t.order = w.order, v[g].sort(function (a, e) { return a.order - e.order })); return function () { a.removeEvent(n, g, t) }
                    }; a.removeEvent = function (n, g, t) {
                        function w(e, f) {
                            var q = n.removeEventListener ||
                                a.removeEventListenerPolyfill; q && q.call(n, e, f, !1)
                        } function v(e) { var f, q; n.nodeName && (g ? (f = {}, f[g] = !0) : f = e, a.objectEach(f, function (a, c) { if (e[c]) for (q = e[c].length; q--;)w(c, e[c][q]) })) } var x, p;["protoEvents", "hcEvents"].forEach(function (a) { var f = n[a]; f && (g ? (x = f[g] || [], t ? (p = x.indexOf(t), -1 < p && (x.splice(p, 1), f[g] = x), w(g, t)) : (v(f), f[g] = [])) : (v(f), n[a] = {})) })
                    }; a.fireEvent = function (n, g, t, w) {
                        var v, x, p, e, f; t = t || {}; B.createEvent && (n.dispatchEvent || n.fireEvent) ? (v = B.createEvent("Events"), v.initEvent(g, !0, !0),
                            a.extend(v, t), n.dispatchEvent ? n.dispatchEvent(v) : n.fireEvent(g, v)) : ["protoEvents", "hcEvents"].forEach(function (q) { if (n[q]) for (x = n[q][g] || [], p = x.length, t.target || a.extend(t, { preventDefault: function () { t.defaultPrevented = !0 }, target: n, type: g }), e = 0; e < p; e++)(f = x[e]) && !1 === f.call(n, t) && t.preventDefault() }); w && !t.defaultPrevented && w.call(n, t)
                    }; a.animate = function (n, g, t) {
                        var w, v = "", x, p, e; a.isObject(t) || (e = arguments, t = { duration: e[2], easing: e[3], complete: e[4] }); a.isNumber(t.duration) || (t.duration = 400); t.easing =
                            "function" === typeof t.easing ? t.easing : Math[t.easing] || Math.easeInOutSine; t.curAnim = a.merge(g); a.objectEach(g, function (f, e) { a.stop(n, e); p = new a.Fx(n, t, e); x = null; "d" === e ? (p.paths = p.initPath(n, n.d, g.d), p.toD = g.d, w = 0, x = 1) : n.attr ? w = n.attr(e) : (w = parseFloat(a.getStyle(n, e)) || 0, "opacity" !== e && (v = "px")); x || (x = f); x && x.match && x.match("px") && (x = x.replace(/px/g, "")); p.run(w, x, v) })
                    }; a.seriesType = function (n, g, t, w, v) {
                        var x = a.getOptions(), p = a.seriesTypes; x.plotOptions[n] = a.merge(x.plotOptions[g], t); p[n] = a.extendClass(p[g] ||
                            function () { }, w); p[n].prototype.type = n; v && (p[n].prototype.pointClass = a.extendClass(a.Point, v)); return p[n]
                    }; a.uniqueKey = function () { var a = Math.random().toString(36).substring(2, 9), g = 0; return function () { return "highcharts-" + a + "-" + g++ } }(); a.isFunction = function (a) { return "function" === typeof a }; F.jQuery && (F.jQuery.fn.highcharts = function () { var n = [].slice.call(arguments); if (this[0]) return n[0] ? (new (a[a.isString(n[0]) ? n.shift() : "Chart"])(this[0], n[0], n[1]), this) : C[a.attr(this[0], "data-highcharts-chart")] })
    })(H);
    (function (a) {
        var C = a.isNumber, B = a.merge, F = a.pInt; a.Color = function (n) { if (!(this instanceof a.Color)) return new a.Color(n); this.init(n) }; a.Color.prototype = {
            parsers: [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (a) { return [F(a[1]), F(a[2]), F(a[3]), parseFloat(a[4], 10)] } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) { return [F(a[1]), F(a[2]), F(a[3]), 1] } }], names: { white: "#ffffff", black: "#000000" },
            init: function (n) { var g, t, w, v; if ((this.input = n = this.names[n && n.toLowerCase ? n.toLowerCase() : ""] || n) && n.stops) this.stops = n.stops.map(function (g) { return new a.Color(g[1]) }); else if (n && n.charAt && "#" === n.charAt() && (g = n.length, n = parseInt(n.substr(1), 16), 7 === g ? t = [(n & 16711680) >> 16, (n & 65280) >> 8, n & 255, 1] : 4 === g && (t = [(n & 3840) >> 4 | (n & 3840) >> 8, (n & 240) >> 4 | n & 240, (n & 15) << 4 | n & 15, 1])), !t) for (w = this.parsers.length; w-- && !t;)v = this.parsers[w], (g = v.regex.exec(n)) && (t = v.parse(g)); this.rgba = t || [] }, get: function (a) {
                var g = this.input,
                n = this.rgba, w; this.stops ? (w = B(g), w.stops = [].concat(w.stops), this.stops.forEach(function (g, n) { w.stops[n] = [w.stops[n][0], g.get(a)] })) : w = n && C(n[0]) ? "rgb" === a || !a && 1 === n[3] ? "rgb(" + n[0] + "," + n[1] + "," + n[2] + ")" : "a" === a ? n[3] : "rgba(" + n.join(",") + ")" : g; return w
            }, brighten: function (a) { var g, n = this.rgba; if (this.stops) this.stops.forEach(function (g) { g.brighten(a) }); else if (C(a) && 0 !== a) for (g = 0; 3 > g; g++)n[g] += F(255 * a), 0 > n[g] && (n[g] = 0), 255 < n[g] && (n[g] = 255); return this }, setOpacity: function (a) { this.rgba[3] = a; return this },
            tweenTo: function (a, g) { var n = this.rgba, w = a.rgba; w.length && n && n.length ? (a = 1 !== w[3] || 1 !== n[3], g = (a ? "rgba(" : "rgb(") + Math.round(w[0] + (n[0] - w[0]) * (1 - g)) + "," + Math.round(w[1] + (n[1] - w[1]) * (1 - g)) + "," + Math.round(w[2] + (n[2] - w[2]) * (1 - g)) + (a ? "," + (w[3] + (n[3] - w[3]) * (1 - g)) : "") + ")") : g = a.input || "none"; return g }
        }; a.color = function (n) { return new a.Color(n) }
    })(H); (function (a) {
        var C, B, F = a.addEvent, n = a.animate, g = a.attr, t = a.charts, w = a.color, v = a.css, x = a.createElement, p = a.defined, e = a.deg2rad, f = a.destroyObjectProperties, q = a.doc,
        r = a.extend, c = a.erase, m = a.hasTouch, l = a.isArray, d = a.isFirefox, u = a.isMS, G = a.isObject, D = a.isString, y = a.isWebKit, b = a.merge, k = a.noop, z = a.objectEach, E = a.pick, h = a.pInt, A = a.removeEvent, M = a.splat, J = a.stop, W = a.svg, I = a.SVG_NS, P = a.symbolSizes, S = a.win; C = a.SVGElement = function () { return this }; r(C.prototype, {
            opacity: 1, SVG_NS: I, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "), init: function (b, h) {
            this.element = "span" ===
                h ? x(h) : q.createElementNS(this.SVG_NS, h); this.renderer = b; a.fireEvent(this, "afterInit")
            }, animate: function (b, h, c) { h = a.animObject(E(h, this.renderer.globalAnimation, !0)); E(q.hidden, q.msHidden, q.webkitHidden, !1) && (h.duration = 0); 0 !== h.duration ? (c && (h.complete = c), n(this, b, h)) : (this.attr(b, null, c), h.step && h.step.call(this)); return this }, complexColor: function (h, c, k) {
                var A = this.renderer, K, m, d, f, r, e, u, q, I, y, J, E = [], G; a.fireEvent(this.renderer, "complexColor", { args: arguments }, function () {
                    h.radialGradient ? m = "radialGradient" :
                    h.linearGradient && (m = "linearGradient"); m && (d = h[m], r = A.gradients, u = h.stops, y = k.radialReference, l(d) && (h[m] = d = { x1: d[0], y1: d[1], x2: d[2], y2: d[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === m && y && !p(d.gradientUnits) && (f = d, d = b(d, A.getRadialAttr(y, f), { gradientUnits: "userSpaceOnUse" })), z(d, function (b, a) { "id" !== a && E.push(a, b) }), z(u, function (b) { E.push(b) }), E = E.join(","), r[E] ? J = r[E].attr("id") : (d.id = J = a.uniqueKey(), r[E] = e = A.createElement(m).attr(d).add(A.defs), e.radAttr = f, e.stops = [], u.forEach(function (b) {
                        0 ===
                        b[1].indexOf("rgba") ? (K = a.color(b[1]), q = K.get("rgb"), I = K.get("a")) : (q = b[1], I = 1); b = A.createElement("stop").attr({ offset: b[0], "stop-color": q, "stop-opacity": I }).add(e); e.stops.push(b)
                    })), G = "url(" + A.url + "#" + J + ")", k.setAttribute(c, G), k.gradient = E, h.toString = function () { return G })
                })
            }, applyTextOutline: function (b) {
                var h = this.element, k, A, d, m, K; -1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(h.style.fill))); b = b.split(" "); A = b[b.length - 1]; if ((d = b[0]) && "none" !== d && a.svg) {
                this.fakeTS =
                    !0; b = [].slice.call(h.getElementsByTagName("tspan")); this.ySetter = this.xSetter; d = d.replace(/(^[\d\.]+)(.*?)$/g, function (b, a, h) { return 2 * a + h }); for (K = b.length; K--;)k = b[K], "highcharts-text-outline" === k.getAttribute("class") && c(b, h.removeChild(k)); m = h.firstChild; b.forEach(function (b, a) {
                    0 === a && (b.setAttribute("x", h.getAttribute("x")), a = h.getAttribute("y"), b.setAttribute("y", a || 0), null === a && h.setAttribute("y", 0)); b = b.cloneNode(1); g(b, { "class": "highcharts-text-outline", fill: A, stroke: A, "stroke-width": d, "stroke-linejoin": "round" });
                        h.insertBefore(b, m)
                    })
                }
            }, symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "), attr: function (b, h, c, k) {
                var A, d = this.element, m, K = this, l, f, r = this.symbolCustomAttribs; "string" === typeof b && void 0 !== h && (A = b, b = {}, b[A] = h); "string" === typeof b ? K = (this[b + "Getter"] || this._defaultGetter).call(this, b, d) : (z(b, function (h, c) {
                    l = !1; k || J(this, c); this.symbolName && -1 !== a.inArray(c, r) && (m || (this.symbolAttr(b), m = !0), l = !0); !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0); l || (f =
                        this[c + "Setter"] || this._defaultSetter, f.call(this, h, c, d), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, h, f))
                }, this), this.afterSetters()); c && c.call(this); return K
            }, afterSetters: function () { this.doTransform && (this.updateTransform(), this.doTransform = !1) }, updateShadows: function (b, a, h) { for (var c = this.shadows, k = c.length; k--;)h.call(c[k], "height" === b ? Math.max(a - (c[k].cutHeight || 0), 0) : "d" === b ? this.d : a, b, c[k]) }, addClass: function (b, a) {
                var h =
                    this.attr("class") || ""; -1 === h.indexOf(b) && (a || (b = (h + (h ? " " : "") + b).replace("  ", " ")), this.attr("class", b)); return this
            }, hasClass: function (b) { return -1 !== (this.attr("class") || "").split(" ").indexOf(b) }, removeClass: function (b) { return this.attr("class", (this.attr("class") || "").replace(b, "")) }, symbolAttr: function (b) { var a = this; "x y r start end width height innerR anchorX anchorY".split(" ").forEach(function (h) { a[h] = E(b[h], a[h]) }); a.attr({ d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a) }) },
            clip: function (b) { return this.attr("clip-path", b ? "url(" + this.renderer.url + "#" + b.id + ")" : "none") }, crisp: function (b, a) { var h; a = a || b.strokeWidth || 0; h = Math.round(a) % 2 / 2; b.x = Math.floor(b.x || this.x || 0) + h; b.y = Math.floor(b.y || this.y || 0) + h; b.width = Math.floor((b.width || this.width || 0) - 2 * h); b.height = Math.floor((b.height || this.height || 0) - 2 * h); p(b.strokeWidth) && (b.strokeWidth = a); return b }, css: function (b) {
                var a = this.styles, c = {}, k = this.element, A, d = "", m, l = !a, f = ["textOutline", "textOverflow", "width"]; b && b.color && (b.fill =
                    b.color); a && z(b, function (b, h) { b !== a[h] && (c[h] = b, l = !0) }); l && (a && (b = r(a, c)), b && (null === b.width || "auto" === b.width ? delete this.textWidth : "text" === k.nodeName.toLowerCase() && b.width && (A = this.textWidth = h(b.width))), this.styles = b, A && !W && this.renderer.forExport && delete b.width, k.namespaceURI === this.SVG_NS ? (m = function (b, a) { return "-" + a.toLowerCase() }, z(b, function (b, a) { -1 === f.indexOf(a) && (d += a.replace(/([A-Z])/g, m) + ":" + b + ";") }), d && g(k, "style", d)) : v(k, b), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this),
                        b && b.textOutline && this.applyTextOutline(b.textOutline))); return this
            }, getStyle: function (b) { return S.getComputedStyle(this.element || this, "").getPropertyValue(b) }, strokeWidth: function () { if (!this.renderer.styledMode) return this["stroke-width"] || 0; var b = this.getStyle("stroke-width"), a; b.indexOf("px") === b.length - 2 ? b = h(b) : (a = q.createElementNS(I, "rect"), g(a, { width: b, "stroke-width": 0 }), this.element.parentNode.appendChild(a), b = a.getBBox().width, a.parentNode.removeChild(a)); return b }, on: function (b, a) {
                var h =
                    this, c = h.element; m && "click" === b ? (c.ontouchstart = function (b) { h.touchEventFired = Date.now(); b.preventDefault(); a.call(c, b) }, c.onclick = function (b) { (-1 === S.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (h.touchEventFired || 0)) && a.call(c, b) }) : c["on" + b] = a; return this
            }, setRadialReference: function (b) { var a = this.renderer.gradients[this.element.gradient]; this.element.radialReference = b; a && a.radAttr && a.animate(this.renderer.getRadialAttr(b, a.radAttr)); return this }, translate: function (b, a) {
                return this.attr({
                    translateX: b,
                    translateY: a
                })
            }, invert: function (b) { this.inverted = b; this.updateTransform(); return this }, updateTransform: function () {
                var b = this.translateX || 0, a = this.translateY || 0, h = this.scaleX, c = this.scaleY, k = this.inverted, A = this.rotation, d = this.matrix, m = this.element; k && (b += this.width, a += this.height); b = ["translate(" + b + "," + a + ")"]; p(d) && b.push("matrix(" + d.join(",") + ")"); k ? b.push("rotate(90) scale(-1,1)") : A && b.push("rotate(" + A + " " + E(this.rotationOriginX, m.getAttribute("x"), 0) + " " + E(this.rotationOriginY, m.getAttribute("y") ||
                    0) + ")"); (p(h) || p(c)) && b.push("scale(" + E(h, 1) + " " + E(c, 1) + ")"); b.length && m.setAttribute("transform", b.join(" "))
            }, toFront: function () { var b = this.element; b.parentNode.appendChild(b); return this }, align: function (b, a, h) {
                var k, A, d, m, l = {}; A = this.renderer; d = A.alignedObjects; var f, z; if (b) { if (this.alignOptions = b, this.alignByTranslate = a, !h || D(h)) this.alignTo = k = h || "renderer", c(d, this), d.push(this), h = null } else b = this.alignOptions, a = this.alignByTranslate, k = this.alignTo; h = E(h, A[k], A); k = b.align; A = b.verticalAlign; d =
                    (h.x || 0) + (b.x || 0); m = (h.y || 0) + (b.y || 0); "right" === k ? f = 1 : "center" === k && (f = 2); f && (d += (h.width - (b.width || 0)) / f); l[a ? "translateX" : "x"] = Math.round(d); "bottom" === A ? z = 1 : "middle" === A && (z = 2); z && (m += (h.height - (b.height || 0)) / z); l[a ? "translateY" : "y"] = Math.round(m); this[this.placed ? "animate" : "attr"](l); this.placed = !0; this.alignAttr = l; return this
            }, getBBox: function (b, a) {
                var h, c = this.renderer, k, A = this.element, d = this.styles, m, l = this.textStr, f, z = c.cache, u = c.cacheKeys, K = A.namespaceURI === this.SVG_NS, q; a = E(a, this.rotation);
                k = a * e; m = c.styledMode ? A && C.prototype.getStyle.call(A, "font-size") : d && d.fontSize; p(l) && (q = l.toString(), -1 === q.indexOf("\x3c") && (q = q.replace(/[0-9]/g, "0")), q += ["", a || 0, m, this.textWidth, d && d.textOverflow].join()); q && !b && (h = z[q]); if (!h) {
                    if (K || c.forExport) {
                        try { (f = this.fakeTS && function (b) { [].forEach.call(A.querySelectorAll(".highcharts-text-outline"), function (a) { a.style.display = b }) }) && f("none"), h = A.getBBox ? r({}, A.getBBox()) : { width: A.offsetWidth, height: A.offsetHeight }, f && f("") } catch (Y) { } if (!h || 0 > h.width) h =
                            { width: 0, height: 0 }
                    } else h = this.htmlGetBBox(); c.isSVG && (b = h.width, c = h.height, K && (h.height = c = { "11px,17": 14, "13px,20": 16 }[d && d.fontSize + "," + Math.round(c)] || c), a && (h.width = Math.abs(c * Math.sin(k)) + Math.abs(b * Math.cos(k)), h.height = Math.abs(c * Math.cos(k)) + Math.abs(b * Math.sin(k)))); if (q && 0 < h.height) { for (; 250 < u.length;)delete z[u.shift()]; z[q] || u.push(q); z[q] = h }
                } return h
            }, show: function (b) { return this.attr({ visibility: b ? "inherit" : "visible" }) }, hide: function () { return this.attr({ visibility: "hidden" }) }, fadeOut: function (b) {
                var a =
                    this; a.animate({ opacity: 0 }, { duration: b || 150, complete: function () { a.attr({ y: -9999 }) } })
            }, add: function (b) { var a = this.renderer, h = this.element, c; b && (this.parentGroup = b); this.parentInverted = b && b.inverted; void 0 !== this.textStr && a.buildText(this); this.added = !0; if (!b || b.handleZ || this.zIndex) c = this.zIndexSetter(); c || (b ? b.element : a.box).appendChild(h); if (this.onAdd) this.onAdd(); return this }, safeRemoveChild: function (b) { var a = b.parentNode; a && a.removeChild(b) }, destroy: function () {
                var b = this, a = b.element || {}, h = b.renderer,
                k = h.isSVG && "SPAN" === a.nodeName && b.parentGroup, A = a.ownerSVGElement, d = b.clipPath; a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null; J(b); d && A && ([].forEach.call(A.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) { var a = b.getAttribute("clip-path"), h = d.element.id; (-1 < a.indexOf("(#" + h + ")") || -1 < a.indexOf('("#' + h + '")')) && b.removeAttribute("clip-path") }), b.clipPath = d.destroy()); if (b.stops) { for (A = 0; A < b.stops.length; A++)b.stops[A] = b.stops[A].destroy(); b.stops = null } b.safeRemoveChild(a); for (h.styledMode ||
                    b.destroyShadows(); k && k.div && 0 === k.div.childNodes.length;)a = k.parentGroup, b.safeRemoveChild(k.div), delete k.div, k = a; b.alignTo && c(h.alignedObjects, b); z(b, function (a, h) { delete b[h] }); return null
            }, shadow: function (b, a, h) {
                var c = [], k, A, d = this.element, m, l, f, z; if (!b) this.destroyShadows(); else if (!this.shadows) {
                    l = E(b.width, 3); f = (b.opacity || .15) / l; z = this.parentInverted ? "(-1,-1)" : "(" + E(b.offsetX, 1) + ", " + E(b.offsetY, 1) + ")"; for (k = 1; k <= l; k++)A = d.cloneNode(0), m = 2 * l + 1 - 2 * k, g(A, {
                        stroke: b.color || "#000000", "stroke-opacity": f *
                            k, "stroke-width": m, transform: "translate" + z, fill: "none"
                    }), A.setAttribute("class", (A.getAttribute("class") || "") + " highcharts-shadow"), h && (g(A, "height", Math.max(g(A, "height") - m, 0)), A.cutHeight = m), a ? a.element.appendChild(A) : d.parentNode && d.parentNode.insertBefore(A, d), c.push(A); this.shadows = c
                } return this
            }, destroyShadows: function () { (this.shadows || []).forEach(function (b) { this.safeRemoveChild(b) }, this); this.shadows = void 0 }, xGetter: function (b) {
            "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b =
                "cy")); return this._defaultGetter(b)
            }, _defaultGetter: function (b) { b = E(this[b + "Value"], this[b], this.element ? this.element.getAttribute(b) : null, 0); /^[\-0-9\.]+$/.test(b) && (b = parseFloat(b)); return b }, dSetter: function (b, a, h) { b && b.join && (b = b.join(" ")); /(NaN| {2}|^$)/.test(b) && (b = "M 0 0"); this[a] !== b && (h.setAttribute(a, b), this[a] = b) }, dashstyleSetter: function (b) {
                var a, c = this["stroke-width"]; "inherit" === c && (c = 1); if (b = b && b.toLowerCase()) {
                    b = b.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot",
                        "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (a = b.length; a--;)b[a] = h(b[a]) * c; b = b.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray", b)
                }
            }, alignSetter: function (b) { this.alignValue = b; this.element.setAttribute("text-anchor", { left: "start", center: "middle", right: "end" }[b]) }, opacitySetter: function (b, a, h) { this[a] = b; h.setAttribute(a, b) }, titleSetter: function (b) {
                var a =
                    this.element.getElementsByTagName("title")[0]; a || (a = q.createElementNS(this.SVG_NS, "title"), this.element.appendChild(a)); a.firstChild && a.removeChild(a.firstChild); a.appendChild(q.createTextNode(String(E(b), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            }, textSetter: function (b) { b !== this.textStr && (delete this.bBox, this.textStr = b, this.added && this.renderer.buildText(this)) }, fillSetter: function (b, a, h) { "string" === typeof b ? h.setAttribute(a, b) : b && this.complexColor(b, a, h) }, visibilitySetter: function (b,
                a, h) { "inherit" === b ? h.removeAttribute(a) : this[a] !== b && h.setAttribute(a, b); this[a] = b }, zIndexSetter: function (b, a) {
                    var c = this.renderer, k = this.parentGroup, A = (k || c).element || c.box, d, m = this.element, l, f, c = A === c.box; d = this.added; var z; p(b) ? (m.setAttribute("data-z-index", b), b = +b, this[a] === b && (d = !1)) : p(this[a]) && m.removeAttribute("data-z-index"); this[a] = b; if (d) {
                    (b = this.zIndex) && k && (k.handleZ = !0); a = A.childNodes; for (z = a.length - 1; 0 <= z && !l; z--)if (k = a[z], d = k.getAttribute("data-z-index"), f = !p(d), k !== m) if (0 > b && f &&
                        !c && !z) A.insertBefore(m, a[z]), l = !0; else if (h(d) <= b || f && (!p(b) || 0 <= b)) A.insertBefore(m, a[z + 1] || null), l = !0; l || (A.insertBefore(m, a[c ? 3 : 0] || null), l = !0)
                    } return l
                }, _defaultSetter: function (b, a, h) { h.setAttribute(a, b) }
        }); C.prototype.yGetter = C.prototype.xGetter; C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter =
            function (b, a) { this[a] = b; this.doTransform = !0 }; C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (b, a, h) { this[a] = b; this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", h), h.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === a && 0 === b && this.hasStroke && (h.removeAttribute("stroke"), this.hasStroke = !1) }; B = a.SVGRenderer = function () { this.init.apply(this, arguments) }; r(B.prototype, {
                Element: C, SVG_NS: I, init: function (b, a, h, c,
                    k, A, m) {
                        var l; l = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }); m || l.css(this.getStyle(c)); c = l.element; b.appendChild(c); g(b, "dir", "ltr"); -1 === b.innerHTML.indexOf("xmlns") && g(c, "xmlns", this.SVG_NS); this.isSVG = !0; this.box = c; this.boxWrapper = l; this.alignedObjects = []; this.url = (d || y) && q.getElementsByTagName("base").length ? S.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(q.createTextNode("Created with Highstock 7.0.2"));
                    this.defs = this.createElement("defs").add(); this.allowHTML = A; this.forExport = k; this.styledMode = m; this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.setSize(a, h, !1); var f; d && b.getBoundingClientRect && (a = function () { v(b, { left: 0, top: 0 }); f = b.getBoundingClientRect(); v(b, { left: Math.ceil(f.left) - f.left + "px", top: Math.ceil(f.top) - f.top + "px" }) }, a(), this.unSubPixelFix = F(S, "resize", a))
                }, definition: function (b) {
                    function a(b, c) {
                        var k; M(b).forEach(function (b) {
                            var A = h.createElement(b.tagName), d = {};
                            z(b, function (b, a) { "tagName" !== a && "children" !== a && "textContent" !== a && (d[a] = b) }); A.attr(d); A.add(c || h.defs); b.textContent && A.element.appendChild(q.createTextNode(b.textContent)); a(b.children || [], A); k = A
                        }); return k
                    } var h = this; return a(b)
                }, getStyle: function (b) { return this.style = r({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, b) }, setStyle: function (b) { this.boxWrapper.css(this.getStyle(b)) }, isHidden: function () { return !this.boxWrapper.getBBox().width }, destroy: function () {
                    var b =
                        this.defs; this.box = null; this.boxWrapper = this.boxWrapper.destroy(); f(this.gradients || {}); this.gradients = null; b && (this.defs = b.destroy()); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null
                }, createElement: function (b) { var a = new this.Element; a.init(this, b); return a }, draw: k, getRadialAttr: function (b, a) { return { cx: b[0] - b[2] / 2 + a.cx * b[2], cy: b[1] - b[2] / 2 + a.cy * b[2], r: a.r * b[2] } }, truncate: function (b, a, h, c, k, A, d) {
                    var m = this, l = b.rotation, f, z = c ? 1 : 0, r = (h || c).length, e = r, u = [], p = function (b) {
                    a.firstChild &&
                        a.removeChild(a.firstChild); b && a.appendChild(q.createTextNode(b))
                    }, I = function (A, l) { l = l || A; if (void 0 === u[l]) if (a.getSubStringLength) try { u[l] = k + a.getSubStringLength(0, c ? l + 1 : l) } catch (ea) { } else m.getSpanWidth && (p(d(h || c, A)), u[l] = k + m.getSpanWidth(b, a)); return u[l] }, y, J; b.rotation = 0; y = I(a.textContent.length); if (J = k + y > A) { for (; z <= r;)e = Math.ceil((z + r) / 2), c && (f = d(c, e)), y = I(e, f && f.length - 1), z === r ? z = r + 1 : y > A ? r = e - 1 : z = e; 0 === r ? p("") : h && r === h.length - 1 || p(f || d(h || c, e)) } c && c.splice(0, e); b.actualWidth = y; b.rotation = l;
                    return J
                }, escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;" }, buildText: function (b) {
                    var a = b.element, c = this, k = c.forExport, A = E(b.textStr, "").toString(), d = -1 !== A.indexOf("\x3c"), m = a.childNodes, l, f = g(a, "x"), r = b.styles, e = b.textWidth, u = r && r.lineHeight, p = r && r.textOutline, y = r && "ellipsis" === r.textOverflow, J = r && "nowrap" === r.whiteSpace, G = r && r.fontSize, M, K, D = m.length, r = e && !b.added && this.box, P = function (b) {
                        var k; c.styledMode || (k = /(px|em)$/.test(b && b.style.fontSize) ? b.style.fontSize :
                            G || c.style.fontSize || 12); return u ? h(u) : c.fontMetrics(k, b.getAttribute("style") ? b : a).h
                    }, n = function (b, a) { z(c.escapes, function (h, c) { a && -1 !== a.indexOf(h) || (b = b.toString().replace(new RegExp(h, "g"), c)) }); return b }, x = function (b, a) { var h; h = b.indexOf("\x3c"); b = b.substring(h, b.indexOf("\x3e") - h); h = b.indexOf(a + "\x3d"); if (-1 !== h && (h = h + a.length + 1, a = b.charAt(h), '"' === a || "'" === a)) return b = b.substring(h + 1), b.substring(0, b.indexOf(a)) }; M = [A, y, J, u, p, G, e].join(); if (M !== b.textCache) {
                        for (b.textCache = M; D--;)a.removeChild(m[D]);
                        d || p || y || e || -1 !== A.indexOf(" ") ? (r && r.appendChild(a), d ? (A = c.styledMode ? A.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : A.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'), A = A.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g)) : A = [A], A = A.filter(function (b) { return "" !== b }), A.forEach(function (h,
                            A) {
                                var d, m = 0, z = 0; h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||"); d = h.split("|||"); d.forEach(function (h) {
                                    if ("" !== h || 1 === d.length) {
                                        var r = {}, u = q.createElementNS(c.SVG_NS, "tspan"), p, E; (p = x(h, "class")) && g(u, "class", p); if (p = x(h, "style")) p = p.replace(/(;| |^)color([ :])/, "$1fill$2"), g(u, "style", p); (E = x(h, "href")) && !k && (g(u, "onclick", 'location.href\x3d"' + E + '"'), g(u, "class", "highcharts-anchor"), c.styledMode || v(u, { cursor: "pointer" })); h = n(h.replace(/<[a-zA-Z\/](.|\n)*?>/g,
                                            "") || " "); if (" " !== h) {
                                                u.appendChild(q.createTextNode(h)); m ? r.dx = 0 : A && null !== f && (r.x = f); g(u, r); a.appendChild(u); !m && K && (!W && k && v(u, { display: "block" }), g(u, "dy", P(u))); if (e) {
                                                    var M = h.replace(/([^\^])-/g, "$1- ").split(" "), r = !J && (1 < d.length || A || 1 < M.length); E = 0; var D = P(u); if (y) l = c.truncate(b, u, h, void 0, 0, Math.max(0, e - parseInt(G || 12, 10)), function (b, a) { return b.substring(0, a) + "\u2026" }); else if (r) for (; M.length;)M.length && !J && 0 < E && (u = q.createElementNS(I, "tspan"), g(u, { dy: D, x: f }), p && g(u, "style", p), u.appendChild(q.createTextNode(M.join(" ").replace(/- /g,
                                                        "-"))), a.appendChild(u)), c.truncate(b, u, null, M, 0 === E ? z : 0, e, function (b, a) { return M.slice(0, a).join(" ").replace(/- /g, "-") }), z = b.actualWidth, E++
                                                } m++
                                            }
                                    }
                                }); K = K || a.childNodes.length
                        }), y && l && b.attr("title", n(b.textStr, ["\x26lt;", "\x26gt;"])), r && r.removeChild(a), p && b.applyTextOutline && b.applyTextOutline(p)) : a.appendChild(q.createTextNode(n(A)))
                    }
                }, getContrast: function (b) { b = w(b).rgba; b[0] *= 1; b[1] *= 1.2; b[2] *= .5; return 459 < b[0] + b[1] + b[2] ? "#000000" : "#FFFFFF" }, button: function (a, h, c, k, A, d, m, l, f) {
                    var z = this.label(a,
                        h, c, f, null, null, null, null, "button"), e = 0, q = this.styledMode; z.attr(b({ padding: 8, r: 2 }, A)); if (!q) { var p, I, y, J; A = b({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, A); p = A.style; delete A.style; d = b(A, { fill: "#e6e6e6" }, d); I = d.style; delete d.style; m = b(A, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, m); y = m.style; delete m.style; l = b(A, { style: { color: "#cccccc" } }, l); J = l.style; delete l.style } F(z.element, u ? "mouseover" : "mouseenter", function () {
                        3 !==
                            e && z.setState(1)
                        }); F(z.element, u ? "mouseout" : "mouseleave", function () { 3 !== e && z.setState(e) }); z.setState = function (b) { 1 !== b && (z.state = e = b); z.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b || 0]); q || z.attr([A, d, m, l][b || 0]).css([p, I, y, J][b || 0]) }; q || z.attr(A).css(r({ cursor: "default" }, p)); return z.on("click", function (b) { 3 !== e && k.call(z, b) })
                }, crispLine: function (b, a) {
                b[1] === b[4] && (b[1] = b[4] = Math.round(b[1]) - a % 2 / 2); b[2] ===
                    b[5] && (b[2] = b[5] = Math.round(b[2]) + a % 2 / 2); return b
                }, path: function (b) { var a = this.styledMode ? {} : { fill: "none" }; l(b) ? a.d = b : G(b) && r(a, b); return this.createElement("path").attr(a) }, circle: function (b, a, h) { b = G(b) ? b : void 0 === b ? {} : { x: b, y: a, r: h }; a = this.createElement("circle"); a.xSetter = a.ySetter = function (b, a, h) { h.setAttribute("c" + a, b) }; return a.attr(b) }, arc: function (b, a, h, c, k, A) { G(b) ? (c = b, a = c.y, h = c.r, b = c.x) : c = { innerR: c, start: k, end: A }; b = this.symbol("arc", b, a, h, h, c); b.r = h; return b }, rect: function (b, a, h, c, k, A) {
                    k =
                    G(b) ? b.r : k; var d = this.createElement("rect"); b = G(b) ? b : void 0 === b ? {} : { x: b, y: a, width: Math.max(h, 0), height: Math.max(c, 0) }; this.styledMode || (void 0 !== A && (b.strokeWidth = A, b = d.crisp(b)), b.fill = "none"); k && (b.r = k); d.rSetter = function (b, a, h) { g(h, { rx: b, ry: b }) }; return d.attr(b)
                }, setSize: function (b, a, h) {
                    var c = this.alignedObjects, k = c.length; this.width = b; this.height = a; for (this.boxWrapper.animate({ width: b, height: a }, {
                        step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: E(h,
                            !0) ? void 0 : 0
                    }); k--;)c[k].align()
                }, g: function (b) { var a = this.createElement("g"); return b ? a.attr({ "class": "highcharts-" + b }) : a }, image: function (b, a, h, c, k, A) {
                    var d = { preserveAspectRatio: "none" }, m, l = function (b, a) { b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : b.setAttribute("hc-svg-href", a) }, z = function (a) { l(m.element, b); A.call(m, a) }; 1 < arguments.length && r(d, { x: a, y: h, width: c, height: k }); m = this.createElement("image").attr(d); A ? (l(m.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),
                        d = new S.Image, F(d, "load", z), d.src = b, d.complete && z({})) : l(m.element, b); return m
                }, symbol: function (b, a, h, c, k, A) {
                    var d = this, m, l = /^url\((.*?)\)$/, z = l.test(b), f = !z && (this.symbols[b] ? b : "circle"), u = f && this.symbols[f], e = p(a) && u && u.call(this.symbols, Math.round(a), Math.round(h), c, k, A), I, y; u ? (m = this.path(e), d.styledMode || m.attr("fill", "none"), r(m, { symbolName: f, x: a, y: h, width: c, height: k }), A && r(m, A)) : z && (I = b.match(l)[1], m = this.image(I), m.imgwidth = E(P[I] && P[I].width, A && A.width), m.imgheight = E(P[I] && P[I].height, A &&
                        A.height), y = function () { m.attr({ width: m.width, height: m.height }) }, ["width", "height"].forEach(function (b) { m[b + "Setter"] = function (b, a) { var h = {}, c = this["img" + a], k = "width" === a ? "translateX" : "translateY"; this[a] = b; p(c) && (this.element && this.element.setAttribute(a, c), this.alignByTranslate || (h[k] = ((this[a] || 0) - c) / 2, this.attr(h))) } }), p(a) && m.attr({ x: a, y: h }), m.isImg = !0, p(m.imgwidth) && p(m.imgheight) ? y() : (m.attr({ width: 0, height: 0 }), x("img", {
                            onload: function () {
                                var b = t[d.chartIndex]; 0 === this.width && (v(this, {
                                    position: "absolute",
                                    top: "-999em"
                                }), q.body.appendChild(this)); P[I] = { width: this.width, height: this.height }; m.imgwidth = this.width; m.imgheight = this.height; m.element && y(); this.parentNode && this.parentNode.removeChild(this); d.imgCount--; if (!d.imgCount && b && b.onload) b.onload()
                            }, src: I
                        }), this.imgCount++)); return m
                }, symbols: {
                    circle: function (b, a, h, c) { return this.arc(b + h / 2, a + c / 2, h / 2, c / 2, { start: 0, end: 2 * Math.PI, open: !1 }) }, square: function (b, a, h, c) { return ["M", b, a, "L", b + h, a, b + h, a + c, b, a + c, "Z"] }, triangle: function (b, a, h, c) {
                        return ["M", b + h /
                            2, a, "L", b + h, a + c, b, a + c, "Z"]
                    }, "triangle-down": function (b, a, h, c) { return ["M", b, a, "L", b + h, a, b + h / 2, a + c, "Z"] }, diamond: function (b, a, h, c) { return ["M", b + h / 2, a, "L", b + h, a + c / 2, b + h / 2, a + c, b, a + c / 2, "Z"] }, arc: function (b, a, h, c, k) {
                        var A = k.start, d = k.r || h, m = k.r || c || h, l = k.end - .001; h = k.innerR; c = E(k.open, .001 > Math.abs(k.end - k.start - 2 * Math.PI)); var z = Math.cos(A), f = Math.sin(A), r = Math.cos(l), l = Math.sin(l); k = .001 > k.end - A - Math.PI ? 0 : 1; d = ["M", b + d * z, a + m * f, "A", d, m, 0, k, 1, b + d * r, a + m * l]; p(h) && d.push(c ? "M" : "L", b + h * r, a + h * l, "A", h, h, 0, k, 0,
                            b + h * z, a + h * f); d.push(c ? "" : "Z"); return d
                    }, callout: function (b, a, h, c, k) {
                        var A = Math.min(k && k.r || 0, h, c), d = A + 6, m = k && k.anchorX; k = k && k.anchorY; var l; l = ["M", b + A, a, "L", b + h - A, a, "C", b + h, a, b + h, a, b + h, a + A, "L", b + h, a + c - A, "C", b + h, a + c, b + h, a + c, b + h - A, a + c, "L", b + A, a + c, "C", b, a + c, b, a + c, b, a + c - A, "L", b, a + A, "C", b, a, b, a, b + A, a]; m && m > h ? k > a + d && k < a + c - d ? l.splice(13, 3, "L", b + h, k - 6, b + h + 6, k, b + h, k + 6, b + h, a + c - A) : l.splice(13, 3, "L", b + h, c / 2, m, k, b + h, c / 2, b + h, a + c - A) : m && 0 > m ? k > a + d && k < a + c - d ? l.splice(33, 3, "L", b, k + 6, b - 6, k, b, k - 6, b, a + A) : l.splice(33, 3,
                            "L", b, c / 2, m, k, b, c / 2, b, a + A) : k && k > c && m > b + d && m < b + h - d ? l.splice(23, 3, "L", m + 6, a + c, m, a + c + 6, m - 6, a + c, b + A, a + c) : k && 0 > k && m > b + d && m < b + h - d && l.splice(3, 3, "L", m - 6, a, m, a - 6, m + 6, a, h - A, a); return l
                    }
                }, clipRect: function (b, h, c, k) { var A = a.uniqueKey(), d = this.createElement("clipPath").attr({ id: A }).add(this.defs); b = this.rect(b, h, c, k, 0).add(d); b.id = A; b.clipPath = d; b.count = 0; return b }, text: function (b, a, h, c) {
                    var k = {}; if (c && (this.allowHTML || !this.forExport)) return this.html(b, a, h); k.x = Math.round(a || 0); h && (k.y = Math.round(h)); p(b) &&
                        (k.text = b); b = this.createElement("text").attr(k); c || (b.xSetter = function (b, a, h) { var c = h.getElementsByTagName("tspan"), k, A = h.getAttribute(a), d; for (d = 0; d < c.length; d++)k = c[d], k.getAttribute(a) === A && k.setAttribute(a, b); h.setAttribute(a, b) }); return b
                }, fontMetrics: function (b, a) {
                    b = !this.styledMode && /px/.test(b) || !S.getComputedStyle ? b || a && a.style && a.style.fontSize || this.style && this.style.fontSize : a && C.prototype.getStyle.call(a, "font-size"); b = /px/.test(b) ? h(b) : 12; a = 24 > b ? b + 3 : Math.round(1.2 * b); return {
                        h: a, b: Math.round(.8 *
                            a), f: b
                    }
                }, rotCorr: function (b, a, h) { var c = b; a && h && (c = Math.max(c * Math.cos(a * e), 4)); return { x: -b / 3 * Math.sin(a * e), y: c } }, label: function (h, c, k, d, m, l, z, f, u) {
                    var e = this, q = e.styledMode, I = e.g("button" !== u && "label"), y = I.text = e.text("", 0, 0, z).attr({ zIndex: 1 }), J, E, G = 0, M = 3, g = 0, D, P, W, n, x, S = {}, v, t, w = /^url\((.*?)\)$/.test(d), K = q || w, T = function () { return q ? J.strokeWidth() % 2 / 2 : (v ? parseInt(v, 10) : 0) % 2 / 2 }, aa, B, U; u && I.addClass("highcharts-" + u); aa = function () {
                        var b = y.element.style, a = {}; E = (void 0 === D || void 0 === P || x) && p(y.textStr) &&
                            y.getBBox(); I.width = (D || E.width || 0) + 2 * M + g; I.height = (P || E.height || 0) + 2 * M; t = M + Math.min(e.fontMetrics(b && b.fontSize, y).b, E ? E.height : Infinity); K && (J || (I.box = J = e.symbols[d] || w ? e.symbol(d) : e.rect(), J.addClass(("button" === u ? "" : "highcharts-label-box") + (u ? " highcharts-" + u + "-box" : "")), J.add(I), b = T(), a.x = b, a.y = (f ? -t : 0) + b), a.width = Math.round(I.width), a.height = Math.round(I.height), J.attr(r(a, S)), S = {})
                    }; B = function () {
                        var b = g + M, a; a = f ? 0 : t; p(D) && E && ("center" === x || "right" === x) && (b += { center: .5, right: 1 }[x] * (D - E.width));
                        if (b !== y.x || a !== y.y) y.attr("x", b), y.hasBoxWidthChanged && (E = y.getBBox(!0), aa()), void 0 !== a && y.attr("y", a); y.x = b; y.y = a
                    }; U = function (b, a) { J ? J.attr(b, a) : S[b] = a }; I.onAdd = function () { y.add(I); I.attr({ text: h || 0 === h ? h : "", x: c, y: k }); J && p(m) && I.attr({ anchorX: m, anchorY: l }) }; I.widthSetter = function (b) { D = a.isNumber(b) ? b : null }; I.heightSetter = function (b) { P = b }; I["text-alignSetter"] = function (b) { x = b }; I.paddingSetter = function (b) { p(b) && b !== M && (M = I.padding = b, B()) }; I.paddingLeftSetter = function (b) { p(b) && b !== g && (g = b, B()) }; I.alignSetter =
                        function (b) { b = { left: 0, center: .5, right: 1 }[b]; b !== G && (G = b, E && I.attr({ x: W })) }; I.textSetter = function (b) { void 0 !== b && y.textSetter(b); aa(); B() }; I["stroke-widthSetter"] = function (b, a) { b && (K = !0); v = this["stroke-width"] = b; U(a, b) }; q ? I.rSetter = function (b, a) { U(a, b) } : I.strokeSetter = I.fillSetter = I.rSetter = function (b, a) { "r" !== a && ("fill" === a && b && (K = !0), I[a] = b); U(a, b) }; I.anchorXSetter = function (b, a) { m = I.anchorX = b; U(a, Math.round(b) - T() - W) }; I.anchorYSetter = function (b, a) { l = I.anchorY = b; U(a, b - n) }; I.xSetter = function (b) {
                        I.x =
                            b; G && (b -= G * ((D || E.width) + 2 * M), I["forceAnimate:x"] = !0); W = Math.round(b); I.attr("translateX", W)
                        }; I.ySetter = function (b) { n = I.y = Math.round(b); I.attr("translateY", n) }; var F = I.css; z = {
                            css: function (a) { if (a) { var h = {}; a = b(a); I.textProps.forEach(function (b) { void 0 !== a[b] && (h[b] = a[b], delete a[b]) }); y.css(h); "width" in h && aa(); "fontSize" in h && (aa(), B()) } return F.call(I, a) }, getBBox: function () { return { width: E.width + 2 * M, height: E.height + 2 * M, x: E.x - M, y: E.y - M } }, destroy: function () {
                                A(I.element, "mouseenter"); A(I.element, "mouseleave");
                                y && (y = y.destroy()); J && (J = J.destroy()); C.prototype.destroy.call(I); I = e = aa = B = U = null
                            }
                        }; q || (z.shadow = function (b) { b && (aa(), J && J.shadow(b)); return I }); return r(I, z)
                }
            }); a.Renderer = B
    })(H); (function (a) {
        var C = a.attr, B = a.createElement, F = a.css, n = a.defined, g = a.extend, t = a.isFirefox, w = a.isMS, v = a.isWebKit, x = a.pick, p = a.pInt, e = a.SVGElement, f = a.SVGRenderer, q = a.win; g(e.prototype, {
            htmlCss: function (a) {
                var c = "SPAN" === this.element.tagName && a && "width" in a, m = x(c && a.width, void 0), l; c && (delete a.width, this.textWidth = m, l = !0);
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden"); this.styles = g(this.styles, a); F(this.element, a); l && this.htmlUpdateTransform(); return this
            }, htmlGetBBox: function () { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, c = this.element, m = this.translateX || 0, l = this.translateY || 0, d = this.x || 0, f = this.y || 0, e = this.textAlign || "left", q = { left: 0, center: .5, right: 1 }[e], y = this.styles,
                    b = y && y.whiteSpace; F(c, { marginLeft: m, marginTop: l }); !a.styledMode && this.shadows && this.shadows.forEach(function (b) { F(b, { marginLeft: m + 1, marginTop: l + 1 }) }); this.inverted && c.childNodes.forEach(function (b) { a.invertChild(b, c) }); if ("SPAN" === c.tagName) {
                        var y = this.rotation, k = this.textWidth && p(this.textWidth), z = [y, e, c.innerHTML, this.textWidth, this.textAlign].join(), E; (E = k !== this.oldTextWidth) && !(E = k > this.oldTextWidth) && ((E = this.textPxLength) || (F(c, { width: "", whiteSpace: b || "nowrap" }), E = c.offsetWidth), E = E > k); E &&
                            (/[ \-]/.test(c.textContent || c.innerText) || "ellipsis" === c.style.textOverflow) ? (F(c, { width: k + "px", display: "block", whiteSpace: b || "normal" }), this.oldTextWidth = k, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1; z !== this.cTT && (b = a.fontMetrics(c.style.fontSize, c).b, !n(y) || y === (this.oldRotation || 0) && e === this.oldAlign || this.setSpanRotation(y, q, b), this.getSpanCorrection(!n(y) && this.textPxLength || c.offsetWidth, b, q, y, e)); F(c, { left: d + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px" }); this.cTT = z; this.oldRotation =
                                y; this.oldAlign = e
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, c, m) { var l = {}, d = this.renderer.getTransformKey(); l[d] = l.transform = "rotate(" + a + "deg)"; l[d + (t ? "Origin" : "-origin")] = l.transformOrigin = 100 * c + "% " + m + "px"; F(this.element, l) }, getSpanCorrection: function (a, c, m) { this.xCorr = -a * m; this.yCorr = -c }
        }); g(f.prototype, {
            getTransformKey: function () { return w && !/Edge/.test(q.navigator.userAgent) ? "-ms-transform" : v ? "-webkit-transform" : t ? "MozTransform" : q.opera ? "-o-transform" : "" }, html: function (f, c, m) {
                var l =
                    this.createElement("span"), d = l.element, u = l.renderer, r = u.isSVG, q = function (b, a) { ["opacity", "visibility"].forEach(function (c) { b[c + "Setter"] = function (b, h, k) { e.prototype[c + "Setter"].call(this, b, h, k); a[h] = b } }); b.addedSetters = !0 }, p = a.charts[u.chartIndex], p = p && p.styledMode; l.textSetter = function (b) { b !== d.innerHTML && delete this.bBox; this.textStr = b; d.innerHTML = x(b, ""); l.doTransform = !0 }; r && q(l, l.element.style); l.xSetter = l.ySetter = l.alignSetter = l.rotationSetter = function (b, a) {
                    "align" === a && (a = "textAlign"); l[a] =
                        b; l.doTransform = !0
                    }; l.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; l.attr({ text: f, x: Math.round(c), y: Math.round(m) }).css({ position: "absolute" }); p || l.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); d.style.whiteSpace = "nowrap"; l.css = l.htmlCss; r && (l.add = function (b) {
                        var a, c = u.box.parentNode, m = []; if (this.parentGroup = b) {
                            if (a = b.div, !a) {
                                for (; b;)m.push(b), b = b.parentGroup; m.reverse().forEach(function (b) {
                                    function h(a, h) {
                                    b[h] = a; "translateX" ===
                                        h ? k.left = a + "px" : k.top = a + "px"; b.doTransform = !0
                                    } var k, d = C(b.element, "class"); d && (d = { className: d }); a = b.div = b.div || B("div", d, { position: "absolute", left: (b.translateX || 0) + "px", top: (b.translateY || 0) + "px", display: b.display, opacity: b.opacity, pointerEvents: b.styles && b.styles.pointerEvents }, a || c); k = a.style; g(b, { classSetter: function (b) { return function (a) { this.element.setAttribute("class", a); b.className = a } }(a), on: function () { m[0].div && l.on.apply({ element: m[0].div }, arguments); return b }, translateXSetter: h, translateYSetter: h });
                                    b.addedSetters || q(b, k)
                                })
                            }
                        } else a = c; a.appendChild(d); l.added = !0; l.alignOnAdd && l.htmlUpdateTransform(); return l
                    }); return l
            }
        })
    })(H); (function (a) {
        var C = a.defined, B = a.extend, F = a.merge, n = a.pick, g = a.timeUnits, t = a.win; a.Time = function (a) { this.update(a, !1) }; a.Time.prototype = {
            defaultOptions: {}, update: function (a) {
                var g = n(a && a.useUTC, !0), x = this; this.options = a = F(!0, this.options || {}, a); this.Date = a.Date || t.Date; this.timezoneOffset = (this.useUTC = g) && a.timezoneOffset; this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(g && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, e) { var f = e.getTime(), q = f - x.getTimezoneOffset(e); e.setTime(q); a = e["getUTC" + a](); e.setTime(f); return a }, this.set = function (a, e, f) { var q; if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === e.getTimezoneOffset() % 60) e["set" + a](f); else q = x.getTimezoneOffset(e), q = e.getTime() - q, e.setTime(q), e["setUTC" + a](f), a = x.getTimezoneOffset(e), q = e.getTime() + a, e.setTime(q) }) : g ? (this.get = function (a, e) {
                    return e["getUTC" +
                        a]()
                }, this.set = function (a, e, f) { return e["setUTC" + a](f) }) : (this.get = function (a, e) { return e["get" + a]() }, this.set = function (a, e, f) { return e["set" + a](f) })
            }, makeTime: function (g, t, x, p, e, f) { var q, r, c; this.useUTC ? (q = this.Date.UTC.apply(0, arguments), r = this.getTimezoneOffset(q), q += r, c = this.getTimezoneOffset(q), r !== c ? q += c - r : r - 36E5 !== this.getTimezoneOffset(q - 36E5) || a.isSafari || (q -= 36E5)) : q = (new this.Date(g, t, n(x, 1), n(p, 0), n(e, 0), n(f, 0))).getTime(); return q }, timezoneOffsetFunction: function () {
                var g = this, n = this.options,
                x = t.moment; if (!this.useUTC) return function (a) { return 6E4 * (new Date(a)).getTimezoneOffset() }; if (n.timezone) { if (x) return function (a) { return 6E4 * -x.tz(a, n.timezone).utcOffset() }; a.error(25) } return this.useUTC && n.getTimezoneOffset ? function (a) { return 6E4 * n.getTimezoneOffset(a) } : function () { return 6E4 * (g.timezoneOffset || 0) }
            }, dateFormat: function (g, n, x) {
                if (!a.defined(n) || isNaN(n)) return a.defaultOptions.lang.invalidDate || ""; g = a.pick(g, "%Y-%m-%d %H:%M:%S"); var p = this, e = new this.Date(n), f = this.get("Hours", e),
                    q = this.get("Day", e), r = this.get("Date", e), c = this.get("Month", e), m = this.get("FullYear", e), l = a.defaultOptions.lang, d = l.weekdays, u = l.shortWeekdays, G = a.pad, e = a.extend({ a: u ? u[q] : d[q].substr(0, 3), A: d[q], d: G(r), e: G(r, 2, " "), w: q, b: l.shortMonths[c], B: l.months[c], m: G(c + 1), o: c + 1, y: m.toString().substr(2, 2), Y: m, H: G(f), k: f, I: G(f % 12 || 12), l: f % 12 || 12, M: G(p.get("Minutes", e)), p: 12 > f ? "AM" : "PM", P: 12 > f ? "am" : "pm", S: G(e.getSeconds()), L: G(Math.floor(n % 1E3), 3) }, a.dateFormats); a.objectEach(e, function (a, c) {
                        for (; -1 !== g.indexOf("%" +
                            c);)g = g.replace("%" + c, "function" === typeof a ? a.call(p, n) : a)
                    }); return x ? g.substr(0, 1).toUpperCase() + g.substr(1) : g
            }, resolveDTLFormat: function (g) { return a.isObject(g, !0) ? g : (g = a.splat(g), { main: g[0], from: g[1], to: g[2] }) }, getTimeTicks: function (a, t, x, p) {
                var e = this, f = [], q, r = {}, c; q = new e.Date(t); var m = a.unitRange, l = a.count || 1, d; p = n(p, 1); if (C(t)) {
                    e.set("Milliseconds", q, m >= g.second ? 0 : l * Math.floor(e.get("Milliseconds", q) / l)); m >= g.second && e.set("Seconds", q, m >= g.minute ? 0 : l * Math.floor(e.get("Seconds", q) / l)); m >= g.minute &&
                        e.set("Minutes", q, m >= g.hour ? 0 : l * Math.floor(e.get("Minutes", q) / l)); m >= g.hour && e.set("Hours", q, m >= g.day ? 0 : l * Math.floor(e.get("Hours", q) / l)); m >= g.day && e.set("Date", q, m >= g.month ? 1 : Math.max(1, l * Math.floor(e.get("Date", q) / l))); m >= g.month && (e.set("Month", q, m >= g.year ? 0 : l * Math.floor(e.get("Month", q) / l)), c = e.get("FullYear", q)); m >= g.year && e.set("FullYear", q, c - c % l); m === g.week && (c = e.get("Day", q), e.set("Date", q, e.get("Date", q) - c + p + (c < p ? -7 : 0))); c = e.get("FullYear", q); p = e.get("Month", q); var u = e.get("Date", q), G = e.get("Hours",
                            q); t = q.getTime(); e.variableTimezone && (d = x - t > 4 * g.month || e.getTimezoneOffset(t) !== e.getTimezoneOffset(x)); t = q.getTime(); for (q = 1; t < x;)f.push(t), t = m === g.year ? e.makeTime(c + q * l, 0) : m === g.month ? e.makeTime(c, p + q * l) : !d || m !== g.day && m !== g.week ? d && m === g.hour && 1 < l ? e.makeTime(c, p, u, G + q * l) : t + m * l : e.makeTime(c, p, u + q * l * (m === g.day ? 1 : 7)), q++; f.push(t); m <= g.hour && 1E4 > f.length && f.forEach(function (a) { 0 === a % 18E5 && "000000000" === e.dateFormat("%H%M%S%L", a) && (r[a] = "day") })
                } f.info = B(a, { higherRanks: r, totalRange: m * l }); return f
            }
        }
    })(H);
    (function (a) {
        var C = a.color, B = a.merge; a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: {
                loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " "
            }, global: {}, time: a.Time.prototype.defaultOptions, chart: { styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" }, title: {
                text: "Chart title", align: "center",
                margin: 15, widthAdjust: -44
            }, subtitle: { text: "", align: "center", widthAdjust: -44 }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: {
                enabled: !0, align: "center", alignColumns: !0, layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" },
                shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } }
            }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: {
                enabled: !0, animation: a.svg, borderRadius: 3, dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y"
                }, footerFormat: "", padding: 8, snap: a.isTouchDevice ? 25 : 10, headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e', pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e', backgroundColor: C("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, shadow: !0, style: {
                    color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
        }; a.setOptions = function (C) { a.defaultOptions = B(!0, a.defaultOptions, C); a.time.update(B(a.defaultOptions.global, a.defaultOptions.time), !1); return a.defaultOptions }; a.getOptions = function () { return a.defaultOptions }; a.defaultPlotOptions = a.defaultOptions.plotOptions; a.time = new a.Time(B(a.defaultOptions.global,
            a.defaultOptions.time)); a.dateFormat = function (B, n, g) { return a.time.dateFormat(B, n, g) }
    })(H); (function (a) {
        var C = a.correctFloat, B = a.defined, F = a.destroyObjectProperties, n = a.fireEvent, g = a.isNumber, t = a.merge, w = a.pick, v = a.deg2rad; a.Tick = function (a, p, e, f, q) { this.axis = a; this.pos = p; this.type = e || ""; this.isNewLabel = this.isNew = !0; this.parameters = q || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options = this.parameters.options; e || f || this.addLabel() }; a.Tick.prototype = {
            addLabel: function () {
                var g = this,
                p = g.axis, e = p.options, f = p.chart, q = p.categories, r = p.names, c = g.pos, m = w(g.options && g.options.labels, e.labels), l = p.tickPositions, d = c === l[0], u = c === l[l.length - 1], q = this.parameters.category || (q ? w(q[c], r[c], c) : c), G = g.label, l = l.info, D, y, b, k; p.isDatetimeAxis && l && (y = f.time.resolveDTLFormat(e.dateTimeLabelFormats[!e.grid && l.higherRanks[c] || l.unitName]), D = y.main); g.isFirst = d; g.isLast = u; g.formatCtx = { axis: p, chart: f, isFirst: d, isLast: u, dateTimeLabelFormat: D, tickPositionInfo: l, value: p.isLog ? C(p.lin2log(q)) : q, pos: c };
                e = p.labelFormatter.call(g.formatCtx, this.formatCtx); if (k = y && y.list) g.shortenLabel = function () { for (b = 0; b < k.length; b++)if (G.attr({ text: p.labelFormatter.call(a.extend(g.formatCtx, { dateTimeLabelFormat: k[b] })) }), G.getBBox().width < p.getSlotWidth(g) - 2 * w(m.padding, 5)) return; G.attr({ text: "" }) }; if (B(G)) G && G.textStr !== e && (!G.textWidth || m.style && m.style.width || G.styles.width || G.css({ width: null }), G.attr({ text: e })); else {
                    if (g.label = G = B(e) && m.enabled ? f.renderer.text(e, 0, 0, m.useHTML).add(p.labelGroup) : null) f.styledMode ||
                        G.css(t(m.style)), G.textPxLength = G.getBBox().width; g.rotation = 0
                }
            }, getLabelSize: function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 }, handleOverflow: function (a) {
                var p = this.axis, e = p.options.labels, f = a.x, q = p.chart.chartWidth, r = p.chart.spacing, c = w(p.labelLeft, Math.min(p.pos, r[3])), r = w(p.labelRight, Math.max(p.isRadial ? 0 : p.pos + p.len, q - r[1])), m = this.label, l = this.rotation, d = { left: 0, center: .5, right: 1 }[p.labelAlign || m.attr("align")], u = m.getBBox().width, g = p.getSlotWidth(this),
                D = g, y = 1, b, k = {}; if (l || "justify" !== w(e.overflow, "justify")) 0 > l && f - d * u < c ? b = Math.round(f / Math.cos(l * v) - c) : 0 < l && f + d * u > r && (b = Math.round((q - f) / Math.cos(l * v))); else if (q = f + (1 - d) * u, f - d * u < c ? D = a.x + D * (1 - d) - c : q > r && (D = r - a.x + D * d, y = -1), D = Math.min(g, D), D < g && "center" === p.labelAlign && (a.x += y * (g - D - d * (g - Math.min(u, D)))), u > D || p.autoRotation && (m.styles || {}).width) b = D; b && (this.shortenLabel ? this.shortenLabel() : (k.width = Math.floor(b), (e.style || {}).textOverflow || (k.textOverflow = "ellipsis"), m.css(k)))
            }, getPosition: function (g,
                p, e, f) { var q = this.axis, r = q.chart, c = f && r.oldChartHeight || r.chartHeight; g = { x: g ? a.correctFloat(q.translate(p + e, null, null, f) + q.transB) : q.left + q.offset + (q.opposite ? (f && r.oldChartWidth || r.chartWidth) - q.right - q.left : 0), y: g ? c - q.bottom + q.offset - (q.opposite ? q.height : 0) : a.correctFloat(c - q.translate(p + e, null, null, f) - q.transB) }; n(this, "afterGetPosition", { pos: g }); return g }, getLabelPosition: function (a, p, e, f, q, r, c, m) {
                    var l = this.axis, d = l.transA, u = l.reversed, g = l.staggerLines, D = l.tickRotCorr || { x: 0, y: 0 }, y = q.y, b = f || l.reserveSpaceDefault ?
                        0 : -l.labelOffset * ("center" === l.labelAlign ? .5 : 1), k = {}; B(y) || (y = 0 === l.side ? e.rotation ? -8 : -e.getBBox().height : 2 === l.side ? D.y + 8 : Math.cos(e.rotation * v) * (D.y - e.getBBox(!1, 0).height / 2)); a = a + q.x + b + D.x - (r && f ? r * d * (u ? -1 : 1) : 0); p = p + y - (r && !f ? r * d * (u ? 1 : -1) : 0); g && (e = c / (m || 1) % g, l.opposite && (e = g - e - 1), p += l.labelOffset / g * e); k.x = a; k.y = Math.round(p); n(this, "afterGetLabelPosition", { pos: k, tickmarkOffset: r, index: c }); return k
                }, getMarkPath: function (a, p, e, f, q, r) { return r.crispLine(["M", a, p, "L", a + (q ? 0 : -e), p + (q ? e : 0)], f) }, renderGridLine: function (a,
                    p, e) {
                        var f = this.axis, q = f.options, r = this.gridLine, c = {}, m = this.pos, l = this.type, d = w(this.tickmarkOffset, f.tickmarkOffset), u = f.chart.renderer, g = l ? l + "Grid" : "grid", D = q[g + "LineWidth"], y = q[g + "LineColor"], q = q[g + "LineDashStyle"]; r || (f.chart.styledMode || (c.stroke = y, c["stroke-width"] = D, q && (c.dashstyle = q)), l || (c.zIndex = 1), a && (p = 0), this.gridLine = r = u.path().attr(c).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(f.gridGroup)); if (r && (e = f.getPlotLinePath(m + d, r.strokeWidth() * e, a, "pass"))) r[a || this.isNew ? "attr" :
                            "animate"]({ d: e, opacity: p })
                }, renderMark: function (a, p, e) { var f = this.axis, q = f.options, r = f.chart.renderer, c = this.type, m = c ? c + "Tick" : "tick", l = f.tickSize(m), d = this.mark, u = !d, g = a.x; a = a.y; var D = w(q[m + "Width"], !c && f.isXAxis ? 1 : 0), q = q[m + "Color"]; l && (f.opposite && (l[0] = -l[0]), u && (this.mark = d = r.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(f.axisGroup), f.chart.styledMode || d.attr({ stroke: q, "stroke-width": D })), d[u ? "attr" : "animate"]({ d: this.getMarkPath(g, a, l[0], d.strokeWidth() * e, f.horiz, r), opacity: p })) },
            renderLabel: function (a, p, e, f) {
                var q = this.axis, r = q.horiz, c = q.options, m = this.label, l = c.labels, d = l.step, q = w(this.tickmarkOffset, q.tickmarkOffset), u = !0, G = a.x; a = a.y; m && g(G) && (m.xy = a = this.getLabelPosition(G, a, m, r, l, q, f, d), this.isFirst && !this.isLast && !w(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !w(c.showLastLabel, 1) ? u = !1 : !r || l.step || l.rotation || p || 0 === e || this.handleOverflow(a), d && f % d && (u = !1), u && g(a.y) ? (a.opacity = e, m[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (m.attr("y", -9999), this.isNewLabel =
                    !0))
            }, render: function (g, p, e) { var f = this.axis, q = f.horiz, r = this.pos, c = w(this.tickmarkOffset, f.tickmarkOffset), r = this.getPosition(q, r, c, p), c = r.x, m = r.y, f = q && c === f.pos + f.len || !q && m === f.pos ? -1 : 1; e = w(e, 1); this.isActive = !0; this.renderGridLine(p, e, f); this.renderMark(r, e, f); this.renderLabel(r, p, e, g); this.isNew = !1; a.fireEvent(this, "afterRender") }, destroy: function () { F(this, this.axis) }
        }
    })(H); var da = function (a) {
        var C = a.addEvent, B = a.animObject, F = a.arrayMax, n = a.arrayMin, g = a.color, t = a.correctFloat, w = a.defaultOptions,
        v = a.defined, x = a.deg2rad, p = a.destroyObjectProperties, e = a.extend, f = a.fireEvent, q = a.format, r = a.getMagnitude, c = a.isArray, m = a.isNumber, l = a.isString, d = a.merge, u = a.normalizeTickInterval, G = a.objectEach, D = a.pick, y = a.removeEvent, b = a.splat, k = a.syncTimeout, z = a.Tick, E = function () { this.init.apply(this, arguments) }; a.extend(E.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" },
                    week: { main: "%e. %b" }, month: { main: "%b '%y" }, year: { main: "%Y" }
                }, endOnTick: !1, labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", style: { color: "#666666" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb",
                lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"
            }, defaultYAxisOptions: { endOnTick: !0, maxPadding: .05, minPadding: .05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { allowOverlap: !1, enabled: !1, formatter: function () { return a.numberFormat(this.total, -1) }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } }, defaultRightAxisOptions: {
                labels: { x: 15 },
                title: { rotation: 90 }
            }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, title: { rotation: 0 } }, init: function (a, c) {
                var h = c.isX, k = this; k.chart = a; k.horiz = a.inverted && !k.isZAxis ? !h : h; k.isXAxis = h; k.coll = k.coll || (h ? "xAxis" : "yAxis"); f(this, "init", { userOptions: c }); k.opposite = c.opposite; k.side = c.side || (k.horiz ? k.opposite ? 0 : 2 : k.opposite ? 1 : 3); k.setOptions(c); var A = this.options, d = A.type; k.labelFormatter = A.labels.formatter || k.defaultLabelFormatter;
                k.userOptions = c; k.minPixelPadding = 0; k.reversed = A.reversed; k.visible = !1 !== A.visible; k.zoomEnabled = !1 !== A.zoomEnabled; k.hasNames = "category" === d || !0 === A.categories; k.categories = A.categories || k.hasNames; k.names || (k.names = [], k.names.keys = {}); k.plotLinesAndBandsGroups = {}; k.isLog = "logarithmic" === d; k.isDatetimeAxis = "datetime" === d; k.positiveValuesOnly = k.isLog && !k.allowNegativeLog; k.isLinked = v(A.linkedTo); k.ticks = {}; k.labelEdge = []; k.minorTicks = {}; k.plotLinesAndBands = []; k.alternateBands = {}; k.len = 0; k.minRange =
                    k.userMinRange = A.minRange || A.maxZoom; k.range = A.range; k.offset = A.offset || 0; k.stacks = {}; k.oldStacks = {}; k.stacksTouched = 0; k.max = null; k.min = null; k.crosshair = D(A.crosshair, b(a.options.tooltip.crosshairs)[h ? 0 : 1], !1); c = k.options.events; -1 === a.axes.indexOf(k) && (h ? a.axes.splice(a.xAxis.length, 0, k) : a.axes.push(k), a[k.coll].push(k)); k.series = k.series || []; a.inverted && !k.isZAxis && h && void 0 === k.reversed && (k.reversed = !0); G(c, function (b, a) { C(k, a, b) }); k.lin2log = A.linearToLogConverter || k.lin2log; k.isLog && (k.val2lin =
                        k.log2lin, k.lin2val = k.lin2log); f(this, "afterInit")
            }, setOptions: function (b) { this.options = d(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], d(w[this.coll], b)); f(this, "afterSetOptions", { userOptions: b }) }, defaultLabelFormatter: function () {
                var b = this.axis, c = this.value, k = b.chart.time, d = b.categories, m = this.dateTimeLabelFormat, l = w.lang, f = l.numericSymbols, l = l.numericSymbolMagnitude ||
                    1E3, z = f && f.length, e, u = b.options.labels.format, b = b.isLog ? Math.abs(c) : b.tickInterval; if (u) e = q(u, this, k); else if (d) e = c; else if (m) e = k.dateFormat(m, c); else if (z && 1E3 <= b) for (; z-- && void 0 === e;)k = Math.pow(l, z + 1), b >= k && 0 === 10 * c % k && null !== f[z] && 0 !== c && (e = a.numberFormat(c / k, -1) + f[z]); void 0 === e && (e = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, "")); return e
            }, getSeriesExtremes: function () {
                var b = this, a = b.chart; f(this, "getSeriesExtremes", null, function () {
                b.hasVisibleSeries = !1; b.dataMin = b.dataMax =
                    b.threshold = null; b.softThreshold = !b.isXAxis; b.buildStacks && b.buildStacks(); b.series.forEach(function (h) {
                        if (h.visible || !a.options.chart.ignoreHiddenSeries) {
                            var c = h.options, k = c.threshold, A; b.hasVisibleSeries = !0; b.positiveValuesOnly && 0 >= k && (k = null); if (b.isXAxis) c = h.xData, c.length && (h = n(c), A = F(c), m(h) || h instanceof Date || (c = c.filter(m), h = n(c), A = F(c)), c.length && (b.dataMin = Math.min(D(b.dataMin, c[0], h), h), b.dataMax = Math.max(D(b.dataMax, c[0], A), A))); else if (h.getExtremes(), A = h.dataMax, h = h.dataMin, v(h) && v(A) &&
                                (b.dataMin = Math.min(D(b.dataMin, h), h), b.dataMax = Math.max(D(b.dataMax, A), A)), v(k) && (b.threshold = k), !c.softThreshold || b.positiveValuesOnly) b.softThreshold = !1
                        }
                    })
                }); f(this, "afterGetSeriesExtremes")
            }, translate: function (b, a, c, k, d, l) {
                var h = this.linkedParent || this, A = 1, f = 0, z = k ? h.oldTransA : h.transA; k = k ? h.oldMin : h.min; var e = h.minPixelPadding; d = (h.isOrdinal || h.isBroken || h.isLog && d) && h.lin2val; z || (z = h.transA); c && (A *= -1, f = h.len); h.reversed && (A *= -1, f -= A * (h.sector || h.len)); a ? (b = (b * A + f - e) / z + k, d && (b = h.lin2val(b))) :
                    (d && (b = h.val2lin(b)), b = m(k) ? A * (b - k) * z + f + A * e + (m(l) ? z * l : 0) : void 0); return b
            }, toPixels: function (b, a) { return this.translate(b, !1, !this.horiz, null, !0) + (a ? 0 : this.pos) }, toValue: function (b, a) { return this.translate(b - (a ? 0 : this.pos), !0, !this.horiz, null, !0) }, getPlotLinePath: function (b, a, c, k, d) {
                var h = this, A = h.chart, l = h.left, z = h.top, e, u, r, q, y = c && A.oldChartHeight || A.chartHeight, p = c && A.oldChartWidth || A.chartWidth, g, E = h.transB, G, M = function (b, a, h) { if ("pass" !== k && b < a || b > h) k ? b = Math.min(Math.max(a, b), h) : g = !0; return b };
                G = { value: b, lineWidth: a, old: c, force: k, translatedValue: d }; f(this, "getPlotLinePath", G, function (f) { d = D(d, h.translate(b, null, null, c)); d = Math.min(Math.max(-1E5, d), 1E5); e = r = Math.round(d + E); u = q = Math.round(y - d - E); m(d) ? h.horiz ? (u = z, q = y - h.bottom, e = r = M(e, l, l + h.width)) : (e = l, r = p - h.right, u = q = M(u, z, z + h.height)) : (g = !0, k = !1); f.path = g && !k ? null : A.renderer.crispLine(["M", e, u, "L", r, q], a || 1) }); return G.path
            }, getLinearTickPositions: function (b, a, c) {
                var h, k = t(Math.floor(a / b) * b); c = t(Math.ceil(c / b) * b); var A = [], d; t(k + b) === k &&
                    (d = 20); if (this.single) return [a]; for (a = k; a <= c;) { A.push(a); a = t(a + b, d); if (a === h) break; h = a } return A
            }, getMinorTickInterval: function () { var b = this.options; return !0 === b.minorTicks ? D(b.minorTickInterval, "auto") : !1 === b.minorTicks ? null : b.minorTickInterval }, getMinorTickPositions: function () {
                var b = this, a = b.options, c = b.tickPositions, k = b.minorTickInterval, d = [], m = b.pointRangePadding || 0, l = b.min - m, m = b.max + m, z = m - l; if (z && z / k < b.len / 3) if (b.isLog) this.paddedTicks.forEach(function (a, h, c) {
                    h && d.push.apply(d, b.getLogTickPositions(k,
                        c[h - 1], c[h], !0))
                }); else if (b.isDatetimeAxis && "auto" === this.getMinorTickInterval()) d = d.concat(b.getTimeTicks(b.normalizeTimeTickInterval(k), l, m, a.startOfWeek)); else for (a = l + (c[0] - l) % k; a <= m && a !== d[0]; a += k)d.push(a); 0 !== d.length && b.trimTicks(d); return d
            }, adjustForMinRange: function () {
                var b = this.options, a = this.min, c = this.max, k, d, m, l, z, f, e, u; this.isXAxis && void 0 === this.minRange && !this.isLog && (v(b.min) || v(b.max) ? this.minRange = null : (this.series.forEach(function (b) {
                    f = b.xData; for (l = e = b.xIncrement ? 1 : f.length -
                        1; 0 < l; l--)if (z = f[l] - f[l - 1], void 0 === m || z < m) m = z
                }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin))); c - a < this.minRange && (d = this.dataMax - this.dataMin >= this.minRange, u = this.minRange, k = (u - c + a) / 2, k = [a - k, D(b.min, a - k)], d && (k[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), a = F(k), c = [a + u, D(b.max, a + u)], d && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = n(c), c - a < u && (k[0] = c - u, k[1] = D(b.min, c - u), a = F(k))); this.min = a; this.max = c
            }, getClosest: function () {
                var b; this.categories ? b = 1 : this.series.forEach(function (a) {
                    var h =
                        a.closestPointRange, c = a.visible || !a.chart.options.chart.ignoreHiddenSeries; !a.noSharedTooltip && v(h) && c && (b = v(b) ? Math.min(b, h) : h)
                }); return b
            }, nameToX: function (b) { var a = c(this.categories), h = a ? this.categories : this.names, k = b.options.x, d; b.series.requireSorting = !1; v(k) || (k = !1 === this.options.uniqueNames ? b.series.autoIncrement() : a ? h.indexOf(b.name) : D(h.keys[b.name], -1)); -1 === k ? a || (d = h.length) : d = k; void 0 !== d && (this.names[d] = b.name, this.names.keys[b.name] = d); return d }, updateNames: function () {
                var b = this, a = this.names;
                0 < a.length && (Object.keys(a.keys).forEach(function (b) { delete a.keys[b] }), a.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (a) { a.xIncrement = null; if (!a.points || a.isDirtyData) b.max = Math.max(b.max, a.xData.length - 1), a.processData(), a.generatePoints(); a.data.forEach(function (h, c) { var k; h && h.options && void 0 !== h.name && (k = b.nameToX(h), void 0 !== k && k !== h.x && (h.x = k, a.xData[c] = k)) }) }))
            }, setAxisTranslation: function (b) {
                var a = this, h = a.max - a.min, c = a.axisPointRange || 0, k, d = 0, m = 0, z = a.linkedParent,
                e = !!a.categories, u = a.transA, r = a.isXAxis; if (r || e || c) k = a.getClosest(), z ? (d = z.minPointOffset, m = z.pointRangePadding) : a.series.forEach(function (b) { var h = e ? 1 : r ? D(b.options.pointRange, k, 0) : a.axisPointRange || 0; b = b.options.pointPlacement; c = Math.max(c, h); a.single || (d = Math.max(d, r && l(b) ? 0 : h / 2), m = Math.max(m, r && "on" === b ? 0 : h)) }), z = a.ordinalSlope && k ? a.ordinalSlope / k : 1, a.minPointOffset = d *= z, a.pointRangePadding = m *= z, a.pointRange = Math.min(c, h), r && (a.closestPointRange = k); b && (a.oldTransA = u); a.translationSlope = a.transA =
                    u = a.staticScale || a.len / (h + m || 1); a.transB = a.horiz ? a.left : a.bottom; a.minPixelPadding = u * d; f(this, "afterSetAxisTranslation")
            }, minFromRange: function () { return this.max - this.range }, setTickInterval: function (b) {
                var h = this, c = h.chart, k = h.options, d = h.isLog, l = h.isDatetimeAxis, z = h.isXAxis, e = h.isLinked, q = k.maxPadding, y = k.minPadding, p, g = k.tickInterval, E = k.tickPixelInterval, G = h.categories, n = m(h.threshold) ? h.threshold : null, x = h.softThreshold, w, B, C; l || G || e || this.getTickAmount(); B = D(h.userMin, k.min); C = D(h.userMax, k.max);
                e ? (h.linkedParent = c[h.coll][k.linkedTo], p = h.linkedParent.getExtremes(), h.min = D(p.min, p.dataMin), h.max = D(p.max, p.dataMax), k.type !== h.linkedParent.options.type && a.error(11, 1, c)) : (!x && v(n) && (h.dataMin >= n ? (p = n, y = 0) : h.dataMax <= n && (w = n, q = 0)), h.min = D(B, p, h.dataMin), h.max = D(C, w, h.dataMax)); d && (h.positiveValuesOnly && !b && 0 >= Math.min(h.min, D(h.dataMin, h.min)) && a.error(10, 1, c), h.min = t(h.log2lin(h.min), 15), h.max = t(h.log2lin(h.max), 15)); h.range && v(h.max) && (h.userMin = h.min = B = Math.max(h.dataMin, h.minFromRange()),
                    h.userMax = C = h.max, h.range = null); f(h, "foundExtremes"); h.beforePadding && h.beforePadding(); h.adjustForMinRange(); !(G || h.axisPointRange || h.usePercentage || e) && v(h.min) && v(h.max) && (c = h.max - h.min) && (!v(B) && y && (h.min -= c * y), !v(C) && q && (h.max += c * q)); m(k.softMin) && !m(h.userMin) && (h.min = Math.min(h.min, k.softMin)); m(k.softMax) && !m(h.userMax) && (h.max = Math.max(h.max, k.softMax)); m(k.floor) && (h.min = Math.min(Math.max(h.min, k.floor), Number.MAX_VALUE)); m(k.ceiling) && (h.max = Math.max(Math.min(h.max, k.ceiling), D(h.userMax,
                        -Number.MAX_VALUE))); x && v(h.dataMin) && (n = n || 0, !v(B) && h.min < n && h.dataMin >= n ? h.min = n : !v(C) && h.max > n && h.dataMax <= n && (h.max = n)); h.tickInterval = h.min === h.max || void 0 === h.min || void 0 === h.max ? 1 : e && !g && E === h.linkedParent.options.tickPixelInterval ? g = h.linkedParent.tickInterval : D(g, this.tickAmount ? (h.max - h.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (h.max - h.min) * E / Math.max(h.len, E)); z && !b && h.series.forEach(function (b) { b.processData(h.min !== h.oldMin || h.max !== h.oldMax) }); h.setAxisTranslation(!0); h.beforeSetTickPositions &&
                            h.beforeSetTickPositions(); h.postProcessTickInterval && (h.tickInterval = h.postProcessTickInterval(h.tickInterval)); h.pointRange && !g && (h.tickInterval = Math.max(h.pointRange, h.tickInterval)); b = D(k.minTickInterval, h.isDatetimeAxis && h.closestPointRange); !g && h.tickInterval < b && (h.tickInterval = b); l || d || g || (h.tickInterval = u(h.tickInterval, null, r(h.tickInterval), D(k.allowDecimals, !(.5 < h.tickInterval && 5 > h.tickInterval && 1E3 < h.max && 9999 > h.max)), !!this.tickAmount)); this.tickAmount || (h.tickInterval = h.unsquish());
                this.setTickPositions()
            }, setTickPositions: function () {
                var b = this.options, c, k = b.tickPositions; c = this.getMinorTickInterval(); var d = b.tickPositioner, m = b.startOnTick, l = b.endOnTick; this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c; this.single = this.min === this.max && v(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals); this.tickPositions = c = k && k.slice();
                !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19, !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] ===
                    c[1] && (c.length = 1)), this.tickPositions = c, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = c = d); this.paddedTicks = c.slice(0); this.trimTicks(c, m, l); this.isLinked || (this.single && 2 > c.length && (this.min -= .5, this.max += .5), k || d || this.adjustTickAmount()); f(this, "afterSetTickPositions")
            }, trimTicks: function (b, a, c) {
                var h = b[0], k = b[b.length - 1], d = this.minPointOffset || 0; f(this, "trimTicks"); if (!this.isLinked) {
                    if (a && -Infinity !== h) this.min = h; else for (; this.min - d > b[0];)b.shift(); if (c) this.max = k; else for (; this.max +
                        d < b[b.length - 1];)b.pop(); 0 === b.length && v(h) && !this.options.tickPositions && b.push((k + h) / 2)
                }
            }, alignToOthers: function () { var b = {}, a, c = this.options; !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function (h) { var c = h.options, c = [h.horiz ? c.left : c.top, c.width, c.height, c.pane].join(); h.series.length && (b[c] ? a = !0 : b[c] = 1) }); return a }, getTickAmount: function () {
                var b = this.options, a = b.tickAmount, c = b.tickPixelInterval; !v(b.tickInterval) &&
                    this.len < c && !this.isRadial && !this.isLog && b.startOnTick && b.endOnTick && (a = 2); !a && this.alignToOthers() && (a = Math.ceil(this.len / c) + 1); 4 > a && (this.finalTickAmt = a, a = 5); this.tickAmount = a
            }, adjustTickAmount: function () {
                var b = this.options, a = this.tickInterval, c = this.tickPositions, k = this.tickAmount, d = this.finalTickAmt, m = c && c.length, l = D(this.threshold, this.softThreshold ? 0 : null), z; if (this.hasData()) {
                    if (m < k) {
                        for (z = this.min; c.length < k;)c.length % 2 || z === l ? c.push(t(c[c.length - 1] + a)) : c.unshift(t(c[0] - a)); this.transA *= (m -
                            1) / (k - 1); this.min = b.startOnTick ? c[0] : Math.min(this.min, c[0]); this.max = b.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length - 1])
                    } else m > k && (this.tickInterval *= 2, this.setTickPositions()); if (v(d)) { for (a = b = c.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < b - 1) && c.splice(a, 1); this.finalTickAmt = void 0 }
                }
            }, setScale: function () {
                var b, a; this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize(); a = this.len !== this.oldAxisLength; this.series.forEach(function (a) {
                    if (a.isDirtyData || a.isDirty ||
                        a.xAxis.isDirty) b = !0
                }); a || b || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = a || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(); f(this, "afterSetScale")
            }, setExtremes: function (b, a, c, k, d) {
                var h = this, m = h.chart;
                c = D(c, !0); h.series.forEach(function (b) { delete b.kdTree }); d = e(d, { min: b, max: a }); f(h, "setExtremes", d, function () { h.userMin = b; h.userMax = a; h.eventArgs = d; c && m.redraw(k) })
            }, zoom: function (b, a) {
                var h = this.dataMin, c = this.dataMax, k = this.options, d = Math.min(h, D(k.min, h)), m = Math.max(c, D(k.max, c)); b = { newMin: b, newMax: a }; f(this, "zoom", b, function (b) {
                    var a = b.newMin, k = b.newMax; if (a !== this.min || k !== this.max) this.allowZoomOutside || (v(h) && (a < d && (a = d), a > m && (a = m)), v(c) && (k < d && (k = d), k > m && (k = m))), this.displayBtn = void 0 !== a ||
                        void 0 !== k, this.setExtremes(a, k, !1, void 0, { trigger: "zoom" }); b.zoomed = !0
                }); return b.zoomed
            }, setAxisSize: function () {
                var b = this.chart, c = this.options, k = c.offsets || [0, 0, 0, 0], d = this.horiz, m = this.width = Math.round(a.relativeLength(D(c.width, b.plotWidth - k[3] + k[1]), b.plotWidth)), l = this.height = Math.round(a.relativeLength(D(c.height, b.plotHeight - k[0] + k[2]), b.plotHeight)), z = this.top = Math.round(a.relativeLength(D(c.top, b.plotTop + k[0]), b.plotHeight, b.plotTop)), c = this.left = Math.round(a.relativeLength(D(c.left, b.plotLeft +
                    k[3]), b.plotWidth, b.plotLeft)); this.bottom = b.chartHeight - l - z; this.right = b.chartWidth - m - c; this.len = Math.max(d ? m : l, 0); this.pos = d ? c : z
            }, getExtremes: function () { var b = this.isLog; return { min: b ? t(this.lin2log(this.min)) : this.min, max: b ? t(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } }, getThreshold: function (b) {
                var a = this.isLog, c = a ? this.lin2log(this.min) : this.min, a = a ? this.lin2log(this.max) : this.max; null === b || -Infinity === b ? b = c : Infinity === b ?
                    b = a : c > b ? b = c : a < b && (b = a); return this.translate(b, 0, 1, 0, 1)
            }, autoLabelAlign: function (b) { var a = (D(b, 0) - 90 * this.side + 720) % 360; b = { align: "center" }; f(this, "autoLabelAlign", b, function (b) { 15 < a && 165 > a ? b.align = "right" : 195 < a && 345 > a && (b.align = "left") }); return b.align }, tickSize: function (b) { var a = this.options, c = a[b + "Length"], h = D(a[b + "Width"], "tick" === b && this.isXAxis ? 1 : 0), k; h && c && ("inside" === a[b + "Position"] && (c = -c), k = [c, h]); b = { tickSize: k }; f(this, "afterTickSize", b); return b.tickSize }, labelMetrics: function () {
                var b = this.tickPositions &&
                    this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[b] && this.ticks[b].label)
            }, unsquish: function () {
                var b = this.options.labels, a = this.horiz, c = this.tickInterval, k = c, d = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), m, l = b.rotation, z = this.labelMetrics(), f, e = Number.MAX_VALUE, u, r = this.max - this.min, q = function (b) { var a = b / (d || 1), a = 1 < a ? Math.ceil(a) : 1; a * c > r && Infinity !== b && Infinity !== d && (a = Math.ceil(r / c)); return t(a * c) };
                a ? (u = !b.staggerLines && !b.step && (v(l) ? [l] : d < D(b.autoRotationLimit, 80) && b.autoRotation)) && u.forEach(function (b) { var a; if (b === l || b && -90 <= b && 90 >= b) f = q(Math.abs(z.h / Math.sin(x * b))), a = f + Math.abs(b / 360), a < e && (e = a, m = b, k = f) }) : b.step || (k = q(z.h)); this.autoRotation = u; this.labelRotation = D(m, l); return k
            }, getSlotWidth: function (b) {
                var a = this.chart, c = this.horiz, h = this.options.labels, k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), d = a.margin[3]; return b && b.slotWidth || c && 2 > (h.step || 0) && !h.rotation && (this.staggerLines ||
                    1) * this.len / k || !c && (h.style && parseInt(h.style.width, 10) || d && d - a.spacing[3] || .33 * a.chartWidth)
            }, renderUnsquish: function () {
                var b = this.chart, a = b.renderer, c = this.tickPositions, k = this.ticks, d = this.options.labels, m = d && d.style || {}, z = this.horiz, f = this.getSlotWidth(), e = Math.max(1, Math.round(f - 2 * (d.padding || 5))), u = {}, r = this.labelMetrics(), q = d.style && d.style.textOverflow, p, y, g = 0, E; l(d.rotation) || (u.rotation = d.rotation || 0); c.forEach(function (b) { (b = k[b]) && b.label && b.label.textPxLength > g && (g = b.label.textPxLength) });
                this.maxLabelLength = g; if (this.autoRotation) g > e && g > r.h ? u.rotation = this.labelRotation : this.labelRotation = 0; else if (f && (p = e, !q)) for (y = "clip", e = c.length; !z && e--;)if (E = c[e], E = k[E].label) E.styles && "ellipsis" === E.styles.textOverflow ? E.css({ textOverflow: "clip" }) : E.textPxLength > f && E.css({ width: f + "px" }), E.getBBox().height > this.len / c.length - (r.h - r.f) && (E.specificTextOverflow = "ellipsis"); u.rotation && (p = g > .5 * b.chartHeight ? .33 * b.chartHeight : g, q || (y = "ellipsis")); if (this.labelAlign = d.align || this.autoLabelAlign(this.labelRotation)) u.align =
                    this.labelAlign; c.forEach(function (b) { var a = (b = k[b]) && b.label, c = m.width, h = {}; a && (a.attr(u), b.shortenLabel ? b.shortenLabel() : p && !c && "nowrap" !== m.whiteSpace && (p < a.textPxLength || "SPAN" === a.element.tagName) ? (h.width = p, q || (h.textOverflow = a.specificTextOverflow || y), a.css(h)) : a.styles && a.styles.width && !h.width && !c && a.css({ width: null }), delete a.specificTextOverflow, b.rotation = u.rotation) }, this); this.tickRotCorr = a.rotCorr(r.b, this.labelRotation || 0, 0 !== this.side)
            }, hasData: function () {
                return this.hasVisibleSeries ||
                    v(this.min) && v(this.max) && this.tickPositions && 0 < this.tickPositions.length
            }, addTitle: function (b) {
                var a = this.chart.renderer, c = this.horiz, h = this.opposite, k = this.options.title, m, l = this.chart.styledMode; this.axisTitle || ((m = k.textAlign) || (m = (c ? { low: "left", middle: "center", high: "right" } : { low: h ? "right" : "left", middle: "center", high: h ? "left" : "right" })[k.align]), this.axisTitle = a.text(k.text, 0, 0, k.useHTML).attr({ zIndex: 7, rotation: k.rotation || 0, align: m }).addClass("highcharts-axis-title"), l || this.axisTitle.css(d(k.style)),
                    this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0); l || k.style.width || this.isRadial || this.axisTitle.css({ width: this.len }); this.axisTitle[b ? "show" : "hide"](!0)
            }, generateTick: function (b) { var a = this.ticks; a[b] ? a[b].addLabel() : a[b] = new z(this, b) }, getOffset: function () {
                var b = this, a = b.chart, c = a.renderer, k = b.options, d = b.tickPositions, m = b.ticks, l = b.horiz, z = b.side, e = a.inverted && !b.isZAxis ? [1, 0, 3, 2][z] : z, u, r, q = 0, p, y = 0, g = k.title, E = k.labels, n = 0, t = a.axisOffset, a = a.clipOffset, x = [-1, 1, 1, -1][z], w = k.className,
                B = b.axisParent; u = b.hasData(); b.showAxis = r = u || D(k.showEmpty, !0); b.staggerLines = b.horiz && E.staggerLines; b.axisGroup || (b.gridGroup = c.g("grid").attr({ zIndex: k.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (w || "")).add(B), b.axisGroup = c.g("axis").attr({ zIndex: k.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (w || "")).add(B), b.labelGroup = c.g("axis-labels").attr({ zIndex: E.zIndex || 7 }).addClass("highcharts-" + b.coll.toLowerCase() + "-labels " + (w || "")).add(B)); u || b.isLinked ?
                    (d.forEach(function (a, c) { b.generateTick(a, c) }), b.renderUnsquish(), b.reserveSpaceDefault = 0 === z || 2 === z || { 1: "left", 3: "right" }[z] === b.labelAlign, D(E.reserveSpace, "center" === b.labelAlign ? !0 : null, b.reserveSpaceDefault) && d.forEach(function (b) { n = Math.max(m[b].getLabelSize(), n) }), b.staggerLines && (n *= b.staggerLines), b.labelOffset = n * (b.opposite ? -1 : 1)) : G(m, function (b, a) { b.destroy(); delete m[a] }); g && g.text && !1 !== g.enabled && (b.addTitle(r), r && !1 !== g.reserveSpace && (b.titleOffset = q = b.axisTitle.getBBox()[l ? "height" :
                        "width"], p = g.offset, y = v(p) ? 0 : D(g.margin, l ? 5 : 10))); b.renderLine(); b.offset = x * D(k.offset, t[z]); b.tickRotCorr = b.tickRotCorr || { x: 0, y: 0 }; c = 0 === z ? -b.labelMetrics().h : 2 === z ? b.tickRotCorr.y : 0; y = Math.abs(n) + y; n && (y = y - c + x * (l ? D(E.y, b.tickRotCorr.y + 8 * x) : E.x)); b.axisTitleMargin = D(p, y); b.getMaxLabelDimensions && (b.maxLabelDimensions = b.getMaxLabelDimensions(m, d)); l = this.tickSize("tick"); t[z] = Math.max(t[z], b.axisTitleMargin + q + x * b.offset, y, u && d.length && l ? l[0] + x * b.offset : 0); k = k.offset ? 0 : 2 * Math.floor(b.axisLine.strokeWidth() /
                            2); a[e] = Math.max(a[e], k); f(this, "afterGetOffset")
            }, getLinePath: function (b) { var a = this.chart, c = this.opposite, k = this.offset, h = this.horiz, d = this.left + (c ? this.width : 0) + k, k = a.chartHeight - this.bottom - (c ? this.height : 0) + k; c && (b *= -1); return a.renderer.crispLine(["M", h ? this.left : d, h ? k : this.top, "L", h ? a.chartWidth - this.right : d, h ? k : a.chartHeight - this.bottom], b) }, renderLine: function () {
            this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode ||
                this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
            }, getTitlePosition: function () {
                var b = this.horiz, a = this.left, c = this.top, k = this.len, d = this.options.title, m = b ? a : c, l = this.opposite, z = this.offset, e = d.x || 0, u = d.y || 0, r = this.axisTitle, q = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, r), r = Math.max(r.getBBox(null, 0).height - q.h - 1, 0), k = { low: m + (b ? 0 : k), middle: m + k / 2, high: m + (b ? k : 0) }[d.align], a = (b ? c + this.height : a) + (b ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin + [-r,
                    r, q.f, -r][this.side], b = { x: b ? k + e : a + (l ? this.width : 0) + z + e, y: b ? a + u - (l ? this.height : 0) + z : k + u }; f(this, "afterGetTitlePosition", { titlePosition: b }); return b
            }, renderMinorTick: function (b) { var a = this.chart.hasRendered && m(this.oldMin), c = this.minorTicks; c[b] || (c[b] = new z(this, b, "minor")); a && c[b].isNew && c[b].render(null, !0); c[b].render(null, !1, 1) }, renderTick: function (b, a) {
                var c = this.isLinked, k = this.ticks, h = this.chart.hasRendered && m(this.oldMin); if (!c || b >= this.min && b <= this.max) k[b] || (k[b] = new z(this, b)), h && k[b].isNew &&
                    k[b].render(a, !0, -1), k[b].render(a)
            }, render: function () {
                var b = this, c = b.chart, d = b.options, l = b.isLog, e = b.isLinked, u = b.tickPositions, r = b.axisTitle, q = b.ticks, p = b.minorTicks, y = b.alternateBands, g = d.stackLabels, E = d.alternateGridColor, D = b.tickmarkOffset, n = b.axisLine, t = b.showAxis, x = B(c.renderer.globalAnimation), v, w; b.labelEdge.length = 0; b.overlap = !1;[q, p, y].forEach(function (b) { G(b, function (b) { b.isActive = !1 }) }); if (b.hasData() || e) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (a) { b.renderMinorTick(a) }),
                    u.length && (u.forEach(function (a, c) { b.renderTick(a, c) }), D && (0 === b.min || b.single) && (q[-1] || (q[-1] = new z(b, -1, null, !0)), q[-1].render(-1))), E && u.forEach(function (k, h) { w = void 0 !== u[h + 1] ? u[h + 1] + D : b.max - D; 0 === h % 2 && k < b.max && w <= b.max + (c.polar ? -D : D) && (y[k] || (y[k] = new a.PlotLineOrBand(b)), v = k + D, y[k].options = { from: l ? b.lin2log(v) : v, to: l ? b.lin2log(w) : w, color: E }, y[k].render(), y[k].isActive = !0) }), b._addedPlotLB || ((d.plotLines || []).concat(d.plotBands || []).forEach(function (a) { b.addPlotBandOrLine(a) }), b._addedPlotLB =
                        !0);[q, p, y].forEach(function (b) { var a, h = [], d = x.duration; G(b, function (b, a) { b.isActive || (b.render(a, !1, 0), b.isActive = !1, h.push(a)) }); k(function () { for (a = h.length; a--;)b[h[a]] && !b[h[a]].isActive && (b[h[a]].destroy(), delete b[h[a]]) }, b !== y && c.hasRendered && d ? d : 0) }); n && (n[n.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(n.strokeWidth()) }), n.isPlaced = !0, n[t ? "show" : "hide"](!0)); r && t && (d = b.getTitlePosition(), m(d.y) ? (r[r.isNew ? "attr" : "animate"](d), r.isNew = !1) : (r.attr("y", -9999), r.isNew = !0)); g && g.enabled && b.renderStackTotals();
                b.isDirty = !1; f(this, "afterRender")
            }, redraw: function () { this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) { b.render() })); this.series.forEach(function (b) { b.isDirty = !0 }) }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function (b) {
                var a = this, c = a.stacks, k = a.plotLinesAndBands, h; f(this, "destroy", { keepEvents: b }); b || y(a); G(c, function (b, a) { p(b); c[a] = null });[a.ticks, a.minorTicks, a.alternateBands].forEach(function (b) { p(b) }); if (k) for (b = k.length; b--;)k[b].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) { a[b] && (a[b] = a[b].destroy()) }); for (h in a.plotLinesAndBandsGroups) a.plotLinesAndBandsGroups[h] = a.plotLinesAndBandsGroups[h].destroy(); G(a, function (b, c) { -1 === a.keepProps.indexOf(c) && delete a[c] })
            }, drawCrosshair: function (b, a) {
                var c, k = this.crosshair, h = D(k.snap, !0), d, m = this.cross; f(this, "drawCrosshair", { e: b, point: a }); b || (b = this.cross && this.cross.e); if (this.crosshair && !1 !== (v(a) || !h)) {
                    h ? v(a) &&
                        (d = D(a.crosshairPos, this.isXAxis ? a.plotX : this.len - a.plotY)) : d = b && (this.horiz ? b.chartX - this.pos : this.len - b.chartY + this.pos); v(d) && (c = this.getPlotLinePath(a && (this.isXAxis ? a.x : D(a.stackY, a.y)), null, null, null, d) || null); if (!v(c)) { this.hideCrosshair(); return } h = this.categories && !this.isRadial; m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (h ? "category " : "thin ") + k.className).attr({ zIndex: D(k.zIndex, 2) }).add(), this.chart.styledMode || (m.attr({
                            stroke: k.color ||
                                (h ? g("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": D(k.width, 1)
                        }).css({ "pointer-events": "none" }), k.dashStyle && m.attr({ dashstyle: k.dashStyle }))); m.show().attr({ d: c }); h && !k.width && m.attr({ "stroke-width": this.transA }); this.cross.e = b
                } else this.hideCrosshair(); f(this, "afterDrawCrosshair", { e: b, point: a })
            }, hideCrosshair: function () { this.cross && this.cross.hide(); f(this, "afterHideCrosshair") }
        }); return a.Axis = E
    }(H); (function (a) {
        var C = a.Axis, B = a.getMagnitude, F = a.normalizeTickInterval, n = a.timeUnits;
        C.prototype.getTimeTicks = function () { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments) }; C.prototype.normalizeTimeTickInterval = function (a, t) {
            var g = t || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]]; t = g[g.length - 1]; var v = n[t[0]], x = t[1], p; for (p = 0; p < g.length && !(t = g[p], v = n[t[0]], x = t[1], g[p + 1] && a <= (v * x[x.length - 1] + n[g[p + 1][0]]) / 2); p++); v ===
                n.year && a < 5 * v && (x = [1, 2, 5]); a = F(a / v, x, "year" === t[0] ? Math.max(B(a / v), 1) : 1); return { unitRange: v, count: a, unitName: t[0] }
        }
    })(H); (function (a) {
        var C = a.Axis, B = a.getMagnitude, F = a.normalizeTickInterval, n = a.pick; C.prototype.getLogTickPositions = function (a, t, w, v) {
            var g = this.options, p = this.len, e = []; v || (this._minorAutoInterval = null); if (.5 <= a) a = Math.round(a), e = this.getLinearTickPositions(a, t, w); else if (.08 <= a) for (var p = Math.floor(t), f, q, r, c, m, g = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < w + 1 && !m; p++)for (q =
                g.length, f = 0; f < q && !m; f++)r = this.log2lin(this.lin2log(p) * g[f]), r > t && (!v || c <= w) && void 0 !== c && e.push(c), c > w && (m = !0), c = r; else t = this.lin2log(t), w = this.lin2log(w), a = v ? this.getMinorTickInterval() : g.tickInterval, a = n("auto" === a ? null : a, this._minorAutoInterval, g.tickPixelInterval / (v ? 5 : 1) * (w - t) / ((v ? p / this.tickPositions.length : p) || 1)), a = F(a, null, B(a)), e = this.getLinearTickPositions(a, t, w).map(this.log2lin), v || (this._minorAutoInterval = a / 5); v || (this.tickInterval = a); return e
        }; C.prototype.log2lin = function (a) {
            return Math.log(a) /
                Math.LN10
        }; C.prototype.lin2log = function (a) { return Math.pow(10, a) }
    })(H); (function (a, C) {
        var B = a.arrayMax, F = a.arrayMin, n = a.defined, g = a.destroyObjectProperties, t = a.erase, w = a.merge, v = a.pick; a.PlotLineOrBand = function (a, p) { this.axis = a; p && (this.options = p, this.id = p.id) }; a.PlotLineOrBand.prototype = {
            render: function () {
                a.fireEvent(this, "render"); var g = this, p = g.axis, e = p.horiz, f = g.options, q = f.label, r = g.label, c = f.to, m = f.from, l = f.value, d = n(m) && n(c), u = n(l), G = g.svgElem, D = !G, y = [], b = f.color, k = v(f.zIndex, 0), z = f.events,
                    y = { "class": "highcharts-plot-" + (d ? "band " : "line ") + (f.className || "") }, E = {}, h = p.chart.renderer, A = d ? "bands" : "lines"; p.isLog && (m = p.log2lin(m), c = p.log2lin(c), l = p.log2lin(l)); p.chart.styledMode || (u ? (y.stroke = b, y["stroke-width"] = f.width, f.dashStyle && (y.dashstyle = f.dashStyle)) : d && (b && (y.fill = b), f.borderWidth && (y.stroke = f.borderColor, y["stroke-width"] = f.borderWidth))); E.zIndex = k; A += "-" + k; (b = p.plotLinesAndBandsGroups[A]) || (p.plotLinesAndBandsGroups[A] = b = h.g("plot-" + A).attr(E).add()); D && (g.svgElem = G = h.path().attr(y).add(b));
                if (u) y = p.getPlotLinePath(l, G.strokeWidth()); else if (d) y = p.getPlotBandPath(m, c, f); else return; D && y && y.length ? (G.attr({ d: y }), z && a.objectEach(z, function (b, a) { G.on(a, function (b) { z[a].apply(g, [b]) }) })) : G && (y ? (G.show(), G.animate({ d: y })) : (G.hide(), r && (g.label = r = r.destroy()))); q && n(q.text) && y && y.length && 0 < p.width && 0 < p.height && !y.isFlat ? (q = w({ align: e && d && "center", x: e ? !d && 4 : 10, verticalAlign: !e && d && "middle", y: e ? d ? 16 : 10 : d ? 6 : -4, rotation: e && !d && 90 }, q), this.renderLabel(q, y, d, k)) : r && r.hide(); return g
            }, renderLabel: function (a,
                p, e, f) { var q = this.label, r = this.axis.chart.renderer; q || (q = { align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "") }, q.zIndex = f, this.label = q = r.text(a.text, 0, 0, a.useHTML).attr(q).add(), this.axis.chart.styledMode || q.css(a.style)); f = p.xBounds || [p[1], p[4], e ? p[6] : p[1]]; p = p.yBounds || [p[2], p[5], e ? p[7] : p[2]]; e = F(f); r = F(p); q.align(a, !1, { x: e, y: r, width: B(f) - e, height: B(p) - r }); q.show() }, destroy: function () {
                    t(this.axis.plotLinesAndBands, this); delete this.axis;
                    g(this)
                }
        }; a.extend(C.prototype, {
            getPlotBandPath: function (a, p) { var e = this.getPlotLinePath(p, null, null, !0), f = this.getPlotLinePath(a, null, null, !0), q = [], r = this.horiz, c = 1, m; a = a < this.min && p < this.min || a > this.max && p > this.max; if (f && e) for (a && (m = f.toString() === e.toString(), c = 0), a = 0; a < f.length; a += 6)r && e[a + 1] === f[a + 1] ? (e[a + 1] += c, e[a + 4] += c) : r || e[a + 2] !== f[a + 2] || (e[a + 2] += c, e[a + 5] += c), q.push("M", f[a + 1], f[a + 2], "L", f[a + 4], f[a + 5], e[a + 4], e[a + 5], e[a + 1], e[a + 2], "z"), q.isFlat = m; return q }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            }, addPlotLine: function (a) { return this.addPlotBandOrLine(a, "plotLines") }, addPlotBandOrLine: function (g, p) { var e = (new a.PlotLineOrBand(this, g)).render(), f = this.userOptions; e && (p && (f[p] = f[p] || [], f[p].push(g)), this.plotLinesAndBands.push(e)); return e }, removePlotBandOrLine: function (a) {
                for (var p = this.plotLinesAndBands, e = this.options, f = this.userOptions, q = p.length; q--;)p[q].id === a && p[q].destroy();[e.plotLines || [], f.plotLines || [], e.plotBands || [], f.plotBands || []].forEach(function (f) {
                    for (q = f.length; q--;)f[q].id ===
                        a && t(f, f[q])
                })
            }, removePlotBand: function (a) { this.removePlotBandOrLine(a) }, removePlotLine: function (a) { this.removePlotBandOrLine(a) }
        })
    })(H, da); (function (a) {
        var C = a.doc, B = a.extend, F = a.format, n = a.isNumber, g = a.merge, t = a.pick, w = a.splat, v = a.syncTimeout, x = a.timeUnits; a.Tooltip = function () { this.init.apply(this, arguments) }; a.Tooltip.prototype = {
            init: function (a, e) {
            this.chart = a; this.options = e; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = e.split && !a.inverted; this.shared = e.shared || this.split;
                this.outside = e.outside && !this.split
            }, cleanSplit: function (a) { this.chart.series.forEach(function (e) { var f = e && e.tt; f && (!f.isActive || a ? e.tt = f.destroy() : f.isActive = !1) }) }, applyFilter: function () {
                var a = this.chart; a.renderer.definition({
                    tagName: "filter", id: "drop-shadow-" + a.index, opacity: .5, children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, { tagName: "feOffset", dx: 1, dy: 1 }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: .3 }] }, {
                        tagName: "feMerge", children: [{ tagName: "feMergeNode" },
                        { tagName: "feMergeNode", "in": "SourceGraphic" }]
                    }]
                }); a.renderer.definition({ tagName: "style", textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}" })
            }, getLabel: function () {
                var p = this, e = this.chart.renderer, f = this.chart.styledMode, q = this.options, r, c; this.label || (this.outside && (this.container = r = a.doc.createElement("div"), r.className = "highcharts-tooltip-container", a.css(r, { position: "absolute", top: "1px", pointerEvents: q.style && q.style.pointerEvents }), a.doc.body.appendChild(r), this.renderer =
                    e = new a.Renderer(r, 0, 0)), this.split ? this.label = e.g("tooltip") : (this.label = e.label("", 0, 0, q.shape || "callout", null, null, q.useHTML, null, "tooltip").attr({ padding: q.padding, r: q.borderRadius }), f || this.label.attr({ fill: q.backgroundColor, "stroke-width": q.borderWidth }).css(q.style).shadow(q.shadow)), f && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (c = { x: this.label.xSetter, y: this.label.ySetter }, this.label.xSetter = function (a, l) {
                        c[l].call(this.label, p.distance);
                        r.style.left = a + "px"
                    }, this.label.ySetter = function (a, l) { c[l].call(this.label, p.distance); r.style.top = a + "px" }), this.label.attr({ zIndex: 8 }).add()); return this.label
            }, update: function (a) { this.destroy(); g(!0, this.chart.options.tooltip.userOptions, a); this.init(this.chart, g(!0, this.options, a)) }, destroy: function () {
            this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()); this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer); a.clearTimeout(this.tooltipTimeout)
            }, move: function (p, e, f, q) { var r = this, c = r.now, m = !1 !== r.options.animation && !r.isHidden && (1 < Math.abs(p - c.x) || 1 < Math.abs(e - c.y)), l = r.followPointer || 1 < r.len; B(c, { x: m ? (2 * c.x + p) / 3 : p, y: m ? (c.y + e) / 2 : e, anchorX: l ? void 0 : m ? (2 * c.anchorX + f) / 3 : f, anchorY: l ? void 0 : m ? (c.anchorY + q) / 2 : q }); r.getLabel().attr(c); m && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { r && r.move(p, e, f, q) }, 32)) }, hide: function (p) {
                var e = this; a.clearTimeout(this.hideTimer);
                p = t(p, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = v(function () { e.getLabel()[p ? "fadeOut" : "hide"](); e.isHidden = !0 }, p))
            }, getAnchor: function (a, e) {
                var f = this.chart, q = f.pointer, r = f.inverted, c = f.plotTop, m = f.plotLeft, l = 0, d = 0, u, g; a = w(a); this.followPointer && e ? (void 0 === e.chartX && (e = q.normalize(e)), a = [e.chartX - f.plotLeft, e.chartY - c]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function (a) {
                    u = a.series.yAxis; g = a.series.xAxis; l += a.plotX + (!r && g ? g.left - m : 0); d += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
                        (!r && u ? u.top - c : 0)
                }), l /= a.length, d /= a.length, a = [r ? f.plotWidth - d : l, this.shared && !r && 1 < a.length && e ? e.chartY - c : r ? f.plotHeight - l : d]); return a.map(Math.round)
            }, getPosition: function (a, e, f) {
                var q = this.chart, r = this.distance, c = {}, m = q.inverted && f.h || 0, l, d = this.outside, u = d ? C.documentElement.clientWidth - 2 * r : q.chartWidth, g = d ? Math.max(C.body.scrollHeight, C.documentElement.scrollHeight, C.body.offsetHeight, C.documentElement.offsetHeight, C.documentElement.clientHeight) : q.chartHeight, p = q.pointer.chartPosition, y = ["y",
                    g, e, (d ? p.top - r : 0) + f.plotY + q.plotTop, d ? 0 : q.plotTop, d ? g : q.plotTop + q.plotHeight], b = ["x", u, a, (d ? p.left - r : 0) + f.plotX + q.plotLeft, d ? 0 : q.plotLeft, d ? u : q.plotLeft + q.plotWidth], k = !this.followPointer && t(f.ttBelow, !q.inverted === !!f.negative), z = function (b, a, h, d, l, z) { var f = h < d - r, u = d + r + h < a, e = d - r - h; d += r; if (k && u) c[b] = d; else if (!k && f) c[b] = e; else if (f) c[b] = Math.min(z - h, 0 > e - m ? e : e - m); else if (u) c[b] = Math.max(l, d + m + h > a ? d : d + m); else return !1 }, E = function (b, a, k, h) { var d; h < r || h > a - r ? d = !1 : c[b] = h < k / 2 ? 1 : h > a - k / 2 ? a - k - 2 : h - k / 2; return d },
                h = function (a) { var c = y; y = b; b = c; l = a }, A = function () { !1 !== z.apply(0, y) ? !1 !== E.apply(0, b) || l || (h(!0), A()) : l ? c.x = c.y = 0 : (h(!0), A()) }; (q.inverted || 1 < this.len) && h(); A(); return c
            }, defaultFormatter: function (a) { var e = this.points || w(this), f; f = [a.tooltipFooterHeaderFormatter(e[0])]; f = f.concat(a.bodyFormatter(e)); f.push(a.tooltipFooterHeaderFormatter(e[0], !0)); return f }, refresh: function (g, e) {
                var f, q = this.options, r, c = g, m, l = {}, d = []; f = q.formatter || this.defaultFormatter; var l = this.shared, u, p = this.chart.styledMode; q.enabled &&
                    (a.clearTimeout(this.hideTimer), this.followPointer = w(c)[0].series.tooltipOptions.followPointer, m = this.getAnchor(c, e), e = m[0], r = m[1], !l || c.series && c.series.noSharedTooltip ? l = c.getLabelConfig() : (c.forEach(function (a) { a.setState("hover"); d.push(a.getLabelConfig()) }), l = { x: c[0].category, y: c[0].y }, l.points = d, c = c[0]), this.len = d.length, l = f.call(l, this), u = c.series, this.distance = t(u.tooltipOptions.distance, 16), !1 === l ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(l,
                        w(g)) : (q.style.width && !p || f.css({ width: this.chart.spacingBox.width }), f.attr({ text: l && l.join ? l.join("") : l }), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(c.colorIndex, u.colorIndex)), p || f.attr({ stroke: q.borderColor || c.color || u.color || "#666666" }), this.updatePosition({ plotX: e, plotY: r, negative: c.negative, ttBelow: c.ttBelow, h: m[2] || 0 })), this.isHidden = !1))
            }, renderSplit: function (g, e) {
                var f = this, q = [], r = this.chart, c = r.renderer, m = !0, l = this.options, d = 0, u, p = this.getLabel(), D = r.plotTop;
                a.isString(g) && (g = [!1, g]); g.slice(0, e.length + 1).forEach(function (a, b) {
                    if (!1 !== a && "" !== a) {
                        b = e[b - 1] || { isHeader: !0, plotX: e[0].plotX, plotY: r.plotHeight }; var k = b.series || f, z = k.tt, g = b.series || {}, h = "highcharts-color-" + t(b.colorIndex, g.colorIndex, "none"); z || (z = { padding: l.padding, r: l.borderRadius }, r.styledMode || (z.fill = l.backgroundColor, z.stroke = l.borderColor || b.color || g.color || "#333333", z["stroke-width"] = l.borderWidth), k.tt = z = c.label(null, null, null, (b.isHeader ? l.headerShape : l.shape) || "callout", null, null,
                            l.useHTML).addClass("highcharts-tooltip-box " + h).attr(z).add(p)); z.isActive = !0; z.attr({ text: a }); r.styledMode || z.css(l.style).shadow(l.shadow); a = z.getBBox(); g = a.width + z.strokeWidth(); b.isHeader ? (d = a.height, r.xAxis[0].opposite && (u = !0, D -= d), g = Math.max(0, Math.min(b.plotX + r.plotLeft - g / 2, r.chartWidth + (r.scrollablePixels ? r.scrollablePixels - r.marginRight : 0) - g))) : g = b.plotX + r.plotLeft - t(l.distance, 16) - g; 0 > g && (m = !1); a = (b.series && b.series.yAxis && b.series.yAxis.pos) + (b.plotY || 0); a -= D; b.isHeader && (a = u ? -d : r.plotHeight +
                                d); q.push({ target: a, rank: b.isHeader ? 1 : 0, size: k.tt.getBBox().height + 1, point: b, x: g, tt: z })
                    }
                }); this.cleanSplit(); l.positioner && q.forEach(function (a) { var b = l.positioner.call(f, a.tt.getBBox().width, a.size, a.point); a.x = b.x; a.align = 0; a.target = b.y; a.rank = t(b.rank, a.rank) }); a.distribute(q, r.plotHeight + d); q.forEach(function (a) {
                    var b = a.point, c = b.series; a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit", x: m || b.isHeader || l.positioner ? a.x : b.plotX + r.plotLeft + f.distance, y: a.pos + D, anchorX: b.isHeader ? b.plotX + r.plotLeft :
                            b.plotX + c.xAxis.pos, anchorY: b.isHeader ? r.plotTop + r.plotHeight / 2 : b.plotY + c.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var e = this.chart, f = this.getLabel(), q = (this.options.positioner || this.getPosition).call(this, f.width, f.height, a), r = a.plotX + e.plotLeft; a = a.plotY + e.plotTop; var c; this.outside && (c = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(f.width + c, f.height + c, !1), r += e.pointer.chartPosition.left - q.x, a += e.pointer.chartPosition.top - q.y); this.move(Math.round(q.x), Math.round(q.y || 0),
                    r, a)
            }, getDateFormat: function (a, e, f, q) { var r = this.chart.time, c = r.dateFormat("%m-%d %H:%M:%S.%L", e), m, l, d = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, u = "millisecond"; for (l in x) { if (a === x.week && +r.dateFormat("%w", e) === f && "00:00:00.000" === c.substr(6)) { l = "week"; break } if (x[l] > a) { l = u; break } if (d[l] && c.substr(d[l]) !== "01-01 00:00:00.000".substr(d[l])) break; "week" !== l && (u = l) } l && (m = r.resolveDTLFormat(q[l]).main); return m }, getXDateFormat: function (a, e, f) {
                e = e.dateTimeLabelFormats; var q = f && f.closestPointRange;
                return (q ? this.getDateFormat(q, a.x, f.options.startOfWeek, e) : e.day) || e.year
            }, tooltipFooterHeaderFormatter: function (g, e) {
                var f = e ? "footer" : "header", q = g.series, r = q.tooltipOptions, c = r.xDateFormat, m = q.xAxis, l = m && "datetime" === m.options.type && n(g.key), d = r[f + "Format"]; e = { isFooter: e, labelConfig: g }; a.fireEvent(this, "headerFormatter", e, function (a) {
                l && !c && (c = this.getXDateFormat(g, r, m)); l && c && (g.point && g.point.tooltipDateKeys || ["key"]).forEach(function (a) { d = d.replace("{point." + a + "}", "{point." + a + ":" + c + "}") }); q.chart.styledMode &&
                    (d = this.styledModeFormat(d)); a.text = F(d, { point: g, series: q }, this.chart.time)
                }); return e.text
            }, bodyFormatter: function (a) { return a.map(function (a) { var f = a.series.tooltipOptions; return (f[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, f[(a.point.formatPrefix || "point") + "Format"] || "") }) }, styledModeFormat: function (a) { return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"') }
        }
    })(H);
    (function (a) {
        var C = a.addEvent, B = a.attr, F = a.charts, n = a.color, g = a.css, t = a.defined, w = a.extend, v = a.find, x = a.fireEvent, p = a.isNumber, e = a.isObject, f = a.offset, q = a.pick, r = a.splat, c = a.Tooltip; a.Pointer = function (a, c) { this.init(a, c) }; a.Pointer.prototype = {
            init: function (a, l) { this.options = l; this.chart = a; this.runChartClick = l.chart.events && !!l.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; c && (a.tooltip = new c(a, l.tooltip), this.followTouchMove = q(l.tooltip.followTouchMove, !0)); this.setDOMEvents() }, zoomOption: function (a) {
                var c =
                    this.chart, d = c.options.chart, m = d.zoomType || "", c = c.inverted; /touch/.test(a.type) && (m = q(d.pinchType, m)); this.zoomX = a = /x/.test(m); this.zoomY = m = /y/.test(m); this.zoomHor = a && !c || m && c; this.zoomVert = m && !c || a && c; this.hasZoom = a || m
            }, normalize: function (a, c) { var d; d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a; c || (this.chartPosition = c = f(this.chart.container)); return w(a, { chartX: Math.round(d.pageX - c.left), chartY: Math.round(d.pageY - c.top) }) }, getCoordinates: function (a) {
                var c = { xAxis: [], yAxis: [] };
                this.chart.axes.forEach(function (d) { c[d.isXAxis ? "xAxis" : "yAxis"].push({ axis: d, value: d.toValue(a[d.horiz ? "chartX" : "chartY"]) }) }); return c
            }, findNearestKDPoint: function (a, c, d) {
                var m; a.forEach(function (a) {
                    var l = !(a.noSharedTooltip && c) && 0 > a.options.findNearestPointBy.indexOf("y"); a = a.searchPoint(d, l); if ((l = e(a, !0)) && !(l = !e(m, !0))) var l = m.distX - a.distX, f = m.dist - a.dist, b = (a.series.group && a.series.group.zIndex) - (m.series.group && m.series.group.zIndex), l = 0 < (0 !== l && c ? l : 0 !== f ? f : 0 !== b ? b : m.series.index > a.series.index ?
                        -1 : 1); l && (m = a)
                }); return m
            }, getPointFromEvent: function (a) { a = a.target; for (var c; a && !c;)c = a.point, a = a.parentNode; return c }, getChartCoordinatesFromPoint: function (a, c) { var d = a.series, m = d.xAxis, d = d.yAxis, l = q(a.clientX, a.plotX), f = a.shapeArgs; if (m && d) return c ? { chartX: m.len + m.pos - l, chartY: d.len + d.pos - a.plotY } : { chartX: l + m.pos, chartY: a.plotY + d.pos }; if (f && f.x && f.y) return { chartX: f.x, chartY: f.y } }, getHoverData: function (a, c, d, f, r, g) {
                var m, b = []; f = !(!f || !a); var k = c && !c.stickyTracking ? [c] : d.filter(function (b) {
                    return b.visible &&
                        !(!r && b.directTouch) && q(b.options.enableMouseTracking, !0) && b.stickyTracking
                }); c = (m = f ? a : this.findNearestKDPoint(k, r, g)) && m.series; m && (r && !c.noSharedTooltip ? (k = d.filter(function (b) { return b.visible && !(!r && b.directTouch) && q(b.options.enableMouseTracking, !0) && !b.noSharedTooltip }), k.forEach(function (a) { var c = v(a.points, function (b) { return b.x === m.x && !b.isNull }); e(c) && (a.chart.isBoosting && (c = a.getPoint(c)), b.push(c)) })) : b.push(m)); return { hoverPoint: m, hoverSeries: c, hoverPoints: b }
            }, runPointActions: function (c,
                l) {
                    var d = this.chart, m = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0, f = m ? m.shared : !1, e = l || d.hoverPoint, r = e && e.series || d.hoverSeries, r = this.getHoverData(e, r, d.series, "touchmove" !== c.type && (!!l || r && r.directTouch && this.isDirectTouch), f, c), b, e = r.hoverPoint; b = r.hoverPoints; l = (r = r.hoverSeries) && r.tooltipOptions.followPointer; f = f && r && !r.noSharedTooltip; if (e && (e !== d.hoverPoint || m && m.isHidden)) {
                        (d.hoverPoints || []).forEach(function (a) { -1 === b.indexOf(a) && a.setState() }); (b || []).forEach(function (b) { b.setState("hover") });
                        if (d.hoverSeries !== r) r.onMouseOver(); d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut"); if (!e.series) return; e.firePointEvent("mouseOver"); d.hoverPoints = b; d.hoverPoint = e; m && m.refresh(f ? b : e, c)
                    } else l && m && !m.isHidden && (e = m.getAnchor([{}], c), m.updatePosition({ plotX: e[0], plotY: e[1] })); this.unDocMouseMove || (this.unDocMouseMove = C(d.container.ownerDocument, "mousemove", function (b) { var c = F[a.hoverChartIndex]; if (c) c.pointer.onDocumentMouseMove(b) })); d.axes.forEach(function (k) {
                        var d = q(k.crosshair.snap, !0),
                        m = d ? a.find(b, function (b) { return b.series[k.coll] === k }) : void 0; m || !d ? k.drawCrosshair(c, m) : k.hideCrosshair()
                    })
            }, reset: function (a, c) {
                var d = this.chart, m = d.hoverSeries, l = d.hoverPoint, f = d.hoverPoints, e = d.tooltip, b = e && e.shared ? f : l; a && b && r(b).forEach(function (b) { b.series.isCartesian && void 0 === b.plotX && (a = !1) }); if (a) e && b && b.length && (e.refresh(b), e.shared && f ? f.forEach(function (b) {
                    b.setState(b.state, !0); b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null, b), b.series.yAxis.crosshair &&
                        b.series.yAxis.drawCrosshair(null, b))
                }) : l && (l.setState(l.state, !0), d.axes.forEach(function (b) { b.crosshair && b.drawCrosshair(null, l) }))); else { if (l) l.onMouseOut(); f && f.forEach(function (b) { b.setState() }); if (m) m.onMouseOut(); e && e.hide(c); this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()); d.axes.forEach(function (b) { b.hideCrosshair() }); this.hoverX = d.hoverPoints = d.hoverPoint = null }
            }, scaleGroups: function (a, c) {
                var d = this.chart, m; d.series.forEach(function (l) {
                    m = a || l.getPlotBox(); l.xAxis && l.xAxis.zoomEnabled &&
                        l.group && (l.group.attr(m), l.markerGroup && (l.markerGroup.attr(m), l.markerGroup.clip(c ? d.clipRect : null)), l.dataLabelsGroup && l.dataLabelsGroup.attr(m))
                }); d.clipRect.attr(c || d.clipBox)
            }, dragStart: function (a) { var c = this.chart; c.mouseIsDown = a.type; c.cancelClick = !1; c.mouseDownX = this.mouseDownX = a.chartX; c.mouseDownY = this.mouseDownY = a.chartY }, drag: function (a) {
                var c = this.chart, d = c.options.chart, m = a.chartX, f = a.chartY, e = this.zoomHor, r = this.zoomVert, b = c.plotLeft, k = c.plotTop, z = c.plotWidth, q = c.plotHeight, h, g = this.selectionMarker,
                p = this.mouseDownX, t = this.mouseDownY, v = d.panKey && a[d.panKey + "Key"]; g && g.touch || (m < b ? m = b : m > b + z && (m = b + z), f < k ? f = k : f > k + q && (f = k + q), this.hasDragged = Math.sqrt(Math.pow(p - m, 2) + Math.pow(t - f, 2)), 10 < this.hasDragged && (h = c.isInsidePlot(p - b, t - k), c.hasCartesianSeries && (this.zoomX || this.zoomY) && h && !v && !g && (this.selectionMarker = g = c.renderer.rect(b, k, e ? 1 : z, r ? 1 : q, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), c.styledMode || g.attr({ fill: d.selectionMarkerFill || n("#335cad").setOpacity(.25).get() })), g &&
                    e && (m -= p, g.attr({ width: Math.abs(m), x: (0 < m ? 0 : m) + p })), g && r && (m = f - t, g.attr({ height: Math.abs(m), y: (0 < m ? 0 : m) + t })), h && !g && d.panning && c.pan(a, d.panning)))
            }, drop: function (a) {
                var c = this, d = this.chart, m = this.hasPinched; if (this.selectionMarker) {
                    var f = { originalEvent: a, xAxis: [], yAxis: [] }, e = this.selectionMarker, r = e.attr ? e.attr("x") : e.x, b = e.attr ? e.attr("y") : e.y, k = e.attr ? e.attr("width") : e.width, z = e.attr ? e.attr("height") : e.height, q; if (this.hasDragged || m) d.axes.forEach(function (h) {
                        if (h.zoomEnabled && t(h.min) && (m || c[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[h.coll]])) { var d = h.horiz, l = "touchend" === a.type ? h.minPixelPadding : 0, e = h.toValue((d ? r : b) + l), d = h.toValue((d ? r + k : b + z) - l); f[h.coll].push({ axis: h, min: Math.min(e, d), max: Math.max(e, d) }); q = !0 }
                    }), q && x(d, "selection", f, function (b) { d.zoom(w(b, m ? { animation: !1 } : null)) }); p(d.index) && (this.selectionMarker = this.selectionMarker.destroy()); m && this.scaleGroups()
                } d && p(d.index) && (g(d.container, { cursor: d._cursor }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown =
                    [])
            }, onContainerMouseDown: function (a) { a = this.normalize(a); 2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a)) }, onDocumentMouseUp: function (c) { F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(c) }, onDocumentMouseMove: function (a) { var c = this.chart, d = this.chartPosition; a = this.normalize(a, d); !d || this.inClass(a.target, "highcharts-tracker") || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) || this.reset() }, onContainerMouseLeave: function (c) {
                var m = F[a.hoverChartIndex];
                m && (c.relatedTarget || c.toElement) && (m.pointer.reset(), m.pointer.chartPosition = null)
            }, onContainerMouseMove: function (c) { var m = this.chart; t(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = m.index); c = this.normalize(c); c.returnValue = !1; "mousedown" === m.mouseIsDown && this.drag(c); !this.inClass(c.target, "highcharts-tracker") && !m.isInsidePlot(c.chartX - m.plotLeft, c.chartY - m.plotTop) || m.openMenu || this.runPointActions(c) }, inClass: function (a, c) {
                for (var d; a;) {
                    if (d =
                        B(a, "class")) { if (-1 !== d.indexOf(c)) return !0; if (-1 !== d.indexOf("highcharts-container")) return !1 } a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) { var c = this.chart.hoverSeries; a = a.relatedTarget || a.toElement; this.isDirectTouch = !1; if (!(!c || !a || c.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + c.index) && this.inClass(a, "highcharts-tracker"))) c.onMouseOut() }, onContainerClick: function (a) {
                var c = this.chart, d = c.hoverPoint, m = c.plotLeft, f = c.plotTop; a = this.normalize(a); c.cancelClick ||
                    (d && this.inClass(a.target, "highcharts-tracker") ? (x(d.series, "click", w(a, { point: d })), c.hoverPoint && d.firePointEvent("click", a)) : (w(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX - m, a.chartY - f) && x(c, "click", a)))
            }, setDOMEvents: function () {
                var c = this, f = c.chart.container, d = f.ownerDocument; f.onmousedown = function (a) { c.onContainerMouseDown(a) }; f.onmousemove = function (a) { c.onContainerMouseMove(a) }; f.onclick = function (a) { c.onContainerClick(a) }; this.unbindContainerMouseLeave = C(f, "mouseleave", c.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(d, "mouseup", c.onDocumentMouseUp)); a.hasTouch && (f.ontouchstart = function (a) { c.onContainerTouchStart(a) }, f.ontouchmove = function (a) { c.onContainerTouchMove(a) }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(d, "touchend", c.onDocumentTouchEnd)))
            }, destroy: function () {
                var c = this; c.unDocMouseMove && c.unDocMouseMove(); this.unbindContainerMouseLeave(); a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd &&
                    (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd())); clearInterval(c.tooltipTimeout); a.objectEach(c, function (a, d) { c[d] = null })
            }
        }
    })(H); (function (a) {
        var C = a.charts, B = a.extend, F = a.noop, n = a.pick; B(a.Pointer.prototype, {
            pinchTranslate: function (a, n, w, v, x, p) { this.zoomHor && this.pinchTranslateDirection(!0, a, n, w, v, x, p); this.zoomVert && this.pinchTranslateDirection(!1, a, n, w, v, x, p) }, pinchTranslateDirection: function (a, n, w, v, x, p, e, f) {
                var q = this.chart, r = a ? "x" : "y", c = a ? "X" : "Y", m = "chart" + c, l = a ? "width" : "height", d = q["plot" +
                    (a ? "Left" : "Top")], u, g, D = f || 1, y = q.inverted, b = q.bounds[a ? "h" : "v"], k = 1 === n.length, z = n[0][m], E = w[0][m], h = !k && n[1][m], A = !k && w[1][m], t; w = function () { !k && 20 < Math.abs(z - h) && (D = f || Math.abs(E - A) / Math.abs(z - h)); g = (d - E) / D + z; u = q["plot" + (a ? "Width" : "Height")] / D }; w(); n = g; n < b.min ? (n = b.min, t = !0) : n + u > b.max && (n = b.max - u, t = !0); t ? (E -= .8 * (E - e[r][0]), k || (A -= .8 * (A - e[r][1])), w()) : e[r] = [E, A]; y || (p[r] = g - d, p[l] = u); p = y ? 1 / D : D; x[l] = u; x[r] = n; v[y ? a ? "scaleY" : "scaleX" : "scale" + c] = D; v["translate" + c] = p * d + (E - p * z)
            }, pinch: function (a) {
                var g =
                    this, w = g.chart, v = g.pinchDown, x = a.touches, p = x.length, e = g.lastValidTouch, f = g.hasZoom, q = g.selectionMarker, r = {}, c = 1 === p && (g.inClass(a.target, "highcharts-tracker") && w.runTrackerClick || g.runChartClick), m = {}; 1 < p && (g.initiated = !0); f && g.initiated && !c && a.preventDefault();[].map.call(x, function (a) { return g.normalize(a) }); "touchstart" === a.type ? ([].forEach.call(x, function (a, c) { v[c] = { chartX: a.chartX, chartY: a.chartY } }), e.x = [v[0].chartX, v[1] && v[1].chartX], e.y = [v[0].chartY, v[1] && v[1].chartY], w.axes.forEach(function (a) {
                        if (a.zoomEnabled) {
                            var c =
                                w.bounds[a.horiz ? "h" : "v"], m = a.minPixelPadding, f = a.toPixels(n(a.options.min, a.dataMin)), e = a.toPixels(n(a.options.max, a.dataMax)), l = Math.max(f, e); c.min = Math.min(a.pos, Math.min(f, e) - m); c.max = Math.max(a.pos + a.len, l + m)
                        }
                    }), g.res = !0) : g.followTouchMove && 1 === p ? this.runPointActions(g.normalize(a)) : v.length && (q || (g.selectionMarker = q = B({ destroy: F, touch: !0 }, w.plotBox)), g.pinchTranslate(v, x, r, q, m, e), g.hasPinched = f, g.scaleGroups(r, m), g.res && (g.res = !1, this.reset(!1, 0)))
            }, touch: function (g, t) {
                var w = this.chart, v, x;
                if (w.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 }); a.hoverChartIndex = w.index; 1 === g.touches.length ? (g = this.normalize(g), (x = w.isInsidePlot(g.chartX - w.plotLeft, g.chartY - w.plotTop)) && !w.openMenu ? (t && this.runPointActions(g), "touchmove" === g.type && (t = this.pinchDown, v = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - g.chartX, 2) + Math.pow(t[0].chartY - g.chartY, 2)) : !1), n(v, !0) && this.pinch(g)) : t && this.reset()) : 2 === g.touches.length && this.pinch(g)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) { this.touch(a) }, onDocumentTouchEnd: function (g) { C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(g) }
        })
    })(H); (function (a) {
        var C = a.addEvent, B = a.charts, F = a.css, n = a.doc, g = a.extend, t = a.noop, w = a.Pointer, v = a.removeEvent, x = a.win, p = a.wrap; if (!a.hasTouch && (x.PointerEvent || x.MSPointerEvent)) {
            var e = {}, f = !!x.PointerEvent, q = function () {
                var c = []; c.item = function (a) { return this[a] }; a.objectEach(e, function (a) { c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }) });
                return c
            }, r = function (c, m, f, d) { "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !B[a.hoverChartIndex] || (d(c), d = B[a.hoverChartIndex].pointer, d[m]({ type: f, target: c.currentTarget, preventDefault: t, touches: q() })) }; g(w.prototype, {
                onContainerPointerDown: function (a) { r(a, "onContainerTouchStart", "touchstart", function (a) { e[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } }) }, onContainerPointerMove: function (a) {
                    r(a, "onContainerTouchMove", "touchmove", function (a) {
                    e[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    }; e[a.pointerId].target || (e[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) { r(a, "onDocumentTouchEnd", "touchend", function (a) { delete e[a.pointerId] }) }, batchMSEvents: function (a) { a(this.chart.container, f ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, f ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(n, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp) }
            }); p(w.prototype, "init", function (a, m, f) {
                a.call(this, m, f); this.hasZoom &&
                    F(m.container, { "-ms-touch-action": "none", "touch-action": "none" })
            }); p(w.prototype, "setDOMEvents", function (a) { a.apply(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C) }); p(w.prototype, "destroy", function (a) { this.batchMSEvents(v); a.call(this) })
        }
    })(H); (function (a) {
        var C = a.addEvent, B = a.css, F = a.discardElement, n = a.defined, g = a.fireEvent, t = a.isFirefox, w = a.marginNames, v = a.merge, x = a.pick, p = a.setAnimation, e = a.stableSort, f = a.win, q = a.wrap; a.Legend = function (a, c) { this.init(a, c) }; a.Legend.prototype =
            {
                init: function (a, c) { this.chart = a; this.setOptions(c); c.enabled && (this.render(), C(this.chart, "endResize", function () { this.legend.positionCheckboxes() }), this.proximate ? this.unchartrender = C(this.chart, "render", function () { this.legend.proximatePositions(); this.legend.positionItems() }) : this.unchartrender && this.unchartrender()) }, setOptions: function (a) {
                    var c = x(a.padding, 8); this.options = a; this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = v(this.itemStyle, a.itemHiddenStyle)); this.itemMarginTop =
                        a.itemMarginTop || 0; this.padding = c; this.initialItemY = c - 5; this.symbolWidth = x(a.symbolWidth, 16); this.pages = []; this.proximate = "proximate" === a.layout && !this.chart.inverted
                }, update: function (a, c) { var m = this.chart; this.setOptions(v(!0, this.options, a)); this.destroy(); m.isDirtyLegend = m.isDirtyBox = !0; x(c, !0) && m.redraw(); g(this, "afterUpdate") }, colorizeItem: function (a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"); if (!this.chart.styledMode) {
                    var m = this.options, f = a.legendItem, d = a.legendLine,
                    e = a.legendSymbol, r = this.itemHiddenStyle.color, m = c ? m.itemStyle.color : r, q = c ? a.color || r : r, p = a.options && a.options.marker, b = { fill: q }; f && f.css({ fill: m, color: m }); d && d.attr({ stroke: q }); e && (p && e.isMarker && (b = a.pointAttribs(), c || (b.stroke = b.fill = r)), e.attr(b))
                } g(this, "afterColorizeItem", { item: a, visible: c })
                }, positionItems: function () { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes() }, positionItem: function (a) {
                    var c = this.options, m = c.symbolPadding, c = !c.rtl, f = a._legendItemPos,
                    d = f[0], f = f[1], e = a.checkbox; if ((a = a.legendGroup) && a.element) a[n(a.translateY) ? "animate" : "attr"]({ translateX: c ? d : this.legendWidth - d - 2 * m - 4, translateY: f }); e && (e.x = d, e.y = f)
                }, destroyItem: function (a) { var c = a.checkbox;["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (c) { a[c] && (a[c] = a[c].destroy()) }); c && F(a.checkbox) }, destroy: function () {
                    function a(a) { this[a] && (this[a] = this[a].destroy()) } this.getAllItems().forEach(function (c) { ["legendItem", "legendGroup"].forEach(a, c) }); "clipRect up down pager nav box title group".split(" ").forEach(a,
                        this); this.display = null
                }, positionCheckboxes: function () { var a = this.group && this.group.alignAttr, c, f = this.clipHeight || this.legendHeight, e = this.titleHeight; a && (c = a.translateY, this.allItems.forEach(function (d) { var m = d.checkbox, l; m && (l = c + e + m.y + (this.scrollOffset || 0) + 3, B(m, { left: a.translateX + d.checkboxOffset + m.x - 20 + "px", top: l + "px", display: this.proximate || l > c - 6 && l < c + f - 6 ? "" : "none" })) }, this)) }, renderTitle: function () {
                    var a = this.options, c = this.padding, f = a.title, e = 0; f.text && (this.title || (this.title = this.chart.renderer.label(f.text,
                        c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(f.style), this.title.add(this.group)), f.width || this.title.css({ width: this.maxLegendWidth + "px" }), a = this.title.getBBox(), e = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: e })); this.titleHeight = e
                }, setText: function (f) { var c = this.options; f.legendItem.attr({ text: c.labelFormat ? a.format(c.labelFormat, f, this.chart.time) : c.labelFormatter.call(f) }) }, renderItem: function (a) {
                    var c = this.chart,
                    f = c.renderer, e = this.options, d = this.symbolWidth, q = e.symbolPadding, r = this.itemStyle, g = this.itemHiddenStyle, p = "horizontal" === e.layout ? x(e.itemDistance, 20) : 0, b = !e.rtl, k = a.legendItem, z = !a.series, E = !z && a.series.drawLegendSymbol ? a.series : a, h = E.options, h = this.createCheckboxForItem && h && h.showCheckbox, p = d + q + p + (h ? 20 : 0), A = e.useHTML, n = a.options.className; k || (a.legendGroup = f.g("legend-item").addClass("highcharts-" + E.type + "-series highcharts-color-" + a.colorIndex + (n ? " " + n : "") + (z ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup),
                        a.legendItem = k = f.text("", b ? d + q : -q, this.baseline || 0, A), c.styledMode || k.css(v(a.visible ? r : g)), k.attr({ align: b ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.fontMetrics = f.fontMetrics(c.styledMode ? 12 : r.fontSize, k), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, k.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, E.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, k, A), h && this.createCheckboxForItem(a)); this.colorizeItem(a, a.visible);
                    !c.styledMode && r.width || k.css({ width: (e.itemWidth || this.widthOption || c.spacingBox.width) - p }); this.setText(a); c = k.getBBox(); a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || c.width + p; this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth); this.totalItemWidth += a.itemWidth; this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height || this.symbolHeight)
                }, layoutItem: function (a) {
                    var c = this.options, f = this.padding, e = "horizontal" === c.layout, d = a.itemHeight, q = c.itemMarginBottom || 0, r = this.itemMarginTop,
                    g = e ? x(c.itemDistance, 20) : 0, p = this.maxLegendWidth, c = c.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth; e && this.itemX - f + c > p && (this.itemX = f, this.itemY += r + this.lastLineHeight + q, this.lastLineHeight = 0); this.lastItemY = r + this.itemY + q; this.lastLineHeight = Math.max(d, this.lastLineHeight); a._legendItemPos = [this.itemX, this.itemY]; e ? this.itemX += c : (this.itemY += r + d + q, this.lastLineHeight = d); this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - f - (a.checkbox ? 0 : g) : c) + f, this.offsetWidth)
                }, getAllItems: function () {
                    var a =
                        []; this.chart.series.forEach(function (c) { var f = c && c.options; c && x(f.showInLegend, n(f.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === f.legendType ? c.data : c))) }); g(this, "afterGetAllItems", { allItems: a }); return a
                }, getAlignment: function () { var a = this.options; return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0) }, adjustMargins: function (a, c) {
                    var f = this.chart, e = this.options, d = this.getAlignment(); d && [/(lth|ct|rth)/, /(rtv|rm|rbv)/,
                        /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (m, l) { m.test(d) && !n(a[l]) && (f[w[l]] = Math.max(f[w[l]], f.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * e[l % 2 ? "x" : "y"] + x(e.margin, 12) + c[l] + (0 === l && void 0 !== f.options.title.margin ? f.titleOffset + f.options.title.margin : 0))) })
                }, proximatePositions: function () {
                    var f = this.chart, c = [], m = "left" === this.options.align; this.allItems.forEach(function (e) {
                        var d, l; d = m; e.xAxis && e.points && (e.xAxis.options.reversed && (d = !d), d = a.find(d ? e.points : e.points.slice(0).reverse(),
                            function (c) { return a.isNumber(c.plotY) }), l = e.legendGroup.getBBox().height, c.push({ target: e.visible ? (d ? d.plotY : e.xAxis.height) - .3 * l : f.plotHeight, size: l, item: e }))
                    }, this); a.distribute(c, f.plotHeight); c.forEach(function (a) { a.item._legendItemPos[1] = f.plotTop - f.spacing[0] + a.pos })
                }, render: function () {
                    var f = this.chart, c = f.renderer, m = this.group, l, d, q, g = this.box, p = this.options, y = this.padding; this.itemX = y; this.itemY = this.initialItemY; this.lastItemY = this.offsetWidth = 0; this.widthOption = a.relativeLength(p.width,
                        f.spacingBox.width - y); d = f.spacingBox.width - 2 * y - p.x; -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (d /= 2); this.maxLegendWidth = this.widthOption || d; m || (this.group = m = c.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = c.g().attr({ zIndex: 1 }).add(m), this.scrollGroup = c.g().add(this.contentGroup)); this.renderTitle(); l = this.getAllItems(); e(l, function (a, c) { return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0) }); p.reversed && l.reverse(); this.allItems = l; this.display =
                            d = !!l.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; l.forEach(this.renderItem, this); l.forEach(this.layoutItem, this); l = (this.widthOption || this.offsetWidth) + y; q = this.lastItemY + this.lastLineHeight + this.titleHeight; q = this.handleOverflow(q); q += y; g || (this.box = g = c.rect().addClass("highcharts-legend-box").attr({ r: p.borderRadius }).add(m), g.isNew = !0); f.styledMode || g.attr({ stroke: p.borderColor, "stroke-width": p.borderWidth || 0, fill: p.backgroundColor || "none" }).shadow(p.shadow);
                    0 < l && 0 < q && (g[g.isNew ? "attr" : "animate"](g.crisp.call({}, { x: 0, y: 0, width: l, height: q }, g.strokeWidth())), g.isNew = !1); g[d ? "show" : "hide"](); f.styledMode && "none" === m.getStyle("display") && (l = q = 0); this.legendWidth = l; this.legendHeight = q; d && (c = f.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (c = v(c, { y: c.y + f.titleOffset + f.options.title.margin })), m.align(v(p, { width: l, height: q, verticalAlign: this.proximate ? "top" : p.verticalAlign }), !0, c)); this.proximate || this.positionItems()
                }, handleOverflow: function (a) {
                    var c =
                        this, f = this.chart, e = f.renderer, d = this.options, q = d.y, g = this.padding, q = f.spacingBox.height + ("top" === d.verticalAlign ? -q : q) - g, r = d.maxHeight, p, b = this.clipRect, k = d.navigation, z = x(k.animation, !0), E = k.arrowSize || 12, h = this.nav, A = this.pages, n, t = this.allItems, v = function (a) { "number" === typeof a ? b.attr({ height: a }) : b && (c.clipRect = b.destroy(), c.contentGroup.clip()); c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + g + "px,9999px," + (g + a) + "px,0)" : "auto") }; "horizontal" !== d.layout || "middle" === d.verticalAlign ||
                            d.floating || (q /= 2); r && (q = Math.min(q, r)); A.length = 0; a > q && !1 !== k.enabled ? (this.clipHeight = p = Math.max(q - 20 - this.titleHeight - g, 0), this.currentPage = x(this.currentPage, 1), this.fullHeight = a, t.forEach(function (a, b) { var c = a._legendItemPos[1], k = Math.round(a.legendItem.getBBox().height), h = A.length; if (!h || c - A[h - 1] > p && (n || c) !== A[h - 1]) A.push(n || c), h++; a.pageIx = h - 1; n && (t[b - 1].pageIx = h - 1); b === t.length - 1 && c + k - A[h - 1] > p && c !== n && (A.push(c), a.pageIx = h); c !== n && (n = c) }), b || (b = c.clipRect = e.clipRect(0, g, 9999, 0), c.contentGroup.clip(b)),
                                v(p), h || (this.nav = h = e.g().attr({ zIndex: 1 }).add(this.group), this.up = e.symbol("triangle", 0, 0, E, E).on("click", function () { c.scroll(-1, z) }).add(h), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), f.styledMode || this.pager.css(k.style), this.pager.add(h), this.down = e.symbol("triangle-down", 0, 0, E, E).on("click", function () { c.scroll(1, z) }).add(h)), c.scroll(0), a = q) : h && (v(), this.nav = h.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return a
                }, scroll: function (a, c) {
                    var f = this.pages,
                    e = f.length; a = this.currentPage + a; var d = this.clipHeight, q = this.options.navigation, g = this.pager, r = this.padding; a > e && (a = e); 0 < a && (void 0 !== c && p(c, this.chart), this.nav.attr({ translateX: r, translateY: d + this.padding + 7 + this.titleHeight, visibility: "visible" }), this.up.attr({ "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), g.attr({ text: a + "/" + e }), this.down.attr({ x: 18 + this.pager.getBBox().width, "class": a === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }), this.chart.styledMode ||
                        (this.up.attr({ fill: 1 === a ? q.inactiveColor : q.activeColor }).css({ cursor: 1 === a ? "default" : "pointer" }), this.down.attr({ fill: a === e ? q.inactiveColor : q.activeColor }).css({ cursor: a === e ? "default" : "pointer" })), this.scrollOffset = -f[a - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = a, this.positionCheckboxes())
                }
            }; a.LegendSymbolMixin = {
                drawRectangle: function (a, c) {
                    var f = a.symbolHeight, e = a.options.squareSymbol; c.legendSymbol = this.chart.renderer.rect(e ? (a.symbolWidth - f) /
                        2 : 0, a.baseline - f + 1, e ? f : a.symbolWidth, f, x(a.options.symbolRadius, f / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(c.legendGroup)
                }, drawLineMarker: function (a) {
                    var c = this.options, f = c.marker, e = a.symbolWidth, d = a.symbolHeight, q = d / 2, g = this.chart.renderer, r = this.legendGroup; a = a.baseline - Math.round(.3 * a.fontMetrics.b); var p = {}; this.chart.styledMode || (p = { "stroke-width": c.lineWidth || 0 }, c.dashStyle && (p.dashstyle = c.dashStyle)); this.legendLine = g.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(p).add(r);
                    f && !1 !== f.enabled && e && (c = Math.min(x(f.radius, q), q), 0 === this.symbol.indexOf("url") && (f = v(f, { width: d, height: d }), c = 0), this.legendSymbol = f = g.symbol(this.symbol, e / 2 - c, a - c, 2 * c, 2 * c, f).addClass("highcharts-point").add(r), f.isMarker = !0)
                }
            }; (/Trident\/7\.0/.test(f.navigator.userAgent) || t) && q(a.Legend.prototype, "positionItem", function (a, c) { var f = this, e = function () { c._legendItemPos && a.call(f, c) }; e(); f.bubbleLegend || setTimeout(e) })
    })(H); (function (a) {
        var C = a.addEvent, B = a.animate, F = a.animObject, n = a.attr, g = a.doc, t =
            a.Axis, w = a.createElement, v = a.defaultOptions, x = a.discardElement, p = a.charts, e = a.css, f = a.defined, q = a.extend, r = a.find, c = a.fireEvent, m = a.isNumber, l = a.isObject, d = a.isString, u = a.Legend, G = a.marginNames, D = a.merge, y = a.objectEach, b = a.Pointer, k = a.pick, z = a.pInt, E = a.removeEvent, h = a.seriesTypes, A = a.splat, M = a.syncTimeout, J = a.win, W = a.Chart = function () { this.getArgs.apply(this, arguments) }; a.chart = function (a, b, c) { return new W(a, b, c) }; q(W.prototype, {
                callbacks: [], getArgs: function () {
                    var a = [].slice.call(arguments); if (d(a[0]) ||
                        a[0].nodeName) this.renderTo = a.shift(); this.init(a[0], a[1])
                }, init: function (b, k) {
                    var h, d, f = b.series, e = b.plotOptions || {}; c(this, "init", { args: arguments }, function () {
                    b.series = null; h = D(v, b); for (d in h.plotOptions) h.plotOptions[d].tooltip = e[d] && D(e[d].tooltip) || void 0; h.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip; h.series = b.series = f; this.userOptions = b; var m = h.chart, z = m.events; this.margin = []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback =
                        k; this.isResizing = 0; this.options = h; this.axes = []; this.series = []; this.time = b.time && Object.keys(b.time).length ? new a.Time(b.time) : a.time; this.styledMode = m.styledMode; this.hasCartesianSeries = m.showAxes; var l = this; l.index = p.length; p.push(l); a.chartCount++; z && y(z, function (a, b) { C(l, b, a) }); l.xAxis = []; l.yAxis = []; l.pointCount = l.colorCounter = l.symbolCounter = 0; c(l, "afterInit"); l.firstRender()
                    })
                }, initSeries: function (b) {
                    var c = this.options.chart; (c = h[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0, this); c =
                        new c; c.init(this, b); return c
                }, orderSeries: function (a) { var b = this.series; for (a = a || 0; a < b.length; a++)b[a] && (b[a].index = a, b[a].name = b[a].getName()) }, isInsidePlot: function (a, b, c) { var k = c ? b : a; a = c ? a : b; return 0 <= k && k <= this.plotWidth && 0 <= a && a <= this.plotHeight }, redraw: function (b) {
                    c(this, "beforeRedraw"); var k = this.axes, h = this.series, d = this.pointer, f = this.legend, e = this.userOptions.legend, m = this.isDirtyLegend, z, l, g = this.hasCartesianSeries, u = this.isDirtyBox, r, p = this.renderer, A = p.isHidden(), E = []; this.setResponsive &&
                        this.setResponsive(!1); a.setAnimation(b, this); A && this.temporaryDisplay(); this.layOutTitles(); for (b = h.length; b--;)if (r = h[b], r.options.stacking && (z = !0, r.isDirty)) { l = !0; break } if (l) for (b = h.length; b--;)r = h[b], r.options.stacking && (r.isDirty = !0); h.forEach(function (a) { a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), m = !0) : e && (e.labelFormatter || e.labelFormat) && (m = !0)); a.isDirtyData && c(a, "updatedData") }); m && f && f.options.enabled && (f.render(), this.isDirtyLegend = !1); z && this.getStacks();
                    g && k.forEach(function (a) { a.updateNames(); a.updateYNames && a.updateYNames(); a.setScale() }); this.getMargins(); g && (k.forEach(function (a) { a.isDirty && (u = !0) }), k.forEach(function (a) { var b = a.min + "," + a.max; a.extKey !== b && (a.extKey = b, E.push(function () { c(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes())); delete a.eventArgs })); (u || z) && a.redraw() })); u && this.drawChartBox(); c(this, "predraw"); h.forEach(function (a) { (u || a.isDirty) && a.visible && a.redraw(); a.isDirtyData = !1 }); d && d.reset(!0); p.draw(); c(this, "redraw");
                    c(this, "render"); A && this.temporaryDisplay(!0); E.forEach(function (a) { a.call() })
                }, get: function (a) { function b(b) { return b.id === a || b.options && b.options.id === a } var c, k = this.series, h; c = r(this.axes, b) || r(this.series, b); for (h = 0; !c && h < k.length; h++)c = r(k[h].points || [], b); return c }, getAxes: function () {
                    var a = this, b = this.options, k = b.xAxis = A(b.xAxis || {}), b = b.yAxis = A(b.yAxis || {}); c(this, "getAxes"); k.forEach(function (a, b) { a.index = b; a.isX = !0 }); b.forEach(function (a, b) { a.index = b }); k.concat(b).forEach(function (b) {
                        new t(a,
                            b)
                    }); c(this, "afterGetAxes")
                }, getSelectedPoints: function () { var a = []; this.series.forEach(function (b) { a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function (a) { return a.selected })) }); return a }, getSelectedSeries: function () { return this.series.filter(function (a) { return a.selected }) }, setTitle: function (a, b, c) {
                    var k = this, h = k.options, d = k.styledMode, f; f = h.title = D(!d && { style: { color: "#333333", fontSize: h.isStock ? "16px" : "18px" } }, h.title, a); h = h.subtitle = D(!d && { style: { color: "#666666" } }, h.subtitle, b);
                    [["title", a, f], ["subtitle", b, h]].forEach(function (a, b) { var c = a[0], h = k[c], f = a[1]; a = a[2]; h && f && (k[c] = h = h.destroy()); a && !h && (k[c] = k.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), k[c].update = function (a) { k.setTitle(!b && a, b && a) }, d || k[c].css(a.style)) }); k.layOutTitles(c)
                }, layOutTitles: function (a) {
                    var b = 0, c, h = this.renderer, d = this.spacingBox;["title", "subtitle"].forEach(function (a) {
                        var c = this[a], k = this.options[a]; a = "title" === a ? -3 : k.verticalAlign ?
                            0 : b + 2; var f; c && (this.styledMode || (f = k.style.fontSize), f = h.fontMetrics(f, c).b, c.css({ width: (k.width || d.width + k.widthAdjust) + "px" }).align(q({ y: a + f }, k), !1, "spacingBox"), k.floating || k.verticalAlign || (b = Math.ceil(b + c.getBBox(k.useHTML).height)))
                    }, this); c = this.titleOffset !== b; this.titleOffset = b; !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && k(a, !0) && this.isDirtyBox && this.redraw())
                }, getChartSize: function () {
                    var b = this.options.chart, c = b.width, b = b.height, k = this.renderTo; f(c) ||
                        (this.containerWidth = a.getStyle(k, "width")); f(b) || (this.containerHeight = a.getStyle(k, "height")); this.chartWidth = Math.max(0, c || this.containerWidth || 600); this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                }, temporaryDisplay: function (b) {
                    var c = this.renderTo; if (b) for (; c && c.style;)c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (g.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode; else for (; c && c.style;) {
                        g.body.contains(c) ||
                        c.parentNode || (c.hcOrigDetached = !0, g.body.appendChild(c)); if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important"); c = c.parentNode; if (c === g.body) break
                    }
                }, setClassName: function (a) { this.container.className = "highcharts-container " + (a || "") }, getContainer: function () {
                    var b, k =
                        this.options, h = k.chart, f, l; b = this.renderTo; var u = a.uniqueKey(), r, A; b || (this.renderTo = b = h.renderTo); d(b) && (this.renderTo = b = g.getElementById(b)); b || a.error(13, !0, this); f = z(n(b, "data-highcharts-chart")); m(f) && p[f] && p[f].hasRendered && p[f].destroy(); n(b, "data-highcharts-chart", this.index); b.innerHTML = ""; h.skipClone || b.offsetWidth || this.temporaryDisplay(); this.getChartSize(); f = this.chartWidth; l = this.chartHeight; e(b, { overflow: "hidden" }); this.styledMode || (r = q({
                            position: "relative", overflow: "hidden", width: f +
                                "px", height: l + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                        }, h.style)); this.container = b = w("div", { id: u }, r, b); this._cursor = b.style.cursor; this.renderer = new (a[h.renderer] || a.Renderer)(b, f, l, null, h.forExport, k.exporting && k.exporting.allowHTML, this.styledMode); this.setClassName(h.className); if (this.styledMode) for (A in k.defs) this.renderer.definition(k.defs[A]); else this.renderer.setStyle(h.style); this.renderer.chartIndex = this.index; c(this, "afterGetContainer")
                },
                getMargins: function (a) { var b = this.spacing, k = this.margin, h = this.titleOffset; this.resetMargins(); h && !f(k[0]) && (this.plotTop = Math.max(this.plotTop, h + this.options.title.margin + b[0])); this.legend && this.legend.display && this.legend.adjustMargins(k, b); c(this, "getMargins"); a || this.getAxisMargins() }, getAxisMargins: function () { var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin; a.hasCartesianSeries && a.axes.forEach(function (a) { a.visible && a.getOffset() }); G.forEach(function (k, h) { f(c[h]) || (a[k] += b[h]) }); a.setChartSize() },
                reflow: function (b) { var c = this, k = c.options.chart, h = c.renderTo, d = f(k.width) && f(k.height), e = k.width || a.getStyle(h, "width"), k = k.height || a.getStyle(h, "height"), h = b ? b.target : J; if (!d && !c.isPrinting && e && k && (h === J || h === g)) { if (e !== c.containerWidth || k !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = M(function () { c.container && c.setSize(void 0, void 0, !1) }, b ? 100 : 0); c.containerWidth = e; c.containerHeight = k } }, setReflow: function (a) {
                    var b = this; !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow =
                        this.unbindReflow()) : (this.unbindReflow = C(J, "resize", function (a) { b.reflow(a) }), C(this, "destroy", this.unbindReflow))
                }, setSize: function (b, k, h) {
                    var d = this, f = d.renderer, m; d.isResizing += 1; a.setAnimation(h, d); d.oldChartHeight = d.chartHeight; d.oldChartWidth = d.chartWidth; void 0 !== b && (d.options.chart.width = b); void 0 !== k && (d.options.chart.height = k); d.getChartSize(); d.styledMode || (m = f.globalAnimation, (m ? B : e)(d.container, { width: d.chartWidth + "px", height: d.chartHeight + "px" }, m)); d.setChartSize(!0); f.setSize(d.chartWidth,
                        d.chartHeight, h); d.axes.forEach(function (a) { a.isDirty = !0; a.setScale() }); d.isDirtyLegend = !0; d.isDirtyBox = !0; d.layOutTitles(); d.getMargins(); d.redraw(h); d.oldChartHeight = null; c(d, "resize"); M(function () { d && c(d, "endResize", null, function () { --d.isResizing }) }, F(m).duration)
                }, setChartSize: function (a) {
                    var b = this.inverted, k = this.renderer, h = this.chartWidth, d = this.chartHeight, f = this.options.chart, e = this.spacing, m = this.clipOffset, z, l, q, g; this.plotLeft = z = Math.round(this.plotLeft); this.plotTop = l = Math.round(this.plotTop);
                    this.plotWidth = q = Math.max(0, Math.round(h - z - this.marginRight)); this.plotHeight = g = Math.max(0, Math.round(d - l - this.marginBottom)); this.plotSizeX = b ? g : q; this.plotSizeY = b ? q : g; this.plotBorderWidth = f.plotBorderWidth || 0; this.spacingBox = k.spacingBox = { x: e[3], y: e[0], width: h - e[3] - e[1], height: d - e[0] - e[2] }; this.plotBox = k.plotBox = { x: z, y: l, width: q, height: g }; h = 2 * Math.floor(this.plotBorderWidth / 2); b = Math.ceil(Math.max(h, m[3]) / 2); k = Math.ceil(Math.max(h, m[0]) / 2); this.clipBox = {
                        x: b, y: k, width: Math.floor(this.plotSizeX - Math.max(h,
                            m[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, m[2]) / 2 - k))
                    }; a || this.axes.forEach(function (a) { a.setAxisSize(); a.setAxisTranslation() }); c(this, "afterSetChartSize", { skipAxes: a })
                }, resetMargins: function () {
                    c(this, "resetMargins"); var a = this, b = a.options.chart;["margin", "spacing"].forEach(function (c) { var h = b[c], d = l(h) ? h : [h, h, h, h];["Top", "Right", "Bottom", "Left"].forEach(function (h, f) { a[c][f] = k(b[c + h], d[f]) }) }); G.forEach(function (b, c) { a[b] = k(a.margin[c], a.spacing[c]) }); a.axisOffset = [0, 0, 0,
                        0]; a.clipOffset = [0, 0, 0, 0]
                }, drawChartBox: function () {
                    var a = this.options.chart, b = this.renderer, k = this.chartWidth, h = this.chartHeight, d = this.chartBackground, f = this.plotBackground, e = this.plotBorder, m, z = this.styledMode, l = this.plotBGImage, q = a.backgroundColor, g = a.plotBackgroundColor, u = a.plotBackgroundImage, r, p = this.plotLeft, A = this.plotTop, E = this.plotWidth, y = this.plotHeight, n = this.plotBox, G = this.clipRect, D = this.clipBox, t = "animate"; d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(),
                        t = "attr"); if (z) m = r = d.strokeWidth(); else { m = a.borderWidth || 0; r = m + (a.shadow ? 8 : 0); q = { fill: q || "none" }; if (m || d["stroke-width"]) q.stroke = a.borderColor, q["stroke-width"] = m; d.attr(q).shadow(a.shadow) } d[t]({ x: r / 2, y: r / 2, width: k - r - m % 2, height: h - r - m % 2, r: a.borderRadius }); t = "animate"; f || (t = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add()); f[t](n); z || (f.attr({ fill: g || "none" }).shadow(a.plotShadow), u && (l ? l.animate(n) : this.plotBGImage = b.image(u, p, A, E, y).add())); G ? G.animate({
                            width: D.width,
                            height: D.height
                        }) : this.clipRect = b.clipRect(D); t = "animate"; e || (t = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()); z || e.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" }); e[t](e.crisp({ x: p, y: A, width: E, height: y }, -e.strokeWidth())); this.isDirtyBox = !1; c(this, "afterDrawChartBox")
                }, propFromSeries: function () {
                    var a = this, b = a.options.chart, c, k = a.options.series, d, f;["inverted", "angular", "polar"].forEach(function (e) {
                        c = h[b.type || b.defaultSeriesType];
                        f = b[e] || c && c.prototype[e]; for (d = k && k.length; !f && d--;)(c = h[k[d].type]) && c.prototype[e] && (f = !0); a[e] = f
                    })
                }, linkSeries: function () { var a = this, b = a.series; b.forEach(function (a) { a.linkedSeries.length = 0 }); b.forEach(function (b) { var c = b.options.linkedTo; d(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = k(b.options.visible, c.options.visible, b.visible)) }); c(this, "afterLinkSeries") }, renderSeries: function () {
                    this.series.forEach(function (a) {
                        a.translate();
                        a.render()
                    })
                }, renderLabels: function () { var a = this, b = a.options.labels; b.items && b.items.forEach(function (c) { var k = q(b.style, c.style), h = z(k.left) + a.plotLeft, d = z(k.top) + a.plotTop + 12; delete k.left; delete k.top; a.renderer.text(c.html, h, d).attr({ zIndex: 2 }).css(k).add() }) }, render: function () {
                    var a = this.axes, b = this.renderer, c = this.options, k = 0, h, d, f; this.setTitle(); this.legend = new u(this, c.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); c = this.plotWidth; a.some(function (a) {
                        if (a.horiz &&
                            a.visible && a.options.labels.enabled && a.series.length) return k = 21, !0
                    }); h = this.plotHeight = Math.max(this.plotHeight - k, 0); a.forEach(function (a) { a.setScale() }); this.getAxisMargins(); d = 1.1 < c / this.plotWidth; f = 1.05 < h / this.plotHeight; if (d || f) a.forEach(function (a) { (a.horiz && d || !a.horiz && f) && a.setTickInterval(!0) }), this.getMargins(); this.drawChartBox(); this.hasCartesianSeries && a.forEach(function (a) { a.visible && a.render() }); this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries();
                    this.renderLabels(); this.addCredits(); this.setResponsive && this.setResponsive(); this.hasRendered = !0
                }, addCredits: function (a) {
                    var b = this; a = D(!0, this.options.credits, a); a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { a.href && (J.location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (a) {
                    b.credits =
                        b.credits.destroy(); b.addCredits(a)
                    })
                }, destroy: function () {
                    var b = this, k = b.axes, h = b.series, d = b.container, f, e = d && d.parentNode; c(b, "destroy"); b.renderer.forExport ? a.erase(p, b) : p[b.index] = void 0; a.chartCount--; b.renderTo.removeAttribute("data-highcharts-chart"); E(b); for (f = k.length; f--;)k[f] = k[f].destroy(); this.scroller && this.scroller.destroy && this.scroller.destroy(); for (f = h.length; f--;)h[f] = h[f].destroy(); "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                        var c =
                            b[a]; c && c.destroy && (b[a] = c.destroy())
                    }); d && (d.innerHTML = "", E(d), e && x(d)); y(b, function (a, c) { delete b[c] })
                }, firstRender: function () { var k = this, h = k.options; if (!k.isReadyToRender || k.isReadyToRender()) { k.getContainer(); k.resetMargins(); k.setChartSize(); k.propFromSeries(); k.getAxes(); (a.isArray(h.series) ? h.series : []).forEach(function (a) { k.initSeries(a) }); k.linkSeries(); c(k, "beforeRender"); b && (k.pointer = new b(k, h)); k.render(); if (!k.renderer.imgCount && k.onload) k.onload(); k.temporaryDisplay(!0) } }, onload: function () {
                    [this.callback].concat(this.callbacks).forEach(function (a) {
                    a &&
                        void 0 !== this.index && a.apply(this, [this])
                    }, this); c(this, "load"); c(this, "render"); f(this.index) && this.setReflow(this.options.chart.reflow); this.onload = null
                }
            })
    })(H); (function (a) {
        var C = a.addEvent, B = a.Chart; C(B, "afterSetChartSize", function (B) {
            var n = this.options.chart.scrollablePlotArea; (n = n && n.minWidth) && !this.renderer.forExport && (this.scrollablePixels = n = Math.max(0, n - this.chartWidth)) && (this.plotWidth += n, this.clipBox.width += n, B.skipAxes || this.axes.forEach(function (g) {
                1 === g.side ? g.getPlotLinePath = function () {
                    var n =
                        this.right, w; this.right = n - g.chart.scrollablePixels; w = a.Axis.prototype.getPlotLinePath.apply(this, arguments); this.right = n; return w
                } : (g.setAxisSize(), g.setAxisTranslation())
            }))
        }); C(B, "render", function () { this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed() }); B.prototype.setUpScrolling = function () {
        this.scrollingContainer = a.createElement("div", { className: "highcharts-scrolling" }, { overflowX: "auto", WebkitOverflowScrolling: "touch" }, this.renderTo);
            this.innerContainer = a.createElement("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer); this.innerContainer.appendChild(this.container); this.setUpScrolling = null
        }; B.prototype.applyFixed = function () {
            var B = this.container, n, g, t = !this.fixedDiv; t && (this.fixedDiv = a.createElement("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: 2 }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow =
                "visible", this.fixedRenderer = n = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = n.path().attr({ fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), [this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"].forEach(function (a) {
                    [].forEach.call(B.querySelectorAll(a),
                        function (a) { (a.namespaceURI === n.SVG_NS ? n.box : n.box.parentNode).appendChild(a); a.style.pointerEvents = "auto" })
                })); this.fixedRenderer.setSize(this.chartWidth, this.chartHeight); g = this.chartWidth + this.scrollablePixels; a.stop(this.container); this.container.style.width = g + "px"; this.renderer.boxWrapper.attr({ width: g, height: this.chartHeight, viewBox: [0, 0, g, this.chartHeight].join(" ") }); this.chartBackground.attr({ width: g }); t && (g = this.options.chart.scrollablePlotArea, g.scrollPositionX && (this.scrollingContainer.scrollLeft =
                    this.scrollablePixels * g.scrollPositionX)); t = this.axisOffset; g = this.plotTop - t[0] - 1; var t = this.plotTop + this.plotHeight + t[2], w = this.plotLeft + this.plotWidth - this.scrollablePixels; this.scrollableMask.attr({ d: this.scrollablePixels ? ["M", 0, g, "L", this.plotLeft - 1, g, "L", this.plotLeft - 1, t, "L", 0, t, "Z", "M", w, g, "L", this.chartWidth, g, "L", this.chartWidth, t, "L", w, t, "Z"] : ["M", 0, 0] })
        }
    })(H); (function (a) {
        var C, B = a.extend, F = a.erase, n = a.fireEvent, g = a.format, t = a.isArray, w = a.isNumber, v = a.pick, x = a.uniqueKey, p = a.defined, e = a.removeEvent;
        a.Point = C = function () { }; a.Point.prototype = {
            init: function (a, e, g) {
                var c; c = a.chart.options.chart.colorCount; var f = a.chart.styledMode; this.series = a; f || (this.color = a.color); this.applyOptions(e, g); this.id = p(this.id) ? this.id : x(); a.options.colorByPoint ? (f || (c = a.options.colors || a.chart.options.colors, this.color = this.color || c[a.colorCounter], c = c.length), e = a.colorCounter, a.colorCounter++ , a.colorCounter === c && (a.colorCounter = 0)) : e = a.colorIndex; this.colorIndex = v(this.colorIndex, e); a.chart.pointCount++; n(this, "afterInit");
                return this
            }, applyOptions: function (a, e) {
                var f = this.series, c = f.options.pointValKey || f.pointValKey; a = C.prototype.optionsToObject.call(this, a); B(this, a); this.options = this.options ? B(this.options, a) : a; a.group && delete this.group; a.dataLabels && delete this.dataLabels; c && (this.y = this[c]); this.isNull = v(this.isValid && !this.isValid(), null === this.x || !w(this.y, !0)); this.selected && (this.state = "select"); "name" in this && void 0 === e && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this)); void 0 === this.x && f && (this.x =
                    void 0 === e ? f.autoIncrement(this) : e); return this
            }, setNestedProperty: function (f, e, g) { g.split(".").reduce(function (c, f, l, d) { c[f] = d.length - 1 === l ? e : a.isObject(c[f], !0) ? c[f] : {}; return c[f] }, f); return f }, optionsToObject: function (f) {
                var e = {}, g = this.series, c = g.options.keys, m = c || g.pointArrayMap || ["y"], l = m.length, d = 0, u = 0; if (w(f) || null === f) e[m[0]] = f; else if (t(f)) for (!c && f.length > l && (g = typeof f[0], "string" === g ? e.name = f[0] : "number" === g && (e.x = f[0]), d++); u < l;)c && void 0 === f[d] || (0 < m[u].indexOf(".") ? a.Point.prototype.setNestedProperty(e,
                    f[d], m[u]) : e[m[u]] = f[d]), d++ , u++; else "object" === typeof f && (e = f, f.dataLabels && (g._hasPointLabels = !0), f.marker && (g._hasPointMarkers = !0)); return e
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
                    "") : "")
            }, getZone: function () { var a = this.series, e = a.zones, a = a.zoneAxis || "y", g = 0, c; for (c = e[g]; this[a] >= c.value;)c = e[++g]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor; return c }, destroy: function () {
                var a = this.series.chart, g = a.hoverPoints, p; a.pointCount--; g && (this.setState(), F(g, this), g.length || (a.hoverPoints = null)); if (this === a.hoverPoint) this.onMouseOut(); if (this.graphic || this.dataLabel || this.dataLabels) e(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this); for (p in this) this[p] = null
            }, destroyElements: function () { for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;)e = a[g], this[e] && (this[e] = this[e].destroy()); this.dataLabels && (this.dataLabels.forEach(function (a) { a.element && a.destroy() }), delete this.dataLabels); this.connectors && (this.connectors.forEach(function (a) { a.element && a.destroy() }), delete this.connectors) }, getLabelConfig: function () {
                return {
                    x: this.category, y: this.y, color: this.color,
                    colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var f = this.series, e = f.tooltipOptions, c = v(e.valueDecimals, ""), m = e.valuePrefix || "", l = e.valueSuffix || ""; f.chart.styledMode && (a = f.chart.tooltip.styledModeFormat(a)); (f.pointArrayMap || ["y"]).forEach(function (d) { d = "{point." + d; if (m || l) a = a.replace(RegExp(d + "}", "g"), m + d + "}" + l); a = a.replace(RegExp(d + "}", "g"), d + ":,." + c + "f}") }); return g(a,
                    { point: this, series: this.series }, f.chart.time)
            }, firePointEvent: function (a, e, g) { var c = this, f = this.series.options; (f.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents(); "click" === a && f.allowPointSelect && (g = function (a) { c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey) }); n(this, a, e, g) }, visible: !0
        }
    })(H); (function (a) {
        var C = a.addEvent, B = a.animObject, F = a.arrayMax, n = a.arrayMin, g = a.correctFloat, t = a.defaultOptions, w = a.defaultPlotOptions, v = a.defined, x = a.erase, p = a.extend,
        e = a.fireEvent, f = a.isArray, q = a.isNumber, r = a.isString, c = a.merge, m = a.objectEach, l = a.pick, d = a.removeEvent, u = a.splat, G = a.SVGElement, D = a.syncTimeout, y = a.win; a.Series = a.seriesType("line", null, {
            lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { lineWidth: 0, lineColor: "#ffffff", enabledThreshold: 2, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } },
            point: { events: {} }, dataLabels: { align: "center", formatter: function () { return null === this.y ? "" : a.numberFormat(this.y, -1) }, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0, padding: 5 }, cropThreshold: 300, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } } }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
        },
            {
                isCartesian: !0, pointClass: a.Point, sorted: !0, requireSorting: !0, directTouch: !1, axisTypes: ["xAxis", "yAxis"], colorCounter: 0, parallelArrays: ["x", "y"], coll: "series", init: function (a, c) {
                    e(this, "init", { options: c }); var b = this, k, h = a.series, d; b.chart = a; b.options = c = b.setOptions(c); b.linkedSeries = []; b.bindAxes(); p(b, { name: c.name, state: "", visible: !1 !== c.visible, selected: !0 === c.selected }); k = c.events; m(k, function (a, c) { C(b, c, a) }); if (k && k.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) a.runTrackerClick =
                        !0; b.getColor(); b.getSymbol(); b.parallelArrays.forEach(function (a) { b[a + "Data"] = [] }); b.setData(c.data, !1); b.isCartesian && (a.hasCartesianSeries = !0); h.length && (d = h[h.length - 1]); b._i = l(d && d._i, -1) + 1; a.orderSeries(this.insert(h)); e(this, "afterInit")
                }, insert: function (a) { var b = this.options.index, c; if (q(b)) { for (c = a.length; c--;)if (b >= l(a[c].options.index, a[c]._i)) { a.splice(c + 1, 0, this); break } -1 === c && a.unshift(this); c += 1 } else a.push(this); return l(c, a.length - 1) }, bindAxes: function () {
                    var b = this, c = b.options, d =
                        b.chart, f; e(this, "bindAxes", null, function () { (b.axisTypes || []).forEach(function (k) { d[k].forEach(function (a) { f = a.options; if (c[k] === f.index || void 0 !== c[k] && c[k] === f.id || void 0 === c[k] && 0 === f.index) b.insert(a.series), b[k] = a, a.isDirty = !0 }); b[k] || b.optionalAxis === k || a.error(18, !0, d) }) })
                }, updateParallelArrays: function (a, c) {
                    var b = a.series, k = arguments, h = q(c) ? function (k) { var h = "y" === k && b.toYData ? b.toYData(a) : a[k]; b[k + "Data"][c] = h } : function (a) {
                    Array.prototype[c].apply(b[a + "Data"], Array.prototype.slice.call(k,
                        2))
                    }; b.parallelArrays.forEach(h)
                }, autoIncrement: function () { var a = this.options, c = this.xIncrement, d, f = a.pointIntervalUnit, h = this.chart.time, c = l(c, a.pointStart, 0); this.pointInterval = d = l(this.pointInterval, a.pointInterval, 1); f && (a = new h.Date(c), "day" === f ? h.set("Date", a, h.get("Date", a) + d) : "month" === f ? h.set("Month", a, h.get("Month", a) + d) : "year" === f && h.set("FullYear", a, h.get("FullYear", a) + d), d = a.getTime() - c); this.xIncrement = c + d; return c }, setOptions: function (a) {
                    var b = this.chart, d = b.options, f = d.plotOptions,
                    h = (b.userOptions || {}).plotOptions || {}, m = f[this.type], g = b.styledMode; this.userOptions = c(a); b = c(m, f.series, a); this.tooltipOptions = c(t.tooltip, t.plotOptions.series && t.plotOptions.series.tooltip, t.plotOptions[this.type].tooltip, d.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip); this.stickyTracking = l(a.stickyTracking, h[this.type] && h[this.type].stickyTracking, h.series && h.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking); null === m.marker &&
                        delete b.marker; this.zoneAxis = b.zoneAxis; a = this.zones = (b.zones || []).slice(); !b.negativeColor && !b.negativeFillColor || b.zones || (d = { value: b[this.zoneAxis + "Threshold"] || b.threshold || 0, className: "highcharts-negative" }, g || (d.color = b.negativeColor, d.fillColor = b.negativeFillColor), a.push(d)); a.length && v(a[a.length - 1].value) && a.push(g ? {} : { color: this.color, fillColor: this.fillColor }); e(this, "afterSetOptions", { options: b }); return b
                }, getName: function () { return l(this.options.name, "Series " + (this.index + 1)) }, getCyclic: function (a,
                    c, d) { var b, k = this.chart, f = this.userOptions, e = a + "Index", m = a + "Counter", z = d ? d.length : l(k.options.chart[a + "Count"], k[a + "Count"]); c || (b = l(f[e], f["_" + e]), v(b) || (k.series.length || (k[m] = 0), f["_" + e] = b = k[m] % z, k[m] += 1), d && (c = d[b])); void 0 !== b && (this[e] = b); this[a] = c }, getColor: function () { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || w[this.type].color, this.chart.options.colors) }, getSymbol: function () {
                        this.getCyclic("symbol",
                            this.options.marker.symbol, this.chart.options.symbols)
                    }, drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker, updateData: function (b) {
                        var c = this.options, d = this.points, f = [], h, e, m, l = this.requireSorting; this.xIncrement = null; b.forEach(function (b) {
                            var k, e, z; k = a.defined(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {}; z = k.x; if ((k = k.id) || q(z)) k && (e = (e = this.chart.get(k)) && e.index), void 0 === e && q(z) && (e = this.xData.indexOf(z, m)), -1 === e || void 0 === e || d[e].touched ? f.push(b) : b !== c.data[e] ? (d[e].update(b,
                                !1, null, !1), d[e].touched = !0, l && (m = e + 1)) : d[e] && (d[e].touched = !0), h = !0
                        }, this); if (h) for (b = d.length; b--;)e = d[b], e.touched || e.remove(!1), e.touched = !1; else if (b.length === d.length) b.forEach(function (a, b) { d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1) }); else return !1; f.forEach(function (a) { this.addPoint(a, !1) }, this); return !0
                    }, setData: function (b, c, d, e) {
                        var k = this, m = k.points, z = m && m.length || 0, g, u = k.options, p = k.chart, y = null, E = k.xAxis, n = u.turboThreshold, G = this.xData, D = this.yData, t = (g = k.pointArrayMap) && g.length,
                        v = u.keys, w = 0, x = 1, B; b = b || []; g = b.length; c = l(c, !0); !1 !== e && g && z && !k.cropped && !k.hasGroupedData && k.visible && !k.isSeriesBoosting && (B = this.updateData(b)); if (!B) {
                        k.xIncrement = null; k.colorCounter = 0; this.parallelArrays.forEach(function (a) { k[a + "Data"].length = 0 }); if (n && g > n) {
                            for (d = 0; null === y && d < g;)y = b[d], d++; if (q(y)) for (d = 0; d < g; d++)G[d] = this.autoIncrement(), D[d] = b[d]; else if (f(y)) if (t) for (d = 0; d < g; d++)y = b[d], G[d] = y[0], D[d] = y.slice(1, t + 1); else for (v && (w = v.indexOf("x"), x = v.indexOf("y"), w = 0 <= w ? w : 0, x = 0 <= x ? x : 1), d =
                                0; d < g; d++)y = b[d], G[d] = y[w], D[d] = y[x]; else a.error(12, !1, p)
                        } else for (d = 0; d < g; d++)void 0 !== b[d] && (y = { series: k }, k.pointClass.prototype.applyOptions.apply(y, [b[d]]), k.updateParallelArrays(y, d)); D && r(D[0]) && a.error(14, !0, p); k.data = []; k.options.data = k.userOptions.data = b; for (d = z; d--;)m[d] && m[d].destroy && m[d].destroy(); E && (E.minRange = E.userMinRange); k.isDirty = p.isDirtyBox = !0; k.isDirtyData = !!m; d = !1
                        } "point" === u.legendType && (this.processData(), this.generatePoints()); c && p.redraw(d)
                    }, processData: function (b) {
                        var c =
                            this.xData, d = this.yData, f = c.length, h; h = 0; var e, m, l = this.xAxis, g, q = this.options; g = q.cropThreshold; var u = this.getExtremesFromAll || q.getExtremesFromAll, p = this.isCartesian, q = l && l.val2lin, r = l && l.isLog, y = this.requireSorting, n, G; if (p && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !b) return !1; l && (b = l.getExtremes(), n = b.min, G = b.max); p && this.sorted && !u && (!g || f > g || this.forceCrop) && (c[f - 1] < n || c[0] > G ? (c = [], d = []) : this.yData && (c[0] < n || c[f - 1] > G) && (h = this.cropData(this.xData, this.yData, n, G), c = h.xData, d = h.yData, h =
                                h.start, e = !0)); for (g = c.length || 1; --g;)f = r ? q(c[g]) - q(c[g - 1]) : c[g] - c[g - 1], 0 < f && (void 0 === m || f < m) ? m = f : 0 > f && y && (a.error(15, !1, this.chart), y = !1); this.cropped = e; this.cropStart = h; this.processedXData = c; this.processedYData = d; this.closestPointRange = m
                    }, cropData: function (a, c, d, f, h) { var b = a.length, k = 0, e = b, m; h = l(h, this.cropShoulder, 1); for (m = 0; m < b; m++)if (a[m] >= d) { k = Math.max(0, m - h); break } for (d = m; d < b; d++)if (a[d] > f) { e = d + h; break } return { xData: a.slice(k, e), yData: c.slice(k, e), start: k, end: e } }, generatePoints: function () {
                        var a =
                            this.options, c = a.data, d = this.data, f, h = this.processedXData, m = this.processedYData, l = this.pointClass, g = h.length, q = this.cropStart || 0, r, y = this.hasGroupedData, a = a.keys, n, G = [], D; d || y || (d = [], d.length = c.length, d = this.data = d); a && y && (this.options.keys = !1); for (D = 0; D < g; D++)r = q + D, y ? (n = (new l).init(this, [h[D]].concat(u(m[D]))), n.dataGroup = this.groupMap[D], n.dataGroup.options && (n.options = n.dataGroup.options, p(n, n.dataGroup.options), delete n.dataLabels)) : (n = d[r]) || void 0 === c[r] || (d[r] = n = (new l).init(this, c[r], h[D])),
                                n && (n.index = r, G[D] = n); this.options.keys = a; if (d && (g !== (f = d.length) || y)) for (D = 0; D < f; D++)D !== q || y || (D += g), d[D] && (d[D].destroyElements(), d[D].plotX = void 0); this.data = d; this.points = G; e(this, "afterGeneratePoints")
                    }, getExtremes: function (a) {
                        var b = this.yAxis, c = this.processedXData, d, h = [], m = 0; d = this.xAxis.getExtremes(); var l = d.min, g = d.max, u, p, r = this.requireSorting ? 1 : 0, y, D; a = a || this.stackedYData || this.processedYData || []; d = a.length; for (D = 0; D < d; D++)if (p = c[D], y = a[D], u = (q(y, !0) || f(y)) && (!b.positiveValuesOnly || y.length ||
                            0 < y), p = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[D + r] || p) >= l && (c[D - r] || p) <= g, u && p) if (u = y.length) for (; u--;)"number" === typeof y[u] && (h[m++] = y[u]); else h[m++] = y; this.dataMin = n(h); this.dataMax = F(h); e(this, "afterGetExtremes")
                    }, translate: function () {
                    this.processedXData || this.processData(); this.generatePoints(); var a = this.options, c = a.stacking, d = this.xAxis, f = d.categories, h = this.yAxis, m = this.points, u = m.length, p = !!this.modifyValue, r, y = this.pointPlacementToXValue(), n = q(y), D = a.threshold,
                        G = a.startFromThreshold ? D : 0, t, w, x, B, C = this.zoneAxis || "y", F = Number.MAX_VALUE; for (r = 0; r < u; r++) {
                            var L = m[r], N = L.x, O = L.y; w = L.low; var H = c && h.stacks[(this.negStacks && O < (G ? 0 : D) ? "-" : "") + this.stackKey], X; h.positiveValuesOnly && null !== O && 0 >= O && (L.isNull = !0); L.plotX = t = g(Math.min(Math.max(-1E5, d.translate(N, 0, 0, 0, 1, y, "flags" === this.type)), 1E5)); c && this.visible && !L.isNull && H && H[N] && (B = this.getStackIndicator(B, N, this.index), X = H[N], O = X.points[B.key], w = O[0], O = O[1], w === G && B.key === H[N].base && (w = l(q(D) && D, h.min)), h.positiveValuesOnly &&
                                0 >= w && (w = null), L.total = L.stackTotal = X.total, L.percentage = X.total && L.y / X.total * 100, L.stackY = O, X.setOffset(this.pointXOffset || 0, this.barW || 0)); L.yBottom = v(w) ? Math.min(Math.max(-1E5, h.translate(w, 0, 1, 0, 1)), 1E5) : null; p && (O = this.modifyValue(O, L)); L.plotY = w = "number" === typeof O && Infinity !== O ? Math.min(Math.max(-1E5, h.translate(O, 0, 1, 0, 1)), 1E5) : void 0; L.isInside = void 0 !== w && 0 <= w && w <= h.len && 0 <= t && t <= d.len; L.clientX = n ? g(d.translate(N, 0, 0, 0, 1, y)) : t; L.negative = L[C] < (a[C + "Threshold"] || D || 0); L.category = f && void 0 !==
                                    f[L.x] ? f[L.x] : L.x; L.isNull || (void 0 !== x && (F = Math.min(F, Math.abs(t - x))), x = t); L.zone = this.zones.length && L.getZone()
                        } this.closestPointRangePx = F; e(this, "afterTranslate")
                    }, getValidPoints: function (a, c) { var b = this.chart; return (a || this.points || []).filter(function (a) { return c && !b.isInsidePlot(a.plotX, a.plotY, b.inverted) ? !1 : !a.isNull }) }, setClip: function (a) {
                        var b = this.chart, c = this.options, d = b.renderer, h = b.inverted, f = this.clipBox, e = f || b.clipBox, m = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, e.height,
                            c.xAxis, c.yAxis].join(), l = b[m], g = b[m + "m"]; l || (a && (e.width = 0, h && (e.x = b.plotSizeX), b[m + "m"] = g = d.clipRect(h ? b.plotSizeX + 99 : -99, h ? -b.plotLeft : -b.plotTop, 99, h ? b.chartWidth : b.chartHeight)), b[m] = l = d.clipRect(e), l.count = { length: 0 }); a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1); !1 !== c.clip && (this.group.clip(a || f ? l : b.clipRect), this.markerGroup.clip(g), this.sharedClipKey = m); a || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && m && b[m] && (f || (b[m] = b[m].destroy()),
                                b[m + "m"] && (b[m + "m"] = b[m + "m"].destroy())))
                    }, animate: function (a) { var b = this.chart, c = B(this.options.animation), d; a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({ width: b.plotSizeX, x: 0 }, c), b[d + "m"] && b[d + "m"].animate({ width: b.plotSizeX + 99, x: 0 }, c), this.animate = null) }, afterAnimate: function () { this.setClip(); e(this, "afterAnimate"); this.finishedAnimating = !0 }, drawPoints: function () {
                        var a = this.points, c = this.chart, d, f, h, e, m = this.options.marker, g, q, u, p = this[this.specialGroup] || this.markerGroup; d = this.xAxis;
                        var r, y = l(m.enabled, !d || d.isRadial ? !0 : null, this.closestPointRangePx >= m.enabledThreshold * m.radius); if (!1 !== m.enabled || this._hasPointMarkers) for (d = 0; d < a.length; d++)f = a[d], e = f.graphic, g = f.marker || {}, q = !!f.marker, h = y && void 0 === g.enabled || g.enabled, u = !1 !== f.isInside, h && !f.isNull ? (h = l(g.symbol, this.symbol), r = this.markerAttribs(f, f.selected && "select"), e ? e[u ? "show" : "hide"](!0).animate(r) : u && (0 < r.width || f.hasImage) && (f.graphic = e = c.renderer.symbol(h, r.x, r.y, r.width, r.height, q ? g : m).add(p)), e && !c.styledMode &&
                            e.attr(this.pointAttribs(f, f.selected && "select")), e && e.addClass(f.getClassName(), !0)) : e && (f.graphic = e.destroy())
                    }, markerAttribs: function (a, c) { var b = this.options.marker, k = a.marker || {}, d = k.symbol || b.symbol, f = l(k.radius, b.radius); c && (b = b.states[c], c = k.states && k.states[c], f = l(c && c.radius, b && b.radius, f + (b && b.radiusPlus || 0))); a.hasImage = d && 0 === d.indexOf("url"); a.hasImage && (f = 0); a = { x: Math.floor(a.plotX) - f, y: a.plotY - f }; f && (a.width = a.height = 2 * f); return a }, pointAttribs: function (a, c) {
                        var b = this.options.marker,
                        k = a && a.options, d = k && k.marker || {}, f = this.color, e = k && k.color, m = a && a.color, k = l(d.lineWidth, b.lineWidth); a = a && a.zone && a.zone.color; f = e || a || m || f; a = d.fillColor || b.fillColor || f; f = d.lineColor || b.lineColor || f; c && (b = b.states[c], c = d.states && d.states[c] || {}, k = l(c.lineWidth, b.lineWidth, k + l(c.lineWidthPlus, b.lineWidthPlus, 0)), a = c.fillColor || b.fillColor || a, f = c.lineColor || b.lineColor || f); return { stroke: f, "stroke-width": k, fill: a }
                    }, destroy: function () {
                        var b = this, c = b.chart, f = /AppleWebKit\/533/.test(y.navigator.userAgent),
                        l, h, g = b.data || [], q, u; e(b, "destroy"); d(b); (b.axisTypes || []).forEach(function (a) { (u = b[a]) && u.series && (x(u.series, b), u.isDirty = u.forceRedraw = !0) }); b.legendItem && b.chart.legend.destroyItem(b); for (h = g.length; h--;)(q = g[h]) && q.destroy && q.destroy(); b.points = null; a.clearTimeout(b.animationTimeout); m(b, function (a, b) { a instanceof G && !a.survive && (l = f && "group" === b ? "hide" : "destroy", a[l]()) }); c.hoverSeries === b && (c.hoverSeries = null); x(c.series, b); c.orderSeries(); m(b, function (a, c) { delete b[c] })
                    }, getGraphPath: function (a,
                        c, d) {
                            var b = this, k = b.options, f = k.step, e, m = [], l = [], g; a = a || b.points; (e = a.reversed) && a.reverse(); (f = { right: 1, center: 2 }[f] || f && 3) && e && (f = 4 - f); !k.connectNulls || c || d || (a = this.getValidPoints(a)); a.forEach(function (h, e) {
                                var q = h.plotX, z = h.plotY, u = a[e - 1]; (h.leftCliff || u && u.rightCliff) && !d && (g = !0); h.isNull && !v(c) && 0 < e ? g = !k.connectNulls : h.isNull && !c ? g = !0 : (0 === e || g ? e = ["M", h.plotX, h.plotY] : b.getPointSpline ? e = b.getPointSpline(a, h, e) : f ? (e = 1 === f ? ["L", u.plotX, z] : 2 === f ? ["L", (u.plotX + q) / 2, u.plotY, "L", (u.plotX + q) / 2, z] :
                                    ["L", q, u.plotY], e.push("L", q, z)) : e = ["L", q, z], l.push(h.x), f && (l.push(h.x), 2 === f && l.push(h.x)), m.push.apply(m, e), g = !1)
                            }); m.xMap = l; return b.graphPath = m
                    }, drawGraph: function () {
                        var a = this, c = this.options, d = (this.gappedPath || this.getGraphPath).call(this), f = this.chart.styledMode, h = [["graph", "highcharts-graph"]]; f || h[0].push(c.lineColor || this.color, c.dashStyle); h = a.getZonesGraphs(h); h.forEach(function (b, k) {
                            var h = b[0], e = a[h]; e ? (e.endX = a.preventGraphAnimation ? null : d.xMap, e.animate({ d: d })) : d.length && (a[h] = a.chart.renderer.path(d).addClass(b[1]).attr({ zIndex: 1 }).add(a.group),
                                f || (e = { stroke: b[2], "stroke-width": c.lineWidth, fill: a.fillGraph && a.color || "none" }, b[3] ? e.dashstyle = b[3] : "square" !== c.linecap && (e["stroke-linecap"] = e["stroke-linejoin"] = "round"), e = a[h].attr(e).shadow(2 > k && c.shadow))); e && (e.startX = d.xMap, e.isArea = d.isArea)
                        })
                    }, getZonesGraphs: function (a) {
                        this.zones.forEach(function (b, c) { c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")]; this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle); a.push(c) },
                            this); return a
                    }, applyZones: function () {
                        var a = this, c = this.chart, d = c.renderer, f = this.zones, h, e, m = this.clips || [], g, q = this.graph, u = this.area, p = Math.max(c.chartWidth, c.chartHeight), r = this[(this.zoneAxis || "y") + "Axis"], y, n, D = c.inverted, G, t, v, w, x = !1; f.length && (q || u) && r && void 0 !== r.min && (n = r.reversed, G = r.horiz, q && !this.showLine && q.hide(), u && u.hide(), y = r.getExtremes(), f.forEach(function (b, k) {
                            h = n ? G ? c.plotWidth : 0 : G ? 0 : r.toPixels(y.min) || 0; h = Math.min(Math.max(l(e, h), 0), p); e = Math.min(Math.max(Math.round(r.toPixels(l(b.value,
                                y.max), !0) || 0), 0), p); x && (h = e = r.toPixels(y.max)); t = Math.abs(h - e); v = Math.min(h, e); w = Math.max(h, e); r.isXAxis ? (g = { x: D ? w : v, y: 0, width: t, height: p }, G || (g.x = c.plotHeight - g.x)) : (g = { x: 0, y: D ? w : v, width: p, height: t }, G && (g.y = c.plotWidth - g.y)); D && d.isVML && (g = r.isXAxis ? { x: 0, y: n ? v : w, height: g.width, width: c.chartWidth } : { x: g.y - c.plotLeft - c.spacingBox.x, y: 0, width: g.height, height: c.chartHeight }); m[k] ? m[k].animate(g) : (m[k] = d.clipRect(g), q && a["zone-graph-" + k].clip(m[k]), u && a["zone-area-" + k].clip(m[k])); x = b.value > y.max; a.resetZones &&
                                    0 === e && (e = void 0)
                        }), this.clips = m)
                    }, invertGroups: function (a) { function b() { ["group", "markerGroup"].forEach(function (b) { c[b] && (d.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)) }) } var c = this, d = c.chart, h; c.xAxis && (h = C(d, "resize", b), C(c, "destroy", h), b(a), c.invertGroups = b) }, plotGroup: function (a, c, d, f, h) {
                        var b = this[a], k = !b; k && (this[a] = b = this.chart.renderer.g().attr({ zIndex: f || .1 }).add(h)); b.addClass("highcharts-" + c + " highcharts-series-" +
                            this.index + " highcharts-" + this.type + "-series " + (v(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (b.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); b.attr({ visibility: d })[k ? "attr" : "animate"](this.getPlotBox()); return b
                    }, getPlotBox: function () { var a = this.chart, c = this.xAxis, d = this.yAxis; a.inverted && (c = d, d = this.xAxis); return { translateX: c ? c.left : a.plotLeft, translateY: d ? d.top : a.plotTop, scaleX: 1, scaleY: 1 } }, render: function () {
                        var a = this, c = a.chart, d, f =
                            a.options, h = !!a.animate && c.renderer.isSVG && B(f.animation).duration, m = a.visible ? "inherit" : "hidden", l = f.zIndex, g = a.hasRendered, q = c.seriesGroup, u = c.inverted; e(this, "render"); d = a.plotGroup("group", "series", m, l, q); a.markerGroup = a.plotGroup("markerGroup", "markers", m, l, q); h && a.animate(!0); d.inverted = a.isCartesian ? u : !1; a.drawGraph && (a.drawGraph(), a.applyZones()); a.drawDataLabels && a.drawDataLabels(); a.visible && a.drawPoints(); a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker(); a.invertGroups(u);
                        !1 === f.clip || a.sharedClipKey || g || d.clip(c.clipRect); h && a.animate(); g || (a.animationTimeout = D(function () { a.afterAnimate() }, h)); a.isDirty = !1; a.hasRendered = !0; e(a, "afterRender")
                    }, redraw: function () { var a = this.chart, c = this.isDirty || this.isDirtyData, d = this.group, f = this.xAxis, h = this.yAxis; d && (a.inverted && d.attr({ width: a.plotWidth, height: a.plotHeight }), d.animate({ translateX: l(f && f.left, a.plotLeft), translateY: l(h && h.top, a.plotTop) })); this.translate(); this.render(); c && delete this.kdTree }, kdAxisArray: ["clientX",
                        "plotY"], searchPoint: function (a, c) { var b = this.xAxis, d = this.yAxis, k = this.chart.inverted; return this.searchKDTree({ clientX: k ? b.len - a.chartY + b.pos : a.chartX - b.pos, plotY: k ? d.len - a.chartX + d.pos : a.chartY - d.pos }, c, a) }, buildKDTree: function (a) {
                            function b(a, d, k) { var h, f; if (f = a && a.length) return h = c.kdAxisArray[d % k], a.sort(function (a, b) { return a[h] - b[h] }), f = Math.floor(f / 2), { point: a[f], left: b(a.slice(0, f), d + 1, k), right: b(a.slice(f + 1), d + 1, k) } } this.buildingKdTree = !0; var c = this, d = -1 < c.options.findNearestPointBy.indexOf("y") ?
                                2 : 1; delete c.kdTree; D(function () { c.kdTree = b(c.getValidPoints(null, !c.directTouch), d, d); c.buildingKdTree = !1 }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                        }, searchKDTree: function (a, c, d) {
                            function b(a, c, d, h) {
                                var l = c.point, g = k.kdAxisArray[d % h], q, u, p = l; u = v(a[f]) && v(l[f]) ? Math.pow(a[f] - l[f], 2) : null; q = v(a[e]) && v(l[e]) ? Math.pow(a[e] - l[e], 2) : null; q = (u || 0) + (q || 0); l.dist = v(q) ? Math.sqrt(q) : Number.MAX_VALUE; l.distX = v(u) ? Math.sqrt(u) : Number.MAX_VALUE; g = a[g] - l[g]; q = 0 > g ? "left" : "right"; u = 0 > g ? "right" : "left"; c[q] &&
                                    (q = b(a, c[q], d + 1, h), p = q[m] < p[m] ? q : l); c[u] && Math.sqrt(g * g) < p[m] && (a = b(a, c[u], d + 1, h), p = a[m] < p[m] ? a : p); return p
                            } var k = this, f = this.kdAxisArray[0], e = this.kdAxisArray[1], m = c ? "distX" : "dist"; c = -1 < k.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(d); if (this.kdTree) return b(a, this.kdTree, c, c)
                        }, pointPlacementToXValue: function () { var a = this.options.pointPlacement; "between" === a && (a = .5); q(a) && (a *= l(this.options.pointRange || this.xAxis.pointRange)); return a }
            })
    })(H); (function (a) {
        var C =
            a.Axis, B = a.Chart, F = a.correctFloat, n = a.defined, g = a.destroyObjectProperties, t = a.format, w = a.objectEach, v = a.pick, x = a.Series; a.StackItem = function (a, e, f, g, r) {
                var c = a.chart.inverted; this.axis = a; this.isNegative = f; this.options = e; this.x = g; this.total = null; this.points = {}; this.stack = r; this.rightCliff = this.leftCliff = 0; this.alignOptions = { align: e.align || (c ? f ? "left" : "right" : "center"), verticalAlign: e.verticalAlign || (c ? "middle" : f ? "bottom" : "top"), y: v(e.y, c ? 4 : f ? 14 : -6), x: v(e.x, c ? f ? -6 : 6 : 0) }; this.textAlign = e.textAlign ||
                    (c ? f ? "right" : "left" : "center")
            }; a.StackItem.prototype = {
                destroy: function () { g(this, this.axis) }, render: function (a) { var e = this.axis.chart, f = this.options, g = f.format, g = g ? t(g, this, e.time) : f.formatter.call(this); this.label ? this.label.attr({ text: g, visibility: "hidden" }) : this.label = e.renderer.text(g, null, null, f.useHTML).css(f.style).attr({ align: this.textAlign, rotation: f.rotation, visibility: "hidden" }).add(a); this.label.labelrank = e.plotHeight }, setOffset: function (a, e) {
                    var f = this.axis, g = f.chart, p = f.translate(f.usePercentage ?
                        100 : this.total, 0, 0, 0, 1), c = f.translate(0), c = n(p) && Math.abs(p - c); a = g.xAxis[0].translate(this.x) + a; f = n(p) && this.getStackBox(g, this, a, p, e, c, f); (e = this.label) && f && (e.align(this.alignOptions, null, f), f = e.alignAttr, e[!1 === this.options.crop || g.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0))
                }, getStackBox: function (a, e, f, g, r, c, m) { var l = e.axis.reversed, d = a.inverted; a = m.height + m.pos - (d ? a.plotLeft : a.plotTop); e = e.isNegative && !l || !e.isNegative && l; return { x: d ? e ? g : g - c : f, y: d ? a - f - r : e ? a - g - c : a - g, width: d ? c : r, height: d ? r : c } }
            }; B.prototype.getStacks =
                function () { var a = this; a.yAxis.forEach(function (a) { a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks) }); a.series.forEach(function (e) { !e.options.stacking || !0 !== e.visible && !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + v(e.options.stack, "")) }) }; C.prototype.buildStacks = function () { var a = this.series, e = v(this.options.reversedStacks, !0), f = a.length, g; if (!this.isXAxis) { this.usePercentage = !1; for (g = f; g--;)a[e ? g : f - g - 1].setStackedPoints(); for (g = 0; g < f; g++)a[g].modifyStacks() } }; C.prototype.renderStackTotals =
                    function () { var a = this.chart, e = a.renderer, f = this.stacks, g = this.stackTotalGroup; g || (this.stackTotalGroup = g = e.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add()); g.translate(a.plotLeft, a.plotTop); w(f, function (a) { w(a, function (a) { a.render(g) }) }) }; C.prototype.resetStacks = function () { var a = this, e = a.stacks; a.isXAxis || w(e, function (f) { w(f, function (e, g) { e.touched < a.stacksTouched ? (e.destroy(), delete f[g]) : (e.total = null, e.cumulative = null) }) }) }; C.prototype.cleanStacks = function () {
                        var a; this.isXAxis || (this.oldStacks &&
                            (a = this.stacks = this.oldStacks), w(a, function (a) { w(a, function (a) { a.cumulative = a.total }) }))
                    }; x.prototype.setStackedPoints = function () {
                        if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                            var g = this.processedXData, e = this.processedYData, f = [], q = e.length, r = this.options, c = r.threshold, m = v(r.startFromThreshold && c, 0), l = r.stack, r = r.stacking, d = this.stackKey, u = "-" + d, G = this.negStacks, D = this.yAxis, y = D.stacks, b = D.oldStacks, k, z, E, h, A, t, w; D.stacksTouched += 1; for (A = 0; A < q; A++)t =
                                g[A], w = e[A], k = this.getStackIndicator(k, t, this.index), h = k.key, E = (z = G && w < (m ? 0 : c)) ? u : d, y[E] || (y[E] = {}), y[E][t] || (b[E] && b[E][t] ? (y[E][t] = b[E][t], y[E][t].total = null) : y[E][t] = new a.StackItem(D, D.options.stackLabels, z, t, l)), E = y[E][t], null !== w ? (E.points[h] = E.points[this.index] = [v(E.cumulative, m)], n(E.cumulative) || (E.base = h), E.touched = D.stacksTouched, 0 < k.index && !1 === this.singleStacks && (E.points[h][0] = E.points[this.index + "," + t + ",0"][0])) : E.points[h] = E.points[this.index] = null, "percent" === r ? (z = z ? d : u, G && y[z] &&
                                    y[z][t] ? (z = y[z][t], E.total = z.total = Math.max(z.total, E.total) + Math.abs(w) || 0) : E.total = F(E.total + (Math.abs(w) || 0))) : E.total = F(E.total + (w || 0)), E.cumulative = v(E.cumulative, m) + (w || 0), null !== w && (E.points[h].push(E.cumulative), f[A] = E.cumulative); "percent" === r && (D.usePercentage = !0); this.stackedYData = f; D.oldStacks = {}
                        }
                    }; x.prototype.modifyStacks = function () {
                        var a = this, e = a.stackKey, f = a.yAxis.stacks, g = a.processedXData, r, c = a.options.stacking; a[c + "Stacker"] && [e, "-" + e].forEach(function (e) {
                            for (var m = g.length, d, q; m--;)if (d =
                                g[m], r = a.getStackIndicator(r, d, a.index, e), q = (d = f[e] && f[e][d]) && d.points[r.key]) a[c + "Stacker"](q, d, m)
                        })
                    }; x.prototype.percentStacker = function (a, e, f) { e = e.total ? 100 / e.total : 0; a[0] = F(a[0] * e); a[1] = F(a[1] * e); this.stackedYData[f] = a[1] }; x.prototype.getStackIndicator = function (a, e, f, g) { !n(a) || a.x !== e || g && a.key !== g ? a = { x: e, index: 0, key: g } : a.index++; a.key = [f, e, a.index].join(); return a }
    })(H); (function (a) {
        var C = a.addEvent, B = a.animate, F = a.Axis, n = a.Chart, g = a.createElement, t = a.css, w = a.defined, v = a.erase, x = a.extend, p =
            a.fireEvent, e = a.isNumber, f = a.isObject, q = a.isArray, r = a.merge, c = a.objectEach, m = a.pick, l = a.Point, d = a.Series, u = a.seriesTypes, G = a.setAnimation, D = a.splat; a.cleanRecursively = function (d, b) { var k = {}; c(d, function (c, e) { if (f(d[e], !0) && b[e]) c = a.cleanRecursively(d[e], b[e]), Object.keys(c).length && (k[e] = c); else if (f(d[e]) || d[e] !== b[e]) k[e] = d[e] }); return k }; x(n.prototype, {
                addSeries: function (a, b, c) {
                    var d, k = this; a && (b = m(b, !0), p(k, "addSeries", { options: a }, function () {
                        d = k.initSeries(a); k.isDirtyLegend = !0; k.linkSeries();
                        p(k, "afterAddSeries"); b && k.redraw(c)
                    })); return d
                }, addAxis: function (a, b, c, d) { var k = b ? "xAxis" : "yAxis", h = this.options; a = r(a, { index: this[k].length, isX: b }); b = new F(this, a); h[k] = D(h[k] || {}); h[k].push(a); m(c, !0) && this.redraw(d); return b }, showLoading: function (a) {
                    var b = this, c = b.options, d = b.loadingDiv, f = c.loading, h = function () { d && t(d, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" }) }; d || (b.loadingDiv = d = g("div", { className: "highcharts-loading highcharts-loading-hidden" },
                        null, b.container), b.loadingSpan = g("span", { className: "highcharts-loading-inner" }, null, d), C(b, "redraw", h)); d.className = "highcharts-loading"; b.loadingSpan.innerHTML = a || c.lang.loading; b.styledMode || (t(d, x(f.style, { zIndex: 10 })), t(b.loadingSpan, f.labelStyle), b.loadingShown || (t(d, { opacity: 0, display: "" }), B(d, { opacity: f.style.opacity || .5 }, { duration: f.showDuration || 0 }))); b.loadingShown = !0; h()
                }, hideLoading: function () {
                    var a = this.options, b = this.loadingDiv; b && (b.className = "highcharts-loading highcharts-loading-hidden",
                        this.styledMode || B(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { t(b, { display: "none" }) } })); this.loadingShown = !1
                }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "), propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "), update: function (d, b, k, f) {
                    var g = this, h = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" }, l, q, u, z = []; p(g, "update", { options: d }); d.isResponsiveOptions || g.setResponsive(!1, !0); d = a.cleanRecursively(d, g.options); if (l = d.chart) {
                        r(!0, g.options.chart, l); "className" in l && g.setClassName(l.className); "reflow" in l && g.setReflow(l.reflow); if ("inverted" in l || "polar" in l || "type" in l) g.propFromSeries(), q = !0; "alignTicks" in l && (q = !0);
                        c(l, function (a, b) { -1 !== g.propsRequireUpdateSeries.indexOf("chart." + b) && (u = !0); -1 !== g.propsRequireDirtyBox.indexOf(b) && (g.isDirtyBox = !0) }); !g.styledMode && "style" in l && g.renderer.setStyle(l.style)
                    } !g.styledMode && d.colors && (this.options.colors = d.colors); d.plotOptions && r(!0, this.options.plotOptions, d.plotOptions); c(d, function (a, b) { if (g[b] && "function" === typeof g[b].update) g[b].update(a, !1); else if ("function" === typeof g[h[b]]) g[h[b]](a); "chart" !== b && -1 !== g.propsRequireUpdateSeries.indexOf(b) && (u = !0) });
                    this.collectionsWithUpdate.forEach(function (a) { var b; d[a] && ("series" === a && (b = [], g[a].forEach(function (a, c) { a.options.isInternal || b.push(m(a.options.index, c)) })), D(d[a]).forEach(function (c, d) { (d = w(c.id) && g.get(c.id) || g[a][b ? b[d] : d]) && d.coll === a && (d.update(c, !1), k && (d.touched = !0)); if (!d && k) if ("series" === a) g.addSeries(c, !1).touched = !0; else if ("xAxis" === a || "yAxis" === a) g.addAxis(c, "xAxis" === a, !1).touched = !0 }), k && g[a].forEach(function (a) { a.touched || a.options.isInternal ? delete a.touched : z.push(a) })) }); z.forEach(function (a) {
                    a.remove &&
                        a.remove(!1)
                    }); q && g.axes.forEach(function (a) { a.update({}, !1) }); u && g.series.forEach(function (a) { a.update({}, !1) }); d.loading && r(!0, g.options.loading, d.loading); q = l && l.width; l = l && l.height; e(q) && q !== g.chartWidth || e(l) && l !== g.chartHeight ? g.setSize(q, l, f) : m(b, !0) && g.redraw(f); p(g, "afterUpdate", { options: d })
                }, setSubtitle: function (a) { this.setTitle(void 0, a) }
            }); x(l.prototype, {
                update: function (a, b, c, d) {
                    function k() {
                        h.applyOptions(a); null === h.y && g && (h.graphic = g.destroy()); f(a, !0) && (g && g.element && a && a.marker &&
                            void 0 !== a.marker.symbol && (h.graphic = g.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy())); l = h.index; e.updateParallelArrays(h, l); u.data[l] = f(u.data[l], !0) || f(a, !0) ? h.options : m(a, u.data[l]); e.isDirty = e.isDirtyData = !0; !e.fixedBox && e.hasCartesianSeries && (q.isDirtyBox = !0); "point" === u.legendType && (q.isDirtyLegend = !0); b && q.redraw(c)
                    } var h = this, e = h.series, g = h.graphic, l, q = e.chart, u = e.options; b = m(b, !0); !1 === d ? k() : h.firePointEvent("update",
                        { options: a }, k)
                }, remove: function (a, b) { this.series.removePoint(this.series.data.indexOf(this), a, b) }
            }); x(d.prototype, {
                addPoint: function (a, b, c, d) {
                    var k = this.options, h = this.data, f = this.chart, e = this.xAxis, e = e && e.hasNames && e.names, g = k.data, l, q, u = this.xData, r, p; b = m(b, !0); l = { series: this }; this.pointClass.prototype.applyOptions.apply(l, [a]); p = l.x; r = u.length; if (this.requireSorting && p < u[r - 1]) for (q = !0; r && u[r - 1] > p;)r--; this.updateParallelArrays(l, "splice", r, 0, 0); this.updateParallelArrays(l, r); e && l.name && (e[p] = l.name);
                    g.splice(r, 0, a); q && (this.data.splice(r, 0, null), this.processData()); "point" === k.legendType && this.generatePoints(); c && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(l, "shift"), g.shift())); this.isDirtyData = this.isDirty = !0; b && f.redraw(d)
                }, removePoint: function (a, b, c) {
                    var d = this, k = d.data, h = k[a], f = d.points, e = d.chart, g = function () {
                    f && f.length === k.length && f.splice(a, 1); k.splice(a, 1); d.options.data.splice(a, 1); d.updateParallelArrays(h || { series: d }, "splice", a, 1); h && h.destroy(); d.isDirty =
                        !0; d.isDirtyData = !0; b && e.redraw()
                    }; G(c, e); b = m(b, !0); h ? h.firePointEvent("remove", null, g) : g()
                }, remove: function (a, b, c) { function d() { k.destroy(); k.remove = null; h.isDirtyLegend = h.isDirtyBox = !0; h.linkSeries(); m(a, !0) && h.redraw(b) } var k = this, h = k.chart; !1 !== c ? p(k, "remove", null, d) : d() }, update: function (c, b) {
                    c = a.cleanRecursively(c, this.userOptions); var d = this, f = d.chart, e = d.userOptions, h = d.initialType || d.type, g = c.type || e.type || f.options.chart.type, l = u[h].prototype, q, n = ["group", "markerGroup", "dataLabelsGroup"],
                        y = ["navigatorSeries", "baseSeries"], D = d.finishedAnimating && { animation: !1 }, G = ["data", "name", "turboThreshold"], t = Object.keys(c), v = 0 < t.length; t.forEach(function (a) { -1 === G.indexOf(a) && (v = !1) }); if (v) c.data && this.setData(c.data, !1), c.name && this.setName(c.name, !1); else {
                            y = n.concat(y); y.forEach(function (a) { y[a] = d[a]; delete d[a] }); c = r(e, D, { index: d.index, pointStart: m(e.pointStart, d.xData[0]) }, { data: d.options.data }, c); d.remove(!1, null, !1); for (q in l) d[q] = void 0; u[g || h] ? x(d, u[g || h].prototype) : a.error(17, !0, f);
                            y.forEach(function (a) { d[a] = y[a] }); d.init(f, c); c.zIndex !== e.zIndex && n.forEach(function (a) { d[a] && d[a].attr({ zIndex: c.zIndex }) }); d.initialType = h; f.linkSeries()
                        } p(this, "afterUpdate"); m(b, !0) && f.redraw(v ? void 0 : !1)
                }, setName: function (a) { this.name = this.options.name = this.userOptions.name = a; this.chart.isDirtyLegend = !0 }
            }); x(F.prototype, {
                update: function (a, b) {
                    var d = this.chart, f = a && a.events || {}; a = r(this.userOptions, a); d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] =
                        a); c(d.options[this.coll].events, function (a, b) { "undefined" === typeof f[b] && (f[b] = void 0) }); this.destroy(!0); this.init(d, x(a, { events: f })); d.isDirtyBox = !0; m(b, !0) && d.redraw()
                }, remove: function (a) { for (var b = this.chart, c = this.coll, d = this.series, f = d.length; f--;)d[f] && d[f].remove(!1); v(b.axes, this); v(b[c], this); q(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c]; b[c].forEach(function (a, b) { a.options.index = a.userOptions.index = b }); this.destroy(); b.isDirtyBox = !0; m(a, !0) && b.redraw() },
                setTitle: function (a, b) { this.update({ title: a }, b) }, setCategories: function (a, b) { this.update({ categories: a }, b) }
            })
    })(H); (function (a) {
        var C = a.color, B = a.pick, F = a.Series, n = a.seriesType; n("area", "line", { softThreshold: !1, threshold: 0 }, {
            singleStacks: !1, getStackPoints: function (g) {
                var n = [], w = [], v = this.xAxis, x = this.yAxis, p = x.stacks[this.stackKey], e = {}, f = this.index, q = x.series, r = q.length, c, m = B(x.options.reversedStacks, !0) ? 1 : -1, l; g = g || this.points; if (this.options.stacking) {
                    for (l = 0; l < g.length; l++)g[l].leftNull = g[l].rightNull =
                        null, e[g[l].x] = g[l]; a.objectEach(p, function (a, c) { null !== a.total && w.push(c) }); w.sort(function (a, c) { return a - c }); c = q.map(function (a) { return a.visible }); w.forEach(function (a, g) {
                            var d = 0, q, u; if (e[a] && !e[a].isNull) n.push(e[a]), [-1, 1].forEach(function (b) { var d = 1 === b ? "rightNull" : "leftNull", z = 0, n = p[w[g + b]]; if (n) for (l = f; 0 <= l && l < r;)q = n.points[l], q || (l === f ? e[a][d] = !0 : c[l] && (u = p[a].points[l]) && (z -= u[1] - u[0])), l += m; e[a][1 === b ? "rightCliff" : "leftCliff"] = z }); else {
                                for (l = f; 0 <= l && l < r;) {
                                    if (q = p[a].points[l]) { d = q[1]; break } l +=
                                        m
                                } d = x.translate(d, 0, 1, 0, 1); n.push({ isNull: !0, plotX: v.translate(a, 0, 0, 0, 1), x: a, plotY: d, yBottom: d })
                            }
                        })
                } return n
            }, getGraphPath: function (a) {
                var g = F.prototype.getGraphPath, n = this.options, v = n.stacking, x = this.yAxis, p, e, f = [], q = [], r = this.index, c, m = x.stacks[this.stackKey], l = n.threshold, d = x.getThreshold(n.threshold), u, n = n.connectNulls || "percent" === v, G = function (e, g, b) {
                    var k = a[e]; e = v && m[k.x].points[r]; var u = k[b + "Null"] || 0; b = k[b + "Cliff"] || 0; var p, h, k = !0; b || u ? (p = (u ? e[0] : e[1]) + b, h = e[0] + b, k = !!u) : !v && a[g] && a[g].isNull &&
                        (p = h = l); void 0 !== p && (q.push({ plotX: c, plotY: null === p ? d : x.getThreshold(p), isNull: k, isCliff: !0 }), f.push({ plotX: c, plotY: null === h ? d : x.getThreshold(h), doCurve: !1 }))
                }; a = a || this.points; v && (a = this.getStackPoints(a)); for (p = 0; p < a.length; p++)if (e = a[p].isNull, c = B(a[p].rectPlotX, a[p].plotX), u = B(a[p].yBottom, d), !e || n) n || G(p, p - 1, "left"), e && !v && n || (q.push(a[p]), f.push({ x: p, plotX: c, plotY: u })), n || G(p, p + 1, "right"); p = g.call(this, q, !0, !0); f.reversed = !0; e = g.call(this, f, !0, !0); e.length && (e[0] = "L"); e = p.concat(e); g = g.call(this,
                    q, !1, n); e.xMap = p.xMap; this.areaPath = e; return g
            }, drawGraph: function () {
            this.areaPath = []; F.prototype.drawGraph.apply(this); var a = this, n = this.areaPath, w = this.options, v = [["area", "highcharts-area", this.color, w.fillColor]]; this.zones.forEach(function (g, p) { v.push(["zone-area-" + p, "highcharts-area highcharts-zone-area-" + p + " " + g.className, g.color || a.color, g.fillColor || w.fillColor]) }); v.forEach(function (g) {
                var p = g[0], e = a[p]; e ? (e.endX = a.preventGraphAnimation ? null : n.xMap, e.animate({ d: n })) : (e = { zIndex: 0 }, a.chart.styledMode ||
                    (e.fill = B(g[3], C(g[2]).setOpacity(B(w.fillOpacity, .75)).get())), e = a[p] = a.chart.renderer.path(n).addClass(g[1]).attr(e).add(a.group), e.isArea = !0); e.startX = n.xMap; e.shiftUnit = w.step ? 2 : 1
            })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(H); (function (a) {
        var C = a.pick; a = a.seriesType; a("spline", "line", {}, {
            getPointSpline: function (a, F, n) {
                var g = F.plotX, t = F.plotY, w = a[n - 1]; n = a[n + 1]; var v, x, p, e; if (w && !w.isNull && !1 !== w.doCurve && !F.isCliff && n && !n.isNull && !1 !== n.doCurve && !F.isCliff) {
                    a = w.plotY; p = n.plotX; n =
                        n.plotY; var f = 0; v = (1.5 * g + w.plotX) / 2.5; x = (1.5 * t + a) / 2.5; p = (1.5 * g + p) / 2.5; e = (1.5 * t + n) / 2.5; p !== v && (f = (e - x) * (p - g) / (p - v) + t - e); x += f; e += f; x > a && x > t ? (x = Math.max(a, t), e = 2 * t - x) : x < a && x < t && (x = Math.min(a, t), e = 2 * t - x); e > n && e > t ? (e = Math.max(n, t), x = 2 * t - e) : e < n && e < t && (e = Math.min(n, t), x = 2 * t - e); F.rightContX = p; F.rightContY = e
                } F = ["C", C(w.rightContX, w.plotX), C(w.rightContY, w.plotY), C(v, g), C(x, t), g, t]; w.rightContX = w.rightContY = null; return F
            }
        })
    })(H); (function (a) {
        var C = a.seriesTypes.area.prototype, B = a.seriesType; B("areaspline",
            "spline", a.defaultPlotOptions.area, { getStackPoints: C.getStackPoints, getGraphPath: C.getGraphPath, drawGraph: C.drawGraph, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle })
    })(H); (function (a) {
        var C = a.animObject, B = a.color, F = a.extend, n = a.defined, g = a.isNumber, t = a.merge, w = a.pick, v = a.Series, x = a.seriesType, p = a.svg; x("column", "line", {
            borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: {
                hover: { halo: !1, brightness: .1 }, select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff"
        }, {
            cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { v.prototype.init.apply(this, arguments); var a = this, f = a.chart; f.hasRendered && f.series.forEach(function (f) { f.type === a.type && (f.isDirty = !0) }) }, getColumnMetrics: function () {
                var a = this, f = a.options, g = a.xAxis, r = a.yAxis, c =
                    g.options.reversedStacks, c = g.reversed && !c || !g.reversed && c, m, l = {}, d = 0; !1 === f.grouping ? d = 1 : a.chart.series.forEach(function (c) { var b = c.options, k = c.yAxis, f; c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || r.len !== k.len || r.pos !== k.pos || (b.stacking ? (m = c.stackKey, void 0 === l[m] && (l[m] = d++), f = l[m]) : !1 !== b.grouping && (f = d++), c.columnIndex = f) }); var u = Math.min(Math.abs(g.transA) * (g.ordinalSlope || f.pointRange || g.closestPointRange || g.tickInterval || 1), g.len), p = u * f.groupPadding, n = (u - 2 * p) / (d ||
                        1), f = Math.min(f.maxPointWidth || g.len, w(f.pointWidth, n * (1 - 2 * f.pointPadding))); a.columnMetrics = { width: f, offset: (n - f) / 2 + (p + ((a.columnIndex || 0) + (c ? 1 : 0)) * n - u / 2) * (c ? -1 : 1) }; return a.columnMetrics
            }, crispCol: function (a, f, g, r) { var c = this.chart, e = this.borderWidth, l = -(e % 2 ? .5 : 0), e = e % 2 ? .5 : 1; c.inverted && c.renderer.isVML && (e += 1); this.options.crisp && (g = Math.round(a + g) + l, a = Math.round(a) + l, g -= a); r = Math.round(f + r) + e; l = .5 >= Math.abs(f) && .5 < r; f = Math.round(f) + e; r -= f; l && r && (--f, r += 1); return { x: a, y: f, width: g, height: r } }, translate: function () {
                var a =
                    this, f = a.chart, g = a.options, r = a.dense = 2 > a.closestPointRange * a.xAxis.transA, r = a.borderWidth = w(g.borderWidth, r ? 0 : 1), c = a.yAxis, m = g.threshold, l = a.translatedThreshold = c.getThreshold(m), d = w(g.minPointLength, 5), u = a.getColumnMetrics(), p = u.width, D = a.barW = Math.max(p, 1 + 2 * r), y = a.pointXOffset = u.offset; f.inverted && (l -= .5); g.pointPadding && (D = Math.ceil(D)); v.prototype.translate.apply(a); a.points.forEach(function (b) {
                        var k = w(b.yBottom, l), e = 999 + Math.abs(k), g = p, e = Math.min(Math.max(-e, b.plotY), c.len + e), h = b.plotX + y, u = D,
                        q = Math.min(e, k), r, G = Math.max(e, k) - q; d && Math.abs(G) < d && (G = d, r = !c.reversed && !b.negative || c.reversed && b.negative, b.y === m && a.dataMax <= m && c.min < m && (r = !r), q = Math.abs(q - l) > d ? k - d : l - (r ? d : 0)); n(b.options.pointWidth) && (g = u = Math.ceil(b.options.pointWidth), h -= Math.round((g - p) / 2)); b.barX = h; b.pointWidth = g; b.tooltipPos = f.inverted ? [c.len + c.pos - f.plotLeft - e, a.xAxis.len - h - u / 2, G] : [h + u / 2, e + c.pos - f.plotTop, G]; b.shapeType = b.shapeType || "rect"; b.shapeArgs = a.crispCol.apply(a, b.isNull ? [h, l, u, 0] : [h, q, u, G])
                    })
            }, getSymbol: a.noop,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") }, pointAttribs: function (a, f) {
                    var e = this.options, g, c = this.pointAttrToOptions || {}; g = c.stroke || "borderColor"; var m = c["stroke-width"] || "borderWidth", l = a && a.color || this.color, d = a && a[g] || e[g] || this.color || l, u = a && a[m] || e[m] || this[m] || 0, c = e.dashStyle; a && this.zones.length && (l = a.getZone(), l = a.options.color || l && l.color || this.color); f && (a = t(e.states[f], a.options.states &&
                        a.options.states[f] || {}), f = a.brightness, l = a.color || void 0 !== f && B(l).brighten(a.brightness).get() || l, d = a[g] || d, u = a[m] || u, c = a.dashStyle || c); g = { fill: l, stroke: d, "stroke-width": u }; c && (g.dashstyle = c); return g
                }, drawPoints: function () {
                    var a = this, f = this.chart, q = a.options, r = f.renderer, c = q.animationLimit || 250, m; a.points.forEach(function (e) {
                        var d = e.graphic, l = d && f.pointCount < c ? "animate" : "attr"; if (g(e.plotY) && null !== e.y) {
                            m = e.shapeArgs; if (d) d[l](t(m)); else e.graphic = d = r[e.shapeType](m).add(e.group || a.group); q.borderRadius &&
                                d.attr({ r: q.borderRadius }); f.styledMode || d[l](a.pointAttribs(e, e.selected && "select")).shadow(q.shadow, null, q.stacking && !q.borderRadius); d.addClass(e.getClassName(), !0)
                        } else d && (e.graphic = d.destroy())
                    })
                }, animate: function (a) {
                    var f = this, e = this.yAxis, g = f.options, c = this.chart.inverted, m = {}, l = c ? "translateX" : "translateY", d; p && (a ? (m.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(g.threshold))), c ? m.translateX = a - e.len : m.translateY = a, f.clipBox && f.setClip(), f.group.attr(m)) : (d = f.group.attr(l), f.group.animate({ scaleY: 1 },
                        F(C(f.options.animation), { step: function (a, c) { m[l] = d + c.pos * (e.pos - d); f.group.attr(m) } })), f.animate = null))
                }, remove: function () { var a = this, f = a.chart; f.hasRendered && f.series.forEach(function (f) { f.type === a.type && (f.isDirty = !0) }); v.prototype.remove.apply(a, arguments) }
            })
    })(H); (function (a) { a = a.seriesType; a("bar", "column", null, { inverted: !0 }) })(H); (function (a) {
        var C = a.Series, B = a.seriesType; B("scatter", "line", {
            lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && C.prototype.drawGraph.call(this) }, applyJitter: function () {
                var a = this, n = this.options.jitter, g = this.points.length; n && this.points.forEach(function (t, w) {
                    ["x", "y"].forEach(function (v, x) {
                        var p, e = "plot" + v.toUpperCase(), f, q; n[v] && !t.isNull &&
                            (p = a[v + "Axis"], q = n[v] * p.transA, p && !p.isLog && (f = Math.max(0, t[e] - q), p = Math.min(p.len, t[e] + q), x = 1E4 * Math.sin(w + x * g), t[e] = f + (p - f) * (x - Math.floor(x)), "x" === v && (t.clientX = t.plotX)))
                    })
                })
            }
            }); a.addEvent(C, "afterTranslate", function () { this.applyJitter && this.applyJitter() })
    })(H); (function (a) {
        var C = a.deg2rad, B = a.isNumber, F = a.pick, n = a.relativeLength; a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, t = this.chart, w = 2 * (a.slicedOffset || 0), v = t.plotWidth - 2 * w, t = t.plotHeight - 2 * w, x = a.center, x = [F(x[0], "50%"),
                F(x[1], "50%"), a.size || "100%", a.innerSize || 0], p = Math.min(v, t), e, f; for (e = 0; 4 > e; ++e)f = x[e], a = 2 > e || 2 === e && /%$/.test(f), x[e] = n(f, [v, t, p, x[2]][e]) + (a ? w : 0); x[3] > x[2] && (x[3] = x[2]); return x
            }, getStartAndEndRadians: function (a, n) { a = B(a) ? a : 0; n = B(n) && n > a && 360 > n - a ? n : a + 360; return { start: C * (a + -90), end: C * (n + -90) } }
        }
    })(H); (function (a) {
        var C = a.addEvent, B = a.CenteredSeriesMixin, F = a.defined, n = a.extend, g = B.getStartAndEndRadians, t = a.noop, w = a.pick, v = a.Point, x = a.Series, p = a.seriesType, e = a.setAnimation; p("pie", "line", {
            center: [null,
                null], clip: !1, colorByPoint: !0, dataLabels: { allowOverlap: !0, connectorPadding: 5, distance: 30, enabled: !0, formatter: function () { return this.point.isNull ? void 0 : this.point.name }, softConnector: !0, x: 0, connectorShape: "fixedOffset", crookDistance: "70%" }, ignoreHiddenPoint: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, states: { hover: { brightness: .1 } }
        }, {
            isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [], pointAttribs: a.seriesTypes.column.prototype.pointAttribs, animate: function (a) { var f = this, e = f.points, c = f.startAngleRad; a || (e.forEach(function (a) { var e = a.graphic, d = a.shapeArgs; e && (e.attr({ r: a.startR || f.center[3] / 2, start: c, end: c }), e.animate({ r: d.r, start: d.start, end: d.end }, f.options.animation)) }), f.animate = null) }, updateTotals: function () {
                    var a, e = 0, g = this.points, c = g.length, m, l = this.options.ignoreHiddenPoint; for (a = 0; a < c; a++)m = g[a], e += l && !m.visible ? 0 :
                        m.isNull ? 0 : m.y; this.total = e; for (a = 0; a < c; a++)m = g[a], m.percentage = 0 < e && (m.visible || !l) ? m.y / e * 100 : 0, m.total = e
                }, generatePoints: function () { x.prototype.generatePoints.call(this); this.updateTotals() }, getX: function (a, e, g) { var c = this.center, f = this.radii ? this.radii[g.index] : c[2] / 2; return c[0] + (e ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((a - c[1]) / (f + g.labelDistance), 1), -1))) * (f + g.labelDistance) + (0 < g.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0) }, translate: function (a) {
                    this.generatePoints(); var f =
                        0, e = this.options, c = e.slicedOffset, m = c + (e.borderWidth || 0), l, d, u = g(e.startAngle, e.endAngle), p = this.startAngleRad = u.start, u = (this.endAngleRad = u.end) - p, n = this.points, y, b, k = e.dataLabels.distance, e = e.ignoreHiddenPoint, z, t = n.length, h; a || (this.center = a = this.getCenter()); for (z = 0; z < t; z++) {
                            h = n[z]; h.labelDistance = w(h.options.dataLabels && h.options.dataLabels.distance, k); this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, h.labelDistance); l = p + f * u; if (!e || h.visible) f += h.percentage / 100; d = p + f * u; h.shapeType = "arc";
                            h.shapeArgs = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * l) / 1E3, end: Math.round(1E3 * d) / 1E3 }; d = (d + l) / 2; d > 1.5 * Math.PI ? d -= 2 * Math.PI : d < -Math.PI / 2 && (d += 2 * Math.PI); h.slicedTranslation = { translateX: Math.round(Math.cos(d) * c), translateY: Math.round(Math.sin(d) * c) }; y = Math.cos(d) * a[2] / 2; b = Math.sin(d) * a[2] / 2; h.tooltipPos = [a[0] + .7 * y, a[1] + .7 * b]; h.half = d < -Math.PI / 2 || d > Math.PI / 2 ? 1 : 0; h.angle = d; l = Math.min(m, h.labelDistance / 5); h.labelPosition = {
                                natural: {
                                    x: a[0] + y + Math.cos(d) * h.labelDistance, y: a[1] + b + Math.sin(d) *
                                        h.labelDistance
                                }, "final": {}, alignment: 0 > h.labelDistance ? "center" : h.half ? "right" : "left", connectorPosition: { breakAt: { x: a[0] + y + Math.cos(d) * l, y: a[1] + b + Math.sin(d) * l }, touchingSliceAt: { x: a[0] + y, y: a[1] + b } }
                            }
                        }
                }, drawGraph: null, drawPoints: function () {
                    var a = this, e = a.chart, g = e.renderer, c, m, l, d, u = a.options.shadow; !u || a.shadowGroup || e.styledMode || (a.shadowGroup = g.g("shadow").add(a.group)); a.points.forEach(function (f) {
                        m = f.graphic; if (f.isNull) m && (f.graphic = m.destroy()); else {
                            d = f.shapeArgs; c = f.getTranslate(); if (!e.styledMode) {
                                var q =
                                    f.shadowGroup; u && !q && (q = f.shadowGroup = g.g("shadow").add(a.shadowGroup)); q && q.attr(c); l = a.pointAttribs(f, f.selected && "select")
                            } m ? (m.setRadialReference(a.center), e.styledMode || m.attr(l), m.animate(n(d, c))) : (f.graphic = m = g[f.shapeType](d).setRadialReference(a.center).attr(c).add(a.group), e.styledMode || m.attr(l).attr({ "stroke-linejoin": "round" }).shadow(u, q)); m.attr({ visibility: f.visible ? "inherit" : "hidden" }); m.addClass(f.getClassName())
                        }
                    })
                }, searchPoint: t, sortByAngle: function (a, e) {
                    a.sort(function (a, c) {
                        return void 0 !==
                            a.angle && (c.angle - a.angle) * e
                    })
                }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, getCenter: B.getCenter, getSymbol: t
            }, {
                init: function () { v.prototype.init.apply(this, arguments); var a = this, e; a.name = w(a.name, "Slice"); e = function (f) { a.slice("select" === f.type) }; C(a, "select", e); C(a, "unselect", e); return a }, isValid: function () { return a.isNumber(this.y, !0) && 0 <= this.y }, setVisible: function (a, e) {
                    var f = this, c = f.series, g = c.chart, l = c.options.ignoreHiddenPoint; e = w(e, l); a !== f.visible && (f.visible = f.options.visible = a = void 0 ===
                        a ? !f.visible : a, c.options.data[c.data.indexOf(f)] = f.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (c) { if (f[c]) f[c][a ? "show" : "hide"](!0) }), f.legendItem && g.legend.colorizeItem(f, a), a || "hover" !== f.state || f.setState(""), l && (c.isDirty = !0), e && g.redraw())
                }, slice: function (a, g, p) { var c = this.series; e(p, c.chart); w(g, !0); this.sliced = this.options.sliced = F(a) ? a : !this.sliced; c.options.data[c.data.indexOf(this)] = this.options; this.graphic.animate(this.getTranslate()); this.shadowGroup && this.shadowGroup.animate(this.getTranslate()) },
                getTranslate: function () { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 } }, haloPath: function (a) { var f = this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(f.x, f.y, f.r + a, f.r + a, { innerR: this.shapeArgs.r - 1, start: f.start, end: f.end }) }, connectorShapes: {
                    fixedOffset: function (a, e, g) {
                        var c = e.breakAt; e = e.touchingSliceAt; return ["M", a.x, a.y].concat(g.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * c.x - e.x, 2 * c.y - e.y, c.x, c.y] : ["L", c.x, c.y]).concat(["L",
                            e.x, e.y])
                    }, straight: function (a, e) { e = e.touchingSliceAt; return ["M", a.x, a.y, "L", e.x, e.y] }, crookedLine: function (f, e, g) { e = e.touchingSliceAt; var c = this.series, m = c.center[0], l = c.chart.plotWidth, d = c.chart.plotLeft, c = f.alignment, u = this.shapeArgs.r; g = a.relativeLength(g.crookDistance, 1); g = "left" === c ? m + u + (l + d - m - u) * (1 - g) : d + (m - u) * g; m = ["L", g, f.y]; if ("left" === c ? g > f.x || g < e.x : g < f.x || g > e.x) m = []; return ["M", f.x, f.y].concat(m).concat(["L", e.x, e.y]) }
                }, getConnectorPath: function () {
                    var a = this.labelPosition, e = this.series.options.dataLabels,
                    g = e.connectorShape, c = this.connectorShapes; c[g] && (g = c[g]); return g.call(this, { x: a.final.x, y: a.final.y, alignment: a.alignment }, a.connectorPosition, e)
                }
            })
    })(H); (function (a) {
        var C = a.addEvent, B = a.arrayMax, F = a.defined, n = a.extend, g = a.format, t = a.merge, w = a.noop, v = a.pick, x = a.relativeLength, p = a.Series, e = a.seriesTypes, f = a.stableSort, q = a.isArray, r = a.splat; a.distribute = function (c, e, g) {
            function d(a, b) { return a.target - b.target } var m, l = !0, q = c, p = [], b; b = 0; var k = q.reducedLen || e; for (m = c.length; m--;)b += c[m].size; if (b > k) {
                f(c,
                    function (a, b) { return (b.rank || 0) - (a.rank || 0) }); for (b = m = 0; b <= k;)b += c[m].size, m++; p = c.splice(m - 1, c.length)
            } f(c, d); for (c = c.map(function (a) { return { size: a.size, targets: [a.target], align: v(a.align, .5) } }); l;) {
                for (m = c.length; m--;)l = c[m], b = (Math.min.apply(0, l.targets) + Math.max.apply(0, l.targets)) / 2, l.pos = Math.min(Math.max(0, b - l.size * l.align), e - l.size); m = c.length; for (l = !1; m--;)0 < m && c[m - 1].pos + c[m - 1].size > c[m].pos && (c[m - 1].size += c[m].size, c[m - 1].targets = c[m - 1].targets.concat(c[m].targets), c[m - 1].align = .5, c[m -
                    1].pos + c[m - 1].size > e && (c[m - 1].pos = e - c[m - 1].size), c.splice(m, 1), l = !0)
            } q.push.apply(q, p); m = 0; c.some(function (b) { var c = 0; if (b.targets.some(function () { q[m].pos = b.pos + c; if (Math.abs(q[m].pos - q[m].target) > g) return q.slice(0, m + 1).forEach(function (a) { delete a.pos }), q.reducedLen = (q.reducedLen || e) - .1 * e, q.reducedLen > .1 * e && a.distribute(q, e, g), !0; c += q[m].size; m++ })) return !0 }); f(q, d)
        }; p.prototype.drawDataLabels = function () {
            function c(a, b) {
                var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b &&
                    a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            } function e(a, b) { var c = [], d; if (q(a) && !q(b)) c = a.map(function (a) { return t(a, b) }); else if (q(b) && !q(a)) c = b.map(function (b) { return t(a, b) }); else if (q(a) || q(b)) for (d = Math.max(a.length, b.length); d--;)c[d] = t(a[d], b[d]); else c = t(a, b); return c } var f = this, d = f.chart, u = f.options, p = u.dataLabels, n = f.points, y, b = f.hasRendered || 0, k, z = v(p.defer, !!u.animation), E = d.renderer, p = e(e(d.options.plotOptions &&
                d.options.plotOptions.series && d.options.plotOptions.series.dataLabels, d.options.plotOptions && d.options.plotOptions[f.type] && d.options.plotOptions[f.type].dataLabels), p); a.fireEvent(this, "drawDataLabels"); if (q(p) || p.enabled || f._hasPointLabels) k = f.plotGroup("dataLabelsGroup", "data-labels", z && !b ? "hidden" : "visible", p.zIndex || 6), z && (k.attr({ opacity: +b }), b || C(f, "afterAnimate", function () { f.visible && k.show(!0); k[u.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 }) })), n.forEach(function (b) {
                    y = r(e(p, b.dlOptions ||
                        b.options && b.options.dataLabels)); y.forEach(function (h, e) {
                            var m = h.enabled && !b.isNull && c(b, h), l, q, p, n, r = b.dataLabels ? b.dataLabels[e] : b.dataLabel, z = b.connectors ? b.connectors[e] : b.connector, y = !r; m && (l = b.getLabelConfig(), q = h[b.formatPrefix + "Format"] || h.format, l = F(q) ? g(q, l, d.time) : (h[b.formatPrefix + "Formatter"] || h.formatter).call(l, h), q = h.style, p = h.rotation, d.styledMode || (q.color = v(h.color, q.color, f.color, "#000000"), "contrast" === q.color && (b.contrastColor = E.getContrast(b.color || f.color), q.color = h.inside ||
                                0 > v(h.distance, b.labelDistance) || u.stacking ? b.contrastColor : "#000000"), u.cursor && (q.cursor = u.cursor)), n = { r: h.borderRadius || 0, rotation: p, padding: h.padding, zIndex: 1 }, d.styledMode || (n.fill = h.backgroundColor, n.stroke = h.borderColor, n["stroke-width"] = h.borderWidth), a.objectEach(n, function (a, b) { void 0 === a && delete n[b] })); !r || m && F(l) ? m && F(l) && (r ? n.text = l : (b.dataLabels = b.dataLabels || [], r = b.dataLabels[e] = p ? E.text(l, 0, -9999).addClass("highcharts-data-label") : E.label(l, 0, -9999, h.shape, null, null, h.useHTML, null,
                                    "data-label"), e || (b.dataLabel = r), r.addClass(" highcharts-data-label-color-" + b.colorIndex + " " + (h.className || "") + (h.useHTML ? " highcharts-tracker" : ""))), r.options = h, r.attr(n), d.styledMode || r.css(q).shadow(h.shadow), r.added || r.add(k), f.alignDataLabel(b, r, h, null, y)) : (b.dataLabel = b.dataLabel && b.dataLabel.destroy(), b.dataLabels && (1 === b.dataLabels.length ? delete b.dataLabels : delete b.dataLabels[e]), e || delete b.dataLabel, z && (b.connector = b.connector.destroy(), b.connectors && (1 === b.connectors.length ? delete b.connectors :
                                        delete b.connectors[e])))
                        })
                }); a.fireEvent(this, "afterDrawDataLabels")
        }; p.prototype.alignDataLabel = function (a, e, f, d, g) {
            var c = this.chart, m = this.isCartesian && c.inverted, l = v(a.dlBox && a.dlBox.centerX, a.plotX, -9999), b = v(a.plotY, -9999), k = e.getBBox(), u, q = f.rotation, h = f.align, p = this.visible && (a.series.forceDL || c.isInsidePlot(l, Math.round(b), m) || d && c.isInsidePlot(l, m ? d.x + 1 : d.y + d.height - 1, m)), r = "justify" === v(f.overflow, "justify"); if (p && (u = c.renderer.fontMetrics(c.styledMode ? void 0 : f.style.fontSize, e).b, d = n({
                x: m ?
                    this.yAxis.len - b : l, y: Math.round(m ? this.xAxis.len - l : b), width: 0, height: 0
            }, d), n(f, { width: k.width, height: k.height }), q ? (r = !1, l = c.renderer.rotCorr(u, q), l = { x: d.x + f.x + d.width / 2 + l.x, y: d.y + f.y + { top: 0, middle: .5, bottom: 1 }[f.verticalAlign] * d.height }, e[g ? "attr" : "animate"](l).attr({ align: h }), b = (q + 720) % 360, b = 180 < b && 360 > b, "left" === h ? l.y -= b ? k.height : 0 : "center" === h ? (l.x -= k.width / 2, l.y -= k.height / 2) : "right" === h && (l.x -= k.width, l.y -= b ? 0 : k.height), e.placed = !0, e.alignAttr = l) : (e.align(f, null, d), l = e.alignAttr), r && 0 <= d.height ?
                    a.isLabelJustified = this.justifyDataLabel(e, f, l, k, d, g) : v(f.crop, !0) && (p = c.isInsidePlot(l.x, l.y) && c.isInsidePlot(l.x + k.width, l.y + k.height)), f.shape && !q)) e[g ? "attr" : "animate"]({ anchorX: m ? c.plotWidth - a.plotY : a.plotX, anchorY: m ? c.plotHeight - a.plotX : a.plotY }); p || (e.attr({ y: -9999 }), e.placed = !1)
        }; p.prototype.justifyDataLabel = function (a, e, f, d, g, q) {
            var c = this.chart, m = e.align, b = e.verticalAlign, k, l, u = a.box ? 0 : a.padding || 0; k = f.x + u; 0 > k && ("right" === m ? e.align = "left" : e.x = -k, l = !0); k = f.x + d.width - u; k > c.plotWidth && ("left" ===
                m ? e.align = "right" : e.x = c.plotWidth - k, l = !0); k = f.y + u; 0 > k && ("bottom" === b ? e.verticalAlign = "top" : e.y = -k, l = !0); k = f.y + d.height - u; k > c.plotHeight && ("top" === b ? e.verticalAlign = "bottom" : e.y = c.plotHeight - k, l = !0); l && (a.placed = !q, a.align(e, null, g)); return l
        }; e.pie && (e.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function (a) { return a.top + a.distributeBox.pos }, radialDistributionX: function (a, e, f, d) { return a.getX(f < e.top + 2 || f > e.bottom - 2 ? d : f, e.half, e) }, justify: function (a, e, f) { return f[0] + (a.half ? -1 : 1) * (e + a.labelDistance) },
            alignToPlotEdges: function (a, e, f, d) { a = a.getBBox().width; return e ? a + d : f - a - d }, alignToConnectors: function (a, e, f, d) { var c = 0, g; a.forEach(function (a) { g = a.dataLabel.getBBox().width; g > c && (c = g) }); return e ? c + d : f - c - d }
        }, e.pie.prototype.drawDataLabels = function () {
            var c = this, e = c.data, f, d = c.chart, g = c.options.dataLabels, q = g.connectorPadding, r = v(g.connectorWidth, 1), n = d.plotWidth, b = d.plotHeight, k = d.plotLeft, z = Math.round(d.chartWidth / 3), t, h = c.center, A = h[2] / 2, w = h[1], x, C, I, P, S = [[], []], K, T, H, U, Q = [0, 0, 0, 0], V = c.dataLabelPositioners;
            c.visible && (g.enabled || c._hasPointLabels) && (e.forEach(function (a) { a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1) }), p.prototype.drawDataLabels.apply(c), e.forEach(function (a) {
            a.dataLabel && (a.visible ? (S[a.half].push(a), a.dataLabel._pos = null, !F(g.style.width) && !F(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > z && (a.dataLabel.css({
                width: .7 *
                    z
            }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), S.forEach(function (e, m) {
                var l, u, p = e.length, r = [], z; if (p) for (c.sortByAngle(e, m - .5), 0 < c.maxLabelDistance && (l = Math.max(0, w - A - c.maxLabelDistance), u = Math.min(w + A + c.maxLabelDistance, d.plotHeight), e.forEach(function (a) {
                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, w - A - a.labelDistance), a.bottom = Math.min(w + A + a.labelDistance, d.plotHeight), z = a.dataLabel.getBBox().height || 21, a.distributeBox =
                    { target: a.labelPosition.natural.y - a.top + z / 2, size: z, rank: a.y }, r.push(a.distributeBox))
                }), l = u + z - l, a.distribute(r, l, l / 5)), U = 0; U < p; U++) {
                    f = e[U]; I = f.labelPosition; x = f.dataLabel; H = !1 === f.visible ? "hidden" : "inherit"; T = l = I.natural.y; r && F(f.distributeBox) && (void 0 === f.distributeBox.pos ? H = "hidden" : (P = f.distributeBox.size, T = V.radialDistributionY(f))); delete f.positionIndex; if (g.justify) K = V.justify(f, A, h); else switch (g.alignTo) {
                        case "connectors": K = V.alignToConnectors(e, m, n, k); break; case "plotEdges": K = V.alignToPlotEdges(x,
                            m, n, k); break; default: K = V.radialDistributionX(c, f, T, l)
                    }x._attr = { visibility: H, align: I.alignment }; x._pos = { x: K + g.x + ({ left: q, right: -q }[I.alignment] || 0), y: T + g.y - 10 }; I.final.x = K; I.final.y = T; v(g.crop, !0) && (C = x.getBBox().width, l = null, K - C < q && 1 === m ? (l = Math.round(C - K + q), Q[3] = Math.max(l, Q[3])) : K + C > n - q && 0 === m && (l = Math.round(K + C - n + q), Q[1] = Math.max(l, Q[1])), 0 > T - P / 2 ? Q[0] = Math.max(Math.round(-T + P / 2), Q[0]) : T + P / 2 > b && (Q[2] = Math.max(Math.round(T + P / 2 - b), Q[2])), x.sideOverflow = l)
                }
            }), 0 === B(Q) || this.verifyDataLabelOverflow(Q)) &&
                (this.placeDataLabels(), r && this.points.forEach(function (a) {
                    var b; t = a.connector; if ((x = a.dataLabel) && x._pos && a.visible && 0 < a.labelDistance) { H = x._attr.visibility; if (b = !t) a.connector = t = d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(c.dataLabelsGroup), d.styledMode || t.attr({ "stroke-width": r, stroke: g.connectorColor || a.color || "#666666" }); t[b ? "attr" : "animate"]({ d: a.getConnectorPath() }); t.attr("visibility", H) } else t && (a.connector =
                        t.destroy())
                }))
        }, e.pie.prototype.placeDataLabels = function () { this.points.forEach(function (a) { var c = a.dataLabel; c && a.visible && ((a = c._pos) ? (c.sideOverflow && (c._attr.width = c.getBBox().width - c.sideOverflow, c.css({ width: c._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](a), c.moved = !0) : c && c.attr({ y: -9999 })) }, this) }, e.pie.prototype.alignDataLabel = w, e.pie.prototype.verifyDataLabelOverflow = function (a) {
            var c =
                this.center, e = this.options, d = e.center, f = e.minSize || 80, g, q = null !== e.size; q || (null !== d[0] ? g = Math.max(c[2] - Math.max(a[1], a[3]), f) : (g = Math.max(c[2] - a[1] - a[3], f), c[0] += (a[3] - a[1]) / 2), null !== d[1] ? g = Math.max(Math.min(g, c[2] - Math.max(a[0], a[2])), f) : (g = Math.max(Math.min(g, c[2] - a[0] - a[2]), f), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = Math.min(x(e.innerSize || 0, g), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : q = !0); return q
        }); e.column && (e.column.prototype.alignDataLabel = function (a, e, f, d, g) {
            var c =
                this.chart.inverted, m = a.series, l = a.dlBox || a.shapeArgs, b = v(a.below, a.plotY > v(this.translatedThreshold, m.yAxis.len)), k = v(f.inside, !!this.options.stacking); l && (d = t(l), 0 > d.y && (d.height += d.y, d.y = 0), l = d.y + d.height - m.yAxis.len, 0 < l && (d.height -= l), c && (d = { x: m.yAxis.len - d.y - d.height, y: m.xAxis.len - d.x - d.width, width: d.height, height: d.width }), k || (c ? (d.x += b ? 0 : d.width, d.width = 0) : (d.y += b ? d.height : 0, d.height = 0))); f.align = v(f.align, !c || k ? "center" : b ? "right" : "left"); f.verticalAlign = v(f.verticalAlign, c || k ? "middle" : b ? "top" :
                    "bottom"); p.prototype.alignDataLabel.call(this, a, e, f, d, g); a.isLabelJustified && a.contrastColor && e.css({ color: a.contrastColor })
        })
    })(H); (function (a) {
        var C = a.Chart, B = a.isArray, F = a.objectEach, n = a.pick, g = a.addEvent, t = a.fireEvent; g(C, "render", function () {
            var a = []; (this.labelCollectors || []).forEach(function (g) { a = a.concat(g()) }); (this.yAxis || []).forEach(function (g) { g.options.stackLabels && !g.options.stackLabels.allowOverlap && F(g.stacks, function (g) { F(g, function (g) { a.push(g.label) }) }) }); (this.series || []).forEach(function (g) {
                var t =
                    g.options.dataLabels; g.visible && (!1 !== t.enabled || g._hasPointLabels) && g.points.forEach(function (g) { g.visible && (B(g.dataLabels) ? g.dataLabels : g.dataLabel ? [g.dataLabel] : []).forEach(function (e) { var f = e.options; e.labelrank = n(f.labelrank, g.labelrank, g.shapeArgs && g.shapeArgs.height); f.allowOverlap || a.push(e) }) })
            }); this.hideOverlappingLabels(a)
        }); C.prototype.hideOverlappingLabels = function (a) {
            var g = this, n = a.length, p = g.renderer, e, f, q, r, c, m, l = function (a, c, e, f, g, b, k, m) { return !(g > a + e || g + k < a || b > c + f || b + m < c) }; q = function (a) {
                var c,
                d, e, f = a.box ? 0 : a.padding || 0; e = 0; if (a && (!a.alignAttr || a.placed)) return c = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }, d = a.parentGroup, a.width || (e = a.getBBox(), a.width = e.width, a.height = e.height, e = p.fontMetrics(null, a.element).h), { x: c.x + (d.translateX || 0) + f, y: c.y + (d.translateY || 0) + f - e, width: a.width - 2 * f, height: a.height - 2 * f }
            }; for (f = 0; f < n; f++)if (e = a[f]) e.oldOpacity = e.opacity, e.newOpacity = 1, e.absoluteBox = q(e); a.sort(function (a, c) { return (c.labelrank || 0) - (a.labelrank || 0) }); for (f = 0; f < n; f++)for (m = (q = a[f]) && q.absoluteBox,
                e = f + 1; e < n; ++e)if (c = (r = a[e]) && r.absoluteBox, m && c && q !== r && 0 !== q.newOpacity && 0 !== r.newOpacity && (c = l(m.x, m.y, m.width, m.height, c.x, c.y, c.width, c.height))) (q.labelrank < r.labelrank ? q : r).newOpacity = 0; a.forEach(function (a) { var c, d; a && (d = a.newOpacity, a.oldOpacity !== d && (a.alignAttr && a.placed ? (d ? a.show(!0) : c = function () { a.hide() }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c), t(g, "afterHideOverlappingLabels")) : a.attr({ opacity: d })), a.isOld = !0) })
        }
    })(H); (function (a) {
        var C = a.addEvent, B = a.Chart,
        F = a.createElement, n = a.css, g = a.defaultOptions, t = a.defaultPlotOptions, w = a.extend, v = a.fireEvent, x = a.hasTouch, p = a.isObject, e = a.Legend, f = a.merge, q = a.pick, r = a.Point, c = a.Series, m = a.seriesTypes, l = a.svg, d; d = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, c = a.chart, d = c.pointer, e = function (a) { var b = d.getPointFromEvent(a); void 0 !== b && (d.isDirectTouch = !0, b.onMouseOver(a)) }; a.points.forEach(function (a) {
                a.graphic && (a.graphic.element.point = a); a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point =
                    a)
                }); a._hasTracking || (a.trackerGroups.forEach(function (b) { if (a[b]) { a[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) { d.onTrackerMouseOut(a) }); if (x) a[b].on("touchstart", e); !c.styledMode && a.options.cursor && a[b].css(n).css({ cursor: a.options.cursor }) } }), a._hasTracking = !0); v(this, "afterDrawTracker")
            }, drawTrackerGraph: function () {
                var a = this, c = a.options, d = c.trackByArea, e = [].concat(d ? a.areaPath : a.graphPath), b = e.length, k = a.chart, f = k.pointer, g = k.renderer, h = k.options.tooltip.snap,
                m = a.tracker, q, p = function () { if (k.hoverSeries !== a) a.onMouseOver() }, r = "rgba(192,192,192," + (l ? .0001 : .002) + ")"; if (b && !d) for (q = b + 1; q--;)"M" === e[q] && e.splice(q + 1, 0, e[q + 1] - h, e[q + 2], "L"), (q && "M" === e[q] || q === b) && e.splice(q, 0, "L", e[q - 2] + h, e[q - 1]); m ? m.attr({ d: e }) : a.graph && (a.tracker = g.path(e).attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), k.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round", stroke: r, fill: d ? r : "none", "stroke-width": a.graph.strokeWidth() +
                        (d ? 0 : 2 * h)
                }), [a.tracker, a.markerGroup].forEach(function (a) { a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function (a) { f.onTrackerMouseOut(a) }); c.cursor && !k.styledMode && a.css({ cursor: c.cursor }); if (x) a.on("touchstart", p) })); v(this, "afterDrawTracker")
            }
        }; m.column && (m.column.prototype.drawTracker = d.drawTrackerPoint); m.pie && (m.pie.prototype.drawTracker = d.drawTrackerPoint); m.scatter && (m.scatter.prototype.drawTracker = d.drawTrackerPoint); w(e.prototype, {
            setItemEvents: function (a, c, d) {
                var e =
                    this, b = e.chart.renderer.boxWrapper, k = "highcharts-legend-" + (a instanceof r ? "point" : "series") + "-active", g = e.chart.styledMode; (d ? c : a.legendGroup).on("mouseover", function () { a.setState("hover"); b.addClass(k); g || c.css(e.options.itemHoverStyle) }).on("mouseout", function () { e.styledMode || c.css(f(a.visible ? e.itemStyle : e.itemHiddenStyle)); b.removeClass(k); a.setState() }).on("click", function (c) {
                        var d = function () { a.setVisible && a.setVisible() }; b.removeClass(k); c = { browserEvent: c }; a.firePointEvent ? a.firePointEvent("legendItemClick",
                            c, d) : v(a, "legendItemClick", c, d)
                    })
            }, createCheckboxForItem: function (a) { a.checkbox = F("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container); C(a.checkbox, "click", function (c) { v(a.series || a, "checkboxClick", { checked: c.target.checked, item: a }, function () { a.select() }) }) }
        }); w(B.prototype, {
            showResetZoom: function () {
                function a() { c.zoomOut() } var c = this, d = g.lang, e = c.options.chart.resetZoomButton, b = e.theme, k =
                    b.states, f = "chart" === e.relativeTo ? null : "plotBox"; v(this, "beforeShowResetZoom", null, function () { c.resetZoomButton = c.renderer.button(d.resetZoom, null, null, a, b, k && k.hover).attr({ align: e.position.align, title: d.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(e.position, !1, f) })
            }, zoomOut: function () { v(this, "selection", { resetSelection: !0 }, this.zoom) }, zoom: function (a) {
                var c, d = this.pointer, e = !1, b; !a || a.resetSelection ? (this.axes.forEach(function (a) { c = a.zoom() }), d.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var b =
                        a.axis; d[b.isXAxis ? "zoomX" : "zoomY"] && (c = b.zoom(a.min, a.max), b.displayBtn && (e = !0))
                }); b = this.resetZoomButton; e && !b ? this.showResetZoom() : !e && p(b) && (this.resetZoomButton = b.destroy()); c && this.redraw(q(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, c) {
                var d = this, e = d.hoverPoints, b; v(this, "pan", { originalEvent: a }, function () {
                    e && e.forEach(function (a) { a.setState() }); ("xy" === c ? [1, 0] : [1]).forEach(function (c) {
                        c = d[c ? "xAxis" : "yAxis"][0]; var e = c.horiz, k = a[e ? "chartX" : "chartY"], e = e ?
                            "mouseDownX" : "mouseDownY", f = d[e], g = (c.pointRange || 0) / 2, m = c.reversed && !d.inverted || !c.reversed && d.inverted ? -1 : 1, l = c.getExtremes(), q = c.toValue(f - k, !0) + g * m, m = c.toValue(f + c.len - k, !0) - g * m, p = m < q, f = p ? m : q, q = p ? q : m, m = Math.min(l.dataMin, g ? l.min : c.toValue(c.toPixels(l.min) - c.minPixelPadding)), g = Math.max(l.dataMax, g ? l.max : c.toValue(c.toPixels(l.max) + c.minPixelPadding)), p = m - f; 0 < p && (q += p, f = m); p = q - g; 0 < p && (q = g, f -= p); c.series.length && f !== l.min && q !== l.max && (c.setExtremes(f, q, !1, !1, { trigger: "pan" }), b = !0); d[e] = k
                    }); b &&
                        d.redraw(!1); n(d.container, { cursor: "move" })
                })
            }
        }); w(r.prototype, {
            select: function (a, c) { var d = this, e = d.series, b = e.chart; a = q(a, !d.selected); d.firePointEvent(a ? "select" : "unselect", { accumulate: c }, function () { d.selected = d.options.selected = a; e.options.data[e.data.indexOf(d)] = d.options; d.setState(a && "select"); c || b.getSelectedPoints().forEach(function (a) { a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[e.data.indexOf(a)] = a.options, a.setState(""), a.firePointEvent("unselect")) }) }) }, onMouseOver: function (a) {
                var c =
                    this.series.chart, d = c.pointer; a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, c.inverted); d.runPointActions(a, this)
            }, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); (a.hoverPoints || []).forEach(function (a) { a.setState() }); a.hoverPoints = a.hoverPoint = null }, importEvents: function () { if (!this.hasImportedEvents) { var c = this, d = f(c.series.options.point, c.options).events; c.events = d; a.objectEach(d, function (a, d) { C(c, d, a) }); this.hasImportedEvents = !0 } }, setState: function (a, c) {
                var d =
                    Math.floor(this.plotX), e = this.plotY, b = this.series, f = b.options.states[a || "normal"] || {}, g = t[b.type].marker && b.options.marker, m = g && !1 === g.enabled, h = g && g.states && g.states[a || "normal"] || {}, l = !1 === h.enabled, p = b.stateMarkerGraphic, r = this.marker || {}, n = b.chart, u = b.halo, x, G = g && b.markerAttribs; a = a || ""; if (!(a === this.state && !c || this.selected && "select" !== a || !1 === f.enabled || a && (l || m && !1 === h.enabled) || a && r.states && r.states[a] && !1 === r.states[a].enabled)) {
                        G && (x = b.markerAttribs(this, a)); if (this.graphic) this.state &&
                            this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), n.styledMode || this.graphic.animate(b.pointAttribs(this, a), q(n.options.chart.animation, f.animation)), x && this.graphic.animate(x, q(n.options.chart.animation, h.animation, g.animation)), p && p.hide(); else {
                                if (a && h) {
                                    g = r.symbol || b.symbol; p && p.currentSymbol !== g && (p = p.destroy()); if (p) p[c ? "animate" : "attr"]({ x: x.x, y: x.y }); else g && (b.stateMarkerGraphic = p = n.renderer.symbol(g, x.x, x.y, x.width, x.height).add(b.markerGroup),
                                        p.currentSymbol = g); !n.styledMode && p && p.attr(b.pointAttribs(this, a))
                                } p && (p[a && n.isInsidePlot(d, e, n.inverted) ? "show" : "hide"](), p.element.point = this)
                        } (d = f.halo) && d.size ? (u || (b.halo = u = n.renderer.path().add((this.graphic || p).parentGroup)), u.show()[c ? "animate" : "attr"]({ d: this.haloPath(d.size) }), u.attr({ "class": "highcharts-halo highcharts-color-" + q(this.colorIndex, b.colorIndex) + (this.className ? " " + this.className : ""), zIndex: -1 }), u.point = this, n.styledMode || u.attr(w({ fill: this.color || b.color, "fill-opacity": d.opacity },
                            d.attributes))) : u && u.point && u.point.haloPath && u.animate({ d: u.point.haloPath(0) }, null, u.hide); this.state = a; v(this, "afterSetState")
                    }
            }, haloPath: function (a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) }
        }); w(c.prototype, {
            onMouseOver: function () { var a = this.chart, c = a.hoverSeries; if (c && c !== this) c.onMouseOut(); this.options.events.mouseOver && v(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this }, onMouseOut: function () {
                var a = this.options, c = this.chart,
                d = c.tooltip, e = c.hoverPoint; c.hoverSeries = null; if (e) e.onMouseOut(); this && a.events.mouseOut && v(this, "mouseOut"); !d || this.stickyTracking || d.shared && !this.noSharedTooltip || d.hide(); this.setState()
            }, setState: function (a) {
                var c = this, d = c.options, e = c.graph, b = d.states, f = d.lineWidth, d = 0; a = a || ""; if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function (b) { b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a)) }), c.state = a, !(c.chart.styledMode || b[a] && !1 ===
                    b[a].enabled) && (a && (f = b[a].lineWidth || f + (b[a].lineWidthPlus || 0)), e && !e.dashstyle))) for (f = { "stroke-width": f }, e.animate(f, q(b[a || "normal"] && b[a || "normal"].animation, c.chart.options.chart.animation)); c["zone-graph-" + d];)c["zone-graph-" + d].attr(f), d += 1
            }, setVisible: function (a, c) {
                var d = this, e = d.chart, b = d.legendItem, f, g = e.options.chart.ignoreHiddenSeries, m = d.visible; f = (d.visible = a = d.options.visible = d.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) { if (d[a]) d[a][f]() });
                if (e.hoverSeries === d || (e.hoverPoint && e.hoverPoint.series) === d) d.onMouseOut(); b && e.legend.colorizeItem(d, a); d.isDirty = !0; d.options.stacking && e.series.forEach(function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); d.linkedSeries.forEach(function (b) { b.setVisible(a, !1) }); g && (e.isDirtyBox = !0); v(d, f); !1 !== c && e.redraw()
            }, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) {
            this.selected = a = this.options.selected = void 0 === a ? !this.selected : a; this.checkbox && (this.checkbox.checked =
                a); v(this, a ? "select" : "unselect")
            }, drawTracker: d.drawTrackerGraph
        })
    })(H); (function (a) {
        var C = a.Chart, B = a.isArray, F = a.isObject, n = a.pick, g = a.splat; C.prototype.setResponsive = function (g, n) {
            var t = this.options.responsive, w = [], p = this.currentResponsive; !n && t && t.rules && t.rules.forEach(function (e) { void 0 === e._id && (e._id = a.uniqueKey()); this.matchResponsiveRule(e, w, g) }, this); n = a.merge.apply(0, w.map(function (e) { return a.find(t.rules, function (a) { return a._id === e }).chartOptions })); n.isResponsiveOptions = !0; w = w.toString() ||
                void 0; w !== (p && p.ruleIds) && (p && this.update(p.undoOptions, g), w ? (p = this.currentOptions(n), p.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: w, mergedOptions: n, undoOptions: p }, this.update(n, g)) : this.currentResponsive = void 0)
        }; C.prototype.matchResponsiveRule = function (a, g) {
            var t = a.condition; (t.callback || function () { return this.chartWidth <= n(t.maxWidth, Number.MAX_VALUE) && this.chartHeight <= n(t.maxHeight, Number.MAX_VALUE) && this.chartWidth >= n(t.minWidth, 0) && this.chartHeight >= n(t.minHeight, 0) }).call(this) &&
                g.push(a._id)
        }; C.prototype.currentOptions = function (n) { function t(n, p, e, f) { var q; a.objectEach(n, function (a, c) { if (!f && -1 < ["series", "xAxis", "yAxis"].indexOf(c)) for (a = g(a), e[c] = [], q = 0; q < a.length; q++)p[c][q] && (e[c][q] = {}, t(a[q], p[c][q], e[c][q], f + 1)); else F(a) ? (e[c] = B(a) ? [] : {}, t(a, p[c] || {}, e[c], f + 1)) : e[c] = p[c] || null }) } var v = {}; t(n, this.options, v, 0); return v }
    })(H); (function (a) {
        var C = a.addEvent, B = a.Axis, F = a.Chart, n = a.css, g = a.defined, t = a.extend, w = a.noop, v = a.pick, x = a.timeUnits; C(a.Series, "updatedData", function () {
            var a =
                this.xAxis; a && a.options.ordinal && delete a.ordinalIndex
        }); B.prototype.getTimeTicks = function (a, e, f, q, n, c, m) {
            var l = 0, d, p, r = {}, t, y, b, k = [], z = -Number.MAX_VALUE, v = this.options.tickPixelInterval, h = this.chart.time; if (!this.options.ordinal && !this.options.breaks || !n || 3 > n.length || void 0 === e) return h.getTimeTicks.apply(h, arguments); y = n.length; for (d = 0; d < y; d++) {
                b = d && n[d - 1] > f; n[d] < e && (l = d); if (d === y - 1 || n[d + 1] - n[d] > 5 * c || b) {
                    if (n[d] > z) {
                        for (p = h.getTimeTicks(a, n[l], n[d], q); p.length && p[0] <= z;)p.shift(); p.length && (z = p[p.length -
                            1]); k = k.concat(p)
                    } l = d + 1
                } if (b) break
            } p = p.info; if (m && p.unitRange <= x.hour) { d = k.length - 1; for (l = 1; l < d; l++)h.dateFormat("%d", k[l]) !== h.dateFormat("%d", k[l - 1]) && (r[k[l]] = "day", t = !0); t && (r[k[0]] = "day"); p.higherRanks = r } k.info = p; if (m && g(v)) {
                l = p = k.length; t = []; for (var A, h = []; l--;)d = this.translate(k[l]), A && (h[l] = A - d), t[l] = A = d; h.sort(); h = h[Math.floor(h.length / 2)]; h < .6 * v && (h = null); l = k[p - 1] > f ? p - 1 : p; for (A = void 0; l--;)d = t[l], p = Math.abs(A - d), A && p < .8 * v && (null === h || p < .8 * h) ? (r[k[l]] && !r[k[l + 1]] ? (p = l + 1, A = d) : p = l, k.splice(p,
                    1)) : A = d
            } return k
        }; t(B.prototype, {
            beforeSetTickPositions: function () {
                var a, e = [], f, g = !1, n, c = this.getExtremes(), m = c.min, l = c.max, d, u = this.isXAxis && !!this.options.breaks, c = this.options.ordinal, t = Number.MAX_VALUE, w = this.chart.options.chart.ignoreHiddenSeries, y; if (c || u) {
                    this.series.forEach(function (b, c) {
                        f = []; if (!(w && !1 === b.visible || !1 === b.takeOrdinalPosition && !u) && (e = e.concat(b.processedXData), a = e.length, e.sort(function (a, b) { return a - b }), t = Math.min(t, v(b.closestPointRange, t)), a)) {
                            for (c = 0; c < a - 1;)e[c] !== e[c +
                                1] && f.push(e[c + 1]), c++; f[0] !== e[0] && f.unshift(e[0]); e = f
                        } b.isSeriesBoosting && (y = !0)
                    }); y && (e.length = 0); a = e.length; if (2 < a) { n = e[1] - e[0]; for (d = a - 1; d-- && !g;)e[d + 1] - e[d] !== n && (g = !0); !this.options.keepOrdinalPadding && (e[0] - m > n || l - e[e.length - 1] > n) && (g = !0) } else this.options.overscroll && (2 === a ? t = e[1] - e[0] : 1 === a ? (t = this.options.overscroll, e = [e[0], e[0] + t]) : t = this.overscrollPointsRange); g ? (this.options.overscroll && (this.overscrollPointsRange = t, e = e.concat(this.getOverscrollPositions())), this.ordinalPositions = e,
                        n = this.ordinal2lin(Math.max(m, e[0]), !0), d = Math.max(this.ordinal2lin(Math.min(l, e[e.length - 1]), !0), 1), this.ordinalSlope = l = (l - m) / (d - n), this.ordinalOffset = m - n * l) : (this.overscrollPointsRange = v(this.closestPointRange, this.overscrollPointsRange), this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0)
                } this.isOrdinal = c && g; this.groupIntervalFactor = null
            }, val2lin: function (a, e) {
                var f = this.ordinalPositions; if (f) {
                    var g = f.length, p, c; for (p = g; p--;)if (f[p] === a) { c = p; break } for (p = g - 1; p--;)if (a > f[p] || 0 === p) {
                        a =
                        (a - f[p]) / (f[p + 1] - f[p]); c = p + a; break
                    } e = e ? c : this.ordinalSlope * (c || 0) + this.ordinalOffset
                } else e = a; return e
            }, lin2val: function (a, e) { var f = this.ordinalPositions; if (f) { var g = this.ordinalSlope, p = this.ordinalOffset, c = f.length - 1, m; if (e) 0 > a ? a = f[0] : a > c ? a = f[c] : (c = Math.floor(a), m = a - c); else for (; c--;)if (e = g * c + p, a >= e) { g = g * (c + 1) + p; m = (a - e) / (g - e); break } return void 0 !== m && void 0 !== f[c] ? f[c] + (m ? m * (f[c + 1] - f[c]) : 0) : a } return a }, getExtendedPositions: function () {
                var a = this, e = a.chart, f = a.series[0].currentDataGrouping, g = a.ordinalIndex,
                n = f ? f.count + f.unitName : "raw", c = a.options.overscroll, m = a.getExtremes(), l, d; g || (g = a.ordinalIndex = {}); g[n] || (l = { series: [], chart: e, getExtremes: function () { return { min: m.dataMin, max: m.dataMax + c } }, options: { ordinal: !0 }, val2lin: B.prototype.val2lin, ordinal2lin: B.prototype.ordinal2lin }, a.series.forEach(function (c) {
                    d = { xAxis: l, xData: c.xData.slice(), chart: e, destroyGroupedData: w }; d.xData = d.xData.concat(a.getOverscrollPositions()); d.options = {
                        dataGrouping: f ? {
                            enabled: !0, forced: !0, approximation: "open", units: [[f.unitName,
                            [f.count]]]
                        } : { enabled: !1 }
                    }; c.processData.apply(d); l.series.push(d)
                }), a.beforeSetTickPositions.apply(l), g[n] = l.ordinalPositions); return g[n]
            }, getOverscrollPositions: function () { var g = this.options.overscroll, e = this.overscrollPointsRange, f = [], q = this.dataMax; if (a.defined(e)) for (f.push(q); q <= this.dataMax + g;)q += e, f.push(q); return f }, getGroupIntervalFactor: function (a, e, f) {
                var g; f = f.processedXData; var p = f.length, c = []; g = this.groupIntervalFactor; if (!g) {
                    for (g = 0; g < p - 1; g++)c[g] = f[g + 1] - f[g]; c.sort(function (a, c) {
                        return a -
                            c
                    }); c = c[Math.floor(p / 2)]; a = Math.max(a, f[0]); e = Math.min(e, f[p - 1]); this.groupIntervalFactor = g = p * c / (e - a)
                } return g
            }, postProcessTickInterval: function (a) { var e = this.ordinalSlope; return e ? this.options.breaks ? this.closestPointRange || a : a / (e / this.closestPointRange) : a }
        }); B.prototype.ordinal2lin = B.prototype.val2lin; C(F, "pan", function (a) {
            var e = this.xAxis[0], f = e.options.overscroll, g = a.originalEvent.chartX, p = !1; if (e.options.ordinal && e.series.length) {
                var c = this.mouseDownX, m = e.getExtremes(), l = m.dataMax, d = m.min, u =
                    m.max, t = this.hoverPoints, v = e.closestPointRange || e.overscrollPointsRange, c = (c - g) / (e.translationSlope * (e.ordinalSlope || v)), y = { ordinalPositions: e.getExtendedPositions() }, v = e.lin2val, b = e.val2lin, k; y.ordinalPositions ? 1 < Math.abs(c) && (t && t.forEach(function (a) { a.setState() }), 0 > c ? (t = y, k = e.ordinalPositions ? e : y) : (t = e.ordinalPositions ? e : y, k = y), y = k.ordinalPositions, l > y[y.length - 1] && y.push(l), this.fixedRange = u - d, c = e.toFixedRange(null, null, v.apply(t, [b.apply(t, [d, !0]) + c, !0]), v.apply(k, [b.apply(k, [u, !0]) + c, !0])),
                        c.min >= Math.min(m.dataMin, d) && c.max <= Math.max(l, u) + f && e.setExtremes(c.min, c.max, !0, !1, { trigger: "pan" }), this.mouseDownX = g, n(this.container, { cursor: "move" })) : p = !0
            } else p = !0; p ? f && (e.max = e.dataMax + f) : a.preventDefault()
        }); C(B, "foundExtremes", function () {
        this.isXAxis && g(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && g(this.userMin) &&
            (this.min += this.options.overscroll))
        })
    })(H); (function (a) {
        var C = a.addEvent, B = a.pick, F = a.extend, n = a.isArray, g = a.fireEvent, t = a.Axis, w = a.Series; F(t.prototype, { isInBreak: function (a, g) { var p = a.repeat || Infinity, e = a.from, f = a.to - a.from; g = g >= e ? (g - e) % p : p - (e - g) % p; return a.inclusive ? g <= f : g < f && 0 !== g }, isInAnyBreak: function (a, g) { var p = this.options.breaks, e = p && p.length, f, q, n; if (e) { for (; e--;)this.isInBreak(p[e], a) && (f = !0, q || (q = B(p[e].showPoints, !this.isXAxis))); n = f && g ? f && !q : f } return n } }); C(t, "afterInit", function () {
        "function" ===
            typeof this.setBreaks && this.setBreaks(this.options.breaks, !1)
        }); C(t, "afterSetTickPositions", function () { if (this.isBroken) { var a = this.tickPositions, g = this.tickPositions.info, p = [], e; for (e = 0; e < a.length; e++)this.isInAnyBreak(a[e]) || p.push(a[e]); this.tickPositions = p; this.tickPositions.info = g } }); C(t, "afterSetOptions", function () { this.isBroken && (this.options.ordinal = !1) }); t.prototype.setBreaks = function (a, w) {
            function p(a) {
                var c = a, e, g; for (g = 0; g < f.breakArray.length; g++)if (e = f.breakArray[g], e.to <= a) c -= e.len; else if (e.from >=
                    a) break; else if (f.isInBreak(e, a)) { c -= a - e.from; break } return c
            } function e(a) { var c, e; for (e = 0; e < f.breakArray.length && !(c = f.breakArray[e], c.from >= a); e++)c.to < a ? a += c.len : f.isInBreak(c, a) && (a += c.len); return a } var f = this, q = n(a) && !!a.length; f.isDirty = f.isBroken !== q; f.isBroken = q; f.options.breaks = f.userOptions.breaks = a; f.forceRedraw = !0; q || f.val2lin !== p || (delete f.val2lin, delete f.lin2val); q && (f.userOptions.ordinal = !1, f.val2lin = p, f.lin2val = e, f.setExtremes = function (a, c, e, f, d) {
                if (this.isBroken) {
                    for (; this.isInAnyBreak(a);)a -=
                        this.closestPointRange; for (; this.isInAnyBreak(c);)c -= this.closestPointRange
                } t.prototype.setExtremes.call(this, a, c, e, f, d)
            }, f.setAxisTranslation = function (a) {
                t.prototype.setAxisTranslation.call(this, a); this.unitLength = null; if (this.isBroken) {
                    a = f.options.breaks; var c = [], e = [], l = 0, d, q, p = f.userMin || f.min, n = f.userMax || f.max, r = B(f.pointRangePadding, 0), b, k; a.forEach(function (a) { q = a.repeat || Infinity; f.isInBreak(a, p) && (p += a.to % q - p % q); f.isInBreak(a, n) && (n -= n % q - a.from % q) }); a.forEach(function (a) {
                        b = a.from; for (q = a.repeat ||
                            Infinity; b - q > p;)b -= q; for (; b < p;)b += q; for (k = b; k < n; k += q)c.push({ value: k, move: "in" }), c.push({ value: k + (a.to - a.from), move: "out", size: a.breakSize })
                    }); c.sort(function (a, b) { return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value }); d = 0; b = p; c.forEach(function (a) { d += "in" === a.move ? 1 : -1; 1 === d && "in" === a.move && (b = a.value); 0 === d && (e.push({ from: b, to: a.value, len: a.value - b - (a.size || 0) }), l += a.value - b - (a.size || 0)) }); f.breakArray = e; f.unitLength = n - p - l + r; g(f, "afterBreaks"); f.staticScale ? f.transA =
                        f.staticScale : f.unitLength && (f.transA *= (n - f.min + r) / f.unitLength); r && (f.minPixelPadding = f.transA * f.minPointOffset); f.min = p; f.max = n
                }
            }); B(w, !0) && this.chart.redraw()
        }; C(w, "afterGeneratePoints", function () { var a = this.xAxis, g = this.yAxis, p = this.points, e, f = p.length, q = this.options.connectNulls, n; if (a && g && (a.options.breaks || g.options.breaks)) for (; f--;)e = p[f], n = null === e.y && !1 === q, n || !a.isInAnyBreak(e.x, !0) && !g.isInAnyBreak(e.y, !0) || (p.splice(f, 1), this.data[f] && this.data[f].destroyElements()) }); C(w, "afterRender",
            function () { this.drawBreaks(this.xAxis, ["x"]); this.drawBreaks(this.yAxis, B(this.pointArrayMap, ["y"])) }); a.Series.prototype.drawBreaks = function (a, n) {
                var p = this, e = p.points, f, q, r, c; a && n.forEach(function (m) {
                    f = a.breakArray || []; q = a.isXAxis ? a.min : B(p.options.threshold, a.min); e.forEach(function (e) {
                        c = B(e["stack" + m.toUpperCase()], e[m]); f.forEach(function (d) {
                            r = !1; if (q < d.from && c > d.to || q > d.from && c < d.from) r = "pointBreak"; else if (q < d.from && c > d.from && c < d.to || q > d.from && c > d.to && c < d.from) r = "pointInBreak"; r && g(a, r, {
                                point: e,
                                brk: d
                            })
                        })
                    })
                })
            }; a.Series.prototype.gappedPath = function () { var g = this.currentDataGrouping, n = g && g.totalRange, g = this.options.gapSize, p = this.points.slice(), e = p.length - 1, f = this.yAxis; if (g && 0 < e) for ("value" !== this.options.gapUnit && (g *= this.closestPointRange), n && n > g && (g = n); e--;)p[e + 1].x - p[e].x > g && (n = (p[e].x + p[e + 1].x) / 2, p.splice(e + 1, 0, { isNull: !0, x: n }), this.options.stacking && (n = f.stacks[this.stackKey][n] = new a.StackItem(f, f.options.stackLabels, !1, n, this.stack), n.total = 0)); return this.getGraphPath(p) }
    })(H); (function (a) {
        var C =
            a.addEvent, B = a.arrayMax, F = a.arrayMin, n = a.Axis, g = a.defaultPlotOptions, t = a.defined, w = a.extend, v = a.format, x = a.isNumber, p = a.merge, e = a.pick, f = a.Point, q = a.Series, r = a.Tooltip, c = q.prototype, m = c.processData, l = c.generatePoints, d = {
                approximation: "average", groupPixelWidth: 2, dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"], second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"], minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], hour: ["%A, %b %e, %H:%M",
                        "%A, %b %e, %H:%M", "-%H:%M"], day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], month: ["%B %Y", "%B", "-%B %Y"], year: ["%Y", "%Y", "-%Y"]
                }
            }, u = { line: {}, spline: {}, area: {}, areaspline: {}, column: { approximation: "sum", groupPixelWidth: 10 }, arearange: { approximation: "range" }, areasplinerange: { approximation: "range" }, columnrange: { approximation: "range", groupPixelWidth: 10 }, candlestick: { approximation: "ohlc", groupPixelWidth: 10 }, ohlc: { approximation: "ohlc", groupPixelWidth: 5 } },
        G = a.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]], D = a.approximations = {
            sum: function (a) { var b = a.length, c; if (!b && a.hasNulls) c = null; else if (b) for (c = 0; b--;)c += a[b]; return c }, average: function (a) { var b = a.length; a = D.sum(a); x(a) && b && (a /= b); return a }, averages: function () {
                var a = [];[].forEach.call(arguments, function (b) { a.push(D.average(b)) }); return void 0 ===
                    a[0] ? void 0 : a
            }, open: function (a) { return a.length ? a[0] : a.hasNulls ? null : void 0 }, high: function (a) { return a.length ? B(a) : a.hasNulls ? null : void 0 }, low: function (a) { return a.length ? F(a) : a.hasNulls ? null : void 0 }, close: function (a) { return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0 }, ohlc: function (a, b, c, d) { a = D.open(a); b = D.high(b); c = D.low(c); d = D.close(d); if (x(a) || x(b) || x(c) || x(d)) return [a, b, c, d] }, range: function (a, b) { a = D.low(a); b = D.high(b); if (x(a) || x(b)) return [a, b]; if (null === a && null === b) return null }
        }; c.groupData =
            function (a, b, c, e) {
                var f = this, k = f.data, g = f.options.data, m = [], l = [], q = [], n = a.length, r, z, y = !!b, w = []; e = "function" === typeof e ? e : D[e] || u[f.type] && D[u[f.type].approximation] || D[d.approximation]; var v = f.pointArrayMap, G = v && v.length, B = ["x"].concat(v || ["y"]), C = 0, F = 0, H, N; G ? v.forEach(function () { w.push([]) }) : w.push([]); H = G || 1; for (N = 0; N <= n && !(a[N] >= c[0]); N++); for (N; N <= n; N++) {
                    for (; void 0 !== c[C + 1] && a[N] >= c[C + 1] || N === n;) {
                        r = c[C]; f.dataGroupInfo = { start: F, length: w[0].length }; z = e.apply(f, w); t(f.dataGroupInfo.options) ||
                            (f.dataGroupInfo.options = p(f.pointClass.prototype.optionsToObject.call({ series: f }, f.options.data[F])), B.forEach(function (a) { delete f.dataGroupInfo.options[a] })); void 0 !== z && (m.push(r), l.push(z), q.push(f.dataGroupInfo)); F = N; for (r = 0; r < H; r++)w[r].length = 0, w[r].hasNulls = !1; C += 1; if (N === n) break
                    } if (N === n) break; if (v) { r = f.cropStart + N; z = k && k[r] || f.pointClass.prototype.applyOptions.apply({ series: f }, [g[r]]); var O; for (r = 0; r < G; r++)O = z[v[r]], x(O) ? w[r].push(O) : null === O && (w[r].hasNulls = !0) } else r = y ? b[N] : null, x(r) ?
                        w[0].push(r) : null === r && (w[0].hasNulls = !0)
                } return [m, l, q]
            }; c.processData = function () {
                var a = this.chart, b = this.options.dataGrouping, d = !1 !== this.allowDG && b && e(b.enabled, a.options.isStock), f = this.visible || !a.options.chart.ignoreHiddenSeries, g, h = this.currentDataGrouping, l, q = !1; this.forceCrop = d; this.groupPixelWidth = null; this.hasProcessed = !0; d && !this.requireSorting && (this.requireSorting = q = !0); d = !1 === m.apply(this, arguments) || !d; q && (this.requireSorting = !1); if (!d) {
                    this.destroyGroupedData(); var n, d = b.groupAll ?
                        this.xData : this.processedXData, p = b.groupAll ? this.yData : this.processedYData, r = a.plotSizeX, a = this.xAxis, u = a.options.ordinal, w = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth(); if (w) {
                        this.isDirty = g = !0; this.points = null; q = a.getExtremes(); l = q.min; q = q.max; u = u && a.getGroupIntervalFactor(l, q, this) || 1; w = w * (q - l) / r * u; r = a.getTimeTicks(a.normalizeTimeTickInterval(w, b.units || G), Math.min(l, d[0]), Math.max(q, d[d.length - 1]), a.options.startOfWeek, d, this.closestPointRange); p = c.groupData.apply(this, [d, p,
                            r, b.approximation]); d = p[0]; u = p[1]; if (b.smoothed && d.length) { n = d.length - 1; for (d[n] = Math.min(d[n], q); n-- && 0 < n;)d[n] += w / 2; d[0] = Math.max(d[0], l) } l = r.info; this.closestPointRange = r.info.totalRange; this.groupMap = p[2]; if (t(d[0]) && d[0] < a.dataMin && f) { if (!t(a.options.min) && a.min <= a.dataMin || a.min === a.dataMin) a.min = d[0]; a.dataMin = d[0] } b.groupAll && (b = this.cropData(d, u, a.min, a.max, 1), d = b.xData, u = b.yData); this.processedXData = d; this.processedYData = u
                        } else this.groupMap = null; this.hasGroupedData = g; this.currentDataGrouping =
                            l; this.preventGraphAnimation = (h && h.totalRange) !== (l && l.totalRange)
                }
            }; c.destroyGroupedData = function () { var a = this.groupedData; (a || []).forEach(function (b, c) { b && (a[c] = b.destroy ? b.destroy() : null) }); this.groupedData = null }; c.generatePoints = function () { l.apply(this); this.destroyGroupedData(); this.groupedData = this.hasGroupedData ? this.points : null }; C(f, "update", function () { if (this.dataGroup) return a.error(24, !1, this.series.chart), !1 }); C(r, "headerFormatter", function (a) {
                var b = this.chart.time, c = a.labelConfig, e = c.series,
                f = e.tooltipOptions, h = e.options.dataGrouping, g = f.xDateFormat, m, l = e.xAxis, q, n = f[(a.isFooter ? "footer" : "header") + "Format"]; l && "datetime" === l.options.type && h && x(c.key) && (q = e.currentDataGrouping, h = h.dateTimeLabelFormats || d.dateTimeLabelFormats, q ? (f = h[q.unitName], 1 === q.count ? g = f[0] : (g = f[1], m = f[2])) : !g && h && (g = this.getXDateFormat(c, f, l)), g = b.dateFormat(g, c.key), m && (g += b.dateFormat(m, c.key + q.totalRange - 1)), e.chart.styledMode && (n = this.styledModeFormat(n)), a.text = v(n, { point: w(c.point, { key: g }), series: e }, b), a.preventDefault())
            });
        C(q, "destroy", c.destroyGroupedData); C(q, "afterSetOptions", function (a) { a = a.options; var b = this.type, c = this.chart.options.plotOptions, e = g[b].dataGrouping, f = this.useCommonDataGrouping && d; if (u[b] || f) e || (e = p(d, u[b])), a.dataGrouping = p(f, e, c.series && c.series.dataGrouping, c[b].dataGrouping, this.userOptions.dataGrouping) }); C(n, "afterSetScale", function () { this.series.forEach(function (a) { a.hasProcessed = !1 }) }); n.prototype.getGroupPixelWidth = function () {
            var a = this.series, b = a.length, c, f = 0, g = !1, h; for (c = b; c--;)(h = a[c].options.dataGrouping) &&
                (f = Math.max(f, e(h.groupPixelWidth, d.groupPixelWidth))); for (c = b; c--;)(h = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length, a[c].groupPixelWidth || b > this.chart.plotSizeX / f || b && h.forced) && (g = !0); return g ? f : 0
        }; n.prototype.setDataGrouping = function (a, b) {
            var c; b = e(b, !0); a || (a = { forced: !1, units: null }); if (this instanceof n) for (c = this.series.length; c--;)this.series[c].update({ dataGrouping: a }, !1); else this.chart.options.series.forEach(function (b) { b.dataGrouping = a }, !1); this.ordinalSlope =
                null; b && this.chart.redraw()
        }
    })(H); (function (a) {
        var C = a.Point, B = a.seriesType, F = a.seriesTypes; B("ohlc", "column", { lineWidth: 1, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e' }, threshold: null, states: { hover: { lineWidth: 3 } }, stickyTracking: !0 }, {
            directTouch: !1, pointArrayMap: ["open", "high", "low", "close"], toYData: function (a) {
                return [a.open,
                a.high, a.low, a.close]
            }, pointValKey: "close", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, init: function () { F.column.prototype.init.apply(this, arguments); this.options.stacking = !1 }, pointAttribs: function (a, g) { g = F.column.prototype.pointAttribs.call(this, a, g); var n = this.options; delete g.fill; !a.options.color && n.upColor && a.open < a.close && (g.stroke = n.upColor); return g }, translate: function () {
                var a = this, g = a.yAxis, t = !!a.modifyValue, w = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"]; F.column.prototype.translate.apply(a);
                a.points.forEach(function (n) { [n.open, n.high, n.low, n.close, n.low].forEach(function (v, p) { null !== v && (t && (v = a.modifyValue(v)), n[w[p]] = g.toPixels(v, !0)) }); n.tooltipPos[1] = n.plotHigh + g.pos - a.chart.plotTop })
            }, drawPoints: function () {
                var a = this, g = a.chart; a.points.forEach(function (n) {
                    var t, v, x, p, e = n.graphic, f, q = !e; void 0 !== n.plotY && (e || (n.graphic = e = g.renderer.path().add(a.group)), g.styledMode || e.attr(a.pointAttribs(n, n.selected && "select")), v = e.strokeWidth() % 2 / 2, f = Math.round(n.plotX) - v, x = Math.round(n.shapeArgs.width /
                        2), p = ["M", f, Math.round(n.yBottom), "L", f, Math.round(n.plotHigh)], null !== n.open && (t = Math.round(n.plotOpen) + v, p.push("M", f, t, "L", f - x, t)), null !== n.close && (t = Math.round(n.plotClose) + v, p.push("M", f, t, "L", f + x, t)), e[q ? "attr" : "animate"]({ d: p }).addClass(n.getClassName(), !0))
                })
            }, animate: null
        }, { getClassName: function () { return C.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down") } })
    })(H); (function (a) {
        var C = a.defaultPlotOptions, B = a.merge, F = a.seriesType, n = a.seriesTypes;
        F("candlestick", "ohlc", B(C.column, { states: { hover: { lineWidth: 2 } }, tooltip: C.ohlc.tooltip, threshold: null, lineColor: "#000000", lineWidth: 1, upColor: "#ffffff", stickyTracking: !0 }), {
            pointAttribs: function (a, t) {
                var g = n.column.prototype.pointAttribs.call(this, a, t), v = this.options, x = a.open < a.close, p = v.lineColor || this.color; g["stroke-width"] = v.lineWidth; g.fill = a.options.color || (x ? v.upColor || this.color : this.color); g.stroke = a.lineColor || (x ? v.upLineColor || p : p); t && (a = v.states[t], g.fill = a.color || g.fill, g.stroke = a.lineColor ||
                    g.stroke, g["stroke-width"] = a.lineWidth || g["stroke-width"]); return g
            }, drawPoints: function () {
                var a = this, n = a.chart, w = a.yAxis.reversed; a.points.forEach(function (g) {
                    var t = g.graphic, p, e, f, q, r, c, m, l = !t; void 0 !== g.plotY && (t || (g.graphic = t = n.renderer.path().add(a.group)), a.chart.styledMode || t.attr(a.pointAttribs(g, g.selected && "select")).shadow(a.options.shadow), r = t.strokeWidth() % 2 / 2, c = Math.round(g.plotX) - r, p = g.plotOpen, e = g.plotClose, f = Math.min(p, e), p = Math.max(p, e), m = Math.round(g.shapeArgs.width / 2), e = w ? p !==
                        g.yBottom : Math.round(f) !== Math.round(g.plotHigh), q = w ? Math.round(f) !== Math.round(g.plotHigh) : p !== g.yBottom, f = Math.round(f) + r, p = Math.round(p) + r, r = [], r.push("M", c - m, p, "L", c - m, f, "L", c + m, f, "L", c + m, p, "Z", "M", c, f, "L", c, e ? Math.round(w ? g.yBottom : g.plotHigh) : f, "M", c, p, "L", c, q ? Math.round(w ? g.plotHigh : g.yBottom) : p), t[l ? "attr" : "animate"]({ d: r }).addClass(g.getClassName(), !0))
                })
            }
        })
    })(H); da = function (a) {
        var C = a.defined, B = a.seriesTypes, F = a.stableSort; return {
            getPlotBox: function () {
                return a.Series.prototype.getPlotBox.call(this.options.onSeries &&
                    this.chart.get(this.options.onSeries) || this)
            }, translate: function () {
                B.column.prototype.translate.apply(this); var a = this, g = a.options, t = a.chart, w = a.points, v = w.length - 1, x, p = g.onSeries, p = p && t.get(p), g = g.onKey || "y", e = p && p.options.step, f = p && p.points, q = f && f.length, r = t.inverted, c = a.xAxis, m = a.yAxis, l = 0, d, u, G, D; if (p && p.visible && q) for (l = (p.pointXOffset || 0) + (p.barW || 0) / 2, t = p.currentDataGrouping, u = f[q - 1].x + (t ? t.totalRange : 0), F(w, function (a, b) { return a.x - b.x }), g = "plot" + g[0].toUpperCase() + g.substr(1); q-- && w[v] &&
                    !(d = f[q], t = w[v], t.y = d.y, d.x <= t.x && void 0 !== d[g] && (t.x <= u && (t.plotY = d[g], d.x < t.x && !e && (G = f[q + 1]) && void 0 !== G[g] && (D = (t.x - d.x) / (G.x - d.x), t.plotY += D * (G[g] - d[g]), t.y += D * (G.y - d.y))), v-- , q++ , 0 > v));); w.forEach(function (d, b) {
                        var e; d.plotX += l; if (void 0 === d.plotY || r) 0 <= d.plotX && d.plotX <= c.len ? r ? (d.plotY = c.translate(d.x, 0, 1, 0, 1), d.plotX = C(d.y) ? m.translate(d.y, 0, 0, 0, 1) : 0) : d.plotY = (c.opposite ? 0 : a.yAxis.len) + c.offset : d.shapeArgs = {}; (x = w[b - 1]) && x.plotX === d.plotX && (void 0 === x.stackIndex && (x.stackIndex = 0), e = x.stackIndex +
                            1); d.stackIndex = e
                    }); this.onSeries = p
            }
        }
    }(H); (function (a, C) {
        function B(a) { f[a + "pin"] = function (e, c, g, l, d) { var m = d && d.anchorX; d = d && d.anchorY; "circle" === a && l > g && (e -= Math.round((l - g) / 2), g = l); e = f[a](e, c, g, l); m && d && (e.push("M", "circle" === a ? e[1] - e[4] : e[1] + e[4] / 2, c > d ? c : c + l, "L", m, d), e = e.concat(f.circle(m - 1, d - 1, 2, 2))); return e } } var F = a.addEvent, n = a.merge, g = a.noop, t = a.defined, w = a.Renderer, v = a.Series, x = a.seriesType, p = a.TrackerMixin, e = a.VMLRenderer, f = a.SVGRenderer.prototype.symbols; x("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1, shape: "flag", stackDistance: 12, textAlign: "center", tooltip: { pointFormat: "{point.text}\x3cbr/\x3e" }, threshold: null, y: -30, fillColor: "#ffffff", lineWidth: 1, states: { hover: { lineColor: "#000000", fillColor: "#ccd6eb" } }, style: { fontSize: "11px", fontWeight: "bold" }
        }, {
            sorted: !1, noSharedTooltip: !0, allowDG: !1, takeOrdinalPosition: !1, trackerGroups: ["markerGroup"], forceCrop: !0, init: v.prototype.init, pointAttribs: function (a, e) {
                var c = this.options, f = a && a.color || this.color, g = c.lineColor, d = a && a.lineWidth; a = a &&
                    a.fillColor || c.fillColor; e && (a = c.states[e].fillColor, g = c.states[e].lineColor, d = c.states[e].lineWidth); return { fill: a || f, stroke: g || f, "stroke-width": d || c.lineWidth || 0 }
            }, translate: C.translate, getPlotBox: C.getPlotBox, drawPoints: function () {
                var e = this.points, f = this.chart, c = f.renderer, g, l, d = f.inverted, p = this.options, w = p.y, v, y, b, k, z, E, h = this.yAxis, A = {}, x = []; for (y = e.length; y--;)b = e[y], E = (d ? b.plotY : b.plotX) > this.xAxis.len, g = b.plotX, k = b.stackIndex, v = b.options.shape || p.shape, l = b.plotY, void 0 !== l && (l = b.plotY + w -
                    (void 0 !== k && k * p.stackDistance)), b.anchorX = k ? void 0 : b.plotX, z = k ? void 0 : b.plotY, k = b.graphic, void 0 !== l && 0 <= g && !E ? (k || (k = b.graphic = c.label("", null, null, v, null, null, p.useHTML), f.styledMode || k.attr(this.pointAttribs(b)).css(n(p.style, b.style)), k.attr({ align: "flag" === v ? "left" : "center", width: p.width, height: p.height, "text-align": p.textAlign }).addClass("highcharts-point").add(this.markerGroup), b.graphic.div && (b.graphic.div.point = b), f.styledMode || k.shadow(p.shadow), k.isNew = !0), 0 < g && (g -= k.strokeWidth() % 2),
                        v = { y: l, anchorY: z }, p.allowOverlapX && (v.x = g, v.anchorX = b.anchorX), k.attr({ text: b.options.title || p.title || "A" })[k.isNew ? "attr" : "animate"](v), p.allowOverlapX || (A[b.plotX] ? A[b.plotX].size = Math.max(A[b.plotX].size, k.width) : A[b.plotX] = { align: 0, size: k.width, target: g, anchorX: g }), b.tooltipPos = [g, l + h.pos - f.plotTop]) : k && (b.graphic = k.destroy()); p.allowOverlapX || (a.objectEach(A, function (a) { a.plotX = a.anchorX; x.push(a) }), a.distribute(x, d ? h.len : this.xAxis.len, 100), e.forEach(function (a) {
                            var b = a.graphic && A[a.plotX];
                            b && (a.graphic[a.graphic.isNew ? "attr" : "animate"]({ x: b.pos, anchorX: a.anchorX }), t(b.pos) ? a.graphic.isNew = !1 : (a.graphic.attr({ x: -9999, anchorX: -9999 }), a.graphic.isNew = !0))
                        })); p.useHTML && a.wrap(this.markerGroup, "on", function (b) { return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1)) })
            }, drawTracker: function () {
                var a = this.points; p.drawTrackerPoint.apply(this); a.forEach(function (e) {
                    var c = e.graphic; c && F(c.element, "mouseover", function () {
                    0 < e.stackIndex && !e.raised &&
                        (e._y = c.y, c.attr({ y: e._y - 8 }), e.raised = !0); a.forEach(function (a) { a !== e && a.raised && a.graphic && (a.graphic.attr({ y: a._y }), a.raised = !1) })
                    })
                })
            }, animate: function (a) { a ? this.setClip() : this.animate = null }, setClip: function () { v.prototype.setClip.apply(this, arguments); !1 !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey]) }, buildKDTree: g, invertGroups: g
            }); f.flag = function (a, e, c, g, l) {
                var d = l && l.anchorX || a; l = l && l.anchorY || e; return f.circle(d - 1, l - 1, 2, 2).concat(["M", d, l, "L",
                    a, e + g, a, e, a + c, e, a + c, e + g, a, e + g, "Z"])
            }; B("circle"); B("square"); w === e && ["flag", "circlepin", "squarepin"].forEach(function (a) { e.prototype.symbols[a] = f[a] })
    })(H, da); (function (a) {
        function C(a, e, f) { this.init(a, e, f) } var B = a.addEvent, F = a.Axis, n = a.correctFloat, g = a.defaultOptions, t = a.defined, w = a.destroyObjectProperties, v = a.fireEvent, x = a.hasTouch, p = a.merge, e = a.pick, f = a.removeEvent, q, r = {
            height: a.isTouchDevice ? 20 : 14, barBorderRadius: 0, buttonBorderRadius: 0, liveRedraw: void 0, margin: 10, minWidth: 6, step: .2, zIndex: 3, barBackgroundColor: "#cccccc",
            barBorderWidth: 1, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc", buttonBorderWidth: 1, rifleColor: "#333333", trackBackgroundColor: "#f2f2f2", trackBorderColor: "#f2f2f2", trackBorderWidth: 1
        }; g.scrollbar = p(!0, r, g.scrollbar); a.swapXY = q = function (a, e) { var c = a.length, d; if (e) for (e = 0; e < c; e += 3)d = a[e + 1], a[e + 1] = a[e + 2], a[e + 2] = d; return a }; C.prototype = {
            init: function (a, f, g) {
            this.scrollbarButtons = []; this.renderer = a; this.userOptions = f; this.options = p(r, f); this.chart =
                g; this.size = e(this.options.size, this.options.height); f.enabled && (this.render(), this.initEvents(), this.addEvents())
            }, render: function () {
                var a = this.renderer, e = this.options, f = this.size, d = this.chart.styledMode, g; this.group = g = a.g("scrollbar").attr({ zIndex: e.zIndex, translateY: -99999 }).add(); this.track = a.rect().addClass("highcharts-scrollbar-track").attr({ x: 0, r: e.trackBorderRadius || 0, height: f, width: f }).add(g); d || this.track.attr({ fill: e.trackBackgroundColor, stroke: e.trackBorderColor, "stroke-width": e.trackBorderWidth });
                this.trackBorderWidth = this.track.strokeWidth(); this.track.attr({ y: -this.trackBorderWidth % 2 / 2 }); this.scrollbarGroup = a.g().add(g); this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({ height: f, width: f, r: e.barBorderRadius || 0 }).add(this.scrollbarGroup); this.scrollbarRifles = a.path(q(["M", -3, f / 4, "L", -3, 2 * f / 3, "M", 0, f / 4, "L", 0, 2 * f / 3, "M", 3, f / 4, "L", 3, 2 * f / 3], e.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup); d || (this.scrollbar.attr({
                    fill: e.barBackgroundColor, stroke: e.barBorderColor,
                    "stroke-width": e.barBorderWidth
                }), this.scrollbarRifles.attr({ stroke: e.rifleColor, "stroke-width": 1 })); this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(); this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2); this.drawScrollbarButton(0); this.drawScrollbarButton(1)
            }, position: function (a, e, f, d) {
                var c = this.options.vertical, g = 0, m = this.rendered ? "animate" : "attr"; this.x = a; this.y = e + this.trackBorderWidth; this.width = f; this.xOffset = this.height = d; this.yOffset = g; c ? (this.width =
                    this.yOffset = f = g = this.size, this.xOffset = e = 0, this.barWidth = d - 2 * f, this.x = a += this.options.margin) : (this.height = this.xOffset = d = e = this.size, this.barWidth = f - 2 * d, this.y += this.options.margin); this.group[m]({ translateX: a, translateY: this.y }); this.track[m]({ width: f, height: d }); this.scrollbarButtons[1][m]({ translateX: c ? 0 : f - e, translateY: c ? d - g : 0 })
            }, drawScrollbarButton: function (a) {
                var c = this.renderer, e = this.scrollbarButtons, d = this.options, f = this.size, g; g = c.g().add(this.group); e.push(g); g = c.rect().addClass("highcharts-scrollbar-button").add(g);
                this.chart.styledMode || g.attr({ stroke: d.buttonBorderColor, "stroke-width": d.buttonBorderWidth, fill: d.buttonBackgroundColor }); g.attr(g.crisp({ x: -.5, y: -.5, width: f + 1, height: f + 1, r: d.buttonBorderRadius }, g.strokeWidth())); g = c.path(q(["M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, "L", f / 2 + (a ? 2 : -2), f / 2], d.vertical)).addClass("highcharts-scrollbar-arrow").add(e[a]); this.chart.styledMode || g.attr({ fill: d.buttonArrowColor })
            }, setRange: function (a, e) {
                var c = this.options, d = c.vertical, f = c.minWidth, g = this.barWidth, m,
                p, b = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate"; t(g) && (a = Math.max(a, 0), m = Math.ceil(g * a), this.calculatedWidth = p = n(g * Math.min(e, 1) - m), p < f && (m = (g - f + p) * a, p = f), f = Math.floor(m + this.xOffset + this.yOffset), g = p / 2 - .5, this.from = a, this.to = e, d ? (this.scrollbarGroup[b]({ translateY: f }), this.scrollbar[b]({ height: p }), this.scrollbarRifles[b]({ translateY: g }), this.scrollbarTop = f, this.scrollbarLeft = 0) : (this.scrollbarGroup[b]({ translateX: f }), this.scrollbar[b]({ width: p }),
                    this.scrollbarRifles[b]({ translateX: g }), this.scrollbarLeft = f, this.scrollbarTop = 0), 12 >= p ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === c.showFull && (0 >= a && 1 <= e ? this.group.hide() : this.group.show()), this.rendered = !0)
            }, initEvents: function () {
                var a = this; a.mouseMoveHandler = function (c) {
                    var e = a.chart.pointer.normalize(c), d = a.options.vertical ? "chartY" : "chartX", f = a.initPositions; !a.grabbedCenter || c.touches && 0 === c.touches[0][d] || (e = a.cursorToScrollbarPosition(e)[d], d = a[d], d = e - d, a.hasDragged = !0,
                        a.updatePosition(f[0] + d, f[1] + d), a.hasDragged && v(a, "changed", { from: a.from, to: a.to, trigger: "scrollbar", DOMType: c.type, DOMEvent: c }))
                }; a.mouseUpHandler = function (c) { a.hasDragged && v(a, "changed", { from: a.from, to: a.to, trigger: "scrollbar", DOMType: c.type, DOMEvent: c }); a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null }; a.mouseDownHandler = function (c) { c = a.chart.pointer.normalize(c); c = a.cursorToScrollbarPosition(c); a.chartX = c.chartX; a.chartY = c.chartY; a.initPositions = [a.from, a.to]; a.grabbedCenter = !0 }; a.buttonToMinClick =
                    function (c) { var e = n(a.to - a.from) * a.options.step; a.updatePosition(n(a.from - e), n(a.to - e)); v(a, "changed", { from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: c }) }; a.buttonToMaxClick = function (c) { var e = (a.to - a.from) * a.options.step; a.updatePosition(a.from + e, a.to + e); v(a, "changed", { from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: c }) }; a.trackClick = function (c) {
                        var e = a.chart.pointer.normalize(c), d = a.to - a.from, f = a.y + a.scrollbarTop, g = a.x + a.scrollbarLeft; a.options.vertical && e.chartY > f || !a.options.vertical && e.chartX >
                            g ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d); v(a, "changed", { from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: c })
                    }
            }, cursorToScrollbarPosition: function (a) { var c = this.options, c = c.minWidth > this.calculatedWidth ? c.minWidth : 0; return { chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c), chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c) } }, updatePosition: function (a, e) { 1 < e && (a = n(1 - n(e - a)), e = 1); 0 > a && (e = n(e - a), a = 0); this.from = a; this.to = e }, update: function (a) {
                this.destroy(); this.init(this.chart.renderer,
                    p(!0, this.options, a), this.chart)
            }, addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], e = this.scrollbarButtons, f = this.scrollbarGroup.element, d = this.mouseDownHandler, g = this.mouseMoveHandler, p = this.mouseUpHandler, a = [[e[a[0]].element, "click", this.buttonToMinClick], [e[a[1]].element, "click", this.buttonToMaxClick], [this.track.element, "click", this.trackClick], [f, "mousedown", d], [f.ownerDocument, "mousemove", g], [f.ownerDocument, "mouseup", p]]; x && a.push([f, "touchstart", d], [f.ownerDocument, "touchmove",
                    g], [f.ownerDocument, "touchend", p]); a.forEach(function (a) { B.apply(null, a) }); this._events = a
            }, removeEvents: function () { this._events.forEach(function (a) { f.apply(null, a) }); this._events.length = 0 }, destroy: function () { var a = this.chart.scroller; this.removeEvents();["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (a) { this[a] && this[a].destroy && (this[a] = this[a].destroy()) }, this); a && this === a.scrollbar && (a.scrollbar = null, w(a.scrollbarButtons)) }
        }; B(F, "afterInit", function () {
            var c = this;
            c.options && c.options.scrollbar && c.options.scrollbar.enabled && (c.options.scrollbar.vertical = !c.horiz, c.options.startOnTick = c.options.endOnTick = !1, c.scrollbar = new C(c.chart.renderer, c.options.scrollbar, c.chart), B(c.scrollbar, "changed", function (f) {
                var g = Math.min(e(c.options.min, c.min), c.min, c.dataMin), d = Math.max(e(c.options.max, c.max), c.max, c.dataMax) - g, m; c.horiz && !c.reversed || !c.horiz && c.reversed ? (m = g + d * this.to, g += d * this.from) : (m = g + d * (1 - this.from), g += d * (1 - this.to)); e(this.options.liveRedraw, a.svg &&
                    !a.isTouchDevice && !this.chart.isBoosting) || "mouseup" === f.DOMType || !t(f.DOMType) ? c.setExtremes(g, m, !0, "mousemove" !== f.DOMType, f) : this.setRange(this.from, this.to)
            }))
        }); B(F, "afterRender", function () {
            var a = Math.min(e(this.options.min, this.min), this.min, e(this.dataMin, this.min)), f = Math.max(e(this.options.max, this.max), this.max, e(this.dataMax, this.max)), g = this.scrollbar, d = this.titleOffset || 0; if (g) {
                this.horiz ? (g.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : d +
                    this.axisTitleMargin + this.offset), this.width, this.height), d = 1) : (g.position(this.left + this.width + 2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? d + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height), d = 0); if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[d] += this.scrollbar.size + this.scrollbar.options.margin; isNaN(a) || isNaN(f) || !t(this.min) || !t(this.max) ? g.setRange(0, 0) : (d = (this.min - a) / (f - a), a = (this.max - a) / (f - a), this.horiz && !this.reversed || !this.horiz &&
                        this.reversed ? g.setRange(d, a) : g.setRange(1 - a, 1 - d))
            }
        }); B(F, "afterGetOffset", function () { var a = this.horiz ? 2 : 1, e = this.scrollbar; e && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[a] += e.size + e.options.margin) }); a.Scrollbar = C
    })(H); (function (a) {
        function C(a) { this.init(a) } var B = a.addEvent, F = a.Axis, n = a.Chart, g = a.color, t = a.defaultOptions, w = a.defined, v = a.destroyObjectProperties, x = a.erase, p = a.extend, e = a.hasTouch, f = a.isArray, q = a.isNumber, r = a.isTouchDevice, c = a.merge, m = a.pick, l = a.removeEvent, d = a.Scrollbar,
            u = a.Series, G = a.seriesTypes, D = [].concat(a.defaultDataGroupingUnits), y = function (a) { var b = [].filter.call(arguments, q); if (b.length) return Math[a].apply(0, b) }; D[4] = ["day", [1, 2, 3, 4]]; D[5] = ["week", [1, 2, 3]]; G = void 0 === G.areaspline ? "line" : "areaspline"; p(t, {
                navigator: {
                    height: 40, margin: 25, maskInside: !0, handles: { width: 7, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: !0, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" }, maskFill: g("#6685c2").setOpacity(.3).get(), outlineColor: "#cccccc",
                    outlineWidth: 1, series: { type: G, fillOpacity: .05, lineWidth: 1, compare: null, dataGrouping: { approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: D }, dataLabels: { enabled: !1, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: !1 }, pointRange: 0, threshold: null }, xAxis: {
                        overscroll: 0, className: "highcharts-navigator-xaxis", tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", gridLineWidth: 1, tickPixelInterval: 200, labels: {
                            align: "left", style: { color: "#999999" },
                            x: 3, y: -4
                        }, crosshair: !1
                    }, yAxis: { className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: !1, endOnTick: !1, minPadding: .1, maxPadding: .1, labels: { enabled: !1 }, crosshair: !1, title: { text: null }, tickLength: 0, tickWidth: 0 }
                }
            }); a.Renderer.prototype.symbols["navigator-handle"] = function (a, c, d, e, f) { a = f.width / 2; c = Math.round(a / 3) + .5; f = f.height; return ["M", -a - 1, .5, "L", a, .5, "L", a, f + .5, "L", -a - 1, f + .5, "L", -a - 1, .5, "M", -c, 4, "L", -c, f - 3, "M", c - 1, 4, "L", c - 1, f - 3] }; C.prototype = {
                drawHandle: function (a, c, d, e) {
                    var b = this.navigatorOptions.handles.height;
                    this.handles[c][e](d ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(a, 10) + .5 - b) } : { translateX: Math.round(this.left + parseInt(a, 10)), translateY: Math.round(this.top + this.height / 2 - b / 2 - 1) })
                }, drawOutline: function (a, c, d, e) {
                    var b = this.navigatorOptions.maskInside, f = this.outline.strokeWidth(), g = f / 2, f = f % 2 / 2, k = this.outlineHeight, l = this.scrollbarHeight, m = this.size, p = this.left - l, n = this.top; d ? (p -= g, d = n + c + f, c = n + a + f, a = ["M", p + k, n - l - f, "L", p + k, d, "L", p, d, "L", p, c, "L", p + k, c, "L", p +
                        k, n + m + l].concat(b ? ["M", p + k, d - g, "L", p + k, c + g] : [])) : (a += p + l - f, c += p + l - f, n += g, a = ["M", p, n, "L", a, n, "L", a, n + k, "L", c, n + k, "L", c, n, "L", p + m + 2 * l, n].concat(b ? ["M", a - g, n, "L", c + g, n] : [])); this.outline[e]({ d: a })
                }, drawMasks: function (a, c, d, e) { var b = this.left, f = this.top, g = this.height, k, l, m, p; d ? (m = [b, b, b], p = [f, f + a, f + c], l = [g, g, g], k = [a, c - a, this.size - c]) : (m = [b, b + a, b + c], p = [f, f, f], l = [a, c - a, this.size - c], k = [g, g, g]); this.shades.forEach(function (a, b) { a[e]({ x: m[b], y: p[b], width: l[b], height: k[b] }) }) }, renderElements: function () {
                    var a =
                        this, c = a.navigatorOptions, d = c.maskInside, e = a.chart, f = e.renderer, g, l = { cursor: e.inverted ? "ns-resize" : "ew-resize" }; a.navigatorGroup = g = f.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();[!d, d, !d].forEach(function (b, d) { a.shades[d] = f.rect().addClass("highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")).add(g); e.styledMode || a.shades[d].attr({ fill: b ? c.maskFill : "rgba(0,0,0,0)" }).css(1 === d && l) }); a.outline = f.path().addClass("highcharts-navigator-outline").add(g); e.styledMode || a.outline.attr({
                            "stroke-width": c.outlineWidth,
                            stroke: c.outlineColor
                        }); c.handles.enabled && [0, 1].forEach(function (b) { c.handles.inverted = e.inverted; a.handles[b] = f.symbol(c.handles.symbols[b], -c.handles.width / 2 - 1, 0, c.handles.width, c.handles.height, c.handles); a.handles[b].attr({ zIndex: 7 - b }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][b]).add(g); if (!e.styledMode) { var d = c.handles; a.handles[b].attr({ fill: d.backgroundColor, stroke: d.borderColor, "stroke-width": d.lineWidth }).css(l) } })
                }, update: function (a) {
                    (this.series ||
                        []).forEach(function (a) { a.baseSeries && delete a.baseSeries.navigatorSeries }); this.destroy(); c(!0, this.chart.options.navigator, this.options, a); this.init(this.chart)
                }, render: function (b, c, d, e) {
                    var f = this.chart, g, k, l = this.scrollbarHeight, p, n = this.xAxis; g = n.fake ? f.xAxis[0] : n; var r = this.navigatorEnabled, t, u = this.rendered; k = f.inverted; var z, v = f.xAxis[0].minRange, y = f.xAxis[0].options.maxRange; if (!this.hasDragged || w(d)) {
                        if (!q(b) || !q(c)) if (u) d = 0, e = m(n.width, g.width); else return; this.left = m(n.left, f.plotLeft +
                            l + (k ? f.plotWidth : 0)); this.size = t = p = m(n.len, (k ? f.plotHeight : f.plotWidth) - 2 * l); f = k ? l : p + 2 * l; d = m(d, n.toPixels(b, !0)); e = m(e, n.toPixels(c, !0)); q(d) && Infinity !== Math.abs(d) || (d = 0, e = f); b = n.toValue(d, !0); c = n.toValue(e, !0); z = Math.abs(a.correctFloat(c - b)); z < v ? this.grabbedLeft ? d = n.toPixels(c - v, !0) : this.grabbedRight && (e = n.toPixels(b + v, !0)) : w(y) && z > y && (this.grabbedLeft ? d = n.toPixels(c - y, !0) : this.grabbedRight && (e = n.toPixels(b + y, !0))); this.zoomedMax = Math.min(Math.max(d, e, 0), t); this.zoomedMin = Math.min(Math.max(this.fixedWidth ?
                                this.zoomedMax - this.fixedWidth : Math.min(d, e), 0), t); this.range = this.zoomedMax - this.zoomedMin; t = Math.round(this.zoomedMax); d = Math.round(this.zoomedMin); r && (this.navigatorGroup.attr({ visibility: "visible" }), u = u && !this.hasDragged ? "animate" : "attr", this.drawMasks(d, t, k, u), this.drawOutline(d, t, k, u), this.navigatorOptions.handles.enabled && (this.drawHandle(d, 0, k, u), this.drawHandle(t, 1, k, u))); this.scrollbar && (k ? (k = this.top - l, g = this.left - l + (r || !g.opposite ? 0 : (g.titleOffset || 0) + g.axisTitleMargin), l = p + 2 * l) : (k = this.top +
                                    (r ? this.height : -l), g = this.left - l), this.scrollbar.position(g, k, f, l), this.scrollbar.setRange(this.zoomedMin / (p || 1), this.zoomedMax / (p || 1))); this.rendered = !0
                    }
                }, addMouseEvents: function () {
                    var a = this, c = a.chart, d = c.container, f = [], g, l; a.mouseMoveHandler = g = function (b) { a.onMouseMove(b) }; a.mouseUpHandler = l = function (b) { a.onMouseUp(b) }; f = a.getPartsEvents("mousedown"); f.push(B(d, "mousemove", g), B(d.ownerDocument, "mouseup", l)); e && (f.push(B(d, "touchmove", g), B(d.ownerDocument, "touchend", l)), f.concat(a.getPartsEvents("touchstart")));
                    a.eventsToUnbind = f; a.series && a.series[0] && f.push(B(a.series[0].xAxis, "foundExtremes", function () { c.navigator.modifyNavigatorAxisExtremes() }))
                }, getPartsEvents: function (a) { var b = this, c = [];["shades", "handles"].forEach(function (d) { b[d].forEach(function (e, f) { c.push(B(e.element, a, function (a) { b[d + "Mousedown"](a, f) })) }) }); return c }, shadesMousedown: function (a, c) {
                    a = this.chart.pointer.normalize(a); var b = this.chart, d = this.xAxis, e = this.zoomedMin, f = this.left, g = this.size, k = this.range, l = a.chartX, m, p; b.inverted && (l =
                        a.chartY, f = this.top); 1 === c ? (this.grabbedCenter = l, this.fixedWidth = k, this.dragOffset = l - e) : (a = l - f - k / 2, 0 === c ? a = Math.max(0, a) : 2 === c && a + k >= g && (a = g - k, this.reversedExtremes ? (a -= k, p = this.getUnionExtremes().dataMin) : m = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = k, c = d.toFixedRange(a, a + k, p, m), w(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, null, { trigger: "navigator" })))
                }, handlesMousedown: function (a, c) {
                    this.chart.pointer.normalize(a); a = this.chart; var b = a.xAxis[0], d =
                        this.reversedExtremes; 0 === c ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? b.min : b.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? b.max : b.min); a.fixedRange = null
                }, onMouseMove: function (b) {
                    var c = this, d = c.chart, e = c.left, f = c.navigatorSize, g = c.range, l = c.dragOffset, p = d.inverted; b.touches && 0 === b.touches[0].pageX || (b = d.pointer.normalize(b), d = b.chartX, p && (e = c.top, d = b.chartY), c.grabbedLeft ? (c.hasDragged = !0, c.render(0, 0, d - e, c.otherHandlePos)) : c.grabbedRight ?
                        (c.hasDragged = !0, c.render(0, 0, c.otherHandlePos, d - e)) : c.grabbedCenter && (c.hasDragged = !0, d < l ? d = l : d > f + l - g && (d = f + l - g), c.render(0, 0, d - l, d - l + g)), c.hasDragged && c.scrollbar && m(c.scrollbar.options.liveRedraw, a.svg && !r && !this.chart.isBoosting) && (b.DOMType = b.type, setTimeout(function () { c.onMouseUp(b) }, 0)))
                }, onMouseUp: function (a) {
                    var b = this.chart, c = this.xAxis, d = this.scrollbar, e, f, g = a.DOMEvent || a; (!this.hasDragged || d && d.hasDragged) && "scrollbar" !== a.trigger || (d = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ?
                        e = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme), this.zoomedMax === this.size && (f = this.reversedExtremes ? d.dataMin : d.dataMax), 0 === this.zoomedMin && (e = this.reversedExtremes ? d.dataMax : d.dataMin), c = c.toFixedRange(this.zoomedMin, this.zoomedMax, e, f), w(c.min) && b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: g })); "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter =
                            this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
                }, removeEvents: function () { this.eventsToUnbind && (this.eventsToUnbind.forEach(function (a) { a() }), this.eventsToUnbind = void 0); this.removeBaseSeriesEvents() }, removeBaseSeriesEvents: function () { var a = this.baseSeries || []; this.navigatorEnabled && a[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && a.forEach(function (a) { l(a, "updatedData", this.updatedDataHandler) }, this), a[0].xAxis && l(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)) },
                init: function (a) {
                    var b = a.options, e = b.navigator, f = e.enabled, g = b.scrollbar, l = g.enabled, b = f ? e.height : 0, p = l ? g.height : 0; this.handles = []; this.shades = []; this.chart = a; this.setBaseSeries(); this.height = b; this.scrollbarHeight = p; this.scrollbarEnabled = l; this.navigatorEnabled = f; this.navigatorOptions = e; this.scrollbarOptions = g; this.outlineHeight = b + p; this.opposite = m(e.opposite, !f && a.inverted); var n = this, f = n.baseSeries, g = a.xAxis.length, l = a.yAxis.length, q = f && f[0] && f[0].xAxis || a.xAxis[0] || { options: {} }; a.isDirtyBox = !0;
                    n.navigatorEnabled ? (n.xAxis = new F(a, c({ breaks: q.options.breaks, ordinal: q.options.ordinal }, e.xAxis, { id: "navigator-x-axis", yAxis: "navigator-y-axis", isX: !0, type: "datetime", index: g, isInternal: !0, offset: 0, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1 }, a.inverted ? { offsets: [p, 0, -p, 0], width: b } : { offsets: [0, -p, 0, p], height: b })), n.yAxis = new F(a, c(e.yAxis, { id: "navigator-y-axis", alignTicks: !1, offset: 0, index: l, isInternal: !0, zoomEnabled: !1 }, a.inverted ? { width: b } : { height: b })),
                        f || e.series.data ? n.updateNavigatorSeries(!1) : 0 === a.series.length && (n.unbindRedraw = B(a, "beforeRedraw", function () { 0 < a.series.length && !n.series && (n.setBaseSeries(), n.unbindRedraw()) })), n.reversedExtremes = a.inverted && !n.xAxis.reversed || !a.inverted && n.xAxis.reversed, n.renderElements(), n.addMouseEvents()) : n.xAxis = {
                            translate: function (b, c) { var d = a.xAxis[0], e = d.getExtremes(), f = d.len - 2 * p, g = y("min", d.options.min, e.dataMin), d = y("max", d.options.max, e.dataMax) - g; return c ? b * d / f + g : f * (b - g) / d }, toPixels: function (a) { return this.translate(a) },
                            toValue: function (a) { return this.translate(a, !0) }, toFixedRange: F.prototype.toFixedRange, fake: !0
                        }; a.options.scrollbar.enabled && (a.scrollbar = n.scrollbar = new d(a.renderer, c(a.options.scrollbar, { margin: n.navigatorEnabled ? 0 : 10, vertical: a.inverted }), a), B(n.scrollbar, "changed", function (b) { var c = n.size, d = c * this.to, c = c * this.from; n.hasDragged = n.scrollbar.hasDragged; n.render(0, 0, c, d); (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType && "touchmove" !== b.DOMType) && setTimeout(function () { n.onMouseUp(b) }) }));
                    n.addBaseSeriesEvents(); n.addChartEvents()
                }, getUnionExtremes: function (a) { var b = this.chart.xAxis[0], c = this.xAxis, d = c.options, e = b.options, f; a && null === b.dataMin || (f = { dataMin: m(d && d.min, y("min", e.min, b.dataMin, c.dataMin, c.min)), dataMax: m(d && d.max, y("max", e.max, b.dataMax, c.dataMax, c.max)) }); return f }, setBaseSeries: function (a, c) {
                    var b = this.chart, d = this.baseSeries = []; a = a || b.options && b.options.navigator.baseSeries || 0; (b.series || []).forEach(function (b, c) {
                        b.options.isInternal || !b.options.showInNavigator && (c !==
                            a && b.options.id !== a || !1 === b.options.showInNavigator) || d.push(b)
                    }); this.xAxis && !this.xAxis.fake && this.updateNavigatorSeries(!0, c)
                }, updateNavigatorSeries: function (b, d) {
                    var e = this, g = e.chart, h = e.baseSeries, k, m, n = e.navigatorOptions.series, q, r = { enableMouseTracking: !1, index: null, linkedTo: null, group: "nav", padXAxis: !1, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: !1, stacking: !1, isInternal: !0 }, u = e.series = (e.series || []).filter(function (a) {
                        var b = a.baseSeries; return 0 > h.indexOf(b) ? (b && (l(b, "updatedData",
                            e.updatedDataHandler), delete b.navigatorSeries), a.chart && a.destroy(), !1) : !0
                    }); h && h.length && h.forEach(function (a) {
                        var b = a.navigatorSeries, l = p({ color: a.color, visible: a.visible }, f(n) ? t.navigator.series : n); b && !1 === e.navigatorOptions.adaptToUpdatedData || (r.name = "Navigator " + h.length, k = a.options || {}, q = k.navigatorOptions || {}, m = c(k, r, l, q), l = q.data || l.data, e.hasNavigatorData = e.hasNavigatorData || !!l, m.data = l || k.data && k.data.slice(0), b && b.options ? b.update(m, d) : (a.navigatorSeries = g.initSeries(m), a.navigatorSeries.baseSeries =
                            a, u.push(a.navigatorSeries)))
                    }); if (n.data && (!h || !h.length) || f(n)) e.hasNavigatorData = !1, n = a.splat(n), n.forEach(function (a, b) { r.name = "Navigator " + (u.length + 1); m = c(t.navigator.series, { color: g.series[b] && !g.series[b].options.isInternal && g.series[b].color || g.options.colors[b] || g.options.colors[0] }, r, a); m.data = a.data; m.data && (e.hasNavigatorData = !0, u.push(g.initSeries(m))) }); b && this.addBaseSeriesEvents()
                }, addBaseSeriesEvents: function () {
                    var a = this, c = a.baseSeries || []; c[0] && c[0].xAxis && B(c[0].xAxis, "foundExtremes",
                        this.modifyBaseAxisExtremes); c.forEach(function (b) { B(b, "show", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1) }); B(b, "hide", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1) }); !1 !== this.navigatorOptions.adaptToUpdatedData && b.xAxis && B(b, "updatedData", this.updatedDataHandler); B(b, "remove", function () { this.navigatorSeries && (x(a.series, this.navigatorSeries), w(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries) }) }, this)
                },
                getBaseSeriesMin: function (a) { return this.baseSeries.reduce(function (a, b) { return Math.min(a, b.xData[0]) }, a) }, modifyNavigatorAxisExtremes: function () { var a = this.xAxis, c; a.getExtremes && (!(c = this.getUnionExtremes(!0)) || c.dataMin === a.min && c.dataMax === a.max || (a.min = c.dataMin, a.max = c.dataMax)) }, modifyBaseAxisExtremes: function () {
                    var a = this.chart.navigator, c = this.getExtremes(), d = c.dataMin, e = c.dataMax, c = c.max - c.min, f = a.stickToMin, g = a.stickToMax, l = m(this.options.overscroll, 0), n, p, r = a.series && a.series[0], t = !!this.setExtremes;
                    this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (f && (p = d, n = p + c), g && (n = e + l, f || (p = Math.max(n - c, a.getBaseSeriesMin(r && r.xData ? r.xData[0] : -Number.MAX_VALUE)))), t && (f || g) && q(p) && (this.min = this.userMin = p, this.max = this.userMax = n)); a.stickToMin = a.stickToMax = null
                }, updatedDataHandler: function () {
                    var a = this.chart.navigator, c = this.navigatorSeries, d = a.getBaseSeriesMin(this.xData[0]); a.stickToMax = a.reversedExtremes ? 0 === Math.round(a.zoomedMin) : Math.round(a.zoomedMax) >= Math.round(a.size); a.stickToMin =
                        q(this.xAxis.min) && this.xAxis.min <= d && (!this.chart.fixedRange || !a.stickToMax); c && !a.hasNavigatorData && (c.options.pointStart = this.xData[0], c.setData(this.options.data, !1, null, !1))
                }, addChartEvents: function () {
                this.eventsToUnbind || (this.eventsToUnbind = []); this.eventsToUnbind.push(B(this.chart, "redraw", function () { var a = this.navigator, c = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]); c && a.render(c.min, c.max) }), B(this.chart, "getMargins", function () {
                    var a = this.navigator,
                    c = a.opposite ? "plotTop" : "marginBottom"; this.inverted && (c = a.opposite ? "marginRight" : "plotLeft"); this[c] = (this[c] || 0) + (a.navigatorEnabled || !this.inverted ? a.outlineHeight : 0) + a.navigatorOptions.margin
                }))
                }, destroy: function () {
                    this.removeEvents(); this.xAxis && (x(this.chart.xAxis, this.xAxis), x(this.chart.axes, this.xAxis)); this.yAxis && (x(this.chart.yAxis, this.yAxis), x(this.chart.axes, this.yAxis)); (this.series || []).forEach(function (a) { a.destroy && a.destroy() }); "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (a) {
                    this[a] &&
                        this[a].destroy && this[a].destroy(); this[a] = null
                    }, this);[this.handles].forEach(function (a) { v(a) }, this)
                }
            }; a.Navigator = C; B(F, "zoom", function (a) {
                var b = this.chart.options, c = b.chart.zoomType, d = b.chart.pinchType, e = b.navigator, b = b.rangeSelector; this.isXAxis && (e && e.enabled || b && b.enabled) && ("y" === c ? a.zoomed = !1 : (!r && "xy" === c || r && "xy" === d) && this.options.range && (c = this.previousZoom, w(a.newMin) ? this.previousZoom = [this.min, this.max] : c && (a.newMin = c[0], a.newMax = c[1], delete this.previousZoom))); void 0 !== a.zoomed &&
                    a.preventDefault()
            }); B(n, "beforeShowResetZoom", function () { var a = this.options, c = a.navigator, d = a.rangeSelector; if ((c && c.enabled || d && d.enabled) && (!r && "x" === a.chart.zoomType || r && "x" === a.chart.pinchType)) return !1 }); B(n, "beforeRender", function () { var a = this.options; if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new C(this) }); B(n, "afterSetChartSize", function () {
                var a = this.legend, c = this.navigator, d, e, f, g; c && (e = a && a.options, f = c.xAxis, g = c.yAxis, d = c.scrollbarHeight, this.inverted ? (c.left =
                    c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top || this.chartHeight - c.height - d - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? a.legendHeight + m(e.margin, 10) : 0)), f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize()))
            }); B(n, "update", function (a) {
                var b =
                    a.options.navigator || {}, d = a.options.scrollbar || {}; this.navigator || this.scroller || !b.enabled && !d.enabled || (c(!0, this.options.navigator, b), c(!0, this.options.scrollbar, d), delete a.options.navigator, delete a.options.scrollbar)
            }); B(n, "afterUpdate", function () { this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new C(this)) }); B(n, "afterAddSeries", function () { this.navigator && this.navigator.setBaseSeries(null, !1) }); B(u, "afterUpdate",
                function () { this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1) }); n.prototype.callbacks.push(function (a) { var b = a.navigator; b && a.xAxis[0] && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max)) })
    })(H); (function (a) {
        function C(a) { this.init(a) } var B = a.addEvent, F = a.Axis, n = a.Chart, g = a.css, t = a.createElement, w = a.defaultOptions, v = a.defined, x = a.destroyObjectProperties, p = a.discardElement, e = a.extend, f = a.fireEvent, q = a.isNumber, r = a.merge, c = a.pick, m = a.pInt, l = a.splat; e(w, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 }, floating: !1, x: 0, y: 0, height: void 0, inputPosition: { align: "right", x: 0, y: 0 }, buttonPosition: { align: "left", x: 0, y: 0 }, labelStyle: { color: "#666666" }
            }
        }); w.lang = r(w.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "From", rangeSelectorTo: "To" }); C.prototype = {
            clickButton: function (a, e) {
                var d = this.chart, f = this.buttonOptions[a], g = d.xAxis[0], b = d.scroller && d.scroller.getUnionExtremes() || g || {}, k = b.dataMin, m = b.dataMax, n, h = g && Math.round(Math.min(g.max, c(m, g.max))), p = f.type,
                r, b = f._range, t, u, w, v = f.dataGrouping; if (null !== k && null !== m) {
                d.fixedRange = b; v && (this.forcedDataGrouping = !0, F.prototype.setDataGrouping.call(g || { chart: this.chart }, v, !1), this.frozenStates = f.preserveDataGrouping); if ("month" === p || "year" === p) g ? (p = { range: f, max: h, chart: d, dataMin: k, dataMax: m }, n = g.minFromRange.call(p), q(p.newMax) && (h = p.newMax)) : b = f; else if (b) n = Math.max(h - b, k), h = Math.min(n + b, m); else if ("ytd" === p) if (g) void 0 === m && (k = Number.MAX_VALUE, m = Number.MIN_VALUE, d.series.forEach(function (a) {
                    a = a.xData; k =
                        Math.min(a[0], k); m = Math.max(a[a.length - 1], m)
                }), e = !1), h = this.getYTDExtremes(m, k, d.time.useUTC), n = t = h.min, h = h.max; else { this.deferredYTDClick = a; return } else "all" === p && g && (n = k, h = m); n += f._offsetMin; h += f._offsetMax; this.setSelected(a); g ? g.setExtremes(n, h, c(e, 1), null, { trigger: "rangeSelectorButton", rangeSelectorButton: f }) : (r = l(d.options.xAxis)[0], w = r.range, r.range = b, u = r.min, r.min = t, B(d, "load", function () { r.range = w; r.min = u }))
                }
            }, setSelected: function (a) { this.selected = this.options.selected = a }, defaultButtons: [{
                type: "month",
                count: 1, text: "1m"
            }, { type: "month", count: 3, text: "3m" }, { type: "month", count: 6, text: "6m" }, { type: "ytd", text: "YTD" }, { type: "year", count: 1, text: "1y" }, { type: "all", text: "All" }], init: function (a) {
                var c = this, d = a.options.rangeSelector, e = d.buttons || [].concat(c.defaultButtons), g = d.selected, b = function () { var a = c.minInput, b = c.maxInput; a && a.blur && f(a, "blur"); b && b.blur && f(b, "blur") }; c.chart = a; c.options = d; c.buttons = []; a.extraTopMargin = d.height; c.buttonOptions = e; this.unMouseDown = B(a.container, "mousedown", b); this.unResize =
                    B(a, "resize", b); e.forEach(c.computeButtonRange); void 0 !== g && e[g] && this.clickButton(g, !1); B(a, "load", function () { a.xAxis && a.xAxis[0] && B(a.xAxis[0], "setExtremes", function (b) { this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== b.trigger && "updatedData" !== b.trigger && c.forcedDataGrouping && !c.frozenStates && this.setDataGrouping(!1, !1) }) })
            }, updateButtonStates: function () {
                var a = this, c = this.chart, e = c.xAxis[0], f = Math.round(e.max - e.min), g = !e.hasVisibleSeries, b = c.scroller && c.scroller.getUnionExtremes() || e,
                k = b.dataMin, l = b.dataMax, c = a.getYTDExtremes(l, k, c.time.useUTC), m = c.min, h = c.max, n = a.selected, p = q(n), r = a.options.allButtonsEnabled, t = a.buttons; a.buttonOptions.forEach(function (b, c) {
                    var d = b._range, q = b.type, u = b.count || 1, w = t[c], v = 0; b = b._offsetMax - b._offsetMin; c = c === n; var z = d > l - k, x = d < e.minRange, y = !1, A = !1, d = d === f; ("month" === q || "year" === q) && f + 36E5 >= 864E5 * { month: 28, year: 365 }[q] * u - b && f - 36E5 <= 864E5 * { month: 31, year: 366 }[q] * u + b ? d = !0 : "ytd" === q ? (d = h - m + b === f, y = !c) : "all" === q && (d = e.max - e.min >= l - k, A = !c && p && d); q = !r && (z ||
                        x || A || g); u = c && d || d && !p && !y || c && a.frozenStates; q ? v = 3 : u && (p = !0, v = 2); w.state !== v && w.setState(v)
                })
            }, computeButtonRange: function (a) { var d = a.type, e = a.count || 1, f = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5 }; if (f[d]) a._range = f[d] * e; else if ("month" === d || "year" === d) a._range = 864E5 * { month: 30, year: 365 }[d] * e; a._offsetMin = c(a.offsetMin, 0); a._offsetMax = c(a.offsetMax, 0); a._range += a._offsetMax - a._offsetMin }, setInputValue: function (a, c) {
                var d = this.chart.options.rangeSelector, e = this.chart.time,
                f = this[a + "Input"]; v(c) && (f.previousValue = f.HCTime, f.HCTime = c); f.value = e.dateFormat(d.inputEditDateFormat || "%Y-%m-%d", f.HCTime); this[a + "DateBox"].attr({ text: e.dateFormat(d.inputDateFormat || "%b %e, %Y", f.HCTime) })
            }, showInput: function (a) { var c = this.inputGroup, d = this[a + "DateBox"]; g(this[a + "Input"], { left: c.translateX + d.x + "px", top: c.translateY + "px", width: d.width - 2 + "px", height: d.height - 2 + "px", border: "2px solid silver" }) }, hideInput: function (a) { g(this[a + "Input"], { border: 0, width: "1px", height: "1px" }); this.setInputValue(a) },
            drawInput: function (c) {
                function d() { var a = h.value, b = (k.inputDateParser || Date.parse)(a), c = l.xAxis[0], d = l.scroller && l.scroller.xAxis ? l.scroller.xAxis : c, e = d.dataMin, d = d.dataMax; b !== h.previousValue && (h.previousValue = b, q(b) || (b = a.split("-"), b = Date.UTC(m(b[0]), m(b[1]) - 1, m(b[2]))), q(b) && (l.time.useUTC || (b += 6E4 * (new Date).getTimezoneOffset()), v ? b > f.maxInput.HCTime ? b = void 0 : b < e && (b = e) : b < f.minInput.HCTime ? b = void 0 : b > d && (b = d), void 0 !== b && c.setExtremes(v ? b : c.min, v ? c.max : b, void 0, void 0, { trigger: "rangeSelectorInput" }))) }
                var f = this, l = f.chart, n = l.renderer.style || {}, b = l.renderer, k = l.options.rangeSelector, p = f.div, v = "min" === c, h, x, B = this.inputGroup; this[c + "Label"] = x = b.label(w.lang[v ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({ padding: 2 }).add(B); B.offset += x.width + 5; this[c + "DateBox"] = b = b.label("", B.offset).addClass("highcharts-range-input").attr({ padding: 2, width: k.inputBoxWidth || 90, height: k.inputBoxHeight || 17, "text-align": "center" }).on("click", function () {
                    f.showInput(c);
                    f[c + "Input"].focus()
                }); l.styledMode || b.attr({ stroke: k.inputBoxBorderColor || "#cccccc", "stroke-width": 1 }); b.add(B); B.offset += b.width + (v ? 10 : 0); this[c + "Input"] = h = t("input", { name: c, className: "highcharts-range-selector", type: "text" }, { top: l.plotTop + "px" }, p); l.styledMode || (x.css(r(n, k.labelStyle)), b.css(r({ color: "#333333" }, n, k.inputStyle)), g(h, e({ position: "absolute", border: 0, width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: n.fontSize, fontFamily: n.fontFamily, top: "-9999em" }, k.inputStyle))); h.onfocus =
                    function () { f.showInput(c) }; h.onblur = function () { h === a.doc.activeElement && (d(), f.hideInput(c)) }; h.onchange = d; h.onkeypress = function (a) { 13 === a.keyCode && d() }
            }, getPosition: function () { var a = this.chart, c = a.options.rangeSelector, a = "top" === c.verticalAlign ? a.plotTop - a.axisOffset[0] : 0; return { buttonTop: a + c.buttonPosition.y, inputTop: a + c.inputPosition.y - 10 } }, getYTDExtremes: function (a, c, e) {
                var d = this.chart.time, f = new d.Date(a), b = d.get("FullYear", f); e = e ? d.Date.UTC(b, 0, 1) : +new d.Date(b, 0, 1); c = Math.max(c || 0, e); f = f.getTime();
                return { max: Math.min(a || f, f), min: c }
            }, render: function (a, e) {
                var d = this, f = d.chart, g = f.renderer, b = f.container, k = f.options, l = k.exporting && !1 !== k.exporting.enabled && k.navigation && k.navigation.buttonOptions, m = w.lang, h = d.div, n = k.rangeSelector, p = c(k.chart.style && k.chart.style.zIndex, 0) + 1, k = n.floating, q = d.buttons, h = d.inputGroup, r = n.buttonTheme, u = n.buttonPosition, v = n.inputPosition, x = n.inputEnabled, B = r && r.states, C = f.plotLeft, F, H = d.buttonGroup, Q; Q = d.rendered; var V = d.options.verticalAlign, ca = f.legend, L = ca && ca.options,
                    N = u.y, O = v.y, R = Q || !1, X = R ? "animate" : "attr", ba = 0, Z = 0, Y; if (!1 !== n.enabled) {
                        Q || (d.group = Q = g.g("range-selector-group").attr({ zIndex: 7 }).add(), d.buttonGroup = H = g.g("range-selector-buttons").add(Q), d.zoomText = g.text(m.rangeSelectorZoom, 0, 15).add(H), f.styledMode || (d.zoomText.css(n.labelStyle), r["stroke-width"] = c(r["stroke-width"], 0)), d.buttonOptions.forEach(function (a, b) {
                        q[b] = g.button(a.text, 0, 0, function () { var c = a.events && a.events.click, e; c && (e = c.call(a)); !1 !== e && d.clickButton(b); d.isActive = !0 }, r, B && B.hover,
                            B && B.select, B && B.disabled).attr({ "text-align": "center" }).add(H)
                        }), !1 !== x && (d.div = h = t("div", null, { position: "relative", height: 0, zIndex: p }), b.parentNode.insertBefore(h, b), d.inputGroup = h = g.g("input-group").add(Q), h.offset = 0, d.drawInput("min"), d.drawInput("max"))); d.zoomText[X]({ x: c(C + u.x, C) }); F = c(C + u.x, C) + d.zoomText.getBBox().width + 5; d.buttonOptions.forEach(function (a, b) { q[b][X]({ x: F }); F += q[b].width + c(n.buttonSpacing, 5) }); C = f.plotLeft - f.spacing[3]; d.updateButtonStates(); l && this.titleCollision(f) && "top" ===
                            V && "right" === u.align && u.y + H.getBBox().height - 12 < (l.y || 0) + l.height && (ba = -40); "left" === u.align ? Y = u.x - f.spacing[3] : "right" === u.align && (Y = u.x + ba - f.spacing[1]); H.align({ y: u.y, width: H.getBBox().width, align: u.align, x: Y }, !0, f.spacingBox); d.group.placed = R; d.buttonGroup.placed = R; !1 !== x && (ba = l && this.titleCollision(f) && "top" === V && "right" === v.align && v.y - h.getBBox().height - 12 < (l.y || 0) + l.height + f.spacing[0] ? -40 : 0, "left" === v.align ? Y = C : "right" === v.align && (Y = -Math.max(f.axisOffset[1], -ba)), h.align({
                                y: v.y, width: h.getBBox().width,
                                align: v.align, x: v.x + Y - 2
                            }, !0, f.spacingBox), b = h.alignAttr.translateX + h.alignOptions.x - ba + h.getBBox().x + 2, l = h.alignOptions.width, m = H.alignAttr.translateX + H.getBBox().x, Y = H.getBBox().width + 20, (v.align === u.align || m + Y > b && b + l > m && N < O + h.getBBox().height) && h.attr({ translateX: h.alignAttr.translateX + (f.axisOffset[1] >= -ba ? 0 : -ba), translateY: h.alignAttr.translateY + H.getBBox().height + 10 }), d.setInputValue("min", a), d.setInputValue("max", e), d.inputGroup.placed = R); d.group.align({ verticalAlign: V }, !0, f.spacingBox); a = d.group.getBBox().height +
                                20; e = d.group.alignAttr.translateY; "bottom" === V && (ca = L && "bottom" === L.verticalAlign && L.enabled && !L.floating ? ca.legendHeight + c(L.margin, 10) : 0, a = a + ca - 20, Z = e - a - (k ? 0 : n.y) - 10); if ("top" === V) k && (Z = 0), f.titleOffset && (Z = f.titleOffset + f.options.title.margin), Z += f.margin[0] - f.spacing[0] || 0; else if ("middle" === V) if (O === N) Z = 0 > O ? e + void 0 : e; else if (O || N) Z = 0 > O || 0 > N ? Z - Math.min(O, N) : e - a + NaN; d.group.translate(n.x, n.y + Math.floor(Z)); !1 !== x && (d.minInput.style.marginTop = d.group.translateY + "px", d.maxInput.style.marginTop =
                                    d.group.translateY + "px"); d.rendered = !0
                    }
            }, getHeight: function () { var a = this.options, c = this.group, e = a.y, f = a.buttonPosition.y, a = a.inputPosition.y, c = c ? c.getBBox(!0).height + 13 + e : 0, e = Math.min(a, f); if (0 > a && 0 > f || 0 < a && 0 < f) c += Math.abs(e); return c }, titleCollision: function (a) { return !(a.options.title.text || a.options.subtitle.text) }, update: function (a) { var c = this.chart; r(!0, c.options.rangeSelector, a); this.destroy(); this.init(c); c.rangeSelector.render() }, destroy: function () {
                var c = this, e = c.minInput, f = c.maxInput; c.unMouseDown();
                c.unResize(); x(c.buttons); e && (e.onfocus = e.onblur = e.onchange = null); f && (f.onfocus = f.onblur = f.onchange = null); a.objectEach(c, function (a, d) { a && "chart" !== d && (a.destroy ? a.destroy() : a.nodeType && p(this[d])); a !== C.prototype[d] && (c[d] = null) }, this)
            }
        }; F.prototype.toFixedRange = function (a, e, f, g) { var d = this.chart && this.chart.fixedRange; a = c(f, this.translate(a, !0, !this.horiz)); e = c(g, this.translate(e, !0, !this.horiz)); f = d && (e - a) / d; .7 < f && 1.3 > f && (g ? a = e - d : e = a + d); q(a) && q(e) || (a = e = void 0); return { min: a, max: e } }; F.prototype.minFromRange =
            function () { var a = this.range, e = { month: "Month", year: "FullYear" }[a.type], f, g = this.max, l, b, k = function (a, b) { var c = new Date(a), d = c["get" + e](); c["set" + e](d + b); d === c["get" + e]() && c.setDate(0); return c.getTime() - a }; q(a) ? (f = g - a, b = a) : (f = g + k(g, -a.count), this.chart && (this.chart.fixedRange = g - f)); l = c(this.dataMin, Number.MIN_VALUE); q(f) || (f = l); f <= l && (f = l, void 0 === b && (b = k(f, a.count)), this.newMax = Math.min(f + b, this.dataMax)); q(g) || (f = void 0); return f }; B(n, "afterGetContainer", function () {
                this.options.rangeSelector.enabled &&
                (this.rangeSelector = new C(this))
            }); B(n, "beforeRender", function () { var a = this.axes, c = this.rangeSelector; c && (q(c.deferredYTDClick) && (c.clickButton(c.deferredYTDClick), delete c.deferredYTDClick), a.forEach(function (a) { a.updateNames(); a.setScale() }), this.getAxisMargins(), c.render(), a = c.options.verticalAlign, c.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))) }); B(n, "update", function (a) {
                var c = a.options.rangeSelector; a = this.rangeSelector; var d = this.extraBottomMargin,
                    e = this.extraTopMargin; c && c.enabled && !v(a) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new C(this)); this.extraTopMargin = this.extraBottomMargin = !1; a && (a.render(), c = c && c.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === c ? this.extraBottomMargin = !0 : "middle" !== c && (this.extraTopMargin = !0)), this.extraBottomMargin !== d || this.extraTopMargin !== e) && (this.isDirtyBox = !0)
            }); B(n, "render", function () {
                var a = this.rangeSelector; a && !a.options.floating && (a.render(), a = a.options.verticalAlign,
                    "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0))
            }); B(n, "getMargins", function () { var a = this.rangeSelector; a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a)) }); n.prototype.callbacks.push(function (a) {
                function c() { d = a.xAxis[0].getExtremes(); q(d.min) && e.render(d.min, d.max) } var d, e = a.rangeSelector, f, b; e && (b = B(a.xAxis[0], "afterSetExtremes", function (a) { e.render(a.min, a.max) }), f = B(a, "redraw", c), c()); B(a, "destroy", function () {
                    e &&
                    (f(), b())
                })
            }); a.RangeSelector = C
    })(H); (function (a) {
        var C = a.addEvent, B = a.arrayMax, F = a.arrayMin, n = a.Axis, g = a.Chart, t = a.defined, w = a.extend, v = a.format, x = a.isNumber, p = a.isString, e = a.merge, f = a.pick, q = a.Point, r = a.Renderer, c = a.Series, m = a.splat, l = a.SVGRenderer, d = a.VMLRenderer, u = c.prototype, G = u.init, D = u.processData, y = q.prototype.tooltipFormatter; a.StockChart = a.stockChart = function (b, c, d) {
            var k = p(b) || b.nodeName, h = arguments[k ? 1 : 0], l = h, n = h.series, q = a.getOptions(), r, t = f(h.navigator && h.navigator.enabled, q.navigator.enabled,
                !0), u = t ? { startOnTick: !1, endOnTick: !1 } : null, v = { marker: { enabled: !1, radius: 2 } }, w = { shadow: !1, borderWidth: 0 }; h.xAxis = m(h.xAxis || {}).map(function (a, b) { return e({ minPadding: 0, maxPadding: 0, overscroll: 0, ordinal: !0, title: { text: null }, labels: { overflow: "justify" }, showLastLabel: !0 }, q.xAxis, q.xAxis && q.xAxis[b], a, { type: "datetime", categories: null }, u) }); h.yAxis = m(h.yAxis || {}).map(function (a, b) {
                    r = f(a.opposite, !0); return e({ labels: { y: -2 }, opposite: r, showLastLabel: !(!a.categories && "category" !== a.type), title: { text: null } },
                        q.yAxis, q.yAxis && q.yAxis[b], a)
                }); h.series = null; h = e({ chart: { panning: !0, pinchType: "x" }, navigator: { enabled: t }, scrollbar: { enabled: f(q.scrollbar.enabled, !0) }, rangeSelector: { enabled: f(q.rangeSelector.enabled, !0) }, title: { text: null }, tooltip: { split: f(q.tooltip.split, !0), crosshairs: !0 }, legend: { enabled: !1 }, plotOptions: { line: v, spline: v, area: v, areaspline: v, arearange: v, areasplinerange: v, column: w, columnrange: w, candlestick: w, ohlc: w } }, h, { isStock: !0 }); h.series = l.series = n; return k ? new g(b, h, d) : new g(h, c)
        }; C(n, "autoLabelAlign",
            function (a) { var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels; this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled && (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, a.align = "right", a.preventDefault())) }); C(n, "destroy", function () { var a = this.chart, c = this.options && this.options.top + "," + this.options.height; c && a._labelPanes && a._labelPanes[c] === this && delete a._labelPanes[c] }); C(n, "getPlotLinePath", function (b) {
                function c(a) {
                    var b =
                        "xAxis" === a ? "yAxis" : "xAxis"; a = d.options[b]; return x(a) ? [g[b][a]] : p(a) ? [g.get(a)] : e.map(function (a) { return a[b] })
                } var d = this, e = this.isLinked && !this.series ? this.linkedParent.series : this.series, g = d.chart, l = g.renderer, m = d.left, n = d.top, q, r, u, v, w = [], y = [], B, C, D = b.translatedValue, F = b.value, G = b.force, H; if ("xAxis" === d.coll || "yAxis" === d.coll) b.preventDefault(), y = c(d.coll), B = d.isXAxis ? g.yAxis : g.xAxis, B.forEach(function (a) {
                    if (t(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                        var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = t(a.options[b]) ? g[b][a.options[b]] : g[b][0]; d === b && y.push(a)
                    }
                }), C = y.length ? [] : [d.isXAxis ? g.yAxis[0] : g.xAxis[0]], y.forEach(function (b) { -1 !== C.indexOf(b) || a.find(C, function (a) { return a.pos === b.pos && a.len === b.len }) || C.push(b) }), H = f(D, d.translate(F, null, null, b.old)), x(H) && (d.horiz ? C.forEach(function (a) { var b; r = a.pos; v = r + a.len; q = u = Math.round(H + d.transB); "pass" !== G && (q < m || q > m + d.width) && (G ? q = u = Math.min(Math.max(m, q), m + d.width) : b = !0); b || w.push("M", q, r, "L", u, v) }) : C.forEach(function (a) {
                    var b; q = a.pos; u = q + a.len;
                    r = v = Math.round(n + d.height - H); "pass" !== G && (r < n || r > n + d.height) && (G ? r = v = Math.min(Math.max(n, r), d.top + d.height) : b = !0); b || w.push("M", q, r, "L", u, v)
                })), b.path = 0 < w.length ? l.crispPolyLine(w, b.lineWidth || 1) : null
            }); l.prototype.crispPolyLine = function (a, c) { var b; for (b = 0; b < a.length; b += 6)a[b + 1] === a[b + 4] && (a[b + 1] = a[b + 4] = Math.round(a[b + 1]) - c % 2 / 2), a[b + 2] === a[b + 5] && (a[b + 2] = a[b + 5] = Math.round(a[b + 2]) + c % 2 / 2); return a }; r === d && (d.prototype.crispPolyLine = l.prototype.crispPolyLine); C(n, "afterHideCrosshair", function () {
            this.crossLabel &&
                (this.crossLabel = this.crossLabel.hide())
            }); C(n, "afterDrawCrosshair", function (a) {
                var b, c; if (t(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                    var d = this.chart, e = this.options.crosshair.label, g = this.horiz; b = this.opposite; c = this.left; var l = this.top, m = this.crossLabel, n = e.format, p = "", q = "inside" === this.options.tickPosition, r = !1 !== this.crosshair.snap, u = 0, x = a.e || this.cross && this.cross.e, y = a.point; a = this.lin2log; var B, C; this.isLog ? (B = a(this.min), C = a(this.max)) : (B = this.min, C = this.max); a = g ? "center" :
                        b ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center"; m || (m = this.crossLabel = d.renderer.label(null, null, null, e.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({ align: e.align || a, padding: f(e.padding, 8), r: f(e.borderRadius, 3), zIndex: 2 }).add(this.labelGroup), d.styledMode || m.attr({
                            fill: e.backgroundColor || this.series[0] && this.series[0].color || "#666666", stroke: e.borderColor || "", "stroke-width": e.borderWidth ||
                                0
                        }).css(w({ color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center" }, e.style))); g ? (a = r ? y.plotX + c : x.chartX, l += b ? 0 : this.height) : (a = b ? this.width + c : 0, l = r ? y.plotY + l : x.chartY); n || e.formatter || (this.isDatetimeAxis && (p = "%b %d, %Y"), n = "{value" + (p ? ":" + p : "") + "}"); p = r ? y[this.isXAxis ? "x" : "y"] : this.toValue(g ? x.chartX : x.chartY); m.attr({ text: n ? v(n, { value: p }, d.time) : e.formatter.call(this, p), x: a, y: l, visibility: p < B || p > C ? "hidden" : "visible" }); e = m.getBBox(); if (g) { if (q && !b || !q && b) l = m.y - e.height } else l = m.y -
                            e.height / 2; g ? (b = c - e.x, c = c + this.width - e.x) : (b = "left" === this.labelAlign ? c : 0, c = "right" === this.labelAlign ? c + this.width : d.chartWidth); m.translateX < b && (u = b - m.translateX); m.translateX + e.width >= c && (u = -(m.translateX + e.width - c)); m.attr({ x: a + u, y: l, anchorX: g ? a : this.opposite ? 0 : d.chartWidth, anchorY: g ? this.opposite ? d.chartHeight : 0 : l + e.height / 2 })
                }
            }); u.init = function () { G.apply(this, arguments); this.setCompare(this.options.compare) }; u.setCompare = function (a) {
            this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
                var d =
                    this.compareValue; if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
            } : null; this.userOptions.compare = a; this.chart.hasRendered && (this.isDirty = !0)
            }; u.processData = function () {
                var a, c = -1, d, e, f = !0 === this.options.compareStart ? 0 : 1, g, l; D.apply(this, arguments); if (this.xAxis && this.processedYData) for (d = this.processedXData, e = this.processedYData, g = e.length, this.pointArrayMap && (c = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey ||
                    "y")), a = 0; a < g - f; a++)if (l = e[a] && -1 < c ? e[a][c] : e[a], x(l) && d[a + f] >= this.xAxis.min && 0 !== l) { this.compareValue = l; break }
            }; C(c, "afterGetExtremes", function () { if (this.modifyValue) { var a = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)]; this.dataMin = F(a); this.dataMax = B(a) } }); n.prototype.setCompare = function (a, c) { this.isXAxis || (this.series.forEach(function (b) { b.setCompare(a) }), f(c, !0) && this.chart.redraw()) }; q.prototype.tooltipFormatter = function (b) {
                b = b.replace("{point.change}", (0 < this.change ? "+" : "") +
                    a.numberFormat(this.change, f(this.series.tooltipOptions.changeDecimals, 2))); return y.apply(this, [b])
            }; C(c, "render", function () {
                var a; this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (a = this.yAxis.len - (this.xAxis.axisLine ? Math.floor(this.xAxis.axisLine.strokeWidth() / 2) : 0), !this.clipBox && this.animate ? (this.clipBox = e(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = a) : this.chart[this.sharedClipKey] && (this.chart[this.sharedClipKey].animate({
                    width: this.xAxis.len,
                    height: a
                }), this.chart[this.sharedClipKey + "m"] && this.chart[this.sharedClipKey + "m"].animate({ width: this.xAxis.len })))
            }); C(g, "update", function (a) { a = a.options; "scrollbar" in a && this.navigator && (e(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar) })
    })(H); return H
});
//# sourceMappingURL=highstock.js.map
