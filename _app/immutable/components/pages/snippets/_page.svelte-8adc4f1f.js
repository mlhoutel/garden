import{S as _,i as h,s as $,k as f,q as g,a as x,w as b,l as u,m as d,r as C,h as l,c as v,x as y,b as E,E as p,y as S,B as O,f as j,t as q,z as w}from"../../../chunks/index-46686b93.js";import{C as A}from"../../../chunks/ContentList-84489a74.js";function I(a){let t,i,r,c,s,o;return s=new A({props:{items:a[0],label:L}}),{c(){t=f("article"),i=f("h1"),r=g("Snippets"),c=x(),b(s.$$.fragment)},l(n){t=u(n,"ARTICLE",{});var e=d(t);i=u(e,"H1",{});var m=d(i);r=C(m,"Snippets"),m.forEach(l),c=v(e),y(s.$$.fragment,e),e.forEach(l)},m(n,e){E(n,t,e),p(t,i),p(i,r),p(t,c),S(s,t,null),o=!0},p:O,i(n){o||(j(s.$$.fragment,n),o=!0)},o(n){q(s.$$.fragment,n),o=!1},d(n){n&&l(t),w(s)}}}const L="Go to snippet »";function P(a){const t=a.lastIndexOf("/");return a.slice(0,t)+"-"+a.slice(t+1)}function U(a){return a.charAt(0).toUpperCase()+a.slice(1)}function k(a,t,i){let{data:r}=t;const s=Object.entries(r.tree).map(([o,n])=>({label:U(o),items:Object.values(n).map(e=>({...e,path:P(e.path),title:e.meta.title,topic:e.meta.topic,short:e.meta.short}))}));return a.$$set=o=>{"data"in o&&i(1,r=o.data)},[s,r]}class G extends _{constructor(t){super(),h(this,t,k,I,$,{data:1})}}export{G as default};