# JavaScript (ES6+) Interview Questions

## 1. Promises

**Q1:** What is a Promise in JavaScript?  
**A:** A Promise is an object representing the eventual completion or failure of an asynchronous operation.

**Q2:** Explain the states of a Promise.  
**A:** 
- `Pending` → Initial state.  
- `Fulfilled` → Operation completed successfully.  
- `Rejected` → Operation failed.  

**Q3:** How do you handle errors in Promises?  
**A:** Using `.catch()` method or `try/catch` inside `async/await`.

**Q4:** What is the difference between `Promise.all()` and `Promise.race()`?  
**A:** 
- `Promise.all()` → Waits for all Promises to resolve or any to reject.  
- `Promise.race()` → Resolves/rejects as soon as the first Promise settles.

---

## 2. Async/Await

**Q1:** What is async/await in JavaScript?  
**A:** `async` functions return a Promise. `await` pauses the execution until the Promise is resolved.

**Q2:** Can you use `await` outside an async function?  
**A:** No, `await` can only be used inside an `async` function (except in top-level in modules).

**Q3:** How do you handle errors with async/await?  
**A:** Using `try...catch` blocks.

---

## 3. Destructuring

**Q1:** What is destructuring in JavaScript?  
**A:** Destructuring is a syntax to extract values from arrays or objects into variables.

**Q2:** Provide an example of array destructuring.  
```javascript
const arr = [1, 2, 3];
const [a, b] = arr; // a = 1, b = 2
