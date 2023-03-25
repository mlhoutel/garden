import{S as Rn,i as Ln,s as Nn,k as t,r as R,a as l,l as o,m as e,u as L,h as s,c as u,p as c,b as p,F as k,n as nn}from"./index.73c741f7.mjs";function Bn(mn){let i,h,Q,N,r,g,U,B,m,fn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>application<span class="token punctuation">.</span></span><span class="token class-name">Application</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>stage<span class="token punctuation">.</span></span><span class="token class-name">Stage</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span></span><span class="token class-name">Scene</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">BorderPane</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>control<span class="token punctuation">.</span></span><span class="token class-name">Button</span></span><span class="token punctuation">;</span>

<span class="token comment">/*
Structure: Stage > Scene > Nodes
*/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyApplication</span> <span class="token keyword">extends</span> <span class="token class-name">Application</span> <span class="token punctuation">&#123;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token class-name">Stage</span> stage<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		stage<span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">"Application Title"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		stage<span class="token punctuation">.</span><span class="token function">setScene</span><span class="token punctuation">(</span><span class="token function">createScene</span><span class="token punctuation">(</span>stage<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		stage<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">public</span> <span class="token class-name">Scene</span> <span class="token function">createScene</span><span class="token punctuation">(</span><span class="token class-name">Stage</span> stage<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token class-name">BorderPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BorderPane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Button</span> button <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string">"Button Label"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		root<span class="token punctuation">.</span><span class="token function">setCenter</span><span class="token punctuation">(</span>button<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Scene</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
		<span class="token function">launch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`,M,f,H,W,F,d,T,X,O,v,S,Y,V,w,dn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">Hbox</span></span><span class="token punctuation">;</span>

<span class="token class-name">Hbox</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,J,y,vn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">Vbox</span></span><span class="token punctuation">;</span>

<span class="token class-name">Vbox</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,G,_,wn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">FlowPane</span></span><span class="token punctuation">;</span>

<span class="token class-name">FlowPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FlowPane</span><span class="token punctuation">(</span><span class="token class-name">Orientation</span><span class="token punctuation">.</span><span class="token constant">HORIZONTAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setRowValignment</span><span class="token punctuation">(</span><span class="token class-name">VPos</span><span class="token punctuation">.</span><span class="token constant">TOP</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setColumnHalignment</span><span class="token punctuation">(</span><span class="token class-name">HPos</span><span class="token punctuation">.</span><span class="token constant">CENTER</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,I,P,yn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">TilePane</span></span><span class="token punctuation">;</span>

<span class="token class-name">TilePane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TilePane</span><span class="token punctuation">(</span><span class="token class-name">Orientation</span><span class="token punctuation">.</span><span class="token constant">HORIZONTAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,Z,j,_n=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">GridPane</span></span><span class="token punctuation">;</span>

<span class="token class-name">GridPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GridPane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">addRow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">/* Node, Node,... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">addColumn</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token comment">/* Node, Node,... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,q,E,Pn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">AnchorPane</span></span><span class="token punctuation">;</span>

<span class="token class-name">AnchorPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnchorPane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setTopAnchor</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">40.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setRightAnchor</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setBottomAnchor</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setLeftAnchor</span><span class="token punctuation">(</span><span class="token comment">/* Node */</span><span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,z,b,jn=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">StackPane</span></span><span class="token punctuation">;</span>

<span class="token class-name">StackPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StackPane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">getChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,D,x,En=`<code class="language-java"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javafx<span class="token punctuation">.</span>scene<span class="token punctuation">.</span>layout<span class="token punctuation">.</span></span><span class="token class-name">BorderPane</span></span><span class="token punctuation">;</span>

<span class="token class-name">BorderPane</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BorderPane</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setTop</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setBottom</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setLeft</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setRight</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">setCenter</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`,K,A,C,$;return{c(){i=t("h2"),h=t("a"),Q=R("JavaFx"),N=l(),r=t("h3"),g=t("a"),U=R("First Program"),B=l(),m=t("pre"),M=l(),f=t("h3"),H=t("a"),W=R("PAC"),F=l(),d=t("h3"),T=t("a"),X=R("Elements"),O=l(),v=t("h4"),S=t("a"),Y=R("Agencement"),V=l(),w=t("pre"),J=l(),y=t("pre"),G=l(),_=t("pre"),I=l(),P=t("pre"),Z=l(),j=t("pre"),q=l(),E=t("pre"),z=l(),b=t("pre"),D=l(),x=t("pre"),K=l(),A=t("h4"),C=t("a"),$=R("Components"),this.h()},l(n){i=o(n,"H2",{id:!0});var a=e(i);h=o(a,"A",{href:!0});var sn=e(h);Q=L(sn,"JavaFx"),sn.forEach(s),a.forEach(s),N=u(n),r=o(n,"H3",{id:!0});var an=e(r);g=o(an,"A",{href:!0});var pn=e(g);U=L(pn,"First Program"),pn.forEach(s),an.forEach(s),B=u(n),m=o(n,"PRE",{class:!0});var bn=e(m);bn.forEach(s),M=u(n),f=o(n,"H3",{id:!0});var tn=e(f);H=o(tn,"A",{href:!0});var on=e(H);W=L(on,"PAC"),on.forEach(s),tn.forEach(s),F=u(n),d=o(n,"H3",{id:!0});var en=e(d);T=o(en,"A",{href:!0});var cn=e(T);X=L(cn,"Elements"),cn.forEach(s),en.forEach(s),O=u(n),v=o(n,"H4",{id:!0});var ln=e(v);S=o(ln,"A",{href:!0});var un=e(S);Y=L(un,"Agencement"),un.forEach(s),ln.forEach(s),V=u(n),w=o(n,"PRE",{class:!0});var xn=e(w);xn.forEach(s),J=u(n),y=o(n,"PRE",{class:!0});var An=e(y);An.forEach(s),G=u(n),_=o(n,"PRE",{class:!0});var hn=e(_);hn.forEach(s),I=u(n),P=o(n,"PRE",{class:!0});var gn=e(P);gn.forEach(s),Z=u(n),j=o(n,"PRE",{class:!0});var Hn=e(j);Hn.forEach(s),q=u(n),E=o(n,"PRE",{class:!0});var Tn=e(E);Tn.forEach(s),z=u(n),b=o(n,"PRE",{class:!0});var Sn=e(b);Sn.forEach(s),D=u(n),x=o(n,"PRE",{class:!0});var Cn=e(x);Cn.forEach(s),K=u(n),A=o(n,"H4",{id:!0});var kn=e(A);C=o(kn,"A",{href:!0});var rn=e(C);$=L(rn,"Components"),rn.forEach(s),kn.forEach(s),this.h()},h(){c(h,"href","#javafx"),c(i,"id","javafx"),c(g,"href","#first-program"),c(r,"id","first-program"),c(m,"class","language-java"),c(H,"href","#pac"),c(f,"id","pac"),c(T,"href","#elements"),c(d,"id","elements"),c(S,"href","#agencement"),c(v,"id","agencement"),c(w,"class","language-java"),c(y,"class","language-java"),c(_,"class","language-java"),c(P,"class","language-java"),c(j,"class","language-java"),c(E,"class","language-java"),c(b,"class","language-java"),c(x,"class","language-java"),c(C,"href","#components"),c(A,"id","components")},m(n,a){p(n,i,a),k(i,h),k(h,Q),p(n,N,a),p(n,r,a),k(r,g),k(g,U),p(n,B,a),p(n,m,a),m.innerHTML=fn,p(n,M,a),p(n,f,a),k(f,H),k(H,W),p(n,F,a),p(n,d,a),k(d,T),k(T,X),p(n,O,a),p(n,v,a),k(v,S),k(S,Y),p(n,V,a),p(n,w,a),w.innerHTML=dn,p(n,J,a),p(n,y,a),y.innerHTML=vn,p(n,G,a),p(n,_,a),_.innerHTML=wn,p(n,I,a),p(n,P,a),P.innerHTML=yn,p(n,Z,a),p(n,j,a),j.innerHTML=_n,p(n,q,a),p(n,E,a),E.innerHTML=Pn,p(n,z,a),p(n,b,a),b.innerHTML=jn,p(n,D,a),p(n,x,a),x.innerHTML=En,p(n,K,a),p(n,A,a),k(A,C),k(C,$)},p:nn,i:nn,o:nn,d(n){n&&s(i),n&&s(N),n&&s(r),n&&s(B),n&&s(m),n&&s(M),n&&s(f),n&&s(F),n&&s(d),n&&s(O),n&&s(v),n&&s(V),n&&s(w),n&&s(J),n&&s(y),n&&s(G),n&&s(_),n&&s(I),n&&s(P),n&&s(Z),n&&s(j),n&&s(q),n&&s(E),n&&s(z),n&&s(b),n&&s(D),n&&s(x),n&&s(K),n&&s(A)}}}const Fn={title:"Java",short:"general-purpose object-oriented programming language, write once, run anywhere",topic:"programming-language compiled"};class On extends Rn{constructor(i){super(),Ln(this,i,null,Bn,Nn,{})}}export{On as default,Fn as metadata};