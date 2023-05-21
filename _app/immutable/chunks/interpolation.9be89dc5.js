import{S as I,i as P,s as R,k,r as X,a as g,l as i,m as r,u as E,h as s,c as x,p as m,b as c,F as h,n as _}from"./index.7aa01268.js";function T(W){let t,l,w,f,p,q=`<code class="language-js"><span class="token comment">// https://en.wikipedia.org/wiki/Lagrange_polynomial</span>
<span class="token comment">// 1. We have a set of nodes through which the function must pass:  pn = (xn, yn)</span>
<span class="token comment">// 2. We obtain the basic equations of the polynomial:              P(xn) = yn</span>
<span class="token comment">// 3. We obtain the equations of the polynomial of degree n:        AX^3 + bX^2 + cX + d</span>
<span class="token comment">// 4. We replace X by X1, X2, ..., Xn and we obtain a system of equations</span>
<span class="token comment">// 5. We solve with one of the methods in the system folder</span>
<span class="token comment">// </span>
<span class="token comment">// Remark:</span>
<span class="token comment">// We know that for n nodes, there exists:</span>
<span class="token comment">// - an infinity of polynomials of degree n (or more)</span>
<span class="token comment">// - a unique polynomial of (degree n-1 or less)</span>

<span class="token function-variable function">lagrange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> <span class="token constant">X</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> x<span class="token punctuation">.</span>length
    <span class="token keyword">let</span> <span class="token constant">L</span> <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token constant">L</span> <span class="token operator">+=</span> <span class="token function">polynom</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token constant">X</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> <span class="token constant">L</span>
<span class="token punctuation">&#125;</span>

<span class="token function-variable function">polynom</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token constant">X</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> x<span class="token punctuation">.</span>length
    Li <span class="token operator">=</span> <span class="token number">1</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">!=</span> i<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            Li <span class="token operator">*=</span> <span class="token punctuation">(</span><span class="token constant">X</span> <span class="token operator">-</span> x<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">!=</span> i<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            Li <span class="token operator">/=</span> <span class="token punctuation">(</span>x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> x<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    Li <span class="token operator">*=</span> y<span class="token punctuation">[</span>i<span class="token punctuation">]</span>

    <span class="token keyword">return</span> Li
<span class="token punctuation">&#125;</span>


<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1.1</span><span class="token punctuation">,</span> <span class="token number">1.3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Interpolated function between 0 and 4 ="</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span>e <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token function">lagrange</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> e <span class="token operator">/</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">/*
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
*/</span></code>`,d,o,u,b,y,e,S=`<code class="language-js"><span class="token comment">// https://en.wikipedia.org/wiki/Spline_(mathematics)</span>

<span class="token constant">TODO</span></code>`;return{c(){t=k("h2"),l=k("a"),w=X("Lagrange"),f=g(),p=k("pre"),d=g(),o=k("h2"),u=k("a"),b=X("Splines"),y=g(),e=k("pre"),this.h()},l(n){t=i(n,"H2",{id:!0});var a=r(t);l=i(a,"A",{href:!0});var j=r(l);w=E(j,"Lagrange"),j.forEach(s),a.forEach(s),f=x(n),p=i(n,"PRE",{class:!0});var A=r(p);A.forEach(s),d=x(n),o=i(n,"H2",{id:!0});var L=r(o);u=i(L,"A",{href:!0});var v=r(u);b=E(v,"Splines"),v.forEach(s),L.forEach(s),y=x(n),e=i(n,"PRE",{class:!0});var H=r(e);H.forEach(s),this.h()},h(){m(l,"href","#lagrange"),m(t,"id","lagrange"),m(p,"class","language-js"),m(u,"href","#splines"),m(o,"id","splines"),m(e,"class","language-js")},m(n,a){c(n,t,a),h(t,l),h(l,w),c(n,f,a),c(n,p,a),p.innerHTML=q,c(n,d,a),c(n,o,a),h(o,u),h(u,b),c(n,y,a),c(n,e,a),e.innerHTML=S},p:_,i:_,o:_,d(n){n&&s(t),n&&s(f),n&&s(p),n&&s(d),n&&s(o),n&&s(y),n&&s(e)}}}const O={title:"Interpolation",short:"Lagrange polynomial and splines",topic:"maths interpolation"};class C extends I{constructor(t){super(),P(this,t,null,T,R,{})}}export{C as default,O as metadata};
