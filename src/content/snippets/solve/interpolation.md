---
title: "Interpolation"
---

## Lagrange

```js
// https://en.wikipedia.org/wiki/Lagrange_polynomial
// 1. We have a set of nodes through which the function must pass:  pn = (xn, yn)
// 2. We obtain the basic equations of the polynomial:              P(xn) = yn
// 3. We obtain the equations of the polynomial of degree n:        AX^3 + bX^2 + cX + d
// 4. We replace X by X1, X2, ..., Xn and we obtain a system of equations
// 5. We solve with one of the methods in the system folder
// 
// Remark:
// We know that for n nodes, there exists:
// - an infinity of polynomials of degree n (or more)
// - a unique polynomial of (degree n-1 or less)

lagrange = (x, y, X) => {
    const n = x.length
    let L = 0

    for (let i = 0; i < n; i++) {
        L += polynom(x, y, i, X)
    }

    return L
}

polynom = (x, y, i, X) => {
    const n = x.length
    Li = 1

    for (let j = 0; j < n; j++) {
        if (j != i) {
            Li *= (X - x[j])
        }
    }

    for (let j = 0; j < n; j++) {
        if (j != i) {
            Li /= (x[i] - x[j])
        }
    }

    Li *= y[i]

    return Li
}


const x = [0, 1, 2, 3];
const y = [1, 1.1, 1.3, 4];

console.log("Interpolated function between 0 and 4 =", [...new Array(40).keys()].map((e) => [e / 10, lagrange(x, y, e / 10)]))

/*
Interpolated function between 0 and 4 = [
    [0, 1],
    [0.1, 1.0738999999999999],
    [0.2, 1.1271999999999998],
    [0.3, 1.1623],
    [0.4, 1.1816000000000002],
    [0.5, 1.1875],
    [0.6, 1.1824],
    [0.7, 1.1686999999999999],
    [0.8, 1.1488000000000003],
    [0.9, 1.1251000000000004],
    [1, 1.1],
    [1.1, 1.0759],
    [1.2, 1.0552],
    [1.3, 1.0403000000000002],
    [1.4, 1.0336],
    [1.5, 1.0375],
    [1.6, 1.0544],
    [1.7, 1.0867],
    [1.8, 1.1368000000000003],
    [1.9, 1.2070999999999998],
    [2, 1.3],
    [2.1, 1.4179000000000004],
    [2.2, 1.5632000000000001],
    [2.3, 1.7382999999999997],
    [2.4, 1.9455999999999998],
    [2.5, 2.1875],
    [2.6, 2.4664],
    [2.7, 2.7847000000000004],
    [2.8, 3.144799999999999],
    [2.9, 3.5490999999999997],
    [3, 4],
    [3.1, 4.4999],
    [3.2, 5.051200000000001],
    [3.3, 5.656299999999999],
    [3.4, 6.3176],
    [3.5, 7.0375],
    [3.6, 7.818400000000001],
    [3.7, 8.662700000000001],
    [3.8, 9.5728],
    [3.9, 10.5511]
]
*/
```

## Splines

```js
// https://en.wikipedia.org/wiki/Spline_(mathematics)

TODO
```