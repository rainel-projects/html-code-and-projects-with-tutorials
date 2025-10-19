# JavaScript (ES6+) Interview Questions with One-Line Answers

## 1. Promises

**Q1:** What is a Promise in JavaScript?
A: An object representing a future value from an asynchronous operation.

**Q2:** Explain the states of a Promise.
A: Pending, Fulfilled, or Rejected.

**Q3:** How do you handle errors in Promises?
A: Using `.catch()` or `try/catch` with async/await.

**Q4:** What is the difference between `Promise.all()` and `Promise.race()`?
A: `all` waits for all promises, `race` resolves/rejects on the first settled promise.

**Q5:** What is the difference between `.then()` and `await`?
A: `.then()` chains Promises, `await` pauses execution until a Promise resolves.

**Q6:** Can a Promise be pending forever? How?
A: Yes, if it neither resolves nor rejects.

**Q7:** How can you chain multiple promises?
A: By returning a Promise in `.then()`.

**Q8:** What is the difference between `Promise.resolve()` and `Promise.reject()`?
A: One creates a resolved promise, the other a rejected one.

## 2. Async/Await

**Q1:** What is async/await in JavaScript?
A: Syntax for handling Promises more synchronously.

**Q2:** Can you use `await` outside an async function?
A: No, except at top-level in modules.

**Q3:** How do you handle errors with async/await?
A: Using `try...catch` blocks.

**Q4:** What is the difference between async/await and Promises?
A: Async/await is syntactic sugar over Promises.

**Q5:** How can you run multiple async functions concurrently?
A: Using `Promise.all()`.

**Q6:** Explain the behavior of `await` in loops.
A: It pauses each iteration until the Promise resolves.

## 3. Destructuring

**Q1:** What is destructuring in JavaScript?
A: Extracting values from arrays or objects into variables.

**Q2:** Provide an example of array destructuring.
A: `const [a, b] = [1,2];`

**Q3:** Provide an example of object destructuring.
A: `const {name, age} = obj;`

**Q4:** What is the difference between destructuring with default values and without?
A: Defaults assign a value if undefined.

**Q5:** Can you destructure nested objects and arrays? How?
A: Yes, using nested `{}` or `[]` syntax.

**Q6:** How can you rename variables while destructuring objects?
A: `const { name: newName } = obj;`

## 4. Modules

**Q1:** What are JavaScript modules?
A: Reusable files that export/import code.

**Q2:** How do you export and import in ES6?
A: Using `export` and `import` keywords.

**Q3:** Difference between named export and default export?
A: Named allows multiple exports; default only one.

**Q4:** Can you have multiple default exports in a module?
A: No.

**Q5:** How do you import everything from a module?
A: `import * as moduleName from './file.js';`

**Q6:** What are dynamic imports?
A: Importing modules at runtime using `import()`.

**Q7:** How does module caching work?
A: Modules are executed once and cached for future imports.

## 5. Classes

**Q1:** What are classes in JavaScript?
A: Syntactic sugar for creating objects and inheritance.

**Q2:** Provide an example of a class.
A: `class Person { constructor(name){ this.name=name }}`

**Q3:** What is inheritance in classes?
A: One class extends another to inherit properties/methods.

**Q4:** What is a constructor in a class?
A: A method to initialize class objects.

**Q5:** Explain the `super` keyword.
A: Calls parent class constructor or methods.

**Q6:** What are static methods in classes?
A: Methods callable on the class itself, not instances.

**Q7:** Can class properties be private? How?
A: Yes, using `#` prefix.

**Q8:** What is method overriding in JavaScript classes?
A: Redefining a parent class method in a child class.

## 6. Fetch API

**Q1:** What is Fetch API?
A: Modern API to make HTTP requests, returning a Promise.

**Q2:** Example of using fetch to get data.
A: `fetch(url).then(res => res.json()).then(data => console.log(data));`

**Q3:** How to use fetch with async/await?
A: `const data = await fetch(url).then(r => r.json());`

**Q4:** What is the difference between fetch and XMLHttpRequest?
A: Fetch uses Promises and modern syntax; XHR is older callback-based.

**Q5:** How can you handle errors in fetch?
A: Using `.catch()` or `try/catch` with async/await.

**Q6:** How do you send POST requests using fetch?
A: `fetch(url, { method:'POST', body: JSON.stringify(data) })`

**Q7:** How do you set headers in a fetch request?
A: Using `headers` option in the fetch config.

**Q8:** What is the difference between `response.json()` and `response.text()`?
A: `.json()` parses JSON; `.text()` returns raw string.
