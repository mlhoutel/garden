import{S as g,i as b,s as _,k as u,r as E,a as H,l,m as k,u as S,h as o,c as A,p as i,b as r,F as m,n as h}from"./index.73c741f7.mjs";function v(f){let s,p,e,c,a,y=`<code class="language-js"><span class="token comment">// Simple unsafe hash function</span>
<span class="token keyword">const</span> <span class="token function-variable function">hash1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">let</span> hash <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> string<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">let</span> char <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		hash <span class="token operator">=</span> <span class="token punctuation">(</span>hash <span class="token operator">&lt;&lt;</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token operator">-</span> hash <span class="token operator">+</span> char<span class="token punctuation">;</span>
		hash <span class="token operator">=</span> hash <span class="token operator">&amp;</span> hash<span class="token punctuation">;</span> <span class="token comment">// Convert to 32bit integer</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">return</span> hash<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token comment">// Simple really unsafe hash function</span>
<span class="token keyword">const</span> <span class="token function-variable function">hash2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">let</span> hash <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> string<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">let</span> char <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		hash <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">+</span> hash<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> char<span class="token punctuation">)</span><span class="token punctuation">;</span>
		hash <span class="token operator">=</span> hash <span class="token operator">&amp;</span> hash<span class="token punctuation">;</span> <span class="token comment">// Convert to 32bit integer</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">return</span> hash<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token comment">// Simple really really unsafe hash function</span>
<span class="token keyword">const</span> <span class="token function-variable function">hash3</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">let</span> hash <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> string<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">let</span> char <span class="token operator">=</span> string<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		hash <span class="token operator">=</span> hash <span class="token operator">+</span> char<span class="token punctuation">;</span>
		hash <span class="token operator">=</span> hash <span class="token operator">&amp;</span> hash<span class="token punctuation">;</span> <span class="token comment">// Convert to 32bit integer</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">return</span> hash<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token comment">// Simple string generator</span>
<span class="token keyword">const</span> generator <span class="token operator">=</span> <span class="token punctuation">(</span>
	prob_next <span class="token operator">=</span> <span class="token number">0.8</span><span class="token punctuation">,</span>
	min_length <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">,</span>
	max_length <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">,</span>
	chars <span class="token operator">=</span> <span class="token string">'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'</span>
<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">let</span> generated <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> max_length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		generated <span class="token operator">+=</span> chars<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> min_length <span class="token operator">&amp;&amp;</span> Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> prob_next<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
			<span class="token keyword">return</span> generated<span class="token punctuation">;</span>
		<span class="token punctuation">&#125;</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">return</span> generated<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> headers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'GENERATED'</span><span class="token punctuation">,</span> <span class="token string">'HASHED_1'</span><span class="token punctuation">,</span> <span class="token string">'HASHED_2'</span><span class="token punctuation">,</span> <span class="token string">'HASHED_3'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> body <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">const</span> generated <span class="token operator">=</span> <span class="token function">generator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> hashed1 <span class="token operator">=</span> <span class="token function">hash1</span><span class="token punctuation">(</span>generated<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> hashed2 <span class="token operator">=</span> <span class="token function">hash2</span><span class="token punctuation">(</span>generated<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> hashed3 <span class="token operator">=</span> <span class="token function">hash3</span><span class="token punctuation">(</span>generated<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token punctuation">[</span>generated<span class="token punctuation">,</span> hashed1<span class="token punctuation">,</span> hashed2<span class="token punctuation">,</span> hashed3<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> table <span class="token operator">=</span> <span class="token punctuation">[</span>headers<span class="token punctuation">,</span> <span class="token operator">...</span>body<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>generated<span class="token punctuation">,</span> hashed1<span class="token punctuation">,</span> hashed2<span class="token punctuation">,</span> hashed3<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>
		<span class="token function">String</span><span class="token punctuation">(</span>generated<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">31</span><span class="token punctuation">)</span> <span class="token operator">+</span>
		<span class="token string">' | '</span> <span class="token operator">+</span>
		<span class="token function">String</span><span class="token punctuation">(</span>hashed1<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span> <span class="token operator">+</span>
		<span class="token string">' | '</span> <span class="token operator">+</span>
		<span class="token function">String</span><span class="token punctuation">(</span>hashed2<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span> <span class="token operator">+</span>
		<span class="token string">' | '</span> <span class="token operator">+</span>
		<span class="token function">String</span><span class="token punctuation">(</span>hashed3<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">padStart</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*
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
*/</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>table<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// https://en.wikipedia.org/wiki/Hash_table</span>
<span class="token keyword">class</span> <span class="token class-name">HashTable</span> <span class="token punctuation">&#123;</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token comment">// For demonstration purposes, the size of the hashmap is</span>
		<span class="token comment">// way lower than the availlable number of integer indexs</span>
		<span class="token comment">// (Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER).</span>
		<span class="token comment">// => Frequent collisions are to be expected</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>buckets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>hash <span class="token operator">=</span> hash1<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">_HashToIndex</span><span class="token punctuation">(</span><span class="token parameter">hash</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token comment">// this mapping is really bad for most cases, but simple enough for now.</span>
		<span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">const</span> hashed <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>buckets<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_HashToIndex</span><span class="token punctuation">(</span>hashed<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">const</span> hashed <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>buckets<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_HashToIndex</span><span class="token punctuation">(</span>hashed<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// https://en.wikipedia.org/wiki/AVL_tree</span>
<span class="token keyword">class</span> <span class="token class-name">AVLTree</span> <span class="token punctuation">&#123;</span>
	<span class="token comment">// TODO</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// https://en.wikipedia.org/wiki/Bloom_filter</span>
<span class="token keyword">class</span> <span class="token class-name">BloomFilter</span> <span class="token punctuation">&#123;</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>buckets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>hashes <span class="token operator">=</span> <span class="token punctuation">[</span>hash1<span class="token punctuation">,</span> hash2<span class="token punctuation">,</span> hash3<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">_HashToIndex</span><span class="token punctuation">(</span><span class="token parameter">hash</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>hashes
			<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hash</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hashed</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>buckets<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_HashToIndex</span><span class="token punctuation">(</span>hashed<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
			<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>

	<span class="token function">has</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashes
			<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hash</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">hashed</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>buckets<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_HashToIndex</span><span class="token punctuation">(</span>hashed<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
			<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> acc <span class="token operator">&amp;&amp;</span> val<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> ht <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BloomFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> temp <span class="token operator">=</span> <span class="token function">generator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// zDg6oVTK8dsRZ2HFSAVscri</span>
ht<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ht<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ht<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">'aaa'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

bf<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bf<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bf<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">'aaa'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></code>`;return{c(){s=u("h2"),p=u("a"),e=E("Data management and querying"),c=H(),a=u("pre"),this.h()},l(n){s=l(n,"H2",{id:!0});var t=k(s);p=l(t,"A",{href:!0});var d=k(p);e=S(d,"Data management and querying"),d.forEach(o),t.forEach(o),c=A(n),a=l(n,"PRE",{class:!0});var w=k(a);w.forEach(o),this.h()},h(){i(p,"href","#data-management-and-querying"),i(s,"id","data-management-and-querying"),i(a,"class","language-js")},m(n,t){r(n,s,t),m(s,p),m(p,e),r(n,c,t),r(n,a,t),a.innerHTML=y},p:h,i:h,o:h,d(n){n&&o(s),n&&o(c),n&&o(a)}}}const x={title:"Querying",short:"Data management and querying",topic:"datas querying structures"};class D extends g{constructor(s){super(),b(this,s,null,v,_,{})}}export{D as default,x as metadata};
