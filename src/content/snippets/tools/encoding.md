---
title: 'Encoding'
short: Object serialization
topic: js serialization encoding
---

## Encoding demo

```js
function encode(o) {
	if (Array.isArray(o)) {
		return `[${o.map((e) => encode(e)).join(', ')}]`;
	} else if (typeof o == 'string') {
		return `"${o}"`;
	} else if (typeof o == 'object') {
		return `{ ${Object.entries(o)
			.map(([k, v]) => `${k}: ${encode(v)}`)
			.join(', ')} }`;
	} else {
		return `${o.toString()}`;
	}
}

const instance = {
	test: 'a',
	testa: ['a'],
	sup: () => {
		console.log('hello from copy');
	}
};
console.log(encode(instance));
// { test: "a", testa: ["a"], sup: () => {} }

const encoded = btoa(escape(encode(instance)));
console.log(encoded);
// JTdCJTIwdGVzdCUzQSUyMCUyMmElMjIlMkMlMjB0ZXN0YSUzQSUyMCU1QiUyMmElMjIlNUQlMkMlMjBzdXAlM0ElMjAlMjglMjklMjAlM0QlM0UlMjAlN0IlN0QlMjAlN0Q=

eval('copy = ' + unescape(atob(encoded)));
console.log(copy);
// { test: 'a', testa: [ 'a' ], sup: [Function: sup] }

copy.sup();
// hello from copy
```
