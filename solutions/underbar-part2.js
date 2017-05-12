const { each } = require('../underbar-pt1');

// Extend a given object with all the properties of the passed in
// object(s).
const extend = function(obj) {
  each(Array.from(arguments).slice(1), function(object) {
    each(object, function(prop, key) {
      obj[key] = prop;
    });
  });
  return obj;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in the object.
const defaults = function(obj) {
  each(Array.from(arguments).slice(1), function(object) {
    each(object, function(prop, key) {
      obj[key] === undefined && (obj[key] = prop);
    });
  });

  return obj;
};


// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  // These variables are stored in a closure so they'll remain available
  // to the newly-generated function every time it's called.
  let alreadyCalled = false;
  let result;

  // TIP: We'll return a new function that delegates to the old one, but only
  // if it hasn't been called before.
  return function() {
    if (!alreadyCalled) {
      // TIP: .apply(this, arguments) is the standard way to pass on all of the
      // info from one function call to another.
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    // The new function always returns the originally computed result.
    return result;
  };
};

// Memoize (not "memorize", but close!) the results of an expensive-to-run function.
// You may assume that the function only takes primitives as arguments.
// "memoize" could in theory be renamed to "oncePerUniqueArgumentList".
// memoize does the same thing as "once()", but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
const memoize = function(func) {
  const memoizedFunc = function( /* keep things flexible with no explicit parameters, but that's ok in JavaScript */ ) {
    const cache = memoizedFunc.cache;
    const key = JSON.stringify(arguments);
    if (!cache[key]) {
      cache[key] = func.apply(this, arguments);
    }
    return cache[key];
  };
  memoizedFunc.cache = {};
  return memoizedFunc;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500 milliseconds.
const delay = function(func, wait) {
  const args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function() {
    return func.apply(null, args);
  }, wait);
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  // See http://bost.ocks.org/mike/shuffle/ for an in-depth explanation of the
  // Fisher-Yates Shuffle

  // Make a copy of the original array
  let out = arr.slice();
  let currentIdx = arr.length - 1;
  let temp, swapIdx;

  while (currentIdx) {
    swapIdx = Math.floor(Math.random() * currentIdx);

    currentIdx -= 1;

    temp = out[currentIdx];
    out[currentIdx] = out[swapIdx];
    out[swapIdx] = temp;
  }

  return out;
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};
