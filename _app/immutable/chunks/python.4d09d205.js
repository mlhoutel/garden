import{S as na,i as ta,s as la,k as t,r as g,a as v,l,m as o,u as T,h as e,c as h,p as r,b as n,F as p,n as Q}from"./index.7aa01268.js";function oa(Z){let c,d,D,L,_,q,M,w,i,k,R,x,E,P,j,A,u,b,B,C,f,$=`<code class="language-sh">conda info 
conda update conda
conda <span class="token function">env</span> list
conda <span class="token function">env</span> remove <span class="token parameter variable">--name</span> env-name</code>`,H,O,y,K,S,m,aa=`<code class="language-sh">conda create <span class="token parameter variable">-n</span> env_name <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token number">3.7</span> <span class="token assign-left variable">pandas</span><span class="token operator">=</span><span class="token number">0.16</span>

<span class="token builtin class-name">source</span> activate env_name
conda activate env_name

<span class="token builtin class-name">source</span> desactivate

conda list <span class="token punctuation">(</span>enviroment<span class="token punctuation">)</span>

conda <span class="token function">install</span> name_packages
conda update name_packages
conda remove name_packages

anaconda search tensoflow <span class="token punctuation">(</span>cloud<span class="token punctuation">)</span>
anaconda show jjhelmus/tensorflow</code>`;return{c(){c=t("h2"),d=t("a"),D=g("Language"),L=v(),_=t("blockquote"),q=t("p"),M=g("TODO"),w=v(),i=t("h2"),k=t("a"),R=g("Cheat Sheets"),x=v(),E=t("blockquote"),P=t("p"),j=g("TODO"),A=v(),u=t("h2"),b=t("a"),B=g("Anaconda"),C=v(),f=t("pre"),H=v(),O=t("p"),y=t("strong"),K=g("Manage Environments"),S=v(),m=t("pre"),this.h()},l(a){c=l(a,"H2",{id:!0});var s=o(c);d=l(s,"A",{href:!0});var U=o(d);D=T(U,"Language"),U.forEach(e),s.forEach(e),L=h(a),_=l(a,"BLOCKQUOTE",{});var F=o(_);q=l(F,"P",{});var G=o(q);M=T(G,"TODO"),G.forEach(e),F.forEach(e),w=h(a),i=l(a,"H2",{id:!0});var N=o(i);k=l(N,"A",{href:!0});var z=o(k);R=T(z,"Cheat Sheets"),z.forEach(e),N.forEach(e),x=h(a),E=l(a,"BLOCKQUOTE",{});var I=o(E);P=l(I,"P",{});var J=o(P);j=T(J,"TODO"),J.forEach(e),I.forEach(e),A=h(a),u=l(a,"H2",{id:!0});var V=o(u);b=l(V,"A",{href:!0});var W=o(b);B=T(W,"Anaconda"),W.forEach(e),V.forEach(e),C=h(a),f=l(a,"PRE",{class:!0});var ea=o(f);ea.forEach(e),H=h(a),O=l(a,"P",{});var X=o(O);y=l(X,"STRONG",{});var Y=o(y);K=T(Y,"Manage Environments"),Y.forEach(e),X.forEach(e),S=h(a),m=l(a,"PRE",{class:!0});var sa=o(m);sa.forEach(e),this.h()},h(){r(d,"href","#language"),r(c,"id","language"),r(k,"href","#cheat-sheets"),r(i,"id","cheat-sheets"),r(b,"href","#anaconda"),r(u,"id","anaconda"),r(f,"class","language-sh"),r(m,"class","language-sh")},m(a,s){n(a,c,s),p(c,d),p(d,D),n(a,L,s),n(a,_,s),p(_,q),p(q,M),n(a,w,s),n(a,i,s),p(i,k),p(k,R),n(a,x,s),n(a,E,s),p(E,P),p(P,j),n(a,A,s),n(a,u,s),p(u,b),p(b,B),n(a,C,s),n(a,f,s),f.innerHTML=$,n(a,H,s),n(a,O,s),p(O,y),p(y,K),n(a,S,s),n(a,m,s),m.innerHTML=aa},p:Q,i:Q,o:Q,d(a){a&&e(c),a&&e(L),a&&e(_),a&&e(w),a&&e(i),a&&e(x),a&&e(E),a&&e(A),a&&e(u),a&&e(C),a&&e(f),a&&e(H),a&&e(O),a&&e(S),a&&e(m)}}}const ca={title:"Python",short:"high-level, interpreted programming language usefull for scripting and data-analysis",topic:"programming-language scripting"};class ra extends na{constructor(c){super(),ta(this,c,null,oa,la,{})}}export{ra as default,ca as metadata};
