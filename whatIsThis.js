
// utility for logging
if(!log)
    var log = function(){ console.log([].slice.call(arguments)) }

var FILL_ME_IN

// predefined variables
var whatIsThis = function(a, b) {
    return [this, a, b].join(',')
}

var inAnObject = {
    name: 'inAnObject',
    test1: whatIsThis,
    anotherObject: {
        name: 'anotherObject',
        test2: whatIsThis
    }
}

var inAFunction = function(a, b) {
    this.name = 'Sally'
    whatIsThis(a, b)
}

inAFunction.prototype.test3 = whatIsThis

var trickyTricky = {
    name: 'trickyTricky',
    why: 'does this work?',
    what: 'is going on here?'
}

var confusing = {
    name: 'confusing',
    state: 'Alaska',
    city: 'Anchorage'
}

/**
 * THE PROBLEMS
 */

 console.assert(whatIsThis('hello', 'world') === '[object Window],hello,world');
 console.log(whatIsThis('hello', 'world'));
 // This code isn't running within anything, it's running on it's own merit so the object it is in is the window.

 console.assert(window.whatIsThis('hello', 'world') === '[object Window],hello,world');
 console.log(window.whatIsThis('hello', 'world'));
 // This is the same as above but only being descriptive of the fact that it is still in the window.

 console.assert(inAnObject.test1('face', 'book') === '[object Object],face,book');
 console.log(inAnObject.test1('face', 'book'));
 // It is in an object in the data list so it is showing it is an object.

//  console.assert(inAnObject.anotherObject.test1('twitter', 'book') === TypeError);
//  console.log(inAnObject.anotherObject.test1('twitter', 'book'));
//  // This is an error. You can't link two objects with a .
//
// console.assert(inAnObject.anotherObject.test2('twitter', 'book') === TypeError);
// console.log(inAnObject.anotherObject.test2('twitter', 'book'));
// // Same reasoning as above. We just changed the test name.

console.assert(whatIsThis.call() === '[object Window],,');
console.log(whatIsThis.call());
// There have been no arguments states so there is nothing to call.

console.assert(whatIsThis.call(trickyTricky) === '[object Object],,');
console.log(whatIsThis.call(trickyTricky));
// you have only put in one object and no arguments so it's stating there is an object there but the commas indiciate there is no argument.

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === '[object Object],nice,job');
console.log(whatIsThis.call(trickyTricky, 'nice', 'job'));
// This is showing there is an object (trickyTricky) and two arguments separated by a comma.

console.assert(whatIsThis.call(confusing) === '[object Object],,');
console.log(whatIsThis.call(confusing));
// This is the exact same problem as the trickTricky. This is an object with no argument.

console.assert(whatIsThis.call(confusing, 'hello') === '[object Object],hello,');
console.log(whatIsThis.call(confusing, 'hello'));
// There is one object- confusing and only one argument - hello. So there is an extra comma at the end for the second argument.

console.assert(whatIsThis.apply(trickyTricky) === '[object Object],,');
console.log(whatIsThis.apply(trickyTricky));
// Same problem as above. One object, no arguments

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === '[object Object],nice,job');
console.log(whatIsThis.apply(confusing, ['nice', 'job']));
// There is an object-confusing and two arguments. Same as above. This is all rather repetitive.

// console.assert(whatIsThis.apply(confusing, 'nice', 'job') === TypeError);
// console.log(whatIsThis.apply(confusing, 'nice', 'job'));
// // This one is not the correct semantics. There needs to be []

console.assert(inAFunction('what will', 'happen?') === undefined);
console.log(inAFunction('what will', 'happen?'));
// There are arguments without an object so it's undefined.

try{
    console.assert(inAFunction.test3('A', 'B') === 'TypeError');
} catch(e){
    log(e)
    console.log(inAFunction.test3('A', 'B'));
}
// This is an arror before test.3 is not a function.

var newObject = new inAFunction('what will', 'happen?')
console.assert(newObject.name === error);

// There is no .name assosciated with newObject.

var newObject2 = new inAFunction('what will', 'happen?')
console.assert(newObject2.test3('C', 'D') === error);
console.log(newObject2.test3('C', 'D'));
// test3 is not defined

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === error);
// test1 is not defined test3 is not defined

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === error);
// test2 is not defined
