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

[@vipinajayakumar](https://twitter.com/vipinajayakumar)

---

## Let's learn about

- Higher-order functions and callbacks
- Closure (Xmas comes early)
- Asynchronous JavaScript
- Object Oriented JavaScript

Heavily inspired by [Will Sentance](https://twitter.com/willsentance)'s course:
[JavaScript: The Hard Parts, v2](https://frontendmasters.com/courses/javascript-hard-parts-v2/)

---

## Basic facts of life

- **Thread of execution** - JS executes code line by line.
- **Functions** are code that we can call/invoke/execute using name and ().
  - **Parameters** can be defined that provide actual values called
    **arguments**
- **JavaScript engine** is a program that executes JS code. e.g.
  [V8](https://v8.dev/)
  - **Memory heap** is where data is saved.
  - **Call stack** keeps track of function invocations
    - **Execution context** is created to run a function with its own **local
      memory**

--

![](images/call_stack.png) Reference:
[In-Depth Introduction to Call Stack in JavaScript](https://medium.com/swlh/in-depth-introduction-to-call-stack-in-javascript-a07b8513bcc3)

--

## Execution context

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

## Higher-order functions and callbacks

- Functions that can
  - take **callback functions** as arguments or
  - return a function as output.
- Functions are **first-class citizens** in JS, meaning they are treated like
  any other JS object.

```js []
let numbers = [1, 4, 9]
let roots = numbers.map((num) => Math.sqrt(num))

// roots is now     [1, 2, 3]
// numbers is still [1, 4, 9]
```

--

![](images/goku.png)

---

## Closure (or backpack)

<img src="images/backpack.jpg" width="50%"/>

--

## Example

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

- When a function is created, it maintains a link to its lexical environment
- Scoping: How a parser resolves variable names when functions are nested
  - Lexical scoping: Based on where function is defined
  - Dynamic scoping: Based on where function is executed

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

--

> A closure is the combination of a function bundled together (enclosed) with
> references to its surrounding state (the lexical environment). In other words,
> a closure gives you access to an outer function’s scope from an inner
> function. In JavaScript, closures are created every time a function is
> created, at function creation time.

[Mozilla definition for closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

--

## Usage of closures

- [once](https://underscorejs.org/#once),
  [memoize](https://underscorejs.org/#memoize)
- [Iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- Asynchronous JavaScript (promises)

<!-- TBC -->

---
## Asynchronous JavaScript

--

--