import{S as _,i as h,s as g,k as d,r as $,a as y,z as C,l as f,m as u,u as x,h as c,c as b,A as v,b as B,F as m,B as E,n as A,g as L,d as R,C as S}from"../chunks/index.73c741f7.mjs";import{C as k}from"../chunks/ContentList.ba7d4bb7.mjs";function q(i){let a,n,o,l,s,e;return s=new k({props:{items:i[0],label:w}}),{c(){a=d("article"),n=d("h1"),o=$("Blog"),l=y(),C(s.$$.fragment)},l(t){a=f(t,"ARTICLE",{});var r=u(a);n=f(r,"H1",{});var p=u(n);o=x(p,"Blog"),p.forEach(c),l=b(r),v(s.$$.fragment,r),r.forEach(c)},m(t,r){B(t,a,r),m(a,n),m(n,o),m(a,l),E(s,a,null),e=!0},p:A,i(t){e||(L(s.$$.fragment,t),e=!0)},o(t){R(s.$$.fragment,t),e=!1},d(t){t&&c(a),S(s)}}}const w="Read full post »";function z(i,a,n){let{data:o}=a;const s=(o.years??[]).map(e=>({label:e.date,items:e.posts.map(t=>({...t,title:t.meta.title,topic:t.meta.topic,short:t.meta.short}))}));return i.$$set=e=>{"data"in e&&n(1,o=e.data)},[s,o]}class I extends _{constructor(a){super(),h(this,a,z,q,g,{data:1})}}export{I as default};