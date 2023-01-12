---
title: "Functions"
short: Dichotomy, Fixpoint method and Gradients
topic: maths functions-solving
---

## Dichotomy

```js
// Dichotomic search: https://en.wikipedia.org/wiki/Dichotomic_search

dichotomy = (fn, target, start = 0, end = 10000, delta = 1) => {
    while (start + delta < end) {
        const center = (start + end) / 2
        if (fn(center) > target) {
            end = center
        } else {
            start = center
        }
    }

    return start
}

// log(x) = 6.21516781 <=> x = 500.166015625
console.log("log(x) = 6.21516781 <=> x =", dichotomy(Math.log, 6.21516781, 10, 1000))

// sin(x) = 45 <=> x = 0.7853981633974483
console.log("sin(x) = 45 <=> x =", dichotomy(Math.sin, 45, 0, Math.PI / 2))

// exp(x) = 7.38905609893065 <=> x = 1.9999999995343387
console.log("exp(x) = 7.38905609893065 <=> x =", dichotomy((x) => Math.exp(x), 7.38905609893065, 0, 10, 0.000000001))
```

## Fixpoint

```js
// Fixpoint : https://en.wikipedia.org/wiki/Fixed-point_iteration

fixpoint = (fn, start, delta) => {
    const MAX_ITER = 10 // max number or iteration before stopping

    iter = (fx, value, delta, c = 0) => {
        if (c > MAX_ITER) throw `Method doesn't converges with the start at ${start} in the allowed duration (${MAX_ITER} iters)`

        const next = fx(value)

        if (Math.abs(value - next) < delta) return value

        return iter(fx, next, delta, c + 1)
    }

    fx = (x) => x + fn(x)

    return iter(fx, fx(start), delta)
}

// sin(x) = 0 <=> x = 3.1415926520823465
console.log("sin(x) = 0 <=> x =", fixpoint(Math.sin, 2, 0.0001))

// cos(x) = 0 <=> x = 1.5707963255168476
console.log("cos(x) = 0 <=> x =", fixpoint(Math.cos, -1, 0.0001))
```

## Gradient

```js
derivative = (fn, x, delta) => (fn(x + delta) - fx(x)) / delta

taylor = (fn, x, delta) => (fn(x + delta) - fx(x - delta)) / (2 * delta)
```