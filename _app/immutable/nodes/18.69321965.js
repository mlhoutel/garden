import{b as _}from"../chunks/paths.37c989f4.js";import{S as h,i as g,s as b,k as f,r as $,a as v,z as x,l as u,m as d,u as y,h as l,c as C,A as S,b as j,F as p,B as O,n as w,g as A,d as E,C as P}from"../chunks/index.7aa01268.js";import{C as z}from"../chunks/ContentList.b66d020d.js";const I=async({fetch:s})=>{const i=await(await s(`${_}/api/snippets`)).json();let r={};for(const c of i){const o=c.path.split("/").slice(1);let n=r;for(const[a,t]of o.entries())n[t]||(n[t]={}),a==o.length-1?n[t]=c:n=n[t]}return{tree:r}},H=Object.freeze(Object.defineProperty({__proto__:null,load:I},Symbol.toStringTag,{value:"Module"}));function L(s){let e,i,r,c,o,n;return o=new z({props:{items:s[0],label:T}}),{c(){e=f("article"),i=f("h1"),r=$("Snippets"),c=v(),x(o.$$.fragment)},l(a){e=u(a,"ARTICLE",{});var t=d(e);i=u(t,"H1",{});var m=d(i);r=y(m,"Snippets"),m.forEach(l),c=C(t),S(o.$$.fragment,t),t.forEach(l)},m(a,t){j(a,e,t),p(e,i),p(i,r),p(e,c),O(o,e,null),n=!0},p:w,i(a){n||(A(o.$$.fragment,a),n=!0)},o(a){E(o.$$.fragment,a),n=!1},d(a){a&&l(e),P(o)}}}const T="Go to snippet »";function U(s){const e=s.lastIndexOf("/");return s.slice(0,e)+"-"+s.slice(e+1)}function k(s){return s.charAt(0).toUpperCase()+s.slice(1)}function q(s,e,i){let{data:r}=e;const o=Object.entries(r.tree).map(([n,a])=>({label:k(n),items:Object.values(a).map(t=>({...t,path:U(t.path),title:t.meta.title,topic:t.meta.topic,short:t.meta.short}))}));return s.$$set=n=>{"data"in n&&i(1,r=n.data)},[o,r]}class M extends h{constructor(e){super(),g(this,e,q,L,b,{data:1})}}export{M as component,H as universal};
