import{S as h,i as _,s as $,k as u,r as g,a as C,z as b,l as f,m as d,u as x,h as l,c as v,A as S,b as y,F as m,B as A,n as E,g as O,d as j,C as I}from"../chunks/index.73c741f7.mjs";import{C as L}from"../chunks/ContentList.ba7d4bb7.mjs";function P(a){let t,r,i,c,s,o;return s=new L({props:{items:a[0],label:U}}),{c(){t=u("article"),r=u("h1"),i=g("Sheets"),c=C(),b(s.$$.fragment)},l(n){t=f(n,"ARTICLE",{});var e=d(t);r=f(e,"H1",{});var p=d(r);i=x(p,"Sheets"),p.forEach(l),c=v(e),S(s.$$.fragment,e),e.forEach(l)},m(n,e){y(n,t,e),m(t,r),m(r,i),m(t,c),A(s,t,null),o=!0},p:E,i(n){o||(O(s.$$.fragment,n),o=!0)},o(n){j(s.$$.fragment,n),o=!1},d(n){n&&l(t),I(s)}}}const U="Go to sheet »";function k(a){const t=a.lastIndexOf("/");return a.slice(0,t)+"-"+a.slice(t+1)}function q(a){return a.charAt(0).toUpperCase()+a.slice(1)}function w(a,t,r){let{data:i}=t;const s=Object.entries(i.tree).map(([o,n])=>({label:q(o),items:Object.values(n).map(e=>({...e,path:k(e.path),title:e.meta.title,topic:e.meta.topic,short:e.meta.short}))}));return a.$$set=o=>{"data"in o&&r(1,i=o.data)},[s,i]}class F extends h{constructor(t){super(),_(this,t,w,P,$,{data:1})}}export{F as default};