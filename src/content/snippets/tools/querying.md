---
title: 'Querying'
short: Data management and querying
topic: datas querying structures
---

## Data management and querying

```js
// Simple unsafe hash function
const hash1 = (string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

// Simple really unsafe hash function
const hash2 = (string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = (1 + hash) * (1 - char);
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

// Simple really really unsafe hash function
const hash3 = (string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

// Simple string generator
const generator = (
	prob_next = 0.8,
	min_length = 15,
	max_length = 30,
	chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) => {
	let generated = '';
	for (let i = 0; i < max_length; i++) {
		generated += chars.charAt(Math.floor(Math.random() * chars.length));
		if (i > min_length && Math.random() > prob_next) {
			return generated;
		}
	}
	return generated;
};

const headers = ['GENERATED', 'HASHED_1', 'HASHED_2', 'HASHED_3'];
const body = [...new Array(10)].map(() => {
	const generated = generator();
	const hashed1 = hash1(generated);
	const hashed2 = hash2(generated);
	const hashed3 = hash3(generated);
	return [generated, hashed1, hashed2, hashed3];
});

const table = [headers, ...body].map(([generated, hashed1, hashed2, hashed3]) => {
	return (
		String(generated).padStart(31) +
		' | ' +
		String(hashed1).padStart(15) +
		' | ' +
		String(hashed2).padStart(15) +
		' | ' +
		String(hashed3).padStart(10)
	);
});

/*
[
  '                      GENERATED |        HASHED_1 |        HASHED_2 |   HASHED_3',
  '            EieujMIpIrPoSEYkEiu |     -1098783833 |        14233498 |       1777',
  '             0eqLMYR1wnCdJML7vP |      1592119963 |      -328881288 |       1511',
  '        3IbSEENIkQz9triAzGaBtvr |      -328345915 |      -323498078 |       2065',
  '              epHGHTDzwOsSpYlXL |      1369545395 |     -1830671313 |       1571',
  '              C2UHLxVY0fz1YUmFu |     -1566173822 |      1326778804 |       1436',
  '              gnK9E0ON9t58WlQoU |     -2017585275 |     -1447597194 |       1373',
  ' j09SZO1onGD4AzqlzTW26AptVMF235 |      1214518969 |      -877031634 |       2409',
  '            KXCqHvTs6dvqnog8Ixq |       530575551 |      1633577084 |       1803',
  '             fANepTBm6lmH8IsFDm |        71169439 |      -609237002 |       1551',
  '        DwqPjD3iSSwNPoakG9ARKVi |      -693201287 |       543544480 |       2009'
]
*/
console.log(table);

// https://en.wikipedia.org/wiki/Hash_table
class HashTable {
	constructor() {
		// For demonstration purposes, the size of the hashmap is
		// way lower than the availlable number of integer indexs
		// (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER).
		// => Frequent collisions are to be expected
		this.size = 10000;
		this.buckets = new Array(this.size).fill(undefined);
		this.hash = hash1;
	}

	_HashToIndex(hash) {
		// this mapping is really bad for most cases, but simple enough for now.
		return Math.abs(hash) % this.size;
	}

	set(key, value) {
		const hashed = this.hash(key);
		this.buckets[this._HashToIndex(hashed)] = value;
	}

	get(key) {
		const hashed = this.hash(key);
		return this.buckets[this._HashToIndex(hashed)];
	}

	has(key) {
		return this.get(key) !== undefined;
	}
}

// https://en.wikipedia.org/wiki/AVL_tree
class AVLTree {
	// TODO
}

// https://en.wikipedia.org/wiki/Bloom_filter
class BloomFilter {
	constructor() {
		this.size = 10000;
		this.buckets = new Array(this.size).fill(false);
		this.hashes = [hash1, hash2, hash3];
	}

	_HashToIndex(hash) {
		return Math.abs(hash) % this.size;
	}

	set(key) {
		this.hashes
			.map((hash) => hash(key))
			.forEach((hashed) => {
				this.buckets[this._HashToIndex(hashed)] = true;
			});
	}

	has(key) {
		return this.hashes
			.map((hash) => hash(key))
			.map((hashed) => this.buckets[this._HashToIndex(hashed)])
			.reduce((acc, val) => acc && val, true);
	}
}

const ht = new HashTable();
const bf = new BloomFilter();

const temp = generator(); // zDg6oVTK8dsRZ2HFSAVscri
ht.set(temp, temp);
console.log(ht.has(temp)); // true
console.log(ht.has('aaa')); // false

bf.set(temp);
console.log(bf.has(temp)); // true
console.log(bf.has('aaa')); // false
```
