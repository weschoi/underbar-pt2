const _ = require('../underbar-pt2');

// The test framework has overridden the JavaScript timing facilities so we can control time precisely
// for testing purposes.
jest.useFakeTimers();

describe('underbar part 2', () => {

  describe('extend', () => {

    it('returns the first argument', () => {
      const destination = {};
      const source = {};
      const extended = _.extend(destination, source);

      expect(extended).toEqual(destination);
    });

    it('should extend an object with the attributes of another', () => {
      const destination = {};
      const source = { a: 'b' };
      const extended = _.extend(destination, source);

      expect(extended.a).toEqual('b');
    });

    it('should override properties found on the destination', () => {
      const destination = { a: 'x' };
      const source = { a: 'b' };
      const extended = _.extend(destination, source);

      expect(extended.a).toEqual('b');
    });

    it('should not override properties not found in the source', () => {
      const destination = { x: 'x' };
      const source = { a: 'b' };
      const extended = _.extend(destination, source);

      expect(extended.x).toEqual('x');
    });

    it('should extend from multiple source objects', () => {
      const extended = _.extend({ x: 1 }, { a: 2 }, { b: 3 });

      expect(extended).toEqual({ x: 1, a: 2, b: 3 });
    });

    it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', () => {
      const extended = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

      expect(extended).toEqual({ x: 2, a: 1 });
    });
  });

  describe('defaults', function() {

    it('should return the original target object', function() {
      /*
       * Our defaults function should only modify the contents of the original object,
       * it should not create a new object with all the same properties.
       */

      const destination = {};
      const source = {};
      const defaulted = _.defaults(destination, source);

      expect(defaulted).toBe(destination);
    });

    it('should copy a property if that key is not already set on the target', function() {
      /*
       * Be careful when using `arguments`. It's specified as an "Array-like object"
       * that's not really an array and not really even an object. This means normal operations
       * we would expect to work on objects (`for in`, `Object.keys`) and arrays (`push`, `pop`)
       * might not work as expected on `arguments`.
       */

      const destination = {};
      const source = { a: 1 };

      _.defaults(destination, source);

      expect(destination.a).toEqual(1);
    });

    it('should copy any property whose key is not already set on the target', function() {
      const destination = {};
      const source = { a: 1, b: 2, c: 'three' };

      _.defaults(destination, source);

      expect(destination.a).toEqual(1);
      expect(destination.b).toEqual(2);
      expect(destination.c).toEqual('three');
    });

    it('should not copy a property if that key is already set on the target', function() {
      const destination = { a: 10, b: 2 };
      const source = { a: 1, b: 3, c: 'foo' };

      _.defaults(destination, source);

      expect(destination.c).toEqual('foo');
      expect(destination.b).toEqual(2);
      expect(destination.a).toEqual(10);
    });

    it('should not copy any property whose key is already set on the target', function() {
      const destination = { a: 1, b: 2 };
      const source = { a: 100, b: 200, c: 300 };

      _.defaults(destination, source);

      expect(destination.a).toEqual(1);
      expect(destination.b).toEqual(2);
      expect(destination.c).toEqual(300);
    });

    it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {
      /*
       * When the value provided to an if() condition is not a strict boolean,
       * it will first be coerced into one and then evaluated
       *
       * A value is considered 'falsy' if, when coerced, it evaluates to `false`.
       * You can check the coerced boolean with either `Boolean(myValue)` or `!!myValue`
       *
       * This could be a problem because falsy values are valid in our object. If we aren't
       * precise enough with our conditional check, we might get these unexpected results.
       */

      const destination = {a: '', b: 0, c: NaN };
      const source = { a: 1, b: 2, c: 3, d: 4 };

      _.defaults(destination, source);

      expect(destination.d).toEqual(4);
      expect(destination.a).toEqual('');
      expect(destination.b).toEqual(0);
      expect(isNaN(destination.c)).toEqual(true);
    });

    it('should copy properties source an arbitrary number of source objects', function() {
      const destination = {};
      const source = { a: 1 };
      const anotherSource = { b: 2, c: 'three' };
      const aThirdSource = { d: 'four' };

      _.defaults(destination, source, anotherSource, aThirdSource);

      expect(destination.a).toEqual(1);
      expect(destination.b).toEqual(2);
      expect(destination.c).toEqual('three');
      expect(destination.d).toEqual('four');
    });

    it('should prefer the first value found when two objects are provided with properties at the same key', function() {
      const destination = {};
      const source = { a: 1 };
      const anotherSource = { a: 'one' };

      _.defaults(destination, source, anotherSource);

      expect(destination.a).toEqual(1);
    });
  });

  describe('once', function() {

    it('should return a function', function() {
      // noop is short for `no-operation` and is pronounced `no-op`
      const noop = _.once(function() {});
      expect(noop).toBeInstanceOf(Function);
    });

    it('should only run a user-defined function if it has not been run before', function() {
      let num = 0;
      const increment = _.once(function() {
        num++;
      });

      increment();
      increment();
      increment();

      expect(num).toEqual(1);
    });

    it('should apply arguments to the user-defined function', function() {
      const add = _.once(function(x, y, z) {
        return x + y + z;
      });

      expect(add(1, 2, 3)).toEqual(6);
    });

    it('should return the result of the first call for every subsequent call', function() {
      const add = _.once(function(x, y, z) {
        return x + y + z;
      });

      expect(add(1, 2, 3)).toEqual(6);
      expect(add(4, 5, 6)).toEqual(6);
      expect(add(7, 8, 9)).toEqual(6);
    });
  });


  describe('shuffle', function() {
    it('should not modify the original object', function() {
      const numbers = [4, 5, 6];
      const shuffled = _.shuffle(numbers).sort();

      expect(shuffled).not.toBe(numbers);
      expect(numbers).toEqual([4, 5, 6]);
    });

    it('should have the same elements as the original object', function() {
      const numbers = [4, 5, 6];
      const shuffled = _.shuffle(numbers).sort();

      expect(shuffled).toEqual([4, 5, 6]);
    });

    it('should not be in the same order as the original object', function() {
      const numbers = Array.from(Array(100000).keys()); // creates an array of [0, 1, 3, ... , 9999]
      const shuffled = _.shuffle(numbers);

      // This test will fail 1/100000 times :)
      expect(shuffled).toBeDefined();
      expect(shuffled).not.toEqual(numbers);
    });
  });

  describe('memoize', function() {
    var add, memoAdd;

    beforeEach(function() {
      add = function(a, b) {
        return a + b;
      };

      memoAdd = _.memoize(add);
    });

    it('should produce the same result as the non-memoized version', function() {
      expect(add(1, 2)).toEqual(3);
      expect(memoAdd(1, 2)).toEqual(3);
    });

    it('should give different results for different arguments', function() {
      expect(memoAdd(1, 2)).toEqual(3);
      expect(memoAdd(3, 4)).toEqual(7);
      expect(memoAdd(1, 3)).toEqual(4);
    });

    it('should not run the memoized function twice when given a primitive type as an argument', function() {
      // Here, we wrap a dummy function in a spy. A spy is a wrapper function (much like _.memoize
      // or _.once) that keeps track of interesting information about the function it's spying on;
      // e.g. whether or not the function has been called.
      const spy = jest.fn(function() { return 'Dummy output'; });
      const memoSpy = _.memoize(spy);

      memoSpy(10);
      expect(spy).toBeCalled();
      expect(spy.mock.calls.length).toBe(1);

      memoSpy(10);
      expect(spy).toBeCalled();
      expect(spy.mock.calls.length).toBe(1);
    });

    it('should not run the memoized function twice when given a reference type as an argument', function() {
      // Be careful how you are checking if a set of arguments has been passed in already.
      const spy = jest.fn(function() { return 'Dummy output'; });
      const memoSpy = _.memoize(spy);

      memoSpy([1, 2, 3]);
      expect(spy).toBeCalled();
      expect(spy.mock.calls.length).toBe(1);

      memoSpy([1, 2, 3]);
      expect(spy.mock.calls.length).toBe(1);
    });

    it('should run the memoized function twice when given an array and then given a list of arguments', function() {
      // Be careful how you are checking if a set of arguments has been passed in already
      const spy = jest.fn(function() { return 'Dummy output'; });
      const memoSpy = _.memoize(spy);

      memoSpy([1, 2, 3]);
      expect(spy).toBeCalled();
      expect(spy.mock.calls.length).toBe(1);

      memoSpy(1, 2, 3);
      expect(spy.mock.calls.length).toBe(2);
    });
  });

  describe('delay', function() {
    var callback;

    beforeEach(function() {
      // Create a "mock" function that will "spy" on the calls that are made to it.
      callback = jest.fn();
    });

    it('should only execute the function after the specified wait time', function() {
      _.delay(callback, 100);

      // The test framework has overridden the JavaScript timing facilities so we can control time precisely
      // for testing purposes.
      // Here we are fast-forwarding time a precise number of milliseconds.
      jest.runTimersToTime(99);

      expect(callback).not.toBeCalled();

      jest.runTimersToTime(1);

      expect(callback).toBeCalled();
      expect(callback.mock.calls.length).toBe(1);
    });

    it('should have successfully passed function arguments', function() {
      _.delay(callback, 100, 1, 2);

      jest.runTimersToTime(100);

      expect(callback.mock.calls[0][1]).toBe(2);
    });
  });


});
