---
title: 'Strategies'
short: Bruteforce, Prefixsum and 2-SAT problem
topic: maths solving
---

## Bruteforce

```js
// Say we have a problem where we want to test every combination
// for an array of object, with each object that can be in n states.

const N = 10; // The number of elements in our array
const S = 3; // The number of states in an element

// We know that we will have S^N possible combinations (the nb of
// array we want to generate).
const array = [...Array(Math.pow(S, N)).keys()];

// The best way of doing it (fast, light, clear) is to iterate over
// a number of N digits in the base of S. The status of the n-th
// object will be reflected in the value of the n-th digit.

const combinations = array.map((r) => {
	const based = r.toString(S); // convert to base
	const filler = '0'.repeat(N - based.length); // prepend with 0
	return filler + based; // assert length
});

// combinations = ['0000000000', '0000000001', '0000000002', '0000000010', '0000000011', ... , '2222222222']
console.log('combinations =', combinations);

const prepend = (e, ls) => ls.map((sl) => [e, ...sl]);

// prepend = [ [ 1, 2, 3 ], [ 1, 3, 4 ] ]
console.log(
	'prepend =',
	prepend(1, [
		[2, 3],
		[3, 4]
	])
);

const lists = (ls) => {
	if (!ls.length) return [[]];

	const [head, ...tail] = ls;
	const sublist = lists(tail);
	const appended = prepend(head, sublist);

	return [...sublist, ...appended];
};

// lists = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
console.log('lists =', lists([1, 2, 3]));

const inject = (e, ls) => {
	if (!ls.length) return [[e]];

	const [head, ...tail] = ls;
	const current = [e, ...ls];
	const following = prepend(head, inject(e, tail));

	return [current, ...following];
};

// inject = [ [ 1, 1, 2, 3 ], [ 1, 1, 2, 3 ], [ 1, 2, 1, 3 ], [ 1, 2, 3, 1 ] ]
console.log('inject =', inject(1, [1, 2, 3]));

const permuts = (ls) => {
	if (!ls.length) return [[]];

	const [head, ...tail] = ls;

	return permuts(tail)
		.map((sl) => inject(head, sl))
		.flat();
};

// permuts = [ [1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1] ]
console.log('permuts =', permuts([1, 2, 3]));

const arrangements = (ls) => lists(ls).reduce((acc, sl) => [...acc, ...permuts(sl)]);

// arrangements = [ [3], [ 2 ], [2, 3], [3, 2], [1], [1, 3], [3, 1], [1, 2], [2, 1], [1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1] ]
console.log('arrangements =', arrangements([1, 2, 3]));

const partitions = (ls) => {
	if (!ls.length) return [];
	if (ls.length === 2) return [[[ls[0]], [ls[1]]]];

	const [head, ...tail] = ls;

	const first = [[head], tail];
	const remain = partitions(tail).map(([ls, rs]) => [[head, ...ls], rs]);

	return [first, ...remain];
};

// partitions = [ [ [ 1 ], [ 2, 3 ] ], [ [ 1, 2 ], [ 3 ] ] ]
console.log('partitions =', partitions([1, 2, 3]));
```

## Prefixsum

```js
// Allow to compute the sum of a continuous range in an array of values
// in o(1) instead of o(n). Require a first step at o(n), so usefull if
// there is a lot of queries aftewards (and not only one).

const N = 10000; // number of elements
const Q = 1000; // number of queries

const array = [...Array(N)].map(() => Math.round(Math.random() * 100));
const queries = [...Array(Q)].map(() =>
	[Math.round(Math.random() * N), Math.round(Math.random() * N)].sort((a, b) => a - b)
);

// iterative search o(n^2)
const iterative = (array, queries) => {
	const results = Array(queries.length).fill(0);

	for (let i = 0; i < queries.length; i++) {
		const query = queries[i];

		for (let j = query[0]; j <= query[1]; j++) {
			results[i] += array[j];
		}
	}

	return results;
};

// prefixed search, o(n)
const prefixsum = (array, queries) => {
	const results = Array(queries.length).fill(0);
	const summed = Array(array.length).fill(0);

	summed[0] = array[0];
	for (let i = 1; i < summed.length; i++) {
		summed[i] = summed[i - 1] + array[i];
	}

	for (let i = 0; i < queries.length; i++) {
		const query = queries[i];

		const upper = summed[query[1]];
		const under = summed[query[0] - 1] ?? 0;
		results[i] = upper - under;
	}

	return results;
};

const iter = iterative(array, queries);
const pref = prefixsum(array, queries);

const same = iter.map((_, i) => iter[i] === pref[i]).reduce((acc, cur) => acc && cur);

console.log(same);
```

## 2-SAT

```js
// 2-SAT Problem
// - wikipedia: https://en.wikipedia.org/wiki/2-satisfiability
// - paper: https://www.sciencedirect.com/science/article/abs/pii/0020019079900024?via%3Dihub\
// - source: https://www.robindar.com/fr/blog/battledev-12-solutions
// An array of objects, each of which can take two possible values.

// ex: (x1 ∨ x2) ∧ (¬ x1 ∨ x3) ∧ (x2 ∨ x3) ∧ (x4 ∨ ¬ x1), xi ∈ [true, false]
// => does a combination of xi allow this formula to be true ?

// The 2-SAT formula can be converted to an implication graph
// (a ∨ b) <=> (¬a ⇒ b ∧ ¬b ⇒ a)

// 1. For each xi, we create a node Vx and V¬x
// 2. We then add an edge from a to b for each (a ⇒ b)
// 3. If there is a path from a to b, then a ⇒ b
// 4. We have to find values for the graph not to contain a (true ⇒ false)

// - (xi → ¬xi) and (¬xi → xi) then no solution
// - (xi → ¬xi) then xi is false
// - (¬xi → xi) then xi is true
// - propagate implications: (a → b) and a is true, then b is true

// To do this, we can decompose the graph in it's "strongly connected component"
// We can do this with the Tarjan algorithm

// Nonogram puzzle solver: https://en.wikipedia.org/wiki/Nonogram

// - https://en.wikipedia.org/wiki/2-satisfiability
// - https://en.wikipedia.org/wiki/Nonogram
```
