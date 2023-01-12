import{S as z,i as F,s as K,k as o,q as G,a as x,l as c,m as e,r as M,h as s,c as y,n as u,b as p,E as w,B as H}from"./index-ed2ae908.js";function N(L){let t,b,g,h,l,P=`<code class="language-js"><span class="token comment">// https://en.wikipedia.org/wiki/Gaussian_elimination</span>
<span class="token comment">// Gauss elimination (Direct method)</span>
<span class="token comment">// 1. Triangulation of the square matrix A with b</span>
<span class="token comment">// 2. Backward substitution to obtain the values of x</span>

<span class="token function-variable function">gauss</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token punctuation">[</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">triangulation</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">subsitution</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Transformation into a superior triangular matrix</span>
<span class="token function-variable function">triangulation</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">.</span>length
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.00001</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">throw</span> <span class="token string">"Triangulation is not possible with this matrix"</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> m <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">/</span> <span class="token constant">A</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span>
            b<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> m <span class="token operator">*</span> b<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
            <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>

            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> k <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">-=</span> m <span class="token operator">*</span> <span class="token constant">A</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// Retrograde substitution</span>
<span class="token function-variable function">subsitution</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">.</span>length
    <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> j <span class="token operator">=</span> n <span class="token operator">-</span> i <span class="token operator">-</span> <span class="token number">1</span>
        x<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> k <span class="token operator">=</span> j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            x<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">-=</span> <span class="token constant">A</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">*</span> x<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
        <span class="token punctuation">&#125;</span>
        x<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">/=</span> <span class="token constant">A</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> x
<span class="token punctuation">&#125;</span>


<span class="token keyword">const</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">152</span><span class="token punctuation">]</span>

<span class="token comment">// [ 11.999999999999993, 5.000000000000013, 6.999999999999992 ]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">gauss</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">/*
A = [
    [ 1, 1, 1 ],
    [ 0, -0.6, -1 ],
    [ 0, 0, -0.6... ]
] 

b = [ 24, -10, -4.6... ]

x = [ 12.0, 5.0, 7.0 ]
*/</span></code>`,A,k,d,E,j,i,B=`<code class="language-js"><span class="token comment">// https://en.wikipedia.org/wiki/Jacobi_method</span>
<span class="token comment">// Jacobi method (Iterative method)</span>
<span class="token comment">// We know that the method works if the diagonal of the matrix A is strictly dominant</span>
<span class="token comment">// => Don't hesitate to tweak the matrix to reach this configuration</span>

<span class="token function-variable function">jacobi</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x0<span class="token punctuation">,</span> epsilon</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">let</span> diff <span class="token operator">=</span> epsilon <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> x0 <span class="token comment">// initial value</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>diff <span class="token operator">></span> epsilon<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> temp_x <span class="token operator">=</span> x
        x <span class="token operator">=</span> <span class="token function">iter</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

        diff_x_temp <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> temp_x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token comment">// https://en.wikipedia.org/wiki/Uniform_norm</span>
        diff <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>diff_x_temp<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span>abs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> x
<span class="token punctuation">&#125;</span>

<span class="token function-variable function">iter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">.</span>length
    <span class="token keyword">let</span> x1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>x<span class="token punctuation">]</span> <span class="token comment">// copy values</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">!=</span> i<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">*</span> x<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">/=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> x1
<span class="token punctuation">&#125;</span>

<span class="token comment">// With strictly doinant diagonal</span>
<span class="token keyword">const</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span>

<span class="token comment">// [ 1.999969482421875, 1.999969482421875, 1.999969482421875 ]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">jacobi</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0.0001</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">/*
A = [
    [4, -1, 0],
    [-1, 4, -1],
    [0, -1, 4]
] 

b = [6, 4, 6]

x = [ 2, 2, 2 ]
*/</span></code>`,_,r,f,S,v,m,D=`<code class="language-js"><span class="token comment">// https://en.wikipedia.org/wiki/Gauss%E2%80%93Seidel_method</span>
<span class="token comment">//We know that the Gauss-Seidel method converges twice as fast as the Jacobi method</span>
<span class="token comment">// if the matrix A is strictly dominant diagonal</span>

<span class="token function-variable function">siedel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x0<span class="token punctuation">,</span> epsilon</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">let</span> diff <span class="token operator">=</span> epsilon <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">let</span> x <span class="token operator">=</span> x0 <span class="token comment">// initial value</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>diff <span class="token operator">></span> epsilon<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> temp_x <span class="token operator">=</span> x
        x <span class="token operator">=</span> <span class="token function">iter</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x<span class="token punctuation">)</span>

        diff_x_temp <span class="token operator">=</span> x<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> temp_x<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token comment">// https://en.wikipedia.org/wiki/Uniform_norm</span>
        diff <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>diff_x_temp<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span>abs<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> x
<span class="token punctuation">&#125;</span>

<span class="token function-variable function">iter</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> x</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token constant">A</span><span class="token punctuation">.</span>length
    <span class="token keyword">let</span> x1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>x<span class="token punctuation">]</span> <span class="token comment">// copy values</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> b<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">></span> i<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">*</span> x<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> i<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">*</span> x1<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        x1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">/=</span> <span class="token constant">A</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> x1
<span class="token punctuation">&#125;</span>

<span class="token comment">// With strictly doinant diagonal</span>
<span class="token keyword">const</span> <span class="token constant">A</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0.4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">]</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">24</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">152</span><span class="token punctuation">]</span>

<span class="token comment">// [ 12, 5, 7 ]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">siedel</span><span class="token punctuation">(</span><span class="token constant">A</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0.0001</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">/*
A = [
    [1, 1, 1],
    [1, 0.4, 0],
    [10, 5, 1]
]

b = [24, 14, 152]

x = [ 12, 5, 7 ]
*/</span></code>`;return{c(){t=o("h2"),b=o("a"),g=G("Gaussian"),h=x(),l=o("pre"),A=x(),k=o("h2"),d=o("a"),E=G("Jacobi"),j=x(),i=o("pre"),_=x(),r=o("h2"),f=o("a"),S=G("Siedel"),v=x(),m=o("pre"),this.h()},l(n){t=c(n,"H2",{id:!0});var a=e(t);b=c(a,"A",{href:!0});var J=e(b);g=M(J,"Gaussian"),J.forEach(s),a.forEach(s),h=y(n),l=c(n,"PRE",{class:!0});var U=e(l);U.forEach(s),A=y(n),k=c(n,"H2",{id:!0});var T=e(k);d=c(T,"A",{href:!0});var R=e(d);E=M(R,"Jacobi"),R.forEach(s),T.forEach(s),j=y(n),i=c(n,"PRE",{class:!0});var C=e(i);C.forEach(s),_=y(n),r=c(n,"H2",{id:!0});var W=e(r);f=c(W,"A",{href:!0});var q=e(f);S=M(q,"Siedel"),q.forEach(s),W.forEach(s),v=y(n),m=c(n,"PRE",{class:!0});var I=e(m);I.forEach(s),this.h()},h(){u(b,"href","#gaussian"),u(t,"id","gaussian"),u(l,"class","language-js"),u(d,"href","#jacobi"),u(k,"id","jacobi"),u(i,"class","language-js"),u(f,"href","#siedel"),u(r,"id","siedel"),u(m,"class","language-js")},m(n,a){p(n,t,a),w(t,b),w(b,g),p(n,h,a),p(n,l,a),l.innerHTML=P,p(n,A,a),p(n,k,a),w(k,d),w(d,E),p(n,j,a),p(n,i,a),i.innerHTML=B,p(n,_,a),p(n,r,a),w(r,f),w(f,S),p(n,v,a),p(n,m,a),m.innerHTML=D},p:H,i:H,o:H,d(n){n&&s(t),n&&s(h),n&&s(l),n&&s(A),n&&s(k),n&&s(j),n&&s(i),n&&s(_),n&&s(r),n&&s(v),n&&s(m)}}}const Q={title:"System",short:"Gaussian elimination, Jacobi method and Gauss-Siedel",topic:"maths system-solving"};class V extends z{constructor(t){super(),F(this,t,null,N,K,{})}}export{V as default,Q as metadata};
