(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DecisionTable = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var assign = require('lodash.assign'),
    restParam = require('lodash.restparam');

/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return objectValue === undefined ? sourceValue : objectValue;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var defaults = restParam(function(args) {
  var object = args[0];
  if (object == null) {
    return object;
  }
  args.push(assignDefaults);
  return assign.apply(undefined, args);
});

module.exports = defaults;

},{"lodash.assign":2,"lodash.restparam":12}],2:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAssign = require('lodash._baseassign'),
    createAssigner = require('lodash._createassigner'),
    keys = require('lodash.keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"lodash._baseassign":3,"lodash._createassigner":5,"lodash.keys":8}],3:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"lodash._basecopy":4,"lodash.keys":8}],4:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],5:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":6,"lodash._isiterateecall":7,"lodash.restparam":12}],6:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],7:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],8:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? null : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":9,"lodash.isarguments":10,"lodash.isarray":11}],9:[function(require,module,exports){
/**
 * lodash 3.9.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = getNative;

},{}],10:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
}

module.exports = isArguments;

},{}],11:[function(require,module,exports){
/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/**
 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
 * In addition to special characters the forward slash is escaped to allow for
 * easier `eval` use and `Function` compilation.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  escapeRegExp(fnToString.call(hasOwnProperty))
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

/**
 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = isArray;

},{}],12:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],13:[function(require,module,exports){
'use strict';
/*global module: false, deps: true, require: false*/

if (typeof window === 'undefined') { var deps = require; }
else { var deps = window.deps; }

var State = deps('ampersand-state');
var Collection = deps('ampersand-collection');

var CellModel = State.extend({
  props: {
    value: 'string'
  },

  session: {
    editable: {
      type: 'boolean',
      default: true
    }
  },

  derived: {
    rule: {
      deps: [
        'collection',
        'collection.parent'
      ],
      fn: function () {
        return this.collection.parent;
      }
    },


    table: {
      deps: [
        'rule.collection',
        'rule.collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.rule.collection.parent;
      }
    },

    x: {
      deps: [
        'collection'
      ],
      cache: false,
      fn: function () {
        var cell = this;
        var cells = cell.collection;
        return cells.indexOf(cell);
      }
    },

    y: {
      deps: [
        'rule',
        'rule.collection'
      ],
      cache: false,
      fn: function () {
        var rules = this.rule.collection;
        return rules.indexOf(this.rule);
      }
    },

    focused: {
      deps: [
        'table',
        'table.x',
        'table.y',
        'x',
        'y'
      ],
      cache: false,
      fn: function () {
        return this.x === this.table.x && this.y === this.table.y;
      }
    },

    clauseDelta: {
      deps: [
        'table',
        'collection',
        'table.inputs',
        'table.outputs'
      ],
      fn: function () {
        var delta = this.collection.indexOf(this);
        var inputs = this.table.inputs.length;
        var outputs = this.table.inputs.length + this.table.outputs.length;

        if (delta < inputs) {
          return delta;
        }
        else if (delta < outputs) {
          return delta - inputs;
        }

        return 0;
      }
    },

    type: {
      deps: [
        'table',
        'collection',
        'table.inputs',
        'table.outputs'
      ],
      cache: false,
      fn: function () {
        var delta = this.collection.indexOf(this);
        var inputs = this.table.inputs.length;
        var outputs = this.table.inputs.length + this.table.outputs.length;

        if (delta < inputs) {
          return 'input';
        }
        else if (delta < outputs) {
          return 'output';
        }

        return 'annotation';
      }
    },

    clause: {
      deps: [
        'table',
        'collection',
        'collection.length',
        'type',
        'clauseDelta'
      ],
      cache: false,
      fn: function () {
        if (this.clauseDelta < 0 || this.type === 'annotation') { return; }
        var clause = this.table[this.type +'s'].at(this.clauseDelta);
        return clause;
      }
    },

    choices: {
      deps: [
        'table',
        'collection.length',
        'type',
        'clause',
        'clauseDelta'
      ],
      cache: false,
      fn: function () {
        if (!this.clause || !this.clause.choices) { return; }
        return this.clause.choices.map(function (val) {
          return {value: val};
        });
      }
    }
  }
});

module.exports = {
  Model: CellModel,
  Collection: Collection.extend({
    model: CellModel
  })
};

},{}],14:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var merge = deps('lodash.merge');


var ChoiceView = require('./choice-view');
var RuleCellView = View.extend(merge({}, ChoiceView.prototype, {
  template: '<td><span contenteditable></span></td>',

  bindings: merge({}, ChoiceView.prototype.bindings, {
    'model.value': {
      type: 'text',
      selector: '[contenteditable]'
    },

    'model.editable': {
      type: 'booleanAttribute',
      name: 'contenteditable',
      selector: '[contenteditable]'
    },

    'model.spellchecked': {
      type: 'booleanAttribute',
      name: 'spellcheck',
      selector: '[contenteditable]'
    },

    'model.type': {
      type: 'class'
    }
  }),

  events: merge({}, ChoiceView.prototype.events, {
    'contextmenu':                    '_handleContextMenu',
    'contextmenu [contenteditable]':  '_handleContextMenu',
    'click':                          '_handleClick',
    'click [contenteditable]':        '_handleClick'
  }),

  _focusPseudo: function () {
    var el = this.editableEl();
    if (!el) {
      return;
    }

    el.focus();

    if (el.select) {
      el.select();
    }
  },

  _handleFocus: function () {
    ChoiceView.prototype._handleFocus.apply(this, arguments);

    var table = this.model.table;
    var cell = this.model;
    var cells = cell.collection;
    var rule = cells.parent;
    var rules = table.rules;

    var x = cells.indexOf(cell);
    var y = rules.indexOf(rule);

    if (table.x !== x || table.y !== y) {
      table.set({
        x: x,
        y: y
      }, {
        // silent: true
      });
      table.trigger('change:focus');
    }

    this.parent.parent.hideContextMenu();
  },

  _handleClick: function () {
    this.parent.parent.hideContextMenu();
    this._focusPseudo();
  },

  _handleContextMenu: function (evt) {
    this.parent.parent.showContextMenu(this.model, evt);
  },

  setFocus: function () {
    if (!this.el) { return; }

    if (this.model.focused) {
      this.el.classList.add('focused');

      if (this.parent.parent.contextMenu) {
        this.parent.parent.contextMenu.close();
      }

      if (this.parent.parent.clauseValuesEditor) {
        this.parent.parent.clauseValuesEditor.hide();
      }

      if (Element.prototype.contains && document.activeElement.contains(this.editableEl())) {
        this._focusPseudo();
      }
    }
    else {
      this.el.classList.remove('focused');
    }

    if (this.model.x === this.model.table.x) {
      this.el.classList.add('col-focused');
    }
    else {
      this.el.classList.remove('col-focused');
    }

    if (this.model.y === this.model.table.y) {
      this.el.classList.add('row-focused');
    }
    else {
      this.el.classList.remove('row-focused');
    }
  },

  initialize: function () {
    this.on('change:el', this.setFocus);
    this.listenToAndRun(this.model.table, 'change:focus', this.setFocus);
  }
}));



var RuleInputCellView = RuleCellView.extend({});

var RuleOutputCellView = RuleCellView.extend({});

var RuleAnnotationCellView = RuleCellView.extend({});



module.exports = {
  Cell:       RuleCellView,
  Input:      RuleInputCellView,
  Output:     RuleOutputCellView,
  Annotation: RuleAnnotationCellView
};

},{"./choice-view":15}],15:[function(require,module,exports){
'use strict';
/* global deps: false, require: false, module: false */
var View = deps('ampersand-view');

var SuggestionsView = require('./suggestions-view');

var suggestionsView = SuggestionsView.instance();

var specialKeys = [
  8 // backspace
];

var ChoiceView = View.extend({
  collections: {
    choices: SuggestionsView.Collection
  },

  events: {
    input: '_handleInput',
    'input [contenteditable]': '_handleInput',
    focus: '_handleFocus',
    'focus [contenteditable]': '_handleFocus'
  },

  session: {
    valid:          {
      default: true,
      type: 'boolean'
    },

    originalValue:  'string'
  },

  derived: {
    isOriginal: {
      deps: ['model.value', 'originalValue'],
      fn: function () {
        return this.model.value === this.originalValue;
      }
    }
  },

  bindings: {
    'model.value': {
      type: function (el, value) {
        if (!value || !value.trim()) { return; }
        this.el.textContent = value.trim();
      }
    },

    'model.focused': {
      type: 'booleanClass',
      name: 'focused'
    },

    isOriginal: {
      type: 'booleanClass',
      name: 'untouched'
    }
  },

  editableEl: function () {
    return this.query('[contenteditable]') || this.el;
  },

  initialize: function (options) {
    options = options || {};
    if (this.el) {
      this.el.contentEditable = true;
      this.el.spellcheck = false;
      this.originalValue = this.value = this.el.textContent.trim();
    }
    else {
      this.originalValue = this.value;
    }


    this.listenToAndRun(this.model, 'change:choices', function () {
      var choices = this.model.choices;
      if (!this.choices) {
        return;
      }
      if (!choices) {
        choices = [];
      }

      this.choices.reset(choices.map(function (choice) {
        return {value: choice};
      }));
    });

    this.suggestions = new SuggestionsView.Collection({
      parent: this.choices
    });
  },

  _filter: function (val) {
    var choices = this.model.choices || this.choices;
    var el = this.editableEl();
    var filtered = choices
          .filter(function (choice) {
            return choice.value.indexOf(val) === 0;
          })
          .map(function (choice) {
            var chars = el.textContent.length;
            var val = choice.escape ? choice.escape('value') : choice.value;
            var htmlStr = '<span class="highlighted">' + val.slice(0, chars) + '</span>';
            htmlStr += val.slice(chars);
            return {
              value: choice.value,
              html: htmlStr
            };
          }, this);
    return filtered;
  },

  _handleFocus: function () {
    this._handleInput();
  },

  _handleResize: function () {
    if (!this.el || !suggestionsView) { return; }
    var node = this.el;
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var helper = suggestionsView.el;

    while ((node = node.offsetParent)) {
      if (node.offsetTop) {
        top += parseInt(node.offsetTop, 10);
      }
      if (node.offsetLeft) {
        left += parseInt(node.offsetLeft, 10);
      }
    }

    top -= helper.clientHeight;
    helper.style.top = top;
    helper.style.left = left;
  },

  _handleInput: function (evt) {
    if (evt && (specialKeys.indexOf(evt.keyCode) > -1 || evt.ctrlKey)) {
      return;
    }
    var el = this.editableEl();
    var val = el.textContent.trim();

    var filtered = this._filter(val);
    suggestionsView.show(filtered, this);
    this._handleResize();

    if (filtered.length === 1) {
      if (evt) {
        evt.preventDefault();
      }

      var matching = filtered[0].value;
      this.model.set({
        value: matching
      }, {
        silent: true
      });
      el.textContent = matching;
    }
  }
});

module.exports = ChoiceView;

},{"./suggestions-view":31}],16:[function(require,module,exports){
'use strict';
/*global module: false, deps: true, require: false*/

if (typeof window === 'undefined') { var deps = require; }
else { var deps = window.deps; }

var State = deps('ampersand-state');
var Collection = deps('ampersand-collection');

var ClauseModel = State.extend({
  /*
  collections: {
    choices: Collection.extend({
      model: State.extend({
        props: {
          value: 'string'
        }
      })
    })
  },
  */
  
  props: {
    label:    'string',
    choices:  'array',
    mapping:  'string',
    datatype: {type: 'string', default: 'string'}
  },

  session: {
    editable: {
      type: 'boolean',
      default: true
    }
  }
});

module.exports = {
  Model: ClauseModel,
  Collection: Collection.extend({
    model: ClauseModel
  })
};

},{}],17:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var merge = deps('lodash.merge');
var contextViewsMixin = require('./context-views-mixin');


var LabelView = View.extend(merge({}, {
  events: {
    'focus':                          '_handleFocus',
    'focus [contenteditable]':        '_handleFocus',
    'click':                          '_handleFocus',
    'click [contenteditable]':        '_handleFocus',
    'input':                          '_handleInput',
    'input [contenteditable]':        '_handleInput',
    'contextmenu':                    '_handleContextMenu',
    'contextmenu [contenteditable]':  '_handleContextMenu',
  },

  derived: merge({}, contextViewsMixin, {
    table: {
      deps: [
        'model',
        'model.collection',
        'model.collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.model.collection.parent;
      }
    }
  }),

  bindings: {
    'model.label': {
      type: function (el, val) {
        var editable = this.editableEl();
        if (document.activeElement === editable) { return; }
        editable.textContent = (val || '').trim();
      }
    }
  },

  editableEl: function () {
    return this.query('[contenteditable]') || this.el;
  },

  _handleFocus: function () {
    this.table.x = this.model.x;
    this.table.trigger('change:focus');
  },

  _handleInput: function () {
    this.model.label = this.editableEl().textContent.trim();
    this._handleFocus();
  },

  _handleContextMenu: function (evt) {
    var type = this.model.clauseType;
    var table = this.table;
    this._handleFocus();

    var addMethod = type === 'input' ? 'addInput' : 'addOutput';

    this.contextMenu.open({
      parent: this,
      top: evt.pageY,
      left: evt.pageX,
      commands: [
        {
          label: type === 'input' ? 'Input' : 'Output',
          icon: type,
          subcommands: [
            {
              label: 'add',
              icon: 'plus',
              fn: function () {
                table[addMethod]();
              },
              subcommands: [
                {
                  label: 'before',
                  icon: 'left',
                  fn: function () {
                    table[addMethod]();
                  }
                },
                {
                  label: 'after',
                  icon: 'right',
                  fn: function () {
                    table[addMethod]();
                  }
                }
              ]
            },
            {
              label: 'copy',
              // icon: 'plus',
              fn: function () {},
              subcommands: [
                {
                  label: 'before',
                  icon: 'left',
                  fn: function () {}
                },
                {
                  label: 'after',
                  icon: 'right',
                  fn: function () {}
                }
              ]
            },
            {
              label: 'move',
              // icon: 'plus',
              fn: function () {},
              subcommands: [
                {
                  label: 'before',
                  icon: 'left',
                  fn: function () {}
                },
                {
                  label: 'after',
                  icon: 'right',
                  fn: function () {}
                }
              ]
            },
            {
              label: 'remove',
              icon: 'minus',
              fn: function () {}
            }
          ]
        }
      ]
    });

    try {
      evt.preventDefault();
    } catch (e) {}
  },

  initialize: function () {
    var editable = document.createElement('span');
    editable.setAttribute('contenteditable', true);
    editable.textContent = (this.model.label || '').trim();
    this.el.innerHTML = '';
    this.el.appendChild(editable);
  }
}));


module.exports = LabelView;

},{"./context-views-mixin":23}],18:[function(require,module,exports){
'use strict';
/* global module: false, deps: false */

var View = deps('ampersand-view');
var merge = deps('lodash.merge');



var MappingView = View.extend(merge({}, {
  events: {
    'input': '_handleInput',
  },

  derived: {
    table: {
      deps: [
        'model',
        'model.collection',
        'model.collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.model.collection.parent;
      }
    }
  },

  bindings: {
    'model.mapping': {
      type: function (el, val) {
        if (document.activeElement === el) { return; }
        el.textContent = (val || '').trim();
      }
    }
  },

  _handleInput: function () {
    this.model.mapping = this.el.textContent.trim();
  },

  initialize: function () {
    this.el.setAttribute('contenteditable', true);
    this.el.textContent = (this.model.mapping || '').trim();
  }
}));

module.exports = MappingView;

},{}],19:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var merge = deps('lodash.merge');
var contextViewsMixin = require('./context-views-mixin');

var ValueView = View.extend(merge({}, {
  events: {
    'contextmenu':    '_handleContextMenu'
  },

  derived: merge({}, contextViewsMixin, {
    table: {
      deps: [
        'model',
        'model.collection',
        'model.collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.model.collection.parent;
      }
    }
  }),

  bindings: {
    'model.choices': {
      type: function (el) {
        this._renderContent(el);
      }
    },
    'model.datatype': {
      type: function (el) {
        this._renderContent(el);
      }
    }
  },

  _renderContent: function (el) {
    var str = '';
    var val = this.model.choices;
    if (Array.isArray(val) && val.length) {
      str = '(' + val.join(', ') + ')';
    }
    else {
      str = this.model.datatype;
    }
    el.textContent = str;
  },

  _handleContextMenu: function (evt) {
    if (evt.defaultPrevented) { return; }
    this.clauseValuesEditor.show(this.model.datatype, this.model.choices, this);
    evt.preventDefault();
  }
}));




module.exports = ValueView;

},{"./context-views-mixin":23}],20:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var LabelView = require('./clause-label-view');
var ValueView = require('./clause-value-view');
var MappingView = require('./clause-mapping-view');





var requiredElement = {
  type: 'element',
  required: true
};

var ClauseView = View.extend({
  session: {
    labelEl:    requiredElement,
    mappingEl:  requiredElement,
    valueEl:    requiredElement
  },

  derived: {
    table: {
      deps: [
        'model',
        'model.collection',
        'model.collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.model.collection.parent;
      }
    }
  },

  initialize: function () {
    var clause = this.model;
    var self = this;

    var subviews = {
      label:    LabelView,
      mapping:  MappingView,
      value:    ValueView
    };

    Object.keys(subviews).forEach(function (kind) {
      this.listenToAndRun(this.model, 'change:' + kind, function () {
        if (this[kind + 'View']) {
          this.stopListening(this[kind + 'View']);
        }

        this[kind + 'View'] = new subviews[kind]({
          parent: this,
          model:  clause,
          el:     this[kind + 'El']
        });
      });
    }, this);

    function tableChangeFocus() {
      if (self.model.focused) {
        self.labelEl.classList.add('col-focused');
        self.mappingEl.classList.add('col-focused');
        self.valueEl.classList.add('col-focused');
      }
      else {
        self.labelEl.classList.remove('col-focused');
        self.mappingEl.classList.remove('col-focused');
        self.valueEl.classList.remove('col-focused');
      }
    }
    this.table.on('change:focus', tableChangeFocus);
    tableChangeFocus();
  }
});




module.exports = ClauseView;

},{"./clause-label-view":17,"./clause-mapping-view":18,"./clause-value-view":19}],21:[function(require,module,exports){
'use strict';
/* global module: false, deps: false, require: false */

var View = deps('ampersand-view');
var Collection = deps('ampersand-collection');
var State = deps('ampersand-state');
var ComboBoxView = require('./combobox-view');



var ValuesCollection = Collection.extend({
  last: function () {
    return this.models[this.models.length - 1];
  },

  restripe: function () {
    var models = this.filter(function (model) {
      return model.value;
    });

    models.push({
      value: ''
    });

    this.reset(models);

    return this;
  },

  model: State.extend({
    props: {
      value: 'string'
    },

    initialize: function () {
      this.on('change:value', function () {
        this.collection.restripe();
      });
    }
  })
});

var ValuesItemView = View.extend({
  template: '<li><input tabindex="1" /></li>',

  session: {
    invalid: 'boolean'
  },

  bindings: {
    'model.value': {
      type: 'value',
      selector: 'input'
    },
    invalid: {
      type: 'booleanClass',
      name: 'invalid',
      selector: 'input'
    }
  },

  events: {
    'change input':   '_handleValueChange',
    'blur input':     '_handleValueChange',
    'keydown input':  '_handleValueKeydown',
    'keyup input':    '_handleValueKeyup'
  },

  _handleValueChange: function (evt) {
    if (this.model.value !== evt.target.value) {
      this.model.value = evt.target.value;
    }

    this.validate();
  },

  _handleValueKeydown: function (evt) {
    var code = evt.which || evt.keyCode;

    var collection = this.model.collection;
    var last = collection.last();

    if (last === this.model && evt.target.value) {
      collection.add({value: ''});
    }

    if (code === 9) {
      var inputs = this.parent.queryAll('.allowed-values input');
      var lastInput = inputs[inputs.length - 1];

      if (inputs.indexOf(evt.target) === (inputs.length - 2)) {
        lastInput.focus();
      }
    }
  },

  _handleValueKeyup: function (evt) {
    var collection = this.model.collection;
    var last = collection.last();

    if (last === this.model && evt.target.value) {
      collection.add({value: ''});
    }
  },

  validate: function () {
    var val = this.model.value;
    if (!val) {
      this.invalid = false;
      return this;
    }

    var cid = this.model.cid;
    var same = this.model.collection.filter(function (other) {
      return other.cid !== cid && other.value === val;
    });

    this.invalid = same.length > 0;

    return this;
  }
});







var DatatypesCollection = Collection.extend({
  mainIndex: 'value',
  model: State.extend({
    props: {
      value: 'string',
      offer: 'string'
    }
  })
});




var primitiveTypes = [
  {
    value: 'string',
    offer: 'choices'
  },
  {
    value: 'date',
    offer: 'range'
  },

  // https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html
  {
    value: 'short',
    offer: 'range'
  },
  {
    value: 'int',
    offer: 'range'
  },
  {
    value: 'long',
    offer: 'range'
  },
  {
    value: 'float',
    offer: 'range'
  },
  {
    value: 'double',
    offer: 'range'
  },

  {
    value: 'boolean'
  }
];


var ClauseValuesView = View.extend({
  template: '<div class="dmn-clausevalues-setter choices">' +
              '<div class="datatype">' +
              '</div>' +

              '<div class="allowed-values">' +
                '<label>Allowed values:</label>' +
                '<ul></ul>' +
              '</div>' +

              '<ul class="ranged-values">' +
                '<li class="min">' +
                  '<label>Min:</label>' +
                  '<input tabindex="1" />' +
                '</li>' +
                '<li class="max">' +
                  '<label>Max:</label>' +
                  '<input tabindex="2" />' +
                '</li>' +
              '</ul>' +
            '</div>',

  subviews: {
    datatypeView: {
      container: '.datatype',
      prepareView: function (el) {
        var comboboxView = new ComboBoxView({
          parent:     this,
          collection: this.datatypes,
          // value:      this.datatype,
          label:      'Type:',
          className:  el.className
        });

        var cbEl = comboboxView.render().el;
        el.parentNode.replaceChild(cbEl, el);

        this.listenTo(comboboxView, 'change:value', function () {
          this.datatype = comboboxView.value;
        });

        this.on('change:visible', function () {
          if (this.visible) {
            comboboxView.setVisible();
          }
          else {
            comboboxView.suggestionsEl.style.display = 'none';
          }
        });

        return comboboxView;
      }
    }
  },

  collections: {
    datatypes: DatatypesCollection,
    possibleValues: ValuesCollection
  },

  session: {
    visible: 'boolean',
    datatype: {type: 'string', default: 'string'}
  },

  derived: {
    contextMenu: {
      cache: false,
      fn: function () {
        var current = this;
        while ((current = current.parent)) {
          if (current.contextMenu) {
            return current.contextMenu;
          }
        }
      }
    }
  },

  bindings: {
    visible: {
      type: 'toggle'
    },
    datatype: {
      type: function(el, val, prev) {
        if (!this.datatypes.length) { return; }
        var type;

        if (prev) {
          type = this.datatypes.get(prev);
          if (type) {
            el.classList.remove(type.offer);
          }
        }

        if (val) {
          type = this.datatypes.get(val);
          if (type) {
            el.classList.add(type.offer);
          }
        }
      }
    }
  },

  events: {
    'change select': '_handleDatatypeChange'
  },

  _handleDatatypeChange: function () {
    this.datatype = this.datatypeEl.value;
  },

  initialize: function () {
    var self = this;

    function hasModel() {
      return self.parent && self.parent.model && self.parent.model.datatype;
    }

    this.on('change:datatype', function () {
      if (!hasModel()) { return; }

      this.parent.model.datatype = this.datatype;
    });

    this.listenTo(this.possibleValues, 'all', function () {
      if (!hasModel()) { return; }

      this.parent.model.choices = this.possibleValues
                                    .filter(function (item) {
                                      return item.value;
                                    })
                                    .map(function (item) {
                                      return item.value;
                                    });
    });
  },

  setPosition: function () {
    if (!this.parent || !this.parent.el) {
      this.visible = false;
      return;
    }

    var node = this.parent.el;
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var helper = this.el;

    while ((node = node.offsetParent)) {
      if (node.offsetTop) {
        top += parseInt(node.offsetTop, 10);
      }
      if (node.offsetLeft) {
        left += parseInt(node.offsetLeft, 10);
      }
    }

    left += this.parent.el.clientWidth;
    top -= 20;

    left += Math.min(document.body.clientWidth - (left + this.el.clientWidth), 0);
    top += Math.min(document.body.clientHeight - (top + this.el.clientHeight), 0);

    helper.style.position = 'absolute';
    helper.style.top = top +'px';
    helper.style.left = left +'px';


    if (this.datatypeView) {
      this.datatypeView.setPosition();
    }
  },

  show: function (datatype, values, parent) {
    if (parent && this.parent !== parent) {
      this.parent = parent;
    }

    this.datatypes.reset(primitiveTypes);

    if (this.datatype && !this.datatypeView.inputEl.value) {
      this.datatypeView.inputEl.value = this.datatype;
    }

    values = values || [];
    var vals = (Array.isArray(values) ? values.map(function (val) {
      return { value: val };
    }) : values.toJSON())
        .filter(function (item) {
          return item.value;
        });
    vals.push({ value: '' });

    this.possibleValues.reset(vals);

    instance.visible = true;
    if (this.parent && this.parent.contextMenu) {
      this.parent.contextMenu.close();
    }

    if (instance.visible) {
      this.setPosition();
    }

    return this;
  },

  hide: function () {
    this.visible = false;
    return this;
  },

  render: function () {
    this.renderWithTemplate();

    this.cacheElements({
      valuesEl:   'ul',

      minLabelEl: '.min label',
      minInputEl: '.min input',

      maxLabelEl: '.max label',
      maxInputEl: '.max input'
    });

    this.renderCollection(this.possibleValues, ValuesItemView, this.valuesEl);

    this.listenTo(this.possibleValues, 'change', function () {
      this.trigger('change');
    });

    return this;
  }
});



var instance;
ClauseValuesView.instance = function (suggestions, parent) {
  if (!instance) {
    instance = new ClauseValuesView({});
    instance.render();
  }

  if (!document.body.contains(instance.el)) {
    document.body.appendChild(instance.el);
  }

  instance.show(suggestions, parent);

  return instance;
};


if (typeof window !== 'undefined') {
  window.dmnClauseValuedEditor = ClauseValuesView.instance();
}

ClauseValuesView.Collection = ValuesCollection;

module.exports = ClauseValuesView;

},{"./combobox-view":22}],22:[function(require,module,exports){
'use strict';
/* global module: false, deps: false */

var View = deps('ampersand-view');
var Collection = deps('ampersand-collection');
var State = deps('ampersand-state');

function toArray(thing) {
  return Array.prototype.slice.apply(thing);
}

var SuggestionsCollection = Collection.extend({
  model: State.extend({
    props: {
      value: 'string',
      html: 'string'
    }
  })
});

var SuggestionView = View.extend({
  template: '<li tabindex="1"></li>',

  bindings: {
    'model.value': {
      type: 'text'
    // },
    // 'model.html': {
    //   type: 'innerHTML'
    }
  },

  events: {
    click:    '_handleClick',
    focus:    '_handleFocus',
    keydown:  '_handleKeydown'
  },

  _handleClick: function () {
    this.parent.inputEl.value = this.parent.value = this.model.value;
    this.parent.suggestionsEl.style.display = 'none';
  },

  _handleFocus: function () {
    this.parent.inputEl.value = this.parent.value = this.model.value;
  },

  _handleKeydown: function (evt) {
    var code = evt.which || evt.keyCode;
    if (code === 9) {
      var items = this.el.parentNode.querySelectorAll('li');
      items = toArray(items);
      var current = items.indexOf(evt.target);

      if (code === 9 || code === 40) {
        if (current >= items.length) { current = 0; }
      }
      else {
        current--;
        if (current < 0) { current = items.length - 1; }
      }

      items[current].focus();
    }
  }
});

var ComboBoxView = View.extend({
  template: '<div class="combobox"><label></label><input tabindex="0" /></div>',

  collections: {
    suggestions: SuggestionsCollection
  },

  session: {
    value:      'string',
    label:      'string',
    className:  'string'
  },

  bindings: {
    className: {
      type: 'class'
    },

    label: {
      type: 'text',
      selector: 'label'
    }
  },

  events: {
    'input input':    '_handleInput',
    'focus input':    '_handleFocus',
    'blur input':     '_handleBlur',
    'keydown input':  '_handleKeydown'
  },

  _handleFocus: function () {
    this.setPosition();

    if (!this.suggestions.length) {
      this.suggestions.reset(this.collection.toJSON());
    }

    if (this.inputEl.select) {
      this.inputEl.select();
    }
  },

  _handleBlur: function () {},

  _handleInput: function () {
    this.setPosition();
    this.value = this.inputEl.value.trim();
    this.suggestions.reset(this.filter());
  },

  _handleKeydown: function (evt) {
    var code = evt.which || evt.keyCode;
    if (code === 9 || code === 40) {
      this.suggestionsView.views[0].el.focus();
      evt.preventDefault();
    }
    else if (code === 27) { // esc
      this.suggestionsEl.style.display = 'none';
    }
  },

  filter: function () {
    var filtered = this.collection.filter(function (model) {
      return model.value.indexOf(this.value) > -1;
    }, this).map(function (model) {
      return model.toJSON();
    });
    return filtered;
  },

  initialize: function () {
    if (!this.collection) {
      throw new Error('ComboBoxView requires a collection option');
    }

    this.on('change:value', function () {
      if (!this.model || this.model.value === this.value) { return; }
      this.model.value = this.value;
    });
  },

  setPosition: function () {
    if (!this.parent || !this.parent.el) {
      this.visible = false;
      return;
    }

    var node = this.inputEl;
    var top = node.offsetTop + this.inputEl.clientHeight;
    var left = node.offsetLeft;
    var helper = this.suggestionsEl;

    while ((node = node.offsetParent)) {
      if (node.offsetTop) {
        top += parseInt(node.offsetTop, 10);
      }
      if (node.offsetLeft) {
        left += parseInt(node.offsetLeft, 10);
      }
    }

    helper.style.position = 'absolute';
    helper.style.top = top + 'px';
    helper.style.left = left + 'px';
    helper.style.width = this.inputEl.clientWidth + 'px';
  },

  setVisible: function () {
    var display = 'block';

    if (this.suggestions.length < 2) {
      display = 'none';
    }

    this.suggestionsEl.style.display = display;
    if (display === 'none') {
      return;
    }

    this.setPosition();

    if (document.activeElement === this.inputEl) {
      return;
    }

    this.suggestionsView.views.forEach(function (view, v) {
      if (v === 0) {
        view.el.focus();
      }
    });
  },

  render: function () {
    if (this.rendered) {
      return this;
    }
    this.renderWithTemplate();

    this.cacheElements({
      labelEl: 'label',
      inputEl: 'input'
    });

    this.labelEl.setAttribute('for', this.cid);
    this.inputEl.setAttribute('id', this.cid);

    if (this.value && !this.inputEl.value) {
      this.inputEl.value = this.value;
    }

    this.suggestionsEl = document.createElement('ul');
    this.suggestionsEl.className = 'combobox-suggestions';
    document.body.appendChild(this.suggestionsEl);

    this.suggestionsView = this.renderCollection(this.suggestions, SuggestionView, this.suggestionsEl);

    this.listenToAndRun(this.suggestions, 'all', this.setVisible);

    return this;
  },

  remove: function () {
    document.body.removeChild(this.suggestionsEl);
    View.prototype.remove.apply(this);
  }
});

module.exports = ComboBoxView;

},{}],23:[function(require,module,exports){
'use strict';
/*global module: false*/
module.exports = {
  clauseValuesEditor: {
    cache: false,
    fn: function () {
      var current = this;
      while ((current = current.parent)) {
        if (current.clauseValuesEditor) {
          return current.clauseValuesEditor;
        }
      }
    }
  },
  contextMenu: {
    cache: false,
    fn: function () {
      var current = this;
      while ((current = current.parent)) {
        if (current.contextMenu) {
          return current.contextMenu;
        }
      }
    }
  }
};

},{}],24:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var Collection = deps('ampersand-collection');
var State = deps('ampersand-state');


var defaultCommands = [
  // {
  //   label: 'Actions',
  //   subcommands: [
  //     {
  //       label: 'undo',
  //       icon: 'undo',
  //       fn: function () {}
  //     },
  //     {
  //       label: 'redo',
  //       icon: 'redo',
  //       fn: function () {}
  //     }
  //   ]
  // },
  {
    label: 'Cell',
    subcommands: [
      {
        label: 'clear',
        icon: 'clear',
        hint: 'Clear the content of the focused cell',
        possible: function () {
          // console.info('clear possible?', arguments, this);
        },
        fn: function () {}
      }
    ]
  },
  {
    label: 'Rule',
    icon: '',
    subcommands: [
      {
        label: 'add',
        icon: 'plus',
        fn: function () {
          this.parent.model.addRule(this.scope);
        }
      },
      {
        label: 'copy',
        icon: 'copy',
        fn: function () {
          this.parent.model.copyRule(this.scope);
        },
        subcommands: [
          {
            label: 'above',
            icon: 'above',
            hint: 'Copy the rule above the focused one',
            fn: function () {
              this.parent.model.copyRule(this.scope, -1);
            }
          },
          {
            label: 'below',
            icon: 'below',
            hint: 'Copy the rule below the focused one',
            fn: function () {
              this.parent.model.copyRule(this.scope, 1);
            }
          }
        ]
      },
      {
        label: 'remove',
        icon: 'minus',
        hint: 'Remove the focused rule',
        fn: function () {
          this.parent.model.removeRule(this.scope);
        }
      },
      {
        label: 'clear',
        icon: 'clear',
        hint: 'Clear the focused rule',
        fn: function () {
          this.parent.model.clearRule(this.scope);
        }
      }
    ]
  },
  {
    label: 'Input',
    icon: 'input',
    subcommands: [
      {
        label: 'add',
        icon: 'plus',
        subcommands: [
          {
            label: 'before',
            icon: 'left',
            hint: 'Add an input clause before the focused one',
            fn: function () {
              this.parent.model.addInput();
            }
          },
          {
            label: 'after',
            icon: 'right',
            hint: 'Add an input clause after the focused one',
            fn: function () {
              this.parent.model.addInput();
            }
          }
        ]
      },
      {
        label: 'remove',
        icon: 'minus',
        fn: function () {
          this.parent.model.removeInput();
        }
      }
    ]
  },
  {
    label: 'Output',
    icon: 'output',
    subcommands: [
      {
        label: 'add',
        icon: 'plus',
        subcommands: [
          {
            label: 'before',
            icon: 'left',
            hint: 'Add an output clause before the focused one',
            fn: function () {
              this.parent.model.addOutput();
            }
          },
          {
            label: 'after',
            icon: 'right',
            hint: 'Add an output clause after the focused one',
            fn: function () {
              this.parent.model.addOutput();
            }
          }
        ]
      },
      {
        label: 'remove',
        icon: 'minus',
        fn: function () {
          this.parent.model.removeOutput();
        }
      }
    ]
  }
];









var CommandModel = State.extend({
  props: {
    label: 'string',
    hint: 'string',
    icon: 'string',
    href: 'string',

    possible: {
      type: 'any',
      default: function () { return function () {}; },
      test: function (newValue) {
        if (typeof newValue !== 'function' && newValue !== false) {
          return 'must be either a function or false';
        }
      }
    },

    fn: {
      type: 'any',
      default: false,
      test: function (newValue) {
        if (typeof newValue !== 'function' && newValue !== false) {
          return 'must be either a function or false';
        }
      }
    }
  },

  derived: {
    disabled: {
      deps: ['possible'],
      cache: false,
      fn: function () {
        return typeof this.possible === 'function' ? !this.possible() : false;
      }
    }
  },

  subcommands: null,

  initialize: function (attributes) {
    this.subcommands = new CommandsCollection(attributes.subcommands || [], {
      parent: this
    });
  }
});










var CommandsCollection = Collection.extend({
  model: CommandModel
});










var ContextMenuItem = View.extend({
  autoRender: true,

  template: '<li>' +
              '<a>' +
                '<span class="icon"></span>' +
                '<span class="label"></span>' +
              '</a>' +
              '<ul class="dropdown-menu"></ul>' +
            '</li>',

  bindings: {
    'model.label': {
      type: 'text',
      selector: '.label'
    },

    'model.hint': {
      type: 'attribute',
      name: 'title'
    },

    'model.fn': {
      type: 'booleanClass',
      selector: 'a',
      no: 'disabled'
    },

    'model.disabled': {
      type: 'booleanClass',
      name: 'disabled'
    },

    'model.subcommands.length': {
      type: 'booleanClass',
      name: 'dropdown'
    },

    'model.href': {
      selector: 'a',
      name: 'href',
      type: function (el, value) {
        if (!value) {
          el.removeAttribute('href');
        }
        else {
          el.setAttribute('href', value);
        }
      }
    },

    'model.icon': {
      type: function (el, value) {
        el.className = 'icon ' + value;
      },
      selector: '.icon'
    }
  },

  events: {
    click:      '_handleClick',
    mouseover:  '_handleMouseover',
    mouseout:   '_handleMouseout'
  },

  render: function () {
    this.renderWithTemplate();
    this.listenToAndRun(this.model, 'change:subcommands', function () {
      this.renderCollection(this.model.subcommands, ContextMenuItem, this.query('ul'));
    });
    return this;
  },

  _handleClick: function (evt) {
    if (this.model.fn) {
      this.parent.triggerCommand(this.model, evt);
    }
    else if (!this.model.href) {
      evt.preventDefault();
    }
  },

  _handleMouseover: function () {

  },



  _handleMouseout: function () {

  },



  triggerCommand: function (command, evt) {
    this.parent.triggerCommand(command, evt);
  }
});














var ContextMenuView = View.extend({
  autoRender: true,

  template: '<nav class="dmn-context-menu">' +
              '<div class="coordinates">' +
                '<label>Coords:</label>' +
                '<span class="x"></span>' +
                '<span class="y"></span>' +
              '</div>' +
              '<ul></ul>' +
            '</nav>',

  collections: {
    commands: CommandsCollection
  },

  session: {
    isOpen: 'boolean',
    scope:  'state'
  },

  bindings: {
    isOpen: {
      type: 'toggle'
    },
    'parent.model.x': {
      type: 'text',
      selector: 'div span.x'
    },
    'parent.model.y': {
      type: 'text',
      selector: 'div span.y'
    }
  },

  open: function (options) {
    var style = this.el.style;

    style.left = options.left + 'px';
    style.top = options.top + 'px';

    this.isOpen = true;
    if (options.parent && options.parent.clauseValuesEditor) {
      options.parent.clauseValuesEditor.hide();
    }

    this.scope = options.scope;
    var commands = options.commands || defaultCommands;

    this.commands.reset(commands);
    return this;
  },

  triggerCommand: function (command, evt) {
    command.fn.call(this, evt);
    if (!command.keepOpen) {
      this.close();
    }
    return this;
  },

  close: function () {
    this.isOpen = false;
    return this;
  },

  render: function () {
    this.renderWithTemplate();
    this.cacheElements({
      commandsEl: 'ul'
    });
    this.commandsView = this.renderCollection(this.commands, ContextMenuItem, this.commandsEl);
    return this;
  }
});











var instance;
ContextMenuView.instance = function () {
  if (!instance) {
    instance = new ContextMenuView();
  }

  if (!document.body.contains(instance.el)) {
    document.body.appendChild(instance.el);
  }

  return instance;
};

if (typeof window !== 'undefined') {
  window.dmnContextMenu = ContextMenuView.instance();
}

ContextMenuView.Collection = CommandsCollection;

module.exports = ContextMenuView;

},{}],25:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false, console: false */

var View = deps('ampersand-view');
var DecisionTable = require('./table-data');
var RuleView = require('./rule-view');




var ClauseHeaderView = require('./clause-view');

function toArray(els) {
  return Array.prototype.slice.apply(els);
}


function makeTd(type) {
  var el = document.createElement('td');
  el.className = type;
  return el;
}


function makeAddButton(clauseType, table) {
  var el = document.createElement('span');
  el.className = 'icon-dmn icon-plus';
  el.addEventListener('click', function () {
    table[clauseType === 'input' ? 'addInput' : 'addOutput']();
  });
  return el;
}




var DecisionTableView = View.extend({
  autoRender: true,

  template: '<div class="dmn-table">' +
              '<div class="hints">' +
                '<i class="icon-dmn icon-info"></i> ' +
                '<span data-hook="hints"></span>' +
              '</div>' +
              '<header>' +
                '<h3 data-hook="table-name" contenteditable></h3>' +
              '</header>' +
              '<table>' +
                '<thead>' +
                  '<tr>' +
                    '<th class="hit" rowspan="4"></th>' +
                    '<th class="input double-border-right" colspan="2">Input</th>' +
                    '<th class="output" colspan="2">Output</th>' +
                    '<th class="annotation" rowspan="4">Annotation</th>' +
                  '</tr>' +
                  '<tr class="labels"></tr>' +
                  '<tr class="values"></tr>' +
                  '<tr class="mappings"></tr>' +
                '</thead>' +
                '<tbody></tbody>' +
              '</table>' +
            '</div>',

  session: {
    contextMenu:        'state',
    clauseValuesEditor: 'state',

    hint: {
      type: 'string',
      default: 'Make a right-click on the table'
    }
  },

  bindings: {
    'model.name': {
      hook: 'table-name',
      type: 'text'
    },
    hint: {
      type: 'innerHTML',
      hook: 'hints'
    }
  },

  events: {
    'click .add-rule a': '_handleAddRuleClick',
    'input header h3':   '_handleNameInput'
  },

  _handleAddRuleClick: function () {
    this.model.addRule();
  },

  _handleNameInput: function (evt) {
    var val = evt.target.textContent.trim();
    if (val === this.model.name) { return; }
    this.model.name = val;
  },

  log: function () {
    var args = Array.prototype.slice.apply(arguments);
    var method = args.shift();
    args.unshift(this.cid);
    console[method].apply(console, args);
  },

  eventLog: function (scopeName) {
    var self = this;
    return function () {
      var args = [];
      args.unshift(scopeName);
      args.unshift('trace');
      args.push(arguments[0]);
      self.log.apply(self, args);
    };
  },

  initialize: function (options) {
    options = options || {};

    this.model = this.model || new DecisionTable.Model();
  },

  hideContextMenu: function () {
    if (!this.contextMenu) { return; }
    this.contextMenu.close();
  },

  showContextMenu: function (cellModel, evt) {
    if (!this.contextMenu) { return; }
    if (evt) {
      evt.preventDefault();
    }

    var table = this.model;

    var options = {
      scope:  cellModel,
      parent: this,
      left:   evt.pageX,
      top:    evt.pageY
    };

    options.commands = [
      {
        label: 'Rule',
        icon: '',
        subcommands: [
          {
            label: 'add',
            icon: 'plus',
            fn: function () {
              table.addRule(this.scope);
            },
            subcommands: [
              {
                label: 'above',
                icon: 'above',
                hint: 'Add a rule above the focused one',
                fn: function () {
                  table.addRule(this.scope, -1);
                }
              },
              {
                label: 'below',
                icon: 'below',
                hint: 'Add a rule below the focused one',
                fn: function () {
                  table.addRule(this.scope, 1);
                }
              }
            ]
          },
          // {
          //   label: 'copy',
          //   icon: 'copy',
          //   fn: function () {
          //     table.copyRule(this.scope);
          //   },
          //   subcommands: [
          //     {
          //       label: 'above',
          //       icon: 'above',
          //       hint: 'Copy the rule above the focused one',
          //       fn: function () {
          //         table.copyRule(this.scope, -1);
          //       }
          //     },
          //     {
          //       label: 'below',
          //       icon: 'below',
          //       hint: 'Copy the rule below the focused one',
          //       fn: function () {
          //         table.copyRule(this.scope, 1);
          //       }
          //     }
          //   ]
          // },
          {
            label: 'remove',
            icon: 'minus',
            hint: 'Remove the focused rule',
            fn: function () {
              table.removeRule(this.scope);
            }
          },
          {
            label: 'clear',
            icon: 'clear',
            hint: 'Clear the focused rule',
            fn: function () {
              table.clearRule(this.scope.rule);
            }
          }
        ]
      }
    ];

    var type = cellModel.type;
    var addMethod = type === 'input' ? 'addInput' : 'addOutput';
    if (type !== 'input' && type !== 'output') {
      this.contextMenu.open(options);
      return;
    }

    options.commands.unshift({
      label: type === 'input' ? 'Input' : 'Output',
      icon: type,
      subcommands: [
        {
          label: 'add',
          icon: 'plus',
          fn: function () {
            table[addMethod]();
          },
          subcommands: [
            {
              label: 'before',
              icon: 'left',
              hint: 'Add an ' + type + ' clause before the focused one',
              fn: function () {
                table[addMethod]();
              }
            },
            {
              label: 'after',
              icon: 'right',
              hint: 'Add an ' + type + ' clause after the focused one',
              fn: function () {
                table[addMethod]();
              }
            }
          ]
        },
        {
          label: 'remove',
          icon: 'minus',
          hint: 'Remove the ' + type + ' clause',
          fn: function () {
            var clause = cellModel.clause;
            var delta = clause.collection.indexOf(clause);
            clause.collection.remove(clause);

            if (clause.clauseType === 'output') {
              delta += table.inputs.length;
            }

            table.rules.forEach(function (rule) {
              var cell = rule.cells.at(delta);
              rule.cells.remove(cell);
            });
            table.rules.trigger('reset');
          }
        }
      ]
    });

    this.contextMenu.open(options);
  },


  parseChoices: function (el) {
    if (!el) {
      return 'MISSING';
    }
    var content = el.textContent.trim();

    if (content[0] === '(' && content.slice(-1) === ')') {
      return content
        .slice(1, -1)
        .split(',')
        .map(function (str) {
          return str.trim();
        })
        .filter(function (str) {
          return !!str;
        })
        ;
    }

    return [];
  },

  parseRules: function (ruleEls) {
    return ruleEls.map(function (el) {
      return el.textContent.trim();
    });
  },

  parseTable: function () {
    var inputs = [];
    var outputs = [];
    var rules = [];

    this.queryAll('thead .labels .input').forEach(function (el, num) {
      var choiceEls = this.query('thead .values .input:nth-child(' + (num + 1) + ')');

      inputs.push({
        label:    el.textContent.trim(),
        choices:  this.parseChoices(choiceEls)
      });
    }, this);

    this.queryAll('thead .labels .output').forEach(function (el, num) {
      var choiceEls = this.query('thead .values .output:nth-child(' + (num + inputs.length + 1) + ')');

      outputs.push({
        label:    el.textContent.trim(),
        choices:  this.parseChoices(choiceEls)
      });
    }, this);

    this.queryAll('tbody tr').forEach(function (row) {
      var cells = [];
      var cellEls = row.querySelectorAll('td');

      for (var c = 1; c < cellEls.length; c++) {
        var choices = null;
        var value = cellEls[c].textContent.trim();
        var type = c <= inputs.length ? 'input' : (c < (cellEls.length - 1) ? 'output' : 'annotation');
        var oc = c - (inputs.length + 1);

        if (type === 'input' && inputs[c - 1]) {
          choices = inputs[c - 1].choices;
        }
        else if (type === 'output' && outputs[oc]) {
          choices = outputs[oc].choices;
        }

        cells.push({
          value:    value,
          choices:  choices
        });
      }

      rules.push({
        cells: cells
      });
    });

    this.model.name = this.query('h3').textContent.trim();
    this.model.inputs.reset(inputs);
    this.model.outputs.reset(outputs);
    this.model.rules.reset(rules);

    return this.toJSON();
  },

  toJSON: function () {
    return this.model.toJSON();
  },

  inputClauseViews: [],
  outputClauseViews: [],

  _headerClear: function (type) {
    toArray(this.labelsRowEl.querySelectorAll('.'+ type)).forEach(function (el) {
      this.labelsRowEl.removeChild(el);
    }, this);

    toArray(this.valuesRowEl.querySelectorAll('.'+ type)).forEach(function (el) {
      this.valuesRowEl.removeChild(el);
    }, this);

    toArray(this.mappingsRowEl.querySelectorAll('.'+ type)).forEach(function (el) {
      this.mappingsRowEl.removeChild(el);
    }, this);

    return this;
  },


  render: function () {
    if (!this.el) {
      this.renderWithTemplate();
    }
    else {
      this.parseTable();
      this.trigger('change:el');
    }

    var table = this.model;

    if (!this.headerEl) {
      this.cacheElements({
        tableEl:          'table',
        tableNameEl:      'header h3',
        headerEl:         'thead',
        bodyEl:           'tbody',
        inputsHeaderEl:   'thead tr:nth-child(1) th.input',
        outputsHeaderEl:  'thead tr:nth-child(1) th.output',
        labelsRowEl:      'thead tr.labels',
        valuesRowEl:      'thead tr.values',
        mappingsRowEl:    'thead tr.mappings'
      });


      this.inputsHeaderEl.appendChild(makeAddButton('input', table));
      this.outputsHeaderEl.appendChild(makeAddButton('output', table));
    }


    ['input', 'output'].forEach(function (type) {
      this.listenToAndRun(this.model[type + 's'], 'add reset remove', function () {

        var cols = this.model[type + 's'].length;
        if (cols > 1) {
          this[type + 'sHeaderEl'].setAttribute('colspan', cols);
        }
        else {
          this[type + 'sHeaderEl'].removeAttribute('colspan');
        }

        this._headerClear(type);
        this[type + 'ClauseViews'].forEach(function (view) {
          view.remove();
        }, this);

        this.model[type + 's'].forEach(function (clause) {
          var labelEl = makeTd(type);
          var valueEl = makeTd(type);
          var mappingEl = makeTd(type);

          var view = new ClauseHeaderView({
            labelEl:    labelEl,
            valueEl:    valueEl,
            mappingEl:  mappingEl,

            model:      clause,
            parent:     this
          });

          ['label', 'value', 'mapping'].forEach(function (kind) {
            if (type === 'input') {
              this[kind +'sRowEl'].insertBefore(view[kind + 'El'], this[kind +'sRowEl'].querySelector('.output'));
            }
            else {
              this[kind +'sRowEl'].appendChild(view[kind + 'El']);
            }
          }, this);

          this.registerSubview(view);

          this[type + 'ClauseViews'].push(view);
        }, this);
      });
    }, this);


    this.bodyEl.innerHTML = '';
    this.rulesView = this.renderCollection(this.model.rules, RuleView, this.bodyEl);

    var self = this;

    if (!this.footEl) {
      var footEl = this.footEl = document.createElement('tfoot');
      footEl.className =  'rules-controls';
      this.tableEl.appendChild(footEl);
    }

    var footRow = this.footEl.querySelector('tr');
    if (footRow) {
      this.footEl.removeChild(footRow);
    }

    footRow = document.createElement('tr');
    this.footEl.appendChild(footRow);

    function makeAddRule() {
      var td = document.createElement('td');
      td.className = 'add-rule';
      var a = document.createElement('a');
      a.setAttribute('title', 'Add a rule');
      a.className = 'icon-dmn icon-plus';
      td.appendChild(a);
      return td;
    }

    function makeColspan() {
      var count = 1 + Math.max(1, self.model.inputs.length) + Math.max(1, self.model.outputs.length);
      var link = self.query('tfoot .add-rule') || makeAddRule();
      footRow.appendChild(link);

      for (var c = 0; c < count; c++) {
        footRow.appendChild(document.createElement('td'));
      }
    }

    this.model.inputs.on('add remove reset', makeColspan);
    this.model.outputs.on('add remove reset', makeColspan);
    makeColspan();

    return this;
  }
});

module.exports = DecisionTableView;

},{"./clause-view":20,"./rule-view":30,"./table-data":32}],26:[function(require,module,exports){
'use strict';
/* global require: false, module: false */

var DecisionTableView = require('./decision-table-view');
require('./contextmenu-view');
require('./clausevalues-setter-view');

module.exports = DecisionTableView;

function nodeListarray(els) {
  if (Array.isArray(els)) {
    return els;
  }
  var arr = [];
  for (var i = 0; i < els.length; i++) {
    arr.push(els[i]);
  }
  return arr;
}

function selectAll(selector, ctx) {
  ctx = ctx || document;
  return nodeListarray(ctx.querySelectorAll(selector));
}
window.selectAll = selectAll;

},{"./clausevalues-setter-view":21,"./contextmenu-view":24,"./decision-table-view":25}],27:[function(require,module,exports){
'use strict';
/*global module: false, require: false*/

var Clause = require('./clause-data');

var InputModel = Clause.Model.extend({
  clauseType: 'input',

  derived: {
    x: {
      deps: [
        'collection'
      ],
      cache: false,
      fn: function () {
        return this.collection.indexOf(this);
      }
    },

    focused: {
      deps: [
        'collection',
        'collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.collection.parent.x === this.x;
      }
    }
  }
});

module.exports = {
  Model: InputModel,
  Collection: Clause.Collection.extend({
    model: InputModel
  })
};

},{"./clause-data":16}],28:[function(require,module,exports){
'use strict';
/*global module: false, require: false*/

var Clause = require('./clause-data');

var OutputModel = Clause.Model.extend({
  clauseType: 'output',

  derived: {
    x: {
      deps: [
        'collection',
        'collection.parent',
        'collection.parent.inputs'
      ],
      cache: false,
      fn: function () {
        return this.collection.indexOf(this) + this.collection.parent.inputs.length;
      }
    },

    focused: {
      deps: [
        'collection',
        'collection.parent',
        'collection.parent.inputs'
      ],
      cache: false,
      fn: function () {
        var table = this.collection.parent;
        return table.x === this.collection.indexOf(this) + table.inputs.length;
      }
    }
  }
});

module.exports = {
  Model: OutputModel,
  Collection: Clause.Collection.extend({
    model: OutputModel
  })
};

},{"./clause-data":16}],29:[function(require,module,exports){
'use strict';
/*global module: false, deps: true, require: false*/

if (typeof window === 'undefined') { var deps = require; }
else { var deps = window.deps; }

var State = deps('ampersand-state');
var Collection = deps('ampersand-collection');
var Cell = require('./cell-data');

var RuleModel = State.extend({
  collections: {
    cells: Cell.Collection
  },

  derived: {
    table: {
      deps: [
        'collection',
        'collection.parent'
      ],
      cache: false,
      fn: function () {
        return this.collection.parent;
      }
    },

    focused: {
      deps: [
        'collection',
        'table'
      ],
      cache: false,
      fn: function () {
        return this.collection.indexOf(this) === this.table.y;
      }
    },


    delta: {
      deps: ['collection'],
      cache: false,
      fn: function () {
        return 1 + this.collection.indexOf(this);
      }
    },

    inputCells: {
      deps: ['cells', 'table.inputs'],
      cache: false,
      fn: function () {
        return this.cells.models.slice(0, this.table.inputs.length);
      }
    },

    outputCells: {
      deps: ['cells', 'table.inputs'],
      cache: false,
      fn: function () {
        return this.cells.models.slice(this.table.inputs.length, -1);
      }
    },

    annotation: {
      deps: ['cells'],
      cache: false,
      fn: function () {
        return this.cells.models[this.cells.length - 1];
      }
    }
  },

  ensureCells: function () {
    var c = this.table.inputs.length + this.table.outputs.length + 1;

    // fine
    if (this.cells.length === c || c === 1) {
      return;
    }

    // needs to be filled
    if (this.cells.length < c) {
      while (this.cells.length <= c) {
        this.cells.add({value:''});
      }
    }

    // needs to be truncated
    else {
      this.cells.models = this.cells.models.slice(0, c);
    }
  },

  initialize: function () {
    this.listenTo(this.table.inputs, 'reset', this.ensureCells);
    this.listenToAndRun(this.table.outputs, 'reset', this.ensureCells);
  }
});

module.exports = {
  Model: RuleModel,

  Collection: Collection.extend({
    model: RuleModel,
  })
};

},{"./cell-data":13}],30:[function(require,module,exports){
'use strict';
/* global require: false, module: false, deps: false */

var View = deps('ampersand-view');
var CellViews = require('./cell-view');
var merge = deps('lodash.merge');
var contextViewsMixin = require('./context-views-mixin');

var RuleView = View.extend({
  template: '<tr><td class="number"></td></tr>',

  bindings: {
    'model.delta': {
      type: 'text',
      selector: '.number'
    }
  },

  derived: merge({}, contextViewsMixin, {
    inputs: {
      deps: [
        'parent',
        'parent.model',
        'parent.model.inputs'
      ],
      cache: false,
      fn: function () {
        return this.parent.model.inputs;
      }
    },

    outputs: {
      deps: [
        'parent',
        'parent.model',
        'parent.model.outputs'
      ],
      cache: false,
      fn: function () {
        return this.parent.model.outputs;
      }
    },

    annotation: {
      deps: [
        'parent',
        'parent.model',
        'parent.model.annotations'
      ],
      fn: function () {
        return this.parent.model.annotations.at(0);
      }
    }
  }),

  events: {
    'contextmenu .number': '_handleRowContextMenu'
  },

  _handleRowContextMenu: function (evt) {
    var rule = this.model;
    var table = rule.collection.parent;

    this.contextMenu.open({
      parent:   this,
      left:     evt.pageX,
      top:      evt.pageY,
      commands: [
        {
          label: 'Rule',
          subcommands: [
            {
              label: 'add',
              icon: 'plus',
              fn: function () {
                table.addRule(rule);
              },
              subcommands: [
                {
                  label: 'above',
                  icon: 'above',
                  hint: 'Add a rule above the focused one',
                  fn: function () {
                    table.addRule(rule, -1);
                  }
                },
                {
                  label: 'below',
                  icon: 'below',
                  hint: 'Add a rule below the focused one',
                  fn: function () {
                    table.addRule(rule, 1);
                  }
                }
              ]
            },
            // {
            //   label: 'copy',
            //   icon: 'copy',
            //   fn: function () {
            //     table.copyRule(rule);
            //   },
            //   subcommands: [
            //     {
            //       label: 'above',
            //       icon: 'above',
            //       hint: 'Copy the rule above the focused one',
            //       fn: function () {
            //         table.copyRule(rule, -1);
            //       }
            //     },
            //     {
            //       label: 'below',
            //       icon: 'below',
            //       hint: 'Copy the rule below the focused one',
            //       fn: function () {
            //         table.copyRule(rule, 1);
            //       }
            //     }
            //   ]
            // },
            {
              label: 'remove',
              icon: 'minus',
              hint: 'Remove this rule',
              fn: function () {
                rule.collection.remove(rule);
              }
            },
            {
              label: 'clear',
              icon: 'clear',
              hint: 'Clear the focused rule',
              fn: function () {
                table.clearRule(rule);
              }
            }
          ]
        }
      ]
    });

    evt.preventDefault();
  },

  setFocus: function () {
    if (!this.el) { return; }

    if (this.model.focused) {
      this.el.classList.add('row-focused');
    }
    else {
      this.el.classList.remove('row-focused');
    }
  },

  initialize: function () {
    var table = this.model.table;

    this.listenToAndRun(table, 'change:focus', this.setFocus);
    this.listenToAndRun(table.inputs, 'add remove reset', this.render);
    this.listenToAndRun(table.outputs, 'add remove reset', this.render);
  },

  render: function () {
    this.renderWithTemplate();

    this.cacheElements({
      numberEl: '.number'
    });

    var i;
    var subview;

    for (i = 0; i < this.inputs.length; i++) {
      subview = new CellViews.Input({
        model:  this.model.cells.at(i),
        parent: this
      });

      this.registerSubview(subview.render());
      this.el.appendChild(subview.el);
    }

    for (i = 0; i < this.outputs.length; i++) {
      subview = new CellViews.Output({
        model:  this.model.cells.at(this.inputs.length + i),
        parent: this
      });

      this.registerSubview(subview.render());
      this.el.appendChild(subview.el);
    }
    subview = new CellViews.Annotation({
      model:  this.model.annotation,
      parent: this
    });
    this.registerSubview(subview.render());
    this.el.appendChild(subview.el);


    this.setFocus();
    return this;
  }
});

module.exports = RuleView;

},{"./cell-view":14,"./context-views-mixin":23}],31:[function(require,module,exports){
'use strict';
/* global module: false, deps: false */

var View = deps('ampersand-view');
var Collection = deps('ampersand-collection');
var State = deps('ampersand-state');



var SuggestionsCollection = Collection.extend({
  model: State.extend({
    props: {
      value: 'string',
      html: 'string'
    }
  })
});



var SuggestionsItemView = View.extend({
  template: '<li></li>',

  bindings: {
    'model.html': {
      type: 'innerHTML'
    }
  },

  events: {
    click: '_handleClick'
  },

  _handleClick: function () {
    if (!this.parent || !this.parent.parent) { return; }
    var target = this.parent.parent;
    
    if (target.model && typeof target.model.value !== 'undefined') {
      target.model.value = this.model.value;
    }
    else if (target.el) {
      target.el.textContent = this.model.value;
    }
  }
});



var SuggestionsView = View.extend({
  session: {
    visible: 'boolean'
  },

  bindings: {
    visible: {
      type: 'toggle'
    }
  },

  template: '<ul class="dmn-suggestions-helper"></ul>',

  collections: {
    suggestions: SuggestionsCollection
  },

  setPosition: function () {
    if (!this.parent || !this.parent.el) {
      this.visible = false;
      return;
    }

    var node = this.parent.el;
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var helper = this.el;

    while ((node = node.offsetParent)) {
      if (node.offsetTop) {
        top += parseInt(node.offsetTop, 10);
      }
      if (node.offsetLeft) {
        left += parseInt(node.offsetLeft, 10);
      }
    }

    top -= helper.clientHeight;
    helper.style.top = top;
    helper.style.left = left;
  },

  show: function (suggestions, parent, force) {
    if (parent) {
      this.parent = parent;
    }

    if (suggestions) {
      if (suggestions.isCollection) {
        instance.suggestions = suggestions;
      }
      else {
        instance.suggestions.reset(suggestions);
      }
      
      instance.visible = force || suggestions.length > 1;
    }
    else {
      instance.visible = false;
    }

    if (instance.visible) {
      this.setPosition();
    }

    return this;
  },

  hide: function () {
    return this.show([], this.parent);
  },

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(this.suggestions, SuggestionsItemView, this.el);
    return this;
  }
});



var instance;
SuggestionsView.instance = function (suggestions, parent) {
  if (!instance) {
    instance = new SuggestionsView({});
    instance.render();
  }

  if (!document.body.contains(instance.el)) {
    document.body.appendChild(instance.el);
  }

  instance.show(suggestions, parent);

  return instance;
};


SuggestionsView.Collection = SuggestionsCollection;

module.exports = SuggestionsView;

},{}],32:[function(require,module,exports){
'use strict';
/*global module: false, deps: true, require: false, console: false*/

if (typeof window === 'undefined') { var deps = require; }
else { var deps = window.deps; }


var State = deps('ampersand-state');
var Input = require('./input-data');
var Output = require('./output-data');

var Rule = require('./rule-data');

var defaults = require('lodash.defaults');

var DecisionTableModel = State.extend({
  collections: {
    inputs:   Input.Collection,
    outputs:  Output.Collection,
    rules:    Rule.Collection
  },

  props: {
    name: 'string'
  },

  session: {
    x: {
      type: 'number',
      default: 0
    },

    y: {
      type: 'number',
      default: 0
    },


    logLevel: {
      type: 'number',
      default: 0
    }
  },

  initialize: function () {
    var table = this;
    [
      'inputs',
      'outputs',
      'rules'
    ].forEach(function (collectionName) {
      [
        'add',
        'remove',
        'sort',
        'reset'
      ].forEach(function (evtName) {
        table.listenTo(table[collectionName], evtName, function (arg1, arg2, arg3) {
          table.trigger(collectionName + ':' + evtName, arg1, arg2, arg3);
        });
      });
    });

    this.listenToAndRun(this.inputs, 'remove reset', function () {
      if (this.inputs.length) { return; }
      this.inputs.add({});
    });

    this.listenToAndRun(this.outputs, 'remove reset', function () {
      if (this.outputs.length) { return; }
      this.outputs.add({});
    });
  },

  log: function () {
    var args = Array.prototype.slice.apply(arguments);
    var method = args.shift();
    args.unshift(this.cid);
    console[method].apply(console, args);
  },

  _ruleClipboard: null,


  addRule: function (scopeCell, beforeAfter) {
    var cells = [];
    var c;

    for (c = 0; c < this.inputs.length; c++) {
      cells.push({
        value: '',
        // choices: this.inputs.at(c).choices,
        focused: c === 0
      });
    }

    for (c = 0; c < this.outputs.length; c++) {
      cells.push({
        value: '',
        // choices: this.outputs.at(c).choices
      });
    }

    cells.push({
      value: ''
    });

    var options = {};
    if (beforeAfter) {
      var ruleDelta = this.rules.indexOf(scopeCell.collection.parent);
      options.at = ruleDelta + (beforeAfter > 0 ? ruleDelta : (ruleDelta - 1));
    }

    this.rules.add({
      cells: cells
    }, options);

    return this;
  },

  removeRule: function (scopeCell) {
    this.rules.remove(scopeCell.collection.parent);
    this.rules.trigger('reset');
    return this;
  },


  copyRule: function (scopeCell, upDown) {
    var rule = scopeCell.collection.parent;
    if (!rule) { return this; }
    this._ruleClipboard = rule;

    if (upDown) {
      var ruleDelta = this.rules.indexOf(rule);
      this.pasteRule(ruleDelta + (upDown > 1 ? 0 : 1));
    }

    return this;
  },


  pasteRule: function (delta) {
    if (!this._ruleClipboard) { return this; }
    var data = this._ruleClipboard.toJSON();
    this.rules.add(data, {
      at: delta
    });
    return this;
  },


  clearRule: function (rule) {
    rule.cells.forEach(function (cell) {
      cell.value = '';
    });
    return this;
  },


  _rulesCells: function (added, delta) {
    this.rules.forEach(function (rule) {
      rule.cells.add({
        // choices: added.choices
      }, {
        at: delta,
        silent: true
      });
    });

    this.rules.trigger('reset');
  },

  addInput: function (data, position) {
    var delta = typeof position !== 'undefined' ? position : this.inputs.length;
    delta = delta < 0 ? 0 : delta;

    var input = {};
    defaults(input, data, {
      label:    null,
      choices:  null,
      mapping:  null,
      datatype: 'string'
    });

    var newModel = this.inputs.add(input, {
      at: delta
    });

    this._rulesCells(newModel, newModel.collection.indexOf(newModel));

    return this;
  },

  removeInput: function () {
    return this;
  },



  addOutput: function (data, position) {
    var delta = typeof position !== 'undefined' ? position : this.outputs.length;
    delta = delta < 0 ? 0 : delta;

    var output = {};
    defaults(output, data, {
      label:    null,
      choices:  null,
      mapping:  null,
      datatype: 'string'
    });

    var newModel = this.outputs.add(output, {
      at: delta
    });

    this._rulesCells(newModel, newModel.collection.indexOf(newModel));

    return this;
  },

  removeOutput: function () {
    return this;
  }
});

if (typeof window !== 'undefined') {
  window.DecisionTableModel = DecisionTableModel;
}

module.exports = {
  Model: DecisionTableModel
};

},{"./input-data":27,"./output-data":28,"./rule-data":29,"lodash.defaults":1}]},{},[26])(26)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlZmF1bHRzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5kZWZhdWx0cy9ub2RlX21vZHVsZXMvbG9kYXNoLmFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWFzc2lnbi9ub2RlX21vZHVsZXMvbG9kYXNoLl9iYXNlY29weS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlZmF1bHRzL25vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2guX2NyZWF0ZWFzc2lnbmVyL25vZGVfbW9kdWxlcy9sb2Rhc2guX2JpbmRjYWxsYmFjay9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5fY3JlYXRlYXNzaWduZXIvbm9kZV9tb2R1bGVzL2xvZGFzaC5faXNpdGVyYXRlZWNhbGwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlZmF1bHRzL25vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guX2dldG5hdGl2ZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZGVmYXVsdHMvbm9kZV9tb2R1bGVzL2xvZGFzaC5hc3NpZ24vbm9kZV9tb2R1bGVzL2xvZGFzaC5rZXlzL25vZGVfbW9kdWxlcy9sb2Rhc2guaXNhcmd1bWVudHMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlZmF1bHRzL25vZGVfbW9kdWxlcy9sb2Rhc2guYXNzaWduL25vZGVfbW9kdWxlcy9sb2Rhc2gua2V5cy9ub2RlX21vZHVsZXMvbG9kYXNoLmlzYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmRlZmF1bHRzL25vZGVfbW9kdWxlcy9sb2Rhc2gucmVzdHBhcmFtL2luZGV4LmpzIiwic2NyaXB0cy9jZWxsLWRhdGEuanMiLCJzY3JpcHRzL2NlbGwtdmlldy5qcyIsInNjcmlwdHMvY2hvaWNlLXZpZXcuanMiLCJzY3JpcHRzL2NsYXVzZS1kYXRhLmpzIiwic2NyaXB0cy9jbGF1c2UtbGFiZWwtdmlldy5qcyIsInNjcmlwdHMvY2xhdXNlLW1hcHBpbmctdmlldy5qcyIsInNjcmlwdHMvY2xhdXNlLXZhbHVlLXZpZXcuanMiLCJzY3JpcHRzL2NsYXVzZS12aWV3LmpzIiwic2NyaXB0cy9jbGF1c2V2YWx1ZXMtc2V0dGVyLXZpZXcuanMiLCJzY3JpcHRzL2NvbWJvYm94LXZpZXcuanMiLCJzY3JpcHRzL2NvbnRleHQtdmlld3MtbWl4aW4uanMiLCJzY3JpcHRzL2NvbnRleHRtZW51LXZpZXcuanMiLCJzY3JpcHRzL2RlY2lzaW9uLXRhYmxlLXZpZXcuanMiLCJzY3JpcHRzL2luZGV4LmpzIiwic2NyaXB0cy9pbnB1dC1kYXRhLmpzIiwic2NyaXB0cy9vdXRwdXQtZGF0YS5qcyIsInNjcmlwdHMvcnVsZS1kYXRhLmpzIiwic2NyaXB0cy9ydWxlLXZpZXcuanMiLCJzY3JpcHRzL3N1Z2dlc3Rpb25zLXZpZXcuanMiLCJzY3JpcHRzL3RhYmxlLWRhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBsb2Rhc2ggMy4xLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2guYXNzaWduJyksXG4gICAgcmVzdFBhcmFtID0gcmVxdWlyZSgnbG9kYXNoLnJlc3RwYXJhbScpO1xuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVmYXVsdHNgIHRvIGN1c3RvbWl6ZSBpdHMgYF8uYXNzaWduYCB1c2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0VmFsdWUgVGhlIGRlc3RpbmF0aW9uIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gc291cmNlVmFsdWUgVGhlIHNvdXJjZSBvYmplY3QgcHJvcGVydHkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbkRlZmF1bHRzKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVZhbHVlIDogb2JqZWN0VmFsdWU7XG59XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gT25jZSBhXG4gKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgdmFsdWVzIG9mIHRoZSBzYW1lIHByb3BlcnR5IGFyZSBpZ25vcmVkLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBkZWZhdWx0cyA9IHJlc3RQYXJhbShmdW5jdGlvbihhcmdzKSB7XG4gIHZhciBvYmplY3QgPSBhcmdzWzBdO1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGFyZ3MucHVzaChhc3NpZ25EZWZhdWx0cyk7XG4gIHJldHVybiBhc3NpZ24uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4yLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlYXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCdsb2Rhc2guX2NyZWF0ZWFzc2lnbmVyJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmFzc2lnbmAgZm9yIGN1c3RvbWl6aW5nIGFzc2lnbmVkIHZhbHVlcyB3aXRob3V0XG4gKiBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZywgbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYFxuICogZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbldpdGgob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIodmFsdWUsIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKTtcblxuICAgIGlmICgocmVzdWx0ID09PSByZXN1bHQgPyAocmVzdWx0ICE9PSB2YWx1ZSkgOiAodmFsdWUgPT09IHZhbHVlKSkgfHxcbiAgICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzOlxuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAgYW5kIGlzIGJhc2VkIG9uXG4gKiBbYE9iamVjdC5hc3NpZ25gXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnbikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uYXNzaWduKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiA0MCB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAvLyB1c2luZyBhIGN1c3RvbWl6ZXIgY2FsbGJhY2tcbiAqIHZhciBkZWZhdWx0cyA9IF8ucGFydGlhbFJpZ2h0KF8uYXNzaWduLCBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAqICAgcmV0dXJuIF8uaXNVbmRlZmluZWQodmFsdWUpID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgcmV0dXJuIGN1c3RvbWl6ZXJcbiAgICA/IGFzc2lnbldpdGgob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpXG4gICAgOiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogbG9kYXNoIDMuMi4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZUNvcHkgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2Vjb3B5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJ2xvZGFzaC5rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBzb3VyY2UgPT0gbnVsbFxuICAgID8gb2JqZWN0XG4gICAgOiBiYXNlQ29weShzb3VyY2UsIGtleXMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIHByb3BzLCBvYmplY3QpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMS4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnbG9kYXNoLl9iaW5kY2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJ2xvZGFzaC5faXNpdGVyYXRlZWNhbGwnKSxcbiAgICByZXN0UGFyYW0gPSByZXF1aXJlKCdsb2Rhc2gucmVzdHBhcmFtJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYXNzaWducyBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gYSBnaXZlblxuICogZGVzdGluYXRpb24gb2JqZWN0LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gY3JlYXRlIGBfLmFzc2lnbmAsIGBfLmRlZmF1bHRzYCwgYW5kIGBfLm1lcmdlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIHJlc3RQYXJhbShmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0ID09IG51bGwgPyAwIDogc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAyID8gc291cmNlc1tsZW5ndGggLSAyXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGhpc0FyZyA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soY3VzdG9taXplciwgdGhpc0FyZywgNSk7XG4gICAgICBsZW5ndGggLT0gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VzdG9taXplciA9IHR5cGVvZiB0aGlzQXJnID09ICdmdW5jdGlvbicgPyB0aGlzQXJnIDogdW5kZWZpbmVkO1xuICAgICAgbGVuZ3RoIC09IChjdXN0b21pemVyID8gMSA6IDApO1xuICAgIH1cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjEgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0aGlzQXJnID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiIsIi8qKlxuICogbG9kYXNoIDMuMC45IChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eXFxkKyQvO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/ICh2YWx1ZSA9PT0gb3RoZXIpIDogKG90aGVyICE9PSBvdGhlcik7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJ2xvZGFzaC5fZ2V0bmF0aXZlJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCdsb2Rhc2guaXNhcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoLmlzYXJyYXknKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL15cXGQrJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBnZXROYXRpdmUoT2JqZWN0LCAna2V5cycpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFwibGVuZ3RoXCIgcHJvcGVydHkgdmFsdWUgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBhdm9pZCBhIFtKSVQgYnVnXShodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNzkyKVxuICogdGhhdCBhZmZlY3RzIFNhZmFyaSBvbiBhdCBsZWFzdCBpT1MgOC4xLTguMyBBUk02NC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIFwibGVuZ3RoXCIgdmFsdWUuXG4gKi9cbnZhciBnZXRMZW5ndGggPSBiYXNlUHJvcGVydHkoJ2xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSA/ICt2YWx1ZSA6IC0xO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgW2xhbmd1YWdlIHR5cGVdKGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDgpIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdCgxKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgVjggSklUIGJ1ZyBpbiBDaHJvbWUgMTktMjAuXG4gIC8vIFNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MSBmb3IgbW9yZSBkZXRhaWxzLlxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgQ3RvciA9IG9iamVjdCA9PSBudWxsID8gbnVsbCA6IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICAodHlwZW9mIG9iamVjdCAhPSAnZnVuY3Rpb24nICYmIGlzQXJyYXlMaWtlKG9iamVjdCkpKSB7XG4gICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0KG9iamVjdCkgPyBuYXRpdmVLZXlzKG9iamVjdCkgOiBbXTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkgJiYgbGVuZ3RoKSB8fCAwO1xuXG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGlzUHJvdG8gPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBsZW5ndGggPiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IChpbmRleCArICcnKTtcbiAgfVxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoc2tpcEluZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpICYmXG4gICAgICAgICEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5cztcbiIsIi8qKlxuICogbG9kYXNoIDMuOS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzcGVjaWFsIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKS5cbiAqIEluIGFkZGl0aW9uIHRvIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgZm9yd2FyZCBzbGFzaCBpcyBlc2NhcGVkIHRvIGFsbG93IGZvclxuICogZWFzaWVyIGBldmFsYCB1c2UgYW5kIGBGdW5jdGlvbmAgY29tcGlsYXRpb24uXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSA+IDUpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCdzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChmblRvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICByZXR1cm4gaXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZykge1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVJc0hvc3RDdG9yLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiL1wiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsXG4gKiBcIipcIiwgXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczpcXC9cXC9sb2Rhc2hcXC5jb21cXC9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjMgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVXNlZCBhcyB0aGUgW21heGltdW0gbGVuZ3RoXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjAuMyAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgW3NwZWNpYWwgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpLlxuICogSW4gYWRkaXRpb24gdG8gc3BlY2lhbCBjaGFyYWN0ZXJzIHRoZSBmb3J3YXJkIHNsYXNoIGlzIGVzY2FwZWQgdG8gYWxsb3cgZm9yXG4gKiBlYXNpZXIgYGV2YWxgIHVzZSBhbmQgYEZ1bmN0aW9uYCBjb21waWxhdGlvbi5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0J3Mgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBbYHRvU3RyaW5nVGFnYF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZXNjYXBlUmVnRXhwKGZuVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gZ2V0TmF0aXZlKEFycmF5LCAnaXNBcnJheScpO1xuXG4vKipcbiAqIFVzZWQgYXMgdGhlIFttYXhpbXVtIGxlbmd0aF0oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgcmV0dXJuIGlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gW2BUb0xlbmd0aGBdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWc7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZuVG9TdHJpbmcuY2FsbCh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIHJlSXNIb3N0Q3Rvci50ZXN0KHZhbHVlKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIi9cIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLFxuICogXCIqXCIsIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6XFwvXFwvbG9kYXNoXFwuY29tXFwvXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCIvKipcbiAqIGxvZGFzaCAzLjYuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAqIGNyZWF0ZWQgZnVuY3Rpb24gYW5kIGFyZ3VtZW50cyBmcm9tIGBzdGFydGAgYW5kIGJleW9uZCBwcm92aWRlZCBhcyBhbiBhcnJheS5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgYmFzZWQgb24gdGhlIFtyZXN0IHBhcmFtZXRlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvRnVuY3Rpb25zL3Jlc3RfcGFyYW1ldGVycykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgc2F5ID0gXy5yZXN0UGFyYW0oZnVuY3Rpb24od2hhdCwgbmFtZXMpIHtcbiAqICAgcmV0dXJuIHdoYXQgKyAnICcgKyBfLmluaXRpYWwobmFtZXMpLmpvaW4oJywgJykgK1xuICogICAgIChfLnNpemUobmFtZXMpID4gMSA/ICcsICYgJyA6ICcnKSArIF8ubGFzdChuYW1lcyk7XG4gKiB9KTtcbiAqXG4gKiBzYXkoJ2hlbGxvJywgJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnKTtcbiAqIC8vID0+ICdoZWxsbyBmcmVkLCBiYXJuZXksICYgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gcmVzdFBhcmFtKGZ1bmMsIHN0YXJ0KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6ICgrc3RhcnQgfHwgMCksIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgcmVzdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgcmVzdFtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBzd2l0Y2ggKHN0YXJ0KSB7XG4gICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgcmVzdCk7XG4gICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJnc1swXSwgYXJnc1sxXSwgcmVzdCk7XG4gICAgfVxuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIGluZGV4ID0gLTE7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gcmVzdDtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlc3RQYXJhbTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qZ2xvYmFsIG1vZHVsZTogZmFsc2UsIGRlcHM6IHRydWUsIHJlcXVpcmU6IGZhbHNlKi9cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHZhciBkZXBzID0gcmVxdWlyZTsgfVxuZWxzZSB7IHZhciBkZXBzID0gd2luZG93LmRlcHM7IH1cblxudmFyIFN0YXRlID0gZGVwcygnYW1wZXJzYW5kLXN0YXRlJyk7XG52YXIgQ29sbGVjdGlvbiA9IGRlcHMoJ2FtcGVyc2FuZC1jb2xsZWN0aW9uJyk7XG5cbnZhciBDZWxsTW9kZWwgPSBTdGF0ZS5leHRlbmQoe1xuICBwcm9wczoge1xuICAgIHZhbHVlOiAnc3RyaW5nJ1xuICB9LFxuXG4gIHNlc3Npb246IHtcbiAgICBlZGl0YWJsZToge1xuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSxcblxuICBkZXJpdmVkOiB7XG4gICAgcnVsZToge1xuICAgICAgZGVwczogW1xuICAgICAgICAnY29sbGVjdGlvbicsXG4gICAgICAgICdjb2xsZWN0aW9uLnBhcmVudCdcbiAgICAgIF0sXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLnBhcmVudDtcbiAgICAgIH1cbiAgICB9LFxuXG5cbiAgICB0YWJsZToge1xuICAgICAgZGVwczogW1xuICAgICAgICAncnVsZS5jb2xsZWN0aW9uJyxcbiAgICAgICAgJ3J1bGUuY29sbGVjdGlvbi5wYXJlbnQnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVsZS5jb2xsZWN0aW9uLnBhcmVudDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgeDoge1xuICAgICAgZGVwczogW1xuICAgICAgICAnY29sbGVjdGlvbidcbiAgICAgIF0sXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2VsbCA9IHRoaXM7XG4gICAgICAgIHZhciBjZWxscyA9IGNlbGwuY29sbGVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGNlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHk6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ3J1bGUnLFxuICAgICAgICAncnVsZS5jb2xsZWN0aW9uJ1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBydWxlcyA9IHRoaXMucnVsZS5jb2xsZWN0aW9uO1xuICAgICAgICByZXR1cm4gcnVsZXMuaW5kZXhPZih0aGlzLnJ1bGUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmb2N1c2VkOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICd0YWJsZScsXG4gICAgICAgICd0YWJsZS54JyxcbiAgICAgICAgJ3RhYmxlLnknLFxuICAgICAgICAneCcsXG4gICAgICAgICd5J1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IHRoaXMudGFibGUueCAmJiB0aGlzLnkgPT09IHRoaXMudGFibGUueTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xhdXNlRGVsdGE6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAndGFibGUuaW5wdXRzJyxcbiAgICAgICAgJ3RhYmxlLm91dHB1dHMnXG4gICAgICBdLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5jb2xsZWN0aW9uLmluZGV4T2YodGhpcyk7XG4gICAgICAgIHZhciBpbnB1dHMgPSB0aGlzLnRhYmxlLmlucHV0cy5sZW5ndGg7XG4gICAgICAgIHZhciBvdXRwdXRzID0gdGhpcy50YWJsZS5pbnB1dHMubGVuZ3RoICsgdGhpcy50YWJsZS5vdXRwdXRzLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVsdGEgPCBpbnB1dHMpIHtcbiAgICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVsdGEgPCBvdXRwdXRzKSB7XG4gICAgICAgICAgcmV0dXJuIGRlbHRhIC0gaW5wdXRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHR5cGU6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAndGFibGUuaW5wdXRzJyxcbiAgICAgICAgJ3RhYmxlLm91dHB1dHMnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5jb2xsZWN0aW9uLmluZGV4T2YodGhpcyk7XG4gICAgICAgIHZhciBpbnB1dHMgPSB0aGlzLnRhYmxlLmlucHV0cy5sZW5ndGg7XG4gICAgICAgIHZhciBvdXRwdXRzID0gdGhpcy50YWJsZS5pbnB1dHMubGVuZ3RoICsgdGhpcy50YWJsZS5vdXRwdXRzLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVsdGEgPCBpbnB1dHMpIHtcbiAgICAgICAgICByZXR1cm4gJ2lucHV0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZWx0YSA8IG91dHB1dHMpIHtcbiAgICAgICAgICByZXR1cm4gJ291dHB1dCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ2Fubm90YXRpb24nO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjbGF1c2U6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAnY29sbGVjdGlvbi5sZW5ndGgnLFxuICAgICAgICAndHlwZScsXG4gICAgICAgICdjbGF1c2VEZWx0YSdcbiAgICAgIF0sXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbGF1c2VEZWx0YSA8IDAgfHwgdGhpcy50eXBlID09PSAnYW5ub3RhdGlvbicpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBjbGF1c2UgPSB0aGlzLnRhYmxlW3RoaXMudHlwZSArJ3MnXS5hdCh0aGlzLmNsYXVzZURlbHRhKTtcbiAgICAgICAgcmV0dXJuIGNsYXVzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hvaWNlczoge1xuICAgICAgZGVwczogW1xuICAgICAgICAndGFibGUnLFxuICAgICAgICAnY29sbGVjdGlvbi5sZW5ndGgnLFxuICAgICAgICAndHlwZScsXG4gICAgICAgICdjbGF1c2UnLFxuICAgICAgICAnY2xhdXNlRGVsdGEnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNsYXVzZSB8fCAhdGhpcy5jbGF1c2UuY2hvaWNlcykgeyByZXR1cm47IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhdXNlLmNob2ljZXMubWFwKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICByZXR1cm4ge3ZhbHVlOiB2YWx9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTW9kZWw6IENlbGxNb2RlbCxcbiAgQ29sbGVjdGlvbjogQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBDZWxsTW9kZWxcbiAgfSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgcmVxdWlyZTogZmFsc2UsIG1vZHVsZTogZmFsc2UsIGRlcHM6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBtZXJnZSA9IGRlcHMoJ2xvZGFzaC5tZXJnZScpO1xuXG5cbnZhciBDaG9pY2VWaWV3ID0gcmVxdWlyZSgnLi9jaG9pY2UtdmlldycpO1xudmFyIFJ1bGVDZWxsVmlldyA9IFZpZXcuZXh0ZW5kKG1lcmdlKHt9LCBDaG9pY2VWaWV3LnByb3RvdHlwZSwge1xuICB0ZW1wbGF0ZTogJzx0ZD48c3BhbiBjb250ZW50ZWRpdGFibGU+PC9zcGFuPjwvdGQ+JyxcblxuICBiaW5kaW5nczogbWVyZ2Uoe30sIENob2ljZVZpZXcucHJvdG90eXBlLmJpbmRpbmdzLCB7XG4gICAgJ21vZGVsLnZhbHVlJzoge1xuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgc2VsZWN0b3I6ICdbY29udGVudGVkaXRhYmxlXSdcbiAgICB9LFxuXG4gICAgJ21vZGVsLmVkaXRhYmxlJzoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW5BdHRyaWJ1dGUnLFxuICAgICAgbmFtZTogJ2NvbnRlbnRlZGl0YWJsZScsXG4gICAgICBzZWxlY3RvcjogJ1tjb250ZW50ZWRpdGFibGVdJ1xuICAgIH0sXG5cbiAgICAnbW9kZWwuc3BlbGxjaGVja2VkJzoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW5BdHRyaWJ1dGUnLFxuICAgICAgbmFtZTogJ3NwZWxsY2hlY2snLFxuICAgICAgc2VsZWN0b3I6ICdbY29udGVudGVkaXRhYmxlXSdcbiAgICB9LFxuXG4gICAgJ21vZGVsLnR5cGUnOiB7XG4gICAgICB0eXBlOiAnY2xhc3MnXG4gICAgfVxuICB9KSxcblxuICBldmVudHM6IG1lcmdlKHt9LCBDaG9pY2VWaWV3LnByb3RvdHlwZS5ldmVudHMsIHtcbiAgICAnY29udGV4dG1lbnUnOiAgICAgICAgICAgICAgICAgICAgJ19oYW5kbGVDb250ZXh0TWVudScsXG4gICAgJ2NvbnRleHRtZW51IFtjb250ZW50ZWRpdGFibGVdJzogICdfaGFuZGxlQ29udGV4dE1lbnUnLFxuICAgICdjbGljayc6ICAgICAgICAgICAgICAgICAgICAgICAgICAnX2hhbmRsZUNsaWNrJyxcbiAgICAnY2xpY2sgW2NvbnRlbnRlZGl0YWJsZV0nOiAgICAgICAgJ19oYW5kbGVDbGljaydcbiAgfSksXG5cbiAgX2ZvY3VzUHNldWRvOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsID0gdGhpcy5lZGl0YWJsZUVsKCk7XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsLmZvY3VzKCk7XG5cbiAgICBpZiAoZWwuc2VsZWN0KSB7XG4gICAgICBlbC5zZWxlY3QoKTtcbiAgICB9XG4gIH0sXG5cbiAgX2hhbmRsZUZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgQ2hvaWNlVmlldy5wcm90b3R5cGUuX2hhbmRsZUZvY3VzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgdGFibGUgPSB0aGlzLm1vZGVsLnRhYmxlO1xuICAgIHZhciBjZWxsID0gdGhpcy5tb2RlbDtcbiAgICB2YXIgY2VsbHMgPSBjZWxsLmNvbGxlY3Rpb247XG4gICAgdmFyIHJ1bGUgPSBjZWxscy5wYXJlbnQ7XG4gICAgdmFyIHJ1bGVzID0gdGFibGUucnVsZXM7XG5cbiAgICB2YXIgeCA9IGNlbGxzLmluZGV4T2YoY2VsbCk7XG4gICAgdmFyIHkgPSBydWxlcy5pbmRleE9mKHJ1bGUpO1xuXG4gICAgaWYgKHRhYmxlLnggIT09IHggfHwgdGFibGUueSAhPT0geSkge1xuICAgICAgdGFibGUuc2V0KHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgICAgfSwge1xuICAgICAgICAvLyBzaWxlbnQ6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGFibGUudHJpZ2dlcignY2hhbmdlOmZvY3VzJyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXJlbnQucGFyZW50LmhpZGVDb250ZXh0TWVudSgpO1xuICB9LFxuXG4gIF9oYW5kbGVDbGljazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGFyZW50LnBhcmVudC5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICB0aGlzLl9mb2N1c1BzZXVkbygpO1xuICB9LFxuXG4gIF9oYW5kbGVDb250ZXh0TWVudTogZnVuY3Rpb24gKGV2dCkge1xuICAgIHRoaXMucGFyZW50LnBhcmVudC5zaG93Q29udGV4dE1lbnUodGhpcy5tb2RlbCwgZXZ0KTtcbiAgfSxcblxuICBzZXRGb2N1czogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5lbCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0aGlzLm1vZGVsLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuXG4gICAgICBpZiAodGhpcy5wYXJlbnQucGFyZW50LmNvbnRleHRNZW51KSB7XG4gICAgICAgIHRoaXMucGFyZW50LnBhcmVudC5jb250ZXh0TWVudS5jbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5wYXJlbnQucGFyZW50LmNsYXVzZVZhbHVlc0VkaXRvcikge1xuICAgICAgICB0aGlzLnBhcmVudC5wYXJlbnQuY2xhdXNlVmFsdWVzRWRpdG9yLmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKEVsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5lZGl0YWJsZUVsKCkpKSB7XG4gICAgICAgIHRoaXMuX2ZvY3VzUHNldWRvKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1c2VkJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kZWwueCA9PT0gdGhpcy5tb2RlbC50YWJsZS54KSB7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2NvbC1mb2N1c2VkJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdjb2wtZm9jdXNlZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1vZGVsLnkgPT09IHRoaXMubW9kZWwudGFibGUueSkge1xuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdyb3ctZm9jdXNlZCcpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncm93LWZvY3VzZWQnKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub24oJ2NoYW5nZTplbCcsIHRoaXMuc2V0Rm9jdXMpO1xuICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGhpcy5tb2RlbC50YWJsZSwgJ2NoYW5nZTpmb2N1cycsIHRoaXMuc2V0Rm9jdXMpO1xuICB9XG59KSk7XG5cblxuXG52YXIgUnVsZUlucHV0Q2VsbFZpZXcgPSBSdWxlQ2VsbFZpZXcuZXh0ZW5kKHt9KTtcblxudmFyIFJ1bGVPdXRwdXRDZWxsVmlldyA9IFJ1bGVDZWxsVmlldy5leHRlbmQoe30pO1xuXG52YXIgUnVsZUFubm90YXRpb25DZWxsVmlldyA9IFJ1bGVDZWxsVmlldy5leHRlbmQoe30pO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENlbGw6ICAgICAgIFJ1bGVDZWxsVmlldyxcbiAgSW5wdXQ6ICAgICAgUnVsZUlucHV0Q2VsbFZpZXcsXG4gIE91dHB1dDogICAgIFJ1bGVPdXRwdXRDZWxsVmlldyxcbiAgQW5ub3RhdGlvbjogUnVsZUFubm90YXRpb25DZWxsVmlld1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCBkZXBzOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcblxudmFyIFN1Z2dlc3Rpb25zVmlldyA9IHJlcXVpcmUoJy4vc3VnZ2VzdGlvbnMtdmlldycpO1xuXG52YXIgc3VnZ2VzdGlvbnNWaWV3ID0gU3VnZ2VzdGlvbnNWaWV3Lmluc3RhbmNlKCk7XG5cbnZhciBzcGVjaWFsS2V5cyA9IFtcbiAgOCAvLyBiYWNrc3BhY2Vcbl07XG5cbnZhciBDaG9pY2VWaWV3ID0gVmlldy5leHRlbmQoe1xuICBjb2xsZWN0aW9uczoge1xuICAgIGNob2ljZXM6IFN1Z2dlc3Rpb25zVmlldy5Db2xsZWN0aW9uXG4gIH0sXG5cbiAgZXZlbnRzOiB7XG4gICAgaW5wdXQ6ICdfaGFuZGxlSW5wdXQnLFxuICAgICdpbnB1dCBbY29udGVudGVkaXRhYmxlXSc6ICdfaGFuZGxlSW5wdXQnLFxuICAgIGZvY3VzOiAnX2hhbmRsZUZvY3VzJyxcbiAgICAnZm9jdXMgW2NvbnRlbnRlZGl0YWJsZV0nOiAnX2hhbmRsZUZvY3VzJ1xuICB9LFxuXG4gIHNlc3Npb246IHtcbiAgICB2YWxpZDogICAgICAgICAge1xuICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgIH0sXG5cbiAgICBvcmlnaW5hbFZhbHVlOiAgJ3N0cmluZydcbiAgfSxcblxuICBkZXJpdmVkOiB7XG4gICAgaXNPcmlnaW5hbDoge1xuICAgICAgZGVwczogWydtb2RlbC52YWx1ZScsICdvcmlnaW5hbFZhbHVlJ10sXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZSA9PT0gdGhpcy5vcmlnaW5hbFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBiaW5kaW5nczoge1xuICAgICdtb2RlbC52YWx1ZSc6IHtcbiAgICAgIHR5cGU6IGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUudHJpbSgpKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmVsLnRleHRDb250ZW50ID0gdmFsdWUudHJpbSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAnbW9kZWwuZm9jdXNlZCc6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuQ2xhc3MnLFxuICAgICAgbmFtZTogJ2ZvY3VzZWQnXG4gICAgfSxcblxuICAgIGlzT3JpZ2luYWw6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuQ2xhc3MnLFxuICAgICAgbmFtZTogJ3VudG91Y2hlZCdcbiAgICB9XG4gIH0sXG5cbiAgZWRpdGFibGVFbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdbY29udGVudGVkaXRhYmxlXScpIHx8IHRoaXMuZWw7XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAodGhpcy5lbCkge1xuICAgICAgdGhpcy5lbC5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5lbC5zcGVsbGNoZWNrID0gZmFsc2U7XG4gICAgICB0aGlzLm9yaWdpbmFsVmFsdWUgPSB0aGlzLnZhbHVlID0gdGhpcy5lbC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5vcmlnaW5hbFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG5cblxuICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGhpcy5tb2RlbCwgJ2NoYW5nZTpjaG9pY2VzJywgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNob2ljZXMgPSB0aGlzLm1vZGVsLmNob2ljZXM7XG4gICAgICBpZiAoIXRoaXMuY2hvaWNlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWNob2ljZXMpIHtcbiAgICAgICAgY2hvaWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNob2ljZXMucmVzZXQoY2hvaWNlcy5tYXAoZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBjaG9pY2V9O1xuICAgICAgfSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWdnZXN0aW9ucyA9IG5ldyBTdWdnZXN0aW9uc1ZpZXcuQ29sbGVjdGlvbih7XG4gICAgICBwYXJlbnQ6IHRoaXMuY2hvaWNlc1xuICAgIH0pO1xuICB9LFxuXG4gIF9maWx0ZXI6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICB2YXIgY2hvaWNlcyA9IHRoaXMubW9kZWwuY2hvaWNlcyB8fCB0aGlzLmNob2ljZXM7XG4gICAgdmFyIGVsID0gdGhpcy5lZGl0YWJsZUVsKCk7XG4gICAgdmFyIGZpbHRlcmVkID0gY2hvaWNlc1xuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGNob2ljZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNob2ljZS52YWx1ZS5pbmRleE9mKHZhbCkgPT09IDA7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjaG9pY2UpIHtcbiAgICAgICAgICAgIHZhciBjaGFycyA9IGVsLnRleHRDb250ZW50Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWwgPSBjaG9pY2UuZXNjYXBlID8gY2hvaWNlLmVzY2FwZSgndmFsdWUnKSA6IGNob2ljZS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBodG1sU3RyID0gJzxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0ZWRcIj4nICsgdmFsLnNsaWNlKDAsIGNoYXJzKSArICc8L3NwYW4+JztcbiAgICAgICAgICAgIGh0bWxTdHIgKz0gdmFsLnNsaWNlKGNoYXJzKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOiBjaG9pY2UudmFsdWUsXG4gICAgICAgICAgICAgIGh0bWw6IGh0bWxTdHJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIGZpbHRlcmVkO1xuICB9LFxuXG4gIF9oYW5kbGVGb2N1czogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2hhbmRsZUlucHV0KCk7XG4gIH0sXG5cbiAgX2hhbmRsZVJlc2l6ZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5lbCB8fCAhc3VnZ2VzdGlvbnNWaWV3KSB7IHJldHVybjsgfVxuICAgIHZhciBub2RlID0gdGhpcy5lbDtcbiAgICB2YXIgdG9wID0gbm9kZS5vZmZzZXRUb3A7XG4gICAgdmFyIGxlZnQgPSBub2RlLm9mZnNldExlZnQ7XG4gICAgdmFyIGhlbHBlciA9IHN1Z2dlc3Rpb25zVmlldy5lbDtcblxuICAgIHdoaWxlICgobm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50KSkge1xuICAgICAgaWYgKG5vZGUub2Zmc2V0VG9wKSB7XG4gICAgICAgIHRvcCArPSBwYXJzZUludChub2RlLm9mZnNldFRvcCwgMTApO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUub2Zmc2V0TGVmdCkge1xuICAgICAgICBsZWZ0ICs9IHBhcnNlSW50KG5vZGUub2Zmc2V0TGVmdCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRvcCAtPSBoZWxwZXIuY2xpZW50SGVpZ2h0O1xuICAgIGhlbHBlci5zdHlsZS50b3AgPSB0b3A7XG4gICAgaGVscGVyLnN0eWxlLmxlZnQgPSBsZWZ0O1xuICB9LFxuXG4gIF9oYW5kbGVJbnB1dDogZnVuY3Rpb24gKGV2dCkge1xuICAgIGlmIChldnQgJiYgKHNwZWNpYWxLZXlzLmluZGV4T2YoZXZ0LmtleUNvZGUpID4gLTEgfHwgZXZ0LmN0cmxLZXkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbCA9IHRoaXMuZWRpdGFibGVFbCgpO1xuICAgIHZhciB2YWwgPSBlbC50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICB2YXIgZmlsdGVyZWQgPSB0aGlzLl9maWx0ZXIodmFsKTtcbiAgICBzdWdnZXN0aW9uc1ZpZXcuc2hvdyhmaWx0ZXJlZCwgdGhpcyk7XG4gICAgdGhpcy5faGFuZGxlUmVzaXplKCk7XG5cbiAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAoZXZ0KSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2hpbmcgPSBmaWx0ZXJlZFswXS52YWx1ZTtcbiAgICAgIHRoaXMubW9kZWwuc2V0KHtcbiAgICAgICAgdmFsdWU6IG1hdGNoaW5nXG4gICAgICB9LCB7XG4gICAgICAgIHNpbGVudDogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBlbC50ZXh0Q29udGVudCA9IG1hdGNoaW5nO1xuICAgIH1cbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hvaWNlVmlldztcbiIsIid1c2Ugc3RyaWN0Jztcbi8qZ2xvYmFsIG1vZHVsZTogZmFsc2UsIGRlcHM6IHRydWUsIHJlcXVpcmU6IGZhbHNlKi9cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHZhciBkZXBzID0gcmVxdWlyZTsgfVxuZWxzZSB7IHZhciBkZXBzID0gd2luZG93LmRlcHM7IH1cblxudmFyIFN0YXRlID0gZGVwcygnYW1wZXJzYW5kLXN0YXRlJyk7XG52YXIgQ29sbGVjdGlvbiA9IGRlcHMoJ2FtcGVyc2FuZC1jb2xsZWN0aW9uJyk7XG5cbnZhciBDbGF1c2VNb2RlbCA9IFN0YXRlLmV4dGVuZCh7XG4gIC8qXG4gIGNvbGxlY3Rpb25zOiB7XG4gICAgY2hvaWNlczogQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgICAgbW9kZWw6IFN0YXRlLmV4dGVuZCh7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgdmFsdWU6ICdzdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgKi9cbiAgXG4gIHByb3BzOiB7XG4gICAgbGFiZWw6ICAgICdzdHJpbmcnLFxuICAgIGNob2ljZXM6ICAnYXJyYXknLFxuICAgIG1hcHBpbmc6ICAnc3RyaW5nJyxcbiAgICBkYXRhdHlwZToge3R5cGU6ICdzdHJpbmcnLCBkZWZhdWx0OiAnc3RyaW5nJ31cbiAgfSxcblxuICBzZXNzaW9uOiB7XG4gICAgZWRpdGFibGU6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTW9kZWw6IENsYXVzZU1vZGVsLFxuICBDb2xsZWN0aW9uOiBDb2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgbW9kZWw6IENsYXVzZU1vZGVsXG4gIH0pXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIHJlcXVpcmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlLCBkZXBzOiBmYWxzZSAqL1xuXG52YXIgVmlldyA9IGRlcHMoJ2FtcGVyc2FuZC12aWV3Jyk7XG52YXIgbWVyZ2UgPSBkZXBzKCdsb2Rhc2gubWVyZ2UnKTtcbnZhciBjb250ZXh0Vmlld3NNaXhpbiA9IHJlcXVpcmUoJy4vY29udGV4dC12aWV3cy1taXhpbicpO1xuXG5cbnZhciBMYWJlbFZpZXcgPSBWaWV3LmV4dGVuZChtZXJnZSh7fSwge1xuICBldmVudHM6IHtcbiAgICAnZm9jdXMnOiAgICAgICAgICAgICAgICAgICAgICAgICAgJ19oYW5kbGVGb2N1cycsXG4gICAgJ2ZvY3VzIFtjb250ZW50ZWRpdGFibGVdJzogICAgICAgICdfaGFuZGxlRm9jdXMnLFxuICAgICdjbGljayc6ICAgICAgICAgICAgICAgICAgICAgICAgICAnX2hhbmRsZUZvY3VzJyxcbiAgICAnY2xpY2sgW2NvbnRlbnRlZGl0YWJsZV0nOiAgICAgICAgJ19oYW5kbGVGb2N1cycsXG4gICAgJ2lucHV0JzogICAgICAgICAgICAgICAgICAgICAgICAgICdfaGFuZGxlSW5wdXQnLFxuICAgICdpbnB1dCBbY29udGVudGVkaXRhYmxlXSc6ICAgICAgICAnX2hhbmRsZUlucHV0JyxcbiAgICAnY29udGV4dG1lbnUnOiAgICAgICAgICAgICAgICAgICAgJ19oYW5kbGVDb250ZXh0TWVudScsXG4gICAgJ2NvbnRleHRtZW51IFtjb250ZW50ZWRpdGFibGVdJzogICdfaGFuZGxlQ29udGV4dE1lbnUnLFxuICB9LFxuXG4gIGRlcml2ZWQ6IG1lcmdlKHt9LCBjb250ZXh0Vmlld3NNaXhpbiwge1xuICAgIHRhYmxlOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdtb2RlbC5jb2xsZWN0aW9uJyxcbiAgICAgICAgJ21vZGVsLmNvbGxlY3Rpb24ucGFyZW50J1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmNvbGxlY3Rpb24ucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfSksXG5cbiAgYmluZGluZ3M6IHtcbiAgICAnbW9kZWwubGFiZWwnOiB7XG4gICAgICB0eXBlOiBmdW5jdGlvbiAoZWwsIHZhbCkge1xuICAgICAgICB2YXIgZWRpdGFibGUgPSB0aGlzLmVkaXRhYmxlRWwoKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVkaXRhYmxlKSB7IHJldHVybjsgfVxuICAgICAgICBlZGl0YWJsZS50ZXh0Q29udGVudCA9ICh2YWwgfHwgJycpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZWRpdGFibGVFbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KCdbY29udGVudGVkaXRhYmxlXScpIHx8IHRoaXMuZWw7XG4gIH0sXG5cbiAgX2hhbmRsZUZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50YWJsZS54ID0gdGhpcy5tb2RlbC54O1xuICAgIHRoaXMudGFibGUudHJpZ2dlcignY2hhbmdlOmZvY3VzJyk7XG4gIH0sXG5cbiAgX2hhbmRsZUlucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tb2RlbC5sYWJlbCA9IHRoaXMuZWRpdGFibGVFbCgpLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICB0aGlzLl9oYW5kbGVGb2N1cygpO1xuICB9LFxuXG4gIF9oYW5kbGVDb250ZXh0TWVudTogZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciB0eXBlID0gdGhpcy5tb2RlbC5jbGF1c2VUeXBlO1xuICAgIHZhciB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgdGhpcy5faGFuZGxlRm9jdXMoKTtcblxuICAgIHZhciBhZGRNZXRob2QgPSB0eXBlID09PSAnaW5wdXQnID8gJ2FkZElucHV0JyA6ICdhZGRPdXRwdXQnO1xuXG4gICAgdGhpcy5jb250ZXh0TWVudS5vcGVuKHtcbiAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIHRvcDogZXZ0LnBhZ2VZLFxuICAgICAgbGVmdDogZXZ0LnBhZ2VYLFxuICAgICAgY29tbWFuZHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiB0eXBlID09PSAnaW5wdXQnID8gJ0lucHV0JyA6ICdPdXRwdXQnLFxuICAgICAgICAgIGljb246IHR5cGUsXG4gICAgICAgICAgc3ViY29tbWFuZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICdhZGQnLFxuICAgICAgICAgICAgICBpY29uOiAncGx1cycsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGFibGVbYWRkTWV0aG9kXSgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWJjb21tYW5kczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmVmb3JlJyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW2FkZE1ldGhvZF0oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYWZ0ZXInLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW2FkZE1ldGhvZF0oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnY29weScsXG4gICAgICAgICAgICAgIC8vIGljb246ICdwbHVzJyxcbiAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICAgICAgICBzdWJjb21tYW5kczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYmVmb3JlJyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7fVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICdhZnRlcicsXG4gICAgICAgICAgICAgICAgICBpY29uOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJ21vdmUnLFxuICAgICAgICAgICAgICAvLyBpY29uOiAncGx1cycsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgICAgICAgc3ViY29tbWFuZHM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ2JlZm9yZScsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge31cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnYWZ0ZXInLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGFiZWw6ICdyZW1vdmUnLFxuICAgICAgICAgICAgICBpY29uOiAnbWludXMnLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWRpdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgZWRpdGFibGUuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCB0cnVlKTtcbiAgICBlZGl0YWJsZS50ZXh0Q29udGVudCA9ICh0aGlzLm1vZGVsLmxhYmVsIHx8ICcnKS50cmltKCk7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGVkaXRhYmxlKTtcbiAgfVxufSkpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gTGFiZWxWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIG1vZHVsZTogZmFsc2UsIGRlcHM6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBtZXJnZSA9IGRlcHMoJ2xvZGFzaC5tZXJnZScpO1xuXG5cblxudmFyIE1hcHBpbmdWaWV3ID0gVmlldy5leHRlbmQobWVyZ2Uoe30sIHtcbiAgZXZlbnRzOiB7XG4gICAgJ2lucHV0JzogJ19oYW5kbGVJbnB1dCcsXG4gIH0sXG5cbiAgZGVyaXZlZDoge1xuICAgIHRhYmxlOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdtb2RlbC5jb2xsZWN0aW9uJyxcbiAgICAgICAgJ21vZGVsLmNvbGxlY3Rpb24ucGFyZW50J1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmNvbGxlY3Rpb24ucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBiaW5kaW5nczoge1xuICAgICdtb2RlbC5tYXBwaW5nJzoge1xuICAgICAgdHlwZTogZnVuY3Rpb24gKGVsLCB2YWwpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7IHJldHVybjsgfVxuICAgICAgICBlbC50ZXh0Q29udGVudCA9ICh2YWwgfHwgJycpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX2hhbmRsZUlucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tb2RlbC5tYXBwaW5nID0gdGhpcy5lbC50ZXh0Q29udGVudC50cmltKCk7XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnLCB0cnVlKTtcbiAgICB0aGlzLmVsLnRleHRDb250ZW50ID0gKHRoaXMubW9kZWwubWFwcGluZyB8fCAnJykudHJpbSgpO1xuICB9XG59KSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwcGluZ1ZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgcmVxdWlyZTogZmFsc2UsIG1vZHVsZTogZmFsc2UsIGRlcHM6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBtZXJnZSA9IGRlcHMoJ2xvZGFzaC5tZXJnZScpO1xudmFyIGNvbnRleHRWaWV3c01peGluID0gcmVxdWlyZSgnLi9jb250ZXh0LXZpZXdzLW1peGluJyk7XG5cbnZhciBWYWx1ZVZpZXcgPSBWaWV3LmV4dGVuZChtZXJnZSh7fSwge1xuICBldmVudHM6IHtcbiAgICAnY29udGV4dG1lbnUnOiAgICAnX2hhbmRsZUNvbnRleHRNZW51J1xuICB9LFxuXG4gIGRlcml2ZWQ6IG1lcmdlKHt9LCBjb250ZXh0Vmlld3NNaXhpbiwge1xuICAgIHRhYmxlOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdtb2RlbC5jb2xsZWN0aW9uJyxcbiAgICAgICAgJ21vZGVsLmNvbGxlY3Rpb24ucGFyZW50J1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmNvbGxlY3Rpb24ucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfSksXG5cbiAgYmluZGluZ3M6IHtcbiAgICAnbW9kZWwuY2hvaWNlcyc6IHtcbiAgICAgIHR5cGU6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJDb250ZW50KGVsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdtb2RlbC5kYXRhdHlwZSc6IHtcbiAgICAgIHR5cGU6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJDb250ZW50KGVsKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgX3JlbmRlckNvbnRlbnQ6IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgdmFsID0gdGhpcy5tb2RlbC5jaG9pY2VzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCkge1xuICAgICAgc3RyID0gJygnICsgdmFsLmpvaW4oJywgJykgKyAnKSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc3RyID0gdGhpcy5tb2RlbC5kYXRhdHlwZTtcbiAgICB9XG4gICAgZWwudGV4dENvbnRlbnQgPSBzdHI7XG4gIH0sXG5cbiAgX2hhbmRsZUNvbnRleHRNZW51OiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY2xhdXNlVmFsdWVzRWRpdG9yLnNob3codGhpcy5tb2RlbC5kYXRhdHlwZSwgdGhpcy5tb2RlbC5jaG9pY2VzLCB0aGlzKTtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSkpO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlVmlldztcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UgKi9cblxudmFyIFZpZXcgPSBkZXBzKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIExhYmVsVmlldyA9IHJlcXVpcmUoJy4vY2xhdXNlLWxhYmVsLXZpZXcnKTtcbnZhciBWYWx1ZVZpZXcgPSByZXF1aXJlKCcuL2NsYXVzZS12YWx1ZS12aWV3Jyk7XG52YXIgTWFwcGluZ1ZpZXcgPSByZXF1aXJlKCcuL2NsYXVzZS1tYXBwaW5nLXZpZXcnKTtcblxuXG5cblxuXG52YXIgcmVxdWlyZWRFbGVtZW50ID0ge1xuICB0eXBlOiAnZWxlbWVudCcsXG4gIHJlcXVpcmVkOiB0cnVlXG59O1xuXG52YXIgQ2xhdXNlVmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgc2Vzc2lvbjoge1xuICAgIGxhYmVsRWw6ICAgIHJlcXVpcmVkRWxlbWVudCxcbiAgICBtYXBwaW5nRWw6ICByZXF1aXJlZEVsZW1lbnQsXG4gICAgdmFsdWVFbDogICAgcmVxdWlyZWRFbGVtZW50XG4gIH0sXG5cbiAgZGVyaXZlZDoge1xuICAgIHRhYmxlOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdtb2RlbCcsXG4gICAgICAgICdtb2RlbC5jb2xsZWN0aW9uJyxcbiAgICAgICAgJ21vZGVsLmNvbGxlY3Rpb24ucGFyZW50J1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmNvbGxlY3Rpb24ucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNsYXVzZSA9IHRoaXMubW9kZWw7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIHN1YnZpZXdzID0ge1xuICAgICAgbGFiZWw6ICAgIExhYmVsVmlldyxcbiAgICAgIG1hcHBpbmc6ICBNYXBwaW5nVmlldyxcbiAgICAgIHZhbHVlOiAgICBWYWx1ZVZpZXdcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMoc3Vidmlld3MpLmZvckVhY2goZnVuY3Rpb24gKGtpbmQpIHtcbiAgICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGhpcy5tb2RlbCwgJ2NoYW5nZTonICsga2luZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpc1traW5kICsgJ1ZpZXcnXSkge1xuICAgICAgICAgIHRoaXMuc3RvcExpc3RlbmluZyh0aGlzW2tpbmQgKyAnVmlldyddKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXNba2luZCArICdWaWV3J10gPSBuZXcgc3Vidmlld3Nba2luZF0oe1xuICAgICAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgICAgICBtb2RlbDogIGNsYXVzZSxcbiAgICAgICAgICBlbDogICAgIHRoaXNba2luZCArICdFbCddXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICBmdW5jdGlvbiB0YWJsZUNoYW5nZUZvY3VzKCkge1xuICAgICAgaWYgKHNlbGYubW9kZWwuZm9jdXNlZCkge1xuICAgICAgICBzZWxmLmxhYmVsRWwuY2xhc3NMaXN0LmFkZCgnY29sLWZvY3VzZWQnKTtcbiAgICAgICAgc2VsZi5tYXBwaW5nRWwuY2xhc3NMaXN0LmFkZCgnY29sLWZvY3VzZWQnKTtcbiAgICAgICAgc2VsZi52YWx1ZUVsLmNsYXNzTGlzdC5hZGQoJ2NvbC1mb2N1c2VkJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VsZi5sYWJlbEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbC1mb2N1c2VkJyk7XG4gICAgICAgIHNlbGYubWFwcGluZ0VsLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbC1mb2N1c2VkJyk7XG4gICAgICAgIHNlbGYudmFsdWVFbC5jbGFzc0xpc3QucmVtb3ZlKCdjb2wtZm9jdXNlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRhYmxlLm9uKCdjaGFuZ2U6Zm9jdXMnLCB0YWJsZUNoYW5nZUZvY3VzKTtcbiAgICB0YWJsZUNoYW5nZUZvY3VzKCk7XG4gIH1cbn0pO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IENsYXVzZVZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UsIHJlcXVpcmU6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBDb2xsZWN0aW9uID0gZGVwcygnYW1wZXJzYW5kLWNvbGxlY3Rpb24nKTtcbnZhciBTdGF0ZSA9IGRlcHMoJ2FtcGVyc2FuZC1zdGF0ZScpO1xudmFyIENvbWJvQm94VmlldyA9IHJlcXVpcmUoJy4vY29tYm9ib3gtdmlldycpO1xuXG5cblxudmFyIFZhbHVlc0NvbGxlY3Rpb24gPSBDb2xsZWN0aW9uLmV4dGVuZCh7XG4gIGxhc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbHNbdGhpcy5tb2RlbHMubGVuZ3RoIC0gMV07XG4gIH0sXG5cbiAgcmVzdHJpcGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbW9kZWxzID0gdGhpcy5maWx0ZXIoZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICByZXR1cm4gbW9kZWwudmFsdWU7XG4gICAgfSk7XG5cbiAgICBtb2RlbHMucHVzaCh7XG4gICAgICB2YWx1ZTogJydcbiAgICB9KTtcblxuICAgIHRoaXMucmVzZXQobW9kZWxzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1vZGVsOiBTdGF0ZS5leHRlbmQoe1xuICAgIHByb3BzOiB7XG4gICAgICB2YWx1ZTogJ3N0cmluZydcbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5vbignY2hhbmdlOnZhbHVlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24ucmVzdHJpcGUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSlcbn0pO1xuXG52YXIgVmFsdWVzSXRlbVZpZXcgPSBWaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlOiAnPGxpPjxpbnB1dCB0YWJpbmRleD1cIjFcIiAvPjwvbGk+JyxcblxuICBzZXNzaW9uOiB7XG4gICAgaW52YWxpZDogJ2Jvb2xlYW4nXG4gIH0sXG5cbiAgYmluZGluZ3M6IHtcbiAgICAnbW9kZWwudmFsdWUnOiB7XG4gICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgc2VsZWN0b3I6ICdpbnB1dCdcbiAgICB9LFxuICAgIGludmFsaWQ6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuQ2xhc3MnLFxuICAgICAgbmFtZTogJ2ludmFsaWQnLFxuICAgICAgc2VsZWN0b3I6ICdpbnB1dCdcbiAgICB9XG4gIH0sXG5cbiAgZXZlbnRzOiB7XG4gICAgJ2NoYW5nZSBpbnB1dCc6ICAgJ19oYW5kbGVWYWx1ZUNoYW5nZScsXG4gICAgJ2JsdXIgaW5wdXQnOiAgICAgJ19oYW5kbGVWYWx1ZUNoYW5nZScsXG4gICAgJ2tleWRvd24gaW5wdXQnOiAgJ19oYW5kbGVWYWx1ZUtleWRvd24nLFxuICAgICdrZXl1cCBpbnB1dCc6ICAgICdfaGFuZGxlVmFsdWVLZXl1cCdcbiAgfSxcblxuICBfaGFuZGxlVmFsdWVDaGFuZ2U6IGZ1bmN0aW9uIChldnQpIHtcbiAgICBpZiAodGhpcy5tb2RlbC52YWx1ZSAhPT0gZXZ0LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuICB9LFxuXG4gIF9oYW5kbGVWYWx1ZUtleWRvd246IGZ1bmN0aW9uIChldnQpIHtcbiAgICB2YXIgY29kZSA9IGV2dC53aGljaCB8fCBldnQua2V5Q29kZTtcblxuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5tb2RlbC5jb2xsZWN0aW9uO1xuICAgIHZhciBsYXN0ID0gY29sbGVjdGlvbi5sYXN0KCk7XG5cbiAgICBpZiAobGFzdCA9PT0gdGhpcy5tb2RlbCAmJiBldnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICBjb2xsZWN0aW9uLmFkZCh7dmFsdWU6ICcnfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDkpIHtcbiAgICAgIHZhciBpbnB1dHMgPSB0aGlzLnBhcmVudC5xdWVyeUFsbCgnLmFsbG93ZWQtdmFsdWVzIGlucHV0Jyk7XG4gICAgICB2YXIgbGFzdElucHV0ID0gaW5wdXRzW2lucHV0cy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGlucHV0cy5pbmRleE9mKGV2dC50YXJnZXQpID09PSAoaW5wdXRzLmxlbmd0aCAtIDIpKSB7XG4gICAgICAgIGxhc3RJbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBfaGFuZGxlVmFsdWVLZXl1cDogZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcy5tb2RlbC5jb2xsZWN0aW9uO1xuICAgIHZhciBsYXN0ID0gY29sbGVjdGlvbi5sYXN0KCk7XG5cbiAgICBpZiAobGFzdCA9PT0gdGhpcy5tb2RlbCAmJiBldnQudGFyZ2V0LnZhbHVlKSB7XG4gICAgICBjb2xsZWN0aW9uLmFkZCh7dmFsdWU6ICcnfSk7XG4gICAgfVxuICB9LFxuXG4gIHZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbCA9IHRoaXMubW9kZWwudmFsdWU7XG4gICAgaWYgKCF2YWwpIHtcbiAgICAgIHRoaXMuaW52YWxpZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIGNpZCA9IHRoaXMubW9kZWwuY2lkO1xuICAgIHZhciBzYW1lID0gdGhpcy5tb2RlbC5jb2xsZWN0aW9uLmZpbHRlcihmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgIHJldHVybiBvdGhlci5jaWQgIT09IGNpZCAmJiBvdGhlci52YWx1ZSA9PT0gdmFsO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbnZhbGlkID0gc2FtZS5sZW5ndGggPiAwO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5cblxuXG5cblxuXG52YXIgRGF0YXR5cGVzQ29sbGVjdGlvbiA9IENvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgbWFpbkluZGV4OiAndmFsdWUnLFxuICBtb2RlbDogU3RhdGUuZXh0ZW5kKHtcbiAgICBwcm9wczoge1xuICAgICAgdmFsdWU6ICdzdHJpbmcnLFxuICAgICAgb2ZmZXI6ICdzdHJpbmcnXG4gICAgfVxuICB9KVxufSk7XG5cblxuXG5cbnZhciBwcmltaXRpdmVUeXBlcyA9IFtcbiAge1xuICAgIHZhbHVlOiAnc3RyaW5nJyxcbiAgICBvZmZlcjogJ2Nob2ljZXMnXG4gIH0sXG4gIHtcbiAgICB2YWx1ZTogJ2RhdGUnLFxuICAgIG9mZmVyOiAncmFuZ2UnXG4gIH0sXG5cbiAgLy8gaHR0cHM6Ly9kb2NzLm9yYWNsZS5jb20vamF2YXNlL3R1dG9yaWFsL2phdmEvbnV0c2FuZGJvbHRzL2RhdGF0eXBlcy5odG1sXG4gIHtcbiAgICB2YWx1ZTogJ3Nob3J0JyxcbiAgICBvZmZlcjogJ3JhbmdlJ1xuICB9LFxuICB7XG4gICAgdmFsdWU6ICdpbnQnLFxuICAgIG9mZmVyOiAncmFuZ2UnXG4gIH0sXG4gIHtcbiAgICB2YWx1ZTogJ2xvbmcnLFxuICAgIG9mZmVyOiAncmFuZ2UnXG4gIH0sXG4gIHtcbiAgICB2YWx1ZTogJ2Zsb2F0JyxcbiAgICBvZmZlcjogJ3JhbmdlJ1xuICB9LFxuICB7XG4gICAgdmFsdWU6ICdkb3VibGUnLFxuICAgIG9mZmVyOiAncmFuZ2UnXG4gIH0sXG5cbiAge1xuICAgIHZhbHVlOiAnYm9vbGVhbidcbiAgfVxuXTtcblxuXG52YXIgQ2xhdXNlVmFsdWVzVmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZG1uLWNsYXVzZXZhbHVlcy1zZXR0ZXIgY2hvaWNlc1wiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGF0eXBlXCI+JyArXG4gICAgICAgICAgICAgICc8L2Rpdj4nICtcblxuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFsbG93ZWQtdmFsdWVzXCI+JyArXG4gICAgICAgICAgICAgICAgJzxsYWJlbD5BbGxvd2VkIHZhbHVlczo8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgICc8dWw+PC91bD4nICtcbiAgICAgICAgICAgICAgJzwvZGl2PicgK1xuXG4gICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJyYW5nZWQtdmFsdWVzXCI+JyArXG4gICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cIm1pblwiPicgK1xuICAgICAgICAgICAgICAgICAgJzxsYWJlbD5NaW46PC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgICAgICc8aW5wdXQgdGFiaW5kZXg9XCIxXCIgLz4nICtcbiAgICAgICAgICAgICAgICAnPC9saT4nICtcbiAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwibWF4XCI+JyArXG4gICAgICAgICAgICAgICAgICAnPGxhYmVsPk1heDo8L2xhYmVsPicgK1xuICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0YWJpbmRleD1cIjJcIiAvPicgK1xuICAgICAgICAgICAgICAgICc8L2xpPicgK1xuICAgICAgICAgICAgICAnPC91bD4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuXG4gIHN1YnZpZXdzOiB7XG4gICAgZGF0YXR5cGVWaWV3OiB7XG4gICAgICBjb250YWluZXI6ICcuZGF0YXR5cGUnLFxuICAgICAgcHJlcGFyZVZpZXc6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgY29tYm9ib3hWaWV3ID0gbmV3IENvbWJvQm94Vmlldyh7XG4gICAgICAgICAgcGFyZW50OiAgICAgdGhpcyxcbiAgICAgICAgICBjb2xsZWN0aW9uOiB0aGlzLmRhdGF0eXBlcyxcbiAgICAgICAgICAvLyB2YWx1ZTogICAgICB0aGlzLmRhdGF0eXBlLFxuICAgICAgICAgIGxhYmVsOiAgICAgICdUeXBlOicsXG4gICAgICAgICAgY2xhc3NOYW1lOiAgZWwuY2xhc3NOYW1lXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBjYkVsID0gY29tYm9ib3hWaWV3LnJlbmRlcigpLmVsO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjYkVsLCBlbCk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyhjb21ib2JveFZpZXcsICdjaGFuZ2U6dmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5kYXRhdHlwZSA9IGNvbWJvYm94Vmlldy52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vbignY2hhbmdlOnZpc2libGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgY29tYm9ib3hWaWV3LnNldFZpc2libGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21ib2JveFZpZXcuc3VnZ2VzdGlvbnNFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbWJvYm94VmlldztcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY29sbGVjdGlvbnM6IHtcbiAgICBkYXRhdHlwZXM6IERhdGF0eXBlc0NvbGxlY3Rpb24sXG4gICAgcG9zc2libGVWYWx1ZXM6IFZhbHVlc0NvbGxlY3Rpb25cbiAgfSxcblxuICBzZXNzaW9uOiB7XG4gICAgdmlzaWJsZTogJ2Jvb2xlYW4nLFxuICAgIGRhdGF0eXBlOiB7dHlwZTogJ3N0cmluZycsIGRlZmF1bHQ6ICdzdHJpbmcnfVxuICB9LFxuXG4gIGRlcml2ZWQ6IHtcbiAgICBjb250ZXh0TWVudToge1xuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSB0aGlzO1xuICAgICAgICB3aGlsZSAoKGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudCkpIHtcbiAgICAgICAgICBpZiAoY3VycmVudC5jb250ZXh0TWVudSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuY29udGV4dE1lbnU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGJpbmRpbmdzOiB7XG4gICAgdmlzaWJsZToge1xuICAgICAgdHlwZTogJ3RvZ2dsZSdcbiAgICB9LFxuICAgIGRhdGF0eXBlOiB7XG4gICAgICB0eXBlOiBmdW5jdGlvbihlbCwgdmFsLCBwcmV2KSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhdHlwZXMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgdHlwZTtcblxuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgIHR5cGUgPSB0aGlzLmRhdGF0eXBlcy5nZXQocHJldik7XG4gICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUodHlwZS5vZmZlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgIHR5cGUgPSB0aGlzLmRhdGF0eXBlcy5nZXQodmFsKTtcbiAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCh0eXBlLm9mZmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZXZlbnRzOiB7XG4gICAgJ2NoYW5nZSBzZWxlY3QnOiAnX2hhbmRsZURhdGF0eXBlQ2hhbmdlJ1xuICB9LFxuXG4gIF9oYW5kbGVEYXRhdHlwZUNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGF0YXR5cGUgPSB0aGlzLmRhdGF0eXBlRWwudmFsdWU7XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGhhc01vZGVsKCkge1xuICAgICAgcmV0dXJuIHNlbGYucGFyZW50ICYmIHNlbGYucGFyZW50Lm1vZGVsICYmIHNlbGYucGFyZW50Lm1vZGVsLmRhdGF0eXBlO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NoYW5nZTpkYXRhdHlwZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaGFzTW9kZWwoKSkgeyByZXR1cm47IH1cblxuICAgICAgdGhpcy5wYXJlbnQubW9kZWwuZGF0YXR5cGUgPSB0aGlzLmRhdGF0eXBlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLnBvc3NpYmxlVmFsdWVzLCAnYWxsJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFoYXNNb2RlbCgpKSB7IHJldHVybjsgfVxuXG4gICAgICB0aGlzLnBhcmVudC5tb2RlbC5jaG9pY2VzID0gdGhpcy5wb3NzaWJsZVZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgc2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50IHx8ICF0aGlzLnBhcmVudC5lbCkge1xuICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcmVudC5lbDtcbiAgICB2YXIgdG9wID0gbm9kZS5vZmZzZXRUb3A7XG4gICAgdmFyIGxlZnQgPSBub2RlLm9mZnNldExlZnQ7XG4gICAgdmFyIGhlbHBlciA9IHRoaXMuZWw7XG5cbiAgICB3aGlsZSAoKG5vZGUgPSBub2RlLm9mZnNldFBhcmVudCkpIHtcbiAgICAgIGlmIChub2RlLm9mZnNldFRvcCkge1xuICAgICAgICB0b3AgKz0gcGFyc2VJbnQobm9kZS5vZmZzZXRUb3AsIDEwKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLm9mZnNldExlZnQpIHtcbiAgICAgICAgbGVmdCArPSBwYXJzZUludChub2RlLm9mZnNldExlZnQsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZWZ0ICs9IHRoaXMucGFyZW50LmVsLmNsaWVudFdpZHRoO1xuICAgIHRvcCAtPSAyMDtcblxuICAgIGxlZnQgKz0gTWF0aC5taW4oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAtIChsZWZ0ICsgdGhpcy5lbC5jbGllbnRXaWR0aCksIDApO1xuICAgIHRvcCArPSBNYXRoLm1pbihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAtICh0b3AgKyB0aGlzLmVsLmNsaWVudEhlaWdodCksIDApO1xuXG4gICAgaGVscGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBoZWxwZXIuc3R5bGUudG9wID0gdG9wICsncHgnO1xuICAgIGhlbHBlci5zdHlsZS5sZWZ0ID0gbGVmdCArJ3B4JztcblxuXG4gICAgaWYgKHRoaXMuZGF0YXR5cGVWaWV3KSB7XG4gICAgICB0aGlzLmRhdGF0eXBlVmlldy5zZXRQb3NpdGlvbigpO1xuICAgIH1cbiAgfSxcblxuICBzaG93OiBmdW5jdGlvbiAoZGF0YXR5cGUsIHZhbHVlcywgcGFyZW50KSB7XG4gICAgaWYgKHBhcmVudCAmJiB0aGlzLnBhcmVudCAhPT0gcGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGF0eXBlcy5yZXNldChwcmltaXRpdmVUeXBlcyk7XG5cbiAgICBpZiAodGhpcy5kYXRhdHlwZSAmJiAhdGhpcy5kYXRhdHlwZVZpZXcuaW5wdXRFbC52YWx1ZSkge1xuICAgICAgdGhpcy5kYXRhdHlwZVZpZXcuaW5wdXRFbC52YWx1ZSA9IHRoaXMuZGF0YXR5cGU7XG4gICAgfVxuXG4gICAgdmFsdWVzID0gdmFsdWVzIHx8IFtdO1xuICAgIHZhciB2YWxzID0gKEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbCB9O1xuICAgIH0pIDogdmFsdWVzLnRvSlNPTigpKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XG4gICAgICAgIH0pO1xuICAgIHZhbHMucHVzaCh7IHZhbHVlOiAnJyB9KTtcblxuICAgIHRoaXMucG9zc2libGVWYWx1ZXMucmVzZXQodmFscyk7XG5cbiAgICBpbnN0YW5jZS52aXNpYmxlID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuY29udGV4dE1lbnUpIHtcbiAgICAgIHRoaXMucGFyZW50LmNvbnRleHRNZW51LmNsb3NlKCk7XG4gICAgfVxuXG4gICAgaWYgKGluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZW5kZXJXaXRoVGVtcGxhdGUoKTtcblxuICAgIHRoaXMuY2FjaGVFbGVtZW50cyh7XG4gICAgICB2YWx1ZXNFbDogICAndWwnLFxuXG4gICAgICBtaW5MYWJlbEVsOiAnLm1pbiBsYWJlbCcsXG4gICAgICBtaW5JbnB1dEVsOiAnLm1pbiBpbnB1dCcsXG5cbiAgICAgIG1heExhYmVsRWw6ICcubWF4IGxhYmVsJyxcbiAgICAgIG1heElucHV0RWw6ICcubWF4IGlucHV0J1xuICAgIH0pO1xuXG4gICAgdGhpcy5yZW5kZXJDb2xsZWN0aW9uKHRoaXMucG9zc2libGVWYWx1ZXMsIFZhbHVlc0l0ZW1WaWV3LCB0aGlzLnZhbHVlc0VsKTtcblxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5wb3NzaWJsZVZhbHVlcywgJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cblxuXG52YXIgaW5zdGFuY2U7XG5DbGF1c2VWYWx1ZXNWaWV3Lmluc3RhbmNlID0gZnVuY3Rpb24gKHN1Z2dlc3Rpb25zLCBwYXJlbnQpIHtcbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlID0gbmV3IENsYXVzZVZhbHVlc1ZpZXcoe30pO1xuICAgIGluc3RhbmNlLnJlbmRlcigpO1xuICB9XG5cbiAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGluc3RhbmNlLmVsKSkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5zdGFuY2UuZWwpO1xuICB9XG5cbiAgaW5zdGFuY2Uuc2hvdyhzdWdnZXN0aW9ucywgcGFyZW50KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59O1xuXG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuZG1uQ2xhdXNlVmFsdWVkRWRpdG9yID0gQ2xhdXNlVmFsdWVzVmlldy5pbnN0YW5jZSgpO1xufVxuXG5DbGF1c2VWYWx1ZXNWaWV3LkNvbGxlY3Rpb24gPSBWYWx1ZXNDb2xsZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENsYXVzZVZhbHVlc1ZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UgKi9cblxudmFyIFZpZXcgPSBkZXBzKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIENvbGxlY3Rpb24gPSBkZXBzKCdhbXBlcnNhbmQtY29sbGVjdGlvbicpO1xudmFyIFN0YXRlID0gZGVwcygnYW1wZXJzYW5kLXN0YXRlJyk7XG5cbmZ1bmN0aW9uIHRvQXJyYXkodGhpbmcpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseSh0aGluZyk7XG59XG5cbnZhciBTdWdnZXN0aW9uc0NvbGxlY3Rpb24gPSBDb2xsZWN0aW9uLmV4dGVuZCh7XG4gIG1vZGVsOiBTdGF0ZS5leHRlbmQoe1xuICAgIHByb3BzOiB7XG4gICAgICB2YWx1ZTogJ3N0cmluZycsXG4gICAgICBodG1sOiAnc3RyaW5nJ1xuICAgIH1cbiAgfSlcbn0pO1xuXG52YXIgU3VnZ2VzdGlvblZpZXcgPSBWaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlOiAnPGxpIHRhYmluZGV4PVwiMVwiPjwvbGk+JyxcblxuICBiaW5kaW5nczoge1xuICAgICdtb2RlbC52YWx1ZSc6IHtcbiAgICAgIHR5cGU6ICd0ZXh0J1xuICAgIC8vIH0sXG4gICAgLy8gJ21vZGVsLmh0bWwnOiB7XG4gICAgLy8gICB0eXBlOiAnaW5uZXJIVE1MJ1xuICAgIH1cbiAgfSxcblxuICBldmVudHM6IHtcbiAgICBjbGljazogICAgJ19oYW5kbGVDbGljaycsXG4gICAgZm9jdXM6ICAgICdfaGFuZGxlRm9jdXMnLFxuICAgIGtleWRvd246ICAnX2hhbmRsZUtleWRvd24nXG4gIH0sXG5cbiAgX2hhbmRsZUNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5wdXRFbC52YWx1ZSA9IHRoaXMucGFyZW50LnZhbHVlID0gdGhpcy5tb2RlbC52YWx1ZTtcbiAgICB0aGlzLnBhcmVudC5zdWdnZXN0aW9uc0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH0sXG5cbiAgX2hhbmRsZUZvY3VzOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5wdXRFbC52YWx1ZSA9IHRoaXMucGFyZW50LnZhbHVlID0gdGhpcy5tb2RlbC52YWx1ZTtcbiAgfSxcblxuICBfaGFuZGxlS2V5ZG93bjogZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciBjb2RlID0gZXZ0LndoaWNoIHx8IGV2dC5rZXlDb2RlO1xuICAgIGlmIChjb2RlID09PSA5KSB7XG4gICAgICB2YXIgaXRlbXMgPSB0aGlzLmVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcbiAgICAgIGl0ZW1zID0gdG9BcnJheShpdGVtcyk7XG4gICAgICB2YXIgY3VycmVudCA9IGl0ZW1zLmluZGV4T2YoZXZ0LnRhcmdldCk7XG5cbiAgICAgIGlmIChjb2RlID09PSA5IHx8IGNvZGUgPT09IDQwKSB7XG4gICAgICAgIGlmIChjdXJyZW50ID49IGl0ZW1zLmxlbmd0aCkgeyBjdXJyZW50ID0gMDsgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGN1cnJlbnQtLTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPCAwKSB7IGN1cnJlbnQgPSBpdGVtcy5sZW5ndGggLSAxOyB9XG4gICAgICB9XG5cbiAgICAgIGl0ZW1zW2N1cnJlbnRdLmZvY3VzKCk7XG4gICAgfVxuICB9XG59KTtcblxudmFyIENvbWJvQm94VmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiY29tYm9ib3hcIj48bGFiZWw+PC9sYWJlbD48aW5wdXQgdGFiaW5kZXg9XCIwXCIgLz48L2Rpdj4nLFxuXG4gIGNvbGxlY3Rpb25zOiB7XG4gICAgc3VnZ2VzdGlvbnM6IFN1Z2dlc3Rpb25zQ29sbGVjdGlvblxuICB9LFxuXG4gIHNlc3Npb246IHtcbiAgICB2YWx1ZTogICAgICAnc3RyaW5nJyxcbiAgICBsYWJlbDogICAgICAnc3RyaW5nJyxcbiAgICBjbGFzc05hbWU6ICAnc3RyaW5nJ1xuICB9LFxuXG4gIGJpbmRpbmdzOiB7XG4gICAgY2xhc3NOYW1lOiB7XG4gICAgICB0eXBlOiAnY2xhc3MnXG4gICAgfSxcblxuICAgIGxhYmVsOiB7XG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBzZWxlY3RvcjogJ2xhYmVsJ1xuICAgIH1cbiAgfSxcblxuICBldmVudHM6IHtcbiAgICAnaW5wdXQgaW5wdXQnOiAgICAnX2hhbmRsZUlucHV0JyxcbiAgICAnZm9jdXMgaW5wdXQnOiAgICAnX2hhbmRsZUZvY3VzJyxcbiAgICAnYmx1ciBpbnB1dCc6ICAgICAnX2hhbmRsZUJsdXInLFxuICAgICdrZXlkb3duIGlucHV0JzogICdfaGFuZGxlS2V5ZG93bidcbiAgfSxcblxuICBfaGFuZGxlRm9jdXM6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc3VnZ2VzdGlvbnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1Z2dlc3Rpb25zLnJlc2V0KHRoaXMuY29sbGVjdGlvbi50b0pTT04oKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5wdXRFbC5zZWxlY3QpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC5zZWxlY3QoKTtcbiAgICB9XG4gIH0sXG5cbiAgX2hhbmRsZUJsdXI6IGZ1bmN0aW9uICgpIHt9LFxuXG4gIF9oYW5kbGVJbnB1dDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5pbnB1dEVsLnZhbHVlLnRyaW0oKTtcbiAgICB0aGlzLnN1Z2dlc3Rpb25zLnJlc2V0KHRoaXMuZmlsdGVyKCkpO1xuICB9LFxuXG4gIF9oYW5kbGVLZXlkb3duOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgdmFyIGNvZGUgPSBldnQud2hpY2ggfHwgZXZ0LmtleUNvZGU7XG4gICAgaWYgKGNvZGUgPT09IDkgfHwgY29kZSA9PT0gNDApIHtcbiAgICAgIHRoaXMuc3VnZ2VzdGlvbnNWaWV3LnZpZXdzWzBdLmVsLmZvY3VzKCk7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29kZSA9PT0gMjcpIHsgLy8gZXNjXG4gICAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0sXG5cbiAgZmlsdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbHRlcmVkID0gdGhpcy5jb2xsZWN0aW9uLmZpbHRlcihmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIHJldHVybiBtb2RlbC52YWx1ZS5pbmRleE9mKHRoaXMudmFsdWUpID4gLTE7XG4gICAgfSwgdGhpcykubWFwKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgcmV0dXJuIG1vZGVsLnRvSlNPTigpO1xuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgfSxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29tYm9Cb3hWaWV3IHJlcXVpcmVzIGEgY29sbGVjdGlvbiBvcHRpb24nKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uKCdjaGFuZ2U6dmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMubW9kZWwgfHwgdGhpcy5tb2RlbC52YWx1ZSA9PT0gdGhpcy52YWx1ZSkgeyByZXR1cm47IH1cbiAgICAgIHRoaXMubW9kZWwudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH0pO1xuICB9LFxuXG4gIHNldFBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnQuZWwpIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gdGhpcy5pbnB1dEVsO1xuICAgIHZhciB0b3AgPSBub2RlLm9mZnNldFRvcCArIHRoaXMuaW5wdXRFbC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIGxlZnQgPSBub2RlLm9mZnNldExlZnQ7XG4gICAgdmFyIGhlbHBlciA9IHRoaXMuc3VnZ2VzdGlvbnNFbDtcblxuICAgIHdoaWxlICgobm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50KSkge1xuICAgICAgaWYgKG5vZGUub2Zmc2V0VG9wKSB7XG4gICAgICAgIHRvcCArPSBwYXJzZUludChub2RlLm9mZnNldFRvcCwgMTApO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUub2Zmc2V0TGVmdCkge1xuICAgICAgICBsZWZ0ICs9IHBhcnNlSW50KG5vZGUub2Zmc2V0TGVmdCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGhlbHBlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgaGVscGVyLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgaGVscGVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICBoZWxwZXIuc3R5bGUud2lkdGggPSB0aGlzLmlucHV0RWwuY2xpZW50V2lkdGggKyAncHgnO1xuICB9LFxuXG4gIHNldFZpc2libGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBpZiAodGhpcy5zdWdnZXN0aW9ucy5sZW5ndGggPCAyKSB7XG4gICAgICBkaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHRoaXMuc3VnZ2VzdGlvbnNFbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICBpZiAoZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuXG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuaW5wdXRFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3VnZ2VzdGlvbnNWaWV3LnZpZXdzLmZvckVhY2goZnVuY3Rpb24gKHZpZXcsIHYpIHtcbiAgICAgIGlmICh2ID09PSAwKSB7XG4gICAgICAgIHZpZXcuZWwuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5yZW5kZXJlZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKCk7XG5cbiAgICB0aGlzLmNhY2hlRWxlbWVudHMoe1xuICAgICAgbGFiZWxFbDogJ2xhYmVsJyxcbiAgICAgIGlucHV0RWw6ICdpbnB1dCdcbiAgICB9KTtcblxuICAgIHRoaXMubGFiZWxFbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIHRoaXMuY2lkKTtcbiAgICB0aGlzLmlucHV0RWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuY2lkKTtcblxuICAgIGlmICh0aGlzLnZhbHVlICYmICF0aGlzLmlucHV0RWwudmFsdWUpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5zdWdnZXN0aW9uc0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0aGlzLnN1Z2dlc3Rpb25zRWwuY2xhc3NOYW1lID0gJ2NvbWJvYm94LXN1Z2dlc3Rpb25zJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc3VnZ2VzdGlvbnNFbCk7XG5cbiAgICB0aGlzLnN1Z2dlc3Rpb25zVmlldyA9IHRoaXMucmVuZGVyQ29sbGVjdGlvbih0aGlzLnN1Z2dlc3Rpb25zLCBTdWdnZXN0aW9uVmlldywgdGhpcy5zdWdnZXN0aW9uc0VsKTtcblxuICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGhpcy5zdWdnZXN0aW9ucywgJ2FsbCcsIHRoaXMuc2V0VmlzaWJsZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuc3VnZ2VzdGlvbnNFbCk7XG4gICAgVmlldy5wcm90b3R5cGUucmVtb3ZlLmFwcGx5KHRoaXMpO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb21ib0JveFZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG4vKmdsb2JhbCBtb2R1bGU6IGZhbHNlKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjbGF1c2VWYWx1ZXNFZGl0b3I6IHtcbiAgICBjYWNoZTogZmFsc2UsXG4gICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gdGhpcztcbiAgICAgIHdoaWxlICgoY3VycmVudCA9IGN1cnJlbnQucGFyZW50KSkge1xuICAgICAgICBpZiAoY3VycmVudC5jbGF1c2VWYWx1ZXNFZGl0b3IpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudC5jbGF1c2VWYWx1ZXNFZGl0b3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbnRleHRNZW51OiB7XG4gICAgY2FjaGU6IGZhbHNlLFxuICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXM7XG4gICAgICB3aGlsZSAoKGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudCkpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQuY29udGV4dE1lbnUpIHtcbiAgICAgICAgICByZXR1cm4gY3VycmVudC5jb250ZXh0TWVudTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UgKi9cblxudmFyIFZpZXcgPSBkZXBzKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIENvbGxlY3Rpb24gPSBkZXBzKCdhbXBlcnNhbmQtY29sbGVjdGlvbicpO1xudmFyIFN0YXRlID0gZGVwcygnYW1wZXJzYW5kLXN0YXRlJyk7XG5cblxudmFyIGRlZmF1bHRDb21tYW5kcyA9IFtcbiAgLy8ge1xuICAvLyAgIGxhYmVsOiAnQWN0aW9ucycsXG4gIC8vICAgc3ViY29tbWFuZHM6IFtcbiAgLy8gICAgIHtcbiAgLy8gICAgICAgbGFiZWw6ICd1bmRvJyxcbiAgLy8gICAgICAgaWNvbjogJ3VuZG8nLFxuICAvLyAgICAgICBmbjogZnVuY3Rpb24gKCkge31cbiAgLy8gICAgIH0sXG4gIC8vICAgICB7XG4gIC8vICAgICAgIGxhYmVsOiAncmVkbycsXG4gIC8vICAgICAgIGljb246ICdyZWRvJyxcbiAgLy8gICAgICAgZm46IGZ1bmN0aW9uICgpIHt9XG4gIC8vICAgICB9XG4gIC8vICAgXVxuICAvLyB9LFxuICB7XG4gICAgbGFiZWw6ICdDZWxsJyxcbiAgICBzdWJjb21tYW5kczogW1xuICAgICAge1xuICAgICAgICBsYWJlbDogJ2NsZWFyJyxcbiAgICAgICAgaWNvbjogJ2NsZWFyJyxcbiAgICAgICAgaGludDogJ0NsZWFyIHRoZSBjb250ZW50IG9mIHRoZSBmb2N1c2VkIGNlbGwnLFxuICAgICAgICBwb3NzaWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnY2xlYXIgcG9zc2libGU/JywgYXJndW1lbnRzLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm46IGZ1bmN0aW9uICgpIHt9XG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdSdWxlJyxcbiAgICBpY29uOiAnJyxcbiAgICBzdWJjb21tYW5kczogW1xuICAgICAge1xuICAgICAgICBsYWJlbDogJ2FkZCcsXG4gICAgICAgIGljb246ICdwbHVzJyxcbiAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5tb2RlbC5hZGRSdWxlKHRoaXMuc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2NvcHknLFxuICAgICAgICBpY29uOiAnY29weScsXG4gICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQubW9kZWwuY29weVJ1bGUodGhpcy5zY29wZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdhYm92ZScsXG4gICAgICAgICAgICBpY29uOiAnYWJvdmUnLFxuICAgICAgICAgICAgaGludDogJ0NvcHkgdGhlIHJ1bGUgYWJvdmUgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyZW50Lm1vZGVsLmNvcHlSdWxlKHRoaXMuc2NvcGUsIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnYmVsb3cnLFxuICAgICAgICAgICAgaWNvbjogJ2JlbG93JyxcbiAgICAgICAgICAgIGhpbnQ6ICdDb3B5IHRoZSBydWxlIGJlbG93IHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLnBhcmVudC5tb2RlbC5jb3B5UnVsZSh0aGlzLnNjb3BlLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAncmVtb3ZlJyxcbiAgICAgICAgaWNvbjogJ21pbnVzJyxcbiAgICAgICAgaGludDogJ1JlbW92ZSB0aGUgZm9jdXNlZCBydWxlJyxcbiAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnBhcmVudC5tb2RlbC5yZW1vdmVSdWxlKHRoaXMuc2NvcGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ2NsZWFyJyxcbiAgICAgICAgaWNvbjogJ2NsZWFyJyxcbiAgICAgICAgaGludDogJ0NsZWFyIHRoZSBmb2N1c2VkIHJ1bGUnLFxuICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucGFyZW50Lm1vZGVsLmNsZWFyUnVsZSh0aGlzLnNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnSW5wdXQnLFxuICAgIGljb246ICdpbnB1dCcsXG4gICAgc3ViY29tbWFuZHM6IFtcbiAgICAgIHtcbiAgICAgICAgbGFiZWw6ICdhZGQnLFxuICAgICAgICBpY29uOiAncGx1cycsXG4gICAgICAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdiZWZvcmUnLFxuICAgICAgICAgICAgaWNvbjogJ2xlZnQnLFxuICAgICAgICAgICAgaGludDogJ0FkZCBhbiBpbnB1dCBjbGF1c2UgYmVmb3JlIHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLnBhcmVudC5tb2RlbC5hZGRJbnB1dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdhZnRlcicsXG4gICAgICAgICAgICBpY29uOiAncmlnaHQnLFxuICAgICAgICAgICAgaGludDogJ0FkZCBhbiBpbnB1dCBjbGF1c2UgYWZ0ZXIgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyZW50Lm1vZGVsLmFkZElucHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ3JlbW92ZScsXG4gICAgICAgIGljb246ICdtaW51cycsXG4gICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQubW9kZWwucmVtb3ZlSW5wdXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnT3V0cHV0JyxcbiAgICBpY29uOiAnb3V0cHV0JyxcbiAgICBzdWJjb21tYW5kczogW1xuICAgICAge1xuICAgICAgICBsYWJlbDogJ2FkZCcsXG4gICAgICAgIGljb246ICdwbHVzJyxcbiAgICAgICAgc3ViY29tbWFuZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ2JlZm9yZScsXG4gICAgICAgICAgICBpY29uOiAnbGVmdCcsXG4gICAgICAgICAgICBoaW50OiAnQWRkIGFuIG91dHB1dCBjbGF1c2UgYmVmb3JlIHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0aGlzLnBhcmVudC5tb2RlbC5hZGRPdXRwdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnYWZ0ZXInLFxuICAgICAgICAgICAgaWNvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGhpbnQ6ICdBZGQgYW4gb3V0cHV0IGNsYXVzZSBhZnRlciB0aGUgZm9jdXNlZCBvbmUnLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJlbnQubW9kZWwuYWRkT3V0cHV0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBsYWJlbDogJ3JlbW92ZScsXG4gICAgICAgIGljb246ICdtaW51cycsXG4gICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5wYXJlbnQubW9kZWwucmVtb3ZlT3V0cHV0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdXG4gIH1cbl07XG5cblxuXG5cblxuXG5cblxuXG52YXIgQ29tbWFuZE1vZGVsID0gU3RhdGUuZXh0ZW5kKHtcbiAgcHJvcHM6IHtcbiAgICBsYWJlbDogJ3N0cmluZycsXG4gICAgaGludDogJ3N0cmluZycsXG4gICAgaWNvbjogJ3N0cmluZycsXG4gICAgaHJlZjogJ3N0cmluZycsXG5cbiAgICBwb3NzaWJsZToge1xuICAgICAgdHlwZTogJ2FueScsXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAoKSB7fTsgfSxcbiAgICAgIHRlc3Q6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlICE9PSAnZnVuY3Rpb24nICYmIG5ld1ZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiAnbXVzdCBiZSBlaXRoZXIgYSBmdW5jdGlvbiBvciBmYWxzZSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZm46IHtcbiAgICAgIHR5cGU6ICdhbnknLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICB0ZXN0OiBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiBuZXdWYWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gJ211c3QgYmUgZWl0aGVyIGEgZnVuY3Rpb24gb3IgZmFsc2UnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGRlcml2ZWQ6IHtcbiAgICBkaXNhYmxlZDoge1xuICAgICAgZGVwczogWydwb3NzaWJsZSddLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnBvc3NpYmxlID09PSAnZnVuY3Rpb24nID8gIXRoaXMucG9zc2libGUoKSA6IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdWJjb21tYW5kczogbnVsbCxcblxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoYXR0cmlidXRlcykge1xuICAgIHRoaXMuc3ViY29tbWFuZHMgPSBuZXcgQ29tbWFuZHNDb2xsZWN0aW9uKGF0dHJpYnV0ZXMuc3ViY29tbWFuZHMgfHwgW10sIHtcbiAgICAgIHBhcmVudDogdGhpc1xuICAgIH0pO1xuICB9XG59KTtcblxuXG5cblxuXG5cblxuXG5cblxudmFyIENvbW1hbmRzQ29sbGVjdGlvbiA9IENvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgbW9kZWw6IENvbW1hbmRNb2RlbFxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cbnZhciBDb250ZXh0TWVudUl0ZW0gPSBWaWV3LmV4dGVuZCh7XG4gIGF1dG9SZW5kZXI6IHRydWUsXG5cbiAgdGVtcGxhdGU6ICc8bGk+JyArXG4gICAgICAgICAgICAgICc8YT4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJpY29uXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAnPC9hPicgK1xuICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPjwvdWw+JyArXG4gICAgICAgICAgICAnPC9saT4nLFxuXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21vZGVsLmxhYmVsJzoge1xuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgc2VsZWN0b3I6ICcubGFiZWwnXG4gICAgfSxcblxuICAgICdtb2RlbC5oaW50Jzoge1xuICAgICAgdHlwZTogJ2F0dHJpYnV0ZScsXG4gICAgICBuYW1lOiAndGl0bGUnXG4gICAgfSxcblxuICAgICdtb2RlbC5mbic6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuQ2xhc3MnLFxuICAgICAgc2VsZWN0b3I6ICdhJyxcbiAgICAgIG5vOiAnZGlzYWJsZWQnXG4gICAgfSxcblxuICAgICdtb2RlbC5kaXNhYmxlZCc6IHtcbiAgICAgIHR5cGU6ICdib29sZWFuQ2xhc3MnLFxuICAgICAgbmFtZTogJ2Rpc2FibGVkJ1xuICAgIH0sXG5cbiAgICAnbW9kZWwuc3ViY29tbWFuZHMubGVuZ3RoJzoge1xuICAgICAgdHlwZTogJ2Jvb2xlYW5DbGFzcycsXG4gICAgICBuYW1lOiAnZHJvcGRvd24nXG4gICAgfSxcblxuICAgICdtb2RlbC5ocmVmJzoge1xuICAgICAgc2VsZWN0b3I6ICdhJyxcbiAgICAgIG5hbWU6ICdocmVmJyxcbiAgICAgIHR5cGU6IGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAnbW9kZWwuaWNvbic6IHtcbiAgICAgIHR5cGU6IGZ1bmN0aW9uIChlbCwgdmFsdWUpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2ljb24gJyArIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNlbGVjdG9yOiAnLmljb24nXG4gICAgfVxuICB9LFxuXG4gIGV2ZW50czoge1xuICAgIGNsaWNrOiAgICAgICdfaGFuZGxlQ2xpY2snLFxuICAgIG1vdXNlb3ZlcjogICdfaGFuZGxlTW91c2VvdmVyJyxcbiAgICBtb3VzZW91dDogICAnX2hhbmRsZU1vdXNlb3V0J1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKCk7XG4gICAgdGhpcy5saXN0ZW5Ub0FuZFJ1bih0aGlzLm1vZGVsLCAnY2hhbmdlOnN1YmNvbW1hbmRzJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZW5kZXJDb2xsZWN0aW9uKHRoaXMubW9kZWwuc3ViY29tbWFuZHMsIENvbnRleHRNZW51SXRlbSwgdGhpcy5xdWVyeSgndWwnKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgX2hhbmRsZUNsaWNrOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgaWYgKHRoaXMubW9kZWwuZm4pIHtcbiAgICAgIHRoaXMucGFyZW50LnRyaWdnZXJDb21tYW5kKHRoaXMubW9kZWwsIGV2dCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLm1vZGVsLmhyZWYpIHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSxcblxuICBfaGFuZGxlTW91c2VvdmVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuXG5cbiAgX2hhbmRsZU1vdXNlb3V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuXG5cbiAgdHJpZ2dlckNvbW1hbmQ6IGZ1bmN0aW9uIChjb21tYW5kLCBldnQpIHtcbiAgICB0aGlzLnBhcmVudC50cmlnZ2VyQ29tbWFuZChjb21tYW5kLCBldnQpO1xuICB9XG59KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgQ29udGV4dE1lbnVWaWV3ID0gVmlldy5leHRlbmQoe1xuICBhdXRvUmVuZGVyOiB0cnVlLFxuXG4gIHRlbXBsYXRlOiAnPG5hdiBjbGFzcz1cImRtbi1jb250ZXh0LW1lbnVcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb29yZGluYXRlc1wiPicgK1xuICAgICAgICAgICAgICAgICc8bGFiZWw+Q29vcmRzOjwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwieFwiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ5XCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICc8dWw+PC91bD4nICtcbiAgICAgICAgICAgICc8L25hdj4nLFxuXG4gIGNvbGxlY3Rpb25zOiB7XG4gICAgY29tbWFuZHM6IENvbW1hbmRzQ29sbGVjdGlvblxuICB9LFxuXG4gIHNlc3Npb246IHtcbiAgICBpc09wZW46ICdib29sZWFuJyxcbiAgICBzY29wZTogICdzdGF0ZSdcbiAgfSxcblxuICBiaW5kaW5nczoge1xuICAgIGlzT3Blbjoge1xuICAgICAgdHlwZTogJ3RvZ2dsZSdcbiAgICB9LFxuICAgICdwYXJlbnQubW9kZWwueCc6IHtcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHNlbGVjdG9yOiAnZGl2IHNwYW4ueCdcbiAgICB9LFxuICAgICdwYXJlbnQubW9kZWwueSc6IHtcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIHNlbGVjdG9yOiAnZGl2IHNwYW4ueSdcbiAgICB9XG4gIH0sXG5cbiAgb3BlbjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgc3R5bGUgPSB0aGlzLmVsLnN0eWxlO1xuXG4gICAgc3R5bGUubGVmdCA9IG9wdGlvbnMubGVmdCArICdweCc7XG4gICAgc3R5bGUudG9wID0gb3B0aW9ucy50b3AgKyAncHgnO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLnBhcmVudCAmJiBvcHRpb25zLnBhcmVudC5jbGF1c2VWYWx1ZXNFZGl0b3IpIHtcbiAgICAgIG9wdGlvbnMucGFyZW50LmNsYXVzZVZhbHVlc0VkaXRvci5oaWRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY29wZSA9IG9wdGlvbnMuc2NvcGU7XG4gICAgdmFyIGNvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcyB8fCBkZWZhdWx0Q29tbWFuZHM7XG5cbiAgICB0aGlzLmNvbW1hbmRzLnJlc2V0KGNvbW1hbmRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICB0cmlnZ2VyQ29tbWFuZDogZnVuY3Rpb24gKGNvbW1hbmQsIGV2dCkge1xuICAgIGNvbW1hbmQuZm4uY2FsbCh0aGlzLCBldnQpO1xuICAgIGlmICghY29tbWFuZC5rZWVwT3Blbikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBjbG9zZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZW5kZXJXaXRoVGVtcGxhdGUoKTtcbiAgICB0aGlzLmNhY2hlRWxlbWVudHMoe1xuICAgICAgY29tbWFuZHNFbDogJ3VsJ1xuICAgIH0pO1xuICAgIHRoaXMuY29tbWFuZHNWaWV3ID0gdGhpcy5yZW5kZXJDb2xsZWN0aW9uKHRoaXMuY29tbWFuZHMsIENvbnRleHRNZW51SXRlbSwgdGhpcy5jb21tYW5kc0VsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIGluc3RhbmNlO1xuQ29udGV4dE1lbnVWaWV3Lmluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2UgPSBuZXcgQ29udGV4dE1lbnVWaWV3KCk7XG4gIH1cblxuICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnMoaW5zdGFuY2UuZWwpKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnN0YW5jZS5lbCk7XG4gIH1cblxuICByZXR1cm4gaW5zdGFuY2U7XG59O1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93LmRtbkNvbnRleHRNZW51ID0gQ29udGV4dE1lbnVWaWV3Lmluc3RhbmNlKCk7XG59XG5cbkNvbnRleHRNZW51Vmlldy5Db2xsZWN0aW9uID0gQ29tbWFuZHNDb2xsZWN0aW9uO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHRNZW51VmlldztcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UsIGNvbnNvbGU6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBEZWNpc2lvblRhYmxlID0gcmVxdWlyZSgnLi90YWJsZS1kYXRhJyk7XG52YXIgUnVsZVZpZXcgPSByZXF1aXJlKCcuL3J1bGUtdmlldycpO1xuXG5cblxuXG52YXIgQ2xhdXNlSGVhZGVyVmlldyA9IHJlcXVpcmUoJy4vY2xhdXNlLXZpZXcnKTtcblxuZnVuY3Rpb24gdG9BcnJheShlbHMpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShlbHMpO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VUZCh0eXBlKSB7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gIGVsLmNsYXNzTmFtZSA9IHR5cGU7XG4gIHJldHVybiBlbDtcbn1cblxuXG5mdW5jdGlvbiBtYWtlQWRkQnV0dG9uKGNsYXVzZVR5cGUsIHRhYmxlKSB7XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZWwuY2xhc3NOYW1lID0gJ2ljb24tZG1uIGljb24tcGx1cyc7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHRhYmxlW2NsYXVzZVR5cGUgPT09ICdpbnB1dCcgPyAnYWRkSW5wdXQnIDogJ2FkZE91dHB1dCddKCk7XG4gIH0pO1xuICByZXR1cm4gZWw7XG59XG5cblxuXG5cbnZhciBEZWNpc2lvblRhYmxlVmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgYXV0b1JlbmRlcjogdHJ1ZSxcblxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJkbW4tdGFibGVcIj4nICtcbiAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJoaW50c1wiPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImljb24tZG1uIGljb24taW5mb1wiPjwvaT4gJyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGRhdGEtaG9vaz1cImhpbnRzXCI+PC9zcGFuPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICAgICAgICc8aGVhZGVyPicgK1xuICAgICAgICAgICAgICAgICc8aDMgZGF0YS1ob29rPVwidGFibGUtbmFtZVwiIGNvbnRlbnRlZGl0YWJsZT48L2gzPicgK1xuICAgICAgICAgICAgICAnPC9oZWFkZXI+JyArXG4gICAgICAgICAgICAgICc8dGFibGU+JyArXG4gICAgICAgICAgICAgICAgJzx0aGVhZD4nICtcbiAgICAgICAgICAgICAgICAgICc8dHI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJoaXRcIiByb3dzcGFuPVwiNFwiPjwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJpbnB1dCBkb3VibGUtYm9yZGVyLXJpZ2h0XCIgY29sc3Bhbj1cIjJcIj5JbnB1dDwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJvdXRwdXRcIiBjb2xzcGFuPVwiMlwiPk91dHB1dDwvdGg+JyArXG4gICAgICAgICAgICAgICAgICAgICc8dGggY2xhc3M9XCJhbm5vdGF0aW9uXCIgcm93c3Bhbj1cIjRcIj5Bbm5vdGF0aW9uPC90aD4nICtcbiAgICAgICAgICAgICAgICAgICc8L3RyPicgK1xuICAgICAgICAgICAgICAgICAgJzx0ciBjbGFzcz1cImxhYmVsc1wiPjwvdHI+JyArXG4gICAgICAgICAgICAgICAgICAnPHRyIGNsYXNzPVwidmFsdWVzXCI+PC90cj4nICtcbiAgICAgICAgICAgICAgICAgICc8dHIgY2xhc3M9XCJtYXBwaW5nc1wiPjwvdHI+JyArXG4gICAgICAgICAgICAgICAgJzwvdGhlYWQ+JyArXG4gICAgICAgICAgICAgICAgJzx0Ym9keT48L3Rib2R5PicgK1xuICAgICAgICAgICAgICAnPC90YWJsZT4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nLFxuXG4gIHNlc3Npb246IHtcbiAgICBjb250ZXh0TWVudTogICAgICAgICdzdGF0ZScsXG4gICAgY2xhdXNlVmFsdWVzRWRpdG9yOiAnc3RhdGUnLFxuXG4gICAgaGludDoge1xuICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICBkZWZhdWx0OiAnTWFrZSBhIHJpZ2h0LWNsaWNrIG9uIHRoZSB0YWJsZSdcbiAgICB9XG4gIH0sXG5cbiAgYmluZGluZ3M6IHtcbiAgICAnbW9kZWwubmFtZSc6IHtcbiAgICAgIGhvb2s6ICd0YWJsZS1uYW1lJyxcbiAgICAgIHR5cGU6ICd0ZXh0J1xuICAgIH0sXG4gICAgaGludDoge1xuICAgICAgdHlwZTogJ2lubmVySFRNTCcsXG4gICAgICBob29rOiAnaGludHMnXG4gICAgfVxuICB9LFxuXG4gIGV2ZW50czoge1xuICAgICdjbGljayAuYWRkLXJ1bGUgYSc6ICdfaGFuZGxlQWRkUnVsZUNsaWNrJyxcbiAgICAnaW5wdXQgaGVhZGVyIGgzJzogICAnX2hhbmRsZU5hbWVJbnB1dCdcbiAgfSxcblxuICBfaGFuZGxlQWRkUnVsZUNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tb2RlbC5hZGRSdWxlKCk7XG4gIH0sXG5cbiAgX2hhbmRsZU5hbWVJbnB1dDogZnVuY3Rpb24gKGV2dCkge1xuICAgIHZhciB2YWwgPSBldnQudGFyZ2V0LnRleHRDb250ZW50LnRyaW0oKTtcbiAgICBpZiAodmFsID09PSB0aGlzLm1vZGVsLm5hbWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5tb2RlbC5uYW1lID0gdmFsO1xuICB9LFxuXG4gIGxvZzogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGFyZ3VtZW50cyk7XG4gICAgdmFyIG1ldGhvZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICBhcmdzLnVuc2hpZnQodGhpcy5jaWQpO1xuICAgIGNvbnNvbGVbbWV0aG9kXS5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfSxcblxuICBldmVudExvZzogZnVuY3Rpb24gKHNjb3BlTmFtZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgIGFyZ3MudW5zaGlmdChzY29wZU5hbWUpO1xuICAgICAgYXJncy51bnNoaWZ0KCd0cmFjZScpO1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1swXSk7XG4gICAgICBzZWxmLmxvZy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9O1xuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbCB8fCBuZXcgRGVjaXNpb25UYWJsZS5Nb2RlbCgpO1xuICB9LFxuXG4gIGhpZGVDb250ZXh0TWVudTogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jb250ZXh0TWVudSkgeyByZXR1cm47IH1cbiAgICB0aGlzLmNvbnRleHRNZW51LmNsb3NlKCk7XG4gIH0sXG5cbiAgc2hvd0NvbnRleHRNZW51OiBmdW5jdGlvbiAoY2VsbE1vZGVsLCBldnQpIHtcbiAgICBpZiAoIXRoaXMuY29udGV4dE1lbnUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKGV2dCkge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgdmFyIHRhYmxlID0gdGhpcy5tb2RlbDtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgc2NvcGU6ICBjZWxsTW9kZWwsXG4gICAgICBwYXJlbnQ6IHRoaXMsXG4gICAgICBsZWZ0OiAgIGV2dC5wYWdlWCxcbiAgICAgIHRvcDogICAgZXZ0LnBhZ2VZXG4gICAgfTtcblxuICAgIG9wdGlvbnMuY29tbWFuZHMgPSBbXG4gICAgICB7XG4gICAgICAgIGxhYmVsOiAnUnVsZScsXG4gICAgICAgIGljb246ICcnLFxuICAgICAgICBzdWJjb21tYW5kczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnYWRkJyxcbiAgICAgICAgICAgIGljb246ICdwbHVzJyxcbiAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHRhYmxlLmFkZFJ1bGUodGhpcy5zY29wZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3ViY29tbWFuZHM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnYWJvdmUnLFxuICAgICAgICAgICAgICAgIGljb246ICdhYm92ZScsXG4gICAgICAgICAgICAgICAgaGludDogJ0FkZCBhIHJ1bGUgYWJvdmUgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgdGFibGUuYWRkUnVsZSh0aGlzLnNjb3BlLCAtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdiZWxvdycsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2JlbG93JyxcbiAgICAgICAgICAgICAgICBoaW50OiAnQWRkIGEgcnVsZSBiZWxvdyB0aGUgZm9jdXNlZCBvbmUnLFxuICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICB0YWJsZS5hZGRSdWxlKHRoaXMuc2NvcGUsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8ge1xuICAgICAgICAgIC8vICAgbGFiZWw6ICdjb3B5JyxcbiAgICAgICAgICAvLyAgIGljb246ICdjb3B5JyxcbiAgICAgICAgICAvLyAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gICAgIHRhYmxlLmNvcHlSdWxlKHRoaXMuc2NvcGUpO1xuICAgICAgICAgIC8vICAgfSxcbiAgICAgICAgICAvLyAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAvLyAgICAgICBsYWJlbDogJ2Fib3ZlJyxcbiAgICAgICAgICAvLyAgICAgICBpY29uOiAnYWJvdmUnLFxuICAgICAgICAgIC8vICAgICAgIGhpbnQ6ICdDb3B5IHRoZSBydWxlIGFib3ZlIHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgLy8gICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyAgICAgICAgIHRhYmxlLmNvcHlSdWxlKHRoaXMuc2NvcGUsIC0xKTtcbiAgICAgICAgICAvLyAgICAgICB9XG4gICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAvLyAgICAgICBsYWJlbDogJ2JlbG93JyxcbiAgICAgICAgICAvLyAgICAgICBpY29uOiAnYmVsb3cnLFxuICAgICAgICAgIC8vICAgICAgIGhpbnQ6ICdDb3B5IHRoZSBydWxlIGJlbG93IHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgLy8gICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyAgICAgICAgIHRhYmxlLmNvcHlSdWxlKHRoaXMuc2NvcGUsIDEpO1xuICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgIC8vICAgXVxuICAgICAgICAgIC8vIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdyZW1vdmUnLFxuICAgICAgICAgICAgaWNvbjogJ21pbnVzJyxcbiAgICAgICAgICAgIGhpbnQ6ICdSZW1vdmUgdGhlIGZvY3VzZWQgcnVsZScsXG4gICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICB0YWJsZS5yZW1vdmVSdWxlKHRoaXMuc2NvcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdjbGVhcicsXG4gICAgICAgICAgICBpY29uOiAnY2xlYXInLFxuICAgICAgICAgICAgaGludDogJ0NsZWFyIHRoZSBmb2N1c2VkIHJ1bGUnLFxuICAgICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgdGFibGUuY2xlYXJSdWxlKHRoaXMuc2NvcGUucnVsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXTtcblxuICAgIHZhciB0eXBlID0gY2VsbE1vZGVsLnR5cGU7XG4gICAgdmFyIGFkZE1ldGhvZCA9IHR5cGUgPT09ICdpbnB1dCcgPyAnYWRkSW5wdXQnIDogJ2FkZE91dHB1dCc7XG4gICAgaWYgKHR5cGUgIT09ICdpbnB1dCcgJiYgdHlwZSAhPT0gJ291dHB1dCcpIHtcbiAgICAgIHRoaXMuY29udGV4dE1lbnUub3BlbihvcHRpb25zKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmNvbW1hbmRzLnVuc2hpZnQoe1xuICAgICAgbGFiZWw6IHR5cGUgPT09ICdpbnB1dCcgPyAnSW5wdXQnIDogJ091dHB1dCcsXG4gICAgICBpY29uOiB0eXBlLFxuICAgICAgc3ViY29tbWFuZHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiAnYWRkJyxcbiAgICAgICAgICBpY29uOiAncGx1cycsXG4gICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhYmxlW2FkZE1ldGhvZF0oKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnYmVmb3JlJyxcbiAgICAgICAgICAgICAgaWNvbjogJ2xlZnQnLFxuICAgICAgICAgICAgICBoaW50OiAnQWRkIGFuICcgKyB0eXBlICsgJyBjbGF1c2UgYmVmb3JlIHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGFibGVbYWRkTWV0aG9kXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsYWJlbDogJ2FmdGVyJyxcbiAgICAgICAgICAgICAgaWNvbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgaGludDogJ0FkZCBhbiAnICsgdHlwZSArICcgY2xhdXNlIGFmdGVyIHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGFibGVbYWRkTWV0aG9kXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdyZW1vdmUnLFxuICAgICAgICAgIGljb246ICdtaW51cycsXG4gICAgICAgICAgaGludDogJ1JlbW92ZSB0aGUgJyArIHR5cGUgKyAnIGNsYXVzZScsXG4gICAgICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbGF1c2UgPSBjZWxsTW9kZWwuY2xhdXNlO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gY2xhdXNlLmNvbGxlY3Rpb24uaW5kZXhPZihjbGF1c2UpO1xuICAgICAgICAgICAgY2xhdXNlLmNvbGxlY3Rpb24ucmVtb3ZlKGNsYXVzZSk7XG5cbiAgICAgICAgICAgIGlmIChjbGF1c2UuY2xhdXNlVHlwZSA9PT0gJ291dHB1dCcpIHtcbiAgICAgICAgICAgICAgZGVsdGEgKz0gdGFibGUuaW5wdXRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFibGUucnVsZXMuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgICAgICAgICAgICB2YXIgY2VsbCA9IHJ1bGUuY2VsbHMuYXQoZGVsdGEpO1xuICAgICAgICAgICAgICBydWxlLmNlbGxzLnJlbW92ZShjZWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGFibGUucnVsZXMudHJpZ2dlcigncmVzZXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIHRoaXMuY29udGV4dE1lbnUub3BlbihvcHRpb25zKTtcbiAgfSxcblxuXG4gIHBhcnNlQ2hvaWNlczogZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuICdNSVNTSU5HJztcbiAgICB9XG4gICAgdmFyIGNvbnRlbnQgPSBlbC50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICBpZiAoY29udGVudFswXSA9PT0gJygnICYmIGNvbnRlbnQuc2xpY2UoLTEpID09PSAnKScpIHtcbiAgICAgIHJldHVybiBjb250ZW50XG4gICAgICAgIC5zbGljZSgxLCAtMSlcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgcmV0dXJuIHN0ci50cmltKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgIHJldHVybiAhIXN0cjtcbiAgICAgICAgfSlcbiAgICAgICAgO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfSxcblxuICBwYXJzZVJ1bGVzOiBmdW5jdGlvbiAocnVsZUVscykge1xuICAgIHJldHVybiBydWxlRWxzLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHJldHVybiBlbC50ZXh0Q29udGVudC50cmltKCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgcGFyc2VUYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dHMgPSBbXTtcbiAgICB2YXIgb3V0cHV0cyA9IFtdO1xuICAgIHZhciBydWxlcyA9IFtdO1xuXG4gICAgdGhpcy5xdWVyeUFsbCgndGhlYWQgLmxhYmVscyAuaW5wdXQnKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgbnVtKSB7XG4gICAgICB2YXIgY2hvaWNlRWxzID0gdGhpcy5xdWVyeSgndGhlYWQgLnZhbHVlcyAuaW5wdXQ6bnRoLWNoaWxkKCcgKyAobnVtICsgMSkgKyAnKScpO1xuXG4gICAgICBpbnB1dHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiAgICBlbC50ZXh0Q29udGVudC50cmltKCksXG4gICAgICAgIGNob2ljZXM6ICB0aGlzLnBhcnNlQ2hvaWNlcyhjaG9pY2VFbHMpXG4gICAgICB9KTtcbiAgICB9LCB0aGlzKTtcblxuICAgIHRoaXMucXVlcnlBbGwoJ3RoZWFkIC5sYWJlbHMgLm91dHB1dCcpLmZvckVhY2goZnVuY3Rpb24gKGVsLCBudW0pIHtcbiAgICAgIHZhciBjaG9pY2VFbHMgPSB0aGlzLnF1ZXJ5KCd0aGVhZCAudmFsdWVzIC5vdXRwdXQ6bnRoLWNoaWxkKCcgKyAobnVtICsgaW5wdXRzLmxlbmd0aCArIDEpICsgJyknKTtcblxuICAgICAgb3V0cHV0cy5wdXNoKHtcbiAgICAgICAgbGFiZWw6ICAgIGVsLnRleHRDb250ZW50LnRyaW0oKSxcbiAgICAgICAgY2hvaWNlczogIHRoaXMucGFyc2VDaG9pY2VzKGNob2ljZUVscylcbiAgICAgIH0pO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5xdWVyeUFsbCgndGJvZHkgdHInKS5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgIHZhciBjZWxscyA9IFtdO1xuICAgICAgdmFyIGNlbGxFbHMgPSByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcblxuICAgICAgZm9yICh2YXIgYyA9IDE7IGMgPCBjZWxsRWxzLmxlbmd0aDsgYysrKSB7XG4gICAgICAgIHZhciBjaG9pY2VzID0gbnVsbDtcbiAgICAgICAgdmFyIHZhbHVlID0gY2VsbEVsc1tjXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIHZhciB0eXBlID0gYyA8PSBpbnB1dHMubGVuZ3RoID8gJ2lucHV0JyA6IChjIDwgKGNlbGxFbHMubGVuZ3RoIC0gMSkgPyAnb3V0cHV0JyA6ICdhbm5vdGF0aW9uJyk7XG4gICAgICAgIHZhciBvYyA9IGMgLSAoaW5wdXRzLmxlbmd0aCArIDEpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQnICYmIGlucHV0c1tjIC0gMV0pIHtcbiAgICAgICAgICBjaG9pY2VzID0gaW5wdXRzW2MgLSAxXS5jaG9pY2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdvdXRwdXQnICYmIG91dHB1dHNbb2NdKSB7XG4gICAgICAgICAgY2hvaWNlcyA9IG91dHB1dHNbb2NdLmNob2ljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxscy5wdXNoKHtcbiAgICAgICAgICB2YWx1ZTogICAgdmFsdWUsXG4gICAgICAgICAgY2hvaWNlczogIGNob2ljZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJ1bGVzLnB1c2goe1xuICAgICAgICBjZWxsczogY2VsbHNcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb2RlbC5uYW1lID0gdGhpcy5xdWVyeSgnaDMnKS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgdGhpcy5tb2RlbC5pbnB1dHMucmVzZXQoaW5wdXRzKTtcbiAgICB0aGlzLm1vZGVsLm91dHB1dHMucmVzZXQob3V0cHV0cyk7XG4gICAgdGhpcy5tb2RlbC5ydWxlcy5yZXNldChydWxlcyk7XG5cbiAgICByZXR1cm4gdGhpcy50b0pTT04oKTtcbiAgfSxcblxuICB0b0pTT046IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC50b0pTT04oKTtcbiAgfSxcblxuICBpbnB1dENsYXVzZVZpZXdzOiBbXSxcbiAgb3V0cHV0Q2xhdXNlVmlld3M6IFtdLFxuXG4gIF9oZWFkZXJDbGVhcjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB0b0FycmF5KHRoaXMubGFiZWxzUm93RWwucXVlcnlTZWxlY3RvckFsbCgnLicrIHR5cGUpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgdGhpcy5sYWJlbHNSb3dFbC5yZW1vdmVDaGlsZChlbCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0b0FycmF5KHRoaXMudmFsdWVzUm93RWwucXVlcnlTZWxlY3RvckFsbCgnLicrIHR5cGUpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgdGhpcy52YWx1ZXNSb3dFbC5yZW1vdmVDaGlsZChlbCk7XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0b0FycmF5KHRoaXMubWFwcGluZ3NSb3dFbC5xdWVyeVNlbGVjdG9yQWxsKCcuJysgdHlwZSkpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICB0aGlzLm1hcHBpbmdzUm93RWwucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuZWwpIHtcbiAgICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wYXJzZVRhYmxlKCk7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZTplbCcpO1xuICAgIH1cblxuICAgIHZhciB0YWJsZSA9IHRoaXMubW9kZWw7XG5cbiAgICBpZiAoIXRoaXMuaGVhZGVyRWwpIHtcbiAgICAgIHRoaXMuY2FjaGVFbGVtZW50cyh7XG4gICAgICAgIHRhYmxlRWw6ICAgICAgICAgICd0YWJsZScsXG4gICAgICAgIHRhYmxlTmFtZUVsOiAgICAgICdoZWFkZXIgaDMnLFxuICAgICAgICBoZWFkZXJFbDogICAgICAgICAndGhlYWQnLFxuICAgICAgICBib2R5RWw6ICAgICAgICAgICAndGJvZHknLFxuICAgICAgICBpbnB1dHNIZWFkZXJFbDogICAndGhlYWQgdHI6bnRoLWNoaWxkKDEpIHRoLmlucHV0JyxcbiAgICAgICAgb3V0cHV0c0hlYWRlckVsOiAgJ3RoZWFkIHRyOm50aC1jaGlsZCgxKSB0aC5vdXRwdXQnLFxuICAgICAgICBsYWJlbHNSb3dFbDogICAgICAndGhlYWQgdHIubGFiZWxzJyxcbiAgICAgICAgdmFsdWVzUm93RWw6ICAgICAgJ3RoZWFkIHRyLnZhbHVlcycsXG4gICAgICAgIG1hcHBpbmdzUm93RWw6ICAgICd0aGVhZCB0ci5tYXBwaW5ncydcbiAgICAgIH0pO1xuXG5cbiAgICAgIHRoaXMuaW5wdXRzSGVhZGVyRWwuYXBwZW5kQ2hpbGQobWFrZUFkZEJ1dHRvbignaW5wdXQnLCB0YWJsZSkpO1xuICAgICAgdGhpcy5vdXRwdXRzSGVhZGVyRWwuYXBwZW5kQ2hpbGQobWFrZUFkZEJ1dHRvbignb3V0cHV0JywgdGFibGUpKTtcbiAgICB9XG5cblxuICAgIFsnaW5wdXQnLCAnb3V0cHV0J10uZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgdGhpcy5saXN0ZW5Ub0FuZFJ1bih0aGlzLm1vZGVsW3R5cGUgKyAncyddLCAnYWRkIHJlc2V0IHJlbW92ZScsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgY29scyA9IHRoaXMubW9kZWxbdHlwZSArICdzJ10ubGVuZ3RoO1xuICAgICAgICBpZiAoY29scyA+IDEpIHtcbiAgICAgICAgICB0aGlzW3R5cGUgKyAnc0hlYWRlckVsJ10uc2V0QXR0cmlidXRlKCdjb2xzcGFuJywgY29scyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpc1t0eXBlICsgJ3NIZWFkZXJFbCddLnJlbW92ZUF0dHJpYnV0ZSgnY29sc3BhbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faGVhZGVyQ2xlYXIodHlwZSk7XG4gICAgICAgIHRoaXNbdHlwZSArICdDbGF1c2VWaWV3cyddLmZvckVhY2goZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICB2aWV3LnJlbW92ZSgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm1vZGVsW3R5cGUgKyAncyddLmZvckVhY2goZnVuY3Rpb24gKGNsYXVzZSkge1xuICAgICAgICAgIHZhciBsYWJlbEVsID0gbWFrZVRkKHR5cGUpO1xuICAgICAgICAgIHZhciB2YWx1ZUVsID0gbWFrZVRkKHR5cGUpO1xuICAgICAgICAgIHZhciBtYXBwaW5nRWwgPSBtYWtlVGQodHlwZSk7XG5cbiAgICAgICAgICB2YXIgdmlldyA9IG5ldyBDbGF1c2VIZWFkZXJWaWV3KHtcbiAgICAgICAgICAgIGxhYmVsRWw6ICAgIGxhYmVsRWwsXG4gICAgICAgICAgICB2YWx1ZUVsOiAgICB2YWx1ZUVsLFxuICAgICAgICAgICAgbWFwcGluZ0VsOiAgbWFwcGluZ0VsLFxuXG4gICAgICAgICAgICBtb2RlbDogICAgICBjbGF1c2UsXG4gICAgICAgICAgICBwYXJlbnQ6ICAgICB0aGlzXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBbJ2xhYmVsJywgJ3ZhbHVlJywgJ21hcHBpbmcnXS5mb3JFYWNoKGZ1bmN0aW9uIChraW5kKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgICB0aGlzW2tpbmQgKydzUm93RWwnXS5pbnNlcnRCZWZvcmUodmlld1traW5kICsgJ0VsJ10sIHRoaXNba2luZCArJ3NSb3dFbCddLnF1ZXJ5U2VsZWN0b3IoJy5vdXRwdXQnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1traW5kICsnc1Jvd0VsJ10uYXBwZW5kQ2hpbGQodmlld1traW5kICsgJ0VsJ10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgdGhpcy5yZWdpc3RlclN1YnZpZXcodmlldyk7XG5cbiAgICAgICAgICB0aGlzW3R5cGUgKyAnQ2xhdXNlVmlld3MnXS5wdXNoKHZpZXcpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIHRoaXMpO1xuXG5cbiAgICB0aGlzLmJvZHlFbC5pbm5lckhUTUwgPSAnJztcbiAgICB0aGlzLnJ1bGVzVmlldyA9IHRoaXMucmVuZGVyQ29sbGVjdGlvbih0aGlzLm1vZGVsLnJ1bGVzLCBSdWxlVmlldywgdGhpcy5ib2R5RWwpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKCF0aGlzLmZvb3RFbCkge1xuICAgICAgdmFyIGZvb3RFbCA9IHRoaXMuZm9vdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGZvb3QnKTtcbiAgICAgIGZvb3RFbC5jbGFzc05hbWUgPSAgJ3J1bGVzLWNvbnRyb2xzJztcbiAgICAgIHRoaXMudGFibGVFbC5hcHBlbmRDaGlsZChmb290RWwpO1xuICAgIH1cblxuICAgIHZhciBmb290Um93ID0gdGhpcy5mb290RWwucXVlcnlTZWxlY3RvcigndHInKTtcbiAgICBpZiAoZm9vdFJvdykge1xuICAgICAgdGhpcy5mb290RWwucmVtb3ZlQ2hpbGQoZm9vdFJvdyk7XG4gICAgfVxuXG4gICAgZm9vdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgdGhpcy5mb290RWwuYXBwZW5kQ2hpbGQoZm9vdFJvdyk7XG5cbiAgICBmdW5jdGlvbiBtYWtlQWRkUnVsZSgpIHtcbiAgICAgIHZhciB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICB0ZC5jbGFzc05hbWUgPSAnYWRkLXJ1bGUnO1xuICAgICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBhLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnQWRkIGEgcnVsZScpO1xuICAgICAgYS5jbGFzc05hbWUgPSAnaWNvbi1kbW4gaWNvbi1wbHVzJztcbiAgICAgIHRkLmFwcGVuZENoaWxkKGEpO1xuICAgICAgcmV0dXJuIHRkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VDb2xzcGFuKCkge1xuICAgICAgdmFyIGNvdW50ID0gMSArIE1hdGgubWF4KDEsIHNlbGYubW9kZWwuaW5wdXRzLmxlbmd0aCkgKyBNYXRoLm1heCgxLCBzZWxmLm1vZGVsLm91dHB1dHMubGVuZ3RoKTtcbiAgICAgIHZhciBsaW5rID0gc2VsZi5xdWVyeSgndGZvb3QgLmFkZC1ydWxlJykgfHwgbWFrZUFkZFJ1bGUoKTtcbiAgICAgIGZvb3RSb3cuYXBwZW5kQ2hpbGQobGluayk7XG5cbiAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY291bnQ7IGMrKykge1xuICAgICAgICBmb290Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW9kZWwuaW5wdXRzLm9uKCdhZGQgcmVtb3ZlIHJlc2V0JywgbWFrZUNvbHNwYW4pO1xuICAgIHRoaXMubW9kZWwub3V0cHV0cy5vbignYWRkIHJlbW92ZSByZXNldCcsIG1ha2VDb2xzcGFuKTtcbiAgICBtYWtlQ29sc3BhbigpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlY2lzaW9uVGFibGVWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIHJlcXVpcmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbnZhciBEZWNpc2lvblRhYmxlVmlldyA9IHJlcXVpcmUoJy4vZGVjaXNpb24tdGFibGUtdmlldycpO1xucmVxdWlyZSgnLi9jb250ZXh0bWVudS12aWV3Jyk7XG5yZXF1aXJlKCcuL2NsYXVzZXZhbHVlcy1zZXR0ZXItdmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlY2lzaW9uVGFibGVWaWV3O1xuXG5mdW5jdGlvbiBub2RlTGlzdGFycmF5KGVscykge1xuICBpZiAoQXJyYXkuaXNBcnJheShlbHMpKSB7XG4gICAgcmV0dXJuIGVscztcbiAgfVxuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyLnB1c2goZWxzW2ldKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RBbGwoc2VsZWN0b3IsIGN0eCkge1xuICBjdHggPSBjdHggfHwgZG9jdW1lbnQ7XG4gIHJldHVybiBub2RlTGlzdGFycmF5KGN0eC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG53aW5kb3cuc2VsZWN0QWxsID0gc2VsZWN0QWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLypnbG9iYWwgbW9kdWxlOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UqL1xuXG52YXIgQ2xhdXNlID0gcmVxdWlyZSgnLi9jbGF1c2UtZGF0YScpO1xuXG52YXIgSW5wdXRNb2RlbCA9IENsYXVzZS5Nb2RlbC5leHRlbmQoe1xuICBjbGF1c2VUeXBlOiAnaW5wdXQnLFxuXG4gIGRlcml2ZWQ6IHtcbiAgICB4OiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdjb2xsZWN0aW9uJ1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uaW5kZXhPZih0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9jdXNlZDoge1xuICAgICAgZGVwczogW1xuICAgICAgICAnY29sbGVjdGlvbicsXG4gICAgICAgICdjb2xsZWN0aW9uLnBhcmVudCdcbiAgICAgIF0sXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLnBhcmVudC54ID09PSB0aGlzLng7XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1vZGVsOiBJbnB1dE1vZGVsLFxuICBDb2xsZWN0aW9uOiBDbGF1c2UuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBJbnB1dE1vZGVsXG4gIH0pXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLypnbG9iYWwgbW9kdWxlOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UqL1xuXG52YXIgQ2xhdXNlID0gcmVxdWlyZSgnLi9jbGF1c2UtZGF0YScpO1xuXG52YXIgT3V0cHV0TW9kZWwgPSBDbGF1c2UuTW9kZWwuZXh0ZW5kKHtcbiAgY2xhdXNlVHlwZTogJ291dHB1dCcsXG5cbiAgZGVyaXZlZDoge1xuICAgIHg6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAnY29sbGVjdGlvbi5wYXJlbnQnLFxuICAgICAgICAnY29sbGVjdGlvbi5wYXJlbnQuaW5wdXRzJ1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uaW5kZXhPZih0aGlzKSArIHRoaXMuY29sbGVjdGlvbi5wYXJlbnQuaW5wdXRzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZm9jdXNlZDoge1xuICAgICAgZGVwczogW1xuICAgICAgICAnY29sbGVjdGlvbicsXG4gICAgICAgICdjb2xsZWN0aW9uLnBhcmVudCcsXG4gICAgICAgICdjb2xsZWN0aW9uLnBhcmVudC5pbnB1dHMnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhYmxlID0gdGhpcy5jb2xsZWN0aW9uLnBhcmVudDtcbiAgICAgICAgcmV0dXJuIHRhYmxlLnggPT09IHRoaXMuY29sbGVjdGlvbi5pbmRleE9mKHRoaXMpICsgdGFibGUuaW5wdXRzLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTW9kZWw6IE91dHB1dE1vZGVsLFxuICBDb2xsZWN0aW9uOiBDbGF1c2UuQ29sbGVjdGlvbi5leHRlbmQoe1xuICAgIG1vZGVsOiBPdXRwdXRNb2RlbFxuICB9KVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qZ2xvYmFsIG1vZHVsZTogZmFsc2UsIGRlcHM6IHRydWUsIHJlcXVpcmU6IGZhbHNlKi9cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHZhciBkZXBzID0gcmVxdWlyZTsgfVxuZWxzZSB7IHZhciBkZXBzID0gd2luZG93LmRlcHM7IH1cblxudmFyIFN0YXRlID0gZGVwcygnYW1wZXJzYW5kLXN0YXRlJyk7XG52YXIgQ29sbGVjdGlvbiA9IGRlcHMoJ2FtcGVyc2FuZC1jb2xsZWN0aW9uJyk7XG52YXIgQ2VsbCA9IHJlcXVpcmUoJy4vY2VsbC1kYXRhJyk7XG5cbnZhciBSdWxlTW9kZWwgPSBTdGF0ZS5leHRlbmQoe1xuICBjb2xsZWN0aW9uczoge1xuICAgIGNlbGxzOiBDZWxsLkNvbGxlY3Rpb25cbiAgfSxcblxuICBkZXJpdmVkOiB7XG4gICAgdGFibGU6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAnY29sbGVjdGlvbi5wYXJlbnQnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5wYXJlbnQ7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGZvY3VzZWQ6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ2NvbGxlY3Rpb24nLFxuICAgICAgICAndGFibGUnXG4gICAgICBdLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5pbmRleE9mKHRoaXMpID09PSB0aGlzLnRhYmxlLnk7XG4gICAgICB9XG4gICAgfSxcblxuXG4gICAgZGVsdGE6IHtcbiAgICAgIGRlcHM6IFsnY29sbGVjdGlvbiddLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDEgKyB0aGlzLmNvbGxlY3Rpb24uaW5kZXhPZih0aGlzKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5wdXRDZWxsczoge1xuICAgICAgZGVwczogWydjZWxscycsICd0YWJsZS5pbnB1dHMnXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxzLm1vZGVscy5zbGljZSgwLCB0aGlzLnRhYmxlLmlucHV0cy5sZW5ndGgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBvdXRwdXRDZWxsczoge1xuICAgICAgZGVwczogWydjZWxscycsICd0YWJsZS5pbnB1dHMnXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxzLm1vZGVscy5zbGljZSh0aGlzLnRhYmxlLmlucHV0cy5sZW5ndGgsIC0xKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYW5ub3RhdGlvbjoge1xuICAgICAgZGVwczogWydjZWxscyddLFxuICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgZm46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHMubW9kZWxzW3RoaXMuY2VsbHMubGVuZ3RoIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIGVuc3VyZUNlbGxzOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGMgPSB0aGlzLnRhYmxlLmlucHV0cy5sZW5ndGggKyB0aGlzLnRhYmxlLm91dHB1dHMubGVuZ3RoICsgMTtcblxuICAgIC8vIGZpbmVcbiAgICBpZiAodGhpcy5jZWxscy5sZW5ndGggPT09IGMgfHwgYyA9PT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG5lZWRzIHRvIGJlIGZpbGxlZFxuICAgIGlmICh0aGlzLmNlbGxzLmxlbmd0aCA8IGMpIHtcbiAgICAgIHdoaWxlICh0aGlzLmNlbGxzLmxlbmd0aCA8PSBjKSB7XG4gICAgICAgIHRoaXMuY2VsbHMuYWRkKHt2YWx1ZTonJ30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5lZWRzIHRvIGJlIHRydW5jYXRlZFxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5jZWxscy5tb2RlbHMgPSB0aGlzLmNlbGxzLm1vZGVscy5zbGljZSgwLCBjKTtcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy50YWJsZS5pbnB1dHMsICdyZXNldCcsIHRoaXMuZW5zdXJlQ2VsbHMpO1xuICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGhpcy50YWJsZS5vdXRwdXRzLCAncmVzZXQnLCB0aGlzLmVuc3VyZUNlbGxzKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBNb2RlbDogUnVsZU1vZGVsLFxuXG4gIENvbGxlY3Rpb246IENvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgICBtb2RlbDogUnVsZU1vZGVsLFxuICB9KVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgZGVwczogZmFsc2UgKi9cblxudmFyIFZpZXcgPSBkZXBzKCdhbXBlcnNhbmQtdmlldycpO1xudmFyIENlbGxWaWV3cyA9IHJlcXVpcmUoJy4vY2VsbC12aWV3Jyk7XG52YXIgbWVyZ2UgPSBkZXBzKCdsb2Rhc2gubWVyZ2UnKTtcbnZhciBjb250ZXh0Vmlld3NNaXhpbiA9IHJlcXVpcmUoJy4vY29udGV4dC12aWV3cy1taXhpbicpO1xuXG52YXIgUnVsZVZpZXcgPSBWaWV3LmV4dGVuZCh7XG4gIHRlbXBsYXRlOiAnPHRyPjx0ZCBjbGFzcz1cIm51bWJlclwiPjwvdGQ+PC90cj4nLFxuXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21vZGVsLmRlbHRhJzoge1xuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgc2VsZWN0b3I6ICcubnVtYmVyJ1xuICAgIH1cbiAgfSxcblxuICBkZXJpdmVkOiBtZXJnZSh7fSwgY29udGV4dFZpZXdzTWl4aW4sIHtcbiAgICBpbnB1dHM6IHtcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgJ3BhcmVudCcsXG4gICAgICAgICdwYXJlbnQubW9kZWwnLFxuICAgICAgICAncGFyZW50Lm1vZGVsLmlucHV0cydcbiAgICAgIF0sXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQubW9kZWwuaW5wdXRzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBvdXRwdXRzOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdwYXJlbnQnLFxuICAgICAgICAncGFyZW50Lm1vZGVsJyxcbiAgICAgICAgJ3BhcmVudC5tb2RlbC5vdXRwdXRzJ1xuICAgICAgXSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tb2RlbC5vdXRwdXRzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBhbm5vdGF0aW9uOiB7XG4gICAgICBkZXBzOiBbXG4gICAgICAgICdwYXJlbnQnLFxuICAgICAgICAncGFyZW50Lm1vZGVsJyxcbiAgICAgICAgJ3BhcmVudC5tb2RlbC5hbm5vdGF0aW9ucydcbiAgICAgIF0sXG4gICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQubW9kZWwuYW5ub3RhdGlvbnMuYXQoMCk7XG4gICAgICB9XG4gICAgfVxuICB9KSxcblxuICBldmVudHM6IHtcbiAgICAnY29udGV4dG1lbnUgLm51bWJlcic6ICdfaGFuZGxlUm93Q29udGV4dE1lbnUnXG4gIH0sXG5cbiAgX2hhbmRsZVJvd0NvbnRleHRNZW51OiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgdmFyIHJ1bGUgPSB0aGlzLm1vZGVsO1xuICAgIHZhciB0YWJsZSA9IHJ1bGUuY29sbGVjdGlvbi5wYXJlbnQ7XG5cbiAgICB0aGlzLmNvbnRleHRNZW51Lm9wZW4oe1xuICAgICAgcGFyZW50OiAgIHRoaXMsXG4gICAgICBsZWZ0OiAgICAgZXZ0LnBhZ2VYLFxuICAgICAgdG9wOiAgICAgIGV2dC5wYWdlWSxcbiAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1J1bGUnLFxuICAgICAgICAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnYWRkJyxcbiAgICAgICAgICAgICAgaWNvbjogJ3BsdXMnLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRhYmxlLmFkZFJ1bGUocnVsZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICdhYm92ZScsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnYWJvdmUnLFxuICAgICAgICAgICAgICAgICAgaGludDogJ0FkZCBhIHJ1bGUgYWJvdmUgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmFkZFJ1bGUocnVsZSwgLTEpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGFiZWw6ICdiZWxvdycsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnYmVsb3cnLFxuICAgICAgICAgICAgICAgICAgaGludDogJ0FkZCBhIHJ1bGUgYmVsb3cgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlLmFkZFJ1bGUocnVsZSwgMSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgLy8gICBsYWJlbDogJ2NvcHknLFxuICAgICAgICAgICAgLy8gICBpY29uOiAnY29weScsXG4gICAgICAgICAgICAvLyAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAgICAgdGFibGUuY29weVJ1bGUocnVsZSk7XG4gICAgICAgICAgICAvLyAgIH0sXG4gICAgICAgICAgICAvLyAgIHN1YmNvbW1hbmRzOiBbXG4gICAgICAgICAgICAvLyAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgbGFiZWw6ICdhYm92ZScsXG4gICAgICAgICAgICAvLyAgICAgICBpY29uOiAnYWJvdmUnLFxuICAgICAgICAgICAgLy8gICAgICAgaGludDogJ0NvcHkgdGhlIHJ1bGUgYWJvdmUgdGhlIGZvY3VzZWQgb25lJyxcbiAgICAgICAgICAgIC8vICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRhYmxlLmNvcHlSdWxlKHJ1bGUsIC0xKTtcbiAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgIGxhYmVsOiAnYmVsb3cnLFxuICAgICAgICAgICAgLy8gICAgICAgaWNvbjogJ2JlbG93JyxcbiAgICAgICAgICAgIC8vICAgICAgIGhpbnQ6ICdDb3B5IHRoZSBydWxlIGJlbG93IHRoZSBmb2N1c2VkIG9uZScsXG4gICAgICAgICAgICAvLyAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICB0YWJsZS5jb3B5UnVsZShydWxlLCAxKTtcbiAgICAgICAgICAgIC8vICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgIF1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAncmVtb3ZlJyxcbiAgICAgICAgICAgICAgaWNvbjogJ21pbnVzJyxcbiAgICAgICAgICAgICAgaGludDogJ1JlbW92ZSB0aGlzIHJ1bGUnLFxuICAgICAgICAgICAgICBmbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bGUuY29sbGVjdGlvbi5yZW1vdmUocnVsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxhYmVsOiAnY2xlYXInLFxuICAgICAgICAgICAgICBpY29uOiAnY2xlYXInLFxuICAgICAgICAgICAgICBoaW50OiAnQ2xlYXIgdGhlIGZvY3VzZWQgcnVsZScsXG4gICAgICAgICAgICAgIGZuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGFibGUuY2xlYXJSdWxlKHJ1bGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgfSxcblxuICBzZXRGb2N1czogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5lbCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0aGlzLm1vZGVsLmZvY3VzZWQpIHtcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncm93LWZvY3VzZWQnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Jvdy1mb2N1c2VkJyk7XG4gICAgfVxuICB9LFxuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGFibGUgPSB0aGlzLm1vZGVsLnRhYmxlO1xuXG4gICAgdGhpcy5saXN0ZW5Ub0FuZFJ1bih0YWJsZSwgJ2NoYW5nZTpmb2N1cycsIHRoaXMuc2V0Rm9jdXMpO1xuICAgIHRoaXMubGlzdGVuVG9BbmRSdW4odGFibGUuaW5wdXRzLCAnYWRkIHJlbW92ZSByZXNldCcsIHRoaXMucmVuZGVyKTtcbiAgICB0aGlzLmxpc3RlblRvQW5kUnVuKHRhYmxlLm91dHB1dHMsICdhZGQgcmVtb3ZlIHJlc2V0JywgdGhpcy5yZW5kZXIpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVuZGVyV2l0aFRlbXBsYXRlKCk7XG5cbiAgICB0aGlzLmNhY2hlRWxlbWVudHMoe1xuICAgICAgbnVtYmVyRWw6ICcubnVtYmVyJ1xuICAgIH0pO1xuXG4gICAgdmFyIGk7XG4gICAgdmFyIHN1YnZpZXc7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5pbnB1dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1YnZpZXcgPSBuZXcgQ2VsbFZpZXdzLklucHV0KHtcbiAgICAgICAgbW9kZWw6ICB0aGlzLm1vZGVsLmNlbGxzLmF0KGkpLFxuICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlZ2lzdGVyU3VidmlldyhzdWJ2aWV3LnJlbmRlcigpKTtcbiAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoc3Vidmlldy5lbCk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMub3V0cHV0cy5sZW5ndGg7IGkrKykge1xuICAgICAgc3VidmlldyA9IG5ldyBDZWxsVmlld3MuT3V0cHV0KHtcbiAgICAgICAgbW9kZWw6ICB0aGlzLm1vZGVsLmNlbGxzLmF0KHRoaXMuaW5wdXRzLmxlbmd0aCArIGkpLFxuICAgICAgICBwYXJlbnQ6IHRoaXNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlZ2lzdGVyU3VidmlldyhzdWJ2aWV3LnJlbmRlcigpKTtcbiAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoc3Vidmlldy5lbCk7XG4gICAgfVxuICAgIHN1YnZpZXcgPSBuZXcgQ2VsbFZpZXdzLkFubm90YXRpb24oe1xuICAgICAgbW9kZWw6ICB0aGlzLm1vZGVsLmFubm90YXRpb24sXG4gICAgICBwYXJlbnQ6IHRoaXNcbiAgICB9KTtcbiAgICB0aGlzLnJlZ2lzdGVyU3VidmlldyhzdWJ2aWV3LnJlbmRlcigpKTtcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHN1YnZpZXcuZWwpO1xuXG5cbiAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1bGVWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIG1vZHVsZTogZmFsc2UsIGRlcHM6IGZhbHNlICovXG5cbnZhciBWaWV3ID0gZGVwcygnYW1wZXJzYW5kLXZpZXcnKTtcbnZhciBDb2xsZWN0aW9uID0gZGVwcygnYW1wZXJzYW5kLWNvbGxlY3Rpb24nKTtcbnZhciBTdGF0ZSA9IGRlcHMoJ2FtcGVyc2FuZC1zdGF0ZScpO1xuXG5cblxudmFyIFN1Z2dlc3Rpb25zQ29sbGVjdGlvbiA9IENvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgbW9kZWw6IFN0YXRlLmV4dGVuZCh7XG4gICAgcHJvcHM6IHtcbiAgICAgIHZhbHVlOiAnc3RyaW5nJyxcbiAgICAgIGh0bWw6ICdzdHJpbmcnXG4gICAgfVxuICB9KVxufSk7XG5cblxuXG52YXIgU3VnZ2VzdGlvbnNJdGVtVmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgdGVtcGxhdGU6ICc8bGk+PC9saT4nLFxuXG4gIGJpbmRpbmdzOiB7XG4gICAgJ21vZGVsLmh0bWwnOiB7XG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJ1xuICAgIH1cbiAgfSxcblxuICBldmVudHM6IHtcbiAgICBjbGljazogJ19oYW5kbGVDbGljaydcbiAgfSxcblxuICBfaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50IHx8ICF0aGlzLnBhcmVudC5wYXJlbnQpIHsgcmV0dXJuOyB9XG4gICAgdmFyIHRhcmdldCA9IHRoaXMucGFyZW50LnBhcmVudDtcbiAgICBcbiAgICBpZiAodGFyZ2V0Lm1vZGVsICYmIHR5cGVvZiB0YXJnZXQubW9kZWwudmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0YXJnZXQubW9kZWwudmFsdWUgPSB0aGlzLm1vZGVsLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0YXJnZXQuZWwpIHtcbiAgICAgIHRhcmdldC5lbC50ZXh0Q29udGVudCA9IHRoaXMubW9kZWwudmFsdWU7XG4gICAgfVxuICB9XG59KTtcblxuXG5cbnZhciBTdWdnZXN0aW9uc1ZpZXcgPSBWaWV3LmV4dGVuZCh7XG4gIHNlc3Npb246IHtcbiAgICB2aXNpYmxlOiAnYm9vbGVhbidcbiAgfSxcblxuICBiaW5kaW5nczoge1xuICAgIHZpc2libGU6IHtcbiAgICAgIHR5cGU6ICd0b2dnbGUnXG4gICAgfVxuICB9LFxuXG4gIHRlbXBsYXRlOiAnPHVsIGNsYXNzPVwiZG1uLXN1Z2dlc3Rpb25zLWhlbHBlclwiPjwvdWw+JyxcblxuICBjb2xsZWN0aW9uczoge1xuICAgIHN1Z2dlc3Rpb25zOiBTdWdnZXN0aW9uc0NvbGxlY3Rpb25cbiAgfSxcblxuICBzZXRQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnQgfHwgIXRoaXMucGFyZW50LmVsKSB7XG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyZW50LmVsO1xuICAgIHZhciB0b3AgPSBub2RlLm9mZnNldFRvcDtcbiAgICB2YXIgbGVmdCA9IG5vZGUub2Zmc2V0TGVmdDtcbiAgICB2YXIgaGVscGVyID0gdGhpcy5lbDtcblxuICAgIHdoaWxlICgobm9kZSA9IG5vZGUub2Zmc2V0UGFyZW50KSkge1xuICAgICAgaWYgKG5vZGUub2Zmc2V0VG9wKSB7XG4gICAgICAgIHRvcCArPSBwYXJzZUludChub2RlLm9mZnNldFRvcCwgMTApO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUub2Zmc2V0TGVmdCkge1xuICAgICAgICBsZWZ0ICs9IHBhcnNlSW50KG5vZGUub2Zmc2V0TGVmdCwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRvcCAtPSBoZWxwZXIuY2xpZW50SGVpZ2h0O1xuICAgIGhlbHBlci5zdHlsZS50b3AgPSB0b3A7XG4gICAgaGVscGVyLnN0eWxlLmxlZnQgPSBsZWZ0O1xuICB9LFxuXG4gIHNob3c6IGZ1bmN0aW9uIChzdWdnZXN0aW9ucywgcGFyZW50LCBmb3JjZSkge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChzdWdnZXN0aW9ucykge1xuICAgICAgaWYgKHN1Z2dlc3Rpb25zLmlzQ29sbGVjdGlvbikge1xuICAgICAgICBpbnN0YW5jZS5zdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGluc3RhbmNlLnN1Z2dlc3Rpb25zLnJlc2V0KHN1Z2dlc3Rpb25zKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaW5zdGFuY2UudmlzaWJsZSA9IGZvcmNlIHx8IHN1Z2dlc3Rpb25zLmxlbmd0aCA+IDE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaW5zdGFuY2UudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNob3coW10sIHRoaXMucGFyZW50KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlbmRlcldpdGhUZW1wbGF0ZSgpO1xuICAgIHRoaXMucmVuZGVyQ29sbGVjdGlvbih0aGlzLnN1Z2dlc3Rpb25zLCBTdWdnZXN0aW9uc0l0ZW1WaWV3LCB0aGlzLmVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cblxuXG52YXIgaW5zdGFuY2U7XG5TdWdnZXN0aW9uc1ZpZXcuaW5zdGFuY2UgPSBmdW5jdGlvbiAoc3VnZ2VzdGlvbnMsIHBhcmVudCkge1xuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgaW5zdGFuY2UgPSBuZXcgU3VnZ2VzdGlvbnNWaWV3KHt9KTtcbiAgICBpbnN0YW5jZS5yZW5kZXIoKTtcbiAgfVxuXG4gIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyhpbnN0YW5jZS5lbCkpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGluc3RhbmNlLmVsKTtcbiAgfVxuXG4gIGluc3RhbmNlLnNob3coc3VnZ2VzdGlvbnMsIHBhcmVudCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufTtcblxuXG5TdWdnZXN0aW9uc1ZpZXcuQ29sbGVjdGlvbiA9IFN1Z2dlc3Rpb25zQ29sbGVjdGlvbjtcblxubW9kdWxlLmV4cG9ydHMgPSBTdWdnZXN0aW9uc1ZpZXc7XG4iLCIndXNlIHN0cmljdCc7XG4vKmdsb2JhbCBtb2R1bGU6IGZhbHNlLCBkZXBzOiB0cnVlLCByZXF1aXJlOiBmYWxzZSwgY29uc29sZTogZmFsc2UqL1xuXG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHsgdmFyIGRlcHMgPSByZXF1aXJlOyB9XG5lbHNlIHsgdmFyIGRlcHMgPSB3aW5kb3cuZGVwczsgfVxuXG5cbnZhciBTdGF0ZSA9IGRlcHMoJ2FtcGVyc2FuZC1zdGF0ZScpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9pbnB1dC1kYXRhJyk7XG52YXIgT3V0cHV0ID0gcmVxdWlyZSgnLi9vdXRwdXQtZGF0YScpO1xuXG52YXIgUnVsZSA9IHJlcXVpcmUoJy4vcnVsZS1kYXRhJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJ2xvZGFzaC5kZWZhdWx0cycpO1xuXG52YXIgRGVjaXNpb25UYWJsZU1vZGVsID0gU3RhdGUuZXh0ZW5kKHtcbiAgY29sbGVjdGlvbnM6IHtcbiAgICBpbnB1dHM6ICAgSW5wdXQuQ29sbGVjdGlvbixcbiAgICBvdXRwdXRzOiAgT3V0cHV0LkNvbGxlY3Rpb24sXG4gICAgcnVsZXM6ICAgIFJ1bGUuQ29sbGVjdGlvblxuICB9LFxuXG4gIHByb3BzOiB7XG4gICAgbmFtZTogJ3N0cmluZydcbiAgfSxcblxuICBzZXNzaW9uOiB7XG4gICAgeDoge1xuICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIHk6IHtcbiAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cblxuICAgIGxvZ0xldmVsOiB7XG4gICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9XG4gIH0sXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YWJsZSA9IHRoaXM7XG4gICAgW1xuICAgICAgJ2lucHV0cycsXG4gICAgICAnb3V0cHV0cycsXG4gICAgICAncnVsZXMnXG4gICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChjb2xsZWN0aW9uTmFtZSkge1xuICAgICAgW1xuICAgICAgICAnYWRkJyxcbiAgICAgICAgJ3JlbW92ZScsXG4gICAgICAgICdzb3J0JyxcbiAgICAgICAgJ3Jlc2V0J1xuICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChldnROYW1lKSB7XG4gICAgICAgIHRhYmxlLmxpc3RlblRvKHRhYmxlW2NvbGxlY3Rpb25OYW1lXSwgZXZ0TmFtZSwgZnVuY3Rpb24gKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgICAgICB0YWJsZS50cmlnZ2VyKGNvbGxlY3Rpb25OYW1lICsgJzonICsgZXZ0TmFtZSwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxpc3RlblRvQW5kUnVuKHRoaXMuaW5wdXRzLCAncmVtb3ZlIHJlc2V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaW5wdXRzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgIHRoaXMuaW5wdXRzLmFkZCh7fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxpc3RlblRvQW5kUnVuKHRoaXMub3V0cHV0cywgJ3JlbW92ZSByZXNldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLm91dHB1dHMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgICAgdGhpcy5vdXRwdXRzLmFkZCh7fSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgbG9nOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoYXJndW1lbnRzKTtcbiAgICB2YXIgbWV0aG9kID0gYXJncy5zaGlmdCgpO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzLmNpZCk7XG4gICAgY29uc29sZVttZXRob2RdLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9LFxuXG4gIF9ydWxlQ2xpcGJvYXJkOiBudWxsLFxuXG5cbiAgYWRkUnVsZTogZnVuY3Rpb24gKHNjb3BlQ2VsbCwgYmVmb3JlQWZ0ZXIpIHtcbiAgICB2YXIgY2VsbHMgPSBbXTtcbiAgICB2YXIgYztcblxuICAgIGZvciAoYyA9IDA7IGMgPCB0aGlzLmlucHV0cy5sZW5ndGg7IGMrKykge1xuICAgICAgY2VsbHMucHVzaCh7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgLy8gY2hvaWNlczogdGhpcy5pbnB1dHMuYXQoYykuY2hvaWNlcyxcbiAgICAgICAgZm9jdXNlZDogYyA9PT0gMFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yIChjID0gMDsgYyA8IHRoaXMub3V0cHV0cy5sZW5ndGg7IGMrKykge1xuICAgICAgY2VsbHMucHVzaCh7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgLy8gY2hvaWNlczogdGhpcy5vdXRwdXRzLmF0KGMpLmNob2ljZXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNlbGxzLnB1c2goe1xuICAgICAgdmFsdWU6ICcnXG4gICAgfSk7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgIGlmIChiZWZvcmVBZnRlcikge1xuICAgICAgdmFyIHJ1bGVEZWx0YSA9IHRoaXMucnVsZXMuaW5kZXhPZihzY29wZUNlbGwuY29sbGVjdGlvbi5wYXJlbnQpO1xuICAgICAgb3B0aW9ucy5hdCA9IHJ1bGVEZWx0YSArIChiZWZvcmVBZnRlciA+IDAgPyBydWxlRGVsdGEgOiAocnVsZURlbHRhIC0gMSkpO1xuICAgIH1cblxuICAgIHRoaXMucnVsZXMuYWRkKHtcbiAgICAgIGNlbGxzOiBjZWxsc1xuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgcmVtb3ZlUnVsZTogZnVuY3Rpb24gKHNjb3BlQ2VsbCkge1xuICAgIHRoaXMucnVsZXMucmVtb3ZlKHNjb3BlQ2VsbC5jb2xsZWN0aW9uLnBhcmVudCk7XG4gICAgdGhpcy5ydWxlcy50cmlnZ2VyKCdyZXNldCcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG5cbiAgY29weVJ1bGU6IGZ1bmN0aW9uIChzY29wZUNlbGwsIHVwRG93bikge1xuICAgIHZhciBydWxlID0gc2NvcGVDZWxsLmNvbGxlY3Rpb24ucGFyZW50O1xuICAgIGlmICghcnVsZSkgeyByZXR1cm4gdGhpczsgfVxuICAgIHRoaXMuX3J1bGVDbGlwYm9hcmQgPSBydWxlO1xuXG4gICAgaWYgKHVwRG93bikge1xuICAgICAgdmFyIHJ1bGVEZWx0YSA9IHRoaXMucnVsZXMuaW5kZXhPZihydWxlKTtcbiAgICAgIHRoaXMucGFzdGVSdWxlKHJ1bGVEZWx0YSArICh1cERvd24gPiAxID8gMCA6IDEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuXG4gIHBhc3RlUnVsZTogZnVuY3Rpb24gKGRlbHRhKSB7XG4gICAgaWYgKCF0aGlzLl9ydWxlQ2xpcGJvYXJkKSB7IHJldHVybiB0aGlzOyB9XG4gICAgdmFyIGRhdGEgPSB0aGlzLl9ydWxlQ2xpcGJvYXJkLnRvSlNPTigpO1xuICAgIHRoaXMucnVsZXMuYWRkKGRhdGEsIHtcbiAgICAgIGF0OiBkZWx0YVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG5cbiAgY2xlYXJSdWxlOiBmdW5jdGlvbiAocnVsZSkge1xuICAgIHJ1bGUuY2VsbHMuZm9yRWFjaChmdW5jdGlvbiAoY2VsbCkge1xuICAgICAgY2VsbC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG5cbiAgX3J1bGVzQ2VsbHM6IGZ1bmN0aW9uIChhZGRlZCwgZGVsdGEpIHtcbiAgICB0aGlzLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICAgIHJ1bGUuY2VsbHMuYWRkKHtcbiAgICAgICAgLy8gY2hvaWNlczogYWRkZWQuY2hvaWNlc1xuICAgICAgfSwge1xuICAgICAgICBhdDogZGVsdGEsXG4gICAgICAgIHNpbGVudDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJ1bGVzLnRyaWdnZXIoJ3Jlc2V0Jyk7XG4gIH0sXG5cbiAgYWRkSW5wdXQ6IGZ1bmN0aW9uIChkYXRhLCBwb3NpdGlvbikge1xuICAgIHZhciBkZWx0YSA9IHR5cGVvZiBwb3NpdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBwb3NpdGlvbiA6IHRoaXMuaW5wdXRzLmxlbmd0aDtcbiAgICBkZWx0YSA9IGRlbHRhIDwgMCA/IDAgOiBkZWx0YTtcblxuICAgIHZhciBpbnB1dCA9IHt9O1xuICAgIGRlZmF1bHRzKGlucHV0LCBkYXRhLCB7XG4gICAgICBsYWJlbDogICAgbnVsbCxcbiAgICAgIGNob2ljZXM6ICBudWxsLFxuICAgICAgbWFwcGluZzogIG51bGwsXG4gICAgICBkYXRhdHlwZTogJ3N0cmluZydcbiAgICB9KTtcblxuICAgIHZhciBuZXdNb2RlbCA9IHRoaXMuaW5wdXRzLmFkZChpbnB1dCwge1xuICAgICAgYXQ6IGRlbHRhXG4gICAgfSk7XG5cbiAgICB0aGlzLl9ydWxlc0NlbGxzKG5ld01vZGVsLCBuZXdNb2RlbC5jb2xsZWN0aW9uLmluZGV4T2YobmV3TW9kZWwpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIHJlbW92ZUlucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cblxuXG4gIGFkZE91dHB1dDogZnVuY3Rpb24gKGRhdGEsIHBvc2l0aW9uKSB7XG4gICAgdmFyIGRlbHRhID0gdHlwZW9mIHBvc2l0aW9uICE9PSAndW5kZWZpbmVkJyA/IHBvc2l0aW9uIDogdGhpcy5vdXRwdXRzLmxlbmd0aDtcbiAgICBkZWx0YSA9IGRlbHRhIDwgMCA/IDAgOiBkZWx0YTtcblxuICAgIHZhciBvdXRwdXQgPSB7fTtcbiAgICBkZWZhdWx0cyhvdXRwdXQsIGRhdGEsIHtcbiAgICAgIGxhYmVsOiAgICBudWxsLFxuICAgICAgY2hvaWNlczogIG51bGwsXG4gICAgICBtYXBwaW5nOiAgbnVsbCxcbiAgICAgIGRhdGF0eXBlOiAnc3RyaW5nJ1xuICAgIH0pO1xuXG4gICAgdmFyIG5ld01vZGVsID0gdGhpcy5vdXRwdXRzLmFkZChvdXRwdXQsIHtcbiAgICAgIGF0OiBkZWx0YVxuICAgIH0pO1xuXG4gICAgdGhpcy5fcnVsZXNDZWxscyhuZXdNb2RlbCwgbmV3TW9kZWwuY29sbGVjdGlvbi5pbmRleE9mKG5ld01vZGVsKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICByZW1vdmVPdXRwdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuRGVjaXNpb25UYWJsZU1vZGVsID0gRGVjaXNpb25UYWJsZU1vZGVsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTW9kZWw6IERlY2lzaW9uVGFibGVNb2RlbFxufTtcbiJdfQ==
