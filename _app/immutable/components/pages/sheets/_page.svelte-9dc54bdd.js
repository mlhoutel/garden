import{S as D,i as L,s as T,k as d,q as O,a as k,l as p,m as g,r as S,h as _,c as x,b as j,E as h,B as I,G as U,e as w,n as u}from"../../../chunks/index-2e2fe841.js";function y(c,e,n){const o=c.slice();return o[2]=e[n][0],o[3]=e[n][1],o}function B(c,e,n){const o=c.slice();return o[6]=e[n],o}function H(c){let e,n,o=c[6].meta.title+"",f,i,a,l=(c[6].meta.short||"[No preview available]")+"",t,s,r,b,m,C,G;return{c(){e=d("div"),n=d("a"),f=O(o),i=k(),a=d("p"),t=O(l),s=k(),r=d("br"),b=k(),m=d("a"),C=O("Go to sheet »"),G=k(),this.h()},l(A){e=p(A,"DIV",{class:!0});var v=g(e);n=p(v,"A",{class:!0,href:!0});var P=g(n);f=S(P,o),P.forEach(_),i=x(v),a=p(v,"P",{class:!0});var E=g(a);t=S(E,l),s=x(E),r=p(E,"BR",{}),b=x(E),m=p(E,"A",{class:!0,href:!0});var q=g(m);C=S(q,"Go to sheet »"),q.forEach(_),E.forEach(_),G=x(v),v.forEach(_),this.h()},h(){u(n,"class","font-bold"),u(n,"href",R(c[6].path)),u(m,"class","font-serif"),u(m,"href",R(c[6].path)),u(a,"class","pt-0 text-sm"),u(e,"class","p-2")},m(A,v){j(A,e,v),h(e,n),h(n,f),h(e,i),h(e,a),h(a,t),h(a,s),h(a,r),h(a,b),h(a,m),h(m,C),h(e,G)},p:I,d(A){A&&_(e)}}}function N(c){let e,n=z(c[2])+"",o,f,i,a=Object.values(c[3]),l=[];for(let t=0;t<a.length;t+=1)l[t]=H(B(c,a,t));return{c(){e=d("h2"),o=O(n),f=k();for(let t=0;t<l.length;t+=1)l[t].c();i=w(),this.h()},l(t){e=p(t,"H2",{id:!0,class:!0});var s=g(e);o=S(s,n),s.forEach(_),f=x(t);for(let r=0;r<l.length;r+=1)l[r].l(t);i=w(),this.h()},h(){u(e,"id",c[2]),u(e,"class","text-4xl font-bold tracking-widest p-2 pt-7")},m(t,s){j(t,e,s),h(e,o),j(t,f,s);for(let r=0;r<l.length;r+=1)l[r].m(t,s);j(t,i,s)},p(t,s){if(s&1){a=Object.values(t[3]);let r;for(r=0;r<a.length;r+=1){const b=B(t,a,r);l[r]?l[r].p(b,s):(l[r]=H(b),l[r].c(),l[r].m(i.parentNode,i))}for(;r<l.length;r+=1)l[r].d(1);l.length=a.length}},d(t){t&&_(e),t&&_(f),U(l,t),t&&_(i)}}}function V(c){let e,n,o,f,i=c[0],a=[];for(let l=0;l<i.length;l+=1)a[l]=N(y(c,i,l));return{c(){e=d("article"),n=d("h1"),o=O("Sheets"),f=k();for(let l=0;l<a.length;l+=1)a[l].c()},l(l){e=p(l,"ARTICLE",{});var t=g(e);n=p(t,"H1",{});var s=g(n);o=S(s,"Sheets"),s.forEach(_),f=x(t);for(let r=0;r<a.length;r+=1)a[r].l(t);t.forEach(_)},m(l,t){j(l,e,t),h(e,n),h(n,o),h(e,f);for(let s=0;s<a.length;s+=1)a[s].m(e,null)},p(l,[t]){if(t&1){i=l[0];let s;for(s=0;s<i.length;s+=1){const r=y(l,i,s);a[s]?a[s].p(r,t):(a[s]=N(r),a[s].c(),a[s].m(e,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=i.length}},i:I,o:I,d(l){l&&_(e),U(a,l)}}}function R(c){const e=c.lastIndexOf("/");return c.slice(0,e)+"-"+c.slice(e+1)}function z(c){return c.charAt(0).toUpperCase()+c.slice(1)}function F(c,e,n){let{data:o}=e;const f=Object.entries(o.tree);return c.$$set=i=>{"data"in i&&n(1,o=i.data)},[f,o]}class K extends D{constructor(e){super(),L(this,e,F,V,T,{data:1})}}export{K as default};
