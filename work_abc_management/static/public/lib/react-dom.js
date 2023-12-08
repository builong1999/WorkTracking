/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/react@18.2.0/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e={exports:{}},t={},r=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),c=Symbol.for("react.context"),i=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),l=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),y=Symbol.iterator;var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,m={};function x(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}function h(){}function v(e,t,r){this.props=e,this.context=t,this.refs=m,this.updater=r||d}x.prototype.isReactComponent={},x.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},x.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},h.prototype=x.prototype;var b=v.prototype=new h;b.constructor=v,_(b,x.prototype),b.isPureReactComponent=!0;var S=Array.isArray,E=Object.prototype.hasOwnProperty,R={current:null},C={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var o,u={},s=null,a=null;if(null!=t)for(o in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(s=""+t.key),t)E.call(t,o)&&!C.hasOwnProperty(o)&&(u[o]=t[o]);var c=arguments.length-2;if(1===c)u.children=n;else if(1<c){for(var i=Array(c),f=0;f<c;f++)i[f]=arguments[f+2];u.children=i}if(e&&e.defaultProps)for(o in c=e.defaultProps)void 0===u[o]&&(u[o]=c[o]);return{$$typeof:r,type:e,key:s,ref:a,props:u,_owner:R.current}}function $(e){return"object"==typeof e&&null!==e&&e.$$typeof===r}var k=/\/+/g;function g(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function O(e,t,o,u,s){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var c=!1;if(null===e)c=!0;else switch(a){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case r:case n:c=!0}}if(c)return s=s(c=e),e=""===u?"."+g(c,0):u,S(s)?(o="",null!=e&&(o=e.replace(k,"$&/")+"/"),O(s,t,o,"",(function(e){return e}))):null!=s&&($(s)&&(s=function(e,t){return{$$typeof:r,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(s,o+(!s.key||c&&c.key===s.key?"":(""+s.key).replace(k,"$&/")+"/")+e)),t.push(s)),1;if(c=0,u=""===u?".":u+":",S(e))for(var i=0;i<e.length;i++){var f=u+g(a=e[i],i);c+=O(a,t,o,f,s)}else if(f=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=y&&e[y]||e["@@iterator"])?e:null}(e),"function"==typeof f)for(e=f.call(e),i=0;!(a=e.next()).done;)c+=O(a=a.value,t,o,f=u+g(a,i++),s);else if("object"===a)throw t=String(e),Error("Objects are not valid as a React child (found: "+("[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return c}function j(e,t,r){if(null==e)return e;var n=[],o=0;return O(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function I(e){if(-1===e._status){var t=e._result;(t=t()).then((function(t){0!==e._status&&-1!==e._status||(e._status=1,e._result=t)}),(function(t){0!==e._status&&-1!==e._status||(e._status=2,e._result=t)})),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status)return e._result.default;throw e._result}var P={current:null},T={transition:null},D={ReactCurrentDispatcher:P,ReactCurrentBatchConfig:T,ReactCurrentOwner:R};t.Children={map:j,forEach:function(e,t,r){j(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return j(e,(function(){t++})),t},toArray:function(e){return j(e,(function(e){return e}))||[]},only:function(e){if(!$(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=x,t.Fragment=o,t.Profiler=s,t.PureComponent=v,t.StrictMode=u,t.Suspense=f,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=D,t.cloneElement=function(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=_({},e.props),u=e.key,s=e.ref,a=e._owner;if(null!=t){if(void 0!==t.ref&&(s=t.ref,a=R.current),void 0!==t.key&&(u=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(i in t)E.call(t,i)&&!C.hasOwnProperty(i)&&(o[i]=void 0===t[i]&&void 0!==c?c[i]:t[i])}var i=arguments.length-2;if(1===i)o.children=n;else if(1<i){c=Array(i);for(var f=0;f<i;f++)c[f]=arguments[f+2];o.children=c}return{$$typeof:r,type:e.type,key:u,ref:s,props:o,_owner:a}},t.createContext=function(e){return(e={$$typeof:c,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null}).Provider={$$typeof:a,_context:e},e.Consumer=e},t.createElement=w,t.createFactory=function(e){var t=w.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:i,render:e}},t.isValidElement=$,t.lazy=function(e){return{$$typeof:p,_payload:{_status:-1,_result:e},_init:I}},t.memo=function(e,t){return{$$typeof:l,type:e,compare:void 0===t?null:t}},t.startTransition=function(e){var t=T.transition;T.transition={};try{e()}finally{T.transition=t}},t.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},t.useCallback=function(e,t){return P.current.useCallback(e,t)},t.useContext=function(e){return P.current.useContext(e)},t.useDebugValue=function(){},t.useDeferredValue=function(e){return P.current.useDeferredValue(e)},t.useEffect=function(e,t){return P.current.useEffect(e,t)},t.useId=function(){return P.current.useId()},t.useImperativeHandle=function(e,t,r){return P.current.useImperativeHandle(e,t,r)},t.useInsertionEffect=function(e,t){return P.current.useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return P.current.useLayoutEffect(e,t)},t.useMemo=function(e,t){return P.current.useMemo(e,t)},t.useReducer=function(e,t,r){return P.current.useReducer(e,t,r)},t.useRef=function(e){return P.current.useRef(e)},t.useState=function(e){return P.current.useState(e)},t.useSyncExternalStore=function(e,t,r){return P.current.useSyncExternalStore(e,t,r)},t.useTransition=function(){return P.current.useTransition()},t.version="18.2.0",e.exports=t;var V=e.exports,L=e.exports.Children,F=e.exports.Component,U=e.exports.Fragment,A=e.exports.Profiler,N=e.exports.PureComponent,M=e.exports.StrictMode,q=e.exports.Suspense,z=e.exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,B=e.exports.cloneElement,H=e.exports.createContext,W=e.exports.createElement,Y=e.exports.createFactory,G=e.exports.createRef,J=e.exports.forwardRef,K=e.exports.isValidElement,Q=e.exports.lazy,X=e.exports.memo,Z=e.exports.startTransition,ee=e.exports.unstable_act,te=e.exports.useCallback,re=e.exports.useContext,ne=e.exports.useDebugValue,oe=e.exports.useDeferredValue,ue=e.exports.useEffect,se=e.exports.useId,ae=e.exports.useImperativeHandle,ce=e.exports.useInsertionEffect,ie=e.exports.useLayoutEffect,fe=e.exports.useMemo,le=e.exports.useReducer,pe=e.exports.useRef,ye=e.exports.useState,de=e.exports.useSyncExternalStore,_e=e.exports.useTransition,me=e.exports.version;export{L as Children,F as Component,U as Fragment,A as Profiler,N as PureComponent,M as StrictMode,q as Suspense,z as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,B as cloneElement,H as createContext,W as createElement,Y as createFactory,G as createRef,V as default,J as forwardRef,K as isValidElement,Q as lazy,X as memo,Z as startTransition,ee as unstable_act,te as useCallback,re as useContext,ne as useDebugValue,oe as useDeferredValue,ue as useEffect,se as useId,ae as useImperativeHandle,ce as useInsertionEffect,ie as useLayoutEffect,fe as useMemo,le as useReducer,pe as useRef,ye as useState,de as useSyncExternalStore,_e as useTransition,me as version};
//# sourceMappingURL=/sm/05493e5ece49a3c57b92efb8a713f3d2b3e6902605bd646ed17d05a0bff80fe7.map