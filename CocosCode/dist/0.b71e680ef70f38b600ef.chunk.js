webpackJsonp([0],{

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(53)

var Component = __webpack_require__(19)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(58),
  /* scopeId */
  "data-v-649cd321",
  /* cssModules */
  null
)
Component.options.__file = "D:\\lx\\git\\github\\yongwang\\CocosCode\\src\\views\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-649cd321", Component.options)
  } else {
    hotAPI.reload("data-v-649cd321", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

//
//
//
//

var debounce = __webpack_require__(54);
var monacoLoader = __webpack_require__(61);

module.exports = {
  props: {
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '100%' },
    code: { type: String, default: '// code \n' },
    srcPath: { type: String },
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'vs-dark' }, // vs, hc-black
    options: { type: Object, default: function _default() {} },
    highlighted: { type: Array, default: function _default() {
        return [{
          number: 0,
          class: ''
        }];
      } },
    changeThrottle: { type: Number, default: 0 }
  },
  mounted: function mounted() {
    this.fetchEditor();
  },
  destroyed: function destroyed() {
    this.destroyMonaco();
  },

  computed: {
    style: function style() {
      var width = this.width,
          height = this.height;

      var fixedWidth = width.toString().indexOf('%') !== -1 ? width : width + 'px';
      var fixedHeight = height.toString().indexOf('%') !== -1 ? height : height + 'px';
      return {
        width: fixedWidth,
        height: fixedHeight
      };
    },
    editorOptions: function editorOptions() {
      return Object.assign({}, this.defaults, this.options, {
        value: this.code,
        language: this.language,
        theme: this.theme
      });
    }
  },
  data: function data() {
    return {
      defaults: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: false,
        glyphMargin: true
      }
    };
  },

  watch: {
    highlighted: {
      handler: function handler(lines) {
        this.highlightLines(lines);
      },

      deep: true
    }
  },
  methods: {
    highlightLines: function highlightLines(lines) {
      var _this = this;

      if (!this.editor) {
        return;
      }
      lines.forEach(function (line) {
        var className = line.class;
        var highlighted = _this.$el.querySelector('.' + className);

        if (highlighted) {
          highlighted.classList.remove(className);
        }

        var number = parseInt(line.number);
        if (!_this.editor && number < 1 || isNaN(number)) {
          return;
        }

        var selectedLine = _this.$el.querySelector('.view-lines [linenumber="' + number + '"]');
        if (selectedLine) {
          selectedLine.classList.add(className);
        }
      });
    },
    editorHasLoaded: function editorHasLoaded(editor, monaco) {
      var _this2 = this;

      this.editor = editor;
      this.monaco = monaco;
      this.editor.onDidChangeModelContent(function (event) {
        return _this2.codeChangeHandler(editor, event);
      });
      this.$emit('mounted', editor);
    },

    codeChangeHandler: function codeChangeHandler(editor) {
      if (this.codeChangeEmitter) {
        this.codeChangeEmitter(editor);
      } else {
        this.codeChangeEmitter = debounce(function (editor) {
          this.$emit('codeChange', editor);
        }, this.changeThrottle);
        this.codeChangeEmitter(editor);
      }
    },
    fetchEditor: function fetchEditor() {
      monacoLoader.load(this.srcPath, this.createMonaco);
    },
    createMonaco: function createMonaco() {
      this.editor = window.monaco.editor.create(this.$el, this.editorOptions);
      this.editorHasLoaded(this.editor, window.monaco);
    },
    destroyMonaco: function destroyMonaco() {
      if (typeof this.editor !== 'undefined') {
        this.editor.dispose();
      }
    }
  }
};

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_monaco_editor__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_monaco_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_monaco_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qrcode__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_qrcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_qrcode__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		MonacoEditor: __WEBPACK_IMPORTED_MODULE_0_vue_monaco_editor___default.a, QRCode: __WEBPACK_IMPORTED_MODULE_1_qrcode___default.a
	},
	data: function data() {
		return {
			host: window.location.host,
			options: {
				selectOnLineNumbers: false
			},
			i0: 0,
			i1: 0,
			codeArry: [{
				name: '0',
				title: '开始',
				icon: 'ios-navigate',
				items: [{
					name: '0-0',
					title: 'RichText',
					code: ['function x() {', '\tconsole.log("Hello!1111111111111111");', '}'].join('\n'),
					gameurl: 'games/RichText/web-mobile/index.html'
				}, {
					name: '0-1',
					title: 'Action',
					code: ['function x() {', '\tconsole.log("Hello 2222222222222!");', '}'].join('\n'),
					gameurl: 'games/Action/web-mobile/index.html'
				}]
			}, {
				name: '1',
				title: '微信小游戏',
				icon: 'ios-navigate',
				items: [{
					name: '1-0',
					title: 'Toast',
					code: ['function x() {', '\tconsole.log("Hello 33333333333!");', '}'].join('\n'),
					gameurl: 'games/RichText/web-mobile/index.html'
				}, {
					name: '1-1',
					title: 'Action',
					code: ['function x() {', '\tconsole.log("Hello 444444444444444!");', '}'].join('\n'),
					gameurl: 'games/Action/web-mobile/index.html'
				}]
			}],
			showQr: false

		};
	},

	methods: {
		onMounted: function onMounted(editor) {
			this.editor = editor;
		},
		onCodeChange: function onCodeChange(editor) {
			// console.log(this.editor.getValue());
		},
		clickTopItem: function clickTopItem(e) {
			switch (e) {
				case '1':
					this.$Message.warning('开发中...');
					break;
				case '2':
					this.$Message.warning('开发中...');
					break;
				case '3':
					window.open("https://github.com/laixiao/yongwang");
					break;
				case '4':
					this.$Message.warning('开发中...');
					break;

				default:
					break;
			}
		},
		clickItem: function clickItem(e) {
			// console.log("=========", e);
			var arry = e.split('-');
			this.i0 = parseInt(arry[0]);
			this.i1 = parseInt(arry[1]);
			this.editor.setValue(this.codeArry[this.i0].items[this.i1].code);
		},
		reset: function reset() {
			this.editor.setValue(this.codeArry[this.i0].items[this.i1].code);
			this.$Message.success('重置成功');
		},
		downloadbt: function downloadbt() {
			window.open('https://laixiao.github.io/yongwang/CocosCode/zip/RichText.zip');
		},
		preview_bt: function preview_bt() {
			if (this.showQr) {
				this.showQr = false;
			} else {
				this.showQr = true;
				this.$Notice.open({
					title: '打开手机，扫码预览'
				});
				var txt = 'https://' + this.host + '/yongwang/CocosCode/' + this.codeArry[this.i0].items[this.i1].gameurl;
				__WEBPACK_IMPORTED_MODULE_1_qrcode___default.a.toCanvas(document.getElementById('qr_canvas'), txt, function (error) {
					if (error) {
						console.error(error);
					}
				});
			}
		},

		onCopy: function onCopy(e) {
			this.$Message.success('复制成功');
		},
		onError: function onError(e) {
			this.$Message.error('复制失败,请刷新重试');
		}

	}
});

/***/ }),

/***/ 53:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8e11a61bb3759f7708d76036ba24bd49.png";

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "61170e9c927869a385f48d14186ea80c.png";

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(19)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(59),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\lx\\git\\github\\yongwang\\CocosCode\\node_modules\\vue-monaco-editor\\src\\Monaco.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Monaco.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b792962e", Component.options)
  } else {
    hotAPI.reload("data-v-b792962e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout"
  }, [_c('Layout', [_c('Header', {
    staticStyle: {
      "background": "black"
    }
  }, [_c('Menu', {
    staticClass: "Menu",
    attrs: {
      "mode": "horizontal",
      "theme": "dark",
      "active-name": "0"
    },
    on: {
      "on-select": _vm.clickTopItem
    }
  }, [_c('img', {
    staticClass: "layout-logo",
    attrs: {
      "src": __webpack_require__(55)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "layout-nav"
  }, [_c('MenuItem', {
    attrs: {
      "name": "1"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-cloud-upload"
    }
  }), _vm._v(" 贡献代码片\n\t\t\t\t\t")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "2"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-book"
    }
  }), _vm._v(" 极简API\n\t\t\t\t\t")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "3"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "logo-github"
    }
  }), _vm._v(" Github\n\t\t\t\t\t")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "4"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-heart"
    }
  }), _vm._v(" 支持\n\t\t\t\t\t")], 1)], 1)])], 1), _vm._v(" "), _c('Layout', [_c('Sider', {
    staticClass: "sider-left",
    style: ({
      background: '#fff'
    }),
    attrs: {
      "hide-trigger": ""
    }
  }, [_c('Menu', {
    attrs: {
      "theme": "light",
      "width": "200px",
      "open-names": ['0'],
      "active-name": "0-0"
    },
    on: {
      "on-select": _vm.clickItem
    }
  }, [_c('Input', {
    staticClass: "sider-search",
    attrs: {
      "search": "",
      "placeholder": "输入关键字"
    }
  }), _vm._v(" "), _vm._l((_vm.codeArry), function(item, index) {
    return _c('Submenu', {
      attrs: {
        "name": item.name
      }
    }, [_c('template', {
      slot: "title"
    }, [_c('Icon', {
      attrs: {
        "type": item.icon
      }
    }), _vm._v("\n\t\t\t\t\t\t\t" + _vm._s(item.title) + "\n\t\t\t\t\t\t")], 1), _vm._v(" "), _vm._l((item.items), function(item2, index2) {
      return _c('MenuItem', {
        attrs: {
          "name": item2.name
        }
      }, [_vm._v(_vm._s(item2.title))])
    })], 2)
  })], 2)], 1), _vm._v(" "), _c('Layout', {
    style: ({
      padding: '0 0px 10px'
    })
  }, [_c('div', {
    staticClass: "topbar"
  }, [_c('Breadcrumb', {
    staticClass: "topbar_tab1"
  }, [_c('BreadcrumbItem', {
    attrs: {
      "to": "/"
    }
  }, [_c('Icon', {
    attrs: {
      "type": _vm.codeArry[_vm.i0].icon
    }
  }), _vm._v(" " + _vm._s(_vm.codeArry[_vm.i0].title))], 1), _vm._v(" "), _c('BreadcrumbItem', [_vm._v(" " + _vm._s(_vm.codeArry[_vm.i0].items[_vm.i1].title))])], 1), _vm._v(" "), _c('div', {
    staticClass: "topbar_tab2"
  }, [_c('Button', {
    staticStyle: {
      "margin-right": "20px"
    },
    attrs: {
      "type": "primary",
      "shape": "circle",
      "icon": "md-refresh"
    },
    on: {
      "click": _vm.reset
    }
  }, [_vm._v("重置")]), _vm._v(" "), _c('Button', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: (_vm.onCopy),
      expression: "onCopy",
      arg: "success"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:error",
      value: (_vm.onError),
      expression: "onError",
      arg: "error"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.codeArry[_vm.i0].items[_vm.i1].code),
      expression: "codeArry[i0].items[i1].code",
      arg: "copy"
    }],
    attrs: {
      "type": "primary",
      "shape": "circle",
      "icon": "md-copy"
    }
  }, [_vm._v("一键复制")]), _vm._v(" "), _c('div', {
    staticClass: "topbar_tab2_qr"
  }, [_c('Button', {
    attrs: {
      "type": "dashed"
    },
    on: {
      "click": _vm.preview_bt
    }
  }, [_c('Icon', {
    attrs: {
      "type": "md-qr-scanner"
    }
  }), _vm._v(" 预览二维码")], 1)], 1)], 1)], 1), _vm._v(" "), _c('Content', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "content_d1"
  }, [_c('MonacoEditor', {
    attrs: {
      "height": "600",
      "language": "typescript",
      "theme": "vs",
      "code": _vm.codeArry[_vm.i0].items[_vm.i1].code,
      "editorOptions": _vm.options
    },
    on: {
      "mounted": _vm.onMounted,
      "codeChange": _vm.onCodeChange
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "content_d2"
  }, [_c('img', {
    staticClass: "content_d2_img",
    attrs: {
      "src": __webpack_require__(56)
    }
  }), _vm._v(" "), _c('iframe', {
    staticClass: "iframe",
    attrs: {
      "src": 'http://' + _vm.host + '/' + _vm.codeArry[_vm.i0].items[_vm.i1].gameurl
    }
  }), _vm._v(" "), _c('Button', {
    staticClass: "download-bt",
    attrs: {
      "icon": "ios-download-outline",
      "type": "info",
      "shape": "circle"
    },
    on: {
      "click": _vm.downloadbt
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showQr),
      expression: "showQr"
    }],
    staticClass: "qr_div",
    on: {
      "click": _vm.preview_bt
    }
  }, [_c('canvas', {
    attrs: {
      "id": "qr_canvas"
    }
  })])], 1)])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-649cd321", module.exports)
  }
}

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: (_vm.style)
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b792962e", module.exports)
  }
}

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var monaco = __webpack_require__(57)

module.exports = monaco


/***/ }),

/***/ 61:
/***/ (function(module, exports) {

module.exports = {
  /* For now: default to cdn. */
  load(srcPath = 'https://as.alipayobjects.com/g/cicada/monaco-editor-mirror/0.6.1/min', callback) {
    if (window.monaco) {
      callback();
      return;
    }
    const config = {
      paths: {
        vs: srcPath + '/vs'
      }
    };
    const loaderUrl = `${config.paths.vs}/loader.js`;
    const onGotAmdLoader = () => {

      if (window.LOADER_PENDING) {
        window.require.config(config);
      }

      // Load monaco
      window.require(['vs/editor/editor.main'], () => {
        callback();
      });

      // Call the delayed callbacks when AMD loader has been loaded
      if (window.LOADER_PENDING) {
        window.LOADER_PENDING = false;
        const loaderCallbacks = window.LOADER_CALLBACKS;
        if (loaderCallbacks && loaderCallbacks.length) {
          let currentCallback = loaderCallbacks.shift();
          while (currentCallback) {
            currentCallback.fn.call(currentCallback.window);
            currentCallback = loaderCallbacks.shift();
          }
        }
      }
    };

    // Load AMD loader if necessary
    if (window.LOADER_PENDING) {
      // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
      //  delay to call callbacks except the first one
      window.LOADER_CALLBACKS = window.LOADER_CALLBACKS || [];
      window.LOADER_CALLBACKS.push({
        window: this,
        fn: onGotAmdLoader
      });
    } else {
      if (typeof window.require === 'undefined') {
        const loaderScript = window.document.createElement('script');
        loaderScript.type = 'text/javascript';
        loaderScript.src = loaderUrl;
        loaderScript.addEventListener('load', onGotAmdLoader);
        window.document.body.appendChild(loaderScript);
        window.LOADER_PENDING = true;
      } else {
        onGotAmdLoader();
      }
    }
  }
}


/***/ })

});