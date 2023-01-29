import{S as y,i as b,s as E,k as u,q as S,a as A,l,m as i,r as _,h as o,c as N,n as k,b as r,E as g,B as m}from"./index-46686b93.js";function I(f){let s,t,e,c,a,h=`<code class="language-js"><span class="token comment">/*
JS SIMPLE BENCHMARKING - RUNNING IN WEB JS OR ON NODE SERVER
TEST WITH A SIMPLE IMPLEMENTATION OF EUCLIDEAN GCD ALGORITHM
*/</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">===</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">var</span> <span class="token punctuation">&#123;</span> performance <span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'perf_hooks'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// in node</span>
<span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// ================ /! Warning /! ================</span>
    <span class="token comment">// reduced time precision (1ms) in Firefox 60</span>
    <span class="token comment">// or with privacy.resistFingerprinting enabled</span>
    <span class="token keyword">var</span> performance <span class="token operator">=</span> window<span class="token punctuation">.</span>performance<span class="token punctuation">;</span> <span class="token comment">// in web browser</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> gcd <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>b <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">?</span> a <span class="token operator">:</span> <span class="token function">gcd</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> a <span class="token operator">%</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">PASS</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">ITER</span> <span class="token operator">=</span> <span class="token number">10000000</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">MAX</span> <span class="token operator">=</span> <span class="token number">1000000000</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token constant">ROUND</span> <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> passes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token constant">PASS</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token constant">ITER</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token constant">MAX</span> <span class="token operator">-</span> <span class="token constant">ROUND</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token constant">ROUND</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> start <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> c_gcd <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">gcd</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> end <span class="token operator">=</span> performance<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> time <span class="token operator">=</span> end <span class="token operator">-</span> start<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token constant">PASS</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">: gcd = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>c_gcd<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>time<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms)</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> time<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> sum <span class="token operator">=</span> passes<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
==========================================
total duration: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>sum<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms
mean duration: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>sum <span class="token operator">/</span> <span class="token constant">PASS</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms
max duration: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>passes<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms
min duration: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token operator">...</span>passes<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms
mean gcd: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token punctuation">(</span>sum <span class="token operator">/</span> <span class="token constant">PASS</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token constant">ITER</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">ms
==========================================
</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/*
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
*/</span></code>`;return{c(){s=u("h2"),t=u("a"),e=S("Benchmark demo"),c=A(),a=u("pre"),this.h()},l(n){s=l(n,"H2",{id:!0});var p=i(s);t=l(p,"A",{href:!0});var d=i(t);e=_(d,"Benchmark demo"),d.forEach(o),p.forEach(o),c=N(n),a=l(n,"PRE",{class:!0});var w=i(a);w.forEach(o),this.h()},h(){k(t,"href","#benchmark-demo"),k(s,"id","benchmark-demo"),k(a,"class","language-js")},m(n,p){r(n,s,p),g(s,t),g(t,e),r(n,c,p),r(n,a,p),a.innerHTML=h},p:m,i:m,o:m,d(n){n&&o(s),n&&o(c),n&&o(a)}}}const R={title:"Benchmarking",short:"Benchmarking demo with a simple gcd algorithm",topic:"benchmarking"};class v extends y{constructor(s){super(),b(this,s,null,I,E,{})}}export{v as default,R as metadata};