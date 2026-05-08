import Yr, { Component as me, PureComponent as de, Children as kr } from "react";
function X(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var xe = { exports: {} }, ve = {};
var Ot;
function Ir() {
  if (Ot) return ve;
  Ot = 1;
  var n = /* @__PURE__ */ Symbol.for("react.transitional.element"), e = /* @__PURE__ */ Symbol.for("react.fragment");
  function t(r, a, o) {
    var i = null;
    if (o !== void 0 && (i = "" + o), a.key !== void 0 && (i = "" + a.key), "key" in a) {
      o = {};
      for (var l in a)
        l !== "key" && (o[l] = a[l]);
    } else o = a;
    return a = o.ref, {
      $$typeof: n,
      type: r,
      key: i,
      ref: a !== void 0 ? a : null,
      props: o
    };
  }
  return ve.Fragment = e, ve.jsx = t, ve.jsxs = t, ve;
}
var ge = {};
var xt;
function Ar() {
  return xt || (xt = 1, process.env.NODE_ENV !== "production" && (function() {
    function n(s) {
      if (s == null) return null;
      if (typeof s == "function")
        return s.$$typeof === V ? null : s.displayName || s.name || null;
      if (typeof s == "string") return s;
      switch (s) {
        case R:
          return "Fragment";
        case L:
          return "Profiler";
        case k:
          return "StrictMode";
        case q:
          return "Suspense";
        case Z:
          return "SuspenseList";
        case oe:
          return "Activity";
      }
      if (typeof s == "object")
        switch (typeof s.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), s.$$typeof) {
          case v:
            return "Portal";
          case F:
            return s.displayName || "Context";
          case P:
            return (s._context.displayName || "Context") + ".Consumer";
          case y:
            var _ = s.render;
            return s = s.displayName, s || (s = _.displayName || _.name || "", s = s !== "" ? "ForwardRef(" + s + ")" : "ForwardRef"), s;
          case te:
            return _ = s.displayName || null, _ !== null ? _ : n(s.type) || "Memo";
          case J:
            _ = s._payload, s = s._init;
            try {
              return n(s(_));
            } catch {
            }
        }
      return null;
    }
    function e(s) {
      return "" + s;
    }
    function t(s) {
      try {
        e(s);
        var _ = !1;
      } catch {
        _ = !0;
      }
      if (_) {
        _ = console;
        var b = _.error, D = typeof Symbol == "function" && Symbol.toStringTag && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return b.call(
          _,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          D
        ), e(s);
      }
    }
    function r(s) {
      if (s === R) return "<>";
      if (typeof s == "object" && s !== null && s.$$typeof === J)
        return "<...>";
      try {
        var _ = n(s);
        return _ ? "<" + _ + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var s = W.A;
      return s === null ? null : s.getOwner();
    }
    function o() {
      return Error("react-stack-top-frame");
    }
    function i(s) {
      if (M.call(s, "key")) {
        var _ = Object.getOwnPropertyDescriptor(s, "key").get;
        if (_ && _.isReactWarning) return !1;
      }
      return s.key !== void 0;
    }
    function l(s, _) {
      function b() {
        E || (E = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          _
        ));
      }
      b.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: b,
        configurable: !0
      });
    }
    function d() {
      var s = n(this.type);
      return N[s] || (N[s] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), s = this.props.ref, s !== void 0 ? s : null;
    }
    function h(s, _, b, D, A, Y) {
      var O = b.ref;
      return s = {
        $$typeof: x,
        type: s,
        key: _,
        props: b,
        _owner: D
      }, (O !== void 0 ? O : null) !== null ? Object.defineProperty(s, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(s, "ref", { enumerable: !1, value: null }), s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(s, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(s, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: A
      }), Object.defineProperty(s, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Y
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    }
    function S(s, _, b, D, A, Y) {
      var O = _.children;
      if (O !== void 0)
        if (D)
          if (T(O)) {
            for (D = 0; D < O.length; D++)
              m(O[D]);
            Object.freeze && Object.freeze(O);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else m(O);
      if (M.call(_, "key")) {
        O = n(s);
        var I = Object.keys(_).filter(function(j) {
          return j !== "key";
        });
        D = 0 < I.length ? "{key: someKey, " + I.join(": ..., ") + ": ...}" : "{key: someKey}", f[O + D] || (I = 0 < I.length ? "{" + I.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          D,
          O,
          I,
          O
        ), f[O + D] = !0);
      }
      if (O = null, b !== void 0 && (t(b), O = "" + b), i(_) && (t(_.key), O = "" + _.key), "key" in _) {
        b = {};
        for (var $ in _)
          $ !== "key" && (b[$] = _[$]);
      } else b = _;
      return O && l(
        b,
        typeof s == "function" ? s.displayName || s.name || "Unknown" : s
      ), h(
        s,
        O,
        b,
        a(),
        A,
        Y
      );
    }
    function m(s) {
      u(s) ? s._store && (s._store.validated = 1) : typeof s == "object" && s !== null && s.$$typeof === J && (s._payload.status === "fulfilled" ? u(s._payload.value) && s._payload.value._store && (s._payload.value._store.validated = 1) : s._store && (s._store.validated = 1));
    }
    function u(s) {
      return typeof s == "object" && s !== null && s.$$typeof === x;
    }
    var p = Yr, x = /* @__PURE__ */ Symbol.for("react.transitional.element"), v = /* @__PURE__ */ Symbol.for("react.portal"), R = /* @__PURE__ */ Symbol.for("react.fragment"), k = /* @__PURE__ */ Symbol.for("react.strict_mode"), L = /* @__PURE__ */ Symbol.for("react.profiler"), P = /* @__PURE__ */ Symbol.for("react.consumer"), F = /* @__PURE__ */ Symbol.for("react.context"), y = /* @__PURE__ */ Symbol.for("react.forward_ref"), q = /* @__PURE__ */ Symbol.for("react.suspense"), Z = /* @__PURE__ */ Symbol.for("react.suspense_list"), te = /* @__PURE__ */ Symbol.for("react.memo"), J = /* @__PURE__ */ Symbol.for("react.lazy"), oe = /* @__PURE__ */ Symbol.for("react.activity"), V = /* @__PURE__ */ Symbol.for("react.client.reference"), W = p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = Object.prototype.hasOwnProperty, T = Array.isArray, C = console.createTask ? console.createTask : function() {
      return null;
    };
    p = {
      react_stack_bottom_frame: function(s) {
        return s();
      }
    };
    var E, N = {}, U = p.react_stack_bottom_frame.bind(
      p,
      o
    )(), re = C(r(o)), f = {};
    ge.Fragment = R, ge.jsx = function(s, _, b) {
      var D = 1e4 > W.recentlyCreatedOwnerStacks++;
      return S(
        s,
        _,
        b,
        !1,
        D ? Error("react-stack-top-frame") : U,
        D ? C(r(s)) : re
      );
    }, ge.jsxs = function(s, _, b) {
      var D = 1e4 > W.recentlyCreatedOwnerStacks++;
      return S(
        s,
        _,
        b,
        !0,
        D ? Error("react-stack-top-frame") : U,
        D ? C(r(s)) : re
      );
    };
  })()), ge;
}
var Et;
function Pr() {
  return Et || (Et = 1, process.env.NODE_ENV === "production" ? xe.exports = Ir() : xe.exports = Ar()), xe.exports;
}
var w = Pr(), Ee = { exports: {} }, Me = { exports: {} }, H = {};
var Mt;
function jr() {
  if (Mt) return H;
  Mt = 1;
  var n = typeof Symbol == "function" && Symbol.for, e = n ? /* @__PURE__ */ Symbol.for("react.element") : 60103, t = n ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = n ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = n ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, o = n ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, i = n ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, l = n ? /* @__PURE__ */ Symbol.for("react.context") : 60110, d = n ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, h = n ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, S = n ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, m = n ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, u = n ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = n ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, x = n ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, v = n ? /* @__PURE__ */ Symbol.for("react.block") : 60121, R = n ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, k = n ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, L = n ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function P(y) {
    if (typeof y == "object" && y !== null) {
      var q = y.$$typeof;
      switch (q) {
        case e:
          switch (y = y.type, y) {
            case d:
            case h:
            case r:
            case o:
            case a:
            case m:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case S:
                case x:
                case p:
                case i:
                  return y;
                default:
                  return q;
              }
          }
        case t:
          return q;
      }
    }
  }
  function F(y) {
    return P(y) === h;
  }
  return H.AsyncMode = d, H.ConcurrentMode = h, H.ContextConsumer = l, H.ContextProvider = i, H.Element = e, H.ForwardRef = S, H.Fragment = r, H.Lazy = x, H.Memo = p, H.Portal = t, H.Profiler = o, H.StrictMode = a, H.Suspense = m, H.isAsyncMode = function(y) {
    return F(y) || P(y) === d;
  }, H.isConcurrentMode = F, H.isContextConsumer = function(y) {
    return P(y) === l;
  }, H.isContextProvider = function(y) {
    return P(y) === i;
  }, H.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === e;
  }, H.isForwardRef = function(y) {
    return P(y) === S;
  }, H.isFragment = function(y) {
    return P(y) === r;
  }, H.isLazy = function(y) {
    return P(y) === x;
  }, H.isMemo = function(y) {
    return P(y) === p;
  }, H.isPortal = function(y) {
    return P(y) === t;
  }, H.isProfiler = function(y) {
    return P(y) === o;
  }, H.isStrictMode = function(y) {
    return P(y) === a;
  }, H.isSuspense = function(y) {
    return P(y) === m;
  }, H.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === r || y === h || y === o || y === a || y === m || y === u || typeof y == "object" && y !== null && (y.$$typeof === x || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === S || y.$$typeof === R || y.$$typeof === k || y.$$typeof === L || y.$$typeof === v);
  }, H.typeOf = P, H;
}
var z = {};
var Rt;
function Fr() {
  return Rt || (Rt = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = typeof Symbol == "function" && Symbol.for, e = n ? /* @__PURE__ */ Symbol.for("react.element") : 60103, t = n ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = n ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, a = n ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, o = n ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, i = n ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, l = n ? /* @__PURE__ */ Symbol.for("react.context") : 60110, d = n ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, h = n ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, S = n ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, m = n ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, u = n ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, p = n ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, x = n ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, v = n ? /* @__PURE__ */ Symbol.for("react.block") : 60121, R = n ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, k = n ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, L = n ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function P(g) {
      return typeof g == "string" || typeof g == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      g === r || g === h || g === o || g === a || g === m || g === u || typeof g == "object" && g !== null && (g.$$typeof === x || g.$$typeof === p || g.$$typeof === i || g.$$typeof === l || g.$$typeof === S || g.$$typeof === R || g.$$typeof === k || g.$$typeof === L || g.$$typeof === v);
    }
    function F(g) {
      if (typeof g == "object" && g !== null) {
        var se = g.$$typeof;
        switch (se) {
          case e:
            var Oe = g.type;
            switch (Oe) {
              case d:
              case h:
              case r:
              case o:
              case a:
              case m:
                return Oe;
              default:
                var Ct = Oe && Oe.$$typeof;
                switch (Ct) {
                  case l:
                  case S:
                  case x:
                  case p:
                  case i:
                    return Ct;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var y = d, q = h, Z = l, te = i, J = e, oe = S, V = r, W = x, M = p, T = t, C = o, E = a, N = m, U = !1;
    function re(g) {
      return U || (U = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), f(g) || F(g) === d;
    }
    function f(g) {
      return F(g) === h;
    }
    function s(g) {
      return F(g) === l;
    }
    function _(g) {
      return F(g) === i;
    }
    function b(g) {
      return typeof g == "object" && g !== null && g.$$typeof === e;
    }
    function D(g) {
      return F(g) === S;
    }
    function A(g) {
      return F(g) === r;
    }
    function Y(g) {
      return F(g) === x;
    }
    function O(g) {
      return F(g) === p;
    }
    function I(g) {
      return F(g) === t;
    }
    function $(g) {
      return F(g) === o;
    }
    function j(g) {
      return F(g) === a;
    }
    function ee(g) {
      return F(g) === m;
    }
    z.AsyncMode = y, z.ConcurrentMode = q, z.ContextConsumer = Z, z.ContextProvider = te, z.Element = J, z.ForwardRef = oe, z.Fragment = V, z.Lazy = W, z.Memo = M, z.Portal = T, z.Profiler = C, z.StrictMode = E, z.Suspense = N, z.isAsyncMode = re, z.isConcurrentMode = f, z.isContextConsumer = s, z.isContextProvider = _, z.isElement = b, z.isForwardRef = D, z.isFragment = A, z.isLazy = Y, z.isMemo = O, z.isPortal = I, z.isProfiler = $, z.isStrictMode = j, z.isSuspense = ee, z.isValidElementType = P, z.typeOf = F;
  })()), z;
}
var Yt;
function Sr() {
  return Yt || (Yt = 1, process.env.NODE_ENV === "production" ? Me.exports = jr() : Me.exports = Fr()), Me.exports;
}
var Pe, kt;
function Nr() {
  if (kt) return Pe;
  kt = 1;
  var n = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function a() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var d = Object.getOwnPropertyNames(i).map(function(S) {
        return i[S];
      });
      if (d.join("") !== "0123456789")
        return !1;
      var h = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(S) {
        h[S] = S;
      }), Object.keys(Object.assign({}, h)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Pe = a() ? Object.assign : function(o, i) {
    for (var l, d = r(o), h, S = 1; S < arguments.length; S++) {
      l = Object(arguments[S]);
      for (var m in l)
        e.call(l, m) && (d[m] = l[m]);
      if (n) {
        h = n(l);
        for (var u = 0; u < h.length; u++)
          t.call(l, h[u]) && (d[h[u]] = l[h[u]]);
      }
    }
    return d;
  }, Pe;
}
var je, It;
function gt() {
  if (It) return je;
  It = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return je = n, je;
}
var Fe, At;
function br() {
  return At || (At = 1, Fe = Function.call.bind(Object.prototype.hasOwnProperty)), Fe;
}
var Ne, Pt;
function $r() {
  if (Pt) return Ne;
  Pt = 1;
  var n = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ gt(), t = {}, r = /* @__PURE__ */ br();
    n = function(o) {
      var i = "Warning: " + o;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function a(o, i, l, d, h) {
    if (process.env.NODE_ENV !== "production") {
      for (var S in o)
        if (r(o, S)) {
          var m;
          try {
            if (typeof o[S] != "function") {
              var u = Error(
                (d || "React class") + ": " + l + " type `" + S + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[S] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw u.name = "Invariant Violation", u;
            }
            m = o[S](i, S, d, l, null, e);
          } catch (x) {
            m = x;
          }
          if (m && !(m instanceof Error) && n(
            (d || "React class") + ": type specification of " + l + " `" + S + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in t)) {
            t[m.message] = !0;
            var p = h ? h() : "";
            n(
              "Failed " + l + " type: " + m.message + (p ?? "")
            );
          }
        }
    }
  }
  return a.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, Ne = a, Ne;
}
var $e, jt;
function Hr() {
  if (jt) return $e;
  jt = 1;
  var n = Sr(), e = Nr(), t = /* @__PURE__ */ gt(), r = /* @__PURE__ */ br(), a = /* @__PURE__ */ $r(), o = function() {
  };
  process.env.NODE_ENV !== "production" && (o = function(l) {
    var d = "Warning: " + l;
    typeof console < "u" && console.error(d);
    try {
      throw new Error(d);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return $e = function(l, d) {
    var h = typeof Symbol == "function" && Symbol.iterator, S = "@@iterator";
    function m(f) {
      var s = f && (h && f[h] || f[S]);
      if (typeof s == "function")
        return s;
    }
    var u = "<<anonymous>>", p = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: L(),
      arrayOf: P,
      element: F(),
      elementType: y(),
      instanceOf: q,
      node: oe(),
      objectOf: te,
      oneOf: Z,
      oneOfType: J,
      shape: W,
      exact: M
    };
    function x(f, s) {
      return f === s ? f !== 0 || 1 / f === 1 / s : f !== f && s !== s;
    }
    function v(f, s) {
      this.message = f, this.data = s && typeof s == "object" ? s : {}, this.stack = "";
    }
    v.prototype = Error.prototype;
    function R(f) {
      if (process.env.NODE_ENV !== "production")
        var s = {}, _ = 0;
      function b(A, Y, O, I, $, j, ee) {
        if (I = I || u, j = j || O, ee !== t) {
          if (d) {
            var g = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw g.name = "Invariant Violation", g;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var se = I + ":" + O;
            !s[se] && // Avoid spamming the console because they are often not actionable except for lib authors
            _ < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + j + "` prop on `" + I + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), s[se] = !0, _++);
          }
        }
        return Y[O] == null ? A ? Y[O] === null ? new v("The " + $ + " `" + j + "` is marked as required " + ("in `" + I + "`, but its value is `null`.")) : new v("The " + $ + " `" + j + "` is marked as required in " + ("`" + I + "`, but its value is `undefined`.")) : null : f(Y, O, I, $, j);
      }
      var D = b.bind(null, !1);
      return D.isRequired = b.bind(null, !0), D;
    }
    function k(f) {
      function s(_, b, D, A, Y, O) {
        var I = _[b], $ = E(I);
        if ($ !== f) {
          var j = N(I);
          return new v(
            "Invalid " + A + " `" + Y + "` of type " + ("`" + j + "` supplied to `" + D + "`, expected ") + ("`" + f + "`."),
            { expectedType: f }
          );
        }
        return null;
      }
      return R(s);
    }
    function L() {
      return R(i);
    }
    function P(f) {
      function s(_, b, D, A, Y) {
        if (typeof f != "function")
          return new v("Property `" + Y + "` of component `" + D + "` has invalid PropType notation inside arrayOf.");
        var O = _[b];
        if (!Array.isArray(O)) {
          var I = E(O);
          return new v("Invalid " + A + " `" + Y + "` of type " + ("`" + I + "` supplied to `" + D + "`, expected an array."));
        }
        for (var $ = 0; $ < O.length; $++) {
          var j = f(O, $, D, A, Y + "[" + $ + "]", t);
          if (j instanceof Error)
            return j;
        }
        return null;
      }
      return R(s);
    }
    function F() {
      function f(s, _, b, D, A) {
        var Y = s[_];
        if (!l(Y)) {
          var O = E(Y);
          return new v("Invalid " + D + " `" + A + "` of type " + ("`" + O + "` supplied to `" + b + "`, expected a single ReactElement."));
        }
        return null;
      }
      return R(f);
    }
    function y() {
      function f(s, _, b, D, A) {
        var Y = s[_];
        if (!n.isValidElementType(Y)) {
          var O = E(Y);
          return new v("Invalid " + D + " `" + A + "` of type " + ("`" + O + "` supplied to `" + b + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return R(f);
    }
    function q(f) {
      function s(_, b, D, A, Y) {
        if (!(_[b] instanceof f)) {
          var O = f.name || u, I = re(_[b]);
          return new v("Invalid " + A + " `" + Y + "` of type " + ("`" + I + "` supplied to `" + D + "`, expected ") + ("instance of `" + O + "`."));
        }
        return null;
      }
      return R(s);
    }
    function Z(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), i;
      function s(_, b, D, A, Y) {
        for (var O = _[b], I = 0; I < f.length; I++)
          if (x(O, f[I]))
            return null;
        var $ = JSON.stringify(f, function(ee, g) {
          var se = N(g);
          return se === "symbol" ? String(g) : g;
        });
        return new v("Invalid " + A + " `" + Y + "` of value `" + String(O) + "` " + ("supplied to `" + D + "`, expected one of " + $ + "."));
      }
      return R(s);
    }
    function te(f) {
      function s(_, b, D, A, Y) {
        if (typeof f != "function")
          return new v("Property `" + Y + "` of component `" + D + "` has invalid PropType notation inside objectOf.");
        var O = _[b], I = E(O);
        if (I !== "object")
          return new v("Invalid " + A + " `" + Y + "` of type " + ("`" + I + "` supplied to `" + D + "`, expected an object."));
        for (var $ in O)
          if (r(O, $)) {
            var j = f(O, $, D, A, Y + "." + $, t);
            if (j instanceof Error)
              return j;
          }
        return null;
      }
      return R(s);
    }
    function J(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var s = 0; s < f.length; s++) {
        var _ = f[s];
        if (typeof _ != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + U(_) + " at index " + s + "."
          ), i;
      }
      function b(D, A, Y, O, I) {
        for (var $ = [], j = 0; j < f.length; j++) {
          var ee = f[j], g = ee(D, A, Y, O, I, t);
          if (g == null)
            return null;
          g.data && r(g.data, "expectedType") && $.push(g.data.expectedType);
        }
        var se = $.length > 0 ? ", expected one of type [" + $.join(", ") + "]" : "";
        return new v("Invalid " + O + " `" + I + "` supplied to " + ("`" + Y + "`" + se + "."));
      }
      return R(b);
    }
    function oe() {
      function f(s, _, b, D, A) {
        return T(s[_]) ? null : new v("Invalid " + D + " `" + A + "` supplied to " + ("`" + b + "`, expected a ReactNode."));
      }
      return R(f);
    }
    function V(f, s, _, b, D) {
      return new v(
        (f || "React class") + ": " + s + " type `" + _ + "." + b + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + D + "`."
      );
    }
    function W(f) {
      function s(_, b, D, A, Y) {
        var O = _[b], I = E(O);
        if (I !== "object")
          return new v("Invalid " + A + " `" + Y + "` of type `" + I + "` " + ("supplied to `" + D + "`, expected `object`."));
        for (var $ in f) {
          var j = f[$];
          if (typeof j != "function")
            return V(D, A, Y, $, N(j));
          var ee = j(O, $, D, A, Y + "." + $, t);
          if (ee)
            return ee;
        }
        return null;
      }
      return R(s);
    }
    function M(f) {
      function s(_, b, D, A, Y) {
        var O = _[b], I = E(O);
        if (I !== "object")
          return new v("Invalid " + A + " `" + Y + "` of type `" + I + "` " + ("supplied to `" + D + "`, expected `object`."));
        var $ = e({}, _[b], f);
        for (var j in $) {
          var ee = f[j];
          if (r(f, j) && typeof ee != "function")
            return V(D, A, Y, j, N(ee));
          if (!ee)
            return new v(
              "Invalid " + A + " `" + Y + "` key `" + j + "` supplied to `" + D + "`.\nBad object: " + JSON.stringify(_[b], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(f), null, "  ")
            );
          var g = ee(O, j, D, A, Y + "." + j, t);
          if (g)
            return g;
        }
        return null;
      }
      return R(s);
    }
    function T(f) {
      switch (typeof f) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !f;
        case "object":
          if (Array.isArray(f))
            return f.every(T);
          if (f === null || l(f))
            return !0;
          var s = m(f);
          if (s) {
            var _ = s.call(f), b;
            if (s !== f.entries) {
              for (; !(b = _.next()).done; )
                if (!T(b.value))
                  return !1;
            } else
              for (; !(b = _.next()).done; ) {
                var D = b.value;
                if (D && !T(D[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function C(f, s) {
      return f === "symbol" ? !0 : s ? s["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && s instanceof Symbol : !1;
    }
    function E(f) {
      var s = typeof f;
      return Array.isArray(f) ? "array" : f instanceof RegExp ? "object" : C(s, f) ? "symbol" : s;
    }
    function N(f) {
      if (typeof f > "u" || f === null)
        return "" + f;
      var s = E(f);
      if (s === "object") {
        if (f instanceof Date)
          return "date";
        if (f instanceof RegExp)
          return "regexp";
      }
      return s;
    }
    function U(f) {
      var s = N(f);
      switch (s) {
        case "array":
        case "object":
          return "an " + s;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + s;
        default:
          return s;
      }
    }
    function re(f) {
      return !f.constructor || !f.constructor.name ? u : f.constructor.name;
    }
    return p.checkPropTypes = a, p.resetWarningCache = a.resetWarningCache, p.PropTypes = p, p;
  }, $e;
}
var He, Ft;
function zr() {
  if (Ft) return He;
  Ft = 1;
  var n = /* @__PURE__ */ gt();
  function e() {
  }
  function t() {
  }
  return t.resetWarningCache = e, He = function() {
    function r(i, l, d, h, S, m) {
      if (m !== n) {
        var u = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw u.name = "Invariant Violation", u;
      }
    }
    r.isRequired = r;
    function a() {
      return r;
    }
    var o = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: a,
      element: r,
      elementType: r,
      instanceOf: a,
      node: r,
      objectOf: a,
      oneOf: a,
      oneOfType: a,
      shape: a,
      exact: a,
      checkPropTypes: t,
      resetWarningCache: e
    };
    return o.PropTypes = o, o;
  }, He;
}
var Nt;
function Lr() {
  if (Nt) return Ee.exports;
  if (Nt = 1, process.env.NODE_ENV !== "production") {
    var n = Sr(), e = !0;
    Ee.exports = /* @__PURE__ */ Hr()(n.isElement, e);
  } else
    Ee.exports = /* @__PURE__ */ zr()();
  return Ee.exports;
}
var qr = /* @__PURE__ */ Lr();
const c = /* @__PURE__ */ X(qr);
var ze = { exports: {} };
var $t;
function Wr() {
  return $t || ($t = 1, (function(n) {
    (function() {
      var e = {}.hasOwnProperty;
      function t() {
        for (var r = [], a = 0; a < arguments.length; a++) {
          var o = arguments[a];
          if (o) {
            var i = typeof o;
            if (i === "string" || i === "number")
              r.push(o);
            else if (Array.isArray(o))
              r.push(t.apply(null, o));
            else if (i === "object")
              for (var l in o)
                e.call(o, l) && o[l] && r.push(l);
          }
        }
        return r.join(" ");
      }
      n.exports ? n.exports = t : window.classNames = t;
    })();
  })(ze)), ze.exports;
}
var Ur = Wr();
const ne = /* @__PURE__ */ X(Ur);
var Re = { exports: {} }, Ye = { exports: {} }, Ht;
function Gr() {
  return Ht || (Ht = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = !!(typeof window < "u" && window.document && window.document.createElement), n.exports = e.default;
  })(Ye, Ye.exports)), Ye.exports;
}
var zt;
function Vr() {
  return zt || (zt = 1, (function(n, e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = function(i) {
      if ((!o || i) && r.default) {
        var l = document.createElement("div");
        l.style.position = "absolute", l.style.top = "-9999px", l.style.width = "50px", l.style.height = "50px", l.style.overflow = "scroll", document.body.appendChild(l), o = l.offsetWidth - l.clientWidth, document.body.removeChild(l);
      }
      return o;
    };
    var t = Gr(), r = a(t);
    function a(i) {
      return i && i.__esModule ? i : { default: i };
    }
    var o = void 0;
    n.exports = e.default;
  })(Re, Re.exports)), Re.exports;
}
var Jr = Vr();
const Br = /* @__PURE__ */ X(Jr);
var Le, Lt;
function Dr() {
  if (Lt) return Le;
  Lt = 1;
  function n(e) {
    return e instanceof Date;
  }
  return Le = n, Le;
}
var qe, qt;
function B() {
  if (qt) return qe;
  qt = 1;
  var n = Dr(), e = 36e5, t = 6e4, r = 2, a = /[T ]/, o = /:/, i = /^(\d{2})$/, l = [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ], d = /^(\d{4})/, h = [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ], S = /^-(\d{2})$/, m = /^-?(\d{3})$/, u = /^-?(\d{2})-?(\d{2})$/, p = /^-?W(\d{2})$/, x = /^-?W(\d{2})-?(\d{1})$/, v = /^(\d{2}([.,]\d*)?)$/, R = /^(\d{2}):?(\d{2}([.,]\d*)?)$/, k = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/, L = /([Z+-].*)$/, P = /^(Z)$/, F = /^([+-])(\d{2})$/, y = /^([+-])(\d{2}):?(\d{2})$/;
  function q(M, T) {
    if (n(M))
      return new Date(M.getTime());
    if (typeof M != "string")
      return new Date(M);
    T = T || {};
    var C = T.additionalDigits;
    C == null && (C = r);
    var E = Z(M), N = te(E.date, C), U = N.year, re = N.restDateString, f = J(re, U);
    if (f) {
      var s = f.getTime(), _ = 0, b;
      return E.time && (_ = oe(E.time)), E.timezone ? b = V(E.timezone) : (b = new Date(s + _).getTimezoneOffset(), b = new Date(s + _ + b * t).getTimezoneOffset()), new Date(s + _ + b * t);
    } else
      return new Date(M);
  }
  function Z(M) {
    var T = {}, C = M.split(a), E;
    if (o.test(C[0]) ? (T.date = null, E = C[0]) : (T.date = C[0], E = C[1]), E) {
      var N = L.exec(E);
      N ? (T.time = E.replace(N[1], ""), T.timezone = N[1]) : T.time = E;
    }
    return T;
  }
  function te(M, T) {
    var C = l[T], E = h[T], N;
    if (N = d.exec(M) || E.exec(M), N) {
      var U = N[1];
      return {
        year: parseInt(U, 10),
        restDateString: M.slice(U.length)
      };
    }
    if (N = i.exec(M) || C.exec(M), N) {
      var re = N[1];
      return {
        year: parseInt(re, 10) * 100,
        restDateString: M.slice(re.length)
      };
    }
    return {
      year: null
    };
  }
  function J(M, T) {
    if (T === null)
      return null;
    var C, E, N, U;
    if (M.length === 0)
      return E = /* @__PURE__ */ new Date(0), E.setUTCFullYear(T), E;
    if (C = S.exec(M), C)
      return E = /* @__PURE__ */ new Date(0), N = parseInt(C[1], 10) - 1, E.setUTCFullYear(T, N), E;
    if (C = m.exec(M), C) {
      E = /* @__PURE__ */ new Date(0);
      var re = parseInt(C[1], 10);
      return E.setUTCFullYear(T, 0, re), E;
    }
    if (C = u.exec(M), C) {
      E = /* @__PURE__ */ new Date(0), N = parseInt(C[1], 10) - 1;
      var f = parseInt(C[2], 10);
      return E.setUTCFullYear(T, N, f), E;
    }
    if (C = p.exec(M), C)
      return U = parseInt(C[1], 10) - 1, W(T, U);
    if (C = x.exec(M), C) {
      U = parseInt(C[1], 10) - 1;
      var s = parseInt(C[2], 10) - 1;
      return W(T, U, s);
    }
    return null;
  }
  function oe(M) {
    var T, C, E;
    if (T = v.exec(M), T)
      return C = parseFloat(T[1].replace(",", ".")), C % 24 * e;
    if (T = R.exec(M), T)
      return C = parseInt(T[1], 10), E = parseFloat(T[2].replace(",", ".")), C % 24 * e + E * t;
    if (T = k.exec(M), T) {
      C = parseInt(T[1], 10), E = parseInt(T[2], 10);
      var N = parseFloat(T[3].replace(",", "."));
      return C % 24 * e + E * t + N * 1e3;
    }
    return null;
  }
  function V(M) {
    var T, C;
    return T = P.exec(M), T ? 0 : (T = F.exec(M), T ? (C = parseInt(T[2], 10) * 60, T[1] === "+" ? -C : C) : (T = y.exec(M), T ? (C = parseInt(T[2], 10) * 60 + parseInt(T[3], 10), T[1] === "+" ? -C : C) : 0));
  }
  function W(M, T, C) {
    T = T || 0, C = C || 0;
    var E = /* @__PURE__ */ new Date(0);
    E.setUTCFullYear(M, 0, 4);
    var N = E.getUTCDay() || 7, U = T * 7 + C + 1 - N;
    return E.setUTCDate(E.getUTCDate() + U), E;
  }
  return qe = q, qe;
}
var We, Wt;
function Xr() {
  if (Wt) return We;
  Wt = 1;
  var n = B();
  function e(t) {
    var r = n(t), a = r.getFullYear(), o = r.getMonth(), i = /* @__PURE__ */ new Date(0);
    return i.setFullYear(a, o + 1, 0), i.setHours(0, 0, 0, 0), i.getDate();
  }
  return We = e, We;
}
var Zr = Xr();
const Kr = /* @__PURE__ */ X(Zr);
var Ue, Ut;
function Qr() {
  if (Ut) return Ue;
  Ut = 1;
  var n = B();
  function e(t) {
    var r = n(t), a = r.getDay();
    return a;
  }
  return Ue = e, Ue;
}
var en = Qr();
const Tt = /* @__PURE__ */ X(en);
var Ge, Gt;
function tn() {
  if (Gt) return Ge;
  Gt = 1;
  var n = B();
  function e(t, r) {
    var a = n(t), o = n(r);
    return a.getTime() > o.getTime();
  }
  return Ge = e, Ge;
}
var rn = tn();
const Ie = /* @__PURE__ */ X(rn);
var Ve, Vt;
function nn() {
  if (Vt) return Ve;
  Vt = 1;
  var n = B();
  function e(t, r) {
    var a = n(t), o = n(r);
    return a.getTime() < o.getTime();
  }
  return Ve = e, Ve;
}
var an = nn();
const De = /* @__PURE__ */ X(an);
var Je, Jt;
function St() {
  if (Jt) return Je;
  Jt = 1;
  var n = B();
  function e(t) {
    var r = n(t);
    return r.setHours(0, 0, 0, 0), r;
  }
  return Je = e, Je;
}
var Be, Bt;
function on() {
  if (Bt) return Be;
  Bt = 1;
  var n = St();
  function e(t, r) {
    var a = n(t), o = n(r);
    return a.getTime() === o.getTime();
  }
  return Be = e, Be;
}
var sn = on();
const ln = /* @__PURE__ */ X(sn);
var Xe, Xt;
function cn() {
  if (Xt) return Xe;
  Xt = 1;
  var n = B();
  function e(t) {
    var r = n(t);
    return r.setHours(23, 59, 59, 999), r;
  }
  return Xe = e, Xe;
}
var un = cn();
const dn = /* @__PURE__ */ X(un);
var fn = St();
const wr = /* @__PURE__ */ X(fn), we = (n) => n.displayName || n.name || "Component", Ae = (...n) => (e) => n.reduceRight((t, r) => r(t), e), hn = (n) => (e) => {
  const t = (r) => /* @__PURE__ */ w.jsx(e, { ...n, ...r });
  return t.displayName = `defaultProps(${we(e)})`, t;
}, ye = (n) => (e) => {
  const t = (r) => /* @__PURE__ */ w.jsx(
    e,
    {
      ...r,
      ...typeof n == "function" ? n(r) : n
    }
  );
  return t.displayName = `withProps(${we(e)})`, t;
}, pn = (n) => (e) => {
  const t = (r) => {
    const a = Object.keys(n).reduce((o, i) => (o[i] = (...l) => n[i](r)(...l), o), {});
    return /* @__PURE__ */ w.jsx(e, { ...r, ...a });
  };
  return t.displayName = `withHandlers(${we(e)})`, t;
}, ue = (n, e, t) => (r) => {
  class a extends me {
    static displayName = `withState(${we(r)})`;
    state = {
      value: typeof t == "function" ? t(this.props) : t
    };
    updateValue = (i, l) => {
      this.setState(
        ({ value: d }) => ({
          value: typeof i == "function" ? i(d) : i
        }),
        l
      );
    };
    render() {
      return /* @__PURE__ */ w.jsx(
        r,
        {
          ...this.props,
          [n]: this.state.value,
          [e]: this.updateValue
        }
      );
    }
  }
  return a;
}, Ce = (n, e) => (t) => {
  class r extends me {
    static displayName = `withPropsOnChange(${we(t)})`;
    computedProps = e(this.props);
    shouldRecompute(o) {
      return typeof n == "function" ? n(this.props, o) : n.some((i) => this.props[i] !== o[i]);
    }
    UNSAFE_componentWillReceiveProps(o) {
      this.shouldRecompute(o) && (this.computedProps = e(o));
    }
    render() {
      return /* @__PURE__ */ w.jsx(t, { ...this.props, ...this.computedProps });
    }
  }
  return r;
};
function mn(n) {
  return 1 - --n * n * n * n;
}
function yn(n, e, t, r) {
  return t > r ? e : n + (e - n) * mn(t / r);
}
function _n({
  fromValue: n,
  toValue: e,
  onUpdate: t,
  onComplete: r,
  duration: a = 600
}) {
  const o = performance.now(), i = () => {
    const l = performance.now() - o;
    window.requestAnimationFrame(() => t(
      yn(n, e, l, a),
      // Callback
      l <= a ? i : r
    ));
  };
  i();
}
const le = {
  down: 40,
  enter: 13,
  left: 37,
  right: 39,
  up: 38
};
function vn(n, e, t) {
  const r = [], a = new Date(n, e, 1), o = Kr(a), i = Cr(t);
  let l = Tt(new Date(n, e, 1)), d = 0;
  for (let h = 1; h <= o; h++)
    r[d] || (r[d] = []), r[d].push(h), l === i && d++, l = l < 6 ? l + 1 : 0;
  return {
    date: a,
    rows: r
  };
}
function mt(n, e, t) {
  const r = typeof n == "number" ? new Date(n, 0, 1) : n;
  return Math.ceil(
    (Math.round((e - r) / (3600 * 24 * 1e3)) + r.getDay() + 1 - t) / 7
  );
}
function gn(n, e = (/* @__PURE__ */ new Date()).getFullYear(), t, r) {
  const a = Cr(t), o = new Date(e, n, 1), i = mt(e, o, t), l = new Date(e, n + 1, 0);
  let h = mt(e, l, t) - i;
  return (l.getDay() === a || r) && h++, h;
}
function Cr(n) {
  return n === 0 ? 6 : n - 1;
}
class Tn {
  clear = () => {
    this.lastPosition = null, this.delta = 0;
  };
  getScrollSpeed(e) {
    return this.lastPosition != null && (this.delta = e - this.lastPosition), this.lastPosition = e, clearTimeout(this._timeout), this._timeout = setTimeout(this.clear, 50), this.delta;
  }
}
const Sn = Br();
function ce() {
}
function Or(n, {
  disabledDates: e = [],
  disabledDays: t = [],
  minDate: r,
  maxDate: a
}) {
  return !n || e.some((o) => ln(o, n)) || t && t.indexOf(Tt(n)) !== -1 || r && De(n, wr(r)) || a && Ie(n, dn(a)) ? null : n;
}
function bn(n, e, t) {
  return `${n}-${("0" + (e + 1)).slice(-2)}-${("0" + t).slice(-2)}`;
}
function Dn(n, e = 1) {
  return Array.apply(null, Array(12)).map((t, r) => new Date(n, r, e));
}
const _e = (n) => Ce(() => !1, n);
function wn(n, e) {
  let t = null, r = null;
  const a = () => n.apply(this, r);
  return function() {
    r = arguments, clearTimeout(t), t = setTimeout(a, e);
  };
}
function Cn(n, e, t = 1) {
  const r = Math.max(Math.ceil((e - n) / t), 0), a = Array(r);
  for (let o = 0; o < r; o++, n += t)
    a[o] = n;
  return a;
}
const On = {
  hideYearsOnSelect: !0,
  layout: "portrait",
  overscanMonthCount: 2,
  shouldHeaderAnimate: !0,
  showHeader: !0,
  showMonthsForYears: !0,
  showOverlay: !0,
  showTodayHelper: !0,
  showWeekdays: !0,
  todayHelperRowOffset: 4
}, xn = {
  blank: "Select a date...",
  headerFormat: "ddd, MMM Do",
  todayLabel: {
    long: "Today"
  },
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekStartsOn: 0
}, En = {
  accentColor: "#448AFF",
  floatingNav: {
    background: "rgba(56, 87, 138, 0.94)",
    chevron: "#FFA726",
    color: "#FFF"
  },
  headerColor: "#448AFF",
  selectionColor: "#559FFF",
  textColor: {
    active: "#FFF",
    default: "#333"
  },
  todayColor: "#FFA726",
  weekdayColor: "#559FFF"
}, Mn = "Cal__Today-module__root", Rn = "Cal__Today-module__show", Yn = "Cal__Today-module__chevron", kn = "Cal__Today-module__chevronUp", In = "Cal__Today-module__chevronDown", Te = {
  root: Mn,
  show: Rn,
  chevron: Yn,
  chevronUp: kn,
  chevronDown: In
}, yt = 1, _t = -1, An = "M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9 c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3 z";
class Pn extends de {
  static propTypes = {
    scrollToDate: c.func,
    show: c.oneOfType([c.number, c.bool]),
    theme: c.object,
    todayLabel: c.string
  };
  scrollToToday = () => {
    let { scrollToDate: e } = this.props;
    e(/* @__PURE__ */ new Date(), -40, !0);
  };
  render() {
    let { todayLabel: e, show: t, theme: r } = this.props;
    return /* @__PURE__ */ w.jsxs(
      "div",
      {
        className: ne(Te.root, {
          [Te.show]: t,
          [Te.chevronUp]: t === yt,
          [Te.chevronDown]: t === _t
        }),
        style: {
          backgroundColor: r.floatingNav.background,
          color: r.floatingNav.color
        },
        onClick: this.scrollToToday,
        ref: "node",
        children: [
          e,
          /* @__PURE__ */ w.jsx(
            "svg",
            {
              className: Te.chevron,
              x: "0px",
              y: "0px",
              width: "14px",
              height: "14px",
              viewBox: "0 0 512 512",
              children: /* @__PURE__ */ w.jsx(
                "path",
                {
                  fill: r.floatingNav.chevron || r.floatingNav.color,
                  d: An
                }
              )
            }
          )
        ]
      }
    );
  }
}
function xr({ children: n, component: e = "span", ...t }) {
  return /* @__PURE__ */ w.jsx(e, { ...t, children: n });
}
var jn = B();
const Q = /* @__PURE__ */ X(jn);
var Ze, Zt;
function Fn() {
  if (Zt) return Ze;
  Zt = 1;
  var n = B();
  function e(t) {
    var r = n(t), a = /* @__PURE__ */ new Date(0);
    return a.setFullYear(r.getFullYear(), 0, 1), a.setHours(0, 0, 0, 0), a;
  }
  return Ze = e, Ze;
}
var Ke, Kt;
function Nn() {
  if (Kt) return Ke;
  Kt = 1;
  var n = St(), e = 6e4, t = 864e5;
  function r(a, o) {
    var i = n(a), l = n(o), d = i.getTime() - i.getTimezoneOffset() * e, h = l.getTime() - l.getTimezoneOffset() * e;
    return Math.round((d - h) / t);
  }
  return Ke = r, Ke;
}
var Qe, Qt;
function $n() {
  if (Qt) return Qe;
  Qt = 1;
  var n = B(), e = Fn(), t = Nn();
  function r(a) {
    var o = n(a), i = t(o, e(o)), l = i + 1;
    return l;
  }
  return Qe = r, Qe;
}
var et, er;
function Hn() {
  if (er) return et;
  er = 1;
  var n = B();
  function e(t, r) {
    var a = r && r.weekStartsOn || 0, o = n(t), i = o.getDay(), l = (i < a ? 7 : 0) + i - a;
    return o.setDate(o.getDate() - l), o.setHours(0, 0, 0, 0), o;
  }
  return et = e, et;
}
var tt, tr;
function bt() {
  if (tr) return tt;
  tr = 1;
  var n = Hn();
  function e(t) {
    return n(t, { weekStartsOn: 1 });
  }
  return tt = e, tt;
}
var rt, rr;
function Er() {
  if (rr) return rt;
  rr = 1;
  var n = B(), e = bt();
  function t(r) {
    var a = n(r), o = a.getFullYear(), i = /* @__PURE__ */ new Date(0);
    i.setFullYear(o + 1, 0, 4), i.setHours(0, 0, 0, 0);
    var l = e(i), d = /* @__PURE__ */ new Date(0);
    d.setFullYear(o, 0, 4), d.setHours(0, 0, 0, 0);
    var h = e(d);
    return a.getTime() >= l.getTime() ? o + 1 : a.getTime() >= h.getTime() ? o : o - 1;
  }
  return rt = t, rt;
}
var nt, nr;
function zn() {
  if (nr) return nt;
  nr = 1;
  var n = Er(), e = bt();
  function t(r) {
    var a = n(r), o = /* @__PURE__ */ new Date(0);
    o.setFullYear(a, 0, 4), o.setHours(0, 0, 0, 0);
    var i = e(o);
    return i;
  }
  return nt = t, nt;
}
var at, ar;
function Ln() {
  if (ar) return at;
  ar = 1;
  var n = B(), e = bt(), t = zn(), r = 6048e5;
  function a(o) {
    var i = n(o), l = e(i).getTime() - t(i).getTime();
    return Math.round(l / r) + 1;
  }
  return at = a, at;
}
var ot, or;
function qn() {
  if (or) return ot;
  or = 1;
  var n = Dr();
  function e(t) {
    if (n(t))
      return !isNaN(t);
    throw new TypeError(toString.call(t) + " is not an instance of Date");
  }
  return ot = e, ot;
}
var st, sr;
function Wn() {
  if (sr) return st;
  sr = 1;
  function n() {
    var e = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
      },
      xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
      },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
      },
      xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
      },
      aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
      },
      xHours: {
        one: "1 hour",
        other: "{{count}} hours"
      },
      xDays: {
        one: "1 day",
        other: "{{count}} days"
      },
      aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
      },
      xMonths: {
        one: "1 month",
        other: "{{count}} months"
      },
      aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
      },
      xYears: {
        one: "1 year",
        other: "{{count}} years"
      },
      overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
      },
      almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
      }
    };
    function t(r, a, o) {
      o = o || {};
      var i;
      return typeof e[r] == "string" ? i = e[r] : a === 1 ? i = e[r].one : i = e[r].other.replace("{{count}}", a), o.addSuffix ? o.comparison > 0 ? "in " + i : i + " ago" : i;
    }
    return {
      localize: t
    };
  }
  return st = n, st;
}
var it, ir;
function Un() {
  if (ir) return it;
  ir = 1;
  var n = [
    "M",
    "MM",
    "Q",
    "D",
    "DD",
    "DDD",
    "DDDD",
    "d",
    "E",
    "W",
    "WW",
    "YY",
    "YYYY",
    "GG",
    "GGGG",
    "H",
    "HH",
    "h",
    "hh",
    "m",
    "mm",
    "s",
    "ss",
    "S",
    "SS",
    "SSS",
    "Z",
    "ZZ",
    "X",
    "x"
  ];
  function e(t) {
    var r = [];
    for (var a in t)
      t.hasOwnProperty(a) && r.push(a);
    var o = n.concat(r).sort().reverse(), i = new RegExp(
      "(\\[[^\\[]*\\])|(\\\\)?(" + o.join("|") + "|.)",
      "g"
    );
    return i;
  }
  return it = e, it;
}
var lt, lr;
function Gn() {
  if (lr) return lt;
  lr = 1;
  var n = Un();
  function e() {
    var r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], o = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], i = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], d = ["AM", "PM"], h = ["am", "pm"], S = ["a.m.", "p.m."], m = {
      // Month: Jan, Feb, ..., Dec
      MMM: function(p) {
        return r[p.getMonth()];
      },
      // Month: January, February, ..., December
      MMMM: function(p) {
        return a[p.getMonth()];
      },
      // Day of week: Su, Mo, ..., Sa
      dd: function(p) {
        return o[p.getDay()];
      },
      // Day of week: Sun, Mon, ..., Sat
      ddd: function(p) {
        return i[p.getDay()];
      },
      // Day of week: Sunday, Monday, ..., Saturday
      dddd: function(p) {
        return l[p.getDay()];
      },
      // AM, PM
      A: function(p) {
        return p.getHours() / 12 >= 1 ? d[1] : d[0];
      },
      // am, pm
      a: function(p) {
        return p.getHours() / 12 >= 1 ? h[1] : h[0];
      },
      // a.m., p.m.
      aa: function(p) {
        return p.getHours() / 12 >= 1 ? S[1] : S[0];
      }
    }, u = ["M", "D", "DDD", "d", "Q", "W"];
    return u.forEach(function(p) {
      m[p + "o"] = function(x, v) {
        return t(v[p](x));
      };
    }), {
      formatters: m,
      formattingTokensRegExp: n(m)
    };
  }
  function t(r) {
    var a = r % 100;
    if (a > 20 || a < 10)
      switch (a % 10) {
        case 1:
          return r + "st";
        case 2:
          return r + "nd";
        case 3:
          return r + "rd";
      }
    return r + "th";
  }
  return lt = e, lt;
}
var ct, cr;
function Vn() {
  if (cr) return ct;
  cr = 1;
  var n = Wn(), e = Gn();
  return ct = {
    distanceInWords: n(),
    format: e()
  }, ct;
}
var ut, ur;
function Jn() {
  if (ur) return ut;
  ur = 1;
  var n = $n(), e = Ln(), t = Er(), r = B(), a = qn(), o = Vn();
  function i(u, p, x) {
    p = p || "YYYY-MM-DDTHH:mm:ss.SSSZ", x = x || {};
    var v = x.locale, R = o.format.formatters, k = o.format.formattingTokensRegExp;
    v && v.format && v.format.formatters && (R = v.format.formatters, v.format.formattingTokensRegExp && (k = v.format.formattingTokensRegExp));
    var L = r(u);
    if (!a(L))
      return "Invalid Date";
    var P = d(p, R, k);
    return P(L);
  }
  var l = {
    // Month: 1, 2, ..., 12
    M: function(u) {
      return u.getMonth() + 1;
    },
    // Month: 01, 02, ..., 12
    MM: function(u) {
      return m(u.getMonth() + 1, 2);
    },
    // Quarter: 1, 2, 3, 4
    Q: function(u) {
      return Math.ceil((u.getMonth() + 1) / 3);
    },
    // Day of month: 1, 2, ..., 31
    D: function(u) {
      return u.getDate();
    },
    // Day of month: 01, 02, ..., 31
    DD: function(u) {
      return m(u.getDate(), 2);
    },
    // Day of year: 1, 2, ..., 366
    DDD: function(u) {
      return n(u);
    },
    // Day of year: 001, 002, ..., 366
    DDDD: function(u) {
      return m(n(u), 3);
    },
    // Day of week: 0, 1, ..., 6
    d: function(u) {
      return u.getDay();
    },
    // Day of ISO week: 1, 2, ..., 7
    E: function(u) {
      return u.getDay() || 7;
    },
    // ISO week: 1, 2, ..., 53
    W: function(u) {
      return e(u);
    },
    // ISO week: 01, 02, ..., 53
    WW: function(u) {
      return m(e(u), 2);
    },
    // Year: 00, 01, ..., 99
    YY: function(u) {
      return m(u.getFullYear(), 4).substr(2);
    },
    // Year: 1900, 1901, ..., 2099
    YYYY: function(u) {
      return m(u.getFullYear(), 4);
    },
    // ISO week-numbering year: 00, 01, ..., 99
    GG: function(u) {
      return String(t(u)).substr(2);
    },
    // ISO week-numbering year: 1900, 1901, ..., 2099
    GGGG: function(u) {
      return t(u);
    },
    // Hour: 0, 1, ... 23
    H: function(u) {
      return u.getHours();
    },
    // Hour: 00, 01, ..., 23
    HH: function(u) {
      return m(u.getHours(), 2);
    },
    // Hour: 1, 2, ..., 12
    h: function(u) {
      var p = u.getHours();
      return p === 0 ? 12 : p > 12 ? p % 12 : p;
    },
    // Hour: 01, 02, ..., 12
    hh: function(u) {
      return m(l.h(u), 2);
    },
    // Minute: 0, 1, ..., 59
    m: function(u) {
      return u.getMinutes();
    },
    // Minute: 00, 01, ..., 59
    mm: function(u) {
      return m(u.getMinutes(), 2);
    },
    // Second: 0, 1, ..., 59
    s: function(u) {
      return u.getSeconds();
    },
    // Second: 00, 01, ..., 59
    ss: function(u) {
      return m(u.getSeconds(), 2);
    },
    // 1/10 of second: 0, 1, ..., 9
    S: function(u) {
      return Math.floor(u.getMilliseconds() / 100);
    },
    // 1/100 of second: 00, 01, ..., 99
    SS: function(u) {
      return m(Math.floor(u.getMilliseconds() / 10), 2);
    },
    // Millisecond: 000, 001, ..., 999
    SSS: function(u) {
      return m(u.getMilliseconds(), 3);
    },
    // Timezone: -01:00, +00:00, ... +12:00
    Z: function(u) {
      return S(u.getTimezoneOffset(), ":");
    },
    // Timezone: -0100, +0000, ... +1200
    ZZ: function(u) {
      return S(u.getTimezoneOffset());
    },
    // Seconds timestamp: 512969520
    X: function(u) {
      return Math.floor(u.getTime() / 1e3);
    },
    // Milliseconds timestamp: 512969520900
    x: function(u) {
      return u.getTime();
    }
  };
  function d(u, p, x) {
    var v = u.match(x), R = v.length, k, L;
    for (k = 0; k < R; k++)
      L = p[v[k]] || l[v[k]], L ? v[k] = L : v[k] = h(v[k]);
    return function(P) {
      for (var F = "", y = 0; y < R; y++)
        v[y] instanceof Function ? F += v[y](P, l) : F += v[y];
      return F;
    };
  }
  function h(u) {
    return u.match(/\[[\s\S]/) ? u.replace(/^\[|]$/g, "") : u.replace(/\\/g, "");
  }
  function S(u, p) {
    p = p || "";
    var x = u > 0 ? "-" : "+", v = Math.abs(u), R = Math.floor(v / 60), k = v % 60;
    return x + m(R, 2) + p + m(k, 2);
  }
  function m(u, p) {
    for (var x = Math.abs(u).toString(); x.length < p; )
      x = "0" + x;
    return x;
  }
  return ut = i, ut;
}
var Bn = Jn();
const G = /* @__PURE__ */ X(Bn), Xn = "Cal__Header-module__root", Zn = "Cal__Header-module__landscape", Kn = "Cal__Header-module__dateWrapper", Qn = "Cal__Header-module__day", ea = "Cal__Header-module__wrapper", ta = "Cal__Header-module__blank", ra = "Cal__Header-module__active", na = "Cal__Header-module__year", aa = "Cal__Header-module__date", oa = "Cal__Header-module__range", ie = {
  root: Xn,
  landscape: Zn,
  dateWrapper: Kn,
  day: Qn,
  wrapper: ea,
  blank: ta,
  active: ra,
  year: na,
  date: aa,
  range: oa
}, sa = "Cal__Animation-module__enter", ia = "Cal__Animation-module__enterActive", la = "Cal__Animation-module__leave", ca = "Cal__Animation-module__leaveActive", ua = {
  enter: sa,
  enterActive: ia,
  leave: la,
  leaveActive: ca
};
function be(n, {
  display: e,
  key: t,
  locale: { locale: r },
  dateFormat: a,
  onYearClick: o,
  scrollToDate: i,
  setDisplay: l,
  shouldAnimate: d
}) {
  const h = Q(n), S = h && [
    {
      active: e === "years",
      handleClick: (m) => {
        o(h, m, t), l("years");
      },
      item: "year",
      title: e === "days" ? "Change year" : null,
      value: h.getFullYear()
    },
    {
      active: e === "days",
      handleClick: (m) => {
        e !== "days" ? l("days") : h && i(h, -40, !0);
      },
      item: "day",
      title: e === "days" ? `Scroll to ${G(h, a, { locale: r })}` : null,
      value: G(h, a, { locale: r })
    }
  ];
  return /* @__PURE__ */ w.jsx(
    "div",
    {
      className: ie.wrapper,
      "aria-label": G(h, a + " YYYY", { locale: r }),
      children: S.map(({ handleClick: m, item: u, key: p, value: x, active: v, title: R }) => /* @__PURE__ */ w.jsx(
        "div",
        {
          className: ne(ie.dateWrapper, ie[u], {
            [ie.active]: v
          }),
          title: R,
          children: /* @__PURE__ */ w.jsx(
            xr,
            {
              transitionName: ua,
              transitionEnterTimeout: 250,
              transitionLeaveTimeout: 250,
              transitionEnter: d,
              transitionLeave: d,
              children: /* @__PURE__ */ w.jsx(
                "span",
                {
                  className: ie.date,
                  "aria-hidden": !0,
                  onClick: m,
                  children: x
                },
                `${u}-${x}`
              )
            }
          )
        },
        u
      ))
    },
    t
  );
}
class da extends de {
  static defaultProps = {
    onYearClick: ce,
    renderSelection: be
  };
  static propTypes = {
    dateFormat: c.string,
    display: c.string,
    layout: c.string,
    locale: c.object,
    onYearClick: c.func,
    selected: c.any,
    shouldAnimate: c.bool,
    theme: c.object
  };
  render() {
    let {
      layout: e,
      locale: { blank: t },
      selected: r,
      renderSelection: a,
      theme: o
    } = this.props;
    return /* @__PURE__ */ w.jsx(
      "div",
      {
        className: ne(ie.root, {
          [ie.landscape]: e === "landscape"
        }),
        style: {
          backgroundColor: o.headerColor,
          color: o.textColor.active
        },
        children: r && a(r, this.props) || /* @__PURE__ */ w.jsx("div", { className: ne(ie.wrapper, ie.blank), children: t })
      }
    );
  }
}
const Se = {
  AUTO: "auto",
  CENTER: "center",
  END: "end",
  START: "start"
}, fa = {
  overflow: "auto",
  willChange: "transform",
  WebkitOverflowScrolling: "touch"
}, ha = {
  position: "relative",
  width: "100%",
  minHeight: "100%"
}, pa = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%"
};
class ma {
  constructor({ itemCount: e, itemSizeGetter: t, estimatedItemSize: r }) {
    this.itemCount = e, this.itemSizeGetter = t, this.estimatedItemSize = r, this.itemSizeAndPositionData = {}, this.lastMeasuredIndex = -1;
  }
  updateConfig({ itemCount: e, itemSizeGetter: t, estimatedItemSize: r }) {
    e != null && (this.itemCount = e), t != null && (this.itemSizeGetter = t), r != null && (this.estimatedItemSize = r);
  }
  getSizeAndPositionForIndex(e) {
    if (e < 0 || e >= this.itemCount)
      throw Error(`Requested index ${e} is outside of range 0..${this.itemCount}`);
    if (e > this.lastMeasuredIndex) {
      const t = this.getSizeAndPositionOfLastMeasuredItem();
      let r = t.offset + t.size;
      for (let a = this.lastMeasuredIndex + 1; a <= e; a++) {
        const o = this.itemSizeGetter(a);
        if (o == null || isNaN(o))
          throw Error(`Invalid size returned for index ${a} of value ${o}`);
        this.itemSizeAndPositionData[a] = { offset: r, size: o }, r += o;
      }
      this.lastMeasuredIndex = e;
    }
    return this.itemSizeAndPositionData[e];
  }
  getSizeAndPositionOfLastMeasuredItem() {
    return this.lastMeasuredIndex >= 0 ? this.itemSizeAndPositionData[this.lastMeasuredIndex] : { offset: 0, size: 0 };
  }
  getTotalSize() {
    const e = this.getSizeAndPositionOfLastMeasuredItem();
    return e.offset + e.size + (this.itemCount - this.lastMeasuredIndex - 1) * this.estimatedItemSize;
  }
  getUpdatedOffsetForIndex({ align: e = Se.START, containerSize: t, currentOffset: r, targetIndex: a }) {
    if (t <= 0) return 0;
    const o = this.getSizeAndPositionForIndex(a), i = o.offset, l = i - t + o.size;
    let d;
    switch (e) {
      case Se.END:
        d = l;
        break;
      case Se.CENTER:
        d = i - (t - o.size) / 2;
        break;
      case Se.START:
        d = i;
        break;
      default:
        d = Math.max(l, Math.min(i, r));
    }
    return Math.max(0, Math.min(this.getTotalSize() - t, d));
  }
  getVisibleRange({ containerSize: e, offset: t, overscanCount: r }) {
    if (this.getTotalSize() === 0) return {};
    const o = t + e;
    let i = this.findNearestItem(t), l = this.getSizeAndPositionForIndex(i), d = l.offset + l.size, h = i;
    for (; d < o && h < this.itemCount - 1; )
      h++, d += this.getSizeAndPositionForIndex(h).size;
    return i = Math.max(0, i - r), h = Math.min(h + r, this.itemCount - 1), { start: i, stop: h };
  }
  resetItem(e) {
    this.lastMeasuredIndex = Math.min(this.lastMeasuredIndex, e - 1);
  }
  findNearestItem(e) {
    e = Math.max(0, e);
    const t = this.getSizeAndPositionOfLastMeasuredItem(), r = Math.max(0, this.lastMeasuredIndex);
    return t.offset >= e ? this.binarySearch({ high: r, low: 0, offset: e }) : this.exponentialSearch({ index: r, offset: e });
  }
  binarySearch({ low: e, high: t, offset: r }) {
    for (; e <= t; ) {
      const a = e + Math.floor((t - e) / 2), o = this.getSizeAndPositionForIndex(a).offset;
      if (o === r) return a;
      o < r ? e = a + 1 : t = a - 1;
    }
    return e > 0 ? e - 1 : 0;
  }
  exponentialSearch({ index: e, offset: t }) {
    let r = 1;
    for (; e < this.itemCount && this.getSizeAndPositionForIndex(e).offset < t; )
      e += r, r *= 2;
    return this.binarySearch({
      high: Math.min(e, this.itemCount - 1),
      low: Math.floor(e / 2),
      offset: t
    });
  }
}
class Mr extends de {
  static defaultProps = {
    overscanCount: 3,
    width: "100%"
  };
  static propTypes = {
    className: c.string,
    estimatedItemSize: c.number,
    height: c.oneOfType([c.number, c.string]).isRequired,
    itemCount: c.number.isRequired,
    itemSize: c.oneOfType([c.number, c.array, c.func]).isRequired,
    onItemsRendered: c.func,
    onScroll: c.func,
    overscanCount: c.number,
    renderItem: c.func.isRequired,
    scrollOffset: c.number,
    scrollToAlignment: c.oneOf(Object.values(Se)),
    scrollToIndex: c.number,
    style: c.object,
    width: c.oneOfType([c.number, c.string])
  };
  constructor(e) {
    super(e), this.sizeAndPositionManager = new ma({
      itemCount: e.itemCount,
      itemSizeGetter: this.itemSizeGetter(e.itemSize),
      estimatedItemSize: this.getEstimatedItemSize(e)
    }), this.state = {
      offset: e.scrollOffset || e.scrollToIndex != null && this.getOffsetForIndex(e.scrollToIndex) || 0
    }, this.styleCache = {};
  }
  getRef = (e) => {
    this.rootNode = e;
  };
  componentDidMount() {
    this.rootNode.addEventListener("scroll", this.handleScroll, { passive: !0 }), this.scrollTo(this.state.offset);
  }
  componentDidUpdate(e, t) {
    const r = e.itemCount !== this.props.itemCount || e.itemSize !== this.props.itemSize || e.estimatedItemSize !== this.props.estimatedItemSize;
    r && (this.sizeAndPositionManager.updateConfig({
      itemCount: this.props.itemCount,
      itemSizeGetter: this.itemSizeGetter(this.props.itemSize),
      estimatedItemSize: this.getEstimatedItemSize()
    }), this.recomputeSizes()), this.props.scrollOffset !== e.scrollOffset ? this.setOffset(this.props.scrollOffset || 0) : typeof this.props.scrollToIndex == "number" && (this.props.scrollToIndex !== e.scrollToIndex || this.props.scrollToAlignment !== e.scrollToAlignment || r) && this.setOffset(this.getOffsetForIndex(this.props.scrollToIndex)), t.offset !== this.state.offset && (this.skipScrollToAfterNativeScroll ? this.skipScrollToAfterNativeScroll = !1 : this.scrollTo(this.state.offset));
  }
  componentWillUnmount() {
    this.rootNode.removeEventListener("scroll", this.handleScroll);
  }
  setOffset(e) {
    e !== this.state.offset && this.setState({ offset: e });
  }
  itemSizeGetter = (e) => (t) => this.getSize(t, e);
  handleScroll = (e) => {
    const t = this.rootNode.scrollTop;
    t < 0 || this.state.offset === t || e.target !== this.rootNode || (this.skipScrollToAfterNativeScroll = !0, this.setState({ offset: t }), typeof this.props.onScroll == "function" && this.props.onScroll(t, e));
  };
  scrollTo(e) {
    this.rootNode && (this.rootNode.scrollTop = e);
  }
  getOffsetForIndex(e, t = this.props.scrollToAlignment, r = this.props.itemCount) {
    return (e < 0 || e >= r) && (e = 0), this.sizeAndPositionManager.getUpdatedOffsetForIndex({
      align: t,
      containerSize: this.props.height,
      currentOffset: this.state?.offset || 0,
      targetIndex: e
    });
  }
  recomputeSizes(e = 0) {
    this.styleCache = {}, this.sizeAndPositionManager.resetItem(e);
  }
  getEstimatedItemSize(e = this.props) {
    return e.estimatedItemSize || typeof e.itemSize == "number" && e.itemSize || 50;
  }
  getSize(e, t) {
    return typeof t == "function" ? t(e) : Array.isArray(t) ? t[e] : t;
  }
  getStyle(e) {
    if (this.styleCache[e]) return this.styleCache[e];
    const { size: t, offset: r } = this.sizeAndPositionManager.getSizeAndPositionForIndex(e);
    return this.styleCache[e] = {
      ...pa,
      height: t,
      top: r
    }, this.styleCache[e];
  }
  render() {
    const {
      className: e,
      height: t,
      itemCount: r,
      onItemsRendered: a,
      overscanCount: o,
      renderItem: i,
      style: l,
      width: d
    } = this.props, { offset: h } = this.state, { start: S, stop: m } = this.sizeAndPositionManager.getVisibleRange({
      containerSize: t || 0,
      offset: h,
      overscanCount: o
    }), u = [];
    if (typeof S < "u" && typeof m < "u") {
      for (let p = S; p <= m; p++)
        u.push(i({ index: p, style: this.getStyle(p) }));
      typeof a == "function" && a({ startIndex: S, stopIndex: m });
    }
    return /* @__PURE__ */ w.jsx(
      "div",
      {
        className: e,
        ref: this.getRef,
        style: { ...fa, ...l, height: t, width: d },
        children: /* @__PURE__ */ w.jsx("div", { style: { ...ha, height: this.sizeAndPositionManager.getTotalSize() }, children: u })
      }
    );
  }
}
var dt, dr;
function ya() {
  if (dr) return dt;
  dr = 1;
  var n = B();
  function e(t) {
    var r = n(t);
    return r.setDate(1), r.setHours(0, 0, 0, 0), r;
  }
  return dt = e, dt;
}
var _a = ya();
const va = /* @__PURE__ */ X(_a);
var ft, fr;
function ga() {
  if (fr) return ft;
  fr = 1;
  var n = B();
  function e(t, r) {
    var a = n(t), o = n(r);
    return a.getFullYear() === o.getFullYear();
  }
  return ft = e, ft;
}
var Ta = ga();
const Sa = /* @__PURE__ */ X(Ta), ba = "Cal__Month-module__rows", Da = "Cal__Month-module__row", wa = "Cal__Month-module__partial", Ca = "Cal__Month-module__label", Oa = "Cal__Month-module__partialFirstRow", fe = {
  rows: ba,
  row: Da,
  partial: wa,
  label: Ca,
  partialFirstRow: Oa
};
class xa extends de {
  renderRows() {
    const {
      DayComponent: e,
      disabledDates: t,
      disabledDays: r,
      monthDate: a,
      locale: o,
      maxDate: i,
      minDate: l,
      rowHeight: d,
      rows: h,
      selected: S,
      today: m,
      theme: u,
      passThrough: p
    } = this.props, x = m.getFullYear(), v = a.getFullYear(), R = a.getMonth(), k = G(a, "MMM", { locale: o.locale }), L = [];
    let P = 0, F = !1, y = !1, q, Z, te, J;
    const oe = G(m, "YYYY-MM-DD"), V = G(l, "YYYY-MM-DD"), W = G(i, "YYYY-MM-DD");
    for (let M = 0, T = h.length; M < T; M++) {
      J = h[M], Z = [], te = Tt(new Date(v, R, J[0]));
      for (let C = 0, E = J.length; C < E; C++)
        P = J[C], q = bn(v, R, P), y = q === oe, F = l && q < V || i && q > W || r && r.length && r.indexOf(te) !== -1 || t && t.length && t.indexOf(q) !== -1, Z[C] = /* @__PURE__ */ w.jsx(
          e,
          {
            currentYear: x,
            date: q,
            day: P,
            selected: S,
            isDisabled: F,
            isToday: y,
            locale: o,
            month: R,
            monthShort: k,
            theme: u,
            year: v,
            ...p.Day
          },
          `day-${P}`
        ), te += 1;
      L[M] = /* @__PURE__ */ w.jsx(
        "ul",
        {
          className: ne(fe.row, { [fe.partial]: J.length !== 7 }),
          style: { height: d },
          role: "row",
          "aria-label": `Week ${M + 1}`,
          children: Z
        },
        `Row-${M}`
      );
    }
    return L;
  }
  render() {
    const { locale: { locale: e }, monthDate: t, today: r, rows: a, rowHeight: o, showOverlay: i, style: l, theme: d } = this.props, h = Sa(t, r) ? "MMMM" : "MMMM YYYY";
    return /* @__PURE__ */ w.jsx("div", { className: fe.root, style: { ...l, lineHeight: `${o}px` }, children: /* @__PURE__ */ w.jsxs("div", { className: fe.rows, children: [
      this.renderRows(),
      i && /* @__PURE__ */ w.jsx(
        "label",
        {
          className: ne(fe.label, {
            [fe.partialFirstRow]: a[0].length !== 7
          }),
          style: { backgroundColor: d.overlayColor },
          children: /* @__PURE__ */ w.jsx("span", { children: G(t, h, { locale: e }) })
        }
      )
    ] }) });
  }
}
const Ea = "Cal__MonthList-module__root", Ma = "Cal__MonthList-module__scrolling", hr = {
  root: Ea,
  scrolling: Ma
}, Ra = 5;
class Ya extends me {
  static propTypes = {
    disabledDates: c.arrayOf(c.string),
    disabledDays: c.arrayOf(c.number),
    height: c.number,
    isScrolling: c.bool,
    locale: c.object,
    maxDate: c.instanceOf(Date),
    min: c.instanceOf(Date),
    minDate: c.instanceOf(Date),
    monthGap: c.number,
    months: c.arrayOf(c.object),
    onDaySelect: c.func,
    onScroll: c.func,
    overscanMonthCount: c.number,
    rowHeight: c.number,
    selectedDate: c.instanceOf(Date),
    showOverlay: c.bool,
    theme: c.object,
    today: c.instanceOf(Date),
    width: c.oneOfType([c.number, c.string])
  };
  state = {
    scrollTop: this.getDateOffset(this.props.scrollDate)
  };
  cache = {};
  memoize = function(e) {
    if (!this.cache[e]) {
      const { locale: { weekStartsOn: t } } = this.props, [r, a] = e.split(":"), o = vn(r, a, t);
      this.cache[e] = o;
    }
    return this.cache[e];
  };
  monthHeights = [];
  _getRef = (e) => {
    this.VirtualList = e;
  };
  getMonthHeight = (e) => {
    if (!this.monthHeights[e]) {
      let { locale: { weekStartsOn: t }, monthGap: r = 0, months: a, rowHeight: o } = this.props, { month: i, year: l } = a[e], d = gn(i, l, t, e === a.length - 1) * o + (e > 0 ? r : 0);
      this.monthHeights[e] = d;
    }
    return this.monthHeights[e];
  };
  componentDidMount() {
    this.scrollEl = this.VirtualList.rootNode;
  }
  UNSAFE_componentWillReceiveProps({ scrollDate: e }) {
    e !== this.props.scrollDate && this.setState({
      scrollTop: this.getDateOffset(e)
    });
  }
  getDateOffset(e) {
    const { min: t, monthGap: r = 0, rowHeight: a, locale: { weekStartsOn: o }, height: i } = this.props, l = Q(e), d = Math.max(0, (l.getFullYear() - t.getFullYear()) * 12 + l.getMonth() - t.getMonth());
    return mt(va(t), l, o) * a + d * r - (i - a / 2) / 2;
  }
  scrollToDate = (e, t = 0, ...r) => {
    let a = this.getDateOffset(e);
    this.scrollTo(a + t, ...r);
  };
  scrollTo = (e = 0, t = !1, r = ce) => {
    const a = () => setTimeout(() => {
      this.scrollEl.style.overflowY = "auto", r();
    });
    this.scrollEl.style.overflowY = "hidden", t ? _n({
      fromValue: this.scrollEl.scrollTop,
      toValue: e,
      onUpdate: (o, i) => this.setState({ scrollTop: o }, i),
      onComplete: a
    }) : window.requestAnimationFrame(() => {
      this.scrollEl.scrollTop = e, a();
    });
  };
  renderMonth = ({ index: e, style: t }) => {
    let {
      DayComponent: r,
      disabledDates: a,
      disabledDays: o,
      locale: i,
      maxDate: l,
      minDate: d,
      months: h,
      passThrough: S,
      rowHeight: m,
      selected: u,
      showOverlay: p,
      theme: x,
      today: v,
      monthGap: y = 0
    } = this.props, { month: R, year: k } = h[e], L = `${k}:${R}`, { date: P, rows: F } = this.memoize(L), q = e > 0 && y ? { ...t, boxSizing: "border-box", paddingTop: y } : t;
    return /* @__PURE__ */ w.jsx(
      xa,
      {
        selected: u,
        DayComponent: r,
        monthDate: P,
        disabledDates: a,
        disabledDays: o,
        maxDate: l,
        minDate: d,
        rows: F,
        rowHeight: m,
        isScrolling: !1,
        showOverlay: p,
        today: v,
        theme: x,
        style: q,
        locale: i,
        passThrough: S,
        ...S.Month
      },
      L
    );
  };
  render() {
    let {
      height: e,
      isScrolling: t,
      onScroll: r,
      overscanMonthCount: a,
      months: o,
      rowHeight: i,
      width: l
    } = this.props;
    const { scrollTop: d } = this.state;
    return /* @__PURE__ */ w.jsx(
      Mr,
      {
        ref: this._getRef,
        width: l,
        height: e,
        itemCount: o.length,
        itemSize: this.getMonthHeight,
        estimatedItemSize: i * Ra,
        renderItem: this.renderMonth,
        onScroll: r,
        scrollOffset: d,
        className: ne(hr.root, { [hr.scrolling]: t }),
        style: { lineHeight: `${i}px` },
        overscanCount: a
      }
    );
  }
}
const ka = "Cal__Weekdays-module__root", Ia = "Cal__Weekdays-module__day", pr = {
  root: ka,
  day: Ia
};
class Aa extends de {
  static propTypes = {
    locale: c.object,
    theme: c.object
  };
  render() {
    const { weekdays: e, weekStartsOn: t, theme: r } = this.props, a = [...e.slice(t, 7), ...e.slice(0, t)];
    return /* @__PURE__ */ w.jsx(
      "ul",
      {
        className: pr.root,
        style: {
          backgroundColor: r.weekdayColor,
          color: r.textColor.active,
          paddingRight: Sn
        },
        "aria-hidden": !0,
        children: a.map((o, i) => /* @__PURE__ */ w.jsx("li", { className: pr.day, children: o }, `Weekday-${i}`))
      }
    );
  }
}
var ht, mr;
function Pa() {
  if (mr) return ht;
  mr = 1;
  var n = B();
  function e(t, r) {
    var a = n(t), o = n(r);
    return a.getFullYear() === o.getFullYear() && a.getMonth() === o.getMonth();
  }
  return ht = e, ht;
}
var ja = Pa();
const yr = /* @__PURE__ */ X(ja), Fa = "Cal__Years-module__root", Na = "Cal__Years-module__list", $a = "Cal__Years-module__year", Ha = "Cal__Years-module__withMonths", za = "Cal__Years-module__currentMonth", La = "Cal__Years-module__selected", qa = "Cal__Years-module__disabled", Wa = "Cal__Years-module__active", Ua = "Cal__Years-module__currentYear", Ga = "Cal__Years-module__first", Va = "Cal__Years-module__last", ae = {
  root: Fa,
  list: Na,
  year: $a,
  withMonths: Ha,
  currentMonth: za,
  selected: La,
  disabled: qa,
  active: Wa,
  currentYear: Ua,
  first: Ga,
  last: Va
}, Ja = 40;
class Ba extends me {
  static propTypes = {
    height: c.number,
    hideOnSelect: c.bool,
    locale: c.object,
    max: c.object,
    maxDate: c.object,
    min: c.object,
    minDate: c.object,
    onSelect: c.func,
    scrollToDate: c.func,
    selectedYear: c.number,
    setDisplay: c.func,
    theme: c.object,
    width: c.oneOfType([c.number, c.string]),
    years: c.array
  };
  static defaultProps = {
    onSelect: ce,
    showMonths: !0
  };
  handleClick(e, t) {
    let {
      hideOnSelect: r,
      onSelect: a,
      setDisplay: o,
      scrollToDate: i
    } = this.props;
    a(e, t, (l) => i(l)), r && window.requestAnimationFrame(() => o("days"));
  }
  renderMonths(e) {
    const { locale: { locale: t }, selected: r, theme: a, today: o, min: i, max: l, minDate: d, maxDate: h } = this.props, S = Dn(e, r.getDate());
    return /* @__PURE__ */ w.jsx("ol", { children: S.map((m, u) => {
      const p = yr(m, r), x = yr(m, o), v = De(m, i) || De(m, d) || Ie(m, l) || Ie(m, h), R = Object.assign({}, p && {
        backgroundColor: typeof a.selectionColor == "function" ? a.selectionColor(m) : a.selectionColor
      }, x && {
        borderColor: a.todayColor
      });
      return /* @__PURE__ */ w.jsx(
        "li",
        {
          onClick: (k) => {
            k.stopPropagation(), v || this.handleClick(m, k);
          },
          className: ne(ae.month, {
            [ae.selected]: p,
            [ae.currentMonth]: x,
            [ae.disabled]: v
          }),
          style: R,
          title: `Set date to ${G(m, "MMMM Do, YYYY")}`,
          children: G(m, "MMM", { locale: t })
        },
        u
      );
    }) });
  }
  render() {
    const { height: e, selected: t, showMonths: r, theme: a, today: o, width: i } = this.props, l = o.getFullYear(), d = this.props.years.slice(0, this.props.years.length), h = d.indexOf(t.getFullYear()), S = r ? 110 : 50, m = d.map(
      (p, x) => x === 0 || x === d.length - 1 ? S + Ja : S
    ), u = d.length * S < e + 50 ? d.length * S : e + 50;
    return /* @__PURE__ */ w.jsx(
      "div",
      {
        className: ae.root,
        style: { color: a.selectionColor, height: e + 50 },
        children: /* @__PURE__ */ w.jsx(
          Mr,
          {
            className: ae.list,
            width: i,
            height: u,
            itemCount: d.length,
            estimatedItemSize: S,
            itemSize: (p) => m[p],
            scrollToIndex: h !== -1 ? h : null,
            scrollToAlignment: "center",
            renderItem: ({ index: p, style: x }) => {
              const v = d[p], R = p === h;
              return /* @__PURE__ */ w.jsxs(
                "div",
                {
                  className: ne(ae.year, {
                    [ae.active]: !r && R,
                    [ae.currentYear]: !r && v === l,
                    [ae.withMonths]: r,
                    [ae.first]: p === 0,
                    [ae.last]: p === d.length - 1
                  }),
                  onClick: () => this.handleClick(new Date(t).setYear(v)),
                  title: `Set year to ${v}`,
                  "data-year": v,
                  style: Object.assign({}, x, {
                    color: typeof a.selectionColor == "function" ? a.selectionColor(new Date(v, 0, 1)) : a.selectionColor
                  }),
                  children: [
                    /* @__PURE__ */ w.jsx("label", { children: /* @__PURE__ */ w.jsx(
                      "span",
                      {
                        style: !r && v === l ? { borderColor: a.todayColor } : null,
                        children: v
                      }
                    ) }),
                    r && this.renderMonths(v)
                  ]
                },
                p
              );
            }
          }
        )
      }
    );
  }
}
const Xa = "Cal__Day-module__root", Za = "Cal__Day-module__enabled", Ka = "Cal__Day-module__highlighted", Qa = "Cal__Day-module__today", eo = "Cal__Day-module__disabled", to = "Cal__Day-module__selected", ro = "Cal__Day-module__month", no = "Cal__Day-module__year", ao = "Cal__Day-module__selection", oo = "Cal__Day-module__day", so = "Cal__Day-module__range", io = "Cal__Day-module__start", lo = "Cal__Day-module__end", co = "Cal__Day-module__betweenRange", K = {
  root: Xa,
  enabled: Za,
  highlighted: Ka,
  today: Qa,
  disabled: eo,
  selected: to,
  month: ro,
  year: no,
  selection: ao,
  day: oo,
  range: so,
  start: io,
  end: lo,
  betweenRange: co
};
class uo extends de {
  handleClick = () => {
    let { date: e, isDisabled: t, onClick: r } = this.props;
    !t && typeof r == "function" && r(Q(e));
  };
  renderSelection(e) {
    const {
      day: t,
      date: r,
      isToday: a,
      locale: { todayLabel: o },
      monthShort: i,
      theme: { textColor: l },
      selectionStyle: d
    } = this.props;
    return /* @__PURE__ */ w.jsxs(
      "div",
      {
        className: K.selection,
        "data-date": r,
        style: {
          backgroundColor: this.selectionColor,
          color: l.active,
          ...d
        },
        children: [
          /* @__PURE__ */ w.jsx("span", { className: K.month, children: a ? o.short || o.long : i }),
          /* @__PURE__ */ w.jsx("span", { className: K.day, children: t })
        ]
      }
    );
  }
  render() {
    const {
      className: e,
      currentYear: t,
      date: r,
      day: a,
      handlers: o,
      isDisabled: i,
      isHighlighted: l,
      isToday: d,
      isSelected: h,
      monthShort: S,
      theme: { selectionColor: m, todayColor: u },
      year: p
    } = this.props;
    let x;
    return h ? x = this.selectionColor = typeof m == "function" ? m(r) : m : d && (x = u), /* @__PURE__ */ w.jsxs(
      "li",
      {
        style: x ? { color: x } : null,
        className: ne(K.root, {
          [K.today]: d,
          [K.highlighted]: l,
          [K.selected]: h,
          [K.disabled]: i,
          [K.enabled]: !i
        }, e),
        onClick: this.handleClick,
        "data-date": r,
        ...o,
        children: [
          a === 1 && /* @__PURE__ */ w.jsx("span", { className: K.month, children: S }),
          d ? /* @__PURE__ */ w.jsx("span", { children: a }) : a,
          a === 1 && t !== p && /* @__PURE__ */ w.jsx("span", { className: K.year, children: p }),
          h && this.renderSelection()
        ]
      }
    );
  }
}
const fo = "Cal__Container-module__root", ho = "Cal__Container-module__landscape", po = "Cal__Container-module__wrapper", mo = "Cal__Container-module__listWrapper", yo = {
  root: fo,
  landscape: ho,
  wrapper: po,
  listWrapper: mo
}, ke = {
  container: yo
}, Dt = hn({
  autoFocus: !0,
  DayComponent: uo,
  display: "days",
  displayOptions: {},
  HeaderComponent: da,
  height: 500,
  keyboardSupport: !0,
  max: new Date(2050, 11, 31),
  maxDate: new Date(2050, 11, 31),
  min: new Date(1980, 0, 1),
  minDate: new Date(1980, 0, 1),
  onHighlightedDateChange: ce,
  onScroll: ce,
  onScrollEnd: ce,
  onSelect: ce,
  passThrough: {},
  rowHeight: 56,
  tabIndex: 1,
  width: 400,
  YearsComponent: Ba
});
class _o extends me {
  constructor(e) {
    super(...arguments), this.updateYears(e), this.state = {
      display: e.display
    };
  }
  static propTypes = {
    autoFocus: c.bool,
    className: c.string,
    DayComponent: c.func,
    disabledDates: c.arrayOf(c.instanceOf(Date)),
    disabledDays: c.arrayOf(c.number),
    display: c.oneOf(["years", "days"]),
    displayOptions: c.shape({
      hideYearsOnSelect: c.bool,
      layout: c.oneOf(["portrait", "landscape"]),
      overscanMonthCount: c.number,
      shouldHeaderAnimate: c.bool,
      showHeader: c.bool,
      showMonthsForYears: c.bool,
      showOverlay: c.bool,
      showTodayHelper: c.bool,
      showWeekdays: c.bool,
      todayHelperRowOffset: c.number
    }),
    height: c.number,
    keyboardSupport: c.bool,
    locale: c.shape({
      blank: c.string,
      headerFormat: c.string,
      todayLabel: c.shape({
        long: c.string,
        short: c.string
      }),
      weekdays: c.arrayOf(c.string),
      weekStartsOn: c.oneOf([0, 1, 2, 3, 4, 5, 6])
    }),
    max: c.instanceOf(Date),
    maxDate: c.instanceOf(Date),
    min: c.instanceOf(Date),
    minDate: c.instanceOf(Date),
    monthGap: c.number,
    onScroll: c.func,
    onScrollEnd: c.func,
    onSelect: c.func,
    rowHeight: c.number,
    tabIndex: c.number,
    theme: c.shape({
      floatingNav: c.shape({
        background: c.string,
        chevron: c.string,
        color: c.string
      }),
      headerColor: c.string,
      selectionColor: c.oneOfType([c.string, c.func]),
      textColor: c.shape({
        active: c.string,
        default: c.string
      }),
      todayColor: c.string,
      weekdayColor: c.string
    }),
    width: c.oneOfType([c.string, c.number]),
    YearsComponent: c.func
  };
  componentDidMount() {
    let { autoFocus: e } = this.props;
    e && this.node.focus();
  }
  UNSAFE_componentWillUpdate(e, t) {
    let { min: r, minDate: a, max: o, maxDate: i } = this.props;
    (e.min !== r || e.minDate !== a || e.max !== o || e.maxDate !== i) && this.updateYears(e), e.display !== this.props.display && this.setState({ display: e.display });
  }
  updateYears(e = this.props) {
    this._min = Q(e.min), this._max = Q(e.max), this._minDate = Q(e.minDate), this._maxDate = Q(e.maxDate);
    const t = this._min.getFullYear(), r = this._min.getMonth(), a = this._max.getFullYear(), o = this._max.getMonth(), i = [];
    let l, d;
    for (l = t; l <= a; l++)
      for (d = 0; d < 12; d++)
        l === t && d < r || l === a && d > o || i.push({ month: d, year: l });
    this.months = i;
  }
  getDisabledDates(e) {
    return e && e.map((t) => G(Q(t), "YYYY-MM-DD"));
  }
  _displayOptions = {};
  getDisplayOptions(e = this.props.displayOptions) {
    return Object.assign(this._displayOptions, On, e);
  }
  _locale = {};
  getLocale() {
    return Object.assign(this._locale, xn, this.props.locale);
  }
  _theme = {};
  getTheme() {
    return Object.assign(this._theme, En, this.props.theme);
  }
  getCurrentOffset = () => this.scrollTop;
  getDateOffset = (e) => this._MonthList && this._MonthList.getDateOffset(e);
  scrollTo = (e) => this._MonthList && this._MonthList.scrollTo(e);
  scrollToDate = (e = /* @__PURE__ */ new Date(), t, r) => {
    const { display: a } = this.props;
    return this._MonthList && this._MonthList.scrollToDate(
      e,
      t,
      r && a === "days",
      () => this.setState({ isScrolling: !1 })
    );
  };
  getScrollSpeed = new Tn().getScrollSpeed;
  handleScroll = (e, t) => {
    const { onScroll: r, rowHeight: a } = this.props, { isScrolling: o } = this.state, { showTodayHelper: i, showOverlay: l } = this.getDisplayOptions(), d = this.scrollSpeed = Math.abs(this.getScrollSpeed(e));
    this.scrollTop = e, l && d > a && !o && this.setState({
      isScrolling: !0
    }), i && this.updateTodayHelperPosition(d), r(e, t), this.handleScrollEnd();
  };
  handleScrollEnd = wn(() => {
    const { onScrollEnd: e } = this.props, { isScrolling: t } = this.state, { showTodayHelper: r } = this.getDisplayOptions();
    t && this.setState({ isScrolling: !1 }), r && this.updateTodayHelperPosition(0), e(this.scrollTop);
  }, 150);
  updateTodayHelperPosition = (e) => {
    const t = this.today, r = this.scrollTop, { showToday: a } = this.state, { height: o, rowHeight: i } = this.props, { todayHelperRowOffset: l } = this.getDisplayOptions();
    let d;
    this._todayOffset || (this._todayOffset = this.getDateOffset(t)), r >= this._todayOffset + (o - i) / 2 + i * l ? a !== yt && (d = yt) : r <= this._todayOffset - o / 2 - i * (l + 1) ? a !== _t && (d = _t) : a && e <= 1 && (d = !1), r === 0 && (d = !1), d != null && this.setState({ showToday: d });
  };
  setDisplay = (e) => {
    this.setState({ display: e });
  };
  render() {
    let {
      className: e,
      passThrough: t,
      DayComponent: r,
      disabledDays: a,
      displayDate: o,
      height: i,
      HeaderComponent: l,
      monthGap: H,
      rowHeight: d,
      scrollDate: h,
      selected: S,
      tabIndex: m,
      width: u,
      YearsComponent: p
    } = this.props;
    const {
      hideYearsOnSelect: x,
      layout: v,
      overscanMonthCount: R,
      shouldHeaderAnimate: k,
      showHeader: L,
      showMonthsForYears: P,
      showOverlay: F,
      showTodayHelper: y,
      showWeekdays: q
    } = this.getDisplayOptions(), { display: Z, isScrolling: te, showToday: J } = this.state, oe = this.getDisabledDates(this.props.disabledDates), V = this.getLocale(), W = this.getTheme(), M = this.today = wr(/* @__PURE__ */ new Date());
    return /* @__PURE__ */ w.jsxs(
      "div",
      {
        tabIndex: m,
        className: ne(e, ke.container.root, {
          [ke.container.landscape]: v === "landscape"
        }),
        style: { color: W.textColor.default, width: u },
        "aria-label": "Calendar",
        ref: (T) => {
          this.node = T;
        },
        ...t.rootNode,
        children: [
          L && /* @__PURE__ */ w.jsx(
            l,
            {
              selected: S,
              shouldAnimate: !!(k && Z !== "years"),
              layout: v,
              theme: W,
              locale: V,
              scrollToDate: this.scrollToDate,
              setDisplay: this.setDisplay,
              dateFormat: V.headerFormat,
              display: Z,
              displayDate: o,
              ...t.Header
            }
          ),
          /* @__PURE__ */ w.jsxs("div", { className: ke.container.wrapper, children: [
            q && /* @__PURE__ */ w.jsx(Aa, { weekdays: V.weekdays, weekStartsOn: V.weekStartsOn, theme: W }),
            /* @__PURE__ */ w.jsxs("div", { className: ke.container.listWrapper, children: [
              y && /* @__PURE__ */ w.jsx(
                Pn,
                {
                  scrollToDate: this.scrollToDate,
                  show: J,
                  today: M,
                  theme: W,
                  todayLabel: V.todayLabel.long
                }
              ),
              /* @__PURE__ */ w.jsx(
                Ya,
                {
                  ref: (T) => {
                    this._MonthList = T;
                  },
                  DayComponent: r,
                  disabledDates: oe,
                  disabledDays: a,
                  height: i,
                  isScrolling: te,
                  locale: V,
                  maxDate: this._maxDate,
                  min: this._min,
                  minDate: this._minDate,
                  monthGap: H,
                  months: this.months,
                  onScroll: this.handleScroll,
                  overscanMonthCount: R,
                  passThrough: t,
                  theme: W,
                  today: M,
                  rowHeight: d,
                  selected: S,
                  scrollDate: h,
                  showOverlay: F,
                  width: u
                }
              )
            ] }),
            Z === "years" && /* @__PURE__ */ w.jsx(
              p,
              {
                ref: (T) => {
                  this._Years = T;
                },
                height: i,
                hideOnSelect: x,
                locale: V,
                max: this._max,
                maxDate: this._maxDate,
                min: this._min,
                minDate: this._minDate,
                scrollToDate: this.scrollToDate,
                selected: S,
                setDisplay: this.setDisplay,
                showMonths: P,
                theme: W,
                today: M,
                width: u,
                years: Cn(this._min.getFullYear(), this._max.getFullYear() + 1),
                ...t.Years
              }
            )
          ] })
        ]
      }
    );
  }
}
const vo = Ce(["selected"], (n) => ({
  isSelected: n.selected === n.date
})), go = Ce(["selected"], ({ selected: n }) => ({
  selected: Q(n)
})), To = Ae(
  Dt,
  _e(({
    DayComponent: n,
    onSelect: e,
    setScrollDate: t,
    YearsComponent: r
  }) => ({
    DayComponent: vo(n),
    YearsComponent: go(r)
  })),
  ue("scrollDate", "setScrollDate", (n) => n.selected || /* @__PURE__ */ new Date()),
  ye(({ onSelect: n, setScrollDate: e, ...t }) => {
    const r = Or(t.selected, t);
    return {
      passThrough: {
        Day: {
          onClick: n
        },
        Years: {
          onSelect: (a) => So(a, { onSelect: n, selected: r, setScrollDate: e })
        }
      },
      selected: r && G(r, "YYYY-MM-DD")
    };
  })
);
function So(n, { setScrollDate: e, selected: t, onSelect: r }) {
  const a = Q(n);
  r(a), e(a);
}
var pt, _r;
function bo() {
  if (_r) return pt;
  _r = 1;
  var n = B();
  function e(t, r) {
    var a = n(t);
    return a.setDate(a.getDate() + r), a;
  }
  return pt = e, pt;
}
var Do = bo();
const wo = /* @__PURE__ */ X(Do), Co = ye((n) => ({
  isHighlighted: n.highlightedDate === n.date
})), Zo = Ae(
  ue("highlightedDate", "setHighlight"),
  _e(({ DayComponent: n }) => ({
    DayComponent: Co(n)
  })),
  pn({
    onKeyDown: (n) => (e) => Oo(e, n)
  }),
  ye(({ highlightedDate: n, onKeyDown: e, onSelect: t, passThrough: r, setHighlight: a }) => ({
    passThrough: {
      ...r,
      Day: {
        ...r.Day,
        highlightedDate: G(n, "YYYY-MM-DD"),
        onClick: (o) => {
          a(null), r.Day.onClick(o);
        }
      },
      rootNode: { onKeyDown: e }
    }
  }))
);
function Oo(n, e) {
  const {
    minDate: t,
    maxDate: r,
    passThrough: { Day: { onClick: a } },
    setScrollDate: o,
    setHighlight: i
  } = e, l = xo(e);
  let d = 0;
  switch ([le.left, le.up, le.right, le.down].indexOf(
    n.keyCode
  ) > -1 && typeof n.preventDefault == "function" && n.preventDefault(), n.keyCode) {
    case le.enter:
      a && a(l);
      return;
    case le.left:
      d = -1;
      break;
    case le.right:
      d = 1;
      break;
    case le.down:
      d = 7;
      break;
    case le.up:
      d = -7;
      break;
    default:
      d = 0;
  }
  if (d) {
    let h = wo(l, d);
    De(h, t) ? h = new Date(t) : Ie(h, r) && (h = new Date(r)), o(h), i(h);
  }
}
function xo({ highlightedDate: n, selected: e, displayDate: t }) {
  return n || e.start || t || e || /* @__PURE__ */ new Date();
}
const Eo = "Cal__Slider-module__root", Mo = "Cal__Slider-module__slide", Ro = "Cal__Slider-module__wrapper", Yo = "Cal__Slider-module__arrow", ko = "Cal__Slider-module__arrowRight", Io = "Cal__Slider-module__arrowLeft", pe = {
  root: Eo,
  slide: Mo,
  wrapper: Ro,
  arrow: Yo,
  arrowRight: ko,
  arrowLeft: Io
}, Ao = "Cal__transition-module__enter", Po = "Cal__transition-module__enterActive", jo = "Cal__transition-module__leave", Fo = "Cal__transition-module__leaveActive", No = {
  enter: Ao,
  enterActive: Po,
  leave: jo,
  leaveActive: Fo
}, he = {
  LEFT: 0,
  RIGHT: 1
}, vr = ({ direction: n, onClick: e }) => /* @__PURE__ */ w.jsx(
  "div",
  {
    className: ne(pe.arrow, {
      [pe.arrowLeft]: n === he.LEFT,
      [pe.arrowRight]: n === he.RIGHT
    }),
    onClick: () => e(n),
    children: /* @__PURE__ */ w.jsx(
      "svg",
      {
        x: "0px",
        y: "0px",
        viewBox: "0 0 26 46",
        children: /* @__PURE__ */ w.jsx("path", { d: "M31.232233,34.767767 C32.2085438,35.7440777 33.7914562,35.7440777 34.767767,34.767767 C35.7440777,33.7914562 35.7440777,32.2085438 34.767767,31.232233 L14.767767,11.232233 C13.7914562,10.2559223 12.2085438,10.2559223 11.232233,11.232233 L-8.767767,31.232233 C-9.7440777,32.2085438 -9.7440777,33.7914562 -8.767767,34.767767 C-7.7914562,35.7440777 -6.2085438,35.7440777 -5.232233,34.767767 L12.9997921,16.5357418 L31.232233,34.767767 Z", id: "Shape", fill: "#FFF", transform: "translate(13.000000, 23.000000) rotate(90.000000) translate(-13.000000, -23.000000) " })
      }
    )
  }
);
class $o extends de {
  handleClick = (e) => {
    let { children: t, index: r, onChange: a } = this.props;
    switch (e) {
      case he.LEFT:
        r = Math.max(0, r - 1);
        break;
      case he.RIGHT:
        r = Math.min(r + 1, t.length);
        break;
      default:
        return;
    }
    a(r);
  };
  render() {
    const { children: e, index: t } = this.props;
    return /* @__PURE__ */ w.jsxs("div", { className: pe.root, children: [
      t !== 0 && /* @__PURE__ */ w.jsx(vr, { onClick: this.handleClick, direction: he.LEFT }),
      /* @__PURE__ */ w.jsx(
        xr,
        {
          className: pe.wrapper,
          component: "div",
          style: {
            transform: `translate3d(-${100 * t}%, 0, 0)`
          },
          transitionName: No,
          transitionEnterTimeout: 300,
          transitionLeaveTimeout: 300,
          children: kr.map(e, (r, a) => /* @__PURE__ */ w.jsx(
            "div",
            {
              className: pe.slide,
              style: { transform: `translateX(${100 * a}%)` },
              children: r
            },
            a
          ))
        }
      ),
      t !== e.length - 1 && /* @__PURE__ */ w.jsx(vr, { onClick: this.handleClick, direction: he.RIGHT })
    ] });
  }
}
const Ho = _e(({ renderSelection: n, setDisplayDate: e }) => ({
  renderSelection: (t, { scrollToDate: r, displayDate: a, ...o }) => {
    if (!t.length)
      return null;
    const i = t.sort(), l = t.indexOf(G(Q(a), "YYYY-MM-DD"));
    return /* @__PURE__ */ w.jsx(
      $o,
      {
        index: l !== -1 ? l : i.length - 1,
        onChange: (d) => e(
          i[d],
          () => setTimeout(() => r(i[d], 0, !0), 50)
        ),
        children: i.map((d) => be(d, {
          ...o,
          key: l,
          scrollToDate: r,
          shouldAnimate: !1
        }))
      }
    );
  }
})), zo = Ce(["selected"], (n) => ({
  isSelected: n.selected.indexOf(n.date) !== -1
})), Lo = ye(({ displayDate: n }) => ({
  selected: n ? Q(n) : null
})), Ko = Ae(
  Dt,
  ue("scrollDate", "setScrollDate", gr),
  ue("displayDate", "setDisplayDate", gr),
  _e(({
    DayComponent: n,
    HeaderComponent: e,
    YearsComponent: t
  }) => ({
    DayComponent: zo(n),
    HeaderComponent: Ho(e),
    YearsComponent: Lo(t)
  })),
  ye(({ displayDate: n, onSelect: e, setDisplayDate: t, scrollToDate: r, ...a }) => ({
    passThrough: {
      Day: {
        onClick: (o) => qo(o, { onSelect: e, setDisplayDate: t })
      },
      Header: {
        setDisplayDate: t
      },
      Years: {
        displayDate: n,
        onSelect: (o, i, l) => Wo(o, l),
        selected: n
      }
    },
    selected: a.selected.filter((o) => Or(o, a)).map((o) => G(o, "YYYY-MM-DD"))
  }))
);
function qo(n, { onSelect: e, setDisplayDate: t }) {
  e(n), t(n);
}
function Wo(n, e) {
  e(Q(n));
}
function gr({ selected: n }) {
  return n.length ? n[0] : /* @__PURE__ */ new Date();
}
function Qo(n, e) {
  const r = e.map((a) => G(a, "YYYY-MM-DD")).indexOf(G(n, "YYYY-MM-DD"));
  return r === -1 ? [...e, n] : [...e.slice(0, r), ...e.slice(r + 1)];
}
const Uo = _e(({ renderSelection: n }) => ({
  renderSelection: (e, t) => {
    if (!e || !e.start && !e.end)
      return null;
    if (e.start === e.end)
      return be(e.start, t);
    const r = t.locale && t.locale.headerFormat || "MMM Do";
    return /* @__PURE__ */ w.jsxs("div", { className: ie.range, style: { color: t.theme.headerColor }, children: [
      be(e.start, { ...t, dateFormat: r, key: "start", shouldAnimate: !1 }),
      be(e.end, { ...t, dateFormat: r, key: "end", shouldAnimate: !1 })
    ] });
  }
}));
let Rr = !1;
const vt = {
  END: 3,
  HOVER: 2,
  START: 1
}, Go = Ce(["selected"], ({ date: n, selected: e, theme: t }) => {
  const r = n >= e.start && n <= e.end, a = n === e.start, o = n === e.end, i = !(a && o), l = i && (a && { backgroundColor: t.accentColor } || o && { borderColor: t.accentColor });
  return {
    className: r && i && ne(K.range, {
      [K.start]: a,
      [K.betweenRange]: !a && !o,
      [K.end]: o
    }),
    isSelected: r,
    selectionStyle: l
  };
}), es = Ae(
  Dt,
  ue("scrollDate", "setScrollDate", Tr),
  ue("displayKey", "setDisplayKey", Tr),
  ue("selectionStart", "setSelectionStart", null),
  _e(({
    DayComponent: n,
    HeaderComponent: e,
    YearsComponent: t
  }) => ({
    DayComponent: Go(n),
    HeaderComponent: Uo(e)
  })),
  ye(({ displayKey: n, passThrough: e, selected: t, setDisplayKey: r, ...a }) => ({
    /* eslint-disable sort-keys */
    passThrough: {
      ...e,
      Day: {
        onClick: (o) => Vo(o, { selected: t, ...a }),
        handlers: {
          onMouseOver: !Rr && a.selectionStart ? (o) => Jo(o, { ...a }) : null
        }
      },
      Years: {
        selected: t && t[n],
        onSelect: (o) => Bo(o, { displayKey: n, selected: t, ...a })
      },
      Header: {
        onYearClick: (o, i, l) => r(l || "start")
      }
    },
    selected: {
      start: t && G(t.start, "YYYY-MM-DD"),
      end: t && G(t.end, "YYYY-MM-DD")
    }
  }))
);
function wt({ start: n, end: e }) {
  return De(n, e) ? { start: n, end: e } : { start: e, end: n };
}
function Vo(n, { onSelect: e, selected: t, selectionStart: r, setSelectionStart: a }) {
  r ? (e({
    eventType: vt.END,
    ...wt({
      start: r,
      end: n
    })
  }), a(null)) : (e({ eventType: vt.START, start: n, end: n }), a(n));
}
function Jo(n, { onSelect: e, selectionStart: t }) {
  const r = n.target.getAttribute("data-date"), a = r && Q(r);
  a && e({
    eventType: vt.HOVER,
    ...wt({
      start: t,
      end: a
    })
  });
}
function Bo(n, { displayKey: e, onSelect: t, selected: r, setScrollDate: a }) {
  a(n), t(
    wt(
      Object.assign({}, r, { [e]: Q(n) })
    )
  );
}
function Tr({ selected: n }) {
  return n && n.start || /* @__PURE__ */ new Date();
}
typeof window < "u" && window.addEventListener("touchstart", function n() {
  Rr = !0, window.removeEventListener("touchstart", n, !1);
});
class ts extends me {
  static defaultProps = {
    Component: To(_o),
    interpolateSelection: (e) => e
  };
  state = {
    selected: typeof this.props.selected < "u" ? this.props.selected : /* @__PURE__ */ new Date()
  };
  UNSAFE_componentWillReceiveProps({ selected: e }) {
    e !== this.props.selected && this.setState({ selected: e });
  }
  handleSelect = (e) => {
    const { onSelect: t, interpolateSelection: r } = this.props;
    typeof t == "function" && t(e), this.setState({ selected: r(e, this.state.selected) });
  };
  render() {
    const { Component: e, interpolateSelection: t, ...r } = this.props;
    return /* @__PURE__ */ w.jsx(
      e,
      {
        ...r,
        onSelect: this.handleSelect,
        selected: this.state.selected
      }
    );
  }
}
export {
  _o as Calendar,
  vt as EVENT_TYPE,
  ts as default,
  Qo as defaultMultipleDateInterpolation,
  To as withDateSelection,
  Zo as withKeyboardSupport,
  Ko as withMultipleDates,
  es as withRange
};
