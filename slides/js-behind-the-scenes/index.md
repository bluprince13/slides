<a href="https://revealjs.com">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
        alt="reveal.js logo"
            style="
            height: 180px;
            margin: 0 auto 4rem auto;
              background: transparent;"
        />
</a>

### JS - Behind the scenes

[bluprince13.com/slides/js-behind-the-scenes](https://bluprince13.com/slides/js-behind-the-scenes)

---

## Let's learn about

- Basics facts of life 🏠
- Higher-order functions 🦸‍♀️
- Closure 🎒
- Asynchronous JavaScript 🤹
- Promise 🤝
- Async await 🚦

---

## Heavily inspired by

- [Will Sentance](https://twitter.com/willsentance) -
  [Frontend Masters](https://frontendmasters.com/)
  - [JavaScript: The Hard Parts, v2](https://frontendmasters.com/courses/javascript-hard-parts-v2/)
  - [JavaScript: The New Hard Parts](https://frontendmasters.com/courses/javascript-new-hard-parts)
- [Andrei Neagoie](https://twitter.com/andreineagoie) -
  [Zero To Mastery](https://zerotomastery.io/)
  - [JavaScript: The Advanced Concepts](https://www.udemy.com/course/advanced-javascript-concepts)

---

## Basic facts of life 🏠

--

Single thread of execution

Note:

- Line by line execution

--

![](images/function.png)

[Frontamentals - JavaScript Functions](https://www.frontamentals.com/functions/)

<!-- .element: class="caption" -->

--

## JS engine

- JavaScript engine is a program that executes JS code.
- e.g. [V8](https://v8.dev/) by Google

![](images/js-engine.png) <!-- .element: width="40%" -->

[JavaScript Call Stack, Event Loop and Callbacks](https://prashantb.me/javascript-call-stack-event-loop-and-callbacks/)

<!-- .element: class="caption" -->

Note:

- V8 is what's used in Chrome and Node

--

![](images/call_stack.png)

Reference:
[In-Depth Introduction to Call Stack in JavaScript](https://medium.com/swlh/in-depth-introduction-to-call-stack-in-javascript-a07b8513bcc3)

<!-- .element: class="caption" -->

--

```js []
const num = 10

const multiplyBy2 = (x) => {
 const result = x * 2
 return result
}

const output = multiplyBy2(num)
```

Note:

- Everytime a function is invoked, a new Execution Context is created.

--

```js []
const num = 10

const multiplyBy2 = (x) => {
 const result = x * 2
 return result
}

const output = multiplyBy2(num)
```

![](images/execution_context.png)

---

## Higher-order functions 🦸‍♀️

- Take callback functions as arguments or
- Return a function as output.

--

```js []
let numbers = [1, 4, 9]
let roots = numbers.map((num) => Math.sqrt(num))

// roots is now     [1, 2, 3]
// numbers is still [1, 4, 9]
```

Note:

- Appreciate that we're creating a brand new function here, even though it's
  anonymous

--

## Functions are first-class citizens in JS

Note:

- Treated just like any other object.
- Therefore, it's possible to pass them in as parameters or return them from a
  function as well.

--

![](images/goku.png)

Note:

- Functions were already cool even before they could take parameters
- I remember learning to call them `procedures`
- They help with DRY.
- Parameters lets us take DRY one step further.
- With HOF, functions are now extremely powerful!

---

## Closure 🎒

<img src="images/backpack.jpg" width="50%"/>

Note:

- Notice the backpack that the function is carrying.

--

```js []
const outer = () => {
 let counter = 0
 const incrementCounter = () => counter++
 return incrementCounter
}

const myNewFunction = outer()
myNewFunction()
```

--

```js [7]
const outer = () => {
 let counter = 0
 const incrementCounter = () => counter++
 return incrementCounter
}

const myNewFunction = outer()
myNewFunction()
```

<img src="images/closure-1.png"/>

--

```js [8]
const outer = () => {
 let counter = 0
 const incrementCounter = () => counter++
 return incrementCounter
}

const myNewFunction = outer()
myNewFunction()
```

<img src="images/closure-2.png"/>

--

## Can functions remember stuff?

--

- Scoping: How a parser resolves variable names when functions are nested
  - Lexical scoping: Based on where function is defined
  - Dynamic scoping: Based on where function is executed
- When a function is created, it maintains a link to its lexical environment

--

```js [8]
const outer = () => {
 let counter = 0
 const incrementCounter = () => counter++
 return incrementCounter
}

const myNewFunction = outer()
myNewFunction()
```

<img src="images/closure-3.png"/>

Note:

- Show closure in browser

--

> A closure is the combination of a function bundled together (enclosed) with
> references to its surrounding state (the lexical environment). In other words,
> a closure gives you access to an outer function’s scope from an inner
> function. In JavaScript, closures are created every time a function is
> created, at function creation time.

[Mozilla definition for closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

Note: Confusingly, both the concept and the actual backpack are referred to as
closures.

--

```js [11-12]
const outer = () => {
 let counter = 0
 const incrementCounter = () => counter++
 return incrementCounter
}

const myNewFunction = outer()
myNewFunction() // counter = 1
myNewFunction() // counter = 2

const myNewestFunction = outer()
myNewestFunction() // counter = ?
```

Note:

- What do you think the value of counter would be?

--

> With great power comes great responsibility - Uncle Ben

--

## Usage of closures

- [once](https://underscorejs.org/#once),
  [memoize](https://underscorejs.org/#memoize)
- [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- Data hiding and encapsulation - used in
  [JavaScript Module Pattern](https://coryrylan.com/blog/javascript-module-pattern-basics)
- Asynchronous JavaScript - callbacks and promises rely on closure to persist
  state

Note:

- once - ensure a function once runs once, e.g., an initialisation
- memoize - memo: short note on something to be remembered and is linked to
  memory; a memoize function improves performance by caching results for
  previous invocations
- Iterators provide `next` method so that you can retrieve things from a
  collection. [Example](https://masteringjs.io/tutorials/fundamentals/iterator).
- Generators use the `yield` keyword to pause execution / suspend an execution
  context.
  [Example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

--

  <!-- .slide: data-background-color="white" data-background-iframe=" https://quiz.typeofnan.dev/lexical-scope/" data-background-interactive -->

---

## Asynchronous JavaScript 🤹

![](images/multi-tasking.webp)

Note:

- Asynchronous: 1 person multi-tasking even though they can only do 1 thing a
  time (like an oncall)
- Parallel: Multiple people doing things at the same time (like devs in a
  sprint)
- How can a single threaded JS engine multi-task? All it has is a call stack and
  memory heap.
- e.g. it comes across a Twitter API call. It has to wait there, right? If it
  goes past immediately after making the call, there's no way for it to come
  back and get the results.
- Hmmmm

--

## Blocking code can ruin the UX

Note:

- Browser uses a single thread to run all the JavaScript in your page as well as
  to perform layout, reflows, and garbage collection. This means that
  long-running JavaScript functions can block the thread, leading to an
  unresponsive page and a bad user experience.
- Well, it turns out that JS is not alone.
- It's just one musician that's part of a bigger orchestra.

--

![](images/js-runtime.png)

[The Javascript Runtime Environment](https://olinations.medium.com/the-javascript-runtime-environment-d58fa2e60dd0)

<!-- .element: class="caption" -->

Note:

- The Web APIs can be seen on the `window` object in the console.
- The Event Loop has the least glamourous job — to monitor the Call Stack and
  the Callback Queue. If the Call Stack is empty, it will take the first event
  from the queue and will push it to the Call Stack, which effectively runs it.

--

[Loupe](http://latentflip.com/loupe)

A little visualisation to help you understand how JavaScript's call stack/event
loop/callback queue interact with each other.

Note:

- Remember to adjust the delay.
- If we change the timer to 0s, would the execution order be different?

--

## What if we want to track the background task in JS land?

---

## Promise 🤝

Introduced in ES6 2015

![](images/promise.jpg)

--

```js []
fetch('https://example.com/movies.json')
 .then((response) => response.json())
 .then((data) => console.log(data))
```

Note:

- Promises let us write something like this.
- This function does two things:
  - Initiate background web browser work
  - Return a placeholder object in JS land
  - Dot notation indicates we are usig its method
  - That placeholder object is called a promise

--

```js []
const myPromise = new Promise((resolve, reject) => {
    let condition;

    if(condition is met) {
        resolve('Promise is resolved successfully.');
    } else {
        reject('Promise is rejected');
    }
});
myPromise.then(onFulfilledFunc).catch(onRejectedFunc)

// {
//   [[PromiseState]]: "pending",
//   [[PromiseResult]]: undefined
// }
```

![](images/promise-states.png)

Note:

- You can also instantiate a promise using the new keyword
- Have a look at the promise object

  - The double brackets indicate that these are properties used internally by JS
    engine. You can't access the state or result directly, only via Promise
    methods.
  - When we use the resolve/reject, the Promise object is updated.

- `then` lets you do something when the Promise is resolved - just like a
  callback.
- `catch` lets you do error handling.
- The `onFulfilled` and `onRejected` functions get the `PromiseResult` as input.
- They go into browser land and are pushed into the callback queue when the
  promise resolves or rejects.
- You can chain lots of `then` and `catch` statements.

--

## Benefits

- More readable
- Easy to chain; avoid callback pyramid of doom
- Better error handling
- Promise.all

Note:

- On the downside, a lot of beginners probably don't understand these well and
  might find them hard to debug.

--

```js []
setTimeout(() => console.log('Hello'), 0)

fetch('https://example.com/movies.json') //
 .then((data) => console.log(data))

blockforALongTime()

console.log('Bye')
```

Note:

- Given that this function is going over to the callback queue in browser land,
  how does it remember the data? Closure!
- How could we block for 300ms?
- What order do you think the console messages be printed?

```js []
var i = 0
while (i < 1000000000) {
 i++
}
```

--

```js []
setTimeout(() => console.log('Hello'), 0)

fetch('https://example.com/movies.json') //
 .then((data) => console.log(data))

blockforALongTime()

console.log('Bye')

// Bye
// movies
// Hello
```

Note:

- Why does hello come after movies?

--

Promise callbacks go to the Microtask queue (or Job queue) which the event loop
prioritises over the Task queue (or Callback queue)

---

## Async await 🚦

Introduced in ES8 2017

--

```js []
function hello() {
 return 'Hello'
}
hello()
```

--

```js []
async function hello() {
 return 'Hello'
}
hello() // The result is now a promise!

hello().then(alert) // And we can use promise methods on it.
```

--

## Async function returns a promise

--

```js []
async function fetchMovies() {
 const response = await fetch('/movies')
 // waits until the request completes...
 console.log(response)
}
```

Note:

- The async keywod isn't all that useful in itself.
- The await keyword lets you pause a function until whatever's on its right is
  resolved.
- It's invoking the `then` method on the promise.

--

## Await pauses your code until Promise is fulfilled and then returns the PromiseResult

Note:

- How does it pause? Remember that generators can pause execution?
- Closure

--

## Error handling

```js []
async function fetchMovies() {
 try {
  let response = await fetch('/thisWillFailHahaha')
  console.log(await response.json())
 } catch (err) {
  // catches errors both in fetch and response.json
  alert(err)
 }
}

fetchMovies()
```

--

## Benefits of async/await

- Syntactic sugar
- Makes it look like synchronous code?
- Easier to read?
- Can await Promise.all

Note:

- Even though it looks like synchronous code, remember that the whole async
  funtion is non-blocking
- Beginners might not understand how async await code truly works.
- Error handling using try/catch is arguably not as neat as with promises.
- Another downside: Can only use await within async function.

--

  <!-- .slide: data-background-color="white" data-background-iframe=" https://quiz.typeofnan.dev/async-await/" data-background-interactive -->

--

Further reading:
[Making asynchronous programming easier with async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

---

## Conclusion

- Basics facts of life 🏠
- Higher-order functions 🦸‍♀️
- Closure 🎒
- Asynchronous JavaScript 🤹
- Promise 🤝
- Async await 🚦
