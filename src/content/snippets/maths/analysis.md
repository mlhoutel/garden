---
title: "Analysis"
---

## Derivative

```js
TODO
```

## Factorial

```js
// factorial : https://en.wikipedia.org/wiki/Factorial
// binomial coefficient : https://en.wikipedia.org/wiki/Binomial_coefficient

factorial = (n) => n == 0 ? 1 : n * factorial(n-1)
binomial = (k, n) => {
    let a = 1
    let b = 1

    while (k > 0) {
        a *= (n - k+1)
        b *= k
        k--
    }
    
    return a / b
}

// !3 = 6
console.log("!3 =", factorial(3))

// !10 = 3628800
console.log("!10 =", factorial(10))

// (10 20) = 184756
console.log("(10 20) =", binomial(10, 20))

// (3 7) = 35
console.log("(3 7) =", binomial(3, 7))
```

## Modulo

```js
// Positive modulo : https://en.wikipedia.org/wiki/Modulo_operation
// For every input I and N, we want to assert that the result of the modulo is a positive number.

const I = -62
const N = 34

positive_modulo = (i, n) => (i % n + n) % n

// mod = -28
console.log("mod =", I % N)

// pos = 6
console.log("pos =", positive_modulo(I, N))
```

## PGCD


```js
// pgcd : https://en.wikipedia.org/wiki/Greatest_common_divisor
// ppcm : https://en.wikipedia.org/wiki/Least_common_multiple

pgcd = ((a, b) => (b === 0) ? a : pgcd(b, a % b))
ppcm = ((a, b) => (a * b) / pgcd(a, b))

// pgcd 25 10 = 5
console.log("pgcd 25 10 =", pgcd(25, 10))

// ppcm 25 10 = 50
console.log("ppcm 25 10 =", ppcm(25, 10))

// pgcd 25 30 10 15] = 5
console.log("pgcd 25 30 10 15] =", [25, 30, 10, 15].reduce((acc, val) => pgcd(acc, val)))

// ppcm 25 30 10 15 = 150
console.log("ppcm 25 30 10 15 =", [25, 30, 10, 15].reduce((acc, val) => ppcm(acc, val)))
```

## Power


```js
// Exponentiation : https://en.wikipedia.org/wiki/Exponentiation

const I = 12
const N = 7

div = (i, n) => Math.floor(i / n) // integer division

// O(n) power function
pow = (i, n) => n == 0 ? 1 : i * pow(i, n-1)

// O(log(n)) power function
pow_opt = (i, n, DIVIDER = 2) => {
    pow_rec = (i, n) => {
        if (n == 1) return i

        const remain = n % DIVIDER
        const mult = remain == 0 ? div(n, DIVIDER) : div((n - 1), DIVIDER)
        
        const rec = pow_opt(i, mult)
        let val = rec
        for (let x = 0; x < DIVIDER-1; x++) val *= rec
        for (let x = 0; x < remain; x++) val *= i
    
        return val
    }

    if (n == 0) return 1                // zero pow
    if (n > 0) return pow_rec(i, n)     // positive pow
    return div(1, pow_rec(i, -n))       // negative pow
}

// 12^7 = 35831808
console.log("12^7 =", pow(I, N))

// 12^7 (2) = 35831808
console.log("12^7 (2) =", pow_opt(I, N))

// 12^7 (3) = 35831808
console.log("12^7 (3) =", pow_opt(I, N, 3))

// 12^7 (4) = 35831808
console.log("12^7 (4) =", pow_opt(I, N, 4))
```

## Prime


```js
// Prime factors: https://simple.wikipedia.org/wiki/Prime_factorization
// Crible primes: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

factors = (n) => {
    let k = 2
    const primes = []
    while (k * k <= n) {
        if (n % k == 0) {
            primes.push(k)
            n /= k
        } else {
            k++
        }
    }

    if (n > 1) primes.push(n)

    return primes
}

crible = (max, number = 1000000) => {
    const primes = []

    if (max >= 2) primes.push(2)

    for (let p = 3; p <= max && primes.length < number; p += 2) {
        let prime = true

        for (let pp of primes) {
            if (p % pp == 0) {
                prime = false
                break
            }
        }

        if (prime) primes.push(p)
    }

    return primes
}

// factors 120 = [ 2, 2, 2, 3, 5 ]
console.log("factors 120 =", factors(120))

// crible 1000 = [ 2, 3, 5, 7, 11, 13, ...]
console.log("crible 1000 =", crible(1000))
```