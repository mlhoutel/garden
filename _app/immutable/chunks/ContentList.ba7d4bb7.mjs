import{S as x,i as ee,s as te,k as E,r as S,a as A,l as w,m as I,u as T,h as p,c as H,p as C,b as D,F as d,v as z,g as b,w as F,d as $,f as L,e as K,H as O,z as le,A as ne,B as ie,C as ae}from"./index.73c741f7.mjs";import{T as oe}from"./TopicPill.f89121f6.mjs";function M(s,l,a){const t=s.slice();return t[2]=l[a],t}function Q(s){let l,a,t=s[0].topic.split(" "),e=[];for(let n=0;n<t.length;n+=1)e[n]=U(M(s,t,n));const o=n=>$(e[n],1,1,()=>{e[n]=null});return{c(){for(let n=0;n<e.length;n+=1)e[n].c();l=K()},l(n){for(let r=0;r<e.length;r+=1)e[r].l(n);l=K()},m(n,r){for(let i=0;i<e.length;i+=1)e[i].m(n,r);D(n,l,r),a=!0},p(n,r){if(r&1){t=n[0].topic.split(" ");let i;for(i=0;i<t.length;i+=1){const c=M(n,t,i);e[i]?(e[i].p(c,r),b(e[i],1)):(e[i]=U(c),e[i].c(),b(e[i],1),e[i].m(l.parentNode,l))}for(F(),i=t.length;i<e.length;i+=1)o(i);L()}},i(n){if(!a){for(let r=0;r<t.length;r+=1)b(e[r]);a=!0}},o(n){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)$(e[r]);a=!1},d(n){O(e,n),n&&p(l)}}}function U(s){let l,a;return l=new oe({props:{topic:s[2]}}),{c(){le(l.$$.fragment)},l(t){ne(l.$$.fragment,t)},m(t,e){ie(l,t,e),a=!0},p(t,e){const o={};e&1&&(o.topic=t[2]),l.$set(o)},i(t){a||(b(l.$$.fragment,t),a=!0)},o(t){$(l.$$.fragment,t),a=!1},d(t){ae(l,t)}}}function W(s){let l=s[0].short+"",a,t,e;return{c(){a=S(l),t=S("..."),e=E("br")},l(o){a=T(o,l),t=T(o,"..."),e=w(o,"BR",{})},m(o,n){D(o,a,n),D(o,t,n),D(o,e,n)},p(o,n){n&1&&l!==(l=o[0].short+"")&&z(a,l)},d(o){o&&p(a),o&&p(t),o&&p(e)}}}function re(s){let l,a,t,e,o=s[0].title+"",n,r,i,c,V,f,u,h,k,N,B,_=s[0].topic&&Q(s),g=s[0].short&&W(s);return{c(){l=E("div"),a=E("div"),t=E("a"),e=E("h3"),n=S(o),i=A(),c=E("div"),_&&_.c(),V=A(),f=E("p"),g&&g.c(),u=A(),h=E("a"),k=S(s[1]),this.h()},l(m){l=w(m,"DIV",{});var v=I(l);a=w(v,"DIV",{class:!0});var P=I(a);t=w(P,"A",{class:!0,href:!0});var R=I(t);e=w(R,"H3",{});var j=I(e);n=T(j,o),j.forEach(p),R.forEach(p),i=H(P),c=w(P,"DIV",{class:!0});var G=I(c);_&&_.l(G),G.forEach(p),P.forEach(p),V=H(v),f=w(v,"P",{class:!0});var q=I(f);g&&g.l(q),u=H(q),h=w(q,"A",{class:!0,href:!0});var J=I(h);k=T(J,s[1]),J.forEach(p),q.forEach(p),v.forEach(p),this.h()},h(){C(t,"class","md:w-auto whitespace-nowrap text-clip"),C(t,"href",r=s[0].path),C(c,"class","pills md:pt-[22px] md:pl-3"),C(a,"class","block md:inline-flex"),C(h,"class","font-serif"),C(h,"href",N=s[0].path),C(f,"class","pt-0 text-sm")},m(m,v){D(m,l,v),d(l,a),d(a,t),d(t,e),d(e,n),d(a,i),d(a,c),_&&_.m(c,null),d(l,V),d(l,f),g&&g.m(f,null),d(f,u),d(f,h),d(h,k),B=!0},p(m,[v]){(!B||v&1)&&o!==(o=m[0].title+"")&&z(n,o),(!B||v&1&&r!==(r=m[0].path))&&C(t,"href",r),m[0].topic?_?(_.p(m,v),v&1&&b(_,1)):(_=Q(m),_.c(),b(_,1),_.m(c,null)):_&&(F(),$(_,1,1,()=>{_=null}),L()),m[0].short?g?g.p(m,v):(g=W(m),g.c(),g.m(f,u)):g&&(g.d(1),g=null),(!B||v&2)&&z(k,m[1]),(!B||v&1&&N!==(N=m[0].path))&&C(h,"href",N)},i(m){B||(b(_),B=!0)},o(m){$(_),B=!1},d(m){m&&p(l),_&&_.d(),g&&g.d()}}}function se(s,l,a){let{item:t}=l,{label:e}=l;return s.$$set=o=>{"item"in o&&a(0,t=o.item),"label"in o&&a(1,e=o.label)},[t,e]}class ce extends x{constructor(l){super(),ee(this,l,se,re,te,{item:0,label:1})}}function X(s,l,a){const t=s.slice();return t[2]=l[a],t}function Y(s,l,a){const t=s.slice();return t[5]=l[a],t}function Z(s){let l,a;return l=new ce({props:{item:s[5],label:s[1]}}),{c(){le(l.$$.fragment)},l(t){ne(l.$$.fragment,t)},m(t,e){ie(l,t,e),a=!0},p(t,e){const o={};e&1&&(o.item=t[5]),e&2&&(o.label=t[1]),l.$set(o)},i(t){a||(b(l.$$.fragment,t),a=!0)},o(t){$(l.$$.fragment,t),a=!1},d(t){ae(l,t)}}}function y(s){let l,a,t=s[2].label+"",e,o,n,r,i=s[2].items,c=[];for(let f=0;f<i.length;f+=1)c[f]=Z(Y(s,i,f));const V=f=>$(c[f],1,1,()=>{c[f]=null});return{c(){l=E("section"),a=E("h2"),e=S(t),o=A();for(let f=0;f<c.length;f+=1)c[f].c();n=A(),this.h()},l(f){l=w(f,"SECTION",{});var u=I(l);a=w(u,"H2",{class:!0});var h=I(a);e=T(h,t),h.forEach(p),o=H(u);for(let k=0;k<c.length;k+=1)c[k].l(u);n=H(u),u.forEach(p),this.h()},h(){C(a,"class","text-4xl font-bold tracking-widest")},m(f,u){D(f,l,u),d(l,a),d(a,e),d(l,o);for(let h=0;h<c.length;h+=1)c[h].m(l,null);d(l,n),r=!0},p(f,u){if((!r||u&1)&&t!==(t=f[2].label+"")&&z(e,t),u&3){i=f[2].items;let h;for(h=0;h<i.length;h+=1){const k=Y(f,i,h);c[h]?(c[h].p(k,u),b(c[h],1)):(c[h]=Z(k),c[h].c(),b(c[h],1),c[h].m(l,n))}for(F(),h=i.length;h<c.length;h+=1)V(h);L()}},i(f){if(!r){for(let u=0;u<i.length;u+=1)b(c[u]);r=!0}},o(f){c=c.filter(Boolean);for(let u=0;u<c.length;u+=1)$(c[u]);r=!1},d(f){f&&p(l),O(c,f)}}}function fe(s){let l,a,t=s[0],e=[];for(let n=0;n<t.length;n+=1)e[n]=y(X(s,t,n));const o=n=>$(e[n],1,1,()=>{e[n]=null});return{c(){l=E("div");for(let n=0;n<e.length;n+=1)e[n].c()},l(n){l=w(n,"DIV",{});var r=I(l);for(let i=0;i<e.length;i+=1)e[i].l(r);r.forEach(p)},m(n,r){D(n,l,r);for(let i=0;i<e.length;i+=1)e[i].m(l,null);a=!0},p(n,[r]){if(r&3){t=n[0];let i;for(i=0;i<t.length;i+=1){const c=X(n,t,i);e[i]?(e[i].p(c,r),b(e[i],1)):(e[i]=y(c),e[i].c(),b(e[i],1),e[i].m(l,null))}for(F(),i=t.length;i<e.length;i+=1)o(i);L()}},i(n){if(!a){for(let r=0;r<t.length;r+=1)b(e[r]);a=!0}},o(n){e=e.filter(Boolean);for(let r=0;r<e.length;r+=1)$(e[r]);a=!1},d(n){n&&p(l),O(e,n)}}}function he(s,l,a){let{items:t}=l,{label:e}=l;return s.$$set=o=>{"items"in o&&a(0,t=o.items),"label"in o&&a(1,e=o.label)},[t,e]}class me extends x{constructor(l){super(),ee(this,l,he,fe,te,{items:0,label:1})}}export{me as C};