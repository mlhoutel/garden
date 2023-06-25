---
title: 'System'
short: Gaussian elimination, Jacobi method and Gauss-Siedel
topic: maths system-solving
---

## Gaussian

```js
// https://en.wikipedia.org/wiki/Gaussian_elimination
// Gauss elimination (Direct method)
// 1. Triangulation of the square matrix A with b
// 2. Backward substitution to obtain the values of x

gauss = (A, b) => {
	[A, b] = triangulation(A, b);
	return subsitution(A, b);
};

// Transformation into a superior triangular matrix
triangulation = (A, b) => {
	const n = A.length;
	for (let k = 0; k < n - 1; k++) {
		if (Math.abs(A[k][k]) < 0.00001) {
			throw 'Triangulation is not possible with this matrix';
		}

		for (let i = k + 1; i < n; i++) {
			const m = A[i][k] / A[k][k];
			b[i] = b[i] - m * b[k];
			A[i][k] = 0;

			for (let j = k + 1; j < n; j++) {
				A[i][j] -= m * A[k][j];
			}
		}
	}

	return [A, b];
};

// Retrograde substitution
subsitution = (A, b) => {
	const n = A.length;
	let x = new Array(n).fill(0);

	for (let i = 0; i < n; i++) {
		const j = n - i - 1;
		x[j] = b[j];
		for (let k = j + 1; k < n; k++) {
			x[j] -= A[j][k] * x[k];
		}
		x[j] /= A[j][j];
	}

	return x;
};

const A = [
	[1, 1, 1],
	[1, 0.4, 0],
	[10, 5, 1]
];

const b = [24, 14, 152];

// [ 11.999999999999993, 5.000000000000013, 6.999999999999992 ]
console.log(gauss(A, b));

/*
A = [
    [ 1, 1, 1 ],
    [ 0, -0.6, -1 ],
    [ 0, 0, -0.6... ]
] 

b = [ 24, -10, -4.6... ]

x = [ 12.0, 5.0, 7.0 ]
*/
```

## Jacobi

```js
// https://en.wikipedia.org/wiki/Jacobi_method
// Jacobi method (Iterative method)
// We know that the method works if the diagonal of the matrix A is strictly dominant
// => Don't hesitate to tweak the matrix to reach this configuration

jacobi = (A, b, x0, epsilon) => {
	let diff = epsilon + 1;
	let x = x0; // initial value

	while (diff > epsilon) {
		const temp_x = x;
		x = iter(A, b, x);

		diff_x_temp = x.map((_, i) => x[i] - temp_x[i]);

		// https://en.wikipedia.org/wiki/Uniform_norm
		diff = Math.max(...diff_x_temp.map(Math.abs));
	}

	return x;
};

iter = (A, b, x) => {
	const n = A.length;
	let x1 = [...x]; // copy values

	for (let i = 0; i < n; i++) {
		x1[i] = b[i];
		for (let j = 0; j < n; j++) {
			if (j != i) {
				x1[i] -= A[i][j] * x[j];
			}
		}
		x1[i] /= A[i][i];
	}

	return x1;
};

// With strictly doinant diagonal
const A = [
	[4, -1, 0],
	[-1, 4, -1],
	[0, -1, 4]
];

const b = [6, 4, 6];

// [ 1.999969482421875, 1.999969482421875, 1.999969482421875 ]
console.log(jacobi(A, b, [1, 1, 1], 0.0001));

/*
A = [
    [4, -1, 0],
    [-1, 4, -1],
    [0, -1, 4]
] 

b = [6, 4, 6]

x = [ 2, 2, 2 ]
*/
```

## Siedel

```js
// https://en.wikipedia.org/wiki/Gauss%E2%80%93Seidel_method
//We know that the Gauss-Seidel method converges twice as fast as the Jacobi method
// if the matrix A is strictly dominant diagonal

siedel = (A, b, x0, epsilon) => {
	let diff = epsilon + 1;
	let x = x0; // initial value

	while (diff > epsilon) {
		const temp_x = x;
		x = iter(A, b, x);

		diff_x_temp = x.map((_, i) => x[i] - temp_x[i]);

		// https://en.wikipedia.org/wiki/Uniform_norm
		diff = Math.max(...diff_x_temp.map(Math.abs));
	}

	return x;
};

iter = (A, b, x) => {
	const n = A.length;
	let x1 = [...x]; // copy values

	for (let i = 0; i < n; i++) {
		x1[i] = b[i];
		for (let j = 0; j < n; j++) {
			if (j > i) {
				x1[i] -= A[i][j] * x[j];
			} else if (j < i) {
				x1[i] -= A[i][j] * x1[j];
			}
		}
		x1[i] /= A[i][i];
	}

	return x1;
};

// With strictly doinant diagonal
const A = [
	[1, 1, 1],
	[1, 0.4, 0],
	[10, 5, 1]
];

const b = [24, 14, 152];

// [ 12, 5, 7 ]
console.log(siedel(A, b, [1, 1, 1], 0.0001));

/*
A = [
    [1, 1, 1],
    [1, 0.4, 0],
    [10, 5, 1]
]

b = [24, 14, 152]

x = [ 12, 5, 7 ]
*/
```
