---
title: 'Benchmarking'
short: Benchmarking demo with a simple gcd algorithm
topic: benchmarking
---

## Benchmark demo

```js
/*
JS SIMPLE BENCHMARKING - RUNNING IN WEB JS OR ON NODE SERVER
TEST WITH A SIMPLE IMPLEMENTATION OF EUCLIDEAN GCD ALGORITHM
*/

if (typeof window === 'undefined') {
	var { performance } = require('perf_hooks'); // in node
} else {
	// ================ /!\ Warning /!\ ================
	// reduced time precision (1ms) in Firefox 60
	// or with privacy.resistFingerprinting enabled
	var performance = window.performance; // in web browser
}

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const PASS = 10;
const ITER = 10000000;
const MAX = 1000000000;
const ROUND = 100;

const passes = [...Array(PASS).keys()].map((i) => {
	const arr = [...Array(ITER).keys()].map(() => Math.floor(Math.random() * (MAX - ROUND)) * ROUND);

	const start = performance.now();
	const c_gcd = arr.reduce((acc, val) => gcd(acc, val));
	const end = performance.now();

	const time = end - start;
	console.log(`${i + 1}/${PASS}: gcd = ${c_gcd} (${time}ms)`);

	return time;
});

const sum = passes.reduce((a, b) => a + b, 0);

console.log(`
==========================================
total duration: ${sum}ms
mean duration: ${sum / PASS}ms
max duration: ${Math.max(...passes)}ms
min duration: ${Math.min(...passes)}ms
mean gcd: ${sum / PASS / ITER}ms
==========================================
`);

/*
============ node v16.15.1 ============
1/10: gcd = 100 (396.6382689997554ms)
2/10: gcd = 100 (485.538164999336ms)
3/10: gcd = 100 (519.4448899999261ms)
4/10: gcd = 100 (495.69499099999666ms)
5/10: gcd = 100 (438.1148039996624ms)
6/10: gcd = 100 (423.10171699896455ms)
7/10: gcd = 100 (492.2839640006423ms)
8/10: gcd = 100 (425.25345399975777ms)
9/10: gcd = 100 (424.4618050009012ms)
10/10: gcd = 100 (425.43023999780416ms)
==========================================
total duration: 4525.9622989967465ms
mean duration: 452.59622989967465ms
max duration: 519.4448899999261ms
min duration: 396.6382689997554ms
mean gcd: 0.00004525962298996746ms
==========================================
*/
```
